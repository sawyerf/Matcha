# Matcha

- https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/
- https://ethereal.email/

```
docker-compose -f docker-compose.yml up -d
```

## TODO
### Backend
- ~~Erreur register lastname/firstname~~
- ~~Empecher de faire action si pas assez info ou mail non valide~~
- ~~Check si 18 ans~~
- ~~Bien set le profil is OK~~
- ~~Faire la seed pour les images~~
- ~~Reparer les regex~~
- ~~Block les reports~~
- ~~Ajouter si offer a like~~
- ~~Faire le truc de popularite~~
- ~~Faire les socket message + notif~~
- ~~Rendre possible de delike un match~~
- ~~Ameliorer la verif du token~~
- ~~Faire la validation des images~~ ??
- ~~Consultation des visite~~
- ~~Notif quand delike match~~
- ~~Voir si utilisateur est en ligne~~
- ~~Faire la geolocalisation~~
- ~~List visit plus info~~
- ~~Notif non lu~~
- ~~change keypass after~~
- Tester le reset password (psk keypass = null)

### Frontend
- ~~Gerer la gestion d'erreur (botif pour pas validation mail ou pas profil complet)~~
- ~~Faire quelque chose si il n'y a plus de offer~~
- ~~Faire les recherche sort~~
- ~~Liste visit et like~~
- Reset password
- ~~Geolocalisation~~
- ~~Raffraichissement dans otherprofile~~
- ~~Mettre mdp oublie dans le login~~

## API
| Method | url                         | Description             |
|:------:|-----------------------------|-------------------------|
| POST   | [/auth/login            ]() | Login                   |
| POST   | [/auth/register         ]() | Register                |
| POST   | [/auth/check            ]() | Check if login          |
|        |                             |                         |
| POST   | [/action/like           ]() | Like a user             |
| POST   | [/action/report         ]() | Report User             |
| POST   | [/action/block          ]() | Block User              |
|        |                             |                         |
| GET    | [/users/matchs          ]() | Get my match            |
| GET    | [/users/likes           ]() | Get all like I recv     |
| GET    | [/users/offer           ]() | Get a next user         |
| GET    | [/users/search          ]() | Search user             |
|        |                             |                         |
| POST   | [/profil/setinfo        ]() | Set Info after register |
| POST   | [/profil/changepassword ]() | Change Password         |
|        |                             |                         |
| GET    | [/no/validmail/:key     ]() | Valid Mail              |
| POST   | [/no/resetpass/:key     ]() | Reset Password          |
| POST   | [/no/askreset           ]() | Ask Reset Password      |

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

### /users/search
```json
{
    "minAge": 18,
    "maxAge": 33,
    "minPopularity": 0,
    "maxPopularity": 100,
    "maxDistance": 5,
    "tags": [
        "#des"
    ]
}
```

### /profil/setinfo
```json
{
    "gender": "F",
    "sexuality": "FH",
    "tags": "#des,#barres,#lolipop",
    "bio": "je suis dans un plaisir constant"
}
```

### /users/block /users/report
```json
{
    "username": "user2"
}
```

### /no/resetpass/:key
```json
{
    "new_password": "Password*0"
}
```

### /api/no/askreset
```json
{
    "email": "user@lol.com"
}
```
