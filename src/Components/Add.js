import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Add() {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state);
    return (
        <React.Fragment>
            <div className="backgroundImage2 container d-flex fullscreen align-items-center justify-content-center flex-column">
                <p className="p1">
                    We are sorry to say this, but there are some words in your text, that we don't know yet. We are working on it.
                    But if you know the sign for these words, please add them to the dictionary using the below button or else please click on "Back" button.
                </p>
                <div className="d-flex">
                    <button onClick={()=> navigate("/home")} className="btn btn-outline-dark m-2">
                        Back
                    </button>

                    <button onClick={()=> navigate("/upload", {state: location.state})} className="btn btn-success m-2">
                            Upload
                    </button>
                </div>
        
        
        
            </div>
        </React.Fragment>
    )
}

export default Add;