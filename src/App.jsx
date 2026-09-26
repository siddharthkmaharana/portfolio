import { useState } from 'react'
import './App.css'

// Modular Components
import PersonalInfo from './components/PersonalInfo'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Credentials from './components/Credentials'
import TIL from './components/TIL'
import Designs from './components/Designs'
import Stats from './components/Stats'
import { ScheduleModal, TopScheduleButton } from './components/ScheduleModal'

const TABS = ['Projects', 'Experience', 'Credentials', 'TIL', 'Designs', 'Stats']

function App() {
  const [activeTab, setActiveTab] = useState('Projects')
  const [dark, setDark] = useState(true)
  const [scheduleOpen, setScheduleOpen] = useState(false)

  return (
    <div className={dark ? 'app dark' : 'app light'}>
      <div className="layout-frame">
        <main className="page-shell">
          {/* LEFT SIDEBAR: PERSONAL INFO & SKILLS */}
          <PersonalInfo
            dark={dark}
            setDark={setDark}
            onScheduleCall={() => setScheduleOpen(true)}
          />

          {/* RIGHT MAIN CONTENT SECTION */}
          <section className="content-section" id="content">
            {/* TAB NAVIGATION & TOP RIGHT SCHEDULE CALL */}
            <div className="tab-bar-wrapper">
              <nav className="tab-bar" aria-label="Portfolio sections">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              <TopScheduleButton onClick={() => setScheduleOpen(true)} />
            </div>

            {/* TAB BODY VIEWS */}
            <div className="content-body">
              {activeTab === 'Projects' && <Projects dark={dark} />}
              {activeTab === 'Experience' && <Experience />}
              {activeTab === 'Credentials' && <Credentials />}
              {activeTab === 'TIL' && <TIL />}
              {activeTab === 'Designs' && <Designs />}
              {activeTab === 'Stats' && <Stats />}
            </div>
          </section>
        </main>
      </div>

      {/* BOOKING MODAL */}
      {scheduleOpen && <ScheduleModal onClose={() => setScheduleOpen(false)} />}
    </div>
  )
}

export default App
