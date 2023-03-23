import React, { ButtonHTMLAttributes } from 'react'
import cl from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
    children: React.ReactNode
}

function getColorScheme(): string[] {
    return ['transition', 'ease-in-out', 'delay-50', 'bg-gray-900', 'hover:bg-gray-1000', 'active:ring-gray-300']
}

export default function Button({ children, ...rest }: ButtonProps) {
    const classes = [
        [...getColorScheme()],
        'text-gray-400',
        'focus:outline-none',
        'active:ring-2',
        'rounded-full',
        'text-md',
        'px-3',
        'py-1',
        'text-center',
        'mr-1',
        'mb-1',
    ]

    return (
        <button type={'button'} className={cl(classes)} {...rest}>
            {children}
        </button>
    )
}
