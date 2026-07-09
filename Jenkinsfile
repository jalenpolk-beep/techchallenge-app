    
pipeline {
    agent any


environment {
    AWS_REGION = 'us-east-1'
    AWS_ACCOUNT_ID = '673611060385'
    FRONTEND_REPO = 'techchallenge-frontend'
    BACKEND_REPO = 'techchallenge-backend'
}

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }

        stage('Frontend Install') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    sh 'node server.js & sleep 5'
                    sh 'echo Backend started'
                }
            }
        }

stage('Build Frontend Docker Image') {
    steps {
        dir('frontend') {
            sh 'docker build -t techchallenge-frontend .'
        }
    }
}

stage('Build Backend Docker Image') {
    steps {
        dir('backend') {
            sh 'docker build -t techchallenge-backend .'
        }
    }
}

stage('Login to ECR') {
    steps {
        sh '''
        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
        '''
    }
}

stage('Push Images to ECR') {
    steps {
        sh '''
        docker tag techchallenge-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FRONTEND_REPO:latest
        docker tag techchallenge-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_REPO:latest

        docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FRONTEND_REPO:latest
        docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_REPO:latest
        '''
    }
}   

 }

}

