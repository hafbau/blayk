import testApi from "../api/test";

export function saveAndRun(body, token) {
    return function(dispatch) {
        dispatch({
            type: 'SAVE_AND_RUN_PENDING',
            runningCase: body
        });

        return testApi.saveAndRun(body, token)
        .then(({ body }) => {
            console.log("body octeted", body)
            dispatch({
                type: 'SAVE_AND_RUN_SUCCESS',
                results: body
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
            console.log("body updated", body)
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