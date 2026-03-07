pipeline {
    agent any

    environment {
        // Using the path we discovered is a Compose wrapper on your machine
        DOCKER_COMPOSE = '/usr/local/bin/docker'
        // Pass the URL to your Windows app; host.docker.internal bridges the container to your host
        BASE_URL = 'http://host.docker.internal:4200'
    }

    stages {
        stage('Checkout Tests') {
            steps {
                // Pulls the latest code from your pw-tests GitHub repo
                checkout scm
            }
        }

        stage('Run Playwright') {
            steps {
                script {
                    // 1. Build and Run: --abort-on-container-exit ensures the job waits for completion
                    // We use "|| true" so the pipeline doesn't crash before we can grab the report
                    sh "${DOCKER_COMPOSE} up --build --abort-on-container-exit --exit-code-from playwright-runner || true"
                    
                    // 2. Data Extraction: Copy the report folder out of the container before it's deleted
                    // This moves the folder from /app/playwright-report (inside) to the Jenkins workspace (outside)
                    sh "${DOCKER_COMPOSE} cp playwright-runner-1:/app/playwright-report ./"
                }
            }
        }
    }

    post {
        always {
            // 3. Visualization: This plugin creates the "Playwright HTML Report" link in the Jenkins sidebar
            publishHTML(target: [
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            echo 'Cleaning up containers...'
            sh "${DOCKER_COMPOSE} down"
        }
        
        failure {
            echo 'Tests failed! Click the Playwright HTML Report in the sidebar to see screenshots.'
        }
    }
}
