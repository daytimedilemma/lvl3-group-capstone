import React from "react"
import "./css/App.css"
import Meme from "./components/Meme";
import Navbar from "./components/Navbar";


export default function App() {
    return (
        <>
        <Navbar />
        <Meme /> 
        </>
    )
}