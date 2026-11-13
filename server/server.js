import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

import seedRouter from './routes/seed.js';
app.use('/api', seedRouter);

const SYSTEM_PROMPT = `You are Nyaya Bot, an expert Indian legal assistant designed for civil services exam preparation and legal education. You have comprehensive knowledge of:
- Indian Constitution (all 448 Articles)
- All Indian laws: BNS, BNSS, BSA, CPC, Contract Act, Companies Act, Consumer Protection Act, RTI, IT Act, all Family Laws, Labour Laws, Tax Laws, Environmental Laws, Intellectual Property Laws, and 900+ Central Acts
- Supreme Court and High Court landmark judgments
- Constitutional writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto)
- Legal procedures, court hierarchy, and legal professionals
- Loopholes in Indian laws and how courts have addressed them

You can answer:
1. By law name: "Tell me about Section 302 BNS" → give full details
2. By article number: "Explain Article 21" → full explanation
3. By scenario: "My landlord is not returning deposit" → identify applicable laws
4. By UPSC questions: "What are the loopholes in UAPA?" → detailed answer
5. By legal concept: "What is res judicata?" → clear explanation

Always provide:
- Which law/section applies
- Simple explanation
- Example
- Relevant cases
- Loopholes if asked
- UPSC angle if relevant

Response format: Clear, structured, educational. Use simple language.
You are for EDUCATIONAL purposes only. Always add: Consult a lawyer for actual legal advice.`;

// In production, serve the built frontend
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Chat endpoint
app.post('/api/bot/chat', async (req, res) => {
  try {
    const { message, history = [], apiKey = '' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // If an API key is provided, use Claude
    if (apiKey) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
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

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      return res.json({ reply: data.content[0].text });
    }

    // Fallback: generate a smart response using laws.json
    const lawsPath = path.join(__dirname, '..', 'src', 'data', 'laws.json');
    let lawsData = [];
    try {
      lawsData = JSON.parse(fs.readFileSync(lawsPath, 'utf-8'));
    } catch {
      return res.json({ reply: getFallbackResponse(message) });
    }

    const reply = generateResponse(message, lawsData);
    return res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return res.json({
      reply: `I apologize, but I encountered an issue. ${error.message}. Please try asking your question differently, or check your API key in Settings. Remember: I'm here for educational purposes only — consult a lawyer for actual legal advice.`,
    });
  }
});

// Law search endpoint
app.post('/api/bot/search', (req, res) => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.json({ results: [] });
    }

    const lawsPath = path.join(__dirname, '..', 'src', 'data', 'laws.json');
    const lawsData = JSON.parse(fs.readFileSync(lawsPath, 'utf-8'));
    const q = query.toLowerCase();

    let results = lawsData.filter(l =>
      l.sectionNumber?.toLowerCase().includes(q) ||
      l.title?.toLowerCase().includes(q) ||
      l.lawName?.toLowerCase().includes(q) ||
      l.shortName?.toLowerCase().includes(q) ||
      l.tags?.some(t => t.toLowerCase().includes(q)) ||
      l.aiSearchKeywords?.some(k => k.toLowerCase().includes(q))
    ).slice(0, 20);

    res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.json({ results: [] });
  }
});

function generateResponse(message, lawsData) {
  const q = message.toLowerCase();

  // Check for specific section/article number
  const sectionMatch = q.match(/(?:section|sec|s\.?)\s*(\d+[a-z]?)/i);
  const articleMatch = q.match(/(?:article|art)\s*(\d+[a-z]?)/i);

  let matchedLaw = null;
  if (sectionMatch) {
    const secNum = sectionMatch[1].toUpperCase();
    matchedLaw = lawsData.find(l =>
      l.sectionNumber?.toLowerCase().includes(`section ${secNum}`.toLowerCase()) ||
      l.sectionNumber?.toLowerCase().includes(`s.${secNum}`.toLowerCase())
    );
  }
  if (!matchedLaw && articleMatch) {
    const artNum = articleMatch[1];
    matchedLaw = lawsData.find(l =>
      l.sectionNumber?.toLowerCase() === `article ${artNum}`.toLowerCase()
    );
  }

  // Check for law names
  const lawKeywords = [
    { name: 'bns', full: 'Bharatiya Nyaya Sanhita' },
    { name: 'bnss', full: 'Bharatiya Nagarik Suraksha Sanhita' },
    { name: 'bsa', full: 'Bharatiya Sakshya Adhiniyam' },
    { name: 'cpc', full: 'Code of Civil Procedure' },
    { name: 'ipc', full: 'Indian Penal Code' },
    { name: 'it act', full: 'Information Technology Act' },
    { name: 'rti', full: 'Right to Information Act' },
    { name: 'pocso', full: 'POCSO Act' },
    { name: 'nda', full: 'NDPS Act' },
    { name: 'uapa', full: 'UAPA' },
    { name: 'pmla', full: 'Prevention of Money Laundering Act' },
    { name: 'gst', full: 'GST Act' },
    { name: 'rera', full: 'RERA' },
    { name: 'consumer protection', full: 'Consumer Protection Act' },
    { name: 'companies act', full: 'Companies Act' },
    { name: 'contract act', full: 'Indian Contract Act' },
    { name: 'partnership', full: 'Partnership Act' },
    { name: 'arbitration', full: 'Arbitration and Conciliation Act' },
    { name: 'limitation', full: 'Limitation Act' },
    { name: 'specific relief', full: 'Specific Relief Act' },
    { name: 'transfer of property', full: 'Transfer of Property Act' },
    { name: 'succession', full: 'Indian Succession Act' },
    { name: 'negotiable instruments', full: 'Negotiable Instruments Act' },
    { name: 'motor vehicles', full: 'Motor Vehicles Act' },
    { name: 'factories act', full: 'Factories Act' },
    { name: 'industrial disputes', full: 'Industrial Disputes Act' },
    { name: 'minimum wages', full: 'Minimum Wages Act' },
    { name: 'payment of wages', full: 'Payment of Wages Act' },
    { name: 'environment', full: 'Environment Protection Act' },
    { name: 'wildlife', full: 'Wildlife Protection Act' },
    { name: 'forest', full: 'Forest Conservation Act' },
    { name: 'dowry', full: 'Dowry Prohibition Act' },
    { name: 'domestic violence', full: 'Domestic Violence Act' },
    { name: 'hindu marriage', full: 'Hindu Marriage Act' },
    { name: 'special marriage', full: 'Special Marriage Act' },
    { name: 'constitution', full: 'Constitution of India' },
  ];

  let lawName = null;
  for (const lk of lawKeywords) {
    if (q.includes(lk.name)) {
      lawName = lk.full;
      break;
    }
  }

  if (matchedLaw) {
    return formatLawResponse(matchedLaw);
  }

  // Constitutional concepts
  if (q.includes('fundamental right')) {
    return `**Fundamental Rights — Constitution of India (Part III, Articles 12-35)**

Fundamental Rights are the basic human rights guaranteed to all citizens by the Indian Constitution.

**The Six Fundamental Rights:**
1. **Right to Equality** (Art. 14-18) — Equality before law, prohibition of discrimination
2. **Right to Freedom** (Art. 19-22) — Speech, assembly, association, movement, residence, profession
3. **Right against Exploitation** (Art. 23-24) — Prohibition of trafficking and child labour
4. **Right to Freedom of Religion** (Art. 25-28) — Freedom of conscience and religious practice
5. **Cultural and Educational Rights** (Art. 29-30) — Protection of minorities
6. **Right to Constitutional Remedies** (Art. 32) — Right to approach Supreme Court via writs

**Key Features:**
- Justiciable: can be enforced in court
- Not absolute: reasonable restrictions allowed
- Can be suspended during Emergency (except Art. 20-21)
- Available against State actions

📌 **UPSC Angle:** Fundamental Rights form the bedrock of Indian democracy. Questions often compare them with DPSPs and examine their relation with duties.

*Consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('habeas corpus')) {
    return `**Habeas Corpus — "You shall have the body"**

**Article:** 32 (Supreme Court) and 226 (High Courts)

**Meaning:** A writ to produce a detained person before the court to examine the legality of detention.

**When to file:**
- Illegal or arbitrary arrest/detention
- Preventive detention without sufficient grounds
- Detention beyond legal period without court order

**Important Cases:**
- *ADM Jabalpur vs Shivkant Shukla (1976)* — Habeas corpus suspended during Emergency (overruled later)
- *Rudal Shah vs State of Bihar (1983)* — Compensation for illegal detention
- *Sunil Batra vs Delhi Administration (1978)* — Habeas corpus extends to prison conditions

**Who can file:** The detained person OR any friend/relative on their behalf
**Court:** Supreme Court (Art. 32), High Courts (Art. 226)

📌 **UPSC Angle:** Landmark case ADM Jabalpur (1976) vs post-Emergency jurisprudence. Distinction between Art. 32 and 226 jurisdiction.

*Consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('pil') || q.includes('public interest')) {
    return `**Public Interest Litigation (PIL)**

**Definition:** A legal action initiated in a court of law for the enforcement of public interest or general interest.

**Origin:** PIL was introduced in India by the Supreme Court in the 1980s to provide access to justice for disadvantaged groups.

**Key Cases:**
- *SP Gupta vs Union of India (1981)* — PIL introduced; any public-spirited citizen can approach court
- *MC Mehta vs Union of India (1986)* — Absolute liability for hazardous industries
- *Vishaka vs State of Rajasthan (1997)* — Guidelines against sexual harassment at workplace
- *PUCL vs Union of India (2003)* — Right to food as fundamental right

**Principles:**
- Relaxed locus standi (anyone can file)
- Epistolary jurisdiction (court can act on letters)
- Non-adversarial litigation (court collaborates with parties)

**Courts:** Supreme Court (Art. 32), High Courts (Art. 226)

📌 **UPSC Angle:** PIL is a powerful tool for social justice. Questions often discuss its misuse and the need for guidelines to prevent frivolous PILs.

*Consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('res judicata') || q.includes('estoppel')) {
    return `**Doctrine of Res Judicata**

**Definition:** A matter that has been finally adjudicated by a competent court cannot be re-litigated between the same parties.

**Section:** Section 11, CPC 1908

**Conditions:**
1. Same parties or their representatives
2. Same matter directly and substantially in issue
3. Matter heard and finally decided by a competent court

**Purpose:** 
- Prevents multiplicity of litigation
- Brings finality to legal disputes
- Prevents waste of judicial resources

**Estoppel** (Section 115, BSA): Prevents a person from contradicting what they previously asserted in court.

📌 **UPSC Angle:** Res judicata is fundamental to the civil justice system. Distinguished from res sub judice (Section 10 CPC).

*Consult a lawyer for actual legal advice.*`;
  }

  // Scenario-based responses
  if (q.includes('landlord') && (q.includes('deposit') || q.includes('rent') || q.includes('evict'))) {
    return `**Tenant Rights — Landlord Disputes**

**Applicable Laws:**
1. **Transfer of Property Act 1882** — Sections 105-116 (Lease)
2. **Specific Relief Act 1963** — Sections 5-6 (Recovery of possession)
3. **Rent Control Acts** (State-specific)

**Key Rights:**
- Landlord cannot evict without proper notice (15 days minimum — TPA Section 106)
- Security deposit must be refunded after deducting legitimate dues
- Landlord cannot cut electricity/water supply to force eviction
- Rent increase must follow legal procedure

**What You Can Do:**
1. Send a legal notice demanding refund of deposit
2. File a civil suit for recovery of money
3. File complaint before Rent Controller
4. Approach consumer forum if services were deficient

**Important Case:** *Shantilal vs State of UP* — Landlord's right to evict for bona fide need is not absolute.

*Consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('police') && (q.includes('arrest') || q.includes('detain') || q.includes('custody'))) {
    return `**Arrest Rights — When Police Can Arrest**

**Applicable Law:** BNSS 2023 (Bharatiya Nagarik Suraksha Sanhita)

**Arrest Without Warrant (Section 21 BNSS):**
Police can arrest without warrant for:
1. Cognizable offences (serious crimes)
2. Person proclaimed as offender
3. Person possessing stolen property
4. Person obstructing police
5. Suspected deserter from Armed Forces
6. Person released on bail commits breach

**Your Rights When Arrested (Article 22 Constitution):**
1. **Right to know grounds** (Section 24 BNSS) — Police must inform why you're arrested
2. **Right to counsel** — Consult and be represented by a lawyer
3. **Right to be produced before magistrate within 24 hours** (Section 25 BNSS)
4. **Right to inform someone** — Police must let you inform family/friend

**Bail Rights:**
- For bailable offences: Right to bail (Section 241 BNSS)
- For non-bailable offences: Court discretion (Section 242 BNSS)
- Anticipatory bail: Section 245 BNSS (apply BEFORE arrest)

**Important Case:** *Arnesh Kumar vs State of Bihar (2014)* — Guidelines against automatic arrest. Police must conduct preliminary inquiry before arresting for offences punishable up to 7 years.

*Consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('photo') || q.includes('image') || q.includes('photo without permission') || q.includes('online') || q.includes('social media')) {
    return `**Unauthorized Use of Photos Online — Your Legal Remedies**

**Applicable Laws:**
1. **Information Technology Act 2000** — Section 66E (violation of privacy)
2. **Indian Penal Code/BNS** — Section 354C (voyeurism), defamation
3. **Copyright Act 1957** — Unauthorized use of photograph
4. **Right to Privacy** — Article 21 (fundamental right, *Puttaswamy case*)

**What Constitutes Violation:**
- Using your photo without consent
- Morphing/editing your photo
- Posting private photos on social media
- Commercial use without permission

**Action You Can Take:**
1. Send takedown notice to platform under IT Act Section 79
2. File complaint with cyber crime cell
3. File civil suit for damages (invasion of privacy)
4. Criminal complaint under IT Act and BNS

**Landmark Case:** *Justice KS Puttaswamy vs Union of India (2017)* — Right to privacy is a fundamental right under Article 21.

*Consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('encroach') || q.includes('land') || q.includes('boundary') || q.includes('property')) {
    return `**Land/Property Encroachment — Legal Remedies**

**Applicable Laws:**
1. **Specific Relief Act 1963** — Section 5-6 (recovery of possession)
2. **Transfer of Property Act 1882** — Property rights
3. **Limitation Act 1963** — 12 years for adverse possession
4. **Code of Civil Procedure 1908** — Suit for injunction

**What You Can Do:**
1. **Police complaint** — File FIR under BNS Sections 303 (theft of property), 316 (criminal trespass)
2. **Civil suit** — File suit for permanent injunction or possession
3. **Revenue authorities** — Approach Tehsildar/District Collector for revenue records correction
4. **Criminal complaint** — Section 441 IPC/BNS for criminal trespass

**Key Point:** If someone has been in possession of your land for 12+ years continuously, they may acquire rights through adverse possession (Section 27 Limitation Act).

**Jurisdiction:** Civil Judge (Junior Division) for property disputes up to certain value

*Consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('salary') || q.includes('wage') || q.includes('payment') || q.includes('employer')) {
    return `**Salary/Wage Non-Payment — Employee Rights**

**Applicable Laws:**
1. **Payment of Wages Act 1936** — Timely wage payment
2. **Minimum Wages Act 1948** — Minimum wage guarantee
3. **Industrial Disputes Act 1947** — Remedy for non-payment
4. **Contract Act 1872** — Breach of employment contract

**Time Limits:**
- Wages must be paid before the 7th of next month
- Wage period cannot exceed one month

**Action You Can Take:**
1. **Legal notice** — Send notice to employer demanding payment
2. **Labour Commissioner** — File complaint with Assistant Labour Commissioner
3. **Industrial Tribunal** — Approach for industrial dispute
4. **Civil suit** — File for recovery of money
5. **Criminal complaint** — If cheque issued bounces (Section 138 NI Act)

**Important:** For salary disputes, act quickly — limitation period is generally 3 years from when payment was due.

*Consult a lawyer for actual legal advice.*`;
  }

  // If we identified a law name
  if (lawName) {
    const laws = lawsData.filter(l => l.lawName?.includes(lawName) || l.shortName === lawName);
    if (laws.length > 0) {
      const first = laws[0];
      return `**${first.lawName}**\n\n${first.simplifiedExplanation}\n\nThere are ${laws.length} sections under this law in our database. You can ask about a specific section, or I can help with a particular scenario.\n\n*Consult a lawyer for actual legal advice.*`;
    }
  }

  // Catch-all for UPSC questions
  if (q.includes('upsc') || q.includes('ias') || q.includes('ips') || q.includes('civil service') || q.includes('exam')) {
    return `**UPSC Law Preparation Guide**

Key areas to focus for UPSC Prelims, Mains (GS-II), and Interview:

**📜 Constitution (Most Important):**
- Fundamental Rights (Art. 12-35) — Know all 6 rights + landmark cases
- DPSPs (Art. 36-51) — Distinction from FR, implementation
- Emergency provisions (Art. 352-360)
- Amendment procedure (Art. 368) — Kesavananda Bharati case
- Writs — All 5 under Art. 32 & 226
- Parliamentary vs Presidential system
- Federal structure — Union-State relations

**⚖️ Criminal Law (BNS 2023):**
- Murder vs Culpable Homicide (S. 101 vs S. 100)
- Rape laws (S. 63, 64)
- New provisions: mob lynching (S. 103), organized crime
- Common intention (S. 3(5))

**📋 Recent Reforms:**
- BNS/BNSS/BSA (replaced IPC/CrPC/Evidence Act)
- GST (101st Amendment)
- Triple Talaq criminalization
- EWS reservation (103rd Amendment)
- Women's reservation (106th Amendment)

Want me to explain any specific topic in detail? Just ask!

*Consult a lawyer for actual legal advice.*`;
  }

  return getFallbackResponse(message);
}

function formatLawResponse(law) {
  let response = `**${law.sectionNumber} — ${law.title}**`;
  response += `\n**Law:** ${law.lawName}`;

  if (law.category) response += `\n**Category:** ${law.category}`;
  if (law.definition) response += `\n\n**Definition:**\n${law.definition}`;
  if (law.simplifiedExplanation) response += `\n\n**Explanation:**\n${law.simplifiedExplanation}`;
  if (law.punishment && law.punishment !== 'Not applicable.') response += `\n\n**Punishment:**\n${law.punishment}`;
  if (law.whoItAppliesTo) response += `\n\n**Applies To:** ${law.whoItAppliesTo}`;
  if (law.realWorldExample) response += `\n\n**Example:**\n${law.realWorldExample}`;

  if (law.importantCases?.length > 0) {
    response += '\n\n**📚 Landmark Cases:**';
    for (const c of law.importantCases.slice(0, 3)) {
      response += `\n- *${c.caseName} (${c.year})* — ${c.summary}`;
    }
  }

  if (law.loopholes?.length > 0) {
    response += '\n\n**🔍 Loopholes:**';
    for (const l of law.loopholes.slice(0, 2)) {
      response += `\n- *${l.loopholeName}*: ${l.description}`;
    }
  }

  response += '\n\n*Consult a lawyer for actual legal advice.*';
  return response;
}

function getFallbackResponse(message) {
  const q = message.toLowerCase();

  if (q.includes('hello') || q.includes('hi ') || q.includes('hey') || q.includes('namaste')) {
    return `👋 **Namaste! I'm Nyaya Bot, your AI Legal Assistant.**

I can help you with:
- 📖 **Explaining laws** — Ask about any section or article
- ⚖️ **Legal scenarios** — Describe your situation
- 📝 **UPSC preparation** — Practice questions, concepts, loopholes
- 🔍 **Case law** — Important Supreme Court judgments

**Try asking me:**
- "Explain Article 21"
- "What's the punishment for theft under BNS?"
- "My landlord is not returning my deposit"
- "What are the loopholes in Section 498A?"
- "Difference between IPC and BNS"

*I'm for educational purposes — consult a lawyer for actual legal advice.*`;
  }

  if (q.includes('thank')) {
    return "You're welcome! 😊 Feel free to ask more questions. Remember, a strong foundation in law is essential for civil services and legal practice.\n\n*Consult a lawyer for actual legal advice.*";
  }

  return `I understand you're asking about **"${message}"** — let me help you understand the legal aspects.

Here's what I suggest:

📌 **For a precise answer, try:**
1. Mention a specific section or article (e.g., "Section 302 BNS", "Article 21")
2. Describe your legal scenario in detail
3. Ask about a specific legal concept

🔍 **Based on your query**, you may want to look into:
- The specific law that applies to your situation
- Your rights and legal remedies
- Relevant court procedures

💡 **Tip:** I can search through our database of 2000+ Indian law entries. Just be specific about what you need!

*Consult a lawyer for actual legal advice.*`;
}

app.listen(PORT, () => {
  console.log(`Nyaya Bot server running on port ${PORT}`);
});
