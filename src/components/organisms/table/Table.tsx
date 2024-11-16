import React from 'react';
import './Table.scss';

interface TableProps<T> {
  colWidth: string[];
  headerMeta: string[];
  content: T[];
  RowComponent: React.ComponentType<
    { i: number; content: T } & { onDelete?: (loginId: string) => void }
  >;
  onDelete?: (loginId: string) => void;
  className?: string;
}

const Table = <T,>({
  colWidth,
  headerMeta,
  content,
  RowComponent,
  onDelete,
  className = '',
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
            {...(onDelete ? { onDelete } : {})}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
