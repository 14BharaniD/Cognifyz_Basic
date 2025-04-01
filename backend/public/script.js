document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let valid = true;

        // Name Validation
        const name = document.getElementById("name");
        const nameError = document.getElementById("nameError");
        if (name.value.trim().length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            valid = false;
        } else {
            nameError.textContent = "";
        }

        // Email Validation
        const email = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.value.match(emailPattern)) {
            emailError.textContent = "Enter a valid email.";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        // Password Validation
        const password = document.getElementById("password");
        const passwordError = document.getElementById("passwordError");
        const passwordStrength = document.getElementById("passwordStrength");
        if (password.value.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters.";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        // Check password strength
        if (password.value.length >= 8 && /[A-Z]/.test(password.value) && /\d/.test(password.value)) {
            passwordStrength.textContent = "Strong password";
            passwordStrength.style.color = "green";
        } else {
            passwordStrength.textContent = "Weak password (use uppercase, numbers)";
            passwordStrength.style.color = "red";
        }

        // Gender Validation
        const genderError = document.getElementById("genderError");
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            genderError.textContent = "Please select your gender.";
            valid = false;
        } else {
            genderError.textContent = "";
        }

        // Prevent submission if invalid
        if (!valid) return;

        // Submit Form via Fetch (AJAX)
        const formData = {
            name: name.value,
            email: email.value,
            password: password.value,
            gender: gender.value,
        };

        const response = await fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            document.body.innerHTML = await response.text();
            window.history.pushState({}, "", "/success");
        } else {
            const errorData = await response.json();
            alert(errorData.errors.join("\n"));
        }
    });
});
