/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let person;
  switch(searchType){
    case "yes":
      person = searchByName(people);
      mainMenu(person[0], people);
      break;
    case "no":
      searchByTraits(people);
      break;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people); // restart app
  }

}

function searchByTraits(people) {
  let filteredPeople;
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    // case "age" : 
    //   filteredPeople = searchByAge(people);
          // break;
    // case "occupation":
    //   filteredPeople = searchByOccupation(people);
        // break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
    }  



  if(filteredPeople.length === 1){
    let foundPerson = filteredPeople[0];
    mainMenu(foundPerson, people);
  }
  else
    searchByTraits(filteredPeople);

}

function searchByEyeColor(people){
  let userInputEyeColor = prompt("Please enter the person's eye color.");

  let colorEyes = people.filter(function (eh){
    if(eh.eyeColor == userInputEyeColor){
      return true;
    }
  });
  return colorEyes;
}

function searchByHeight(people){
  let userInputHeight = prompt("How tall is the person?");

  let howTall = people.filter(function(la){
    if(la.height == userInputHeight){
      return true;
    }
  });
  return howTall;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}




function searchByGender(people){
  let userInputGender = prompt("Enter the gender of the person you are looking for. Male or Female:").toLowerCase();
  switch(userInputGender){
    case "male":
    searchByTraits(people);
    break;
    case "female":
    searchByTraits(people);
    break;
    default:
    alert("Invalid! Please try again, you only have two choices.");
    searchByGender(people);
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let firstNameMatch = false;

  let newArray = people.filter(function (el) {
    if(el.firstName == firstName) {
      firstNameMatch = true;
      if(el.lastName == lastName && firstNameMatch){
        return true;
      }
    }

  });
  return newArray;
}



// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
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

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
