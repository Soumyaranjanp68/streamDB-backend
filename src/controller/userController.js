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

        if (!name || !name.trim()) {
            return res.status(400).send({ status: false, message: "Name must be required or it can't be empty" });
        }

        if (!validateName(name.trim())) {
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

        if (!email || !email.trim()) {
            return res.status(400).send({ status: false, message: "Email must be required or email can't be empty" });
        }

        if (!validateEmail(email.trim())) {
            return res.status(400).send({ status: false, message: "Enter a valid email" });
        }

        const existEmail = await userModel.findOne({ email: email });

        if (existEmail) {
            return res.status(400).send({ status: false, message: "Email already exist,it should be unique" });
        }


        if (!password || !password.trim()) {
            return res.status(400).send({ status: false, message: "password must be required or password can't be empty" });
        }

        if (!validatePassword(password.trim())) {
            return res.status(400).send({ status: false, message: "Password Must be 8-15 length,consist of mixed character and special character" });
        }

       

        let userDetails = await userModel.create(data);

        return res.status(201).send({ status: true, message: "Success", data: userDetails });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



//======================================= GET User =======================================================//

const getUser = async function ( req, res ) {
    try {
        const userId = req.params.userId;
        const userDetails = await userModel.findById(userId);
        if (!userDetails) {
            return res.status(404).send({ status: false, message: "No such user exist." });
        }let token = jwt.sign({
            userId: userData._id.toString(),
        }, 'StreamDB');
      return res.cookie("access_token", token, {
    //   httpOnly: true,
      secure: process.env.NODE_ENV === "production"}).status(200).send({ status: true, message: "Successfully Login.", data:{"token":token}});
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

            if (!email || !email.trim()) {
                return res.status(400).send({ status: false, message: "Email is mandatory and can not be empty." });
            }

            email = email.toLowerCase().trim();
            if (!validateEmail(email)) {
                return res.status(400).send({ status: false, message: "Please enter a valid Email." });
            }

            if (!password || !password.trim()) {
                return res.status(400).send({ status: false, message: "Password is mandatory and can not be empty." });
            }

            const userData = await userModel.findOne({ email: email, password: password });
            if (!userData) {
                return res.status(404).send({ status: false, message: "No such user exist. Please Enter a valid Email and Passowrd." });
            }

            let token = jwt.sign({
                userId: userData._id.toString(),
            }, 'StreamDB');
          return res.cookie("access_token", token, {
          
          secure: process.env.NODE_ENV === "production"}).status(200).send({ status: true, message: "Successfully Login.", data:{"token":token}});

            // res.status(200).send({ status: true, message: "Successfully Login.", data:{"token":token}});
        } else {
            return res.status(400).send({ status: false, message: "Body can not be empty" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
} 



module.exports = { createUser, getUser, loginUser };