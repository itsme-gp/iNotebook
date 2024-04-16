const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Route 1: Get all notes using GET "/api/notes/fetchallnotes" . Login required

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route 2: Add new note using POST "/api/notes/addnote" . Login required

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag, date } = req.body;

      // If there are errors return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Route 3: Update an existing note using PUT "/api/notes/updatenote" . Login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a newnote object
  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Find note to updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Not found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

// Route 4: Delete a note using DELETE "/api/notes/deletenote" . Login required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Find note to be delted and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Not found");
  }

  // Delete only if user owns this Note

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  
  note = await Note.findByIdAndDelete(req.params.id);
  res.json("Success: Note deleted successfully!");
});

module.exports = router;
