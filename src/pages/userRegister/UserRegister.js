import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser} from "../redux/authSlice";

const UserRegister = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        if (!username || !password || !confirmPassword) {
            alert('Нужно заполнить все поля!');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Пароли не совпадают.');
            return;
        }

        const existingUser = localStorage.getItem('registeredUser');
        if (existingUser === username) {
            alert('Пользователь уже существует.');
            return;
        }

        dispatch(registerUser(username));
        localStorage.setItem('registeredUser', username);
        alert('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                type="password"
                placeholder="Новый пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <input
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button onClick={handleRegister}>Регистрация</button>
              <p>{errorMessage}</p>
        </div>
    );
};

export default UserRegister;
