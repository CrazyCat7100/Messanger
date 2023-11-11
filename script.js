document.addEventListener("DOMContentLoaded", function () {
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendMessageButton = document.getElementById("send-message-button");
    const registrationForm = document.getElementById("registration-form");
    const loginForm = document.getElementById("login-form");

    // Connect to the server using Socket.IO
    const socket = io();

    // Event listener for login button
    document.getElementById("login-button").addEventListener("click", function () {
        registrationForm.style.display = "none"; // Hide registration form
        loginForm.style.display = "block"; // Show login form
    });

    // Event listener for register button
    document.getElementById("register-button").addEventListener("click", function () {
        loginForm.style.display = "none"; // Hide login form
        registrationForm.style.display = "block"; // Show registration form
    });

    // Event listener for registration form submission
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("registration-username").value;
        const password = document.getElementById("registration-password").value;

        // Send registration data to the server
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    });

    // Event listener for login form submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        // Send login data to the server
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    });

    // Event listener for send message button
    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value;
        // Emit the chat message to the server
        socket.emit('chatMessage', message);
        // Clear the input field
        messageInput.value = "";
    });

    // Listen for a chat message from the server
    socket.on('chatMessage', (data) => {
        // Display the message
        const messageDiv = document.createElement("div");
        messageDiv.textContent = data;
        messagesDiv.appendChild(messageDiv);
        // Scroll to the bottom of the messages container
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
});
