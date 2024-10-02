variable "access_key" {
  type = string
  description = "AWS Access Key"
}

variable "secret_key" {
  type = string
  description = "AWS Secret Key"
}

provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = "eu-central-1"
}

resource "aws_security_group" "ssh_access" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_ssh"
  }
}

resource "aws_spot_instance_request" "server" {
  ami                         = "ami-0e04bcbe83a83792e"
  instance_type               = "t3.micro"
  spot_price                  = "0.01"
  spot_type                   = "one-time"
  key_name                    = "default"
  associate_public_ip_address  = true
  wait_for_fulfillment         = true

  vpc_security_group_ids = [aws_security_group.ssh_access.id]

  root_block_device {
    volume_size           = 20
    volume_type           = "gp2"
    delete_on_termination = true
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "HiMS"
  }
}

output "ec2_public_ip" {
  value = aws_spot_instance_request.server.public_ip
}
