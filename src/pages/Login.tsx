import React, { FormEvent, useState } from 'react';
import Text from 'components/atoms/text/Text';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import { useNavigate } from 'react-router-dom';
import { getLogin } from 'services/user';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import useAuthStore from 'store/useAuthStore';
import Role from 'types/Role';
import './Login.scss';

interface CustomJwtPayload extends JwtPayload {
  role: Role;
  loginId: string;
  companyId: number;
}

const Login = () => {
  const title = 'Login';
  const content = '로그인하기';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const goToChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { login, setRole, setLoginId, setCompanyId } =
      useAuthStore.getState();

    if (!username || !password) {
      return;
    }
    getLogin(
      username,
      password,
      ({ data, headers }) => {
        const token = headers.authorization;
        localStorage.setItem('accessToken', token);
        const decode: CustomJwtPayload = jwtDecode(token);
        login();
        setRole(decode.role);
        setLoginId(decode.loginId);
        setCompanyId(decode.companyId);

        const userInfoStorage = localStorage.getItem('userInfoStorage');
        const userInfo = JSON.parse(userInfoStorage || '');
        const { role } = userInfo.state;

        // TODO: flag로 분기처리
        const homePage = {
          ROLE_SUPER: '/devices',
          ROLE_ADMIN: '/summary',
          ROLE_USER: '/summary',
        };
        navigate(homePage[role as keyof typeof homePage]);
      },
      (error) => {
        // TODO: 알림 추가
        console.log('에러', error);
      }
    );
  };

  return (
    <div className="login__container">
      <div className="login__img" />
      <div className="login__organism">
        <div className="login__explain">
          <Text content={title} type="title" />
          <Text content={content} type="subtitle" />
        </div>
        <form className="login__form" onSubmit={handleLogin}>
          <div className="login__form__input">
            <Input
              size="medium"
              type="text"
              shape="line"
              value={username}
              placeholder="ID"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input
              size="medium"
              type="password"
              shape="line"
              value={password}
              placeholder="PASSWORD"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="login__change-pwd">
            <Text
              content="비밀번호 재설정"
              type="link"
              color="link-color"
              underline
              onClick={goToChangePassword}
            />
          </div>
          <Button size="xlarge" type="submit" label="LOGIN" radius="oval" />
        </form>
      </div>
    </div>
  );
};

export default Login;
