const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.all('/', (request, response, next) => {
    if(request.cookies['userid']!=null) {
        response.redirect('/home');
    } else {
        next();
    }
});

router.get('/', (request, response)=>{
    response.render('index');
});

router.post('/',(request, response)=>{
    let username = request.body.username ? request.body.username : '';
    let password = request.body.password ? request.body.password : '';    

    return Users.getByUsername(username, result => {   
        if(result!=null) {
            if(result.password == password) {
                response.cookie('userid', result.id);
                return response.redirect('/home');
            } else {
                response.write('Password doesnot match');
                response.end();   
            }
        } else {
            response.write('Username not Found');
            response.end();
        }
    });

})

module.exports = router;