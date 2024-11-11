const dbRef = database.ref('messages');

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  if (message) {
    // Добавляем сообщение в базу данных
    dbRef.push().set({
      message: message,
      timestamp: Date.now()
    });
    messageInput.value = ''; // Очищаем поле после отправки
  }
}

// Отображение сообщений в реальном вчремени
dbRef.on('child_added', (snapshot) => {
  const messageData = snapshot.val();
  const messageContainer = document.getElementById('chat-container');

  // Создаем элемент для сообщения
  const messageElement = document.createElement('p');
  messageElement.textContent = messageData.message;
  messageContainer.appendChild(messageElement);
});
