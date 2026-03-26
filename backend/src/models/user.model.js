const mongoose = require("mongoose");
const bycrypt = require("bcryptjs")
console.log("bcrypt:", bycrypt)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
   console.log("pre save hook fired")
  
  if (!this.isModified("password")) return ;
  this.password = await bycrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bycrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
