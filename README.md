## Number8 Challenge

This challenge was completed using the following main technologies:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine UI](https://mantine.dev/)
- [tRPC](https://trpc.io/)
- [Drizzle](https://orm.drizzle.team/)
- [MySQL](https://www.mysql.com/)

### Principles Applied

Given the nature of the challenge, I decided to apply sound engineering principles to the project. However, considering the time I had to deliver it, I decided to keep it simple and focus on the following:

- **SOLID** and **DRY**
- **Unit, Integration, and E2E tests**
- **React error handling**
- **Clean Architecture**
- **GoF Design Patterns**
- **General Design Patterns**
- **DDD Patterns**
- **DDD**
- **TDD**
- **In-Memory Repository**
- **Clean Code**
- **Clean Commit**

### Disclaimers

- **Disclaimer about tRPC**: I used tRPC solely to create the REST layer of the application.
- **Disclaimer about React Context API**: I used the React Context API, as the challenge description stated, but I believe that other approaches would also be suitable, such as ReactQuery cache management or Zustand.
- **Disclaimer about router tests**: All tests for routers are working, but they use a local MySQL instance. There’s an important follow up work for it, which I believe would be out of scope for this challenge: when you run them all together, they will not work due to a problem with the connection pool that throws a deadlock and the test lifecycle can't clean the database, causing side effects. Nonetheless, if you run the tests individually, they will work.
- **Disclaimer about frontend unit tests**: I included some frontend unit tests for demonstrating my test-oriented approach when it comes to development and designing an application. Unit tests follow up work: handling the connection pool deadlock fix for the test suite.
- **Disclaimer about E2E tests**: I implemented E2E tests with Cypress. The implementation is intended to show that I am experienced in that domain. E2E tests follow up work: implement coverage for other situations, such as error handling.
- **Error handling on the server**: main concepts were addressed on the current state of the app. Error handling follow up work: improving the error handling on the server side by encapsulating the errors and returning them to the client side.

### How to Run

To run the application, you will need to have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v20.6.0 or higher)

I included a `docker-compose.yml` file in the root of the project to assist you in running it, but you can also run the application without Docker. You can even run it in development mode with the Docker Compose watch feature. I left the code commented in the compose file.

To run the application with Docker, you just need to run the following command:

```bash
docker-compose up
```

After that, you need to run the migrations and seed the database. To do that, you need to run the following commands:

```bash
yarn db:push && yarn db:seed
```

Make it out of docker compose, for it, pick the DATABASE_URL from the docker-compose.yml and put it on a local .env file.

Now you can access the application at [http://localhost:3000](http://localhost:3000).
