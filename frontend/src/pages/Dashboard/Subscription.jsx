// src/pages/Dashboard/Subscription.jsx
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, Crown, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { fetchSubscriptionStatus, fetchPlans, createOrder, verifyPayment, selectSubscription } from '@/features/subscription/subscriptionSlice'
import Badge from '@/components/common/Badge'

const PLANS_FALLBACK = [
  {
    id: 'free', name: 'Free', price: 0, period: 'forever',
    features: ['5 AI trip plans/day', 'Discover feed', 'Basic export', 'Group trips (up to 3)'],
    cta: 'Current Plan',
  },
  {
    id: 'pro', name: 'Pro', price: 499, period: 'month',
    features: ['Unlimited AI trip plans', 'Priority Gemini AI', 'Mapbox route maps', 'PDF/Excel export', 'Unlimited group trips', 'Early access features'],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
]

const FAQS = [
  {
    q: "How many trips can I plan with the Free plan?",
    a: "The Free plan allows you to plan up to 5 AI-powered itineraries per day, which resets daily. You can also explore public community trips and collaborate with up to 3 group members."
  },
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes, absolutely! There are no long-term contracts. You can cancel your subscription at any time directly from this portal with a single click, and you will maintain access to your Pro features until the end of your billing cycle."
  },
  {
    q: "What premium features are included in Pro?",
    a: "Pro tier unlocks unlimited AI trip planning, priority Gemini AI processing, interactive Mapbox route overlays, high-fidelity PDF/Excel data exports, unlimited group travel collaborators, and early access to all new dashboard updates."
  },
  {
    q: "Are payments secure?",
    a: "Yes, all payments are securely processed by Razorpay. We do not store any credit card information on our servers, ensuring your payment details remain completely secure and encrypted."
  }
]

export default function Subscription() {
  const dispatch     = useDispatch()
  const subscription = useSelector(selectSubscription)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    dispatch(fetchSubscriptionStatus())
    dispatch(fetchPlans())
  }, [dispatch])

  const plans = subscription.plans.length ? subscription.plans : PLANS_FALLBACK

  const handleUpgrade = async (planId) => {
    const res = await dispatch(createOrder(planId))
    if (!res.error && res.payload) {
      const { orderId, amount, currency } = res.payload
      // Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount, currency, order_id: orderId, name: 'TripSetGo Pro',
        description: 'Monthly subscription',
        handler: async (response) => {
          const result = await dispatch(verifyPayment({ ...response, planId }))
          if (!result.error) {
            window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message: 'Payment successful! Pro activated.' } }))
          } else {
            window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Payment verification failed. Please contact support.' } }))
          }
        },
        theme: { color: '#0EA5E9' },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    }
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="animate-fadeIn max-w-[1000px] mx-auto pb-16">
      
      {/* Visual Header */}
      <div className="text-center mb-14 relative">
        {/* Glow Accent */}
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[radial-gradient(circle,rgba(14,165,233,0.15)_0%,transparent_70%)] blur-[40px] pointer-events-none z-0" />

        <h1 className="text-4xl font-black mb-3 font-['Plus_Jakarta_Sans',sans-serif] z-10 relative">
          Choose Your Perfect <span className="bg-gradient-primary bg-clip-text text-transparent">Adventure Plan</span>
        </h1>
        <p className="text-text-secondary text-base max-w-[500px] mx-auto z-10 relative">
          Unlock Gemini-powered itineraries, interactive route maps, and real-time group expense splitting.
        </p>
        
        {subscription.plan === 'pro' && (
          <div className="mt-5 z-10 relative">
            <Badge label="✓ Pro Tier Active" variant="green" />
          </div>
        )}
      </div>

      {/* High-Tech Usage Tracker */}
      {subscription.usage && (
        <div className="bg-bg-glass backdrop-blur-[20px] border border-border shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] max-w-[540px] mx-auto mb-16 p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] bg-[rgba(17,24,39,0.7)]">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="font-extrabold text-[0.95rem] m-0">Today's Account Usage</p>
              <p className="text-xs text-text-secondary m-0">Daily AI trip plans generation limits</p>
            </div>
            <span className="font-extrabold text-base text-primary">
              {subscription.usage.searchesToday} <span className="text-text-muted font-normal">/ {subscription.usage.searchLimit}</span>
            </span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden relative border border-[rgba(255,255,255,0.03)]">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-[width] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_10px_var(--primary)]"
              style={{
                width: `${Math.min((subscription.usage.searchesToday / subscription.usage.searchLimit) * 100, 100)}%`,
              }} 
            />
          </div>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="flex gap-8 justify-center flex-wrap mb-24">
        {plans.map((plan, i) => {
          const isPro = plan.id === 'pro'
          const active = subscription.plan === plan.id
          
          return (
            <motion.div 
              key={plan.id} 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`w-[340px] rounded-3xl py-10 px-8 relative overflow-hidden flex flex-col justify-between transition-all duration-250 ease-out hover:-translate-y-1 hover:border-primary ${
                isPro 
                  ? 'bg-[rgba(17,24,39,0.8)] border border-primary shadow-[0_0_35px_rgba(14,165,233,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]' 
                  : 'bg-bg-card border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Pro Background Watermark SVG Flight Path */}
              {isPro && (
                <svg 
                  className="absolute top-0 right-0 w-[150px] h-[150px] opacity-15 pointer-events-none z-0"
                  viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10,80 Q50,20 90,80" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                  <text x="45" y="45" fill="var(--primary)" fontSize="10">✈</text>
                </svg>
              )}

              {/* Tag/Badge for Premium */}
              {isPro && (
                <div className="absolute top-4 right-4 bg-gradient-to-br from-primary to-accent py-1 px-3 rounded-full text-[0.65rem] font-extrabold text-white tracking-wider flex items-center gap-1 z-10">
                  {/* Pulsing Dot */}
                  <span className="w-[5px] h-[5px] rounded-full bg-white inline-block shadow-[0_0_6px_white] animate-pulse" />
                  RECOMMENDED
                </div>
              )}

              <div className="z-10">
                {/* Plan Header */}
                <div className="flex items-center gap-2 mb-5">
                  {isPro ? <Crown size={22} color="#f59e0b" style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))' }} /> : <Zap size={22} color="var(--primary)" />}
                  <h2 className="font-extrabold text-[1.35rem] m-0">{plan.name}</h2>
                </div>

                {/* Plan Price */}
                <div className="mb-8">
                  <span className="text-[3rem] font-black tracking-tight text-white">
                    {plan.id === 'free' ? 'Free' : '₹100'}
                  </span>
                  {plan.id !== 'free' && (
                    <span className="text-text-secondary text-sm ml-1">
                      /{plan.period}
                    </span>
                  )}
                  {isPro && (
                    <p className="text-primary text-[0.75rem] font-bold mt-1 mb-0">
                      🔥 Limited time: Save 80% today
                    </p>
                  )}
                </div>

                <div className="h-[1px] bg-border my-0 mb-6" />

                {/* Features List */}
                <ul className="list-none flex flex-col gap-3 mb-10 p-0">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <Check size={15} color="var(--secondary)" className="flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={active}
                onClick={() => plan.id !== 'free' && handleUpgrade(plan.id)}
                className={`w-full py-4 px-7 text-[0.95rem] font-bold rounded-2xl inline-flex items-center justify-center gap-2 transition-all duration-250 ease-out outline-none z-10 ${
                  active 
                    ? 'bg-[rgba(255,255,255,0.05)] text-text-muted cursor-not-allowed opacity-50 border border-solid border-[rgba(255,255,255,0.08)]' 
                    : `${
                        isPro 
                          ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-[0_4px_14px_0_rgba(14,165,233,0.3)] border-none' 
                          : 'bg-transparent text-white border border-solid border-border'
                      } cursor-pointer opacity-100 hover:-translate-y-[2px] hover:scale-[1.02] hover:brightness-110 active:translate-y-0 active:scale-[0.98]`
                }`}
              >
                {active ? '✓ Current Plan' : (plan.id === 'pro' ? 'Upgrade to Pro' : 'Choose Free')}
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Accordion FAQ Section */}
      <div className="border-t border-solid border-border pt-16">
        <div className="text-center mb-12">
          <div className="inline-flex p-2 bg-[rgba(14,165,233,0.1)] rounded-full text-primary mb-3">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-sm">Everything you need to know about TripSetGo pricing and billing</p>
        </div>

        <div className="flex flex-col gap-4 max-w-[680px] mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div 
                key={index} 
                className="bg-bg-glass backdrop-blur-[20px] border border-border shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] rounded-xl overflow-hidden transition-colors duration-150 ease-out"
              >
                {/* Question Row */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 bg-transparent border-none cursor-pointer flex justify-between items-center text-left text-white font-bold text-[0.95rem] outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} color="var(--primary)" /> : <ChevronDown size={16} color="var(--color-text-muted)" />}
                </button>

                {/* Answer Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-0 text-sm text-text-secondary leading-relaxed border-t border-solid border-[rgba(255,255,255,0.03)]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
