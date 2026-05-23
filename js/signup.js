const API = "http://localhost:3000/users";

document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    // Check if email already exists
    const res = await fetch(API);
    const users = await res.json();

    const exists = users.find(u => u.email === user.email);

    if (exists) {
        alert("Email already exists!");
        return;
    }

    // Save user
    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    alert("Signup successful!");

    // Go to login page
    window.location.href = "login.html";
});