console.log(" hola mundo de personas creativas que ven portafolios :) ");
console.log(" ancho: " + window.innerWidth);
// el js ocurre en Contacto.html
function registrarme(event) {
    event.preventDefault();
    console.log("te has registrado");
    document.getElementById("bienvenide").innerHTML =
      "hola " + nombre.value;
}
 // aca intento mandar una aleta de que se envio el mensaje
function submitted() {

    alert("submitted");

  }
// the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


