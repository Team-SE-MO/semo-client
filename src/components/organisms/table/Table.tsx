import React from 'react';

interface TableProps<T> {
  colWidth: string[];
  headerMeta: string[];
  content: T[];
  RowComponent: React.ComponentType<{ i: number; data: T }>;
}

const Table = <T,>({
  colWidth,
  headerMeta,
  content,
  RowComponent,
  ...props
}: TableProps<T>) => {
  return (
    <table className="table">
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
          <RowComponent i={index} data={form} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
