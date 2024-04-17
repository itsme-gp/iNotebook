import React, { useContext, useEffect } from "react";

import noteContext from "../context/note/noteContext";

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  }, []);
  return (
    <div>
      This is {a.state.name} and in class {a.state.class}
    </div>
  );
};

export default About;
