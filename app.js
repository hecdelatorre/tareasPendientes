require('colors');
const { 
  inquirerMenu, 
  pausa,
  leerInput
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')

const Tareas = require('./models/tareas')

const main = async() => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if(tareasDB) { // Cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch(opt) {
      case '1':
        // Crear opción
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
      break;
      case '2':
        console.log(tareas.listadoArr);
      break;
    }
    
    guardarDB(tareas.listadoArr);
    
    await pausa();
  } while(opt !== '0');
}

main();
