import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { ProtectedRoute } from '@/components/ProtectedRoute'

import Index from './pages/Index'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Cases from './pages/Cases'
import Lab from './pages/Lab'
import Marketing from './pages/Marketing'
import Financing from './pages/Financing'
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminDentists from './pages/Admin/Dentists'
import AdminPatientsLeads from './pages/Admin/PatientsLeads'
import AdminCases from './pages/Admin/Cases'
import AdminFinancial from './pages/Admin/Financial'
import AdminLogistics from './pages/Admin/Logistics'
import AdminQuality from './pages/Admin/Quality'
import AdminSchoolCommunity from './pages/Admin/SchoolCommunity'
import AdminPrograms from './pages/Admin/Programs'
import AdminRBAC from './pages/Admin/RBAC'
import DentistDashboard from './pages/Dentist/Dashboard'
import DentistAgenda from './pages/Dentist/Agenda'
import DentistPatients from './pages/Dentist/Patients'
import DentistCases from './pages/Dentist/Cases'
import DentistFinancing from './pages/Dentist/Financing'
import DentistMedicalRecord from './pages/Dentist/MedicalRecord'
import DentistChatLab from './pages/Dentist/ChatLab'
import DentistSchool from './pages/Dentist/School'
import DentistCommunity from './pages/Dentist/Community'
import DentistQuality from './pages/Dentist/Quality'
import DentistPrograms from './pages/Dentist/Programs'
import DentistReferrals from './pages/Dentist/Referrals'
import DentistPublicProfile from './pages/Dentist/PublicProfile'
import DentistOnboarding from './pages/Dentist/Onboarding'
import DentistSettings from './pages/Dentist/Settings'
import PatientDashboard from './pages/Patient/Dashboard'
import PatientTreatment from './pages/Patient/Treatment'
import PatientAppointments from './pages/Patient/Appointments'
import PatientPayments from './pages/Patient/Payments'
import PatientProfile from './pages/Patient/Profile'
import PatientSearch from './pages/Patient/Search'

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/financing" element={<Financing />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<Layout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/ortodontistas" element={<AdminDentists />} />
              <Route path="/admin/pacientes-leads" element={<AdminPatientsLeads />} />
              <Route path="/admin/mobilidade" element={<AdminPatientsLeads />} />
              <Route path="/admin/casos" element={<AdminCases />} />
              <Route path="/admin/financeiro" element={<AdminFinancial />} />
              <Route path="/admin/logistica" element={<AdminLogistics />} />
              <Route path="/admin/qualidade" element={<AdminQuality />} />
              <Route path="/admin/programas" element={<AdminPrograms />} />
              <Route path="/admin/escola" element={<AdminSchoolCommunity />} />
              <Route path="/admin/rbac" element={<AdminRBAC />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['dentist']} />}>
            <Route element={<Layout />}>
              <Route path="/dashboard/dentist" element={<DentistDashboard />} />
              <Route path="/dentist/agenda" element={<DentistAgenda />} />
              <Route path="/dentist/patients" element={<DentistPatients />} />
              <Route path="/dentist/cases" element={<DentistCases />} />
              <Route path="/dentist/financing" element={<DentistFinancing />} />
              <Route path="/dentist/medical-record" element={<DentistMedicalRecord />} />
              <Route path="/dentist/chat-lab" element={<DentistChatLab />} />
              <Route path="/dentist/school" element={<DentistSchool />} />
              <Route path="/dentist/community" element={<DentistCommunity />} />
              <Route path="/dentist/quality" element={<DentistQuality />} />
              <Route path="/dentist/programs" element={<DentistPrograms />} />
              <Route path="/dentist/referrals" element={<DentistReferrals />} />
              <Route path="/dentist/public-profile" element={<DentistPublicProfile />} />
              <Route path="/dentist/onboarding" element={<DentistOnboarding />} />
              <Route path="/dentist/settings" element={<DentistSettings />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
            <Route element={<Layout />}>
              <Route path="/dashboard/patient" element={<PatientDashboard />} />
              <Route path="/patient/treatment" element={<PatientTreatment />} />
              <Route path="/patient/appointments" element={<PatientAppointments />} />
              <Route path="/patient/payments" element={<PatientPayments />} />
              <Route path="/patient/search" element={<PatientSearch />} />
              <Route path="/patient/profile" element={<PatientProfile />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
