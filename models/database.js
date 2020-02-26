const mysql      	= require('mysql');

const connection = callback => {

	const connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : '17342291_job_portal_lab'
	});
	
	connection.connect(err => {
	  if (err) return callback(null);
    });
    
	callback(connection);
}

exports.getResult = (sql, params, callback) => {
    connection( connection => {
        if(params == null)
        connection.query(sql, (error, results) => {
            if(!error){
                callback(results);
            }else{
                callback(null);
            }
        });
        else
        connection.query(sql, params, (error, results) => {
            if(!error){
                callback(results);
            }else{
                callback(null);
            }
        });
        
        connection.end();	
    });
};
exports.execute = (sql, params, callback) => {
    connection(connection => {
        if(params == null)
        connection.query(sql, (error, status) => {
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
        else
        connection.query(sql, params, (error, status) => {
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
        
        connection.end();	
    });
};