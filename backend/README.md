# BACKEND README

The following command creates a `.eslintrc.json` file in the root of the project. This file is used to configure ESLint. You can read more about it [here](https://eslint.org/docs/user-guide/configuring).
```
npm run eslint -- --init
``` 
The following command runs ESLint on all the files in the `backend` directory and validate them against the rules in `.eslintrc.json`. If there are any errors, they will be displayed in the console.
```
npm run lint
```

Run server with auto reload on file changes using nodemon
```
npm start
```