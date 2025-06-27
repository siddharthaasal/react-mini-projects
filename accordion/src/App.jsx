import { useState } from 'react'
import './App.css'
import Accordion from "./components/Accordion"
function App() {

  const items = [
    { title: "Item1", content: "this is item 1" },
    { title: "Item2", content: "this is item 2" },
    { title: "Item3", content: "this is item 3" }
  ];

  return (
    <>
      <Accordion items={items} />
    </>
  )
}

export default App
