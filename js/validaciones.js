document.getElementById("votingForm").addEventListener("submit", function(event){
    event.preventDefault(); // detiene la acción de envío por defecto
  
    const nombre = document.getElementById("nombre").value;
    const alias = document.getElementById("alias").value;
    const rut = document.getElementById('rut').value;
    const email = document.getElementById("email").value;
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;
    //const candidato = document.getElementById("candidato").value;
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
  
    // Si todas las validaciones pasan, procede con la acción de envío
    this.submit();
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

//Falta
//Pasar votacion a base de datos
//Revisar duplicacion de rut
//Mejorar ingreso de rut al dejar de tener seleccionado el input