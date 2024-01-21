const getMembers = "SELECT * FROM member";
const getMemberById = "SELECT * FROM member WHERE id = $1";
const checkNameExists = "SELECT m FROM member m WHERE m.name = $1";
const addMember = "INSERT INTO member (name, password, created_at) VALUES ($1, $2, NOW())";
const removeMember = "DELETE FROM member WHERE id = $1";
const updateMember = "UPDATE member SET password = $1 WHERE id = $2";
const getMemberByName = "SELECT * FROM member WHERE name = $1"
const getMembersPassword = "SELECT password FROM member WHERE id = $1"

const getProperties = "SELECT * FROM property";
const getPropertyById = "SELECT * FROM property WHERE id = $1";
const getProperteisByMemberId = "SELECT * FROM property WHERE member_id = $1";
const addProperty = "INSERT INTO PROPERTY (member_id, location, price, size, bedroom_size, phone_number, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id;"
const removeProperty = "DELETE FROM property WHERE id = $1";
const updateProperty = "UPDATE property SET price = $1, phone_number = $2, updated_at = NOW() WHERE id = $3";
const searchProperties = "SELECT * FROM property WHERE lower(location) LIKE lower('%' || $1 || '%')"

const getFavoritePropertiesByMemberId = "SELECT * FROM property JOIN favorite_property ON property.id = favorite_property.property_id WHERE favorite_property.member_id = $1";

const getFavoriteProperties = "SELECT * FROM favorite_property";
const getFavoritePropertyByPropertyIdAndMemberId = "SELECT * FROM favorite_property WHERE member_id = $1 AND property_id = $2";
const checkPropertyExists = "SELECT p FROM property p WHERE p.id = $1";
const checkIfFavoritePropertyExists = "SELECT * FROM favorite_property WHERE member_id = $1 AND property_id = $2";
const addFavoriteProperty = "INSERT INTO favorite_property (member_id, property_id, created_at) VALUES ($1, $2, NOW())";
const removeFavoriteProperty = "DELETE FROM favorite_property WHERE member_id = $1 AND property_id = $2";
const removeAllFavoritePropertiesByPropertyId = "DELETE FROM favorite_property WHERE property_id = $1";


const getPhotos = "SELECT * FROM photo";
const getPhotoById = "SELECT * FROM photo WHERE id = $1";
const getPhotosByPropertyId = "SELECT * FROM photo WHERE property_id = $1";
const addPhoto = "INSERT INTO photo (property_id, name, created_at) VALUES ($1, $2, NOW())";
const checkPhotoNameExists = "SELECT p FROM photo p WHERE p.name = $1";
const checkIfPhotoExists = "SELECT * FROM photo WHERE id = $1 AND property_id = $2";
const removePhoto = "DELETE FROM photo WHERE id = $1";
const removeAllPhotosByPropertyId = "DELETE FROM photo WHERE property_id = $1"


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
    getPhotoById,
    getMemberByName,
    getFavoritePropertiesByMemberId,
    getFavoritePropertyByPropertyIdAndMemberId,
    getProperteisByMemberId,
    removeAllFavoritePropertiesByPropertyId,
    removeAllPhotosByPropertyId,
    getMembersPassword,
    searchProperties,
}