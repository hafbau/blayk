import auth from "auth";

auth.apiUrl = 'http://hafiz-sandbox.tillerdigital.ca/auth/v1';
export function login(credential) {
    return function(dispatch) {
        dispatch({
            type: 'LOGIN_PENDING',
        });

        return auth.loginWithEmailAndPassword(credential)
        .then(user => {
            dispatch({
                type: 'LOGIN_SUCCESS',
                token: auth.token,
                user
            });

        })
        .catch(error => {
            return dispatch({
                type: 'LOGIN_FAILURE',
                error
            })
        })
    }
}

export function logout() {
    return function(dispatch) {
        dispatch({
            type: 'LOGOUT_PENDING',
        });

        return auth.logout()
        .then(({ body }) => {
            console.log("body", body)
            dispatch({
                type: 'LOGOUT_SUCCESS',
                token: "",
                user: {}
            });

        })
        .catch(error => {
            return dispatch({
                type: 'LOGOUT_FAILURE',
                error
            })
        })
    }
}

export function register(body) {
    return function(dispatch) {
        dispatch({
            type: 'REGISTER_PENDING',
        });

        return auth.registerWithEmailAndPassword(body)
        .then(user => {
            dispatch({
                type: 'REGISTER_SUCCESS',
                token: auth.token,
                user
            });

        })
        .catch(error => {
            return dispatch({
                type: 'REGISTER_FAILURE',
                error
            })
        })
    }
}