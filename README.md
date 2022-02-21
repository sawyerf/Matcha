# Matcha

- https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/

```
docker-compose -f docker-compose.yml up -d
```

## API
| Method | url                | Description         |
|:------:|--------------------|---------------------|
| POST   | [/auth/login   ]() | Login               |
| POST   | [/auth/register]() | Register            |
| POST   | [/auth/check   ]() | Check if login      |
| POST   | [/action/like  ]() | Like a user         |
| GET    | [/users/matchs ]() | Get my match        |
| GET    | [/user/likes   ]() | Get all like I recv |
| GET    | [/user/offer   ]() | Get a next user     |

### /auth/login
```json
{
    "username": "user1",
    "password": "Password*0"
}
```
### /auth/register
```json
{
    "email": "user@lol.com",
    "username": "user1",
    "password": "Password*0",
    "age": "2000-02-02T00:00:00.000Z"
}
```
### /action/like
```json
{
    "id_liked": 3,
    "islike": true
}
```