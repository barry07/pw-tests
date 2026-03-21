pipeline {
    agent any

    stages {
        stage('Cleanup') {
            steps {
                script {
                    echo "Force cleaning previous environment..."
                    // Using direct docker-compose to avoid path/alias issues
                    sh "docker-compose down --remove-orphans || true"
                    // Manually remove the specific test container name if it exists
                    sh "docker rm -f playwright-test-container || true"
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "1. Starting Angular App..."
                    sh "docker-compose up -d bondar-practice-app"
                    
                    echo "2. Waiting 180s for 'Generating browser application bundles'..."
                    sh "sleep 180"
                    
                    echo "3. Running tests (Single Worker, Chromium Only)..."
                    // --name playwright-test-container makes the 'docker cp' command foolproof
                    // --workers=1 reduces RAM usage to prevent 'unexpected EOF'
                    sh "docker-compose run --name playwright-test-container playwright-runner npx playwright test --workers=1 --project=chromium"
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Attempting to extract report from playwright-test-container..."
                // No more 'docker ps' logic; we know the name because we set it above
                sh "docker cp playwright-test-container:/app/playwright-report ./ || true"
                
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                
                echo "Final Cleanup..."
                sh "docker-compose down"
                sh "docker rm -f playwright-test-container || true"
            }
        }
    }
}