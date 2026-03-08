pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = '/usr/local/bin/docker'
        // This ensures the container knows where the app is
        BASE_URL = 'http://host.docker.internal:4200'
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
                    sh "netstat -ano || findstr :4200"
                    sh 'sleep 30'
                    // 1. Run tests. We keep the exit code to ensure Jenkins knows if tests fail.
                    sh "${DOCKER_COMPOSE} up --build --abort-on-container-exit --exit-code-from playwright-runner"
                    //sh "/usr/local/bin/docker compose up --build --abort-on-container-exit --exit-code-from playwright-runner"
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Extracting Test Report...'
                // 2. Use the Service Name directly. Compose handles the rest!
                //sh "${DOCKER_COMPOSE} cp playwright-runner:/app/playwright-report ./"
                sh "docker cp playwright-runner:/app/playwright-report ./"
                
                // 3. Archive the results so you can download them from the build page
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
            
            echo 'Cleaning up...'
            sh "${DOCKER_COMPOSE} down"
        }
    }
}