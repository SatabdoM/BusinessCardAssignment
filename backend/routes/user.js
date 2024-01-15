const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Cards } = require("../db/");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

router.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    //Do ZOD verification

    //check if user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(200).json({
        msg: "User Already Exists. Please Log In",
      });
    }
    const newUser = await User.create({
      username: username,
      password: password,
    });
    if (newUser) {
      return res.status(200).json({
        msg: "User Created Successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    //check if user already exists
    const existingUser = await User.findOne({
      username: username,
    });
    if (!existingUser) {
      return res.status(404).json({
        msg: "User Does not exist. Please Sign Up",
      });
    }
    if (password != existingUser.password) {
      return res.status(401).json({
        msg: "Password do not match",
      });
    }

    const token = jwt.sign({ username: username, password: password }, secret);
    return res.status(200).json({
      msg: "Logged in Successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});
//get all the business cards for the user
router.get("/getCards", userMiddleware, async (req, res) => {
  try {
    const userDb = await User.findOne(req.username);
    if (!userDb) {
      return res.status(404).json({
        msg: "User Not Found",
      });
    }
    const userCards = await Cards.find({ _id: { $in: userDb.cards } });
    return res.status(200).json({
      userCards,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

router.post("/create", userMiddleware, async (req, res) => {
  try {
    const { name, description, interests, linkedin, twitter } = req.body;
    const newCard = new Cards({
      name,
      description,
      interests,
      linkedin,
      twitter,
    });
    await newCard.save();
    const userDb = await User.findOne(req.username);
    userDb.cards.push(newCard);
    await userDb.save();
    return res.status(200).json({
      msg: "Card Created Succssfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

module.exports = router;

// {
//   "name":"Satabdo Majumder",
//   "description":"Full Stack Web Developer",
//   "interests":["Coding","Guitar","Games"],
//   "linkedin":"linkedin.com",
//   "twitter":"twitterx.com"
// }
