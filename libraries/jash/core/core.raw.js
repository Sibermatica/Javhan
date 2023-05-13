if (window.initializers == undefined) {
    window.initializers = new Array();
}

window.addEventListener('load', function () {
    if (this.window.initializers.length > 0) {
        for (let i = 0; i < this.window.initializers.length; i++) {
            this.window.initializers[i]();
        }
    }
}, false);

class Jash {
    static core = { version: 'core-v9.8.0' };
    static version = this.core.version;
    static servicepack = 0;
    static foundedComponents = 0;
    static updateRegistry = "./update-info.json";
    static beta = 0;
}