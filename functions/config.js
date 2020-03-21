const { FIREBASE_APIKEY, FIREBASE_APPID, FIREBASE_PROJECTID } = process.env;

exports.handler = (event, context, callback) => {
    return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            FIREBASE_APIKEY, FIREBASE_APPID, FIREBASE_PROJECTID
        })
    })
}