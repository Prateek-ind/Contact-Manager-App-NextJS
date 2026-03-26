const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const contact = mongoose.model("Contact", contactSchema);

module.exports = contact;
