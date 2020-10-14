import React, { useState } from 'react';

const [ name, setName ] = useState<string>('');
const [ bio, setBio ] = useState<string>('');
const [ avatar, setAvatar ] = useState<string>('');
const [ status, setStatus ] = useState<string>('');

const UserSettings = () => {
  return <div>
    Hello World
  </div>;
};

export default UserSettings;
