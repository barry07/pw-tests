pipeline {
    agent any

    stages {
        stage('Cleanup') {
            steps {
                script {
                    echo "Force cleaning previous runs..."
                    // Direct command, no variables to mess up
                    sh "/usr/local/bin/docker compose down --remove-orphans || true"
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "Starting Angular App..."
                    sh "/usr/local/bin/docker compose up -d bondar-practice-app"

                    // This is the long wait for 'Generating browser application bundles'
                    echo "Waiting 160 seconds for Angular compilation..."
                    sh "sleep 160"

                    echo "Launching Playwright Runner..."
                    sh "/usr/local/bin/docker compose up --build --abort-on-container-exit --exit-code-from playwright-runner"
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Attempting to copy report..."
                // We use the project name prefix 'bondar-playwright-tests' 
                sh "docker cp bondar-playwright-tests-playwright-runner-1:/app/playwright-report ./ || true"
                
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                
                echo "Final Cleanup..."
                sh "/usr/local/bin/docker compose down"
            }
        }
    }
}