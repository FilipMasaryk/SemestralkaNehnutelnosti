const Joi = require('joi');

const addMemberSchema = Joi.object({
    name: Joi.string().required().min(1),
    password: Joi.string().required().min(1)
});

const updateMemberSchema = Joi.object({
    name: Joi.string().required().min(1),
});

const addPropertySchema = Joi.object({
    member_id: Joi.number().greater(0),
    location: Joi.string().required().min(2),
    price: Joi.number().integer().greater(0),
    size: Joi.number().integer().greater(0),
    bedroom_size: Joi.number().integer().greater(0),
    phone_number: Joi.string().length(10),
});

const updatePropertySchema = Joi.object({
    location: Joi.string().required().min(2),
    price: Joi.number().integer().greater(0),
    size: Joi.number().integer().greater(0),
    bedroom_size: Joi.number().integer().greater(0),
    phone_number: Joi.string().length(10),
});

const addFavoritePropertySchema = Joi.object({
    property_id: Joi.number().greater(0),
})

const addPhotoSchema = Joi.object({
    property_id: Joi.number().greater(0),
    name: Joi.string().min(1),
})

const removePhotoSchema = Joi.object({
    id: Joi.number().greater(0),
})

module.exports = {
    addMemberSchema,
    updateMemberSchema,
    addPropertySchema,
    updatePropertySchema,
    addFavoritePropertySchema,
    removePhotoSchema,
    addPhotoSchema,
}