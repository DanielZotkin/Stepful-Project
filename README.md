# Stepful-Project

# Setup
Once you have checked out the project, run in /api:

npm install mongodb  
npm install express --save  
npm install mongodb@4.1.0 --save (make sure it is this version)  
npm install multer --save  

then in /ui/stepfulapplication

npm install

Then to run the project itself, in the api directory run 'node index.js', and in the ui/stepfulapplication directory run npm start

You should be prompted to run the app in a port that isn't port 3000, simply input Y

# What is done

At the top there is a button to toggle from student to coach, the title of the button indicates the user that is selected, note that in this case there is only one coach and one user that can be used, both with id 1.
Provided everything is formatted as described in the input placeholders, no crashes should occur (I did not have time to format or typecheck or enforce entry parameters)

From the student page, you are able to view a calendar (calendar component was taken from https://derrickotte.medium.com/how-to-create-a-calendar-from-scratch-in-react-1f2db197454d
To go to the previous month, press the top left most calendar square, to go to the next month, press the bottom right most calendar square
You should also see a list of upcoming appointments with the title "My Appointments", which contain phone numbers and times (very unformatted times)
To book an appointment, you can press Book on any of the calendar squares, select a coach, and if they have availability on that day, you can press that, which will then add the appointment to the student side.

To toggle the coach page, press on the button labeled "Student"

This page contains whay the coach would see

You have a list of previous appointments with the phone number of the student, the time of the appointment, notes, and rating

You then have a list of uncompleted appointments with a textfield for notes and rating, and a submit button once those are filled in

Below that, you have a textfield (which specifies the format of a time to be inputted) where you can input a date of availability which will appear once add availability is pressed

Finally, you have a list of availabilities

NOTE:the 21st of june has availability for both Coach Kane and Coach Gao (there is no access to add availability for Coach Gao)

# TO-DO

-add checking for proper input, i.e. for rating to be a number, for properly formatted time

-did not get to enforce making appointments exactly 2 hours long and having no overlap

-the view apps button on each calendar icon does not properly display upcoming appointments for students

-the booking time does not account for timezone

-LOTS OF CSS UPDATES

# Overall

This project was lots of fun to work on, I look forward to hearing your feedback :)



