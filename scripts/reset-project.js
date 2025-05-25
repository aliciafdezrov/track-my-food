const fs = require('fs');
const path = require('path');

// Obtener la ruta del directorio de datos de la aplicación
const getDataDir = () => {
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  return path.join(homeDir, '.expo', 'sqlite');
};

// Eliminar la base de datos
const resetDatabase = () => {
  const dataDir = getDataDir();
  const dbPath = path.join(dataDir, 'diary.db');

  try {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('✅ Base de datos eliminada correctamente');
    } else {
      console.log('ℹ️ No se encontró la base de datos');
    }
  } catch (error) {
    console.error('❌ Error al eliminar la base de datos:', error);
  }
};

resetDatabase();
