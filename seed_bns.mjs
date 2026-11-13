// ============= BNS GENERATION =============

function genBNS() {
  addBNSDetail63();
  addBNSDetail64();
  addBNSDetail101();
  addBNSDetail103();
  addBNSDetail109();
  addBNSDetail115();
  addBNSDetail137();
  addBNSDetail303();
  addBNSDetail308();
  addBNSDetail316();
  addBNSDetail318();
  addBNSDetail351();
  addBNSDetail85();
  addBNSDetail3();
  addBNSDetail36();
}

function addBNSDetail63() {
  allLaws.push(E({id:'bns-sec-63',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 63',title:'Rape',
    definition:'A man commits rape if he penetrates, inserts any object or body part into the vagina, urethra, anus of a woman, or applies his mouth to those areas, under circumstances including against her will, without consent, consent obtained by fear/fraud, or when she cannot communicate consent. Replaces IPC Section 375.',
    simplifiedExplanation:'Rape defined broadly to include any non-consensual sexual act. Age of consent 18. Marital rape exception: sex with wife above 18 is not rape.',
    punishment:'Minimum 10 years RI, extendable to life. Gang rape min 20 years to life. Minor under 12: min 20 years to death.',
    whoItAppliesTo:'A man can be charged; victim must be a woman.',
    realWorldExample:'Meera drugged at party and assaulted while unconscious. Court held consent under intoxication invalid. Accused convicted under Section 63.',
    importantCases:[mkCase('Mukesh vs State of NCT Delhi (Nirbhaya)',2017,'SC','Upheld death for gang-rape and murder. Led to Criminal Law Amendment 2013.','Landmark for sexual offence reforms.'),mkCase('Independent Thought vs Union of India',2017,'SC','Read down marital rape exception for wives aged 15-18.','Partially addressed marital rape exception.')],
    loopholes:[mkLoop('Marital Rape Exception','Sex with own wife above 18 is not rape under Exception 2.','Husbands cannot be prosecuted for raping wives.','Challenge under Article 14, 21. Petition pending in SC.','Argue colonial relic inconsistent with constitutional values.'),mkLoop('False Accusations','No specific punishment for false rape accusations.','False allegations used as leverage in matrimonial disputes.','Examine FIR timeline, relationship context, corroborative evidence.','Look at medical reports, electronic evidence, witness statements.')],
    relatedSections:['bns-sec-64','bns-sec-65','bns-sec-66','bns-sec-70'],
    difficulty:'Intermediate',isConstitutional:false,
    tags:['rape','sexual offence','Nirbhaya','UPSC important','womens rights'],
    subCategory:'Sexual Offences',enactedYear:2023,
    courtLevel:['SC','HC','Sessions Court'],
    upscImportance:'Very High',upscTopics:['Criminal Law','BNS','Womens Safety','Nirbhaya Case','Social Issues'],
    aiSearchKeywords:['rape','sexual assault','consent','Section 63 BNS','Section 375 IPC','marital rape','age of consent','Nirbhaya'],
    scenarioTags:['sexual assault reported','rape case','consent not given','marital rape','minor sexually assaulted','gang rape']}));
}

function addBNSDetail64() {
  allLaws.push(E({id:'bns-sec-64',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 64',title:'Punishment for Rape',
    definition:'Whoever commits rape under Section 63 shall be punished with rigorous imprisonment for not less than 10 years, extendable to life, and fine.',
    simplifiedExplanation:'Minimum 10 years for rape. Gang rape: minimum 20 years to life. Minor under 16: min 20 years. Minor under 12: 20 to death.',
    punishment:'Minimum 10 years RI to life. Aggravated: 20 years to death.',
    whoItAppliesTo:'Person convicted of rape',
    realWorldExample:'Man convicted of raping 10-year-old sentenced to 25 years RI.',
    relatedSections:['bns-sec-63','bns-sec-65','bns-sec-66','bns-sec-70'],
    difficulty:'Intermediate',tags:['rape','punishment','sentencing','BNS'],subCategory:'Sexual Offences',enactedYear:2023,
    upscImportance:'High',
    aiSearchKeywords:['Section 64 BNS','rape punishment','rape sentence','minimum 10 years','gang rape punishment']}));
}

function addBNSDetail101() {
  allLaws.push(E({id:'bns-sec-101',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 101',title:'Murder',
    definition:'Except in excepted cases, culpable homicide is murder if: (1) done with intention of causing death; (2) done with intention of causing injury known to be likely to cause death; (3) intended injury sufficient in ordinary course to cause death; (4) act so imminently dangerous that death is probable. Replaces IPC Section 300.',
    simplifiedExplanation:'Murder requires intention to kill or cause injuries sufficient to cause death. Distinguished from culpable homicide not amounting to murder by presence of intention.',
    punishment:'Death or life imprisonment and fine. Death penalty reserved for rarest of rare cases.',
    whoItAppliesTo:'Any person who commits murder.',
    realWorldExample:'Vikram, in property dispute, stabbed neighbor multiple times in chest causing death. Charged under Section 101 BNS.',
    importantCases:[mkCase('Bachan Singh vs State of Punjab',1980,'SC','Death penalty constitutional but only in rarest of rare cases.','Rarest of Rare doctrine.'),mkCase('K.M. Nanavati vs State of Maharashtra',1962,'SC','Last jury trial in India. Distinguished murder from culpable homicide.','Led to abolition of jury trials.'),mkCase('Machhi Singh vs State of Punjab',1983,'SC','Categories where death penalty may be warranted.','Refined rarest of rare.')],
    loopholes:[mkLoop('Culpable Homicide Exception','If killing falls under exceptions (provocation, self-defence exceeded, sudden fight), it becomes culpable homicide, not murder.','Defense argues grave and sudden provocation to reduce charge.','Prove provocation was NOT sudden. Show premeditation.','Establish premeditation through evidence of weapon, prior threats.'),mkLoop('Circumstantial Evidence','Without eyewitnesses, chain must be complete pointing only to accused.','Defense argues chain is incomplete.','Build complete chain: motive, opportunity, forensics, post-crime conduct.','Use DNA, CCTV, call records to complete chain.')],
    relatedSections:['bns-sec-103','bns-sec-105','bns-sec-100'],
    difficulty:'Intermediate',isConstitutional:false,
    tags:['murder','death penalty','rarest of rare','UPSC important'],
    subCategory:'Offences Against the Body',enactedYear:2023,
    courtLevel:['SC','HC','Sessions Court'],
    upscImportance:'High',upscTopics:['Criminal Law','BNS','Death Penalty','Rarest of Rare Doctrine'],
    aiSearchKeywords:['murder','culpable homicide','death penalty','rarest of rare','Section 101 BNS','Section 302 IPC','intentional killing'],
    scenarioTags:['someone killed intentionally','murder charge','death penalty case','difference between murder and culpable homicide']}));
}

function addBNSDetail103() {
  allLaws.push(E({id:'bns-sec-103',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 103',title:'Punishment for Murder in Certain Cases (Mob Lynching)',
    definition:'Whoever commits murder shall be punished with death or life imprisonment if committed by: (a) a previous murder convict; or (b) a group of 5+ on grounds of race, caste, community, sex, language, personal belief — mob lynching provision. New in BNS 2023.',
    simplifiedExplanation:'New provision addressing mob lynching. If 5+ persons commit murder based on caste/religion/community, each faces death or life imprisonment. Fills gap in old IPC after several lynching incidents across India.',
    punishment:'Death or life imprisonment. Mob lynching: death or life (min 7 years) and fine.',
    whoItAppliesTo:'Any person committing murder, especially in mob lynching situations.',
    realWorldExample:'Eight men attacked Muslim cattle trader on suspicion of cow smuggling, beat him with iron rods until death. Each charged under Section 103 BNS.',
    importantCases:[mkCase('Tehseen S. Poonawalla vs Union of India',2018,'SC','Condemned mob lynching. Issued comprehensive guidelines: nodal officers, prompt FIRs, action against failing police.','Led to BNS 2023 mob lynching provisions.')],
    loopholes:[mkLoop('Proving Group Intent','Difficult to prove all 5+ shared common intent to kill based on prohibited ground.','Mob members claim bystanders or personal enmity, not caste/religion motive.','Use Section 3(5) BNS common intention. Gather social media evidence.','Prove common intention through WhatsApp groups, social media posts showing communal motive.')],
    relatedSections:['bns-sec-101','bns-sec-105'],
    difficulty:'Advanced',tags:['murder','mob lynching','new provision','BNS'],
    subCategory:'Offences Against the Body',enactedYear:2023,
    upscImportance:'High',upscTopics:['Criminal Law','BNS','Mob Lynching','Social Issues'],
    aiSearchKeywords:['mob lynching','Section 103 BNS','hate crime','group murder','caste-based killing','lynching punishment'],
    scenarioTags:['mob attacked person based on religion','lynching incident','group killing based on caste','communal violence']}));
}

function addBNSDetail109() {
  allLaws.push(E({id:'bns-sec-109',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 109',title:'Attempt to Commit Offences',
    definition:'Whoever attempts to commit an offence punishable with death or life imprisonment and does any act towards its commission shall be punished. Replaces IPC Section 511.',
    simplifiedExplanation:'Attempt is a substantial step toward committing a crime that fails. For murder attempt, up to life imprisonment. Key distinction from preparation (not punishable) is crucial.',
    punishment:'Death attempt: up to 10 years. Life imprisonment attempt: up to 5 years. Other attempts: half maximum sentence.',
    whoItAppliesTo:'Anyone who attempts to commit an offence.',
    realWorldExample:'Rajesh bought gun, went to enemy house, aimed and fired but missed. Guilty of attempt to murder even though murder not completed.',
    importantCases:[mkCase('State of Maharashtra vs Mohd. Yakub',1980,'SC','Distinguished preparation from attempt. For attempt, accused must cross line from preparation to execution.','Key case defining attempt threshold.')],
    loopholes:[mkLoop('Preparation vs Attempt','Line between preparation and attempt is blurry. Mere preparation is not punishable.','Defense argues acts were mere preparation that could have been abandoned.','Show accused crossed threshold — done all acts necessary for final offence.','Examine whether accused took last step before actual commission.')],
    relatedSections:['bns-sec-101','bns-sec-45'],
    difficulty:'Intermediate',tags:['attempt','criminal law','BNS'],
    subCategory:'Inchoate Offences',enactedYear:2023,
    upscImportance:'Medium',upscTopics:['Criminal Law','BNS','Attempt'],
    aiSearchKeywords:['attempt','Section 109 BNS','attempt to murder','punishment for attempt','preparation vs attempt'],
    scenarioTags:['attempted murder','attempt to commit crime','caught before completing crime']}));
}

function addBNSDetail115() {
  allLaws.push(E({id:'bns-sec-115',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 115',title:'Grievous Hurt',
    definition:'Whoever causes hurt and the hurt is: emasculation, permanent loss of sight/hearing/limb/joint, fracture/dislocation, or hurt endangering life or causing severe pain for 20+ days or inability to pursue ordinary activities for 20+ days. Replaces IPC Section 320.',
    simplifiedExplanation:'Grievous hurt includes 8 specific types: castration, loss of sight/hearing/limb, fracture, permanent disfigurement, hurt endangering life.',
    punishment:'Up to 7 years and fine. If by dangerous weapon: up to 10 years.',
    whoItAppliesTo:'Anyone who causes grievous hurt.',
    realWorldExample:'Sanjay hit Rohan with iron rod fracturing arm in two places. Fracture qualified as grievous hurt under Section 115.',
    importantCases:[mkCase('Jai Prakash vs State of Delhi',1991,'SC','Fracture not necessary for grievous hurt — hurt endangering life qualifies.','Expanded grievous hurt interpretation.')],
    loopholes:[mkLoop('Medical Evidence Dependency','Classification depends on medical evidence. Initial simple injury may become grievous.','Defense argues injury was simple based on initial report.','Get follow-up examinations documenting duration of recovery and complications.','Present extended treatment records and specialist opinions.')],
    relatedSections:['bns-sec-114','bns-sec-116'],
    difficulty:'Intermediate',tags:['grievous hurt','assault','criminal law','BNS'],
    subCategory:'Offences Against the Body',enactedYear:2023,
    upscImportance:'Low',upscTopics:['Criminal Law','BNS'],
    aiSearchKeywords:['grievous hurt','Section 115 BNS','fracture','hurt endangering life','serious injury'],
    scenarioTags:['serious injury caused','fracture in fight','permanent damage from assault']}));
}

function addBNSDetail137() {
  allLaws.push(E({id:'bns-sec-137',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 137',title:'Kidnapping',
    definition:'(1) Kidnapping from India — taking a person out of India without consent. (2) Kidnapping from lawful guardianship — taking a minor under 16 (male) or 18 (female) from guardian without consent. Replaces IPC Sections 359-361.',
    simplifiedExplanation:'Kidnapping involves taking a person without consent. Two types: taking out of India, or taking a minor from guardian. Abduction is different (compelling by force).',
    punishment:'Up to 7 years and fine.',
    whoItAppliesTo:'Anyone who kidnaps another person.',
    realWorldExample:'Neighbor lured 14-year-old girl from school promising film career. Took her to another city without parents knowledge. Charged with kidnapping from guardianship.',
    importantCases:[mkCase('S. Varadarajan vs State of Madras',1965,'SC','When minor voluntarily leaves guardian, accused may not be guilty if there was no taking.','Distinguished taking from voluntarily following.')],
    loopholes:[mkLoop('Minor Consent Issue','If minor above 16 (boy) or 18 (girl) goes willingly, kidnapping charge fails.','Accused argues minor came voluntarily and was not taken.','Prove the accused actively induced or enticed the minor to leave.','Show accused made promises, gave gifts, or used influence to persuade.')],
    relatedSections:['bns-sec-138','bns-sec-140'],
    difficulty:'Intermediate',tags:['kidnapping','missing child','criminal law','BNS'],
    subCategory:'Offences Against the Body',enactedYear:2023,
    upscImportance:'Medium',upscTopics:['Criminal Law','BNS','Kidnapping'],
    aiSearchKeywords:['kidnapping','Section 137 BNS','kidnapping from guardianship','minor taken','Section 361 IPC'],
    scenarioTags:['child missing','minor taken away','someone forced to go with another']}));
}

function addBNSDetail303() {
  allLaws.push(E({id:'bns-sec-303',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 303',title:'Theft',
    definition:'Whoever, intending to take dishonestly any movable property out of possession of any person without consent, moves that property in order to such taking, commits theft. Replaces IPC Section 378.',
    simplifiedExplanation:'Theft is dishonest taking of movable property without consent. Key elements: dishonest intention, property in possession, taking without consent, moving the property.',
    punishment:'Up to 3 years or fine or both. If committed at night: up to 7 years.',
    whoItAppliesTo:'Anyone who commits theft.',
    realWorldExample:'Rahul took roommates laptop from shared apartment intending to sell it. Charged with theft under Section 303.',
    importantCases:[mkCase('R.K. Dalmia vs Delhi Administration',1962,'SC','Dishonest intention is essence of theft. If accused believed in good faith property was theirs, no theft.','Mens rea requirement emphasized.')],
    loopholes:[mkLoop('Claim of Right Defense','If accused honestly believed they had right to property, no theft even if wrong.','Defense argues accused believed property was theirs.','Prove accused knew property belonged to someone else or claim was unreasonable.','Show accused acted secretly, tried to conceal property.')],
    relatedSections:['bns-sec-304','bns-sec-308'],
    difficulty:'Beginner',tags:['theft','property crime','criminal law','BNS'],
    subCategory:'Offences Against Property',enactedYear:2023,
    upscImportance:'Low',upscTopics:['Criminal Law','BNS'],
    aiSearchKeywords:['theft','Section 303 BNS','dishonest taking','movable property','Section 378 IPC'],
    scenarioTags:['stolen property','someone took my belongings','theft of valuable item']}));
}

function addBNSDetail308() {
  allLaws.push(E({id:'bns-sec-308',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 308',title:'Extortion',
    definition:'Whoever intentionally puts any person in fear of any injury to that person or another, and thereby dishonestly induces that person to deliver any property or valuable security, commits extortion. Replaces IPC Section 383.',
    simplifiedExplanation:'Extortion is forcing someone to give property by threatening harm. Key elements: putting in fear and using that fear to obtain property.',
    punishment:'Up to 3 years or fine or both. If aggravated (fear of death/grievous hurt): up to 10 years.',
    whoItAppliesTo:'Anyone who uses threats to obtain property.',
    realWorldExample:'Gang threatened shopkeeper to pay Rs 50,000 monthly protection money or shop would be burnt. Charged with extortion.',
    importantCases:[mkCase('R.S. Nayak vs A.R. Antulay',1986,'SC','Distinguished extortion from bribery. Property obtained by creating fear.','Clarified boundary with other offences.')],
    loopholes:[mkLoop('Proving Causation','Must prove threat CAUSED victim to part with property.','Defense argues victim paid voluntarily or for unrelated reasons.','Show timing of payment relative to threat, victim changed behavior.','Present evidence of victim fear and seeking protection.')],
    relatedSections:['bns-sec-309','bns-sec-351'],
    difficulty:'Intermediate',tags:['extortion','threats','criminal law','BNS'],
    subCategory:'Offences Against Property',enactedYear:2023,
    upscImportance:'Low',upscTopics:['Criminal Law','BNS'],
    aiSearchKeywords:['extortion','Section 308 BNS','threat to obtain property','putting in fear','Section 383 IPC'],
    scenarioTags:['threatened to give money','protection money demanded','forced to sign over property']}));
}

function addBNSDetail316() {
  allLaws.push(E({id:'bns-sec-316',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 316',title:'Criminal Breach of Trust',
    definition:'Whoever, being entrusted with property or dominion over property, dishonestly misappropriates or converts it to his own use, or uses or disposes of it in violation of law or contract, commits criminal breach of trust. Replaces IPC Section 405.',
    simplifiedExplanation:'If someone is given property to manage and dishonestly uses it for themselves, that is criminal breach of trust. Key difference from theft: property was legally given to you, but misused.',
    punishment:'Up to 7 years or fine or both. If by public servant/banker/merchant/agent: up to life imprisonment.',
    whoItAppliesTo:'Any person entrusted with property who dishonestly misappropriates it.',
    realWorldExample:'Property dealer given Rs 50 lakhs to buy flat invested in own failing business instead. Charged under Section 316 BNS.',
    importantCases:[mkCase('Pratibha Rani vs Suraj Kumar',1985,'SC','Husband holding wife stridhan is trustee. Misappropriating stridhan is criminal breach of trust.','Stridhan trust relationship established.')],
    loopholes:[mkLoop('Civil vs Criminal','Defense argues breach of trust is civil dispute, not criminal.','Accused argue they intended to return money — failed investment not dishonesty.','Prove dishonest intention: no plan to return, personal benefit, concealment.','Show concealment, false promises, personal use of entrusted property.'),mkLoop('Entrustment Requirement','Must prove accused was entrusted with the property.','Defense argues no formal entrustment — gift or loan.','Show specific purpose property was given and accused accepted for that purpose.','Present written agreements, emails, witness testimony about entrustment.')],
    relatedSections:['bns-sec-317','bns-sec-318'],
    difficulty:'Intermediate',tags:['cheating','fraud','breach of trust','white collar crime'],
    subCategory:'Offences Against Property',enactedYear:2023,
    upscImportance:'Medium',upscTopics:['Criminal Law','BNS','White Collar Crime'],
    aiSearchKeywords:['criminal breach of trust','embezzlement','misappropriation','Section 316 BNS','Section 406 IPC','entrusted property'],
    scenarioTags:['money entrusted was stolen','property dealer fraud','lawyer misusing client money','company director siphoning funds']}));
}

function addBNSDetail318() {
  allLaws.push(E({id:'bns-sec-318',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 318',title:'Cheating',
    definition:'Whoever, by deceiving any person, fraudulently or dishonestly induces them to deliver any property, or to do or omit anything causing damage or harm, is said to cheat. Replaces IPC Section 415.',
    simplifiedExplanation:'Cheating is deceiving someone to part with property or do something harmful. Requires fraudulent intention from the beginning. Mere breach of promise is not cheating.',
    punishment:'Up to 3 years or fine or both. If reputation damage: up to 5 years.',
    whoItAppliesTo:'Anyone who deceives another for property or advantage.',
    realWorldExample:'Man claimed to be government official with influence, took Rs 10 lakhs promising contract. No such influence existed. Charged with cheating.',
    importantCases:[mkCase('Iridium India Telecom vs Motorola Inc',2011,'SC','Cheating requires intention to deceive AND intention to cause damage from beginning. Mere breach of contract not cheating.','Distinguished cheating from contractual breach.')],
    loopholes:[mkLoop('Breach of Contract vs Cheating','If person makes promise and later cannot fulfill, not necessarily cheating. Accused argues genuine intention but circumstances changed.','Defense says they intended to fulfill but circumstances changed.','Prove accused had no intention to fulfill from beginning — fake credentials, fleeing after receiving money.','Show false representations, fake identity, disappearance after payment.')],
    relatedSections:['bns-sec-316','bns-sec-319'],
    difficulty:'Intermediate',tags:['cheating','fraud','deception','criminal law','BNS'],
    subCategory:'Offences Against Property',enactedYear:2023,
    upscImportance:'Medium',upscTopics:['Criminal Law','BNS','Fraud'],
    aiSearchKeywords:['cheating','Section 318 BNS','deception','fraud','Section 415 IPC','Section 420 IPC'],
    scenarioTags:['someone cheated me of money','fake promises for property','deceived for advantage','online fraud']}));
}

function addBNSDetail351() {
  allLaws.push(E({id:'bns-sec-351',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 351',title:'Criminal Intimidation',
    definition:'Whoever threatens another with injury to person, reputation or property, or to anyone in whom that person is interested, with intent to cause alarm, commits criminal intimidation. Replaces IPC Section 503.',
    simplifiedExplanation:'Threatening someone with harm to self, family, or property to scare them into doing something or stopping them from doing something they have a right to do.',
    punishment:'Up to 2 years or fine or both. If threat of death/grievous hurt/destruction by fire/unchastity: up to 7 years.',
    whoItAppliesTo:'Any person who threatens another.',
    realWorldExample:'Builder threatened residents with physical harm to vacate for redevelopment. Residents filed complaint under Section 351 BNS.',
    importantCases:[mkCase('Manik Taneja vs State of Karnataka',2015,'SC','Criminal intimidation requires specific intent to cause alarm. Vague threats during arguments may not qualify.','Mens rea requirement clarified.')],
    loopholes:[mkLoop('Proving Intent','Must prove accused had intent to cause alarm. Angry words during quarrel may not suffice.','Defense argues threats made in heat of moment, not serious.','Show pattern of threats, context, effect on victim.','Document threats: recordings, text messages, witness statements showing genuine fear.')],
    relatedSections:['bns-sec-349','bns-sec-352'],
    difficulty:'Beginner',tags:['threats','intimidation','criminal law'],
    subCategory:'Criminal Intimidation',enactedYear:2023,
    upscImportance:'Low',upscTopics:['Criminal Law','BNS'],
    aiSearchKeywords:['criminal intimidation','threat','Section 351 BNS','Section 503 IPC','threatening someone','blackmail'],
    scenarioTags:['someone threatening to harm','blackmail','threatened to destroy property','threatening calls']}));
}

function addBNSDetail85() {
  allLaws.push(E({id:'bns-sec-85',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 85',title:'Cruelty by Husband or Relatives (Dowry Harassment)',
    definition:'Whoever, being husband or relative of husband of a woman, subjects her to cruelty — (a) wilful conduct likely to drive her to suicide or cause grave injury; or (b) harassment for dowry demands. Replaces IPC Section 498A.',
    simplifiedExplanation:'Husband or in-laws who torture a wife for dowry can be jailed. Cognizable, non-bailable, non-compoundable offence.',
    punishment:'Imprisonment up to 3 years and fine.',
    whoItAppliesTo:'Husband and/or relatives of husband.',
    realWorldExample:'Sunita tortured by husband and mother-in-law for more dowry, beaten, threatened with acid. Filed complaint under Section 85. Both arrested.',
    importantCases:[mkCase('Arnesh Kumar vs State of Bihar',2014,'SC','Guidelines against automatic arrest in 498A cases. Preliminary investigation required.','Landmark guidelines to prevent misuse.'),mkCase('Rajesh Sharma vs State of UP',2017,'SC','Directed Family Welfare Committees to examine complaints before arrest.','Buffer against misuse.')],
    loopholes:[mkLoop('Allegations of Misuse','Section 498A/85 called legal terrorism by mens rights groups alleging misuse.','Wives file complaints as counter-weapon in divorce battles, naming entire family.','Support Arnesh Kumar guidelines requiring preliminary investigation before arrest.','Build evidence: medical reports, complaint records, witness testimony.')],
    relatedSections:['bns-sec-80','bns-sec-86'],
    difficulty:'Intermediate',tags:['dowry','cruelty','womens rights','UPSC important','498A'],
    subCategory:'Offences Against Marriage',enactedYear:2023,
    upscImportance:'Very High',upscTopics:['Criminal Law','BNS','Womens Rights','Dowry','Social Issues'],
    aiSearchKeywords:['dowry harassment','cruelty by husband','498A','Section 85 BNS','domestic violence','dowry death','mental cruelty'],
    scenarioTags:['husband beating wife','in-laws demanding dowry','wife tortured for money','dowry harassment','husbands family harassing wife']}));
}

function addBNSDetail3() {
  allLaws.push(E({id:'bns-sec-3',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 3',title:'Punishment of Offences Committed Within India',
    definition:'Every person who commits an offence in India shall be liable to punishment under BNS. Replaces IPC Section 3.',
    simplifiedExplanation:'BNS applies to ALL offences committed within the territory of India. Any person, regardless of nationality, is liable if they commit an offence in India.',
    punishment:'As prescribed for the particular offence.',
    whoItAppliesTo:'Every person who commits an offence in India',
    relatedSections:['bns-sec-4','bns-sec-5'],
    difficulty:'Beginner',tags:['BNS','jurisdiction','preliminary'],
    subCategory:'General Provisions',enactedYear:2023,
    upscImportance:'Low',
    aiSearchKeywords:['Section 3 BNS','offences in India','jurisdiction','BNS applicability']}));
}

function addBNSDetail36() {
  allLaws.push(E({id:'bns-sec-36',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
    sectionNumber:'Section 3(5)',title:'Common Intention (Constructive Liability)',
    definition:'When a criminal act is done by several persons in furtherance of common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone. Replaces IPC Section 34.',
    simplifiedExplanation:'If multiple persons share a common intention to commit a crime and one of them does the act, ALL are equally liable. Key phrase: "in furtherance of common intention." Essential for conspiracy and gang crimes.',
    punishment:'Same as the principal offence.',
    whoItAppliesTo:'All persons acting with common intention',
    realWorldExample:'Four men planned to rob a bank. One stood guard, one drove getaway car, one broke in, one collected money. All four are equally liable for robbery even though each did different acts.',
    importantCases:[mkCase('Mahbub Shah vs Emperor',1945,'PC','Common intention requires prior meeting of minds. Pre-arranged plan must be proved.','Prior meeting of minds essential.'),mkCase('Krishna Govind Patil vs State of Maharashtra',1973,'SC','Common intention can develop on the spot. No prior conspiracy needed if intention shared instantly.','Common intention can develop spontaneously.')],
    loopholes:[mkLoop('Proving Common Intention','Difficult to prove all persons shared same intention. Must show pre-arranged plan or meeting of minds.','Accused claim they were present but did not share the common intention.','Show prior planning, presence at scene, participation in acts, running away together.','Evidence of meeting, communications, coordinated actions proves common intention.')],
    relatedSections:['bns-sec-36','bns-sec-38'],
    difficulty:'Intermediate',tags:['BNS','common intention','constructive liability','criminal conspiracy'],
    subCategory:'General Explanations',enactedYear:2023,
    upscImportance:'Medium',
    aiSearchKeywords:['Section 3(5) BNS','common intention','Section 34 IPC','in furtherance of common intention','constructive liability','joint liability'],
    scenarioTags:['multiple people involved in crime','gang robbery','murder by group','who is liable when several persons act together']}));
}
