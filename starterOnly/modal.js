function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalForm = document.querySelector(".subscribe-form");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalConfirm = document.querySelector(".confirmationMessage")
const modalError = document.querySelector(".errorMessage")
const formData = document.querySelectorAll(".formData");
const closeBtn = document.getElementsByClassName("close");
const validateFormBtn = document.getElementsByClassName("btn-submit");
const subscribeForm = document.getElementsByClassName("subscribe-Form");
// verifications
const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexName = /^.{2,}$/


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//close modal form
function closeModal() {
  modalbg.style.display = "none";
}
// show confirmation message
function showConfirmationMessage(message) {
  const confirmationDiv = document.getElementById("confirmationMessage");
  confirmationDiv.innerText = message;
  subscribeForm.style.display = "none";
  confirmationDiv.style.display = "block";
}
// close modal form when click close button
closeBtn[0].addEventListener("click", closeModal);

// close modal form when click outside
window.onclick = function (event) {
  if (event.target == modalbg) {
    modalbg.style.display = "none";
  }
};

// submit form

function validateField(value, validation, errorMsg) { if (!value || !validation.test(value)) { return errorMsg; } return ""; }
let firstName = document.forms["reserve"]["first"].value;
let lastName = document.forms["reserve"]["last"].value;
let email = document.forms["reserve"]["email"].value;
let birthdate = document.forms["reserve"]["birthdate"].value;
let quantity = document.forms["reserve"]["quantity"].value;
let location = document.forms["reserve"]["location"].value;
let checkbox = document.forms["reserve"]["checkbox1"].checked;
document.getElementById("modalForm").addEventListener("submit"), function (event) {
  event.preventDefault();
  const fields = [

    {
      id: "firstname", value: firstname.lenght,
      validation: regexName, errorMsg: ["Le prénom ne peut pas être vide.", "Le prénom doit contenir au minimum 2 lettres."]
    },
    {
      id: "lastname", value: lastname.lenght,
      validation: regexName, errorMsg: ["Le nom ne peut pas être vide.", "Le nom doit contenir au minimum 2 lettres."]
    },
    {
      id: "email", value: document.getElementById("email").value,
      validation: regexMail, errorMsg: ["L'email ne peut pas être vide.", "L'email doit être valide."]
    }

  ];
  let valid = true; 
  fields.forEach(field => {
    let error = validateField(field.value, field.validation, field.errorMsg[1]);
    if (!field.value) { error = field.errorMsg[0]; } document.getElementById(`${field.id}Error`).textContent = error; if (error) valid = false;
  });
  if (valid) {
    modalForm.style.display = "none"
    modalConfirm.classList.add('confirmationMessageShow')
  };

// function validate(event) {
// event.preventDefault();
// let firstName = document.forms["reserve"]["first"].value;
// let lastName = document.forms["reserve"]["last"].value;
// let email = document.forms["reserve"]["email"].value;
// let birthdate = document.forms["reserve"]["birthdate"].value;
// let quantity = document.forms["reserve"]["quantity"].value;
// let location = document.forms["reserve"]["location"].value;
// let checkbox = document.forms["reserve"]["checkbox1"].checked;

//   if (firstName == "" || lastName == "" || email == "" || birthdate == "" || quantity == "" || location == "" || checkbox == false) {

//     modalError.style.display = "block"
//     return false;
//   }
//   else if (firstName.length < 2) {
//     firstNameError.style.display = "block"
//   }
//   else if (lastName.length < 2) {
//     lastNameError.style.display = "block"
//   }
//   else if (regexMail.test(email)) {
//     mailError.style.display = "block"
//   }
//   else if (location == "") {
//     locationError.style.display = "block"
//   }

//   else if (date <= dateajd) {
//     dateError.style.display = "block"
//   }


//   else {
//     modalForm.style.display = "none"
//     modalConfirm.classList.add('confirmationMessageShow')

//     return true;
//   }
// }
