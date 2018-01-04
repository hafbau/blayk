import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import AvatarCanvas from '../AvatarCanvas';

const ProfileHero = ({ avatar, handleFileInput, name }) => {
    return (
        <Jumbotron fluid style={styles.jumbotron}>
            <Container fluid>
                <h1 style={{display: 'flex', justifyContent: 'center'}}>
                    <AvatarCanvas
                        avatar={avatar}
                        onChange={handleFileInput}
                        name={name}
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