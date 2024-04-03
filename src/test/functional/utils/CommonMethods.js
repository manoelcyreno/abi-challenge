class CommonMethods {

    async generateRandomString() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';

        for (let i = 0; i < 6; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return randomString;
    }

    async makePostRequest(url, postBody) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '0797c976ee133afe6e4f6eb124da3ca3'
            },
            body: JSON.stringify(postBody)
        });

        return response.json();
    }

    async makePutRequest(url, putBody) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '0797c976ee133afe6e4f6eb124da3ca3'
            },
            body: JSON.stringify(putBody)
        });

        return response.json();
    }

    async makeGetRequest(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '0797c976ee133afe6e4f6eb124da3ca3'
            }
        });

        return response.json();
    }

}

module.exports = { CommonMethods };