# express-mongodb-setup

It's common for Express developers to define routes in a separate file from the main Express app (`app.js` or `server.js`). Although our connection pooling blog post teaches developers to reuse a database connection, it's not clear how to implement database connection sharing across multiple files. This is a simple example that demonstrates how to set up MongoDB connections in an Express app so that the database connection can be used across multiple files.
