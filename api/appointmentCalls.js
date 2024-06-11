var MongoClient = require('mongodb').MongoClient;   
const multer = require('multer');

var CONNECTION_STRING = "mongodb+srv://admin:KbukpcWcRPFA2Eji@cluster0.lom4zsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "StepfulApplicationDB";
var database;

MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
});

function insertAppointment(request, response) {
    database.collection("Appointments").insertOne({
        studentId: request.body.studentId,
        coachId: request.body.coachId,
        time: new Date(request.body.time),
        notes: request.body.notes,
        rating: 0,
        coachPhoneNumber: request.body.coachPhoneNumber,
        studentPhoneNumber: request.body.studentPhoneNumber
    });
    response.send("Successfully inserted Appointment!");
}

function getAllAppointmentsForCoach(request, response) {
    const startOfDay = new Date(request.query.date);
    startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(request.query.date);
    endOfDay.setHours(23,59,59,999);
    database.collection("Appointments").find(
        {coachId: request.query.id, 
            time: {
                $gte: startOfDay,
                $lt: endOfDay
            },
        }

    ).toArray((error, result) => {
        response.send(result);
    });
}

function getAllAppointmentsForCoachById(request, response) {
    database.collection("Appointments").find(
        {coachId: request.query.id}
    ).toArray((error, result) => {
        response.send(result);
    });
}
 
function getAllAppointmentsForStudent(request, response) {
    const startOfDay = new Date(request.query.date);
    startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(request.query.date);
    endOfDay.setHours(23,59,59,999);
    database.collection("Appointments").find(
        {studentId: request.query.id,
            time: {
                $gte: startOfDay,
                $lt: endOfDay
            },
        },
    ).toArray((error, result) => {
        response.send(result);
    });
}

function getAllAppointmentsForStudentById(request, response) {
    database.collection("Appointments").find(
        {studentId: request.query.id}
    ).toArray((error, result) => {
        response.send(result);
    });
}

function updateRatingAndNotes(request, response) {
    database.collection("Coaches").updateOne(
        {coachId: request.body.coachId, studentId: request.body.studentId},
        {$set: {availability: JSON.parse(request.body.availability)}}
    );
    response.send("Successfully updated coach availability!");
}  

function updateCoachNotesAndRating(request, response) {
    database.collection("Appointments").updateOne(
        {coachId: request.body.coachId, studentPhoneNumber: request.body.studentPhoneNumber, time: new Date(request.body.time)},
        {$set: {notes: request.body.notes, rating: request.body.rating} }
    );
    response.send("Successfully updated coach notes and rating!");
}   

module.exports = {
    insertAppointment,
    getAllAppointmentsForCoach,
    getAllAppointmentsForStudent,
    getAllAppointmentsForCoachById,
    getAllAppointmentsForStudentById,
    updateCoachNotesAndRating
};