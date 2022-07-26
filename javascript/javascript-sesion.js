const descripcion = document.getElementById("descripcion");
const operaciones = document.getElementById("operaciones");
const monto =document.getElementById("monto");
let input = document.getElementById("operaciones-cliente")
let aceptar = document.getElementById("operacion-a-realizar");
let alertError = document.getElementById("alert-msg");
let alertSuccess = document.getElementById("alert-sucess");
function valideKey(evt){		
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      if((input.value.length==0) && code == 48){
        input.value="";
        return false
      }else{
        return true;
      }
    } else{ // other keys.
      return false;
    }
}
function bienvenida(){
    document.getElementById("bienvenido").innerHTML=localStorage.getItem("name")
}
function consultarSaldo(){
    if(aceptar.style.display =="block"){
        aceptar.style.display ="none";
        input.style.display="none";
        monto.style.display="block";
    }
    message("su saldo es:");
    monto.style.display="block"
    monto.innerHTML= `${"$"}`+localStorage.getItem('monto');
    operaciones.style.border ="3px dashed #fff";
}
function ingresarMonto(){
    activarOperaciones();
    message("digite el monto a <strong>ingresar</strong> a su cuenta")
    localStorage.setItem('operacion','I')
}
function retirarMonto(){
    activarOperaciones();
    message("digite el monto a <strong>retirar</strong> de su cuenta")
    localStorage.setItem('operacion','R')
}
function message(detalle){
    descripcion.innerHTML = detalle;
}
function activarOperaciones(){
    monto.style.display ="none";
    descripcion.innerHTML = ""
    input.style.display ="block";
    aceptar.style.display="block";
    operaciones.style.border ="3px dashed #fff";
}
function realizarOperacion(){
    if((input.value.length) >= 1){
      let operacion = localStorage.getItem('operacion');
      let nuevoMonto;
      let montoStorage = Number(localStorage.getItem('monto'));
      let valor = Number(input.value);
      switch(operacion){
        case "I":
          if((montoStorage+valor) > 990){
            alertError.style.display="flex";
            mostrarAlertError("Recuerda que el monto maximo en tu cuenta debe ser $990");
          }else{
            nuevoMonto=montoStorage+valor;
            localStorage.setItem('monto',nuevoMonto);
            alertSuccess.style.display="flex";
            document.getElementById("text-alert-sucees").innerHTML="Operacion exitosa";
            aceptar.style.display="none";       
          }
        break;
        case "R":
          if(montoStorage < valor){
            mostrarAlertError("Lo sentimos, no cuentas con los fondos suficientes");
          }else if((montoStorage-valor) < 10 ){
            mostrarAlertError("Recuerda, el monto minimo para tu cuenta es de $10");
          }else{
            nuevoMonto=montoStorage-valor;
            localStorage.setItem('monto',nuevoMonto);
            alertSuccess.style.display="flex";
            document.getElementById("text-alert-sucees").innerHTML="Operacion exitosa"; 
            aceptar.style.display="none";
          }
        break;
      }
    }else{
      mostrarAlertError("EL campo no puede estar vacio")  
    }
    timeout = setTimeout(alertMensaje, 2000);
  }
  function mostrarAlertError(text){
      alertError.style.display="flex";
      document.getElementById("text-alert").innerHTML= text;
  }
  function alertMensaje() {
    if(alertSuccess.style.display=="flex"){
      alertSuccess.style.display="none";
      input.style.display="none";
      input.value="";
      consultarSaldo()
    }else if(alertError.style.display=="flex"){
      alertError.style.display="none";
    }
    input.value="";
}
function cerrarSesion(){
    document.getElementById("row-operaciones").style.display="none";
    document.getElementById("bienvenido").style.display="none";
    document.getElementById("text-landing").innerText=localStorage.getItem("name")+" recuerda! El mejor momento del día es el ahora ";
    setTimeout(function(){
      localStorage.clear();
      window.location.assign("home.html")
    }, 4000); 
}