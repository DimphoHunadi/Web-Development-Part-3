const form=document.querySelector('#contact-form');
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const messageInput=document.querySelector('#message');
const addressInput=document.querySelector('#address');
form.addEventListener('submit',(event)=> {
    event.preventDefault();//prevent form submission
    //check if name is empty
    if(nameInput.value.trim()===''){
alert('name field cannot be empty.');
return;
    }
//check if email is valid
if(!isEmailValid(emailInput.value)){
    alert('Invalid email address.');
    return;
}
//Check if message is empty
if(messageInput.value.trim()===''){
    alert('message field cannot be empty.');
    return;
}
//check if address is empty
if(addressInput.value.trim()===''){
    alert('address field cannot be empty');
    return;
}
//if all validation pass,submit the form
alert('form submitted successfully');
form.submit();
});
function isEmailValid(email){
    const emailRegex=/^\w+@[a-zA-Z_]+?\.[a-zA-z]{2,3}$/;
    return emailRegex.test(email);
}