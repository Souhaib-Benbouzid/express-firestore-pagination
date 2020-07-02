# serverside firestore items pagination using Node, express

this is a simple budget friendly pagination implementation with authentication . since firestore charges for the reads when useing offset method.

Note: firebase supports Node 10.x and that's what we will be using here

## setup

### 1. clone the repository

git clone <https://github.com/Souhaib-Benbouzid/express-firestore-pagination>

### 2. install depedencies

$ yarn global add firebase-tools
$ firebase init
$ cd functions && yarn
$ cd functions && yarn add express

### 3. add configiration files

cd utils and past your serviceAccountKey.json
cd utils and past your firbaseConfig.js

### 4. items Collections in firestore

its mandatory that your add a createdAt field with type timestamp in your documents.

the items will be paginated based on the createdAt field

## requests && responses

BASE_URL = HOST/api

### GET /items

start page

### request next page

GET /items

bearer token

```json
{
  "lastVisible": "2020-07-01T21:00:13.027Z"
}
```

### request prev page

GET /items

bearer token

```json
{
  "firstVisible": "2020-07-01T21:00:05.909Z"
}
```

### response

```json
{
  "FirstAndLast": {
    "firstVisible": "2020-07-01T21:00:05.909Z",
    "lastVisible": "2020-07-01T21:00:13.027Z"
  },
  "projects": {
    "totalNumber": 3,
    "elements": [
      {
        "createdAt": "2020-07-01T21:00:05.909Z",
        "userHandle": "admin",
        "description": "this is a description",
        "title": "1",
        "endDate": "2020-06-25T23:52:41.420Z",
        "startDate": "2020-06-25T23:52:41.420Z",
        "status": "TO DO"
      },
      {
        "status": "TO DO",
        "createdAt": "2020-07-01T21:00:09.613Z",
        "userHandle": "admin",
        "description": "this is a description",
        "title": "2",
        "endDate": "2020-06-25T23:52:41.420Z",
        "startDate": "2020-06-25T23:52:41.420Z"
      },
      {
        "startDate": "2020-06-25T23:52:41.420Z",
        "status": "TO DO",
        "createdAt": "2020-07-01T21:00:13.027Z",
        "userHandle": "admin",
        "description": "this is a description",
        "title": "3",
        "endDate": "2020-06-25T23:52:41.420Z"
      }
    ]
  }
}
```

## folders structure

express-firestore-pagination/functions: main folder

index.js is the app main file where you put your routes

express-firestore-pagination/utils: here you find/add helper methods

admin.js: init your firebase-admin / firestore / firebase

paginations.js : pagination helper functions

FBAuth.js : authentication module

express-firestore-pagination/handlers: here you find/add route handlers

items.js: items collection handler
