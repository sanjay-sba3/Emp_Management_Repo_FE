document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('username');
    console.log(token + user)
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch(`http://127.0.0.1:8000/user/?username=${encodeURIComponent(user)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('username').innerText = data.data.username;
        document.getElementById('email').innerText = data.data.email;
    } else {
        console.log("API not found")
        // window.location.href = 'login.html';
    }

    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });
});
