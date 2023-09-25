(function () {
    //let , var, const
    //alert(0)
    let name = {};
    let username = {};
    let email = {};
    let btnAceptar = {};
    let btnCancelar = {};
    let usuarios = []
    let idNuevo=0;

    let usuario = {
        id: 0,
        name: '',
        username: '',
        email: ''
    }
    const ini = () => {
        cargarDatos();
        name = document.querySelector('#name');
        username = document.querySelector('#username');
        email = document.querySelector('#email');
        btnAceptar = document.querySelector('#btnAceptar');
        btnCancelar = document.querySelector('#btnCancelar');
        bind()

    }

    const cargarDatos = async () => {
        usuarios = await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
        //loop JS: foreach, map, filter, search and reducer    
        usuarios = usuarios.map(u => {
            if(idNuevo<=u.id) idNuevo = u.id;
            return {
                id: u.id,
                name: u.name,
                username: u.username,
                email: u.email
            }
        })
        
        //console.log('Usuarios:', usuarios)
        cargarTabla()
    }

    const cargarTabla = async () => {
        const tabla = document.querySelector('#tblDatos');
        tabla.innerHTML = '';
        await usuarios.forEach(u => {
            tabla.innerHTML += `
            <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.username}</td>
            <td>${u.email}</td>
            <td>
            <button class="btn btn-success" data-id=${u.id}>Editar</button>
            <button class="btn btn-danger" data-id=${u.id}>Eliminar</button>
            </td>
            </tr>
            `
        })
        asignarfuncion('btn-success',editarUsuario);
        asignarfuncion('btn-danger', eliminarUsuario);
    }


    const asignarfuncion=(clase,funcion)=>{
       document.querySelectorAll('.'+clase).forEach(boton=>boton.onclick=funcion);
    }

    const editarUsuario=(e)=>{
        const id = e.target.dataset.id;
        usuarios.forEach(u=>{
            if(u.id == id){
            usuario.id= u.id;
            usuario.name= u.name;
            usuario.username= u.name;
            usuario.email = u.email;
            name.value= u.name;
            username.value= u.username;
            email.value= u.email;

            }
        })
    }

    const eliminarUsuario = (e) => {
        const id = e.target.dataset.id;
    
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            // Aqui se encuentra y elimina al usuario segun su ID. 
            usuarios = usuarios.filter(u => u.id !== parseInt(id));
    
            // Se actualiza la tabla.
            cargarTabla();
            alert('Usuario eliminado');
        } else {
            //Si el usuario decide cancelar la operacion de eliminar le sale otro pop up confirmando que se cancelo.
            alert('Cancelado');
        }
    }


    const bind = () => {
        btnAceptar.onclick = salvarUsuario
        name.onchange= cambiarValor
        username.onchange= cambiarValor
        email.onchange= cambiarValor

    }

    const cambiarValor=(e)=>{
        const {name, value}= e.target        
        usuario[name]=value;
    }


    const salvarUsuario = (e) => {
        e.preventDefault()        
        if(usuario.id == 0){
        usuario.id= idNuevo+1;
        usuarios.push(Object.assign({}, usuario))
        idNuevo++;
    }else{
        usuarios.forEach(u=>{
            if(u.id==usuario.id){
                u.name = name.value;
                u.username = username.value;
                u.emai=email.value;
            }
        })
    }
        cargarTabla();
        usuario.id=0;
        limpiar();
        alert('Se ejecuto la accion correspondiente al usuario')
    }
    const limpiar=()=>{
        name.value="";
        username.value="";
        emai.value="";
    }

    ini();

})()