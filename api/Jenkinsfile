pipeline{
    agent any
    stages{
        stage("A"){
            steps{
                echo "========executing A========"
            }
            post{

                success{
                    echo "========A executed successfully========"
                }
                failure{
                    echo "========A execution failed========"
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