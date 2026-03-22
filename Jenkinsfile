pipeline {
    agent any

    environment {
        /* Inside a Docker container, 'localhost' is the container itself.
           'host.docker.internal' lets Jenkins talk to your App container 
           running on port 4201.
        */
        PLAYWRIGHT_TEST_BASE_URL = 'http://host.docker.internal:4201'
    }

    stages {
        stage('Checkout') {
            steps {
                // This pulls your latest test code from GitHub
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing NodeJS dependencies...'
                sh 'npm install'
                
                // If the Jenkins agent doesn't have browsers, we install them here
                echo 'Installing Playwright Browsers...'
                sh 'npx playwright install chromium --with-deps'
            }
        }

        stage('Run E2E Tests') {
            steps {
                echo "Testing against App at: ${env.PLAYWRIGHT_TEST_BASE_URL}"
                // This runs your npx playwright test command
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // This ensures you get the "Playwright Report" tab in Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // Clean up to save space (The "Fire Butler" will thank you)
            cleanWs()
        }
        
        failure {
            echo 'Tests failed! Check the HTML report for screenshots.'
        }
    }
}