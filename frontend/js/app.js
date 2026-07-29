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