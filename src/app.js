// Data
let flashcardData = {
  access: null,
  accounts: {},
};

// Interface
const accessView = document.getElementById("access-view");
const loginView = document.getElementById("login-view");
const signupView = document.getElementById("signup-view");
let activeView = accessView;
function switchView(view) {
  activeView.classList.toggle("active");
  view.classList.toggle("active");
  activeView = view;
}

// Access
const accessInput = document.getElementById("access-password");
const accessShowPath = document.getElementById("access-show-path");
const accessHidePath = document.getElementById("access-hide-path");
const accessError = document.getElementById("access-error");
function toggleAccessPasswordVisability() {
  accessShowPath.classList.toggle("hidden");
  accessHidePath.classList.toggle("hidden");
  if (accessInput.type === "password") {
    accessInput.type = "text";
  } else {
    accessInput.type = "password";
  }
}
function eccess() {
  let accessPassword = accessInput.value;
  fetch("https://api.get-done.de:3001/access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access: accessPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response === true) {
        flashcardData.access = accessPassword;
        switchView(loginView);
      } else {
        accessError.innerText = `Error: ${data.error}`;
      }
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error);
      accessError.innerText = "Error: API dose not response.";
    });
}

function signUp() {}

// Log in
const logInInputName = document.getElementById("login-name");
const logInInput = document.getElementById("login-password");
const logInShowPath = document.getElementById("login-show-path");
const logInHidePath = document.getElementById("login-hide-path");
const logInError = document.getElementById("login-error");
function toggleLogInPasswordVisability() {
  logInShowPath.classList.toggle("hidden");
  logInHidePath.classList.toggle("hidden");
  if (logInInput.type === "password") {
    logInInput.type = "text";
  } else {
    logInInput.type = "password";
  }
}
function logIn() {
  let logInName = logInInputName.value;
  let logInPassword = logInInput.value;
  fetch("https://api.get-done.de:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access: flashcardData.access, account: logInName, password: logInPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response === true) {
        flashcardData.accounts[logInName] = data.account;
        console.log(data.account);
        //switchView(loginView);
      } else {
        logInError.innerText = `Error: ${data.error}`;
      }
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error);
      logInError.innerText = "Error: API dose not response.";
    });
}
function switchAccount() {}
// Stacks
function createStack() {}
function updateStack() {}
function deleteStack() {}
// Cards
function createCard() {}
function updateCard() {}
function deleteCard() {}
// Lern
function turnCard() {}
function rightGuess() {}
function wrongGuess() {}
