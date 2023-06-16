// script.js

const captchaContainer = document.querySelector(".captcha-container");
const captcha = document.getElementById("captcha");
const refreshButton = document.getElementById("refresh-button");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");
const messageContainer = document.getElementById("message-container");

function generateCaptcha() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

refreshButton.addEventListener("click", function () {
  const currentCaptcha = generateCaptcha();
  captcha.textContent = currentCaptcha;
  userInput.value = "";
  userInput.classList.remove("error");
  messageContainer.textContent = "";
});

submitButton.addEventListener("click", function () {
  const currentCaptcha = captcha.textContent;

  if (userInput.value === currentCaptcha) {
    showMessage("Captcha matched! Success!", "success-message");
  } else {
    showMessage("Captcha does not match. Please try again.", "error-message");
  }
});

userInput.addEventListener("input", function () {
  const currentCaptcha = captcha.textContent;
  const userValue = userInput.value;
  let errorIndex = -1;

  for (let i = 0; i < userValue.length; i++) {
    if (userValue[i] !== currentCaptcha[i]) {
      errorIndex = i;
      break;
    }
  }

  if (errorIndex !== -1) {
    userInput.classList.add("error");
    showMessage(
      "Incorrect character at position " + (errorIndex + 1),
      "error-message"
    );
  } else {
    userInput.classList.remove("error");
    messageContainer.textContent = "";
  }
});

function showMessage(message, className) {
  messageContainer.innerHTML = `<div class="${className}">${message}</div>`;
}
