// src/components/common/Badge.jsx
const variantMap = {
  primary: 'bg-indigo-500/20 text-indigo-300 border border-solid border-indigo-500/30',
  green: 'bg-emerald-500/15 text-emerald-400 border border-solid border-emerald-500/30',
  success: 'bg-emerald-500/15 text-emerald-400 border border-solid border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-400 border border-solid border-amber-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border border-solid border-amber-500/30',
  red: 'bg-red-500/15 text-red-400 border border-solid border-red-500/30',
  danger: 'bg-red-500/15 text-red-400 border border-solid border-red-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-400 border border-solid border-cyan-500/30',
  pro: 'bg-cyan-500/15 text-cyan-400 border border-solid border-cyan-500/30',
  secondary: 'bg-slate-500/15 text-slate-300 border border-solid border-slate-500/30',
}

export default function Badge({ label, variant = 'primary', icon, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[0.75rem] font-semibold px-[0.625rem] py-[0.25rem] rounded-full uppercase tracking-wider ${variantMap[variant] || variantMap.primary} ${className}`}>
      {icon && <span>{icon}</span>}
      {label}
    </span>
  )
}

