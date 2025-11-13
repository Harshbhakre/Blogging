    import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
},{
    timestamps:true
  });

export const UserModel = mongoose.model("Users", userSchema);
