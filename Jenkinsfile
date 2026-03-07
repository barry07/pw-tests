pipeline {
    agent any

    environment {
        // We know this path triggers 'docker compose' on your machine
        DOCKER_COMPOSE = '/usr/local/bin/docker'
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
                // --abort-on-container-exit: If tests fail, the job turns RED.
                // --exit-code-from: Tells Jenkins to report the failure from this specific container.
                sh "${DOCKER_COMPOSE} up --build --abort-on-container-exit --exit-code-from playwright-runner"
            }
        }
    }

    post {
        always {
            echo 'Cleaning up containers...'
            sh "${DOCKER_COMPOSE} down"
        }
        failure {
            echo 'Playwright tests failed. Check the Jenkins console for details.'
        }
    }
}
