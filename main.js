
//boton guardar
let btnGuardar = document.getElementById("guardar");

//input
let curp = document.getElementById("curp");



//Referencia a la base de datos,rama principal que es la rama "usuarios"
const ref = firebase.database().ref("users");


btnGuardar.addEventListener("click", ()=>{
  //.value para obtener el valor del input
  let objeto = {
    curp: curp.value,
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

  console.log("probando datas: ",data.val())  

  let dat = data.val()
  let name = ""
  //agarra el id como i
  for(let i in dat){
   console.log(dat[i].nombre);
   name += dat[i].nombre + " ";
  }

})
