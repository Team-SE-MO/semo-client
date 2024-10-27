import React, { useState } from 'react';
import Text from 'components/atoms/text/Text';
import Input from 'components/atoms/input/Input';
import './Login.scss';
import Button from 'components/atoms/button/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const title = 'Login';
  const content = '로그인하기';

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const loginIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const goToChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className="login__container">
      <div className="login__img" />
      <div className="login__organism">
        <div className="login__explain">
          <Text text={title} type="title" />
          <Text text={content} type="subtitle" />
        </div>
        <form className="login__form">
          <div className="login__form__input">
            <Input
              size="medium"
              type="text"
              shape="line"
              value={loginId}
              placeholder="ID"
              onChange={loginIdHandler}
            />
            <Input
              size="medium"
              type="password"
              shape="line"
              value={password}
              placeholder="PASSWORD"
              onChange={passwordHandler}
            />
          </div>
          <div className="login__change-pwd">
            <Text
              text="비밀번호 재설정"
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
