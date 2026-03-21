pipeline {
    agent any

    stages {
        stage('Cleanup') {
            steps {
                sh "docker-compose down --remove-orphans || true"
                sh "docker rm -f playwright-test-container || true"
            }
        }

        stage('Build & Run App') {
            steps {
                echo "Building Production Angular Image (This saves 1GB of RAM)..."
                sh "docker-compose build bondar-practice-app"
                sh "docker-compose up -d bondar-practice-app"
                // No more 3-minute sleep! Nginx is instant.
                sh "sleep 10" 
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "Running tests against local production build..."
                    // --name ensures our 'post' copy always finds the container
                    sh "docker-compose run --name playwright-test-container playwright-runner npx playwright test --workers=1 --project=chromium"
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Extracting Results..."
                sh "docker cp playwright-test-container:/app/playwright-report ./ || true"
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                
                sh "docker-compose down"
                sh "docker rm -f playwright-test-container || true"
            }
        }
    }
}