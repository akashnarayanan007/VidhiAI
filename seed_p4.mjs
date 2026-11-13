// ============= CONTRACT ACT =============
allLaws.push(E({id:'contract-sec-10',lawName:'Indian Contract Act 1872',shortName:'Contract Act',category:'civil',
sectionNumber:'Section 10',title:'What Agreements Are Contracts',
definition:'All agreements are contracts if made by free consent of parties competent to contract, for lawful consideration and lawful object, and not expressly declared void.',
simplifiedExplanation:'Valid contract needs: (1) free consent, (2) competent parties (18+, sound mind), (3) lawful consideration, (4) lawful object, (5) not void by law.',
punishment:'Not applicable — civil remedy (damages, specific performance).',
whoItAppliesTo:'Parties entering into agreements',
realWorldExample:'Ravi agreed to sell car to Sneha. Both adults, lawful consideration, selling car is lawful. Valid contract under Section 10.',
importantCases:[mkCase('Balfour vs Balfour',1919,'UK CA','Domestic arrangements not intended to create legal relations — not contracts.','Intention to create legal relations.')],
loopholes:[mkLoop('Proving Free Consent','Difficult to prove consent was not free — undue influence where one party dominates.','Dominant party gets unfair contracts signed by exploiting position.','Burden shifts to dominant party to prove no undue influence (Section 16).','Show dominance, unfairness, no real choice.')],
relatedSections:['contract-sec-2','contract-sec-14','contract-sec-23'],difficulty:'Beginner',tags:['contract','agreement','consent','basics'],
subCategory:'Formation of Contract',enactedYear:1872,
upscImportance:'Medium',upscTopics:['Civil Law','Contract Act','Commerce','Legal Framework'],
aiSearchKeywords:['contract law','valid contract','Section 10 Contract Act','free consent','lawful consideration','void agreement','contract essentials','agreement vs contract'],
scenarioTags:['contract broken by other party','agreement not honored','forced to sign contract','minor signed a contract','verbal agreement enforceable']}));

allLaws.push(E({id:'contract-sec-73',lawName:'Indian Contract Act 1872',shortName:'Contract Act',category:'civil',
sectionNumber:'Section 73',title:'Compensation for Breach of Contract',
definition:'Party suffering from breach entitled to compensation as naturally arose from breach, or which parties knew at contract time would likely result from breach.',
simplifiedExplanation:'Claim compensation for losses that naturally/directly resulted from breach. Cannot claim remote damages. Must mitigate losses — cannot let them pile up.',
punishment:'Not applicable — monetary compensation.',
whoItAppliesTo:'Party who suffered loss due to breach',
realWorldExample:'Wedding venue cancelled 3 days before. Family can claim: difference in cost of new venue, extra decoration, guest transportation. Cannot claim: emotional distress (too remote).',
importantCases:[mkCase('Hadley vs Baxendale',1854,'UK','Damages must be naturally arising from breach or within contemplation of parties at contract time.','Foundational case for contract damages worldwide.')],
loopholes:[mkLoop('Proving Exact Loss','Difficult to prove exact monetary value of consequential losses.','Breaching party argues losses are speculative or remote.','Maintain detailed records of expenses, alternatives, communications.','Provide documentary evidence: invoices, receipts, market rate comparisons.')],
relatedSections:['contract-sec-74','contract-sec-75'],difficulty:'Intermediate',tags:['contract','breach','damages','compensation'],
subCategory:'Remedies for Breach',enactedYear:1872,upscImportance:'Medium',
upscTopics:['Civil Law','Contract Act','Damages','Legal Framework'],
aiSearchKeywords:['breach of contract','damages','compensation','Section 73 Contract Act','loss from breach','contract remedy','foreseeability test','Hadley vs Baxendale'],
scenarioTags:['other party broke contract','wedding venue cancelled','supplier failed to deliver','contractor abandoned work','how much compensation for breach']}));

// ============= FAMILY LAW =============
allLaws.push(E({id:'hma-sec-13',lawName:'Hindu Marriage Act 1955',shortName:'HMA',category:'family',
sectionNumber:'Section 13',title:'Grounds for Divorce',
definition:'Marriage may be dissolved on grounds: (i) adultery; (ii) cruelty; (iii) desertion 2+ years; (iv) conversion; (v) unsound mind; (vi) leprosy; (vii) missing 7+ years. Wife: additional grounds including husband alive from pre-Act marriage, rape/bestiality, maintenance order non-compliance.',
simplifiedExplanation:'Hindu divorce on fault grounds: cruelty, adultery, desertion, etc. Mutual consent under Section 13B if both agree. Cruelty includes mental cruelty.',
punishment:'Not applicable — civil remedy.',whoItAppliesTo:'Hindu married couples (also Buddhists, Jains, Sikhs)',
realWorldExample:'Anita endured years of mental cruelty — humiliation, false accusations, denied work. Divorce granted under Section 13(1)(ia) cruelty.',
importantCases:[mkCase('V. Bhagat vs D. Bhagat',1994,'SC','Mental cruelty broadly defined: filing false cases, false allegations, persistent nagging.','Expanded cruelty concept.'),mkCase('Naveen Kohli vs Neelu Kohli',2006,'SC','Recommended "irretrievable breakdown" as divorce ground.','Started no-fault divorce conversation.')],
loopholes:[mkLoop('Proving Mental Cruelty','Mental cruelty is subjective. What is cruel to one may be acceptable to another.','Both spouses allege mental cruelty — normal disagreements portrayed as cruelty.','Court examines cumulative effect over time, social/economic background.','Document instances with dates, specifics. Medical records of depression/anxiety.')],
relatedSections:['hma-sec-13b','hma-sec-9'],difficulty:'Intermediate',tags:['divorce','family law','Hindu marriage','cruelty'],
subCategory:'Divorce',enactedYear:1955,amendedYears:[1964,1976],
upscImportance:'High',upscTopics:['Family Law','Hindu Law','Personal Law','Social Issues'],
aiSearchKeywords:['divorce','grounds for divorce','Section 13 HMA','Hindu divorce','cruelty divorce','mutual consent divorce','desertion'],
scenarioTags:['want to get divorced','husband cruel','spouse committed adultery','spouse missing for years','mutual consent divorce process']}));

allLaws.push(E({id:'sma-sec-4',lawName:'Special Marriage Act 1954',shortName:'SMA',category:'family',
sectionNumber:'Section 4',title:'Conditions for Special Marriage',
definition:'Marriage under SMA requires: (a) neither party has spouse living; (b) neither is idiot/lunatic; (c) male 21+, female 18+; (d) not within prohibited relationship; (e) if custom permits marriage between prohibited degrees, allowed.',
simplifiedExplanation:'SMA allows inter-faith and inter-caste civil marriage without religious ceremony. Conditions apply: age, no existing spouse, sound mind, not prohibited relationship. Notice to Marriage Officer required for 30 days.',
punishment:'Not applicable.',whoItAppliesTo:'Any two persons in India regardless of religion',
realWorldExample:'Hindu girl and Muslim boy want to marry without conversion. They register under SMA. After 30-day notice with no valid objections, Marriage Officer solemnizes marriage.',
importantCases:[mkCase('Lata Singh vs State of UP',2006,'SC','Major inter-caste/inter-faith couples have right to marry under SMA. Police must protect them from family harassment.','Right to marry person of choice.')],
loopholes:[mkLoop('30-Day Notice Objections','30-day notice period allows relatives/community members to file frivolous objections.','Families file baseless objections to prevent marriage.','Marriage Officer decides objections. If frivolous, reject and proceed.','Approach HC for protection if objections are harassing.')],
relatedSections:['sma-sec-5','sma-sec-15'],difficulty:'Beginner',tags:['special marriage','inter-faith marriage','civil marriage','SMA'],
subCategory:'Special Marriage',enactedYear:1954,
upscImportance:'High',upscTopics:['Family Law','Special Marriage','Interfaith Marriage','Personal Law'],
aiSearchKeywords:['Special Marriage Act','Section 4 SMA','inter-faith marriage','inter-caste marriage','civil marriage','court marriage','marriage without conversion','30 day notice'],
scenarioTags:['inter-faith marriage','want court marriage','parents opposing inter-caste marriage','special marriage registration process','objections to marriage notice']}));

allLaws.push(E({id:'dv-sec-12',lawName:'Protection of Women from Domestic Violence Act 2005',shortName:'DV Act',category:'family',
sectionNumber:'Section 12',title:'Application to Magistrate for Protection Orders',
definition:'Aggrieved person or any person on her behalf may apply to Magistrate for one or more reliefs under this Act. Magistrate shall within 3 days fix first date of hearing.',
simplifiedExplanation:'Woman can directly approach Magistrate for protection from domestic violence. Can get: (1) protection order (stop violence), (2) residence order (stay in shared household), (3) monetary relief (maintenance), (4) custody orders, (5) compensation. Emergency relief within days.',
punishment:'Violation of protection order: up to 1 year and/or fine up to Rs 20,000.',
whoItAppliesTo:'Women in domestic relationships (includes wife, mother, sister, live-in partner)',
realWorldExample:'Sunita\'s husband beats her and throws her out of house. She files application under Section 12. Magistrate grants: (1) protection order restraining husband, (2) right to stay in house, (3) monthly maintenance of Rs 10,000.',
importantCases:[mkCase('V.D. Bhanot vs Savita Bhandari',2012,'SC','DV Act covers women in live-in relationships, not just married women.','Live-in relationship protection.')],
loopholes:[mkLoop('False Complaints','DV Act provisions are used by wives to file false complaints during matrimonial disputes.','Wives file DV cases as counter-weapon in custody/property disputes.','Courts carefully examine relationship, violence allegations, timeline.','Apply for quashing if allegations are patently false.')],
relatedSections:['bns-sec-85','hma-sec-13'],difficulty:'Beginner',tags:['domestic violence','women rights','protection order','DV Act'],
subCategory:'Domestic Violence',enactedYear:2005,
upscImportance:'High',upscTopics:['Family Law','Domestic Violence','Women\'s Rights','Social Issues'],
aiSearchKeywords:['Domestic Violence Act','Section 12 DV Act','protection order','residence order','maintenance','domestic violence complaint','shared household','live-in protection'],
scenarioTags:['husband beating wife','thrown out of house','domestic violence protection','maintenance for wife','live-in partner violence']}));

// ============= CONSUMER PROTECTION =============
allLaws.push(E({id:'consumer-sec-2',lawName:'Consumer Protection Act 2019',shortName:'CPA',category:'consumer',
sectionNumber:'Section 2(7)',title:'Definition of Consumer',
definition:'"Consumer" means any person who buys goods or hires services for consideration paid/promised, but does not include person who buys for resale or commercial purpose.',
simplifiedExplanation:'Consumer is someone who buys goods/services for personal use, not for resale. Includes online purchases. Covers both goods and services (including telecom, banking, insurance, healthcare).',
punishment:'Not applicable — definition.',whoItAppliesTo:'Any person buying goods or using services for personal use',
realWorldExample:'Priya bought a defective laptop from Amazon for personal use. She is a consumer. She bought 50 laptops to resell — not a consumer.',
importantCases:[mkCase('Lucknow Development Authority vs M.K. Gupta',1994,'SC','Housing authorities provide "service" — flat buyers are consumers. Services include government/public authorities.','Consumer includes public services.')],
loopholes:[mkLoop('Commercial Purpose Exception','Person buying for commercial purpose NOT a consumer. "Commercial purpose" broadly interpreted.','Sellers argue buyer uses product commercially even when primarily for personal use.','If goods used mainly for earning livelihood (auto driver buying vehicle), still consumer.','Show primary purpose is self-employment, not large-scale commercial.')],
relatedSections:['consumer-sec-35','consumer-sec-38'],difficulty:'Beginner',tags:['consumer','definition','CPA 2019','consumer rights'],
subCategory:'Consumer Definitions',enactedYear:2019,
upscImportance:'Medium',upscTopics:['Consumer Law','CPA 2019','Consumer Rights','E-commerce'],
aiSearchKeywords:['consumer definition','Section 2(7) CPA','who is a consumer','consumer protection','goods and services','commercial purpose exception'],
scenarioTags:['defective product purchased','poor service complaint','online purchase problem','flat buyer consumer dispute']}));

// ============= IT ACT / CYBER LAW =============
allLaws.push(E({id:'it-sec-66',lawName:'Information Technology Act 2000',shortName:'IT Act',category:'cyber',
sectionNumber:'Section 66',title:'Computer Related Offences',
definition:'If any person dishonestly or fraudulently does any act referred to in Section 43 (unauthorized access, downloading, introduction of virus, disruption, denial of service), he shall be punishable with imprisonment up to 3 years or fine up to Rs 5 lakh or both.',
simplifiedExplanation:'Covers unauthorized access to computer systems, data theft, virus introduction, denial of service attacks. Requires dishonest/fraudulent intention. Broad scope covering most hacking activities.',
punishment:'Up to 3 years and/or fine up to Rs 5 lakh.',
whoItAppliesTo:'Any person who unauthorizedly accesses computers',
realWorldExample:'Employee of a company copied client database before quitting and shared it with competitor. Charged under Section 66 for dishonest computer access and data theft.',
importantCases:[mkCase('Poona Auto Ancillaries vs P.S. Dhole',2006,'Bombay HC','Employer not liable for employee\'s criminal act under Section 66 when employee acted beyond scope of employment.','Employer liability limitation.')],
loopholes:[mkLoop('Proof of Dishonest Intention','Prosecution must prove dishonest or fraudulent intention. Accused says it was authorized or accidental.','Accused claims they had authorization or didn\'t know access was unauthorized.','Show lack of authorization through system logs, access controls, termination of employment.','Access logs and IP tracking establish unauthorized access.')],
relatedSections:['it-sec-43','it-sec-66b'],difficulty:'Intermediate',tags:['IT Act','cybercrime','hacking','unauthorized access','data theft'],
subCategory:'Cyber Offences',enactedYear:2000,amendedYears:[2008],
upscImportance:'High',upscTopics:['Cyber Law','IT Act','Cybercrime','Data Protection'],
aiSearchKeywords:['Section 66 IT Act','computer offences','unauthorized access','hacking','data theft','cybercrime','virus introduction','computer data theft'],
scenarioTags:['computer hacked','data stolen from system','employee stole company data','denial of service attack','virus introduced']}));

// ============= RTI ACT =============
allLaws.push(E({id:'rti-sec-3',lawName:'Right to Information Act 2005',shortName:'RTI Act',category:'administrative',
sectionNumber:'Section 3',title:'Right to Information',
definition:'All citizens shall have the right to information, subject to provisions of this Act.',
simplifiedExplanation:'Every citizen can request information from any public authority. Authority must reply within 30 days (48 hrs for life/liberty). Information includes records, documents, emails, opinions, samples. Exemptions include national security, personal information, cabinet papers, commercial confidence.',
punishment:'Penalty of Rs 250 per day for delay beyond 30 days (max Rs 25,000).',
whoItAppliesTo:'All citizens of India',
realWorldExample:'Citizen filed RTI asking how many toilets built under Swachh Bharat in her village. Block Development Officer refused. She appealed to Information Commission. Commission directed disclosure within 15 days.',
importantCases:[mkCase('CBSE vs Aditya Bandopadhyay',2011,'SC','RTI applies to examination bodies. Answer sheets can be disclosed. Citizens can access evaluation process.','RTI extends to examination bodies.')],
loopholes:[mkLoop('Exemption Abuse','Public authorities cite exemptions broadly to deny information. "Commercial confidence" and "personal information" used to hide corruption.','Officials deny information claiming exemption even when public interest outweighs.','Public interest test — if disclosure serves public interest, exemption cannot be claimed.','Appeal to Information Commission. Prove public interest in disclosure.')],
relatedSections:['rti-sec-8','rti-sec-19'],difficulty:'Beginner',tags:['RTI','right to information','transparency','good governance','UPSC important'],
subCategory:'Right to Information',enactedYear:2005,
upscImportance:'Very High',upscTopics:['Administrative Law','RTI','Governance','Transparency','Accountability'],
aiSearchKeywords:['RTI','Right to Information','Section 3 RTI Act','public authority','information commission','transparency','governance','citizen right to know'],
scenarioTags:['want information from government','government office not giving information','corruption in public works','RTI application process','denied information under RTI']}));

// ============= CRIMINAL (additional) =============
allLaws.push(E({id:'bns-sec-64',lawName:'Bharatiya Nyaya Sanhita 2023',shortName:'BNS',category:'criminal',
sectionNumber:'Section 64',title:'Punishment for Rape',
definition:'Whoever commits rape under Section 63 shall be punished with rigorous imprisonment for not less than 10 years, extendable to life imprisonment, and fine.',
simplifiedExplanation:'Minimum 10 years for rape. Gang rape: minimum 20 years to life. Rape of minor under 16: minimum 20 years. Minor under 12: 20 years to death.',
punishment:'Minimum 10 years RI to life. Aggravated cases: 20 years to death.',whoItAppliesTo:'Person convicted of rape',
realWorldExample:'Man convicted of raping a 10-year-old. Sentenced to 25 years RI under Section 64.',
relatedSections:['bns-sec-63','bns-sec-65','bns-sec-66','bns-sec-70'],
difficulty:'Intermediate',tags:['rape','punishment','sentencing','BNS'],subCategory:'Sexual Offences',enactedYear:2023,
upscImportance:'High',aiSearchKeywords:['Section 64 BNS','rape punishment','rape sentence','minimum 10 years','gang rape punishment']}));

allLaws.push(E({id:'pocso-sec-3',lawName:'POCSO Act 2012',shortName:'POCSO',category:'criminal',
sectionNumber:'Section 3',title:'Penetrative Sexual Assault',
definition:'A person commits penetrative sexual assault if he penetrates his penis or any object into the vagina, mouth, urethra or anus of a child, or makes the child do so with him or another person.',
simplifiedExplanation:'Sexual assault on a child (under 18). Includes penile, digital, and object penetration. No consent defense. Both male and female victims covered. Gender neutral.',
punishment:'Minimum 10 years to life imprisonment and fine. Aggravated: 20 years to death.',
whoItAppliesTo:'Any person who commits sexual assault on a child',
realWorldExample:'School teacher molested a 7-year-old student repeatedly. Charged under POCSO Section 3 (penetrative sexual assault). Sentenced to 20 years.',
importantCases:[mkCase('Independent Thought vs Union of India',2017,'SC','Sexual intercourse with wife below 18 is rape under POCSO, reading down IPC marital rape exception for minors.','Protects child brides from marital rape.')],
loopholes:[mkLoop('False Accusations','POCSO cases often filed in matrimonial/property disputes involving children.','One parent accuses other of POCSO to gain custody advantage.','Courts examine evidence carefully — delay, motive, child\'s statement consistency.','Forensic evidence, medical reports, child psychology evaluation.')],
relatedSections:['bns-sec-63','pocso-sec-4','pocso-sec-6'],difficulty:'Intermediate',tags:['POCSO','child sexual abuse','child protection','sexual offences'],
subCategory:'Child Protection',enactedYear:2012,upscImportance:'High',
upscTopics:['Criminal Law','POCSO','Child Rights','Social Issues'],
aiSearchKeywords:['POCSO','Section 3 POCSO','penetrative sexual assault','child sexual abuse','child under 18','protection of children'],
scenarioTags:['child sexually abused','child molested by teacher','POCSO case filing','child marriage rape issue']}));

// ============= MOTOR VEHICLES =============
allLaws.push(E({id:'mv-sec-166',lawName:'Motor Vehicles Act 1988',shortName:'MV Act',category:'transport',
sectionNumber:'Section 166',title:'Motor Accident Claims',
definition:'Application for compensation arising out of motor accident may be made to Claims Tribunal by person who sustained injury, owner of property, or legal representative of deceased.',
simplifiedExplanation:'Victims of road accidents or their families can claim compensation from Motor Accidents Claims Tribunal (MACT). No fault liability: even if victim negligent, minimum compensation payable. Third party insurance mandatory.',
punishment:'Not applicable — compensation.',whoItAppliesTo:'Road accident victims, their families',
realWorldExample:'Rajat died in bus-truck collision. His wife filed claim under Section 166. Tribunal awarded Rs 25 lakh compensation from insurance company under third party policy.',
importantCases:[mkCase('R.S. Sood vs High Court of Rajasthan',2011,'SC','Third party claims under Section 166 are quasi-judicial. Tribunal must determine just compensation considering all factors.','Just compensation principle.')],
loopholes:[mkLoop('Fake Claims','Gangs stage fake accidents to claim insurance money.','Fraudsters fabricate accident claims with fake medical reports.','Insurance companies investigate thoroughly. Courts examine circumstances, medical evidence, police reports.','Cross-examination of claimants, independent investigation.')],
relatedSections:['mv-sec-140','mv-sec-163'],difficulty:'Beginner',tags:['motor accident','claim','compensation','insurance','MACT'],
subCategory:'Accident Claims',enactedYear:1988,amendedYears:[2019],upscImportance:'Medium',
aiSearchKeywords:['Section 166 MV Act','motor accident claim','MACT','accident compensation','third party claim','road accident compensation','no fault liability'],
scenarioTags:['road accident victim','hit by vehicle need compensation','family member died in accident','third party insurance claim']}));

// ============= LABOUR LAWS =============
allLaws.push(E({id:'factories-sec-11',lawName:'Factories Act 1948',shortName:'Factories Act',category:'labour',
sectionNumber:'Section 11',title:'Cleanliness in Factories',
definition:'Every factory shall be kept clean and free from effluent flowing from drains and sanitary conveniences. Precautions against dust, fumes, and other impurities.',
simplifiedExplanation:'Factories must maintain cleanliness: clean floors, proper drainage, ventilation, waste disposal. Worker health and hygiene protected.',
punishment:'Up to Rs 2 lakh fine and/or imprisonment up to 2 years for violations.',
whoItAppliesTo:'All factory owners and occupiers',
realWorldExample:'Factory workers developed respiratory problems due to dust without exhaust system. Labour inspector found violation of Section 11. Owner fined Rs 50,000.',
importantCases:[mkCase('Ratanlal vs State of MP',1970,'MP HC','Factory owner cannot escape liability by delegating cleanliness to manager.','Owner\'s absolute responsibility.')],
relatedSections:['factories-sec-12','factories-sec-13'],difficulty:'Beginner',tags:['factories','labour','worker safety','cleanliness'],
subCategory:'Factories Act',enactedYear:1948,upscImportance:'Low',
aiSearchKeywords:['Factories Act','Section 11','factory cleanliness','worker health','factory hygiene','occupational safety'],
scenarioTags:['factory with poor hygiene','workers fall sick due to factory conditions','no ventilation in factory','unclean workplace']}));

// ============= ENVIRONMENT =============
allLaws.push(E({id:'env-sec-7',lawName:'Environment Protection Act 1986',shortName:'EPA',category:'environment',
sectionNumber:'Section 7',title:'Prohibition on Handling Hazardous Substances',
definition:'No person shall handle or cause to be handled any hazardous substance except in accordance with prescribed procedures and after complying with safety standards.',
simplifiedExplanation:'Businesses handling hazardous substances must follow strict safety procedures, obtain authorization, disclose emergency plans. Covers chemical factories, battery manufacturers, paint industries.',
punishment:'Up to 5 years imprisonment and/or fine up to Rs 1 lakh. Continuing offence: additional Rs 5,000 per day.',
whoItAppliesTo:'Industries and persons handling hazardous substances',
realWorldExample:'Chemical factory stored toxic waste illegally near residential area. Leakage caused hospitalization of 50 residents. Factory owner charged under Section 7 EPA for unauthorized handling of hazardous substance.',
importantCases:[mkCase('M.C. Mehta vs Union of India (Ganga Pollution)',1988,'SC','Absolute liability for hazardous industries handling toxic substances. Cannot escape liability by claiming all precautions taken.','Absolute liability principle.')],
loopholes:[mkLoop('Outsourcing Liability','Companies outsource hazardous waste handling to unlicensed third parties to evade liability.','Company claims waste disposal done by licensed contractor.','Principal company remains liable for waste generated by its process.','Prove waste was generated from company\'s process.')],
relatedSections:['env-sec-8','env-sec-15'],difficulty:'Intermediate',tags:['environment','hazardous substances','pollution','safety',],
subCategory:'Environment Protection',enactedYear:1986,upscImportance:'High',
upscTopics:['Environmental Law','EPA 1986','Pollution','Industry Regulation'],
aiSearchKeywords:['Section 7 EPA','hazardous substances','chemical waste','toxic substances','industrial waste','environment protection','Bhopal gas','pollution control'],
scenarioTags:['chemical factory near homes','toxic waste dumping','industrial pollution','hazardous substance handling','factory causing pollution']}));

// ============= MAIN =============
function main() {
  // Generate Constitution
  genConstitution();
  genDetailedConstitution();

  // Generate BNS
  genBNS();

  // Flatten allLaws to JSON
  const json = JSON.stringify(allLaws, null, 2);
  fs.writeFileSync(OUTPUT, json, 'utf-8');
  console.log('Generated ' + allLaws.length + ' law entries in ' + OUTPUT);
  console.log('File size: ' + (Buffer.byteLength(json) / 1024).toFixed(1) + ' KB');
}

main();
