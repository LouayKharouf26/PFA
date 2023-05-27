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

# resource "azurerm_resource_group" "resource-group" {
#   name     = "pfa"
#   location = var.resource_group_location
# }

resource "azurerm_network_security_group" "network-security-group" {
  name                = "${var.virtual_machine_name}default-security-group"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}

resource "azurerm_network_security_rule" "nsr-1" {
  name                        = "Ssh"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "*"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_network_security_rule" "nsr-2" {
  name                        = "Ping"
  priority                    = 200
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Icmp"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_network_security_rule" "nsr-3" {
  name                        = "connexion"
  priority                    = 300
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "*"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_network_security_rule" "nsr-4" {
  name                        = "RDP"
  priority                    = 400
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "*"
  source_port_range           = "*"
  destination_port_range      = "3389"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_virtual_network" "virtual-network" {
  name                = "${var.virtual_machine_name}-virtual-network"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "subnet" {
  name                 = var.subnet_name
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.virtual-network.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet_network_security_group_association" "name" {
  subnet_id                 = azurerm_subnet.subnet.id
  network_security_group_id = azurerm_network_security_group.network-security-group.id
}

resource "azurerm_public_ip" "public_ip" {
  name                = "${var.virtual_machine_name}-public-ip"
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
  allocation_method   = "Dynamic"

  tags = {
    environment = "Production"
  }
}

resource "azurerm_network_interface" "network-interface" {
  name                = "${var.virtual_machine_name}-nic"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public_ip.id
  }
}

resource "azurerm_storage_account" "pfastorage" {
  name                     = "${var.virtual_machine_name}pfastorage"
  resource_group_name      = var.resource_group_name
  location                 = var.resource_group_location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
resource "azurerm_storage_container" "scriptscontainer" {
  name                  = "scripts"
  storage_account_name  = azurerm_storage_account.pfastorage.name
  container_access_type = "blob"
}
locals {
  file_path = "../installation.ps1"
}
resource "azurerm_storage_blob" "blob" {
  name                   = "installation.ps1"
  type                   = "Block"
  storage_account_name   = azurerm_storage_account.pfastorage.name
  storage_container_name = azurerm_storage_container.scriptscontainer.name
  source                 = local.file_path
}

resource "azurerm_windows_virtual_machine" "windows-virtual-machine" {
  name                = var.virtual_machine_name
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
  size                = var.virtual_machine_size #Standard_B2s Standard_F2s Standard_D2s
  computer_name       = var.virtual_machine_name
  admin_username      = var.virtual_machine_admin_username
  admin_password      = var.virtual_machine_admin_password
  #custom_data         = file("./files/winrm.ps1")
  network_interface_ids = [
    azurerm_network_interface.network-interface.id,
  ]



  os_disk {
    name                 = var.virtual_machine_os_disk_name                 #"myOsDisk"
    caching              = var.virtual_machine_os_disk_caching              #"ReadWrite"
    storage_account_type = var.virtual_machine_os_disk_storage_account_type #"Standard_LRS" #Standard_LRS, StandardSSD_LRS, Premium_LRS, StandardSSD_ZRS Premium_ZRS
  }

  source_image_reference {
    publisher = "MicrosoftWindowsDesktop"
    offer     = "Windows-10"            # Windows-11
    sku       = var.virtual_machine_sku # win10-22h2-pro win11-22h2-pro win11-22h2-pro 
    version   = "latest"
  }
}
resource "azurerm_virtual_machine_extension" "install-python-openssh" {
  name                 = "CustomScriptExtension"
  virtual_machine_id   = azurerm_windows_virtual_machine.windows-virtual-machine.id
  publisher            = "Microsoft.Compute"
  type                 = "CustomScriptExtension"
  type_handler_version = "1.10"

  settings   = <<SETTINGS
 {
   "fileUris": [
      "${azurerm_storage_blob.blob.url}"
    ],
  "commandToExecute": "powershell.exe -ExecutionPolicy Unrestricted -File installation.ps1"
 }
SETTINGS
  depends_on = [azurerm_storage_blob.blob]

  tags = {
    environment = "Production"
  }
}

