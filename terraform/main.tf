# EventFlow AWS Cloud Infrastructure (Terraform)
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "eventflow-tf-state-storage"
    key            = "prod/eventflow/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "eventflow-tf-locks"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "EventFlow"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
