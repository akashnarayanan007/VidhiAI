import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WRITS_DATA = [
  {
    name: 'Habeas Corpus', latin: '"You shall have the body"', article: 'Art. 32 & 226', icon: '🔴', color: '#DC2626',
    purpose: 'Produce an unlawfully detained person before the court to secure their release.',
    when: 'Illegal detention, arrest without cause, police custody beyond 24 hours without remand.',
    courts: 'Supreme Court (Art. 32), High Court (Art. 226)',
    example: 'ADM Jabalpur v. Shivkant Shukla (1976) — famously denied during Emergency, later overruled by K.S. Puttaswamy (2017) which declared right to life & liberty as basic structure.',
    procedure: 'Petitioner files before the court; court issues rule nisi; respondent must produce detainee and justify detention; if unjustified, court orders release.',
    key: 'The Great Writ of Liberty — protects individual freedom against arbitrary state action.'
  },
  {
    name: 'Mandamus', latin: '"We command"', article: 'Art. 32 & 226', icon: '⚖️', color: '#2563EB',
    purpose: 'Command a public official or body to perform a legal duty they have refused to perform.',
    when: 'Public official refuses to act, failure to perform statutory duty, illegal refusal of license or permit.',
    courts: 'Supreme Court (Art. 32), High Court (Art. 226); not available against President, Governor, or private individuals.',
    example: 'Chief Justice v. R.C. Lahoti (2005) — mandamus for judicial appointments process; S.P. Gupta v. UOI (1982) — court cannot compel President to exercise discretion.',
    procedure: 'Demand justice first; if refused, file petition; court examines if legal duty exists and issues direction enforceable by contempt.',
    key: 'Corrective writ — compels performance of public duty when authority fails to act.'
  },
  {
    name: 'Certiorari', latin: '"To be certified"', article: 'Art. 32 & 226', icon: '📋', color: '#7C3AED',
    purpose: 'Quash an order passed by an inferior court, tribunal, or quasi-judicial body that lacks jurisdiction.',
    when: 'Tribunal acts without jurisdiction, error of law on face of record, violation of natural justice principles.',
    courts: 'Supreme Court (Art. 32), High Court (Art. 226) against tribunals and quasi-judicial bodies.',
    example: 'S.L. Kapoor v. Jagmohan (1980) — certiorari granted for violation of natural justice; Tata Cellular v. UOI (1994) — limited to procedural impropriety, not merit review.',
    procedure: 'Apply to High Court within 90 days of the order; court calls for records and examines them; if illegal, quashes order and may remand.',
    key: 'Corrective writ — superior court reviews and nullifies illegal orders of lower authorities.'
  },
  {
    name: 'Prohibition', latin: '"We forbid"', article: 'Art. 32 & 226', icon: '🚫', color: '#EA580C',
    purpose: 'Prevent an inferior court, tribunal, or quasi-judicial body from exceeding its jurisdiction or acting without it.',
    when: 'Case is pending before a lower court or tribunal acting beyond its jurisdiction.',
    courts: 'Supreme Court (Art. 32), High Court (Art. 226); issued BEFORE the decision is made (preventive).',
    example: 'Hari Vishnu Kamath v. Ahmad Ishaque (1955) — distinguished prohibition (preventive, issued before decision) from certiorari (corrective, issued after decision); East India Commercial Co. v. Collector (1962) — prohibition to prevent illegal proceedings.',
    procedure: 'File before High Court while case is still pending; court examines jurisdiction; if lacking, issues prohibition restraining further proceedings.',
    key: 'Preventive writ — stops lower courts from acting beyond their legal authority.'
  },
  {
    name: 'Quo Warranto', latin: '"By what authority"', article: 'Art. 32 & 226', icon: '❓', color: '#059669',
    purpose: 'Challenge the legal authority of a person holding a public office to determine if they have the right to hold it.',
    when: 'Person holds public office without proper qualification, appointment is illegal, or office has been usurped.',
    courts: 'Supreme Court (Art. 32), High Court (Art. 226); can be filed by any private person.',
    example: 'K. Veeraswami v. UOI (1991) — quo warranto against corruption-accused CJI; N. Kannadasan v. Ajoy Khose (2009) — cannot be used merely to challenge eligibility, must show substantive illegality.',
    procedure: 'Petitioner proves the office is public and respondent holds it without legal authority; court examines appointment validity and may declare office vacant.',
    key: 'Inquisitorial writ — ensures public offices are held only by legally entitled persons.'
  },
];

export default function ConstitutionWrits() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="screen constitution-screen">
      <div className="const-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-3)' }}>
          <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>Constitution</div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>5 Constitutional Writs</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Link to="/constitution" className="const-nav-chip">Home</Link>
          <Link to="/constitution/bodies" className="const-nav-chip">Bodies</Link>
          <Link to="/constitution/schedules" className="const-nav-chip">Schedules</Link>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
        Under Article 32 (Supreme Court) and Article 226 (High Courts), five constitutional writs empower citizens to enforce their Fundamental Rights. These are the judiciary's most powerful tools for protecting liberty and checking executive abuse.
      </p>

      <div className="const-writs-grid">
        {WRITS_DATA.map((w, i) => (
          <motion.div
            key={w.name}
            className={`const-writ-card ${expanded === i ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="const-writ-top" style={{ borderLeftColor: w.color }}>
              <div className="const-writ-icon" style={{ background: `${w.color}15`, color: w.color }}>{w.icon}</div>
              <div className="const-writ-info">
                <div className="const-writ-name">{w.name}</div>
                <div className="const-writ-latin" style={{ color: w.color }}>{w.latin}</div>
              </div>
              <div className="const-writ-article">{w.article}</div>
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  className="const-writ-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="const-writ-key">{w.key}</div>
                  <div className="const-writ-section">
                    <span className="const-writ-label">Purpose</span>
                    <p>{w.purpose}</p>
                  </div>
                  <div className="const-writ-section">
                    <span className="const-writ-label">When to File</span>
                    <p>{w.when}</p>
                  </div>
                  <div className="const-writ-section">
                    <span className="const-writ-label">Which Court</span>
                    <p>{w.courts}</p>
                  </div>
                  <div className="const-writ-section">
                    <span className="const-writ-label">Landmark Case</span>
                    <p>{w.example}</p>
                  </div>
                  <div className="const-writ-section">
                    <span className="const-writ-label">Procedure</span>
                    <p>{w.procedure}</p>
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
