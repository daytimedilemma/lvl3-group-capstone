import React from "react"
import "../css/Navbar.css"
import trollPhoto from "../images/Troll Face-1.jpg"
export default function Navbar(){
    
    return (
        <nav>
            <img src={trollPhoto}/>
            <h2>Meme Generator Hello there</h2>
            <h3>Level 3 Group Capstone</h3>
        </nav>
    )
}