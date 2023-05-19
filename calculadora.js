// Opciones validas de la calculadora
const opciones = ["(",")","C","9","8","7","6","5","4","3","2","1","0","/","*","+","-",".","b","=","Backspace","Enter","Delete"];

// Obtenemos el elemento que mostrara el calculo/resultado
const pantalla = document.getElementById("resultado");

// Obtener los botones
const botones = document.querySelectorAll(".btn");

// Creamos la funcion que operara lo ingresado por el usuario
function realizarOperacion(fn) {
    // Retornamos una funcion basada en un string, donde fn pasara a ser la operacion ej: '1+2' esto en la nueva funcion pasara directamente a realizar la accion en base al string
    return new Function('return ' + fn)();
}

// Creamos un campo "invisible" con el resultado, debido a que la pantalla no logra mostrar correctamente el valor tan largo
function copiarAlPortapapeles(valor) {

    // Comprobar si el navegar implementa la nueva forma de copiar
    if (!navigator.clipboard){
        // creamos campo
        const aux = document.createElement("input");
        // le asignamos el valor
        aux.setAttribute("value", valor);
        // Agregamos el campo al body
        document.body.appendChild(aux);
        // Seleccionamos el campo y su valor
        aux.select();
        // Copiamos el valor
        document.execCommand("copy");
        // Eliminamos el campo
        document.body.removeChild(aux);

    } else{
        // Copiamos el contenido
        navigator.clipboard.writeText(valor).then( () => {
            /* console.log("Copiado"); */
        })
        .catch((error) => {
            console.error('Error al copiar: ', error);
        });
    }

}

// Funcion a realizar cuando se clickea un boton
const digitar = function (e) {
    // Comprobar que lo digitado (click/teclado) esta dentro de los valores permitidos
	if(opciones.includes(this.value) || opciones.includes(e.key)){
        // Valor ingresado
        const valor = (this.value) ? this.value : e.key;

        // Si lo ultimo ocurrido es un error o se copio
        if(pantalla.innerText == "Error" || pantalla.innerText == "Resultado en portapapeles") pantalla.innerText = "";

        // Obtenemos el valor actual en pantalla
        const resultado = pantalla.innerText;

        // Realizamos las acciones

        // Limpiar la pantalla
        if(valor == "C" || valor == "Delete") return pantalla.innerText = "";

        // Borrar un digito/valor/etc
        if(valor == "b" || valor == "Backspace") return pantalla.innerText = resultado.slice(0,(resultado.length-1));

        // Agregar un digito/valor/etc con limitacion de 16 caracteres
        if(valor != "=" && valor != "Enter" && resultado.length < 12) return pantalla.innerText = resultado + valor;

        // Obtener el resultado y actuar en caso de que la operacion no este estructurada correctamente
        try{
            if(valor == "=" || valor == "Enter"){
                // Guardamos el resultado de la operacion luego de llamar a la funcion
                const resul = realizarOperacion(resultado);

                // Si el resultado supera el tamaño permitido por la pantalla, agregamos el valor a el portapapeles
                if(resul.toString().length > 11){
                    // Copiar el resultado
                    copiarAlPortapapeles(resul);
                    // Imprimir la accion de copiar el resultado en su portapapeles
                    return pantalla.innerText = "Resultado en portapapeles";
                }else{
                    // Retornar el valor en pantalla
                    return pantalla.innerText = (resul)?resul:"Error";
                };
            }

        }catch{
            // Mostrar error en pantalla en caso que la operacion no se pueda efectuar
            pantalla.innerText = "Error";
            
        }

    }
}

// Recorremos los botones
botones.forEach(boton => {
	// Ejecutar la funcion al dar click en el boton
	boton.addEventListener("click", digitar);
});

// Detectamos el teclado del usuario
document.addEventListener('keydown', digitar);