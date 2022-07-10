import React from "react";
import axios from "axios";
import MemeItem from "./MemeItem";
import "../css/Meme.css";

export default function Meme() {

    const [meme, setMeme] = React.useState({
        id: 0,
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
                        id: `${memes[index].id}`,
                        memeUrl: `${memes[index].url}`
                    }
                })

                return memes;
            }))
    }, []);

    function getRandomMeme() {
        const index = Math.floor(Math.random() * allMemes.length);
        return {
            topText: `${meme.topText}`,
            bottomText: `${meme.bottomText}`,
            id: allMemes[index].id,
            memeUrl: allMemes[index].url
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value === undefined ? "" : value
            }
        })
    }

    function setNewMeme(e) {
        e.preventDefault()
        setMeme(getRandomMeme());
    }

    //Added state for memes list - Nick

    const [memesList, setMemesList] = React.useState([])

    function addMemeList(e) {
        e.preventDefault()
        setMemesList(prevMemeList => {
            return [
                ...prevMemeList,
                <MemeItem
                    key={meme.id + Math.random()}
                    meme={meme}
                    deleteMeme={deleteMeme}
                />
            ]
        })
    }

    function deleteMeme(meme) {
        setMemesList(prevMemeList => {
            return prevMemeList.filter(cMeme => cMeme.props.meme != meme);
        });
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
                <button className="form--submit" onClick={setNewMeme}>Get a new meme image 🖼</button>
                <button className="form--submit" onClick={addMemeList}>Add Meme</button>
            </form>

            <div className="meme">
                <img src={meme.memeUrl} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>

            <div className="saved">
            <ol className="savedMeme">
                {memesList}
            </ol>
            </div>
        </main>
    );
}