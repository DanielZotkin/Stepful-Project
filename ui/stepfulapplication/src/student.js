const API_URL = "http://localhost:3000/";

export const getStudents = (setState) => {
    fetch(API_URL+'api/StepfulApplication/GetAllStudents').then(response => response.json())
    .then(data =>{ 
      setState({students: data})
    });
  }

export const addClick = async (setState) => {
    var newFirstName = document.getElementById("firstName").value;
    var newLastName = document.getElementById("lastName").value;
    var newPhoneNumber = document.getElementById("phoneNumber").value;
    const data = new FormData();
    data.append("firstName", newFirstName);
    data.append("lastName", newLastName);
    data.append("phoneNumber", newPhoneNumber);
    fetch(API_URL+'api/StepfulApplication/InsertStudent', {
      method: 'POST',
      body: data
    }).then(res=>res.json()).then(alert("Student added!")).then(getStudents(setState));
  }

export const deleteClick = async (id, setState) => {
    fetch(API_URL+"api/StepfulApplication/deleteStudent?id="+id, {
      method: 'DELETE',
    }).then(res=>res.json()).then((result)=>{
      getStudents(setState);
    });
  }

  export const getStudentPhoneNumber = (id, setState) => {
    fetch(API_URL+'api/StepfulApplication/GetPhoneNumberForStudent?id='+id).then(response => response.json())
    .then(data =>{ 
      setState({studentPhoneNumber: data})
    });
  }