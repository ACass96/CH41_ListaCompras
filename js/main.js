// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar"); //Se definen los botones del index
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById ("Name"); //se definen los campos
let txtNumber = document.getElementById ("Number");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");


let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let isValid = true;
let precio;
let contador = 0;
let costo = 0;
let totalEnProductos =0;
let costoTotal = 0;

//Se almacena la informacion de la tabla
let datos = new Array();

function validarCantidad(){ //Se valida que la cantidad sea mayor a cero y que sea positivo
    if (txtNumber.value.length ==0){
        return false;
    }//is length
    if (isNaN(txtNumber.value)){
        return false;
    }//is Nan
    if (Number(txtNumber.value) <= 0){
        return false;
    }// 
    return true;
}
function getPrecio(){
    return Math.floor((Math.random()*100) * 100)/100
}

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid = true;
    //validar datos
    if(txtNombre.value.length < 3){
        alertValidacionesTexto.innerHTML ="El <strong>artículo</strong> no es correcto <br/>";
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red medium";
        isValid = false;
    }//length<3

    if (! validarCantidad()){
        alertValidacionesTexto.innerHTML += "La <strong>cantidad</strong> no es correcta";
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red medium";
        isValid = false;
    }//!ValidarCantidad¡

    if(isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
        <td>${contador}</td>
        <td>${txtNombre.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
        </tr>`;

        let elemento = `{ "id":${contador}, 
                        "nombre": "${txtNombre.value}", 
                        "cantidad":"${txtNumber.value}", 
                        "precio": ${precio}

        }`;
        datos.push(JSON.parse(elemento)); //se crea un arreglo en la consola
        localStorage.setItem("datos",JSON.stringify(datos)); //se convierte a cada

        cuerpoTabla.insertAdjacentHTML("beforeend", row)
        contadorProductos.innerText = contador;
        totalEnProductos += parseFloat(txtNumber.value);
        costoTotal += precio * parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        localStorage.setItem("contador",contador);
        localStorage.setItem("totalEnProductos",totalEnProductos);
        localStorage.setItem("costoTotal",costoTotal);
        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }//isValid
});

//Boton de limpiar todo
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    //Limpiar campos
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidaciones.style.display="none";
    alertValidacionesTexto.innerHTML="";
    txtNombre.style.border="";
    txtNumber.style.border="";
    cuerpoTabla.innerHTML="";
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    localStorage.setItem("contador",contador);
    localStorage.setItem("totalEnProductos",totalEnProductos);
    localStorage.setItem("costoTotal",costoTotal);
    datos = new Array();
    localStorage.removeItem("datos");
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
});
 
window.addEventListener("load", function(event){
    event.preventDefault();
    if (this.localStorage.getItem("contador")!=null){
        contador =Number(this.localStorage.getItem("contador"));
    }
    if (this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos =Number( this.localStorage.getItem("totalEnProductos"));
    }
    if (this.localStorage.getItem("costoTotal")!=null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }
    if (this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => { 
        let row =`<tr>
        <td>${r.id}</td>
        <td>${r.nombre}</td>
        <td>${r.cantidad}</td>
        <td>${r.precio}</td>
        </tr>`;

        cuerpoTabla.insertAdjacentHTML("beforeend", row)
        });
    }
    contadorProductos.innerText = contador;
    productosTotal.innerHTML = totalEnProductos;
    precioTotal.innerHTML= `$ ${costoTotal.toFixed(2)}`;

});