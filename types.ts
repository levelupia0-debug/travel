/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Europe' | 'Asia' | 'North America' | 'Middle East' | 'Oceania';
  tagline: string;
  description: string;
  overview: string;
  imageUrl: string;
  gallery: string[];
  visaTypes: string[];
  documentChecklist: string[];
  consularNotes: string;
  popularPeriod: string;
  advisoryFee: string;
  isPopular?: boolean;
}

export interface TravelService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  feeNotice: string;
  deliverables: string[];
  requirements: string[];
  category: 'Consultation' | 'Visa Assistance' | 'File Audit' | 'Relocation';
}

export interface AgencyOffice {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  transit: string;
  advisors: string[];
  mapCoord?: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentType:
    | 'Video Conference Advisory'
    | 'Document & File Audit'
    | 'Priority Travel Briefing'
    | 'In-Person Agency Consultation';
  destinationOfInterest: string;
  serviceId?: string;
  agencyOffice: string;
  date: string;
  timeSlot: string;
  message?: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';
  internalNotes?: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Appointments' | 'Visa Requirements' | 'Fees & Policies';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'destinations' }
  | { type: 'destination'; destination: Destination }
  | { type: 'services' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'booking'; prefilledDestination?: string; prefilledService?: string }
  | { type: 'confirmation'; appointment: Appointment };
