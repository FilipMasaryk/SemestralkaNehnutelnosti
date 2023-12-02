const getMembers = "SELECT * FROM member";
const getMemberById = "SELECT * FROM member WHERE id = $1";
const checkNameExists = "SELECT m FROM member m WHERE m.name = $1";
const addMember = "INSERT INTO member (name, password, created_at) VALUES ($1, $2, NOW())";
const removeMember = "DELETE FROM member WHERE id = $1";
const updateMember = "UPDATE member SET name = $1 WHERE id = $2";

const getProperties = "SELECT * FROM property";
const getPropertyById = "SELECT * FROM property WHERE id = $1";
const addProperty = "INSERT INTO PROPERTY (member_id, location, price, size, bedroom_size, phone_number, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW());"
const removeProperty = "DELETE FROM property WHERE id = $1";
const updateProperty = "UPDATE property SET location = $1, price = $2, size = $3, bedroom_size = $4, phone_number = $5, updated_at = NOW() WHERE id = $6";

const getFavoriteProperties = "SELECT * FROM favorite_property";
const getFavoritePropertyByMemberId = "SELECT * FROM favorite_property WHERE member_id = $1";
const checkPropertyExists = "SELECT p FROM property p WHERE p.id = $1";
const checkIfFavoritePropertyExists = "SELECT * FROM favorite_property WHERE member_id = $1 AND property_id = $2";
const addFavoriteProperty = "INSERT INTO favorite_property (member_id, property_id, created_at) VALUES ($1, $2, NOW())";
const removeFavoriteProperty = "DELETE FROM favorite_property WHERE member_id = $1 AND property_id = $2";

const getPhotos = "SELECT * FROM photo";
const getPhotosByPropertyId = "SELECT * FROM photo WHERE property_id = $1";
const addPhoto = "INSERT INTO photo (property_id, name, created_at) VALUES ($1, $2, NOW())";
const checkPhotoNameExists = "SELECT p FROM photo p WHERE p.name = $1";
const checkIfPhotoExists = "SELECT * FROM photo WHERE id = $1 AND property_id = $2";
const removePhoto = "DELETE FROM photo WHERE id = $1 AND property_id = $2";


module.exports = {
    getMembers,
    getMemberById,
    checkNameExists,
    addMember,
    removeMember,
    updateMember,
    getProperties,
    getPropertyById,
    addProperty,
    removeProperty,
    updateProperty,
    getFavoriteProperties,
    getFavoritePropertyByMemberId,
    addFavoriteProperty,
    removeFavoriteProperty,
    checkPropertyExists,
    checkIfFavoritePropertyExists,
    getPhotos,
    getPhotosByPropertyId,
    addPhoto,
    removePhoto,
    checkPhotoNameExists,
    checkIfPhotoExists,
}