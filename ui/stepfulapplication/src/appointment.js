const API_URL = "http://localhost:3000/";

export const addAppointment = async (studentId, coachId, time, coachPhoneNumber, studentPhoneNumber) => {
    const data = new FormData();
    data.append("studentId", studentId);
    data.append("coachId", coachId);
    data.append("time", time);
    data.append("notes", '');
    data.append("rating", 0);
    data.append("coachPhoneNumber", coachPhoneNumber);
    data.append("studentPhoneNumber", studentPhoneNumber);
    fetch(API_URL+'api/StepfulApplication/InsertAppointment', {
      method: 'POST',
      body: data
    }).then(res=>res.json()).then(alert("Appointment added!"));
  }

  export const getCoachAppointmentsForDate = (id, date, setState) => {
    fetch(API_URL+'api/StepfulApplication/GetAllAppointmentsForCoachDate?id='+id+'&date='+date).then(response => response.json())
    .then(data =>{
        setState({coachAppointments: data})
    });
    return 0;
  }

  export const getStudentAppointmentsForDate = (id, date, setState) => {
    fetch(API_URL+'api/StepfulApplication/GetAllAppointmentsForStudent?id='+id+'&date='+date).then(response => response.json())
    .then(data =>{
        setState({studentAppointments: data})
    });
    return 0;
  }
  
  export const getAllAppointmentsForCoachById = (id, setState) => {
    fetch(API_URL+'api/StepfulApplication/GetAllAppointmentsForCoachById?id='+id).then(response => response.json())
    .then(data =>{
        setState({coachAppointments: data})
    });
    return 0;
  }

  export const getAllAppointmentsForStudentById = (id, setState) => {
    fetch(API_URL+'api/StepfulApplication/GetAllAppointmentsForStudentsById?id='+id).then(response => response.json())
    .then(data =>{
        setState({studentAppointments: data})
    });
    return 0;
  }

  export const updateCoachNotesAndRating = (id, studentPhoneNumber, time, notes, rating) => {
    const data = new FormData();
    data.append("coachId", id);
    data.append("notes", notes);
    data.append("rating", rating);
    data.append("studentPhoneNumber", studentPhoneNumber);
    data.append("time", time);
    fetch(API_URL+'api/StepfulApplication/UpdateCoachNotesAndRating', {
      method: 'PUT',
      body: data
    }).then(res=>res.json()).then(alert("Coach Notes and Rating updated!"));
  }
