// const cover = document.querySelector('.page-cover');

function checkLoggedIn() {
    const userData = localStorage.getItem('bearer-token');
    if (!userData) {
        window.location.href = '/login.html';
    } else {
        // cover.remove();
    }
}

// checkLoggedIn();