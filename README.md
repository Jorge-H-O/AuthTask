# LoginAuthTask

#Basic Setup
Task uses Node.js and Express for the backend, MongoDB for object storage, and JWT for token generation and validation

#Running Project
Clone repo, then run node ./app.js. Then on browser, go to localhost/3000 Note, on postman, use GET to reach the same page. Use POST for Register and Login

#Known Issues
Currently, while the project successfully saves a new user and hashes password, when attempting to log in, there is a header error that occurs when attempting to compare password with saved hash value.
