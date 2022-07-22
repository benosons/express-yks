// import sequelize 
const db = require('../_helpers/db');


const { DataTypes } = require('sequelize');

const attributes = {
    no: {type: DataTypes.STRING, allowNull: false},
    nama: {type: DataTypes.STRING, allowNull: false},
    no_test: {type: DataTypes.STRING, allowNull: false},
    tanggal_lahir: {type: DataTypes.STRING, allowNull: false},
    tanggal_mcu: {type: DataTypes.STRING, allowNull: false},
    umur: {type: DataTypes.STRING, allowNull: false},
    jenis_kelamin: {type: DataTypes.STRING, allowNull: false},
    anamnesa: {type: DataTypes.STRING, allowNull: false},
    rps: {type: DataTypes.STRING, allowNull: false},
    rpk: {type: DataTypes.STRING, allowNull: false},
    sistole: {type: DataTypes.STRING, allowNull: false},
    distole: {type: DataTypes.STRING, allowNull: false},
    denyut_nadi: {type: DataTypes.STRING, allowNull: false},
    berat_badan: {type: DataTypes.STRING, allowNull: false},
    tinggi_badan: {type: DataTypes.STRING, allowNull: false},
    bmi: {type: DataTypes.STRING, allowNull: false},
    lingkar_perut: {type: DataTypes.STRING, allowNull: false},
    od_spheris: {type: DataTypes.STRING, allowNull: false},
    od_cylindris: {type: DataTypes.STRING, allowNull: false},
    os_spheris: {type: DataTypes.STRING, allowNull: false},
    os_cylindris: {type: DataTypes.STRING, allowNull: false},
    test_buta_warna: {type: DataTypes.STRING, allowNull: false},
    gigi: {type: DataTypes.STRING, allowNull: false},
    diagnostik_fisik: {type: DataTypes.STRING, allowNull: false},
    thorax_photo: {type: DataTypes.STRING, allowNull: false},
    audiogram: {type: DataTypes.STRING, allowNull: false},
    ekg: {type: DataTypes.STRING, allowNull: false},
    aphetamine: {type: DataTypes.STRING, allowNull: false},
    methaphetamine: {type: DataTypes.STRING, allowNull: false},
    opiate: {type: DataTypes.STRING, allowNull: false},
    canabinoid: {type: DataTypes.STRING, allowNull: false},
    urine: {type: DataTypes.STRING, allowNull: false},
    pp_test: {type: DataTypes.STRING, allowNull: false},
    hb: {type: DataTypes.STRING, allowNull: false},
    eri: {type: DataTypes.STRING, allowNull: false},
    leko: {type: DataTypes.STRING, allowNull: false},
    ht: {type: DataTypes.STRING, allowNull: false},
    mcv: {type: DataTypes.STRING, allowNull: false},
    mch: {type: DataTypes.STRING, allowNull: false},
    mchc: {type: DataTypes.STRING, allowNull: false},
    eos: {type: DataTypes.STRING, allowNull: false},
    bas: {type: DataTypes.STRING, allowNull: false},
    n_seg: {type: DataTypes.STRING, allowNull: false},
    n_bat: {type: DataTypes.STRING, allowNull: false},
    lim: {type: DataTypes.STRING, allowNull: false},
    mon: {type: DataTypes.STRING, allowNull: false},
    tromb: {type: DataTypes.STRING, allowNull: false},
    led: {type: DataTypes.STRING, allowNull: false},
    puasa: {type: DataTypes.STRING, allowNull: false},
    hba1c: {type: DataTypes.STRING, allowNull: false},
    cholesterol: {type: DataTypes.STRING, allowNull: false},
    hdl: {type: DataTypes.STRING, allowNull: false},
    ldl: {type: DataTypes.STRING, allowNull: false},
    trigliserida: {type: DataTypes.STRING, allowNull: false},
    asam_urat: {type: DataTypes.STRING, allowNull: false},
    ureum: {type: DataTypes.STRING, allowNull: false},
    kreatinin: {type: DataTypes.STRING, allowNull: false},
    sgot: {type: DataTypes.STRING, allowNull: false},
    sgpt: {type: DataTypes.STRING, allowNull: false},
    hbs_ag: {type: DataTypes.STRING, allowNull: false},
    vdrl: {type: DataTypes.STRING, allowNull: false},
    kesimpulan: {type: DataTypes.TEXT, allowNull: false},
    derajat_kesehatan: {type: DataTypes.STRING, allowNull: true},
    status: {type: DataTypes.STRING, allowNull: true}
};

const options = {
    defaultScope: {
        // exclude hash by default
        attributes: { exclude: ['hash'] }
    },
    scopes: {
        // include hash with this scope
        withHash: { attributes: {}, }
    }
};

// Define schema
const data = db.define('data', attributes, options)

data.sync();
   
  // Export model Product
module.exports = data