const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const loginButton = document.querySelector('#login-btn');

loginButton.addEventListener('click', login);
document.addEventListener('keyup', (event) => {
    if (event.code == 'Enter') {
        login();
    }
});


// janjulius
// JJ2023!

function login() {
    const username = usernameInput.value;
    const password = passwordInput.value; 

    if (username.length == 0 || password.length == 0) {
        alert('Enter your credentials!');
        return;
    }

    fetch(`https://mbo-sd.nl/apiv2/login/${username}/${password}`)
        .then((res) => res.json())
        .then((loginResult) => checkLoginSuccess(loginResult));
}


function checkLoginSuccess(loginResult) {
    console.log(loginResult);
    if (loginResult['login-successfull']) {
        localStorage.setItem('bearer-token', loginResult['bearer-token']);
        localStorage.setItem('user-information', JSON.stringify(loginResult['user-information']));
        window.location.href = '/index.html';
    } else {
        alert('Wrong Credentials!');
    }
}

