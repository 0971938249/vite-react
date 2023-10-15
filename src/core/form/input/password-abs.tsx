import React, { useState } from 'react';
import { Eye, EyeSlash } from '@svgs';
import { Label } from '../label';

const Component = ({
  value = '',
  name,
  placeholder,
  disabled,
  ...prop
}: {
  value?: string;
  name: string;
  placeholder: string;
  disabled: boolean;
}) => {
  const [toggle, set_toggle] = useState(true);

  return (
    <Label label={placeholder} value={value || ''} htmlFor={name}>
      <input
        value={value}
        // placeholder={placeholder}
        disabled={disabled}
        {...prop}
        type={toggle ? 'password' : 'text'}
        className="w-full text-base text-black !font-helvetica font-normal pl-4 pr-10 pb-2 pt-[22px] !rounded-sm outline-none ant-input border"
      />
      {!toggle && (
        <Eye
          onClick={() => set_toggle(!toggle)}
          className="absolute top-1/2 -translate-y-1/2 right-3 z-20 w-5 h-5 fill-black fill-eye cursor-pointer"
        />
      )}
      {toggle && (
        <EyeSlash
          onClick={() => set_toggle(!toggle)}
          className="absolute top-1/2 -translate-y-1/2 right-3 z-20 w-5 h-5 fill-black fill-eye cursor-pointer"
        />
      )}
    </Label>
  );
};
export default Component;
