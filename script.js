document.addEventListener("DOMContentLoaded", function () {
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendMessageButton = document.getElementById("send-message-button");
    const registrationForm = document.getElementById("registration-form");
    const loginForm = document.getElementById("login-form");

    // Connect to the server using Socket.IO
    const socket = io();

    // Listen for a chat message from the server
    socket.on('chatMessage', (data) => {
        // Display the message
        const messageDiv = document.createElement("div");
        messageDiv.textContent = data;
        messagesDiv.appendChild(messageDiv);
        // Scroll to the bottom of the messages container
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });

    // Event listener for send message button
    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value;
        // Emit the chat message to the server
        socket.emit('chatMessage', message);
        // Clear the input field
        messageInput.value = "";
    });

    // Event listener for registration form submission
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(registrationForm);
        const username = formData.get("username");
        const password = formData.get("password");

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
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get("username");
        const password = formData.get("password");

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
});
