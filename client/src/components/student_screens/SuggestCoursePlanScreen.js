import React, {Component} from 'react';
import RequiredStatusService from "../../services/requiredStatus.service";
import ElectiveStatusService from "../../services/electiveStatus.service";
import CourseOfferingsService from "../../services/courseOfferings.service";

class SuggestCoursePlanScreen extends Component {
    constructor(props){
        super(props)
        this.state = { 
            studentID: this.props.location.state.studentID,
            togglePrefferedCourseInput: false, 
            newPrefferedCourse: null,
            newAvoidedCourse: null,
            timeslotStart: "",
            timeslotEnd: "",
            preferredCourses: [],
            avoidedCourses: [],
            maxCoursesPerSemester: null,
            toggleAvoidCourseInput: false,
            toggleTimeslotInput: false,
            isOrdered: false,
            smartMode: false,
            unsatisfiedRequiredCourses: [],
            coursePlan: [],
            courseOfferings: []
        }
    }

    togglePrefferedCourseInput = () => {
        this.setState(({ togglePrefferedCourseInput }) => ({ togglePrefferedCourseInput: !togglePrefferedCourseInput }));
    }

    toggleOrdered = (e) => {
        this.setState(({ isOrdered: e.target.checked }));
    }

    toggleSmartMode = (e) => {
        this.setState(({ smartMode: e.target.checked }));
    }

    toggleAvoidCourseInput = () => {
        this.setState(({ toggleAvoidCourseInput }) => ({ toggleAvoidCourseInput: !toggleAvoidCourseInput }));
    }

    toggleTimeslotInput = () => {
        this.setState(({ toggleTimeslotInput }) => ({ toggleTimeslotInput: !toggleTimeslotInput }));
    }

    changeMaxCoursePerSemester= (e) => {
        this.setState({maxCoursesPerSemester: e.target.value})
    }

    changePrefferedCourse = (e) => {
        this.setState({newPrefferedCourse: e.target.value})
    }

    changeAvoidedCourse = (e) => {
        this.setState({newAvoidedCourse: e.target.value})
    }

    changeTimeslotStart = (e) => {
        this.setState({timeslotStart: e.target.value})
    }
    
    changeTimeslotEnd = (e) => {
        this.setState({timeslotEnd: e.target.value})
    }

    addPreferredCourse = () => {
        var prefArr = this.state.preferredCourses
        if (prefArr.includes(this.state.newPrefferedCourse)==false){
            prefArr.push(this.state.newPrefferedCourse)
            this.setState({preferredCourses: prefArr})
        }
    }

    addAvoidedCourse = () => {
        var avoidArr = this.state.avoidedCourses
        if (avoidArr.includes(this.state.newAvoidedCourse)==false){
            avoidArr.push(this.state.newAvoidedCourse)
            this.setState({avoidedCourses: avoidArr})
        }
    }

    deletePreferredCourses = () => {
        this.setState({preferredCourses : []});
    }

    deleteAvoidedCourses = () => {
        this.setState({avoidedCourses : []});
    }

    generateCoursePlan = () => {
        console.log(this.state.studentID);
        let data = {studentID: this.state.studentID};
        if (!this.state.smartMode) {
            RequiredStatusService.getAll(data)
                .then(response => {
                    console.log(response.data);
                    this.setState({unsatisfiedRequiredCourses: response.data});
                })
                .catch(e => {
                    console.log(e);
            })
            .then(
                this.state.unsatisfiedRequiredCourses.forEach((value) => {
                    data = {courseID: value.courseID};
                    CourseOfferingsService.getAll(data)
                        .then(response => {
                            console.log(response.data);
                            this.setState({courseOfferings: response.data});
                        })
                        .catch(e => {
                            console.log(e);
                        })
                    .then(() => {
                        console.log(this.state.courseOfferings);
                        this.state.courseOfferings.forEach((value) => {
                            this.state.coursePlan.push(value);
                        })
                        console.log(this.state.coursePlan)
                    });
                }) 
            );

        }
        
    }


    render(){
        var preferredCourseInput = <label/>
        if(this.state.togglePrefferedCourseInput==true){
            preferredCourseInput = <label style={{hidden: "true"}}> 
            <input type="text" onChange={(e) => this.changePrefferedCourse(e)}/> 
            <button className="promptButton" onClick={() => this.addPreferredCourse()}>Add Course</button>
            <button className="promptButton" onClick={() => this.deletePreferredCourses()}>Clear</button>
            <div className="line-break">
                { this.state.preferredCourses.join('\n') }
            </div>
            </label>; 
        }

        var avoidCourseInput = <label/>
        if(this.state.toggleAvoidCourseInput==true){
            avoidCourseInput = <label style={{hidden: "true"}}> 
            <input type="text" onChange={(e) => this.changeAvoidedCourse(e)}/> 
            <button className="promptButton" onClick={() => this.addAvoidedCourse()}>Add Course</button>
            <button className="promptButton" onClick={() => this.deleteAvoidedCourses()}>Clear</button>
            <div className="line-break">
                { this.state.avoidedCourses.join('\n') }
            </div>
            </label>; 
        }
       
        return (
        <div id="enrollmentTrendsBackground">
            <div id="enrollmentTrendsForm">
                <br></br><br></br><br></br><br></br><br></br>
                <h2 id="enrollmentTrendsHeader">Suggest Course Plan</h2>
                <div className="enrollmentTrends_prompt">
                    <br></br> Enter Preferences: <br></br><br></br>
                    <text className="line-break">Max Courses Per Semester:</text><br></br>
                    <input type="number" onChange={(e) => this.changeMaxCoursePerSemester(e)}></input><br></br>
                    <button className="preferenceButton" onClick={() => this.togglePrefferedCourseInput()}>Preffered Courses</button><br></br>
                    <div><input type="checkbox" onClick={(e) => this.toggleOrdered(e)}/>Ordered</div>
                    <form>{preferredCourseInput}</form>                    
                    <button className="preferenceButton" onClick={() => this.toggleAvoidCourseInput()}>Avoid Courses</button>
                    <form>{avoidCourseInput}</form>
                    <button className="preferenceButton" onClick={() => this.toggleTimeslotInput()}>Add Scheduling Constraints</button>
                    <div><input type="text" placeholder="ex 9:30AM" onChange={(e) => this.changeTimeslotStart(e)}/><input type="text" placeholder="ex 6:00PM" onChange={(e) => this.changeTimeslotEnd(e)}/></div>
                    <button className="promptButton" onClick={() => this.addAvoidedCourse()}>Add Time Constraint</button>
                    <div><input type="checkbox" onClick={(e) => this.toggleSmartMode(e)}/>Smart Mode</div>
                    <button className="enrollmentTrendsButton" onClick={() => this.generateCoursePlan()}>Generate Course Plan</button>
                    <table style={{border: "solid"}}>
                        <tr>
                            <th scope="col"> CourseID </th><th scope="col"> Section </th><th scope="col"> Semester </th><th scope="col"> Year </th><th scope="col"> Day</th>
                        </tr>
                        {this.state.coursePlan.map((course, index) => <tr key={index}><td>{course.courseID}</td><td>{course.section}</td><td>{course.semester}</td><td>{course.year}</td><td>{course.day}</td></tr>)}
                    </table>
                </div>
            </div>
        </div>);
    }
}

export default SuggestCoursePlanScreen;