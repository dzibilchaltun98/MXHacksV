
let loader = document.getElementById("loader");
let btnGuardar = document.getElementById("guardar");

let nombre = document.getElementById("nombre");
let edad = document.getElementById("edad");
let domicilio = document.getElementById("domicilio");
let sangre = document.getElementById("sangre");
let genero = document.getElementById("genero");


const reg = ()=>{
  window.location = "http://127.0.0.1:8080/index.html";
}

//Referencia a la base de datos,rama principal que es la rama "usuarios"
const ref = firebase.database().ref("users");

btnGuardar.addEventListener("click", ()=>{
  GenLoader();
  setTimeout(reg, 4000);
})



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
    alert("Sus datos han cargado correctamente");
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
   name = dat[i].nombre + " ";
  }
})



const GenLoader = () =>{
  loader.style.visibility = "visible";
}

