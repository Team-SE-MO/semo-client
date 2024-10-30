import Button from 'components/atoms/button/Button';
import React from 'react';

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
        />
      );
    }
    for (let i = 1; i < totalPages + 1; i += 1) {
      buttonList.push(
        <Button
          size="xsmall"
          label={`${i}`}
          color={pageNumber === i ? 'primary' : 'other'}
          radius="rounded"
          type="button"
        />
      );
    }
    if (pageNumber < totalPages) {
      buttonList.push(
        <Button
          size="xsmall"
          label="<"
          color="other"
          radius="rounded"
          type="button"
        />
      );
    }
    return buttonList;
  };
  return <>{buttonRendering()}</>;
};

export default PageButton;
