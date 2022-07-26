const alert = document.getElementById("alert-msg");
const email= document.getElementById("inputEmail");
const pass= document.getElementById("inputPassword");
const sesion=localStorage.getItem("sesion")
let pAlert= document.getElementById("text-alert");
var usuarios =[
    {
        username:'mario@gmail.com',
        pass:'parra123',
        name:' Mario Flores',
        saldo: '300'
    },
    {
        username:'eve123@yahoo.com',
        pass:'eve12345',
        name:'eve Rochin',
        saldo: '100'
    },
    {
        username:'pinedo32@hotmail.com',
        pass:'coppel123',
        name:'Ernesto Pinedo',
        saldo: '180'
    }
]
if(sesion=="activa"){
    window.location.assign("sesion.html")
}else{
    function activarAlert(message){
        alert.style.display= "block";
        pAlert.innerHTML= message;
    }
    function validarCampos(){
        if(email.value == ''){
        activarAlert("Por favor ingrese un correo electrónico")
        }else if(!/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(email.value)){
            activarAlert("Por favor ingrese un correo electrónico valido")
        }else if(pass.value == ''){
            activarAlert("Por favor ingrese una contraseña")
        }else if(pass.value.length < 8){
            activarAlert("La contraseña debe ser mayor a 8 digitos")
        }else{
            alert.style.display= "none"; 
            inicioSesion();
        }
    }
    function inicioSesion(){
        console.log("validando informacion");
        for(var i="0"; i < usuarios.length; i++){
            if (usuarios[i].username == email.value){
                if(usuarios[i].pass == pass.value){
                    console.log("datos correctos")
                    localStorage.setItem("sesion","activa" )
                    localStorage.setItem("name",usuarios[i].name)
                    localStorage.setItem("monto",usuarios[i].saldo)
                    window.location.assign("sesion.html") 
                }else{
                    console.log("datos incorrectos2")
                    activarAlert("La contraseña o el correo son incorrectos")
                }
            }else{
                console.log("datos incorrectos1")
                activarAlert("La contraseña o el correo son incorrectos")
            } 
        }
    }
}