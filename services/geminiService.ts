/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { DESTINATIONS, SERVICES, AGENCY_OFFICES, FAQ_ITEMS } from '../constants';

const getSystemInstruction = () => {
  const destContext = DESTINATIONS.map(d =>
    `- ${d.name} (${d.country}): ${d.description}. Key visas: ${d.visaTypes.join(', ')}. Checklist: ${d.documentChecklist.join('; ')}. Consular note: ${d.consularNotes}`
  ).join('\n');

  const servicesContext = SERVICES.map(s =>
    `- ${s.title}: ${s.description} (Duration: ${s.duration}, Category: ${s.category})`
  ).join('\n');

  const officesContext = AGENCY_OFFICES.map(o =>
    `- Office ${o.city}: ${o.address}. Hours: ${o.hours}. Phone: ${o.phone}`
  ).join('\n');

  return `You are the Senior Advisory Concierge for "LevelFlight", an accredited international travel guidance and consular visa file preparation agency based in the United States.
Tone: Sophisticated, welcoming, legally transparent, and professional. 
Never promise guaranteed visa approvals; remind clients that consulates and embassies hold sole sovereign authority.
Encourage clients to schedule an in-person appointment at one of our agency offices in New York, Washington D.C., Miami, or Los Angeles (or contact us at contact@levelup-ecosystem.com) to audit their original documents.

Destinations offered:
${destContext}

Services:
${servicesContext}

Offices:
${officesContext}

Keep answers concise (under 3-4 sentences), factual, and elegant.`;
};

export const sendMessageToGemini = async (
  history: { role: string; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    let apiKey: string | undefined;

    try {
      apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    } catch (e) {
      // process is likely not defined
    }

    if (!apiKey) {
      // High-quality local fallback based on keywords
      const query = newMessage.toLowerCase();
      if (query.includes('japan') || query.includes('japon')) {
        return "For Japan, visa exemptions apply to many nationalities for stays under 90 days. For required consular visas, we verify return flight itineraries, financial stability proofs, and accommodation certificates. We invite you to schedule a consultation at our agency to audit your dossier.";
      }
      if (query.includes('france') || query.includes('schengen') || query.includes('europe')) {
        return "For France and the Schengen Area (Type C or Long-Stay Visitor), our advisors audit travel health insurance coverage (€30,000+), bank attestations, and accommodation proofs. We recommend booking an in-person meeting 4 to 6 weeks before your departure date.";
      }
      if (query.includes('canada')) {
        return "For Canada (Temporary Resident Visas and eTA), we review proof of ties to your home country and financial stability records. Please book an appointment at any of our agency offices to ensure your application package meets IRCC guidelines.";
      }
      if (query.includes('appointment') || query.includes('rdv') || query.includes('book') || query.includes('office')) {
        return "You can book an in-person consultation directly through our website. Select your preferred agency office in Paris, Geneva, Montreal, or Dubai, choose an available date and time slot, and our team will prepare your private meeting suite.";
      }
      if (query.includes('document') || query.includes('bring') || query.includes('passport')) {
        return "Please bring your original valid passport (and any expired passports showing past travel), recent bank statements (past 3 to 6 months), employment certificates, and your estimated travel schedule to your consultation.";
      }
      return "Welcome to LevelUp Travel. We provide accredited international travel advisory and visa file auditing. You can discover our curated destinations, examine entry checklists, or schedule an in-person consultation with one of our senior advisors.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Our advisor desk is at your service. How may we assist your upcoming journey?";
  } catch (error) {
    console.error("Advisory Concierge Error:", error);
    return "Our senior advisors are available for in-person consultations in Paris, Geneva, Montreal, and Dubai. Please click 'Book Consultation' to secure your appointment slot.";
  }
};
