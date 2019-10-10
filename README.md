# Royalties API

Simple API to track royalties owed to the different [studios](https://github.com/Kumjami/royalties-api/blob/master/resources/studios.json) which are owners of the [episodes](https://github.com/Kumjami/royalties-api/blob/master/resources/episodes.json) available.

Everytime a customer watch an episode, it will be registerd as a view. Later, views and royalties owned to the different studios are listed.
The api is specified on the following [OAS file](https://github.com/Kumjami/royalties-api/blob/master/docs/oas.json)). This api is nicely displayed thanks to [Redoc](https://github.com/Redocly/redoc) by performing a `GET` request to the root when the service is running, for example: if the API is running [locally](http://localhost:3000).

## Getting started

- Clone the repo
```sh
git clone git@github.com:Kumjami/royalties-api.git
```

### Local execution
First of all, a [Node.js](https://nodejs.org) instance has to be installed. It has been tested on versions 8+, 10+ and 12+ (look at the [actions](https://github.com/Kumjami/royalties-api/blob/master/.github/workflows/nodejs.yml#L12) for more details).

Once Node.js is installed:

- Install dependencies
```sh
// for npm version 5.7+ 
npm ci
// otherwise
npm i
```
- Run the tests (optional)
```sh
npm t
```
- Run it locally
```sh
npm start
```

- Look at the API specification at [localhost](http://localhost:3000/)



### Using docker

A dockerfile is provided in order to run the API as a [Docker](https://www.docker.com/) container.

- Build the image
```sh
docker build -t royalties-api .
```
By default, if no other [configuration](#configuration) is specified the API will run on the port 3000. So to execute the docker image we need to bind this port
- Run the image
```sh
docker run -d -p 3000:3000 royalties-api 
```

### Using docker compose to launch the API and Redis to keep the state.

A docker-compose file is provided in order to run the application by using Docker for the API and for the Redis instance.
To start the combo just run:
```sh
docker-compose up
```

## Configuration

There are some parameters which are configurable through environment variables. 

| Variable | Default value| Description|
|:-|:-:|:-|
|PORT|3000| HTTP port on which the application would be accepting requests|
|LOG_LEVEL| info | Logs will be displayed from that level onwards|
|REDIS_URL| - | URL of the Redis instance to use as a external state database. It is mandatory if `ioredis` is specified as REDIS_MODULE|
|REDIS_MODULE| ioredis-mock | For the ease of development and testing, redis module implementation can be specified. Only `ioredis` or `ioredis-mock` are valid, if a non valid module is specified `ioredis-mock` will be used. By using `ioredis-mock` a real accesible Redis instance is not required, the store will live in memory|

## Code style

Eslint has been configured for this project. In concrete, the well known rules from Airbnb [Javascript Style Guide](https://github.com/airbnb/javascript). Also, thanks to the advice from node best practices repo [advice](https://github.com/goldbergyoni/nodebestpractices#-32-nodejs-specific-plugins), [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security) has been installed.
To run the linter in isolation run the following command:
```sh
npm run lint
```
Some other best practices from [node best practices](https://github.com/goldbergyoni/nodebestpractices) have been applied. 

# Running Application

A Heroku environment has been set in order to have a sandbox environment where to easily check the application:

> https://kumjami-royalties-api.herokuapp.com

It relays on a Redis instance in order to keep the state between deployments.

This environment gets a new version deployed whenever a push/merge to master is done.
To handle CI/CD process, [github actions](https://github.com/Kumjami/royalties-api/actions) have been set. Only after the workflow is green, the application gets deployed.
Contributors have the `environment` tab where the status of the deployment can be tracked. 
![imagen](https://user-images.githubusercontent.com/8338963/66550812-7a15d500-eb46-11e9-87d8-6ab1cef525d3.png)
![imagen](https://user-images.githubusercontent.com/8338963/66550889-9ca7ee00-eb46-11e9-900d-1e9af064d0b3.png)