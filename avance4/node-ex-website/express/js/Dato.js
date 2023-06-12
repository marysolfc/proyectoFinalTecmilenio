const _privado = new WeakMap();
class Dato{
    constructor(descripcion,valor){
        const propiedades ={
        _descripcion : descripcion,
        _valor : valor
        }
        _privado.set(this,{propiedades});
    }
    // Obtiene la descripcion:
    get descripcion() {
        return _privado.get(this).propiedades['_descripcion'];
    }
    // Establece/modifica la descripcion
    set descripcion(nuevaDescripcion) {
        return _privado.get(this).propiedades['_descripcion'] = nuevaDescripcion;
    }
    // Obtiene el valor:
    get valor() {
        return _privado.get(this).propiedades['_valor'];
    }
    // Establece/modifica el valor
    set valor(nuevoValor) {
        return _privado.get(this).propiedades['_valor'] = nuevoValor;
    }
}