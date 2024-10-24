import React from 'react';
import './ProfileIcon.scss';

interface ProfileIconProps {
  imgUrl?: string;
  arrangement?: 'vertical' | 'horizontal';
}
const ProfileIcon = ({
  imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png',
  arrangement = 'horizontal',
}: ProfileIconProps) => {
  return (
    <div
      className={[
        'profile-image__container',
        `profile-image__container--${arrangement}`,
      ].join(' ')}
    >
      <img src={imgUrl} alt="" className="profile-image__img" />
    </div>
  );
};

export default ProfileIcon;
