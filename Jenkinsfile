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
                // We use -u to ensure permissions match and check the file list before running
                sh """
                    ls -al // This will show us if the files actually exist in Jenkins
                    docker run --rm \
                    -v /var/jenkins_home/workspace/Bondar-Playwright-Tests:/tests \
                    -w /tests \
                    -e BASE_URL=http://localhost:4200/pages/iot-dashboard \
                    mcr.microsoft.com/playwright:v1.45.0-jammy \
                    /bin/bash -c "npm install && npx playwright test"
                """
            }
        }
    }
}