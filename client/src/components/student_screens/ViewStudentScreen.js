import React, { Component } from 'react';
import MaterialTable from "material-table";

class ViewStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {    
            showModalDialogPopup: false,
            modalType: "none",
            student: [],
            firstName: "",
            lastName: "",
            id: "",
            department: "",
            track : "",
            advisor: "",
            entrySemester: "",
            expectedGraduation: "",
            gpa: "",
            coursePlans: [{courseOfferingID: "CSE 503", grade: "A"}, {courseOfferingID: "CSE 504", grade: "B"}],
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

    render() {
        return (
            <div id="viewStudentFormBackground">
                <div id="viewStudentForm">
                    <br></br><br></br><br></br>
                    <h2 id="viewStudentFormHeader">Student Information</h2>
                    <div>
                        <br></br><br></br>
                        <p className="viewStudent_prompt"> First Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Last Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&nbsp;  SBU ID: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue="First Name" disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue="Last Name" disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue="ID" disabled/>
                        </p><br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Advisor:
                        <br></br><input className="viewStudent_input" type="input" defaultValue="Department" disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue="Track" disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue="Advisor" disabled/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Entry Semester:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Expected Graduation: &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; GPA:
                        <br></br><input className="viewStudent_input" type="input" defaultValue="Semester" disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue="Graduation Semester" disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue="GPA" disabled/>
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
                            <MaterialTable title="Semester"  
                                options={{toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF'}, cellStyle: {width: 20, maxWidth: 20},
                                zIndex:0, maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.coursePlanColumns} data={this.state.coursePlans}
                            />
                        </div>
                        <br></br>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments</h2>     
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                            <MaterialTable title="Comments"  
                                options={{toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF'}, cellStyle: {width: 20, maxWidth: 20},
                                zIndex:0, maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.commentColumns} data={this.state.comments}
                            />
                        </div>                   
                        <br></br>
                        <button id="viewStudentForm_edit_button" className="viewStudent_button">Edit</button>
                        <button id="viewStudentForm_return_button" className="viewStudent_button">Return</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default ViewStudentScreen;
