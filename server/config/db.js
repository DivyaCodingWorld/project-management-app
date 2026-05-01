const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tlsAllowInvalidCertificates: true,   // ✅ add this
      tlsAllowInvalidHostnames: true       // ✅ add this
    });

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("❌ DB Error:", err.message);
  }
};

module.exports = connectDB;