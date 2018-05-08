import React from 'react';
import { Input } from 'reactstrap';
import Avatar from '../Avatar';

function AvatarCanvas(props) {
    const { onChange, avatar, name = 'B L', size = 200 } = props;
    
    return (
        <div className="avatar-wrapper"
            style={{
                width: `${size * 2}px`,
            }}
            onDragEnter={({ target }) => {
                target.classList.toggle('drag-enter')
                return false;
            }}
            onDrop={({ target }) => {
                target.classList.toggle('drag-enter');
                return false;
            }}
        >
        <Avatar
            size={size}
            src={avatar}
            name={name}
        />
        <Input
            type="file"
            onChange={onChange}
            accept="image/*"
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: '0',
                cursor: 'pointer',
            }}
        />
        <p className="lead" style={{width: '100%'}}>Drag and drop image or click to upload image</p>
    </div>)
}

export default AvatarCanvas;
