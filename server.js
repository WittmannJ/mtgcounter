// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
// const path = require('path');
// const dbPath = path.resolve(__dirname, 'sqlite.db');
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Dreams (dream TEXT)');
    db.run('CREATE TABLE Bucketlist (idea TEXT)');
    console.log('New table Dreams created!');

    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes"), ("Build a really cool progressive web app with workbox")');
    });
  }
  else {
    console.log('Database "Dreams" ready to go!');
    db.each('SELECT * from Dreams', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/magic.html');
});

/*app.get('/magic', function(request, response) {
  response.sendFile(__dirname + '/views/magic.html');
});*/


// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

app.get('/bucketlist', function(request, response){
  db.run('create table if not exists Bucketlist (idea TEXT)');
  response.send("hello");
  console.log("hi");
})

app.get('/dream', function(request, response){
  db.run('INSERT INTO Dreams (dream) VALUES ("Find and count some sheep")');
  response.send("ok");
})

app.get('/debts', function(request, response){
  let debts = 0;
  debts = debts + 2.20; //Americano
  debts = debts + 1.99; //Mangos
  debts = debts + 2 * 0.69; //2x Buttermilch, Müller, 500ml
  debts = "nix";
  response.send("Schulden an W: " + debts);
})

app.get('/websec', function(request, response){

  let notes = {ideas: []};
  let idea_one = "Seite 34 - Wie loest man das Problem (viele passwoerter), es gibt mehrere Varianten";
  let idea_two = "Erinnern was man bei Signatur falsch machen kann bzw. wie ein Hacker eine Signatur in einem XML-File faelschen kann um sich als anderer nutzer auszugeben";
  notes.ideas.push(idea_one);
  notes.ideas.push(idea_two);
  //response.send(notes.toString());
//  response.writeHead(200, {'Content-Type': 'application/json'});
  response.json(notes);

})

app.get('/')

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
