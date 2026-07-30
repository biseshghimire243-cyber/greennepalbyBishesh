const form = document.getElementById("loginForm");

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

// =======================
// SHOW / HIDE PASSWORD
// =======================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

// =======================
// LOGIN
// =======================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const passwordValue = document.getElementById("password").value.trim();

    try {

        const response = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: email,

                password: passwordValue

            })

        });

        const data = await response.json();

        if (data.success) {

            alert("✅ Login Successful. Welcome " + data.user.name + "!");

            // Save user information
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect
            window.location.href = "index.html";

        } else {

            alert("❌ " + data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

});