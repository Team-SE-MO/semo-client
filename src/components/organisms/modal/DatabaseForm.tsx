import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import './DatabaseForm.scss';
import Text from 'components/atoms/text/Text';
import { TextField } from '@mui/material';
import Button from 'components/atoms/button/Button';
import Input from 'components/atoms/input/Input';
import Toast from 'components/atoms/toast/Toast';
import Swal from 'sweetalert2';

interface DatabaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'register' | 'edit';
  editData?: {
    databaseAlias: string;
    type: string;
    ip: string;
    port: number;
    sid: string;
    username?: string;
    password?: string;
  };
}

const DatabaseForm = ({
  isOpen,
  onClose,
  mode,
  editData,
}: DatabaseFormProps) => {
  const [databaseAlias, setDatabaseAlias] = useState(
    mode === 'edit' && editData ? editData.databaseAlias : ''
  );
  const [type, setType] = useState(
    mode === 'edit' && editData ? editData.type : ''
  );
  const [ip, setIp] = useState(mode === 'edit' && editData ? editData.ip : '');
  const [port, setPort] = useState<number | null>(
    mode === 'edit' && editData ? editData.port : null
  );
  const [sid, setSid] = useState(
    mode === 'edit' && editData ? editData.sid : ''
  );
  const [username, setUsername] = useState(
    mode === 'edit' && editData?.username ? editData.username : ''
  );
  const [password, setPassword] = useState(
    mode === 'edit' && editData?.password ? editData.password : ''
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastStatus, setToastStatus] = useState<'success' | 'failure'>(
    'failure'
  );
  const [message, setMessage] = useState('');

  const title =
    mode === 'register' ? 'Registering Database' : 'Modifying the Database';
  const subtitle =
    mode === 'register' ? '데이터베이스 등록' : '데이터베이스 수정';

  const databaseTypeList = [
    {
      label: 'ORACLE',
    },
    {
      label: 'POSTGRESQL',
    },
    {
      label: 'MYSQL',
    },
    {
      label: 'MARIADB',
    },
    {
      label: 'SQLSERVER',
    },
  ];

  const validateInputs = () => {
    if (!databaseAlias || !type || !ip || !port || !sid || !username) {
      Swal.fire({
        title: '알림',
        text: '필수 필드를 모두 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return false;
    }
    return true;
  };

  const handleTestConnection = () => {
    if (!validateInputs()) return;

    // TODO: api 연결
    // 응답코드에 따라 Toast 상태 변경 및 응답에 대한 'message를 전달해야함
    setToastStatus(true ? 'success' : 'failure');
    // setMessage('info 메세지가 담/길 예정'); // 응답 메세지 입력
    setToastVisible(true);
  };

  // 모든 입력값 초기화하는 함수
  const resetForm = () => {
    setDatabaseAlias('');
    setType('');
    setIp('');
    setPort(null);
    setSid('');
    setUsername('');
    setPassword('');
    setToastVisible(false);
    setMessage('');
  };

  useEffect(() => {
    if (!isOpen) {
      if (mode === 'register') {
        resetForm();
      }
    } else if (mode === 'edit' && editData) {
      setDatabaseAlias(editData.databaseAlias);
      setType(editData.type);
      setIp(editData.ip);
      setPort(editData.port);
      setSid(editData.sid);
      setUsername(editData.username || '');
      setPassword(editData.password || '');
    }
  }, [isOpen, mode, editData]);

  const handleClose = () => {
    if (mode === 'register') {
      resetForm();
    }
    onClose();
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

  return (
    <div className="database-form__background">
      <div className="database-form__modal-container">
        <div className="database-form__title">
          <Text content={title} type="title" bold />
          <Text content={subtitle} type="subtitle" />
        </div>

        <div className="database-form__content">
          <Autocomplete
            disablePortal
            options={databaseTypeList}
            size="small"
            value={
              databaseTypeList.find((option) => option.label === type) || null
            }
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
                  option.label
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

          <div className="database-form__input">
            <Input
              type="text"
              placeholder="DATABASE ALIAS"
              value={databaseAlias}
              onChange={(e) => setDatabaseAlias(e.target.value)}
              size="large"
              shape="line"
            />
            <Input
              type="text"
              placeholder="IP"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              size="large"
              shape="line"
            />
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
            <Input
              type="text"
              placeholder="SID"
              value={sid}
              onChange={(e) => setSid(e.target.value)}
              size="large"
              shape="line"
            />
            <Input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="large"
              shape="line"
            />
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
                type={toastStatus}
                message={`${toastStatus}: ${message}`}
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
              />
            </div>
          </div>
          <div className="database-form__button-group">
            <Button
              size="large"
              type="button"
              label="CANCEL"
              color="other"
              radius="oval"
              shadow
              onClick={handleClose}
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

export default DatabaseForm;
