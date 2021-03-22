import React, { Component } from 'react';
import ModalDialog from '../modal/ModalWindow'

class AddStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: "AMS",         //selected is state variable which will hold the value of currently selected dropdown
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
        // Function that will set different values to state variable based on department selected
        const changeSelectOptionHandler = (event) => { 
            this.setState({selected: event.target.value}); 
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
        if (this.state.selected === "AMS") { 
            type = ams; 
        } else if (this.state.selected === "BMI") { 
            type =bmi; 
        } else if (this.state.selected === "ESE") { 
            type = ese; 
        } else if (this.state.selected === "CSE") { 
            type = cse; 
        } 
        
        // If "Type" is null or undefined then options will be null, otherwise it will create a options iterable based on our array 
        if (type) { 
            options = type.map((el) => <option key={el}>{el}</option>); 
        } 

        return (
            <div>
                {this.state.showModalDialogPopup ? <ModalDialog modalType={this.state.modalType} hideModalDialogPopUp={this.hideModalDialogPopUp.bind(this)} /> : null}
                <div id="addStudentForm">
                    <h2 id="addStudentFormHeader">Student Information</h2>
                    <div>
                        <div className="addStudent_prompt">First Name:</div>
                        <input className="addStudent_input" type="input" />
                        <div className="addStudent_prompt">Last Name:</div>
                        <input className="addStudent_input" type="input"/>
                        <div className="addStudent_prompt">SBU ID:</div>
                        <input  className="addStudent_input" type="input" />
                        <div className="addStudent_prompt">Email:</div>
                        <input  className="addStudent_input" type="input" />

                        <div className="addStudent_prompt">Department:</div>
                        <select id="departmentSelect" className="dropdownSelect" onChange={changeSelectOptionHandler}>
                            <option value="AMS">AMS</option>
                            <option value="BMI">BMI</option>
                            <option value="ESE">ESE</option>
                            <option value="CSE">CSE</option>
                        </select>
                        <div className="addStudent_prompt">Track:</div>
                        <select id="semesterSelect" className="dropdownSelect">
                            {options}
                        </select>

                        <div className="addStudent_prompt">Entry Semester:</div>
                        <select id="semesterSelect" className="dropdownSelect">
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                        </select>
                    </div>
                        <div className="addStudent_prompt">Entry Year:</div>
                        <select id="entryYearSelect" className="dropdownSelect">
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