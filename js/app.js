"use strict";

const userInput = document.querySelector('input#user');
const emailInput = document.querySelector('input#email');
const passwordInput = document.querySelector('input#password');
const secondPasswordInput= document.querySelector('input#second-password');
const validationIcons = document.querySelectorAll('.validation-icon');
const alerts = document.querySelectorAll('.alert');
const mainAlert = document.querySelector('.main-alert');
const lines = document.querySelectorAll('.line div');
const sumbitMessage = document.querySelector('.submit-message');
const myForm = document.querySelector('form');

const validation = {
    userName : 0,
    email : 0,
    password : 0
}
userInput.addEventListener('input', (e) => {
    const regexUser = /[^a-z]/g
    const regexUser2 = /\s/g;
    validationIcons[0].style.display = "block";
    if(e.target.value.search(regexUser) === -1 && e.target.value.search(regexUser2) === -1 && e.target.value.trim().length >= 3) {
        validationIcons[0].src = "images/check.svg";
        alerts[0].style.display = "none";
        validation.userName = 1;
    }   
    else {
        
        validationIcons[0].src = "images/error.svg";
        alerts[0].style.display = "block";
        validation.userName = 0;
    }

});

emailInput.addEventListener('input', (e) => {

    const regexEmail = /\S+@\S+\.\S+/;
    
    if(e.target.value.search(regexEmail) === 0){

        validationIcons[1].style.display = "block";
        validationIcons[1].src = "images/check.svg";
        alerts[1].style.display = "none";
        validation.email = 1;

    } else if(e.target.value.search(regexEmail) === -1) {

        validationIcons[1].style.display = "block";
        validationIcons[1].src = "images/error.svg";
        alerts[1].style.display = "block";
        validation.email = 0;

    }

});

const passwordValidation = {
    symbol : 0,
    lowercase : 0,
    uppercase:0,
    number : 0
}
const specialChar = /[^a-zA-Z0-9]/;
const lowercase = /[a-z]/;
const uppercase = /[A-Z]/;
const number = /[0-9]/;

passwordInput.addEventListener('input', (e) => {


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

    let testValue = true;
    for(const property in passwordValidation){
        if(passwordValidation[property] == 0){
            testValue =false;
        }
    }
    
    validationIcons[2].style.display = "block";
    if(!testValue){
        alerts[2].style.display = "block";
        validationIcons[2].src = "images/error.svg";
        lines[0].style.display = 'none';
        lines[1].style.display = 'none';
        lines[2].style.display = 'none';
        secondPasswordInput.value ="";
        validation.password =0;
        validationIcons[3].style.display = "none";
        alerts[3].style.display = "none";


      
    } else {
        alerts[2].style.display = "none";
        validationIcons[2].src = "images/check.svg";
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
    if(e.target.value.length === 0){
        validationIcons[3].style.display = "block";
        validationIcons[3].src = "images/error.svg";
        validation.password = 0;
    }
    else if(e.target.value === passwordInput.value){
        validationIcons[3].style.display = "block";
        validationIcons[3].src = "images/check.svg";
        alerts[3].style.display = "none";
        validation.password = 1;
    } else {
        validationIcons[3].style.display = "block";
        validationIcons[3].src = "images/error.svg";
        alerts[3].style.display = "block";
        validation.password = 0;
    }

});

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let testValidation = true;
    for (const prop in validation) {
        if (validation[`${prop}`] == 0 ) {
            testValidation = false;
        }
    }
    if (!testValidation){
        mainAlert.style.display = "block";    
        return;
    }
    sumbitMessage.style.display = "block";
    myForm.style.display = "none";
});