import React, { useEffect, useState } from 'react';
import './Text.scss';

interface TextProps {
  content?: string;
  type:
    | 'main-title'
    | 'main-content'
    | 'title'
    | 'subtitle'
    | 'info'
    | 'link'
    | 'highlight'
    | 'detail';
  color?: 'primary' | 'success' | 'danger' | 'link-color' | 'neutral' | 'light';
  bold?: boolean;
  underline?: boolean;
  initialTime?: number;
  resetTimer?: number;
  onClick?: () => void;
  startNumber?: number;
  endNumber?: number;
  totalItems?: number;
}

const Text = ({
  content = '',
  type = 'subtitle',
  color = 'primary',
  initialTime,
  resetTimer,
  bold = false,
  underline = false,
  startNumber,
  endNumber,
  totalItems,
  ...props
}: TextProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime || 0);
  if (initialTime) {
    useEffect(() => {
      setTimeLeft(initialTime);
      let alertShown = false;

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (!alertShown) {
              alert('코드를 재발급 받으세요');
              alertShown = true;
            }
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [resetTimer, initialTime]);
  }
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // TODO : 부모에게서 해당 처리 함수 받을지 현재 요소에서 처리할지 생각
  // 페이징 텍스트 로직
  // const paginationText =
  //   totalItems !== undefined &&
  //   itemsPerPage !== undefined &&
  //   currentPage !== undefined
  //     ? `${(currentPage) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} items`
  //     : '';

  const listText =
    startNumber && endNumber && totalItems
      ? `${startNumber}-${endNumber} of ${totalItems} items`
      : '';

  return (
    <div
      className={[
        'text',
        `text__${type}`,
        `text--${color}`,
        bold ? 'text--bold' : '',
        underline ? 'text--underline' : '',
      ].join(' ')}
      {...props}
    >
      {content}
      {timeLeft > 0 && (
        <span className="text--red">{formatTime(timeLeft)}</span>
      )}
      {listText && <div className="pagination-text">{listText}</div>}
    </div>
  );
};

export default Text;
