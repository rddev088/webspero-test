import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  mobile: { type: String, required: true },
  zipCode: { type: String, required: true },
  profilePic: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      default: [76.748704, 30.719059], // Default value for coordinates sector 43
    },
  },
});

// Create a 2dsphere index on the 'location' field
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

export default User;
