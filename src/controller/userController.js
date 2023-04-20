const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { validateName, validateEmail, validatePassword, validateMobileNo } = require("../validator/validator");


const createUser = async function ( req , res ) {
    try {
        let data = req.body;
        let { name, phone, email, password } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Request can't be empty" });
        }

        if (!name) {
            return res.status(400).send({ status: false, message: "Name must be required or it can't be empty" });
        }

        if (!validateName(name)) {
            return res.status(400).send({ status: false, message: "Enter a valid name" });
        }


        if (!phone ) {
            return res.status(400).send({ status: false, message: "Phone number must be required or can't be empty" });
        }

        if (!validateMobileNo) {
            return res.status(400).send({ status: false, message: "Enter a valid indian format number" });
        }

        const existPhone = await userModel.findOne({ phone: phone })

        if (existPhone) {
            return res.status(400).send({ status: false, message: "phone is already exist,enter a unique number" });
        }

        if (!email) {
            return res.status(400).send({ status: false, message: "Email must be required or email can't be empty" });
        }

        if (!validateEmail(email)) {
            return res.status(400).send({ status: false, message: "Enter a valid email" });
        }

        const existEmail = await userModel.findOne({ email: email });

        if (existEmail) {
            return res.status(400).send({ status: false, message: "Email already exist,it should be unique" });
        }


        if (!password ) {
            return res.status(400).send({ status: false, message: "password must be required or password can't be empty" });
        }

        if (!validatePassword(password)) {
            return res.status(400).send({ status: false, message: "Password Must be 8-15 length,consist of mixed character and special character" });
        }

       

        let userDetails = await userModel.create(data);

        return res.status(201).send({ status: true, message: "Success", data: userDetails });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


// ====================================== LOGIN User ======================================================//



const loginUser = async function ( req , res ) {
    try {
        const data = req.body;
        let { email, password } = data;
        if (Object.keys(data).length != 0) {

            if (!email ) {
                return res.status(400).send({ status: false, message: "Email is mandatory and can not be empty." });
            }

            email = email.toLowerCase();
            if (!validateEmail(email)) {
                return res.status(400).send({ status: false, message: "Please enter a valid Email." });
            }

            if (!password) {
                return res.status(400).send({ status: false, message: "Password is mandatory and can not be empty." });
            }

            const userData = await userModel.findOne({ email: email, password: password });
            if (!userData) {
                return res.status(404).send({ status: false, message: "No such user exist. Please Enter a valid Email and Passowrd." });
            }

            let token = jwt.sign({
                userId: userData._id.toString(),
            }, 'StreamDB');
             res.header("token", token) 
            return res.status(200).send({ status: true, message: "Successfully Login.", data:{"token":token}});
       
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
} 



module.exports = { createUser, loginUser };