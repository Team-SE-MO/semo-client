import React from 'react';
import ProfileIcon from 'components/atoms/profile/ProfileIcon';
import Text from 'components/atoms/text/Text';
import './Profile.scss';

interface ProfileProps {
  userName: string;
  arrangement: 'vertical' | 'horizontal';
  onClick?: () => void;
}
const Profile = ({ userName, arrangement, onClick }: ProfileProps) => {
  return (
    <div
      className={['profile', `profile--${arrangement}`].join(' ')}
      onClick={onClick}
      role="presentation"
    >
      <ProfileIcon arrangement={arrangement} />
      <Text text={userName} type="subtitle" />
    </div>
  );
};

export default Profile;
