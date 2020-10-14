import React, { useState } from 'react';

interface User {
  name: string;
  bio: string;
  avatar: string;
  status: string;
}

const [ user, setUser] = useState<User>({
  name: '',
  bio: '',
  avatar: '',
  status: ''
})

export default function UserSettings (): JSX.Element {
  return <div>
    Hello World
  </div>;
};

