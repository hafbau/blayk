import testApi from "../api/test";
import { resolved, pending, failure } from "./helpers";

export function createSuite(body, token) {
    return function(dispatch) {
        dispatch(pending);

        return testApi.createSuite(body, token)
            .then(({ body: { suite } }) => {
            dispatch({
                ...resolved,
                suite,
                success: { message: "Test suite created successfully."}
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

export function getAllSuites() {
    return function(dispatch, getState) {
        dispatch(pending);

        return testApi.getAllSuites(getState().token)
        .then(({ body: { suites } }) => {
            dispatch({
                ...resolved,
                suites
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

export function getSuite(_id, token) {
    return function(dispatch, getState) {
        dispatch(pending);

        return testApi.getSuite(_id, getState().token)
        .then(({ body: { suite } }) => {
            dispatch({
                ...resolved,
                suite
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

export function runCase(suiteId, order) {
    return function(dispatch, getState) {
        dispatch({
            ...pending,
            results: [],
            running: true
        });

        return testApi.runCase(suiteId, order, getState().token)
        .then(({ body }) => {
            dispatch({
                ...resolved,
                running: false,
                testCase: body.testCase,
                results: body.testCase.steps
            });

        })
        .catch(error => {
            dispatch({
                failure,
                results: [],
                running: false,
                error
            })
        })
    }
}

export function scheduleRun({ body, suiteId, order }) {
    return function(dispatch, getState) {
        dispatch(pending);

        return testApi.scheduleRun({ body, suiteId, order }, getState().token)
        .then(({ body }) => {
            dispatch({
                ...resolved,
                success: { message: "Test case run successfully scheduled" }
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

export function updateSuite(body) {
    return function(dispatch, getState) {
        dispatch(pending);

        return testApi.updateSuite(body, getState().token)
        .then(({ body: { suite } }) => {
            dispatch({
                ...resolved,
                success: { message: "Test suite successfully updated." },
                suite
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

export function saveAndRun(body, token) {
    return function(dispatch) {
        dispatch({
            ...pending,
            runningCase: body
        });

        return testApi.saveAndRun(body, token)
        .then(({ body }) => {
            dispatch({
                ...resolved,
                results: body,
                success: { message: "Test case successfully saved and ran." }
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

export function updateCase(body) {
    return function(dispatch, getState) {
        dispatch(pending);

        return testApi.updateCase(body, getState().token)
        .then(({ body }) => {
            dispatch({
                ...resolved,
                success: { message: "Test case updated successfully." },
                testCase: body
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