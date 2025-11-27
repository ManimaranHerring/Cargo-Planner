// backend/src/routes/cargoRoutes.js
const express = require('express');
const prisma = require('../config/db');

const router = express.Router();

// GET /api/cargoes - list all cargoes
router.get('/', async (req, res) => {
  try {
    const cargoes = await prisma.cargo.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(cargoes);
  } catch (err) {
    console.error('Error fetching cargoes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/cargoes - create new cargo
router.post('/', async (req, res) => {
  try {
    const {
      name,
      length,
      width,
      height,
      weight,
      quantityDefault,
      allowStacking,
      fragile,
      isRefrigerated,
      isHazardous,
      handlingInstructions
    } = req.body;

    const cargo = await prisma.cargo.create({
      data: {
        name,
        length: Number(length),
        width: Number(width),
        height: Number(height),
        weight: Number(weight),
        quantityDefault: quantityDefault ? Number(quantityDefault) : 1,
        allowStacking: allowStacking ?? true,
        fragile: fragile ?? false,
        isRefrigerated: isRefrigerated ?? false,
        isHazardous: isHazardous ?? false,
        handlingInstructions
      }
    });

    res.status(201).json(cargo);
  } catch (err) {
    console.error('Error creating cargo:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/cargoes/:id - update cargo (basic)
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = {};
    const allowedFields = [
      'name',
      'length',
      'width',
      'height',
      'weight',
      'quantityDefault',
      'allowStacking',
      'fragile',
      'isRefrigerated',
      'isHazardous',
      'handlingInstructions'
    ];

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        data[key] = req.body[key];
      }
    }

    if (data.length !== undefined) data.length = Number(data.length);
    if (data.width !== undefined) data.width = Number(data.width);
    if (data.height !== undefined) data.height = Number(data.height);
    if (data.weight !== undefined) data.weight = Number(data.weight);
    if (data.quantityDefault !== undefined) data.quantityDefault = Number(data.quantityDefault);

    const cargo = await prisma.cargo.update({
      where: { id },
      data
    });

    res.json(cargo);
  } catch (err) {
    console.error('Error updating cargo:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/cargoes/:id - delete cargo
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.cargo.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting cargo:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
