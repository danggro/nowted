# API Specification

## Register Page

### Create User

Request :

- Method : POST
- Endpoint : `/api/users`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": {
    "id": "int, unique",
    "email": "string",
    "username": "string"
  }
}
```

## Login Page

### Login

Request :

- Method : POST
- Endpoint : `/api/login`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :

```json
{
  "username": "string",
  "password": "string"
}
```

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": {
    "id": "int, unique",
    "email": "string",
    "username": "string",
    "token": "string"
  }
}
```

## Main Page

### Create Note

Request :

- Method : POST
- Endpoint : `/api/notes`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authentication : "Bearer token"
- Body :

```json
{
  "id": "int, unique",
  "title": "string",
  "date": "date",
  "content": "string"
}
```

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": {
    "id": "int, unique",
    "title": "string",
    "date": "date",
    "content": "string"
  }
}
```

### Get Note

Request :

- Method : GET
- Endpoint : `/api/notes/{note_id}`
- Header :
  - Accept : application/json
  - Authentication : "Bearer token"

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": {
    "id": "int, unique",
    "title": "string",
    "date": "date",
    "content": "string"
  }
}
```

### Update Note

Request :

- Method : PUT
- Endpoint : `/api/notes/{note_id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authentication : "Bearer token"
- Body :

```json
{
  "title": "string",
  "date": "date",
  "content": "string"
}
```

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": {
    "id": "int, unique",
    "title": "string",
    "date": "date",
    "content": "string"
  }
}
```

### List Note

Request :

- Method : GET
- Endpoint : `/api/notes`
- Header :
  - Accept : application/json
  - Authentication : "Bearer token"

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": [
    {
      "id": "int, unique",
      "title": "string",
      "date": "date",
      "content": "string"
    },
    {
      "id": "int, unique",
      "title": "string",
      "date": "date",
      "content": "string"
    }
  ]
}
```

### Delete Note

Request :

- Method : DELETE
- Endpoint : `/api/notes/{note_id}`
- Header :
  - Accept : application/json
  - Authentication : "Bearer token"

Response :

```json
{
  "code": "number",
  "status": "string"
}
```

### Logout

Request :

- Method : DELETE
- Endpoint : `/api/login/{user_id}`
- Header :
  - Accept : application/json
  - Authentication : "Bearer token"

Response :

```json
{
  "code": "number",
  "status": "string"
}
```
