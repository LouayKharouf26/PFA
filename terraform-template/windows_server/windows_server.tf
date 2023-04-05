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
  name                = "default-security-group"
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

resource "azurerm_network_security_rule" "nsr-5" {
  name                        = "WinRM"
  priority                    = 500
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "*"
  source_port_range           = "*"
  destination_port_range      = "5986"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_virtual_network" "virtual-network" {
  name                = var.virtual_network_name
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

resource "azurerm_windows_virtual_machine" "windows-server-virtual-machine" {
  name                = var.virtual_machine_name
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
  size                = var.virtual_machine_size #Standard_B2s Standard_F2s Standard_D2s
  computer_name       = var.virtual_machine_name
  admin_username      = var.virtual_machine_admin_username
  admin_password      = var.virtual_machine_admin_password
  network_interface_ids = [
    azurerm_network_interface.network-interface.id,
  ]

  os_disk {
    name                 = var.virtual_machine_os_disk_name                 #"myOsDisk"
    caching              = var.virtual_machine_os_disk_caching              #"ReadWrite"
    storage_account_type = var.virtual_machine_os_disk_storage_account_type #"Standard_LRS" #Standard_LRS, StandardSSD_LRS, Premium_LRS, StandardSSD_ZRS Premium_ZRS
  }

  source_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = var.virtual_machine_sku #2019-Datacenter 2012-Datacenter 2022-Datacenter
    version   = "latest"
  }
  provisioner "remote-exec" {
    inline = [
      "curl https://bootstrap.pypa.io/get-pip.py -OutFile C:\\get-pip.py",
      "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -ExecutionPolicy Bypass -Command .\\get-pip.py"
    ]
  }
}






# resource "azurerm_template_deployment" "example" {
#   name                = "example-deployment"
#   resource_group_name = var.resource_group_name
#   deployment_mode     = "Incremental"
#   template_body       = <<DEPLOY
#   {
#   "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
#   "contentVersion": "1.0.0.0",
#   "parameters": {
#     "vmName": {
#       "type": "string",
#       "defaultValue": "myvm",
#       "metadata": {
#         "description": "Name of the virtual machine."
#       }
#     }
#   },
#   "variables": {
#     "scriptUrl": "https://bootstrap.pypa.io/get-pip.py",
#     "scriptName": "get-pip.py",
#     "scriptArgs": "--upgrade pip"
#   },
#   "resources": [
#     {
#       "type": "Microsoft.Compute/virtualMachines/extensions",
#       "apiVersion": "2019-07-01",
#       "name": "[concat(parameters('vmName'), '/install-python')]",
#       "location": "[resourceGroup().location]",
#       "dependsOn": [
#         "[concat('Microsoft.Compute/virtualMachines/', parameters('vmName'))]"
#       ],
#       "properties": {
#         "publisher": "Microsoft.Compute",
#         "type": "CustomScriptExtension",
#         "typeHandlerVersion": "1.9",
#         "autoUpgradeMinorVersion": true,
#         "settings": {
#           "fileUris": [
#             "[variables('scriptUrl')]"
#           ],
#           "commandToExecute": "python [concat('./', variables('scriptName'))] [variables('scriptArgs')]"
#         }
#       }
#     }
#   ]
#   }
# DEPLOY

#   parameters = {
#     "vmName" = azurerm_windows_virtual_machine.windows-server-virtual-machine.name
#   }
# }

# output "vm_public_ip_address" {
#   value = azurerm_template_deployment.example.outputs["publicIPAddress"]
# }
