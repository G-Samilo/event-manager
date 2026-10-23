// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { validateEvent, validateRegistration } = require('../middlewares/validation');

// Criar novo evento
router.post('/', validateEvent, async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar evento' });
    }
});

// Listar eventos (com desafio da contagem)
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [{ model: Registration }]
        });
        
        // Formatar resposta para incluir a contagem de inscrições
        const response = events.map(event => {
            const eventData = event.toJSON();
            eventData.registrationCount = eventData.Registrations.length;
            delete eventData.Registrations; // Limpa o array completo para focar apenas na contagem
            return eventData;
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar eventos' });
    }
});

// Registrar participante
router.post('/:id/register', validateRegistration, async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: 'Evento não encontrado' });

        const inscricoesAtuais = await Registration.count({ where: { eventId: event.id } });
        
        if (inscricoesAtuais >= event.capacity) {
            return res.status(403).json({ error: 'O evento está lotado' });
        }

        const registration = await Registration.create({
            ...req.body,
            eventId: event.id
        });
        
        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar participante' });
    }
});

module.exports = router;