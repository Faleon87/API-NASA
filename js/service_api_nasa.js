// En service_api_nasa.js

const apiKey = 'gEDeWAK4aqBfdsi3N9uXGFINbe2lz1ulkOGJIpDP';
const sol = 1000; // El número de sol que deseas consultar
const numImagesToShow = 50; // Cambia este número para controlar la cantidad de imágenes a mostrar

// URL del API de la NASA
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;

// Realizar una solicitud GET utilizando Fetch API
fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud al API');
        }
        return response.json();
    })
    .then((data) => {
        // Los datos de las fotos se encuentran en el objeto 'data'
        console.log(data);

        // Seleccionar el elemento con la clase "rover-photo"
        const roverPhotoContainer = document.querySelector(".rover-photo");

        // Crear un fragmento de documento para mejorar el rendimiento de la manipulación del DOM
        const fragment = document.createDocumentFragment();

        // Utilizar un bucle for para limitar la cantidad de imágenes a mostrar
        for (let index = 0; index < numImagesToShow && index < data.photos.length; index++) {
            const photo = data.photos[index];

            // Crear un elemento div para cada imagen y detalles
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image");

            // Crear la etiqueta de imagen <img>
            const imgElement = document.createElement("img");
            imgElement.src = photo.img_src;

            // Crear elementos para el nombre completo de la cámara y la fecha en la Tierra
            const cameraNameElement = document.createElement("p");
            cameraNameElement.classList.add("full-name");
            cameraNameElement.textContent = ` Name: ${photo.camera.full_name}`;

            const earthDateElement = document.createElement("p");
            earthDateElement.classList.add("earth-date");
            earthDateElement.textContent = `Earth Date: ${photo.earth_date}`;

            // Agregar elementos al contenedor
            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(cameraNameElement);
            imageContainer.appendChild(earthDateElement);

            // Agregar el contenedor de imagen al fragmento de documento
            fragment.appendChild(imageContainer);
        }

        // Agregar el fragmento de documento al contenedor principal
        roverPhotoContainer.appendChild(fragment);
    })
    .catch((error) => {
        console.error('Ocurrió un error:', error);
    });
