# Invoice Management System

## Backend (Invoice API)

This is the backend service for the Invoice Management System. Built with NestJS, it provides authentication and invoice APIs using PostgreSQL and Prisma ORM.

## 📦 Tech Stack

- [NestJS](https://docs.nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT + Passport](https://docs.nestjs.com/recipes/passport)
- [Class Validator](https://github.com/nestjs/class-validator)
- [Docker (for database)](https://hub.docker.com/_/postgres)

## Frontend (Invoice UI)
This is the frontend for the Invoice Management System. Built with Vite, React, and TypeScript.
## 📦 Tech Stack
- [Vite + React](https://vite.dev/guide/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)

---

# 🚀 Setup Instructions

### **Clone Repo**
```bash
  git clone https://github.com/RazvanTinca/Invoice-Management-System.git razvan-tinca-assessment && cd razvan-tinca-assessment
````
## Ports Required
- **Backend**: `8080`
- **Frontend**: `5173`
- **PostgreSQL**: `5432`


### Backend
1. **Go to Backend Directory**
    ```bash
      cd server
    ```

2. **Install Dependencies**

    ```bash
      npm install
    ```
3. **Environment Setup**
   - Create a `.env` file in the `server` directory.
    ```bash
      cp .env.example .env
    ```
4. **Database Setup with Docker**
    ```bash
      cd .. && docker-compose up -d && cd server
    ```

5. **Prisma Setup**
    ```bash
      npx prisma generate
      npx prisma migrate dev --name init
      npx prisma db seed
    ```
   
6. **Start the Server**
    ```bash
      npm run start:dev
    ```


### Frontend
1. **Go to Frontend Directory**
    ```bash
      cd client
    ```
2. **Install Dependencies**
    ```bash
      npm install
    ```
3. **Environment Setup**
   - Create a `.env` file in the `client` directory.
    ```bash
      cp .env.example .env
    ```
    - Generate the API client using the OpenAPI spec and `openapi-generator-cli`. ❗**FOR THIS BACKEND NEEDS TO BE ON**❗
    ```bash
      npm run api
    ```
4. **Start the Frontend**
    ```bash
      npm run dev
    ```

### Run Concurrently
You can run both the backend and frontend concurrently using `concurrently`:
```bash
  cd server
  npm run start:concurrently
```

---

## 📄 Seed User Credentials

- **Email**: `john.doe@example.com`
- **Password**: `john.doe`

---

## 📘 API Endpoints
Also available in the OpenAPI spec at [http://localhost:5000/api](http://localhost:5000/api).

| Endpoint                               | Method | Description                       |
|----------------------------------------|--------|-----------------------------------|
| `/auth/register`                       | POST   | Register a user                   |
| `/auth/login`                          | POST   | Authenticate a user               |
| `/auth/refresh`                        | PATCH  | Refresh a token                   |
| `/invoice/create`                      | POST   | Create an invoice                 |
| `/invoice/id/:id`                      | GET    | Retrieve a single invoice by ID   |
| `/invoice/all`                         | GET    | Retrieve all invoices             |
| `/invoice/all/pagination/:page/:limit` | GET    | Retrieve invoices with pagination |
| `/invoice/update/:id`                  | PATCH  | Update an existing invoice        |
| `/invoice/delete/:id`                  | DELETE | Delete an invoice                 |


## 📝 Assignment Checklist:
- Backend
  - [x] Create a backend API using Node.js with Nest.js in TypeScript. https://docs.nestjs.com/first-steps
  - [x] Node with Nest, Prisma https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres
  - [x] Use JWT with Passport. https://docs.nestjs.com/recipes/passport
  - [x] Use Zod or Class validators for DTOs https://zod.dev/ or https://github.com/nestjs/class-validator
  - [x] Create 3 api routes:
    - [x] /invoices - Displays a list of invoices fetched from the backend API.
    - [x] /invoices/:id : - Display an individual invoice.
    - [x] /auth: login
  - [x] Use PostgreSQL
    - [x] Use Docker to set it up.
  - [x] Use Prisma ORM to access your data.
  - [x] Use Prisma to seed all demo data.
    - [x] Provide a username and password for login in the documentation/ ReadMe.
  - [x] Bonus/Optional: Implement pagination middleware.
  - [ ] Bonus/Optional: Middleware for logging.
  - [x] Bonus/Optional: Good use of exceptions.
  - [ ] Bonus/Optional: Use vitest (or jest) to write unit tests.
  - [x] Create a proper Readme.
  

- Frontend
  - [x] Set up a React application using [@vite](https://vite.dev/guide/). 
    - [x] Use TypeScript + React when creating a project using Vite.
  - [x] Use [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) for state management. 
  - [x] Use [Axios](https://axios-http.com/docs/intro) for API requests. 
  - [x] Use [React Query](https://tanstack.com/query/latest/docs/framework/react/installation) for managing API calls.
  - [x] Use [Zod](https://zod.dev/?id=installation) for frontend Validation and [Tailwind](https://tailwindcss.com/docs/guides/vite) for styling.
  - [x] Create two main routes/pages.
    - [x] Login Page.
      - [x] /invoices: Displays a list of invoices fetched from the backend API.
        - [x] You can use MUI, Shadcn, or TanStack Table, whichever is easiest for you.
        - [x] Clicking on a row of an invoice should open a pop-up/modal to show its details.
  - [x] Implement a pop-up/modal to display individual invoice info.
  - [x] Bonus/Optional: Implement error handling for potential failed API requests.
  - [x] Bonus/Optional: Implement pagination.
  - [ ] Bonus/Optional: Playwright test to test auto logging in and checking if the invoice page has invoices. Keep it simple.
  - [x] Create a proper Readme.


- Others
  - [x] Use ESLint and Prettier for code formatting and linting.
  - [x] Full CRUD functionality for invoices.
    - [x] Create an invoice.
    - [x] Read an invoice.
      - [x] Read by ID. (used for modal)
      - [x] Read all invoices.
      - [x] Read all with pagination.
    - [x] Update an invoice.
    - [x] Delete an invoice.
  - [x] Registering a user. [/register](http://localhost:3000/register)
  - [x] Refresh-token functionality for more secure authentication.
    - [x] Use a JWT guard to protect routes on backend.
    - [x] Use a JWT interceptor to `add` the token to requests on the frontend, if the route is in `<RequireAuth />`.
    - [x] Use axios interceptors to handle token refresh `silently` on the frontend.
  - [x] Use [React Toastify](https://www.npmjs.com/package/react-toastify) for notifications.
  - [x] Use [OpenAPI Swagger](https://www.npmjs.com/package/@nestjs/swagger) to generate the API Docs for the Backend.
  - [x] Use [OpenAPI Generator CLI](https://www.npmjs.com/package/@openapitools/openapi-generator-cli) to generate the API client for the frontend.
  - [x] Use [useHooks](https://usehooks.com/) for custom hooks. Such as `useClickAway()` used for exiting the modal when clicking outside of it.
## 📂 Folder Structure

```
/server
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── app.module.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── decorator
│   │   │   ├── index.ts
│   │   │   └── user.decorator.ts
│   │   ├── dto
│   │   │   ├── authResponse.dto.ts
│   │   │   ├── index.ts
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── tokens.dto.ts
│   │   ├── guard
│   │   │   ├── index.ts
│   │   │   └── jwt.guard.ts
│   │   └── strategy
│   │       ├── index.ts
│   │       └── jwt.strategy.ts
│   ├── invoice
│   │   ├── dto
│   │   │   ├── create.dto.ts
│   │   │   ├── index.ts
│   │   │   ├── invoice.dto.ts
│   │   │   ├── pagination.dto.ts
│   │   │   └── update.dto.ts
│   │   ├── invoice.controller.ts
│   │   ├── invoice.module.ts
│   │   └── invoice.service.ts
│   ├── jwt
│   │   ├── my-jwt.module.ts
│   │   └── my-jwt.service.ts
│   ├── main.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── user
│       ├── user.controller.ts
│       └── user.module.ts
├── tsconfig.build.json
└── tsconfig.json

/client
├── .env
├── eslint.config.js
├── index.html
├── openapitools.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
├── README.md
├── src
│   ├── api-client
│   ├── app
│   │   └── axios.ts
│   ├── App.tsx
│   ├── components
│   │   ├── InvoiceTable.tsx
│   │   ├── ui
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   └── util
│   │       ├── RequireAuth.tsx
│   │       └── TablePagination.tsx
│   ├── hooks
│   │   └── useAxiosPrivate.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── Register.tsx
│   │   └── Test.tsx
│   ├── services
│   │   ├── authService.tsx
│   │   └── invoiceService.tsx
│   ├── state
│   │   ├── authSlice.ts
│   │   └── store.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
