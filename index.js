const request = require('request');
const crypto = require('crypto');
const url = require('url');
const endpoint = 'https://backend-evaluation.lfshopify.com';
const access_token = 'Q5Cm2xxYgCjnMpS8NYbqqPHf2zJ3ukmc';

const buildHeader = (body = {}, name) => {
    let uri;
    if(name) {
        uri = endpoint + "/?name=" + name;
    } else {
        uri = endpoint;
    }
    return {
                uri: url.parse(uri).href,
                headers: {
                    "Authorization": "Bearer " + access_token
                },
                ...body
      }
}

const getRequest = () => {
    let params = buildHeader({}, "Michael Burnley");
    return new Promise((resolve, reject) => {
        request(params, (err, res, body) => {
            if (err) { 
                return reject(err); 
            }
            return resolve(JSON.parse(body));
          });
    });
};

const answer = async () => {
    let { numbers, secret } = await getRequest();
    let new_number = ((numbers[0] * numbers[1]) + numbers[2]).toString();
    const hash = crypto.createHmac('sha256', secret).update(new_number).digest('hex');
    let params = buildHeader({
        body: {
                name: "Michael Burnley",
                answer: hash
        },
        method: 'POST',
        json: true
    });
    request(params, (err, res, body) => {
        if (err) { return console.error(err); }
        console.log(body);
    });
}

module.exports = answer();