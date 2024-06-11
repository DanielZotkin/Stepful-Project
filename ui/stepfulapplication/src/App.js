import './App.css';
import { Component } from 'react';
import { getStudents, addClick, deleteClick } from './student';
import { Calendar } from './calendar';
import { getCoaches, getCoachAppointments, updateCoachAvailability } from './coach';
import { getAllAppointmentsForCoachById, getAllAppointmentsForStudentById, updateCoachNotesAndRating } from './appointment';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      students:[],
      coaches:[],
      coachAppointments:[],
      studentAppointments:[],
      isStudent: true,
      appointments: []
    }
  }

  componentDidMount() {
    getStudents(this.setState.bind(this));
    getCoaches(this.setState.bind(this));
    getAllAppointmentsForCoachById(1, this.setState.bind(this));
    getAllAppointmentsForStudentById(1, this.setState.bind(this));
    getCoachAppointments(1, this.setState.bind(this));
  }

  switchUser() {
    if(this.state.isStudent) {
      this.setState({isStudent: false});
    } else {
      this.setState({isStudent: true});
    }
    this.forceUpdate();
  }

  updateNotesAndRating(coachId, studentPhoneNumber, time) {
    const notes = String(document.getElementById("notes"+coachId).value);
    const rating = Number(document.getElementById("rating"+coachId).value);
    updateCoachNotesAndRating(coachId, studentPhoneNumber, time, notes, rating);
    window.location.reload();
  }

  addAvailability() {
    if (document.getElementById("availability")) {
      const availability = new Date(document.getElementById("availability").value);
      
      const newAppointments = this.state.appointments[0].availability.map((time) => new Date(time));
      newAppointments.push(availability);
      updateCoachAvailability(1, newAppointments);
      window.location.reload();
    }
  }

  render() {
    const{students}=this.state;
    const{coaches}=this.state;
    const{coachAppointments}=this.state;
    const{studentAppointments}=this.state;
    const{appointments}=this.state;
    if (this.state.isStudent) {
    return (
      <div className="App">
          <button id="user" onClick={() => this.switchUser()}>Student</button>
            <h1>My Appointments</h1>
            {studentAppointments.map(appointment => 
                <p>
                  <b>{appointment.coachPhoneNumber} at {appointment.time}</b>&nbsp;
                </p>
            )}
          <center><Calendar /></center>
      </div>
    )} else {
      return (
        <div className="App">
          <button id="user" onClick={() => this.switchUser()}>Coach</button>
          <h1>My Appointments</h1>
          {coachAppointments.map(appointment => {
          if (appointment.rating === 0 && appointment.notes === '') {
            return (
              <p>
                <b>{appointment.studentPhoneNumber} at {appointment.time}</b>
                <input id={"notes"+appointment.coachId} placeholder='Notes'></input>
                <input id={"rating"+appointment.coachId} placeholder='Rating'></input>
                <button onClick={() => this.updateNotesAndRating(appointment.coachId, appointment.studentPhoneNumber, appointment.time)}>Submit Notes and Rating</button>
              </p>
          )} else {
            return (
              <p>
                <b>{appointment.studentPhoneNumber} at {appointment.time} Notes: {appointment.notes} Rating: {appointment.rating}</b>&nbsp;
              </p>
            )
          
          }
          })}
          <p>
            <input id="availability" placeholder='YYYY-MM-DDTHH:MM'></input>
            <button onClick={() => this.addAvailability()}>Add Availability</button>
          </p>
          <p>
            <b>Availability:</b>
            {appointments.map(appointment => 
              <p>
                {appointment.availability.map(time => 
                  <p>
                    {time}
                  </p>
                )}
              </p>
            )}
          </p>
        </div>
      )}
  }
}
export default App;
