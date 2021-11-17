// console.log("Client side JS is loaded!");

const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "Content coming for Javascript"; // For Testing purpose

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = searchText.value; // User input from UI

  messageOne.textContent = "Loading..."; // Default Value
  messageTwo.textContent = ""; // Default Value

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return messageOne, messageTwo;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
});
