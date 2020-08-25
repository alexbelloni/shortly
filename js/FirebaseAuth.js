const FirebaseAuth = () => {

    function _getConfig(jsonObj) {
        //xbellonifromcanada@gmail.com
        return {
            apiKey: jsonObj.FIREBASE_APIKEY,
            authDomain: `${jsonObj.FIREBASE_PROJECTID}.firebaseapp.com`,
            databaseURL: `https://${jsonObj.FIREBASE_PROJECTID}.firebaseio.com`,
            projectId: jsonObj.FIREBASE_PROJECTID,
            storageBucket: `${jsonObj.FIREBASE_PROJECTID}.appspot.com`,
            messagingSenderId: "55734054802",
            appId: jsonObj.FIREBASE_APPID
        }
    }

    function _getFirebaseConfigFromNetlify(callback) {
        import("./APISender.js").then(module => {
            const APISender = module.default();
            APISender.get("https://yourlinkshortly.netlify.app/.netlify/functions/config", response => {
                if (response.error) {
                    console.log(response);
                    callback();
                }
                const firebaseConfig = { firebase: _getConfig(response), shorteners: response };
                callback(firebaseConfig);
            });
        });
    }

    function getConfigFirebase(callback) {
        import("./devEnv.js").then(module => {
            callback({ firebase: _getConfig(module.default), shorteners: module.default });
        }).catch(() => {
            _getFirebaseConfigFromNetlify(callback);
        })
    }

    function signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        firebase.auth().signInWithRedirect(provider);
    }

    function signOut(callback) {
        firebase.auth().signOut().then(function () {
          // Sign-out successful.
          callback()
        }).catch(function (error) {
          // An error happened.
          console.log('signOut',error)
        });
    }

    function getRedirectResult(callback) {
        // Using a redirect.
        firebase.auth().getRedirectResult().then(callback);
    }

    return {
        getConfigFirebase,
        signIn,
        signOut,
        getRedirectResult
    }
}

export default FirebaseAuth();