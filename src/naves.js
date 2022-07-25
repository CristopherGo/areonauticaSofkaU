

module.exports = class Naves {

    //recibe los datos por un objeto que posee las caracteristicas de las naves
    constructor(datos) {
        this.nombre = datos.nombre;
        this.tipo = datos.tipo;
        this.origen = datos.origen;
        this.potencia = datos.potencia;
        this.velocidad = datos.velocidad;
        this.peso = datos.peso;
    }
    //metodos get
    getNombre() {
        return this.nombre;
    }
    getTipo() {
        return this.tipo;
    }
    getOrigen() {
        return this.origen;
    }
    getPotencia() {
        return this.potencia;
    }
    getVelocidad() {
        return this.velocidad;
    }
    getPeso() {
        return this.peso;
    }
    //acciones o comportamientos de la nave
    despegar() {
        console.log('Nave despegando!!' + '\nPotencia del motor: ' + this.getPotencia());
        alert('prrms');
    }
    aterrizar() {
        console.log('nave Aterrizando!! ' + '\nPotencia del motor: Disminuyendo');
    }
}

