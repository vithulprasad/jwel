const OTP_model = require("../models/OTP_model");
const Admin_model = require("../models/Admin_model");
const nodemailer = require("../config/mailer")
const bcrypt = require("bcrypt");
const jwt = require('../config/jwt')


const RANDOM_OTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

exports.admin_login = async (req, res) => {
  try {
    const { Email, password } = req.body;
    const find_admin = await Admin_model.findOne({ Email: Email });
    if (!find_admin) {
      return res.status(400).json({ message: "email is incorrect" });
    }
    const passwordMatch = await bcrypt.compare(password, find_admin.password);

    if (!passwordMatch) {
      return  res.status(400).json({ message: "password is incorrect", data: [] });
    }

    await OTP_model.deleteMany({FROM:Email})
    const create_otp =await new OTP_model({
      OTP:RANDOM_OTP(),
      FROM:Email
    }).save()
    const response =  nodemailer.sendEmail(
        Email,
        'otp for real admin',
        `Your OTP is ${create_otp.OTP}`
      );

    res.status(200).json({ message: "Otp sent to your email",data:response});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.admin_sign_up = async (req, res) => {
  try {
    console.log("admin sign up");
    const { name, Email, password } = req.body;

    if (!name || !Email || !password) {
      return res.status(400).json({
        message: "Please provide name, Email, and password",
      });
    }

    const find_admin_exist = await Admin_model.find();
    if (find_admin_exist.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const create_admin = new Admin_model({
      name,
      Email,
      password: passwordHash,
    });

    await create_admin.save();

    res.status(201).json(create_admin);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(500).json({ message: error.message });
  }
};

exports.admin_sign_in_otp = async (req, res) => {
  try {
    const {Email,OTP} =req.body

    const find_otp = await OTP_model.findOne({FROM:Email})

    const find_email = await Admin_model.findOne({Email:Email})

    if(!find_email){
      return res.status(400).json({message:'email not exists'})
    }

    if(!find_otp){
      return res.status(400).json({message:'otp not registered to email please try again'})
    }
    
    if(find_otp.OTP != OTP){
          return res.status(400).json({message:'otp not matching'})
    }

    await OTP_model.deleteMany({FROM:Email})
  
       const token = jwt.generateToken({user_id:find_email._id})


    res.status(200).json({message:'otp verified',token:token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.verify=async(req,res)=>{
  try {
     const find_verified = jwt.verifyTokenCheck(req.query?.token)
       console.log(find_verified)
       if(find_verified.user_id){
          res.status(200).json({message:'ok'})
       }else{
         res.status(400).json({message:'token expired'})
       }
           
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}