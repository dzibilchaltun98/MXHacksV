
//boton guardar
let btnGuardar = document.getElementById("guardar");
let btnSesion = document.getElementById("sesion");
let btnCerrar = document.getElementById("cerrss");


//Formulario para el dispositivo
//let ////registro = document.getElementById("register")
//Loader
let loader = document.getElementById("loader")

//input
/* let nombre = document.getElementById("nombre");
let edad = document.getElementById("edad");
let domicilio = document.getElementById("domicilio");
let sangre = document.getElementById("sangre");
let genero = document.getElementById("genero");
 */

/* //Referencia a la base de datos,rama principal que es la rama "usuarios"
const ref = firebase.database().ref("users"); */


btnSesion.addEventListener("click",function(){
  console.log('click event')
  
  GenLoader();

  let provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then((result)=>{
    console.log(result.user);
    
  }).catch((error)=>{
    console.log(error);
  })
  alert("Se ha iniciado sesion");
  setTimeout(reg, 1500);
  
});

//Prueba de que el boton funciona
firebase.auth().onAuthStateChanged(function(user){
  console.log(user);
  if(user){
    console.log("hay usuario");
    showLogout();
  }else{
    console.log("no hay usuario");
    showLogin();
  }
});

btnCerrar.addEventListener("click", ()=>{
  
  firebase.auth().signOut().then(()=>{
    showLogin();
    console.log("ya salí");
  }).catch(()=>{    
    showLogout();
  })
  gnlo();
  alert("Se ha cerrado la sesion");
})

//ocultar logout
const showLogout = () =>{
  btnSesion.style.display = "none";
  btnCerrar.style.display = "block";
  ////registro.style.display = "block";
}
//ocultar login
const showLogin = () =>{
  btnSesion.style.display = "block";
  btnCerrar.style.display = "none"
  //registro.style.display = "none";
}
//Poner pantalla gris y simular una carga
const GenLoader = () =>{
  loader.style.visibility = "visible";
}

const gnlo = ()=>{
  loader.style.visibility = "hidden";
}
//cambiar a una ventana nueva
const reg = ()=>{
  window.location = "http://127.0.0.1:8080/registro.html";
}

/* btnGuardar.addEventListener("click", ()=>{
  //.value para obtener el valor del input
  let objeto = {
    nombre: nombre.value,
    edad: edad.value,
    domicilio: domicilio.value,
    sangre: sangre.value,
    genero: genero.value

  }
  console.log(objeto);

  ref.push(objeto).then(()=>{
    alert("se subió");
  }).catch((error)=>{
    console.log(error);
  })
})


//se jala el valor que hay en la base de datos..
ref.on('value', (data)=>{

  //console.log("probando datas: ",data.val())  

  let dat = data.val()
  let name = ""
  //agarra el id como i
  for(let i in dat){
   //console.log(dat[i].algo)   se va a imprimir el algo
    //console.log(i);
   //
   name = dat[i].nombre + " ";
  }

})
 */