const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector('[data-passwordDisplay]')
const dataCopy = document.querySelector('[data-copy]')
const copyMsg = document.querySelector('[data-copyMsg]')
const uppercaseCheck = document.querySelector('#uppercase')
const lowercaseCheck = document.querySelector('#lowercase')
const numbersCheck = document.querySelector('#numbers')
const symbolsCheck = document.querySelector('#symbols')
const indicator = document.querySelector('[data-indicator]')
const generateBtn = document.querySelector('.generateButton')
const allCheckBox = document.querySelectorAll('input[type=checkbox]')
const aliflaila = document.querySelector('#aliflaila');

let password = "";
let passwordLength = 7;
let checkCount = 0;
const symbols = "~!@#$%^&*()_+{:";
// set strength circle color to gray
setIndicator("#ccc");

handleSlider = () => {
    handleCheckboxChange();
    inputSlider.value = passwordLength;
    // lengthDisplay.innerText = inputSlider.value;
    lengthDisplay.innerText = passwordLength;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
    }
    

    // kya or kuchh bhi krna chahiye
    const min = inputSlider.min;
    const max = inputSlider.max;
    // inputSlider.style.backgroundSize = " 30% 100%"
    // console.log((passwordLength/max)*100+"%"+" 100%")
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
   
}
handleSlider();

// set indicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 10px ${color}`
}

// generate random integer
getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

generateRandomNumber = () => {
    return getRandomInteger(0,9);
}

// generate lowercase

generateLowerCase = () => {
    return String.fromCharCode(getRandomInteger(97, 123));
}

// generate UpperCase
generateUpperCase = () => {
    return String.fromCharCode(getRandomInteger(65,91));
}

// generate Symbol
generateSymbol = () => {
    const random = getRandomInteger(0, symbols.length);
    return symbols.charAt(random);
}

calcStrength = () => {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=6){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00")
    }
}

async function copyContent() {
    
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "copied";
    } catch (error) {
        copyMsg.innerText("failed");
    }
    // to make copy wala span visible
    copyMsg.classList.add('active')

    setTimeout(() => {
        copyMsg.classList.remove('active')
    }, 2000);
}

aliflaila.addEventListener('click', copyContent)

//

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

function handleCheckboxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    })
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    // console.log(checkCount) // counting checkcount
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange)
})

// shuffle
function shufflePassword(arr){
    // Fisher Yates method
    for(let i= arr.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    let str = "";
    arr.forEach((el) => (str+=el));
    return str;
}

// generate password
generateBtn.addEventListener('click', () => {
    // none of the checkbox is checked
    if(checkCount === 0){
        return;
    }
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // console.log(password)

    let funArr = [];
    if(uppercaseCheck.checked){
        funArr.push(generateUpperCase());
    }
    if(lowercaseCheck.checked){
        funArr.push(generateLowerCase());
    }
    if(numbersCheck.checked){
        funArr.push(generateRandomNumber());
    }
    if(symbolsCheck.checked){
        funArr.push(generateSymbol());
    }
   console.log(funArr)

   // compulsory addition
//    for(let i of funArr){
//     password += i;
//    }

   for(let i=0; i<funArr.length; i++){
    password += funArr[i];
   }

   // remaining addition
   for(let i=0; i<passwordLength-funArr.length; i++){
    let randomIndex = getRandomInteger(0, funArr.length);
    password += funArr[randomIndex];
   }
//    console.log(password)

   // shuffle password
   password = shufflePassword(Array.from(password));
   // show password in ui
   passwordDisplay.value = password;

   // calculate password strength
   calcStrength();

})
