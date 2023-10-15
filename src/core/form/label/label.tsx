import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';

const Component = ({ children, label, value, htmlFor }: Type) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative w-full" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <label
        htmlFor={htmlFor}
        className={classNames(
          'absolute left-4 top-1/2 z-10 -translate-y-1/2 !text-base font-normal text-black opacity-30 font-helvetica cursor-pointer transition-all duration-300',
          focus || (value && value.length !== 0) ? '!top-2 !-translate-y-0 !text-xs' : '',
        )}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

type Type = {
  label: string;
  htmlFor: string;
  value?: string;
  children: ReactNode | undefined;
};

export default Component;
