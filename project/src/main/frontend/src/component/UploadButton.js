import "./UploadButton.css";
import React from "react";
import {Button} from "react-bootstrap";

const UploadButton = props => {
    const fileInput = React.useRef(null);

    const handleButtonClick = e => {
        fileInput.current.click();
    };

    const handleChange = e =>{
        console.log(e.target.files[0]);

    };
    return (
        <React.Fragment>
            <Button className='upload-button' onClick={handleButtonClick}>Upload File</Button>
            <input type="file"
                   ref={fileInput}
                   onChange={handleChange}
                   style={{display: "none"}} />
        </React.Fragment>
    );
}

export default UploadButton;