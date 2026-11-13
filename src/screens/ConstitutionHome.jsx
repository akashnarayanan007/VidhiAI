import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, ScrollText, Scale, Shield, Bookmark, ArrowLeft, Calendar, Star, Layers, Gavel, Landmark, FileText, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLawsByCategory } from '../services/lawService';

const PREAMBLE = {
  text: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:\n\nJUSTICE, social, economic and political;\nLIBERTY of thought, expression, belief, faith and worship;\nEQUALITY of status and of opportunity;\nand to promote among them all\nFRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;\n\nIN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.",
  keywords: ['Sovereign', 'Socialist', 'Secular', 'Democratic', 'Republic', 'Justice', 'Liberty', 'Equality', 'Fraternity']
};

const CONSTITUTION_PARTS = [
  { part: 'I', title: 'The Union and Its Territory', articles: '1-4', description: 'Name and territory of the Union, admission/establishment of new states.' },
  { part: 'II', title: 'Citizenship', articles: '5-11', description: 'Citizenship at commencement, rights of persons of Indian origin, Parliament\'s power to regulate citizenship.' },
  { part: 'III', title: 'Fundamental Rights', articles: '12-35', description: 'Right to Equality, Freedom, against Exploitation, Freedom of Religion, Cultural/Educational Rights, Constitutional Remedies.' },
  { part: 'IV', title: 'Directive Principles of State Policy', articles: '36-51', description: 'Non-justiciable principles for governance — welfare state, equal pay, free legal aid, village panchayats, environment.' },
  { part: 'IVA', title: 'Fundamental Duties', articles: '51A', description: 'Eleven duties of every citizen — respect Constitution, national flag, anthem, preserve heritage, protect environment.' },
  { part: 'V', title: 'The Union', articles: '52-151', description: 'President, Vice President, PM, Council of Ministers, Parliament, Supreme Court, CAG, Attorney General.' },
  { part: 'VI', title: 'The States', articles: '152-237', description: 'Governor, CM, Council of Ministers, State Legislature, High Courts, Subordinate Courts.' },
  { part: 'VII', title: 'The States in Part B of First Schedule', articles: '238', description: 'REPEALED by 7th Amendment, 1956.' },
  { part: 'VIII', title: 'The Union Territories', articles: '239-243', description: 'Administration of Union Territories, creation of local legislatures.' },
  { part: 'IX', title: 'The Panchayats', articles: '243-243O', description: 'Constitutional status to Panchayati Raj — 73rd Amendment, 1992. Three-tier system, reservations, powers.' },
  { part: 'IXA', title: 'The Municipalities', articles: '243P-243ZG', description: 'Constitutional status to urban local bodies — 74th Amendment, 1992. Wards, reservations, finance.' },
  { part: 'IXB', title: 'Co-operative Societies', articles: '243ZH-243ZT', description: 'Voluntary formation, democratic functioning, professional management — 97th Amendment, 2011.' },
  { part: 'X', title: 'The Scheduled and Tribal Areas', articles: '244-244A', description: 'Administration of Scheduled Areas and Tribal Areas (5th & 6th Schedules).' },
  { part: 'XI', title: 'Relations between the Union and the States', articles: '245-263', description: 'Legislative relations, administrative relations, inter-state councils, Zonal Councils.' },
  { part: 'XII', title: 'Finance, Property, Contracts and Suits', articles: '264-300A', description: 'Distribution of revenues, Finance Commission, contracts, property rights, right to property (Art. 300A).' },
  { part: 'XIII', title: 'Trade, Commerce and Intercourse within the Territory of India', articles: '301-307', description: 'Freedom of trade, restrictions, appointment of authority for trade.' },
  { part: 'XIV', title: 'Services under the Union and the States', articles: '308-323', description: 'Recruitment, conditions of service, Public Service Commissions.' },
  { part: 'XIVA', title: 'Tribunals', articles: '323A-323B', description: 'Administrative Tribunals, tribunals for other matters — 42nd Amendment, 1976.' },
  { part: 'XV', title: 'Elections', articles: '324-329', description: 'Election Commission, adult suffrage, election disputes, delimitation.' },
  { part: 'XVI', title: 'Special Provisions Relating to Certain Classes', articles: '330-342', description: 'Reservation for SC/ST in legislatures, Anglo-Indian nomination, National Commissions for SC/ST/OBC.' },
  { part: 'XVII', title: 'Official Language', articles: '343-351', description: 'Hindi as official language, English transitional, 22 scheduled languages, language of courts.' },
  { part: 'XVIII', title: 'Emergency Provisions', articles: '352-360', description: 'National Emergency, President\'s Rule, Financial Emergency — effects and parliamentary control.' },
  { part: 'XIX', title: 'Miscellaneous', articles: '361-367', description: 'Protection of President/Governors, removal of SC/HC judges, definitions.' },
  { part: 'XX', title: 'Amendment of the Constitution', articles: '368', description: 'Procedure for amendment — special majority + ratification for federal provisions.' },
  { part: 'XXI', title: 'Temporary, Transitional and Special Provisions', articles: '369-392', description: 'Special provisions for Jammu & Kashmir (abrogated Art. 370), Maharashtra/Gujarat, transitional powers.' },
  { part: 'XXII', title: 'Short Title, Commencement, Authoritative Text in Hindi and Repeals', articles: '393-395', description: 'Short title, commencement, Hindi text, repeal of Indian Independence Act.' },
];

const AMENDMENTS = [
  { num: 1, year: 1951, title: 'Added 9th Schedule; reasonable restrictions on freedom of speech & property' },
  { num: 2, year: 1952, title: 'Readjusted representation in Lok Sabha — 1 member = 7.5 lakh population' },
  { num: 3, year: 1954, title: 'Extended limits for legislative seats for SC/ST and Anglo-Indians' },
  { num: 4, year: 1955, title: 'Extended restrictions on property rights; added more entries to 9th Schedule' },
  { num: 5, year: 1955, title: 'Empowered President to prescribe time for State Legislature opinions on bills' },
  { num: 6, year: 1956, title: 'Union and State lists modified; added Jammu & Kashmir in Union list' },
  { num: 7, year: 1956, title: 'Reorganisation of states on linguistic basis; Part VII abolished' },
  { num: 8, year: 1960, title: 'Extended reservation for SC/ST and Anglo-Indians until 1970' },
  { num: 9, year: 1960, title: 'Ceiling on property acquisition; added to 9th Schedule' },
  { num: 10, year: 1961, title: 'Modified deputation rules for Indian Civil Service' },
  { num: 11, year: 1961, title: 'Changed mode of election of Vice President by electoral college' },
  { num: 12, year: 1962, title: 'Added Goa, Daman & Diu as Union Territory' },
  { num: 13, year: 1962, title: 'Created Nagaland with special provisions (Art. 371A)' },
  { num: 14, year: 1962, title: 'Added Pondicherry as Union Territory; representation in Parliament' },
  { num: 15, year: 1963, title: 'Raised retirement age of HC judges to 62; increased SC judge strength' },
  { num: 16, year: 1963, title: 'Sovereignty and integrity of India as reasonable restriction on freedoms' },
  { num: 17, year: 1964, title: 'Brought more land reform acts under 9th Schedule protection' },
  { num: 18, year: 1966, title: 'Created Haryana, Punjab; redefined UT of Chandigarh' },
  { num: 19, year: 1966, title: 'Abolished Election Tribunals; transferred jurisdiction to High Courts' },
  { num: 20, year: 1966, title: 'Added UPSC delegation of powers for Class III/IV appointments' },
  { num: 21, year: 1967, title: 'Added Sindhi as 8th Schedule language (15th official language)' },
  { num: 22, year: 1969, title: 'Created Meghalaya as autonomous state within Assam' },
  { num: 23, year: 1969, title: 'Extended SC/ST reservation until 1980; removed Anglo-Indian nominated seats' },
  { num: 24, year: 1971, title: 'Parliament\'s power to amend Fundamental Rights; President must assent to amendments' },
  { num: 25, year: 1971, title: 'Directive Principles can override Fundamental Rights (Art. 31C); property for public good' },
  { num: 26, year: 1971, title: 'Abolished privy purses and privileges of former rulers' },
  { num: 27, year: 1971, title: 'Created Manipur, Tripura, Meghalaya; established Mizoram, Arunachal UTs' },
  { num: 28, year: 1972, title: 'Abolished special ICS appointments; equalized service conditions' },
  { num: 29, year: 1972, title: 'Added Kerala land reforms to 9th Schedule' },
  { num: 30, year: 1972, title: 'Changed election case appeals from Supreme Court to High Courts' },
  { num: 31, year: 1973, title: 'Increased Lok Sabha seats from 525 to 545' },
  { num: 32, year: 1973, title: 'Protection of Andhra Pradesh regional rights (Art. 371D-E)' },
  { num: 33, year: 1974, title: 'Regulation of private key appointments in Parliament bills' },
  { num: 34, year: 1974, title: 'Added 20 more land reform acts to 9th Schedule' },
  { num: 35, year: 1974, title: 'Associated status to Sikkim (Art. 2A — later repealed)' },
  { num: 36, year: 1975, title: 'Sikkim becomes full state; representation in Parliament' },
  { num: 37, year: 1975, title: 'Created Arunachal Pradesh as UT with legislature' },
  { num: 38, year: 1975, title: 'Made emergency proclamations non-justiciable; extended President\'s rule' },
  { num: 39, year: 1975, title: 'Removed election disputes of PM/Speaker from courts (later struck down)' },
  { num: 40, year: 1976, title: 'Added more acts to 9th Schedule; extended territorial waters limits' },
  { num: 41, year: 1976, title: 'Raised retirement age of State Public Service Commission members to 62' },
  { num: 42, year: 1976, title: 'Father of Indian Constitution — Added Socialist, Secular to Preamble; Fundamental Duties; curbed judicial review; increased Centre power' },
  { num: 43, year: 1977, title: 'Restored HC jurisdiction; removed Article 31A-D (deprived property and certain cases)' },
  { num: 44, year: 1978, title: 'Right to Property removed as FR; added Art. 300A; emergency safeguards restored; Minerva Mills reinforced basic structure' },
  { num: 45, year: 1980, title: 'Extended SC/ST reservation until 1990' },
  { num: 46, year: 1982, title: 'Taxation powers on consignment/inter-state sales; service tax seed' },
  { num: 47, year: 1984, title: 'Added more land reform acts to 9th Schedule (Kerala, West Bengal)' },
  { num: 48, year: 1984, title: 'Extended President\'s rule in Punjab (Art. 356)' },
  { num: 49, year: 1984, title: 'Created Tripura Tribal Areas Autonomous Council' },
  { num: 50, year: 1984, title: 'Restricted Fundamental Rights during emergency (Art. 33 modification)' },
  { num: 51, year: 1984, title: 'Reserved seats for SC/ST in Meghalaya, Nagaland, Arunachal, Mizoram' },
  { num: 52, year: 1985, title: 'Anti-Defection Law — 10th Schedule; disqualification for floor-crossing' },
  { num: 53, year: 1986, title: 'Created Mizoram as full state with special provisions (Art. 371G)' },
  { num: 54, year: 1986, title: 'Increased SC/HC judges\' salaries' },
  { num: 55, year: 1986, title: 'Created Arunachal Pradesh as full state' },
  { num: 56, year: 1987, title: 'Created Goa as full state; Daman & Diu as separate UT' },
  { num: 57, year: 1987, title: 'Reserved seats for SC/ST in Mizoram, Arunachal, Goa' },
  { num: 58, year: 1987, title: 'Hindi publication of authoritative Constitution text' },
  { num: 59, year: 1988, title: 'President\'s rule in Punjab extended to 3 years (later repealed by 63rd)' },
  { num: 60, year: 1988, title: 'Increased professional tax ceiling from Rs 250 to Rs 2,500' },
  { num: 61, year: 1988, title: 'Reduced voting age from 21 to 18' },
  { num: 62, year: 1989, title: 'Extended SC/ST reservation until 2000' },
  { num: 63, year: 1989, title: 'Repealed Art. 356 extension powers from 59th Amendment' },
  { num: 64, year: 1990, title: 'Extended President\'s rule in Punjab' },
  { num: 65, year: 1990, title: 'National Commission for SC/ST (Art. 338) — constitutional body status' },
  { num: 66, year: 1990, title: 'Added more land reform acts to 9th Schedule' },
  { num: 67, year: 1990, title: 'Extended President\'s rule in Punjab beyond 1 year' },
  { num: 68, year: 1991, title: 'Extended President\'s rule in Punjab to 4 years total' },
  { num: 69, year: 1991, title: 'Created Delhi as National Capital Territory with Assembly (Art. 239AA)' },
  { num: 70, year: 1992, title: 'NCT & Pondicherry representation in electoral college for President' },
  { num: 71, year: 1992, title: 'Added Konkani, Manipuri, Nepali to 8th Schedule (22 languages)' },
  { num: 72, year: 1992, title: 'Reserved seats for SC/ST/ST in Tripura' },
  { num: 73, year: 1992, title: 'Panchayati Raj — Part IX; 11th Schedule; 29 subjects to Panchayats' },
  { num: 74, year: 1992, title: 'Municipalities — Part IXA; 12th Schedule; 18 subjects to Urban Local Bodies' },
  { num: 75, year: 1993, title: 'State rent control tribunals under Art. 323B' },
  { num: 76, year: 1994, title: 'Tamil Nadu reservation 69% brought under 9th Schedule' },
  { num: 77, year: 1995, title: 'Reservation in promotions for SC/ST with consequential seniority' },
  { num: 78, year: 1995, title: 'Added more land reform acts to 9th Schedule' },
  { num: 79, year: 1996, title: 'Extended SC/ST reservation until 2010' },
  { num: 80, year: 1997, title: 'Alternative scheme for revenue sharing between Union and States' },
  { num: 81, year: 1997, title: 'SC/ST backlog vacancies carry-forward without 50% cap' },
  { num: 82, year: 1998, title: 'Relaxed qualifying marks for SC/ST in promotions' },
  { num: 83, year: 2000, title: 'Exempted Arunachal from Panchayat reservation for SC' },
  { num: 84, year: 2001, title: 'Extended freeze on Lok Sabha seat allocation until 2026' },
  { num: 85, year: 2002, title: 'Consequential seniority for SC/ST in promotions' },
  { num: 86, year: 2002, title: 'Right to Education (Art. 21A); Fundamental Duty for parents (Art. 51A(k))' },
  { num: 87, year: 2003, title: 'Extended Lok Sabha seat freeze; population basis 2001 census' },
  { num: 88, year: 2003, title: 'Service tax levy by Union (Art. 268A)' },
  { num: 89, year: 2003, title: 'Split National Commission for SC/ST into two — NCSC & NCST' },
  { num: 90, year: 2003, title: 'ST reservation in Assam, Meghalaya, Mizoram, Nagaland' },
  { num: 91, year: 2003, title: 'Anti-Defection strengthened; total ministers capped at 15% of House' },
  { num: 92, year: 2003, title: 'Added Bodo, Dogri, Maithili, Santhali to 8th Schedule' },
  { num: 93, year: 2005, title: 'OBC reservation in educational institutions (Art. 15(5))' },
  { num: 94, year: 2006, title: 'Separate Minister for Tribal Welfare in Bihar, MP, Orissa' },
  { num: 95, year: 2009, title: 'Extended SC/ST reservation until 2020' },
  { num: 96, year: 2011, title: 'Changed Odisha name from Orissa' },
  { num: 97, year: 2011, title: 'Co-operative Societies — Part IXB; right to form cooperatives as FR' },
  { num: 98, year: 2013, title: 'Special provisions for Hyderabad-Karnataka region (Art. 371J)' },
  { num: 99, year: 2014, title: 'National Judicial Appointments Commission (NJAC) — later struck down' },
  { num: 100, year: 2015, title: 'India-Bangladesh Land Boundary Agreement; exchanged enclaves' },
  { num: 101, year: 2016, title: 'Goods and Services Tax (GST) — one nation one tax' },
  { num: 102, year: 2018, title: 'Constitutional status to National Commission for Backward Classes (NCBC)' },
  { num: 103, year: 2019, title: '10% reservation for Economically Weaker Sections (EWS) in education & jobs' },
  { num: 104, year: 2020, title: 'Extended SC/ST reservation until 2030; removed Anglo-Indian nominated seats' },
  { num: 105, year: 2021, title: 'Restored states\' power to identify OBCs; overrode Supreme Court ruling' },
  { num: 106, year: 2023, title: 'Reserved one-third of Lok Sabha & State Assemblies for women (Nari Shakti Vandan Adhiniyam)' },
];

const CONST_BODIES = [
  { name: 'President of India', article: 'Art. 52-62', icon: '🏛️', desc: 'Constitutional head of the State, Supreme Commander of Armed Forces, elected by electoral college.' },
  { name: 'Vice President', article: 'Art. 63-73', icon: '🏛️', desc: 'Ex-officio Chairman of Rajya Sabha, acts as President when office vacant.' },
  { name: 'Parliament', article: 'Art. 79-122', icon: '📜', desc: 'Bicameral legislature — Lok Sabha (545) + Rajya Sabha (245).' },
  { name: 'Supreme Court', article: 'Art. 124-147', icon: '⚖️', desc: 'Apex court, guardian of Constitution, power of judicial review.' },
  { name: 'High Courts', article: 'Art. 214-232', icon: '⚖️', desc: 'Highest judicial body in each state, writ jurisdiction, appellate authority.' },
  { name: 'Comptroller & Auditor General (CAG)', article: 'Art. 148-151', icon: '📊', desc: 'Guardian of public purse, audits all government accounts.' },
  { name: 'Attorney General of India', article: 'Art. 76', icon: '⚖️', desc: 'Highest law officer, advises Government, appears in courts.' },
  { name: 'Election Commission', article: 'Art. 324', icon: '🗳️', desc: 'Superintends elections to Parliament, State Legislatures, President & VP.' },
  { name: 'Finance Commission', article: 'Art. 280', icon: '💰', desc: 'Quinquennial body recommending revenue distribution between Union & States.' },
  { name: 'Union Public Service Commission (UPSC)', article: 'Art. 315-323', icon: '📋', desc: 'Central recruiting agency for All India Services & Group A Central Services.' },
  { name: 'State Public Service Commission (SPSC)', article: 'Art. 315-323', icon: '📋', desc: 'State-level recruiting agency; members appointed by Governor.' },
  { name: 'National Commission for SCs', article: 'Art. 338', icon: '🛡️', desc: 'Monitors safeguards for Scheduled Castes, investigates violations.' },
  { name: 'National Commission for STs', article: 'Art. 338A', icon: '🛡️', desc: 'Monitors safeguards for Scheduled Tribes, tribal welfare.' },
  { name: 'National Commission for OBCs', article: 'Art. 338B', icon: '🛡️', desc: 'Constitutional body for backward classes welfare (102nd Amendment).' },
  { name: 'Lokpal', article: 'Art. 63A', icon: '🔍', desc: 'Anti-corruption ombudsman at Union level, investigates public officials.' },
  { name: 'National Human Rights Commission (NHRC)', article: 'Art. 338', icon: '🤝', desc: 'Protects human rights, investigates complaints, recommends compensation.' },
];

const WRITS = [
  { name: 'Habeas Corpus', latin: '"You shall have the body"', article: 'Art. 32 & 226', icon: '🔴', color: '#DC2626', purpose: 'Produce an unlawfully detained person before court', when: 'Illegal detention, arrest without cause, police custody beyond 24 hours', courts: 'Supreme Court (Art. 32), High Court (Art. 226)', example: 'ADM Jabalpur v. Shivkant Shukla (1976) — suspended during Emergency; later upheld by K.S. Puttaswamy (2017) — right to life & liberty is basic structure', procedure: 'Petitioner files before court; court issues rule nisi; respondent must produce detainee and justify detention' },
  { name: 'Mandamus', latin: '"We command"', article: 'Art. 32 & 226', icon: '⚖️', color: '#2563EB', purpose: 'Command a public official to perform their legal duty', when: 'Public official refuses to act, failure to perform statutory duty, illegal refusal of license/permit', courts: 'Supreme Court (Art. 32), High Court (Art. 226); not available against President, Governor, or private individuals', example: 'Chief Justice v. R.C. Lahoti (2005) — mandamus for judicial appointments; S.P. Gupta v. UOI (1982) — can\'t compel President to exercise discretion', procedure: 'Demand justice first; if refused, file petition; court issues direction enforceable by contempt' },
  { name: 'Certiorari', latin: '"To be certified"', article: 'Art. 32 & 226', icon: '📋', color: '#7C3AED', purpose: 'Quash an order passed by an inferior court/tribunal exceeding jurisdiction', when: 'Tribunal acts without jurisdiction, error of law on face of record, violation of natural justice', courts: 'Supreme Court (Art. 32), High Court (Art. 226) against tribunals and quasi-judicial bodies', example: 'S.L. Kapoor v. Jagmohan (1980) — certiorari for violation of natural justice; Tata Cellular v. UOI (1994) — limited to procedural impropriety', procedure: 'Apply to HC within 90 days; court examines record and quashes illegal orders' },
  { name: 'Prohibition', latin: '"We forbid"', article: 'Art. 32 & 226', icon: '🚫', color: '#EA580C', purpose: 'Prevent an inferior court/tribunal from exceeding its jurisdiction', when: 'Case pending before lower court/tribunal acting beyond its jurisdiction', courts: 'Supreme Court (Art. 32), High Court (Art. 226); issued before decision is made (preventive)', example: 'Hari Vishnu Kamath v. Ahmad Ishaque (1955) — prohibition vs certiorari distinction; East India Commercial Co. v. Collector (1962) — prohibition to prevent illegal proceedings', procedure: 'File before HC while case is pending; court issues prohibition restraining further proceedings' },
  { name: 'Quo Warranto', latin: '"By what authority"', article: 'Art. 32 & 226', icon: '❓', color: '#059669', purpose: 'Challenge the legal authority of a person holding a public office', when: 'Person holds public office without qualification, appointment illegal, usurpation of office', courts: 'Supreme Court (Art. 32), High Court (Art. 226)', example: 'K. Veeraswami v. UOI (1991) — quo warranto against corruption-accused CJI; N. Kannadasan v. Ajoy Khose (2009) — can\'t challenge on eligibility alone', procedure: 'Petitioner proves office is public and respondent holds without authority; court may declare office vacant' },
];

const SCHEDULES = [
  { num: 1, name: 'States and Union Territories', articles: 'Art. 1-4', description: 'Lists 28 states and 8 union territories with their territorial boundaries.', subjects: 'State names, territorial extent, boundary definitions' },
  { num: 2, name: 'Salaries and Emoluments', articles: 'Art. 59(3), 65(3), 75(6), 125, 148(3), 164(5), 186, 221, 236', description: 'Specifies salaries, allowances, and privileges of President, Governors, Supreme Court & High Court judges, CAG, Speaker, etc.', subjects: 'Salary fixation, allowances, privileges, post-retirement benefits' },
  { num: 3, name: 'Forms of Oaths and Affirmations', articles: 'Art. 75(4), 99, 124(6), 148(2), 164(3), 188, 219', description: 'Prescribes the oath of office for Union Ministers, MPs, Supreme Court & High Court judges, CAG, State Ministers, MLAs.', subjects: 'Oath of allegiance to Constitution, secular affirmation option' },
  { num: 4, name: 'Allocation of Rajya Sabha Seats', articles: 'Art. 4(1), 80(2)', description: 'Allocates seats in Rajya Sabha to each state/UT based on population.', subjects: 'State-wise representation, nomination of 12 members by President' },
  { num: 5, name: 'Scheduled Areas and Scheduled Tribes', articles: 'Art. 244(1)', description: 'Administration and control of Scheduled Areas and STs in mainland states.', subjects: 'Tribal advisory councils, Governor\'s special powers, land protection' },
  { num: 6, name: 'Tribal Areas in Northeast', articles: 'Art. 244(2), 275(1)', description: 'Administration of tribal areas in Assam, Meghalaya, Tripura, Mizoram — Autonomous District Councils.', subjects: 'ADC powers, customary law, land & forest management, judicial authority' },
  { num: 7, name: 'Union, State and Concurrent Lists', articles: 'Art. 246', description: 'Three-fold distribution of legislative powers: Union List (100 subjects), State List (61 subjects), Concurrent List (52 subjects).', subjects: 'Parliament exclusive, State exclusive, both can legislate (Central prevails)' },
  { num: 8, name: 'Official Languages', articles: 'Art. 344(1), 351', description: 'Lists 22 scheduled languages: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kashmiri, Kannada, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu.', subjects: 'Official language of the Union, regional languages, language of courts' },
  { num: 9, name: 'Land Reform Acts (Protected)', articles: 'Art. 31B', description: 'Contains Acts & regulations related to land reforms, protected from judicial review on Fundamental Rights grounds.', subjects: 'Land ceiling, tenancy reforms, abolition of zamindari, estate vesting' },
  { num: 10, name: 'Anti-Defection Law', articles: 'Art. 102(2), 191(2)', description: 'Provisions for disqualification of MPs/MLAs on grounds of defection. Added by 52nd Amendment, 1985.', subjects: 'Voluntary resignation, voting against party whip, split exemptions, Speaker\'s decision' },
  { num: 11, name: 'Panchayat Powers', articles: 'Art. 243G', description: 'Contains 29 functional subjects for Panchayats under 73rd Amendment, 1992.', subjects: 'Agriculture, education, health, women/child development, poverty alleviation, public distribution' },
  { num: 12, name: 'Municipality Powers', articles: 'Art. 243W', description: 'Contains 18 functional subjects for Municipalities under 74th Amendment, 1992.', subjects: 'Urban planning, roads, water supply, sanitation, public health, slum improvement' },
];

const STATS = [
  { label: 'Articles', value: 448, icon: FileText },
  { label: 'Parts', value: 25, icon: BookOpen },
  { label: 'Schedules', value: 12, icon: Layers },
  { label: 'Amendments', value: 106, icon: Star },
  { label: 'Official Languages', value: 22, icon: Gavel },
  { label: 'Years in Making', value: '2y 11m', icon: Calendar },
];

function PartAccordion({ partData, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`const-part-card ${open ? 'open' : ''}`}>
      <button className="const-part-header" onClick={() => setOpen(!open)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="const-part-badge">Part {partData.part}</span>
          <div>
            <div className="const-part-title">{partData.title}</div>
            <div className="const-part-meta">Articles {partData.articles}</div>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color="var(--text-tertiary)" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="const-part-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{partData.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConstitutionHome() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [allArticles, setAllArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedArticles, setSearchedArticles] = useState([]);

  useEffect(() => {
    const articles = getLawsByCategory('constitutional');
    setAllArticles(articles);
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchedArticles([]); return; }
    const lower = q.toLowerCase();
    const results = allArticles.filter(a =>
      a.sectionNumber?.toLowerCase().includes(lower) ||
      a.title?.toLowerCase().includes(lower) ||
      a.definition?.toLowerCase().includes(lower)
    ).slice(0, 20);
    setSearchedArticles(results);
  };

  return (
    <div className="screen constitution-screen">
      {/* Header */}
      <div className="const-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link to="/constitution" className={`const-nav-chip ${activeSection === 'home' ? 'active' : ''}`} onClick={() => setActiveSection('home')}>Home</Link>
            <Link to="/constitution/writs" className="const-nav-chip">Writs</Link>
            <Link to="/constitution/bodies" className="const-nav-chip">Bodies</Link>
            <Link to="/constitution/schedules" className="const-nav-chip">Schedules</Link>
          </div>
        </div>

        <div className="const-search-bar">
          <input
            type="text"
            placeholder="Search any article..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="const-search-input"
          />
        </div>

        {searchedArticles.length > 0 && (
          <div className="const-search-results">
            {searchedArticles.map(a => (
              <Link key={a.id} to={`/law/${a.id}`} className="const-search-result" onClick={() => { setSearchQuery(''); setSearchedArticles([]); }}>
                <span className="const-result-section">{a.sectionNumber}</span>
                <span className="const-result-title">{a.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Preamble Hero */}
      <motion.div
        className="const-preamble-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="const-preamble-icon">
          <ScrollText size={32} />
        </div>
        <h2 className="const-preamble-title">PREAMBLE</h2>
        <div className="const-preamble-keywords">
          {PREAMBLE.keywords.map(k => <span key={k} className="const-preamble-tag">{k}</span>)}
        </div>
        <div className="const-preamble-text">
          {PREAMBLE.text.split('\n').map((line, i) => (
            <p key={i} className="const-preamble-line">{line}</p>
          ))}
        </div>
        <div className="const-preamble-date">Adopted: 26 November 1949 • Effective: 26 January 1950</div>
      </motion.div>

      {/* Constitution at a Glance */}
      <div className="const-section">
        <h3 className="const-section-title">
          <Layers size={18} />
          <span>Constitution at a Glance</span>
        </h3>
        <div className="const-stats-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="const-stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <s.icon size={22} className="const-stat-icon" />
              <div className="const-stat-value">{s.value}</div>
              <div className="const-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="const-section">
        <h3 className="const-section-title">
          <Shield size={18} />
          <span>Explore Constitution</span>
        </h3>
        <div className="const-quick-grid">
          <Link to="/constitution/writs" className="const-quick-card" style={{ borderLeftColor: '#DC2626' }}>
            <Gavel size={24} />
            <span>5 Writs</span>
            <span className="const-quick-sub">Habeas Corpus, Mandamus & more</span>
          </Link>
          <Link to="/constitution/bodies" className="const-quick-card" style={{ borderLeftColor: '#2563EB' }}>
            <Landmark size={24} />
            <span>Constitutional Bodies</span>
            <span className="const-quick-sub">15+ organs & institutions</span>
          </Link>
          <Link to="/constitution/schedules" className="const-quick-card" style={{ borderLeftColor: '#7C3AED' }}>
            <FileText size={24} />
            <span>12 Schedules</span>
            <span className="const-quick-sub">States, languages, lists & more</span>
          </Link>
          <Link to="/category/constitutional" className="const-quick-card" style={{ borderLeftColor: '#FF9933' }}>
            <BookOpen size={24} />
            <span>Read Full Constitution</span>
            <span className="const-quick-sub">All 448 articles</span>
          </Link>
        </div>
      </div>

      {/* 25 Parts */}
      <div className="const-section">
        <h3 className="const-section-title">
          <BookOpen size={18} />
          <span>The 25 Parts</span>
        </h3>
        <div className="const-parts-list">
          {CONSTITUTION_PARTS.map((p, i) => (
            <PartAccordion key={p.part} partData={p} defaultOpen={i < 1} />
          ))}
        </div>
      </div>

      {/* Amendment Tracker */}
      <div className="const-section">
        <h3 className="const-section-title">
          <Star size={18} />
          <span>All 106 Amendments</span>
        </h3>
        <div className="const-amendments-list">
          {AMENDMENTS.map(a => (
            <motion.div
              key={a.num}
              className="const-amendment-item"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: (a.num - 1) * 0.003 }}
              viewport={{ once: true }}
            >
              <div className="const-amendment-num">
                <span>{a.num < 10 ? `0${a.num}`.slice(-2) : a.num}</span>
              </div>
              <div className="const-amendment-body">
                <div className="const-amendment-year">{a.year}</div>
                <div className="const-amendment-title">{a.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
