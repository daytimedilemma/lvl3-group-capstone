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
        const {name, value} = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    function setNewMemeUrl() {
        setMeme(prevMeme => {
            return {
                prevMeme,
                memeUrl: `${getRandomMemeUrl()}`
            }
        })
    }

   
    //Added state for memes list - Nick

    const [memesList, setMemesList] = React.useState([])
    const memeUnorderedlist = memesList.map((name, index) =>{

        const imgStyle = {
            width: "200px",
            height: "200px",
        }


        return (
            <div key={index}>
                <img src={name.memeUrl} style={imgStyle}/>
                <p>{name.topText}</p>
                <p>{name.bottomText}</p>
                <button>Delete</button>
            </div>
        )
    })
    function addMemeList(){
        setMemesList(prevMemeList => {
            return [...prevMemeList, meme]
        })
    }
    
    return (
        <section>
            <form>
                <input
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </form>
            <button onClick={setNewMemeUrl}>Get a random meme</button>
            <button onClick={addMemeList}>Add Meme</button>

            <div>
            <img src={meme.memeUrl} className="meme-image" />
            <p>{meme.topText}</p>
            <p>{meme.bottomText}</p>
            </div>
            <ol>
               {memeUnorderedlist} 
            </ol>
        </section>
    );
}