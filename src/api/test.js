import fetch from 'superagent';

import config from '../config';

export default {
    saveAndRun(body, token) {
        return fetch.post(`${config.API_PATH}/tests/saveAndRun`)
            .send(body)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    },

    updateCase(body, token) {
        return fetch.put(`${config.API_PATH}/tests/${body.suiteId}/cases/${body._id}`)
            .send(body)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    }
};