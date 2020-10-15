import React, { useState } from 'react';
import { User }  from './User';

export default function UserSettings (): JSX.Element {

  const [ user, setUser] = useState<User>({
    name: '',
    bio: '',
    avatar: '',
    status: ''
  })

  return (
    <div>
      User Settings
    </div>
  )
};

