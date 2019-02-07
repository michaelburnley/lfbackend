const https = require('https');
const endpoint = 'https://backend-evaluation.lfshopify.com';
const access_token = 'Q5Cm2xxYgCjnMpS8NYbqqPHf2zJ3ukmc';

const buildHeader = function (name) {
    return {
        'Authorization': 'Bearer ' + access_token,
        'name': name
    }
}

const getRequest = function() {
    let header = buildHeader('Michael Burnley');
    let url = endpoint + '?name=' + header.name;
    console.log(url);
    https.get(endpoint, header, (res) => {
        // console.log(res);
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end', () => {
            console.log(JSON.parse(data));
        });
    })
};

module.exports.get = getRequest;