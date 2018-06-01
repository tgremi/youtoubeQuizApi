let models = {};

models.insertUsers = (users, callbackFunction) => {
    try {
        let db = mongo.getDB();
        db.collection("users", (error, collection) => {
            if (!error) {
                console.log("Collection users found.");
                collection.insert(users, (error, success) => {
                    if (error) {
                        console.warn("Error on colletion users insert method =", error);
                        if (typeof callbackFunction === "function")
                            callbackFunction({ statusCode: 503, error: "Couldn't insert users on database.", reason: "", details: error }, undefined);
                    }
                    else {
                        console.log("User inserted in users collection.", success.ops[0]._id);
                        if (typeof callbackFunction === "function") {
                            let successObj = {
                                code: 200,
                                user: { _id: success.ops[0]._id, email: users.email }
                            }
                            callbackFunction(undefined, successObj);
                        }
                    }
                });
            } else callbackFunction({ statusCode: 503, error: "Couldn't find users collection.", reason: "", details: error }, undefined);
        });
    } catch (error) {
        console.warn("Error on insertUsers =", error);
        if (typeof callbackFunction === "function")
            callbackFunction("Error on insertUsers.", undefined);
    }
}

module.exports = models; 