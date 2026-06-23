// src/pages/Home/index.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Map, Sparkles, Users, Star, Wallet, Camera, MapPin, Compass, TrendingUp } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const heroFeatures = [
  { icon: <Sparkles size={22} className="text-primary" />, title: 'AI Itinerary', desc: 'Get personalized day by day plans' },
  { icon: <Wallet size={22} className="text-secondary" />,    title: 'Live Budget', desc: 'Track, optimize and stay on budget' },
  { icon: <Map size={22} className="text-accent" />,          title: 'Interactive Maps', desc: 'Explore places with live maps' },
  { icon: <Camera size={22} className="text-primary" />,      title: 'Discover Places', desc: 'Find top attractions and hidden gems' },
  { icon: <Users size={22} className="text-secondary" />,    title: 'Community', desc: 'Share trips and get travel tips' },
]

const popularDestinations = [
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80',
    title: 'Bali, Indonesia',
    desc: 'Relax • Beaches • Culture',
    rating: '4.8 (2.3k)',
    tag: '🔥 Hot',
    tagColor: 'var(--color-accent-red)'
  },
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80',
    title: 'Switzerland',
    desc: 'Mountains • Adventure • Views',
    rating: '4.9 (1.8k)',
    tag: 'Popular',
    tagColor: 'var(--color-accent-green)'
  },
  {
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=80',
    title: 'Santorini, Greece',
    desc: 'Islands • Views • Romance',
    rating: '4.7 (1.6k)',
    tag: 'Trending',
    tagColor: 'var(--color-accent-tertiary)'
  },
  {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80',
    title: 'Dubai, UAE',
    desc: 'Luxury • Shopping • Modern',
    rating: '4.6 (2.1k)',
    tag: '🔥 Hot',
    tagColor: 'var(--color-accent-red)'
  }
]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 70% 30%, rgba(14, 165, 233, 0.1) 0%, transparent 60%)',
      }}>
        {/* Sky-Blue Glow Accent */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 1
        }} />

        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', zIndex: 5, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1 text-[0.75rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border bg-indigo-500/20 text-indigo-300 border-indigo-500/30" style={{ marginBottom: '1.5rem', fontSize: '0.8125rem', padding: '0.35rem 0.85rem' }}>
              ✈️ AI-Powered Travel Planning
            </span>
            
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}>
              Plan Your Dream Trip<br />
              with <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">AI in Seconds</span>
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: 520 }}>
              TripSetGo uses Gemini AI to create personalized itineraries, track budgets, find the best places and explore like never before.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/auth/signup" className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-5 py-2.5 rounded-md cursor-pointer transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap no-underline relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] text-white shadow-[0_4px_14px_0_rgba(14,165,233,0.3)] hover:bg-right hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(129,140,248,0.5)] active:translate-y-0 active:scale-[0.98] px-7 py-3.5 text-base rounded-lg" style={{ boxShadow: 'var(--shadow-btn)' }}>
                Start Planning Free <ArrowRight size={18} />
              </Link>
              <Link to="/discover" className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-5 py-2.5 rounded-md cursor-pointer transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap no-underline relative overflow-hidden bg-transparent text-text-primary border border-border hover:border-primary hover:bg-primary/10 px-7 py-3.5 text-base rounded-lg transition-all duration-250 hover:border-primary/45 hover:shadow-[0_0_40px_rgba(14,165,233,0.25)]">
                Explore Trips
              </Link>
            </div>
          </motion.div>

          {/* Hero Right Visual: Scenic Map & Flight Path */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative', width: '100%', height: '440px', display: 'flex', alignItems: 'center', justifycontent: 'center' }}
          >
            {/* Main Interactive Scenic Frame */}
            <div className="bg-bg-card border border-border rounded-xl p-6 transition-all duration-250 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" style={{
              width: '100%',
              height: '100%',
              padding: 0,
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              position: 'relative',
              background: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80") center center/cover no-repeat',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'var(--shadow-card), 0 0 30px rgba(14, 165, 233, 0.15)'
            }}>
              {/* Dark Overlays for premium legibility */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(8, 17, 34, 0.3) 0%, rgba(8, 17, 34, 0.75) 100%)',
                zIndex: 1
              }} />
              
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 30%, rgba(8, 17, 34, 0.85) 100%)',
                zIndex: 1
              }} />

              {/* Map/Travel Coordinates Overlay UI */}
              <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 10, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="inline-flex items-center gap-1 text-[0.75rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border bg-indigo-500/20 text-indigo-300 border-indigo-500/30" style={{ background: 'rgba(14, 165, 233, 0.2)', backdropFilter: 'blur(8px)', textTransform: 'none', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                  📍 Active Router: TSG-V4
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Mapbox Engine</span>
              </div>

              {/* Flight Path SVG */}
              <svg 
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}
                viewBox="0 0 500 400"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Curved flight path */}
                <path 
                  id="flight-route"
                  d="M 120,180 Q 250,60 380,260" 
                  stroke="url(#svg-path-grad)" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 6" 
                  fill="none" 
                />
                
                <defs>
                  <linearGradient id="svg-path-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="50%" stopColor="var(--secondary)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Animated Plane traversing path */}
              <motion.div
                style={{
                  position: 'absolute',
                  zIndex: 8,
                  offsetPath: "path('M 120,180 Q 250,60 380,260')",
                  offsetRotate: 'auto 90deg',
                  fontSize: '1.35rem',
                  textShadow: '0 0 10px var(--primary)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                animate={{ offsetDistance: ['0%', '100%'] }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                ✈️
              </motion.div>

              {/* Destination 1 Pin & Card: Swiss Alps */}
              <div style={{ position: 'absolute', top: '150px', left: '100px', zIndex: 6, transform: 'translate(-50%, -50%)' }}>
                {/* Pin Dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--secondary)', border: '2px solid white', boxShadow: '0 0 8px var(--secondary)' }} 
                  />
                  <div style={{ height: 10, width: 2, background: 'white' }} />
                </div>
                
                {/* Destination Card Popover */}
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  style={{
                    position: 'absolute',
                    bottom: '22px',
                    left: '-60px',
                    width: '140px',
                    padding: '0.4rem 0.6rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(17, 24, 39, 0.85)',
                    border: '1px solid rgba(20, 184, 166, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=40&h=40&q=80" 
                    alt="Swiss Alps"
                    style={{ width: 28, height: 28, borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Swiss Alps</p>
                    <p style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', margin: 0 }}>Switzerland</p>
                  </div>
                </motion.div>
              </div>

              {/* Destination 2 Pin & Card: Bali */}
              <div style={{ position: 'absolute', top: '270px', left: '380px', zIndex: 6, transform: 'translate(-50%, -50%)' }}>
                {/* Pin Dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', border: '2px solid white', boxShadow: '0 0 8px var(--accent)' }} 
                  />
                  <div style={{ height: 10, width: 2, background: 'white' }} />
                </div>
                
                {/* Destination Card Popover */}
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  style={{
                    position: 'absolute',
                    bottom: '22px',
                    left: '-60px',
                    width: '140px',
                    padding: '0.4rem 0.6rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(17, 24, 39, 0.85)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=40&h=40&q=80" 
                    alt="Bali"
                    style={{ width: 28, height: 28, borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Bali</p>
                    <p style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', margin: 0 }}>Indonesia</p>
                  </div>
                </motion.div>
              </div>

              {/* Floating Widget: Budget counter */}
              <div className="bg-bg-card/75 backdrop-blur-[20px] border border-border shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                zIndex: 10,
                padding: '0.5rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(8, 17, 34, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <Wallet size={16} color="var(--primary)" />
                <div>
                  <p style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)', margin: 0 }}>Realtime Budget</p>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>₹45,500 <span style={{ color: 'var(--secondary)', fontSize: '0.7rem' }}>Saved 25%</span></p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Features Highlights Summary Bar */}
      <section style={{ padding: '0 2rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div className="bg-bg-card/75 backdrop-blur-[20px] border border-border shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '1.75rem 1.25rem',
          borderRadius: 'var(--radius-xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          background: 'rgba(17, 24, 39, 0.75)',
          border: '1px solid rgba(14, 165, 233, 0.15)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}>
          {heroFeatures.map((f, i) => (
            <div key={f.title} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              borderRight: i < heroFeatures.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
              paddingRight: '1rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {f.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.15rem' }}>{f.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.3 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section style={{ padding: '6rem 2rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Explore <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Popular Destinations</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Handpicked spots with optimal AI trip suggestions</p>
          </div>
          <Link to="/discover" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }} className="transition-all duration-250 hover:border-border-hover hover:shadow-glow hover:-translate-y-0.5">
            View All Discoveries <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {popularDestinations.map((d, i) => (
            <motion.div
              key={d.title}
              className="group bg-bg-card border border-border rounded-xl p-6 transition-all duration-250 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                height: '350px',
                padding: 0,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              {/* Background Cover Image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `url("${d.image}") center center/cover no-repeat`,
              }} className="dest-image-bg transition-transform duration-slow group-hover:scale-105" />

              {/* Gradient Dark Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8, 17, 34, 0.95) 0%, rgba(8, 17, 34, 0.4) 60%, transparent 100%)',
                zIndex: 1
              }} />

              {/* Tag (e.g. Hot/Popular) */}
              <span className="inline-flex items-center gap-1 text-[0.75rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border" style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 2,
                background: d.tagColor,
                color: 'white',
                border: 'none',
                fontWeight: 700
              }}>
                {d.tag}
              </span>

              {/* Info Overlay */}
              <div style={{ position: 'relative', zIndex: 2, padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>{d.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.75rem' }}>{d.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                  <Star size={14} fill="currentColor" /> {d.rating}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Highlights Grid */}
      <section style={{ padding: '4rem 2rem 6rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Everything You Need to <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Travel Smarter</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            From AI itinerary generation to group expense splitting, TripSetGo has every feature modern travellers need.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: <Sparkles size={24} />, title: 'AI-Powered Planning', desc: 'Gemini AI generates personalized itineraries with multiple transport, hotel, and activity options.' },
            { icon: <Map size={24} />,      title: 'Interactive Maps',    desc: 'Visualize your entire trip on Mapbox – from source to destination with route visualization.' },
            { icon: <Users size={24} />,    title: 'Group Travel',        desc: 'Plan group trips with Splitwise-style expense splitting and real-time settlement calculations.' },
            { icon: <Compass size={24} />,  title: 'Social Discover',     desc: 'Browse, like, save and clone public trips from a global community of travellers.' },
            { icon: <Star size={24} />,     title: 'Live Budget Tracker', desc: 'Watch your budget update in real-time as you select transport, hotels, food and activities.' },
            { icon: <TrendingUp size={24} />, title: 'Smart Suggestions', desc: 'Get contextual AI tips – upgrade alerts, budget warnings, and adventure recommendations.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-bg-card border border-border rounded-xl p-6 transition-all duration-250 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-border-hover hover:-translate-y-1 hover:shadow-glow-strong hover:bg-[#0e1529]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div style={{
                width: 48,
                height: 48,
                background: 'rgba(14, 165, 233, 0.15)',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                marginBottom: '1rem',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '3rem 2rem 6rem', textAlign: 'center' }}>
        <div className="bg-bg-card/75 backdrop-blur-[20px] border border-border shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] animate-fadeIn" style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '4.5rem 2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(14, 165, 233, 0.15)',
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(8, 17, 34, 0.95) 100%)',
          boxShadow: 'var(--shadow-glow-strong)'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to Plan Your Next <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Adventure?</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: 500, margin: '0 auto 2.5rem' }}>
            Create your first AI-powered itinerary in under a minute – no credit card needed.
          </p>
          <Link to="/auth/signup" className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-5 py-2.5 rounded-md cursor-pointer transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap no-underline relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] text-white shadow-[0_4px_14px_0_rgba(14,165,233,0.3)] hover:bg-right hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(129,140,248,0.5)] active:translate-y-0 active:scale-[0.98] px-7 py-3.5 text-base rounded-lg" style={{ boxShadow: 'var(--shadow-btn)' }}>
            Get Started – It's Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border)', padding: '2.5rem 2rem', background: '#070d1a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifycontent: 'space-between', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: 20 }}>✈️</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.15rem' }}>
              Trip<span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">SetGo</span>
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} TripSetGo • AI-Powered Travel Planning
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/discover" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>Discover</Link>
            <Link to="/auth/signup" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>Sign Up</Link>
            <Link to="/auth/login" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}