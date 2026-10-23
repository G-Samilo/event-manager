// server.js
const express = require('express');
const sequelize = require('./database');
const eventRoutes = require('./routes/eventRoutes');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

const app = express();
app.use(express.json());

// Estabelecendo Relacionamento 1:N
Event.hasMany(Registration, { foreignKey: 'eventId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

// Registrando rotas
app.use('/events', eventRoutes);

const PORT = 3000;

// Sincroniza o banco e inicia o servidor
sequelize.sync().then(() => {
    console.log('Banco de dados conectado e sincronizado com sucesso.');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});