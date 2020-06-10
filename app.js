const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
var mysql = require('mysql');


const port = "80";


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dance_db_nodejs"
});

// EXPRESS RELATED STUFF
app.use("/static", express.static('static'));  //for serving static files
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

// PUG RELATED STUFF
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the view directory



// ALL ENDPOINTS
app.get('/', (req, res) => {
  const title = "Home";
  const content = " Get your gym membership for 500 SAR!";
  res.status(200).render('home.pug', { "title": title, "content": content });
});

app.get('/contact', (req, res) => {
  const title = "Contact Us";
  // const content = " ";
  const flag = false;
  res.status(200).render('contact.pug', { "title": title, "flag": false });



});

app.post('/contact', (req, res) => {
  const title = "Contact Us";
  const content = "User registered successfully!"
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
   // const flag = true;
    var sql = `INSERT INTO users (name, email, phone, password) VALUES ('${name}', '${email}','${phone}','${password}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
     // flag = true;
    });
  });
  res.status(200).render('contact.pug', { "title": title, "flag": true });
  
});


// app.post('/response', (req, res) => {
//   const title = "Registered";
//   // const name = req.params.name;
//   // const email = req.params.email;
//   // const phone = req.params.phone;
//   // const password = req.params.password;

//   // res.status(200).render('response.pug',{"title": title, "name": name, "email": email, "phone": phone, "password": password});
//   console.log("ffffff");
//   console.log(req.body);
// });


//START SERVER
app.listen(port, () => {

  console.log(`Application started successfully! on port ${port}`);
});
