import React from 'react';    
import { Link } from 'react-router-dom';
import CSVReader from "react-csv-reader";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
};

class ModalWindow extends React.Component {  
    constructor(props){
        super(props)
        this.state = {
            isRedirectToHome: this.props.isRedirectToHome,
            /* These state objects will hold the parsed info from files to be uploaded upon pressing import button */
            degreeRequirements: "none",
            courseInformation: "none",
            courseOfferings: "none",
            studentData: "none",
            studentDataCoursePlans: "none",
            grades: "none"
        }
        this.handleImportDegreeRequirementsFile = this.handleImportDegreeRequirementsFile.bind(this);
        this.handleImportCourseInformationFile = this.handleImportCourseInformationFile.bind(this);
        this.handleImportCourseOfferingsFile = this.handleImportCourseOfferingsFile.bind(this);  
        this.handleImportStudentDataFile = this.handleImportStudentDataFile.bind(this);
        this.handleImportStudentDataCoursePlansFile = this.handleImportStudentDataCoursePlansFile.bind(this);
        this.handleImportGradesFile = this.handleImportGradesFile.bind(this);
        this.handleImportDegreeRequirements = this.handleImportDegreeRequirements.bind(this);
        this.handleImportCourseInformation = this.handleImportCourseInformation.bind(this);
        this.handleImportCourseOfferings = this.handleImportCourseOfferings.bind(this);  
        this.handleImportStudentData = this.handleImportStudentData.bind(this);
        this.handleImportStudentDataCoursePlans = this.handleImportStudentDataCoursePlans.bind(this);
        this.handleImportGrades = this.handleImportGrades.bind(this);
    }

    /* Following functions handle data from files */
    handleImportDegreeRequirementsFile(){
        
    }

    handleImportCourseInformationFile(){
        
    }

    handleImportCourseOfferingsFile = function(data, fileInfo) {
        this.setState({courseOfferings: data});
    }

    handleImportStudentDataFile = function(data, fileInfo) {
        this.setState({studentData: data});
    }

    handleImportStudentDataCoursePlansFile = function(data, fileInfo) {
        this.setState({studentDataCoursePlans: data});
    }

    handleImportGradesFile = function(data, fileInfo) {
        this.setState({grades: data});
        console.log(data)
    }
    

    /* Following functions upload data to the database */
    handleImportDegreeRequirements(){
    
    }

    handleImportCourseInformation(){
        
    }

    handleImportCourseOfferings(){

    }

    handleImportStudentData(){

    }

    handleImportStudentDataCoursePlans() {

    }

    handleImportGrades() {

    }

    render() {
 
        // Type variable to store modal to display
        let modalContents = null; 

        if(this.props.modalType === "importDegreeRequirements"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    Add file import for pdf
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportDegreeRequirements, this.props.hideModalDialogPopUp} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importCourseInformation"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    Add file import for XML/JSON
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportCourseInformation, this.props.hideModalDialogPopUp} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importCourseOfferings"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    <CSVReader
                        label="Choose file to import: "
                        onFileLoaded={this.handleImportCourseOfferingsFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.props.hideModalDialogPopUp} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.handleImportCourseOfferings, this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importStudentData"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    <CSVReader
                        label="Choose student profile file to import: "
                        onFileLoaded={this.handleImportStudentDataFile}
                        parserOptions={papaparseOptions}/>
                    <CSVReader
                        label="Choose student course plan file to import: "
                        onFileLoaded={this.handleImportStudentDataCoursePlansFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportStudentData, this.handleImportStudentDataCoursePlans, this.props.hideModalDialogPopUp} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importGrades"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    <CSVReader
                        label="Choose file to import: "
                        onFileLoaded={this.handleImportGradesFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportGrades, this.props.hideModalDialogPopUp} >Import</button></Link>
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
                <Link to="/"><button className="modalButton" onClick={this.props.addStudent} >Yes</button></Link>
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