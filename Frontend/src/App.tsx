import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/Auth'
import { Docinfo } from './pages/DocinfoPage'
import { Patinfo } from './pages/PatinfoPage'
import { PatDash } from './pages/PatDashboard'
import { DocDash } from './pages/DocDashboard'
import { DocSpl } from './pages/Specialists'
import { PatAppointments } from './pages/PatAppointments'
import { Doc_Profile } from './pages/DocProfile'
import { DocAppointments } from './pages/DocAppointments'
import { Give_Feedback } from './pages/GiveFeedback'
import { Pat_Profile } from './pages/PatProfile'
import { Doc_Feedbacks } from './pages/DocFeedbacks'
import { Doc_FeedbackForm } from './pages/Feedback_Form'
import { PatOnlineApt } from './pages/PatOnlineApt'
import { DocPendingOffline } from './pages/DocPendingOffline'
import { DocPendingOnline } from './pages/DocPendingOnline'
import { GetStarted } from './components/GetStarted'
import { DocOnlineAppointments } from './pages/DocOnlineAppointments'
import { Give_Feedback_Online } from './pages/GiveOnlineFeedback'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<GetStarted />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/pat/info' element={<Patinfo />} />
        <Route path='/doc/info' element={<Docinfo />} />
        <Route path='/pat/dashboard' element={<PatDash />} />
        <Route path='/doc/dashboard' element={<DocDash />} />
        <Route path='/pat/dashboard/:type' element={<DocSpl />} />
        <Route path='/pat/appointments' element={<PatAppointments />} />
        <Route path='/doc/profile' element={<Doc_Profile />} />
        <Route path='/doc/offline/appointments' element={<DocAppointments />} />
        <Route path='/doc/online/appointments' element={<DocOnlineAppointments />} />
        <Route path='/pat/offline/feedback/:id' element={<Give_Feedback />} />
        <Route path='/pat/online/feedback/:id' element={<Give_Feedback_Online />} />
        <Route path='/pat/profile' element={<Pat_Profile />} />
        <Route path='/doc/feedbacks' element={<Doc_Feedbacks />} />
        <Route path='/doc/feedbacks/:id' element={<Doc_FeedbackForm />} />
        <Route path='/pat/online_appointments' element={<PatOnlineApt />} />
        <Route path='/doc/pending/offline' element={<DocPendingOffline />} />
        <Route path='/doc/pending/online' element={<DocPendingOnline />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
