const mysql = require('mysql')



const connectionMySQL = mysql.createConnection({
    host: '35.225.36.190',
    user: 'root',
    password: 'Quant1ph1'
})


connectionMySQL.connect((err) => {
    if (err)
        console.log(err);
    else {
        console.log('Connected');
        connectionMySQL.query("SHOW DATABASES", function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    }

});
