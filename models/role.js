const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
    role:{
        type: String,
        required: [ true, 'El rol es requerido']
    }
})

module.exports = model('roles', RoleSchema)