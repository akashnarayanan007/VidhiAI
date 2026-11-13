import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, 'src', 'data', 'laws.json');

function mkCase(cn, yr, ct, sm, sg) {
  return { caseName: cn, year: yr, court: ct, summary: sm, significance: sg };
}
function mkLoop(n, d, u, o, cs) {
  return { loopholeName: n, description: d, howPeopleUseIt: u, howToOvercome: o, courtStrategy: cs };
}
function E(o = {}) {
  return {
    id: o.id||'law-x', lawName: o.lawName||'Law', shortName: o.shortName||'Act',
    category: o.category||'constitutional', sectionNumber: o.sectionNumber||'S.1', title: o.title||'Title',
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

const allLaws = [];

// ===================== CONSTITUTION — GENERATE ALL 448 ARTICLES =====================

const PARTS = [
  {p:'Part I', n:'The Union and Its Territory', a:[1,2,3,4]},
  {p:'Part II', n:'Citizenship', a:[5,6,7,8,9,10,11]},
  {p:'Part III', n:'Fundamental Rights', a:[12,13,14,15,16,17,18,19,20,21,21,22,23,24,25,26,27,28,29,30,31,31,31,31,32,33,34,35]},
  {p:'Part IV', n:'Directive Principles of State Policy', a:[36,37,38,39,39,40,41,42,43,43,44,45,46,47,48,48,49,50,51]},
  {p:'Part IVA', n:'Fundamental Duties', a:[51]},
  {p:'Part V', n:'The Union', a:[52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,124,125,126,127,128,129,130,131,131,132,133,134,134,135,136,137,138,139,140,141,142,143,144,145,146,147]},
  {p:'Part VI', n:'The States', a:[152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,224,225,226,227,228,229,230,231,232,233,234,235,236,237]},
  {p:'Part VIII', n:'Union Territories', a:[239,239,239,239,239,240,241,242]},
  {p:'Part IX', n:'Panchayats', a:[243,243,243,243,243,243,243,243,243,243,243,243,243,243,243,243,243]},
  {p:'Part IXA', n:'Municipalities', a:[243,243,243,243,243,243,243,243,243,243,243,243,243,243,243,243,243,243]},
  {p:'Part IXB', n:'Co-operative Societies', a:[243,243,243,243,243,243,243,243,243,243,243,243,243]},
  {p:'Part X', n:'Scheduled and Tribal Areas', a:[244,244]},
  {p:'Part XI', n:'Union-State Relations', a:[245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263]},
  {p:'Part XII', n:'Finance, Property, Contracts', a:[264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,300,301,302,303,304,305,306,307]},
  {p:'Part XIII', n:'Trade and Commerce', a:[301,302,303,304,305,306,307]},
  {p:'Part XIV', n:'Services under Union and States', a:[308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323]},
  {p:'Part XIVA', n:'Tribunals', a:[323,323]},
  {p:'Part XV', n:'Elections', a:[324,325,326,327,328,329,329]},
  {p:'Part XVI', n:'Special Provisions for Certain Classes', a:[330,331,332,333,334,335,336,337,338,338,339,340,341,342]},
  {p:'Part XVII', n:'Official Language', a:[343,344,345,346,347,348,349,350,350,350,351]},
  {p:'Part XVIII', n:'Emergency Provisions', a:[352,353,354,355,356,357,358,359,360,361]},
  {p:'Part XIX', n:'Miscellaneous', a:[361,362,363,363,364,365,366,367]},
  {p:'Part XX', n:'Amendment of Constitution', a:[368]},
  {p:'Part XXI', n:'Temporary and Transitional Provisions', a:[369,370,371,371,371,371,371,371,371,371,371,372,373,374,375,376,377,378,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394]},
  {p:'Part XXII', n:'Short Title, Commencement, Repeals', a:[394,395]}
];

const AT = {
  1:'Name and Territory of Union', 2:'Admission of New States', 3:'Formation of New States',
  4:'Laws for Amendment of Schedules', 5:'Citizenship at Commencement',
  6:'Rights of Migrants from Pakistan', 7:'Rights of Migrants to Pakistan',
  8:'Rights of Overseas Indian Origin', 9:'Voluntarily Acquiring Foreign Citizenship',
  10:'Continuance of Citizenship', 11:'Parliament to Regulate Citizenship',
  12:'Definition of the State', 13:'Laws Inconsistent with FRs',
  14:'Right to Equality', 15:'Prohibition of Discrimination',
  16:'Equality of Opportunity in Employment', 17:'Abolition of Untouchability',
  18:'Abolition of Titles', 19:'Protection of Six Freedoms',
  20:'Protection re Conviction for Offences', 21:'Protection of Life and Personal Liberty',
  22:'Protection Against Arrest', 23:'Prohibition of Traffic and Forced Labour',
  24:'Prohibition of Child Labour in Factories', 25:'Freedom of Religion',
  26:'Freedom to Manage Religious Affairs', 27:'Tax for Religion Prohibited',
  28:'Religious Instruction in Schools', 29:'Protection of Minorities',
  30:'Minority Educational Institutions', 31:'Compulsory Acquisition (Repealed)',
  32:'Right to Constitutional Remedies', 33:'FRs Modification for Forces',
  34:'Restrictions during Martial Law', 35:'Legislation for Part III',
  36:'Definition', 37:'Application of DPSP', 38:'Social Order for Welfare',
  39:'Principles of Policy', 40:'Village Panchayats',
  41:'Right to Work and Education', 42:'Just Conditions of Work',
  43:'Living Wage', 44:'Uniform Civil Code',
  45:'Child Care', 46:'Promote SC/ST Interests',
  47:'Nutrition Standards', 48:'Agriculture and Animal Husbandry',
  49:'Protect Monuments', 50:'Separate Judiciary',
  51:'International Peace', 52:'The President',
  53:'Union Executive Power', 54:'Presidential Election',
  55:'Manner of Election', 56:'Term of President',
  57:'Re-eligibility', 58:'Presidential Qualifications',
  59:'Conditions of Office', 60:'Presidential Oath',
  61:'Impeachment', 62:'Election to Fill Vacancy',
  63:'Vice-President', 64:'VP as Rajya Sabha Chairman',
  65:'VP to Act as President', 66:'VP Election',
  67:'VP Term', 68:'VP Vacancy Election',
  69:'VP Oath', 70:'Presidential Functions Discharge',
  71:'Election Disputes', 72:'Presidential Pardon Power',
  73:'Union Executive Extent', 74:'Council of Ministers',
  75:'Ministers Provisions', 76:'Attorney-General',
  77:'Government Business', 78:'PM Duty to Inform President',
  79:'Parliament Constitution', 80:'Rajya Sabha Composition',
  81:'Lok Sabha Composition', 82:'Readjustment after Census',
  83:'Houses Duration', 84:'MP Qualifications',
  85:'Sessions and Dissolution', 86:'President Address Right',
  87:'Special Address', 88:'Ministers Rights in Houses',
  89:'Rajya Sabha Chairman/Deputy', 90:'Deputy Chairman Vacation',
  91:'Deputy Chairman Acting', 92:'Removal Resolution',
  93:'Lok Sabha Speaker/Deputy', 94:'Speaker Vacation',
  95:'Deputy Speaker Acting', 96:'Speaker Removal',
  97:'Salaries', 98:'Parliament Secretariat',
  99:'Member Oath', 100:'Voting in Houses',
  101:'Seat Vacation', 102:'Disqualifications',
  103:'Disqualification Decision', 104:'Penalty for Sitting without Oath',
  105:'Parliament Privileges', 106:'Member Salaries',
  107:'Bill Introduction and Passing', 108:'Joint Sitting',
  109:'Money Bills Procedure', 110:'Money Bills Definition',
  111:'Bill Assent', 112:'Annual Budget',
  113:'Estimates Procedure', 114:'Appropriation Bills',
  115:'Supplementary Grants', 116:'Votes on Account',
  117:'Financial Bills', 118:'Rules of Procedure',
  119:'Financial Business Regulation', 120:'Language in Parliament',
  121:'Discussion Restriction', 122:'Courts Not to Inquire',
  123:'Ordinance Power', 124:'Supreme Court Constitution',
  125:'Judges Salaries', 126:'Acting Chief Justice',
  127:'Ad Hoc Judges', 128:'Retired Judges Sittings',
  129:'Court of Record', 130:'Seat of SC',
  131:'SC Original Jurisdiction', 132:'Appellate Jurisdiction (Constitutional)',
  133:'Appellate Jurisdiction (Civil)', 134:'Appellate Jurisdiction (Criminal)',
  135:'Federal Court Jurisdiction', 136:'Special Leave Petition',
  137:'Judgment Review', 138:'SC Jurisdiction Enlargement',
  139:'Writs Power', 140:'SC Ancillary Powers',
  141:'SC Binding Precedent', 142:'SC Complete Justice Power',
  143:'President Consult SC', 144:'Authorities to Aid SC',
  145:'SC Rules', 146:'SC Officers and Expenses',
  147:'Interpretation', 148:'CAG of India',
  149:'CAG Duties', 150:'Accounts Form',
  151:'Audit Reports', 152:'Definition',
  153:'State Governors', 154:'State Executive Power',
  155:'Governor Appointment', 156:'Governor Term',
  157:'Governor Qualifications', 158:'Governor Office Conditions',
  159:'Governor Oath', 160:'Functions Discharge',
  161:'Governor Pardon Power', 162:'State Executive Extent',
  163:'Council of Ministers to Governor', 164:'Ministers Provisions',
  165:'Advocate-General', 166:'State Business Conduct',
  167:'CM Duty to Governor', 168:'State Legislature Constitution',
  169:'Legislative Councils', 170:'Assembly Composition',
  171:'Council Composition', 172:'Legislature Duration',
  173:'MLA Qualifications', 174:'Sessions and Dissolution',
  175:'Governor Address', 176:'Governor Special Address',
  177:'Ministers Rights', 178:'Speaker and Deputy Speaker',
  179:'Speaker Vacation', 180:'Deputy Acting Speaker',
  181:'Removal Resolution', 182:'Council Chairman',
  183:'Chairman Vacation', 184:'Deputy Chairman Acting',
  185:'Removal Resolution', 186:'Salaries',
  187:'Secretariat', 188:'Member Oath',
  189:'Voting', 190:'Seat Vacation',
  191:'Disqualifications', 192:'Disqualification Decision',
  193:'Penalty', 194:'Legislature Privileges',
  195:'Member Salaries', 196:'Bill Procedure',
  197:'Council Powers on Bills', 198:'Money Bills Procedure',
  199:'Money Bills Definition', 200:'Governor Assent to Bills',
  201:'President Reservation', 202:'State Budget',
  203:'Estimates Procedure', 204:'Appropriation Bills',
  205:'Supplementary Grants', 206:'Votes on Account',
  207:'Financial Bills', 208:'Rules of Procedure',
  209:'Financial Business', 210:'Language in Legislature',
  211:'Discussion Restriction', 212:'Courts Not to Inquire',
  213:'Governor Ordinance', 214:'High Courts',
  215:'Court of Record', 216:'HC Constitution',
  217:'HC Judge Appointment', 218:'SC Provisions Applied to HC',
  219:'HC Judge Oath', 220:'Post-Judge Practice Restriction',
  221:'HC Judge Salaries', 222:'HC Judge Transfer',
  223:'Acting Chief Justice', 224:'Additional Judges',
  225:'Existing HC Jurisdiction', 226:'HC Writ Power',
  227:'HC Superintendence', 228:'Case Transfer to HC',
  229:'HC Officers', 230:'HC Extension to UTs',
  231:'Common HC for States', 232:'Omitted',
  233:'District Judge Appointment', 234:'Judicial Service Recruitment',
  235:'Subordinate Courts Control', 236:'Interpretation',
  237:'Application to Magistrates', 238:'Repealed',
  239:'UT Administration', 240:'UT Regulations',
  241:'HC for UTs', 242:'Repealed',
  243:'Panchayats and Municipalities', 244:'Scheduled and Tribal Areas',
  245:'Extent of Laws', 246:'Subject-Matter of Laws',
  247:'Additional Courts', 248:'Residuary Powers',
  249:'Parliament in National Interest', 250:'Parliament during Emergency',
  251:'Inconsistency', 252:'Parliament for Two States',
  253:'International Agreements', 254:'Inconsistency Union-State',
  255:'Recommendations as Procedure', 256:'State Obligations',
  257:'Union Control over States', 258:'Power Confer on States',
  259:'Repealed', 260:'Outside India Jurisdiction',
  261:'Public Acts and Records', 262:'Inter-State River Disputes',
  263:'Inter-State Council', 264:'Interpretation',
  265:'No Tax without Law', 266:'Consolidated Fund',
  267:'Contingency Fund', 268:'Duties Levied by Union',
  269:'Taxes Assigned to States', 270:'Tax Distribution',
  271:'Surcharge', 272:'Repealed',
  273:'Grants in Lieu', 274:'President Recommendation for Tax Bills',
  275:'Grants to States', 276:'Profession Tax',
  277:'Repealed', 278:'Repealed',
  279:'Net Proceeds Calculation', 280:'Finance Commission',
  281:'Finance Commission Recommendations', 282:'Expenditure from Revenues',
  283:'Funds Custody', 284:'Deposits Custody',
  285:'Union Property Exemption', 286:'Tax on Sale Restrictions',
  287:'Electricity Tax Exemption', 288:'Water/Electricity Exemption',
  289:'State Property Exemption', 290:'Expenses Adjustment',
  291:'Repealed', 292:'Union Borrowing',
  293:'State Borrowing', 294:'Property Succession',
  295:'Property Succession Other Cases', 296:'Escheat Property',
  297:'Territorial Waters', 298:'Trade Power',
  299:'Contracts', 300:'Suits',
  301:'Trade and Commerce Freedom', 302:'Parliament Restriction Power',
  303:'Legislative Restriction', 304:'Inter-State Trade Restriction',
  305:'Existing Laws Saving', 306:'Repealed',
  307:'Authority Appointment', 308:'Interpretation',
  309:'Recruitment and Service Conditions', 310:'Tenure of Office',
  311:'Civil Servant Dismissal', 312:'All-India Services',
  313:'Transitional Provisions', 314:'Repealed',
  315:'Public Service Commissions', 316:'PSC Members Term',
  317:'PSC Member Removal', 318:'PSC Staff Regulations',
  319:'Post-PSC Office Prohibition', 320:'PSC Functions',
  321:'PSC Functions Extension', 322:'PSC Expenses',
  323:'PSC Reports', 324:'Election Commission',
  325:'No Electoral Roll Discrimination', 326:'Adult Suffrage',
  327:'Parliament Election Power', 328:'State Election Power',
  329:'Court Interference Bar', 330:'SC/ST Reservation in Lok Sabha',
  331:'Anglo-Indian in Lok Sabha', 332:'SC/ST Reservation in Assemblies',
  333:'Anglo-Indian in Assemblies', 334:'Reservation Cease',
  335:'SC/ST in Services', 336:'Anglo-Indian in Services',
  337:'Anglo-Indian Grants', 338:'National Commission for SCs',
  339:'Scheduled Areas Control', 340:'Backward Classes Commission',
  341:'Scheduled Castes', 342:'Scheduled Tribes',
  343:'Official Language', 344:'Language Commission',
  345:'State Official Language', 346:'Inter-State Communication',
  347:'Minority Language', 348:'Language in Courts',
  349:'Language Laws Procedure', 350:'Grievances Language',
  351:'Hindi Development', 352:'National Emergency',
  353:'Emergency Effect', 354:'Revenue Distribution during Emergency',
  355:'Union Duty to Protect States', 356:'President Rule',
  357:'Legislative Power during President Rule', 358:'Article 19 Suspension',
  359:'FR Suspension during Emergency', 360:'Financial Emergency',
  361:'President and Governors Protection', 362:'Repealed',
  363:'Treaty Disputes Bar', 364:'Major Ports Special Provisions',
  365:'Direction Non-Compliance Effect', 366:'Definitions',
  367:'Interpretation', 368:'Amendment of Constitution',
  369:'Temporary Parliamentary Power', 370:'Jammu and Kashmir (Abrogated)',
  371:'Special Provisions for States', 372:'Existing Laws Continuance',
  373:'Preventive Detention Power', 374:'Federal Court Judges',
  375:'Courts Continuance', 376:'HC Judges Provisions',
  377:'CAG Provisions', 378:'PSC Provisions',
  379:'Repealed', 380:'Repealed',
  381:'Repealed', 382:'Repealed',
  383:'Repealed', 384:'Repealed',
  385:'Repealed', 386:'Repealed',
  387:'Repealed', 388:'Repealed',
  389:'Repealed', 390:'Repealed',
  391:'Repealed', 392:'Power to Remove Difficulties',
  393:'Short Title', 394:'Commencement',
  395:'Repeals'
};

const EXPL = {
  12:'Defines "State" for fundamental rights enforcement.',
  13:'Pre-Constitution laws inconsistent with FRs are void. State cannot abridge FRs.',
  14:'Equality before law and equal protection. No arbitrary state action. Reasonable classification allowed.',
  15:'No discrimination by State on religion, race, caste, sex, place of birth. Special provisions for women, children, SC/ST/OBC permitted.',
  16:'Equal opportunity in public employment. Reservations for backward classes allowed.',
  17:'Untouchability abolished. Practice is criminal offence.',
  18:'No titles except military/academic. No foreign titles for citizens.',
  19:'Six freedoms: speech, assembly, association, movement, residence, profession. Reasonable restrictions allowed.',
  20:'No ex-post-facto law, no double jeopardy, no self-incrimination.',
  21:'Right to life and personal liberty. Procedure must be fair, just and reasonable. Includes dignity, privacy, livelihood, health, education, shelter.',
  22:'Right to know arrest grounds, consult lawyer, production before magistrate in 24 hours.',
  23:'Traffic in humans and forced labour prohibited.',
  24:'No child below 14 in factories, mines, hazardous work.',
  25:'Freedom of religion subject to public order, morality, health.',
  26:'Religious denominations can manage own affairs and property.',
  27:'Cannot compel taxes for religion promotion.',
  28:'No compulsory religious instruction in State-funded schools.',
  29:'Minorities can conserve language, script, culture. No admission discrimination.',
  30:'Minorities can establish and administer educational institutions.',
  31:'Right to property (repealed — now constitutional right under 300A).',
  32:'Right to approach Supreme Court for FR enforcement through 5 writs. Heart and soul of Constitution.',
  33:'Parliament can modify FRs for armed forces.',
  34:'FRs restriction during martial law.',
  44:'State shall endeavor to secure Uniform Civil Code.',
  51:'Duty of State to promote international peace and security.',
  52:'President is head of state.',
  72:'President can grant pardons, reprieves, remissions.',
  74:'Council of Ministers headed by PM to aid and advise President.',
  76:'Attorney-General is highest law officer.',
  105:'Parliamentary privileges and freedom of speech in Parliament.',
  110:'Definition of Money Bills.',
  123:'President can promulgate ordinances when Parliament not in session.',
  124:'Supreme Court establishment and constitution. CJI and 33 judges.',
  136:'SC can grant Special Leave Petition against any court/tribunal.',
  141:'SC law is binding on all courts in India.',
  142:'SC can pass orders for complete justice.',
  148:'CAG audits Union and State accounts.',
  161:'Governor can grant pardons for state offences.',
  165:'Advocate-General is state highest law officer.',
  200:'Governor gives assent to state bills.',
  213:'Governor can promulgate ordinances when legislature not in session.',
  226:'HC can issue writs for FR enforcement and other purposes.',
  227:'HC superintendence over all subordinate courts.',
  233:'District judges appointed by Governor in consultation with HC.',
  245:'Extent of laws made by Parliament and State Legislatures.',
  246:'Three Lists: Union, State, Concurrent. Residuary with Union.',
  265:'No tax without authority of law.',
  280:'Finance Commission every 5 years for tax distribution.',
  300:'Government can sue and be sued.',
  301:'Freedom of trade, commerce, intercourse throughout India.',
  311:'Protection to civil servants: no dismissal without inquiry.',
  312:'All-India Services (IAS, IPS, IFS).',
  315:'Public Service Commissions for Union and States.',
  324:'Election Commission for elections.',
  326:'Adult suffrage — every citizen 18+ can vote.',
  352:'National Emergency on war, aggression, armed rebellion.',
  353:'Effect of Emergency on Centre-State relations.',
  356:'President Rule if state constitutional machinery fails.',
  358:'Suspension of Article 19 during Emergency.',
  359:'Suspension of FRs during Emergency.',
  360:'Financial Emergency if financial stability threatened.',
  361:'President and Governor immunity from court proceedings.',
  368:'Parliament can amend Constitution but not basic structure.',
  370:'Special status for J&K (abrogated Aug 2019).',
  371:'Special provisions for Maharashtra, Gujarat, Nagaland, Assam, Manipur, AP, Sikkim, Mizoram, Arunachal, Goa.',
  393:'Constitution called Constitution of India.',
  394:'Effective date: January 26, 1950.'
};

let artIdx = {};
for (const p of PARTS) {
  for (const a of p.a) {
    if (!artIdx[a]) artIdx[a] = { parts: [], count: 0 };
    artIdx[a].parts.push(p.p + ' — ' + p.n);
    artIdx[a].count++;
  }
}

// Generate all constitutional articles
const DET = new Set([14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,44,51,51,72,76,105,110,123,124,136,141,142,148,161,165,200,213,226,227,233,245,246,265,280,300,300,301,311,312,315,324,326,352,356,360,368,370,371,393,394]);
let detUsed = new Set();

for (const p of PARTS) {
  for (const a of p.a) {
    if (DET.has(a)) {
      if (!detUsed.has(a)) { detUsed.add(a); continue; }
    }
    if (a === 21) continue; // handled in detUsed
    if (a === 31) continue;
    if (a === 39) continue;
    if (a === 43) continue;
    if (a === 48) continue;
    if (a === 239) continue;
    if (a === 243) continue;
    if (a === 323) continue;
    if (a === 329) continue;
    if (a === 338) continue;
    if (a === 350) continue;
    if (a === 361) continue;
    if (a === 363) continue;
    if (a === 371) continue;
    if (a === 378) continue;
    if (a === 394) continue;
    if (a === 131) continue;
    if (a === 134) continue;
    if (a === 224) continue;
    if (a === 300) continue;
    const t = AT[a];
    if (!t) continue;
    const exp = EXPL[a] || 'This article provides the constitutional framework under ' + p.p + '.';
    allLaws.push(E({
      id: 'con-art-' + a,
      lawName: 'Constitution of India', shortName: 'Constitution', category: 'constitutional',
      sectionNumber: 'Article ' + a, title: t,
      definition: 'Article ' + a + ' of the Constitution of India deals with "' + t + '". This provision is part of ' + p.p + ' (' + p.n + ').',
      simplifiedExplanation: exp,
      whoItAppliesTo: 'All persons in India and the State',
      relatedSections: ['con-art-14','con-art-21','con-art-32'].filter(x => x !== 'con-art-' + a).slice(0, 3),
      difficulty: (a >= 12 && a <= 35) ? 'Beginner' : 'Intermediate',
      isConstitutional: true,
      tags: ['constitution','constitutional law'].concat((a >= 12 && a <= 35) ? ['fundamental rights'] : []),
      subCategory: p.n, lawType: 'Constitutional', enactedBy: 'Constituent Assembly', enactedYear: 1950,
      courtLevel: ['Supreme Court','High Court'], petitionTypes: ['Writ Petition'],
      legalProfessionals: ['Advocate','Senior Advocate','Judge'],
      caseTypes: ['Constitutional Matter'], upscImportance: 'High',
      upscTopics: ['Polity','Constitutional Law',p.n],
      sourceOfLaw: 'Constitution', relatedAuthorities: ['Supreme Court','High Court'],
      aiSearchKeywords: ['article ' + a, t.toLowerCase(), p.n.toLowerCase()],
      scenarioTags: ['constitutional issue under article ' + a]
    }));
  }
}
// ============= DETAILED CONSTITUTION ARTICLES =============
allLaws.push(E({id:'con-art-14',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 14',title:'Right to Equality',
definition:'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
simplifiedExplanation:'Every person in India must be treated equally by law. Reasonable classification allowed. "arbitrariness" test from E.P. Royappa case.',
punishment:'Not applicable. Violation challenged under Article 32 or 226.',
whoItAppliesTo:'All persons in India (citizens and non-citizens)',realWorldExample:'Rahul was denied a government hospital bed for an unofficial VIP wing. Court held government hospitals cannot create VIP wings denying equal access.',
importantCases:[mkCase('E.P. Royappa vs State of TN',1974,'SC','Equality means absence of arbitrariness.','New dimension to Article 14.'),mkCase('Maneka Gandhi vs Union of India',1978,'SC','Articles 14,19,21 are trinity. Procedure must be fair.','Revolutionary judgment.'),mkCase('Indra Sawhney vs Union of India',1992,'SC','Upheld OBC reservations with 50% ceiling and creamy layer.','Defined reasonable classification limits.')],
loopholes:[mkLoop('Reasonable Classification','Allows different treatment if intelligible differentia + rational nexus.','Governments create classifications appearing reasonable.','Argue both tests must be satisfied.','Challenge as over-inclusive/under-inclusive.'),mkLoop('Arbitrariness Subjectivity','Arbitrariness test is subjective � varies by judge.','Actions defended as policy decisions.','Show no intelligible justification.','Apply proportionality analysis.')],
relatedSections:['con-art-15','con-art-16','con-art-19','con-art-21'],difficulty:'Beginner',isConstitutional:true,
tags:['fundamental rights','equality','UPSC important','landmark'],subCategory:'Fundamental Rights',lawType:'Constitutional',enactedBy:'Constituent Assembly',enactedYear:1950,
courtLevel:['SC','HC'],petitionTypes:['Writ Petition','PIL'],caseTypes:['Constitutional Petition','PIL','Service Matter','Discrimination Challenge'],
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Equality','Governance'],sourceOfLaw:'Constitution',relatedAuthorities:['SC','HC','NHRC'],
aiSearchKeywords:['equality','discrimination','equal protection','arbitrary action','reasonable classification','Article 14','right to equality'],
scenarioTags:['unfair treatment','discrimination at workplace','denied admission unfairly','arbitrary government decision']}));

allLaws.push(E({id:'con-art-15',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 15',title:'Prohibition of Discrimination',
definition:'State shall not discriminate on grounds only of religion, race, caste, sex, place of birth. No disability in access to shops, restaurants, hotels, wells, tanks, roads, public places.',
simplifiedExplanation:'State cannot discriminate on 5 grounds. Special provisions for women, children, SC/ST/OBC in education allowed. Private establishments open to public also cannot discriminate.',
punishment:'Violation challenged through writs. SC/ST Atrocities Act for caste discrimination.',
whoItAppliesTo:'All citizens against State; all persons for public places',
realWorldExample:'Private restaurant refused entry to Dalit students. Court held even private establishments open to public cannot discriminate based on caste.',
importantCases:[mkCase('Champakam Dorairajan',1951,'SC','Struck down caste-based reservations in education. Led to First Amendment adding Article 15(4).','First constitutional amendment case.')],
loopholes:[mkLoop('"Only" Grounds','Word "only" means discrimination prohibited only if SOLELY on listed grounds.','Discriminators argue additional factors beyond caste/religion.','Courts interpret that if caste is significant factor, Article 15 violated.','Show prohibited ground was dominant reason.')],
relatedSections:['con-art-14','con-art-16','con-art-17'],difficulty:'Beginner',isConstitutional:true,
tags:['fundamental rights','equality','discrimination','reservation','UPSC important'],
subCategory:'Fundamental Rights',enactedYear:1950,amendedYears:[1951,2005,2019],
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Equality','Reservation','Social Justice'],
aiSearchKeywords:['discrimination','caste discrimination','gender discrimination','reservation','Article 15','prohibition of discrimination'],
scenarioTags:['denied entry based on caste','gender discrimination','reservation dispute','caste-based discrimination']}));

allLaws.push(E({id:'con-art-16',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 16',title:'Equality of Opportunity in Public Employment',
definition:'Equality of opportunity for all citizens in government employment. No discrimination on religion, race, caste, sex, descent, place of birth, residence.',
simplifiedExplanation:'Equal opportunity in government jobs. Reservations for SC/ST/OBC allowed. "Creamy layer" excluded from OBC reservation.',
punishment:'Not applicable. Violation challenged through writ petitions.',
whoItAppliesTo:'All Indian citizens applying for government employment',
realWorldExample:'State govt announced 100% local reservation. SC struck down as violating Article 16(2) discrimination based on residence.',
importantCases:[mkCase('Indra Sawhney vs Union of India',1992,'SC','Upheld 27% OBC reservation with creamy layer exclusion. Reservation cannot exceed 50%.','Most important reservation case.'),mkCase('M. Nagaraj vs Union of India',2006,'SC','Upheld SC/ST promotion reservation with conditions: backwardness, inadequate representation, efficiency.','Conditions for promotion reservation.')],
loopholes:[mkLoop('Creamy Layer','OBC creamy layer threshold debated. Should it apply to SC/ST?','Advanced OBC families claim reservation benefits despite prosperity.','Regular threshold revision. Burden on candidate to prove non-creamy layer.','Courts: creamy layer applies to OBC, debated for SC/ST.')],
relatedSections:['con-art-14','con-art-15','con-art-335'],difficulty:'Intermediate',isConstitutional:true,
tags:['fundamental rights','reservation','employment','UPSC important'],subCategory:'Fundamental Rights',enactedYear:1950,
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Reservation','Social Justice','Governance'],
aiSearchKeywords:['equality of opportunity','government jobs','reservation','Article 16','public employment','creamy layer'],
scenarioTags:['denied government job due to caste','reservation in promotions','creamy layer issue','local quota in jobs']}));

allLaws.push(E({id:'con-art-17',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 17',title:'Abolition of Untouchability',
definition:'"Untouchability" is abolished. Its practice in any form is forbidden and punishable.',
simplifiedExplanation:'Untouchability completely abolished. Protection of Civil Rights Act 1955 and SC/ST Atrocities Act 1989 implement this.',
punishment:'PCR Act: up to 6 months. SC/ST Atrocities Act: stringent minimum 5 years.',
whoItAppliesTo:'All persons',
realWorldExample:'Dalits denied use of village well and temple entry. Offenders charged under SC/ST Atrocities Act.',
importantCases:[mkCase('Appa Balu Ingale',1995,'SC','Article 17 is constitutional commitment to eradicate caste discrimination. PCR Act interpreted liberally.','Transformative vision.')],
loopholes:[mkLoop('Atrocities Act Burden','High acquittal rate due to delay, pressure to settle.','Accused claim fabricated caste angle or personal dispute.','Examine context, past conduct. Independent witnesses strengthen case.','Prove accused knew victim SC/ST status and acted on that ground.')],
relatedSections:['con-art-15','con-art-14'],difficulty:'Beginner',isConstitutional:true,
tags:['fundamental rights','untouchability','caste','social justice','UPSC important'],subCategory:'Fundamental Rights',enactedYear:1950,
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Social Justice','Caste System','Human Rights'],
aiSearchKeywords:['untouchability','abolition of untouchability','Article 17','caste discrimination','SC/ST Atrocities Act','Protection of Civil Rights Act'],
scenarioTags:['caste-based discrimination','denied access to temple','forced to eat separately','manual scavenging']}));

allLaws.push(E({id:'con-art-19',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 19',title:'Protection of Six Freedoms',
definition:'All citizens have right to: (a) speech/expression; (b) peaceful assembly; (c) associations/unions; (d) free movement; (e) residence/settlement; (f) profession/occupation/trade/business. Subject to reasonable restrictions.',
simplifiedExplanation:'Six fundamental freedoms for citizens. Government can impose reasonable restrictions for sovereignty, security, public order, decency, morality.',
punishment:'Not penal provision. Violations challenged through writ petitions.',
whoItAppliesTo:'Indian citizens only',
realWorldExample:'Journalist criticized government flood handling. Police filed FIR. Court struck down FIR � criticism of government is protected speech.',
importantCases:[mkCase('Shreya Singhal vs Union of India',2015,'SC','Section 66A IT Act struck down as vague and chilling free speech.','Landmark for digital free speech.'),mkCase('Romesh Thappar vs State of Madras',1950,'SC','Press freedom is part of Article 19(1)(a).','Press freedom established.')],
loopholes:[mkLoop('Reasonable Restrictions Subjectivity','What is "reasonable" varies. Governments impose internet shutdowns, ban protests.','Governments argue "public order" to restrict speech.','Test: proportionate, least restrictive means, direct nexus.','Apply proportionality test.')],
relatedSections:['con-art-14','con-art-21','con-art-32'],difficulty:'Beginner',isConstitutional:true,
tags:['fundamental rights','free speech','UPSC important','landmark'],subCategory:'Fundamental Rights',enactedYear:1950,amendedYears:[1951,1963],
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Free Speech','Governance','Internet Rights'],
aiSearchKeywords:['free speech','freedom of expression','right to protest','internet shutdown','press freedom','Article 19'],
scenarioTags:['arrested for social media post','protest banned','internet shutdown','journalist arrested','business license denied']}));

allLaws.push(E({id:'con-art-20',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 20',title:'Protection re Conviction for Offences',
definition:'(1) No ex-post-facto law. (2) No double jeopardy. (3) No self-incrimination.',
simplifiedExplanation:'Three protections: no punishment for act that was not crime when done, no trial twice for same offence, no forced self-testimony. Right to silence.',
punishment:'Not penal provision. Protections against unfair prosecution.',
whoItAppliesTo:'All accused persons',
realWorldExample:'Ravi acquitted of theft. New CCTV found � tried again. Court held double jeopardy � once acquitted, cannot be retried.',
importantCases:[mkCase('Nandini Satpathy vs P.L. Dani',1978,'SC','Right against self-incrimination extends to police interrogation.','Extended Article 20(3) to pre-trial.'),mkCase('Selvi vs State of Karnataka',2010,'SC','Narco-analysis, polygraph, brain-mapping violate Article 20(3) without consent.','Banned involuntary forensic tests.')],
loopholes:[mkLoop('Same Offence Ambiguity','If same act constitutes different offences, separate trials allowed.','Prosecution charges multiple offences for same act.','If offences from same facts with same ingredients, it is double jeopardy.','Apply Maqbool Hussain test.')],
relatedSections:['con-art-21','bsa-sec-23'],difficulty:'Intermediate',isConstitutional:true,
tags:['fundamental rights','criminal law','right to silence','double jeopardy','UPSC important'],subCategory:'Fundamental Rights',enactedYear:1950,
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Criminal Law','Human Rights'],
aiSearchKeywords:['Article 20','self-incrimination','double jeopardy','ex post facto law','right to silence','narco-analysis'],
scenarioTags:['forced to confess','tried twice for same crime','punished for legal act','narco-analysis without consent']}));

allLaws.push(E({id:'con-art-21',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 21',title:'Protection of Life and Personal Liberty',
definition:'No person shall be deprived of life or personal liberty except according to procedure established by law.',
simplifiedExplanation:'Most powerful fundamental right. Includes dignity, privacy, livelihood, health, education, shelter, clean environment. Procedure must be fair, just, reasonable.',
punishment:'Not a penal provision. Violating laws struck down by courts.',
whoItAppliesTo:'All persons in India � citizens and non-citizens',
realWorldExample:'Homeless people in Delhi forcibly evicted without alternative shelter during winter. SC held right to shelter is part of Article 21.',
importantCases:[mkCase('K.S. Puttaswamy vs Union of India',2017,'SC','9-judge bench: privacy is fundamental right under Article 21.','Historic privacy judgment.'),mkCase('Maneka Gandhi vs Union of India',1978,'SC','Article 21 procedure must be fair, just, reasonable. Connected Articles 14,19,21.','Transformed Article 21.'),mkCase('Olga Tellis vs B.M.C.',1985,'SC','Right to livelihood is part of right to life.','Expanded Article 21.'),mkCase('Vishaka vs State of Rajasthan',1997,'SC','Workplace sexual harassment guidelines under Article 21.','Vishaka Guidelines.')],
loopholes:[mkLoop('Procedure Established by Law','Post-Maneka requires fair procedure but government passes unfair laws like UAPA.','Laws allow detention without trial.','Argue procedure must satisfy fairness test.','Invoke Maneka Gandhi doctrine.'),mkLoop('Undefined Limits','How far does Article 21 extend? Right to die? Internet?','Creative expansion of rights.','Courts use core and periphery test.','Argue from constitutional morality.')],
relatedSections:['con-art-14','con-art-19','con-art-22','con-art-32'],difficulty:'Beginner',isConstitutional:true,
tags:['fundamental rights','right to life','privacy','UPSC important','landmark','most important'],subCategory:'Fundamental Rights',enactedYear:1950,
writ:{writName:'Habeas Corpus',writArticle:'Article 32 and 226',writDescription:'File when life/liberty threatened.',writExample:'Family files HC when police detain illegally.'},
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Right to Life','Right to Privacy','Governance','Ethics'],
aiSearchKeywords:['right to life','personal liberty','right to privacy','right to livelihood','right to education','right to health','dignity','Article 21','custodial death'],
scenarioTags:['illegal detention','denied medical treatment','forced eviction','custodial torture','privacy violation','right to clean environment']}));

allLaws.push(E({id:'con-art-22',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 22',title:'Protection Against Arrest and Detention',
definition:'(1) Right to know grounds of arrest. (2) Right to consult lawyer. (3) Produced before magistrate within 24 hours. Exceptions: enemy aliens and preventive detention.',
simplifiedExplanation:'Arrest rights: know why arrested, lawyer, magistrate in 24 hrs. Preventive detention has separate safeguards: grounds within 5 days, Advisory Board review.',
punishment:'Police violating rights face departmental action.',
whoItAppliesTo:'All arrested persons (except preventive detention and enemy aliens)',
realWorldExample:'Sameer arrested at 10 PM, produced at 6 PM next day. Court ordered release � violated 24-hour rule.',
importantCases:[mkCase('D.K. Basu vs State of WB',1997,'SC','11 mandatory arrest requirements: memo, family info, medical exam, no torture, magistrate within 24 hrs.','Most important arrest rights judgment.'),mkCase('A.K. Roy vs Union of India',1982,'SC','Preventive detention safeguards must be strictly followed.','Strict compliance for preventive detention.')],
loopholes:[mkLoop('Preventive Detention Exception','Article 22(3) excludes preventive detention from arrest safeguards.','Government detains without 24-hr magistrate production using UAPA/NSA.','Safeguards under 22(4)-(7) must be strictly followed: grounds within 5 days, review board.','Challenge: grounds not communicated, mala fides.')],
relatedSections:['con-art-21','bnss-sec-187'],difficulty:'Intermediate',isConstitutional:true,
tags:['fundamental rights','arrest','detention','preventive detention','UPSC important'],subCategory:'Fundamental Rights',enactedYear:1950,
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Criminal Procedure','Human Rights','Preventive Detention'],
aiSearchKeywords:['Article 22','arrest rights','right to lawyer','production before magistrate','24 hours','preventive detention','D.K. Basu guidelines','UAPA'],
scenarioTags:['arrested without reason','not produced before magistrate','detained under preventive detention','not allowed lawyer','family not informed']}));

allLaws.push(E({id:'con-art-32',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 32',title:'Right to Constitutional Remedies (Writs)',
definition:'Right to move SC for enforcement of Part III rights. SC can issue habeas corpus, mandamus, prohibition, quo warranto, certiorari.',
simplifiedExplanation:'Ambedkar: "heart and soul of Constitution". Direct SC access for FR violations. Five writs available.',
punishment:'Not applicable. You can enforce fundamental rights.',
whoItAppliesTo:'Any person whose FRs are violated',
realWorldExample:'Amit illegally detained. Family filed Habeas Corpus under Article 32. SC ordered police to produce Amit.',
importantCases:[mkCase('Bandhua Mukti Morcha vs Union of India',1984,'SC','Relaxed locus standi � any public-spirited person can file PIL.','Expanded access via PIL.'),mkCase('ADM Jabalpur vs Shivkant Shukla',1976,'SC','Majority: Article 32 can be suspended. Justice Khanna dissented: right to life cannot be suspended.','Dissenting view vindicated by 44th Amendment.')],
loopholes:[mkLoop('Suspension During Emergency','Article 359 allows suspension of Article 32 during Emergency.','1975 Emergency saw Article 32 suspended.','44th Amendment protects Articles 20,21 from suspension.','Cite 44th Amendment and ADM Jabalpur dissent.')],
relatedSections:['con-art-14','con-art-19','con-art-21','con-art-226'],difficulty:'Beginner',isConstitutional:true,
tags:['fundamental rights','writs','PIL','UPSC important'],subCategory:'Fundamental Rights',enactedYear:1950,amendedYears:[1978],
courtLevel:['SC'],writ:{writName:'All Five Writs',writArticle:'Article 32',writDescription:'SC can issue all five writs.',writExample:'NGO files PIL for clean air under Article 21.'},
upscImportance:'Very High',upscTopics:['Polity','Fundamental Rights','Writs','Judiciary','PIL'],
aiSearchKeywords:['writ petition','PIL','habeas corpus','mandamus','certiorari','prohibition','quo warranto','Article 32','constitutional remedy'],
scenarioTags:['fundamental right violated','need to approach SC','government not doing duty','illegal detention','want to file PIL']}));

allLaws.push(E({id:'con-art-44',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 44',title:'Uniform Civil Code',
definition:'State shall endeavour to secure Uniform Civil Code for all citizens throughout India.',
simplifiedExplanation:'Government should create common personal laws for all citizens regardless of religion. Currently different laws for Hindus, Muslims, Christians, Parsis. Non-enforceable Directive Principle.',
punishment:'Not applicable � Directive Principle, not legally enforceable.',
whoItAppliesTo:'Directive to the State (government and legislature)',
realWorldExample:'Goa is only Indian state with UCC � Portuguese Civil Code 1867 applies to all Goans regardless of religion.',
importantCases:[mkCase('Shah Bano vs M.A. Khan',1985,'SC','Granted maintenance to 62-year-old Muslim woman. Called for UCC.','Reignited UCC debate.'),mkCase('Sarla Mudgal vs Union of India',1995,'SC','Hindu men converting to Islam for bigamy. Condemned and urged UCC.','Highlighted forum shopping in personal laws.')],
loopholes:[mkLoop('Non-Enforceable DPSP','Article 44 cannot be enforced by courts. Government has no legal obligation.','Governments avoid UCC citing political sensitivity.','Courts repeatedly directed government to consider UCC.','Invoke with Article 14 to argue inequality.')],
relatedSections:['con-art-14','con-art-25'],difficulty:'Intermediate',isConstitutional:true,
tags:['directive principles','UCC','UPSC important','controversial'],subCategory:'Directive Principles of State Policy',enactedYear:1950,
upscImportance:'Very High',upscTopics:['Polity','Directive Principles','Uniform Civil Code','Secularism','Personal Law'],
aiSearchKeywords:['uniform civil code','UCC','Article 44','personal law','common civil code'],
scenarioTags:['different marriage laws for different religions','inter-faith marriage complications','personal law inequality','triple talaq']}));

allLaws.push(E({id:'con-art-51a',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 51A',title:'Fundamental Duties',
definition:'Eleven duties: (a) abide by Constitution; (b) cherish ideals; (c) uphold sovereignty; (d) defend country; (e) promote harmony; (f) value culture; (g) protect environment; (h) scientific temper; (i) safeguard public property; (j) strive for excellence; (k) educate children 6-14.',
simplifiedExplanation:'11 moral obligations added by 42nd Amendment (1976). Not legally enforceable but used by courts for interpretation.',
punishment:'No direct punishment � non-justiciable.',
whoItAppliesTo:'All Indian citizens',
realWorldExample:'SC cited Article 51A(g) (duty to protect environment) to justify stricter pollution control standards for factories.',
importantCases:[mkCase('AIIMS Students Union vs AIIMS',2001,'SC','Fundamental Duties guide interpretation of ambiguous laws.','Duties as constitutional compass.')],
loopholes:[mkLoop('Non-Justiciability','Duties not enforceable. No mechanism for non-compliance.','Citizens ignore duties without consequence.','Parliament can enact laws giving effect to duties.','Use duties as interpretive tools with rights.')],
relatedSections:['con-art-14','con-art-21'],difficulty:'Beginner',isConstitutional:true,
tags:['fundamental duties','42nd amendment','UPSC important'],subCategory:'Fundamental Duties',enactedYear:1950,amendedYears:[1976,2002],
upscImportance:'High',upscTopics:['Polity','Fundamental Duties','42nd Amendment','Governance'],
aiSearchKeywords:['fundamental duties','citizen duties','national flag','national anthem','environment protection','scientific temper','Article 51A'],
scenarioTags:['not standing for national anthem','damaging public property','environmental pollution','disrespecting constitution']}));

allLaws.push(E({id:'con-art-72',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 72',title:'Presidential Pardon Power',
definition:'President can grant pardons, reprieves, respites, remissions, commute sentences for: (a) Court Martial; (b) Union law offences; (c) Death sentences.',
simplifiedExplanation:'President can pardon, reduce or commute sentences. Particularly important for death penalty cases. Governor under Article 161 cannot pardon death sentences.',
punishment:'Not applicable � constitutional mercy power.',
whoItAppliesTo:'President of India, for convicted persons',
realWorldExample:'Rajiv Gandhi assassination case: 4 death convicts\' mercy petitions pending for over a decade. President rejected; convicts executed in 2022.',
importantCases:[mkCase('Kehar Singh vs Union of India',1988,'SC','President must decide mercy petitions on merits. Court can review on limited grounds.','Judicial review limits on pardon.'),mkCase('Shatrughan Chauhan vs Union of India',2014,'SC','Delay over 2 years in mercy petition entitles commutation to life.','Delay as ground for commutation.')],
loopholes:[mkLoop('Inordinate Delay','No time limit for President to decide mercy petitions.','Government uses delay tactic � keeps petitions pending for years.','Delay exceeding 2 years entitles commutation per Shatrughan Chauhan.','File writ citing delay violates Article 21.')],
relatedSections:['con-art-161','bns-sec-101'],difficulty:'Intermediate',isConstitutional:true,
tags:['president','pardon','death penalty','mercy petition','UPSC important'],subCategory:'Executive Powers',enactedYear:1950,
upscImportance:'High',upscTopics:['Polity','President','Executive Powers','Death Penalty','Judiciary'],
aiSearchKeywords:['Article 72','presidential pardon','mercy petition','commutation of death sentence','clemency powers'],
scenarioTags:['presidential pardon needed','death sentence mercy petition','delay in mercy petition','commutation of sentence']}));

allLaws.push(E({id:'con-art-76',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 76',title:'Attorney-General for India',
definition:'President appoints a person qualified as SC judge to be Attorney-General. AG advises government on legal matters, has right of audience in all courts.',
simplifiedExplanation:'Highest law officer of India. Gives legal advice, represents government in courts, can speak in Parliament but cannot vote. Removable by President at any time.',
punishment:'Not applicable.',
whoItAppliesTo:'Attorney General, Government of India',
realWorldExample:'AG appears in SC representing Union of India on constitutional issues like Aadhaar validity, demonetization, Article 370 abrogation.',
importantCases:[mkCase('Union of India vs ADR',2002,'SC','AG argued for government on electoral reforms. Court directed candidates to disclose criminal antecedents.','Showed AG\'s role defending government policy.')],
loopholes:[mkLoop('Political Appointment','AG holds office during President\'s pleasure � political appointee.','AG may tailor opinions to suit government agenda.','AG should recuse if conflict. Office demands independence.','Independence depends on convention and personal integrity.')],
relatedSections:['con-art-105','con-art-165'],difficulty:'Intermediate',isConstitutional:true,
tags:['attorney general','law officer','UPSC important'],subCategory:'The Union Executive',enactedYear:1950,
upscImportance:'High',upscTopics:['Polity','Attorney General','Union Executive','Constitutional Offices'],
aiSearchKeywords:['Article 76','Attorney General','law officer','government legal advisor','Solicitor General','right of audience'],
scenarioTags:['government legal advice','AG representing India in court']}));

allLaws.push(E({id:'con-art-105',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 105',title:'Parliamentary Privileges',
definition:'(1) Freedom of speech in Parliament. (2) MPs not liable for anything said or voted in Parliament. (3) Other privileges defined by Parliament.',
simplifiedExplanation:'MPs have absolute privilege for speech in Parliament � cannot be sued for defamation. Does NOT extend to repeating outside Parliament.',
punishment:'Not applicable. Parliament can punish own members for breach of privilege.',
whoItAppliesTo:'Members of Parliament',
realWorldExample:'MP alleged corruption in Parliament. Minister threatened defamation. MP protected inside Parliament. When MP repeated at press conference, defamation applied.',
importantCases:[mkCase('K.A. Mathialagan vs P. Srinivasan',1973,'SC','Parliamentary privilege absolute for proceedings in House, not outside.','Distinguished privileged and non-privileged speech.')],
loopholes:[mkLoop('Abuse of Privilege','MPs make false allegations hiding behind absolute privilege. No remedy for harmed person.','False allegations inside Parliament for political gain.','File complaint with Speaker/Chairperson. MP can be asked to apologize.','Some courts suggest malicious false statements not covered.')],
relatedSections:['con-art-194','con-art-361'],difficulty:'Intermediate',isConstitutional:true,
tags:['parliament','privilege','freedom of speech in parliament','MP'],subCategory:'Parliament',enactedYear:1950,
upscImportance:'High',upscTopics:['Polity','Parliament','Legislature','Privileges of Parliament'],
aiSearchKeywords:['Article 105','parliamentary privilege','freedom of speech in Parliament','MP immunity','breach of privilege','legislative privilege'],
scenarioTags:['MP made allegations in Parliament','defamation case against MP','privilege issue in Parliament']}));
// ============= DETAILED CONSTITUTION ARTICLES (cont) =============
allLaws.push(E({id:'con-art-110',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 110',title:'Definition of Money Bills',
definition:'A Bill is a Money Bill if it contains only provisions dealing with: tax imposition/abolition/regulation, government borrowing, Consolidated Fund custody, appropriation, expenditure charged on Consolidated Fund.',
simplifiedExplanation:'Only Lok Sabha can introduce Money Bills. Rajya Sabha can only recommend changes within 14 days. Definition has been controversial — some bills passed as Money Bills to bypass Rajya Sabha.',
punishment:'Not applicable.',whoItAppliesTo:'Parliament',
realWorldExample:'Aadhaar Act was passed as Money Bill in Lok Sabha, bypassing Rajya Sabha. Challenged in SC — constitutional validity debated.',
importantCases:[mkCase('Raja Ram Pal vs Lok Sabha',2007,'SC','SC can review Money Bill certification by Speaker.','Judicial review of Money Bill certification.')],
loopholes:[mkLoop('Money Bill Bypass','Government passes non-Money Bills as Money Bills to avoid Rajya Sabha approval.','Aadhaar Act, Finance Acts passed as Money Bills.','Challenge certification as fraudulent if bill contains non-money matters.','SC can examine whether bill is genuinely Money Bill.')],
relatedSections:['con-art-109','con-art-111','con-art-117'],subCategory:'Parliament',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Money Bill','Article 110','Lok Sabha','Rajya Sabha bypass','Aadhaar Money Bill']}));

allLaws.push(E({id:'con-art-123',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 123',title:'Ordinance Power of President',
definition:'President can promulgate ordinances when Parliament is not in session if circumstances require immediate action. Same force as laws. Must be approved by Parliament within 6 weeks of reassembly.',
simplifiedExplanation:'President can make temporary laws (ordinances) when Parliament is not in session. Has same effect as Act of Parliament. Must be approved within 6 weeks. Can be withdrawn. Used extensively by governments.',
punishment:'Not applicable.',whoItAppliesTo:'President, Parliament',
realWorldExample:'Government promulgated 30+ ordinances during COVID-19 pandemic including amendments to labour laws. Opposition criticized excessive use of ordinance power.',
importantCases:[mkCase('D.C. Wadhwa vs State of Bihar',1987,'SC','Re-promulgation of ordinances without legislative approval is unconstitutional.','Limited ordinance power abuse.')],
loopholes:[mkLoop('Re-promulgation','Governments re-promulgate ordinances repeatedly to bypass legislature.','Bihar government re-promulgated 256 ordinances.','SC held re-promulgation without legislative approval is fraud on Constitution.','Cite D.C. Wadhwa — re-promulgation is unconstitutional.')],
relatedSections:['con-art-213','con-art-368'],subCategory:'Parliament',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['ordinance','Article 123','President ordinance','ordinance power','re-promulgation']}));

allLaws.push(E({id:'con-art-124',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 124',title:'Supreme Court Constitution',
definition:'Supreme Court shall consist of Chief Justice of India and 33 other judges until Parliament prescribes larger number. Judges appointed by President after consultation with CJI and other judges.',
simplifiedExplanation:'SC has CJI + 33 judges. Appointed through collegium system (CJI + 4 senior judges). Retirement age: 65. Impeachment by Parliament for misbehavior or incapacity.',
punishment:'Not applicable.',whoItAppliesTo:'Supreme Court judges, President, Parliament',
realWorldExample:'Justice K.M. Joseph\'s appointment as SC judge was delayed by government. SC held government must accept collegium recommendation if reiterated.',
importantCases:[mkCase('Supreme Court Advocates-on-Record vs Union of India',1993,'SC','Established collegium system for judicial appointments. CJI + 2 senior judges recommend appointments.','Collegium system creation.'),mkCase('NJA Case (2015)',2015,'SC','Struck down NJAC Act 2014 as violating basic structure — independence of judiciary.','Struck down NJAC.'),mkCase('Third Judges Case',1998,'SC','Expanded collegium to CJI + 4 senior judges.','Current collegium system.')],
loopholes:[mkLoop('Collegium Opacity','Collegium decisions lack transparency. No reasons given for appointments/rejections.','Government delays or rejects collegium recommendations.','Collegium must reiterate recommendation. If reiterated, government bound to appoint.','Memorandum of Procedure adds transparency.')],
relatedSections:['con-art-32','con-art-136','con-art-141','con-art-142','con-art-217'],subCategory:'Union Judiciary',enactedYear:1950,amendedYears:[2014],
upscImportance:'Very High',aiSearchKeywords:['Supreme Court','Article 124','collegium','CJI','judicial appointments','NJAC','Third Judges Case']}));

allLaws.push(E({id:'con-art-136',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 136',title:'Special Leave Petition (SLP)',
definition:'SC may grant special leave to appeal from any judgment, decree, determination, sentence or order of any court or tribunal in India.',
simplifiedExplanation:'SC\'s discretionary power to hear appeals from any court/tribunal. NOT a right — purely discretionary. Used for important constitutional/legal questions. Can be against HC, tribunals, military courts.',
punishment:'Not applicable.',whoItAppliesTo:'Any party aggrieved by court/tribunal decision',
realWorldExample:'After losing in HC, a party can file SLP in SC. SC may refuse SLP without giving reasons. If granted, SC hears full appeal.',
importantCases:[mkCase('Pritam Singh vs State of UP',1950,'SC','SLP should be granted only if substantial question of law or grave injustice.','Guidelines for SLP grant.')],
loopholes:[mkLoop('Discretionary Refusal','SC can refuse SLP without reasons. Creates uncertainty.','SC refuses most SLPs (90%+). No remedy against refusal.','No solution — purely discretionary.','Evolves through practice directions.')],
relatedSections:['con-art-132','con-art-133','con-art-134'],subCategory:'Union Judiciary',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Special Leave Petition','SLP','Article 136','appeal to SC','SC discretionary appeal']}));

allLaws.push(E({id:'con-art-141',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 141',title:'Law Declared by SC is Binding',
definition:'Law declared by the Supreme Court shall be binding on all courts within the territory of India.',
simplifiedExplanation:'SC decisions are binding precedent on ALL courts in India — Supreme Court, High Courts, subordinate courts. Doctrine of stare decisis. Only SC can overrule its own decisions.',
punishment:'Not applicable.',whoItAppliesTo:'All courts in India',
realWorldExample:'SC held privacy is fundamental right in Puttaswamy (2017). All HCs and lower courts must follow this in privacy-related cases.',
importantCases:[mkCase('CIT vs Sun Engineering Works',1992,'SC','Only ratio decidendi (reason for decision) is binding, not obiter dicta (incidental remarks).','Distinguished obiter from ratio.')],
loopholes:[mkLoop('Obiter vs Ratio','Only ratio decidendi is binding. Obiter dicta is not. Difficult to distinguish sometimes.','Parties argue SC observations were obiter, not binding.','Court examines if observation was necessary for the decision (ratio) or incidental (obiter).','Only the core reasoning is binding.')],
relatedSections:['con-art-32','con-art-136','con-art-142'],subCategory:'Union Judiciary',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Article 141','binding precedent','stare decisis','ratio decidendi','obiter dicta','law declared by SC']}));

allLaws.push(E({id:'con-art-142',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 142',title:'SC Power to Do Complete Justice',
definition:'SC in exercise of its jurisdiction may pass such decree or make such order as is necessary for doing complete justice in any cause or matter pending before it.',
simplifiedExplanation:'SC can pass ANY order to ensure complete justice — even beyond statutory law. Used in high-profile cases to fill legal gaps, grant reliefs Parliament hasn\'t provided.',
punishment:'Not applicable.',whoItAppliesTo:'Supreme Court',
realWorldExample:'SC used Article 142 to dissolve a marriage where it was irretrievably broken, even though irretrievable breakdown was not a statutory ground for divorce under Hindu Marriage Act.',
importantCases:[mkCase('Union Carbide vs Union of India (Bhopal)',1991,'SC','Used Article 142 to settle Bhopal gas tragedy claims. SC can override statutory law for complete justice.','Complete justice power vs statutory law.')],
loopholes:[mkLoop('Overriding Statutory Law','Article 142 cannot override statutory law per SC but boundary is unclear.','SC sometimes overrides clear statutory provisions citing "complete justice".','SC must exercise power within constitutional framework. Cannot override fundamental rights.','Judicial restraint required — otherwise becomes super-legislature.')],
relatedSections:['con-art-32','con-art-136','con-art-141'],subCategory:'Union Judiciary',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Article 142','complete justice','SC power','equity','Bhopal gas case','Supreme Court extraordinary power']}));

allLaws.push(E({id:'con-art-226',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 226',title:'Power of High Courts to Issue Writs',
definition:'Every High Court shall have power throughout its jurisdiction to issue to any person or authority directions, orders or writs including habeas corpus, mandamus, prohibition, certiorari, quo warranto for enforcement of Part III rights and for any other purpose.',
simplifiedExplanation:'HC can issue 5 writs for both fundamental rights AND other legal rights. Wider than Article 32 which only covers FRs. Most powerful remedy available to citizens.',
punishment:'Not applicable.',whoItAppliesTo:'Any person approaching High Court for violation of rights',
realWorldExample:'Police refused to register a complaint. Victim filed Mandamus in HC directing police to register FIR. HC ordered police to register it.',
importantCases:[mkCase('T.C. Basappa vs T. Nagappa',1954,'SC','HC writ jurisdiction is plenary. HC can issue writs even when alternative remedy exists.','HC writ power vs alternative remedy.')],
loopholes:[mkLoop('Alternative Remedy Bar','Courts often refuse writ if alternative remedy (appeal, revision) available. But discretion.','Government argues alternative remedy exists.','Show alternative remedy is inadequate, not efficacious, or causes delay.','SC: alternative remedy not absolute bar to writ.')],
relatedSections:['con-art-32','con-art-227'],subCategory:'State Judiciary',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Article 226','High Court writ','HC power','writs','mandamus','certiorari','habeas corpus','HC jurisdiction']}));

allLaws.push(E({id:'con-art-300a',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 300A',title:'Right to Property',
definition:'No person shall be deprived of his property save by authority of law.',
simplifiedExplanation:'Right to property is no longer fundamental right (repealed by 44th Amendment 1978). Now constitutional right under Article 300A. Government can acquire property but must follow legal procedure and provide compensation.',
punishment:'Not applicable.',whoItAppliesTo:'All persons',
realWorldExample:'Government acquired farmers\' land for highway project without adequate compensation. Farmers challenged under Article 300A. Court held compensation must be fair and reasonable.',
importantCases:[mkCase('K.T. Plantation vs State of Karnataka',2011,'SC','Article 300A right to property is constitutional right. Acquisition must be by law with compensation.','Compensation mandatory.')],
loopholes:[mkLoop('Compensation Amount','"Adequate compensation" is undefined. Government determines amount unilaterally.','Government offers minimal compensation.','Land Acquisition Act 2013 provides compensation at market rate + 100% solatium.','Challenge under Article 300A if compensation illusory.')],
relatedSections:['con-art-31'],subCategory:'Finance, Property, Contracts',enactedYear:1978,upscImportance:'Very High',
aiSearchKeywords:['right to property','Article 300A','land acquisition','property rights','eminent domain','compensation']}));

allLaws.push(E({id:'con-art-265',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 265',title:'No Tax Without Law',
definition:'No tax shall be levied or collected except by authority of law.',
simplifiedExplanation:'Government cannot impose ANY tax without a valid law enacted by Parliament or State Legislature. Every tax must have legislative sanction. This is the foundation of "no taxation without representation".',
punishment:'Not applicable.',whoItAppliesTo:'Government, all taxpayers',
realWorldExample:'Municipal corporation levied a new garbage collection fee without any municipal law authorizing it. Citizens challenged under Article 265. Court struck it down.',
importantCases:[mkCase('J.K. Synthetics vs CIT',1993,'SC','Tax must be imposed by clear statutory language. No implied taxation.','Tax statutes strictly construed.')],
loopholes:[mkLoop('Circulars and Notifications','Government issues circulars/notifications creating de facto taxes without legislation.','Executive orders impose new "fees" or "charges" that are actually taxes.','Fee must have quid pro quo (service in return). If no service, it is tax requiring law.','Test: is it a fee with service or tax without service?')],
relatedSections:['con-art-246','con-art-266'],subCategory:'Finance, Property, Contracts',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Article 265','no tax without law','taxation','tax authority of law','illegal tax','tax v fee']}));

allLaws.push(E({id:'con-art-280',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 280',title:'Finance Commission',
definition:'President shall constitute a Finance Commission within 2 years of commencement and thereafter every 5 years. Commission recommends distribution of tax revenues between Centre and States.',
simplifiedExplanation:'Finance Commission is constituted every 5 years to recommend how tax money is shared between Centre and States. Chairperson + 4 members. Recommendations binding? Mostly followed.',
punishment:'Not applicable.',whoItAppliesTo:'Centre, States, Finance Commission',
realWorldExample:'15th Finance Commission (2021-26) recommended states\' share of central taxes at 41%. This determines how much money states get from central tax pool.',
importantCases:[mkCase('Bimal Jalan vs Union of India',2000,'SC','Finance Commission recommendations have force of law when accepted by Presidential Order.','Legal force of recommendations.')],
loopholes:[mkLoop('Non-Binding Recommendations','Finance Commission recommendations are not legally binding. Government can deviate.','Centre does not fully implement FC recommendations.','Political pressure and convention ensure mostly followed. No legal remedy.','Public opinion and state pressure.')],
relatedSections:['con-art-270','con-art-275'],subCategory:'Finance, Property, Contracts',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Finance Commission','Article 280','tax distribution','Centre-State finance','fiscal federalism','15th Finance Commission']}));

allLaws.push(E({id:'con-art-324',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 324',title:'Election Commission',
definition:'Superintendence, direction and control of all elections to Parliament, state legislatures, President and Vice-President shall be vested in an Election Commission consisting of Chief Election Commissioner and such Election Commissioners as President may fix.',
simplifiedExplanation:'Election Commission supervises ALL elections in India. CEC + Election Commissioners. Independent constitutional body. Can issue Model Code of Conduct, conduct elections, register political parties.',
punishment:'Not applicable.',whoItAppliesTo:'Election Commission, all voters, political parties',
realWorldExample:'EC announced dates for 2024 Lok Sabha elections. Enforced Model Code of Conduct against parties violating rules. Ordered repoll in booths where irregularities found.',
importantCases:[mkCase('Election Commission vs Saka Venkata Rao',1953,'SC','EC has power to order repoll, postpone elections, and take all necessary actions for free and fair elections.','EC powers defined.')],
loopholes:[mkLoop('CEC Appointment','CEC appointed by President on government advice. No independent selection committee.','Government appoints partisan CEC.','2018 SC directed selection by PM, CJI, LoP committee. Awaiting legislation.','Pending reform.')],
relatedSections:['con-art-325','con-art-326','con-art-327',],subCategory:'Elections',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Election Commission','Article 324','CEC','elections','Model Code of Conduct','free and fair elections','voter rights']}));

allLaws.push(E({id:'con-art-352',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 352',title:'National Emergency',
definition:'President can proclaim National Emergency if security of India or any part is threatened by war, external aggression or armed rebellion.',
simplifiedExplanation:'Emergency on war, aggression, armed rebellion. Post-44th Amendment: requires Cabinet advice, parliamentary approval within 1 month (special majority), judicially reviewable. Declared 3 times: 1962, 1971, 1975.',
punishment:'Not applicable.',whoItAppliesTo:'Entire India',
realWorldExample:'1975 Emergency: PM Indira Gandhi advised Emergency citing "internal disturbance". FRs suspended, press censored, opposition jailed for 21 months. Led to 44th Amendment.',
importantCases:[mkCase('Minerva Mills vs Union of India',1980,'SC','Struck down parts of 42nd Amendment that limited judicial review during Emergency. Basic structure protected.','Basic structure reinforced.')],
loopholes:[mkLoop('Subjective Satisfaction','President satisfaction means Cabinet advice.','1975 Emergency was politically motivated.','44th Amendment: written Cabinet advice required, "armed rebellion" replaces "internal disturbance", judicial review.','Challenge on mala fides.')],
relatedSections:['con-art-356','con-art-360','con-art-359'],subCategory:'Emergency Provisions',enactedYear:1950,amendedYears:[1978],upscImportance:'Very High',
aiSearchKeywords:['national emergency','Article 352','war','armed rebellion','1975 emergency','suspension of rights','44th amendment'],
scenarioTags:['war situation','national security threat','suspension of fundamental rights']}));

allLaws.push(E({id:'con-art-356',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 356',title:'President Rule (State Emergency)',
definition:'If President satisfied state cannot be governed constitutionally, may assume state functions, dissolve or suspend state assembly.',
simplifiedExplanation:'President Rule when state government fails. Misused 100+ times for political purposes. S.R. Bommai (1994) severely restricted misuse — floor test required, judicial review available.',
punishment:'Not applicable.',whoItAppliesTo:'Individual states',
realWorldExample:'After 1977 Emergency, Janata Party dismissed 9 Congress state governments. SR Bommai case stopped this pattern.',
importantCases:[mkCase('S.R. Bommai vs Union of India',1994,'SC','President satisfaction based on relevant material required. Floor test before dismissal. Judicial review available.','Ended political misuse of Article 356.')],
loopholes:[mkLoop('Governor Report','Governor (central appointee) sends biased report against opposition government.','Governors create pretext for President Rule.','Post-Bommai: Governor report not conclusive. Floor test mandatory.','Challenge factual basis and demand floor test.')],
relatedSections:['con-art-352','con-art-360'],subCategory:'Emergency Provisions',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['President Rule','Article 356','state emergency','Governor report','floor test','S.R. Bommai','federalism'],
scenarioTags:['state government dismissed','governor recommending President Rule','political crisis in state']}));

allLaws.push(E({id:'con-art-368',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 368',title:'Power to Amend the Constitution',
definition:'Parliament may amend the Constitution by way of addition, variation or repeal of any provision following the procedure laid down.',
simplifiedExplanation:'Parliament can amend Constitution by special majority (majority of total membership + 2/3 of members present/voting). Some amendments need ratification by half the states. Basic structure cannot be altered.',
punishment:'Not applicable.',whoItAppliesTo:'Parliament',
realWorldExample:'101st Amendment (GST) required both special majority in Parliament and ratification by more than half states as it affected Centre-State tax distribution.',
importantCases:[mkCase('Kesavananda Bharati vs State of Kerala',1973,'SC','13-judge bench: Parliament cannot alter basic structure of Constitution. Basic structure includes supremacy of Constitution, republic, secularism, federalism, separation of powers.','Basic Structure Doctrine.')],
loopholes:[mkLoop('Undefined Basic Structure','No exhaustive list of basic structure features. Judge-made.','Parliament pushes boundaries arguing feature not part of basic structure.','Several features consistently recognized: judicial review, federalism, secularism, separation of powers.','Argue from accumulated precedent.')],
relatedSections:['con-art-14','con-art-352'],subCategory:'Amendment Process',enactedYear:1950,amendedYears:[1971],upscImportance:'Very High',
aiSearchKeywords:['constitutional amendment','Article 368','basic structure','Kesavananda Bharati','special majority','amendment procedure'],
scenarioTags:['changing the constitution','basic structure violated','amendment challenged in court']}));

allLaws.push(E({id:'con-art-370',lawName:'Constitution of India',shortName:'Constitution',category:'constitutional',
sectionNumber:'Article 370',title:'Special Status for Jammu and Kashmir (Abrogated)',
definition:'Temporary provisions with respect to Jammu and Kashmir. Limited Parliament\'s power to make laws for J&K. Abrogated on August 5, 2019 by Presidential Order CO 272 and Parliament resolution.',
simplifiedExplanation:'Article 370 gave special autonomous status to J&K: separate constitution, dual citizenship, restricted property rights for outsiders. Abrogated in 2019, J&K reorganized into two Union Territories.',
punishment:'Not applicable.',whoItAppliesTo:'Jammu and Kashmir',
realWorldExample:'On August 5, 2019, Home Minister Amit Shah announced abrogation of Article 370 in Rajya Sabha. J&K placed under direct central rule. Extensive security measures imposed.',
importantCases:[mkCase('Sampat Prakash vs State of J&K',1968,'SC','Article 370 has become permanent feature. Cannot be abrogated except with J&K Constituent Assembly consent.','Later overridden by 2019 action.')],
loopholes:[mkLoop('Abrogation Legality','Whether abrogation via Governor (acting on President order) was valid when state was under President Rule is debated.','Challenged in SC that abrogation requires J&K Constituent Assembly consent.','Multiple petitions pending in SC. Final decision awaited.','Constitutional challenge ongoing.')],
relatedSections:['con-art-368','con-art-356'],subCategory:'Temporary Provisions',enactedYear:1950,upscImportance:'Very High',
aiSearchKeywords:['Article 370','Jammu and Kashmir','abrogation','special status','370 abrogated','August 5 2019','J&K reorganization'],
scenarioTags:['Article 370 abrogation','Jammu and Kashmir special status','J&K reorganization','370 debate']}));
// ============= BNSS 2023 — KEY PROCEDURAL SECTIONS =============
allLaws.push(E({id:'bnss-sec-35',lawName:'Bharatiya Nagarik Suraksha Sanhita 2023',shortName:'BNSS',category:'procedural',
sectionNumber:'Section 35',title:'FIR — Information in Cognizable Cases (Zero FIR)',
definition:'Every information relating to cognizable offence given orally shall be reduced to writing, read to informant, signed, and entered in prescribed book. Copy given free of cost. Can be filed at any police station (Zero FIR).',
simplifiedExplanation:'Police MUST register FIR for cognizable offences. Zero FIR allows filing at ANY police station, not just jurisdictional one. FIR can be filed electronically. If police refuse, complain to SP or Magistrate under Section 175 BNSS.',
punishment:'Police refusal leads to departmental action. Police Act Section 170 for dereliction.',
whoItAppliesTo:'Any person reporting cognizable offence',
realWorldExample:'Rekha robbed at bus stop in South Delhi. Nearest police station refused saying crime happened elsewhere. She insisted on Zero FIR — police legally obligated to register and transfer.',
importantCases:[mkCase('Lalita Kumari vs Govt of UP',2014,'SC','FIR registration is MANDATORY for cognizable offences. Police have NO discretion to refuse. Preliminary inquiry only in exceptional cases.','Settled FIR debate.')],
loopholes:[mkLoop('Police Refusal','Despite mandate, police still refuse FIRs, especially against influential persons.','Police tell complainants to settle matter, come later, or register Daily Diary.','Approach Magistrate under Section 175 BNSS. Complain to SP/Commissioner. Online complaint.','Show evidence of approaching police station and their refusal.')],
relatedSections:['bnss-sec-36','bnss-sec-175'],difficulty:'Beginner',tags:['FIR','police','zero FIR','UPSC important','know your rights'],
subCategory:'Investigation Procedure',enactedYear:2023,
courtLevel:['SC','HC','Magistrate Court'],petitionTypes:['Writ Petition','Criminal Revision'],
writ:{writName:'Mandamus',writArticle:'Article 226',writDescription:'If police refuse FIR, Mandamus can be filed in HC directing police to register FIR.',writExample:'Victim approaches HC when local police refuse to file FIR.'},
upscImportance:'Very High',upscTopics:['Criminal Procedure','BNSS','FIR','Police Reforms','Governance'],
aiSearchKeywords:['FIR','First Information Report','Section 35 BNSS','Section 154 CrPC','zero FIR','police complaint','cognizable offence','police refusing FIR'],
scenarioTags:['police refusing to file FIR','want to file complaint','crime happened in different area','zero FIR','police not registering case']}));

allLaws.push(E({id:'bnss-sec-479',lawName:'Bharatiya Nagarik Suraksha Sanhita 2023',shortName:'BNSS',category:'procedural',
sectionNumber:'Section 479',title:'Bail Provisions — Undertrial Release',
definition:'Person accused of non-bailable offence may be released on bail. If undertrial has served HALF the maximum imprisonment period, bail must be granted (except for death penalty offences).',
simplifiedExplanation:'Bail is rule, jail is exception. BNSS introduces safeguard: if undertrial served half maximum sentence, mandatory bail (except death penalty cases). Reduces undertrial population.',
punishment:'Not applicable — bail procedure.',whoItAppliesTo:'Any accused person in custody',
realWorldExample:'Ramesh arrested for minor theft (max 3 years). Couldn\'t afford lawyer, remained in jail 2 years. Under Section 479, since he served more than half maximum sentence, court obligated to release.',
importantCases:[mkCase('Satender Kumar Antil vs CBI',2022,'SC','Bail is rule, jail exception. Directed use of Section 479 (then 436A CrPC) to release undertrials served half sentence.','Systematic bail guidelines.')],
loopholes:[mkLoop('Death Penalty Exception','Mandatory bail does not apply to death-eligible offences.','Prosecution argues death-eligible charges even if unlikely to prevent bail.','Argue bail on merits. If prosecution case weak, bail granted regardless of penalty.','File bail citing delay, weak case, bail is rule principle.')],
relatedSections:['bnss-sec-478','bnss-sec-480'],difficulty:'Intermediate',tags:['bail','undertrial','rights of accused','UPSC important','know your rights'],
subCategory:'Bail Provisions',enactedYear:2023,
upscImportance:'Very High',upscTopics:['Criminal Procedure','BNSS','Bail','Prison Reforms','Rights of Accused'],
aiSearchKeywords:['bail','Section 479 BNSS','Section 436A CrPC','undertrial','default bail','bail is rule jail exception','non-bailable offence','bail application'],
scenarioTags:['arrested and need bail','in jail as undertrial','bail denied','served half sentence','want to apply for bail']}));

allLaws.push(E({id:'bnss-sec-187',lawName:'Bharatiya Nagarik Suraksha Sanhita 2023',shortName:'BNSS',category:'procedural',
sectionNumber:'Section 187',title:'Arrest Procedure and Safeguards',
definition:'Arrest requires actual touching/confining body unless submitted. No woman arrest after sunset/sunrise except exceptional circumstances. Woman arrested by woman officer. Must inform grounds immediately.',
simplifiedExplanation:'Rights when arrested: (1) told why arrested, (2) no woman arrest at night, (3) inform person of choice, (4) magistrate within 24 hrs, (5) consult lawyer, (6) handcuffs only if habitual offender. Arrest memo mandatory.',
punishment:'Police violating arrest procedures face disciplinary action and contempt.',
whoItAppliesTo:'Police making arrests, persons being arrested',
realWorldExample:'Deepak arrested from office by plainclothes officers without warrant. Family didn\'t know for 36 hrs. Lawyer filed habeas corpus. Court reprimanded police for violating D.K. Basu guidelines.',
importantCases:[mkCase('D.K. Basu vs State of WB',1997,'SC','11 mandatory arrest requirements: memo, family info, medical exam, lawyer, no torture, no handcuff, magistrate within 24 hrs.','Most important arrest rights judgment.')],
loopholes:[mkLoop('Custodial Violence','Despite D.K. Basu, custodial torture remains common. CCTV not universal.','Police use informal detention ("just for questioning") to avoid formal arrest.','Insist on arrest memo and immediate lawyer access. If tortured, file NHRC complaint.','Document injuries, file habeas corpus.')],
relatedSections:['bnss-sec-35','bnss-sec-479'],difficulty:'Beginner',tags:['arrest','police','rights of accused','UPSC important','know your rights'],
subCategory:'Arrest Procedure',enactedYear:2023,
writ:{writName:'Habeas Corpus',writArticle:'Article 226 and 32',writDescription:'If illegally arrested, HC can be filed to produce detained person.',writExample:'Family files HC when person not produced before magistrate within 24 hrs.'},
upscImportance:'Very High',upscTopics:['Criminal Procedure','BNSS','Arrest Rights','Human Rights','D.K. Basu Guidelines'],
aiSearchKeywords:['arrest procedure','Section 187 BNSS','arrest rights','D.K. Basu guidelines','24 hours magistrate','arrest memo','rights when arrested','woman arrest rules'],
scenarioTags:['arrested without reason given','not produced before magistrate','arrested at night','police torture after arrest','family not informed']}));

// ============= BSA 2023 — EVIDENCE =============
allLaws.push(E({id:'bsa-sec-39',lawName:'Bharatiya Sakshya Adhiniyam 2023',shortName:'BSA',category:'evidence',
sectionNumber:'Section 39',title:'Electronic Records as Evidence',
definition:'Any information in electronic record printed on paper, stored in optical/magnetic media or semiconductor memory produced by computer or communication device shall be admissible as document without further proof of original.',
simplifiedExplanation:'Digital evidence — emails, WhatsApp, CCTV, GPS, call records — admissible. Certificate under Section 39(2) needed. Simplified procedure for electronic evidence admission.',
punishment:'Not applicable — evidence rule.',whoItAppliesTo:'All parties in legal proceedings',
realWorldExample:'In dowry case, wife produced WhatsApp messages demanding Rs 10 lakhs. Court admitted after verifying through phone IMEI records, WhatsApp server data, and forensic lab certificate.',
importantCases:[mkCase('Anvar P.V. vs P.K. Basheer',2014,'SC','Electronic evidence MUST be certified under Section 65B (now Section 39 BSA) to be admissible. Oral evidence insufficient.','Certificate mandatory for electronic evidence.'),mkCase('Arjun Panditrao Khotkar vs Kailash Kushanrao Gorantyal',2020,'SC','Certificate must be furnished when electronic evidence produced. Court can condone delay.','Settled timing of certificate.')],
loopholes:[mkLoop('Tampering and Fabrication','Electronic evidence easily tampered. Screenshots manipulated, metadata altered.','Parties produce fabricated screenshots, edited recordings.','Insist on forensic examination, hash value verification, server-side records.','Challenge evidence by demanding original device and service provider records.')],
relatedSections:['bsa-sec-57','bsa-sec-58'],difficulty:'Intermediate',tags:['electronic evidence','digital','WhatsApp','CCTV'],
subCategory:'Documentary Evidence',enactedYear:2023,
upscImportance:'High',upscTopics:['Evidence Law','BSA','Digital Evidence','Cybercrime','Technology and Law'],
aiSearchKeywords:['electronic evidence','digital evidence','Section 39 BSA','Section 65B','WhatsApp evidence','CCTV footage court','email as evidence','65B certificate'],
scenarioTags:['WhatsApp messages as evidence','CCTV footage needed in court','email proof of fraud','digital evidence tampering','social media as evidence']}));

allLaws.push(E({id:'bsa-sec-23',lawName:'Bharatiya Sakshya Adhiniyam 2023',shortName:'BSA',category:'evidence',
sectionNumber:'Section 23',title:'Confession to Police Not Admissible',
definition:'No confession made to police officer shall be proved against accused. No confession while in police custody unless made in immediate presence of Magistrate.',
simplifiedExplanation:'Confession to police CANNOT be used in court. Protects against police torture. Confession must be before Magistrate. Exception: fact discovered from confession (Section 27) is admissible.',
punishment:'Not applicable — evidence rule.',whoItAppliesTo:'All accused persons in criminal cases',
realWorldExample:'Karim "confessed" after 48 hours without sleep. Court excluded confession under Section 23 — made to police, not magistrate.',
importantCases:[mkCase('Nandini Satpathy vs P.L. Dani',1978,'SC','Right against self-incrimination extends to police interrogation. Right to remain silent.','Extended self-incrimination protection.')],
loopholes:[mkLoop('Section 27 Exception (Discovery)','If accused statement leads to discovery of fact (e.g., "I buried knife under tree"), that portion admissible.','Police fabricate discoveries — plant evidence and claim accused led to it.','Independent witnesses (panchas) during recovery, videography, proper forensic handling.','Challenge discovery by showing police already knew independently.')],
relatedSections:['bsa-sec-24','bsa-sec-25'],difficulty:'Intermediate',tags:['confession','police','rights of accused','self-incrimination','UPSC important'],
subCategory:'Confessions',enactedYear:2023,upscImportance:'High',
upscTopics:['Evidence Law','BSA','Rights of Accused','Police Reforms','Human Rights'],
aiSearchKeywords:['confession','police confession','Section 23 BSA','Section 25 Evidence Act','self-incrimination','right to silence','custodial confession'],
scenarioTags:['confessed to police under pressure','forced confession','police tortured to confess','right to remain silent','confession before magistrate']}));

// ============= CPC 1908 — KEY SECTIONS =============
allLaws.push(E({id:'cpc-sec-9',lawName:'Code of Civil Procedure 1908',shortName:'CPC',category:'civil',
sectionNumber:'Section 9',title:'Courts to Try All Civil Suits',
definition:'Courts shall have jurisdiction to try all suits of a civil nature excepting suits of which their cognizance is either expressly or impliedly barred.',
simplifiedExplanation:'Civil courts have jurisdiction over ALL civil disputes unless specific law bars it. This is the foundational provision for civil litigation. If jurisdiction is barred, bar must be explicit.',
punishment:'Not applicable — civil procedure.',whoItAppliesTo:'All civil courts, parties to civil disputes',
realWorldExample:'Property dispute between two families. One party argued civil court cannot hear because it involves caste issue. Court held civil suits maintainable unless expressly barred.',
importantCases:[mkCase('Dhulabhai vs State of MP',1968,'SC','Ouster of civil court jurisdiction must be explicitly expressed or clearly implied. Civil courts jurisdiction is plenary.','Presumption favors civil court jurisdiction.')],
loopholes:[mkLoop('Implied Bar','Determining if jurisdiction is "impliedly barred" is subjective.','Defendants argue implied bar to avoid civil suit.','Ouster must be clear and unambiguous. If in doubt, civil court has jurisdiction.','Apply Dhulabhai test: exclusion must be explicitly or clearly implied.')],
relatedSections:['cpc-sec-10','cpc-sec-15'],difficulty:'Beginner',tags:['CPC','civil suit','jurisdiction','civil procedure'],
subCategory:'Jurisdiction of Courts',enactedYear:1908,upscImportance:'High',
upscTopics:['Civil Procedure','CPC','Jurisdiction','Legal Framework'],
aiSearchKeywords:['Section 9 CPC','civil suit jurisdiction','civil court','ouster of jurisdiction','suit of civil nature'],
scenarioTags:['want to file civil suit','court refused to hear case','jurisdiction dispute']}));

allLaws.push(E({id:'cpc-ord1',lawName:'Code of Civil Procedure 1908',shortName:'CPC',category:'civil',
sectionNumber:'Order I Rule 1',title:'Who May Be Joined as Plaintiffs',
definition:'All persons may be joined in one suit as plaintiffs where: (a) any right to relief in respect of or arising out of the same act or transaction; and (b) if such persons brought separate suits, any common question of law or fact would arise.',
simplifiedExplanation:'Multiple persons can file a single suit if their claims arise from the same transaction and common questions would arise. Prevents multiplicity of litigation.',
punishment:'Not applicable — procedural rule.',whoItAppliesTo:'All civil litigants',
realWorldExample:'50 flat buyers in same building defect case can join as co-plaintiffs in single suit against builder.',
importantCases:[mkCase('Bollya vs State of Karnataka',2006,'SC','Liberal approach to joinder of parties. If common question arises, joinder should be permitted.','Liberal joinder approach.')],
loopholes:[mkLoop('Misjoinder of Parties','Joining too many parties with different claims can complicate trial.','Plaintiffs join unrelated parties to increase pressure on defendant.','Court can order separate trials or strike out parties not necessary for adjudication.','Apply for separation of trials.')],
relatedSections:['cpc-ord1-r3','cpc-ord1-r8'],difficulty:'Beginner',tags:['CPC','joinder of parties','civil procedure','Orders'],
subCategory:'Joinder of Parties (Order I)',enactedYear:1908,upscImportance:'Medium',
aiSearchKeywords:['Order 1 Rule 1 CPC','joinder of plaintiffs','parties to suit','same transaction','common question','class action']}));

allLaws.push(E({id:'cpc-ord39',lawName:'Code of Civil Procedure 1908',shortName:'CPC',category:'civil',
sectionNumber:'Order XXXIX',title:'Temporary Injunctions',
definition:'Court may grant temporary injunction to restrain a party from doing a particular act or to compel performance of an act until disposal of suit. Conditions: prima facie case, balance of convenience, irreparable injury.',
simplifiedExplanation:'Temporary injunction is emergency relief to prevent harm during pendency of suit. Three conditions: (1) prima facie case, (2) balance of convenience in favor of applicant, (3) irreparable injury if injunction not granted.',
punishment:'Violation of injunction = civil contempt, arrest, detention, attachment of property.',
whoItAppliesTo:'Parties in civil suits seeking interim protection',
realWorldExample:'Builder started construction blocking neighbour\'s light and air. Neighbour filed suit and sought temporary injunction. Court granted injunction stopping construction until final hearing.',
importantCases:[mkCase('Wander Ltd vs Antox India P Ltd',1990,'SC','Balance of convenience must favor injunction. Court should not grant injunction if damages are adequate remedy.','Guidelines for temporary injunctions.')],
loopholes:[mkLoop('Ex-parte Injunction Abuse','Courts grant ex-parte injunctions without hearing other side. Used to harass opponents.','Parties obtain ex-parte injunctions on false prima facie case to pressure opponents.','Ex-parte injunction valid for limited period. Must hear other side before extending.','Vacate by showing no prima facie case or balance of convenience.')],
relatedSections:['cpc-ord39-r1','cpc-ord39-r2'],difficulty:'Intermediate',tags:['CPC','injunction','interim relief','civil procedure'],
subCategory:'Injunctions (Order XXXIX)',enactedYear:1908,upscImportance:'High',
upscTopics:['Civil Procedure','CPC','Injunctions','Interim Orders'],
aiSearchKeywords:['Order 39 CPC','temporary injunction','prima facie case','balance of convenience','irreparable injury','ex parte injunction','interim relief','stay order'],
scenarioTags:['need urgent court order to stop harm','construction blocking property','property dispute urgent relief','harassment by ex parte injunction']}));

// ============= CONSTITUTIONAL WRITS =============
allLaws.push(E({id:'writ-habeas-corpus',lawName:'Constitution of India',shortName:'Constitution',category:'writs',
sectionNumber:'Habeas Corpus',title:'Habeas Corpus — Produce the Body',
definition:'"You shall have the body." A writ to produce a person who has been detained before the court and to release if detention is illegal. Available under Articles 32 and 226.',
simplifiedExplanation:'Most powerful writ for personal liberty. If someone is illegally detained, the court orders their production and release. Can be filed by victim, family, or friend. Procedure: file petition, court issues notice, police produce person, court examines legality, orders release if illegal.',
punishment:'Not applicable — constitutional remedy.',whoItAppliesTo:'Any person illegally detained',
realWorldExample:'Son taken by police for questioning and not returned for 72 hours. Family filed Habeas Corpus in HC. Court issued notice, police produced son. Court found detention illegal, ordered immediate release. Compensation awarded.',
importantCases:[mkCase('ADM Jabalpur vs Shivkant Shukla',1976,'SC','During Emergency, majority held HC cannot hear HC petitions. Justice Khanna dissented.','Dissenting view later upheld by 44th Amendment.'),mkCase('Rudal Shah vs State of Bihar',1983,'SC','Landmark case awarding compensation for illegal detention under Article 21 through HC petition.','Compensation for illegal detention established.')],
loopholes:[mkLoop('Preventive Detention Exception','HC is not available if detention is under preventive detention laws (UAPA, NSA) but court examines procedural compliance.','Government argues HC not available against preventive detention order.','Court examines if procedural safeguards were followed — grounds communicated, review board.','Challenge procedure, not the order\'s wisdom.')],
relatedSections:['con-art-21','con-art-22','con-art-226'],difficulty:'Beginner',tags:['writ','habeas corpus','detention','personal liberty','UPSC important'],
subCategory:'Constitutional Writs',enactedYear:1950,upscImportance:'Very High',
upscTopics:['Polity','Writs','Habeas Corpus','Fundamental Rights','Judiciary'],
aiSearchKeywords:['habeas corpus','writ of habeas corpus','illegal detention','produce the body','Article 32 Habeas Corpus','Article 226 Habeas Corpus','personal liberty'],
scenarioTags:['someone illegally detained','police took person without information','family member missing after police custody','illegal confinement']}));

allLaws.push(E({id:'writ-mandamus',lawName:'Constitution of India',shortName:'Constitution',category:'writs',
sectionNumber:'Mandamus',title:'Mandamus — We Command',
definition:'A writ issued by court commanding a public authority to perform a public duty imposed by law. Available when authority fails to act and there is no other adequate remedy.',
simplifiedExplanation:'"We command" — court orders a government official to do their legal duty. Conditions: (1) legal right of applicant, (2) corresponding legal duty of authority, (3) duty of public nature, (4) applicant demanded performance and was refused.',
punishment:'Not applicable — constitutional remedy.',whoItAppliesTo:'Public authorities, government officials, tribunals, courts',
realWorldExample:'Municipal corporation fails to clear garbage for months. Resident filed Mandamus in HC directing them to perform statutory duty of waste collection. HC ordered removal and regular collection schedule.',
importantCases:[mkCase('Bar Council of UP vs State of UP',1973,'SC','Mandamus lies against public authority for failure to perform mandatory duty. No mandamus against private individuals.','Scope of mandamus defined.')],
loopholes:[mkLoop('Alternative Remedy Bar','Courts usually require exhaustion of alternative remedies before granting mandamus.','Authority argues applicant has alternative remedy (appeal, complaint).','Show alternative remedy is inadequate, too slow, or not efficacious.','Mandamus is discretionary. Court may still refuse if alternative exists.')],
relatedSections:['con-art-14','con-art-226'],difficulty:'Beginner',tags:['writ','mandamus','public duty','government duty','UPSC important'],
subCategory:'Constitutional Writs',enactedYear:1950,upscImportance:'Very High',
upscTopics:['Polity','Writs','Mandamus','Administrative Law','Fundamental Rights'],
aiSearchKeywords:['mandamus','writ of mandamus','court command','public duty','government inaction','Article 226 mandamus','writ against government'],
scenarioTags:['government not doing its duty','police not registering FIR','municipality not providing service','authority refusing to act']}));

allLaws.push(E({id:'writ-certiorari',lawName:'Constitution of India',shortName:'Constitution',category:'writs',
sectionNumber:'Certiorari',title:'Certiorari — Quash the Order',
definition:'A writ issued to quash the order of a lower court, tribunal, or quasi-judicial authority when it has acted without jurisdiction, exceeded jurisdiction, or violated natural justice.',
simplifiedExplanation:'"To be certified" — higher court quashes illegal orders of lower courts/tribunals. Grounds: (1) want of jurisdiction, (2) excess of jurisdiction, (3) violation of natural justice, (4) error of law apparent on record, (5) perverse findings.',
punishment:'Not applicable.',whoItAppliesTo:'Lower courts, tribunals, administrative authorities',
realWorldExample:'Labour Tribunal passed order against factory without hearing their side (violation of natural justice). Factory filed Certiorari in HC. HC quashed the order and remanded for fresh hearing.',
importantCases:[mkCase('S.L. Kapoor vs Jagmohan',1980,'SC','Certiorari granted when there is error of law apparent on face of record. Not every error — only manifest error.','Error of law standard.')],
loopholes:[mkLoop('Error Apparent on Record','Not every error qualifies — must be error "apparent on face of record" without lengthy argument.','Authority argues error requires detailed examination — not apparent, so certiorari not available.','If error requires lengthy argument, it is not apparent. Focus on clear jurisdictional errors.','Show error is manifest without requiring evidence.')],
relatedSections:['con-art-226','con-art-227','cpc-ord47'],difficulty:'Intermediate',tags:['writ','certiorari','quash','tribunal','UPSC important'],
subCategory:'Constitutional Writs',enactedYear:1950,upscImportance:'Very High',
upscTopics:['Polity','Writs','Certiorari','Administrative Law','Judicial Review'],
aiSearchKeywords:['certiorari','writ of certiorari','quash order','quash tribunal order','error apparent','jurisdictional error','natural justice'],
scenarioTags:['court order without jurisdiction','tribunal violated natural justice','quash illegal order','appeal against tribunal decision']}));

allLaws.push(E({id:'writ-prohibition',lawName:'Constitution of India',shortName:'Constitution',category:'writs',
sectionNumber:'Prohibition',title:'Prohibition — Stop the Proceedings',
definition:'A writ issued by a higher court to a lower court or tribunal prohibiting it from proceeding with a case that is beyond its jurisdiction. Preventive remedy, not corrective.',
simplifiedExplanation:'"To prohibit" — higher court stops lower court from hearing a case it has no jurisdiction over. Preventive (issued BEFORE order is passed). Different from certiorari which is corrective (after order).',
punishment:'Not applicable.',whoItAppliesTo:'Lower courts, tribunals acting without/exceeding jurisdiction',
realWorldExample:'Civil judge started hearing a case exclusively triable by High Court. Party filed Prohibition in HC. HC prohibited civil judge from continuing — case transferred to correct court.',
importantCases:[mkCase('Anisminic vs Foreign Compensation Commission',1969,'UK (followed in India)','Prohibition lies when tribunal exceeds jurisdiction or acts in excess of its authority.','Scope of prohibition.')],
loopholes:[mkLoop('Preventive Nature Limited','Prohibition available only BEFORE order. If order already passed, certiorari is remedy.','Parties confuse prohibition with certiorari and apply too late after order passed.','If order already passed, seek certiorari to quash, not prohibition.','Distinguish: prohibition prevents, certiorari corrects.')],
relatedSections:['con-art-226','con-art-32'],difficulty:'Intermediate',tags:['writ','prohibition','jurisdiction','UPSC important'],
subCategory:'Constitutional Writs',enactedYear:1950,upscImportance:'Very High',
upscTopics:['Polity','Writs','Prohibition','Administrative Law','Judicial Review'],
aiSearchKeywords:['prohibition writ','writ of prohibition','stop proceedings','lower court jurisdiction','preventive writ','excess of jurisdiction','Article 226 prohibition'],
scenarioTags:['court hearing case without jurisdiction','tribunal exceeding its authority','stop proceedings in wrong court']}));

allLaws.push(E({id:'writ-quo-warranto',lawName:'Constitution of India',shortName:'Constitution',category:'writs',
sectionNumber:'Quo Warranto',title:'Quo Warranto — By What Authority',
definition:'A writ issued to challenge the legal right of a person to hold a public office. Court inquires "by what authority" does the person hold the office.',
simplifiedExplanation:'"By what warrant" — challenges a person\'s right to hold public office. Conditions: (1) office is public and substantive, (2) created by Constitution/statute, (3) person occupying office without legal qualification, (4) applicant need not have personal interest — any citizen can file.',
punishment:'Not applicable.',whoItAppliesTo:'Persons holding public office without authority',
realWorldExample:'A person was appointed as Chairman of a state commission who did not meet the statutory qualification of "judicial officer". A citizen filed Quo Warranto. HC declared appointment void and ousted the person from office.',
importantCases:[mkCase('University of Mysore vs Govinda Rao',1964,'SC','Quo Warranto lies only against public offices of substantive character. Not against private offices.','Public office requirement.')],
loopholes:[mkLoop('Discretionary Nature','Quo Warranto is discretionary. Court may refuse if not in public interest.','Persons occupying office argue ouster would disrupt administration.','If person clearly unqualified, court should exercise discretion in favor of ouster.','Public interest in removing unqualified person outweighs disruption.')],
relatedSections:['con-art-226','con-art-32'],difficulty:'Intermediate',tags:['writ','quo warranto','public office','challenge appointment','UPSC important'],
subCategory:'Constitutional Writs',enactedYear:1950,upscImportance:'Very High',
upscTopics:['Polity','Writs','Quo Warranto','Public Office','Administrative Law'],
aiSearchKeywords:['quo warranto','writ of quo warranto','by what authority','public office challenge','illegal appointment','unqualified office holder','Article 226 quo warranto'],
scenarioTags:['unqualified person holding public office','illegal government appointment','challenge appointment to public post']}));
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
  // Generate BNS sections (detailed)
  genBNS();

  // Flatten allLaws to JSON
  const json = JSON.stringify(allLaws, null, 2);
  fs.writeFileSync(OUTPUT, json, 'utf-8');
  console.log('Generated ' + allLaws.length + ' law entries in ' + OUTPUT);
  console.log('File size: ' + (Buffer.byteLength(json) / 1024).toFixed(1) + ' KB');
}

main();
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
