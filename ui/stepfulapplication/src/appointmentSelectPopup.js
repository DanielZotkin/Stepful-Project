import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { getCoachAppointments , updateCoachAvailability, getCoachPhoneNumber } from './coach';
import { addAppointment } from './appointment';
import { getStudentPhoneNumber } from './student';

class AppointmentSelectPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          studentPhoneNumber : [],
          coachPhoneNumber: [],
          appointments:[],
        }
    }

    componentDidMount() {
        getCoachAppointments(this.props.coachId, this.setState.bind(this));
        getCoachPhoneNumber(this.props.coachId, this.setState.bind(this));
        getStudentPhoneNumber(1, this.setState.bind(this));
    }

    componentDidUpdate() {
        getCoachAppointments(this.props.coachId, this.setState.bind(this));
    }

    updateAppointments = (appointments, time, coachId, studentId) => {
        const index = appointments[0].availability.indexOf(time);
        appointments[0].availability.splice(index, 1);
        const newAppointments = appointments[0].availability.map((time) => new Date(time));
        addAppointment(studentId, coachId, time, this.state.coachPhoneNumber[0].phoneNumber, this.state.studentPhoneNumber[0].phoneNumber);
        updateCoachAvailability(coachId, newAppointments);
        window.location.reload();
    }

    render() {
        return ( 
            <Popup
                trigger={<button>{this.props.firstName} {this.props.lastName}</button>}
                position="top center"
                nested>
                <span>
                    {this.state.appointments.map((appointment) => {
                        return (
                            <div>
                                {appointment.availability.filter((time => new Date(time).setHours(0,0,0,0) === this.props.date.day.day.setHours(0,0,0,0))).map((time) => {
                                    return <button onClick={() => 
                                        this.updateAppointments(this.state.appointments, time, this.props.coachId, 1)}>{time}</button>
                                })}
                            </div>
                        )
                    })}
                </span>
            </Popup>
        )
    }
}

export default AppointmentSelectPopup;


