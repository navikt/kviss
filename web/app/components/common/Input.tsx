import { InputHTMLAttributes } from 'react'
import cl from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function Input({ label, ...rest }: InputProps) {
    const inputClasses = [
        'dark:bg-gray-700',
        'dark:border-gray-600',
        'dark:placeholder-gray-400',
        'dark:text-white',
        'dark:focus:border-blue-500',
        'bg-gray-50',
        'border',
        'border-gray-300',
        'text-gray-900',
        'text-md',
        'rounded-lg',
        'focus:ring-blue-500',
        'focus:border-blue-500',
        'block',
        'w-full',
        'p-2.5',
    ]

    return (
        <div className="mb-6">
            <label htmlFor="base-input" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">
                {label}
            </label>
            <input {...rest} className={cl(inputClasses)} />
        </div>
    )
}
