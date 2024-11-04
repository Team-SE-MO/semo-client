import React, { useState, ChangeEvent } from 'react';
import './DatabaseDelete.scss';
import Text from 'components/atoms/text/Text';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';

interface DatabaseDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const DatabaseDelete = ({ isOpen, onClose }: DatabaseDeleteProps) => {
  return <div>DatabaseDelete</div>;
};

export default DatabaseDelete;
