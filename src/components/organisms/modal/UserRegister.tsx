import React, { useState, ChangeEvent, useEffect } from 'react';
import './UserRegister.scss';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import Input from 'components/atoms/input/Input';
import { getEmailStatus, registerUser } from 'services/user';
import { sendEmail } from 'services/email';
import Swal from 'sweetalert2';
import useAuthStore from 'store/useAuthStore';

interface UserRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  ownerName: string;
  email: string;
}

const UserRegister = ({ isOpen, onClose }: UserRegisterProps) => {
  const [formData, setFormData] = useState<UserData>({
    ownerName: '',
    email: '',
  });

  const emailRegEx =
    /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*.[A-Za-z]{2,}$/i;

  const [emailValid, setEmailValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const emailValidCheck = () => {
    getEmailStatus(
      formData.email,
      ({ data }) => {
        setIsEmailValid(data);
        if (data) {
          Swal.fire({
            title: '알림',
            text: '사용 가능한 이메일입니다.',
            icon: 'success',
            confirmButtonText: '확인',
          });
        } else {
          Swal.fire({
            title: '알림',
            text: '이미 사용 중인 이메일입니다.',
            icon: 'error',
            confirmButtonText: '확인',
          });
        }
      },
      (error) => console.log('에러', error)
    );
  };

  const handleInputChange =
    (field: keyof UserData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  useEffect(() => {
    if (emailRegEx.test(formData.email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [formData.email]);

  const companyId = useAuthStore((state) => state.companyId);

  const handleSubmit = () => {
    if (!formData.email || !formData.ownerName) {
      Swal.fire({
        title: '알림',
        text: '모든 정보를 입력해 주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return;
    }
    if (!isEmailValid) {
      Swal.fire({
        title: '알림',
        text: '이메일 중복 체크를 진행해 주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return;
    }
    if (companyId) {
      registerUser(
        companyId,
        formData.email,
        formData.ownerName,
        ({ data }) => {
          sendEmail(
            'REGISTER_MEMBER',
            data.data,
            () => {
              Swal.fire({
                title: '알림',
                text: '사용자 가입이 완료되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
              });
            },
            (sendEmailError) => console.log('이메일 에러:', sendEmailError)
          );
        },
        (registerError) => console.log('Register Error:', registerError)
      );
    }
  };

  const title = 'User Registration';
  const subtitle = '사용자 등록';
  const content = [
    '\n\u00a0 • 하위 계정을 생성합니다.',
    '\u00a0 • 생성한 계정은 모니터링 대상 장비를 등록하여 조회할 수 있습니다.',
    '\u00a0 • 협업 생산력을 키워보세요!',
  ].join('\n');

  return (
    <div className={`user-register__background ${isOpen ? '' : 'hidden'}`}>
      <div className="user-register__modal-container">
        <div className="user-register__title">
          <Text content={title} type="title" bold />
          <Text content={subtitle} type="subtitle" />
        </div>

        <div className="user-register__content">
          {/* 서브 타이틀 */}
          <div className="user-register__info">
            <Text type="info" content={content} />
          </div>
          <div className="user-register__input">
            <Input
              type="text"
              placeholder="성명"
              value={formData.ownerName}
              onChange={handleInputChange('ownerName')}
              size="large"
              shape="line"
            />
            <Input
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleInputChange('email')}
              size="large"
              shape="line"
            />
            {/* // TODO: 중복확인 API 연결 */}
            <Button
              type="button"
              label="중복확인"
              size="medium"
              color="primary"
              onClick={emailValidCheck}
            />

            {formData.email && emailValid === false && (
              <div className="user-register__warning">
                <Text
                  content="올바른 이메일 형식이 아닙니다."
                  type="info"
                  color="danger"
                />
              </div>
            )}
          </div>
          <div className="user-register__button-group">
            <Button
              size="large"
              type="button"
              label="CANCEL"
              color="other"
              radius="oval"
              shadow
              onClick={onClose}
            />
            <Button
              size="large"
              type="button"
              label="COMPLETE"
              color="primary"
              radius="oval"
              shadow
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
