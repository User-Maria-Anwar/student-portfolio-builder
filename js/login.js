const API = "http://localhost:3000/users";

document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API);
    const users = await res.json();

    const user = users.find(u => u.email === email && u.password === password);

    if(!user){
        alert("Invalid email or password!");
        return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successful!");

    window.location.href = "templates.html";
});