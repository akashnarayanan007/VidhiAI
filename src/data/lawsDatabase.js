export const ALL_LAWS = [

  // ════════════════════════════════════════
  // CONSTITUTIONAL LAW
  // ════════════════════════════════════════

  {
    id: "art-21", category: "Constitutional", sectionNumber: "Article 21",
    lawName: "Constitution of India", shortName: "Constitution",
    title: "Protection of Life and Personal Liberty",
    definition: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    simplifiedExplanation: "Every person in India has the right to live with dignity. Police or government cannot arrest or imprison you without following a fair legal process. Supreme Court has expanded this to include right to privacy, livelihood, health, education, clean environment, and speedy trial.",
    punishment: "Violation allows filing Habeas Corpus writ — immediate release ordered by court",
    whoItAppliesTo: "ALL persons in India — citizens AND foreigners both",
    realWorldExample: "If police keep you in jail without producing you before a magistrate within 24 hours, your Article 21 rights are violated. Your family can file Habeas Corpus in High Court and you must be released immediately.",
    importantCases: [
      { caseName: "Maneka Gandhi v. Union of India", year: 1978, court: "Supreme Court", summary: "Procedure under Article 21 must be fair, just and reasonable — not arbitrary. Also includes right to travel abroad.", significance: "Most important Article 21 case. Transformed it from narrow to broad right." },
      { caseName: "K.S. Puttaswamy v. Union of India", year: 2017, court: "Supreme Court", summary: "Right to Privacy is a fundamental right under Article 21.", significance: "Landmark 9-judge bench judgment. Basis of all data protection laws." },
      { caseName: "Olga Tellis v. Bombay Municipal Corporation", year: 1985, court: "Supreme Court", summary: "Right to livelihood is part of right to life. Pavement dwellers cannot be evicted without rehabilitation.", significance: "Extended Article 21 to economic rights." }
    ],
    loopholes: [
      { loopholeName: "Procedure Established by Law Loophole", description: "Government uses draconian laws (UAPA, NSA) claiming they follow 'procedure established by law' even if the procedure is unfair.", howPeopleUseIt: "Detain activists/journalists under preventive detention laws and argue it's legally valid.", howToOvercome: "After Maneka Gandhi (1978), procedure must be fair, just, reasonable. Challenge any arbitrary procedure in court.", courtStrategy: "Argue Article 21 + Article 14 together — law must be non-arbitrary AND reasonable." },
      { loopholeName: "Only Against State — Not Private Parties", description: "Article 21 only applies against government/state. Private individuals violating your rights cannot be challenged under Article 21 directly.", howPeopleUseIt: "Private hospitals, employers claim Article 21 doesn't apply to them.", howToOvercome: "Use Consumer Protection Act against private hospitals, Labour Laws against employers, IPC/BNS against individuals.", courtStrategy: "If private entity does public function or is state-funded, argue it is 'instrumentality of state' — Article 21 applies." }
    ],
    difficulty: "Intermediate", upscImportance: "Very High",
    tags: ["fundamental rights", "life", "liberty", "privacy", "article 21"]
  },

  {
    id: "art-14", category: "Constitutional", sectionNumber: "Article 14",
    lawName: "Constitution of India", shortName: "Constitution",
    title: "Right to Equality before Law",
    definition: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    simplifiedExplanation: "Everyone is equal before law — rich or poor, powerful or weak. Two parts: (1) Equality before law — no special privileges to anyone. (2) Equal protection — equals treated equally, but unequals can be treated differently (this allows reservations for SC/ST/OBC).",
    punishment: "Any law violating Article 14 can be struck down by Supreme Court as unconstitutional",
    whoItAppliesTo: "All persons in India",
    realWorldExample: "A minister cannot get lighter punishment than an ordinary citizen for the same crime. A law giving tax benefits to only one religion and not others violates Article 14.",
    importantCases: [
      { caseName: "E.P. Royappa v. State of Tamil Nadu", year: 1974, court: "Supreme Court", summary: "Equality is against arbitrariness. ANY arbitrary state action violates Article 14.", significance: "New doctrine: Article 14 strikes at all arbitrary state actions." },
      { caseName: "Indra Sawhney v. Union of India", year: 1992, court: "Supreme Court", summary: "Mandal Commission case. Upheld OBC reservations but capped total reservations at 50%. Creamy layer excluded.", significance: "Defines boundary of equality vs reservation. Most cited equality case." }
    ],
    loopholes: [
      { loopholeName: "Reasonable Classification Defence", description: "State can treat different groups differently if: (1) there is an intelligible differentia, and (2) it has rational nexus to the object of the law.", howPeopleUseIt: "Government creates laws benefiting certain groups and justifies as 'reasonable classification'.", howToOvercome: "Challenge that classification is arbitrary — no rational nexus to object. If either test fails, law is unconstitutional.", courtStrategy: "File writ petition under Article 32/226 challenging the classification as arbitrary under Article 14." }
    ],
    difficulty: "Intermediate", upscImportance: "Very High",
    tags: ["equality", "fundamental rights", "discrimination", "reservation", "article 14"]
  },

  {
    id: "art-19", category: "Constitutional", sectionNumber: "Article 19",
    lawName: "Constitution of India", shortName: "Constitution",
    title: "Six Fundamental Freedoms",
    definition: "All citizens shall have the right to: (a) freedom of speech and expression; (b) assemble peaceably without arms; (c) form associations; (d) move freely throughout India; (e) reside anywhere in India; (g) practise any profession or carry on any occupation, trade or business.",
    simplifiedExplanation: "Six freedoms for Indian CITIZENS only (not foreigners). Each has reasonable restrictions — government can restrict for sovereignty, security, public order, decency, morality. Freedom of press is part of freedom of speech.",
    punishment: "Unlawful restriction of these freedoms can be challenged by writ petition",
    whoItAppliesTo: "Indian citizens only",
    realWorldExample: "A journalist can write critically about the government (Article 19(1)(a)). But if they publish fake news causing riots, government can restrict under Article 19(2) — public order. Social media posts threatening violence can also be restricted.",
    importantCases: [
      { caseName: "Shreya Singhal v. Union of India", year: 2015, court: "Supreme Court", summary: "Section 66A IT Act (offensive online messages) struck down — violated Article 19(1)(a). Distinguished 'advocacy' from 'incitement'.", significance: "Most important online free speech case in India." },
      { caseName: "Romesh Thappar v. State of Madras", year: 1950, court: "Supreme Court", summary: "Freedom of press is part of Article 19(1)(a). Banning newspapers needs very strong justification.", significance: "Foundation of press freedom in India." }
    ],
    loopholes: [
      { loopholeName: "Vague Public Order Restrictions", description: "Terms like 'public order', 'morality', 'decency' are undefined — give authorities wide discretion to restrict speech.", howPeopleUseIt: "Police use sedition law (Section 152 BNS) or UAPA to silence dissent using vague 'public order' grounds.", howToOvercome: "Restriction must have PROXIMATE connection to harm — mere tendency to disturb order is not enough. Use Shreya Singhal judgment.", courtStrategy: "Show the restriction is overbroad and vague. Advocacy of an idea, even unpopular, is not incitement and cannot be restricted." }
    ],
    difficulty: "Advanced", upscImportance: "Very High",
    tags: ["freedom", "speech", "expression", "press", "assembly", "article 19"]
  },

  {
    id: "art-32", category: "Constitutional", sectionNumber: "Article 32",
    lawName: "Constitution of India", shortName: "Constitution",
    title: "Right to Constitutional Remedies — Heart and Soul of the Constitution",
    definition: "The right to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights is guaranteed. The Supreme Court shall have power to issue directions, orders or writs including Habeas Corpus, Mandamus, Prohibition, Quo Warranto and Certiorari.",
    simplifiedExplanation: "If ANY fundamental right is violated, you can DIRECTLY approach the Supreme Court. Dr. Ambedkar called this the 'heart and soul of the Constitution'. This right itself cannot be suspended except during National Emergency (and even then, Article 21 cannot be suspended after the 44th Amendment).",
    punishment: "Supreme Court can order immediate release, compensation, or any remedy to enforce fundamental rights",
    whoItAppliesTo: "Any person whose fundamental rights are violated",
    realWorldExample: "A family writes a letter to the Supreme Court about bonded labourers in a brick kiln. The court treats the letter as a PIL under Article 32 and orders their release and rehabilitation. Even a postcard to the Supreme Court can become a PIL.",
    importantCases: [
      { caseName: "Bandhua Mukti Morcha v. Union of India", year: 1984, court: "Supreme Court", summary: "Letter about bonded labour treated as writ petition (PIL). Court ordered release and rehabilitation.", significance: "Established that a postcard to Supreme Court can be treated as PIL under Article 32." },
      { caseName: "ADM Jabalpur v. Shivkant Shukla", year: 1976, court: "Supreme Court", summary: "During Emergency, court controversially ruled Article 21 can be suspended. Later overruled by 44th Amendment.", significance: "Darkest judicial moment in India. Led to making Article 21 non-suspendable." }
    ],
    loopholes: [
      { loopholeName: "Bypass High Court and Go Directly to Supreme Court", description: "Both High Court (Art. 226) and Supreme Court (Art. 32) can issue writs. People bypass High Court causing Supreme Court overload.", howPeopleUseIt: "Litigants go directly to Supreme Court for cases that should be in High Court.", howToOvercome: "Supreme Court now discourages direct approach and asks petitioners to go to High Court first.", courtStrategy: "Always file in High Court under Article 226 first. Approach Supreme Court only if High Court denies or for matters of national importance." }
    ],
    difficulty: "Intermediate", upscImportance: "Very High",
    tags: ["remedies", "writs", "Supreme Court", "PIL", "article 32", "heart and soul"]
  },

  {
    id: "art-356", category: "Constitutional", sectionNumber: "Article 356",
    lawName: "Constitution of India", shortName: "Constitution",
    title: "President's Rule (Failure of Constitutional Machinery in States)",
    definition: "If the President, on receipt of report from the Governor of a State or otherwise, is satisfied that the government of the State cannot be carried on in accordance with the provisions of this Constitution, the President may by Proclamation assume to himself all or any of the functions of the Government of the State.",
    simplifiedExplanation: "If a state government collapses or loses majority, the President (on advice of Union Cabinet) can impose President's Rule — the state government is dismissed, Assembly is suspended/dissolved, and the Centre directly governs the state through the Governor. Parliament must approve within 2 months and it can continue for maximum 3 years.",
    punishment: "State government is dismissed. Governor rules the state on behalf of President/Centre.",
    whoItAppliesTo: "State governments when constitutional machinery fails",
    realWorldExample: "If a Chief Minister loses floor test (majority in Assembly) and refuses to resign, Governor can recommend President's Rule. The state assembly is suspended and the Central government runs the state directly.",
    importantCases: [
      { caseName: "S.R. Bommai v. Union of India", year: 1994, court: "Supreme Court", summary: "President's Rule is subject to judicial review. Floor of the Assembly (not Governor's opinion) is the right place to test majority. Imposition without floor test is unconstitutional.", significance: "Most important Article 356 case. Drastically limited misuse of President's Rule by Centre." }
    ],
    loopholes: [
      { loopholeName: "Political Misuse by Centre", description: "Article 356 has been used 125+ times — most cases were political misuse to dismiss opposition-party state governments, not genuine constitutional breakdown.", howPeopleUseIt: "Central government uses Article 356 to dismiss state governments of rival parties using manufactured political crises.", howToOvercome: "After S.R. Bommai (1994): majority must be tested on floor of Assembly, not by Governor's assessment. Courts can examine the material on which President was satisfied.", courtStrategy: "File writ challenging President's Rule. Court will examine if there was genuine breakdown or mere political reason. Request court-supervised floor test." }
    ],
    difficulty: "Advanced", upscImportance: "Very High",
    tags: ["president's rule", "emergency", "state government", "governor", "article 356", "federal"]
  },

  // ════════════════════════════════════════
  // ELECTION LAW
  // ════════════════════════════════════════

  {
    id: "rpa-1951-8", category: "Election", sectionNumber: "Section 8",
    lawName: "Representation of the People Act 1951",
    shortName: "RPA 1951",
    title: "Disqualification on Conviction for Certain Offences",
    definition: "A person convicted of an offence punishable with imprisonment of two years or more shall be disqualified from the date of conviction and shall continue to be disqualified for a further period of six years since his release.",
    simplifiedExplanation: "If any MP or MLA is convicted by a court and sentenced to 2 or more years in jail, they are immediately disqualified from their seat in Parliament or Assembly. They also cannot contest elections for 6 years after release from jail.",
    punishment: "Immediate disqualification from elected seat + banned from contesting for 6 years after release",
    whoItAppliesTo: "Members of Parliament (Lok Sabha, Rajya Sabha) and State Legislative Assembly/Council members",
    realWorldExample: "If a sitting MLA is convicted of a criminal offence and gets 2 years sentence, they lose their seat immediately — even if they appeal the conviction in a higher court. This provision was used in the Lalu Prasad Yadav fodder scam case in 2013.",
    importantCases: [
      { caseName: "Lily Thomas v. Union of India", year: 2013, court: "Supreme Court", summary: "Struck down Section 8(4) which allowed convicted MPs/MLAs to continue if they filed an appeal. Now conviction means immediate disqualification — no protection for sitting legislators.", significance: "Landmark — ended special protection for convicted sitting MPs and MLAs. Very important for UPSC." },
      { caseName: "Rahul Gandhi Disqualification Case", year: 2023, court: "Surat Court / Parliament Secretariat", summary: "Rahul Gandhi was disqualified as MP after being convicted in a criminal defamation case with 2-year sentence. Later Supreme Court stayed the conviction.", significance: "Recent and prominent application of Section 8 RPA 1951." }
    ],
    loopholes: [
      { loopholeName: "Stay of Conviction by Higher Court", description: "If a higher court stays the conviction (not just the sentence, but the conviction itself), the disqualification is lifted. This is a narrow but important distinction.", howPeopleUseIt: "Convicted politicians rush to High Court or Supreme Court to get the conviction stayed (not just sentence), thereby avoiding disqualification.", howToOvercome: "Courts rarely stay a conviction — they may stay the sentence (jail time) but not the conviction itself. Prosecution should oppose stay of conviction at every stage.", courtStrategy: "As per Supreme Court precedents, courts should not routinely stay convictions. Argue that stay of conviction would defeat the purpose of electoral disqualification laws." },
      { loopholeName: "Acquittal on Appeal After Long Delay", description: "A convicted politician is disqualified immediately, but if they win their appeal years later, they get their political rights back. The years of disqualification cannot be compensated.", howPeopleUseIt: "Politicians get convicted, disqualified, then eventually acquitted on appeal — but the damage to their career is done and the electorate has already changed.", howToOvercome: "This is actually the law working correctly. Fast-track courts for election-related cases would reduce this delay.", courtStrategy: "Support fast disposal of criminal appeals involving sitting/former legislators. Supreme Court has directed priority hearing for MP/MLA cases." }
    ],
    difficulty: "Intermediate", upscImportance: "Very High",
    tags: ["election", "disqualification", "MP", "MLA", "conviction", "RPA 1951"]
  },

  {
    id: "anti-defection", category: "Election", sectionNumber: "10th Schedule",
    lawName: "Constitution of India — 10th Schedule",
    shortName: "Anti-Defection Law",
    title: "Anti-Defection Law — Disqualification on Ground of Defection",
    definition: "A member of a House belonging to any political party shall be disqualified for being a member of the House if he has voluntarily given up his membership of such political party, or if he votes or abstains from voting in such House contrary to any direction issued by his political party.",
    simplifiedExplanation: "Anti-Defection Law (added by 52nd Amendment 1985) prevents elected MPs and MLAs from switching parties for personal gain (horse-trading). If you voluntarily leave your party or vote against party direction without permission, you lose your seat. Exception: if 2/3rd of the party's legislators merge with another party, it is not defection.",
    punishment: "Disqualification from membership of Parliament or State Legislature",
    whoItAppliesTo: "All MPs (Lok Sabha, Rajya Sabha) and MLAs/MLCs",
    realWorldExample: "If a BJP MLA votes against the BJP government in a confidence vote without party permission, the Speaker can disqualify them under the Anti-Defection Law. They lose their MLA seat. This cannot even be challenged in court until the Speaker decides — and the Speaker's decision itself has very limited judicial review.",
    importantCases: [
      { caseName: "Kihoto Hollohan v. Zachillhu", year: 1992, court: "Supreme Court", summary: "Anti-Defection Law is constitutional. Speaker's decision is final but subject to judicial review on limited grounds (violation of natural justice, mala fide, perversity).", significance: "Upheld Anti-Defection Law but said Speaker's decisions can be reviewed by courts in exceptional circumstances." },
      { caseName: "Nabam Rebia v. Deputy Speaker", year: 2016, court: "Supreme Court", summary: "When a notice for removal of Speaker is pending, the Speaker cannot decide disqualification petitions.", significance: "Important limitation on Speaker's power in defection cases." }
    ],
    loopholes: [
      { loopholeName: "Speaker Decides Own Party Members' Fate", description: "The Speaker of Lok Sabha / Assembly decides disqualification petitions. But the Speaker is usually from the ruling party — creating a conflict of interest.", howPeopleUseIt: "Ruling party uses a partisan Speaker to delay or dismiss defection petitions against their own rebel members, or quickly decide against opposition rebels.", howToOvercome: "Supreme Court in Keisham Meghachandra (2020) said the Election Commission or an independent tribunal should decide defection cases, not the Speaker. This reform has not yet been implemented.", courtStrategy: "If Speaker is delaying the decision, file writ petition in High Court/Supreme Court asking for time-bound decision. Courts can set deadlines for Speaker to decide." },
      { loopholeName: "2/3rd Merger Loophole", description: "If 2/3rd of a party's legislators 'merge' with another party, it is not defection. This was used to engineer 'mergers' that were actually mass defections.", howPeopleUseIt: "Political parties engineer 'mergers' by getting 2/3rd of legislators to join another party — calling it a merger to avoid disqualification.", howToOvercome: "Courts now examine whether there was a genuine organizational merger of the parties at the national level, not just legislators switching sides.", courtStrategy: "Challenge the merger as sham — show that only legislators merged, not the party organizations. Genuine merger requires party merger at the organizational level too." }
    ],
    difficulty: "Advanced", upscImportance: "Very High",
    tags: ["anti-defection", "10th schedule", "speaker", "floor crossing", "horse trading", "election law"]
  },

  {
    id: "election-commission", category: "Election", sectionNumber: "Article 324",
    lawName: "Constitution of India",
    shortName: "Constitution",
    title: "Election Commission of India — Superintendence of Elections",
    definition: "The superintendence, direction and control of the preparation of the electoral rolls for, and the conduct of, all elections to Parliament and to the Legislature of every State and of elections to the offices of President and Vice-President held under this Constitution shall be vested in a Commission (referred to in this Constitution as the Election Commission).",
    simplifiedExplanation: "Election Commission of India (ECI) is the constitutional body that conducts ALL elections in India — Lok Sabha, Rajya Sabha, State Assemblies, President, Vice President. It enforces the Model Code of Conduct, recognizes political parties, allots election symbols, and can postpone elections in case of violence or other issues. The Chief Election Commissioner can only be removed like a Supreme Court judge.",
    punishment: "ECI can disqualify candidates, cancel elections, take action against Model Code violations",
    whoItAppliesTo: "All candidates, political parties, government officials during election period",
    realWorldExample: "During Lok Sabha elections, if a politician makes a communal speech violating the Model Code of Conduct, the Election Commission can issue notice, ban them from campaigning for a period, or refer the matter for legal action. ECI can also deploy central forces if state police is not neutral.",
    importantCases: [
      { caseName: "T.N. Seshan v. Union of India", year: 1995, court: "Supreme Court", summary: "Upheld ECI's power to enforce Model Code of Conduct and take strong action against election violations. T.N. Seshan transformed ECI into a powerful independent body.", significance: "Landmark case that strengthened Election Commission's independence and powers." }
    ],
    loopholes: [
      { loopholeName: "Model Code of Conduct Has No Statutory Backing", description: "The Model Code of Conduct (MCC) is not backed by any law — it is a convention that parties agree to follow. ECI cannot legally punish MCC violations beyond issuing notices and censures.", howPeopleUseIt: "Politicians violate MCC knowing ECI can only issue notices — there is no legal punishment like jail or fine for MCC violations.", howToOvercome: "Parliament should give statutory backing to MCC. Currently, only actions that also violate the Representation of People Act or IPC/BNS can result in legal penalties.", courtStrategy: "For serious MCC violations that also constitute offences under RPA or IPC, file criminal complaint along with ECI complaint." }
    ],
    difficulty: "Intermediate", upscImportance: "Very High",
    tags: ["election commission", "ECI", "article 324", "Model Code of Conduct", "elections", "CEC"]
  },

  {
    id: "rpa-1950", category: "Election", sectionNumber: "Representation of People Act 1950",
    lawName: "Representation of the People Act 1950",
    shortName: "RPA 1950",
    title: "Electoral Rolls and Qualifications for Voters",
    definition: "Every person who is a citizen of India and who is not less than 18 years of age on the qualifying date and who is ordinarily resident in a constituency shall be entitled to be registered in the electoral roll for that constituency.",
    simplifiedExplanation: "RPA 1950 deals with VOTER REGISTRATION. Every Indian citizen aged 18+ who lives in a constituency can register as a voter. RPA 1951 deals with conduct of elections, qualifications/disqualifications of candidates. Together these two Acts are the backbone of Indian election law.",
    punishment: "False enrollment, impersonation at polls: up to 1 year imprisonment or fine",
    whoItAppliesTo: "All Indian citizens aged 18 and above",
    realWorldExample: "When you register on the Voter Helpline (1950) or at your local Electoral Registration Officer and get a Voter ID card, you are being registered under RPA 1950. Your name appears on the Electoral Roll of your constituency.",
    importantCases: [
      { caseName: "People's Union for Civil Liberties v. Union of India", year: 2003, court: "Supreme Court", summary: "Candidates must disclose criminal records, assets, and educational qualifications while filing nomination. Voters have the right to know.", significance: "Right to information applies to elections — voters can know candidate's background." }
    ],
    loopholes: [
      { loopholeName: "Bogus Voter Registration and Booth Capturing", description: "Fake voter IDs, ghost voters on rolls, and booth capturing have been historical problems in Indian elections.", howPeopleUseIt: "Political parties add fake names to voter rolls, delete opponent supporters' names, or use fake IDs to cast multiple votes.", howToOvercome: "ECI uses Booth Level Officers (BLOs), door-to-door verification, EPIC (Voter ID) linking with Aadhaar (on voluntary basis), and VVPAT machines to ensure accuracy.", courtStrategy: "File election petition under Section 80 RPA 1951 if you have evidence of booth capturing, bribery, or corrupt practices that affected the result." }
    ],
    difficulty: "Beginner", upscImportance: "High",
    tags: ["voter", "electoral roll", "RPA 1950", "election", "voter ID", "18 years"]
  },

  // ════════════════════════════════════════
  // CRIMINAL LAW — BNS 2023
  // ════════════════════════════════════════

  {
    id: "bns-103", category: "Criminal", sectionNumber: "Section 103 (BNS) / Section 302 (IPC)",
    lawName: "Bharatiya Nyaya Sanhita 2023",
    shortName: "BNS",
    title: "Murder",
    definition: "Culpable homicide is murder if done with the intention of causing death, OR with intention to cause bodily injury likely to cause death, OR with intention to cause bodily injury sufficient in ordinary course to cause death, OR with knowledge that the act is so imminently dangerous it must in all probability cause death.",
    simplifiedExplanation: "Murder is the most serious criminal offence. Old IPC Section 302 = New BNS Section 103. Punishment: death penalty OR life imprisonment. Has 4 exceptions that reduce murder to culpable homicide: (1) grave and sudden provocation, (2) private defence exceeded, (3) public servant exceeds power, (4) sudden fight without premeditation.",
    punishment: "Death penalty OR imprisonment for life + fine",
    whoItAppliesTo: "Anyone who intentionally kills another person",
    realWorldExample: "A man plans to kill his business partner over a property dispute, buys a weapon, follows him and shoots him dead. This is premeditated murder — maximum punishment death penalty (in rarest of rare cases).",
    importantCases: [
      { caseName: "Bachan Singh v. State of Punjab", year: 1980, court: "Supreme Court", summary: "Death penalty is constitutional but only for 'rarest of rare' cases. Laid down guidelines for when death can be awarded.", significance: "The 'rarest of rare' doctrine — most important death penalty case in India." },
      { caseName: "Machhi Singh v. State of Punjab", year: 1983, court: "Supreme Court", summary: "Five factors for rarest of rare: manner of murder, motive, anti-social nature, magnitude of crime, personality of victim.", significance: "Five-factor test for death penalty used in every murder case." }
    ],
    loopholes: [
      { loopholeName: "Exception 1 — Grave and Sudden Provocation", description: "If accused was provoked by victim's words/actions and killed in heat of moment, it reduces from murder to culpable homicide (lighter sentence).", howPeopleUseIt: "Defense claims accused was provoked and killed without premeditation.", howToOvercome: "Show cooling period existed between provocation and killing. If accused went home, got weapon, and returned — not sudden provocation.", courtStrategy: "Use timeline evidence (CCTV, witnesses, call records) to show time gap between alleged provocation and the killing." },
      { loopholeName: "Circumstantial Evidence Gaps", description: "Most murder cases have no eyewitnesses. The chain of circumstantial evidence must be complete. Breaking one link means acquittal.", howPeopleUseIt: "Defense breaks one link in circumstantial chain to create reasonable doubt.", howToOvercome: "Collect strong forensic evidence — DNA, fingerprints, digital footprints. Ensure last-seen, motive, and forensic evidence all align.", courtStrategy: "Use Sharad Birdhichand Sarda v. Maharashtra (1984) five-point test — all five conditions must be met for conviction." }
    ],
    difficulty: "Advanced", upscImportance: "Very High",
    tags: ["murder", "death penalty", "rarest of rare", "BNS 103", "IPC 302", "criminal"]
  },

  {
    id: "bns-316", category: "Criminal", sectionNumber: "Section 316 (BNS) / Section 420 (IPC)",
    lawName: "Bharatiya Nyaya Sanhita 2023",
    shortName: "BNS",
    title: "Cheating",
    definition: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person to deliver any property or to do or omit to do anything which causes or is likely to cause damage to that person in body, mind, reputation or property, is said to cheat.",
    simplifiedExplanation: "Cheating = deceiving someone to get property or make them do something harmful. Two elements needed: (1) Deception — making someone believe something false, (2) Inducement — because of deception they gave property or suffered harm. Old IPC 420 = New BNS 316.",
    punishment: "Up to 7 years imprisonment + fine",
    whoItAppliesTo: "Anyone who fraudulently deceives another person",
    realWorldExample: "A person poses as a government officer collecting 'fees' from farmers for loans that don't exist. Farmers are deceived into paying money. This is cheating — BNS Section 316.",
    importantCases: [
      { caseName: "Dr. Vimla v. Delhi Administration", year: 1963, court: "Supreme Court", summary: "Deception must be the direct cause of delivery of property. Direct link between deception and harm is required.", significance: "Established causation requirement in cheating cases." }
    ],
    loopholes: [
      { loopholeName: "Civil Dispute vs Criminal Cheating", description: "Mere breach of contract is NOT cheating. There must be fraudulent intention from the very beginning of the transaction.", howPeopleUseIt: "Accused argues it was just a business deal gone wrong — a civil dispute, not criminal cheating.", howToOvercome: "Prove accused had dishonest intention FROM THE START, not just that they defaulted later. Collect pre-transaction messages/emails showing false promises.", courtStrategy: "Gather all pre-transaction communications showing false representations made BEFORE money was given." }
    ],
    difficulty: "Beginner", upscImportance: "High",
    tags: ["cheating", "fraud", "420", "deception", "BNS 316", "criminal"]
  },

  // ════════════════════════════════════════
  // FAMILY LAW
  // ════════════════════════════════════════

  {
    id: "hma-13", category: "Family", sectionNumber: "Section 13",
    lawName: "Hindu Marriage Act 1955",
    shortName: "HMA",
    title: "Divorce",
    definition: "Any marriage may be dissolved by a decree of divorce on grounds: adultery, cruelty, desertion for 2 years, conversion to another religion, unsoundness of mind, leprosy, venereal disease, renouncement of world, or not heard alive for 7 years.",
    simplifiedExplanation: "Divorce for Hindus (including Sikhs, Jains, Buddhists) requires proving specific legal grounds in court. Most common grounds: Cruelty (physical or mental) and Desertion (2 years of abandonment). Both husband and wife can file. Mutual consent divorce under Section 13B with 6-month cooling period (which can be waived by Supreme Court).",
    punishment: "Civil law — court grants divorce decree. No criminal punishment.",
    whoItAppliesTo: "Hindus, Sikhs, Jains, Buddhists married under Hindu Marriage Act",
    realWorldExample: "A wife subjected to regular mental harassment, taunts about dowry, and emotional abuse can file for divorce on grounds of 'cruelty' under Section 13(1)(ia). Mental cruelty is sufficient — physical violence is not required.",
    importantCases: [
      { caseName: "Shilpa Sailesh v. Varun Sreenivasan", year: 2023, court: "Supreme Court", summary: "Supreme Court can grant divorce on irretrievable breakdown under Article 142 even if not a legal ground under HMA.", significance: "Very recent landmark — court can bypass technical requirements for divorce in dead marriages." }
    ],
    loopholes: [
      { loopholeName: "Section 498A as Counter-Weapon in Divorce", description: "When husband files for divorce, wife may file Section 498A BNS (cruelty for dowry) criminal case against husband and in-laws to pressure a favourable settlement.", howPeopleUseIt: "Used to force out-of-court settlement by threatening criminal prosecution of entire family.", howToOvercome: "Arnesh Kumar (2014): police cannot automatically arrest in 498A — must investigate first. File anticipatory bail immediately.", courtStrategy: "Document evidence of actual cruelty by either party. Do not get pressured into settlement under threat of criminal case." }
    ],
    difficulty: "Beginner", upscImportance: "Medium",
    tags: ["divorce", "Hindu", "cruelty", "desertion", "HMA", "family law"]
  },

  // ════════════════════════════════════════
  // CONSUMER LAW
  // ════════════════════════════════════════

  {
    id: "cpa-2019-2", category: "Consumer", sectionNumber: "Consumer Protection Act 2019",
    lawName: "Consumer Protection Act 2019",
    shortName: "CPA 2019",
    title: "Consumer Rights and Consumer Commissions",
    definition: "Consumer means any person who buys goods or hires services for consideration for personal use (not for resale or commercial purpose). Consumer has 6 rights: Safety, Information, Choice, Heard, Redressal, Education.",
    simplifiedExplanation: "You are a consumer if you buy goods or services for personal use. You can file complaint in: District Commission (up to ₹1 crore), State Commission (₹1-10 crore), National Commission (above ₹10 crore). Complaint must be filed within 2 years of the defect/deficiency. No court fee for complaints up to ₹5 lakh. You can also file complaints ONLINE now.",
    punishment: "Seller/manufacturer ordered to: refund money, replace product, pay compensation, pay punitive damages. Spurious goods causing death: up to 7 years jail.",
    whoItAppliesTo: "All persons who buy goods or hire services in India for personal use",
    realWorldExample: "You buy a new washing machine. It breaks down in 3 months. Company ignores your complaints. File online complaint with District Consumer Commission. They can order full refund + compensation for harassment + cost of complaint. Process is free and fast compared to civil courts.",
    importantCases: [
      { caseName: "Spring Meadows Hospital v. Harjol Ahluwalia", year: 1998, court: "Supreme Court", summary: "Medical services are 'services' under Consumer Protection Act. Doctors and hospitals can be sued for deficiency in service.", significance: "Made doctors accountable under consumer law — patients are consumers." }
    ],
    loopholes: [
      { loopholeName: "Commercial Purpose Exclusion", description: "If goods/services are bought for commercial purpose (resale, business), you are NOT a consumer and cannot approach consumer courts.", howPeopleUseIt: "Sellers argue buyer purchased for commercial purpose to kick them out of consumer court.", howToOvercome: "Prove purchase was for personal use. Home delivery address, personal receipts help. 'Exclusively for self-employment to earn livelihood' is allowed.", courtStrategy: "Consumer courts are sympathetic to individual consumers. Collect all evidence showing personal use — home delivery, personal billing address." }
    ],
    difficulty: "Beginner", upscImportance: "High",
    tags: ["consumer", "rights", "complaint", "refund", "deficiency", "consumer court"]
  },

  // ════════════════════════════════════════
  // RTI
  // ════════════════════════════════════════

  {
    id: "rti-2005", category: "Administrative", sectionNumber: "Right to Information Act 2005",
    lawName: "Right to Information Act 2005",
    shortName: "RTI Act",
    title: "Right to Information — Any Citizen Can Ask Any Government",
    definition: "Any citizen of India may request information from a Public Authority which is required to reply expeditiously or within thirty days. Information that cannot be denied to Parliament cannot be denied to a citizen.",
    simplifiedExplanation: "Any Indian citizen can ask ANY government office for ANY information by filing an RTI application. Pay just ₹10 fee. Government MUST reply within 30 days (48 hours if life/liberty is at risk). No need to give reasons. If they don't reply or refuse wrongly: First Appeal → Second Appeal to Information Commission (CIC/SIC). PIO who wrongly refuses pays ₹250/day penalty up to ₹25,000.",
    punishment: "PIO (Public Information Officer) who wrongly refuses: ₹250/day penalty up to ₹25,000 + departmental action",
    whoItAppliesTo: "Any Indian citizen can file RTI against any public authority (government body, bodies funded by government)",
    realWorldExample: "A student files RTI asking why their government scholarship was rejected. Government must provide reason within 30 days. RTI has exposed the 2G scam, Commonwealth Games scam, and many government corruption cases.",
    importantCases: [
      { caseName: "CBSE v. Aditya Bandopadhyay", year: 2011, court: "Supreme Court", summary: "Students have right to see their evaluated answer sheets under RTI. Educational institutions receiving government funding covered by RTI.", significance: "Extended RTI to examination boards and educational institutions." }
    ],
    loopholes: [
      { loopholeName: "Section 8 Exemptions Misused", description: "Section 8 lists 10 exemptions (national security, cabinet notes, personal info, trade secrets etc.) Government routinely cites these to refuse information even when exemption doesn't apply.", howPeopleUseIt: "Departments refuse ALL inconvenient information by citing 'national security' or 'third party information' exemptions.", howToOvercome: "File First Appeal arguing exemption doesn't apply. Section 10 allows PARTIAL disclosure — exempt portions can be separated. Public interest override exists even for Section 8.", courtStrategy: "In Second Appeal to CIC/SIC, argue public interest in disclosure outweighs the harm. RTI has a public interest override even for exemptions." }
    ],
    difficulty: "Beginner", upscImportance: "Very High",
    tags: ["RTI", "right to information", "transparency", "government", "accountability", "2005"]
  },

  // ════════════════════════════════════════
  // WRITS
  // ════════════════════════════════════════

  {
    id: "writ-habeas-corpus", category: "Constitutional", sectionNumber: "Habeas Corpus Writ",
    lawName: "Constitutional Writs — Article 32 & 226",
    shortName: "Habeas Corpus",
    title: "Habeas Corpus — 'You Shall Have the Body'",
    definition: "A writ issued by the court commanding the person who has detained another to produce the detained person before the court and show cause for the detention. If cause cannot be shown, the court orders immediate release.",
    simplifiedExplanation: "Most important writ for protecting personal liberty. When ANYONE is illegally detained — by police, government, or even private individuals — you or anyone on your behalf can file Habeas Corpus in High Court (Art. 226) or Supreme Court (Art. 32). Court orders the detainer to produce the person and justify the detention. Cannot be suspended even during Emergency (after 44th Amendment).",
    punishment: "If detention cannot be justified, court orders immediate release. Detaining authority can be punished for contempt.",
    whoItAppliesTo: "Any person who is illegally detained. Can be filed by anyone on their behalf.",
    realWorldExample: "A political activist is arrested but not produced before a magistrate within 24 hours. Family files Habeas Corpus in High Court at 11 PM. The judge can hear it at midnight. Police must produce the activist next morning and justify the arrest. If they cannot, immediate release is ordered.",
    importantCases: [
      { caseName: "Sunil Batra v. Delhi Administration", year: 1978, court: "Supreme Court", summary: "Habeas Corpus can also protect prisoners from torture and inhuman treatment even in lawful custody — not just for getting release.", significance: "Expanded Habeas Corpus to also protect conditions of detention, not just the fact of detention." }
    ],
    loopholes: [
      { loopholeName: "Preventive Detention Laws Block Habeas Corpus", description: "NSA, UAPA, Goondas Acts allow detention for 3-12 months without trial. Government argues detention is legal, blocking Habeas Corpus relief.", howPeopleUseIt: "Government detains people under NSA/UAPA and argues the detention is legal under these Acts.", howToOvercome: "Challenge: (1) Detaining authority did not apply mind properly, (2) Grounds of detention are vague, (3) Detention order not served in detainee's language, (4) Advisory Board procedure not followed.", courtStrategy: "Even under preventive detention, courts strictly check procedural compliance. Any procedural lapse = release on Habeas Corpus." }
    ],
    difficulty: "Intermediate", upscImportance: "Very High",
    tags: ["habeas corpus", "writ", "detention", "liberty", "arrest", "Article 32", "Article 226"]
  },

  {
    id: "writ-mandamus", category: "Constitutional", sectionNumber: "Mandamus Writ",
    lawName: "Constitutional Writs — Article 32 & 226",
    shortName: "Mandamus",
    title: "Mandamus — 'We Command'",
    definition: "A writ issued by a superior court commanding an inferior court, tribunal, public authority or government body to perform a duty which it is legally obligated to perform but has failed or refused to do so.",
    simplifiedExplanation: "Mandamus = 'we command'. Used when a government body or officer REFUSES to do their legal duty. Example: if a government office refuses to give you your pension, your salary, or your certificate even though they are legally bound to do so, you file Mandamus to make them do it. Cannot be issued against President or Governor, private individuals, or to do discretionary (optional) acts.",
    punishment: "Court orders the public authority to perform the specific legal duty. Non-compliance is contempt of court.",
    whoItAppliesTo: "Any person whose legal right has been denied by a public authority that has a corresponding legal duty",
    realWorldExample: "A government employee is due a promotion as per seniority rules, but the department refuses to promote them. They file Mandamus in High Court. The court orders the department to give the promotion within a specified time.",
    importantCases: [
      { caseName: "S.P. Gupta v. Union of India", year: 1981, court: "Supreme Court", summary: "Mandamus can be issued against the government even in matters of public interest. PIL can seek Mandamus to enforce public duties.", significance: "Connected PIL and Mandamus — courts can use Mandamus to enforce public duties on the government's own initiative in PILs." }
    ],
    loopholes: [
      { loopholeName: "Discretionary vs Mandatory Duty", description: "Mandamus only lies for mandatory (compulsory) duties — not for discretionary (optional) duties. Government argues most actions are discretionary.", howPeopleUseIt: "Government argues it has discretion to decide whether and when to do something, preventing Mandamus.", howToOvercome: "Argue that once the government decides to exercise its power, it must exercise it correctly and fairly. Also argue that long delay in exercising discretion is itself reviewable.", courtStrategy: "Show that the specific act (issuing a certificate, paying salary, granting a licence) is mandatory under the law — it's not a matter of discretion." }
    ],
    difficulty: "Intermediate", upscImportance: "Very High",
    tags: ["mandamus", "writ", "command", "public duty", "government", "Article 32"]
  }
];

// Export a helper function to get laws by category:
export const getLawsByCategory = (category) => {
  if (!category || category === 'All') return ALL_LAWS;
  return ALL_LAWS.filter(law => 
    law.category.toLowerCase() === category.toLowerCase()
  );
};

// Export search function:
export const searchLaws = (query) => {
  if (!query) return ALL_LAWS;
  const q = query.toLowerCase();
  return ALL_LAWS.filter(law =>
    law.title?.toLowerCase().includes(q) ||
    law.sectionNumber?.toLowerCase().includes(q) ||
    law.lawName?.toLowerCase().includes(q) ||
    law.shortName?.toLowerCase().includes(q) ||
    law.simplifiedExplanation?.toLowerCase().includes(q) ||
    law.tags?.some(tag => tag.toLowerCase().includes(q))
  );
};

export default ALL_LAWS;
