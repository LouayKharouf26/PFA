pipeline{
    agent any
    stages{
        stage("Setting up infra"){
            environment{
                    ENVIR="linux"
                }
            steps{                
                script{
                    echo "======== executing ========"
                    dir("terraform template"){
                        sh "pwd"
                        if (env.ENVIR == 'linux') {
                            dir("linux") {
                                sh "pwd"
                                sh "ls"
                            }
                            
                        } else if (env.ENVIR == 'windows'){
                            dir("windows") {
                                 sh "pwd"
                                 sh "ls"
                            }  
                        } else {
                            dir("windows_server") {
                                sh "pwd"
                                sh "ls"
                            }
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