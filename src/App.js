import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <button><Link to="/">Home</Link></button>
    </>
  );
};
export default App;
