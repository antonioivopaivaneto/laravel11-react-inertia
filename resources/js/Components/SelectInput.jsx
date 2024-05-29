import { Children, forwardRef, useRef } from 'react';

export default forwardRef(function SelectInput({ className = '', children ,...props }, ref) {
    const input = ref ? ref : useRef();


    return (
        <select
            {...props}
            type="select"
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
          {children}
        </select>
    );
});
