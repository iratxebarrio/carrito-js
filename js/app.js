//-----  Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); //Accedemos al tbody descendiente de #lista-carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListener();
function cargarEventListener() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos array
        limpiarHTML(); // Limpiamos el HTML
    })
}


//-----  Funciones
function agregarCurso(e) {
    e.preventDefault(); 
    //Creamos el if para que solo se agregue el elemento haciendo click en el button, no es la card como tal.
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
    
        leerDatosCurso(cursoSeleccionado)
    }
   
}

//* Elimina un curso del carrito 
function eliminarCurso(e) {
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')
        //Elimina del array de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
        
    }
}

//* Leer el contenido del HTML al que hacemos click y extrae la información del curso
function leerDatosCurso(curso) {
    // Objetivo con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent, //extrae el texto
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso; //devuelve el objeto actualizado
            } else {
                return curso; // devuelve el resto de los objetos
            }
        })
        articulosCarrito = [...cursos]
    }else {
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

   // Agrega elementos al array del carrito.
   
   console.log(articulosCarrito)
   carritoHTML()
}

//* Mostrar el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML()

    // Recorre el carrito y general el HTML
    articulosCarrito.forEach((curso) => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

//* Elimina los cursos del tbody
function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        // Mientras haya un elemento en contenedorCarrito se repite el bucle while y en cada vuelta elimina un elemento hasta dejarlo vacío
    }
    //Lo limpiamos para que al hacer appendChild no tener elementos duplicados.

}