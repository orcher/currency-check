const http = require('http')
const fs = require('fs')
const fetch = require('node-fetch')
const url = require('url')

//http://data.fixer.io/api/latest

//    ? access_key = YOUR_ACCESS_KEY
//    & base = GBP
//    & symbols = USD, AUD, CAD, PLN, MXN

//http://data.fixer.io/api/latest?access_key=3978bfe9820d0735b3ef72a64505de38

function fetchData(resp, primary, secondary) {
    fetch('http://data.fixer.io/api/latest?base=' + primary + '&access_key=3978bfe9820d0735b3ef72a64505de38')
        .then(res => res.json())
        .then(res => {
            fs.writeFile('./data', JSON.stringify(res), function () {
                console.log('Data written to file.')
                writeResponse(resp, primary, secondary)
            })
        })
        .catch(err => console.log('Error: ' + err))
}

function readDataFromFile() {
    const json = JSON.parse(fs.readFileSync('data', 'utf8'))
    return JSON.stringify(json.rates)
}

function writeResponse(resp) {
    const rates = readDataFromFile()
    resp.writeHeader(200, { 'content-type': 'text/plain' })
    resp.write(rates)
    resp.end()
}

function needUpdate() {
    //TODO: Add checking for date and if file exists
    const json = JSON.parse(fs.readFileSync('data', 'utf8'))
    return !json.success
}

function onRequest(req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    console.log('Request received: ' + req.method + ' ' + req.url, query)
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.startsWith('/api/currency')) {
        if (needUpdate()) {
            fetchData(res)
        } else {
            writeResponse(res)
        }
    } else {
        res.writeHeader(401, { 'content-type': 'text/plain' })
        res.end()
    }
}

http.createServer(onRequest).listen(5000)
console.log('Server listening on port 5000...')
