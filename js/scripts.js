const nombre = document.getElementById('nombre') 
const alias = document.getElementById('alias')
const votingForm = document.getElementById('votingForm')
const aliasRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const region = document.getElementById('region').value;
const comuna = document.getElementById('comuna').value;
const candidato = document.getElementById('candidato').value;
const errorElement = document.getElementById('error')


votingForm.addEventListener('submit', (e) => {
    let messages = []
    if (nombre.value === '' || nombre.value == null){
        messages.push('El campo Nombre no debe quedar en blanco.')
    }
    if (alias.value.length<= 5 || !aliasRegex.test(alias)){
        messages.push('El campo Alias debe tener más de 5 caracteres y contener letras y números.')
    }
    //falta rut

    if (!emailRegex.test(email)) {
        messages.push('El correo electrónico ingresado no es válido.')
    }

    // Validar region comuna
    
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
