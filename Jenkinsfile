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
                sh """
                    # 1. Build the test image (This bakes the config into the image)
                    docker build -t playwright-tests .
                    
                    # 2. Run it against your Windows Host
                    # Use host.docker.internal to let the container 'see' your Windows machine
                    docker run --rm \
                    -e BASE_URL=http://host.docker.internal:4200 \
                    playwright-tests
                """
            }
        }
    }
}