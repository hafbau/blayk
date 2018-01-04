import auth from "auth";
import media from "media";
import config from "../config";

auth.apiUrl = config.auth;
media.apiUrl = config.media;

function avatarToUrl({ avatar }) {
    // TODO: check avatar length is a valid _id
    if (typeof avatar === 'string' && avatar.length) {
        return `${config.media}/files/${avatar}`
    }
}

function getName({ firstName, lastName }) {
    return `${firstName} ${lastName}`
}

function prepareUser(user) {
    user.avatar = avatarToUrl(user);
    user.name = getName(user);
    return user;
}

export function login(credential) {
    return function(dispatch) {
        dispatch({
            type: 'LOGIN_PENDING',
        });

        return auth.loginWithEmailAndPassword(credential)
        .then(user => {
            user = prepareUser(user);
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
    return function(dispatch, getState) {
        dispatch({
            type: 'LOGOUT_PENDING',
        });
        const token = getState().token;
        return auth.logout(token)
        .then(({ body }) => {
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
            user = prepareUser(user);
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

export function updateUser(body, avatarHasChanged) {
    return function(dispatch, getState) {
        dispatch({
            type: 'UPDATE_USER_PENDING',
        });

        return Promise.resolve(avatarHasChanged ? media.upload(body.avatar) : null)
        .then(avatar => {
            if (avatar) body.avatar = avatar;
            return auth.update(body, getState().token)
        })
        .then(user => {
            user = prepareUser(user);
            dispatch({
                type: 'UPDATE_USER_SUCCESS',
                user
            });

        })    
        .catch(error => {
            return dispatch({
                type: 'UPDATE_USER_FAILURE',
                error
            })
        })
    }
}