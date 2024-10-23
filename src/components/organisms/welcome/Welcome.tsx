import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.scss';
import Button from 'components/atoms/button/Button';
import Text from 'components/atoms/text/Text';

const Welcome = () => {
  const navigate = useNavigate();

  const title = 'SEMO 시작하기';
  const content =
    'SEMO는 DATABASE 모니터링 서비스 입니다.\nSEMO는 제공해주시는 DATABASE의 민감 정보를 안전하게 보관하기 위해 노력하며,\nDATABASE의 정보를 외부로 공개할 수 없습니다.\n\n각 사이트마다 혜택을 제공하거나(정부 보안 규제 등), 세계 어디서든 원하는 장소에서\n모니터링 서비스를 사용할 수 있도록 지원합니다.\n\n\n';
  const title2 = '책임';
  const content2 =
    '사용자 데이터를 안전하게 보존할 책임은 SEMO와 SEMO 제품을 활용하는 개발자가 공유합니다.\n\nSEMO는 다음에 대한 책임을 집니다.\n • 데이터가 SEMO 플랫폼에 전송되고 저장될 때 데이터를 안전하게 처리하고\n  신뢰할 수 있는 제품을 제공합니다.\n • 내부 정책에 따라 보안 문제를 식별합니다.\n\n개발자는 다음에 대한 책임을 집니다.\n • SEMO에서 요청하는 DATABASE 정보의 계정 상태를 보장합니다.';

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-content">
      <div className="text-group">
        <Text text={title} type="main-title" />
        <Text text={content} type="main-content" />
        <Text text={title2} type="main-title" />
        <Text text={content2} type="main-content" />
      </div>
      <div className="button-group">
        <Button
          size="xlarge"
          label="서비스 등록 요청하기"
          radius="oval"
          shadow
          type="button"
          onClick={handleSignUpClick}
        />
        <Button
          size="xlarge"
          label="로그인하기"
          radius="oval"
          shadow
          type="button"
          onClick={handleLoginClick}
        />
      </div>
    </div>
  );
};

export default Welcome;
