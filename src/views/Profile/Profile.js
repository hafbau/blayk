import React, { Component } from 'react';
import {
    Row
} from "reactstrap";

// import config from '../../config';
import { ProfileTabs, ProfileHero } from '../../components';
import deepClone from '../../utils/deep_clone';

// const media = config.media;
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: deepClone(this.props.user) || {},
        };

        
    }

    getForm() {
        // const profile = deepClone(this.state.profile);
        // if (profile.avatar && !this.state.editMode) profile.avatar = `${media}/files/${profile.avatar}`
        return deepClone(this.state.profile);
    }

    updateForm({ target: { name, value } }) {
        const profile = deepClone(this.state.profile);
        profile[name] = value;
        this.setState(prevState => Object.assign({}, prevState, { profile }))
    }
    
    submitForm() {
        const profile = deepClone(this.state.profile);
        if (this.state.editMode) profile.avatar = this.state.file;
        this.props.updateUser(profile, this.state.editMode)
    }

    handleFileInput({ target: { files } }) {
        // TODO: part of this should reside in 'AvatarCanvas'
        if (!files || !files.length) return false;
        const profile = deepClone(this.state.profile);
        const file = files[0];
        // TODO: consider URL.createObjectURL() because its sync
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            profile.avatar = reader.result;
            this.setState(prevState => Object.assign({}, prevState, { profile, editMode: true, file }))
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {

        return (
            <div className="animated fadeIn">
                
                <Row>
                    <ProfileHero
                        avatar={this.getForm().avatar}
                        name={this.getForm().name}
                        handleFileInput={(e) => this.handleFileInput(e)}
                    />
                </Row>

                <Row>            
                    <ProfileTabs
                        getForm={_ => this.getForm()}    
                        submitForm={_ => this.submitForm()}    
                        updateForm={e => this.updateForm(e)}    
                        location={this.props.location}
                    />
                </Row>
            </div>
        )
    }
}

export default Profile;
