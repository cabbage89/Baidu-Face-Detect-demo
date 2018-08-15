var https = require('https');
var qs = require('querystring');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/face_detect', function (req, res) {
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'xxxxxxx',
        'client_secret': 'xxxxxxxxx'
    });

    // https.get(
    //     {
    //         hostname: 'aip.baidubce.com',
    //         path: '/oauth/2.0/token?' + param,
    //         agent: false
    //     },
    //     function (res) {
    //         res.pipe(process.stdout);
    //     }
    // );
    var access_token = "24.9091302327de8e717995677726cc5407.2592000.1536933442.282335-11682570";
    var post_data = req.body;
    var content = JSON.stringify(post_data);
    var req_api = https.request({
        hostname: 'aip.baidubce.com',
        path: `/rest/2.0/face/v3/detect?access_token=${access_token}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': content.length
        }
    }, function (res2) {
        var datas = [];
        var size = 0;
        res2.on('data', function (data) {
            datas.push(data);
            size += data.length;
        });
        res2.on("end", function () {
            var buff = Buffer.concat(datas, size);
            var result = JSON.parse(buff.toString('utf8'));
            res.json(result);
        });

    });
    req_api.write(content);
});
app.listen(53001);
