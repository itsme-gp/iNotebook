import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxOGRlOTAwZDY5OGE1NjMyOTNhNGUwIn0sImlhdCI6MTcxMzAwNjYwN30.NO9BoydBFr01CczIbRZ6KFFyooQjA7y4z0j0JUNpJy0",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxOGRlOTAwZDY5OGE1NjMyOTNhNGUwIn0sImlhdCI6MTcxMzAwNjYwN30.NO9BoydBFr01CczIbRZ6KFFyooQjA7y4z0j0JUNpJy0",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    console.log("Adding  a note");
    const note = {
      _id: "661bd4534380ce",
      user: "6618de900d698a563294e0",
      title: title,
      description: description,
      tag: tag,
      date: "2024-04-14T13:04:19.634Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxOGRlOTAwZDY5OGE1NjMyOTNhNGUwIn0sImlhdCI6MTcxMzAwNjYwN30.NO9BoydBFr01CczIbRZ6KFFyooQjA7y4z0j0JUNpJy0",
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting  a note with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxOGRlOTAwZDY5OGE1NjMyOTNhNGUwIn0sImlhdCI6MTcxMzAwNjYwN30.NO9BoydBFr01CczIbRZ6KFFyooQjA7y4z0j0JUNpJy0",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    //  Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
