import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, FileText, Pin, Globe, Users, Scale, BookOpen, Landmark, Languages, Shield, Gavel, Building, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SCHEDULES_DATA = [
  { num: 1, name: 'States and Union Territories', article: 'Art. 1-4', icon: Pin, color: '#FF9933',
    desc: 'Lists 28 states and 8 union territories with their territorial boundaries. Originally 14 states and 6 UTs under the 1950 Constitution.',
    detail: 'Part I: Existing states (28) with boundary descriptions. Part II: Union Territories (8) — Delhi, Chandigarh, Puducherry, Andaman & Nicobar, Lakshadweep, Dadra & Nagar Haveli and Daman & Diu, Ladakh, Jammu & Kashmir.',
    significance: 'Foundation of India\'s federal structure. Amendments through this schedule enable state reorganisation, merger, and change of boundaries.'
  },
  { num: 2, name: 'Salaries and Emoluments', article: 'Art. 59(3), 65(3), 75(6), 125, 148(3), 164(5), 186, 221, 236', icon: Users, color: '#2563EB',
    desc: 'Specifies salaries, allowances, and privileges of President, Vice President, Governors, Supreme Court & High Court judges, CAG, Speaker, Deputy Speaker, Chairman and Deputy Chairman of Rajya Sabha, MLAs, MLCs.',
    detail: 'Part A: President & Governor — salary, allowances, privileges. Part B: Speaker, Deputy Speaker, Chairman, Deputy Chairman. Part C: Supreme Court judges, High Court judges, CAG. Part D: Allowances for MLAs and MLCs.',
    significance: 'Ensures independence of constitutional functionaries by fixing their salaries charged on Consolidated Fund (not votable by legislature).'
  },
  { num: 3, name: 'Forms of Oaths and Affirmations', article: 'Art. 75(4), 99, 124(6), 148(2), 164(3), 188, 219', icon: Scale, color: '#7C3AED',
    desc: 'Prescribes the oath of office for Union Ministers, MPs, Supreme Court & High Court judges, CAG, State Ministers, MLAs, MLCs, and members of State Legislature.',
    detail: 'Oath formats for: (1) Union Ministers, (2) Election candidate for Parliament, (3) MPs, (4) SC judges, (5) CAG, (6) State Ministers, (7) MLA candidates, (8) MLAs, (9) HC judges. Each includes allegiance to Constitution, sovereignty and integrity of India.',
    significance: 'Secular affirmation option allows atheists and non-religious persons to take office without swearing by God.'
  },
  { num: 4, name: 'Allocation of Rajya Sabha Seats', article: 'Art. 4(1), 80(2)', icon: Globe, color: '#059669',
    desc: 'Allocates seats in Rajya Sabha to each state and union territory based on population proportion.',
    detail: 'Total 238 elected + 12 nominated = 250 (max). Uttar Pradesh (31) has highest seats, Sikkim (1) lowest. UTs by law prescribed. President nominates 12 members from literature, science, art, social service.',
    significance: 'Ensures equitable representation of states in the Upper House. Population-based allocation gives larger states more voice.'
  },
  { num: 5, name: 'Scheduled Areas and Scheduled Tribes', article: 'Art. 244(1)', icon: Shield, color: '#DC2626',
    desc: 'Administration and control of Scheduled Areas and Scheduled Tribes in mainland states (except Northeast).',
    detail: 'Applies to 10 states: Andhra Pradesh, Chhattisgarh, Gujarat, Himachal Pradesh, Jharkhand, Madhya Pradesh, Maharashtra, Odisha, Rajasthan, Telangana. Governor can modify laws for STs. Tribal Advisory Council (TAC) mandatory.',
    significance: 'Protects tribal communities from exploitation, preserves customary rights, restricts land transfer to non-tribals.'
  },
  { num: 6, name: 'Tribal Areas in Northeast', article: 'Art. 244(2), 275(1)', icon: Building, color: '#EA580C',
    desc: 'Administration of tribal areas in Assam, Meghalaya, Tripura, Mizoram through Autonomous District Councils (ADCs).',
    detail: 'Assam (3 districts — North Cachar Hills, Karbi Anglong, Bodoland), Meghalaya (3), Tripura (1), Mizoram (3). ADCs have legislative, executive, and judicial powers over land, forests, customary law, marriage, social customs. Can levy taxes.',
    significance: 'Largest autonomy granted to any tribal region in India. Preserves unique tribal identity and customary governance.'
  },
  { num: 7, name: 'Union, State and Concurrent Lists', article: 'Art. 246', icon: BookOpen, color: '#2563EB',
    desc: 'Three-fold distribution of legislative powers between Union and States.',
    detail: 'Union List (100 subjects) — defence, foreign affairs, currency, railways, banking, atomic energy, etc. State List (61 subjects) — police, public health, agriculture, land, local government, etc. Concurrent List (52 subjects) — criminal law, education, forests, marriage, etc. Residuary powers with Union.',
    significance: 'Defines Indian federalism. In case of conflict over Concurrent subject, Union law prevails. 42nd Amendment shifted several subjects from State to Concurrent list.'
  },
  { num: 8, name: 'Official Languages', article: 'Art. 344(1), 351', icon: Languages, color: '#7C3AED',
    desc: 'Lists 22 scheduled languages of India.',
    detail: 'Originally 14 languages (1950) — Assamese, Bengali, Gujarati, Hindi, Kannada, Kashmiri, Malayalam, Marathi, Odia, Punjabi, Sanskrit, Tamil, Telugu, Urdu. Added later — Sindhi (21st Amendment, 1967), Konkani/Manipuri/Nepali (71st Amendment, 1992), Bodo/Dogri/Maithili/Santhali (92nd Amendment, 2003).',
    significance: 'Ensures linguistic diversity and cultural preservation. Hindi is official language of Union, English continues as associate official language. States can adopt their own official language(s).'
  },
  { num: 9, name: 'Land Reform Acts (Protected)', article: 'Art. 31B', icon: Landmark, color: '#059669',
    desc: 'Contains acts and regulations related to land reforms, protected from judicial review on Fundamental Rights grounds.',
    detail: 'Originally 13 acts (1951), now over 280 acts. Includes land ceiling laws, tenancy reforms, zamindari abolition, estate vesting. New acts added periodically through amendments.',
    significance: 'Controversial — provides blanket protection from Fundamental Rights challenges. Supreme Court in I.R. Coelho v. State of Tamil Nadu (2007) ruled that 9th Schedule acts post-1973 can be challenged for violating basic structure.'
  },
  { num: 10, name: 'Anti-Defection Law', article: 'Art. 102(2), 191(2)', icon: Gavel, color: '#DC2626',
    desc: 'Provisions for disqualification of MPs and MLAs on grounds of defection. Added by 52nd Amendment, 1985.',
    detail: 'Disqualification grounds: (1) voluntarily gives up party membership, (2) votes against party whip (unless obtains prior permission and is not condoned within 15 days), (3) independent member joins a party. Exceptions: party merger (2/3 members agree), Speaker/Chairman decision. Decision of Speaker/Chairman is final (not reviewable by court — later modified by SC).',
    significance: 'Kihoto Hollohan v. Zachillhu (1992) — Speaker\'s decision is subject to judicial review. 91st Amendment (2003) strengthened by capping ministers at 15% and barring defectors from becoming ministers.'
  },
  { num: 11, name: 'Panchayat Powers', article: 'Art. 243G', icon: Zap, color: '#FF9933',
    desc: 'Contains 29 functional subjects transferred to Panchayats under 73rd Amendment, 1992.',
    detail: 'Subjects: Agriculture (including agricultural extension), Land improvement/soil conservation, Minor irrigation/water management, Animal husbandry/dairy/poultry, Fisheries, Social forestry/minor forest produce, Small-scale industries, Khadi/village/cottage industries, Rural housing, Drinking water, Fuel and fodder, Roads/drains/bridges, Rural electrification, Poverty alleviation, Education (primary/secondary), Technical training, Adult education, Libraries, Cultural activities, Markets/fairs, Health/sanitation/family welfare, Women/child development, Social welfare (SC/ST), Public distribution system, Maintenance of community assets.',
    significance: 'Constitutional foundation of local self-government. States must devolve these powers; in practice, devolution varies widely.'
  },
  { num: 12, name: 'Municipality Powers', article: 'Art. 243W', icon: Building, color: '#2563EB',
    desc: 'Contains 18 functional subjects for Municipalities under 74th Amendment, 1992.',
    detail: 'Subjects: Urban planning including town planning, Regulation of land-use/construction, Planning for economic/social development, Roads and bridges, Water supply for domestic/industrial/commercial, Public health/sanitation/conservancy/solid waste management, Fire services, Urban forestry/ecology/environment, Safeguarding interests of weaker sections, Slum improvement/upgradation, Urban poverty alleviation, Provision of urban amenities (parks/gardens/playgrounds), Promotion of cultural/educational/aesthetic aspects, Burials/burial grounds/cremations, Cattle pounds/preservation of cattle, Vital statistics including registration of births/deaths, Public amenities including street lighting/parking/bus stops, Regulation of slaughterhouses/tanneries.',
    significance: 'Constitutional foundation of urban local self-government. Empowered Ward Committees and State Finance Commissions for municipalities.'
  },
];

export default function ConstitutionSchedules() {
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
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>12 Schedules</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Link to="/constitution" className="const-nav-chip">Home</Link>
          <Link to="/constitution/writs" className="const-nav-chip">Writs</Link>
          <Link to="/constitution/bodies" className="const-nav-chip">Bodies</Link>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
        Schedules are annexures to the Constitution that contain additional details not covered in the articles. They provide practical, operational content for constitutional provisions. India has 12 Schedules added through various amendments.
      </p>

      {/* Schedule Overview Grid */}
      <div className="const-schedule-overview">
        {SCHEDULES_DATA.map(s => (
          <motion.div
            key={s.num}
            className="const-schedule-chip"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: s.num * 0.03 }}
            onClick={() => setExpanded(expanded === s.num ? null : s.num)}
          >
            <s.icon size={16} color={s.color} />
            <span>{s.num}</span>
          </motion.div>
        ))}
      </div>

      {/* Schedule Cards */}
      <div className="const-schedules-list">
        {SCHEDULES_DATA.map((s, i) => (
          <motion.div
            key={s.num}
            className={`const-schedule-card ${expanded === s.num ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setExpanded(expanded === s.num ? null : s.num)}
          >
            <div className="const-schedule-top" style={{ borderLeftColor: s.color }}>
              <div className="const-schedule-num" style={{ background: `${s.color}15`, color: s.color }}>
                Schedule {s.num < 10 ? `0${s.num}` : s.num}
              </div>
              <div className="const-schedule-info">
                <div className="const-schedule-name">{s.name}</div>
                <div className="const-schedule-articles">{s.article}</div>
              </div>
            </div>

            <div className="const-schedule-desc">{s.desc}</div>

            <AnimatePresence>
              {expanded === s.num && (
                <motion.div
                  className="const-schedule-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="const-body-detail-section">
                    <span className="const-body-detail-label">Details</span>
                    <p>{s.detail}</p>
                  </div>
                  <div className="const-body-detail-section">
                    <span className="const-body-detail-label">Significance</span>
                    <p>{s.significance}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {expanded !== s.num && (
              <div className="const-writ-hint">Tap to expand ▼</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
