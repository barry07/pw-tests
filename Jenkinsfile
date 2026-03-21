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
                    echo "Starting App..."
                    sh "docker-compose up -d bondar-practice-app"
                    
                    echo "Waiting 180s for Angular..."
                    sh "sleep 180"
                    
                    echo "Running tests in SINGLE-FILE mode to save memory..."
                    // --workers=1 is the magic flag that stops the 30-minute hang
                    sh "docker-compose run playwright-runner npx playwright test --workers=1 --project=chromium"
                }
            }
        }
    }
    post {
        always {
            script {
                // Better container finding logic for the report
                sh "docker cp \$(docker ps -aqf 'name=playwright-runner' | head -n 1):/app/playwright-report ./ || true"
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                sh "docker-compose down"
            }
        }
    }
}