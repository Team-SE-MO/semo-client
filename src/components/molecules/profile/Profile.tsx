import React from 'react';
import ProfileIcon from 'components/atoms/profile/ProfileIcon';
import Text from 'components/atoms/text/Text';
import './Profile.scss';

interface ProfileProps {
  userName: string;
}
const Profile = ({ userName }: ProfileProps) => {
  return (
    <div className="profile__container">
      <ProfileIcon arrangement="horizontal" />
      <Text text={userName} type="subtitle" />
    </div>
  );
};

export default Profile;
