import './App.css'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import HeroSection from '../src/components/HeroSection'
import WhyChooseUs from '../src/components/WhyChooseUs'
import Packages from '../src/components/Packages'
import PackageDetails from '../src/Details/PackageDetails'
import Query from './components/Query'
import PatientStory from './components/PatientStory'
import PatientStoryDetails from './Details/PatientStoryDetails'
import Healthcheck from './pages/HealthCheck'
import News from './components/News'
import NewsDetails from './Details/NewsDetails'
import SpecialityDetails from './Details/SpecialityDetails'
import AllSpecialities from './pages/AllSpecialities'
import AllStories from './pages/AllStory'
import QueryForm from './forms/QeryForm'
import NewsPage from './pages/NewsPage'
import Doctors from './pages/Doctors'
import DoctorDetails from './Details/DoctorDetails'
import AppointmentPage from './pages/ApointmentPage'
import AboutUs from './pages/AboutUs'
import ScrollToTop from './components/ScrollToTop'
import TeleConsult from './pages/TeleConsult'
import PackageBookingForm from './forms/PackageBookingForm'
import OnlineReportPage from './pages/OnlinReport'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <WhyChooseUs />
            <Packages />
            <Query />
            <PatientStory />
            <News />


          </>
        } />

        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/story/:id" element={<PatientStoryDetails />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/spec/:id" element={<SpecialityDetails />} />
        <Route path="/health-check" element={<Healthcheck />} />
        <Route path="/all-spec" element={<AllSpecialities />} />
        <Route path="/all-story" element={<AllStories />} />
        <Route path="/query" element={<QueryForm />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/apointment" element={<AppointmentPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/consult" element={<TeleConsult />} />
        <Route path="/book-package/:packageId" element={<PackageBookingForm />} />
        <Route path="/report" element={<OnlineReportPage />} />



      </Routes>
    </>
  )
}

export default App