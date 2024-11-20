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
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SvgIcon } from '@mui/material';
import bgImg1 from 'assets/images/bg_img1.png';
import bgImg2 from 'assets/images/bg_img2.png';
import bgImg3 from 'assets/images/bg_img3.png';
import bgImg4 from 'assets/images/bg_img4.png';

interface CustomJwtPayload extends JwtPayload {
  role: Role;
  loginId: string;
  companyId: number;
  ownerName: string;
}

// TODO: 회원가입, 홈으로 가는 버튼이나 링크 추가
const Login = () => {
  const title = 'Login';
  const content = '로그인하기';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const images = [bgImg1, bgImg2, bgImg3, bgImg4];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { login, setRole, setLoginId, setCompanyId, setOwnerName } =
      useAuthStore.getState();

    if (!username || !password) {
      Swal.fire({
        title: '알림',
        text: '아이디와 비밀번호를 모두 입력해 주십시오.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
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
        setOwnerName(decode.ownerName);

        const userInfoStorage = localStorage.getItem('userInfoStorage');
        const userInfo = JSON.parse(userInfoStorage || '');
        const { role } = userInfo.state;
        const { companyId } = userInfo.state;

        const homePage = {
          ROLE_SUPER: '/devices',
          ROLE_ADMIN: `/dashboard/${companyId}`,
          ROLE_USER: `/dashboard/${companyId}`,
        };

        Swal.fire({
          title: '알림',
          text: '로그인에 성공하였습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });

        if (data.flag === false && password === '0000') {
          Swal.fire({
            title: '알림',
            text: '초기 비밀번호입니다. 비밀번호를 재설정해 주십시오.',
            icon: 'warning',
            confirmButtonText: '확인',
          }).then(() => {
            navigate('/change-password');
          });
        } else {
          navigate(homePage[role as keyof typeof homePage]);
        }
      },
      (error) => {
        Swal.fire({
          title: '알림',
          text: '로그인에 실패하였습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
        console.log('에러', error);
      }
    );
  };

  return (
    <div className="login__container">
      <div
        className="login__go-home"
        onClick={() => navigate('/')}
        role="presentation"
      >
        <SvgIcon className="login__go-home__icon" component={ArrowBackIcon} />
        <Text content="HOME" type="subtitle" />
      </div>
      <div className="login__img">
        <img src={randomImage} alt="backgroundImage" />
      </div>
      <div className="login__content">
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
              onClick={() => navigate('/change-password')}
            />
            <Text
              content="회원가입"
              type="link"
              color="link-color"
              underline
              onClick={() => navigate('/signup')}
            />
          </div>
          <Button size="xlarge" type="submit" label="LOGIN" radius="oval" />
        </form>
      </div>
    </div>
  );
};

export default Login;
