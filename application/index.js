const express = require('express');
const app = express();
const port = 3033;
const listAssets = require('./listAPI');
const createAsset = require('./createAsset'); 
const assignAsset = require('./assignAsset');
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/favicon.ico'));

app.use('/images', express.static(__dirname + '/views/images'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const options = [
        { name: 'List all Assets', url: 'listAssets' },
        { name: 'Create Asset', url: 'createAssetForm' },
        { name: 'Assign Asset', url: 'assignAssetForm' },
        { name: 'View Asset', url: 'viewAsset' }
    ];
    res.render('index', { options });
});

app.get('/listAssets', async (req, res) => {
    try {
        const assets = await listAssets();
        if (!Array.isArray(assets)) {
            throw new Error('Assets is not an array');
        }
        res.render('assets', { assets });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/createAssetForm', (req, res) => {
    res.render('createAssetForm');
});

app.get('/viewAsset', async (req, res) => {
    try {
        const assets = await listAssets();
        if (!Array.isArray(assets)) {
            throw new Error('Assets is not an array');
        }
        res.render('viewAsset', { assets });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.post('/create', createAsset);

app.use('/assignAssetForm', assignAsset);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});