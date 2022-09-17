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

let elemento = document.getElementById("div-pjs");
let personajes = [];

function buildCard(nombre, img) {
    return `
        <div class="card-pj">
            <h2 class="tpj"> ${nombre} </h1>
            <div class="each-card">
                <img src="${img}" class="img-card">
            </div>
        </div>
    `
};

// Función que nos permite obtener los personajes dela API.
async function obtenerPersonajes() {
    let url = "https://akabab.github.io/starwars-api/api/all.json";

    // --------- SE RECIBEN LOS VALORES DE LA API ---------
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Esta parte ejecuta un bloque de código por cada elemento de un obj iterable.
    // En este caso, como "data" contiene un arreglo, va haciendo un for por cada posición del arreglo.
    // En este for solamente se muestran en consola todos los personajes del arreglo.
    /*
    for (let personaje of data) {
        console.log(personaje);
    }
    */

    // --------- SE CREAN LOS OBJETOS ---------
    // .forEach ejecuta una función dada una vez por cada elemento del array.
    // Es como hacer un for del tamaño del array menos uno.
    data.forEach(datum => {
        // Aquí se está creando un nuevo personaje al que se instancian los datos.
        let nuevoPersonaje = new Personaje(datum.name, datum.image)
        // Aquí se está agregando al arreglo de personajes, cada nuevo personaje recibido
        personajes.push(nuevoPersonaje);
    });

    // --------- SE IMPRIMEN LOS RESULTADOS EN PANTALLA ---------
    // .mpa crea un nuevo arreglo con los resultados de la llamada a la función indicada,
        // aplicados a cada uno de sus elementos.
    personajes.forEach((personaje) => {
        // Con esto inyectamos al HTML el código para que muestre el resultado.
        elemento.innerHTML += buildCard(
            personaje.obtenerNombre(),
            personaje.obtenerImg()
            )
    })

    /*
    let busquedaBtn = document.getElementById("busqueda-btn");
    let reiniciarBtn = document.getElementById("reinicio-btn");
    busquedaBtn.onclick = llamarBusqueda(onclick);
    reiniciarBtn.onclick = reiniciarBusqueda(onclick);
    */

    let busquedaBtn = document.querySelector('#busqueda-btn');
    let reiniciarBtn = document.querySelector("#reiniciar-btn");
    let tecleoBuscar = document.querySelector("#buscador");

    busquedaBtn.addEventListener('click', llamarBusqueda, false);
    reiniciarBtn.addEventListener('click', reiniciarBusqueda, false);
    tecleoBuscar.addEventListener('keyup', llamarBusqueda, false);

    function reiniciarBusqueda() {
        personajes.length = 0;
        elemento.innerHTML = null;
        obtenerPersonajes();
    }
    
    function llamarBusqueda() {
        // El set time out es para que ejecute la función un momento después de que se presione la tecla.
        // En buscadores, se procura usar un setTimeout de medio segundo.
        setTimeout(() => {
            const consulta = document.getElementById("buscador").value;
            const busqueda = personajes.filter(
                personaje => personaje.name.toLowerCase().includes(consulta.toLowerCase())
                );
    
            if (busqueda.length > 0) {
                // Se borran todas las tarjetas.
                elemento.innerHTML = null;

                busqueda.forEach((busquedaPj) => {
                    elemento.innerHTML += buildCard(
                        busquedaPj.obtenerNombre(),
                        busquedaPj.obtenerImg())
                })
            }
        }, 500)
        
    }

}

obtenerPersonajes();