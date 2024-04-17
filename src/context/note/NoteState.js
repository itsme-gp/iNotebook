import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Pratik",
    class: "12",
  };

  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "natik",
        class: "1",
      });
    }, 2000);
  };

  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
