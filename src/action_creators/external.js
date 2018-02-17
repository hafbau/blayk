import auth from "auth";
import media from "media";
import config from "../config";

import external from "../api/external";

auth.apiUrl = config.auth;
media.apiUrl = config.media;

export function fetchProjects(credential) {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_PROJECTS_PENDING',
        });

        return external.createIssueMeta(credential)
        .then(response => response.body)
        .then(body => {
            console.log("body",  body)
            dispatch({
                type: 'FETCH_PROJECTS_SUCCESS',
                jiraProjects: body.projects || [],
            })
        })
        .catch(error => {
            return dispatch({
                type: 'FETCH_PROJECTS_FAILURE',
                error
            })
        })
    }
}

export function saveIssue(credential, issue) {
    return function(dispatch) {
        dispatch({
            type: 'SAVE_ISSUE_PENDING',
        });

        return external.saveIssue(credential, issue)
        .then(response => response.body)
        .then(body => {
            console.log("saved issue",  body)
            dispatch({
                type: 'SAVE_ISSUE_SUCCESS',
                jiraIssue: body,
            })
        })
        .catch(error => {
            return dispatch({
                type: 'SAVE_ISSUE_FAILURE',
                error
            })
        })
    }
}