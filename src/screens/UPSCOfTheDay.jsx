import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, RotateCcw, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_DAILY_QUESTIONS = [
  {
    q: 'Which Article of the Indian Constitution deals with the "Right to Life and Personal Liberty"?',
    options: ['Article 19', 'Article 20', 'Article 21', 'Article 22'],
    answer: 2,
    explanation: 'Article 21 guarantees that no person shall be deprived of his life or personal liberty except according to procedure established by law. Article 19 covers freedom of speech, Article 20 protects against ex-post-facto laws, and Article 22 covers protection against arrest and detention.',
    year: 'UPSC Prelims 2020, 2018, 2015',
    topic: 'Fundamental Rights',
  },
  {
    q: 'The "Basic Structure" doctrine of the Indian Constitution was propounded in which case?',
    options: ['Golaknath v. State of Punjab', 'Kesavananda Bharati v. State of Kerala', 'Minerva Mills v. Union of India', 'Maneka Gandhi v. Union of India'],
    answer: 1,
    explanation: 'Kesavananda Bharati (1973) established the Basic Structure Doctrine — that Parliament cannot amend the "basic features" of the Constitution. The 13-judge bench held that Article 368 does not empower Parliament to destroy the basic structure. Golaknath (1967) had held that FRs cannot be amended at all.',
    year: 'UPSC Prelims 1997, 2000, 2005, 2014, 2018',
    topic: 'Constitutional Amendments',
  },
  {
    q: 'Which Schedule of the Constitution deals with the Anti-Defection Law?',
    options: ['9th Schedule', '10th Schedule', '11th Schedule', '12th Schedule'],
    answer: 1,
    explanation: 'The 10th Schedule was added by the 52nd Amendment (1985) to combat political defections. It provides for disqualification of MPs/MLAs on grounds of defection. The 9th Schedule protects land reform acts, 11th Schedule lists Panchayat powers (73rd Amendment), 12th Schedule lists Municipality powers (74th Amendment).',
    year: 'UPSC Prelims 2000, 2008, 2015, 2022',
    topic: 'Schedules of Constitution',
  },
  {
    q: 'Who appoints the Chief Election Commissioner of India?',
    options: ['President', 'Prime Minister', 'Chief Justice of India', 'Vice President'],
    answer: 0,
    explanation: 'The Chief Election Commissioner is appointed by the President under Article 324(2). However, the CEC can only be removed through impeachment like a Supreme Court judge. Election Commissioners are also appointed by the President but can be removed on the recommendation of the CEC.',
    year: 'UPSC Prelims 2005, 2012, 2019',
    topic: 'Constitutional Bodies',
  },
  {
    q: 'The Supreme Court in which case declared "Right to Privacy" as a fundamental right under Article 21?',
    options: ['ADM Jabalpur v. Shivkant Shukla', 'K.S. Puttaswamy v. Union of India', 'M.P. Sharma v. Satish Chandra', 'R. Rajagopal v. State of Tamil Nadu'],
    answer: 1,
    explanation: 'Justice K.S. Puttaswamy v. UOI (2017) — a 9-judge bench unanimously held that right to privacy is a fundamental right under Article 21. It overruled M.P. Sharma (1954) and A.D.M. Jabalpur (1976) which had denied such a right.',
    year: 'UPSC Prelims 2018, 2019, 2020',
    topic: 'Landmark Judgments',
  },
  {
    q: 'Which Amendment to the Constitution introduced the Goods and Services Tax (GST)?',
    options: ['99th Amendment', '100th Amendment', '101st Amendment', '102nd Amendment'],
    answer: 2,
    explanation: 'The 101st Constitutional Amendment (2016) introduced GST, creating a unified indirect tax regime. It added Articles 246A, 269A, 279A and modified several others. The GST Council (Article 279A) was established for harmonizing tax rates.',
    year: 'UPSC Prelims 2017, 2019, 2021',
    topic: 'Constitutional Amendments',
  },
  {
    q: 'Under Article 356, President\'s Rule can be imposed for a maximum period of:',
    options: ['6 months', '1 year', '3 years', 'No limit'],
    answer: 2,
    explanation: 'President\'s Rule can be imposed initially for 6 months, extendable up to 3 years maximum (with parliamentary approval every 6 months). After 1 year, special conditions apply — the EC must certify that elections cannot be held. The 44th Amendment (1978) added these safeguards post-Emergency.',
    year: 'UPSC Prelims 2002, 2010, 2019',
    topic: 'Emergency Provisions',
  },
  {
    q: 'The concept of "Judicial Review" in India is borrowed from which country\'s Constitution?',
    options: ['USA', 'UK', 'Canada', 'Australia'],
    answer: 0,
    explanation: 'Judicial Review is borrowed from the USA. However, unlike the USA where it is implied, India\'s Constitution explicitly provides for judicial review (Articles 13, 32, 131-136, 226, 246, 251, 254). The power to declare laws unconstitutional if they violate fundamental rights is a key feature.',
    year: 'UPSC Prelims 2005, 2012, 2018',
    topic: 'Sources of Constitution',
  },
  {
    q: 'Who was the Chairman of the Drafting Committee of the Indian Constitution?',
    options: ['Jawaharlal Nehru', 'Sardar Patel', 'B.R. Ambedkar', 'Rajendra Prasad'],
    answer: 2,
    explanation: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee. Other members included N. Gopalaswami Ayengar, Alladi Krishnaswamy Iyer, K.M. Munshi, Syed Mohammad Saadulla, N. Madhava Rao, and T.T. Krishnamachari. The Constituent Assembly took 2 years 11 months 18 days to frame the Constitution.',
    year: 'UPSC Prelims 2002, 2010, 2017',
    topic: 'Constituent Assembly',
  },
  {
    q: 'Which Article of the Indian Constitution deals with the Uniform Civil Code?',
    options: ['Article 40', 'Article 44', 'Article 48', 'Article 51'],
    answer: 1,
    explanation: 'Article 44, part of the Directive Principles of State Policy (Part IV), states: "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India." Being a DPSP, it is not judicially enforceable but is fundamental to governance.',
    year: 'UPSC Prelims 2004, 2011, 2019, 2022',
    topic: 'Directive Principles',
  },
  {
    q: 'Money Bills can be introduced only in which House of Parliament?',
    options: ['Lok Sabha', 'Rajya Sabha', 'Either House', 'Must be introduced simultaneously'],
    answer: 0,
    explanation: 'Under Article 110 and 117, Money Bills can only be introduced in the Lok Sabha (on the recommendation of the President). The Rajya Sabha can only make recommendations (within 14 days), which the Lok Sabha may accept or reject. This gives the Lok Sabha primacy over financial matters.',
    year: 'UPSC Prelims 2002, 2009, 2017, 2021',
    topic: 'Parliament',
  },
  {
    q: 'The term of office of the President of India is:',
    options: ['4 years', '5 years', '6 years', '5 years, renewable once'],
    answer: 1,
    explanation: 'The President holds office for 5 years (Article 56). Unlike the US President, there is no term limit — the President can be re-elected any number of times. However, convention has been that Presidents serve only one term. The President may resign by writing to the Vice President.',
    year: 'UPSC Prelims 2004, 2011, 2020',
    topic: 'Union Executive',
  },
  {
    q: 'Which of the following is NOT a fundamental duty under Article 51A?',
    options: ['To safeguard public property', 'To protect the environment', 'To pay taxes', 'To uphold the sovereignty and integrity of India'],
    answer: 2,
    explanation: 'Paying taxes is NOT a fundamental duty. The 11 fundamental duties (added by 42nd Amendment, 1976) include respecting the Constitution, cherishing national ideals, upholding sovereignty, defending the country, promoting harmony, preserving heritage, protecting the environment, scientific temper, safeguarding public property, striving for excellence, and providing education opportunities (added by 86th Amendment).',
    year: 'UPSC Prelims 2003, 2011, 2019',
    topic: 'Fundamental Duties',
  },
  {
    q: 'The President of India can declare emergency under Article 352 on grounds of:',
    options: ['War, external aggression, and armed rebellion', 'War, external aggression, and internal disturbance', 'War, external aggression, armed rebellion, and internal disturbance', 'Only war and external aggression'],
    answer: 0,
    explanation: 'Under Article 352, the President can proclaim National Emergency on grounds of war, external aggression, or armed rebellion. "Internal disturbance" was originally a ground but was replaced by "armed rebellion" through the 44th Amendment (1978). The 44th Amendment also added safeguards like parliamentary approval within 1 month and written cabinet recommendation.',
    year: 'UPSC Prelims 2005, 2012, 2020',
    topic: 'Emergency Provisions',
  },
  {
    q: 'The Finance Commission is constituted every how many years?',
    options: ['3 years', '5 years', '6 years', '10 years'],
    answer: 1,
    explanation: 'The Finance Commission is constituted every 5 years under Article 280 to recommend distribution of tax revenues between the Union and States. The 15th Finance Commission (2021-26) recommended 41% devolution to states. The President may also constitute a Finance Commission earlier if necessary.',
    year: 'UPSC Prelims 2006, 2014, 2021',
    topic: 'Finance Commission',
  },
  {
    q: 'Which Article empowers Parliament to amend the Constitution?',
    options: ['Article 356', 'Article 360', 'Article 368', 'Article 370'],
    answer: 2,
    explanation: 'Article 368 grants Parliament the power to amend the Constitution. Amendments require a special majority (2/3 of members present and voting + absolute majority of total membership). For federal provisions (like SC/HC, President, distribution of powers), ratification by at least half the states is required.',
    year: 'UPSC Prelims 2000, 2008, 2015, 2021',
    topic: 'Constitutional Amendments',
  },
  {
    q: 'Habeas Corpus writ is issued to:',
    options: ['Command a public official to perform a duty', 'Produce an unlawfully detained person before court', 'Quash an illegal order of a lower court', 'Challenge a person\'s authority to hold public office'],
    answer: 1,
    explanation: 'Habeas Corpus ("you shall have the body") is a writ to produce an unlawfully detained person before the court. It protects individual liberty against arbitrary state action. It can be filed by the detained person or anyone on their behalf. During Emergency (1975-77), it was infamously suspended (ADM Jabalpur case).',
    year: 'UPSC Prelims 2001, 2009, 2017',
    topic: 'Writs',
  },
  {
    q: 'The concept of "Welfare State" in the Indian Constitution is reflected in:',
    options: ['Preamble', 'Fundamental Rights', 'Directive Principles of State Policy', 'Fundamental Duties'],
    answer: 2,
    explanation: 'The Directive Principles of State Policy (Part IV, Articles 36-51) embody the concept of a welfare state. They direct the state to secure social, economic, and political justice, raise the standard of living, improve public health, and secure adequate means of livelihood. Dr. Ambedkar called them the "conscience of the Constitution".',
    year: 'UPSC Prelims 2004, 2013, 2020',
    topic: 'Directive Principles',
  },
  {
    q: 'The 73rd Constitutional Amendment is related to:',
    options: ['Municipalities', 'Panchayati Raj', 'Co-operative Societies', 'Land Reforms'],
    answer: 1,
    explanation: 'The 73rd Amendment (1992) added Part IX — Panchayats, and the 11th Schedule listing 29 subjects. It established a three-tier Panchayati Raj system, regular elections, reservations for SC/ST and women (1/3), and the State Finance Commission. The 74th Amendment deals with Municipalities (Part IXA, 12th Schedule).',
    year: 'UPSC Prelims 1998, 2005, 2013, 2018',
    topic: 'Local Self-Government',
  },
  {
    q: 'Sessions of Parliament are prorogued by:',
    options: ['Speaker of Lok Sabha', 'Chairman of Rajya Sabha', 'President', 'Prime Minister'],
    answer: 2,
    explanation: 'Under Article 85, the President prorogues sessions of Parliament. The difference: Adjournment (temporary break by Presiding Officer) vs Prorogation (end of session by President) vs Dissolution (end of Lok Sabha term). Only Lok Sabha can be dissolved; Rajya Sabha is permanent.',
    year: 'UPSC Prelims 2003, 2010, 2019',
    topic: 'Parliament',
  },
  {
    q: 'Which of the following is NOT included in the Union List (7th Schedule)?',
    options: ['Defence', 'Banking', 'Police', 'Currency'],
    answer: 2,
    explanation: 'Police is a State List subject (Entry 1 of State List). The Union List (100 subjects) includes defence, banking, currency, railways, foreign affairs, atomic energy, and inter-state trade. The State List (61 subjects) includes police, public health, agriculture, land, local government.',
    year: 'UPSC Prelims 2005, 2012, 2020',
    topic: '7th Schedule',
  },
  {
    q: 'The power of the Supreme Court to review its own judgments is under:',
    options: ['Article 137', 'Article 141', 'Article 142', 'Article 145'],
    answer: 0,
    explanation: 'Article 137 empowers the Supreme Court to review its own judgments. Article 141 declares that the law declared by the SC is binding. Article 142 empowers the SC to pass orders for complete justice. Article 145 deals with SC rules.',
    year: 'UPSC Prelims 2006, 2015',
    topic: 'Supreme Court',
  },
  {
    q: 'Which Amendment reduced the voting age from 21 to 18?',
    options: ['59th Amendment', '61st Amendment', '62nd Amendment', '73rd Amendment'],
    answer: 1,
    explanation: 'The 61st Amendment (1988) reduced the voting age from 21 to 18 years (Article 326). This was based on the recommendation of the 62nd Constitutional Amendment Report and the need to involve youth in the democratic process. Indira Gandhi had first proposed this in 1983.',
    year: 'UPSC Prelims 1999, 2005, 2014, 2020',
    topic: 'Constitutional Amendments',
  },
  {
    q: 'The concept of "Pocket Veto" is exercised by:',
    options: ['President', 'Governor', 'Chief Justice', 'Speaker'],
    answer: 0,
    explanation: 'The President can use a pocket veto by simply not taking any action on a bill sent for assent. Unlike a regular veto, the pocket veto has no time limit — Article 111 does not prescribe a time limit for Presidential assent. The President can keep the bill pending indefinitely.',
    year: 'UPSC Prelims 2004, 2011, 2019',
    topic: 'President',
  },
  {
    q: 'Under the Indian Constitution, the right to equality is guaranteed by:',
    options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
    answer: 0,
    explanation: 'Article 14 guarantees equality before law and equal protection of laws. It prohibits discrimination by the State. Article 19 covers freedom of speech, Article 21 covers right to life, and Article 32 is the right to constitutional remedies. The "golden triangle" of Articles 14, 19, and 21 was established in Maneka Gandhi (1978).',
    year: 'UPSC Prelims 2002, 2009, 2017, 2022',
    topic: 'Fundamental Rights',
  },
  {
    q: 'In which year was the Constitution of India adopted?',
    options: ['26 January 1950', '26 November 1949', '15 August 1947', '26 January 1949'],
    answer: 1,
    explanation: 'The Constitution was adopted on 26 November 1949 (now celebrated as Constitution Day or Samvidhan Diwas). It came into effect on 26 January 1950 (Republic Day). The Constituent Assembly had 389 members initially, reduced to 299 after Partition.',
    year: 'UPSC Prelims 2003, 2010, 2019',
    topic: 'Basic Facts',
  },
  {
    q: 'The National Emergency under Article 352 has been proclaimed in India how many times?',
    options: ['Once', 'Twice', 'Three times', 'Four times'],
    answer: 2,
    explanation: 'Three times: (1) 1962 (Indo-China War) — External aggression, (2) 1965 (Indo-Pak War) — External aggression, (3) 1975-77 (Internal disturbance/armed rebellion) — controversial Emergency declared by Indira Gandhi. The 44th Amendment (1978) added safeguards to prevent misuse.',
    year: 'UPSC Prelims 2005, 2013, 2020',
    topic: 'Emergency Provisions',
  },
  {
    q: 'The maximum strength of the Rajya Sabha is:',
    options: ['238', '245', '250', '252'],
    answer: 2,
    explanation: 'Under Article 80, the maximum strength of Rajya Sabha is 250 (238 elected + 12 nominated). Currently it has 245 members. The 12 nominated members are persons with expertise in literature, science, art, and social service. Rajya Sabha is a permanent house — 1/3 of members retire every 2 years.',
    year: 'UPSC Prelims 2004, 2011, 2020',
    topic: 'Parliament',
  },
  {
    q: 'The decision of the Supreme Court in the "Vishaka" case dealt with:',
    options: ['Right to privacy', 'Sexual harassment at workplace', 'Freedom of speech', 'Environmental protection'],
    answer: 1,
    explanation: 'Vishaka v. State of Rajasthan (1997) laid down guidelines for preventing sexual harassment at workplace. These guidelines had the force of law under Article 141 until the POSH Act (2013) was enacted. The case arose from the gang rape of Bhanwari Devi, a social worker.',
    year: 'UPSC Prelims 1999, 2008, 2016',
    topic: 'Landmark Judgments',
  },
  {
    q: 'Which of the following is NOT a Fundamental Right under the Indian Constitution?',
    options: ['Right to Freedom', 'Right to Property', 'Right to Equality', 'Right to Constitutional Remedies'],
    answer: 1,
    explanation: 'Right to Property was removed as a Fundamental Right by the 44th Amendment (1978). It is now a legal right under Article 300A — no person shall be deprived of property except by authority of law. The original FRs included Right to Property (Article 31) which was a major point of conflict between Parliament and judiciary.',
    year: 'UPSC Prelims 2000, 2007, 2015, 2021',
    topic: 'Fundamental Rights',
  },
  {
    q: 'The Vice President of India is elected by:',
    options: ['Members of Lok Sabha only', 'Members of Rajya Sabha only', 'Members of both Houses of Parliament', 'Electoral college including MLAs'],
    answer: 2,
    explanation: 'The Vice President is elected by members of both Houses of Parliament (Lok Sabha + Rajya Sabha) through a single transferable vote system. The President is elected by an electoral college of MPs and MLAs. The VP serves as the ex-officio Chairman of Rajya Sabha.',
    year: 'UPSC Prelims 2003, 2011, 2019',
    topic: 'Union Executive',
  },
  {
    q: 'The "Magna Carta" of Indian Constitution regarding Fundamental Rights is often referred to:',
    options: ['Article 14', 'Article 21', 'Article 32', 'Article 19'],
    answer: 2,
    explanation: 'Article 32 is called the "heart and soul" of the Constitution (Dr. Ambedkar) and the "Constitutional remedy" for enforcing Fundamental Rights. It guarantees the right to move the Supreme Court for enforcement of FRs. It can be suspended only during a National Emergency (Article 359).',
    year: 'UPSC Prelims 2005, 2013, 2020',
    topic: 'Fundamental Rights',
  },
  {
    q: 'Which Constitutional body has the power to conduct elections to Panchayats?',
    options: ['Election Commission of India', 'State Election Commission', 'State Finance Commission', 'Panchayati Raj Ministry'],
    answer: 1,
    explanation: 'Under Article 243K, the State Election Commission conducts elections to Panchayats. The State Election Commissioner is appointed by the Governor. Similarly, under Article 243ZA, SEC conducts municipal elections. The ECI conducts Parliament and State Legislature elections.',
    year: 'UPSC Prelims 2008, 2016, 2022',
    topic: 'Local Self-Government',
  },
  {
    q: 'The Constitution of India describes India as a:',
    options: ['Federation', 'Unitary State', 'Quasi-Federal State', 'Union of States'],
    answer: 3,
    explanation: 'Article 1 describes India as a "Union of States" — indicating it is indestructible and states have no right to secede. Dr. Ambedkar said the Constitution is "federal in form but unitary in spirit". It has both federal (division of powers, bicameralism, independent judiciary) and unitary (single constitution, single citizenship, emergency powers) features.',
    year: 'UPSC Prelims 2002, 2009, 2017, 2022',
    topic: 'Basic Features',
  },
  {
    q: 'The Tenth Schedule of the Constitution was added by which Amendment?',
    options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '73rd Amendment'],
    answer: 2,
    explanation: 'The 52nd Amendment (1985) added the 10th Schedule — Anti-Defection Law. It disqualified MPs/MLAs for defecting from their party. The 91st Amendment (2003) further strengthened it by capping ministers at 15% and barring defectors from becoming ministers.',
    year: 'UPSC Prelims 2004, 2011, 2019',
    topic: 'Schedules',
  },
  {
    q: 'The "Doctrine of Pleasure" in Indian Constitution is related to:',
    options: ['President\'s term', 'Governor\'s term', 'Civil servants\' tenure', 'Judges\' tenure'],
    answer: 2,
    explanation: 'Article 310 embodies the "Doctrine of Pleasure" — civil servants hold office during the pleasure of the President/Governor. However, Article 311 provides procedural safeguards — no dismissal without inquiry and reasonable opportunity. The exception is for national security cases.',
    year: 'UPSC Prelims 2006, 2015',
    topic: 'Services Under Union and States',
  },
  {
    q: 'Which Article gives the President the power to consult the Supreme Court?',
    options: ['Article 142', 'Article 143', 'Article 144', 'Article 145'],
    answer: 1,
    explanation: 'Article 143 gives the President the power to seek the Supreme Court\'s opinion on any question of law or fact of public importance. This is called "advisory jurisdiction". The SC\'s opinion is not binding but has persuasive value. Used for matters like NJAC, Ayodhya reference.',
    year: 'UPSC Prelims 2005, 2013, 2020',
    topic: 'Supreme Court',
  },
  {
    q: 'The total number of languages in the Eighth Schedule of the Constitution is:',
    options: ['18', '20', '22', '24'],
    answer: 2,
    explanation: 'The 8th Schedule currently lists 22 languages. Originally 14 (1950), Sindhi added by 21st Amendment (1967), Konkani/Manipuri/Nepali by 71st Amendment (1992), Bodo/Dogri/Maithili/Santhali by 92nd Amendment (2003). Hindi is the official language of the Union; English continues as associate official language.',
    year: 'UPSC Prelims 2004, 2011, 2019',
    topic: 'Official Language',
  },
  {
    q: 'The Constitutional Amendment that introduced Panchayati Raj institutions is:',
    options: ['42nd Amendment', '52nd Amendment', '73rd Amendment', '74th Amendment'],
    answer: 2,
    explanation: 'The 73rd Amendment (1992) added Part IX (Panchayats) and the 11th Schedule (29 subjects). The 74th Amendment added Part IXA (Municipalities) and the 12th Schedule (18 subjects). Both gave constitutional status to local self-government.',
    year: 'UPSC Prelims 1998, 2005, 2013, 2018',
    topic: 'Local Self-Government',
  },
  {
    q: 'The Comptroller and Auditor General of India (CAG) is appointed by:',
    options: ['President', 'Prime Minister', 'Parliament', 'Finance Minister'],
    answer: 0,
    explanation: 'Under Article 148, the CAG is appointed by the President. The CAG holds office for 6 years or up to age 65 (whichever is earlier). The CAG can be removed on grounds of misbehaviour or incapacity (like SC judge). The CAG\'s salary is charged on the Consolidated Fund of India.',
    year: 'UPSC Prelims 2004, 2012, 2020',
    topic: 'Constitutional Bodies',
  },
  {
    q: 'The provision of "Equal Protection of Laws" in the Indian Constitution is borrowed from:',
    options: ['UK', 'USA', 'Canada', 'Ireland'],
    answer: 1,
    explanation: 'Equal protection of laws (Article 14) is borrowed from the US Constitution (14th Amendment). However, India\'s Article 14 combines both the UK concept of "equality before law" and the US concept of "equal protection of laws". "Equality before law" implies absence of special privileges.',
    year: 'UPSC Prelims 2005, 2013, 2021',
    topic: 'Sources of Constitution',
  },
  {
    q: 'Which schedule contains the forms of oaths and affirmations?',
    options: ['Second Schedule', 'Third Schedule', 'Fourth Schedule', 'Fifth Schedule'],
    answer: 1,
    explanation: 'The Third Schedule prescribes the forms of oaths and affirmations for various constitutional functionaries — President, Vice President, Union Ministers, MPs, SC/HC judges, CAG, State Ministers, MLAs, MLCs. It includes a secular affirmation option.',
    year: 'UPSC Prelims 2007, 2015',
    topic: 'Schedules',
  },
];

function getTodayQuestion() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return ALL_DAILY_QUESTIONS[dayOfYear % ALL_DAILY_QUESTIONS.length];
}

export default function UPSCOfTheDay() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const q = getTodayQuestion();
    setQuestion(q);
    // Check if already answered today
    const lastAnswered = localStorage.getItem('upsc-daily-last');
    const today = new Date().toDateString();
    if (lastAnswered === today) {
      const savedAnswer = localStorage.getItem('upsc-daily-answer');
      if (savedAnswer !== null) {
        setAnswered(true);
        setSelected(parseInt(savedAnswer));
        setRevealed(true);
      }
    }
  }, []);

  const handleAnswer = (idx) => {
    if (answered || !question) return;
    setSelected(idx);
    setRevealed(true);
    setAnswered(true);
    localStorage.setItem('upsc-daily-last', new Date().toDateString());
    localStorage.setItem('upsc-daily-answer', idx.toString());
  };

  const handleReset = () => {
    const nextIdx = (ALL_DAILY_QUESTIONS.findIndex(q => q.q === question?.q) + 1) % ALL_DAILY_QUESTIONS.length;
    setQuestion(ALL_DAILY_QUESTIONS[nextIdx]);
    setSelected(null);
    setRevealed(false);
    setAnswered(false);
    setShowExplanation(false);
  };

  if (!question) return null;

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-3)' }}>
        <button className="btn btn-icon btn-ghost" onClick={() => navigate('/upsc')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>UPSC</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>Question of the Day</div>
        </div>
      </div>

      <div className="upsc-daily-topic">
        <Sun size={14} />
        <span>{question.topic}</span>
      </div>

      <div className="upsc-daily-question-card">
        <div className="upsc-daily-q-header">
          <span className="upsc-daily-number">UPSC Daily</span>
          <button className="btn btn-ghost btn-sm" onClick={handleReset}>
            <RotateCcw size={14} />
            <span>Next</span>
          </button>
        </div>

        <div className="upsc-daily-question">
          {question.q}
        </div>

        <div className="upsc-daily-options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={`upsc-daily-option ${
                revealed && i === question.answer ? 'correct' : ''
              } ${
                revealed && i === selected && i !== question.answer ? 'wrong' : ''
              } ${
                !revealed && i === selected ? 'selected' : ''
              }`}
              onClick={() => handleAnswer(i)}
              disabled={answered}
            >
              <div className="upsc-daily-opt-char">{String.fromCharCode(65 + i)}</div>
              <span>{opt}</span>
              {revealed && i === question.answer && <CheckCircle2 size={18} className="upsc-daily-icon-correct" />}
              {revealed && i === selected && i !== question.answer && <XCircle size={18} className="upsc-daily-icon-wrong" />}
            </button>
          ))}
        </div>

        {revealed && (
          <motion.div
            className="upsc-daily-explanation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{question.explanation}</p>
            <div className="upsc-daily-year">
              <strong>📅 {question.year}</strong>
            </div>
          </motion.div>
        )}
      </div>

      <div className="upsc-daily-footer">
        A new question every day. Build your daily UPSC law revision habit.
      </div>
    </div>
  );
}
