import React from "react";
import { Link } from "react-router-dom";
import Form from './pizza/Form';
const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <button><Link to="/">Home</Link></button>
      <button><Link to="/pizza/Form.js">Forums</Link></button>
      <Form />
    </>
  );
};
export default App;
