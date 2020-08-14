# Desklab Back Office
Backoffice Desklab migrate new master-ui and frontend framework

## Information

* Swagger Intranet : http://172.18.186.48:8082/admin/docs
* Staging Intranet : http://172.18.186.48:8085
* Staging Internet : http://bo.desklab.elevenia.tech
* Production : http://desklab.elevenia.co.id
* Figma : https://www.figma.com/file/E1hgiYjCuECreBDWj4Whio/3.1-Desklab
* SBD : https://drive.google.com/file/d/1SNcvojyTMb-6ylO3i4tiB9gXteOQ6hyd/view
* Jenkins Staging : http://172.18.186.34:8888/job/Desklab%20Project/job/Development/job/EOF_BackOffice/
* Jenkins Production : http://172.18.186.34:8888/job/Desklab%20Project/job/Production/job/EOF_WebAdminProject/


## Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd {your-path-project}
$ npm install / yarn install
```

Runs the app in the development mode.

```sh
$ npm run start / yarn run start
$ npm run start:staging / yarn run start:staging
$ npm run start:production / yarn run start:production
```

Builds the app for production to the build folder.

```sh
$ npm run build / yarn run build
$ npm run build:staging / yarn run start:staging
$ npm run build:production / yarn run build:production
```

Runs the app in the production mode.

```sh
$ npm install -g serve / yarn global add serve
$ serve -s build
```

## Available Scripts

In the project directory, you can run:

```sh
# Runs the app in the development mode
$ npm start
# Launches the test runner in the interactive watch mode
$ npm test
# Builds the app for production to the `build` folder
$ npm run build
# Copies all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them
$ npm run eject
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

You can learn more :

* [Running Tests](https://facebook.github.io/create-react-app/docs/running-tests).
* [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting).
* [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size).
* [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).
* [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration).
* [Deployment](https://facebook.github.io/create-react-app/docs/deployment).
* [`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).
