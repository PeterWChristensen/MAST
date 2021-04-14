import React, { Component } from 'react';
import MaterialTable from "material-table";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import ModalDialog from '../modal/ModalWindow'
import { forwardRef } from 'react';

class EditStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {    
            showModalDialogPopup: false,
            modalType: "none",
            courseToEdit: "none",
            courseEditingID: "none",
            courseEditingGrade: "none",
            student: [],
            firstName: "",
            lastName: "",
            id: "",
            email: "",
            password: "",
            gpa: "",
            entrySemester: "",
            expectedGraduation: "",
            hasGraduated: "",
            department: "",
            track : "",
            nSemestersInProgram: "", 
            advisor: "",
            projectOption: "",
            requirementsVersion: "",
            coursePlans: [{courseOfferingID: "CSE 503", grade: "A"}, {courseOfferingID: "CSE 504", grade: ""}],
            coursePlanColumns: [
                {
                    title: "Semester",
                    field: "courseOfferingID"
                }, 
                {
                    title: "",
                    field: "grade"
                }
            ],
            comments: [{date: "4/13/21", comment: "Great job!"}],
            commentColumns: [
                {
                    title: "Date",
                    field: "date"
                }, 
                {
                    title: "Comment",
                    field: "comment"
                }
            ]
        }    
    }

    //Displays or Hides the Modal Dialog PopUp 
    showModalDialogPopUp = (type) => {
        this.setState({modalType: type, showModalDialogPopup: true});
        }

    hideModalDialogPopUp = () => {
        this.setState({showModalDialogPopup: false});
    }

    changeCourseHandler = (event) => {
        this.setState({courseEditingID: event.target.value})
    }

    changeCourseGradeHandler = (event) => {
        this.setState({courseEditingGrade: event.target.value})
    }

    editCoursePlan = (event, courseData) => {
        console.log(courseData)
        this.setState({courseEditingID: courseData.courseOfferingID, courseEditingGrade: courseData.grade, courseToEdit: courseData, modalType: "editCourse", showModalDialogPopup: true});
    }

    editCourse = (event) => {
        var courseArr = this.state.coursePlans
        var index = this.state.courseToEdit.tableData.id
        courseArr[index] = {courseOfferingID: this.state.courseEditingID, grade: this.state.courseEditingGrade}
        console.log(this.state.coursePlans)
        this.setState({coursePlans: courseArr, showModalDialogPopup: false})
    }

    editStudent() {
        var data = {
            studentID: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            department: this.state.department,
            advisor: this.state.advisor,
            track: this.state.track,
            entrySemester: this.state.entrySemester,
            expectedGraduation: this.state.expectedGraduation,
            gpa: this.state.gpa
        };
    }

    render() {
        const tableIcons = {
            Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />)
        }
        const changeFirstNameHandler = (event) => { 
            this.setState({firstName: event.target.value}); 
        }; 
        const changeLastNameHandler = (event) => { 
            this.setState({lastName: event.target.value}); 
        }; 
        const changeSBUIDHandler = (event) => { 
            this.setState({id: event.target.value}); 
        }; 

        const changeEmailOptionHandler = (event) => { 
            this.setState({email: event.target.value}); 
        }; 

        const changePasswordOptionHandler = (event) => { 
            this.setState({department: event.target.value}); 
        }; 

        const changeDepartmentOptionHandler = (event) => { 
            this.setState({department: event.target.value}); 
        }; 

        const changeTrackOptionHandler = (event) => { 
            this.setState({track: event.target.value}); 
        }; 
    
        const changeAdvisorHandler = (event) => { 
            this.setState({advisor: event.target.value}); 
        }; 

        const changeEntrySemesterHandler = (event) => { 
            this.setState({entrySemester: event.target.value}); 
        }; 

        const changeExpectedGraduationHandler = (event) => { 
            this.setState({expectedGraduation: event.target.value}); 
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

        const changeReqVersionOptionHandler = (event) => { 
            this.setState({requirementsVersion: event.target.value}); 
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
            <div id="viewStudentFormBackground">
                <div id="viewStudentForm">
                    <br></br><br></br><br></br>
                    <h2 id="viewStudentFormHeader">Student Information</h2>
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
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.entrySemester} onChange={changeEntrySemesterHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.expectedGraduation} onChange={changeExpectedGraduationHandler}/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.hasGraduated} onChange={changeGraduatedOptionHandler}/>
                        </p>                        
                        <br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; # Semesters In Program:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.department} onChange={changeDepartmentOptionHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.track} onChange={changeTrackOptionHandler}/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.nSemestersInProgram} onChange={changeNumSemestersOptionHandler}/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Advisor:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Project: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Requirements Version:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.advisor} onChange={changeAdvisorHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.projectOption} onChange={changeProjectOptionHandler}/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.requirementsVersion} onChange={changeReqVersionOptionHandler}/>
                        </p>
                        <br></br><br></br>
                        <h2 id="viewStudentFormHeader">Degree Progress</h2>
                        <br></br>
                        <p>&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Degree Requirements not available</p>
                        
                        <br></br>
                        
                        <h2 id="viewStudentFormHeader">Course Plan
                        <button id="viewStudent_suggestcourseplanbutton" className="viewStudent_button">Suggest Course Plan</button>
                        </h2>  
                        <br></br>                      
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                            <MaterialTable title="Semester" icons={tableIcons}
                                actions={[
                                    {
                                    icon: Edit,
                                    tooltip: 'Edit Course',
                                    onClick: (event, courseData) => this.editCoursePlan(event, courseData)
                                    }
                                ]}
                                options={{actionsColumnIndex: -1, toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF', zIndex: 0}, cellStyle: {width: 20, maxWidth: 20},
                                maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.coursePlanColumns} data={this.state.coursePlans}
                            />
                        </div>
                        <br></br>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments 
                        <button id="editStudent_addCommentbutton" className="viewStudent_button">Add Comment</button>    
                        </h2> 
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                            <MaterialTable title="Comments"  icons={tableIcons} 
                                actions={[
                                    {
                                      icon: Delete,
                                      tooltip: 'Delete Comment'
                                    }
                                  ]}
                                options={{actionsColumnIndex: -1, toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF', zIndex: 0}, cellStyle: {width: 20, maxWidth: 20},
                                maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.commentColumns} data={this.state.comments}
                            />
                        </div>                   
                        <br></br>
                        <button id="viewStudentForm_edit_button" className="viewStudent_button" onClick={() => this.showModalDialogPopUp("editStudent")}>Save</button>
                        <button id="viewStudentForm_return_button" className="viewStudent_button" onClick={() => this.showModalDialogPopUp("cancelEditStudent")}>Cancel</button>
                        </div>
                        {this.state.showModalDialogPopup ? <ModalDialog modalType={this.state.modalType} courseToEdit={this.state.courseToEdit} hideModalDialogPopUp={this.hideModalDialogPopUp.bind(this)} 
                        editStudent={this.editStudent.bind(this)} editCourse={this.editCourse.bind(this)} changeCourseHandler={this.changeCourseHandler.bind(this)} changeCourseGradeHandler={this.changeCourseGradeHandler.bind(this)}/> : null}
                </div>
            </div>
        )
    }
}

export default EditStudentScreen;
