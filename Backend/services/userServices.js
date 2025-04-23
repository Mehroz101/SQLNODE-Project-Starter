const { connectDB, sql } = require("../config/db");

 const createUser = async (username,password,role) => {
    try {
        const pool = await connectDB();
        if (!pool) {
            throw new Error("Database connection failed");
        }
        else{
            const result1 = await pool.request()
            .input("username",sql.NVarChar(100),username)
            .input("password",sql.NVarChar(100),password)
            .query("SELECT * FROM Users Where username = @username")
            if (result1.recordset.length > 0) {
                console.log("User already exists:", result1.recordset[0]);
                return null; // User already exists
            }
            const result = await pool.request()
            .input("username",sql.NVarChar(100),username)
            .input("password",sql.NVarChar(100),password)
            .input("role",sql.NVarChar(50),role)
            .query("INSERT INTO Users (username,password,role) VALUES (@username, @password, @role)")
            return result; // Return the created user object
        }
    } catch (error) {
        console.error("Error creating user:", error.message);
        throw new Error("Error creating user");
    }
}
 const findUser = async (username,password) => {
    try {
        const pool = await connectDB();
        if (!pool) {
            throw new Error("Database connection failed");
        }
        else{
           const result = await pool.request()
           .input("username",sql.NVaraChar(100),username)
           .input("password",sql.NVarChar(100),password)
           .query("SELECT * FROM Users Where username = @username And password = @password")
           return result.recordset; // Return the found user object
        }
    } catch (error) {
        console.error("Error finding user:", error.message);
        throw new Error("Error finding user");
    }
}


module.exports = {
    createUser,
    findUser,
  };