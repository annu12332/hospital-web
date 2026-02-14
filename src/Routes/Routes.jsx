import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PackageDetails from '../Details/PackageDetails';
import NewsBlogDetails from './pages/NewsBlogDetails';
import PatientStoryDetails from '../Details/PatientStoryDetails';
import HealthCheck from '../pages/HealthCheck';
import NewsDetails from '../Details/NewsDetails';
import SpecialityDetails from '../Details/SpecialityDetails';
import AllSpecialities from '../pages/AllSpecialities';
import AllStories from '../pages/AllStory';
import QueryForm from '../forms/QeryForm';
import NewsPage from '../pages/NewsPage';
import Doctors from '../pages/Doctors';
import DoctorDetails from '../Details/DoctorDetails';
import AppointmentPage from '../pages/ApointmentPage';
import AboutUs from '../pages/AboutUs';
import TeleConsult from '../pages/TeleConsult';
import PackageBookingForm from '../forms/PackageBookingForm';
import OnlineReportPage from '../pages/OnlinReport';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/blog/:id" element={<NewsBlogDetails />} />
            <Route path="/story/:id" element={<PatientStoryDetails />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            <Route path="/spec/:id" element={<SpecialityDetails />} />
            <Route path="/health-check" element={<HealthCheck />} />
            <Route path="/all-spec" element={<AllSpecialities />} />
            <Route path="/all-story" element={<AllStories />} />
            <Route path="/query" element={<QueryForm />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/apointment" element={<AppointmentPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/consult" element={<TeleConsult />} />
            <Route path="/report" element={<OnlineReportPage />} />

            <Route path="/book-package/:packageId" element={<PackageBookingForm />} />






            <Route path="*" element={<div className="pt-24 text-center">404 - Page Not Found</div>} />


        </Routes>
    );
};

export default AppRoutes;