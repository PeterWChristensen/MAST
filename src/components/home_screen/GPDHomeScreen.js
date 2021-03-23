import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalDialog from '../modal/ModalWindow'

class GPDHomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            showModalDialogPopup: false,
            modalType: "none"
        }    
    }

      //Displays or Hides the Modal Dialog PopUp 
    showModalDialogPopUp = (type) => {
        this.setState({modalType: type, showModalDialogPopup: true});
    }

    hideModalDialogPopUp = () => {
        this.setState({showModalDialogPopup: false});
    }

    render() {
        return (
            <div>
                 {this.state.showModalDialogPopup ? <ModalDialog modalType={this.state.modalType} hideModalDialogPopUp={this.hideModalDialogPopUp.bind(this)} /> : null} 
                <div id="GPDHomepageScreen">
                <div class="dropdown">
                    <button class="dropbtn">Import</button>
                    <div class="dropdown-content">
                        <a href="#" onClick={() => this.showModalDialogPopUp("importDegreeRequirements")}>Degree Requirements</a>
                        <a href="#" onClick={() => this.showModalDialogPopUp("importCourseInformation")}>Course Information</a>
                        <a href="#" onClick={() => this.showModalDialogPopUp("importCourseOfferings")}>Course Offerings</a>
                        <a href="#" onClick={() => this.showModalDialogPopUp("importStudentData")}>Student Data</a>
                        <a href="#" onClick={() => this.showModalDialogPopUp("importGrades")}>Grades</a>
                    </div>
                    </div>
                        <Link to={{pathname: '/addStudent'}}><button className="GPDHomepageButton">Add Student</button></Link>
                        <button className="GPDHomepageButton">Delete All Student Data</button>
                </div>
            </div>
        );
    }

}

export default GPDHomeScreen;
