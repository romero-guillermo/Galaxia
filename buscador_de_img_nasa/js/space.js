document.addEventListener("DOMContentLoaded", function () {
    const btnBuscar = document.getElementById("btnBuscar");
    const inputBuscar = document.getElementById("inputBuscar");
    const contenedor = document.getElementById("contenedor");

    btnBuscar.addEventListener("click", function () {
      const searchTerm = inputBuscar.value.trim();

      if (searchTerm) {
        const apiUrl = `https://images-api.nasa.gov/search?q=${(searchTerm)}`;

        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la solicitud");
            }
            return response.json();
          })
          .then((data) => {
            // Limpiar el contenedor anterior
            contenedor.innerHTML = "";

            data.collection.items.forEach((item) => {
              if (item.links && item.links.length > 0) {
                const imageUrl = item.links[0].href;
                const title = item.data[0].title;
                const description = item.data[0].description;
                const dateCreated = item.data[0].date_created;

                // Crear un elemento div para mostrar la información de la imagen
                const imageInfoElement = document.createElement("div");
                imageInfoElement.classList.add("image-info");

                // Crear una imagen
                const imageElement = document.createElement("img");
                imageElement.src = imageUrl;

                // Crear elementos para título, descripción y fecha
                const titleElement = document.createElement("h2");
                titleElement.textContent = title;

                const descriptionElement = document.createElement("p");
                descriptionElement.textContent = description;

                const dateElement = document.createElement("p");
                dateElement.textContent = `Fecha de creación: ${dateCreated}`;

                // Agregar elementos al contenedor
                imageInfoElement.appendChild(imageElement);
                imageInfoElement.appendChild(titleElement);
                imageInfoElement.appendChild(descriptionElement);
                imageInfoElement.appendChild(dateElement);

                contenedor.appendChild(imageInfoElement);
              }
            });
          })
          .catch((error) => {
            console.error("Error en la solicitud:", error);
          });
      }
    });
  });
