const userModel = require("../model/userModel");
const movieModel = require("../model/movieModel");
const jwt = require("jsonwebtoken");




// ======================================= AUTHENTICATION =============================================//



const authentication = async function ( req , res , next ) {
    try {
        let token = req.headers['x-api-key']; 
        console.log(token);
       
        if (!token) {
            return res.status(400).send({ status: false, message: "Token must be Present." });
        }
        jwt.verify( token, "StreamDB", function ( err , decodedToken ) {
            if (err) {
                    return res.status(403).send({ status: false, message: err.message });
            } else {
                req.token = decodedToken
                next()
            }
        });

    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
}


module.exports = {authentication};