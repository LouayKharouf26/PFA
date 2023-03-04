#! /usr/bin/env groovy

pipeline{
    agent any
    stages{
        stage("Setting up infra"){
            steps{
                environment{
                    ENVIR="linux"
                }
                script{
                    echo "======== executing ========"
                    dir("terraform template"){
                        if (env.ENVIR == 'linux') {
                            dir("linux")
                            sh "pwd"
                        } else if (env.ENVIR == 'windows'){
                            dir("windows")
                            sh "pwd"
                        } else {
                            dir("windows_server")
                            sh "pwd"
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