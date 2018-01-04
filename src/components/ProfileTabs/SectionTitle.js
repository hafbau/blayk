import React from 'react';

export default (props) => {
    return (<div style={{width: "100%"}}>
        <h6 style={{ alignSelf: "left" }}>{props.children}</h6>
        <hr style={{ width: "100%", marginTop: "0" }} />
    </div>)
}