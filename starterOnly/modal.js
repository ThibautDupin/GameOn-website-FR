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
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.getElementsByClassName("close");
const validateFormBtn = document.getElementsByClassName("btn-submit");
const subscribeForm = document.getElementsByClassName("subscribe-Form");

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
}
// submit form
function validate(event) {
  event.preventDefault();
  let firstName = document.forms["reserve"]["first"].value;
  let lastName = document.forms["reserve"]["last"].value;
  let email = document.forms["reserve"]["email"].value;
  let birthdate = document.forms["reserve"]["birthdate"].value;
  let quantity = document.forms["reserve"]["quantity"].value;
  let location = document.forms["reserve"]["location"].value;
  let checkbox = document.forms["reserve"]["checkbox1"].checked;

  if (firstName == "" || lastName == "" || email == "" || birthdate == "" || quantity == "" || location == "" || checkbox == false) {
    alert("Merci de remplir tout les champs");
    return false;
  }
  else {
    alert("Merci pour votre réservation");
    modalbg.style.display = "none";
    return true;
  }
}
