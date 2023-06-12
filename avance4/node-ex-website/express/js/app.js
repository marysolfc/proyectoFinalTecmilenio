const ingresos = [
    new Ingreso('Salario',2100),
    new Ingreso('Venta coche',1500),
];
const egresos = [
    new Egreso('Renta departamento',900),
    new Egreso('Ropa',400),

];

// let egresos = [900, 400];
// let ingresos = [9000,400];

const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    const d = document;
    d.querySelector("#presupuesto").innerHTML = formatoMoneda(presupuesto) + " MXN";    
    d.querySelector("#ingresos").innerHTML = formatoMoneda(totalIngresos()) + " MXN";
    d.querySelector("#egresos").innerHTML = formatoMoneda(totalEgresos()) + " MXN";
    d.querySelector("#porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
}

const totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

const totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso +=  egreso.valor;
    }
    return totalEgreso;
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX',{style:"currency", currency:"MXN"});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX',{style:"percent",maximumFractionDigits:"2"});
}

const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

const cargarIngresos = () => {
    var ingresosHTML="";
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.querySelector("#lista-ingresos").innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    var ingresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">
        ${ingreso.descripcion}
    </div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatoMoneda(ingreso.valor)} MXN</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarIngreso('${ingreso.descripcion}')"></ion-icon>
            </button>
        </div>
    </div>
</div>
`;
return ingresoHTML;
}

const cargarEgresos = () => {
    let egresosHTML="";
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.querySelector("#lista-egresos").innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let egresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">-${formatoMoneda(egreso.valor)} MXN</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarEgreso('${egreso.descripcion}')"></ion-icon>
            </button>
        </div>
    </div>
</div>
`;

return egresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex((elemento) => elemento.descripcion === id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex((elemento) => elemento.descripcion === id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato = () => {
    let forma = document.querySelector('#forma');
    let tipo = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = parseInt(document.getElementById("valor").value);
    if(descripcion && valor){        
        if(tipo === 'ingreso'){
            ingresos.push(new Ingreso(descripcion,valor));
            cargarIngresos();
        }
        else{
            egresos.push(new Egreso(descripcion,valor));
            cargarEgresos();
        }
    }
    cargarCabecero();    
    limpiarInput();
}
const limpiarInput = () => {
    document.getElementById("descripcion").value = "";
    document.getElementById("valor").value = "";
}