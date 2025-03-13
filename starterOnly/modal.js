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
const closeCross = document.querySelector(".close");
const form = document.querySelector("form");
const modalBdy = document.querySelector(".modal-body");

// Form fields
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birth = document.getElementById("birthdate");
const quantityField = document.getElementById("quantity");
const locationRadios = document.querySelectorAll('input[name="location"]');
const termsCheckbox = document.getElementById("checkbox1");


// Launch modal
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modalbg.style.display = "block";
  window.scrollTo({ top: 0 });
}));

// Close modal
closeCross.addEventListener("click", () => {
  modalbg.style.display = "none";

  // Check if the form is valid
  if (form.classList.contains("success-form")) {
    form.classList.remove("success-form"); // Remove success indicator
    modalBdy.querySelectorAll(".success").forEach((success) => success.remove()); // Remove success message
    form.reset();
  }
});



// Check if the mail is valid with a regex
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if the number is betweend 0 and 99 (Convert string to num withe base 10)
function isValidNumber(value) {
  const num = parseInt(value, 10);
  return num >= 0 && num <= 99;
}


// Display the error message
function displayError(element, message) {
  const parentElement = element.closest('.formData');
  let error = parentElement.querySelector(".error-message");
  if (!error) {

    error = document.createElement("p");
    error.classList.add("error-message");
    parentElement.appendChild(error);
  }
  error.textContent = message;
}

// Remove the error message
function removeError(element) {
  const parentElement = element.closest('.formData');
  const error = parentElement.querySelector(".error-message");
  if (error) {
    error.remove();
  }
}


// Evend listener on the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  // Fields validations
  const validations = [
    {
      field: firstname,
      valid: firstname.value.trim().length >= 2,
      message: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: lastname,
      valid: lastname.value.trim().length >= 2,
      message: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: email,
      valid: validateEmail(email.value),
      message: "Veuillez entrer une adresse email valide."
    },
    {
      field: birth,
      valid: function () {
        removeError(birth);

        if (!birth.value) {
          displayError(birth, "Veuillez entrer une date de naissance valide.");
          return false;
        }

        const birthDate = new Date(birth.value);
        const today = new Date();

        if (birthDate > today) {
          displayError(birth, "La date de naissance doit être dans le passé.");
          return false;
        }
        return true;
      },
      message: ""
    },

    {
      field: quantityField,
      valid: isValidNumber(quantityField.value.trim()),
      message: "Veuillez entrer un nombre entre 0 et 99."
    },
    {
      field: locationRadios[0],
      valid: Array.from(locationRadios).some((radio) => radio.checked),
      message: "Veuillez sélectionner une localisation."
    },
    {
      field: termsCheckbox,
      valid: termsCheckbox.checked,
      message: "Vous devez accepter les conditions générales."
    },
  ];

  // Validations of each form
  validations.forEach(({ field, valid, message }) => {
    const isFieldValid = typeof valid === "function" ? valid() : valid; 
    //Check if element.field is a function if it is return the result of the function, 
    // if it's not return the content of the element.
    if (!isFieldValid) {
      if (message) {
        displayError(field, message);
      }
      isValid = false;
    } else {
      removeError(field);
    }
  });



  // Success message appear if everything is ok
  if (isValid) {
    form.classList.add("success-form");
    const validate = document.createElement("div");
    validate.classList.add("success");
    const validateTxt = document.createElement("p");
    validateTxt.textContent = "Merci pour votre inscription !";
    validateTxt.classList.add("success-message");
    modalBdy.appendChild(validate);
    validate.appendChild(validateTxt);
    form.reset();
  }
});

// Remove error message when input is used
[firstname, lastname, email, birth, quantityField].forEach((field) => {
  field.addEventListener("input", () => removeError(field));
});

// Remove error message when something change
locationRadios.forEach((radio) => {
  radio.addEventListener("change", () => removeError(locationRadios[0]));
});

termsCheckbox.addEventListener("change", () => removeError(termsCheckbox));