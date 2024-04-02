import "dotenv/config";

const config = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  mongoURI: process.env.MONGO_URI,
};

export default config;
