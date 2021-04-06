# API
This is an simple API that uses express and Mongodb.

# Set up

## Mongodb
This API works with Mongodb. Make sure you get a database running and get a connection URL ready. Put the connection URL in the .env file.
```
DB_URL=[YOUR CONNECTION URL HERE]
```

## Node
You should only follow the next steps if you have a Mongodb database running and filled in the credentials into the .env file.

Now to start the Node application we open a terminal and navigate to this folder `/path/to/portfolio/api/` and type the following commands:
```
npm install
npm start
```
Now a nodemon script should be running and you can access the API via `http://localhost:3080`

If you change a script and save it nodemon will automagically restart to reflect your change.

I recommend something like [postman]("https://www.postman.com/") to test the API or make requests that the frontend can not make yet.