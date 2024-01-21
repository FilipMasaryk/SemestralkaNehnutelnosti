const { error } = require('console')
const pool = require('./db')
const queries = require('./queries')
const validationSchema = require('./validation_schema')
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

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

const getMemberIdByName = (req, res) => {
    const name = req.params.name
    //console.log(name);
    pool.query(queries.getMemberByName, [name], (error, results) => {
        if (!results.rows.length) {
            res.status(401).send("Member with that name does not exist");
        } else {
            const member = results.rows[0];
            const data = { id: member.id };
            res.json(data)
        }
    })
}
const getMemberLogin = async (req, res) => {
    const { name, password } = req.body;
    pool.query(queries.getMemberByName, [name], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.status(401).send("Member with that name does not exist");
        } else {
            const member = results.rows[0];
            bcrypt.compare(password, member.password)
                .then(isMatch => {
                    if (isMatch) {
                        const token = jwt.sign({
                            name: member.name,
                            id: member.id
                        }, process.env.MY_SECRET, { expiresIn: "1h" })
                        res.status(200).json({ "result": "Login successful", "token": token });

                    } else {
                        res.status(402).send("Invalid password");
                    }
                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                });
        }
    })
}

const changeMemberPassword = async (req, res) => {
    const id = req.params.id
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    pool.query(queries.getMembersPassword, [id], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.status(401).send("Member with that id does not exist");
        } else {
            const originalPasswordObject = results.rows[0];
            const originalPassword = originalPasswordObject.password;
            bcrypt.compare(password, originalPassword)
                .then(isMatch => {
                    if (isMatch) {
                        pool.query(queries.updateMember, [hashedPassword, id], (error, results) => {
                            res.status(201).send("Password updated succesfully");
                        })

                    } else {
                        res.status(402).send("Invalid password");
                    }
                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                });
        }
    })
}

const addMember = async (req, res) => {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    pool.query(queries.checkNameExists, [name], (error, results) => {
        const validate = validationSchema.addMemberSchema.validate((req.body))
        if (validate.error) {
            console.error(validate.error.details);
            res.send(validate.error.details);
        } else {
            if (results.rows.length) {
                res.status(401).send("Name already exists");
            } else {
                pool.query(queries.addMember, [name, hashedPassword], (error, results) => {
                    if (error) throw error;
                    //Ak sa member vytvoril uspesne tak posli spravu
                    res.status(200).json({ "result": "Member created successfully" });
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

/*
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
}*/

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
const getProperteisByMemberId = (req, res) => {
    const member_id = req.member.id
    pool.query(queries.getProperteisByMemberId, [member_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addProperty = (req, res) => {
    const { bedroom_size, location, phone_number, price, size } = req.body;
    const member_id = req.member.id
    pool.query(queries.getMemberById, [member_id], (error, results) => {
        const validate = validationSchema.addPropertySchema.validate((req.body))
        if (validate.error) {
            console.error(validate.error.details);
            res.send(validate.error.details);
        } else {
            if (!results.rows.length) {
                res.status(401).send("Member with that id doesnt exist");
            } else {
                pool.query(queries.addProperty, [member_id, location, price, size, bedroom_size, phone_number], (error, results) => {
                    if (error) throw error;
                    const newPropertyId = results.rows[0].id;
                    //console.log(newPropertyId);
                    //Ak sa property vytvorila uspesne tak posli spravu

                    const responseMessage = {
                        status: 201,
                        message: "Property created successfully",
                        newPropertyId: newPropertyId
                    };

                    res.status(201).send(responseMessage);
                    console.log(responseMessage.message);
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
                res.status(201).send("Property removed succesfully");
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
            res.status(401).send("Property does not exist in the database");
        } else {
            const validate = validationSchema.updatePropertySchema.validate((req.body))
            if (validate.error) {
                console.error(validate.error.details);
                res.status(402).send(validate.error.details);
            } else {
                pool.query(queries.updateProperty, [updatedEntity.price, updatedEntity.phone_number, id], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Property updated succesfully");
                })
            }
        }
    })
}


const getFavoritePropertyByPropertyIdAndMemberId = (req, res) => {
    const property_id = parseInt(req.params.id);
    const member_id = req.member.id
    pool.query(queries.getFavoritePropertyByPropertyIdAndMemberId, [member_id, property_id], (error, results) => {
        if (error) {
            throw error;
        }

        if (!results.rows.length) {
            res.status(201).send("Favorite property with that id does not exist");
        } else {
            res.status(202).send("Favorite property with that id exists");
        }
    })
}

const getFavoritePropertiesByMemberId = (req, res) => {
    const member_id = req.member.id
    pool.query(queries.getFavoritePropertiesByMemberId, [member_id], (error, results) => {
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
    const member_id = req.member.id
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
    const member_id = req.member.id
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

const removeAllFavoritePropertiesByPropertyId = (req, res) => {
    const property_id = parseInt(req.params.id);
    pool.query(queries.removeAllFavoritePropertiesByPropertyId, [property_id], (error, results) => {
        res.status(201).send("Favorite properties removed succesfully");
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
    console.log("AAAA");
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
            return res.status(401).send('Property with that ID doesnt exist');
        } else {
            if (!files || req.files.length === 0) {
                return res.status(402).send('No files were uploaded.');
            } else {
                const uploadedFiles = req.files.map(file => {
                    pool.query(queries.checkPhotoNameExists, [file.filename], (error, results) => {
                        if (results.rows.length) {
                            fs.unlink(file.path, (err) => {
                                if (err) {
                                    console.error(`Error deleting file ${file.path}: ${err}`);
                                }
                            });
                            console.log("Photo with this name already exists");
                            return res.status(403).send("Photo with this name already exists");
                        } else {
                            pool.query(queries.addPhoto, [property_id, file.filename], (error, results) => {
                                if (error) throw error;
                                console.log("Photo created successfully");
                            })
                        }
                    })
                    return {
                        filename: file.filename,
                        image_url: `http://localhost:5174/images/${file.filename}`,
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

const removePropertyPhotos = (req, res) => {
    const property_id = parseInt(req.params.id);
    pool.query(queries.getPhotosByPropertyId, [property_id], (error, results) => {
        // noPropertyFound bude true ak v results.rows.length niesu ziadne riadky
        const photos = results.rows;
        if (photos.length === 0) {
            res.send("Photo does not exist in the database");
            return;
        }
        for (let i = 0; i < photos.length; i++) {
            const photo = results.rows[i];
            const name = photo.name;
            const filePath = path.join(__dirname, './upload/images', name);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        pool.query(queries.removeAllPhotosByPropertyId, [property_id], (error, results) => {
            res.status(201).send("Photos removed succesfully");
        })
    })
}

const searchProperties = (req, res) => {
    const searchText = req.params.string;
    //console.log(searchText);
    pool.query(queries.searchProperties, [searchText], (error, results) => {
        if (error) throw error;
        res.status(201).json(results.rows);
    })
}

module.exports = {
    getMembers,
    getMemberById,
    addMember,
    removeMember,
    getProperties,
    getPropertyById,
    addProperty,
    removeProperty,
    updateProperty,
    removeFavoriteProperty,
    addFavoriteProperty,
    getFavoriteProperties,
    getPhotos,
    getPhotosByPropertyId,
    addPhoto,
    removePhoto,
    //uploadPhoto,
    getPhotoById,
    //deletePhoto,
    getMemberLogin,
    getMemberIdByName,
    getFavoritePropertyByPropertyIdAndMemberId,
    getFavoritePropertiesByMemberId,
    getProperteisByMemberId,
    removePropertyPhotos,
    removeAllFavoritePropertiesByPropertyId,
    changeMemberPassword,
    searchProperties
}