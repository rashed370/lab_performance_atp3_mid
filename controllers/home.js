const express = require("express");
const router = express.Router();
const Users = require("../models/users"); 
const { check, validationResult } = require('express-validator');

router.all('*', (request, response, next) => {
    if(request.cookies['userid']!=null) {
        Users.getById(request.cookies['userid'], result => {
            if(result) {
                request.user = result;
                next();
            }
        });
    } else {
        response.redirect('/');
    }
});

router.get('/logout', (request, response)=>{
    response.clearCookie('userid');
    response.redirect('/');
});

router.get('/', (request, response)=>{
    response.render('home/index', {logged: request.user});
});

router.get('/employee', (request, response)=>{
    if(request.user.role=='admin') {
        Users.getEmployees(result => {
            response.render('home/employee/index', {logged: request.user, employees : result ? result : []});
        }) 
    } else {
        response.redirect('/home');
    }
});

router.get('/employee/add', (request, response)=>{
    if(request.user.role=='admin') {
        response.render('home/employee/add', {logged: request.user});
    } else {
        response.redirect('home');
    }
});

router.post('/employee/add', [
    check('name', 'Name is required').not().isEmpty().trim(),
    check('company', 'Company is required').not().isEmpty().trim(),
    check('contact', 'Contact Nois required').not().isEmpty().trim(),
    check('username','Username is required').not().isEmpty().trim(),
    check('password', 'Password is required').not().isEmpty().trim(),
], (request, response)=>{
    if(request.user.role=='admin') {
        const errors = validationResult(request);

        if(errors.errors.length>0) {
            response.write('<html>');
            response.write('<body>');
            errors.errors.forEach(error => {
                response.write('<p>'+error.msg+'</p>');
            });
            response.write('</body>');
            response.write('</html>');
            response.end();
        }

        return Users.insert({
            username : request.body.username,
            password : request.body.password,
            name : request.body.name,
            company : request.body.company,
            contact : request.body.contact,
            role : 'employee'
        }, result => {
            if(result) {
                response.redirect('/home/employee/');
            }
        });
    } else {
        response.redirect('home');
    }
});

router.get('/employee/update/:id', (request, response)=>{
    if(request.user.role=='admin') {
        response.render('home/employee/update', {logged: request.user});
    } else {
        response.redirect('home');
    }

});

router.get('/job', (request, response)=>{
    if(request.user.role=='admin') {
        response.render('home/job/index', {logged: request.user});
    } else {
        response.redirect('home');
    }
});

router.get('/job/add', (request, response)=>{
    response.render('home/job/add', {logged: request.user});
});

router.get('/job/update/:id', (request, response)=>{
    response.render('home/job/update', {logged: request.user});
});

module.exports = router;