var mysql = require("mysql");

var con = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    //insecureAuth : true
  });

module.exports = {
    // Runs SQL passed into the function
    runSQL: function (sql) {
        con.query(sql, function (error, results, fields) {
            if (error){
                throw error;
            }
            if (results[1]){
                results.forEach(result => {
                    console.log(result);
                });
            } else {
                console.log(results);
            }
        });
    }
    // More functions can be added later here
    // bar: function () {
    //   // whatever
    // }
  };
  