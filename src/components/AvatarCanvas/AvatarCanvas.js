import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Input } from 'reactstrap';
import Avatar from '../Avatar';

function AvatarCanvas(props) {
  const { editMode, handleFileInput, avatarSrc: src, name = 'H S', size = 200 } = props;
    return (
        <div className="avatar-wrapper"
            style={{
                width: `${size * 2}`,
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
        {editMode && <AvatarEditor
            image={src}
            width={size}
            height={size}
            border={0}
            borderRadius={size / 2}
            scale={1.2}
            rotate={0}
        />}
        {!editMode && <Avatar
            size={size}
            src={src}
            name={name}
            style={{
                fontSize: `${size * 0.42}`,
            }}
            />}
        <Input
            type="file"
            onChange={handleFileInput}
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
        <p style={{width: '100%'}}>Drag and drop image or click to upload image</p>
    </div>)
}

export default AvatarCanvas;
