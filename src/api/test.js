import fetch from 'superagent';
import config from '../config';

export default {

    createSuite(body, token) {
        return fetch.post(`${config.API_PATH}/tests`)
            .send(body)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    },
    getAllSuites(token) {
        return fetch.get(`${config.API_PATH}/tests`)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    },
    getSuite(_id, token) {
        return fetch.get(`${config.API_PATH}/tests/${_id}`)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    },
    runCase(suiteId, order, token) {
        return fetch.put(`${config.API_PATH}/tests/${suiteId}/cases/${order}/run`)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    },
    saveAndRun(body, token) {
        return fetch.post(`${config.API_PATH}/tests/saveAndRun`)
            .send(body)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    },

    updateCase(body, token) {
        return fetch.put(`${config.API_PATH}/tests/${body.suiteId}/cases/${body.order}`)
            .send(body)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    },

    updateSuite(body, token) {
        return fetch.put(`${config.API_PATH}/tests/${body._id}`)
            .send(body)
            .type('json')
            .set('x-access-token', token)
            .set('Content-Type', 'application/json');
    }
};