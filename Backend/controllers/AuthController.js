const {createUser, findUser} = require("../services/userServices");
const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await createUser(username, password, role);
    console.log("✅ User created successfully!", user);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("❌ Error inserting user:", error.message);
    throw new Error("Error inserting user");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUser(username, password);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    console.log("✅ User found successfully!", user);
    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { signup, login };
