const request = require("request");
const {url, key, sender} = params.sms;

module.exports = {
    send: (message, receptor) => {
        const options = {
            method: 'POST',
            url,
            headers: {
                apikey: key
            },
            form: {
                message,
                receptor,
                sender,
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }
};