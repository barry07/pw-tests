pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = '/usr/local/bin/docker compose'
    }

    stages {
        stage('Cleanup Environment') {
            steps {
                script {
                    echo "Cleaning up any old containers..."
                    sh "${DOCKER_COMPOSE} down --remove-orphans || true"
                }
            }
        }

        stage('Checkout SCM') {
            steps {
                echo "Checking out Playwright tests..."
                // Checkout is handled automatically by Jenkins
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "Starting the Angular App..."
                    // 1. Start the app in the background
                    sh "${DOCKER_COMPOSE} up -d bondar-practice-app"

                    // 2. Wait for Angular to compile (based on build #127 logs)
                    echo "Waiting 150 seconds for Angular to compile..."
                    sh "sleep 150"

                    // 3. Run the tests
                    sh "${DOCKER_COMPOSE} up --build --abort-on-container-exit --exit-code-from playwright-runner"
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Extracting Test Report..."
                // Using '|| true' so the pipeline doesn't fail if the report isn't ready yet
                sh "docker cp bondar-playwright-tests-playwright-runner-1:/app/playwright-report ./ || true"
                
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                
                echo "Cleaning up..."
                sh "${DOCKER_COMPOSE} down"
            }
        }
    }
}