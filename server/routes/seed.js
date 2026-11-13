import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

const lawsPath = path.join(__dirname, '..', '..', 'src', 'data', 'laws.json');

const seedData = [
  {
    id: "art-21",
    lawName: "Constitution of India",
    shortName: "Constitution",
    category: "constitutional",
    sectionNumber: "Article 21",
    title: "Protection of Life and Personal Liberty",
    definition: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    simplifiedExplanation: "Every person in India has the right to live with dignity and personal freedom. The government or police cannot take away your life or freedom without following a fair legal process. The Supreme Court has expanded this article to include right to privacy, right to livelihood, right to health, right to education, right to clean environment, and right to speedy trial.",
    punishment: "Violation by state authorities can lead to writ petitions and compensation to victim",
    whoItAppliesTo: "All persons in India (citizens and non-citizens both)",
    realWorldExample: "If police keep a person in jail without producing them before a magistrate within 24 hours, that person's Article 21 rights are violated. They can file a Habeas Corpus petition in High Court or Supreme Court and must be released immediately.",
    importantCases: [
      { caseName: "Maneka Gandhi v. Union of India", year: 1978, court: "Supreme Court of India", summary: "Supreme Court held that Article 21 procedure must be fair, just and reasonable — not arbitrary.", significance: "This case transformed Article 21 from a narrow procedural right to a broad substantive right." },
      { caseName: "K.S. Puttaswamy v. Union of India", year: 2017, court: "Supreme Court of India", summary: "9-judge bench unanimously declared Right to Privacy as a fundamental right under Article 21.", significance: "Landmark judgment that forms basis of data protection laws in India." },
      { caseName: "Olga Tellis v. Bombay Municipal Corporation", year: 1985, court: "Supreme Court of India", summary: "Right to livelihood is part of right to life under Article 21.", significance: "Extended Article 21 to economic rights — right to livelihood." }
    ],
    loopholes: [
      { loopholeName: "Procedure Established by Law vs Due Process", description: "Article 21 says 'procedure established by law' — originally this meant any procedure Parliament creates is valid.", howPeopleUseIt: "Government uses draconian laws (NSA, UAPA) claiming they follow 'procedure established by law'.", howToOvercome: "After Maneka Gandhi (1978), Supreme Court held the procedure must be 'fair, just and reasonable'.", courtStrategy: "Argue both Article 21 and Article 14 — together they require the law to be non-arbitrary." },
      { loopholeName: "State vs Private Actors", description: "Article 21 is only enforceable against the 'State' (government).", howPeopleUseIt: "Private hospitals, employers claim Article 21 doesn't apply to them.", howToOvercome: "Use ordinary law (IPC/BNS, Consumer Protection Act, Labour Laws) against private parties.", courtStrategy: "Argue that if private entity performs public function, Article 21 can apply." }
    ],
    relatedSections: ["art-14", "art-19", "art-22", "art-32"],
    difficulty: "Intermediate",
    upscImportance: "Very High",
    tags: ["fundamental rights", "life", "liberty", "privacy", "habeas corpus"],
    aiSearchKeywords: ["right to life", "personal liberty", "privacy", "arrested", "detained", "livelihood", "dignity"],
    scenarioTags: ["arrested without reason", "detained by police", "evicted from home", "privacy violated"]
  },
  {
    id: "art-14",
    lawName: "Constitution of India",
    shortName: "Constitution",
    category: "constitutional",
    sectionNumber: "Article 14",
    title: "Right to Equality before Law",
    definition: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    simplifiedExplanation: "Every person — rich or poor, powerful or weak, citizen or foreigner — is equal before the law. Two parts: (1) Equality before law — no special privileges. (2) Equal protection of laws — equals must be treated equally, but unequals can be treated differently.",
    punishment: "Not applicable — fundamental right. Violation can be challenged via writ petition.",
    whoItAppliesTo: "All persons in India (citizens and non-citizens)",
    realWorldExample: "A government officer cannot get lighter punishment for the same crime than an ordinary citizen.",
    importantCases: [
      { caseName: "E.P. Royappa v. State of Tamil Nadu", year: 1974, court: "Supreme Court", summary: "Equality is antithetic to arbitrariness.", significance: "Any arbitrary state action violates Article 14." },
      { caseName: "Indra Sawhney v. Union of India", year: 1992, court: "Supreme Court", summary: "Upheld OBC reservations but capped at 50%. Excluded creamy layer.", significance: "Defines boundary of equality vs reservation." }
    ],
    loopholes: [
      { loopholeName: "Reasonable Classification", description: "Article 14 allows classification IF it has an intelligible differentia and rational nexus to the object.", howPeopleUseIt: "Government classifies groups differently and justifies as 'reasonable classification'.", howToOvercome: "Challenge that classification is arbitrary — no rational nexus to the object.", courtStrategy: "File writ petition under Article 32 or Article 226." }
    ],
    relatedSections: ["art-21", "art-15", "art-16", "art-32"],
    difficulty: "Intermediate",
    upscImportance: "Very High",
    tags: ["equality", "fundamental rights", "discrimination", "reservation"],
    aiSearchKeywords: ["equality", "discrimination", "equal protection", "classification"],
    scenarioTags: ["discriminated by government", "unequal treatment", "reservation dispute"]
  },
  {
    id: "art-19",
    lawName: "Constitution of India",
    shortName: "Constitution",
    category: "constitutional",
    sectionNumber: "Article 19",
    title: "Protection of Six Freedoms",
    definition: "All citizens shall have the right to: (a) freedom of speech and expression; (b) assemble peaceably; (c) form associations; (d) move freely throughout India; (e) reside and settle in any part of India; (g) practise any profession.",
    simplifiedExplanation: "Six freedoms guaranteed to Indian CITIZENS only. Each freedom has reasonable restrictions — Article 19(2)-(6) allow government to restrict these freedoms for sovereignty, security, public order.",
    punishment: "Not applicable — fundamental right.",
    whoItAppliesTo: "Only Indian citizens",
    realWorldExample: "A journalist can write critically about the government but if they publish fake news causing riots, the government can restrict it.",
    importantCases: [
      { caseName: "Romesh Thappar v. State of Madras", year: 1950, court: "Supreme Court", summary: "Freedom of press is part of Article 19(1)(a).", significance: "Foundation of press freedom in India." },
      { caseName: "Shreya Singhal v. Union of India", year: 2015, court: "Supreme Court", summary: "Section 66A of IT Act struck down as unconstitutional.", significance: "Protected online free speech." }
    ],
    loopholes: [
      { loopholeName: "Vague Restrictions on Speech", description: "Government uses vague terms like 'public order' to restrict speech.", howPeopleUseIt: "Police file cases under sedition using vague 'public order' justification.", howToOvercome: "Challenge restrictions as vague and overbroad.", courtStrategy: "File writ petition showing no proximate relation to the harm claimed." }
    ],
    relatedSections: ["art-14", "art-21", "art-25", "art-32"],
    difficulty: "Advanced",
    upscImportance: "Very High",
    tags: ["freedom", "speech", "expression", "press", "assembly", "movement"],
    aiSearchKeywords: ["free speech", "press freedom", "protest", "assembly", "right to protest"],
    scenarioTags: ["free speech blocked", "protest banned", "newspaper banned", "social media blocked"]
  },
  {
    id: "art-32",
    lawName: "Constitution of India",
    shortName: "Constitution",
    category: "constitutional",
    sectionNumber: "Article 32",
    title: "Right to Constitutional Remedies",
    definition: "The right to move the Supreme Court for enforcement of Fundamental Rights is guaranteed.",
    simplifiedExplanation: "If ANY fundamental right is violated, you can directly approach the Supreme Court. The Supreme Court can issue Habeas Corpus, Mandamus, Certiorari, Prohibition, or Quo Warranto.",
    punishment: "Not applicable — this is the remedy itself.",
    whoItAppliesTo: "All persons whose fundamental rights are violated",
    realWorldExample: "If a person is illegally detained, they can file Habeas Corpus in the Supreme Court under Article 32.",
    importantCases: [
      { caseName: "Bandhua Mukti Morcha v. Union of India", year: 1984, court: "Supreme Court", summary: "A letter about bonded labour treated as PIL under Article 32.", significance: "Even a postcard can be treated as PIL." }
    ],
    loopholes: [
      { loopholeName: "Article 32 vs Article 226", description: "Both Supreme Court and High Courts can issue writs.", howPeopleUseIt: "Litigants bypass High Courts causing Supreme Court overload.", howToOvercome: "File in High Court under Article 226 first — faster and more practical.", courtStrategy: "Use Article 32 only if High Court denies or in matters of national importance." }
    ],
    relatedSections: ["art-14", "art-21", "art-226", "art-136"],
    difficulty: "Intermediate",
    upscImportance: "Very High",
    tags: ["remedies", "writs", "Supreme Court", "PIL", "enforcement"],
    aiSearchKeywords: ["Supreme Court case", "writ petition", "fundamental right enforcement", "approaching court"],
    scenarioTags: ["rights violated", "want to go to court", "file case in Supreme Court"]
  },
  {
    id: "writ-habeas-corpus",
    lawName: "Constitutional Writs",
    shortName: "Writs",
    category: "constitutional",
    sectionNumber: "Habeas Corpus",
    title: "Habeas Corpus — Right to Personal Liberty",
    definition: "A writ commanding the detainer to produce the detained person before the court and show cause for detention.",
    simplifiedExplanation: "Habeas Corpus means 'you shall have the body'. File in High Court (Art. 226) or Supreme Court (Art. 32) when someone is illegally detained. Court orders immediate release if detention is unjustified.",
    punishment: "If detention cannot be justified, court orders immediate release.",
    whoItAppliesTo: "Any person illegally detained. Can be filed by anyone on their behalf.",
    realWorldExample: "A political activist is arrested without being produced before a magistrate within 24 hours. Family files Habeas Corpus. If police cannot justify, court orders release.",
    importantCases: [
      { caseName: "ADM Jabalpur v. Shivkant Shukla", year: 1976, court: "Supreme Court", summary: "Habeas Corpus controversially suspended during Emergency.", significance: "Led to 44th Amendment making Article 21 non-suspendable." },
      { caseName: "Sunil Batra v. Delhi Administration", year: 1978, court: "Supreme Court", summary: "Habeas Corpus protects prisoners from torture.", significance: "Expanded Habeas Corpus to conditions of detention." }
    ],
    loopholes: [
      { loopholeName: "Preventive Detention Laws", description: "Laws like NSA, UAPA allow detention without trial.", howPeopleUseIt: "Government detains and argues detention is legal under these Acts.", howToOvercome: "Challenge that detaining authority did not apply mind, grounds are vague, or procedure not followed.", courtStrategy: "File Habeas Corpus AND challenge detention order separately." }
    ],
    relatedSections: ["art-21", "art-22", "art-32", "art-226"],
    difficulty: "Intermediate",
    upscImportance: "Very High",
    tags: ["habeas corpus", "writ", "detention", "liberty", "arrest"],
    aiSearchKeywords: ["illegally detained", "arrested without reason", "habeas corpus", "police custody"],
    scenarioTags: ["person detained illegally", "not produced before court", "police custody problem"]
  },
  {
    id: "bns-101",
    lawName: "Bharatiya Nyaya Sanhita 2023",
    shortName: "BNS",
    category: "criminal",
    sectionNumber: "Section 101",
    title: "Culpable Homicide",
    definition: "Whoever causes death with intention of causing death, or with intention of causing such bodily injury as is likely to cause death, or with knowledge that he is likely by such act to cause death, commits culpable homicide.",
    simplifiedExplanation: "Culpable homicide = causing death with intention OR knowledge that death may result. Two degrees: amounting to murder and not amounting to murder.",
    punishment: "Culpable homicide not amounting to murder: Imprisonment for life OR up to 10 years + fine",
    whoItAppliesTo: "Any person who causes death of another human being",
    realWorldExample: "A person driving recklessly kills a pedestrian. They knew reckless driving could cause death but didn't intend to kill.",
    importantCases: [
      { caseName: "K.M. Nanavati v. State of Maharashtra", year: 1961, court: "Supreme Court", summary: "Naval officer killed wife's lover. Question of murder vs culpable homicide.", significance: "Established 'grave and sudden provocation' test. Last jury trial in India." }
    ],
    loopholes: [
      { loopholeName: "Thin Line Between Murder and Culpable Homicide", description: "Difference depends on degree of intention/knowledge.", howPeopleUseIt: "Defense argues accused had only knowledge, not intention — reducing charge.", howToOvercome: "Prove specific intention through evidence: premeditation, weapon, target area.", courtStrategy: "Present medical evidence showing injuries on vital parts indicating intention to kill." }
    ],
    relatedSections: ["bns-103", "bns-100", "bns-105"],
    difficulty: "Advanced",
    upscImportance: "High",
    tags: ["murder", "homicide", "death", "intention", "BNS", "criminal"],
    aiSearchKeywords: ["killed", "death", "murder", "homicide", "caused death"],
    scenarioTags: ["someone died", "killing", "road accident death"]
  },
  {
    id: "bns-103",
    lawName: "Bharatiya Nyaya Sanhita 2023",
    shortName: "BNS",
    category: "criminal",
    sectionNumber: "Section 103",
    title: "Murder",
    definition: "Culpable homicide is murder if done with intention of causing death, or intention of causing bodily injury sufficient in ordinary course to cause death, or knowledge that the act is so imminently dangerous that it must cause death.",
    simplifiedExplanation: "Murder is the highest form of culpable homicide. 4 exceptions that reduce it: (1) grave and sudden provocation, (2) private defence exceeded, (3) public servant exceeding powers, (4) sudden fight without premeditation.",
    punishment: "Death penalty OR imprisonment for life + fine",
    whoItAppliesTo: "Anyone who intentionally kills another person",
    realWorldExample: "A man plans to kill his business partner over property dispute, buys a weapon, follows and shoots him. This is premeditated murder.",
    importantCases: [
      { caseName: "Bachan Singh v. State of Punjab", year: 1980, court: "Supreme Court", summary: "Death penalty is constitutional but only in 'rarest of rare' cases.", significance: "The 'rarest of rare' doctrine." },
      { caseName: "Machhi Singh v. State of Punjab", year: 1983, court: "Supreme Court", summary: "Five-factor test for death penalty.", significance: "Used in every death penalty case." }
    ],
    loopholes: [
      { loopholeName: "Four Exceptions to Murder", description: "Section 103 has 4 exceptions reducing murder to culpable homicide.", howPeopleUseIt: "Defense claims accused was provoked and killed in heat of the moment.", howToOvercome: "Show cooling period between provocation and killing.", courtStrategy: "Establish timeline precisely with CCTV and call records." },
      { loopholeName: "Circumstantial Evidence Cases", description: "Most murder cases lack eyewitnesses and rely on circumstantial evidence.", howPeopleUseIt: "Defense breaks one link in the chain to create reasonable doubt.", howToOvercome: "Collect strong forensic evidence — DNA, fingerprints, digital footprints.", courtStrategy: "Use Sharad Birdhichand Sarda five-point test for circumstantial evidence." }
    ],
    relatedSections: ["bns-101", "bns-100", "bns-105", "bns-307"],
    difficulty: "Advanced",
    upscImportance: "Very High",
    tags: ["murder", "death penalty", "rarest of rare", "BNS", "Section 302 IPC equivalent"],
    aiSearchKeywords: ["murder", "killed intentionally", "death penalty", "life imprisonment"],
    scenarioTags: ["someone murdered", "intentional killing", "planned murder"]
  },
  {
    id: "bns-316",
    lawName: "Bharatiya Nyaya Sanhita 2023",
    shortName: "BNS",
    category: "criminal",
    sectionNumber: "Section 316",
    title: "Cheating",
    definition: "Whoever, by deceiving any person, fraudulently induces the person to deliver any property, or to do or omit anything causing damage or harm, is said to cheat.",
    simplifiedExplanation: "Cheating = deception + inducement causing harm. Two elements: (1) Deception, (2) Because of deception, the person gave property or acted to their harm.",
    punishment: "Up to 7 years imprisonment + fine",
    whoItAppliesTo: "Anyone who fraudulently deceives another person",
    realWorldExample: "A person poses as a government officer and collects 'fees' from farmers promising loans.",
    importantCases: [
      { caseName: "Dr. Vimla v. Delhi Administration", year: 1963, court: "Supreme Court", summary: "Deception must be the cause of property delivery.", significance: "Causation requirement in cheating." }
    ],
    loopholes: [
      { loopholeName: "Civil Dispute vs Criminal Cheating", description: "Mere breach of contract is not cheating unless fraudulent intention from start.", howPeopleUseIt: "Accused argues it was just a business deal gone wrong.", howToOvercome: "Show dishonest intention FROM THE START through pre-transaction communications.", courtStrategy: "Gather messages and emails showing false promises made before money was given." }
    ],
    relatedSections: ["bns-318", "bns-319", "bns-320"],
    difficulty: "Beginner",
    upscImportance: "High",
    tags: ["cheating", "fraud", "deception", "420 IPC equivalent", "property"],
    aiSearchKeywords: ["cheated", "fraud", "deceived", "false promise", "money taken"],
    scenarioTags: ["someone cheated me", "online fraud", "job fraud", "investment fraud"]
  },
  {
    id: "cpc-sec9",
    lawName: "Code of Civil Procedure 1908",
    shortName: "CPC",
    category: "civil",
    sectionNumber: "Section 9",
    title: "Courts to try all civil suits unless barred",
    definition: "Courts shall have jurisdiction to try all suits of a civil nature excepting suits of which cognizance is expressly or impliedly barred.",
    simplifiedExplanation: "Civil courts can hear ALL civil disputes UNLESS a specific law bars civil courts. When in doubt about jurisdiction, the civil court has jurisdiction.",
    punishment: "Not applicable — procedural provision",
    whoItAppliesTo: "Any person filing a civil suit",
    realWorldExample: "A property dispute goes to civil court. But a government employee dispute goes to CAT — jurisdiction is barred.",
    importantCases: [
      { caseName: "Dhulabhai v. State of Madhya Pradesh", year: 1968, court: "Supreme Court", summary: "7 principles to determine when civil court jurisdiction is barred.", significance: "Most important case on civil court jurisdiction." }
    ],
    loopholes: [
      { loopholeName: "Implied Bar of Jurisdiction", description: "Many laws imply bar without explicit language.", howPeopleUseIt: "Defendants raise jurisdiction objection to delay cases.", howToOvercome: "Frame jurisdiction as preliminary issue under Order XIV Rule 2 CPC.", courtStrategy: "Argue that unless express bar is clear, civil court retains jurisdiction." }
    ],
    relatedSections: ["cpc-10", "cpc-11", "cpc-15", "cpc-20"],
    difficulty: "Intermediate",
    upscImportance: "High",
    tags: ["civil court", "jurisdiction", "CPC", "civil suit", "tribunal"],
    aiSearchKeywords: ["civil case", "file civil suit", "civil court jurisdiction", "property dispute"],
    scenarioTags: ["want to file civil case", "property dispute", "contract dispute", "jurisdiction question"]
  },
  {
    id: "hma-13",
    lawName: "Hindu Marriage Act 1955",
    shortName: "HMA",
    category: "family",
    sectionNumber: "Section 13",
    title: "Divorce under Hindu Law",
    definition: "Marriage may be dissolved by divorce decree on grounds: adultery, cruelty, desertion for 2 years, conversion, unsoundness of mind, leprosy, venereal disease, renouncement of world, not heard alive for 7 years.",
    simplifiedExplanation: "Divorce for Hindus requires proving specific legal grounds. Most common: Cruelty (physical or mental) and Desertion (2 years abandonment). Mutual consent divorce under Section 13B.",
    punishment: "Not applicable — civil family law. Court grants divorce decree.",
    whoItAppliesTo: "Hindus, Sikhs, Jains, Buddhists married under Hindu Marriage Act",
    realWorldExample: "A wife subjected to regular mental harassment and taunts can file for divorce on grounds of cruelty — even without physical violence.",
    importantCases: [
      { caseName: "Naveen Kohli v. Neelu Kohli", year: 2006, court: "Supreme Court", summary: "Recommended adding 'irretrievable breakdown' as divorce ground.", significance: "Led to debate on breakdown theory." },
      { caseName: "Shilpa Sailesh v. Varun Sreenivasan", year: 2023, court: "Supreme Court", summary: "Supreme Court can use Article 142 to grant divorce on irretrievable breakdown.", significance: "Recent landmark — bypasses technical requirements in extreme cases." }
    ],
    loopholes: [
      { loopholeName: "Section 498A used as Counter in Divorce", description: "Wife may file 498A criminal case against husband to pressure settlement.", howPeopleUseIt: "Threaten criminal prosecution to force favourable divorce settlement.", howToOvercome: "Arnesh Kumar (2014) says police cannot automatically arrest. File anticipatory bail.", courtStrategy: "Document all evidence of actual cruelty by either party." }
    ],
    relatedSections: ["hma-13b", "hma-24", "hma-25", "dvc-2005"],
    difficulty: "Beginner",
    upscImportance: "Medium",
    tags: ["divorce", "Hindu", "cruelty", "desertion", "family law"],
    aiSearchKeywords: ["divorce", "marriage", "separation", "husband wife dispute", "matrimonial"],
    scenarioTags: ["want divorce", "husband cruel", "wife left", "marriage breakdown"]
  },
  {
    id: "cpa-2019",
    lawName: "Consumer Protection Act 2019",
    shortName: "CPA",
    category: "consumer",
    sectionNumber: "Section 2(7)",
    title: "Definition of Consumer and Consumer Rights",
    definition: "Consumer means any person who buys goods for consideration and includes any user of such goods other than for resale or commercial purpose.",
    simplifiedExplanation: "You are a consumer if you buy goods or hire services for personal use. You have 6 rights: Safety, Information, Choice, to be Heard, Redressal, Education.",
    punishment: "Refund, replacement, compensation, punitive damages. Spurious goods causing death: up to 7 years jail.",
    whoItAppliesTo: "All persons who buy goods or hire services in India",
    realWorldExample: "A refrigerator stops working in 2 months. Company refuses repair. File complaint in District Consumer Commission for refund + compensation.",
    importantCases: [
      { caseName: "Spring Meadows Hospital v. Harjol Ahluwalia", year: 1998, court: "Supreme Court", summary: "Medical services are 'services' under CPA.", significance: "Patients are consumers. Doctors accountable under consumer law." }
    ],
    loopholes: [
      { loopholeName: "Commercial Purpose Exclusion", description: "Goods bought for commercial purpose are not covered.", howPeopleUseIt: "Seller argues buyer bought for commercial purpose to force them to civil court.", howToOvercome: "Prove purchase was for personal use — home delivery address, personal bills.", courtStrategy: "Collect evidence of personal use. 'Self-employment' purchases are allowed." }
    ],
    relatedSections: ["cpa-35", "cpa-41", "cpa-49", "cpa-58"],
    difficulty: "Beginner",
    upscImportance: "High",
    tags: ["consumer", "rights", "complaint", "refund", "deficiency in service"],
    aiSearchKeywords: ["consumer complaint", "product defect", "service problem", "refund", "company cheated"],
    scenarioTags: ["bad product", "no refund", "service not delivered", "company not responding", "medical negligence"]
  },
  {
    id: "rti-6",
    lawName: "Right to Information Act 2005",
    shortName: "RTI",
    category: "administrative",
    sectionNumber: "Section 6",
    title: "Request for obtaining Information",
    definition: "A person may make a request in writing or electronic means to the CPIO or SPIO of the concerned public authority for information.",
    simplifiedExplanation: "Any Indian citizen can ask ANY government office for ANY information by filing RTI. ₹10 fee. Government MUST reply within 30 days (48 hours for life/liberty).",
    punishment: "PIO penalty: ₹250/day up to ₹25,000 + disciplinary action",
    whoItAppliesTo: "Any Indian citizen against any public authority",
    realWorldExample: "A student files RTI asking why scholarship was rejected. Government must respond in 30 days or pay ₹250/day penalty.",
    importantCases: [
      { caseName: "CBSE v. Aditya Bandopadhyay", year: 2011, court: "Supreme Court", summary: "Students can see evaluated answer sheets under RTI.", significance: "Expanded RTI to educational institutions." }
    ],
    loopholes: [
      { loopholeName: "Exemptions Under Section 8", description: "Section 8 lists 10 exemptions where government can refuse information.", howPeopleUseIt: "Departments cite exemptions even when they don't apply.", howToOvercome: "File First Appeal arguing exemption doesn't apply. Request severability under Section 10.", courtStrategy: "Argue public interest override — even Section 8 exemptions can be outweighed." }
    ],
    relatedSections: ["rti-7", "rti-8", "rti-19", "rti-20"],
    difficulty: "Beginner",
    upscImportance: "Very High",
    tags: ["RTI", "information", "transparency", "government", "accountability"],
    aiSearchKeywords: ["government information", "RTI", "right to information", "public records", "government reply"],
    scenarioTags: ["want government information", "government not responding", "corruption evidence", "file RTI"]
  }
];

router.post('/seed', async (req, res) => {
  try {
    let existing = [];
    try {
      existing = JSON.parse(fs.readFileSync(lawsPath, 'utf-8'));
    } catch {
      existing = [];
    }

    const seedIds = new Set(seedData.map(l => l.id));
    const kept = existing.filter(l => !seedIds.has(l.id));
    const merged = [...kept, ...seedData];

    fs.writeFileSync(lawsPath, JSON.stringify(merged, null, 2), 'utf-8');

    res.json({ success: true, count: seedData.length, total: merged.length });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
