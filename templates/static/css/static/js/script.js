const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    let score = 0;

    const length = password.length >= 12;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[^A-Za-z0-9]/.test(password);

    if(length) score += 20;
    if(upper) score += 20;
    if(lower) score += 20;
    if(number) score += 20;
    if(special) score += 20;

    const progress =
document.querySelector(".circular-progress");

const scoreNumber =
document.getElementById("score-number");

let degrees =
(score / 100) * 360;

progress.style.background =
`conic-gradient(
#3B82F6 ${degrees}deg,
rgba(255,255,255,0.1) ${degrees}deg
)`;

scoreNumber.innerText = score;

    document.getElementById("length").innerText =
    length ? "✅ Length 12+" : "❌ Length 12+";

    document.getElementById("upper").innerText =
    upper ? "✅ Uppercase Letter" : "❌ Uppercase Letter";

    document.getElementById("lower").innerText =
    lower ? "✅ Lowercase Letter" : "❌ Lowercase Letter";

    document.getElementById("number").innerText =
    number ? "✅ Number" : "❌ Number";

    document.getElementById("special").innerText =
    special ? "✅ Special Character" : "❌ Special Character";

    const entropy = (password.length * 4.7).toFixed(2);

    document.getElementById("entropy").innerText =
    `Entropy: ${entropy} bits`;

    let strength = "Weak";

    if(score >= 40) strength = "Moderate";
    if(score >= 60) strength = "Strong";
    if(score >= 80) strength = "Very Strong";

    document.getElementById("strength").innerText = strength;

    let crackTime = "";

    if(score < 20)
        crackTime = "Instantly";
    else if(score < 40)
        crackTime = "Few Hours";
    else if(score < 60)
        crackTime = "Several Days";
    else if(score < 80)
        crackTime = "Several Years";
    else
        crackTime = "Centuries";

    document.getElementById("crack-time").innerText =
    `Estimated Crack Time: ${crackTime}`;

    let tips = [];

    if(!length) tips.push("Use at least 12 characters");
    if(!upper) tips.push("Add uppercase letters");
    if(!lower) tips.push("Add lowercase letters");
    if(!number) tips.push("Add numbers");
    if(!special) tips.push("Add special characters");

    document.getElementById("tips").innerHTML =
    tips.map(tip => `<li>${tip}</li>`).join("");

});

function generatePassword(){

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let password = "";

    for(let i = 0; i < 16; i++){

        password += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    passwordInput.value = password;

    passwordInput.dispatchEvent(
        new Event("input")
    );

}

function copyPassword(){

    navigator.clipboard.writeText(
        passwordInput.value
    );

    alert("Password Copied!");

}

function togglePassword(){

    const passwordField =
    document.getElementById("password");

    if(passwordField.type === "password"){
        passwordField.type = "text";
    }
    else{
        passwordField.type = "password";
    }

}
