const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");

const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      match: [emailRegexp, "email is not valid"],
      validate: [
        {
          async validator(email) {
            try {
              const user = await models.User.findOne({ email });
              return !user;
            } catch (error) {
              return false;
            }
          },
          message: "The email is already in use",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      match: [passwordRegexp, "password is not valid"],
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = model("User", usersSchema);

module.exports = User;
