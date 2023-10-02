// Data
let flashcardData = {
  access: null,
  active: null,
  accounts: {},
};

// Interface
const accessView = document.getElementById("access-view");
const loginView = document.getElementById("login-view");
const signupView = document.getElementById("signup-view");
const stacksView = document.getElementById("stacks-view");
const settingsView = document.getElementById("settings-view");
const accountsView = document.getElementById("accounts-view");
let activeView = accessView;
function switchView(view, active) {
  activeView.classList.toggle("active");
  view.classList.toggle("active");
  activeView = view;
  if (typeof active === "string") {
    flashcardData.active = active;
    loadActiveAccount();
  }
}
function toSignUp() {
  switchView(signupView, null);
}
function toLogIn() {
  switchView(loginView, null);
}
function toStacks() {
  switchView(stacksView, flashcardData.active);
}
function toSettings() {
  switchView(settingsView, flashcardData.active);
}
function toAccounts() {
  switchView(accountsView, flashcardData.active);
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
function access() {
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
      if (data.response) {
        flashcardData.accounts[logInName] = data.account;
        flashcardData.active = logInName;
        switchView(stacksView, flashcardData.active);
      } else {
        logInError.innerText = `Error: ${data.error}`;
      }
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error);
      logInError.innerText = "Error: API dose not response.";
    });
}

// Sign in
const signUpInputName = document.getElementById("signup-name");
const signUpInputOne = document.getElementById("signup-password-one");
const signUpShowPathOne = document.getElementById("signup-show-path-one");
const signUpHidePathOne = document.getElementById("signup-hide-path-one");
const signUpInputTwo = document.getElementById("signup-password-two");
const signUpShowPathTwo = document.getElementById("signup-show-path-two");
const signUpHidePathTwo = document.getElementById("signup-hide-path-two");
const signUpError = document.getElementById("signup-error");
function toggleSignUpPasswordVisabilityOne() {
  signUpShowPathOne.classList.toggle("hidden");
  signUpHidePathOne.classList.toggle("hidden");
  if (signUpInputOne.type === "password") {
    signUpInputOne.type = "text";
  } else {
    signUpInputOne.type = "password";
  }
}
function toggleSignUpPasswordVisabilityTwo() {
  signUpShowPathTwo.classList.toggle("hidden");
  signUpHidePathTwo.classList.toggle("hidden");
  if (signUpInputTwo.type === "password") {
    signUpInputTwo.type = "text";
  } else {
    signUpInputTwo.type = "password";
  }
}
function signUp() {
  let signUpName = signUpInputName.value;
  let signUpPasswordOne = signUpInputOne.value;
  let signUpPasswordTwo = signUpInputTwo.value;
  if (signUpPasswordOne !== signUpPasswordTwo) {
    signUpError.innerText = "Error: Passwords do not match.";
    return;
  }
  fetch("https://api.get-done.de:3001/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access: flashcardData.access, account: signUpName, password: signUpPasswordOne }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response) {
        flashcardData.accounts[signUpName] = data.account;
        flashcardData.active = signUpName;
        switchView(stacksView, flashcardData.active);
      } else {
        signUpError.innerText = `Error: ${data.error}`;
      }
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error);
      signUpError.innerText = "Error: API dose not response.";
    });
}

// Update
const updateError = document.getElementById("update-error");
function update() {
  fetch("https://api.get-done.de:3001/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access: flashcardData.access, account: flashcardData.active, password: flashcardData.accounts[flashcardData.active].stacks }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response) {
      } else {
        updateError.innerText = `Error: ${data.error}`;
      }
    })
    .catch((error) => {
      console.error("Fehler bei der API-Anfrage:", error);
      updateError.innerText = "Error: API dose not response.";
    });
}

// Stacks
const stacksHead = document.getElementById("stacks-head");
const stacksNew = document.getElementById("stacks-new");
const stacksList = document.getElementById("stacks-list");
function createStack() {
  flashcardData.accounts[flashcardData.active].stacks.push({ stackName: stacksNew.value, cards: [] });
  updateStack();
  stacksNew.value = "";
}
function updateStack() {
  //update();
  let stackElements = "";
  flashcardData.accounts[flashcardData.active].stacks.forEach((stack) => {
    stackElements += `<div><span>${stack.stackName}</span></div>`;
  });
  stacksList.innerHTML = stackElements;
}
function deleteStack() {}
// Cards
function createCard() {}
function updateCard() {}
function deleteCard() {}
// Lern
function turnCard() {}
function rightGuess() {}
function wrongGuess() {}
// Load
function loadActiveAccount() {
  // Stacks
  stacksHead.innerHTML = `<div onclick="toAccounts()">${flashcardData.active}</div><svg onclick="toSettings()" viewBox="0 -960 960 960"><path d="m367-80-15-126q-10-6-22-13t-22-13l-117 49L78-378l100-76v-52L78-582l113-195 117 49q10-6 22-13t22-13l15-126h226l15 126q10 6 22 13t22 13l117-49 113 195-99 76v52l99 76-113 195-117-49q-10 6-22 13t-22 13L593-80H367Zm113-257q59 0 101-42t42-101q0-59-42-101t-101-42q-59 0-101 42t-42 101q0 59 42 101t101 42Z"/></svg>`;
  updateStack();
}
