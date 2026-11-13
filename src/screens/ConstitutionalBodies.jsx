import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BODIES = [
  { icon: '🏛️', name: 'President of India', article: 'Art. 52-62', type: 'Executive Head', color: '#FF9933',
    composition: 'Elected by electoral college (MPs + MLAs) for 5-year term. Must be 35+, citizen of India, qualified for Lok Sabha.',
    powers: 'Executive (all executive actions in his name), Legislative (summon/prorogue Parliament, assent to bills), Financial (Money bills introduced with his recommendation), Judicial (pardoning power Art. 72), Military (Supreme Commander), Emergency (Art. 352-360), Diplomatic (treaties, ambassador appointments).',
    landmark: 'R. B. Rajbongshi v. State of Assam (1986) — President\'s pardoning power is subject to judicial review; S. R. Bommai v. UOI (1994) — President\'s Rule under Art. 356 is judicially reviewable.' },
  { icon: '🏛️', name: 'Vice President of India', article: 'Art. 63-73', type: 'Second Highest Office', color: '#FF9933',
    composition: 'Elected by both houses of Parliament by secret ballot. Must be 35+ and qualified for Rajya Sabha. 5-year term.',
    powers: 'Ex-officio Chairman of Rajya Sabha (presides over debates, casting vote in case of tie). Acts as President when office falls vacant due to death/resignation/removal. Acts as President during President\'s absence.',
    landmark: 'Dr. S. Radhakrishnan (first V.P.) established the convention of neutrality as Rajya Sabha Chairman. No major judicial controversy attached to the office.' },
  { icon: '📜', name: 'Parliament', article: 'Art. 79-122', type: 'Legislature', color: '#2563EB',
    composition: 'Bicameral — Lok Sabha (545 members, directly elected, 5-year term) + Rajya Sabha (245 members, elected by state legislatures + 12 nominated, 6-year term).',
    powers: 'Legislative power over Union List & Concurrent List. Amends Constitution (Art. 368). Controls executive through questions, no-confidence, committees. Approves budget and financial legislation. Impeaches President, removes judges, CJI, CAG, etc.',
    landmark: 'S. R. Bommai v. UOI (1994) — Parliament cannot destroy basic structure; Kesavananda Bharati (1973) — power to amend is not unlimited.' },
  { icon: '⚖️', name: 'Supreme Court of India', article: 'Art. 124-147', type: 'Judiciary', color: '#7C3AED',
    composition: 'Chief Justice of India (CJI) + 33 judges (total 34). Appointed by President on recommendation of collegium. Retire at 65. Qualifications: 5 years as HC judge or 10 years as advocate or distinguished jurist.',
    powers: 'Guardian of Constitution — power of judicial review. Original jurisdiction (Art. 131) — disputes between Centre & States. Appellate jurisdiction — constitutional, civil, criminal appeals. Advisory jurisdiction (Art. 143) — President can seek opinion. Contempt power — punishes for contempt of itself.',
    landmark: 'Kesavananda Bharati (1973) — basic structure doctrine; Minerva Mills (1980) — judicial review is basic structure; NJAC judgment (2015) — struck down NJAC Act, restored collegium; Aadhaar judgment (2018) — upheld Aadhaar with restrictions.' },
  { icon: '⚖️', name: 'High Courts', article: 'Art. 214-232', type: 'State Judiciary', color: '#7C3AED',
    composition: 'Each state has a High Court (some states share). Chief Justice + judges appointed by President (consultation with CJI, Governor). Retire at 62. Qualifications: 10 years judicial office or 10 years advocate.',
    powers: 'Writ jurisdiction (Art. 226) — wider than SC, can be issued for any purpose (not just FRs). Appellate jurisdiction over district courts. Superintendence over all courts in the state. Original jurisdiction for civil/criminal cases of value. Can interpret Constitution (subject to SC appeal).',
    landmark: 'S.P. Gupta v. UOI (1982) — established primacy of CJI in judicial appointments (First Judges Case); later modified by Second (1993) and Third (1998) Judges Cases.' },
  { icon: '📊', name: 'Comptroller & Auditor General (CAG)', article: 'Art. 148-151', type: 'Audit Watchdog', color: '#059669',
    composition: 'Appointed by President, 6-year term or age 65 (whichever earlier). Removable on same grounds as SC judge. Salary charged on Consolidated Fund (not votable).',
    powers: 'Audits all government accounts at Union & State level. Audits accounts of government corporations, authorities, bodies substantially financed by government. Reports to President/Governor who places before Parliament/Assembly. Guardian of public purse — ensures financial accountability.',
    landmark: 'CAG reports led to uncovering of 2G spectrum scam (2010, estimated loss ₹1.76 lakh crore), Coal Block Allocation scam (2012), Commonwealth Games irregularities. Known as "friend and philosopher of the Public Accounts Committee".' },
  { icon: '⚖️', name: 'Attorney General of India', article: 'Art. 76', type: 'Legal Advisor', color: '#7C3AED',
    composition: 'Appointed by President, holds office during President\'s pleasure. Must be qualified as SC judge (5 years HC judge or 10 years advocate or distinguished jurist).',
    powers: 'Advises Government on legal matters referred by President/PM. Performs legal duties assigned by President. Appears in Supreme Court on behalf of Government. Has right of audience in all Indian courts. Can speak and take part in Parliament proceedings but cannot vote.',
    landmark: 'May be heard in any court in India. Appears for Union in all SC cases involving Government. Not a government servant — allowed private practice except against Government.' },
  { icon: '🗳️', name: 'Election Commission of India', article: 'Art. 324', type: 'Election Authority', color: '#2563EB',
    composition: 'Chief Election Commissioner (CEC) + 2 Election Commissioners. Appointed by President. CEC has same security of tenure as SC judge (can be removed only by impeachment). ECs removable on recommendation of CEC.',
    powers: 'Superintendence, direction and control of elections to Parliament, State Legislatures, President & Vice President. Delimitation of constituencies. Preparation of electoral rolls. Recognition of political parties, allocation of symbols. Conduct elections, enforce Model Code of Conduct.',
    landmark: 'T.N. Seshan (CEC 1990-96) — enforced Model Code strictly, transformed elections. S.S. Dhanoa v. UOI (1991) — EC can be multi-member. Election Commissioners have equal powers, no seniority.' },
  { icon: '💰', name: 'Finance Commission', article: 'Art. 280', type: 'Financial Federal Body', color: '#059669',
    composition: 'Chairman + 4 members appointed by President every 5 years. Qualifications: experience in public affairs, finance, administration, or economics.',
    powers: 'Recommends distribution of net tax proceeds between Union & States (vertical devolution). Recommends distribution among states (horizontal devolution). Grants-in-aid to states. Measures to augment Consolidated Fund of states. Any other matter referred by President in the interest of sound finance.',
    landmark: '15th Finance Commission (2021-26) — 41% devolution to states; 1% for newly formed UTs of J&K, Ladakh. FC recommendations are not binding on Government but convention is to accept.' },
  { icon: '📋', name: 'UPSC', article: 'Art. 315-323', type: 'Recruitment Body', color: '#7C3AED',
    composition: 'Chairman + 10 members appointed by President. 6-year term or age 65 (whichever earlier). Half members must have 10+ years government service.',
    powers: 'Conducts examinations for All India Services (IAS, IPS, IFS) and Group A Central Services. Advises Government on recruitment methods, promotions, transfers, disciplinary matters. Can be consulted on schemes for direct recruitment. Functions of UPSC can be extended by Parliament.',
    landmark: 'R. Chitralekha v. State of Mysore (1964) — UPSC recommendations not binding on Government but must be given due weight. Not consulted for posts lower than Group A.' },
  { icon: '📋', name: 'State Public Service Commission (SPSC)', article: 'Art. 315-323', type: 'State Recruitment', color: '#7C3AED',
    composition: 'Chairman + members appointed by Governor. Term 6 years or age 62 (whichever earlier). Half with 10+ years government service. Removal by President on grounds of misbehaviour (reference to SC).',
    powers: 'Conducts exams for state civil services. Advises state government on recruitment methods, promotions, disciplinary matters. Similar functions as UPSC but at state level.',
    landmark: 'SPSC recommendations for state civil services exams, disciplinary cases against state government employees.' },
  { icon: '🛡️', name: 'National Commission for SCs', article: 'Art. 338', type: 'Safeguard Body', color: '#DC2626',
    composition: 'Chairperson + Vice Chairperson + 3 members appointed by President. Conditions of service determined by President.',
    powers: 'Investigate and monitor all matters relating to safeguards for SCs. Inquire into specific complaints of deprivation of rights. Participate in planning of socio-economic development. Submit annual report to President. Functions as a civil court for summoning, evidence, discovery.',
    landmark: 'NCSC reports have highlighted manual scavenging deaths, atrocities against SCs, educational discrimination. Can recommend prosecution for offences against SCs.' },
  { icon: '🛡️', name: 'National Commission for STs', article: 'Art. 338A', type: 'Safeguard Body', color: '#DC2626',
    composition: 'Chairperson + Vice Chairperson + 3 members appointed by President. Split from NCSC by 89th Amendment (2003).',
    powers: 'Similar to NCSC — monitors safeguards for STs, investigates specific complaints, advises on planning, submits annual report. Special focus on tribal land rights, forest rights, displacement issues, tribal welfare.',
    landmark: 'Reports on tribal land alienation, Naxal-affected areas, Particularly Vulnerable Tribal Groups (PVTGs) welfare. Recommends Forest Rights Act implementation.' },
  { icon: '🛡️', name: 'National Commission for OBCs', article: 'Art. 338B', type: 'Safeguard Body', color: '#DC2626',
    composition: 'Chairperson + Vice Chairperson + 3 members appointed by President. Constitutional status given by 102nd Amendment (2018).',
    powers: 'Monitors safeguards for Other Backward Classes. Investigates complaints of deprivation of rights. Participates in planning of socio-economic development. Advises on inclusion/exclusion from OBC list. Reports annually to President.',
    landmark: 'Caste-wise OBC data collection, creamy layer determinations, recommendations for OBC reservation in education and employment.' },
  { icon: '🔍', name: 'Lokpal', article: 'Art. 63A', type: 'Anti-Corruption Ombudsman', color: '#EA580C',
    composition: 'Chairperson (former CJI or SC judge or eminent person) + up to 8 members (50% judicial members). Appointed by President on recommendation of Selection Committee (PM, LS Speaker, CJI, eminent jurist, etc.). 5-year term.',
    powers: 'Inquires into allegations of corruption against PM (with Cabinet approval), Union Ministers, MPs, Group A/B/C/D officers (including those of corporations set up by Central Act). Can attach property acquired through corruption. Cannot investigate if complaint relates to Armed Forces, national security, or international relations.',
    landmark: 'First Lokpal Justice Pinaki Chandra Ghose (2019). Has investigated complaints against public servants, MPs. Reports submitted to Speaker/Chairman of Parliament.' },
  { icon: '🤝', name: 'National Human Rights Commission (NHRC)', article: 'Statutory (PHRA 1993)', type: 'Human Rights Guardian', color: '#059669',
    composition: 'Chairperson (former CJI) + 1 former SC/HC judge + 2 eminent persons + chairpersons of NCSC, NCST, NCW as ex-officio. Appointed by President on recommendation of 6-member committee.',
    powers: 'Inquires into complaints of human rights violations. Intervenes in court proceedings alleging human rights violations. Reviews constitutional/legal safeguards for human rights. Studies treaties and makes recommendations. Promotes human rights literacy. Visits prisons/jails.',
    landmark: 'NHRC has intervened in custodial deaths, encounter killings, prisoner rights, manual scavenging, mental health, bonded labour. Its recommendations are binding but not enforceable like court orders.' },
];

export default function ConstitutionalBodies() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  const types = ['all', ...new Set(BODIES.map(b => b.type))];
  const filtered = filter === 'all' ? BODIES : BODIES.filter(b => b.type === filter);

  return (
    <div className="screen constitution-screen">
      <div className="const-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-3)' }}>
          <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>Constitution</div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>Constitutional Bodies</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Link to="/constitution" className="const-nav-chip">Home</Link>
          <Link to="/constitution/writs" className="const-nav-chip">Writs</Link>
          <Link to="/constitution/schedules" className="const-nav-chip">Schedules</Link>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-3)' }}>
        Constitutional bodies are institutions established by the Constitution itself, enjoying constitutional status, security of tenure, and independent functioning. They form the backbone of India's governance structure.
      </p>

      {/* Filter chips */}
      <div className="const-filter-bar">
        {types.map(t => (
          <button key={t} className={`const-filter-chip ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>

      <div className="const-bodies-grid">
        {filtered.map((b, i) => (
          <motion.div
            key={b.name}
            className={`const-body-card ${expanded === i ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="const-body-top" style={{ borderLeftColor: b.color }}>
              <div className="const-body-icon" style={{ background: `${b.color}15` }}>{b.icon}</div>
              <div className="const-body-info">
                <div className="const-body-name">{b.name}</div>
                <div className="const-body-meta">
                  <span className="const-body-article">{b.article}</span>
                  <span className="const-body-type" style={{ background: `${b.color}15`, color: b.color }}>{b.type}</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  className="const-body-detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="const-body-detail-section">
                    <span className="const-body-detail-label">Composition</span>
                    <p>{b.composition}</p>
                  </div>
                  <div className="const-body-detail-section">
                    <span className="const-body-detail-label">Powers & Functions</span>
                    <p>{b.powers}</p>
                  </div>
                  <div className="const-body-detail-section">
                    <span className="const-body-detail-label">Landmark Action</span>
                    <p>{b.landmark}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {expanded !== i && (
              <div className="const-writ-hint">Tap to expand ▼</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
