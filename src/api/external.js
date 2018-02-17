import fetch from 'superagent';
import config from '../config';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com';

export default {
    fetchProjects: (credential) => {
        const { jiraUsername, jiraPassword, jiraURL } = credential;
        const encodedCred = btoa(`${jiraUsername}:${jiraPassword}`);
        const jiraProjectUrl = `${corsAnywhere}/${jiraURL.replace(/\/$/, '')}/rest/api/2/project`
        
        return fetch.get(jiraProjectUrl)
            .type('json')
            .set('Authorization', 'Basic ' + encodedCred)
            .set('Content-Type', 'application/json');
    },
    createIssueMeta: (credential) => {
        const { jiraUsername, jiraPassword, jiraURL } = credential;
        const encodedCred = btoa(`${jiraUsername}:${jiraPassword}`);
        const jiraProjectUrl = `${corsAnywhere}/${jiraURL.replace(/\/$/, '')}/rest/api/2/issue/createmeta?expand=fields,projects`
        
        return fetch.get(jiraProjectUrl)
            .type('json')
            .set('Authorization', 'Basic ' + encodedCred)
            .set('Content-Type', 'application/json');
    },
    saveIssue: (credential, issue) => {
        const { jiraUsername, jiraPassword, jiraURL } = credential;
        const encodedCred = btoa(`${jiraUsername}:${jiraPassword}`);
        // const jiraProjectUrl = `${corsAnywhere}/${jiraURL.replace(/\/$/, '')}/rest/api/2/issue`
        console.log('hgjhj', jiraURL)
        return fetch.post(`${config.API_PATH}/saveIssue`)
            .send({ jiraURL, encodedCred, issue })
            .type('json')
            // .set('Authorization', 'Basic ' + encodedCred)
            // .set('Referrer', jiraURL)
            // .set('X-Atlassian-Token', 'nocheck')
            .set('Content-Type', 'application/json');
    },
};