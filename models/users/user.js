const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");


const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const subscriptions =["starter", "pro", "business"]
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      match:emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
