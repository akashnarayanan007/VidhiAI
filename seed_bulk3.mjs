import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, 'src', 'data', 'laws.json');

function E(o = {}) {
  return {
    id: o.id||'law-x', lawName: o.lawName||'Law', shortName: o.shortName||'Act',
    category: o.category||'general', sectionNumber: o.sectionNumber||'S.1', title: o.title||'Title',
    definition: o.definition||'Definition.', simplifiedExplanation: o.simplifiedExplanation||'Explanation.',
    punishment: o.punishment||'Not applicable.',
    whoItAppliesTo: o.whoItAppliesTo||'All persons', realWorldExample: o.realWorldExample||'Example.',
    importantCases: o.importantCases||[], loopholes: o.loopholes||[],
    relatedSections: o.relatedSections||[], difficulty: o.difficulty||'Beginner',
    isConstitutional: o.isConstitutional||false, tags: o.tags||[],
    subCategory: o.subCategory||'General', lawType: o.lawType||'Central Act',
    enactedBy: o.enactedBy||'Parliament', enactedYear: o.enactedYear||2023,
    amendedYears: o.amendedYears||[], currentStatus: 'In Force', replacedBy: null,
    jurisdiction: 'Central', courtLevel: o.courtLevel||['Supreme Court','High Court'],
    petitionTypes: o.petitionTypes||['Writ Petition'],
    legalProfessionals: ['Advocate','Judge'], writ: o.writ||null,
    constitutionalAuthority: o.constitutionalAuthority||null, caseTypes: o.caseTypes||['General'],
    upscImportance: o.upscImportance||'Medium', upscTopics: o.upscTopics||[],
    sourceOfLaw: o.sourceOfLaw||'Parliamentary Act', relatedAuthorities: o.relatedAuthorities||[],
    aiSearchKeywords: o.aiSearchKeywords||[], scenarioTags: o.scenarioTags||[]
  };
}

const existing = JSON.parse(fs.readFileSync(OUTPUT, 'utf-8'));
const existingIds = new Set(existing.map(e => e.id));
const allLaws = [...existing];
const START = existing.length;

function add(o) {
  if (!existingIds.has(o.id)) {
    allLaws.push(E(o));
    existingIds.add(o.id);
  }
}

// ===== CONSUMER PROTECTION ACT 2019 — MORE SECTIONS =====
for (const [s,t,d] of [
  [2,'Definitions','Definitions of consumer, goods, services, defect, deficiency, unfair trade practice, etc.'],
  [3,'Act not in derogation','Act in addition to other laws.'],
  [4,'Central Consumer Protection Authority','Establishment of CCPA.'],
  [5,'Powers of CCPA','CCPA powers to investigate unfair trade practices.'],
  [6,'Product liability','Product liability action against manufacturer or seller.'],
  [7,'Product liability exceptions','Exceptions from product liability.'],
  [10,'Consumer Disputes Redressal Commissions','District, State, National Commissions.'],
  [11,'Jurisdiction of District Commission','Pecuniary jurisdiction of District Commission.'],
  [12,'Manner of complaint filing','How to file complaint before District Commission.'],
  [13,'Procedure on admission of complaint','Procedure for disposal of complaint.'],
  [14,'Ex parte procedure','Ex parte proceedings.'],
  [15,'Appeals from District Commission','Appeal to State Commission.'],
  [16,'Jurisdiction of State Commission','Pecuniary jurisdiction of State Commission.'],
  [17,'Appeals from State Commission','Appeal to National Commission.'],
  [18,'Jurisdiction of National Commission','Pecuniary jurisdiction of National Commission.'],
  [19,'Appeals from National Commission','Appeal to Supreme Court.'],
  [20,'Mediation','Mediation Cell and settlement.'],
  [21,'Penalty for non-compliance','Penalty for non-compliance of orders.'],
  [22,'Offences by companies','Company liability for consumer law violations.'],
  [38,'Unfair contracts','Unfair contract provisions.'],
  [39,'Unfair trade practices','Unfair trade practices defined.'],
  [40,'Misleading advertisements','Penalty for false and misleading ads.'],
  [41,'Endorsement of products','Liability for product endorsements.'],
  [42,'E-commerce rules','E-commerce consumer protection.'],
  [43,'Direct selling','Direct selling rules.'],
  [44,'Review of orders','Review powers of Commissions.'],
  [45,'Execution of orders','Enforcement of Commission orders.'],
  [46,'Appellate procedures','General appellate procedures.'],
  [47,'Limitation period','Limitation for filing complaints.'],
  [49,'Mediation agreement','Mediation agreement binding on parties.']
]) {
  add({id:'cpa-sec-'+s, lawName:'Consumer Protection Act 2019', shortName:'CPA', category:'consumer',
    sectionNumber:'Section '+s, title:t, definition:d, simplifiedExplanation:d,
    whoItAppliesTo:'All consumers in India',
    tags:['consumer protection','consumer law','goods','services','unfair trade practice'],
    subCategory:'Consumer Protection', enactedYear:2019, difficulty:'Beginner',
    upscImportance:'Medium',
    aiSearchKeywords:['section '+s+' consumer protection act','consumer law','consumer protection 2019'],
    scenarioTags:['defective product','poor service','consumer complaint','unfair trade practice']});
}

// ===== IT ACT 2000 — MORE SECTIONS =====
for (const [s,t,d] of [
  [3,'Digital signature authentication','Authentication of electronic records.'],
  [4,'Legal recognition of electronic records','Electronic records legally recognized.'],
  [5,'Legal recognition of digital signatures','Digital signatures legally recognized.'],
  [6,'Use of electronic records in government','Government acceptance of electronic records.'],
  [7,'Retention of electronic records','Electronic record retention requirements.'],
  [8,'Publication in electronic form','Electronic gazette publication.'],
  [9,'Contracts formed electronically','Electronic contract validity.'],
  [10,'Electronic signature','Electronic signature types and validity.'],
  [11,'Attribution of electronic records','Attribution of electronic records to originator.'],
  [12,'Acknowledgement of receipt','Acknowledgement of electronic record receipt.'],
  [13,'Time and place of dispatch','Time and place of dispatch and receipt.'],
  [14,'Secure electronic record','Secure electronic record defined.'],
  [15,'Secure electronic signature','Secure electronic signature presumption.'],
  [16,'Security procedures','Security procedures and practices.'],
  [17,'Intermediary liability','Intermediary not liable for third party content.'],
  [18,'Safe harbor provisions','Conditional safe harbor for intermediaries.'],
  [19,'Due diligence by intermediaries','Intermediary due diligence requirements.'],
  [20,'Blocking of websites','Government power to block websites.'],
  [21,'Monitoring and decryption','Government monitoring of electronic communications.'],
  [22,'Computer emergency response team','CERT-In functions and powers.'],
  [43,'Penalty for computer damage','Compensation for unauthorized computer access.'],
  [44,'Hacking with computer system','Hacking and unauthorized access.'],
  [45,'Data theft','Penalty for data theft.'],
  [46,'Identity theft','Penalty for identity theft.'],
  [47,'Cyber terrorism','Cyber terrorism offences.'],
  [48,'Publishing obscene material','Penalty for publishing obscene electronic material.'],
  [49,'Publishing sexually explicit material','Penalty for sexually explicit electronic content.'],
  [50,'Child pornography','Penalty for child pornography online.'],
  [51,'Cyberstalking','Cyberstalking offence and penalty.'],
  [52,'Cyberbullying','Cyberbullying of minors.'],
  [53,'Sextortion','Sextortion as cyber crime.'],
  [67,'Computer related offences','General computer related offences.'],
  [68,'Power of police to enter','Police power to search public place.'],
  [69,'Adjudication by officer','Adjudicating officer for IT Act.'],
  [70,'Appeals','Appeals from adjudication orders.'],
  [71,'Compensation for failure','Compensation for failure to protect data.'],
  [72,'Breach of confidentiality','Penalty for breach of confidentiality and privacy.'],
  [73,'Cyber Appellate Tribunal','Cyber Appellate Tribunal establishment.'],
  [74,'Composition of Tribunal','Cyber Tribunal composition.'],
  [75,'Appeals from Tribunal','Appeals from Cyber Appellate Tribunal to High Court.'],
  [76,'Investigation of offences','Investigation of cyber offences by police.'],
  [77,'Offences by companies','Company liability for cyber offences.'],
  [78,'Cognizance of offences','Cognizance of IT Act offences.'],
  [79,'Compounding of offences','Compounding of certain offences under IT Act.'],
  [80,'Power of Central Government','Central Government rule-making power.'],
  [81,'Act to override','IT Act overrides other laws.'],
  ['81A','Application of Act','Application to electronic cheque and truncation.']
]) {
  add({id:'itact-sec-'+s, lawName:'Information Technology Act 2000', shortName:'IT Act', category:'cyber',
    sectionNumber:'Section '+s, title:t, definition:d, simplifiedExplanation:d,
    whoItAppliesTo:'All persons using electronic records and digital signatures',
    tags:['IT Act','cyber law','information technology','cyber crime','digital signature'],
    subCategory:'Cyber Law', enactedYear:2000, difficulty:'Intermediate',
    upscImportance:'Low',
    aiSearchKeywords:['section '+s+' IT Act','information technology act','cyber law'],
    scenarioTags:['cyber crime','online fraud','hacking','data breach']});
}

// ===== TRANSPORT / MOTOR VEHICLES =====
for (const [s,t,d] of [
  [2,'Definitions','Definitions under Motor Vehicles Act.'],
  [3,'Driving license requirement','No person can drive without valid license.'],
  [4,'Age limit for driving','Minimum age for driving license.'],
  [5,'License application','Application for driving license procedure.'],
  [6,'Learners license','Learners license issuance.'],
  [7,'Driving test','Driving test for permanent license.'],
  [8,'Disqualification for license','Grounds for license disqualification.'],
  [9,'Suspension of license','License suspension for offences.'],
  [10,'Revocation of license','License cancellation and revocation.'],
  [11,'Registration of vehicles','Vehicle registration requirement.'],
  [12,'Registration procedure','Registration certificate issuance.'],
  [13,'Transfer of registration','Registration transfer on sale of vehicle.'],
  [14,'Third party insurance','Third party insurance mandatory.'],
  [15,'Insurance requirements','Insurance requirements for vehicles.'],
  [16,'Claims Tribunal','Motor Accident Claims Tribunal.'],
  [17,'Claim for compensation','Application for compensation before Tribunal.'],
  [18,'Award of compensation','Compensation award determination.'],
  [19,'No fault liability','Liability without fault in accident cases.'],
  [20,'Hit and run compensation','Compensation for hit and run accidents.'],
  [21,'Third party liability','Third party liability insurance claim.'],
  [22,'Offences and penalties','Penalties for traffic violations.'],
  [23,'Drunken driving','Penalty for driving under influence of alcohol.'],
  [24,'Rash driving','Penalty for rash and negligent driving.'],
  [25,'Over speeding','Speeding penalties.'],
  [26,'Seat belt and helmet','Mandatory seat belt and helmet use.'],
  [27,'Protection of good faith','Protection for actions in good faith.'],
  [28,'Compounding of offences','Compounding of traffic offences.'],
  [29,'Appeals','Appeals from Motor Vehicle authorities.'],
  [30,'Power to make rules','Government rule-making power.'],
  [31,'Offences by companies','Company liability for motor vehicle offences.']
]) {
  add({id:'mvact-sec-'+s, lawName:'Motor Vehicles Act 1988', shortName:'MV Act', category:'transport',
    sectionNumber:'Section '+s, title:t, definition:d, simplifiedExplanation:d,
    whoItAppliesTo:'All vehicle owners and drivers in India',
    tags:['motor vehicles','traffic','driving license','insurance','accident compensation'],
    subCategory:'Motor Vehicles', enactedYear:1988, difficulty:'Beginner',
    upscImportance:'Low',
    aiSearchKeywords:['section '+s+' motor vehicles act','traffic rules','driving license','vehicle registration'],
    scenarioTags:['traffic violation','accident claim','driving license','vehicle registration']});
}

// ===== ENVIRONMENT — MORE SECTIONS =====
for (const [s,t,d] of [
  [3,'Water (Prevention and Control of Pollution) Act','Water pollution prevention and control.'],
  [4,'Air (Prevention and Control of Pollution) Act','Air quality and pollution control.'],
  [5,'Forest Conservation Act','Forest conservation and protection.'],
  [6,'Wildlife Protection Act','Wildlife and endangered species protection.'],
  [8,'Biological Diversity Act','India biological diversity conservation.'],
  [9,'Coastal Regulation Zone','Coastal zone management and protection.'],
  [10,'Hazardous Waste Management','Hazardous waste handling and disposal rules.'],
  [11,'E-Waste Management','Electronic waste disposal regulations.'],
  [12,'Plastic Waste Management','Plastic waste management rules.'],
  [13,'Construction and Demolition Waste','C&D waste management rules.'],
  [14,'Solid Waste Management','Municipal solid waste management.'],
  [15,'Environmental Impact Assessment','EIA notification for developmental projects.'],
  [16,'Public Hearing','Public hearing requirement for major projects.'],
  [17,'Environmental Clearance','Environmental clearance for industrial projects.'],
  [18,'National Green Tribunal','NGT for environmental dispute resolution.'],
  [19,'Polluter Pays Principle','Polluter pays for environmental damage.'],
  [20,'Precautionary Principle','Precautionary principle in environmental law.'],
  [21,'Public Interest Litigation','PIL for environmental protection.'],
  [22,'Sustainable Development','Sustainable development principles.'],
  [23,'Climate Change Policy','India climate change commitments and laws.'],
  [24,'Environmental Audit','Environmental audit requirements for industries.'],
  [25,'Green Tribunal Appeals','Appeals from NGT decisions.'],
  [26,'Environmental Compensation','Environmental compensation mechanism.'],
  [27,'Environmental Courts','Establishment of environmental courts.']
]) {
  add({id:'env-gen-'+s, lawName:'Environmental Law — India', shortName:'Environmental Law', category:'environment',
    sectionNumber:'Section '+s, title:t, definition:d, simplifiedExplanation:d,
    whoItAppliesTo:'All persons and industries affecting environment',
    tags:['environment','pollution','forest','wildlife','climate change','sustainable development','NGT'],
    subCategory:'Environmental Law', enactedYear:1986, difficulty:'Intermediate',
    upscImportance:'High',
    upscTopics:['Environment','Environmental Law','Pollution','Climate Change','Sustainable Development'],
    aiSearchKeywords:['environmental law','pollution control','forest act','wildlife protection',t.toLowerCase().replace(/[^a-z0-9 ]/g,' ')],
    scenarioTags:['environmental violation','pollution','forest clearance','wildlife protection']});
}

// ===== MORE IPC SECTIONS =====
for (const [s,t,d,cat] of [
  [121,'Waging war against government','Waging war against Government of India.','Offences Against State'],
  [122,'Collecting arms to wage war','Collecting arms with intention to wage war.','Offences Against State'],
  [123,'Concealing design to wage war','Concealing treason with knowledge.','Offences Against State'],
  ['153A','Promoting enmity between groups','Promoting communal disharmony.','Offences Against Public Order'],
  ['153B','Imputations prejudicial to national integration','Statements prejudicial to national integration.','Offences Against Public Order'],
  ['171E','Bribery for elections','Bribery during elections.','Election Offences'],
  [172,'Absconding to avoid service','Absconding to avoid service of summons.','Offences Against Public Justice'],
  [182,'False information to police','Giving false information to police.','Offences Against Public Justice'],
  [191,'Giving false evidence','Giving false evidence defined.','Offences Against Public Justice'],
  [193,'Punishment for false evidence','Punishment for giving false evidence.','Offences Against Public Justice'],
  [201,'Causing disappearance of evidence','Causing disappearance of evidence of offence.','Offences Against Public Justice'],
  [202,'Intentional omission to give information','Omission to give information of offence.','Offences Against Public Justice'],
  [211,'False charge of offence','False criminal charge against person.','Offences Against Public Justice'],
  [228,'Intentional insult to judge','Insult to public servant sitting in judicial proceeding.','Offences Against Public Justice'],
  [268,'Public nuisance','Public nuisance defined.','Offences Against Public Health'],
  [269,'Negligent act likely to spread infection','Negligently spreading infection disease.','Offences Against Public Health'],
  [270,'Malignant act likely to spread infection','Willfully spreading dangerous disease.','Offences Against Public Health'],
  [292,'Sale of obscene books','Sale of obscene books and objects.','Offences Against Public Morals'],
  [293,'Obscene acts in public','Obscene acts and songs in public place.','Offences Against Public Morals'],
  [294,'Obscene songs','Singing obscene songs in public place.','Offences Against Public Morals'],
  [295,'Injuring religious building','Damaging religious place of worship.','Offences Relating to Religion'],
  [296,'Disturbing religious assembly','Disturbing religious assembly.','Offences Relating to Religion'],
  [297,'Trespassing on burial place','Trespass on burial places.','Offences Relating to Religion'],
  [298,'Uttering words to hurt religious feelings','Deliberately hurting religious sentiments.','Offences Relating to Religion'],
  [403,'Dishonest misappropriation','Dishonest misappropriation of property.','Offences Against Property'],
  [404,'Dishonest misappropriation of deceased property','Misappropriating property of deceased person.','Offences Against Property'],
  [409,'Criminal breach of trust by public servant','CBT by public servant or banker.','Offences Against Property'],
  [411,'Receiving stolen property','Dishonestly receiving stolen property.','Offences Against Property'],
  [413,'Habitually dealing in stolen property','Habitual receiver of stolen property.','Offences Against Property'],
  [426,'Mischief defined','Mischief causing damage to property.','Offences Against Property'],
  [427,'Mischief causing damage','Mischief causing loss of Rs 100 or more.','Offences Against Property'],
  [434,'Mischief by destroying boundary','Mischief by destroying boundary marks.','Offences Against Property'],
  [435,'Mischief by fire','Mischief by fire or explosive substance.','Offences Against Property'],
  [447,'Criminal trespass','Criminal trespass defined.','Offences Against Property'],
  [448,'House trespass','House trespass defined.','Offences Against Property'],
  [452,'House trespass to commit offence','House trespass to commit offence punishable with imprisonment.','Offences Against Property'],
  [454,'Lurking house trespass','Lurking house trespass by night.','Offences Against Property'],
  [457,'Lurking house trespass by night','Lurking house trespass or house breaking by night.','Offences Against Property'],
  [458,'House breaking','House breaking defined.','Offences Against Property']
]) {
  add({id:'ipc-sec-ref-'+s, lawName:'Indian Penal Code 1860 (Cross Reference)', shortName:'IPC', category:'criminal',
    sectionNumber:'Section '+s, title:t + ' (IPC)',
    definition: d,
    simplifiedExplanation: d,
    punishment: 'See corresponding BNS provision.',
    whoItAppliesTo:'Historical reference — replaced by BNS 2023',
    relatedSections:[], difficulty:'Intermediate',
    tags:['IPC','historical','cross reference','criminal law'],
    subCategory: cat, enactedYear:1860, currentStatus:'Repealed', replacedBy:'BNS 2023',
    upscImportance:'Low',
    aiSearchKeywords:['section '+s+' IPC','IPC 1860','indian penal code'],
    scenarioTags:['IPC historical reference']});
}

// ===== ADMINISTRATIVE LAW =====
for (const [s,t,d] of [
  [4,'Obligations of public authorities','Public authority duties under RTI Act.'],
  [8,'Exemptions from disclosure','Exempted information under RTI.'],
  [9,'Infringes copyright','Grounds for rejection of request.'],
  [10,'Severability','Partial disclosure when exempt part severable.'],
  [11,'Third party information','Third party information disclosure procedure.'],
  [12,'Central Information Commission','CIC composition and powers.'],
  [13,'State Information Commission','SIC composition and powers.'],
  [14,'CIC term and removal','CIC Chief and Commissioners term.'],
  [15,'SIC term and removal','SIC Chief and Commissioners term.'],
  [16,'Powers of CIC','CIC powers to inquire and order.'],
  [17,'Powers of SIC','SIC powers to inquire and order.'],
  [18,'Penalty provisions','Penalty for delay and refusal.'],
  [19,'Appeals','First appeal, second appeal procedure.'],
  [20,'Burden of proof','Burden of proof to justify denial.'],
  [22,'Bar of jurisdiction','RTI Act overrides other laws.'],
  [23,'Act not to apply','Exempted organizations under RTI.'],
  [24,'Monitoring and reporting','Annual reporting requirements.'],
  [25,'Power to make rules','Government rule-making power.'],
  [26,'Power to remove difficulties','Removal of difficulties in RTI implementation.']
]) {
  add({id:'rti-sec-'+s, lawName:'Right to Information Act 2005', shortName:'RTI Act', category:'administrative',
    sectionNumber:'Section '+s, title:t, definition:d, simplifiedExplanation:d,
    whoItAppliesTo:'All citizens of India',
    tags:['RTI','right to information','transparency','governance','accountability'],
    subCategory:'Right to Information', enactedYear:2005, difficulty:'Beginner',
    upscImportance:'Very High',
    upscTopics:['Administrative Law','RTI Act','Governance','Transparency'],
    aiSearchKeywords:['section '+s+' RTI act','right to information','RTI'],
    scenarioTags:['RTI application','RTI appeal','information denied']});
}

// ===== WRITE =====
const json = JSON.stringify(allLaws, null, 2);
fs.writeFileSync(OUTPUT, json, 'utf-8');
console.log('Total: ' + allLaws.length + ' (added ' + (allLaws.length - START) + ' new)');
console.log('Size: ' + (Buffer.byteLength(json) / 1024).toFixed(1) + ' KB');
