import mysql from 'mysql'


//mysql database

const mysqlConnection = mysql.createConnection({
  connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Beams',
    
    });
    
    mysqlConnection.connect((err)=> {
      if(!err)
      console.log('Connection Established Successfully');
      else
      console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
      });

export default mysqlConnection