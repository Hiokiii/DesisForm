document.getElementById("votingForm").addEventListener("submit", function(event){
  event.preventDefault(); // detiene la acción de envío por defecto

  const nombre = document.getElementById("nombre").value;
  const alias = document.getElementById("alias").value;
  const rut = document.getElementById('rut').value;
  const email = document.getElementById("email").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkedCount = Array.from(checkboxes).filter(input => input.checked).length;

  if (!nombre) {
    alert("El campo Nombre y Apellido no debe quedar en blanco");
    return;
  }

  if (alias.length <= 5 || !/\d/.test(alias) || !/[a-zA-Z]/.test(alias)) {
    alert("El campo Alias debe contener más de 5 caracteres y debe incluir letras y números");
    return;
  }

  if (!Fn.validaRut(rut)) {
      alert("El RUT ingresado no es válido.");
      return;
  }

  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert("Por favor, introduce una dirección de correo electrónico válida");
    return;
  }

  if (region === "Seleccionar") {
    alert("Por favor, selecciona una región");
    return;
  }

  if (comuna === "Seleccionar" || !comuna) {
    alert("Por favor, selecciona una comuna");
    return;
  }

  if (checkedCount < 2) {
    alert("Por favor, selecciona al menos dos opciones en 'Cómo se enteró de nosotros'");
    return;
  }

  // Si todas las validaciones pasan, procede con el envío de los datos
  fetch("votacion.php", {
      method: "POST",
      body: new URLSearchParams(new FormData(this))
  })
  .then(response => response.text())
  .then(data => {
      alert(data); // Muestra el mensaje de éxito o error de la base de datos
      // Limpiar los campos del formulario
      if (data.includes("correctamente")) {
        document.getElementById("nombre").value = "";
        document.getElementById("alias").value = "";
        document.getElementById("rut").value = "";
        document.getElementById("email").value = "";
        document.getElementById("region").value = "Seleccionar";
        document.getElementById('comuna').innerHTML = '';
        document.getElementById('candidato').innerHTML = '';
        checkboxes.forEach(input => input.checked = false);
      }
  })
  .catch(error => {
      console.error(error);
  });
});

  const Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut : function (rutCompleto) {
        rutCompleto = rutCompleto.replace("‐","-");
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
            return false;
        var tmp     = rutCompleto.split('-');
        var digv    = tmp[1]; 
        var rut     = tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        
        return (Fn.dv(rut) == digv );
    },
    dv : function(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
    }
  }

  //Cambiar rut en vivo
  const rutInput = document.getElementById("rut");
  rutInput.addEventListener("input", function(event) {
    let rut = event.target.value.replace(/[^\dkK]/g, ""); // Eliminar caracteres no válidos

    if (rut.length > 1) {
      rut = rut.slice(0, -1) + "-" + rut.slice(-1); // Agregar guión
    }

    event.target.value = rut;
  });

  rutInput.addEventListener("keydown", function(event) {
    const maxLength = 10; // Longitud máxima del RUT (incluyendo guión y dígito verificador)
    if (event.target.value.length >= maxLength && event.key !== "Backspace") {
      event.preventDefault();
    }
  });