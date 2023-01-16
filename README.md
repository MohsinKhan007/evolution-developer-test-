## Muhammad Mohsin

# Game Developer Test

# Prerequisites

-   Install [Node.js](https://nodejs.org/) version >16.9.1

# Getting Started

-   Install dependencies

```
npm install
```

-   Run the project

```
npm run start
```

The client is accessible here: Navigate to `http://localhost:1234`.

The server is listening on port 3000, you can use a rest client to test it: `http://localhost:3000/spin`

Both projects will hot reload on any code change.

# Solution Description

The solution is made on Vanialla TypeScript and Node Express.js. The solution is completed per requirment.

## Backend

-   Backend is Developed in Express.js and class is made along with SlotMachine interface.
-   Class is used for calculate reels data, possible win from that data ,bonus

#### Files

-   `server.ts` main file to host the server
-   `SlotMachineClass.ts` class for generating the backend solution with possible functions
-   `serverFunctions.js` file to add multiple functions for using in the server Class

## Client

-   `index.ts` File to contain all Font-end solution divided into functions and comments
-   CSS styling is used to handle the frontend side of design

##Solution Limitations

-   As solution is made in vanilla typeScript, I decided to go with CSS
-   I do not any experience in WEBGL libraries like PIXIJS etc but will able to learn and implement from the get go
-   Solution client side is not divided into multiple file that could confuse the reviewer. But multiple function breakdown, small code refactoring and error handling is done
-   The solution do not have any unit tests. I worked in TDD enviornment for React.js development and didn`t opted for adding unit tests but can tell how to implement the tests and work the code
-   Using CSS limits you ability to add animation in the front-end solution. Implementing simple things take time and effort

##Decisions Made

-   Opted for vanilla typeScript and didn`t use any WEBGL library
-   Divided the constants into seperate file and used in frontend and backend
-   Used Class for backend solution and used interface for the Class .
-   CSS classes for animation and design

## How to Launch Solution

1. Download or take clone of the project
2. run `npm install`
3. run `npm start`
4. `npm run clean` for cleaning the dist files

## Submitting your solution

Please push your changes to the `main branch` of this repository. You can push one or more commits. <br>

Once you are finished with the task, please click the `Submit Solution` link on <a href="https://app.codescreen.com/candidate/f3137c5d-b91f-4b96-a447-6a7f6622212b" target="_blank">this screen</a>.
