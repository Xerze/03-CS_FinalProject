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
    let url = "https://akabab.github.io/starwars-api/api/all.json";
    let elemento = document.getElementById("app");

    // Esta invocación devuelve una promesa.
    // Una función asíncrona donde hasta que esto no se cumpla, no se meten datos.
    const data = await fetch(url);
    // Cuando eso pasa, mete los personajes.
    let personajes = await data.json();

    // Creamos un nuevo objeto llamado personaje que copia los elementos de la clase Personaje.
    let personaje = new Personaje(personajes[0].name, personajes[0].image);

    console.log(data);
    console.log(personajes);

    // Con esto inyectamos al HTML el código para que muestre el resultado.
    elemento.innerHTML = `
    <p> ${personaje.obtenerNombre()}</p>
    <img src=${personaje.obtenerImg()} height=700px>
    `
}


obtenerPersonajes();