const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create delivery.
router.post('/', async (req, res) => {
  const { trackingNumber, status } = req.body;
  try {
    const delivery = await prisma.delivery.create({
      data: {
        trackingNumber,
        status,
      },
    });
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create delivery' });
  }
});


// Get delivery by tracking number.
router.get('/:trackingNumber', async (req, res) => {
    const { trackingNumber } = req.params;
    try {
      const delivery = await prisma.delivery.findUnique({
        where: {
          trackingNumber,
        },
      });
      if (delivery) {
        res.json(delivery);
      } else {
        res.status(404).json({ error: 'Delivery not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch delivery' });
    }
});

// Update delivery status by tracking number.
router.put('/:trackingNumber', async (req, res) => {
    const { trackingNumber } = req.params;
    const { status } = req.body;
    try {
      const delivery = await prisma.delivery.findUnique({
        where: {
          trackingNumber,
        },
      });
      if (delivery) {
        const updatedDelivery = await prisma.delivery.update({
          where: {
            id: delivery.id,
          },
          data: {
            status,
          },
        });
        res.json(updatedDelivery);
      } else {
        res.status(404).json({ error: 'Delivery not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update delivery status' });
    }
});

router.delete('/:trackingNumber', async (req, res) => {
    const {trackingNumber} = req.params;

  try {
    await prisma.delivery.delete({
      where: {
        trackingNumber: trackingNumber
      }
    });
    res.json({msg: "delivery excluído"});
  }
  catch (error) {
    res.status(400).json({error: "delivery não excluído"});
  }

});

module.exports = router;