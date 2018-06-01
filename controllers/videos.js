let https = require('https');
let axios = require('axios');
const google = require('googleapis');
const youtube = google.youtube_v3;
// const secrets = require('./secrets.json');
let apiYoutube = {};


apiYoutube.getVideos = async (application, req, res) => {
    let promise = new Promise((resolve, reject) => {
        https.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLqB3diFeF20ThATzo4LKod0FvfGwqAsnC&key=AIzaSyB8CTdACxB49MSAfAIlXH6TSxNFz_i0Z9M', (response) => {
            let chunks = []; 
            response.on("data", (chunk) => {
                chunks.push(chunk);
            });
            response.on('end', () => {
                let body = Buffer.concat(chunks);
                let response = JSON.parse(body.toString());
                resolve(response);
            });

        }).on("error", (err) => {
            reject(error);
            console.log("Error: " + err.message);
        });
    });

    try {
        let response = await promise;
        res.send({ response: response });
    } catch (error) {
        throw error;
    }
}

module.exports = apiYoutube; 