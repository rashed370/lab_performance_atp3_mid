const database = require("./database");

exports.getById = (id, callback) => {
    const sql = "SELECT * FROM `job` WHERE `id` = ? ORDER BY `id` DESC LIMIT 0, 1";
    database.getResult(sql, [id], result=> {
        if(result.length>0)
        callback(result[0]);
        else
        callback(null);
    });
};

exports.insert = (job, callback) => {
    const sql = "INSERT INTO `job` VALUES ( ?, ?, ?, ?, ?)";
    database.execute(sql, [
        null, 
        job.title,
        job.company,
        job.location,
        job.salary,
    ], status=> {
        if(status)
        callback(true);
        else
        callback(false);
    });
};

exports.update = (job, callback) => {
    const sql = "UPDATE `job` SET `title` = ?, `company` = ?, `location` = ?, `salary` = ? WHERE `id` = ?";
    database.execute(sql, [
       job.title,
       job.company,
       job.location,
       job.salary,
       job.id
    ], status=> {
        if(status)
        callback(true);
        else
        callback(false);
    });
};

exports.delete = (id, callback) => {
    const sql = "DELETE FROM `job` WHERE `id` = ?";
    database.execute(sql, [id], status=> {
        if(status)
        callback(true);
        else
        callback(false);
    });
};