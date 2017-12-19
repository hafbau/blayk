import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import AvatarCanvas from '../AvatarCanvas';

const ProfileHero = ({ avatarSrc, editMode, handleFileInput, name = 'Matin Jaza' }) => {
    return (
        <Jumbotron fluid style={styles.jumbotron}>
            <Container fluid>
                <h1 style={{display: 'flex', justifyContent: 'center'}}>
                    <AvatarCanvas
                        avatarSrc={avatarSrc}    
                        editMode={editMode}
                        handleFileInput={handleFileInput}
                    />
                </h1>
                <h1 className="display-4">{name}</h1>
            </Container>
        </Jumbotron>
    );
};

export default ProfileHero;

const styles = {
    jumbotron: {
        width: "100%",
        textAlign: "center",
        padding: '2rem'
    },
}