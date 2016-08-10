[![CircleCI](https://circleci.com/gh/byavv/fm-starter.svg?style=svg)](https://circleci.com/gh/byavv/fm-starter)
[![codecov](https://codecov.io/gh/byavv/fm-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/byavv/fm-starter)

## Microservice starter for [funny-market](https://github.com/byavv/funny-market) project

### Features: 
- [rabbitmq](https://www.rabbitmq.com/) messaging via [wascally](https://github.com/LeanKit-Labs/wascally)
- [etcd](https://github.com/coreos/etcd) self-registration via [etcd-registry](https://github.com/mafintosh/etcd-registry)

### Usage

    npm install -g nodemon 
     ...
    cd fm-starter
    npm install

### Basic Commands

    npm start
    npm run dev
    npm test
    npm run clean
    npm run serve