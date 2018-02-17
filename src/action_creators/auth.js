import auth from "auth";
import media from "media";
import config from "../config";

import { resolved, prepareUser, pending, failure } from "./helpers";
auth.apiUrl = config.auth;
media.apiUrl = config.media;


export function login(credential) {
    return function(dispatch) {
        dispatch(pending);

        return auth.loginWithEmailAndPassword(credential)
        .then(user => {
            user = prepareUser(user);
            dispatch({
                ...resolved,
                token: auth.token,
                user
            });

        })
        .catch(error => {
            return dispatch({
                ...failure,
                error
            })
        })
    }
}

export function logout() {
    return function(dispatch, getState) {
        dispatch(pending);
        const token = getState().token;
        return auth.logout(token)
        .then(({ body }) => {
            dispatch({
                ...resolved,
                token: "",
                user: {}
            });

        })
        .catch(error => {
            return dispatch({
                ...failure,
                error
            })
        })
    }
}

export function register(body) {
    return function(dispatch) {
        dispatch(pending);

        return auth.registerWithEmailAndPassword(body)
        .then(user => {
            user = prepareUser(user);
            dispatch({
                ...resolved,
                token: auth.token,
                user
            });

        })
        .catch(error => {
            return dispatch({
                ...failure,
                error
            })
        })
    }
}

export function updateUser(body, avatarHasChanged) {
    return function(dispatch, getState) {
        dispatch(pending);

        return Promise.resolve(avatarHasChanged && media.upload(body.avatar))
        .then(avatar => {
            if (avatar) body.avatar = avatar;
            return auth.update(body, getState().token)
        })
        .then(user => {
            user = prepareUser(user);
            dispatch({
                ...resolved,
                user,
                success: { message: 'Profile updated successfully.'}
            });

        })    
        .catch(error => {
            dispatch({
                ...failure,
                error
            })
        })
    }
}