// models/rolesModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'superadmin',
    }
});

rolesSchema.set('timestamps',true);

const Roles = mongoose.model('roles', rolesSchema);

module.exports = Roles;