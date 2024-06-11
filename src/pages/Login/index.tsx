import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN, User } from '../Users/types/User';
import { UserCredentials } from './Types/UserCredentials';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';
import { useAuth } from '@/context/authContext';
import useLocalStorage from '@/hooks/useLocalStorage';

const Login = () => {
  const [formData, setFormData] = useState<UserCredentials>({
    username: '',
    password: '',
  });

  const [validationMessage, setValidationMessage] = useState<string>('');

  const [users] = useLocalStorage<User[] | null>('users', [ADMIN]);

  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/tasks');
  }, [user]);

  const handleSave = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!event.target) return;
    const user = users?.find((user) => user.username === formData.username);
    if (!user) {
      setValidationMessage('Either username or password is incorrect');
      return;
    }
    setUser(user);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.currentTarget;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <div className="flex flex-col p-4 lg:w-1/3 mx-auto lg:shadow-md justify-center">
      <p className="text-xl font-semibold">Login</p>
      {validationMessage && <p className="text-xs text-red-700">{validationMessage}</p>}
      <form className="mt-5" onSubmit={(event) => handleSave(event)} data-testid="form">
        <Input
          type="text"
          label="Username"
          name="username"
          value={formData?.username}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
        />
        <div className="mt-5 flex gap-5 justify-end">
          <Button label="Login" buttonType="basic" />
        </div>
      </form>
    </div>
  );
};

export default Login;
