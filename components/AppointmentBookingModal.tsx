/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Download,
  Building2,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { Appointment } from '../types';
import { AGENCY_OFFICES, DESTINATIONS, SERVICES } from '../constants';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingAppointments: Appointment[];
  onAppointmentCreated: (appointment: Appointment) => void;
  prefilledDestination?: string;
  prefilledService?: string;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  existingAppointments,
  onAppointmentCreated,
  prefilledDestination,
  prefilledService,
}) => {
  // Step state: 1 (Format & Office), 2 (Date & Time), 3 (Contact)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [appointmentType, setAppointmentType] = useState<Appointment['appointmentType']>(
    'In-Person Agency Consultation'
  );
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('new-york-fifth-ave');
  const [destination, setDestination] = useState<string>(prefilledDestination || 'Japan');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>(
    prefilledService || 'Individual Travel Consultation'
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');

  // Contact inputs (US placeholders)
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
  ];

  const isSlotBooked = (date: string, slot: string, officeId: string) => {
    return existingAppointments.some(
      (apt) =>
        apt.date === date &&
        apt.timeSlot === slot &&
        apt.agencyOffice === officeId &&
        apt.status !== 'Cancelled'
    );
  };

  const selectedOffice =
    AGENCY_OFFICES.find((o) => o.id === selectedOfficeId) || AGENCY_OFFICES[0];

  const handleStepOneNext = () => {
    setErrorMsg(null);
    setStep(2);
  };

  const handleStepTwoNext = () => {
    setErrorMsg(null);
    if (!selectedDate || !selectedTimeSlot) {
      setErrorMsg('Please select a date and an available time slot.');
      return;
    }
    if (isSlotBooked(selectedDate, selectedTimeSlot, selectedOfficeId)) {
      setErrorMsg('This time slot is already booked. Please choose another time.');
      return;
    }
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setErrorMsg('Please enter your full name, email address, and phone number.');
      return;
    }

    if (!customerEmail.includes('@') || !customerEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        referenceNumber: `LF-US-${randomSuffix}`,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        appointmentType,
        destinationOfInterest: destination,
        serviceId: selectedServiceTitle,
        agencyOffice: selectedOfficeId,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        message: message.trim() || undefined,
        status: 'Requested',
        internalNotes: `Consultation request for ${destination} at ${selectedOffice.city} office.`,
        createdAt: new Date().toISOString(),
      };

      onAppointmentCreated(newAppointment);
      setConfirmedAppointment(newAppointment);
      setIsSubmitting(false);
    }, 400);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedAppointment) return;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LevelFlight//Appointment Advisory//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedAppointment.referenceNumber}@levelup-ecosystem.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${confirmedAppointment.date.replace(/-/g, '')}T140000Z`,
      `DTEND:${confirmedAppointment.date.replace(/-/g, '')}T150000Z`,
      `SUMMARY:LevelFlight Consultation - ${confirmedAppointment.destinationOfInterest} (${confirmedAppointment.referenceNumber})`,
      `DESCRIPTION:LevelFlight Travel Advisory\\nType: ${confirmedAppointment.appointmentType}\\nOffice: ${selectedOffice.name} - ${selectedOffice.address}\\nDirect: ${selectedOffice.phone}\\nEmail: contact@levelup-ecosystem.com`,
      `LOCATION:${selectedOffice.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LevelFlight-${confirmedAppointment.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setConfirmedAppointment(null);
    setStep(1);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setMessage('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C2A26]/50 backdrop-blur-sm z-[70] transition-opacity duration-300"
        onClick={resetAndClose}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[540px] md:w-[600px] bg-[#FAF8F5] z-[80] shadow-2xl border-l border-[#D6D1C7] flex flex-col transform transition-transform duration-300 ease-out">
        {/* Header - Simple & Pro */}
        <div className="p-6 md:p-8 border-b border-[#E6E1D6] flex items-center justify-between bg-[#F5F2EB]">
          <div>
            <h2 className="text-2xl font-serif text-[#2C2A26] font-normal tracking-tight">
              Schedule Consultation
            </h2>
            <p className="text-xs text-[#78716C] mt-1 font-light">
              United States agency suites & private video advisory.
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 text-[#78716C] hover:text-[#2C2A26] transition-colors rounded-full hover:bg-black/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Progress Bar */}
        {!confirmedAppointment && (
          <div className="px-6 md:px-8 pt-4 pb-3.5 bg-[#FAF8F5] border-b border-[#E6E1D6]">
            {/* 3-segment progress indicator */}
            <div className="grid grid-cols-3 gap-2 mb-2.5">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  step >= 1 ? 'bg-[#2C2A26]' : 'bg-[#E6E1D6]'
                }`}
              />
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  step >= 2 ? 'bg-[#2C2A26]' : 'bg-[#E6E1D6]'
                }`}
              />
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  step >= 3 ? 'bg-[#2C2A26]' : 'bg-[#E6E1D6]'
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`transition-colors text-left ${
                  step === 1
                    ? 'text-[#2C2A26] font-semibold'
                    : 'text-[#A8A29E] hover:text-[#78716C]'
                }`}
              >
                1. Consultation
              </button>
              <button
                type="button"
                disabled={step < 2}
                onClick={() => setStep(2)}
                className={`transition-colors text-center ${
                  step === 2
                    ? 'text-[#2C2A26] font-semibold'
                    : step > 2
                    ? 'text-[#78716C] hover:text-[#2C2A26]'
                    : 'text-[#C5BFB5] cursor-default'
                }`}
              >
                2. Schedule
              </button>
              <span
                className={`text-right ${
                  step === 3 ? 'text-[#2C2A26] font-semibold' : 'text-[#C5BFB5]'
                }`}
              >
                3. Contact
              </span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-[#F5EBE6] border-l-2 border-[#C86446] text-[#7A3E2C] text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {confirmedAppointment ? (
            /* Confirmation Receipt View */
            <div className="space-y-6 py-2 animate-fade-in-up">
              <div className="text-center space-y-2 pb-6 border-b border-[#E6E1D6]">
                <div className="w-12 h-12 bg-[#EAE5D9] rounded-full flex items-center justify-center mx-auto text-[#2C2A26] mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#8B734B]" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8B734B] block">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl font-serif text-[#2C2A26]">
                  Reference: {confirmedAppointment.referenceNumber}
                </h3>
                <p className="text-xs text-[#78716C] font-light">
                  A confirmation has been sent to {confirmedAppointment.customerEmail}
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 bg-white border border-[#E6E1D6] space-y-3.5 text-xs">
                <div className="flex justify-between items-center pb-2.5 border-b border-[#E6E1D6]">
                  <span className="text-[#78716C] uppercase font-mono text-[10px]">Destination:</span>
                  <span className="font-serif text-sm text-[#2C2A26]">
                    {confirmedAppointment.destinationOfInterest}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-[#E6E1D6]">
                  <span className="text-[#78716C] uppercase font-mono text-[10px]">Session Format:</span>
                  <span className="font-medium text-[#2C2A26]">
                    {confirmedAppointment.appointmentType}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-[#E6E1D6]">
                  <span className="text-[#78716C] uppercase font-mono text-[10px]">Date & Time:</span>
                  <span className="font-mono text-[#2C2A26]">
                    {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between items-start pb-2.5 border-b border-[#E6E1D6]">
                  <span className="text-[#78716C] uppercase font-mono text-[10px] shrink-0">Office Address:</span>
                  <span className="text-right text-[#2C2A26] max-w-[280px]">
                    {selectedOffice.address}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C] uppercase font-mono text-[10px]">Applicant:</span>
                  <span className="font-mono text-[#2C2A26]">
                    {confirmedAppointment.customerName} ({confirmedAppointment.customerPhone})
                  </span>
                </div>
              </div>

              {/* Concise note */}
              <div className="p-3.5 bg-[#F5F2EB] border border-[#E6E1D6] text-xs text-[#5D5A53] font-light flex items-center justify-between">
                <span>Support: contact@levelup-ecosystem.com</span>
                <span className="font-mono text-[11px] text-[#8B734B]">{selectedOffice.phone}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={handleDownloadCalendar}
                  className="flex-1 py-3.5 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Add to Calendar (.ICS)
                </button>
                <button
                  onClick={resetAndClose}
                  className="py-3.5 px-6 border border-[#D6D1C7] hover:border-[#2C2A26] text-[#2C2A26] text-xs font-medium uppercase tracking-widest transition-colors text-center"
                >
                  Close
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Format & Office */
            <div className="space-y-6 animate-fade-in-up">
              {/* Consultation Format */}
              <div>
                <label className="block text-xs font-serif text-[#2C2A26] mb-2.5">
                  Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { title: 'In-Person', sub: 'Private agency suite', value: 'In-Person Agency Consultation' },
                    { title: 'Video Call', sub: 'Secure remote session', value: 'Video Conference Advisory' },
                    { title: 'Document Review', sub: 'File & checklist audit', value: 'Document & File Audit' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => setAppointmentType(item.value as any)}
                      className={`p-3.5 text-left border transition-all ${
                        appointmentType === item.value
                          ? 'border-[#2C2A26] bg-[#F5F2EB] ring-1 ring-[#2C2A26]'
                          : 'border-[#E6E1D6] bg-white hover:border-[#A8A29E]'
                      }`}
                    >
                      <span className="block font-serif text-sm text-[#2C2A26] font-medium mb-0.5">
                        {item.title}
                      </span>
                      <span className="block text-[11px] text-[#78716C] font-light">
                        {item.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination & Service selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif text-[#2C2A26] mb-1.5">
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white border border-[#E6E1D6] py-3 px-3 text-xs text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.country})
                      </option>
                    ))}
                    <option value="Other International Destination">
                      Other Destination
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif text-[#2C2A26] mb-1.5">
                    Advisory Service
                  </label>
                  <select
                    value={selectedServiceTitle}
                    onChange={(e) => setSelectedServiceTitle(e.target.value)}
                    className="w-full bg-white border border-[#E6E1D6] py-3 px-3 text-xs text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Office Selection (United States) */}
              <div>
                <label className="block text-xs font-serif text-[#2C2A26] mb-2.5">
                  Select US Agency Office
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AGENCY_OFFICES.map((office) => (
                    <button
                      type="button"
                      key={office.id}
                      onClick={() => setSelectedOfficeId(office.id)}
                      className={`p-3.5 text-left border transition-all ${
                        selectedOfficeId === office.id
                          ? 'border-[#2C2A26] bg-[#F5F2EB] ring-1 ring-[#2C2A26]'
                          : 'border-[#E6E1D6] bg-white hover:border-[#A8A29E]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <strong className="font-serif text-sm text-[#2C2A26] font-medium">
                          {office.city}
                        </strong>
                        <span className="text-[10px] font-mono text-[#8B734B] uppercase tracking-wider">
                          USA
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C] line-clamp-1 font-light">
                        {office.address}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-3 border-t border-[#E6E1D6]">
                <button
                  type="button"
                  onClick={handleStepOneNext}
                  className="w-full py-4 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            /* STEP 2: Date & Available Slots */
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <label className="block text-xs font-serif text-[#2C2A26] mb-1.5">
                  Consultation Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-[#E6E1D6] py-3 px-4 text-xs text-[#2C2A26] font-mono outline-none focus:border-[#2C2A26] transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-serif text-[#2C2A26]">
                    Available Time Slot
                  </label>
                  <span className="text-[11px] font-mono text-[#78716C]">
                    Office Time (EST/PST)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => {
                    const booked = isSlotBooked(selectedDate, slot, selectedOfficeId);
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-3 px-2 text-center text-xs font-mono transition-all border ${
                          booked
                            ? 'bg-[#EAE5D9]/40 text-[#A8A29E] border-[#E6E1D6] line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#2C2A26] text-[#FAF8F5] border-[#2C2A26]'
                            : 'bg-white text-[#2C2A26] border-[#E6E1D6] hover:border-[#2C2A26]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Office preview */}
              <div className="p-4 bg-[#F5F2EB] border border-[#E6E1D6] text-xs text-[#5D5A53] space-y-1">
                <span className="font-serif text-[#2C2A26] font-medium block">
                  Location: {selectedOffice.name}
                </span>
                <p className="text-[11px] text-[#78716C] font-light">{selectedOffice.address}</p>
                <p className="text-[11px] font-mono text-[#8B734B]">{selectedOffice.hours}</p>
              </div>

              {/* Nav */}
              <div className="pt-3 border-t border-[#E6E1D6] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-4 px-6 border border-[#D6D1C7] hover:border-[#2C2A26] text-[#2C2A26] text-xs font-medium uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleStepTwoNext}
                  className="flex-1 py-4 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Contact</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* STEP 3: Simple & Clean Contact Form */
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-sm font-serif text-[#2C2A26] mb-0.5">
                  Contact Information
                </h3>
                <p className="text-xs text-[#78716C] font-light">
                  Please provide your details to confirm your appointment.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-[#D6D1C7] py-2.5 px-3.5 text-sm text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@levelup-ecosystem.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-white border border-[#D6D1C7] py-2.5 px-3.5 text-sm text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-1">
                      Direct Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (212) 555-0198"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-[#D6D1C7] py-2.5 px-3.5 text-sm text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-1">
                    Short Note / Planned Travel Dates (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Traveling in May, assistance with consular file preparation..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#D6D1C7] py-2.5 px-3.5 text-sm text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Simple subtle reassurance badge */}
              <div className="py-2.5 px-3.5 bg-[#F5F2EB] border border-[#E6E1D6] text-[11px] text-[#78716C] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B734B] shrink-0" />
                <span>No advance payment required · Direct agency confirmation</span>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#E6E1D6] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-4 px-6 border border-[#D6D1C7] hover:border-[#2C2A26] text-[#2C2A26] text-xs font-medium uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming...</span>
                  ) : (
                    <>
                      <span>Confirm & Book Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
