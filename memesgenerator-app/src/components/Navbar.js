import React from "react"
import "../css/Navbar.css"
import trollPhoto from "../images/Troll Face-1.jpg"



export default function Navbar(){   
    return(
        <nav className="nav">
            <img className="nav--image" src={trollPhoto} alt=""/>
            <h2 className="nav--title">Meme Generator</h2>                
            <h3 className="nav--project">React/Capstone</h3>
        </nav>
        )
    }