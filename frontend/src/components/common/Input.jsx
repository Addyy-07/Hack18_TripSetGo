// src/components/common/Input.jsx
import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, error, helperText, icon, iconRight, type = 'text', className = '', id, required, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          {label}{required && <span style={{ color: 'var(--color-accent-red)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <span style={{ position: 'absolute', left: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', pointerEvents: 'none' }}>
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full bg-surface border border-border rounded-xl text-text-primary font-sans text-[0.9375rem] px-4 py-3 outline-none transition-all duration-150 ease-in-out placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(14,165,233,0.2)] disabled:opacity-50 disabled:cursor-not-allowed ${error ? '!border-accent-red' : ''} ${className}`}
          style={{ paddingLeft: icon ? '2.5rem' : undefined, paddingRight: iconRight ? '2.5rem' : undefined }}
          {...props}
        />
        {iconRight && (
          <span style={{ position: 'absolute', right: '0.75rem', color: 'var(--color-text-muted)', display: 'flex' }}>
            {iconRight}
          </span>
        )}
      </div>
      {error     && <span style={{ fontSize: '0.8125rem', color: 'var(--color-accent-red)' }}>{error}</span>}
      {helperText && !error && <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{helperText}</span>}
    </div>
  )
})

export default Input
