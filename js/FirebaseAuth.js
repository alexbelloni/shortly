const FirebaseAuth = () => {
    function _signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        firebase.auth().signInWithRedirect(provider);
    }

    function _signOut() {
        // firebase.auth().signOut().then(function () {
        //   // Sign-out successful.
        // }).catch(function (error) {
        //   // An error happened.
        // });
    }

    function getRedirectResult(callback) {
        // Using a redirect.
        firebase.auth().getRedirectResult().then(callback);
    }
    return {
        signIn: _signIn, 
        signOut: _signOut,
        getRedirectResult
    }
}

export default FirebaseAuth();