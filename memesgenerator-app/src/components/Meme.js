import React from "react";
import axios from "axios";
import "../css/Meme.css";

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        memeUrl: ""
    });
    const [allMemes, setAllMemes] = React.useState([]);

    // Retrieve the meme list from the api
    React.useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
            .then(res => setAllMemes(() => {
                const memes = res.data.data.memes;
                // Initialize with a random meme
                const index = Math.floor(Math.random() * memes.length);
                setMeme(prevMeme => {
                    return {
                        ...prevMeme,
                        memeUrl: `${memes[index].url}`
                    }
                })
                return memes;
            }))
    }, []);

    function getRandomMemeUrl() {
        const index = Math.floor(Math.random() * allMemes.length);
        return allMemes[index].url;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    function setNewMemeUrl(e) {
        e.preventDefault()
        setMeme(prevMeme => {
            return {
                prevMeme,
                memeUrl: `${getRandomMemeUrl()}`
            }
        })
    }


    //Added state for memes list - Nick

    const [memesList, setMemesList] = React.useState([])
    const [isEditOn, setIsEditOn] = React.useState(false)
    const [userTopEdit, setUserTopEdit] = React.useState(memesList.topText)
    function editHandleChange(event){
        setUserTopEdit
    }
    const memeUnorderedlist = memesList.map((name, index) => {

        const imgStyle = {
            width: "200px",
            height: "200px",
        }

        return (
            <div key={index} id={index+name.topText}>
                <img src={name.memeUrl} style={imgStyle} />
                <p>{name.topText}</p>
                <p>{name.bottomText}</p>
                {isEditOn ?
                    <form>
                        <input 
                        value={userTopEdit} 
                        placeholder="Top Text"
                        name="userTopEdit"
                        onChange={editHandleChange}
                        />
                        <input placeholder="Bottom Text"/>
                        <button onClick={editButton}>Submit Edit</button>
                    </form>
                    :
                    <button onClick={editButton}>Edit</button>
                }
            </div>
        )
    })

    function editButton(){
        setIsEditOn(prevIsEditOn => !prevIsEditOn)
    }

    function addMemeList() {
        setMemesList(prevMemeList => {
            return [...prevMemeList, meme]
        })
    }
 

    return (
        <main className="main">
            <form className="form">
                <input
                    className="form--input"
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    className="form--input"
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            <button className="form--submit" onClick={setNewMemeUrl}>Get a new meme image 🖼</button>
            </form>

            <div className="meme">

            <img src={meme.memeUrl} className="meme--image" />
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>

            </div>
        </main>
    );
}