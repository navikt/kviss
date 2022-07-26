import cl from 'classnames'
import { InputHTMLAttributes } from 'react'

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string
}

export default function Radio({ label, ...rest }: RadioProps) {
    const inputClasses = [
        'w-4',
        'h-4',
        'text-sky-600',
        'bg-gray-100',
        'border-gray-300',
        'focus:ring-sky-500',
        'dark:focus:ring-sky-600',
        'dark:ring-offset-gray-800',
        'focus:ring-2',
        'dark:bg-gray-700',
        'dark:border-gray-600',
    ]

    return (
        <label className="flex items-center mb-4 ml-2 text-md font-medium text-gray-900 dark:text-gray-300">
            {label}
            <input type="radio" {...rest} className={cl(inputClasses)} />
        </label>
    )
}
