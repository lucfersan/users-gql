## Add User API

**User Entity**

- id: string (uuid)
- firstName: string
- lastName: string
- username: string (unique)
- age: number
- password: string (hash: bcrypt)

**Add User Use Case**

params: {
  - firstName: string
  - lastName: string
  - username: string
  - age: number
  - password: string
}

result (*REST*): {
  - id: string (uuid)
  - username: string
  - firstName: string
}

**Techs**

- Prisma with Postgres
- Uuid
- Express
- GraphQL: Apollo Server Express

**Testing**

- Jest
- Supertest