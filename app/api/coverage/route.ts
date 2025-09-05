import { NextResponse } from "next/server";

type Status = 'available' | 'in_build' | 'soon' | 'not_available';

interface Normalized {
  provider: string;
  tech: 'FTTH' | 'FTTC' | 'FTTB' | 'ADSL' | string;
  status: Status;
  maxDownMbps?: number;
  maxUpMbps?: number;
  estimatedActivationDays?: number;
  notes?: string;
  offersUrl?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = (searchParams.get('country') || 'IT').trim();
  const city = (searchParams.get('city') || '').trim();
  const postalCode = (searchParams.get('postalCode') || '').trim();
  const street = (searchParams.get('street') || '').trim();
  const civic = (searchParams.get('civic') || '').trim();

  if (!country || !city || !(postalCode || street) || !civic) {
    return NextResponse.json({ error: 'Parametri mancanti' }, { status: 400 });
  }

  // ---- MOCK DATA (replace with real provider adapters) ----
  const results: Normalized[] = [
    { provider: 'Open Fiber', tech: 'FTTH', status: 'available', maxDownMbps: 2500, maxUpMbps: 500, estimatedActivationDays: 5, notes: 'ONT richiesto', offersUrl: 'https://www.openfiber.it/' },
    { provider: 'FiberCop / TIM Wholesale', tech: 'FTTC', status: 'soon', maxDownMbps: 200, maxUpMbps: 20, estimatedActivationDays: 30, notes: 'Lavori armadio in completamento', offersUrl: 'https://www.tim.it/' },
    { provider: 'Fastweb', tech: 'FTTH', status: 'in_build', maxDownMbps: 1000, maxUpMbps: 200, estimatedActivationDays: 60, notes: 'Cantierizzazione prevista', offersUrl: 'https://www.fastweb.it/' },
  ];

  if (!results.length) return new Response(null, { status: 204 });

  return NextResponse.json({
    query: { country, city, postalCode, street, civic },
    results
  });
}
