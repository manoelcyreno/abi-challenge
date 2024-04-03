# Abi Challenge

Automation project strategy for the Abi Challenge.

## Main Tasks:

- Create user
- Update user
- Get user and validate information returned
- Unsubscribe user

## Useful commands:
- `npm install` -> Install all dependencies
- `npm run test` -> Run all tests in headless mode
- `npm run test:ui` -> Run tests by browser calling the Playwright UI mode
- `npm run report:generate` -> To create the Allure Report
- `npm run report:open` -> To open the Allure Report
- `npm run sonar:configure` -> To configure the SonarQube by docker
- `npm run sonar:open` -> To run the tests and upload the result to SonarQube

## How to run the tests in local:
- Clone the project
- go to the root folder of the project
- `npm install` -> Install all dependencies
- `npm audit fix --force` -> Fix any dependency vulnerability
- `npx playwright install` -> Install all playwright
- `npx playwright install-deps` -> Install all playwright dependencies
- `npm run test` -> Run all tests in headless mode
- `npm run report:generate` -> To create the Allure Report
- `npm run report:open` -> To open the Allure Report

## How to Access the SonarQube report in a LOCAL way:
- `npm run sonar:configure` -> To configure the SonarQube by docker
- `npm run sonar:open` -> To run the tests and uplad the result to SonarQube
- Access: http://localhost:9000
- login: admin
- password: abi