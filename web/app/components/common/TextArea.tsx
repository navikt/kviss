import React from 'react'
import { TextareaHTMLAttributes } from 'react'
import cl from 'classnames'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
}

export default function TextArea({ label, ...rest}: TextAreaProps) {
    const textAreaClasses = [
        'dark:bg-gray-700',
        'dark:border-gray-600',
        'dark:placeholder-gray-400',
        'dark:text-white',
        'dark:focus:border-blue-500',
        'bg-gray-50',
        'border',
        'border-gray-300',
        'text-gray-900',
        'rounded-lg',
        'focus:ring-blue-500',
        'focus:border-blue-500',
        'block',
        'w-full',
        'p-2.5',
    ]
    
    return (
        <div className='mb-6'>
            <label htmlFor='base-input' className='block mb-2 text-md font-medium text-gray-300 dark:text-gray-300'>
                {label}
            </label>
            <textarea {...rest} className={cl(textAreaClasses)} cols={50}/>
        </div>
    )
}