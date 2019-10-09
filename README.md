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

## Configuration

There are some parameters which are configurable through environment variables. 

| Variable | Default value| Description|
|:-|:-:|:-|
|PORT|3000| HTTP port on which the application would be accepting requests|
|LOG_LEVEL| info | Logs will be displayed from that level onwards| 

## Code style

Eslint has been configured for this project. In concrete, the well known rules from Airbnb [Javascript Style Guide](https://github.com/airbnb/javascript). Also, thanks to the advice from node best practices repo [advice](https://github.com/goldbergyoni/nodebestpractices#-32-nodejs-specific-plugins), [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security) has been installed.
To run the linter in isolation run the following command:
```sh
npm run lint
```
Some other best practices from [node best practices](https://github.com/goldbergyoni/nodebestpractices) has been applied. 
