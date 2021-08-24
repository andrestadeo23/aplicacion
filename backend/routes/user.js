var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mariadb = require('mariadb');
var con = mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "masterkey",
    database: "prueba"
});

router.post('/register', async function (req, res, next) {
    try {
        let { username, email, password } = req.body;
        const hashed_password = md5(password.toString())
        const checkUsername = 'Select username FROM usuarios WHERE username = ?';
        con.query(checkUsername, [username], (err, result, fields) => {
            if(!result.length){
                const sql = 'Insert Into usuarios (username, email, password) VALUES ( ?, ?, ? )'
                con.query(sql, [username, email, hashed_password],(err, result, fields) =>{
                    if(err){res.send({ 
                        status: 0, data: err 
                    });
                }
                else{
                    let token = jwt.sign({ 
                        data: result 
                    }, 'secret')
                    res.send({ 
                        status: 1, 
                        data: result, 
                        token : token 
                    });
                }})
            }
        });
    } 
    catch (error) {
        res.send({ status: 0, error: error });
    }
});

router.post('/login', async function (req, res, next) {
    try {
        let { username, password } = req.body;
        const hashed_password = md5(password.toString())
        const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?'
        con.query(sql, [username, hashed_password],function(err, result, fields){
            if(err){
                res.send({ 
                    status: 0, 
                    data: err 
                });
            }
            else{
                let token = jwt.sign({ data: result }, 'secret')
                res.send({ status: 1, data: result, token: token });
            }
        })
    } 
    catch (error) {
        res.send({ status: 0, error: error });
    }
});

module.exports = router;