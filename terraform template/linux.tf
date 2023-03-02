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
  features {

  }
  subscription_id = var.subscription_id
}

