import "./styles.css";
import { Component } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import { render } from "@testing-library/react";

export default function App() {

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}
