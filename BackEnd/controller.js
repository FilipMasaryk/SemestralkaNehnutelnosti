const { error } = require('console');
const pool = require('./db')
const queries = require('./queries')

const getMembers = (req, res) => {
    pool.query(queries.getMembers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getMemberById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getMemberById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getMemberByName = (req, res) => {

}

const addMember = (req, res) => {
    const { name, password } = req.body;
    pool.query(queries.checkNameExists, [name], (error, results) => {
        if (results.rows.length) {
            res.send("Name already exists");
        } else {
            pool.query(queries.addMember, [name, password], (error, results) => {
                if (error) throw error;
                //Ak sa member vytvoril uspesne tak posli spravu
                res.status(201).send("Member created successfully");
                console.log("Member created successfully");
            })
        }
    })
}

const removeMember = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getMemberById, [id], (error, results) => {
        const noMemberFound = !results.rows.length;
        if (noMemberFound) {
            res.send("Member does not exist in the database");
        } else {
            pool.query(queries.removeMember, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Member removed succesfully");
            })
        }
    })
}

const updateMember = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getMemberById, [id], (error, results) => {
        const noMemberFound = !results.rows.length;
        if (noMemberFound) {
            res.send("Member does not exist in the database");
        } else {
            pool.query(queries.checkNameExists, [name], (error, results) => {
                if (results.rows.length) {
                    res.send("Name already exists, choose a different name");
                } else {
                    pool.query(queries.updateMember, [name, id], (error, results) => {
                        if (error) throw error;
                        res.status(200).send("Member updated succesfully");
                    })
                }
            })
        }
    })
}

module.exports = {
    getMembers,
    getMemberById,
    addMember,
    removeMember,
    updateMember,
}