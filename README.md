# Brand-Wick Coding Assignment

## Introduction
  Users can register swiftly with our simple sign-up process. Your data is safeguarded through secure sign-up APIs and JWT authentication.
  
## Deployed App

[vercel](https://brand-wick-cdxhatwyv-shatrughan-kumars-projects.vercel.app/login)
##
[backend](https://brand-wick-backend.onrender.com/)

## Features

- Signup
- Unique Username Availability Check
- Login
- Logout with Blacklisting Token
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
![1](https://github.com/shatrukumar47/brand-wick-assignment/assets/123942835/1503cbc9-7f80-453e-9654-acf3165d6c57)

### Login
![2](https://github.com/shatrukumar47/brand-wick-assignment/assets/123942835/05f2981c-0c1a-4a11-b3e2-a335b42144ed)

### Signup
![3](https://github.com/shatrukumar47/brand-wick-assignment/assets/123942835/bc340de1-72e5-44f2-97cd-706fe6c4214a)










 
