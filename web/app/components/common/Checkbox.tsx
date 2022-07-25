import { InputHTMLAttributes } from 'react'
import cl from 'classnames'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
    label: string
}

export default function Checkbox({ label, ...rest }: CheckboxProps) {
    const inputClasses = [
        'w-4',
        'h-4',
        'bg-gray-50',
        'border',
        'border-gray-300',
        'focus:ring-3',
        'focus:rounded-full',
        'focus:ring-sky-300',
        'dark:bg-gray-700',
        'dark:border-gray-600',
        'dark:focus:ring-sky-600',
        'dark:ring-offset-gray-800',
    ]

    return (
        <>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input {...rest} type="checkbox" className={cl(inputClasses)} />
                </div>
                <label className="ml-2 text-md font-medium text-gray-500 dark:text-gray-300">{label}</label>
            </div>
        </>
    )
}
