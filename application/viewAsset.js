const { channel } = require('diagnostics_channel');
const http = require('http');
const fetch = require('node-fetch');

async function viewAssets() {
    try {
        queryURL = 'http://localhost:3030/query?channelid=cpsc5207&chaincodeid=asset_contract&function=GetAllAssets';
        const response = await fetch(queryURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching assets data:", error);
    }
}

module.exports = viewAssets;
