console.log("contact.js loaded");

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Form submitted");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        console.log("Response:", response.status);

        const data = await response.json();

        console.log(data);

        alert(data.message);

        form.reset();

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
});


const donationForm = document.getElementById("donationForm");

donationForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name = donationForm.querySelector('input[type="text"]').value;

const amount = donationForm.querySelector('input[type="number"]').value;

alert(`🎉 Thank you ${name}!\n\nYour donation of Rs. ${amount} will help protect Nepal's forests, wildlife and rivers.`);

donationForm.reset();

});