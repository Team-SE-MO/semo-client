import React from 'react';
import './Table.scss';

interface TableProps<T> {
  colWidth: string[];
  headerMeta: string[];
  content: T[];
  RowComponent: React.ComponentType<
    { i: number; content: T } & {
      onDelete?: (loginId: string) => void;
      pageIndex?: number;
      userRole?: string;
    }
  >;
  onDelete?: (loginId: string) => void;
  className?: string;
  pageIndex?: number;
  userRole?: string;
}

const Table = <T,>({
  colWidth,
  headerMeta,
  content,
  RowComponent,
  onDelete,
  className = '',
  pageIndex,
  userRole,
  ...props
}: TableProps<T>) => {
  return (
    <table className={`table ${className}`}>
      <colgroup>
        {colWidth.map((i) => (
          <col width={i} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {headerMeta.map((item) => (
            <th className="table__head">{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((form, index) => (
          <RowComponent
            i={index}
            content={form}
            {...(onDelete && { onDelete })}
            {...(pageIndex && { pageIndex })}
            {...(userRole && { userRole })}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
