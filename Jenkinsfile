pipeline {
    agent any

    environment {
        // We set this to the base docker command
        DOCKER_COMPOSE = '/usr/local/bin/docker'
    }

    stages {
        stage('Cleanup Environment') {
            steps {
                script {
                    echo "Cleaning up any old containers..."
                    // Result: docker compose down
                    sh "${DOCKER_COMPOSE} compose down --remove-orphans || true"
                }
            }
        }

        stage('Checkout SCM') {
            steps {
                echo "Checking out Playwright tests..."
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "Starting the Angular App..."
                    sh "${DOCKER_COMPOSE} compose up -d bondar-practice-app"

                    echo "Waiting 150 seconds for Angular to compile..."
                    sh "sleep 150"

                    echo "Starting tests..."
                    sh "${DOCKER_COMPOSE} compose up --build --abort-on-container-exit --exit-code-from playwright-runner"
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Extracting Test Report..."
                // Using standard docker cp
                sh "docker cp bondar-playwright-tests-playwright-runner-1:/app/playwright-report ./ || true"
                
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                
                echo "Cleaning up..."
                sh "${DOCKER_COMPOSE} compose down"
            }
        }
    }
}