pipeline{
    agent any
    stages{
        stage("getting code") {
            steps {
                git url: 'https://github.com/Louaykharouf26/PFA', branch: 'malek',
                credentialsId: 'jenkins-github-creds'
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
                        if (env.ENVIR == 'linux') {
                            sh "cd /terraform\ template/linux/"
                            sh "pwd"
                            sh "ls"
                        } else if (env.ENVIR == 'windows'){
                            sh " cd /terraform\ template/windows/"
                            sh "pwd"
                            sh "ls"
                        } else {
                            sh " cd /terraform\ template/windows_server/"
                            sh "pwd"
                            sh "ls"                       
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