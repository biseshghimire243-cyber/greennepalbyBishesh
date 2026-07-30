// ===========================
// STAR RATING
// ===========================

const stars = document.querySelectorAll(".stars i");
const ratingValue = document.getElementById("ratingValue");

let rating = 0;

stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        rating = index + 1;

        ratingValue.value = rating;

        stars.forEach((s, i) => {

            if (i < rating) {
                s.classList.remove("fa-regular");
                s.classList.add("fa-solid");
            } else {
                s.classList.remove("fa-solid");
                s.classList.add("fa-regular");
            }

        });

    });

});

// ===========================
// FORM SUBMIT
// ===========================

const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("🎉 Thank you! Your feedback has been submitted successfully.");

    feedbackForm.reset();

    rating = 0;

    ratingValue.value = "";

    stars.forEach(star => {
        star.classList.remove("fa-solid");
        star.classList.add("fa-regular");
    });

});

// ===========================
// SCROLL ANIMATION
// ===========================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(
    ".info-box, .report-card, .faq-item, .stat"
).forEach(item => {

    item.classList.add("hidden");

    observer.observe(item);

});

// ===========================
// FILE NAME DISPLAY
// ===========================

const upload = document.getElementById("photo");

if (upload) {

    upload.addEventListener("change", function () {

        if (this.files.length > 0) {

            document.getElementById("fileName").innerHTML =
                "📷 " + this.files[0].name;

        }

    });

}