import React, { ButtonHTMLAttributes } from 'react'
import cl from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
    children: React.ReactNode
}

function getColorScheme(color: string | undefined): string[] {
    switch (color) {
        case 'primary':
            return ['bg-sky-600', 'hover:bg-sky-700', 'active:ring-sky-200']
        case 'success':
            return ['bg-emerald-600', 'hover:bg-emerald-700', 'active:ring-emerald-200']
        case 'warning':
            return ['bg-amber-500', 'hover:bg-amber-600', 'active:ring-amber-800']
        case 'danger':
            return ['bg-rose-500', 'hover:bg-rose-600', 'active:ring-rose-100']
        case 'default':
        default:
            return ['bg-gray-500', 'hover:bg-gray-800', 'active:ring-gray-300']
    }
}

export default function Button({ children, color, ...rest }: ButtonProps) {
    const classes = [
        [...getColorScheme(color)],
        'text-white',
        'focus:outline-none',
        'active:ring-2',
        'rounded-full',
        'text-sm',
        'px-6',
        'py-3',
        'text-center',
        'mr-2',
        'mb-2',
    ]

    return (
        <button type={'button'} className={cl(classes)} {...rest}>
            {children}
        </button>
    )
}
