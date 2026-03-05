import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

// Route-based code splitting — each page is a separate JS chunk
const HomePage      = lazy(() => import('./pages/HomePage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const FAQPage       = lazy(() => import('./pages/FAQPage'))

function PageLoader() {
  return (
    <div className="h-screen flex items-center justify-center bg-cream">
      <div className="w-8 h-8 rounded-full border-2 border-sand border-t-blush animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"          element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
        <Route path="/portfolio" element={<Suspense fallback={<PageLoader />}><PortfolioPage /></Suspense>} />
        <Route path="/faq"       element={<Suspense fallback={<PageLoader />}><FAQPage /></Suspense>} />
      </Route>
    </Routes>
  )
}
