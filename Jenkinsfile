pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = '/usr/local/bin/docker'
    }

    stages {
        stage('Checkout Tests') {
            steps {
                checkout scm
            }
        }

        stage('Run Playwright') {
            steps {
                script {
                    // 1. Run tests. 
                    sh "${DOCKER_COMPOSE} up --build --abort-on-container-exit"
                    
                    // 2. Identify the container name and copy the report
                    // This command finds the container ID for our service and copies the report out
                    def containerId = sh(script: "${DOCKER_COMPOSE} ps -a -q playwright-runner", returnStdout: true).trim()
                    sh "${DOCKER_COMPOSE} cp ${containerId}:/app/playwright-report ./"
                }
            }
        }
    }

    post {
        always {
            // This works even without the HTML Publisher plugin!
            // It will appear under "Build Artifacts"
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            
            echo 'Cleaning up...'
            sh "${DOCKER_COMPOSE} down"
        }
    }
}
