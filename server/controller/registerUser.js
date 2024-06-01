const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs')

async function registerUser(request, response) {
    try {
        const { name, email, password, profile_pic } = request.body

        //checking for unique email
        const checkEmail = await UserModel.findOne({ email })   //this will return all info of user {name,email}  else  //null  
        if (checkEmail != null) {
            return response.status(409).json({
                message: "Email Already exists",
                error: true
            })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password, salt);

        //formatting the data as payload
        const payload = {
            name,
            email,
            profile_pic,
            password: hashpassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return response.status(201).json({
            message: "new User created successfully",
            data: userSave,
            success: true
        })

    } catch (error) {
        console.log(`error in registerUser.js ${error}`);
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = registerUser