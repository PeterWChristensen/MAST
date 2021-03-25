import React, { Component } from 'react';
import ModalDialog from '../modal/ModalWindow'
import StudentService from "../../services/student.service";

class AddStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            department: "AMS",         
            showModalDialogPopup: false,
            modalType: "none",
            firstName: "",
            lastName: "",
            id: "",
            email: "",
            track : "",
            entrySemester: "Fall",
            entryYear: "2021"
        }    
    }

      //Displays or Hides the Modal Dialog PopUp 
    showModalDialogPopUp = (type) => {
        this.setState({modalType: type, showModalDialogPopup: true});
    }

    hideModalDialogPopUp = () => {
        this.setState({showModalDialogPopup: false});
    }

    addStudent() {
        var data = {
            studentID: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            nSemestersInProgram: 0,
            email: this.state.email,
            departmentID: this.state.department,
            entrySemester: this.state.entrySemester,
            entryYear: this.state.entryYear
        };
        console.log(data);
        StudentService.create(data)
            .then(response => {
                this.setState({
                    studentID: response.data.studentID,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    nSemestersInProgram: response.nSemestersInProgram,
                    email: response.data.email,
                    departmentID: response.data.departmentID,
                    entrySemester: response.data.entrySemester,
                    entryYear: response.data.entryYear

                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
   }



    render() {

        // Function that will set different values to state variable based on department selected
        const changeDepartmentOptionHandler = (event) => { 
            this.setState({department: event.target.value}); 
        }; 
        const changeFirstNameHandler = (event) => { 
            this.setState({firstName: event.target.value}); 
        }; 
        const changeLastNameHandler = (event) => { 
            this.setState({lastName: event.target.value}); 
        }; 
        const changeSBUIDHandler = (event) => { 
            this.setState({id: event.target.value}); 
        }; 
        const changeEmailHandler = (event) => { 
            this.setState({email: event.target.value}); 
        }; 
        const changeTrackOptionHandler = (event) => { 
            this.setState({track: event.target.value}); 
        }; 
        const changeEntrySemesterOptionHandler = (event) => { 
            this.setState({entrySemester: event.target.value}); 
        }; 
        const changeEntryYearOptionHandler = (event) => { 
            this.setState({entryYear: event.target.value}); 
        }; 


        // Different arrays for different dropdowns 
        const ams = [ "Computational Applied Mathematics", "Computational Biology", 
            "Operations Research", "Statistics", "Quantitative Finance"]; 
        const bmi = ["Clinical Informatics", "Imaging Informatics", "Translational Bioinformatics"]; 
        const ese = ["None"]; 
        const cse = ["None"]; 
        
        // Type variable to store different array for different dropdown
        let type = null; 
        
        //This will be used to create set of options that user will see
        let options = null; 
        
        // Setting Type variable according to dropdown
        if (this.state.department === "AMS") { 
            type = ams; 
        } else if (this.state.department === "BMI") { 
            type =bmi; 
        } else if (this.state.department === "ESE") { 
            type = ese; 
        } else if (this.state.department === "CSE") { 
            type = cse; 
        } 
        
        // If "Type" is null or undefined then options will be null, otherwise it will create a options iterable based on our array 
        if (type) { 
            options = type.map((el) => <option key={el}>{el}</option>); 
        } 

        return (
            <div>
                {this.state.showModalDialogPopup ? <ModalDialog modalType={this.state.modalType} hideModalDialogPopUp={this.hideModalDialogPopUp.bind(this)} addStudent={this.addStudent.bind(this)}/> : null}
                <div id="addStudentForm">
                    <h2 id="addStudentFormHeader">Student Information</h2>
                    <div>
                        <div className="addStudent_prompt">First Name:</div>
                        <input className="addStudent_input" type="input" onChange={changeFirstNameHandler}/>
                        <div className="addStudent_prompt">Last Name:</div>
                        <input className="addStudent_input" type="input" onChange={changeLastNameHandler}/>
                        <div className="addStudent_prompt">SBU ID:</div>
                        <input  className="addStudent_input" type="input" onChange={changeSBUIDHandler}/>
                        <div className="addStudent_prompt">Email:</div>
                        <input  className="addStudent_input" type="input" onChange={changeEmailHandler}/>

                        <div className="addStudent_prompt">Department:</div>
                        <select id="departmentSelect" className="dropdownSelect" onChange={changeDepartmentOptionHandler}>
                            <option value="AMS">AMS</option>
                            <option value="BMI">BMI</option>
                            <option value="ESE">ESE</option>
                            <option value="CSE">CSE</option>
                        </select>
                        <div className="addStudent_prompt">Track:</div>
                        <select id="semesterSelect" className="dropdownSelect" onChange={changeTrackOptionHandler}>
                            {options}
                        </select>

                        <div className="addStudent_prompt">Entry Semester:</div>
                        <select id="semesterSelect" className="dropdownSelect" onChange={changeEntrySemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer1</option>
                            <option value="Summer">Summer2</option>
                        </select>
                    </div>
                        <div className="addStudent_prompt">Entry Year:</div>
                        <select id="entryYearSelect" className="dropdownSelect" onChange={changeEntryYearOptionHandler}>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                        </select>
                        <br></br><br></br>
                        <button id="addStudentForm_submit_button" className="addStudent_button" onClick={() => this.showModalDialogPopUp("addStudent")}>Add Student</button>
                        <button id="addStudentForm_cancel_button" className="addStudent_button" onClick={() => this.showModalDialogPopUp("cancelAddStudent")}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default AddStudentScreen;
