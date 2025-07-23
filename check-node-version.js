const {engines} = require ('./package.json');
const result = process.versions;

if (result && result.node ) {
    if(parseInt(result.node) === parseInt(engines.node)){
        console.log("\x1b[47m\x1b[32m%s\x1b[0m", "-------******* OK para continuar con la versión de node: " + result.node + " *******-------");
    } else {
        console.log("\x1b[47m\x1b[31m%s\x1b[0m", "-------******* Instalacion de paquetes (npm install) o levantamiento de proyecto (npm start) falla debido a la versión de Node, Por favor utilizar la versión de Node >= "+ engines.node +" *******-------");
		console.log("\x1b[47m\x1b[33m%s\x1b[0m", "-------******* Tu version actual de Node es: " + result.node + " *******-------");
		console.log("\x1b[47m\x1b[33m%s\x1b[0m", "-------******* Utiliza nvm install 18 && nvm use 18  " + " *******-------");
        process.exit(1);
    }
} else {
    console.log("\x1b[47m\x1b[31m%s\x1b[0m", "-------******* Ocurrio un error al intentar revisar la versión de Node *******-------");
	process.exit(1);
}