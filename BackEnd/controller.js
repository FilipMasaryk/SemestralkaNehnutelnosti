const { error } = require('console')
const pool = require('./db')
const queries = require('./queries')
const validationSchema = require('./validation_schema')
const fs = require('fs');
const path = require('path');

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

const addMember = (req, res) => {
    const { name, password } = req.body;
    pool.query(queries.checkNameExists, [name], (error, results) => {
        const validate = validationSchema.addMemberSchema.validate((req.body))
        if (validate.error) {
            console.error(validate.error.details);
            res.send(validate.error.details);
        } else {
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
        }
    })
}

const removeMember = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getMemberById, [id], (error, results) => {
        // noMemberFound bude true ak v results.rows.length niesu ziadne riadky
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
                    const validate = validationSchema.updateMemberSchema.validate((req.body))
                    if (validate.error) {
                        console.error(validate.error.details);
                        res.send(validate.error.details);
                    } else {
                        pool.query(queries.updateMember, [name, id], (error, results) => {
                            if (error) throw error;
                            res.status(200).send("Member updated succesfully");
                            console.log("Member updated successfully");
                        })
                    }
                }
            })
        }
    })
}

const getProperties = (req, res) => {
    pool.query(queries.getProperties, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getPropertyById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPropertyById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addProperty = (req, res) => {
    const { member_id, location, price, size, bedroom_size, phone_number } = req.body;
    pool.query(queries.getMemberById, [member_id], (error, results) => {
        const validate = validationSchema.addPropertySchema.validate((req.body))
        if (validate.error) {
            console.error(validate.error.details);
            res.send(validate.error.details);
        } else {
            if (!results.rows.length) {
                res.send("Member with that id doesnt exist");
            } else {
                pool.query(queries.addProperty, [member_id, location, price, size, bedroom_size, phone_number], (error, results) => {
                    if (error) throw error;
                    //Ak sa property vytvorila uspesne tak posli spravu
                    res.status(201).send("Property created successfully");
                    console.log("Property created successfully");
                })
            }
        }

    })
}

const removeProperty = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPropertyById, [id], (error, results) => {
        // noPropertyFound bude true ak v results.rows.length niesu ziadne riadky
        const noPropertyFound = !results.rows.length;
        if (noPropertyFound) {
            res.send("Property does not exist in the database");
        } else {
            pool.query(queries.removeProperty, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Property removed succesfully");
            })
        }
    })
}

const updateProperty = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedEntity = req.body;

    pool.query(queries.getPropertyById, [id], (error, results) => {
        const noPropertyFound = !results.rows.length;
        if (noPropertyFound) {
            res.send("Property does not exist in the database");
        } else {
            const validate = validationSchema.updatePropertySchema.validate((req.body))
            if (validate.error) {
                console.error(validate.error.details);
                res.send(validate.error.details);
            } else {
                pool.query(queries.updateProperty, [updatedEntity.location, updatedEntity.price, updatedEntity.size,
                updatedEntity.bedroom_size, updatedEntity.phone_number, id], (error, results) => {
                    if (error) throw error;
                    res.status(200).send("Property updated succesfully");
                })
            }
        }
    })
}


const getFavoritePropertyByMemberId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getFavoritePropertyByMemberId, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getFavoriteProperties = (req, res) => {
    pool.query(queries.getFavoriteProperties, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addFavoriteProperty = (req, res) => {
    const member_id = parseInt(req.params.id);
    const { property_id } = req.body;
    pool.query(queries.checkPropertyExists, [property_id], (error, results) => {
        const validate = validationSchema.addFavoritePropertySchema.validate((req.body))
        if (validate.error) {
            console.error(validate.error.details);
            res.send(validate.error.details);
        } else {
            if (!results.rows.length) {
                res.send("Property with that id does not exist");
            } else {
                pool.query(queries.checkIfFavoritePropertyExists, [member_id, property_id], (error, results) => {
                    if (results.rows.length) {
                        res.send("Favorite property like that already exists");
                    } else {
                        pool.query(queries.addFavoriteProperty, [member_id, property_id], (error, results) => {
                            if (error) throw error;
                            //Ak sa favorite property vytvorila uspesne tak posli spravu
                            res.status(201).send("Favorite property created successfully");
                            console.log("Favorite property created successfully");
                        })
                    }
                })
            }
        }
    })
}

const removeFavoriteProperty = (req, res) => {
    const member_id = parseInt(req.params.id);
    const { property_id } = req.body;
    pool.query(queries.checkPropertyExists, [property_id], (error, results) => {
        const validate = validationSchema.addFavoritePropertySchema.validate((req.body))
        if (validate.error) {
            console.error(validate.error.details);
            res.send(validate.error.details);
        } else {
            pool.query(queries.checkIfFavoritePropertyExists, [member_id, property_id], (error, results) => {
                if (!results.rows.length) {
                    res.send("Favorite property like that doesnt exist");
                } else {
                    pool.query(queries.removeFavoriteProperty, [member_id, property_id], (error, results) => {
                        if (error) throw error;
                        res.status(201).send("Favorite property removed successfully");
                        console.log("Favorite property removed successfully");
                    })
                }
            })
        }
    })
}

const getPhotos = (req, res) => {
    pool.query(queries.getPhotos, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getPhotoById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPhotoById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getPhotosByPropertyId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPhotosByPropertyId, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

/*
const addPhoto = (req, res) => {
    const { property_id, name } = req.body;
    pool.query(queries.checkPhotoNameExists, [name], (error, results) => {
        const validate = validationSchema.addPhotoSchema.validate((req.body))
        if (validate.error) {
            console.error(validate.error.details);
            res.send(validate.error.details);
        } else {
            if (results.rows.length) {
                res.send("Photo with this name already exists");
            } else {
                pool.query(queries.checkPropertyExists, [property_id], (error, results) => {
                    if (!results.rows.length) {
                        res.send("property with that id does not exist!");
                    } else {
                        pool.query(queries.addPhoto, [property_id, name], (error, results) => {
                            if (error) throw error;
                            res.status(201).send("Photo created successfully");
                            console.log("Photo created successfully");
                        })
                    }
                })
            }
        }
    })
}

const removePhoto = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPhotoById, [id], (error, results) => {
        // noPropertyFound bude true ak v results.rows.length niesu ziadne riadky
        const noPhotoFound = !results.rows.length;
        if (noPhotoFound) {
            res.send("Photo does not exist in the database");
        } else {
            pool.query(queries.removePhoto, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Photo removed succesfully");
            })
        }
    })
}*/



const addPhoto = (req, res) => {
    const property_id = parseInt(req.params.id);
    const files = req.files;
    pool.query(queries.checkPropertyExists, [property_id], (error, results) => {
        if (!results.rows.length) {
            files.forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${file.path}: ${err}`);
                    }
                });
            });
            return res.status(400).send('Property with that ID doesnt exist');
        } else {
            if (!files || req.files.length === 0) {
                return res.status(400).send('No files were uploaded.');
            } else {
                const uploadedFiles = req.files.map(file => {
                    pool.query(queries.checkPhotoNameExists, [file.filename], (error, results) => {
                        if (results.rows.length) {
                            fs.unlink(file.path, (err) => {
                                if (err) {
                                    console.error(`Error deleting file ${file.path}: ${err}`);
                                }
                            });
                            return res.status(400).send("Photo with this name already exists");
                        } else {
                            pool.query(queries.addPhoto, [property_id, file.filename], (error, results) => {
                                if (error) throw error;
                                console.log("Photo created successfully");
                            })
                        }
                    })
                    return {
                        filename: file.filename,
                        image_url: `http://localhost:3000/images/${file.filename}`,
                        success: ("Photo created successfully")
                    };
                });
                res.status(200).json({ uploadedFiles });
            }
        }
    })


}

const removePhoto = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPhotoById, [id], (error, results) => {
        // noPropertyFound bude true ak v results.rows.length niesu ziadne riadky
        const noPhotoFound = !results.rows.length;
        if (noPhotoFound) {
            res.send("Photo does not exist in the database");
        } else {
            const photo = results.rows[0];
            const name = photo.name;
            const filePath = path.join(__dirname, './upload/images', name);
            pool.query(queries.removePhoto, [id], (error, results) => {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    //res.send('File deleted successfully!');
                } else {
                    res.status(404).send('File not found');
                }
                if (error) throw error;
                res.status(200).send("Photo removed succesfully");
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
    getProperties,
    getPropertyById,
    addProperty,
    removeProperty,
    updateProperty,
    removeFavoriteProperty,
    addFavoriteProperty,
    getFavoritePropertyByMemberId,
    getFavoriteProperties,
    getPhotos,
    getPhotosByPropertyId,
    addPhoto,
    removePhoto,
    //uploadPhoto,
    getPhotoById,
    //deletePhoto,
}