const dns = require('dns');
dns.setServers(['8.8.8.8']);

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`TaskFlow server running on port ${PORT}`);
  });

  app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskFlow API is running",
    });
  });
};

startServer();
