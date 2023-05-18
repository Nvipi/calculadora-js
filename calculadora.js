// Opciones validas de la calculadora
const opciones = ["(",")","C","9","8","7","6","5","4","3","2","1","0","/","*","+","-",".","b","="];

// Obtenemos el elemento que mostrara el calculo/resultado
const pantalla = document.getElementById("resultado");

// Obtener los botones
const botones = document.querySelectorAll(".btn");

// Creamos la funcion que operara lo ingresado por el usuario
function realizarOperacion(fn) {
    // Retornamos una funcion basada en un string, donde fn pasara a ser la operacion ej: '1+2' esto en la nueva funcion pasara directamente a realizar la accion en base al string
    return new Function('return ' + fn)();
}

// Funsion a realizar cuando se clickea un boton
const click = function (e) {
	if(opciones.includes(this.value)){
        // Si lo ultimo ocurrido es un error
        if(pantalla.innerText == "Error") pantalla.innerText = "";

        // Obtenemos el valor actual en pantalla
        const resultado = pantalla.innerText;

        // Realizamos las acciones

        // Limpiar la pantalla
        if(this.value == "C") return pantalla.innerText = "";

        // Borrar un digito/valor/etc
        if(this.value == "b" && resultado.length > 0) return pantalla.innerText = resultado.slice(0,(resultado.length-1));

        // Agregar un digito/valor/etc con limitacion de 16 caracteres
        if(this.value != "b" && this.value != "=" && resultado.length < 16) return pantalla.innerText = resultado + this.value;

        // Obtener el resultado y actuar en caso de la operacion no este estructurada correctamente
        try{
            if(this.value == "=") return pantalla.innerText = realizarOperacion(resultado);

        }catch{
            pantalla.innerText = "Error";
            
        }

    }
}

// Recorremos los botones
botones.forEach(boton => {
	// Ejecutar la funcion al dar click en el boton
	boton.addEventListener("click", click);
});