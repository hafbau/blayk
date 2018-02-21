import external from "../api/external";
import { resolved, pending, failure } from "./helpers";

export function fetchProjects(credential) {
    return function(dispatch) {
        dispatch(pending);

        return external.createIssueMeta(credential)
        .then(response => {
            dispatch({
                ...resolved,
                jiraProjects: response.body.projects || [],
            })
        })
        .catch(error => {
            dispatch({
                ...failure,
                error
            })
        })
    }
}

export function saveIssue(credential, issue) {
    return function (dispatch) {
        console.log('action in saveIssue', pending)
        dispatch(pending);

        return external.saveIssue(credential, issue)
        .then(response => {
            dispatch({
                ...resolved,
                success: { message: "Issue successfully saved to Jira." },
                jiraIssue: response.body,
            })
        })
        .catch(error => {
            dispatch({
                ...failure,
                error
            })
        })
    }
}