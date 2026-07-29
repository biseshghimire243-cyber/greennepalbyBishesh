async function loadParks() {

    try {

        const response = await fetch("http://localhost:3000/parks");

        const parks = await response.json();

        const container = document.getElementById("parksContainer");

        container.innerHTML = "";

        parks.forEach(park => {

            container.innerHTML += `
                <div class="park-card">

                    <img src="images/${park.image}" alt="${park.name}">

                    <div class="park-content">

                        <h3>${park.name}</h3>

                        <p>${park.location}</p>

                        <p>${park.description}</p>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadParks();

async function loadWildlife() {

    try {

        const response = await fetch("http://localhost:3000/wildlife");

        const animals = await response.json();

        const container = document.getElementById("wildlifeContainer");

        container.innerHTML = "";

        animals.forEach(animal => {

            container.innerHTML += `

                <div class="wild-card">

                    <img src="images/${animal.image}" alt="${animal.name}">

                    <div class="wild-content">

                        <h3>${animal.name}</h3>

                        <h4>${animal.habitat}</h4>

                        <p>${animal.description}</p>

                    </div>

                </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

loadWildlife();

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;

        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter,20);

        }else{

            counter.innerText = target;

        }

    };

    updateCounter();

});
// ============================
// LOAD NATIONAL PARKS
// ============================

async function loadParks(){

    try{

        const response = await fetch("http://localhost:3000/parks");

        const parks = await response.json();

        const container = document.getElementById("parksContainer");

        if(!container) return;

        container.innerHTML = "";

        parks.forEach(park=>{

            container.innerHTML += `

            <div class="card">

                <img src="images/${park.image}" alt="${park.name}">

                <div class="card-content">

                    <h3>${park.name}</h3>

                    <p>
                    ${park.location}
                    </p>

                    <p>
                    ${park.description}
                    </p>

                </div>

            </div>

            `;

        });


    }
    catch(error){

        console.log("Park Error:",error);

    }

}



// ============================
// LOAD WILDLIFE
// ============================


async function loadWildlife(){

    try{


        const response = await fetch("http://localhost:3000/wildlife");


        const animals = await response.json();


        const container =
        document.getElementById("wildlifeContainer");


        if(!container) return;


        container.innerHTML="";


        animals.forEach(animal=>{


            container.innerHTML += `


            <div class="card">


                <img src="images/${animal.image}" 
                alt="${animal.name}">


                <div class="card-content">


                    <h3>
                    ${animal.name}
                    </h3>


                    <p>
                    Habitat:
                    ${animal.habitat}
                    </p>


                    <p>
                    ${animal.description}
                    </p>


                </div>


            </div>


            `;


        });



    }
    catch(error){

        console.log("Wildlife Error:",error);

    }

}



// ============================
// NAVBAR SCROLL EFFECT
// ============================


window.addEventListener("scroll",()=>{


    const nav =
    document.querySelector(".navbar");


    if(window.scrollY > 50){

        nav.classList.add("sticky");

    }

    else{

        nav.classList.remove("sticky");

    }


});




// ============================
// LOAD EVERYTHING
// ============================


document.addEventListener("DOMContentLoaded",()=>{


    loadParks();

    loadWildlife();


});

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const res = await fetch("http://localhost:3000/contact", {
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

    const data = await res.json();

    alert(data.message);

    form.reset();
});