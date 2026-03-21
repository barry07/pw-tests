pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Get the Playwright tests
                dir('app-source') {
                    // Get the actual Angular App code
                    git url: 'https://github.com/barry07/bondar-practice-app.git', branch: 'master'
                }
            }
        }
        stage('Build & Run App') {
            steps {
                script {
                    echo "Building Production Angular Image..."
                    sh "docker-compose build bondar-practice-app"
                    sh "docker-compose up -d bondar-practice-app"
                    sh "sleep 10" 
                }
            }
        }
        stage('Run Tests') {
            steps {
                // Pointing to the Nginx port (80)
                sh "docker-compose run --name playwright-test-container playwright-runner npx playwright test --workers=1 --project=chromium"
            }
        }
    }
    post {
        always {
            script {
                sh "docker cp playwright-test-container:/app/playwright-report ./ || true"
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                sh "docker-compose down"
            }
        }
    }
}