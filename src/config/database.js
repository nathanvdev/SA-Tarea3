const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sa-tarea3', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres', // o 'mysql', 'sqlite', etc. según tu base de datos
    logging: false, // Cambia a console.log si deseas ver las consultas SQL
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

testConnection();

module.exports = sequelize;