window.onload = () => {
    const form = document.getElementById("creditCardForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const cardNumber = document.getElementById("cardNumber");
        const expiryDate = document.getElementById("expiryDate");
        const cvv = document.getElementById("cvv");

        // Datos a enviar a la API
        const data = {
            cardNumber: cardNumber.value,
            expiryDate: expiryDate.value,
            cvv: cvv.value
        };

        try {
            // Realizar la solicitud POST a la API
            const response = await fetch("http://localhost:3030/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: JSON.stringify(data) // Convertimos los datos a JSON
            });

            const responseData = await response.json();

            // Eliminar los mensajes de error anteriores
            removeErrorMessages();

            // Procesar los errores y mostrar los mensajes de error
            if (responseData.cardNumber.msg) {
                showError(cardNumber, responseData.cardNumber.msg);
            }

            if (responseData.expiryDate.msg) {
                showError(expiryDate, responseData.expiryDate.msg);
            }

            if (responseData.cvv.msg) {
                showError(cvv, responseData.cvv.msg);
            }
        } catch (error) {
            console.error("Error al enviar la solicitud a la API:", error);
        }
    });

    // Función para mostrar mensajes de error
    function showError(inputElement, errorMsg) {
        const errorElement = document.createElement("div");
        errorElement.className = "text-danger";
        errorElement.textContent = errorMsg;
        inputElement.parentNode.appendChild(errorElement);
        inputElement.classList.add("form-input-is-invalid");
    }

    // Función para eliminar los mensajes de error anteriores
    function removeErrorMessages() {
        const errorElements = document.querySelectorAll(".text-danger");
        errorElements.forEach((element) => element.remove());

        const inputElements = document.querySelectorAll(".form-input-is-invalid");
        inputElements.forEach((element) => element.classList.remove("form-input-is-invalid"));
    }
};
