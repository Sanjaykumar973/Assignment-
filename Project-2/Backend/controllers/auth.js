const User = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../modals/user");
const nodemailer = require("nodemailer");

const login = (req, res) => {
  const { email, password } = req.body;
  // check if data is valid
  if (!email || !password)
    return res.status(401).json({ success: false, message: "Invalid Data" });

  // check if user exists or not
  User.findOne({ email: email })
    .then((user) => {
      // check if user exists
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Invalid Email" });

      // check if user is verified or not
      if (user.verified == false)
        return res
          .status(401)
          .json({ success: false, message: "Please verify your email !" });
      // check the password
      bcrypt.compare(password, user.password, function (err, result) {
        // correct password
        if (result) {
          // sign the token
          const token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
            },
            "ABC1234"
          );

          // send this token to user
          return res.status(200).json({
            success: true,
            message: "Logged In Success",
            token,
            name: user.name,
          });
        }
        // incorrect password
        else {
          return res
            .status(401)
            .json({ success: false, message: "Invalid  Password" });
        }
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Something Went Wrong : " + err.message,
      })
    );
};

// const signup = (req, res) => {
//   const { name, email, password } = req.body;
//   //check if data  is valid
//   if (!email || !password || !name)
//     return res.status(401).json({ success: false, message: "invalid data" });

//   // check if the user already  exist with this email
//   User.findOne({ email: email })
//     .then((user) => {
//       //check if user exist
//       if (user)
//         return res.status(401).json({
//           success: false,
//           message: "Account with this email Already exist",
//         });

//       // has the password
//       bcrypt
//         .hash(password, 10)
//         .then(function (hashPassword) {
//           User.create({ name, email, password: hashPassword }).then(() => {
//             return res.status(200).json({
//               success: true,
//               message: "Account Successfully Created..",
//             });
//           });
//         })

//         .catch((err) =>
//           res.status(500).json({
//             success: false,
//             message: "Something went Wrong:" + err.message,
//           })
//         );
//     })
//     .catch((err) =>
//       res.status(500).json({
//         success: false,
//         message: "Something went Wrong:" + err.message,
//       })
//     );
// };

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  //check if data  is valid
  if (!email || !password || !name)
    return res.status(401).json({ success: false, message: "invalid data" });
  try {
    // check if the user already  exist with this email
    const user = await User.findOne({ email: email });

    //check if user exist
    if (user)
      return res.status(401).json({
        success: false,
        message: "Account with this email Already exist",
      });
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    // sign the token
    const token = jwt.sign(
      {
        _id: newUser._id,
        name: newUser.name,
      },
      "VERIFYMAIL123"
    );

    //send the mail

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sanjayka1993@gmail.com",
        pass: "nmxk kvwp hnzh kmpz",
      },
    });

    let mailDetails = {
      from: "sanjayka1993@gmail.com",
      to: newUser.email,
      subject: "Activate Account ",
      html: `<h1>welcome my page</h1>
      <p>we need to  verify  for submmiting the contact form</p> 
      <a href="http://localhost:8000/auth/activate-Account/${token} ">click here to verify the mail</a>`,
    };

    await mailTransporter.sendMail(mailDetails);

    res.status(200).json({
      success: true,
      message: "Account Activation link send on your mail",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong:" + err.message,
    });
  }
};

const activateAccount = async (req, res) => {
  const token = req.params.token;
  try {
    const data = jwt.verify(token, "VERIFYMAIL123");

    await User.findByIdAndUpdate(data._id, { verified: true });
    res.redirect("http://localhost:5173/");
  } catch (err) {
    res.json({ success: false, message: "Link Expired" });
  }
};
const contactForm = (req, res) => {};

module.exports = { login, signup, contactForm, activateAccount };
