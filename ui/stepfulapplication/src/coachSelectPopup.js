import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { getCoaches } from './coach';
import AppointmentSelectPopup from './appointmentSelectPopup';


class CoachSelectPopUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          coaches:[]
        }
    }
    
    componentDidMount() {
        getCoaches(this.setState.bind(this));
    }

    // handleCoachClick = (id) => {
    //     getCoachAppointments(id, this.setState.bind(this));
    // }

    render() {
    const{coaches}=this.state;

    return (
    <Popup
        trigger={<button className="button"> Pick a Coach </button>}
        position="top center"
        nested
        >
        <span>
            {/* this should be where the coach list is displayed */}
            {coaches.map((coach) => {
            return (
            <div className='actions'>
                <AppointmentSelectPopup date={this.props} coachId={coach.id} firstName={coach.firstName} lastName={coach.lastName}>{coach.firstName} {coach.lastName}</AppointmentSelectPopup>
            </div>
            )}
        )
        }
        </span>
    </Popup>
    )}
}

export default CoachSelectPopUp;