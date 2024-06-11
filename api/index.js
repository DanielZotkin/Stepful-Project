var Express = require('express');
// var MongoClient = require('mongodb').MongoClient;   
var cors = require('cors');
const multer = require('multer');
var studentCalls = require('./studentCalls');
var coachCalls = require('./coachCalls');
var appointmentCalls = require('./appointmentCalls');

var app = Express();
app.use(cors());
app.use(Express.json());

app.listen(3000, () => {
    console.log("Server running!");
});


app.get('/api/StepfulApplication/GetAllStudents', studentCalls.getAllStudents);
app.post('/api/StepfulApplication/InsertStudent', multer().none(), studentCalls.insertStudent);
app.delete('/api/StepfulApplication/DeleteStudent', studentCalls.deleteStudent);
app.get('/api/StepfulApplication/GetPhoneNumberForStudent', studentCalls.getPhoneNumberForStudent);

app.get('/api/StepfulApplication/GetAllCoaches', coachCalls.getAllCoaches);
app.get('/api/StepfulApplication/GetAllAppointmentsForCoach', coachCalls.getAllAvailabilityForCoach);
app.put('/api/StepfulApplication/UpdateCoachAvailability', multer().none(), coachCalls.updateCoachAvailability);
app.get('/api/StepfulApplication/GetPhoneNumberForCoach', coachCalls.getPhoneNumberForCoach);


app.post('/api/StepfulApplication/InsertAppointment', multer().none(), appointmentCalls.insertAppointment);
app.get('/api/StepfulApplication/GetAllAppointmentsForStudent', appointmentCalls.getAllAppointmentsForStudent);
app.get('/api/StepfulApplication/GetAllAppointmentsForCoachDate', appointmentCalls.getAllAppointmentsForCoach);
app.get('/api/StepfulApplication/GetAllAppointmentsForCoachById', appointmentCalls.getAllAppointmentsForCoachById);
app.get('/api/StepfulApplication/GetAllAppointmentsForStudentsById', appointmentCalls.getAllAppointmentsForStudentById);
app.put('/api/StepfulApplication/UpdateCoachNotesAndRating', multer().none(), appointmentCalls.updateCoachNotesAndRating);
