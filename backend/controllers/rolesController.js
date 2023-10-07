// controllers/rolesController.js

const Roles = require('../models/rolesModel');


exports.addUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const userrole = await Roles.find({ 'role': role });
        let roleId;
        for await (const doc of userrole) {
            roleId = doc._id;
        }
        if (roleId == undefined) {
            const newRole = new Roles({ role: role });
            await newRole.save();
            res.status(200).json({
                data: newRole,
            })
        } else {
            res.status(404).json({
                error: "Role already exist."
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.addSuperAdmin = async (req, res, next) => {
    try {
        const newRole = new Roles({ role: "superadmin" });
        await newRole.save();
        res.json({
            data: newRole,
        })
    } catch (error) {
        next(error)
    }
}

exports.getUserRole = async (req, res, next) => {
    try {
        const role = req.params.role;
        const userrole = await Roles.find({ 'role': role });
        let roleId;
        for await (const doc of userrole) {
            roleId = doc._id;
        }
        if (roleId == undefined) {
            res.status(404).json({
                error: "Role not exist."
            })
        } else {
            res.status(200).json({
                data: userrole
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.getUserRoleById = async (req, res, next) => {
    try {
        const id = req.params.Id;
        const user = await User.findById(id);
        let roleId;
        for await (const doc of userrole) {
            roleId = doc._id;
        }
        if (roleId == undefined) {
            res.status(404).json({
                error: "Role not exist."
            })
        } else {
            res.status(200).json({
                data: userrole
            })
        }
    } catch (error) {
        next(error)
    }
}
