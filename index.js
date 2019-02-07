const request = require('request');
const crypto = require('crypto');
const endpoint = 'https://backend-evaluation.lfshopify.com';
const access_token = 'Q5Cm2xxYgCjnMpS8NYbqqPHf2zJ3ukmc';


const buildHeader = function (body = {}) {
    return {
                url: endpoint + "/?name=" + "Michael Burnley",
                headers: {
                    "Authorization": "Bearer " + access_token
                },
                ...body
      }
}

// const options = {
//     url: endpoint + "/?name=" + "Michael Burnley",
//     headers: {
//       "Authorization": "Bearer " + access_token
//     }
//   };

const getRequest = function() {
    let header = buildHeader();
    return new Promise((resolve, reject) => {
        request(header, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body.explanation);
            return resolve(body);
          });
    });
};

const postRequest = async function () {
    let req = await getRequest();
    let new_number = (req[0] * req[1]) + req[2];
    const hash = crypto.createHmac('sha256', req['secret'])
                   .update(new_number)
                   .digest('hex');
    let params = buildHeader({
        body: {
                name: "Michael Burnley",
                answer: hash
        }
    });
    request.post(params, (error, response, body) => {
        console.log(body)
    });
}

module.exports.get = postRequest();