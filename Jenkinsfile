pipeline{
    agent any
    stages{
        stage("getting code") {
            steps {
                git url: 'https://github.com/Louaykharouf26/PFA', branch: 'malek',
                credentialsId: '6d189f1d-0370-4774-a1c4-c7b9c55e494e' //jenkins-github-creds
                sh "ls -ltr"
            }
        }
        stage("Setting up infra") {
            environment {
                    ENVIR="linux"
                }
            steps {                
                script {
                    echo "======== executing ========"
                        sh "pwd"
                        sh "ls"
                        if (env.ENVIR == 'linux') {
                            dir ("terraform-template/linux") {
                                sh "pwd"
                                sh "ls"
                                echo "terraform init"
                                terraform init
                                //terraform plan --var-file=..\terraform.tfvars.json
                                terraform apply --auto-approve --var-file='..\terraform.tfvars.json'
                            }
                        } else if (env.ENVIR == 'windows'){
                            dir ("terraform-template/windows") {
                                sh "pwd"
                                sh "ls"
                                echo "terraform init"
                                //terraform plan --var-file=..\terraform.tfvars.json
                                //terraform apply --auto-approve --var-file=..\terraform.tfvars.json
                            }
                        } else {
                            dir ("terraform-template/windows_server") {
                                sh "pwd"
                                sh "ls"
                                echo "terraform init"
                                //terraform plan --var-file=..\terraform.tfvars.json
                                //terraform apply --auto-approve --var-file=..\terraform.tfvars.json
                            }                    
                        }
                    }            
                }
            post{
                success{
                    echo "======== Setting up infra executed successfully ========"
                }
                failure{
                    echo "======== Setting up infra execution failed ========"
                }
            }
        }        
    }
    post{
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}