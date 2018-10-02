const http = require('http')

function onRequest(req, res) {
    console.log('Request received: ' + req.method + ' ' + req.url)
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.startsWith('/api/currency')) {
        res.writeHeader(200, { 'content-type': 'text/plain' })
        res.write('Hello World!')
        res.end()
    } else {
        res.writeHeader(401, { 'content-type': 'text/plain' })
        res.end()
    }
}

http.createServer(onRequest).listen(5000)
console.log('Server listening on port 5000...')
