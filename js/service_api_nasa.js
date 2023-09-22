const apiKey = 'gEDeWAK4aqBfdsi3N9uXGFINbe2lz1ulkOGJIpDP';
const sol = 1000; // El número de sol que deseas consultar

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
        const valor = document.querySelector(".rover-photo");

        let imgHTML = "";

        for (let index = 0; index < 50; index++) {
            // Crear un elemento <img> por cada imagen en data.photos
            imgHTML+= `<h1>${data.photos[index].camera.full_name}</h1>`
            imgHTML += `<img id="imagenes" src="${data.photos[index].img_src}">`;
            
        }

        // Agregar los elementos <img> al div con la clase "rover-photo"
        valor.innerHTML = imgHTML;
    })
    .catch((error) => {
        console.error('Ocurrió un error:', error);
    });
