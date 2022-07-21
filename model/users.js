// import sequelize 
const db = require('../_helpers/db');


const { DataTypes } = require('sequelize');

const attributes = {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false }
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
const users = db.define('user', attributes, options)
users.sync();
   
  // Export model Product
module.exports = users