import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { getCoachAppointmentsForDate } from './appointment';

class AppointmentPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          coachAppointments:[]
        }
    }

    componentDidMount() {
        getCoachAppointmentsForDate(1, this.props.day, this.setState.bind(this));
    }

    render () {
        return (
            <span>
                {this.state.coachAppointments.map((appointment) => {
                    <div>
                        <p>{appointment.studentPhoneNumber}</p>
                    </div>
                })}
            </span>
        )
    }
}

export default AppointmentPopup;