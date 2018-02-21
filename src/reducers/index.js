const initialState = {
    // data
    token: '',
    user: {},
    suites: [],
    testCases: [],
    suite: {},
    testCase: {},
    success: null,
    error: null,

    // UI state
    loading: false
};

export default (state = initialState, action) => {
    action = { ...action }
    delete action.type;
    const payload = action.payload;
    delete action.payload;

    return Object.assign({}, state, action, payload);
}
// export default (state = initialState, action) => {
//     switch (action.type) {
//         /**
//          * Auth related
//          */
//         // login
//         case "LOGIN_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,
//                 error: action.error
//             };
//         case "LOGIN_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 success: null,
//                 error: null
//             };
//         case "LOGIN_SUCCESS":
//             return {
//                 ...state,
//                 user: action.user,
//                 token: action.token,
//                 loading: false,
//                 success: null,
//                 error: null
//             };

//         // logout
//         case "LOGOUT_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,
//                 error: action.error
//             };
//         case "LOGOUT_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 success: null,
//                 error: null
//             };
//         case "LOGOUT_SUCCESS":
//             return {
//                 ...state,
//                 user: action.user,
//                 token: action.token,
//                 loading: false,
//                 success: null,
//                 error: null
//             };

//         // register
//         case "REGISTER_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,
//                 error: action.error
//             };
//         case "REGISTER_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 success: null,
//                 error: null
//             };
//         case "REGISTER_SUCCESS":
//             return {
//                 ...state,
//                 user: action.user,
//                 token: action.token,
//                 loading: false,
//                 success: null,
//                 error: null
//             };

        
//         // Update user
//         case "UPDATE_USER_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,
//                 error: action.error
//             };
//         case "UPDATE_USER_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 success: null,
//                 error: null
//             };
//         case "UPDATE_USER_SUCCESS":
//             return {
//                 ...state,
//                 user: action.user,
//                 loading: false,
//                 success: null,
//                 error: null
//             };

        
//         /** Socket setup Related
//         */
//         // has_socket
//         case "HAS_SOCKET":
//             return {
//                 ...state,
//                 hasSocket: true,
//                 socket: action.socket
//             };

//         // is_listening
//         case "IS_LISTENING":
//             return {
//                 ...state,
//                 isListening: true
//             };

//         /**
//          * Test Related
//          */
//         // create suite
//         case "CREATE_SUITE_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,suite: {},
                
//                 error: action.error
//             };
//         case "CREATE_SUITE_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 suite: {},
//                 success: null,
//                 error: null
//             };
//         case "CREATE_SUITE_SUCCESS":
//             return {
//                 ...state,
//                 suite: action.suite,
//                 loading: false,
//                 success: null,
//                 error: null
//             };
        
//         // get all suites
//         case "GET_ALL_SUITES_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 suites: [],
//                 success: null,
//                 error: action.error
//             };
//         case "GET_ALL_SUITES_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 suites: [],
//                 success: null,
//                 error: null
//             };
//         case "GET_ALL_SUITES_SUCCESS":
//             return {
//                 ...state,
//                 suites: action.suites,
//                 loading: false,
//                 success: null,
//                 error: null
//             };
        
//         // get a suite
//         case "GET_SUITE_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 suite: [],
//                 success: null,
//                 error: action.error
//             };
//         case "GET_SUITE_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 suite: [],
//                 success: null,
//                 error: null
//             };
//         case "GET_SUITE_SUCCESS":
//             return {
//                 ...state,
//                 suite: action.suite,
//                 loading: false,
//                 success: null,
//                 error: null
//             };
        
//         // run case
//         case "RUN_CASE_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,
//                 error: action.error,
//                 results: []
//             };
//         case "RUN_CASE_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 running: true,
//                 success: null,
//                 error: null,
//                 results: []
//             };
//         case "RUN_CASE_SUCCESS":
//             return {
//                 ...state,
//                 testCase: action.testCase,
//                 results: action.testCase.steps,
//                 loading: false,
//                 success: null,
//                 error: null
//             };
        
//         // schedule run case
//         case "SCHEDULE_RUN_CASE_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,
//                 error: action.error,
//             };
//         case "SCHEDULE_RUN_CASE_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 success: null,
//                 error: null,
//             };
//         case "SCHEDULE_RUN_CASE_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 success: null,
//                 error: null
//             };
        
//         // save and run
//         case "SAVE_AND_RUN_FAILURE":
//             return {
//                 ...state,
//                 running: false,
//                 success: null,
//                 error: action.error
//             };
//         case "SAVE_AND_RUN_PENDING":
//             return {
//                 ...state,
//                 running: true,
//                 runningCase: action.runningCase,
//                 success: null,
//                 error: null
//             };
//         case "SAVE_AND_RUN_SUCCESS":
//             return {
//                 ...state,
//                 results: action.results,
//                 running: false,
//                 success: null,
//                 error: null
//             };
        
//         // update test case
//         case "UPDATE_CASE_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 testCase: {},
//                 success: null,
//                 error: action.error
//             };
//         case "UPDATE_CASE_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 testCase: {},
//                 success: null,
//                 error: null
//             };
//         case "UPDATE_CASE_SUCCESS":
//             return {
//                 ...state,
//                 testCase: action.testCase,
//                 loading: false,
//                 success: null,
//                 error: null
//             };

//         // update test suite
//         case "UPDATE_SUITE_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 suite: {},
//                 success: null,
//                 error: action.error
//             };
//         case "UPDATE_SUITE_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 suite: {},
//                 success: null,
//                 error: null
//             };
//         case "UPDATE_SUITE_SUCCESS":
//             return {
//                 ...state,
//                 suite: action.suite,
//                 loading: false,
//                 success: null,
//                 error: null
//             };

//         // step result (listener dispatched)
//         case "STEP_RESULT":
//             return {
//                 ...state,
//                 // payload signature is from the server
//                 // TODO: consider decoupling
//                 result: action.payload.result,
//                 status: action.payload.status
//             }
//         case "FETCH_PROJECTS_FAILURE":
//             return {
//                 ...state,
//                 loading: false,
//                 jiraProjects: [],
//                 success: null,
//                 error: action.error
//             };
//         case "FETCH_PROJECTS_PENDING":
//             return {
//                 ...state,
//                 loading: true,
//                 jiraProjects: [],
//                 success: null,
//                 error: null
//             };
//         case "FETCH_PROJECTS_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 jiraProjects: action.jiraProjects,
//                 jiraCreateIssueMeta: action.jiraCreateIssueMeta,
//                 success: null,
//                 error: null
//             };
        
        
//         default:
//             return state
//     }
// }