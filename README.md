# restaurant-webapp
Angular web application

# RestaurantApp
Connection string is required to connect to MongoDB Atlas which is stored in `/backend/secrets.js`.


Quick start:
```angular2html
HOW TO RUN:
0. Install dependencies in the root directory of the project
cd restaurant-webapp (root directory)
npm install

1. Run backend server
cd backend
npm install
npm start

2. Run frontend server
cd restaurant-app
npm install
npm start
```

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload after each change.

In the `proxy.conf.json` file, the proxy configuration is set to `http://localhost:4000/`. This is the default port for the backend server. 