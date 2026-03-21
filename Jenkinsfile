pipeline {
    agent any
    
    environment {
        // Use the IP of your Jenkins/Docker host
        APP_URL = "http://host.docker.internal:4201" 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // We still need the Playwright runner logic
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // We point Playwright to the App we built in #147
                sh "PLAYWRIGHT_TEST_BASE_URL=${APP_URL} npx playwright test"
            }
        }
    }

    post {
        always {
            // This saves your test results so you can see them in Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}