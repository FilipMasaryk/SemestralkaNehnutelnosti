const getMembers = "SELECT * FROM member";
const getMemberById = "SELECT * FROM member WHERE id = $1";
const checkNameExists = "SELECT m FROM member m WHERE m.name = $1";
const addMember = "INSERT INTO member (name, password, created_at) VALUES ($1, $2, NOW())";
const removeMember = "DELETE FROM member WHERE id = $1";
const updateMember = "UPDATE member SET name = $1 WHERE id = $2";

module.exports = {
    getMembers,
    getMemberById,
    checkNameExists,
    addMember,
    removeMember,
    updateMember,
}