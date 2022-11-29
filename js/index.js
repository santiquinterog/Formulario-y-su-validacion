/* Expresiones Regulares */
const expresionesRegulares = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{4,17}$/, // Letras y espacios, pueden llevar acentos
  password: /^.{6,12}$/, // 4 a 12 digitos
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // evalúa un correo
	telefono: /^\d{10,10}$/ // 10 números
}

/* Obtener formulario */
const formulario = document.getElementById("formulario");

/* Obtener los inputs */
const inputs = document.querySelectorAll("#formulario input");

/* Campos */
const campos = {
  usuario: false,
  nombre: false,
  password: false,
  correo: false,
  telefono: false,
}

/* Función para validar los diferentes campos */
function validarFormulario(event) {
 
  switch (event.target.name) {
    case "usuario":
      validarCampo(expresionesRegulares.usuario, event.target, "usuario")
    break;
  
    case "nombre":
      validarCampo(expresionesRegulares.nombre, event.target, "nombre")
    break;
  
    case "correo":
      validarCampo(expresionesRegulares.correo, event.target, "correo")
    break;
  
    case "password":
      validarCampo(expresionesRegulares.password, event.target, "password")
    break;
  
    case "telefono":
      validarCampo(expresionesRegulares.telefono, event.target, "telefono")
    break;
  }

}

function validarCampo(expresionRegular, eventTarget, campo){
  if(expresionRegular.test(eventTarget.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
    /* console.log(eventTarget.name + " correcto"); */
    campos[campo] = true;
  }
  else {
    document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
    /* console.log(eventTarget.name + " incorrecto"); */
    campos[campo] = false;
  }
}

/* Eventos */
inputs.forEach((input) => {
  /* Evento cuando se presiona una tecla y se deja de presionar */
  input.addEventListener("keyup", validarFormulario)
  /* Evento cuando se le quita el focus a elemento */
  input.addEventListener("blur", validarFormulario)
})

/* Evento tipo submit */
formulario.addEventListener("submit", () =>{
  event.preventDefault()
  
  if (campos.usuario && campos.nombre && campos.correo && campos.password && campos.telefono) {
    
    /* LocalStorage */
    const inputs = document.querySelectorAll("#formulario input");

    const objetoInputs = {
      usuario: inputs[0].value,
      nombre: inputs[1].value,
      email: inputs[2].value,
      password: inputs[3].value,
      numero: inputs[4].value
    }
    localStorage.clear();
    localStorage.setItem("formulario", JSON.stringify(objetoInputs))

    const objetoInputsLocalStorage = JSON.parse(localStorage.getItem("formulario"))
    console.log("La clave del primer dato del localStorage es", localStorage.key(0));
    console.log(`El valor del dato del localStorage con clave ${localStorage.key(0)} es`, objetoInputsLocalStorage);
    const key = localStorage.key(0)
    setTimeout(() => {
      localStorage.removeItem("formulario")
      console.log("Se eliminó el dato del localStorage con clase formulario");
    }, 5000);
  }
  else {
    alert("Formulario inválido")
  }
})
