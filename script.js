document.addEventListener("DOMContentLoaded", function () {
    const contactList = document.getElementById("contact-list");
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendMessageButton = document.getElementById("send-message-button");

    // Connect to the server using Socket.IO
    const socket = io();

    // Emit the device's IP address to the server
    socket.emit('ipAddress', getIpAddress());

    // Function to get the device's IP address
    function getIpAddress() {
        // This is a basic example; you might need to find a more reliable way to get the IP address
        return '192.168.1.2';
    }

    // Listen for an updated list of contacts from the server
    socket.on('updateContacts', (contacts) => {
        // Clear existing content
        contactList.innerHTML = "<h1>Select an available contact</h1>";

        // Display each contact
        contacts.forEach(contact => {
            const contactDiv = document.createElement("div");
            contactDiv.classList.add("contact");
            contactDiv.textContent = contact;

            // Handle contact click event
            contactDiv.addEventListener("click", function () {
                loadMessages(contact);
            });

            contactList.appendChild(contactDiv);
        });
    });

    // Function to load messages for a specific contact
    function loadMessages(contact) {
        // Emit the selected contact to the server
        socket.emit('selectedContact', contact);
    }

    // Listen for a chat message from the server
    socket.on('chatMessage', (data) => {
        // Display the message
        const messageDiv = document.createElement("div");
        messageDiv.textContent = data;
        messagesDiv.appendChild(messageDiv);
    });

    // Event listener for send message button
    sendMessageButton.addEventListener("click", () => {
        const selectedContact = document.querySelector(".contact.selected");
        if (!selectedContact) {
            alert("Please select a contact first.");
            return;
        }

        const contactName = selectedContact.textContent;
        const message = messageInput.value;

        // Emit the chat message to the server
        socket.emit('chatMessage', message);

        // Clear the input field
        messageInput.value = "";
    });

    // Event listener for selecting a contact
    contactList.addEventListener("click", (event) => {
        const selectedContact = document.querySelector(".contact.selected");
        if (selectedContact) {
            selectedContact.classList.remove("selected");
        }

        // Add the 'selected' class to the clicked contact
        if (event.target.classList.contains("contact")) {
            event.target.classList.add("selected");
        }
    });
});
