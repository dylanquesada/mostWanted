/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'").toLowerCase();
  let person;
  switch(searchType){
    case "yes":
      person = searchByName(people);
      mainMenu(person[0], people);
      break;
    case "no":
      searchByMultipleTraits(people);
      break;
    case "quit":
    return; // stop execution
    break;
    default:
      alert("Invalid entry. Please try again.");
      app(people); // restart app
  }
}

function searchByMultipleTraits(people){
  let userInputChoice = prompt("Pick some search criteria: 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'. 'Quit' to exit program.").toLowerCase().trim();
  let current = [];
  let filteredPeople = people;
  let persons;
  current = userInputChoice.split(",");
  if(!validateMultipleCriteria(current)){
    alert("Error. Invalid entry. Please enter criteria separated by commas. (ex. 'height, age, occupation'");
    return searchByMultipleTraits(people);
  }
  for (var i = 0; i < current.length; i++) {
      switch(current[i].trim()){
        case "height":
        filteredPeople = (searchByHeight(filteredPeople));
        break;
        case "weight":
        filteredPeople = (searchByWeight(filteredPeople));
        break;
        case "eye color":
        filteredPeople = (searchByEyeColor(filteredPeople));
        break;
        case "gender":
        filteredPeople = (searchByGender(filteredPeople));
        break;
        case "age":
        filteredPeople = (searchByAge(filteredPeople));
        break;
        case "occupation":
        filteredPeople = (searchByOccupation(filteredPeople));
        break;
        case "quit":
        return;
        default:
        alert("You have entered an invalid selection. Try Again.");
        searchByMultipleTraits(people);
        break;
      }
  }
  if(filteredPeople.length === 1){
    let foundPerson = filteredPeople[0];
    mainMenu(foundPerson, people);
  }
  else if(filteredPeople.length === 0){
    alert("No person found.");
    searchByMultipleTraits(people);
  }
  else{
    alert("More than one person! Select the one you'd like by name.");
    displayPeople(filteredPeople);
    mainMenu(searchByName(filteredPeople)[0], people);
  }
}

function searchByTraits(people) {
  let filteredPeople;
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'. 'Quit' to exit program.").toLowerCase();
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      displayPeople(filteredPeople);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      displayPeople(filteredPeople);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      displayPeople(filteredPeople);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      displayPeople(filteredPeople);
      break;
    case "age" : 
      filteredPeople = searchByAge(people);
      displayPeople(filteredPeople);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      displayPeople(filteredPeople);
      break;
    case "quit":
      return; // stop execution
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
    }  



  if(filteredPeople.length === 1){
    let foundPerson = filteredPeople[0];
    mainMenu(foundPerson, people);
  }
  else if(filteredPeople.length === 0){
    searchByTraits(people);
  }
  else{
    searchByTraits(filteredPeople);
  }
}

function searchByOccupation(people){
  let userInputOccupation = prompt("Please enter the person's occupation.").toLowerCase();

  let occupation = people.filter(function(el){
    if(el.occupation == userInputOccupation){
      return true;
    }
  });
  return occupation;
}

function searchByAge(people){
  let userInputAge = prompt("Please enter the person's age.");
  if(validateNumber(userInputAge)){
    let age = people.filter(function (el){
      if(getAge(el.dob) == userInputAge){
        return true;
      }
    });
    return age;
  }
  else{
    alert("Please enter a number");
    return searchByAge(people);
  }
}

function isColor(input){
  let colors = ["brown", "black", "hazel", "blue", "green"];
  for (var i = 0; i < colors.length; i++) {
    if(input === colors[i]){
      return true;
    }
  }
    return false;
}

function searchByEyeColor(people){
  let userInputEyeColor = prompt("Please enter the person's eye color.").toLowerCase();
  if(!isColor(userInputEyeColor)){
    alert("Please enter the person's eye color.");
    return searchByEyeColor(people);
  }
  else{
    let colorEyes = people.filter(function (eh){
      if(eh.eyeColor == userInputEyeColor){
        return true;
      }
    });
    return colorEyes;
  }
}

function searchByHeight(people){
  let userInputHeight = prompt("How tall is the person?");
  if(validateNumber(userInputHeight)){
    let howTall = people.filter(function(la){
      if(la.height == userInputHeight){
        return true;
      }
    });
    return howTall;
  }
  if(!validateNumber(userInputHeight)){
    alert("Invalid input. Please enter a number.");
   return searchByHeight(people);
  }
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");
  if(validateNumber(userInputWeight)){
    let newArray = people.filter(function (el) {
      if(el.weight == userInputWeight) {
        return true;
      }
    });
    return newArray;
  }
  if(!validateNumber(userInputWeight)){
    alert("Invalid input. Please enter a number.");
    return searchByWeight(people);
  }
}




function searchByGender(people){
  let userInputGender = prompt("Enter the gender of the person you are looking for. Male or Female:").toLowerCase();
  if(userInputGender === "male" || userInputGender === "female"){
    let output = people.filter(function (el){
      if(el.gender == userInputGender){
        return true;
      }
    });

    return output;
  }
  else{
    alert("Please enter a gender, 'male' or 'female'.");
    return searchByGender(people);
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    alert((getFamily(people, person)));
    break;
    case "descendants":
    displayPeople(findDescendants(people, person));
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    alert("Invalid Entry! Please try again.");
    return mainMenu(person, people); // ask again
  }
}

function findDescendants(people, person){
  //does ID appear in any other's parents section
  //does that ID appear in any other's parents section
  let descendants = people.filter(function (el){
    for (let i = 0; i < el.parents.length; i++) {
      if(el.parents[i] === person.id){
        return true;
      } 
    }
  });
  for (let i = 0; i < descendants.length; i++) {
    descendants = descendants.concat(findDescendants(people, descendants[i]));
  }
  return descendants;
}

function getSpouse(people, person){
  let spouse = people.filter(function(el){
    if(el.currentSpouse === person.id){
      return true;
    }
  });
  return spouse;
}

function getChildren(people, person){
  let string = " ";
  let children = people.filter(function(el){
    for (let i = 0; i < el.parents.length; i++) {
      if(el.parents[i] === person.id){
        return true;
      }
    }
  });
  for (var i = 0; i < children.length; i++) {
    string = string.concat(children[i].firstName + " " + children[i].lastName + "\n");
  }
  return string;
}

function getSiblings(people, person){
  let siblings = people.filter(function(el){
    if(el.id === person.id){
      return false;
    }
    if(el.parents.length === 2){
      if(el.parents[0] === person.parents[0] && el.parents[1] === person.parents[1] ||
      el.parents[1] === person.parents[0] && el.parents[0] === person.parents[1] ){
        return true;
      }
    }
    if(el.parents.length === 1){
      if(el.parents.length === person.parents.length){
        if(el.parents[0] === person.parents[0]){
          return true;
        }
      }
    }
  });

  let string = " ";
  for (var i = 0; i < siblings.length; i++) {
   string = string.concat(siblings[i].firstName + " " + siblings[i].lastName + "\n");
  }
  return string;
}

function getFamily(people, person){
  let family = "";
  if(person.parents.length > 0){
    family = "Parents: " + findName(person.parents[0], people) + "\n";
    if(person.parents.length > 1){ 
      family += findName(person.parents[1], people) + "\n";
    }
  }
  if(person.currentSpouse != null){
    family += "Spouse: " + findName(person.currentSpouse, people) + "\n";
  }
  if(getChildren(people, person).length > 0){
    family += "Children: " + getChildren(people, person) + "\n";
  }
  if(getSiblings(people, person).length > 0){
    family += "Siblings: " + getSiblings(people, person);
  }
  //TODO make sure own person is not coming back as their own sibling
  return family;
}

function findName(id, people){
  let name = people.filter(function(el){
    if(el.id == id){
      return true;
    }
  });
  return name[0].firstName + " " +  name[0].lastName;
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let firstNameMatch = false;
  let newArray = people.filter(function (el) {
    if(el.firstName.toLowerCase() == firstName.toLowerCase()) {
      firstNameMatch = true;
      if(el.lastName.toLowerCase() == lastName.toLowerCase() && firstNameMatch){
        return true;
      }
    }
  });
  return newArray;
}

// alerts a list of people
function displayPeople(people){
  if(people.length === 0){
    alert("Nobody found.");
    return;
  }
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";// TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function validateNumber(input){
  if(isNaN(input)){
    return false;
  }
  else if(input === ""){
    return false;
  }
  else{
    return true;
  }
}
// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function validateMultipleCriteria(input){
  for (var i = 0; i < input.length; i++) {
    input[i] = input[i].trim();
  }
  arrayOfCriteria = ["height", "weight", "age", "eye color", "occupation", "gender", "quit"];
  let isCriteria = false;
  for (var i = 0; i < input.length; i++) {
    isCriteria = false;
    for (var j = 0; j < arrayOfCriteria.length; j++) {
      if(arrayOfCriteria[j] === input[i]){
        isCriteria = true;
      }
    }
    if(!isCriteria){
      return false;
    }
  }
  return true;
}

function getAge(birthday) {
  let currentDate = new Date().getDate();
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let birthDate = new Date(birthday).getDate();
  let birthMonth = new Date(birthday).getMonth();
  let birthYear = new Date(birthday).getFullYear();
  let age = currentYear - birthYear;
  if(currentMonth < (birthMonth)){
   age--;
  }
  if (((birthMonth) == currentMonth) && (currentDate < birthDate)){
   age--;
 }
  return age;
}
