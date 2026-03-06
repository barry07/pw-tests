pipeline {
    agent any 
    stages {
        stage('Fetch Test Code') {
            steps {
                // This is where the actual 'heavy' clone happens
                checkout scm 
            }
        }
        stage('Run Playwright') {
            steps {
                sh "docker run --rm -v \$(pwd):/tests -w /tests mcr.microsoft.com/playwright:v1.45.0-jammy npx playwright test"
            }
        }
    }
}