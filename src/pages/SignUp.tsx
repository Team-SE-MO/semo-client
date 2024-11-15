import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { createUserRequest, getEmailStatus } from 'services/user';
import { getCompanies } from 'services/company';
import CompanyRegister from 'components/organisms/modal/CompanyRegister';
import Company from 'types/Company';
import { useNavigate } from 'react-router-dom';
import Button from 'components/atoms/button/Button';
import Text from 'components/atoms/text/Text';
import Input from 'components/atoms/input/Input';
import './SignUp.scss';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = 'Sevice Registration Request';
  const subtitle = '서비스 등록 요청하기';
  const content =
    '\n\u00a0\u00a0• 요청 정보를 작성하여 메세지를 보내시면 빠른 시일 내에 검토하여\n \u00a0\u00a0\u00a0\u00a0 작성하신 연락처(이메일)로 승인여부를 알려 드립니다.\n\n \u00a0 • 서비스를 이용하실 아이디는 작성해주신 이메일을 등록해 드릴 예정입니다.\n\n \u00a0\u00a0• 이미 SEMO 서비스를 이용하고 계신 이메일로 서비스 등록 요청을 주실 경우,\n \u00a0\u00a0\u00a0\u00a0 등록 가능의 사유가 될 수 있습니다.';

  const handleCompanyRegistration = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const emailValidCheck = () => {
    getEmailStatus(
      email,
      ({ data }) => {
        setIsEmailValid(data);
        Swal.fire({
          title: '알림',
          text: '사용 가능한 이메일입니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      },
      (error) => console.log('에러', error)
    );
  };

  const [companyList, getCompanyList] = useState<Company[]>([]);
  useEffect(() => {
    const keyword = '';
    getCompanies(
      keyword,
      ({ data }) => {
        getCompanyList(data.data);
      },
      (error) => console.log('에러', error)
    );
  }, []);

  const companies =
    companyList && companyList.length > 0
      ? companyList.map((item) => {
          const temp = {
            label: `${item.companyName} (${item.taxId})`,
            ...item,
          };
          return temp;
        })
      : [];
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState<number | null>();
  const [ownerName, setOwnerName] = useState('');
  const handleSubmit = () => {
    if (!email || !companyId || !ownerName) {
      Swal.fire({
        title: '알림',
        text: '모든 정보를 입력하세요',
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
    createUserRequest(
      email,
      companyId,
      ownerName,
      (response) => {
        Swal.fire({
          title: '알림',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: '확인',
        });
        navigate('/');
      },
      (error) => console.log(error)
    );
  };

  return (
    <div className="signup__container">
      <div className="signup__image" />
      <div className="signup__content">
        <div className="signup__text-group">
          <Text content={title} type="title" bold />
          <Text content={subtitle} type="subtitle" />
          <Text type="info" content={content} />
        </div>
        <div className="signup__item-group">
          <div className="signup__input-button-group">
            <Input
              type="email"
              placeholder="연락처(이메일)"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(false);
              }}
              size="large"
              shape="line"
            />
            <Button
              type="button"
              label="중복확인"
              size="medium"
              color="primary"
              onClick={emailValidCheck}
            />
          </div>
          <div className="signup__input-button-group">
            <Autocomplete
              disablePortal
              options={companies}
              size="small"
              sx={{
                width: 510,
                borderRadius: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    BorderBottom: 1,
                  },
                },
              }}
              filterOptions={(options, state) => {
                if (state.inputValue) {
                  return options.filter((option) =>
                    option.label
                      .toLowerCase()
                      .includes(state.inputValue.toLowerCase())
                  );
                }
                return options;
              }}
              onInputChange={() => {
                setCompanyId(null);
              }}
              onChange={(event, selectedOption) => {
                if (selectedOption) {
                  setCompanyId(selectedOption.id);
                }
              }}
              renderInput={(params) => <TextField {...params} label="회사명" />}
            />
            <Button
              type="button"
              label="회사등록"
              size="medium"
              color="primary"
              onClick={handleCompanyRegistration}
            />
          </div>
          <Input
            type="text"
            placeholder="관리자 성명"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            size="large"
            shape="line"
          />
          <div className="signup__submit-button">
            <Button
              type="submit"
              label="SEND MESSAGE"
              size="xlarge"
              color="primary"
              radius="oval"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <CompanyRegister isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SignUp;
