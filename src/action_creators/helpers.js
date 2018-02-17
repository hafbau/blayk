import config from "../config";

export function avatarToUrl({ avatar }) {
    // TODO: check avatar length is a valid _id
    if (typeof avatar === 'string' && avatar.length) {
        return `${config.media}/files/${avatar}`
    }
}

export function getName({ firstName, lastName }) {
    return `${firstName} ${lastName}`
}

export function prepareUser(user) {
    user.avatar = avatarToUrl(user);
    user.name = getName(user);
    return user;
};

export const pending = {
    loading: true,
    error: null,
    success: null
};

export const resolved = {
    loading: false,
    error: null,
    success: null
}

export const failure = { ...resolved, error: { message: 'Something went wrong.' } }