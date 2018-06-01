let users = {}

users.createUser = async (application, req, res) => {

    // req.assert("user_id", "user_id can't be empty.").notEmpty();
    let hashPass;
    let errors = req.validationErrors();
    if (errors) res.send(errors);
    // Definimos uma Hash para a armazenar a senha do usuário. 
    hashPass = bcrypt.hashSync(req.body.password, 10);

    let promiseUsers = new Promise((resolve, reject) => {
        let data = {
            _id: application.app.utils.helpers.uniqueIdGenerator(),
            email: req.body.email,
            password: hashPass,
        };
        application.app.models.database.insertUsers(data, (getUsersError, users) => {
            if (getUsersError)
                reject(getUsersError);
            else resolve(users);
        });
    });

    try {
        let result = await promiseUsers;
        res.send({ code: 200, update: true, message: result, session: req.session });
    } catch (error) {
        res.send({ message: 'Error on createUser', error: error });
    }
}

module.exports = users; 