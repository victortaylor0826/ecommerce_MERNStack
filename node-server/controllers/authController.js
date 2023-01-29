const User = require("../data-models/userDataModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Registering a new User

exports.register = async (req, res, next) => {
  try {
    //check first if the username already exist
    const userExist = await User.findOne({ userName: req.body.userName });
    if (userExist) {
      return res.status(400).json({
        msg: "Username alredy exists. Please Login or use another username",
      });
    }
    //create a new User
    const user = new User({
      userName: req.body.userName,
      password: req.body.password,
      street: req.body.street,
      mobile: req.body.mobile,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save((err, data) => console.log(data));

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error while registering User");
  }
};
//Login User
exports.login = async (req, res, next) => {
  try {
    //find the user my username
    let user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      res.status(400).json({ msg: "Invalid username or password" });
    }
    //compare the password with the hashed password from the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //if everythign works than you might want to create a jwt token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getUser = (req, res) => {
  User.findById(req.user.id).then((usr) => res.json(usr));
};
