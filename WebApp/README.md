# WebApp
This is the fontend webapp that will only render the data that will get requested from the api. Due to this nature you are **REQUIRED** to have the API up and running.=

# Set up
## Development
The development server is a bit slower but is made to work better for developers. If you want to run this for an production enviroment take a look under Production lower on this page.

We can run the webapp by opening a terminal and navigating to this folder `/path/to/portfolio/WebApp/` and running the following commands:
```
npm install
npm run serve
```
This wil start a development server that will restart everytime you save a change to a file. 

To check if the files complies with the linting rules and fixes potential problems run the following command in this folder:
```
npm run lint
```
## Production
`npm run serve` is not ment to be used for a production server. To build the application for use in a production enviroment run the following command in this folder:
```
npm run build
```

