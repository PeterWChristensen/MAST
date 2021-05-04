import React, {Component} from 'react';

class SuggestCoursePlanScreen extends Component {
    constructor(props){
        super(props)
        this.state = { 
            togglePrefferedCourseInput: false, 
            newPrefferedCourse: null,
            newAvoidedCourse: null,
            newTimeslot: null,
            preferredCourses: [],
            avoidedCourses: [],
            timeslots: [],
            maxCoursesPerSemester: null,
            toggleAvoidCourseInput: false,
            toggleTimeslotInput: false,
            isOrdered: true
        }
    }

    togglePrefferedCourseInput = () => {
        this.setState(({ togglePrefferedCourseInput }) => ({ togglePrefferedCourseInput: !togglePrefferedCourseInput }));
    }

    toggleOrdered = () => {
        this.setState(({ isOrdered }) => ({ isOrdered: !isOrdered }));
        console.log(this.state.isOrdered);
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

    changeTimeslot = (e) => {
        this.setState({newTimeslot: e.target.value})
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

    addTimeslot = () => {
        var timeslotArr = this.state.timeslots
        if (timeslotArr.includes(this.state.newTimeslot)==false){
            timeslotArr.push(this.state.newTimeslot)
            this.setState({timeslots: timeslotArr})
        }
    }

    deletePreferredCourses = () => {
        this.setState({preferredCourses : []});
    }

    deleteAvoidedCourses = () => {
        this.setState({avoidedCourses : []});
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

        var timeslotInput = <label/>
        if(this.state.toggleTimeslotInput==true){
            timeslotInput = <label style={{hidden: "true"}}> 
            <input type="text" onChange={(e) => this.changeTimeslot(e)}/> 
            <button className="promptButton" onClick={() => this.addTimeslot()}>Add Timeslot</button>
            <div className="line-break">
                { this.state.timeslots.join('\n') }
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
                    <div><input type="checkbox" onChange={(e) => this.toggleOrdered()}/>Ordered</div>
                    <form>{preferredCourseInput}</form>                    
                    <button className="preferenceButton" onClick={() => this.toggleAvoidCourseInput()}>Avoid Courses</button>
                    <form>{avoidCourseInput}</form>
                    <button className="preferenceButton" onClick={() => this.toggleTimeslotInput()}>Add Scheduling Constraints</button>
                    <form>{timeslotInput}</form>
                    <button className="enrollmentTrendsButton">Generate Course Plan</button>
                </div>
            </div>
        </div>);
    }
}

export default SuggestCoursePlanScreen;