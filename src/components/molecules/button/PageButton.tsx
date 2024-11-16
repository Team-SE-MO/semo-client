import React from 'react';
import Button from 'components/atoms/button/Button';

interface PageButtonProps {
  pageNumber: number;
  pageCount: number;
  getPreviousPage: () => void;
  getSpecificPage: (i: number) => void;
  getNextPage: () => void;
}

const PageButton = ({
  pageNumber,
  pageCount,
  getPreviousPage,
  getSpecificPage,
  getNextPage,
  ...props
}: PageButtonProps) => {
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
          onClick={getPreviousPage}
        />
      );
    }
    for (
      let i = pageNumber - 2 > 0 ? pageNumber - 2 : 1;
      i < (pageNumber + 2 > pageCount ? pageCount + 1 : pageNumber + 2);
      i += 1
    ) {
      buttonList.push(
        <Button
          size="xsmall"
          label={`${i}`}
          color={pageNumber === i ? 'primary' : 'other'}
          radius="rounded"
          type="button"
          onClick={() => getSpecificPage(i)}
        />
      );
    }
    if (pageNumber < pageCount) {
      buttonList.push(
        <Button
          size="xsmall"
          label=">"
          color="other"
          radius="rounded"
          type="button"
          onClick={getNextPage}
        />
      );
    }
    return buttonList;
  };
  return <>{buttonRendering()}</>;
};

export default PageButton;
