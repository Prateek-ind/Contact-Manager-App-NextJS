const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.model");
const protect = require("../middleware/auth.middleware");

router.use(protect);

router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      userId: req.userId,
    });
    if (!contact) {
     return res.status(400).json({ message: "Unable to create contact" });
    }

    res.status(201).json({
      message: "Contact created",
      contact: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.userId });

    if (!contacts) {
     return res.status(400).json({ message: "Unable to create contact" });
    }

    res.status(200).json({
      message: "Fetch contact Success",
      contacts: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const {id} = req.params
  try {
    const contact = await Contact.findById(id);

    if (!contact) {
     return res.status(404).json({
        message: "Contact not found",
      });
    }
    res.status(200).json({
      message: "Contact found",
      contact: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
     return res.status(400).json({ message: "Error updating contact" });
    }

    res.status(200).json({
      message: "Contact updated",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(400).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Contact deleted",
      contact: deletedContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
