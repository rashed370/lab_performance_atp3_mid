const database = require("./database");

exports.getById = (id, callback) => {
    const sql = "SELECT * FROM `users` WHERE `id` = ? ORDER BY `id` DESC LIMIT 0, 1";
    database.getResult(sql, [id], result=> {
        if(result.length>0)
        callback(result[0]);
        else
        callback(null);
    });
};


exports.getByUsername = (username, callback) => {
    const sql = "SELECT * FROM `users` WHERE `username` = ? ORDER BY `id` DESC LIMIT 0, 1";
    database.getResult(sql, [username], result=> {
        if(result && result.length>0)
        callback(result[0]);
        else
        callback(null);
    });
};


exports.getEmployees = (callback) => {
    const sql = "SELECT * FROM `users` WHERE `role` = 'employee' ORDER BY `id` DESC LIMIT 0, 1";
    database.getResult(sql, [username], result=> {
        if(result && result.length>0)
        callback(result);
        else
        callback(null);
    });
};


exports.insert = (user, callback) => {
    const sql = "INSERT INTO `users` VALUES ( ?, ?, ?, ?, ?, ?, ?)";
    database.execute(sql, [
        null, 
        user.username,
        user.password,
        user.name,
        user.company,
        user.contact,
        user.role
    ], status=> {
        if(status)
        callback(true);
        else
        callback(false);
    });
};

exports.update = (user, callback) => {
    const sql = "UPDATE `users` SET `username` = ?, `password` = ?, `name` = ?, `company` = ?, `contact` = ? WHERE `id` = ?";
    database.execute(sql, [
        user.username,
        user.password,
        user.name,
        user.company,
        user.contact,
        user.id
    ], status=> {
        if(status)
        callback(true);
        else
        callback(false);
    });
};

exports.delete = (id, callback) => {
    const sql = "DELETE FROM `users` WHERE `id` = ?";
    database.execute(sql, [id], status=> {
        if(status)
        callback(true);
        else
        callback(false);
    });
};