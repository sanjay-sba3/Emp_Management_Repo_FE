document.getElementById('user-form').addEventListener('submit', async function(event){

    event.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const formData = {
        username : name,
        password : password
    };
    document.getElementById('response-message').textContent = 'Submitting...';
    try {
        const response = await fetch('http://127.0.0.1:8000/login/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
           body: JSON.stringify(formData), 
                
            })

        if (response.ok){
            const responseData = await response.json();
            document.getElementById('response-message').textContent = 'Success : ' + responseData.message; 
            localStorage.setItem('accessToken', responseData.data.access_token);  
            localStorage.setItem('username', responseData.data.username);
            console.log(responseData.message);
            // Redirect to user page after successful login
            window.location.href = 'user.html';  // Replace '/user-page' with the URL of the user page
        }    
        else{
            const errorData = await response.json();
            document.getElementById('response-message').textContent= 'Error: '+ errorData.message;
        }
        }
        catch (error){
            console.error('Error submitting form: ', error);
            document.getElementById('response-message').textContent = 'Error submitting form: '+ error.message;
        }

})