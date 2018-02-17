import React from 'react';
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";

export default (props) => {
    const {
        isOpen,
        issue,
        projects = [],
        saveIssue,
        selectedIssueProjectId,
        toggle,
        handleChange,
    } = props;

    const selectedIssueProject =  projects.find(proj => proj.id === selectedIssueProjectId)


    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader>{issue ? 'Update Issue' : 'Create Issue'}</ModalHeader>
            <ModalBody>

                <Row>
                    <Col>
                        {!issue && <FormGroup>
                            <Label htmlFor="project">Project</Label>
                            <Input
                                onChange={(e) => handleChange(e)}
                                type="select"
                                id="project"
                                name="project">
                                <option value="" >Select project</option>
                                {projects.map(proj => <option key={proj.key} value={`${proj.id}`}>{proj.name}</option>)}
                            </Input>
                        </FormGroup>}
                        {issue && <Label>Project: {issue.project}</Label>}
                    </Col>

                    <Col>
                        {!issue && selectedIssueProject && <FormGroup>
                            <Label htmlFor="issueType">Issue Type</Label>
                            <Input
                                onChange={(e) => handleChange(e)}
                                placeholder="Select issue type"
                                type="select"
                                id="issueType"
                                name="issueType">
                                {selectedIssueProject.issuetypes.map(type => <option key={type.id} value={`${type.id}`}><img src={type.iconUrl} alt="issue type icon" />{type.name}</option>)}
                            </Input>
                        </FormGroup>}
                        {issue && <Label>Project: {issue.type}</Label>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {(issue || selectedIssueProject) && <FormGroup>
                            <Label htmlFor="summary">Summary</Label>
                            <Input
                                defaultValue={issue && issue.summary}    
                                onChange={(e) => handleChange(e)}
                                placeholder="Summary of issue here"
                                type="text"
                                id="summary"
                                name="summary"
                            />
                        </FormGroup>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {(issue || selectedIssueProject) && <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                defaultValue={issue && issue.description}    
                                onChange={(e) => handleChange(e)}
                                placeholder="Description of issue here"
                                type="textarea"
                                id="description"
                                name="description"
                            />
                        </FormGroup>}
                    </Col>
                </Row>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e) => saveIssue()}>{issue ? 'Update Issue' : 'Create Issue'}</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
};
