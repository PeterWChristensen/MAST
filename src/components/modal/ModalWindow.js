import React from 'react';    
import { Link } from 'react-router-dom';

class ModalWindow extends React.Component {  

    render() {
        // Type variable to store modal to display
        let modalContents = null; 

        if(this.props.modalType === "import"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    Choose file to import: 
                    <br></br><br></br>
                    <input type="file" id="fileToImport" name="filename"></input>
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.props.hideModalDialogPopUp} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "addStudent"){
            modalContents =
            <div className="modal" id="addStudent" header="Add" >
                <p id="modalDialogMessage">
                Do you want to add this student?
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.props.hideModalDialogPopUp} >Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >No</button>    
            </div>;
        }
        else if(this.props.modalType === "cancelAddStudent"){
            modalContents =
            <div className="modal" id="cancelAddStudent" header="Cancel"  >
                <p id="modalDialogMessage">
                Cancel adding student?
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.props.hideModalDialogPopUp}>Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp}>No</button> 
            </div>
        }
        return (  
        <div>
            <div id = "modal_background">
                    {modalContents}
            </div>
        </div>
        );  
    }  
}  
export default ModalWindow;