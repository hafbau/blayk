import testApi from "../api/test";
import { resolved, pending, failure } from "./helpers";
import deep_clone from "../utils/deep_clone";

export function createSuite(body) {
    return function (dispatch, getState) {
        const { suites, token } = getState();
        dispatch(pending);
        return testApi.createSuite(body, token)
        .then(({ body: { suite } }) => {
            // used for cloning the array
            const clonedSuites = suites.map(s => s);
            clonedSuites.push(suite);
            dispatch({
                ...resolved,
                suites: clonedSuites,
                success: { message: "Test suite created successfully."}
            });

        })
            .catch(error => {
            error = error.error || error;
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
            error = error.error || error;
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
            error = error.error || error;
            return dispatch({
                ...failure,
                error
            })
        })
    }
}
export function deleteSuite(suite, token) {
    return function(dispatch, getState) {
        dispatch(pending);
        const { suites, token } = getState();
        return testApi.deleteSuite(suite, token)
        .then(_ => {
            dispatch({
                ...resolved,
                suites: suites.filter(s => suite._id !== s._id)
            });

        })
        .catch(error => {
            error = error.error || error;
            return dispatch({
                ...failure,
                error
            })
        })
    }
}

export function runCase(suiteId, order) {
    return function (dispatch, getState) {
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
            error = error.error || error;
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
            error = error.error || error;
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
        const { suites, token } = getState();
        
        return testApi.updateSuite(body, token)
        .then(({ body: { suite } }) => {
            
            dispatch({
                ...resolved,
                success: { message: "Test suite successfully updated." },
                suites: suites.map(s => s._id === suite._id ? suite : s)
            });

        })
        .catch(error => {
            error = error.error || error;
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
            error = error.error || error;
            dispatch({
                ...failure,
                error
            })
        })
    }
}