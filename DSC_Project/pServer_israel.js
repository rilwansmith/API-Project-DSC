/* Written by Aliyu Israel Adavize
DSC Workshop project*/
/* Special features: 1. saves and prints names format Abcd (where A the first letter of the name is in capital and the rest in lowercase)
2. only valid number characters can be accepted for matric numbers abd age
*/
//Create server via npm express
var express = require("express")
server = express()
/////////////////////////////////////start of code
var records = {
  1:{
        "firstName": "Sola",
        'lastName': "Adesokan",
        'age': 17
        },
  
  2: {
      'firstName': "Femi",
      'lastName': "Omolaja",
      'age': 19
    },
  3: {
      'firstName': "Obinna",
      'lastName': "Omolaja",
      'age': 19
    },
  4: {
      'firstName': "Deborah",
      'lastName': "Tijani",
      'age': 19
    },
  5: {
      'firstName': "Seminire",
      'lastName': "Adebiyi",
      'age': 17
    },
  6: {
      'firstName': "Adavize",
      'lastName': "Aliyu",
      'age': 18
    },
  7: {
      'firstName': "Omotolani",
      'lastName': "Adejumo",
      'age': 19
    },
  
  8: {
     "firstName": "Ibrahim",
      "lastName": "Ariori",
      "age": 19
    },
  9: {
      'firstName': "Chidera",
      'lastName': "Ude",
      'age': 19
    },
  10: {
      'firstName': "Damilola",
      'lastName': "Oyewole",
      "age": 19
    }
  }

// API to create student info
server.get("/students/create/:matricNo/:firstName/:lastName/:age", function(req, res){
  var firstName = "" + req.params.firstName
  var lastName = "" + req.params.lastName
  var age = req.params.age
  var matricNo = "" + req.params.matricNo
  firstName = firstName.toLowerCase()
  lastName = lastName.toLowerCase()

  //console.log(matricNo)

  console.log('User has requested to create new student info: First Name-' + firstName +', Last Name-' + lastName + ', Age-' + age     )
if (parseInt(matricNo) in records ){
    console.log('Unsuccesful creation, duplicate matric no. ref: ' + matricNo )
    res.end( "The matric number " + matricNo + " already exists, duplicate not allowed!") 
  }
else if(((parseInt(matricNo) in records) == false) && ((isNaN(matricNo)) == false) && (isNaN(age)) == false)  {
            // Change first name of word to upper case
    firstName = firstName.split('')
    firstName[0] = firstName[0].toUpperCase()
    firstName = firstName.join('')
    lastName = lastName.split('')
    lastName[0] = lastName[0].toUpperCase()
    lastName = lastName.join('')

  records[parseInt(matricNo)] = {
    "firstName": firstName,
    "lastName": lastName,
    "age": age 
  }

  res.end("The student info with " + firstName +' ' + lastName + ', and age ' + 12 + " has been created succesfully" )
  console.log(records)
  console.log('Successfull creation, ref: ' + matricNo )
}
else { console.log('Usuccesful creation, unkown error')
  res.end( "Unable to create student info, please check the supplied information and try again")
}})

//API to retrieve student info by matric number
server.get("/students/:matricNo", function(req, res){
  var matricNo = + req.params.matricNo
if (((matricNo) in records) == true){
  var firstName = records[matricNo].firstName
  var lastName = records[matricNo].lastName
  var age = records[matricNo].age 
   res.end(firstName +' '+lastName +' -' + age )
  console.log('User has requested to retrieve student info: First Name-' + firstName + " " + "LastName- " + lastName + ', Age-' + age + " years"    )
}
else if((matricNo in records) == false ){ 
    res.end("matric number doesn't exist" ) 
}})

//API to retrieve student info by first name
server.get("/students/:matricNo/firstName", function(req, res){
  var matricNo =  req.params.matricNo
 
if (((parseInt(matricNo) in records) == false)) { 
  res.end("Matric number " + matricNo + " does not exist" ) 
  }
else {
  firstName = records[parseInt(matricNo)].firstName
  res.end(firstName)
  console.log('User has requested to retrieve student info: First Name-' + firstName )
}})

//API to retrieve student info by last name
server.get("/students/:matricNo/lastName", function(req, res){
  var matricNo =  req.params.matricNo
 
if (((parseInt(matricNo) in records) == false)) { 
  res.end("Matric number " + matricNo + " does not exist" ) 
  }
else {
  lastName = records[parseInt(matricNo)].lastName
  res.end(lastName)
  console.log('User has requested to retrieve student info: last Name-' + lastName)
}})

//API to retrieve student info by age
server.get("/students/:matricNo/age", function(req, res){
  var matricNo =  req.params.matricNo
 
if (((parseInt(matricNo) in records) == false)) { 
    res.end("Matric number " + matricNo + " does not exist" ) 
  }
else {
  age = records[parseInt(matricNo)].age
  res.end( "" + age)
  console.log('User has requested to retrieve student info: age Name-' + age)
}})

//Editing a student info- first name
server.get("/students/edit/:matricNo/firstName/:newN", function(req, res){
  var matricNo = "" + req.params.matricNo
  var newN = req.params.newN
  if (((parseInt(matricNo) in records) == false)){
     res.end("matric number " + matricNo + " does not exist") 
}
      else {
        oldN = records[parseInt(matricNo)].firstName
      records[parseInt(matricNo)].firstName = newN
      res.end( oldN + ' has been changed to ' + newN )  
}})

//Editing a student info- last name
server.get("/students/edit/:matricNo/lastName/:newN", function(req, res){
  var matricNo = "" + req.params.matricNo
  var newN = req.params.newN
  if (((parseInt(matricNo) in records) == false)){
     res.end("matric number " + matricNo + " does not exist") 
}
      else {
        oldN = records[parseInt(matricNo)].lastName
      records[parseInt(matricNo)].lastName = newN
      res.end( oldN + ' has been changed to ' + newN )  
}})

//Deleting a student info
server.get("/students/delete/:matricNo", function(req, res){
  var matricNo = req.params.matricNo
  console.log("User has requested to delete info: ref-" + matricNo  )
  
  if (((parseInt(matricNo) in records) == false)){
    res.end("matric number " + matricNo + " does not exist") 
}
  else {
     delete records[parseInt(matricNo)]
    res.end("The student with matric number " + matricNo + " has been removed" )
    console.log("deleted successfuly: ref-" + matricNo )
    console.log(records)
  }}) 

  //server listen
server.listen(4000, function(){
  console.log("server is running on port 4000")
})

////////////////////////////////end of code
