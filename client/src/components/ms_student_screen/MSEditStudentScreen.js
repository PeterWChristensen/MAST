import React, { Component } from 'react';
import ModalDialog from '../modal/ModalWindow'
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import CommentService from "../../services/comment.service";

import AuthService from "../../services/auth.service";
import MSStudentService from "../../services/msStudent.service";

class MSEditStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {    
            user:   AuthService.getCurrentUser(),
            showModalDialogPopup: false,
            modalType: "none",
            redirect: false,
            addComment: false,
            commentToAddDate: null,
            commentToAddComment: null,
            student: [],
            firstName: "",
            lastName: "",
            studentID: "",
            email: "",
            password: "",
            gpa: "",
            entrySemester: "",
            entryYear: "",
            gradSemester: "",
            gradYear: "",
            totalCredits: "",
            hasGraduated: "",
            departmentID: "",
            track : "",
            nSemestersInProgram: "", 
            advisor: "",
            projectOption: "",
            requirementVersionYear: "",
            gpdUserName: JSON.parse(localStorage.getItem('user')).username,
            requirementVersionSemester: "",
            // coursePlans: [{courseOfferingID: "CSE504Fall20202", courseName: "CSE 504", semester: "Fall 2020", grade: "A"}, {courseOfferingID: "CSE564Spring20211", courseName: "CSE 564", semester: "Spring 2021", grade: ""}, {courseOfferingID: "CSE537Spring20211", courseName: "CSE 537", semester: "Spring 2021", grade: ""}],
            coursePlans:[],
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
            oldcomments: [],
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
        var studentID=this.state.user.userID;
        var username=this.state.user.username;    
        axios.post("/getinfo", {
            username
          })
          .then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                studentID: response.data.studentID,
                hasGraduated: response.data.hasGraduated,
                password: response.data.password,
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
                console.log(response.data);

                return response.data;
          }).catch(err => console.error(err));

          
          var stu_username=username;
 
          axios.post("/getcmt", {
            stu_username
          })
          .then(response => {
                console.log("this is getcmt at edit student");
                var tempList=[];
                var oldTempList=[];
                
                var obj={};
                for(var i=0;response.data[i];i++){
                    tempList.push({date: response.data[i].date, comment:response.data[i].comment})
                    oldTempList.push({date: response.data[i].date, comment:response.data[i].comment})
                }
                console.log(tempList);
                console.log(oldTempList);

                this.setState({comments:tempList, oldcomments:oldTempList});
                
                return response.data;
          }).catch(err => console.error(err));


          axios.post("/getStuCoursePlan", {
            studentID
          })
          .then(response => {
                var tempListCP=[];
                for(var i=0;response.data[i];i++){
                    tempListCP.push({
                        courseOfferingID: response.data[i].courseOfferingID,
                        courseName: response.data[i].courseName,
                        semester: response.data[i].semester,
                        grade: response.data[i].grade
                    })
                }
                console.log("tempListCP======================================");
                console.log(tempListCP);
                this.setState({coursePlans:tempListCP});
                
                return response.data;
          }).catch(err => console.error(err));

          
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
            studentID: this.state.studentID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            gpa: this.state.gpa,
            entrySemester: this.state.entrySemester,
            entryYear: this.state.entryYear,
            gradSemester: this.state.gradSemester,
            gradYear: this.state.gradYear,
            hasGraduated: this.state.hasGraduated,
            departmentID: this.state.departmentID,
            track: this.state.track,
            nSemestersInProgram: this.state.nSemestersInProgram,
            advisor: this.state.advisor,
            projectOption: this.state.projectOption,
            requirementVersionYear: this.state.requirementVersionYear,
            email: this.state.email,
            totalCredits: this.state.totalCredits,            
            requirementVersionSemester: this.state.requirementVersionSemester
        };
        var username=data.email;

        //cmp old and new if item in new is not in old than add.
        //oldcomments
        var oldCmt=this.state.oldcomments;
        var newCmt=this.state.comments;
        //add comments in db
        console.log("oldCmt");
        console.log(oldCmt);
        console.log("newCmt");
        console.log(newCmt);
        
        for(var i=0;newCmt[i];i++ ){
        var addVali=true;
            for(var j=0;oldCmt[j];j++){
                if(newCmt[i].date == oldCmt[j].date){
                    addVali=false;
                }
            }
            console.log("addVali");
            console.log(addVali);

            if(addVali){
                var stu_username=this.state.email;
                var gpd_username=this.state.gpdUserName;
                var date=newCmt[i].date;
                var comment=newCmt[i].comment;
                console.log("create a comment at editview")
                console.log(comment);
                console.log(date);
                CommentService.create(stu_username,gpd_username,comment,date);
            }
        }

        //delete comments in db
        for(var i=0;oldCmt[i];i++ ){
            var deleteVali=true;
                for(var j=0;newCmt[j];j++){
                    if(oldCmt[i].date == newCmt[j].date){
                        deleteVali=false;
                    }
                }
                console.log("deleteVali");
                console.log(deleteVali);    

                if(deleteVali){
                    var stu_username=this.state.email;
                    var date=oldCmt[i].date;
                    console.log(stu_username);
                    console.log(date);
                    console.log("delete a comment at editview")
                    CommentService.deleteComment(stu_username,date);
                }
            }

        axios.put("/updateinfo", {
            username,
            data
        })
        .then(response => {
            console.log("this from edit student");
            console.log(response.data);
            this.setState({redirect: true});
            return response.data;
        }).catch(err => console.error(err));



   
    }


    render() {
        const changeFirstNameHandler = (event) => { 
            this.setState({firstName: event.target.value}); 
        }; 
        const changeLastNameHandler = (event) => { 
            this.setState({lastName: event.target.value}); 
        }; 

        // Student cannot change their SBU ID
        // const changeSBUIDHandler = (event) => { 
        //     this.setState({studentID: event.target.value}); 
        // }; 

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
        
        var courseTable = [];
        var semester = new Map(); //map semester with course

        const createCourseEntry = (course) => {
            var divId = "course" + course.index;
            return <div id={divId}>
            <input className="coursePlan" defaultValue={course.courseName} onChange={(event) => editCourseHandlerCourse(event, course)}/>
            <input className="coursePlan" defaultValue={course.grade} readOnly/>
            </div>;
        }

        const editCourseHandlerCourse = (event, course) => {
            var newCoursePlanAr = this.state.coursePlans;
            var editedEntry = {courseOfferingID: course.courseOfferingID, courseName: event.target.value, semester: course.semester, grade: course.grade};
            newCoursePlanAr[course.index] = editedEntry;
            this.setState({coursePlans: newCoursePlanAr})  
        }

        const createCourseTables = () => {  
            console.log(this.state.coursePlans);   
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

        const alertAddComment = () => {
            this.setState({addComment: true});
        }

        const addCommentHandler = () => {
            var d = new Date();
            var dateTime= d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+ d.getMinutes()+ ":"+d.getSeconds();

            var newCommentArray = this.state.comments;
            var newComment = {date: dateTime, comment: this.state.commentToAddComment};
            newCommentArray.push(newComment);
            this.setState({comments: newCommentArray, addComment: false, commentToAddDate: dateTime})  



        }

        // const changeCommentToAddDateHandler = (event) => { 
        //     this.setState({commentToAddDate: event.target.value}); 
        // }; 
        const changeCommentToAddCommentHandler = (event) => { 
            this.setState({commentToAddComment: event.target.value}); 
        }; 

        const addNewComment = () => {
            return <div>
                <textarea className="commentsDate" defaultValue={"Current Time"}  readOnly/>
                <textarea className="commentsComment" defaultValue={"Type here"} onChange={changeCommentToAddCommentHandler}/>
                <button className="addCommentButton" onClick={addCommentHandler}>Add</button>
            </div>;
        }

        const createEntry = (comment) => {
            var divId = "comment" + comment.index;
            return <div id={divId}>
                <textarea className="commentsDate" value={comment.date} readOnly/>
                <textarea className="commentsComment" value={comment.comment} readOnly/>
            </div>;
        }
        const createCommentTable = () =>{
            commentTable.push(<div id="commentTableHeader">
                <input className="commentTableHeaderDate" value="Date" disabled/>
                <input className="commentTableHeaderComment" value="Comment" disabled/>
                </div>)
            var comments = this.state.comments;
            for (let i = 0; i < comments.length; i++){ //Add index to each comment for editing
                comments[i] = {date: comments[i].date, comment: comments[i].comment, index: i}
                commentTable.push(createEntry(comments[i]));
            }
            if (this.state.addComment == true){
                commentTable.push(addNewComment());
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
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.firstName} onChange={changeFirstNameHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.lastName} onChange={changeLastNameHandler}/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.studentID} readOnly/>
                        </p><br></br>                        
                        <p className="viewStudent_prompt">Email:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Password: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; GPA:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.email} onChange={changeEmailOptionHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.password} onChange={changePasswordOptionHandler}/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.gpa} onChange={changeGPAHandler}/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Entry Semester:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Expected Graduation: &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Graduated:
                        <br></br>
                        <select id="semesterSelect" className="dropdownSelect" defaultValue={this.state.entrySemester} onChange={changeEntrySemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer1">Summer1</option>
                            <option value="Summer2">Summer2</option>
                        </select>
                        <select id="entryYearSelect" className="dropdownSelectYear" defaultValue={this.state.entryYear} onChange={changeEntryYearOptionHandler}>
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
                        <select id="gradSemesterSelect" className="dropdownSelect" defaultValue={this.state.gradSemester} onChange={changeExpectedGraduationSemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer1">Summer1</option>
                            <option value="Summer2">Summer2</option>
                        </select>
                        <select id="gradYearSelect" className="dropdownSelectYear" defaultValue={this.state.gradYear} onChange={changeExpectedGraduationYearOptionHandler}>
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
                        <select id="graduatedSelect" className="viewStudent_input" defaultValue={this.state.hasGraduated} onChange={changeGraduatedOptionHandler}>
                            <option value="False">False</option>
                            <option value="True">True</option>
                        </select>
                        </p>                        
                        <br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; # Semesters In Program:
                        <br></br>
                        <select id="departmentSelect" className="viewStudent_input" defaultValue={this.state.departmentID} onChange={changeDepartmentOptionHandler}>
                            <option value="AMS">AMS</option>
                            <option value="BMI">BMI</option>
                            <option value="ESE">ESE</option>
                            <option value="CSE">CSE</option>
                        </select>&nbsp;
                        <select id="semesterSelect" className="viewStudent_input" defaultValue={this.state.track} onChange={changeTrackOptionHandler}>
                            {options}
                        </select>&nbsp;
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.nSemestersInProgram} onChange={changeNumSemestersOptionHandler}/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Advisor:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Project: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Requirements Version:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.advisor} onChange={changeAdvisorHandler}/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.projectOption} onChange={changeProjectOptionHandler}/>
                        <select id="reqsemesterSelect" className="dropdownSelect" defaultValue={this.state.requirementVersionSemester} onChange={changeReqVersionSemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer1</option>
                            <option value="Summer">Summer2</option>
                        </select>
                        <select id="reqYearSelect" className="dropdownSelectYear" defaultValue={this.state.requirementVersionYear} onChange={changeReqVersionYearOptionHandler}>
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
                        <h2 id="viewStudentFormHeader">Degree Progress</h2>
                        <br></br>
                        <p>&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Degree Requirements not available</p>
                        
                        <br></br>
                        
                        <h2 id="viewStudentFormHeader">Course Plan
                        {/* <Link to="/suggestCoursePlan"> <button id="viewStudent_suggestcourseplanbutton" className="viewStudent_button">Suggest Course Plan</button></Link> */}
                        </h2>  
                        <a><Link to={{pathname: '/suggestcourseplan',state: {studentID: this.state.studentID}}}> <button id="viewStudent_suggestcourseplanbutton"> Suggest Course Plan </button></Link></a>
                        <br></br>                      
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createCourseTables()}
                        </div>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments 
                        <button id="editStudent_addCommentbutton" className="viewStudent_button" onClick={alertAddComment}>Add Comment</button>    
                        </h2> 
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createCommentTable()}
                        </div>                   
                        <br></br>
                        <button id="viewStudentForm_edit_button" className="viewStudent_button" onClick={() => this.showModalDialogPopUp("editMSStudent")}>Save</button>
                        <button id="viewStudentForm_return_button" className="viewStudent_button" onClick={() => this.showModalDialogPopUp("cancelMSEditStudent")}>Cancel</button>
                        </div>
                        {this.state.showModalDialogPopup ? <ModalDialog modalType={this.state.modalType} email={this.state.email} hideModalDialogPopUp={this.hideModalDialogPopUp.bind(this)} editStudent={this.editStudent.bind(this)}/> : null}
                        { this.state.redirect ? (<Redirect push to={{pathname:'/student', state: {email: this.state.email}}}/>) : null }
                </div>
            </div>
        )
    }
}

export default MSEditStudentScreen;
