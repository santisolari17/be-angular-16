# Instrucciones para el uso de la plantilla Angular

1. Clonar Repositorio ejemplo-app-angular:
    ```bash
    git clone https://gitlab.banco.bestado.cl/Framework/ejemplo-app-angular.git
    ```

3. Copiar contenido del template de ejemplo-app-angular, a tu nuevo repositorio utilizando el comando en la terminal wsl: 
    ```bash
    rsync -avr --progress ejemplo-app-angular/. CarpetaDestino/ --exclude README.md --exclude .gitlab-ci.yml --exclude .git
    ```
4. Desde la carpeta del nuevo proyecto, ejecutar el shell initConfig.sh para establecer el nombre del projecto en la plantilla (Debe ser el mismo nombre que el del repositorio git), utilizar el comando en la terminal wsl:
    ```bash
    ./initConfig.sh
    ```
5. Instalar las dependencias utilizando node 18 y el comando en la terminal wsl:
    ```bash
    npm install
    ```


# Instrucciones para trabajar local (primer método)

1. En el explorador que se va a usar, presionar inspeccionar codigo.

2. Ir a la opcion almacenamiento en Firefox o aplicacion en Chrome.

3. En esta opcion, buscar e ingresar a sesesion storage.

4. Crear nueva propiedad llamada token.

5. Para el valor del token, necesitamos ingresar el token que vayamos a utilizar pero codificado en BASE64.

# Instrucciones para trabajar local (segundo método)

1. En el app.component, en el ngOninit, colocar el codigo 
```js
        this._parentInteractorService.setEnvironment(environment);
		if (environment.production) this._parentInteractorService.startRefreshing();
        /* Agregar este fragmento */
		else sessionStorage.setItem('token', 'tu token').
```

# Scripts en el archivo package.json

El archivo `package.json` es utilizado en proyectos Node.js para definir información sobre el proyecto y sus dependencias, incluyendo scripts personalizados que pueden ser ejecutados desde la línea de comandos. Aquí se describen algunos de los scripts comunes en el archivo `package.json`.

## Ejecutar un script

Para ejecutar un script definido en el archivo `package.json`, utiliza el comando `npm run` seguido del nombre del script. Por ejemplo:

```bash
npm run mi-script
```
## pre-install

el script `pre-install` se ejecutará antes de que las dependencias se instalen y verificara la version de node utilizada , para ejecutarlo, utiliza el comando:

```bash
npm run pre-install
```

## ng

el script `ng` se utiliza para ejecutar comandos relacionados con Angular CLI, para ejecutarlo, utiliza el comando:

```bash
npm run ng
```
## analyze

el script `analyze` utiliza la herramienta "webpack-bundle-analyzer" para analizar el paquete de distribución de la aplicación Angular, para ejecutarlo, utiliza el comando:

```bash
npm run analyze
```

## build

el script `build` se utiliza para compilar la aplicación Angular y agregar una ruta base al proyecto, para ejecutarlo, utiliza el comando:

```bash
npm run build
```

## buid:stats

el script `build:stats` es similar a build, pero también genera un archivo de estadísticas JSON, para ejecutarlo, utiliza el comando:

```bash
npm run build:stats
```

## coverage

el script `coverage` se utiliza para ejecutar pruebas con Jest y generar un informe de cobertura, para ejecutarlo, utiliza el comando:

```bash
npm run coverage
```

## compodoc

el script `compodoc` se utiliza para generar documentación de código utilizando Compodoc, para ejecutarlo, utiliza el comando:

```bash
npm run compodoc
```

## lint

el script `lint` se utiliza para ejecutar un análisis de estilo y calidad de código utilizando Angular CLI, para ejecutarlo, utiliza el comando:

```bash
npm run lint
```

## dev

el script `dev` se utiliza para iniciar un servidor de desarrollo de Angular con soporte para proxy, para ejecutarlo, utiliza el comando:

```bash
npm run dev
```

## format

el script `format` se utiliza para formatear archivos de código fuente con Prettier, para ejecutarlo, utiliza el comando:

```bash
npm run format
```

## lint-staged

el script `lint-staged` se utiliza para ejecutar análisis de estilo y calidad de código en archivos modificados en el entorno de preparación del Git, para ejecutarlo, utiliza el comando:

```bash
npm run lint-staged
```

## lint-format

el script `lint-format` combina la ejecución de los scripts `format` y `lint` en un solo comando. Primero, formatea los archivos de código fuente con Prettier y luego ejecuta un análisis de estilo y calidad de código con Angular CLI, para ejecutarlo, utiliza el comando:

```bash
npm run lint-format
```

## local:stubby

el script `local:stubby` se utiliza para iniciar un servidor de desarrollo de Angular con soporte para un archivo de configuración de proxy, para ejecutarlo, utiliza el comando:

```bash
npm run local:stubby
```

## start

el script `start`  se utiliza para iniciar un servidor Node.js, para ejecutarlo, utiliza el comando:

```bash
npm run start
```

## stats

el script `stats` se utiliza para generar estadísticas de los archivos generados por Webpack, para ejecutarlo, utiliza el comando:

```bash
npm run stats
```

## stubs

el script `stubs` se utiliza para iniciar un servidor Stubby con configuración específica, para ejecutarlo, utiliza el comando:

```bash
npm run stubs
```

## stubby

el script `stubby` combina la ejecución de los scripts `local:stubby` y `stubs` en un solo comando utilizando la herramienta "concurrently", para ejecutarlo, utiliza el comando:

```bash
npm run stubby
```

## test

el script `test` se utiliza para ejecutar pruebas con Jest y generar un informe de cobertura, para ejecutarlo, utiliza el comando:

```bash
npm run test
```

## version

el script `version` se utiliza para actualizar el archivo de registro de cambios (CHANGELOG.md) , para ejecutarlo, utiliza el comando:

```bash
npm run version
```

## prepare

el script `prepare` se utiliza para configurar husky en el proyecto, para ejecutarlo, utiliza el comando:

```bash
npm run prepare
```