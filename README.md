
# Crate 👕👖📦

Crate is an open source project where users can get monthly subscriptions of trendy clothes and accessories.
- **API** built with Node, GraphQL, Express, Sequelize (MySQL) and JWT Auth
- **WebApp** built with React and Redux along with Server Side Rendering (SSR) / SEO friendly
- Written in ES6+ using Babel + Webpack

## Project Learning Goals
- Learn and apply strategies for understanding how to analyze a larger, existing code base
- Apply strategies for reading and evaluating documentation
- Explore and implement new concepts, patterns, or libraries that have not been explicitly taught while at Turing
- Practice an advanced, professional git workflow


## Improving UX and Community
Our Group added a feature that allows users to edit their Profile page.  Users can add an image, update their shipping address, add a personal description, and also change their name and email.
<img width="841" alt="Screen Shot 2020-07-12 at 12 43 38 PM" src="https://user-images.githubusercontent.com/44849120/87254152-b790f100-c43d-11ea-8845-9457b263ad8f.png">
<img width="1002" alt="Screen Shot 2020-07-12 at 12 43 17 PM" src="https://user-images.githubusercontent.com/44849120/87254188-f2932480-c43d-11ea-912b-89a89b6c7c1f.png">

## Wins and Challenges
# Wins
  - We gained a greater understanding of how the Front-End UI connects to the Back-End.  By working together, we were able to create two new axios posts to the back end with new user information and an uploaded image.  We were then able to load that new information to the server database, bring the new information back to the front-end, where we updated state and local storage.  Ultimately, the new information is displayed on the page.
# Challenges
  - Understanding the file structure of a larger codebase was initially daunting, but we all now have a greater of understanding of how all of the front end and back end pieces fit together.  One of the biggest challenges for both the FE and BE was being able to implement testing.  For the BE, they were using a new testing library and testing in new languages, and for the FE they were using a new global state with testing.

## Screenshots and GIFs
Click on image to view fullscreen and zoom

### Desktop
[IMAGE](https://github.com/atulmy/atulmy.github.io/blob/master/images/crate/desktop-all-with-link.png)

![Crate Desktop](https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/crate/desktop-all-with-link.png)


## Setup and Running
- Prerequisites
  - Node
  - MySQL (or Postgres / Sqlite / MSSQL)
- Clone repo `git clone git@github.com:atulmy/crate.git crate`
- Switch to `code` directory `cd code`
- Configurations
  - Modify `/api/src/config/database.json` for database credentials
  - Modify `/api/.env` for PORT (optional)
  - Modify `/web/.env` for PORT / API URL (optional)
  - Modify `/mobile/src/setup/config.json` for API URL (tip: use `ifconfig` to get your local IP address)
- Setup
  - API: Install packages and database setup (migrations and seed) `cd api` and `npm run setup`
  - Webapp: Install packages `cd web` and `npm install`
  - Mobile: 
    1. Install packages `cd mobile` and `npm install`
    2. Install iOS dependencies `cd mobile/ios` `pod install`
- Development
  - Run API `cd api` and `npm start`, browse GraphiQL at http://localhost:8000/
  - Run Webapp `cd web` and `npm start`, browse webapp at http://localhost:3000/
  - Run Mobile `cd mobile` and `npx react-native run-ios` for iOS and `npx react-native run-android` for Android
- Production
  - Run API `cd api` and `npm run start:prod`, creates an optimized build in `build` directory and runs the server
  - Run Webapp `cd web` and `npm run start:prod`, creates an optimized build in `build` directory and runs the server

## Contributors
- Dave Pernitz (Front-End)
- Nick Taylor (Front-End)
- Ray Nguyen (Back-End)
- David Tran (Back-End)







## Author
- Atul Yadav - [GitHub](https://github.com/atulmy) · [Twitter](https://twitter.com/atulmy)

