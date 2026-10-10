/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationsSection } from './components/DestinationsSection';
import { DestinationDetail } from './components/DestinationDetail';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { OfficesAndContact } from './components/OfficesAndContact';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { Destination, ViewState, Appointment } from './types';
import { INITIAL_APPOINTMENTS } from './constants';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });

  // Persistent appointments state
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('levelup_travel_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // Fallback
    }
    return INITIAL_APPOINTMENTS;
  });

  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPrefillDest, setBookingPrefillDest] = useState<string | undefined>(undefined);
  const [bookingPrefillService, setBookingPrefillService] = useState<string | undefined>(undefined);

  // Sync appointments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('levelup_travel_appointments', JSON.stringify(appointments));
    } catch (e) {
      // Ignore
    }
  }, [appointments]);

  const handleOpenBooking = (destinationName?: string, serviceTitle?: string) => {
    setBookingPrefillDest(destinationName);
    setBookingPrefillService(serviceTitle);
    setIsBookingOpen(true);
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleUpdateAppointmentStatus = (
    id: string,
    newStatus: Appointment['status'],
    notes?: string
  ) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: newStatus,
              internalNotes: notes !== undefined ? notes : apt.internalNotes,
            }
          : apt
      )
    );
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-gold-500/30 selection:text-navy-950">
      {/* Sticky Luxury Navbar */}
      <Navbar
        currentView={view}
        onNavigate={(newView) => setView(newView)}
        onBookClick={() => handleOpenBooking()}
      />

      <main>
        {view.type === 'home' && (
          <>
            {/* Real Professional Cinematic Hero */}
            <Hero
              onBookAppointment={() => handleOpenBooking()}
              onExploreDestinations={() => scrollToSection('destinations')}
            />

            {/* Destinations Section */}
            <DestinationsSection
              onSelectDestination={(dest) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'destination', destination: dest });
              }}
              onBookForDestination={(destName) => handleOpenBooking(destName)}
            />

            {/* Visa & Travel Services Section */}
            <ServicesSection
              onBookService={(serviceTitle) => handleOpenBooking(undefined, serviceTitle)}
            />

            {/* 4-Step How It Works Process */}
            <HowItWorks onBookClick={() => handleOpenBooking()} />

            {/* About LevelUp Travel */}
            <AboutSection />

            {/* Physical Agency Offices & Contact */}
            <OfficesAndContact
              onBookOffice={(officeId) => handleOpenBooking()}
            />

            {/* FAQ */}
            <FAQSection />
          </>
        )}

        {view.type === 'destination' && (
          <DestinationDetail
            destination={view.destination}
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('destinations'), 50);
            }}
            onBookAppointment={(destName) => handleOpenBooking(destName)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(id) => {
          if (view.type !== 'home') {
            setView({ type: 'home' });
            setTimeout(() => scrollToSection(id), 100);
          } else {
            scrollToSection(id);
          }
        }}
        onBookClick={() => handleOpenBooking()}
      />

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        existingAppointments={appointments}
        onAppointmentCreated={handleAppointmentCreated}
        prefilledDestination={bookingPrefillDest}
        prefilledService={bookingPrefillService}
      />
    </div>
  );
}

export default App;
