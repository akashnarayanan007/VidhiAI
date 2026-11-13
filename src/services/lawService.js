import Fuse from 'fuse.js';
import lawsData from '../data/laws.json';

const fuseOptions = {
  keys: [
    { name: 'sectionNumber', weight: 0.25 },
    { name: 'title', weight: 0.2 },
    { name: 'lawName', weight: 0.1 },
    { name: 'shortName', weight: 0.08 },
    { name: 'simplifiedExplanation', weight: 0.07 },
    { name: 'tags', weight: 0.08 },
    { name: 'aiSearchKeywords', weight: 0.1 },
    { name: 'scenarioTags', weight: 0.07 },
    { name: 'upscTopics', weight: 0.05 },
  ],
  threshold: 0.35,
  includeScore: true,
};

const fuse = new Fuse(lawsData, fuseOptions);

export const categories = [
  // TIER 1 — CONSTITUTIONAL (Saffron theme)
  {
    id: 'constitutional',
    name: 'Constitutional Law',
    icon: '🏛️',
    color: '#FF9933',
    subcategories: [
      'Preamble', 'Fundamental Rights (Art. 12-35)', 'Directive Principles (Art. 36-51)',
      'Fundamental Duties (Art. 51A)', 'Union & Its Territory (Art. 1-4)',
      'Citizenship (Art. 5-11)', 'Parliament (Art. 79-122)',
      'President & Vice President (Art. 52-78)', 'Prime Minister & Council of Ministers',
      'Supreme Court (Art. 124-147)', 'High Courts (Art. 214-232)',
      'Subordinate Courts (Art. 233-237)', 'CAG (Art. 148-151)',
      'Attorney General (Art. 76)', 'Election Commission (Art. 324)',
      'Finance Commission (Art. 280)', 'UPSC (Art. 315-323)',
      'Tribunals (Art. 323A-323B)', 'State Governments (Art. 152-237)',
      'Governors (Art. 153-162)', 'Emergency Provisions (Art. 352-360)',
      'Constitutional Amendments (Art. 368)', 'Schedules 1-12',
      'Appendices', 'Constitutional Writs'
    ],
    totalSections: 448,
    description: 'All 448 Articles, 12 Schedules, Preamble, Amendments'
  },
  // TIER 2 — CRIMINAL (Red theme)
  {
    id: 'criminal',
    name: 'Criminal Law',
    icon: '⚖️',
    color: '#DC2626',
    subcategories: [
      'Bharatiya Nyaya Sanhita (BNS) 2023 — All 358 Sections',
      'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023',
      'Bharatiya Sakshya Adhiniyam (BSA) 2023',
      'Prevention of Corruption Act 1988', 'NDPS Act 1985', 'POCSO Act 2012',
      'SC/ST Atrocities Act 1989', 'UAPA 1967', 'Arms Act 1959',
      'Explosives Act', 'Juvenile Justice Act 2015', 'Gangsters Act',
      'Prevention of Money Laundering Act (PMLA) 2002'
    ],
    totalSections: 358,
    description: 'BNS, BNSS, BSA, UAPA, POCSO, SC/ST Act & more'
  },
  // TIER 3 — CIVIL (Blue theme)
  {
    id: 'civil',
    name: 'Civil Law',
    icon: '📜',
    color: '#2563EB',
    subcategories: [
      'Code of Civil Procedure (CPC) 1908 — All 158 Sections + Orders',
      'Specific Relief Act 1963', 'Limitation Act 1963',
      'Indian Contract Act 1872', 'Transfer of Property Act 1882',
      'Registration Act 1908', 'Stamp Act 1899', 'Easements Act 1882'
    ],
    totalSections: 158,
    description: 'CPC, Contract Act, Transfer of Property, Specific Relief'
  },
  // TIER 4 — FAMILY (Pink theme)
  {
    id: 'family',
    name: 'Family Law',
    icon: '👨‍👩‍👧',
    color: '#EC4899',
    subcategories: [
      'Hindu Marriage Act 1955', 'Hindu Succession Act 1956',
      'Hindu Minority and Guardianship Act 1956', 'Hindu Adoptions and Maintenance Act 1956',
      'Special Marriage Act 1954', 'Muslim Personal Law (Shariat) Application Act 1937',
      'Muslim Women (Protection of Rights on Divorce) Act 1986',
      'Muslim Women (Protection of Rights on Marriage) Act 2019 — Triple Talaq',
      'Dissolution of Muslim Marriages Act 1939', 'Indian Divorce Act 1869 (Christians)',
      'Parsi Marriage and Divorce Act 1936', 'Foreign Marriage Act 1969',
      'Guardians and Wards Act 1890', 'Dowry Prohibition Act 1961',
      'Protection of Women from Domestic Violence Act 2005',
      'Prohibition of Child Marriage Act 2006', 'Indian Succession Act 1925',
      'Maintenance and Welfare of Parents and Senior Citizens Act 2007'
    ],
    totalSections: 200,
    description: 'Hindu, Muslim, Christian, Parsi Marriage & Family Laws'
  },
  // TIER 5 — PROPERTY (Green theme)
  {
    id: 'property',
    name: 'Property Law',
    icon: '🏠',
    color: '#16A34A',
    subcategories: [
      'Transfer of Property Act 1882', 'Registration Act 1908',
      'Land Acquisition Act 2013', 'Real Estate (Regulation and Development) Act 2016 — RERA',
      'Urban Land (Ceiling and Regulation) Act', 'Rent Control Acts (State-wise)',
      'Benami Transactions (Prohibition) Act 1988', 'Apartment Ownership Laws'
    ],
    totalSections: 137,
    description: 'Transfer of Property, RERA, Land Acquisition, Registration'
  },
  // TIER 6 — COMMERCIAL (Orange theme)
  {
    id: 'commercial',
    name: 'Commercial Law',
    icon: '💼',
    color: '#EA580C',
    subcategories: [
      'Indian Contract Act 1872', 'Sale of Goods Act 1930',
      'Negotiable Instruments Act 1881 (especially Section 138 — Cheque Bounce)',
      'Partnership Act 1932', 'Insolvency and Bankruptcy Code (IBC) 2016',
      'Competition Act 2002', 'Consumer Protection Act 2019',
      'Foreign Exchange Management Act (FEMA) 1999',
      'Securities and Exchange Board of India Act (SEBI) 1992',
      'Arbitration and Conciliation Act 1996'
    ],
    totalSections: 250,
    description: 'Contract, Sale of Goods, NI Act, IBC, Competition Act'
  },
  // TIER 7 — CORPORATE (Dark Blue)
  {
    id: 'corporate',
    name: 'Corporate Law',
    icon: '🏢',
    color: '#1E40AF',
    subcategories: [
      'Companies Act 2013 — All Sections', 'Limited Liability Partnership Act 2008',
      'Micro, Small and Medium Enterprises Development Act 2006',
      'SEBI Regulations', 'Foreign Direct Investment Rules',
      'Mergers and Acquisitions Law', 'Corporate Governance'
    ],
    totalSections: 470,
    description: 'Companies Act 2013, LLP, MSME, SEBI, M&A'
  },
  // TIER 8 — LABOUR (Yellow theme)
  {
    id: 'labour',
    name: 'Labour Law',
    icon: '👷',
    color: '#CA8A04',
    subcategories: [
      'Code on Wages 2019', 'Industrial Relations Code 2020',
      'Code on Social Security 2020',
      'Occupational Safety, Health and Working Conditions Code 2020',
      'Factories Act 1948', 'Minimum Wages Act 1948', 'Payment of Wages Act 1936',
      'Industrial Disputes Act 1947', 'Trade Unions Act 1926',
      'Employees\' Provident Funds Act 1952', 'Employees\' State Insurance Act 1948',
      'Maternity Benefit Act 1961', 'Payment of Gratuity Act 1972',
      'Workmen\'s Compensation Act 1923', 'Contract Labour Act 1970',
      'Sexual Harassment of Women at Workplace Act 2013 — POSH'
    ],
    totalSections: 300,
    description: 'Labour Codes, Factories, Wages, Industrial Disputes, POSH'
  },
  // TIER 9 — TAX LAW (Purple theme)
  {
    id: 'tax',
    name: 'Tax Law',
    icon: '📊',
    color: '#7C3AED',
    subcategories: [
      'Income Tax Act 1961 — All Sections', 'Goods and Services Tax (GST) Acts 2017',
      'Customs Act 1962', 'Central Excise Act 1944', 'Wealth Tax Act',
      'Gift Tax Act', 'Tax Deducted at Source (TDS) Rules',
      'Black Money Act 2015', 'Benami Transactions Act'
    ],
    totalSections: 298,
    description: 'Income Tax, GST, Customs, Excise, Black Money Act'
  },
  // TIER 10 — CONSUMER (Teal theme)
  {
    id: 'consumer',
    name: 'Consumer Law',
    icon: '🛒',
    color: '#0D9488',
    subcategories: [
      'Consumer Protection Act 2019 — All Sections',
      'Consumer Courts (District, State, National)',
      'E-commerce Consumer Rules 2020', 'Food Safety and Standards Act 2006',
      'Bureau of Indian Standards Act 2016', 'Legal Metrology Act 2009',
      'Drugs and Cosmetics Act 1940'
    ],
    totalSections: 107,
    description: 'Consumer Protection Act 2019, E-commerce Rules, FSSAI'
  },
  // TIER 11 — ENVIRONMENT (Forest Green)
  {
    id: 'environment',
    name: 'Environmental Law',
    icon: '🌿',
    color: '#15803D',
    subcategories: [
      'Environment Protection Act 1986', 'Wildlife Protection Act 1972',
      'Forest Conservation Act 1980',
      'Water (Prevention and Control of Pollution) Act 1974',
      'Air (Prevention and Control of Pollution) Act 1981',
      'Biological Diversity Act 2002', 'National Green Tribunal Act 2010',
      'Public Liability Insurance Act 1991', 'Hazardous Waste Rules'
    ],
    totalSections: 120,
    description: 'Environment Protection, Wildlife, Forest, NGT, Pollution'
  },
  // TIER 12 — CYBER LAW (Neon Blue)
  {
    id: 'cyber',
    name: 'Cyber Law',
    icon: '💻',
    color: '#0284C7',
    subcategories: [
      'Information Technology Act 2000 — All Sections', 'IT (Amendment) Act 2008',
      'IT Rules 2021 (Social Media Guidelines)', 'Personal Data Protection Bill',
      'Cybercrime Types and Sections', 'Digital Signature Laws',
      'E-commerce Laws', 'Cyber Terrorism (Section 66F IT Act)'
    ],
    totalSections: 94,
    description: 'IT Act, Cybercrime, Data Protection, Social Media Rules'
  },
  // TIER 13 — INTELLECTUAL PROPERTY
  {
    id: 'ipr',
    name: 'Intellectual Property',
    icon: '💡',
    color: '#B45309',
    subcategories: [
      'Copyright Act 1957', 'Patents Act 1970', 'Trade Marks Act 1999',
      'Geographical Indications Act 1999', 'Designs Act 2000',
      'Protection of Plant Varieties Act 2001',
      'Semiconductor Integrated Circuits Act 2000'
    ],
    totalSections: 180,
    description: 'Copyright, Patents, Trademarks, GI, Designs'
  },
  // TIER 14 — BANKING
  {
    id: 'banking',
    name: 'Banking Law',
    icon: '🏦',
    color: '#1D4ED8',
    subcategories: [
      'Banking Regulation Act 1949', 'Reserve Bank of India Act 1934',
      'Negotiable Instruments Act 1881', 'SARFAESI Act 2002 — Bank Recovery',
      'Recovery of Debts Due to Banks Act 1993',
      'Insolvency and Bankruptcy Code 2016',
      'Payment and Settlement Systems Act 2007', 'Microfinance Institutions Act'
    ],
    totalSections: 156,
    description: 'Banking Regulation, RBI Act, SARFAESI, NI Act, IBC'
  },
  // TIER 15 — ADMINISTRATIVE LAW
  {
    id: 'administrative',
    name: 'Administrative Law',
    icon: '📋',
    color: '#374151',
    subcategories: [
      'Administrative Tribunals Act 1985', 'Central Administrative Tribunal (CAT)',
      'Right to Information Act 2005', 'Prevention of Corruption Act 1988',
      'Whistleblowers Protection Act 2014', 'Lokpal and Lokayuktas Act 2013',
      'Right to Public Services Acts'
    ],
    totalSections: 85,
    description: 'RTI, Lokpal, CAT, Whistleblower Protection, Anti-Corruption'
  },
  // TIER 16 — ELECTION LAW
  {
    id: 'election',
    name: 'Election Law',
    icon: '🗳️',
    color: '#065F46',
    subcategories: [
      'Representation of the People Act 1950', 'Representation of the People Act 1951',
      'Election Symbols Order 1968', 'Model Code of Conduct',
      'Anti-Defection Law (10th Schedule)',
      'Presidential and Vice-Presidential Elections Act 1952', 'Delimitation Acts'
    ],
    totalSections: 170,
    description: 'Representation of People, Anti-Defection, Election Commission'
  },
  // TIER 17 — LAND REVENUE
  {
    id: 'land',
    name: 'Land & Revenue Law',
    icon: '🌾',
    color: '#92400E',
    subcategories: [
      'Land Acquisition, Rehabilitation and Resettlement Act 2013',
      'State Land Revenue Codes', 'Panchayati Raj Acts',
      'Urban Land Ceiling Acts', 'Tenancy Laws (State-wise)',
      'Bhoodan Movement Laws', 'Zamindari Abolition Acts'
    ],
    totalSections: 90,
    description: 'Land Acquisition, Revenue Codes, Panchayati Raj, Tenancy'
  },
  // TIER 18 — HUMAN RIGHTS
  {
    id: 'humanrights',
    name: 'Human Rights Law',
    icon: '✊',
    color: '#B91C1C',
    subcategories: [
      'Protection of Human Rights Act 1993 — NHRC',
      'Scheduled Castes and Tribes (Prevention of Atrocities) Act 1989',
      'Bonded Labour System (Abolition) Act 1976',
      'Child Labour (Prohibition and Regulation) Act 1986',
      'Rights of Persons with Disabilities Act 2016', 'Mental Healthcare Act 2017',
      'Transgender Persons (Protection of Rights) Act 2019',
      'International Human Rights Conventions ratified by India'
    ],
    totalSections: 95,
    description: 'NHRC, SC/ST Act, Disability Rights, Transgender Rights'
  },
  // TIER 19 — MEDICAL LAW
  {
    id: 'medical',
    name: 'Medical Law',
    icon: '⚕️',
    color: '#059669',
    subcategories: [
      'Indian Medical Council Act 1956', 'National Medical Commission Act 2020',
      'Drugs and Cosmetics Act 1940', 'Clinical Establishments Act 2010',
      'Transplantation of Human Organs Act 1994',
      'Pre-Conception and Pre-Natal Diagnostic Techniques Act 1994 — PCPNDT',
      'Medical Termination of Pregnancy Act 1971 (amended 2021)',
      'Mental Healthcare Act 2017', 'Consumer Protection for Medical Negligence'
    ],
    totalSections: 110,
    description: 'NMC, Drugs Act, MTP, PCPNDT, Medical Negligence'
  },
  // TIER 20 — EDUCATION LAW
  {
    id: 'education',
    name: 'Education Law',
    icon: '📚',
    color: '#7C3AED',
    subcategories: [
      'Right to Education Act 2009 — RTE', 'University Grants Commission Act 1956',
      'National Education Policy 2020 (Legal Framework)',
      'Central Educational Institutions Act 2006',
      'Prohibition of Ragging Laws', 'Foreign Educational Institutions Bill'
    ],
    totalSections: 45,
    description: 'RTE, UGC, NEP 2020, Anti-Ragging Laws'
  },
  // TIER 21 — PROCEDURAL LAW
  {
    id: 'procedural',
    name: 'Procedural Law',
    icon: '📑',
    color: '#6B7280',
    subcategories: [
      'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023',
      'Code of Civil Procedure (CPC) 1908',
      'Bharatiya Sakshya Adhiniyam (BSA) 2023',
      'Limitation Act 1963', 'Court Fees Act 1870',
      'Legal Services Authorities Act 1987', 'Contempt of Courts Act 1971',
      'Advocates Act 1961'
    ],
    totalSections: 484,
    description: 'BNSS, CPC, BSA, Limitation, Court Fees, Legal Services'
  },
  // TIER 22 — WRITS & PETITIONS
  {
    id: 'writs',
    name: 'Writs & Petitions',
    icon: '📝',
    color: '#DC2626',
    subcategories: [
      'Habeas Corpus — Article 32 & 226', 'Mandamus', 'Certiorari',
      'Prohibition', 'Quo Warranto',
      'Special Leave Petition (SLP) — Article 136',
      'Public Interest Litigation (PIL)', 'Writ Petition',
      'Review Petition', 'Curative Petition',
      'Anticipatory Bail — Section 482 BNSS', 'Regular Bail Applications'
    ],
    totalSections: 12,
    description: 'All 5 Writs, PIL, SLP, Review, Curative Petitions'
  },
  // TIER 23 — COURTS & TRIBUNALS
  {
    id: 'courts',
    name: 'Courts & Tribunals',
    icon: '🏛️',
    color: '#1F2937',
    subcategories: [
      'Supreme Court of India', 'High Courts (25 High Courts)',
      'District Courts', 'Sessions Courts', 'Civil Judge Courts',
      'Chief Judicial Magistrate Courts', 'Judicial Magistrate Courts',
      'Executive Magistrate', 'Family Courts',
      'Consumer Courts (District/State/National)',
      'Labour Courts & Industrial Tribunals', 'Commercial Courts',
      'Fast Track Courts', 'Special Courts (NIA, POCSO, SC/ST)',
      'Juvenile Justice Boards', 'Central Administrative Tribunal (CAT)',
      'National Green Tribunal (NGT)', 'Income Tax Appellate Tribunal (ITAT)',
      'Debt Recovery Tribunals (DRT)', 'National Company Law Tribunal (NCLT)',
      'Armed Forces Tribunal', 'Lok Adalat'
    ],
    totalSections: 22,
    description: 'All Indian Courts, Tribunals, Special Courts, Lok Adalat'
  },
  // TIER 24 — LEGAL PROFESSIONALS
  {
    id: 'legalprofessionals',
    name: 'Legal Professionals',
    icon: '👨‍⚖️',
    color: '#374151',
    subcategories: [
      'Advocates Act 1961', 'Senior Advocates',
      'Attorney General of India (Art. 76)', 'Solicitor General',
      'Advocate General of States (Art. 165)', 'Public Prosecutor',
      'Government Pleader', 'Bar Council of India', 'State Bar Councils',
      'Notaries Act 1952', 'Legal Aid (DLSA, SLSA, NALSA)', 'Law Officers Rules'
    ],
    totalSections: 60,
    description: 'Advocates Act, Bar Council, AG, SG, Legal Aid'
  },
  // TIER 25 — INTERNATIONAL LAW
  {
    id: 'international',
    name: 'International Law',
    icon: '🌍',
    color: '#0369A1',
    subcategories: [
      'United Nations Conventions India ratified',
      'Vienna Convention on Diplomatic Relations', 'Geneva Conventions',
      'WTO Agreements', 'Extradition Act 1962',
      'Foreign Contribution Regulation Act (FCRA)', 'Passports Act 1967',
      'Foreigners Act 1946', 'Citizenship Amendment Act 2019'
    ],
    totalSections: 75,
    description: 'UN Conventions, Extradition, FCRA, Passports, CAA'
  },
  // TIER 26 — MOTOR & TRANSPORT
  {
    id: 'transport',
    name: 'Motor & Transport Law',
    icon: '🚗',
    color: '#DC7609',
    subcategories: [
      'Motor Vehicles Act 1988 (amended 2019)',
      'Motor Accident Claims — Section 166', 'Hit and Run Compensation',
      'Drunk Driving Laws', 'Road Transport Corporations Act',
      'Carriage by Air Act', 'Merchant Shipping Act', 'Railways Act 1989'
    ],
    totalSections: 217,
    description: 'Motor Vehicles Act, Accident Claims, Transport Laws'
  },
  // TIER 27 — ENERGY & INFRASTRUCTURE
  {
    id: 'energy',
    name: 'Energy & Infrastructure',
    icon: '⚡',
    color: '#D97706',
    subcategories: [
      'Electricity Act 2003', 'Petroleum Act 1934', 'Coal Mines Act 1952',
      'Mines Act 1952', 'Atomic Energy Act 1962',
      'Telecom Regulatory Authority of India Act 1997', 'Telecommunications Act 2023'
    ],
    totalSections: 185,
    description: 'Electricity, Petroleum, Mining, Atomic Energy, Telecom'
  },
  // TIER 28 — DEFENCE & MILITARY
  {
    id: 'defence',
    name: 'Defence & Military Law',
    icon: '🎖️',
    color: '#1F2937',
    subcategories: [
      'Army Act 1950', 'Navy Act 1957', 'Air Force Act 1950',
      'Armed Forces (Special Powers) Act 1958 — AFSPA',
      'National Security Act 1980', 'Official Secrets Act 1923',
      'Armed Forces Tribunal Act 2007', 'Coast Guard Act 1978'
    ],
    totalSections: 200,
    description: 'Army, Navy, Air Force Acts, AFSPA, NSA, Official Secrets'
  },
  // TIER 29 — AGRICULTURAL LAW
  {
    id: 'agriculture',
    name: 'Agricultural Law',
    icon: '🌾',
    color: '#16A34A',
    subcategories: [
      'Farmers Produce Trade and Commerce Act (repealed)',
      'Essential Commodities Act 1955',
      'Agricultural Produce Market Acts (State-wise)',
      'Soil and Water Conservation Acts', 'Plant Quarantine Order 2003',
      'Seeds Act 1966', 'Fertilizer Control Order', 'Irrigation Acts (State-wise)'
    ],
    totalSections: 60,
    description: 'Essential Commodities, APMC, Seeds, Fertilizer, Irrigation'
  },
  // TIER 30 — SOURCES OF LAW (Special Educational)
  {
    id: 'sources',
    name: 'Sources of Law',
    icon: '📖',
    color: '#6D28D9',
    subcategories: [
      'Constitutional Provisions', 'Parliamentary Legislation', 'State Legislation',
      'Delegated Legislation (Rules, Regulations, Notifications)',
      'Presidential Ordinances (Art. 123)', 'Governor\'s Ordinances (Art. 213)',
      'Judicial Precedents — Doctrine of Stare Decisis',
      'Customs and Conventions', 'International Treaties',
      'Government Orders (GOs)', 'Presidential Orders',
      'Notifications in Official Gazette'
    ],
    totalSections: 12,
    description: 'Constitution, Legislation, Precedents, Customs, Treaties'
  },
];

export function getAllLaws() {
  return lawsData;
}

export function getLawById(id) {
  return lawsData.find(law => law.id === id);
}

export function getLawsByCategory(category) {
  return lawsData.filter(law => law.category === category);
}

export function getLawsByDifficulty(difficulty) {
  return lawsData.filter(law => law.difficulty === difficulty);
}

export function getUPSCImportantLaws() {
  return lawsData.filter(law => law.tags.includes('UPSC important'));
}

export function searchLaws(query) {
  if (!query || query.trim() === '') return [];
  return fuse.search(query).map(result => ({
    ...result.item,
    score: result.score,
  }));
}

export function getRelatedLaws(lawId) {
  const law = getLawById(lawId);
  if (!law || !law.relatedSections) return [];
  return law.relatedSections
    .map(id => getLawById(id))
    .filter(Boolean);
}

export function getCategoryStats() {
  const stats = {};
  categories.forEach(cat => {
    const laws = getLawsByCategory(cat.id);
    stats[cat.id] = {
      total: laws.length,
      beginner: laws.filter(l => l.difficulty === 'Beginner').length,
      intermediate: laws.filter(l => l.difficulty === 'Intermediate').length,
      advanced: laws.filter(l => l.difficulty === 'Advanced').length,
    };
  });
  return stats;
}

export function getTotalLawCount() {
  return lawsData.length;
}

export function getRandomLaw(excludeIds = []) {
  const available = lawsData.filter(l => !excludeIds.includes(l.id));
  if (available.length === 0) return lawsData[Math.floor(Math.random() * lawsData.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function filterLaws({ category, difficulty, status, search, bookmarks = [], readLaws = [] }) {
  let result = [...lawsData];

  if (category && category !== 'All') {
    result = result.filter(l => l.category === category);
  }
  if (difficulty && difficulty !== 'All') {
    result = result.filter(l => l.difficulty === difficulty);
  }
  if (status === 'Read') {
    result = result.filter(l => readLaws.includes(l.id));
  } else if (status === 'Unread') {
    result = result.filter(l => !readLaws.includes(l.id));
  } else if (status === 'Bookmarked') {
    result = result.filter(l => bookmarks.includes(l.id));
  }
  if (search) {
    const searchResults = searchLaws(search);
    const searchIds = new Set(searchResults.map(l => l.id));
    result = result.filter(l => searchIds.has(l.id));
  }

  return result;
}

// ========================
// NEW UTILITY FUNCTIONS
// ========================

export function getLawsByLawType(lawType) {
  return lawsData.filter(law => law.lawType === lawType);
}

export function getLawsByJurisdiction(jurisdiction) {
  return lawsData.filter(law => law.jurisdiction === jurisdiction);
}

export function getLawsByUPSCImportance(importance) {
  return lawsData.filter(law => law.upscImportance === importance);
}

export function getWritLaws() {
  return lawsData.filter(law => law.writ !== null);
}

export function getLawsByScenario(tag) {
  if (!tag || tag.trim() === '') return [];
  const lowerTag = tag.toLowerCase();
  return lawsData.filter(law =>
    law.scenarioTags?.some(t => t.toLowerCase().includes(lowerTag))
  );
}

export function getLawsByCourtLevel(court) {
  return lawsData.filter(law =>
    law.courtLevel?.includes(court)
  );
}

export function getLawsWithConstitutionalAuthority() {
  return lawsData.filter(law => law.constitutionalAuthority !== null);
}

export function getLawsByCurrentStatus(status) {
  return lawsData.filter(law => law.currentStatus === status);
}

export function getLawsBySubCategory(subCategory) {
  return lawsData.filter(law => law.subCategory === subCategory);
}

export function getSubCategories(category) {
  const laws = category ? getLawsByCategory(category) : lawsData;
  return [...new Set(laws.map(l => l.subCategory).filter(Boolean))];
}
