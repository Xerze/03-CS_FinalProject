// Creamos la clase de los personajes
class Personaje {
    //El constructor nos permite hacer la instancia y asignar los valores.
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    // Los métodos que devuelven los valores fuera de la clase base.
    obtenerNombre() {
        return this.name;
    }

    obtenerImg() {
        return this.image;
    }
}

// Función que nos permite obtener los personajes dela API.
async function obtenerPersonajes() {
    let personajes = [];
    let url = "https://akabab.github.io/starwars-api/api/all.json";
    let elemento = document.getElementById("div-pjs");

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    console.log(personajes);

    for (let personaje of data) {
        console.log(personaje);
    }

    data.forEach(datum => {
        let nuevoPersonaje = new Personaje(datum.name, datum.image)
        personajes.push(nuevoPersonaje);
    });

    personajes.map((personaje) => {
        // Con esto inyectamos al HTML el código para que muestre el resultado.
        elemento.innerHTML += `
        <div class="card-pj">
            <h1 class="tpj"> ${personaje.obtenerNombre()}</h1>
            <p>
                <img src=${personaje.obtenerImg()} height=500px>
            </p>
        </div>
        
    `
    })
}


obtenerPersonajes();