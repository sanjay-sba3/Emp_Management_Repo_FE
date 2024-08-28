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
            console.log(responseData.message)
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

// document.getElementById('user-form').addEventListener('submit', async function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Capture the user input data
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;

//     // Prepare the data to be sent to the API
//     const formData = {
//         name: name,
//         email: email
//     };

//     try {
//         // Send a POST request to the API
//         const response = await fetch('http://127.0.0.1:8000/login/', {
//             method: 'POST', // Use POST method to send data
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData) // Convert the form data to a JSON string
//         });

//         // Handle the response from the API
//         if (response.ok) {
//             const responseData = await response.json();
//             document.getElementById('response-message').textContent = 'Success: ' + responseData.message;
//         } else {
//             const errorData = await response.json();
//             document.getElementById('response-message').textContent = 'Error: ' + errorData.message;
//         }
//     } catch (error) {
//         console.error('Error submitting form:', error);
//         document.getElementById('response-message').textContent = 'Error submitting form: ' + error.message;
//     }
// });