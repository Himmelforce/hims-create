pipeline {
    agent { label 'development-node' }
    environment {
        EC2_HOST = ''
    }
    stages {
        stage('Init Terraform') {
            steps {
                sh 'terraform init'
            }
        }
        stage('Plan') {
            steps {
                withVault([vaultSecrets: [[path: 'Key-Value/aws-aa', secretValues: [
                    [vaultKey: 'access_key', envVar: 'AWS_ACCESS_KEY'],
                    [vaultKey: 'secret_key', envVar: 'AWS_SECRET_KEY']
                ]]]]) {
                    sh 'terraform plan -var "access_key=${AWS_ACCESS_KEY}" -var "secret_key=${AWS_SECRET_KEY}" -out=plan.out'
                }
            }
        }
        stage('Refresh Terraform State') {
            steps {
                withVault([vaultSecrets: [[path: 'Key-Value/aws-aa', secretValues: [
                    [vaultKey: 'access_key', envVar: 'AWS_ACCESS_KEY'],
                    [vaultKey: 'secret_key', envVar: 'AWS_SECRET_KEY']
                ]]]]) {
                    sh 'terraform refresh -var "access_key=${AWS_ACCESS_KEY}" -var "secret_key=${AWS_SECRET_KEY}"'
                }
            }
        }
        stage('Apply Terraform') {
            steps {
                withVault([vaultSecrets: [[path: 'Key-Value/aws-aa', secretValues: [
                    [vaultKey: 'access_key', envVar: 'AWS_ACCESS_KEY'],
                    [vaultKey: 'secret_key', envVar: 'AWS_SECRET_KEY']
                ]]]]) {
                    sh 'terraform apply -var "access_key=${AWS_ACCESS_KEY}" -var "secret_key=${AWS_SECRET_KEY}" -auto-approve'
                }
            }
        }
        stage('Retrieve EC2 Public IP') {
            steps {
                script {
                    EC2_HOST = sh(script: 'terraform output -raw ec2_public_ip || echo ""', returnStdout: true).trim()
                    if (!EC2_HOST) {
                        echo 'No existing EC2 instance found.'
                    } else {
                        echo "Found EC2 instance with IP: ${EC2_HOST}"
                    }
                }
            }
        }
        stage('Use EC2 as Jenkins Agent') {
            steps {
                script {
                    echo "Connecting to EC2 instance: ${EC2_HOST}"
                    sh 'chmod 400 /root/keys/default.pem'
                    sh """
                        ssh -o StrictHostKeyChecking=no -i /root/keys/default.pem ubuntu@${EC2_HOST} << EOF
                            sudo apt-get update -y

                            # Install prerequisites for Docker
                            sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

                            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
                            echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

                            sudo apt-get update -y
                            sudo apt-get install -y docker-ce docker-ce-cli containerd.io

                            sudo usermod -aG docker ubuntu

                            sudo apt install curl -y

                            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                            sudo apt-get install -y nodejs

                            sudo curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-\$(uname -s)-\$(uname -m) -o /usr/local/bin/docker-compose
                            sudo chmod +x /usr/local/bin/docker-compose

                            docker --version
                            docker-compose --version
                            node -v
                        << EOF
                    """
                }
            }
        }
        stage('Login to ghcr') {
            steps {
                withVault([vaultSecrets: [[path: 'Key-Value/github', secretValues: [
                    [vaultKey: 'main_username', envVar: 'GITHUB_USERNAME'],
                    [vaultKey: 'main_token', envVar: 'GITHUB_TOKEN']
                ]]]]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i /root/keys/default.pem ubuntu@${EC2_HOST} << EOF
                            docker login ghcr.io -u ${GITHUB_USERNAME} -p ${GITHUB_TOKEN}
                        << EOF
                    """
                }
            }
        }
        stage('Build HiMS on EC2') {
            steps {
                script {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i /root/keys/default.pem ubuntu@${EC2_HOST} << EOF
                            sudo rm -rf hims &&
                            echo -e "hims" | npm create hims@latest &&
                            cd hims &&
                            echo '<my_token>' | docker login ghcr.io -u <my_username> --password-stdin
                            node hims init --default &&
                            node hims start
                        << EOF
                    """
                }
            }
        }
    }
}
