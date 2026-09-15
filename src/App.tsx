import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BookingProvider } from "./context/BookingProvider";
import { AboutPage } from "./pages/About";
import { BookingPage } from "./pages/Booking";
import { ContactPage } from "./pages/Contact";
import { HomePage } from "./pages/Home";
import { CancellationPage, PrivacyPage, TermsPage } from "./pages/Legal";
import { ServicesPage } from "./pages/Services";
import { ViewBookingPage } from "./pages/ViewBooking";

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking/view" element={<ViewBookingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cancellation" element={<CancellationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}
