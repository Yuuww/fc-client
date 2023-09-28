// Data
let data = {
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
const accessShowPath = document.getElementById("show-path");
const accessHidePath = document.getElementById("hide-path");
const accessError = document.getElementById("access-error");
function togglePasswordVisability() {
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
        data.access = accessPassword;
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
function logIn() {}
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
