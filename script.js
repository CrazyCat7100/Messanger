document.addEventListener("DOMContentLoaded", function () {
    const contactList = document.getElementById("contact-list");
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendMessageButton = document.getElementById("send-message-button");

    // Function to display contacts dynamically
    function displayContacts() {
        // Fetch contacts from localStorage (replace this with your actual data source)
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

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
    }

    // Function to load messages for a specific contact
    function loadMessages(contact) {
        // Fetch messages from localStorage (replace this with your actual data source)
        const messages = JSON.parse(localStorage.getItem(contact)) || [];

        // Display messages
        messagesDiv.innerHTML = "";
        messages.forEach(message => {
            const messageDiv = document.createElement("div");
            messageDiv.textContent = message;
            messagesDiv.appendChild(messageDiv);
        });
    }

    // Function to send a message
    function sendMessage() {
        const selectedContact = document.querySelector(".contact.selected");
        if (!selectedContact) {
            alert("Please select a contact first.");
            return;
        }

        const contactName = selectedContact.textContent;
        const message = messageInput.value;

        // Fetch existing messages or initialize an empty array
        const messages = JSON.parse(localStorage.getItem(contactName)) || [];

        // Add the new message
        messages.push(message);

        // Update localStorage
        localStorage.setItem(contactName, JSON.stringify(messages));

        // Reload messages for the selected contact
        loadMessages(contactName);

        // Clear the input field
        messageInput.value = "";
    }

    // Event listener for send message button
    sendMessageButton.addEventListener("click", sendMessage);

    // Initial display of contacts
    displayContacts();
});
