const fetch = require('node-fetch');

const createAsset = async (req, res) => {
    const { id, dataHash, description, assignor, assignee } = req.body;

    const url = `http://host.docker.internal:3030/invoke?channelid=cpsc5207&chaincodeid=asset_contract&function=CreateAsset&args=${id}&args=${dataHash}&args=${description}&args=${assignor}&args=${assignee}`;

    try {
        const response = await fetch(url, { method: 'POST' });

        if (response.ok) { 
            res.send(`
                <p>Asset created successfully!</p>
                <button onclick="location.href='/'">Go Back</button>
            `);
        } else {
            res.status(response.status).send('Failed to create asset');
        }
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).send('Error creating asset');
    }
};

module.exports = createAsset;