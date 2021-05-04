import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class ViewStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {    
            showModalDialogPopup: false,
            modalType: "none",
            student: [],
            firstName: "",
            lastName: "",
            email: "",
            studentID: "",
            password: "password",
            gpa: "",
            entrySemester: "",
            entryYear: "",
            gradSemester: "",
            gradYear: "",
            hasGraduated: "",
            departmentID: "",
            track : "",
            nSemestersInProgram: "", 
            advisor: "",
            totalCredits: "",
            projectOption: "",
            requirementVersionYear: "",
            requirementVersionSemester: "",
            
            degreeRequirement: "",
            area:"",
            AreaReq:"",
            subArea:[],
            subAreaCourse:[],
            
            
            coursePlans: [{courseOfferingID: "CSE504Fall20202", courseName: "CSE 504", semester: "Fall 2020", grade: "A"}, {courseOfferingID: "CSE564Spring20211", courseName: "CSE 564", semester: "Spring 2021", grade: ""}, {courseOfferingID: "CSE537Spring20211", courseName: "CSE 537", semester: "Spring 2021", grade: ""}],
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
            // comments: [{date: "4/13/21", comment: "Great job!"}, {date: "4/1/21", comment: "Nice job!"}, {date: "3/23/21", comment: "Good job!"}],
            comments: [],
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

    componentDidMount(){

        console.log("componentDidMount at Student_screens/ViewStudentScreen.js");

        var username=this.props.location.state.email;
        

        axios.post("/getinfo", {
            username
          })
          .then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                studentID: response.data.studentID,
                hasGraduated: response.data.hasGraduated,
                email: response.data.email,
                gpa: response.data.gpa,
                entrySemester: response.data.entrySemester,
                entryYear: response.data.entryYear,
                gradSemester: response.data.gradSemester,
                gradYear: response.data.gradYear,
                nSemestersInProgram: response.data.nSemestersInProgram,
                projectOption: response.data.projectOption,
                advisor: response.data.advisor,
                departmentID: response.data.departmentID,
                track: response.data.track,
                requirementVersionYear: response.data.requirementVersionYear,
                requirementVersionSemester: response.data.requirementVersionSemester,
                totalCredits: response.data.totalCredits})


                        console.log("/getDegreeRequirement");
                        var departmentID=response.data.departmentID;
                        var track=response.data.track;
                        var requirementVersionSemester=response.data.requirementVersionSemester;
                        var requirementVersionYear=response.data.requirementVersionYear;
                        axios.post("/getDegreeRequirement", {
                            departmentID,track,requirementVersionSemester,requirementVersionYear
                        })
                        .then(responseDeg => {
                            var tempDegreeReqList={
                                requirementID: responseDeg.data.requirementID, 
                                departID:responseDeg.data.departID,
                                track:responseDeg.data.track,
                                versionSemester:responseDeg.data.versionSemester, 
                                versionYear:responseDeg.data.versionYear,
                                totalCredit:responseDeg.data.totalCredit,
                                project:responseDeg.data.project,
                                thesis:responseDeg.data.thesis,
                                timeLimit:responseDeg.data.timeLimit,
                                finalRecommended:responseDeg.data.finalRecommended,
                                minGPA:responseDeg.data.minGPA,
                                };
                            this.setState({degreeRequirement:tempDegreeReqList});
                            
                            
                                    console.log("/getArea");
                                    var requirementID=responseDeg.data.requirementID;
                                    axios.post("/getArea", {
                                        requirementID
                                    }) 
                                    .then(responseArea => {
                                        var tempAreaList={
                                                areaID: responseArea.data.areaID,
                                                requirementID:responseArea.data.requirementID,
                                                departmentID:responseArea.data.departmentID,
                                                name:responseArea.data.name
                                            
                                        };
                                        this.setState({area:tempAreaList});
                                        
                                        console.log("/getAreaRequirement");
                                        var areaID=responseArea.data.areaID;
                                        axios.post("/getAreaRequirement", {
                                            areaID
                                        })
                                        .then(responseAR => {
                                                var tempAreaReqList={
                                                        areaID: responseAR.data.areaID, 
                                                        departmentID:responseAR.data.departmentID,
                                                        nSubAreas:responseAR.data.nSubAreas,
                                                        nCourses:responseAR.data.nCourses,
                                                        nCredits:responseAR.data.nCredits    
                                                };

                                                this.setState({AreaReq:tempAreaReqList});
                                                

                                                return response.data;
                                        }).catch(err => console.error(err));

                                        console.log("/getSubArea");
                                        axios.post("/getSubArea", {
                                            areaID
                                        })
                                        .then(responseSA => {
                                                var tempsubAreaList=[];
                                                for(var i=0;responseSA.data[i];i++){
                                                    tempsubAreaList.push({
                                                        areaID: responseSA.data[i].areaID, 
                                                        subAreaID:responseSA.data[i].subAreaID,
                                                        departmentID:responseSA.data[i].departmentID,
                                                        minCourses:responseSA.data[i].minCourses,
                                                        minCredit:responseSA.data[i].minCredit,
                                                        maxCredit:responseSA.data[i].maxCredit,
                                                        maxCourse:responseSA.data[i].maxCourse,
                                                        name:responseSA.data[i].name
                                                    })
                                                        
                                                    // var subAreaIDList=responseSA.subArea;
                                                    // for(var j=0;responseSA.data[j];j++){
                                                    //     var subAreaID=subAreaIDList[j].subAreaID;
                                                        console.log("/getSubAreaCourse");
                                                        var areaID= responseSA.data[i].areaID; 
                                                        var subAreaID=responseSA.data[i].subAreaID;
                                                        var tempSubAreaCourseList=[];
                                                        
                                                        axios.post("/getSubAreaCourse", {
                                                            areaID,
                                                            subAreaID
                                                        })
                                                        .then(responseSAC => {
                                                                for(var j=0;responseSAC.data[j];j++){
                                                                    tempSubAreaCourseList.push({
                                                                        requirementID: responseSAC.data[j].requirementID,
                                                                        courseID:responseSAC.data[j].courseID,
                                                                        departmentID:responseSAC.data[j].departmentID,
                                                                        track:responseSAC.data[j].track,
                                                                        areaID:responseSAC.data[j].areaID,
                                                                        subAreaID:responseSAC.data[j].subAreaID
                                                                    })
                                                                }
                                            
                                                                
                                                                this.setState({subAreaCourse:tempSubAreaCourseList});
                                                                
                                                                return response.data;
                                                        }).catch(err => console.error(err));





                                                }

                                                this.setState({subArea:tempsubAreaList});
                                                
                                                    /*
                                                    //          subAreaID[ 0 ~2]
                                                    //          subAreaCourse:[subAreaID][Course[]],
                                                    //      first try 1D, then add when subAreaId is many.

                                                    var subAreaIDList=this.state.subArea;
                                                    for(var j=0;subAreaIDList[j];j++){
                                                        var subAreaID=subAreaIDList[j].subAreaID;*/



                                                return response.data;
                                        }).catch(err => console.error(err));

                                        
                                        return response.data;
                                    }).catch(err => console.error(err));

                                
                                return response.data;
                        }).catch(err => console.error(err));







                return response.data;
          }).catch(err => console.error(err));
          
          var stu_username=username;
 
          axios.post("/getcmt", {
            stu_username
          })
          .then(response => {
                var tempList=[];
                for(var i=0;response.data[i];i++){
                    tempList.push({date: response.data[i].date, comment:response.data[i].comment})
                }

                this.setState({comments:tempList});
                
                return response.data;
          }).catch(err => console.error(err));


        //   var departmentID=this.state.departmentID;
        //   var track=this.state.track;
        //   var requirementVersionSemester=this.state.requirementVersionSemester;
        //   var requirementVersionYear=this.state.requirementVersionYear;

        //   console.log("/getDegreeRequirement");
        //   console.log(this.state.departmentID);
        //   console.log(this.state.track);
        //   console.log(requirementVersionSemester);
        //   console.log(requirementVersionYear);


        //   axios.post("/getDegreeRequirement", {
        //     departmentID,track,requirementVersionSemester,requirementVersionYear
        //   })
        //   .then(response => {
        //         var tempDegreeReqList=[];
        //         for(var i=0;response.data[i];i++){
        //             tempDegreeReqList.push({
        //                 requirementID: response.data[i].requirementID, 
        //                 departID:response.data[i].departID,
        //                 track:response.data[i].track,
        //                 versionSemester:response.data[i].versionSemester, 
        //                 versionYear:response.data[i].versionYear,
        //                 totalCredit:response.data[i].totalCredit,
        //                 project:response.data[i].project,
        //                 thesis:response.data[i].thesis,
        //                 timeLimit:response.data[i].timeLimit,
        //                 finalRecommended:response.data[i].finalRecommended,
        //                 minGPA:response.data[i].minGPA,
        //             })
        //         }
        //         this.setState({degreeRequirement:tempDegreeReqList});
        //         return response.data;
        //   }).catch(err => console.error(err));


// //          area:[],
//             var requirementID=this.state.degreeRequirement.requirementID;
//             axios.post("/getArea", {
//                 requirementID
//             })
//             .then(response => {
//                     var tempAreaList=[];
//                     for(var i=0;response.data[i];i++){
//                         tempAreaList.push({
//                             areaID: response.data[i].areaID,
//                             requirementID:response.data[i].requirementID,
//                             departmentID:response.data[i].departmentID,
//                             name:response.data[i].name
//                         })
//                     }
//                     this.setState({area:tempAreaList});
//                     return response.data;
//             }).catch(err => console.error(err));


//             var areaID=this.state.area.areaID;
// //          AreaReq:[],
//             axios.post("/getAreaRequirement", {
//                 areaID
//             })
//             .then(response => {
//                     var tempAreaReqList=[];
//                     for(var i=0;response.data[i];i++){
//                         tempAreaReqList.push({
//                             areaID: response.data[i].areaID, 
//                             departmentID:response.data[i].departmentID,
//                             nSubAreas:response.data[i].nSubAreas,
//                             nCourses:response.data[i].nCourses,
//                             nCredits:response.data[i].nCredits    
                        
//                         })
//                     }

//                     this.setState({AreaReq:tempAreaReqList});
                    
//                     return response.data;
//             }).catch(err => console.error(err));


// //          subArea:[],
//             axios.post("/getSubArea", {
//                 areaID
//             })
//             .then(response => {
//                     var tempsubAreaList=[];
//                     for(var i=0;response.data[i];i++){
//                         tempsubAreaList.push({
//                             areaID: response.data[i].areaID, 
//                             subAreaID:response.data[i].subAreaID,
//                             departmentID:response.data[i].departmentID,
//                             minCourses:response.data[i].minCourses,
//                             minCredit:response.data[i].minCredit,
//                             maxCredit:response.data[i].maxCredit,
//                             maxCourse:response.data[i].maxCourse,
//                             name:response.data[i].name
//                         })
//                     }

//                     this.setState({subArea:tempsubAreaList});
                    
//                     return response.data;
//             }).catch(err => console.error(err));

// /*
// //          subAreaID[ 0 ~2]
// //          subAreaCourse:[subAreaID][Course[]],
// //      first try 1D, then add when subAreaId is many.

//             var subAreaIDList=this.state.subArea;
//             for(var j=0;subAreaIDList[j];j++){
//                 var subAreaID=subAreaIDList[j].subAreaID;*/

//                 var subAreaID=this.state.subArea.subAreaID;
//                 axios.post("/getSubAreaCourse", {
//                     areaID,
//                     subAreaID
//                 })
//                 .then(response => {
//                         var tempSubAreaCourseList=[];
//                         for(var i=0;response.data[i];i++){
//                             tempSubAreaCourseList.push({
//                                 requirementID: response.data[i].requirementID,
//                                 courseID:response.data[i].courseID,
//                                 departmentID:response.data[i].departmentID,
//                                 track:response.data[i].track,
//                                 areaID:response.data[i].areaID,
//                                 subAreaID:response.data[i].subAreaID
//                             })
//                         }
    
//                         this.setState({subAreaCourse:tempSubAreaCourseList});
                        
//                         return response.data;
//                 }).catch(err => console.error(err));

            






    }

    render() {
        var courseTable = [];
        var semester = new Map(); //map semester with course
        var degreeProgressTable = [];

        const createCourseEntry = (course) => {
            var divId = "course" + course.index;
            return <div id={divId}>
            <input className="coursePlan" value={course.courseName} readOnly/>
            <input className="coursePlan" value={course.grade} readOnly/>
            </div>;
        }
        const createDegreeProgressTables = () =>{
            var degreeProgress= this.state.degreeProgress;
            var studentID=this.state.studentID;
            var studentTrack=this.state.track;
            var studentTotalCredit=this.state.totalCredits;
            var studentGPD= this.state.gpa;
            var studentDepartmentID=this.state.departmentID;
            var studentReqVersionSemester= this.state.requirementVersionSemester;
            var studentReqVersionYear= this.state.requirementVersionYear;
            
                    
          var departmentID=this.state.departmentID;
          var track=this.state.track;
          var requirementVersionSemester=this.state.requirementVersionSemester;
          var requirementVersionYear=this.state.requirementVersionYear;


            
            
            
            //this will be an object and will have the same attributes as the database table.
            var degreeRequirement=this.state.degreeRequirement;
            var area=this.state.area;
            var AreaReq=this.state.AreaReq;
            var subArea=this.state.subArea;
            var subAreaCourse=this.state.subAreaCourse;

            console.log("DegreeRequirement");
            console.log(degreeRequirement);
            console.log("area");
            console.log(area);
            console.log("AreaReq");
            console.log(AreaReq);
            console.log("subArea");
            console.log(subArea);
            console.log("subAreaCourse");
            console.log(subAreaCourse);
            
            
            
            var displayText="DisPlay Text";
            degreeProgressTable.push(
            <textarea className="commentsComment" value={displayText} readOnly/>
            );

            return degreeProgressTable;
        }


        const createCourseTables = () => {  
            var course = this.state.coursePlans;
            //Get Semesters and courses 
            for (let i = 0; i < course.length; i++){
                if (semester.has(course[i].semester) == false){
                    semester.set(course[i].semester, [{courseOfferingID: course[i].courseOfferingID, courseName: course[i].courseName, semester: course[i].semester, grade: course[i].grade, index: i}]);
                }
                else{
                    let courseArr = semester.get(course[i].semester);
                    courseArr.push({courseOfferingID: course[i].courseOfferingID, courseName: course[i].courseName, semester: course[i].semester, grade: course[i].grade, index: i});
                    semester.set(course[i].semester, courseArr);
                }
            }
            let semestersSorted = new Map([...semester].sort((a, b) => String(a[0]).localeCompare(b[0])));
            //Note: Create new sort method to display semesters in correct order
            semestersSorted.forEach( function(courseArray, semester){
                courseTable.push(<div>
                <input className="semesterTableHeader" value={semester} disabled/>
                </div>)
                for(let i = 0; i < courseArray.length; i++){
                    courseTable.push(createCourseEntry(courseArray[i]));
                }
                courseTable.push(<br></br>);
            });
            return courseTable;
        }

        var commentTable = [];
        const createEntry = (comment) => {
            var divId = "comment" + comment.index;
            return <div id={divId}>
                <textarea className="commentsDate" value={comment.date} readOnly/>
                <textarea className="commentsComment" value={comment.comment} readOnly/>
            </div>;
        }
        const createCommentTable = () =>{
            commentTable.push(<div id="commentTableHeaders">
                <input className="commentTableHeaderDate" value="Date" disabled/>
                <input className="commentTableHeaderComment" value="Comment" disabled/>
                </div>)
            var comments = this.state.comments;
            for (let i = 0; i < comments.length; i++){ //Add index to each comment for editing
                comments[i] = {date: comments[i].date, comment: comments[i].comment, index: i}
                commentTable.push(createEntry(comments[i]));
            }
            return commentTable;
        }



        return (
            <div id="viewStudentFormBackground">
                <div id="viewStudentForm">
                    <br></br><br></br><br></br>
                    <h2 id="viewStudentFormHeader">Student Information</h2>
                    <div>
                        <br></br><br></br>
                        <p className="viewStudent_prompt"> First Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Last Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&nbsp;  SBU ID: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.firstName} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.lastName} readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.studentID} readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Email:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Password: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; GPA:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.email} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.password} readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.gpa?this.state.gpa: "NULL" } readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Entry Semester:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Expected Graduation: &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Graduated:
                        <br></br><input className="viewStudent_input" type="input" value={this.state.entrySemester + " " + this.state.entryYear} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" value={this.state.gradSemester + " " + this.state.gradYear} readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.hasGraduated? this.state.hasGraduated: "False"} readOnly/>
                        </p>                        
                        <br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; # Semesters In Program:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.departmentID} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.track?this.state.track: "NULL" } readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.nSemestersInProgram?this.state.nSemestersInProgram:0} readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Advisor:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Project: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Requirements Version:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.advisor? this.state.advisor: "NULL"} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.projectOption? this.state.projectOption: "NULL"} readOnly/>
                        <input  className="viewStudent_input" type="input" value={this.state.requirementVersionSemester + " " + this.state.requirementVersionYear} readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Total Credits: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.totalCredits? this.state.totalCredits:0} readOnly/>
                        </p>
                        <br></br><br></br>
                        <h2 id="viewStudentFormHeader">Degree Progress</h2>
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createDegreeProgressTables()}
                        </div>
                        
                        <p>&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</p>
                        
                        <br></br>
                        
                        <h2 id="viewStudentFormHeader">Course Plan
                        <a><Link to={{pathname: '/suggestcourseplan',state: {studentID: this.state.studentID}}}> <button id="viewStudent_suggestcourseplanbutton"> Suggest Course Plan </button></Link></a>
                        </h2>  
                        <br></br>                      
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createCourseTables()}
                        </div>
                        <br></br>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments</h2>     
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createCommentTable()}
                        </div>                   
                        <br></br>
                        <Link to={{pathname: '/editStudent', state: {email: this.state.email}}}><button id="viewStudentForm_edit_button" className="viewStudent_button">Edit</button></Link>
                        <Link to="/gpd"><button id="viewStudentForm_return_button" className="viewStudent_button">Return</button></Link>
                        </div>
                </div>
            </div>
        )
    }
}

export default ViewStudentScreen;
