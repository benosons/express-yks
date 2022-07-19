const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userModel = require('model/users');

const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

async function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

async function authenticate (req, res, next) {
    
    const { username, password } = req.body

    const user = await userModel.scope('withHash').findOne({
        where: {
            username: username
        }
    });
    
    const token = await jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    if (!user){
            const response = {}
            response.code = 1
            response.message = 'User not exist'
            res.setHeader('Content-Type', 'application/json');
            res.json(response)
    }
    
    if (!( bcrypt.compare(password, user.hash))){
            const response = {}
            response.code = 1
            response.message = 'Username or password is incorrect'
            res.setHeader('Content-Type', 'application/json');
            res.json(response)
    }

    const response = {}
    response.code = 0
    response.data = omitHash(user.get())
    response.message = 'Successful'
    response.token = token
    res.setHeader('Content-Type', 'application/json');
    res.json(response)
}

async function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

async function register(req, res, next) {
    const { username, password } = req.body

    if (await userModel.findOne({ where: { username: username } })) {
        const response = {}
        response.code = 1
        response.message = 'Username "' + username + '" is already taken'
        res.setHeader('Content-Type', 'application/json');
        res.json(response)
    }

    // hash password
    if (password) {
        req.body.hash = await bcrypt.hash(password, 10);
    }

    const created = userModel.create(req.body)
    const response = {}
    response.code = 0
    response.message = 'Registration successful'
    res.setHeader('Content-Type', 'application/json');
    res.json(response)
}

async function getAll(req, res, next) {
    const users = await userModel.findAll()
    const response = {}
    response.code = 0
    response.data = omitHash(users)
    response.message = 'Successful'
    res.setHeader('Content-Type', 'application/json');
    res.json(response)
}

async function getCurrent(req, res, next) {
    res.json(req.user);
}

async function getById(req, res, next) {
    const  id  = req.params.id
    
    const users = await userModel.findAll({
        where: {
            id: id
        }
    })

    res.setHeader('Content-Type', 'application/json');
    const response = {}

    response.code = 0
    response.data = omitHash(users)
    response.message = 'Successful'

    if(!users.length){
        response.code = 1
        response.message = 'Failed'
    }

    res.json(response)
}

async function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

async function update(req, res, next) {
    const  id  = req.params.id
    const users = userModel.update( req.body, { 
        where: { 
            id: id
         }
    })
    const response = {}
    response.code = 0
    response.message = 'Successful'
    res.setHeader('Content-Type', 'application/json');
    res.json(response)
}

async function _delete(req, res, next) {
    const  id  = req.params.id
    userModel.destroy({
        where: {
            id: id
        }
    })
    const response = {}
    response.code = 0
    response.message = 'Successful'
    res.setHeader('Content-Type', 'application/json');
    res.json(response)
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}