function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (input.value.trim() === "") return;

  const userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.innerText = input.value;
  chatBox.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "bot";
  botMsg.innerText = "🤖 Thanks! Our AI is analyzing your symptoms.";
  
  setTimeout(() => chatBox.appendChild(botMsg), 600);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
