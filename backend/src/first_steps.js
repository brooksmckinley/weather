const mongoose = require('mongoose');
const User = require("./schemas/User");
require('dotenv').config();

mongoose.connect(process.env.MONGO_CONNECT_STR);

run()

async function run()
{
    // Create User
    // const user = await User.create({
    //     firstName: "John",
    //     lastName: "Smith",
    //     email:"jsmith@gmail.com",
    //     password:"pw123"
    // });

    // Compare passwords
    // inputPassword = "pw123";
    // const user = await User.findOne({ firstName: "John" });
    // console.log("Validating password for " + user.firstName + " " + user.lastName);
    // try
    // {
    //     if(await bcrypt.compare(inputPassword, user.password))
    //     {
    //         console.log("Passwords match!");
    //     }
    //     else
    //     {
    //         console.log("Invalid password");
    //     }
    // }
    // catch (err)
    // {
    //     console.err(err);
    // }

    // Delete User
    // const user = await User.deleteOne({
    //     firstName: "John"
    // });

    // const user = await User.findById({ _id: "6431db2bef8a466f031657d2"});
    const user = await User.find({ email: {$regex : "js"}});
    
    console.log(user);
}