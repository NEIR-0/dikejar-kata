# Lodging API Documentation

GCP IP:

DOMAIN:

Test using Postman (import): https://api.postman.com/collections/11206461-9105a897-a0f0-4865-961c-e5a1773e7044?access_key=PMAT-01HFRGDM1FP34PVVBRGTMD7GKK

&nbsp;

## Models :

_Players_

```
- username: string, unique, required
```

_Games_

```
- title: string, required
- language: en | id, default: id
- status: string, required, default: "waiting"
- GameMasterId: number, required
```

_GamePlayers_

```
- PlayerId: number, required
- GameId: number, required
- isDefeated: boolean, default: false
```

_GameResult_

```
- GameId: number, required
- WinnerId: number, required
```

&nbsp;

## Endpoints :

List of available endpoints:

- `POST /register`
- `GET /games`
- `POST /games`
- `GET /games/:gameId`
- `POST /games/:gameId`
- `GET /games/:gameId/start`
- `GET /games/:gameId/result`

&nbsp;

# Routes

## 0. GET /checkSession/:gameId

Description:

- Checks if selected game is available

parameters:

- gameId: integer

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game already started / ended"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 1. POST /register

Description:

- Logs user in using username, automatically registers user if not registered

- body:

```json
{
  "username": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 2. GET /games

Description:

- Get All available games

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "games": [
    {
      "id": "number",
      "language": "id | en",
      "gameMaster": {
        "username": "string"
      }
    },
    ...
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 3. POST /games

Description:

- Creates new game room

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

```json
{
  "title": "string",
  "language": "id | en"
}
```

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please sign in"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 4. GET /games/:gameId

Description:

- Joins into game and get game with desired gameId

parameters:

- gameId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "title": "string",
    "players": ["string", ...],
    "status": "playing | waiting | ended"
  },
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Room full"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game already started / ended"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 5. GET /games/:gameId/start

Description:

- Starts game by gameId

_Response (200 - OK)_

```json
{
  "startIndex": "number"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game already started / ended"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 6. GET /games/:gameId/result

Description:

- Get game result

_Response (200 - OK)_

```json
{
  "result": {
    "winner": "string"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Please sign in"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
