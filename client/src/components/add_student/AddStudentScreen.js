import React, { Component } from 'react';
import ModalDialog from '../modal/ModalWindow'
import StudentService from "../../services/student.service";

class AddStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {      
            showModalDialogPopup: false,
            modalType: "none",
            studentID: null,
            firstName: null,
            lastName: null,
            entrySemester: "Fall",
            entryYear: 2021,
            gradSemester: "Fall",
            gradYear: 2025,
            nSemestersInProgram: null,
            gpa: null,
            totalCredits: null,
            projectOption: null,
            advisor: null,
            hasGraduated: "False",
            email: null,
            passwor: null,
            departmentID: "AMS",
            track: "Computational Applied Mathematics",
            requirementVersionSemester: "Fall",
            requirementVersionYear: 2021
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
            studentID: this.state.studentID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            entrySemester: this.state.entrySemester,
            entryYear: this.state.entryYear,
            gradSemester: this.state.gradSemester,
            gradYear: this.state.gradYear,
            nSemestersInProgram: this.state.nSemestersInProgram,
            gpa: this.state.gpa,
            totalCredits: this.state.totalCredits,
            projectOption: this.state.projectOption,
            advisor: this.state.advisor,
            hasGraduated: this.state.hasGraduated,
            email: this.state.email,
            password: this.state.password,
            departmentID: this.state.departmentID,
            track: this.state.track,
            requirementVersionSemester: this.state.requirementVersionSemester,
            requirementVersionYear: this.state.requirementVersionYear
        };
        StudentService.create(data)
            .then(response => {
                this.setState({
                    studentID: response.data.studentID,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    entrySemester: response.data.entrySemester,
                    entryYear: response.data.entryYear,
                    gradSemester: response.data.gradSemester,
                    gradYear: response.data.gradYear,
                    nSemestersInProgram: response.data.nSemestersInProgram,
                    gpa: response.data.gpa,
                    totalCredits: response.data.totalCredits,
                    projectOption: response.data.projectOption,
                    advisor: response.data.advisor,
                    hasGraduated: response.data.hasGraduated,
                    email: response.data.email,
                    password: response.data.password,
                    departmentID: response.data.departmentID,
                    track: response.data.track,
                    requirementVersionSemester: response.data.requirementVersionSemester,
                    requirementVersionYear: response.data.requirementVersionYear
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
            var track = null
            switch(event.target.value){
                case "AMS":
                    track = AMS[0]
                    break;
                case "BMI":
                    track = BMI[0]
                    break;
                default:
                    track = "None"
                    break;
            }
            this.setState({departmentID: event.target.value, track: track}); 
        }; 
        
        const changeFirstNameHandler = (event) => { 
            this.setState({firstName: event.target.value}); 
        }; 
        const changeLastNameHandler = (event) => { 
            this.setState({lastName: event.target.value}); 
        }; 
        const changeSBUIDHandler = (event) => { 
            this.setState({studentID: event.target.value}); 
        }; 

        const changeEmailOptionHandler = (event) => { 
            this.setState({email: event.target.value}); 
        }; 

        const changePasswordOptionHandler = (event) => { 
            this.setState({password: event.target.value}); 
        }; 

        const changeTrackOptionHandler = (event) => { 
            this.setState({track: event.target.value}); 
        }; 
    
        const changeAdvisorHandler = (event) => { 
            this.setState({advisor: event.target.value}); 
        }; 

        const changeGraduatedOptionHandler = (event) => { 
            this.setState({hasGraduated: event.target.value}); 
        }; 

        const changeGPAHandler = (event) => { 
            this.setState({gpa: event.target.value}); 
        }; 

        const changeNumSemestersOptionHandler = (event) => { 
            this.setState({nSemestersInProgram: event.target.value}); 
        }; 

        const changeProjectOptionHandler = (event) => { 
            this.setState({projectOption: event.target.value}); 
        }; 

        const changeReqVersionSemesterOptionHandler = (event) => { 
            this.setState({requirementVersionSemester: event.target.value}); 
        }; 

        const changeReqVersionYearOptionHandler = (event) => { 
            this.setState({requirementVersionYear: event.target.value}); 
        }; 

        const changeEntrySemesterOptionHandler = (event) => { 
            this.setState({entrySemester: event.target.value}); 
        }; 
        const changeEntryYearOptionHandler = (event) => { 
            this.setState({entryYear: event.target.value}); 
        }; 

        const changeExpectedGraduationSemesterOptionHandler = (event) => { 
            this.setState({gradSemester: event.target.value}); 
        }; 

        const changeExpectedGraduationYearOptionHandler = (event) => { 
            this.setState({gradYear: event.target.value}); 
        }; 

        const changeTotalCreditsHandler = (event) => { 
            this.setState({totalCredits: event.target.value}); 
        }; 

        // Different arrays for different dropdowns 
        const AMS = [ "Computational Applied Mathematics", "Computational Biology", 
            "Operations Research", "Statistics", "Quantitative Finance"]; 
        const BMI = ["Clinical Informatics", "Imaging Informatics", "Translational Bioinformatics"]; 
        const ESE = ["None"]; 
        const CSE = ["None"]; 
        
        // Type variable to store different array for different dropdown
        let type = null; 
        
        //This will be used to create set of options that user will see
        let options = null; 
        
        // Setting Type variable according to dropdown
        if (this.state.departmentID === "AMS") { 
            type = AMS; 
        } else if (this.state.departmentID === "BMI") { 
            type =BMI; 
        } else if (this.state.departmentID === "ESE") { 
            type = ESE; 
        } else if (this.state.departmentID === "CSE") { 
            type = CSE; 
        } 
        
        // If "Type" is null or undefined then options will be null, otherwise it will create a options iterable based on our array 
        if (type) { 
            options = type.map((el) => <option key={el}>{el}</option>); 
        } 

        return (
            <div>
                {this.state.showModalDialogPopup ? <ModalDialog modalType={this.state.modalType} hideModalDialogPopUp={this.hideModalDialogPopUp.bind(this)} addStudent={this.addStudent.bind(this)}/> : null}
                <div id="addStudentForm">
                    <br></br><br></br><br></br>
                    <h2 id="addStudentFormHeader">Student Information</h2>
                    <div>
                        <br></br><br></br>
                        <p className="viewStudent_prompt"> First Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Last Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&nbsp;  SBU ID: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.firstName} onChange={changeFirstNameHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.lastName} onChange={changeLastNameHandler}/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.id} onChange={changeSBUIDHandler}/>
                        </p><br></br>                        
                        <p className="viewStudent_prompt">Email:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Password: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; GPA:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.email} onChange={changeEmailOptionHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.password} onChange={changePasswordOptionHandler}/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.gpa} onChange={changeGPAHandler}/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Entry Semester:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Expected Graduation: &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Graduated:
                        <br></br>
                        <select id="semesterSelect" className="dropdownSelect" onChange={changeEntrySemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer1</option>
                            <option value="Summer">Summer2</option>
                        </select>
                        <select id="entryYearSelect" className="dropdownSelectYear" onChange={changeEntryYearOptionHandler}>
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
                        <select id="gradSemesterSelect" className="dropdownSelect" onChange={changeExpectedGraduationSemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer1</option>
                            <option value="Summer">Summer2</option>
                        </select>
                        <select id="gradYearSelect" className="dropdownSelectYear" onChange={changeExpectedGraduationYearOptionHandler}>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
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
                        </select> &nbsp;
                        <select id="graduatedSelect" className="viewStudent_input" onChange={changeGraduatedOptionHandler}>
                            <option value="False">False</option>
                            <option value="True">True</option>
                        </select>
                        </p>                        
                        <br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; # Semesters In Program:
                        <br></br>
                        <select id="departmentSelect" className="viewStudent_input" onChange={changeDepartmentOptionHandler}>
                            <option value="AMS">AMS</option>
                            <option value="BMI">BMI</option>
                            <option value="ESE">ESE</option>
                            <option value="CSE">CSE</option>
                        </select>&nbsp;
                        <select id="semesterSelect" className="viewStudent_input" onChange={changeTrackOptionHandler}>
                            {options}
                        </select>&nbsp;
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.nSemestersInProgram} onChange={changeNumSemestersOptionHandler}/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Advisor:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Project: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Requirements Version:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.advisor} onChange={changeAdvisorHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.projectOption} onChange={changeProjectOptionHandler}/>
                        <select id="reqsemesterSelect" className="dropdownSelect" onChange={changeReqVersionSemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer1</option>
                            <option value="Summer">Summer2</option>
                        </select>
                        <select id="reqYearSelect" className="dropdownSelectYear" onChange={changeReqVersionYearOptionHandler}>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
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
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Total Credits: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.totalCredits} onChange={changeTotalCreditsHandler}/>
                        </p>
                        <br></br><br></br>
                        <button id="addStudentForm_submit_button" className="addStudent_button" onClick={() => this.showModalDialogPopUp("addStudent")}>Add Student</button>
                        <button id="addStudentForm_cancel_button" className="addStudent_button" onClick={() => this.showModalDialogPopUp("cancelAddStudent")}>Cancel</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default AddStudentScreen;
