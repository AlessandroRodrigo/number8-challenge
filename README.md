<!-- write a brief about the number8 challenge -->

## Number8 Challenge

This is challenge was made using the following technologies:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine UI](https://mantine.dev/)
- [Vitest](https://vitest.dev/)
- [tRPC](https://trpc.io/)
- [Drizzle](https://orm.drizzle.team/)
- [Zod](https://zod.dev/)
- [MySQL](https://www.mysql.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Faker.js](https://fakerjs.dev/)
- [Day.js](https://day.js.org/)

### Principles applied

Given the nature of the challenge, I decided to apply great engineering principles to the project, but considering the time I had to deliver it, I decided to keep it simple and focus on the following:

- **SOLID** and **DRY**
- **Clean Architecture**: You will se some aspects of the Clean Architecture in the project, like the separation of the business logic from the framework, the use of the Dependency Inversion Principle, and the use of the Dependency Injection pattern. The services could be splited even more into use cases to follow the Clean Architecture, but I decided to keep it simple.
- **GoF Design Patterns**: I used the Factory Method pattern to create the entities, and the Adapter pattern to create basically everything on the server side.
- **General Design Patterns**: I used the Dependency Injection pattern to handle with the dependencies of the application, and the Singleton pattern to handle with the database connection.
- **DDD Patterns**: I used the Repository pattern to handle with the data persistence, and the Specification pattern to handle with the business rules.
- **DDD**: I used the Domain Driven Design to handle with entities, value objects, repositories, and separation of concerns. Besides that, I also implemented a model of notification pattern to handle with errors and validations.
- **TDD**: I used the Test Driven Development to develop the business logic of the application, and to ensure that the application is working as expected.
- **In-Memory Repository**: I used an in-memory repository to store the data, but it could be easily replaced by a database repository, for example.
- **Clean Code**: I tried to keep the code as clean as possible, following the best practices of the industry.
- **Clean Commit**: I tried to keep the commits as clean as possible, following the best practices of the industry.

### Disclaimers

- **Disclaimer about tRPC**: I used tRPC just to create the rest layer of the application.
- **Disclaimer about React Context API**: I used the React Context API, like the challenge description said, but I really didn't like the result. I would prefer to uso other approach, like the ReactQuery cache management, for example. The application doesn't have a lot of states to explain the use of a state management like Context and it hurts the separation of concerns, everything could be handled with a little of dependency injection.

### How to run

To run the application, you will need to have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v20.6.0 or higher)

I left a `docker-compose.yml` file in the root of the project to help you to run, but you can also run the application without Docker. To run the application with Docker you just need to run the following command:

```bash
docker-compose up
```

After the compose is up, you need to run db:push and db:seed script to migrate database schema and populate the database with fake data. To do that, you need to run the following command:

```bash
yarn db:push && yarn db:seed
```

You will need to run push and seed out of the compose, because it doesn't work well togheter.

If everything was ok, you will be able to access the application on the following URL: http://localhost:3000
