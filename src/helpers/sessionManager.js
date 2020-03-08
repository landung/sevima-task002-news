class sessionManager {
    // constructor() {
    //     this._userData = [];
    // }

    static getUserData() {
        return JSON.parse(sessionStorage.getItem("userData"));
    }

    static setUserData(newUserData) {
        return sessionStorage.setItem("userData", JSON.stringify(newUserData));
    }
    
}

export default sessionManager;