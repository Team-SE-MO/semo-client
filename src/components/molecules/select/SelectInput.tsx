import React from 'react';

interface SelectInputProps<T> {
  listName: string;
  selectList: T[];
  SelectComponent: React.ComponentType<{ data: T }>;
}
const SelectInput = <T extends { id: number }>({
  listName,
  selectList,
  SelectComponent,
  ...props
}: SelectInputProps<T>) => {
  return (
    <datalist id={listName}>
      {selectList &&
        selectList.map((item) => <SelectComponent data={item} key={item.id} />)}
    </datalist>
  );
};

export default SelectInput;
