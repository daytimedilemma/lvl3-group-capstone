import React from "react";

export default function MemeItem(props) {

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
        props.editMeme(props.meme, formInputs);
        toggleEdit();
    }

    function handleDelete(e) {
        e.preventDefault()
        props.deleteMeme(props.meme);
    }

    return (
        <div className="savedMeme">
            <img className="savedMemeImage" src={props.meme.memeUrl} />
            <h2 className="savedMeme-topText">{props.meme.topText}</h2>
            <h2 className="savedMeme-bottomText">{props.meme.bottomText}</h2>
            {isEditOn ?
                <form className="savedMeme" onSubmit={handleSubmit}>
                    <input
                        className="savedMeme--editBox"
                        value={formInputs.topText}
                        placeholder="Top Text"
                        name="topText"
                        onChange={handleChange}
                    />
                    <input
                        className="savedMeme--editBox"
                        value={formInputs.bottomText}
                        placeholder="Bottom Text"
                        name="bottomText"
                        onChange={handleChange}
                    />
                    <button className="savedMeme--submitBtn" type="submit">Submit Changes</button>
                </form>
                :
                <button className="savedMeme--editBtn" onClick={toggleEdit}>Edit</button>
            }
            <button className="savedMeme--deleteBtn" onClick={handleDelete}>Delete</button>
        </div>

    );
}
