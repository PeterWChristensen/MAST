import React, { Component } from 'react';

class GPDHomeScreen extends Component {
    render() {
        return (
            <div> 
                <div class="dropdown">
                    <button class="dropbtn">Import</button>
                    <div class="dropdown-content">
                        <a href="#">Degree Requirements</a>
                        <a href="#">Course Information</a>
                        <a href="#">Course Offerings</a>
                        <a href="#">Student Data</a>
                        <a href="#">Grades</a>
                    </div>
                    </div>
                        <button>Add Student</button>
                        <button>Delete All Student Data</button>
                    </div>
        );
    }

}

export default GPDHomeScreen;
