import React from 'react';
import './Input.scss';
/*
  // input value는 keyword로 관리
  const [keyword, setKeyword] = useState('');

  // input value 상태 관리 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 체크 박스 선택 항목 목록
  const items = ['ADMIN', 'USER'];
  // 선택된 값을 담을 set
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  //선택됐으면 checkedItems에 담고 선택 취소할 경우 set에서 삭제
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (isChecked) {
      newCheckedItems.add(value);
    } else {
      newCheckedItems.delete(value);
    }
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="App">
      // 체크 박스
      {items.map((item) => (
        <Input
          type="checkbox"
          value={item}
          onChange={(e) => checkedItemHandler(item, e.target.checked)}
        />
      ))}
      <p>{checkedItems}</p>
      // 텍스트 input
      <Input
        type="text"
        placeholder="id"
        shape="line"
        size="small"
        value={keyword}
        onChange={handleInputChange}
      />
    </div>
  );
*/
interface InputProps {
  size?: 'small' | 'medium' | 'large' | 'no-size';
  type?: 'text' | 'email' | 'password' | 'checkbox';
  shape?: 'line' | 'area' | 'none';

  // checkbox
  value: string;

  // text, email, password, select
  placeholder?: string;

  // select
  selectItems?: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  size = 'no-size',
  type,
  shape = 'none',
  value = '',
  placeholder = '',
  selectItems,
  onChange,
  ...props
}: InputProps) => {
  const inputClass = [
    'input',
    `input--${size}`,
    `input--${shape}`,
    type && `input__${type}`,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <input
      list={!type ? selectItems : undefined}
      type={type || 'text'}
      className={inputClass}
      value={value}
      onChange={onChange}
      {...(placeholder ? { placeholder } : {})}
      {...props}
    />
  );
};

export default Input;
