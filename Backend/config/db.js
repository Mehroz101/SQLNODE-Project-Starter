  const sql = require("mssql/msnodesqlv8");

  const config = {
    connectionString:
      "Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=test;Trusted_Connection=Yes;",
  };

  let pool;

  const connectDB = async () => {
    if (pool) return pool; // Reuse existing pool
    try {
      pool = await sql.connect(config);
      console.log("✅ Connected to MSSQL");
      return pool;
    } catch (err) {
      console.error("❌ MSSQL connection failed:", err.message);
      throw err;
    }
  };

  module.exports = { connectDB, sql };