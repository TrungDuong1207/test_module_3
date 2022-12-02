const fs = require("fs");
const connection = require("../models/ConnectDB");
class BaseController {
    static getTemplate(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
    
    static querySQL(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (err) reject(err.message);
                resolve(results);
            })
        })
    }
}
module.exports = BaseController;
