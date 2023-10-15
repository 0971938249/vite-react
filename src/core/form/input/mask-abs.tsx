import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { FormInstance } from 'antd';
import { Label } from '../label';

const Component = ({
  mask,
  name,
  value,
  addonBefore,
  addonAfter,
  form,
  disabled,
  maxLength,
  placeholder,
  onBlur,
  onChange,
  ...prop
}: Type) => {
  const input = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (mask && input.current) {
        // @ts-ignore
        import('inputmask').then(({ default: Inputmask }) => Inputmask(mask).mask(input.current));
      }
    });
  }, []);

  const addonBoolean = {
    'ant-input': !addonBefore && !addonAfter,
    'border rounded-xl': !addonBefore && !addonAfter,
    'rounded-l-xl border-r': !addonBefore && !!addonAfter,
    'rounded-r-xl border-l': !!addonBefore && !addonAfter,
    'border-r border-l': !!addonBefore && !!addonAfter,
    'bg-zinc-100 border-none focus:shadow-none text-zinc-400': disabled,
  };

  return (
    <div className={classNames('flex items-center', { 'ant-input': !!addonBefore || !!addonAfter })}>
      {!!addonBefore && <div>{addonBefore(form)}</div>}
      <Label label={placeholder} value={value || ''} htmlFor={name}>
        <input
          ref={input}
          name={name}
          className={classNames(
            'w-full text-base text-black !font-helvetica font-normal px-4 pb-2 pt-[22px] !rounded-sm outline-none',
            addonBoolean,
          )}
          readOnly={disabled}
          value={value || ''}
          maxLength={maxLength}
          // placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          {...prop}
        />
      </Label>
      {!!addonAfter && <div>{addonAfter(form)}</div>}
    </div>
  );
};
type Type = {
  name: string;
  mask?: string;
  value?: string;
  addonBefore?: (form: FormInstance) => JSX.Element;
  addonAfter?: (form: FormInstance) => JSX.Element;
  form: FormInstance;
  disabled: boolean;
  maxLength?: number;
  placeholder: string;
  onBlur: (e: any) => any;
  onChange: (e: any) => any;
};
export default Component;
