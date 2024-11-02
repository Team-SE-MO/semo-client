import React from 'react';
import Button from 'components/atoms/button/Button';

interface PageButtonProps {
  pageNumber: number;
  totalPages: number;
}

const PageButton = ({ pageNumber, totalPages, ...props }: PageButtonProps) => {
  const buttonRendering = () => {
    const buttonList = [];
    if (pageNumber !== 1) {
      buttonList.push(
        <Button
          size="xsmall"
          label="<"
          color="other"
          radius="rounded"
          type="button"
          // TODO: 이전 페이지 보기 onClick 구현
        />
      );
    }
    for (
      let i = pageNumber - 2 > 0 ? pageNumber - 2 : 1;
      i < (pageNumber + 2 > totalPages ? totalPages + 1 : pageNumber + 2);
      i += 1
    ) {
      buttonList.push(
        <Button
          size="xsmall"
          label={`${i}`}
          color={pageNumber === i ? 'primary' : 'other'}
          radius="rounded"
          type="button"
          // TODO: 해당 페이지 보기 onClick 구현
        />
      );
    }
    if (pageNumber < totalPages) {
      buttonList.push(
        <Button
          size="xsmall"
          label=">"
          color="other"
          radius="rounded"
          type="button"
          // TODO: 다음 페이지 보기 onClick 구현
        />
      );
    }
    return buttonList;
  };
  return <>{buttonRendering()}</>;
};

export default PageButton;
