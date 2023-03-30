terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0.0"
    }
  }
  required_version = ">= 0.14.9"
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "resource-group" {
  name     = var.resource_group_name
  location = "West Europe"
}

resource "azurerm_network_security_group" "network-security-group" {
  name                = "default-security-group"
  location            = azurerm_resource_group.resource-group.location
  resource_group_name = azurerm_resource_group.resource-group.name
}

resource "azurerm_network_security_rule" "nsr-1" {
  name                        = "ssh-in"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.resource-group.name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_network_security_rule" "nsr-2" {
  name                        = "ping"
  priority                    = 200
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Icmp"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.resource-group.name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_network_security_rule" "nsr-3" {
  name                        = "connexion"
  priority                    = 300
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.resource-group.name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}


resource "azurerm_virtual_network" "virtual-network" {
  name                = var.virtual_network_name
  location            = azurerm_resource_group.resource-group.location
  resource_group_name = azurerm_resource_group.resource-group.name
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "subnet" {
  name                 = var.subnet_name
  resource_group_name  = azurerm_resource_group.resource-group.name
  virtual_network_name = azurerm_virtual_network.virtual-network.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet_network_security_group_association" "name" {
  subnet_id                 = azurerm_subnet.subnet.id
  network_security_group_id = azurerm_network_security_group.network-security-group.id
}

resource "azurerm_public_ip" "public_ip" {
  name                = "public-ip-1"
  resource_group_name = azurerm_resource_group.resource-group.name
  location            = azurerm_resource_group.resource-group.location
  allocation_method   = "Dynamic"

  tags = {
    environment = "Production"
  }
}

resource "azurerm_network_interface" "network-interface" {
  name                = "${var.virtual_machine_name}-nic"
  location            = azurerm_resource_group.resource-group.location
  resource_group_name = azurerm_resource_group.resource-group.name
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public_ip.id
  }
}

resource "azurerm_windows_virtual_machine" "example" {
  nname                           = var.virtual_machine_name
  resource_group_name             = azurerm_resource_group.resource-group.name
  location                        = azurerm_resource_group.resource-group.location
  size                            = var.virtual_machine_size #Standard_B2s Standard_F2s Standard_D2s
  computer_name                   = var.virtual_machine_name
  admin_username                  = "mk"
  admin_password                  = "PassStudent123"
  disable_password_authentication = false
  network_interface_ids = [
    azurerm_network_interface.network-interface.id,
  ]

  os_disk {
    name                 = "myOsDisk"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS" #Standard_LRS, StandardSSD_LRS, Premium_LRS, StandardSSD_ZRS Premium_ZRS
  }

  source_image_reference {
    publisher = "MicrosoftWindowsDesktop"
    offer     = "Windows-10"     # Windows-11
    sku       = "win10-21h2-pro" # win10-22h2-pro win11-22h2-pro win11-22h2-pro 
    version   = "latest"
  }
}
