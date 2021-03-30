# API
This is an simple API that uses express and neo4j.

# Set up

## neo4j
Before we can run the application we should have an neo4j instance. This can be done by downloading the [neo4j desktop]("https://neo4j.com/download/neo4j-desktop/") application. Once installed neo4j desktop create a project and add a new database. Be sure to remember the password you enter to create the database. Once the database is created start it by pressing start.

Once the neo4j database is running you should enter the details to the .env file like this:
```
DB_CONNECTION_URL=bolt://0.0.0.0:7687
DB_USERNAME=neo4j
DB_PASSWORD=YOUR_PASSWORD_HERE
```
If you installed neo4j with the method above this should be enough to make a connection to the database.

## Node
You should only follow the next steps if you have a neo4j database running and filled in the credentials into the .env file.

Now to start the Node application we open a terminal and navigate to this folder `/path/to/portfolio/api/` and type the following commands:
```
npm install
npm start
```
Now a nodemon script should be running and you can access the API via `http://localhost:3080`

If you change a script and save it nodemon will automagically restart to reflect your change.

I recommend something like [postman]("https://www.postman.com/") to test the API or make requests that the frontend can not make yet.