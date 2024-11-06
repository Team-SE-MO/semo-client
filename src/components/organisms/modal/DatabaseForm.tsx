import React, { useState } from 'react';
import './DatabaseForm.scss';
import Text from 'components/atoms/text/Text';
import { TextField } from '@mui/material';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
import Toast from '../../atoms/toast/Toast';

interface DatabaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'register' | 'edit';
}

const DatabaseForm = ({
  isOpen,
  onClose,
  mode = 'register',
}: DatabaseFormProps) => {
  const [databaseAlias, setDatabaseAlias] = useState('');
  const [type, setType] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState<number | null>(null);
  const [sid, setSid] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastStatus, setToastStatus] = useState<'success' | 'failed'>(
    'success'
  );

  const title =
    mode === 'register' ? 'Registering Database' : 'Modifying the Database';
  const subtitle =
    mode === 'register' ? '데이터베이스 등록' : '데이터베이스 수정';

  const databaseTypeList = [
    {
      id: 1,
      type: 'ORACLE',
    },
    {
      id: 2,
      type: 'POSTGRESQL',
    },
    {
      id: 3,
      type: 'MYSQL',
    },
    {
      id: 4,
      type: 'MARIADB',
    },
    {
      id: 5,
      type: 'SQLSERVER',
    },
  ];

  const validateInputs = () => {
    if (
      !databaseAlias ||
      !type ||
      !ip ||
      !port ||
      !sid ||
      !username ||
      !password
    ) {
      alert('모든 필드를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleTestConnection = () => {
    if (!validateInputs()) return;

    // api 연결
    console.log('입력된 데이터:', { type, ip, port, sid, username, password });
    // 응답에 따라 Toast 상태 변경
    setToastStatus(false ? 'success' : 'failed');
    setToastVisible(true);
  };

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const submitData = {
      databaseAlias,
      type,
      ip,
      port,
      sid,
      username,
      password,
    };

    // TODO: axios 인터페이스 설정 시 해당 요청 api 연결
    console.log('제출할 데이터:', submitData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="database-form__container">
      <div className="database-form__content">
        <div className="database-form__title">
          <Text content={title} type="title" bold />
          <Text content={subtitle} type="subtitle" />
        </div>
        <div className="database-form__type">
          <Autocomplete
            disablePortal
            options={databaseTypeList}
            size="small"
            getOptionLabel={(option) => option.type}
            sx={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
            filterOptions={(options, state) => {
              if (state.inputValue) {
                return options.filter((option) =>
                  option.type
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                );
              }
              return options;
            }}
            onInputChange={(event, newInputValue) => {
              setType(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="DATABASE TYPE"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            )}
          />
        </div>
        <div className="database-form__form">
          <div className="database-form__input">
            <Input
              type="text"
              placeholder="DATABASE ALIAS"
              value={databaseAlias}
              onChange={(e) => setDatabaseAlias(e.target.value)}
              size="large"
              shape="line"
            />
          </div>
          <div className="database-form__input">
            <Input
              type="text"
              placeholder="IP"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              size="large"
              shape="line"
            />
          </div>
          <div className="database-form__input">
            <Input
              type="text"
              size="large"
              shape="line"
              placeholder="PORT"
              value={port === null ? '' : String(port)}
              onChange={(e) => {
                const { value } = e.target;
                if (value === '') {
                  setPort(null);
                } else if (/^\d+$/.test(value)) {
                  setPort(parseInt(value, 10));
                }
              }}
            />
          </div>
          <div className="database-form__input">
            <Input
              type="text"
              placeholder="SID"
              value={sid}
              onChange={(e) => setSid(e.target.value)}
              size="large"
              shape="line"
            />
          </div>
          <div className="database-form__input">
            <Input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="large"
              shape="line"
            />
          </div>
          <div className="database-form__input">
            <Input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              shape="line"
            />
          </div>

          <div className="database-form__connection">
            <Text
              type="link"
              content="Test Connection"
              color="link-color"
              underline
              onClick={handleTestConnection}
            />
            <div className="database-form__toast">
              <Toast
                status={toastStatus}
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
              />
            </div>
          </div>
        </div>
        <div className="database-form__button">
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
  );
};

export default DatabaseForm;
