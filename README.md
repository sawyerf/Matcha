# Matcha

## Install
### DB
```
docker-compose -f docker-compose.yml up -d
```

- run database.sql

### Backend
```
cp .env.example .env
npm i
npm run seed
```

### Frontend
```
cp .env.example .env
npm i
```

## Run
```
npm start
```

## Screen

![](https://i.imgur.com/6jf3rUA.png)
![](https://i.imgur.com/zwyRKI3.png)
![](https://i.imgur.com/3b6UD3a.png)
![](https://i.imgur.com/I0BRfzH.png)
![](https://i.imgur.com/Tw3lUfh.png)

## Link
- https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/
- https://ethereal.email/


## API
| Method | url                         | Description              |
|:------:|-----------------------------|--------------------------|
| POST   | [/auth/login            ]() | Login                    |
| POST   | [/auth/register         ]() | Register                 |
| POST   | [/auth/check            ]() | Check if login           |
|        |                             |                          |
| POST   | [/action/like           ]() | Like a user              |
| POST   | [/action/report         ]() | Report User              |
| POST   | [/action/block          ]() | Block User               |
|        |                             |                          |
| GET    | [/users/matchs          ]() | Get my match             |
| GET    | [/users/offer           ]() | Get a next user          |
| POST   | [/users/search          ]() | Search user              |
| POST   | [/users/visit           ]() | Visit a user             |
| POST   | [/users/bihistory       ]() | List of visit,like,matchs|
|        |                             |                          |
| GET    | [/profil/me             ]() | Get my info              |
| POST   | [/profil/setinfo        ]() | Set Info after register  |
| POST   | [/profil/changepassword ]() | Change Password          |
| POST   | [/profil/changemail     ]() | Change Mail              |
| POST   | [/profil/setlocation    ]() | Set location             |
| POST   | [/profil/readnotif      ]() | Read Notif               |
| POST   | [/profil/image          ]() | Upload Image             |
| DEL    | [/profil/image          ]() | Delete Image             |
|        |                             |                          |
| GET    | [/no/validmail/:key     ]() | Valid Mail               |
| POST   | [/no/resetpass/:key     ]() | Reset Password           |
| POST   | [/no/askreset           ]() | Ask Reset Password       |
|        |                             |                          |
| GET    | [/message/room          ]() | Get all message          |
| POST   | [/message/send          ]() | Send a message           |
