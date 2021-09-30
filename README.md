# InterestCloud

### !!! `Project no longer supported`

#### "A news portal that finds the best news for you"

**InterestCloud** is a **full-stack** news portal web application that is following **MERN stack:**

- MongoDB - document database
- Express.js - Node.js web framework
- React.ts - a client-side TypeScript framework
- Node.js - the premier JavaScript web server

 ... architectural pattern.
 
  <strike>**Deployed version: [http://www.gustavsjj.id.lv](http://www.gustavsjj.id.lv)**</strike>
 > Note: deployed version could be some versions behind main branch version.
 
 ## MongoDB and JWT configutarion
 This repository excludes file ***config/default.json*** which contains two variables - **mongoURI** and **jwtSecret**
 ```sh
 {
    "mongoURI": "mongodb+srv://<username>:<password>@<cluster-name>.desnw.mongodb.net/Main?retryWrites=true&w=majority",
    "jwtSecret": "<secret-string>"
 }
 ```
 - To use mongoDB services it is required to register on [www.mongodb.com](https://www.mongodb.com/), create a cluster and paste the cluster URI inside ***config/default.json***.
 - ***jwtSecret*** is a string that is used to sign tokens. This string can be random, e.g., "asdfghjkl12345!", but should not be published outside the project for security reasons.

## Available Scripts

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view the front-end application \
while back-end runs on [http://localhost:5000](http://localhost:5000).

### `npm run client`

Runs only the front-end part of the application.

### `npm run server`

Runs only the back-end part of the application.

----

Author: [GustavsJJ]

[GustavsJJ]: <https://github.com/GustavsJJ>
