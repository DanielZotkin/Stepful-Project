import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import './studentPopup.css';
import CoachSelectPopUp from './coachSelectPopup';
import AppointmentPopup from './appointmentsPopup';

class StudentPopup extends Component {

  render() {
    return (
      <div>
      <Popup trigger={<button>Book</button>} modal nested>
        {close => (
      <div className="modal">
        <div className="header"> Book a time </div>
        <div className="content">
          {' '}
          <br />
        </div>
        <div className="actions">
          <CoachSelectPopUp day={this.props}/>
          <button
            className="button"
            onClick={() => {
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
      </Popup>
      <Popup trigger={<button>View Apps</button>} modal nested>
      {close =>(
      <div className="modal">
        <div className="header"> Upcoming Apps </div>
        <div className="content">
          {' '}
          <br />
        </div>
        <div className="actions">
          <AppointmentPopup day={this.props}/>
          <button
            className="button"
            onClick={() => {
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
      )}
      </Popup>
      </div>
    )
  }
}

export default StudentPopup;