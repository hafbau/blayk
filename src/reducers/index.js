const initialState = {
    // data
    token: '',
    user: {},
    suites: [],
    testCases: [],
    suite: {},
    testCase: {},
    error: null,

    // UI state
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        /**
         * Auth related
         */
        // login
        case "LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "LOGIN_PENDING":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.user,
                token: action.token,
                loading: false,
                error: null
            };

        // logout
        case "LOGOUT_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "LOGOUT_PENDING":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                user: action.user,
                token: action.token,
                loading: false,
                error: null
            };

        // register
        case "REGISTER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "REGISTER_PENDING":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "REGISTER_SUCCESS":
            return {
                ...state,
                user: action.user,
                token: action.token,
                loading: false,
                error: null
            };

        /**
         * Socket setup Related
         */
        // has_socket
        case "HAS_SOCKET":
            return {
                ...state,
                hasSocket: true,
                socket: action.socket
            };

        // is_listening
        case "IS_LISTENING":
            return {
                ...state,
                isListening: true
            };

        /**
         * Test Related
         */
        // create suite
        case "CREATE_SUITE_FAILURE":
            return {
                ...state,
                loading: false,
                suite: {},
                error: action.error
            };
        case "CREATE_SUITE_PENDING":
            return {
                ...state,
                loading: true,
                suite: {},
                error: null
            };
        case "CREATE_SUITE_SUCCESS":
            return {
                ...state,
                suite: action.suite,
                loading: false,
                error: null
            };
        
        // get all suites
        case "GET_ALL_SUITES_FAILURE":
            return {
                ...state,
                loading: false,
                suites: [],
                error: action.error
            };
        case "GET_ALL_SUITES_PENDING":
            return {
                ...state,
                loading: true,
                suites: [],
                error: null
            };
        case "GET_ALL_SUITES_SUCCESS":
            return {
                ...state,
                suites: action.suite,
                loading: false,
                error: null
            };
        
        // get a suite
        case "GET_SUITE_FAILURE":
            return {
                ...state,
                loading: false,
                suite: [],
                error: action.error
            };
        case "GET_SUITE_PENDING":
            return {
                ...state,
                loading: true,
                suite: [],
                error: null
            };
        case "GET_SUITE_SUCCESS":
            return {
                ...state,
                suite: action.suite,
                loading: false,
                error: null
            };
        
        // save and run
        case "RUN_CASE_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "RUN_CASE_PENDING":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "RUN_CASE_SUCCESS":
            return {
                ...state,
                testCase: action.testCase,
                loading: false,
                error: null
            };
        
        // save and run
        case "SAVE_AND_RUN_FAILURE":
            return {
                ...state,
                running: false,
                error: action.error
            };
        case "SAVE_AND_RUN_PENDING":
            return {
                ...state,
                running: true,
                runningCase: action.runningCase,
                error: null
            };
        case "SAVE_AND_RUN_SUCCESS":
            return {
                ...state,
                results: action.results,
                running: false,
                error: null
            };
        
        // update test case
        case "UPDATE_CASE_FAILURE":
            return {
                ...state,
                loading: false,
                testCase: {},
                error: action.error
            };
        case "UPDATE_CASE_PENDING":
            return {
                ...state,
                loading: true,
                testCase: {},
                error: null
            };
        case "UPDATE_CASE_SUCCESS":
            return {
                ...state,
                testCase: action.testCase,
                loading: false,
                error: null
            };

        // update test suite
        case "UPDATE_SUITE_FAILURE":
            return {
                ...state,
                loading: false,
                suite: {},
                error: action.error
            };
        case "UPDATE_SUITE_PENDING":
            return {
                ...state,
                loading: true,
                suite: {},
                error: null
            };
        case "UPDATE_SUITE_SUCCESS":
            return {
                ...state,
                suite: action.suite,
                loading: false,
                error: null
            };

        // step result (listener dispatched)
        case "STEP_RESULT":
            return {
                ...state,
                // payload signature is from the server
                // TODO: consider decoupling
                result: action.payload.result,
                status: action.payload.status
            }
        
            default:
                return state
    }
}