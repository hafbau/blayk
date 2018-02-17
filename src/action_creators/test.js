import testApi from "../api/test";

export function createSuite(body, token) {
    return function(dispatch) {
        dispatch({
            type: 'CREATE_SUITE_PENDING',
        });

        return testApi.createSuite(body, token)
            .then(({ body: { suite } }) => {
            dispatch({
                type: 'CREATE_SUITE_SUCCESS',
                suite
            });

        })
        .catch(error => {
            return dispatch({
                type: 'CREATE_SUITE_FAILURE',
                error
            })
        })
    }
}

export function getAllSuites() {
    return function(dispatch, getState) {
        dispatch({
            type: 'GET_ALL_SUITES_PENDING'
        });

        return testApi.getAllSuites(getState().token)
        .then(({ body: { suites } }) => {
            dispatch({
                type: 'GET_ALL_SUITES_SUCCESS',
                suites
            });

        })
        .catch(error => {
            return dispatch({
                type: 'GET_ALL_SUITES_FAILURE',
                error
            })
        })
    }
}

export function getSuite(_id, token) {
    return function(dispatch, getState) {
        dispatch({
            type: 'GET_SUITE_PENDING',
        });

        return testApi.getSuite(_id, getState().token)
        .then(({ body: { suite } }) => {
            dispatch({
                type: 'GET_SUITE_SUCCESS',
                suite
            });

        })
        .catch(error => {
            return dispatch({
                type: 'GET_SUITE_FAILURE',
                error
            })
        })
    }
}

export function runCase(suiteId, order) {
    return function(dispatch, getState) {
        dispatch({
            type: 'RUN_CASE_PENDING'
        });

        return testApi.runCase(suiteId, order, getState().token)
        .then(({ body }) => {
            dispatch({
                type: 'RUN_CASE_SUCCESS',
                testCase: body.testCase
            });

        })
        .catch(error => {
            return dispatch({
                type: 'RUN_CASE_FAILURE',
                error
            })
        })
    }
}

export function scheduleRun({ body, suiteId, order }) {
    return function(dispatch, getState) {
        dispatch({
            type: 'SCHEDULE_RUN_CASE_PENDING'
        });

        return testApi.scheduleRun({ body, suiteId, order }, getState().token)
        .then(({ body }) => {
            dispatch({
                type: 'SCHEDULE_RUN_CASE_SUCCESS',
            });

        })
        .catch(error => {
            return dispatch({
                type: 'SCHEDULE_RUN_CASE_FAILURE',
                error
            })
        })
    }
}

export function updateSuite(body) {
    return function(dispatch, getState) {
        dispatch({
            type: 'UPDATE_SUITE_PENDING'
        });

        return testApi.updateSuite(body, getState().token)
        .then(({ body: { suite } }) => {
            dispatch({
                type: 'UPDATE_SUITE_SUCCESS',
                suite
            });

        })
        .catch(error => {
            return dispatch({
                type: 'UPDATE_SUITE_FAILURE',
                error
            })
        })
    }
}

export function saveAndRun(body, token) {
    return function(dispatch) {
        dispatch({
            type: 'SAVE_AND_RUN_PENDING',
            runningCase: body
        });

        return testApi.saveAndRun(body, token)
        .then(({ body }) => {
            dispatch({
                type: 'SAVE_AND_RUN_SUCCESS',
                results: body,
                successMessage: "Successful test run."
            });

        })
        .catch(error => {
            return dispatch({
                type: 'SAVE_AND_RUN_FAILURE',
                error
            })
        })
    }
}

export function updateCase(body) {
    return function(dispatch, getState) {
        dispatch({
            type: 'UPDATE_CASE_PENDING'
        });

        return testApi.updateCase(body, getState().token)
        .then(({ body }) => {
            dispatch({
                type: 'UPDATE_CASE_SUCCESS',
                testCase: body
            });

        })
        .catch(error => {
            return dispatch({
                type: 'UPDATE_CASE_FAILURE',
                error
            })
        })
    }
}