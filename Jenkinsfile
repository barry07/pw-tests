pipeline {
    agent any

    environment {
        // Defining the path to the working Docker binary to avoid the "shorthand flag" error
        DOCKER_PATH = '/usr/local/bin/docker'
    }

    stages {
        stage('Checkout Tests') {
            steps {
                // Pulls the latest code from your pw-tests GitHub repo
                checkout scm
            }
        }

        stage('Run Playwright') {
            steps {
                script {
                    // 1. Build the image (Bakes the playwright.config.ts and tests into the container)
                    sh "${DOCKER_PATH} build -t playwright-runner ."

                    // 2. Run the tests
                    // We use host.docker.internal to bridge back to your Windows app on port 4200
                    sh "${DOCKER_PATH} run --rm -e BASE_URL=http://host.docker.internal:4200 playwright-runner"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up old images...'
            // Optional: Keeps your Jenkins environment tidy
            sh "${DOCKER_PATH} image prune -f"
        }
        failure {
            echo 'Tests failed! Check the Playwright trace logs.'
        }
    }
}
