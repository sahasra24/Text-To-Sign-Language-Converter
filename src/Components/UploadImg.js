import React, {useEffect} from "react";
import { useState } from "react";
import axios from 'axios';
import { dic } from "../dictionary";
import { useLocation } from "react-router-dom";

function UploadImg() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [i, setI] = useState(0);
    const [currentFile, updateCurrentFile] = useState('');

    const location = useLocation();
    const missingWords = location.state.missingWords;
    const community= location.state.Community;

    const fileChange = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

    const fileUpload = () => {
        const formData = new FormData();
        formData.append("myFile", selectedFile, currentFile);
        axios.post('http://localhost:3001/api/upload', formData)
            .then(res => {
                console.log(res, "response");
                if(res.data.success) {
                    console.log(missingWords[i], "missingword");
                    // axios.get('http://localhost:3001/api/updateDict/'+missingWords[i])
                    axios.get(`http://localhost:3001/${community}/${missingWords[i]}/add`)
                      .then(res => {
                        if(res.data.success) {
                            setI(i+1);
                        }
                      })

                }
            })
    }

    const handleClick = () => {
        alert("Currently you're uploading the sign for "+missingWords[i])
        updateCurrentFile(missingWords[i]+'-'+community+'.png');
    }
    return (

        <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
            <div className='container p-4'>
                <div className='d-flex justify-content-around align-items-center mb-5'>
                <div className="text-center">
                    <h1>Text to Hand-Sign</h1>
                    <h6>Make your conversation more effective and quick with your loved ones.</h6>
                </div>
                </div>
            </div>
            <div className="container">
                <div className="p-4 align-items-left border border-1 rounded">
                    <p>
                        We are sorry to say this, but there are some words in your text, that we don't know yet. We are working on it.
                        But if you know the sign for these words, please add them to the dictionary using the below button.
                    </p>
                    <p>
                        Unknown words are: {missingWords.map((word, index) => <span key={index}>{word}, </span>)}
                    </p>

                    <input type="file" name="myFile" onClick={handleClick} onChange={fileChange}></input> <br></br>

                    <button className='btn mt-3' onClick={fileUpload} disabled={false}>Add to Dictionary</button>
                    <p style={{fontSize: '10px'}}>You can add the picture of them in JPEG OR PNG Format.</p>
                </div>
            </div>
        </div>
        )
}

export default UploadImg;
