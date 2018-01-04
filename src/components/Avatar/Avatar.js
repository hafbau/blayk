import React from 'react';
import UserAvatar from 'react-user-avatar';

function Avatar(props) {
    const { src, name, size = 200 } = props;
    return (
        <UserAvatar
            size={size}
            src={src}
            name={name}
            style={{
                fontSize: `${size * 0.42}`,
            }}
        />
    )
}

export default Avatar;
