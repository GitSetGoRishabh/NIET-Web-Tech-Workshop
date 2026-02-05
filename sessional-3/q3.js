"use strict";

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

const showMessage = (text = "", color = "red") => {
  msg.textContent = text;
  msg.style.color = color;
};

const sendLogin = data => {
  return fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

form.addEventListener("submit", event => {

  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  if (email === "" || password === "") {
    showMessage("Fill all fields first");
    return;
  }

  sendLogin({ email, password, remember })
    .then(result => {
      if (result.success === true) {
        showMessage("Login successful", "green");
      } else {
        showMessage(result.message);
      }
    })
    .catch(() => {
      showMessage("Server error");
    });
});
