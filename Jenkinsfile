pipeline {
    agent any
    stages {
        stage('Cleanup') {
            steps {
                sh "docker-compose down --remove-orphans || true"
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    sh "docker-compose up -d bondar-practice-app"
                    echo "Waiting for Angular..."
                    sh "sleep 180"
                    
                    // The Fix: --workers=1 and --project=chromium
                    // This prevents the 'Unexpected EOF' memory crash
                    sh "docker-compose run --build playwright-runner npx playwright test --workers=1 --project=chromium"
                }
            }
        }
    }
    post {
        always {
            script {
                sh "docker cp \$(docker ps -aqf 'name=playwright-runner'):/app/playwright-report ./ || true"
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                sh "docker-compose down"
            }
        }
    }
}