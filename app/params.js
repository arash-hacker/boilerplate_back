module.exports = {
    sms : {
        url: 'http://api.smsapp.ir/v2/sms/send/bulk',
        key: 'Sy6Hnj3oQZ40wewjiW9+Wzt0WStpJW1YlqbVN2fN/Go',
        sender: '20008580',
    },
    verification: {
        range: [10000, 99999],
        expires: 1800, // In Seconds
    }
}