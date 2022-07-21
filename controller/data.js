const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const dataModel = require('model/data');

const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// routes
router.post('/insert', authorize(), insertCakar);
router.get('/', authorize(), getData);

module.exports = router;

async function insertCakar(req, res, next) {
    const { 
        no,
        nama,
        no_test,
        tanggal_lahir,
        tanggal_mcu,
        umur,
        jenis_kelamin,
        anamnesa,
        rps,
        rpk,
        sistole,
        distole,
        denyut_nadi,
        berat_badan,
        tinggi_badan,
        bmi,
        lingkar_perut,
        od_spheris,
        od_cylindris,
        os_spheris,
        os_cylindris,
        test_buta_warna,
        gigi,
        diagnostik_fisik,
        thorax_photo,
        audiogram,
        ekg,
        aphetamine,
        methaphetamine,
        opiate,
        canabinoid,
        urine,
        pp_test,
        hb,
        eri,
        leko,
        ht,
        mcv,
        mch,
        mchc,
        eos,
        bas,
        n_seg,
        n_bat,
        lim,
        mon,
        tromb,
        led,
        puasa,
        hba1c,
        cholesterol,
        hdl,
        ldl,
        trigliserida,
        asam_urat,
        ureum,
        kreatinin,
        sgot,
        sgpt,
        hbs_ag,
        vdrl,
        kesimpulan,
        derajat_kesehatan
    } = req.body

    const created = await dataModel.create(req.body)
    .then(result => {
        const response = {}
        response.code = 0
        response.message = 'Successful'
        res.setHeader('Content-Type', 'application/json');
        res.json(response)
    }).catch(error => {
        const response = {}
        response.code = 1
        response.message = error
        res.setHeader('Content-Type', 'application/json');
        res.json(response)
    })
    
    
}

async function getData(req, res, next) {
    const datas = await dataModel.findAll()
    const response = {}
    response.code = 0
    response.data = omitHash(datas)
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
    dataModel.destroy({
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