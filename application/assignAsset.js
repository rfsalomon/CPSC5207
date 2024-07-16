const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

// Route to display the assets
router.get('/', async (req, res) => {
    const url = 'http://localhost:3030/query?channelid=cpsc5207&chaincodeid=asset_contract&function=GetAllAssets';

    try {
        const response = await fetch(url);
        const assets = await response.json();

        // Render the page using the 'assignAsset.ejs' template, passing the assets
        res.render('assignAsset', { assets });
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).send('Error fetching assets');
    }
});

// Route to handle the asset assignment
router.put('/assign', async (req, res) => {
    const { id, assignee } = req.body;
    const url = `http://localhost:3030/invoke?channelid=cpsc5207&chaincodeid=asset_contract&function=TransferAsset&args=${id}&args=${assignee}`;

    try {
        const response = await fetch(url, { method: 'PUT' });

        if (response.ok) {
            res.send({ message: 'Asset assigned successfully' });
        } else {
            res.status(response.status).send('Failed to assign asset');
        }
    } catch (error) {
        console.error('Error assigning asset:', error);
        res.status(500).send('Error assigning asset');
    }
});

module.exports = router;