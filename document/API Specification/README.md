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
  "content": "string",
  "folder_id": "int",
  "favorite": "boolean",
  "archived": "boolean"
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
    "content": "string",
    "folder_id": "int",
    "favorite": "boolean",
    "archived": "boolean",
    "updated_at": "timestamp"
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
    "content": "string",
    "folder_id": "int",
    "favorite": "boolean",
    "archived": "boolean",
    "updated_at": "timestamp"
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
  "content": "string",
  "folder_id": "int",
  "favorite": "boolean",
  "archived": "boolean"
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
    "content": "string",
    "folder_id": "int",
    "favorite": "boolean",
    "archived": "boolean",
    "updated_at": "timestamp"
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
      "content": "string",
      "folder_id": "int",
      "favorite": "boolean",
      "archived": "boolean",
      "updated_at": "timestamp"
    },
    {
      "id": "int, unique",
      "title": "string",
      "date": "date",
      "content": "string",
      "folder_id": "int",
      "favorite": "boolean",
      "archived": "boolean",
      "updated_at": "timestamp"
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

### Add Note into a Folder

Request :

- Method : POST
- Endpoint : `/api/folder/?notes_id={notes_id}&folder_id={folder_id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authentication : "Bearer token"
- Body :

```json
{
  "id": "int, unique",
  "title": "string",
  "name_folder": "string"
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
    "name_folder": "string"
  }
}
```

### Move Note into Another Folder

Request :

- Method : UPDATE
- Endpoint : `/api/folder/?notes_id={notes_id}&folder_id={folder_id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authentication : "Bearer token"
- Body :

```json
{
  "id": "int, unique",
  "title": "string",
  "name_folder": "string"
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
    "name_folder": "string"
  }
}
```

## Folder Feature

### Create Folder

Request :

- Method : POST
- Endpoint : `/api/folder`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authentication : "Bearer token"
- Body :

```json
{
  "id": "int, unique",
  "user_id": "int, unique",
  "name": "string"
}
```

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": {
    "id": "int, unique",
    "user_id": "int, unique",
    "name": "string"
  }
}
```

### Get Folder

Request :

- Method : GET
- Endpoint : `/api/folder/{folder_id}`
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
    "user_id": "int, unique",
    "name": "string"
  }
}
```

### Delete Folder

Request :

- Method : DELETE
- Endpoint : `/api/folder/{folder_id}`
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
