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
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                memeUrl: `${getRandomMemeUrl()}`
            }
        })
    }

    const editMeme = (meme, update) => {
        setMemesList(prevMemeList => {
            return prevMemeList.map(cMeme => {
                if (cMeme === meme) {
                    return {
                        ...cMeme,
                        ...update
                    }
                }
                else
                    return cMeme
            })
        });
    }

    function deleteMeme(meme) {
        setMemesList(prevMemeList => {
            return prevMemeList.filter(cMeme => cMeme != meme);
        });
    }

    const [memesList, setMemesList] = React.useState([])
    const memeElements = memesList.map(element => {
        return (
            <MemeItem
                key={element.id + Math.random()}
                meme={element}
                editMeme={editMeme}
                deleteMeme={deleteMeme}
            />
        );
    })

    function addMemeList(event) {
        event.preventDefault()
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
                <button className="form--submit" onClick={addMemeList}>Add Meme</button>
            </form>

            <div className="meme">
                <img src={meme.memeUrl} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>

            <ol className="savedMeme">
                {memeUnorderedlist}
            </ol>
        </main>
    );
}