# Okuru Web UI

## About the Project

The UI for `Okuru` is a SSR `React` application served via `Docker`.

### Built with

#### Frameworks

- [React][react]
- [Next.js][nextjs]
- [Chakra UI][chakra ui]

#### State

- `useState/useReducer` for any simple local state
- [Apollo Client][apollo client] for API data fetching state
- [Zustand][zustand] for any left over global state (mainly for _lightweight_
  package size & minimalist API vs. Redux)
- [React Hook Form][react hook form] for managing form state and validation.

## Getting Started

### Prerequisites

- `node` - recommended to use `nvm` for managing correct node versions
- `npm`
- Local db instance running via docker. Simply run `docker-compose up` within
  the root directory of `./okuru/`
- Local backend server running by running the following command within the
  `./okuru/api/` folder: `npm run start:dev`. This will start an `express.js`
  server at http://localhost:5000

### Installation

To start the `Next.JS` server, run the following command:

```bash
npm run dev
```

Then head to http://localhost:3000 to access the local dev server.

## GraphQL Code Gen Flow

This project uses [GraphQL Code Generator][graphql-code-gen] to automatically
generate `Typescript` types along with `apollo client`-based `Query` and
`Mutation` hooks for fetching data.

### Initial Setup

- Ensure `GraphQL` package is installed:

  ```bash
  npm i graphql
  ```

- Install `GraphQL Code Generator` as a dev package:

  ```bash
  npm install -D @graphql-codegen/cli
  ```

- Run the initialization wizard and answer the prompts.

  ```bash
  npx graphql-codegen init
  ```

- You should get a `./codegen.yml` file now looking like the one below in your
  root directory

  ```yml
  # ./codegen.yml
  overwrite: true
  schema: "http://localhost:5000/graphql"
  documents: "./src/graphql/**/*.graphql"
  generates:
  ./src/generated/graphql.tsx:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
  ```

- Run `npm i` to install the required plugins for `Typescrip` and `Apollo`

### Codegen flow

When we are required to make a new `Query` or `Mutation` request from the
server, place the query inside of a new `.graphql` schema file in the respective
folder locations:

- `./src/graphql/queries/`
- `./src/graphql/mutations/`

Then simply run the following command to update the content inside of
`./src/generated/graphql.tsx` to update the generate `types` and `hooks`:

```bash
npm run generate
```

Now you should be able to access the **_exact types_** from the server `GraphQL`
schema within your React components.

<!-- MARKDOWN LINKS -->

[graphql-code-gen]: https://www.graphql-code-generator.com/
[react]: https://reactjs.org/
[nextjs]: https://nextjs.org/
[chakra ui]: https://chakra-ui.com/
[zustand]: https://github.com/pmndrs/zustand
[apollo client]: https://www.apollographql.com/docs/react/
[react hook form]: https://react-hook-form.com/
