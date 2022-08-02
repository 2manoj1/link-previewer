# Link Previewer

[Link Previewer Demo App -> Click here](https://link-previewer-sigma.vercel.app)

<table>
  <tr>
    <th>Page 1</th>
    <th>Page 2</th>
  </tr>
  <tr>
    <td><img width="1512" alt="Link Preview page 1" src="https://user-images.githubusercontent.com/15128569/182340321-dbd6db9e-1535-4d8e-8658-5db7cf44ccba.png"></td>
     <td><img width="1512" alt="Link Preview Details page" src="https://user-images.githubusercontent.com/15128569/182340417-ab327b8f-9939-477f-a5cf-e1034c259297.png"></td>
  </tr>
</table>

Demo: 

https://user-images.githubusercontent.com/15128569/182339581-bc769602-37d5-46f8-92be-976944757791.mov


Build using [Remix Stacks](https://remix.run/stacks).

```sh
npx create-remix --template remix-run/blues-stack
```

## What's in the stack

- [Multi-region Fly app deployment](https://fly.io/docs/reference/scaling/) with [Docker](https://www.docker.com/)
- [Multi-region Fly PostgreSQL Cluster](https://fly.io/docs/getting-started/multi-region-databases/)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

- Deployed vercel with Prisma cloud and Heroku PostgreSQL [Visit](https://link-previewer-sigma.vercel.app)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Quickstart

Click this button to create a [Gitpod](https://gitpod.io) workspace with the project set up, Postgres started, and Fly pre-installed

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

## Development

- This step only applies if you've opted out of having the CLI install dependencies for you:

  ```sh
  npx remix init
  ```

- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  yarn docker
  ```

  > **Note:** The yarn script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Initial setup:
  (Data proxy prisma)

  ```sh
    npx prisma generate --data-proxy
  ```

  or (If only local database)

```sh
    yarn setup
```

- Run the first build:

  ```sh
  yarn build
  ```

- Start dev server:

  ```sh
  yarn dev
  ```

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `yarn typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `yarn format` script you can run to format all files in the project.
