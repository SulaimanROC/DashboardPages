//LET
let input = document.body.querySelector('.chatBotInput');
let chatBox = document.getElementById('textbox');
let chatBoxBot = document.getElementById('textbox-bot');
let chatLogWrapper = document.getElementById('chatLogWrapper');

//LET

botFusudaGreeting();

//INPUT

//FIRST MESSAGE
function botFusudaGreeting() {
  setTimeout(() => { chatBoxBot.innerHTML += `<p class="text-light bot-bubble bg-dark bg-gradient">Hello! I am Fasuda bot, how can i help? (type "help" for commands)</p>` }, 1500);
}
//FIRST MESSAGE

input.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    let inputValue = event.target.value.trim().toLowerCase();

    if (inputValue !== "") {
      console.log('Input Value:', inputValue);
      chatBox.innerHTML += `<div class="message-container user-message"><p class="user-bubble text-light bg-danger bg-gradient">${inputValue}</p></div>`;
      event.target.value = "";
      chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;

      //CONVERSATION
      if (inputValue === "help") {
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Commands <br><br> -log me out <br> -send me to home <br> -send me to student summary <br> -send me to weather summary <br> -send me to crypto summary <br> -about us </p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 1500);
      } if (chatBox.innerHTML.includes("Commands")) {
        if (inputValue === "yes") {
          setTimeout(() => {
            chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Alright! You can ask me questions like: Can you log me out? Or can you send me to "Home or Dashboard"?</p></div>`;
            chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
          }, 1500);
        }
        if (inputValue === "no") {
          setTimeout(() => {
            chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Ok, you can still ask me questions like: Can you log me out? Or can you send me to "Home or Dashboard"? For now, have a great day!</p></div>`;
            chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
          }, 1500);
        }
      }
      if (inputValue === "can you send me to student summary?" || inputValue === "send me to student summary") {
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Ok, sending you to student summary...</p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 1500);
        setTimeout(() => {
          window.location.href = "dawidboard.html"
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 3500);
      }

      if (inputValue === "can you send me to weather summary?" || inputValue === "send me to weather summary") {
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Ok, sending you to weather summary...</p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 1500);
        setTimeout(() => {
          window.location.href = "suliboard.html"
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 3500);
      }

      if (inputValue === "can you send me to crypto summary?" || inputValue === "send me to crypto summary") {
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Ok, sending you to weather summary...</p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 1500);
        setTimeout(() => {
          window.location.href = "Farisboard.html"
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 3500);
      }

      if (inputValue === "about us" || inputValue === "tell about you") {
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">We are Sulaiman, Dawid and Faris. </p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 1500);
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">We are upcoming software developers that have created multiple projects including games like an escape room and TicTacToe.</p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 3500);
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">We've also created a few websites such as a clothing site and some portfolios.</p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 8500);
      }

      if (inputValue === "can you send me to home?" || inputValue === "can you send me to home" || inputValue === "go to home" || inputValue === "please go to home" || inputValue === "send me to home" || inputValue === "take me to home") {
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Ok, sending you to the homepage...</p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 1500);
        setTimeout(() => {
          window.location.href = "index.html"
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 2000);
      }
      if (inputValue === "can you log me out?" || inputValue === "can you log me out" || inputValue === "log me out" || inputValue === "please log me out" || inputValue === "log out") {
        setTimeout(() => {
          chatBox.innerHTML += `<div class="message-container bot-message"><p class="text-light bot-bubble bg-dark bg-gradient">Ok, logging you out...</p></div>`;
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 1500);
        setTimeout(() => {
          window.location.href = "logout.html"
          chatLogWrapper.scrollTop = chatLogWrapper.scrollHeight;
        }, 3500);
      }
    }
    //CONVERSATION

  }
});
//INPUT








