import React from "react";

export default function MemeItem(props) {

    const [meme, setMeme] = React.useState(props.meme);
    const [isEditOn, setIsEditOn] = React.useState(false);
    const [formInputs, setFormInputs] = React.useState({
        topText: props.meme.topText,
        bottomText: props.meme.bottomText
    });

    function toggleEdit() {
        setIsEditOn(!isEditOn)
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormInputs(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                ...formInputs
            }
        })
        toggleEdit();
    }

    return (
        <div>
            <img src={meme.memeUrl} />
            <p>{meme.topText}</p>
            <p>{meme.bottomText}</p>
            {isEditOn ?
                <form onSubmit={handleSubmit}>
                    <input
                        value={formInputs.topText}
                        placeholder="Top Text"
                        name="topText"
                        onChange={handleChange}
                    />
                    <input
                        value={formInputs.bottomText}
                        placeholder="Bottom Text"
                        name="bottomText"
                        onChange={handleChange}
                    />
                    <button type="submit">Submit Changes</button>
                </form>
                :
                <button onClick={toggleEdit}>Edit</button>
            }
        </div>

    );
}