# Weather Forecast API

A RESTful API for weather forecasting, built with [NestJS](https://nestjs.com) and TypeScript.

## Features

- User authentication and authorization
- Current weather data by city and country
- Weather condition endpoints
- City and country management
- Modular service architecture
- Seeder scripts for initial data
- Docker support for easy deployment

## Tech Stack

- [NestJS](https://nestjs.com) (Node.js framework)
- TypeScript
- Docker
- [Jest](https://jestjs.io/) (testing)
- [Prettier](https://prettier.io/) (code formatting)
- [ESLint](https://eslint.org/) (linting)

## Project Setup

```bash
# Install dependencies
npm install
```

## Running the Project

```bash
# Development mode
npm run start

# Watch mode (auto-reload)
npm run start:dev

# Production mode
npm run start:prod
```

## Running Tests

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker

To build and run the project with Docker:

```bash
docker build -t weather-api .
docker run -p 3000:3000 weather-api
```

## Deployment

See the [NestJS deployment documentation](https://docs.nestjs.com/deployment) for best practices.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Discord](https://discord.gg/G7Qnnhy)
- [NestJS Devtools](https://devtools.nestjs.com)

## License

MIT
