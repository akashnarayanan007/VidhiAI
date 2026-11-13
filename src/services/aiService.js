import { getSettings } from './progressService';

function getApiKey() {
  const settings = getSettings();
  return settings.apiKey || '';
}

async function callClaude(systemPrompt, userPrompt) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

function parseJSON(text) {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1].trim());
  }
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf('[') !== -1 ? text.indexOf('[') : text.indexOf('{');
    const end = text.lastIndexOf(']') !== -1 ? text.lastIndexOf(']') + 1 : text.lastIndexOf('}') + 1;
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end));
    }
    throw new Error('Could not parse JSON from response');
  }
}

export async function generateQuiz(law, difficulty = 'Intermediate', questionCount = 5) {
  const systemPrompt = `You are an Indian law expert and civil services examiner. You create challenging but fair MCQ questions about Indian laws for UPSC preparation. Always return valid JSON.`;

  const userPrompt = `Generate ${questionCount} MCQ questions about "${law.lawName}" - ${law.sectionNumber} (${law.title}).

Each question should test understanding, application, and analysis — not just rote memory.

Difficulty level: ${difficulty}

Return a JSON array with this exact structure:
[
  {
    "question": "Clear, well-formed question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Why this answer is correct and others are wrong"
  }
]

Context about this law:
- Definition: ${law.simplifiedExplanation}
- Punishment: ${law.punishment || 'N/A'}
${law.importantCases?.length > 0 ? `- Key case: ${law.importantCases[0].caseName} (${law.importantCases[0].year})` : ''}
${law.loopholes?.length > 0 ? `- Key loophole: ${law.loopholes[0].loopholeName}` : ''}`;

  try {
    const response = await callClaude(systemPrompt, userPrompt);
    return parseJSON(response);
  } catch (error) {
    if (error.message === 'NO_API_KEY') {
      return generateFallbackQuiz(law, questionCount);
    }
    throw error;
  }
}

export async function generateScenario(law) {
  const systemPrompt = `You are an Indian law expert creating realistic courtroom scenarios for civil services exam preparation. Create detailed, engaging scenarios with Indian names, places, and legal procedures. Always return valid JSON.`;

  const userPrompt = `Create a realistic Indian courtroom scenario involving "${law.lawName}" - ${law.sectionNumber} (${law.title}).

Return a JSON object with this exact structure:
{
  "title": "Short title of the case",
  "background": "Detailed case facts — accused, victim, location, what happened (3-4 paragraphs with Indian names and places)",
  "prosecution": "Prosecution's main arguments (2-3 points)",
  "defense": "Defense's arguments using loopholes of this law (2-3 points)",
  "judgeConsideration": "What the judge must consider",
  "challenge": "A question for the user: how would you argue this case as a civil services officer?",
  "actualOutcome": "What a court would likely decide and why",
  "keyTakeaway": "What a UPSC aspirant should learn from this case"
}

Law context:
${law.simplifiedExplanation}
${law.loopholes?.length > 0 ? `Known loophole: ${law.loopholes[0].loopholeName} - ${law.loopholes[0].description}` : ''}`;

  try {
    const response = await callClaude(systemPrompt, userPrompt);
    return parseJSON(response);
  } catch (error) {
    if (error.message === 'NO_API_KEY') {
      return generateFallbackScenario(law);
    }
    throw error;
  }
}

export async function evaluateArgument(scenario, userArgument, role) {
  const systemPrompt = `You are an Indian law expert and civil services interview evaluator. Evaluate the user's legal argument fairly and constructively. Return valid JSON.`;

  const userPrompt = `The user is arguing as the ${role} in this case:

Case: ${scenario.title}
Background: ${scenario.background}

The user's argument:
"${userArgument}"

Evaluate their argument. Return JSON:
{
  "score": <number 1-10>,
  "strengths": ["What they did well — 2-3 points"],
  "weaknesses": ["What they missed — 2-3 points"],
  "modelAnswer": "What an ideal answer would include",
  "courtDecision": "What the court would likely decide",
  "civilServiceTip": "Specific tip for a UPSC/IAS aspirant"
}`;

  try {
    const response = await callClaude(systemPrompt, userPrompt);
    return parseJSON(response);
  } catch (error) {
    if (error.message === 'NO_API_KEY') {
      return {
        score: 7,
        strengths: ['You attempted to address the core legal issue', 'Your argument shows understanding of the law'],
        weaknesses: ['Consider citing specific case law to strengthen your position', 'Address potential counter-arguments from the opposing side'],
        modelAnswer: 'A model answer would cite relevant sections, landmark cases, and address both the letter and spirit of the law.',
        courtDecision: 'The court would consider all evidence and legal precedent before deciding.',
        civilServiceTip: 'In UPSC interviews, always connect legal principles to their constitutional basis and societal impact.',
      };
    }
    throw error;
  }
}

export async function analyzeLoopholes(law) {
  const systemPrompt = `You are an Indian law expert specializing in legal strategy and loophole analysis for civil services education. Return valid JSON.`;

  const userPrompt = `Analyze "${law.lawName}" - ${law.sectionNumber} (${law.title}) for legal loopholes and strategies.

Current known loopholes: ${law.loopholes?.map(l => l.loopholeName).join(', ') || 'None listed'}

Provide additional analysis. Return JSON:
{
  "additionalLoopholes": [
    {
      "name": "Loophole name",
      "description": "How it works",
      "famousCases": "Cases where it was used",
      "prosecutorStrategy": "How to overcome it",
      "status": "Open" or "Sealed by court"
    }
  ],
  "practiceQuestions": ["2-3 interview-style questions about this law's loopholes"],
  "upscRelevance": "Why this law matters for UPSC preparation"
}`;

  try {
    const response = await callClaude(systemPrompt, userPrompt);
    return parseJSON(response);
  } catch (error) {
    if (error.message === 'NO_API_KEY') {
      return {
        additionalLoopholes: [],
        practiceQuestions: [
          `What are the key loopholes in ${law.sectionNumber} and how can they be addressed?`,
          `How has the Supreme Court interpreted ${law.sectionNumber} over the years?`,
        ],
        upscRelevance: `${law.title} is frequently asked in UPSC Prelims, Mains, and Interview. Understanding its loopholes shows depth of legal knowledge.`,
      };
    }
    throw error;
  }
}

export async function generateInterviewQuestion(law) {
  const systemPrompt = `You are a UPSC interview board member asking questions about Indian law. Be formal but probing. Return valid JSON.`;

  const userPrompt = `Generate a UPSC IAS/IPS interview question about "${law.lawName}" - ${law.sectionNumber} (${law.title}).

Return JSON:
{
  "question": "The interview question — should be challenging and require analysis",
  "keyPoints": ["3-5 points that should be in a good answer"],
  "modelAnswer": "A comprehensive model answer (2-3 paragraphs)",
  "followUp": "A follow-up question the board might ask"
}`;

  try {
    const response = await callClaude(systemPrompt, userPrompt);
    return parseJSON(response);
  } catch (error) {
    if (error.message === 'NO_API_KEY') {
      return {
        question: `What is the significance of ${law.sectionNumber} of ${law.lawName} and how has judicial interpretation evolved?`,
        keyPoints: [
          'Explain the provision clearly',
          'Cite landmark judgments',
          'Discuss practical implications',
          'Connect to fundamental rights if applicable',
        ],
        modelAnswer: `${law.simplifiedExplanation} The provision has been interpreted by the Supreme Court in landmark cases and continues to evolve.`,
        followUp: `How would you address the challenges in implementation of ${law.sectionNumber}?`,
      };
    }
    throw error;
  }
}

function generateFallbackQuiz(law, count) {
  const questions = [
    {
      question: `What is the primary purpose of ${law.sectionNumber} of ${law.lawName}?`,
      options: [
        law.title,
        'Regulation of commercial activities',
        'Administrative procedures for government offices',
        'International trade agreements',
      ],
      correctIndex: 0,
      explanation: `${law.sectionNumber} deals with "${law.title}". ${law.simplifiedExplanation?.slice(0, 150)}...`,
    },
    {
      question: `${law.sectionNumber} of ${law.lawName} falls under which category of Indian law?`,
      options: [law.category, 'Maritime Law', 'International Law', 'Military Law'],
      correctIndex: 0,
      explanation: `This section is part of ${law.category} law in India.`,
    },
    {
      question: `What is the punishment/consequence under ${law.sectionNumber}?`,
      options: [
        law.punishment || 'Constitutional remedy through courts',
        'Only a fine of ₹500',
        'Community service for 6 months',
        'No legal consequence',
      ],
      correctIndex: 0,
      explanation: law.punishment || 'This provision provides constitutional remedies enforceable through courts.',
    },
  ];

  if (law.importantCases?.length > 0) {
    questions.push({
      question: `Which landmark case is associated with ${law.sectionNumber} of ${law.lawName}?`,
      options: [
        law.importantCases[0].caseName,
        'State of Kerala vs NM Thomas',
        'MC Mehta vs Union of India',
        'Golak Nath vs State of Punjab',
      ],
      correctIndex: 0,
      explanation: `${law.importantCases[0].caseName} (${law.importantCases[0].year}) — ${law.importantCases[0].significance}`,
    });
  }

  if (law.whoItAppliesTo) {
    questions.push({
      question: `Who does ${law.sectionNumber} of ${law.lawName} primarily apply to?`,
      options: [
        law.whoItAppliesTo,
        'Only foreign nationals',
        'Only government employees',
        'Only corporations',
      ],
      correctIndex: 0,
      explanation: `This section applies to: ${law.whoItAppliesTo}`,
    });
  }

  return questions.slice(0, count);
}

function generateFallbackScenario(law) {
  return {
    title: `Case involving ${law.sectionNumber} — ${law.title}`,
    background: law.realWorldExample || `A case arose involving the application of ${law.sectionNumber} of ${law.lawName} in a district court. The facts involve a dispute that requires careful analysis of this legal provision.`,
    prosecution: `The prosecution argues that the accused clearly violated ${law.sectionNumber} based on available evidence and witness testimony.`,
    defense: `The defense contends that the elements of ${law.sectionNumber} are not fully established and raises questions about the evidence presented.${law.loopholes?.length > 0 ? ` They particularly invoke the "${law.loopholes[0].loopholeName}" defense.` : ''}`,
    judgeConsideration: `The judge must consider: the strength of evidence, applicability of ${law.sectionNumber}, relevant precedent${law.importantCases?.length > 0 ? ` including ${law.importantCases[0].caseName}` : ''}, and the balance of rights.`,
    challenge: `As a civil services officer, how would you analyze the application of ${law.sectionNumber} in this scenario? Consider both the legal provisions and their practical implications.`,
    actualOutcome: 'The court would examine all evidence, apply the relevant legal tests, and consider landmark precedent before reaching a decision.',
    keyTakeaway: `Understanding the nuances of ${law.sectionNumber} — including its exceptions and judicial interpretation — is essential for both legal practice and civil services examinations.`,
  };
}

export function isAIAvailable() {
  return !!getApiKey();
}
