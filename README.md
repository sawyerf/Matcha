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
- ~~Tester le reset password (psk keypass = null)~~

### Frontend
- ~~Gerer la gestion d'erreur (botif pour pas validation mail ou pas profil complet)~~
- ~~Faire quelque chose si il n'y a plus de offer~~
- ~~Faire les recherche sort~~
- ~~Liste visit et like~~
- ~~Reset password~~
- ~~Geolocalisation~~
- ~~Raffraichissement dans otherprofile~~
- ~~Mettre mdp oublie dans le login~~
- ~~Mobile (?)~~
- ~~Menu a gauche taille firefox~~
- ~~Mauvais message d'erreur: Quand changement mail pour un deja utiliseri~~
- ~~Quand on recoit une nouvelle notif elle est pas ajoute dans les notif recentes~~
- ~~Rien ne dit qu'il y a de nouvelle notif (pastille)~~
- ~~Quand le token a expire bug graphic (example de token expire: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQGxvbC5jb20iLCJpYXQiOjE2fQ.Jm1TI3bfoxcHqjMkhJ41rKSl4F5RRViurQfIY7gCscQ`)~~
- ~~Quand token expire et qu'on va sur le login ca nous redirige vers le profil~~
- ~~La longitude et latitude ne sont pas affiche dans la modif profil~~
- ~~Quand le mail n'est pas valide et qu'on essaye d'acceder au offer il y a pas de message d'erreur~~:
- ~~On peut pas like les Personne qui nous on like dans le menu a gauche~~
- Warning et error
- Quand on recoit un message ca ne defile pas
- ~~Pas d'appel a readnotif pour dire que les notif on etait lu (/api/profil/readnotif)~~
- Quand on fait une recherche avec aucun resultat et qu'on le trie ca creer une erreur (ca depends)
- ~~ Margin plus grande recherche~~
- ~~Prendre tout la largeur pour lescomposant de recherche~~
- ~~Prendre plus de place pour le modif profil~~
- ~~Prendre plus de place pour le otherprofile~~
- Photo message sont etire et pas croper
- ~~Bug affichage message en haut~~
- "A Geolocation request can only be fulfilled in a secure context."
- ~~Rouge plus rouge pour les notifs~~
- Notif state pour visit/like/match

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
