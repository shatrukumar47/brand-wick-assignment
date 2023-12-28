# Brand-Wick Coding Assignment

## Introduction
  Users can register swiftly with our simple sign-up process. Your data is safeguarded through secure sign-up APIs and JWT authentication.
  
## Deployed App

[netlify](https://unique-tulumba-dbf463.netlify.app/)
##
[backend](https://brand-wick-backend.onrender.com/)

## Features

- Signup
- Unique Username Availability Check
- Login
- Form Validation

## Installation & Getting started

### Backend
Use your own ***.env*** file and include ***mongoURL***, ***JWT_SECRET***, ***saltRounds***
```bash
git clone https://github.com/shatrukumar47/brand-wick-assignment/tree/main/backend
npm install
npm run server
```

### Frontend
```bash
git clone https://github.com/shatrukumar47/brand-wick-assignment/tree/main/frontend
npm install
npm run start
```

## API Endpoints
***api : https://brand-wick-backend.onrender.com/***

### User Route

```
POST - api/user/register - User Registration - req.body ({name:String, username:String, phone:String, email:String, password:String }) - response ({message: String, action: boolean})
POST - api/user/login - User Login - req.body ({ email:String, password:String }) - response ({message:String, username:String, accessToken:String, action: boolean})
GET - api/user/check-username/:username - No req.body - response ({message: String, action: boolean})
```

## Technology Stacks

### Backend
 Node.js | Express.js | MongoDB | Mongoose | JWT | bcrypt

### Frontend
 React | ChakraUI | Redux | Thunk


## Snaps
### Home

### Signup

### Login










 
