## events
CLIENT_JOIN

- data
```json
{
  "gameId": "integer",
  "access_token": "string"
}
```

SERVER_JOINED

- data
```json
{
  "data": {
    "title": "string",
    "players": ["string", ...],
    "language": "id | en",
  }
}
```

CLIENT_START
- data

```json
{
  "gameId": "integer",
  "access_token": "string"
}
```

SERVER_STARTED
- data

```json
{
  "data": {
    "title": "string",
    "playersOrder": [
      {
        "userId": "integer",
        "username": "string"
      }, ...
    ],
    "language": "id | en",
    "status": "playing"
  }
}
```

CLIENT_READY

- No data passed

SERVER_QUESTION

- data

```json
{
  "question": "string",
  "selectedUserId": "integer",
  "selectedIndex": "integer",
  "players": [
    {
      "userId": "integer",
      "username": "string",
      "defeated": "boolean"
    },
    ...
  ],
  "startTime": "integer"
}
```

CLIENT_ANSWER

- data

```json
{
  "gameId": "integer",
  "userId": "integer",
  "answer": "string"
}
```

SERVER_CORRECT

- no data passed

SERVER_WRONG

- no data passed

SERVER_TIMEOUT

- no data passed

SERVER_GAMEOVER
- data
```json
{
  "winner": {
    "username": "string",
    "userId": "integer"
  }
}
```