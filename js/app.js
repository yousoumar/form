"use strict";

const inputs = document.querySelectorAll('input');
const userInput = document.querySelector('input#user');
const emailInput = document.querySelector('input#email');
const passwordInput = document.querySelector('input#password');
const secondPasswordInput= document.querySelector('input#second-password');
const mainAlert = document.querySelector('.main-alert');
const lines = document.querySelectorAll('.line div');
const sumbitMessage = document.querySelector('.submit-message');
const myForm = document.querySelector('form');

// object used below to check if all the inputs are ok
// we have string properties because of the lat one 

const validation = {
    'user' : 0,
    'email' : 0,
    'password' : 0,
    'second-password' : 0
}

inputs.forEach(input => {
    input.addEventListener('focus', (e)=>{
        resetField(e.currentTarget);
    });
});

// username input

userInput.addEventListener('blur', (e) => {
    mainAlert.style.display = "none"; 
    const regexUser = /[^a-z]/g

    if(e.target.value.search(regexUser) === -1  && e.target.value.length >= 3) {
        validation['user'] = 1;
        validateField(e.currentTarget);
    }   
    else {
        validation['user'] = 0;
        inValidateField(e.currentTarget);
        
       
    }

});

// email input
emailInput.addEventListener('blur', (e) => {
    mainAlert.style.display = "none"; 
    const regexEmail = /\S+@\S+\.\S+/;
    if(e.target.value.search(regexEmail) === 0){
        validation['email'] = 1;
        validateField(e.currentTarget);

    } else {

        validation['email'] = 0;
        inValidateField(e.currentTarget);

    }

});


// password input
const passwordValidation = {
        symbol : 0,
        lowercase : 0,
        uppercase:0,
        number : 0,
        space:0
    }

passwordInput.addEventListener('input', (e) => {
    secondPasswordInput.value ="";
    validation['second-password'] = 0;
    resetField(secondPasswordInput);

    lines[0].style.display = 'none';
    lines[1].style.display = 'none';
    lines[2].style.display = 'none';
    
});

passwordInput.addEventListener('blur', (e) => {
    mainAlert.style.display = "none"; 
      
    const specialChar = /[^a-zA-Z0-9]/;
    const lowercase = /[a-z]/;
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    const space =/\s/g;

    
   
    if(e.target.value.search(specialChar) !== -1){
        passwordValidation.symbol = 1;
    }else{
        passwordValidation.symbol = 0;
    }
    if(e.target.value.search(lowercase) !== -1){
        passwordValidation.lowercase = 1;
    }else{
        passwordValidation.lowercase = 0;
    }
    if(e.target.value.search(uppercase) !== -1){
        passwordValidation.uppercase = 1;
    }else{
        passwordValidation.uppercase = 0;
    }
    
    if(e.target.value.search(number) !== -1){
        passwordValidation.number = 1;
    }else{
        passwordValidation.number = 0;
    }
    if(e.target.value.search(space) !== -1){
        passwordValidation.space = 0;
    }else{
        passwordValidation.space = 1;
    }
    let testValue = true;
    for(const property in passwordValidation){
        if(passwordValidation[property] == 0){
            testValue =false;
        }
    }
    
    if(!testValue){
        validation['password'] = 0;
        inValidateField(e.currentTarget);
        
        lines[0].style.display = 'none';
        lines[1].style.display = 'none';
        lines[2].style.display = 'none';
      
    } else {
        validation['password'] = 1;
        validateField(e.currentTarget);
        if(e.target.value.length <= 6 && e.target.value.length > 0){
            lines[0].style.display = 'block';
            lines[1].style.display = 'none';
            lines[2].style.display = 'none';
        }
        else if (e.target.value.length > 6 && e.target.value.length <= 9) {
            lines[0].style.display = 'block';
            lines[1].style.display = 'block';
            lines[2].style.display = 'none';
        }
        else if (e.target.value.length > 9) {
            lines[0].style.display = 'block';
            lines[1].style.display = 'block';
            lines[2].style.display = 'block';
        }
        else if (e.target.value.length === 0) {
            lines[0].style.display = 'none';
            lines[1].style.display = 'none';
            lines[2].style.display = 'none';
        }
    }

   


});

// second password input
// blow is so we can not put in if the first password input is not yet ok
secondPasswordInput.addEventListener('input', (e) => {

    let firstPasswordTest = true;
    for (const prop in passwordValidation) {
        if (passwordValidation[`${prop}`] == 0) {
            
            firstPasswordTest = false;
        }
    }
    if (!firstPasswordTest){
        e.target.value="";
        return;
    }
  
});
secondPasswordInput.addEventListener('blur', (e)=>{
    let firstPasswordTest = true;
    for (const prop in passwordValidation) {
        if (passwordValidation[`${prop}`] == 0) {
            
            firstPasswordTest = false;
        }
    }
    if (firstPasswordTest){
      
        if(e.target.value === passwordInput.value){
            validateField(e.currentTarget);
            validation['second-password'] = 1;
        } else {
            inValidateField(e.currentTarget);
            validation['second-password'] = 0;
        }
    }

});


myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let testValidation = true;
    for (const prop in validation) {
        if (validation[`${prop}`] == 0 ) {
            testValidation = false;
            document.querySelector(`input#${prop}`).style.borderColor = "crimson";
        }
    }
    if (!testValidation){
        mainAlert.style.display = "block";    
        return;
    }
    myForm.style.display = "none";
    window.scrollTo(0, 0);
    sumbitMessage.style.display = "block";
    
});

function resetField(field){
    mainAlert.style.display = "none"; 
    document.querySelector(`img.${field.getAttribute('id')}`).style.display = "none";
    document.querySelector(`div.${field.getAttribute('id')}`).style.display = "none";
    field.style.borderColor = "rgba(0,0,0,0.3)";
}
function validateField(field){
    
    document.querySelector(`img.${field.getAttribute('id')}`).style.display ="block";
    document.querySelector(`img.${field.getAttribute('id')}`).src = "images/check.svg";
    document.querySelector(`div.${field.getAttribute('id')}`).style.display = "none";
    field.style.borderColor = "green";
}
function inValidateField(field){
    
    if (field.value !== ""){
        document.querySelector(`img.${field.getAttribute('id')}`).style.display ="block";
        document.querySelector(`img.${field.getAttribute('id')}`).src = "images/error.svg";
        document.querySelector(`div.${field.getAttribute('id')}`).style.display = "block";
        field.style.borderColor = "crimson";
    }
    
}