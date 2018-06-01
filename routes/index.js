module.exports = (application) => {
    /* 
     * 
     *  Create User
     * 
     */
    application.post("/register-user/", (req, res) => {
        application.app.controllers.users.createUser(application, req, res);
    });


    /*
     *
     *  Update User
     * 
     */

    application.put('/update-user', (req, res) => {
        application.app.controllers.users.updateUser(application, req, res);
    })

    /* 
     *
     * Register device. 
     * 
     */
    application.post("/register-device", (req, res) => {
        application.app.controllers.device.insertDevice(application, req, res);
    });



    application.post("/login", (req, res) => {
        application.app.controllers.login.openSession(application, req, res);
    });


    application.get("/", (req, res) => {

        // var clockwork = require('clockwork')({ key: 'e79deb7f0a5d4538ee184f5c5ec2646b8eaebd03' });

        // clockwork.sendSms({ To: '5511940027216', Content: 'Olaaaaaa!' },
        //     function (error, resp) {
        //         if (error) {
        //             console.log('Something went wrong', error);
        //         } else {
        //             console.log(resp);

        //             console.log('Message sent', resp.responses[0].id);
        //         }
        //     });
    });


    application.get('/getUser/:email', (req, res) => {
        application.app.controllers.users.getUser(application, req, res);
    })

    application.get('/videos', (req, res) => {
        application.controllers.videos.getVideos(application, req, res);
    })

}