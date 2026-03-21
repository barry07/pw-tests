pipeline {
    agent any

    stages {
        stage('Cleanup Environment') {
            steps {
                script {
                    echo "Stopping any old containers..."
                    // We use 'docker-compose' as a single command to avoid the double 'compose' issue
                    sh "docker-compose down --remove-orphans || true"
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "1. Starting the Angular App..."
                    sh "docker-compose up -d bondar-practice-app"

                    echo "2. Waiting 180 seconds for Angular compilation..."
                    sh "sleep 180"

                    echo "3. Launching Playwright Runner..."
                    sh "docker-compose up --build --abort-on-container-exit --exit-code-from playwright-runner"
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Extracting Test Report..."
                sh "docker cp bondar-playwright-tests-playwright-runner-1:/app/playwright-report ./ || true"
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                
                echo "Final Cleanup..."
                sh "docker-compose down"
            }
        }
    }
}