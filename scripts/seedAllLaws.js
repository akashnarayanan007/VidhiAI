import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lawsPath = path.join(__dirname, '..', 'src', 'data', 'laws.json');

const seedData = [
  // ============ CONSTITUTIONAL LAW ============
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
      {
        caseName: "Maneka Gandhi v. Union of India",
        year: 1978,
        court: "Supreme Court of India",
        summary: "Supreme Court held that Article 21 procedure must be fair, just and reasonable — not arbitrary. Expanded Article 21 to include right to travel abroad.",
        significance: "This case transformed Article 21 from a narrow procedural right to a broad substantive right. Most important Article 21 case."
      },
      {
        caseName: "K.S. Puttaswamy v. Union of India",
        year: 2017,
        court: "Supreme Court of India",
        summary: "9-judge bench unanimously declared Right to Privacy as a fundamental right under Article 21.",
        significance: "Landmark judgment that forms basis of data protection laws in India. Critical for UPSC."
      },
      {
        caseName: "Olga Tellis v. Bombay Municipal Corporation",
        year: 1985,
        court: "Supreme Court of India",
        summary: "Right to livelihood is part of right to life under Article 21. Pavement dwellers cannot be evicted without rehabilitation.",
        significance: "Extended Article 21 to economic rights — right to livelihood."
      }
    ],
    loopholes: [
      {
        loopholeName: "Procedure Established by Law vs Due Process",
        description: "Article 21 says 'procedure established by law' — originally this meant any procedure Parliament creates is valid, even harsh ones. The AK Gopalan case (1950) used this to justify preventive detention.",
        howPeopleUseIt: "Government uses draconian laws (NSA, UAPA) claiming they follow 'procedure established by law' even if the procedure is unfair.",
        howToOvercome: "After Maneka Gandhi (1978), Supreme Court held the procedure must be 'fair, just and reasonable'. Use this to challenge any arbitrary procedure. File writ petition arguing the law itself is unreasonable.",
        courtStrategy: "Argue both Article 21 (substantive) and Article 14 (equality) — together they require that any law restricting life/liberty must be non-arbitrary and reasonable."
      },
      {
        loopholeName: "State vs Private Actors",
        description: "Article 21 is only enforceable against the 'State' (government). Private individuals violating your rights cannot be directly challenged under Article 21.",
        howPeopleUseIt: "Private hospitals, private employers, and private individuals claim Article 21 doesn't apply to them.",
        howToOvercome: "Use ordinary law (IPC/BNS, Consumer Protection Act, Labour Laws) against private parties. For hospitals, use Consumer Protection Act + Medical Negligence law.",
        courtStrategy: "Argue that if private entity performs public function or is state-aided, Article 21 can apply — use doctrine of 'instrumentality of state'."
      }
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
    simplifiedExplanation: "Every person — rich or poor, powerful or weak, citizen or foreigner — is equal before the law. No one gets special treatment. Two parts: (1) Equality before law — negative concept, no special privileges. (2) Equal protection of laws — positive concept, equals must be treated equally, but unequals can be treated differently (allowing reservations).",
    punishment: "Not applicable — this is a fundamental right. Violation can be challenged via writ petition.",
    whoItAppliesTo: "All persons in India (citizens and non-citizens)",
    realWorldExample: "A government officer cannot get lighter punishment for the same crime than an ordinary citizen. A law that benefits only one religion and not others would violate Article 14.",
    importantCases: [
      {
        caseName: "E.P. Royappa v. State of Tamil Nadu",
        year: 1974,
        court: "Supreme Court",
        summary: "Equality is antithetic to arbitrariness. Any arbitrary state action violates Article 14.",
        significance: "New doctrine: Article 14 strikes at arbitrariness in state action."
      },
      {
        caseName: "Indra Sawhney v. Union of India",
        year: 1992,
        court: "Supreme Court",
        summary: "Mandal Commission case. Upheld OBC reservations but capped total reservations at 50%. Excluded creamy layer.",
        significance: "Defines the boundary of equality vs reservation. Most cited equality case."
      }
    ],
    loopholes: [
      {
        loopholeName: "Reasonable Classification",
        description: "Article 14 allows the State to classify people into groups and treat them differently IF (1) the classification has an intelligible differentia and (2) the differentia has a rational nexus to the object of the law.",
        howPeopleUseIt: "Government creates laws that classify certain groups differently (tax benefits to some industries, reservation policies) and justifies it as 'reasonable classification'.",
        howToOvercome: "Challenge that the classification is arbitrary — has no rational nexus to the object. Use the twin test: intelligible differentia + rational nexus. If either fails, law is unconstitutional.",
        courtStrategy: "File writ petition under Article 32 (Supreme Court) or Article 226 (High Court) challenging the classification as arbitrary under Article 14 read with Article 21."
      }
    ],
    relatedSections: ["art-21", "art-15", "art-16", "art-17", "art-32"],
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
    definition: "All citizens shall have the right to: (a) freedom of speech and expression; (b) assemble peaceably and without arms; (c) form associations; (d) move freely throughout India; (e) reside and settle in any part of India; (g) practise any profession or carry on any occupation, trade or business.",
    simplifiedExplanation: "Six freedoms guaranteed to Indian CITIZENS only (not foreigners). Each freedom has reasonable restrictions — Article 19(2)-(6) allow government to restrict these freedoms for sovereignty, security, public order, decency, morality, contempt of court, defamation, and incitement to an offence.",
    punishment: "Not applicable — fundamental right. Restrictions must pass reasonable test.",
    whoItAppliesTo: "Only Indian citizens (not foreign nationals)",
    realWorldExample: "A journalist can write critically about the government (Article 19(1)(a)). But if they publish fake news that causes riots, the government can restrict it under Article 19(2) — public order restriction.",
    importantCases: [
      {
        caseName: "Romesh Thappar v. State of Madras",
        year: 1950,
        court: "Supreme Court",
        summary: "Freedom of press is part of freedom of speech under Article 19(1)(a). Banning a newspaper needs very strong justification.",
        significance: "Foundation of press freedom in India."
      },
      {
        caseName: "Shreya Singhal v. Union of India",
        year: 2015,
        court: "Supreme Court",
        summary: "Section 66A of IT Act (sending offensive messages online) struck down as unconstitutional — violated Article 19(1)(a).",
        significance: "Protected online free speech. Very important for cyber law + fundamental rights."
      }
    ],
    loopholes: [
      {
        loopholeName: "Vague Restrictions on Speech",
        description: "Government often uses vague terms like 'public order', 'morality', 'decency' to restrict speech. These terms are undefined and give authorities wide discretion.",
        howPeopleUseIt: "Police file cases under sedition (now Section 152 BNS), or UAPA using vague 'public order' justification to silence dissent.",
        howToOvercome: "Challenge restrictions as vague and overbroad. The restriction must have a proximate connection to the stated ground — a 'spark to a powder keg' test established in Ramji Lal Modi case.",
        courtStrategy: "File writ petition. Show that the restriction has no proximate relation to the harm claimed. Use Shreya Singhal judgment which distinguished between 'advocacy' and 'incitement'."
      }
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
    definition: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by Part III (Fundamental Rights) is guaranteed.",
    simplifiedExplanation: "If ANY of your fundamental rights are violated, you can directly approach the SUPREME COURT of India. Dr. Ambedkar called this the 'heart and soul of the Constitution'. The Supreme Court can issue any writ — Habeas Corpus, Mandamus, Certiorari, Prohibition, or Quo Warranto to enforce your rights. This right itself CANNOT be suspended except during National Emergency.",
    punishment: "Not applicable — this is the remedy itself. Violation of fundamental rights can be enforced here.",
    whoItAppliesTo: "All persons whose fundamental rights are violated",
    realWorldExample: "If a person is illegally detained by police without producing before court, they or their family can directly file a Habeas Corpus petition in the Supreme Court under Article 32 — even at midnight if needed (the Supreme Court has heard midnight cases).",
    importantCases: [
      {
        caseName: "Bandhua Mukti Morcha v. Union of India",
        year: 1984,
        court: "Supreme Court",
        summary: "A letter written to the Supreme Court about bonded labour was treated as a writ petition (PIL). Court ordered release and rehabilitation of bonded labourers.",
        significance: "Established that even a postcard to Supreme Court can be treated as PIL under Article 32."
      }
    ],
    loopholes: [
      {
        loopholeName: "Article 32 vs Article 226 — Which Court?",
        description: "Both Supreme Court (Art. 32) and High Courts (Art. 226) can issue writs. Many people go directly to Supreme Court bypassing High Court.",
        howPeopleUseIt: "Litigants bypass High Courts and approach Supreme Court directly, causing overload. Supreme Court now discourages this.",
        howToOvercome: "Supreme Court generally asks petitioners to approach High Court first. Use Article 226 (High Court) for most writ cases — faster and more practical.",
        courtStrategy: "File in High Court under Article 226 first. Approach Supreme Court under Article 32 only if High Court denies or in matters of national importance."
      }
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
    definition: "A writ of Habeas Corpus is issued by the court commanding the person who has detained another to produce the body of the detained person before the court and to show cause for the detention.",
    simplifiedExplanation: "Habeas Corpus literally means 'you shall have the body'. It is the most important writ for protecting personal liberty. When any person is illegally detained — by police, government, or even private individuals — you can file Habeas Corpus in High Court (Art. 226) or Supreme Court (Art. 32). The court orders the detainer to produce the detained person and justify the detention. If not justified, the court orders immediate release.",
    punishment: "If the detainer cannot justify detention, court orders immediate release of the detained person",
    whoItAppliesTo: "Any person who is illegally detained or imprisoned. Can be filed by the detained person themselves or anyone on their behalf.",
    realWorldExample: "A political activist is arrested but not produced before a magistrate within 24 hours as required by law. Their family files Habeas Corpus in the High Court. The High Court orders police to produce the activist and justify the arrest. If police cannot show legal grounds for detention, the court orders immediate release.",
    importantCases: [
      {
        caseName: "ADM Jabalpur v. Shivkant Shukla",
        year: 1976,
        court: "Supreme Court",
        summary: "During Emergency, Supreme Court controversially ruled that Habeas Corpus could be suspended during Emergency and detainees had no right to approach courts.",
        significance: "The darkest moment in Indian judicial history. Led to 44th Amendment making Article 21 non-suspendable."
      },
      {
        caseName: "Sunil Batra v. Delhi Administration",
        year: 1978,
        court: "Supreme Court",
        summary: "Habeas Corpus can be used to protect prisoners from torture and inhuman treatment even while in lawful custody.",
        significance: "Expanded Habeas Corpus beyond release — also protects conditions of detention."
      }
    ],
    loopholes: [
      {
        loopholeName: "Preventive Detention Laws",
        description: "Laws like NSA, UAPA, Goondas Acts allow detention without trial for 3-12 months. The government argues these are legal, blocking Habeas Corpus.",
        howPeopleUseIt: "Government detains people under NSA/UAPA and when Habeas Corpus is filed, argues the detention is legal under these Acts.",
        howToOvercome: "Challenge that detaining authority did not apply mind properly, grounds are vague, order not served in known language, or Advisory Board procedure was not followed.",
        courtStrategy: "File Habeas Corpus AND separately challenge the detention order's constitutionality. Courts check procedural compliance strictly even under preventive detention."
      }
    ],
    relatedSections: ["art-21", "art-22", "art-32", "art-226"],
    difficulty: "Intermediate",
    upscImportance: "Very High",
    tags: ["habeas corpus", "writ", "detention", "liberty", "arrest", "Article 32", "Article 226"],
    aiSearchKeywords: ["illegally detained", "arrested without reason", "missing person", "habeas corpus", "police custody"],
    scenarioTags: ["person detained illegally", "not produced before court", "police custody problem"]
  },
  // ============ CRIMINAL LAW ============
  {
    id: "bns-101",
    lawName: "Bharatiya Nyaya Sanhita 2023",
    shortName: "BNS",
    category: "criminal",
    sectionNumber: "Section 101",
    title: "Culpable Homicide",
    definition: "Whoever causes death (1) with the intention of causing death, or (2) with the intention of causing such bodily injury as is likely to cause death, or (3) with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.",
    simplifiedExplanation: "Culpable homicide = causing someone's death with intention OR knowledge that death may result. There are degrees: (1) Culpable homicide amounting to murder (worst), (2) Culpable homicide not amounting to murder (less severe). Old IPC Section 299 = BNS Section 101.",
    punishment: "Culpable homicide not amounting to murder: Imprisonment for life OR up to 10 years + fine",
    whoItAppliesTo: "Any person who causes death of another human being",
    realWorldExample: "A person driving recklessly kills a pedestrian. They knew reckless driving could cause death but didn't intend to kill. This is culpable homicide not amounting to murder — they get jail but not life imprisonment like a murderer.",
    importantCases: [
      {
        caseName: "K.M. Nanavati v. State of Maharashtra",
        year: 1961,
        court: "Supreme Court",
        summary: "Naval officer killed wife's lover. Question was murder or culpable homicide. Court held it was murder. This was India's last jury trial.",
        significance: "Established the 'grave and sudden provocation' test. Led to abolition of jury trials in India."
      }
    ],
    loopholes: [
      {
        loopholeName: "Thin Line Between Murder and Culpable Homicide",
        description: "The difference between Section 101 (culpable homicide) and Section 103 (murder) is extremely thin — it depends on the degree of intention/knowledge. Defense lawyers exploit this ambiguity.",
        howPeopleUseIt: "Defense argues that accused only had knowledge of possible death, not intention to kill — converting murder charge to culpable homicide, drastically reducing sentence.",
        howToOvercome: "Prosecution must prove specific intention through evidence: premeditation, weapon used, number of blows, target area of body (head = intention to kill). Collect forensic evidence early.",
        courtStrategy: "Present medical evidence showing injuries were on vital parts of body, indicating clear intention to cause death, not mere knowledge."
      }
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
    definition: "Culpable homicide is murder if the act by which the death is caused is done with the intention of causing death, OR with the intention of causing such bodily injury as the offender knows to be likely to cause the death, OR with the intention of causing bodily injury sufficient in the ordinary course of nature to cause death, OR with the knowledge that the act is so imminently dangerous that it must in all probability cause death.",
    simplifiedExplanation: "Murder is the highest form of culpable homicide. Replaces old IPC Section 302. Punishment is death penalty or life imprisonment. Murder has 4 exceptions that reduce it to culpable homicide: (1) grave and sudden provocation, (2) private defence exceeded, (3) public servant exceeding powers, (4) sudden fight without premeditation.",
    punishment: "Death penalty OR imprisonment for life + fine. One of the most serious offences in Indian law.",
    whoItAppliesTo: "Anyone who intentionally kills another person",
    realWorldExample: "A man plans to kill his business partner over a property dispute, buys a weapon, follows the partner and shoots him. This is premeditated murder under Section 103 BNS — maximum punishment is death penalty.",
    importantCases: [
      {
        caseName: "Bachan Singh v. State of Punjab",
        year: 1980,
        court: "Supreme Court",
        summary: "Death penalty is constitutional but should be given only in the 'rarest of rare' cases. Court laid down guidelines for when death penalty can be awarded.",
        significance: "The 'rarest of rare' doctrine — most important case on death penalty in India."
      },
      {
        caseName: "Machhi Singh v. State of Punjab",
        year: 1983,
        court: "Supreme Court",
        summary: "Elaborated factors for 'rarest of rare': manner of murder, motive, anti-social nature of crime, magnitude of crime, personality of victim.",
        significance: "Five-factor test for death penalty. Used in every death penalty case."
      }
    ],
    loopholes: [
      {
        loopholeName: "Four Exceptions to Murder",
        description: "Section 103 has 4 exceptions — if proven, murder reduces to culpable homicide not amounting to murder (lighter sentence). Most common: Exception 1 (grave and sudden provocation) and Exception 4 (sudden fight).",
        howPeopleUseIt: "Defense claims accused was provoked by the victim's words/actions and killed in the heat of the moment — not premeditated murder.",
        howToOvercome: "Prosecution must show there was a cooling period between provocation and the killing. If the accused went home, got a weapon, and came back — there was time to cool down, so it's murder not provoked homicide.",
        courtStrategy: "Establish timeline precisely. Use CCTV, call records, witness accounts to show the gap between alleged provocation and the killing act."
      },
      {
        loopholeName: "Circumstantial Evidence Cases",
        description: "In most murder cases there are no eyewitnesses. Cases rely on circumstantial evidence. The standard is very high — the chain of circumstances must be complete and point exclusively to guilt.",
        howPeopleUseIt: "Defense breaks one link in the chain of circumstantial evidence to create reasonable doubt and seek acquittal.",
        howToOvercome: "Collect strong forensic evidence (DNA, fingerprints, digital footprints). Ensure last seen evidence, motive evidence, and forensic evidence all align without gaps.",
        courtStrategy: "Use Sharad Birdhichand Sarda v. State of Maharashtra (1984) five-point test for circumstantial evidence."
      }
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
    definition: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to 'cheat'.",
    simplifiedExplanation: "Cheating = deceiving someone to get property or make them do something that harms them. Two elements required: (1) Deception (making someone believe something false), (2) Inducement (because of the deception, they gave property or did something harmful to themselves). Old IPC Section 420 = BNS Section 316.",
    punishment: "Up to 7 years imprisonment + fine",
    whoItAppliesTo: "Anyone who fraudulently deceives another person",
    realWorldExample: "A person poses as a government officer and collects 'fees' from farmers promising them loans. The farmers are deceived into paying money they wouldn't have paid if they knew the truth. This is cheating under Section 316 BNS.",
    importantCases: [
      {
        caseName: "Dr. Vimla v. Delhi Administration",
        year: 1963,
        court: "Supreme Court",
        summary: "Held that in cheating, the deception must be the cause of the delivery of property. There must be a direct link between deception and delivery.",
        significance: "Established the causation requirement in cheating — deception must CAUSE the harm."
      }
    ],
    loopholes: [
      {
        loopholeName: "Civil Dispute vs Criminal Cheating",
        description: "Many business disputes are disguised as criminal cheating cases. The Supreme Court has held that a mere breach of contract does not constitute cheating unless there was fraudulent intention from the very beginning.",
        howPeopleUseIt: "Accused argues it was just a business deal that went wrong — a civil dispute — not criminal cheating. This gets the criminal case quashed.",
        howToOvercome: "Prosecution must show the accused had dishonest intention FROM THE START. Collect evidence of false representations made before the transaction.",
        courtStrategy: "Gather all pre-transaction communications showing false promises made before money was given. Show the accused knew the representation was false when making it."
      }
    ],
    relatedSections: ["bns-318", "bns-319", "bns-320"],
    difficulty: "Beginner",
    upscImportance: "High",
    tags: ["cheating", "fraud", "deception", "420 IPC equivalent", "property"],
    aiSearchKeywords: ["cheated", "fraud", "deceived", "false promise", "money taken"],
    scenarioTags: ["someone cheated me", "online fraud", "job fraud", "investment fraud"]
  },
  // ============ CIVIL LAW ============
  {
    id: "cpc-sec9",
    lawName: "Code of Civil Procedure 1908",
    shortName: "CPC",
    category: "civil",
    sectionNumber: "Section 9",
    title: "Courts to try all civil suits unless barred",
    definition: "The Courts shall (subject to the provisions herein contained) have jurisdiction to try all suits of a civil nature excepting suits of which their cognizance is either expressly or impliedly barred.",
    simplifiedExplanation: "Civil courts can hear ALL civil disputes UNLESS a specific law bars civil courts and gives jurisdiction to another body (like a tribunal). Important principle: when in doubt about which court has jurisdiction, the civil court has jurisdiction.",
    punishment: "Not applicable — this is a procedural provision",
    whoItAppliesTo: "Any person filing a civil suit",
    realWorldExample: "A property dispute between two people goes to a civil court. But a dispute between an employee and government goes to the Central Administrative Tribunal (CAT), not civil court — because service matters are 'barred' from civil courts by the Administrative Tribunals Act.",
    importantCases: [
      {
        caseName: "Dhulabhai v. State of Madhya Pradesh",
        year: 1968,
        court: "Supreme Court",
        summary: "Laid down 7 principles to determine when civil court jurisdiction is barred and when tribunals have exclusive jurisdiction.",
        significance: "Most important case on civil court jurisdiction. Dhulabhai principles still used today."
      }
    ],
    loopholes: [
      {
        loopholeName: "Implied Bar of Jurisdiction",
        description: "Many laws don't explicitly say 'civil court jurisdiction is barred' — it's implied. Courts then fight over who has jurisdiction, causing years of delay.",
        howPeopleUseIt: "Defendants raise preliminary objection on jurisdiction to delay cases for years before the actual case is even heard.",
        howToOvercome: "File suit immediately and let court decide jurisdiction question first. Use Order XIV Rule 2 CPC — frame jurisdiction as a preliminary issue and get it decided fast.",
        courtStrategy: "Argue that unless express bar is clear, civil court retains jurisdiction. Use Dhulabhai principles to show no implied bar exists."
      }
    ],
    relatedSections: ["cpc-10", "cpc-11", "cpc-15", "cpc-20"],
    difficulty: "Intermediate",
    upscImportance: "High",
    tags: ["civil court", "jurisdiction", "CPC", "civil suit", "tribunal"],
    aiSearchKeywords: ["civil case", "file civil suit", "civil court jurisdiction", "property dispute"],
    scenarioTags: ["want to file civil case", "property dispute", "contract dispute", "jurisdiction question"]
  },
  // ============ FAMILY LAW ============
  {
    id: "hma-13",
    lawName: "Hindu Marriage Act 1955",
    shortName: "HMA",
    category: "family",
    sectionNumber: "Section 13",
    title: "Divorce under Hindu Law",
    definition: "Any marriage solemnised, whether before or after the commencement of this Act, may, on a petition presented by either the husband or the wife, be dissolved by a decree of divorce on grounds: (i) adultery, (ii) cruelty, (iii) desertion for 2 years, (iv) conversion to another religion, (v) unsoundness of mind, (vi) leprosy, (vii) venereal disease, (viii) renouncement of world, (ix) not heard alive for 7 years.",
    simplifiedExplanation: "Divorce for Hindus (including Sikhs, Jains, Buddhists) requires proving specific legal grounds in court. Most common grounds used: Cruelty (physical or mental) and Desertion (2 years of abandonment). Both husband and wife can file for divorce. Mutual consent divorce is under Section 13B.",
    punishment: "Not applicable — this is civil family law. Court grants divorce decree.",
    whoItAppliesTo: "All Hindus, Sikhs, Jains, and Buddhists married under Hindu Marriage Act",
    realWorldExample: "A wife who is subjected to regular mental harassment, taunts about dowry, and emotional abuse by husband and in-laws can file for divorce on grounds of 'cruelty' under Section 13(1)(ia). She doesn't need to prove physical violence — mental cruelty is sufficient.",
    importantCases: [
      {
        caseName: "Naveen Kohli v. Neelu Kohli",
        year: 2006,
        court: "Supreme Court",
        summary: "Supreme Court recommended adding 'irretrievable breakdown of marriage' as a ground for divorce since many marriages are dead but neither party can prove the existing grounds.",
        significance: "Led to national debate on adding breakdown theory in Indian divorce law."
      },
      {
        caseName: "Shilpa Sailesh v. Varun Sreenivasan",
        year: 2023,
        court: "Supreme Court",
        summary: "Supreme Court can use Article 142 (complete justice) to grant divorce on irretrievable breakdown even if not a ground in law, if marriage is completely dead.",
        significance: "Recent landmark — Supreme Court can bypass technical requirements for divorce in extreme cases."
      }
    ],
    loopholes: [
      {
        loopholeName: "Section 498A used as Counter in Divorce",
        description: "When husband files for divorce or disputes property, wife may file Section 498A BNS (cruelty for dowry) criminal case against husband and in-laws. This was often misused to pressure husbands into favourable divorce settlements.",
        howPeopleUseIt: "To force an out-of-court settlement in divorce proceedings by threatening criminal prosecution of the entire family.",
        howToOvercome: "Supreme Court in Arnesh Kumar (2014) said police cannot automatically arrest in 498A cases — must investigate first. File anticipatory bail application immediately.",
        courtStrategy: "In divorce proceedings, document all evidence of actual cruelty by either party. Don't get rushed into settlement under threat of criminal case."
      }
    ],
    relatedSections: ["hma-13b", "hma-24", "hma-25", "dvc-2005"],
    difficulty: "Beginner",
    upscImportance: "Medium",
    tags: ["divorce", "Hindu", "cruelty", "desertion", "family law"],
    aiSearchKeywords: ["divorce", "marriage", "separation", "husband wife dispute", "matrimonial"],
    scenarioTags: ["want divorce", "husband cruel", "wife left", "marriage breakdown"]
  },
  // ============ CONSUMER LAW ============
  {
    id: "cpa-2019",
    lawName: "Consumer Protection Act 2019",
    shortName: "CPA",
    category: "consumer",
    sectionNumber: "Section 2(7)",
    title: "Definition of Consumer and Consumer Rights",
    definition: "Consumer means any person who buys any goods for a consideration which has been paid or promised and includes any user of such goods other than the person who buys such goods for resale or for any commercial purpose.",
    simplifiedExplanation: "You are a consumer if you buy goods or hire services for personal use (not for resale/business). As a consumer you have 6 rights: (1) Right to Safety, (2) Right to Information, (3) Right to Choose, (4) Right to be Heard, (5) Right to Redressal, (6) Right to Consumer Education.",
    punishment: "Manufacturer/seller can be ordered to: refund money, replace goods, pay compensation, pay punitive damages. Criminal penalty for spurious goods causing death: up to 7 years jail.",
    whoItAppliesTo: "All persons who buy goods or hire services in India",
    realWorldExample: "You buy a new refrigerator. It stops working in 2 months. Company refuses to repair under warranty. You file a complaint in District Consumer Commission. The commission can order full refund + compensation for inconvenience + cost of complaint.",
    importantCases: [
      {
        caseName: "Spring Meadows Hospital v. Harjol Ahluwalia",
        year: 1998,
        court: "Supreme Court",
        summary: "Medical services are 'services' under Consumer Protection Act. Doctors and hospitals can be sued for deficiency in service.",
        significance: "Made doctors accountable under consumer law. Patients are consumers."
      }
    ],
    loopholes: [
      {
        loopholeName: "Commercial Purpose Exclusion",
        description: "If goods/services are bought for commercial purpose (resale, business), you are NOT a consumer. Companies exploit this to exclude business-to-business disputes.",
        howPeopleUseIt: "Seller argues the buyer bought for commercial purpose to kick them out of consumer court (cheaper and faster) and force them to civil court.",
        howToOvercome: "Prove the purchase was for personal use, not resale. Keep receipts and delivery addresses (home address shows personal use). 'Exclusively for self-employment' is allowed.",
        courtStrategy: "Collect evidence of personal use — home delivery address, personal bills, usage pattern. Consumer courts are sympathetic to individual consumers."
      }
    ],
    relatedSections: ["cpa-35", "cpa-41", "cpa-49", "cpa-58"],
    difficulty: "Beginner",
    upscImportance: "High",
    tags: ["consumer", "rights", "complaint", "refund", "deficiency in service"],
    aiSearchKeywords: ["consumer complaint", "product defect", "service problem", "refund", "company cheated"],
    scenarioTags: ["bad product", "no refund", "service not delivered", "company not responding", "medical negligence"]
  },
  // ============ ADMINISTRATIVE LAW / RTI ============
  {
    id: "rti-6",
    lawName: "Right to Information Act 2005",
    shortName: "RTI",
    category: "administrative",
    sectionNumber: "Section 6",
    title: "Request for obtaining Information",
    definition: "A person who desires to obtain any information under this Act shall make a request in writing or through electronic means in English or Hindi or in the official language of the area in which the application is being made, to the Central Public Information Officer or State Public Information Officer of the concerned public authority.",
    simplifiedExplanation: "Any Indian citizen can ask ANY government office for ANY information by filing an RTI application. Pay ₹10 fee. Government MUST reply within 30 days (48 hours if life/liberty is involved). No need to give reasons for asking. If they don't reply or refuse wrongly, file First Appeal, then Second Appeal to Information Commission.",
    punishment: "If Public Information Officer wrongly refuses/delays: penalty of ₹250/day up to ₹25,000 + disciplinary action",
    whoItAppliesTo: "Any Indian citizen can file RTI against any public authority (government body)",
    realWorldExample: "A student files RTI asking why their scholarship was rejected. Government must provide the reason within 30 days. If they don't, the PIO pays ₹250/day penalty and the student gets compensation. RTI has exposed numerous government scams and corruption.",
    importantCases: [
      {
        caseName: "CBSE v. Aditya Bandopadhyay",
        year: 2011,
        court: "Supreme Court",
        summary: "Students have the right to see their evaluated answer sheets under RTI. Educational institutions receiving government funding are covered by RTI.",
        significance: "Expanded RTI to examination boards and educational institutions."
      }
    ],
    loopholes: [
      {
        loopholeName: "Exemptions Under Section 8",
        description: "Section 8 of RTI lists 10 exemptions where government can REFUSE to give information: national security, cabinet notes, personal information of third parties, trade secrets, ongoing investigations, etc.",
        howPeopleUseIt: "Government departments routinely cite Section 8 exemptions to refuse information even when the exemption doesn't actually apply.",
        howToOvercome: "File First Appeal arguing that the exemption doesn't apply. Request the Information Commission to examine the documents and give only non-exempt portions (severability principle). Section 10 allows partial disclosure.",
        courtStrategy: "In second appeal to CIC/SIC, argue that the public interest in disclosure outweighs the harm — RTI Act has a public interest override even for Section 8 exemptions."
      }
    ],
    relatedSections: ["rti-7", "rti-8", "rti-19", "rti-20"],
    difficulty: "Beginner",
    upscImportance: "Very High",
    tags: ["RTI", "information", "transparency", "government", "accountability"],
    aiSearchKeywords: ["government information", "RTI", "right to information", "public records", "government reply"],
    scenarioTags: ["want government information", "government not responding", "corruption evidence", "file RTI"]
  }
];

// Merge seed data into laws.json (replace existing entries with same id, add new ones)
let existing = [];
try {
  existing = JSON.parse(fs.readFileSync(lawsPath, 'utf-8'));
} catch {
  existing = [];
}

const existingIds = new Set(existing.map(l => l.id));
const seedIds = new Set(seedData.map(l => l.id));

// Keep existing entries that aren't being replaced by seed data
const kept = existing.filter(l => !seedIds.has(l.id));
const merged = [...kept, ...seedData];

fs.writeFileSync(lawsPath, JSON.stringify(merged, null, 2), 'utf-8');

console.log(`✅ Seed complete!`);
console.log(`   - ${seedData.length} seed entries added/updated`);
console.log(`   - ${kept.length} existing entries preserved`);
console.log(`   - ${merged.length} total laws in database`);
console.log(`   Categories seeded:`);
const cats = [...new Set(seedData.map(l => l.category))];
cats.forEach(c => {
  const count = seedData.filter(l => l.category === c).length;
  console.log(`     • ${c}: ${count} laws`);
});
