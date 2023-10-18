const nombre = document.getElementById('nombre') 
const alias = document.getElementById('alias')
const votingForm = document.getElementById('votingForm')
const aliasRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const region = document.getElementById('region').value;
const comuna = document.getElementById('comuna').value;
const candidato = document.getElementById('candidato').value;
const errorElement = document.getElementById('error')
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


votingForm.addEventListener('submit', (e) => {
    let messages = []
    if (nombre.value === '' || nombre.value == null){
        messages.push('El campo Nombre no debe quedar en blanco.')
    }
    if (alias.value.length<= 5 || !aliasRegex.test(alias)){
        messages.push('El campo Alias debe tener más de 5 caracteres y contener letras y números.')
    }
    
    // Validación de RUT
    if (!Fn.validaRut(rut.value)) {
        messages.push('El RUT ingresado no es válido.')
    }

    if (!emailRegex.test(email)) {
        messages.push('El correo electrónico ingresado no es válido.')
    }

    // Validar region comunaquie
    
    if (region.value === '' || region.value == null || comuna.value === '' || comuna.value == null) {
        messages.push('Los campos Region y Comuna no deben quedar en blanco.')
    }

    // Validar candidato
    if (candidato.value === '' || candidato.value == null) {
        messages.push('El campo Candidato no debe quedar en blanco.')
    }

    // Validar checkbox
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.values.length < 2) {
        messages.push('Debe seleccionar al menos dos opciones en "Como se enteró de Nosotros".')
    }
    
    if (messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})


//Falta
//Pasar votacion a base de datos
// Revisar duplicacion de rut
//Mejorar Mensaje de cada error 
//Mejorar ingreso de rut al dejar de tener seleccionado el input