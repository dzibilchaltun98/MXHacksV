
//boton guardar
let btnGuardar = document.getElementById("guardar");
let btnSesion = document.getElementById("sesion");
let btnCerrar = document.getElementById("cerrss");

//input
let nombre = document.getElementById("nombre");
let edad = document.getElementById("edad");
let domicilio = document.getElementById("domicilio");
let sangre = document.getElementById("sangre");
let genero = document.getElementById("genero");

//Referencia a la base de datos,rama principal que es la rama "usuarios"
const ref = firebase.database().ref("users");


btnSesion.addEventListener("click",function(){
  console.log('click event')
  
  let provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');  console.log("login");
  
  firebase.auth().signInWithPopup(provider).then((result)=>{
    console.log(result.user);
    
  }).catch((error)=>{
    console.log(error);
  })
  
  alert("Se ha iniciado sesión")  
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
  alert("se ha cerrado la sesion");
})

//ocultar logout
const showLogout = () =>{
  btnSesion.style.display = "none";
  btnCerrar.style.display = "block";
}
//ocultar login
const showLogin = () =>{
  btnSesion.style.display = "block";
  btnCerrar.style.display = "none"
}



btnGuardar.addEventListener("click", ()=>{
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
