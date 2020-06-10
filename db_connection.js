var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dance_db_nodejs"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

// create database  
//   con.query("CREATE DATABASE dance_db_nodejs", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });

// });


function createTable(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

    var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), password VARCHAR(255))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
}

function insertUser(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

    var sql = "INSERT INTO users (name, email, phone, password) VALUES ('Sami', 'sami@gmail.com','50777777','sami')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
});

}

function selectAllUsers(){
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
}

function seletUser(){
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users WHERE name = 'sami'", function (err, result) {
          if (err) throw err;
          console.log(result);
        });
      });
}

function deleteUser(){

    con.connect(function(err) {
        if (err) throw err;
        var sql = "DELETE FROM users WHERE name = 'sami'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
        });
      });
}

function dropTable(){
    con.connect(function(err) {
        if (err) throw err;
        var sql = "DROP TABLE users";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table deleted");
        });
      });
}

function updateUser(){
    con.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE users SET name = 'samsi' WHERE name = 'sami'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
      });
}
