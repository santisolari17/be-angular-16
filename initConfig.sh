#! /bin/bash
echo "Ingrese el nombre del proyecto(ejemplo: cct-saldos-consolidados-pj-web-app):"
read nombreProyecto
sed -i "s/ejemplo-angular-web-app/$nombreProyecto/g" angular.json
sed -i "s/ejemplo-angular-web-app/$nombreProyecto/g" package.json
sed -i "s/ejemplo-angular-web-app/$nombreProyecto/g" server.js
sed -i "s/ejemplo-angular-web-app/$nombreProyecto/g" src/app/app.component.ts
sed -i "s/ejemplo-angular-web-app/$nombreProyecto/g" src/index.html

echo "Se ha establecido el nombre del proyecto."
