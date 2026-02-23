import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ProfilerProvider } from './context/ProfilerContext'
import Welcome from './screens/Welcome'
import Socks from './screens/Socks'
import Razor from './screens/Razor'
import Sports from './screens/Sports'
import Results from './screens/Results'

export default function App() {
  return (
    <LanguageProvider>
      <ProfilerProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/socks" element={<Socks />} />
          <Route path="/razor" element={<Razor />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </ProfilerProvider>
    </LanguageProvider>
  )
}
