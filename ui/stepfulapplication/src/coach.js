const API_URL = "http://localhost:3000/";

export const getCoaches = (setState) => {
    fetch(API_URL+'api/StepfulApplication/GetAllCoaches').then(response => response.json())
    .then(data =>{ 
      setState({coaches: data})
    });
  }

export const getCoachAppointments = (id, setState) => {
    fetch(API_URL+'api/StepfulApplication/GetAllAppointmentsForCoach?id='+id).then(response => response.json())
    .then(data =>{
        setState({appointments: data})
    });
    return 0;
  }

export const updateCoachAvailability = async (id, availability) => {
    const data = new FormData();
    data.append("id", id);
    data.append("availability", JSON.stringify(availability));
    fetch(API_URL+'api/StepfulApplication/UpdateCoachAvailability', {
      method: 'PUT',
      body: data
    }).then(res=>res.json()).then(alert("Coach availability updated!"));
  }

  export const getCoachPhoneNumber = (id, setState) => {
    fetch(API_URL+'api/StepfulApplication/GetPhoneNumberForCoach?id='+id).then(response => response.json())
    .then(data =>{
        setState({coachPhoneNumber: data})
    });
    return 0;
  }

