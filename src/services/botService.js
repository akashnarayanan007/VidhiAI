import { searchLaws as localSearch } from './lawService';
import { getSettings } from './progressService';

const API_BASE = '/api/bot';

export async function sendMessage(message, history = []) {
  const settings = getSettings();
  const apiKey = settings.apiKey || '';

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, apiKey }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.reply;
  } catch (err) {
    // Fallback: try direct Claude call from browser
    if (apiKey) {
      return callClaudeDirect(message, history, apiKey);
    }
    throw err;
  }
}

async function callClaudeDirect(message, history, apiKey) {
  const SYSTEM_PROMPT = `You are Nyaya Bot, an expert Indian legal assistant designed for civil services exam preparation and legal education. You have comprehensive knowledge of:
- Indian Constitution (all 448 Articles)
- All Indian laws: BNS, BNSS, BSA, CPC, Contract Act, Companies Act, Consumer Protection Act, RTI, IT Act, all Family Laws, Labour Laws, Tax Laws, Environmental Laws, Intellectual Property Laws, and 900+ Central Acts
- Supreme Court and High Court landmark judgments
- Constitutional writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto)
- Legal procedures, court hierarchy, and legal professionals
- Loopholes in Indian laws and how courts have addressed them

Always provide:
- Which law/section applies
- Simple explanation
- Example
- Relevant cases
- Loopholes if asked
- UPSC angle if relevant

Response format: Clear, structured, educational. Use simple language.
You are for EDUCATIONAL purposes only. Always add: Consult a lawyer for actual legal advice.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        ...(history || []),
        { role: 'user', content: message },
      ],
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${res.status}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

export async function searchLaws(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(`${API_BASE}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json();
    return data.results || [];
  } catch {
    // Fallback to client-side search
    return localSearch(query).slice(0, 20);
  }
}

export const SUGGESTED_QUESTIONS = [
  'Explain Article 21 with cases',
  'What are fundamental rights?',
  'Difference between IPC and BNS?',
  'When can police arrest without warrant?',
  'What is habeas corpus?',
  'Loopholes in Section 498A',
  'How to file a consumer complaint?',
  'What is PIL?',
  'Explain Section 101 BNS (Murder)',
  'What are my rights if arrested?',
  'How to file RTI?',
  'What is marital rape exception?',
  'Explain Section 138 NI Act',
  'Landlord not returning deposit',
  'Salary not paid for 3 months',
  'What is res judicata?',
  'Difference between theft and extortion',
  'What is the basic structure doctrine?',
  'Explain writ of mandamus',
  'What is the scope of Article 14?',
  'Can a woman be arrested at night?',
  'What is anticipatory bail?',
  'Explain POSH Act 2013',
  'Right to privacy under Article 21',
];
