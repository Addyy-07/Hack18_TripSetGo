// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gradient-hero)', textAlign: 'center', padding: '2rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p style={{ fontSize: '8rem', fontWeight: 900, lineHeight: 1 }} className="bg-gradient-primary bg-clip-text text-transparent">404</p>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>The destination you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-250 ease-out whitespace-nowrap no-underline relative overflow-hidden bg-gradient-primary bg-[length:200%_auto] text-white shadow-btn hover:bg-right hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(129,140,248,0.5)] active:translate-y-0 active:scale-[0.98] active:shadow-btn">
          <ArrowLeft size={16} /> Go Home
        </Link>
      </motion.div>
    </div>
  )
}
