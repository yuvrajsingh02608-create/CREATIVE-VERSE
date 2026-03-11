/**
 * CREATIVEVERSE AI MATCHING ENGINE V1
 * Calculates compatibility between Artists and Gigs/Clients.
 */

export const STYLE_TAGS = ["Minimalist", "Bold", "Experimental", "Commercial", "Fine Art", "Editorial", "Street", "Luxury", "Playful"];

/**
 * Calculates a score from 0-100 based on weighted factors.
 * @param {Object} artist - Artist profile data
 * @param {Object} gig - Gig/Project data
 * @param {Object} clientPrefs - Client's style preferences
 */
export function calculateMatchScore(artist, gig, clientPrefs = {}) {
  let score = 0;
  const breakdown = {};

  // 1. Skill Match (30 pts)
  const matchedSkills = gig.requiredSkills.filter(s => 
    artist.skills.some(as => as.toLowerCase() === s.toLowerCase())
  );
  const skillScore = Math.round((matchedSkills.length / Math.max(1, gig.requiredSkills.length)) * 30);
  score += skillScore;
  breakdown.skills = { score: skillScore, max: 30, matched: matchedSkills };

  // 2. Style Tag Match (20 pts)
  const artistStyles = artist.styleTags || [];
  const preferredStyles = clientPrefs.styles || [];
  const matchedStyles = artistStyles.filter(s => preferredStyles.includes(s));
  const styleScore = Math.round((matchedStyles.length / Math.max(1, preferredStyles.length)) * 20);
  score += styleScore;
  breakdown.style = { score: styleScore, max: 20, matched: matchedStyles };

  // 3. Budget Compatibility (20 pts)
  // Gig budget is range [min, max]. Artist has 'price' (hourly).
  const gigMax = gig.numericBudget || 1000;
  const artistRate = artist.price || 0;
  let budgetScore = 0;
  if (artistRate <= gigMax / 10) { // Simple heuristic: artist hourly x 10 fits in budget
    budgetScore = 20;
  } else if (artistRate <= gigMax / 5) {
    budgetScore = 10;
  }
  score += budgetScore;
  breakdown.budget = { score: budgetScore, max: 20 };

  // 4. Category Match (15 pts)
  const catMatch = artist.category === gig.category;
  const categoryScore = catMatch ? 15 : 0;
  score += categoryScore;
  breakdown.category = { score: categoryScore, max: 15 };

  // 5. Rating & Reliability (10 pts)
  const ratingWeight = (artist.rating / 5) * 7; // 7 pts for rating
  const completionWeight = (artist.completionRate || 100) / 100 * 3; // 3 pts for completion
  const reliabilityScore = Math.round(ratingWeight + completionWeight);
  score += reliabilityScore;
  breakdown.reliability = { score: reliabilityScore, max: 10 };

  // 6. Response Time (5 pts)
  const respTime = artist.responseTimeHrs || 1;
  let responseScore = 1;
  if (respTime <= 2) responseScore = 5;
  else if (respTime <= 24) responseScore = 3;
  score += responseScore;
  breakdown.response = { score: responseScore, max: 5 };

  return {
    total: Math.min(100, score),
    breakdown,
    calculatedAt: new Date().toISOString()
  };
}

/**
 * Simulates AI-generated explanation for a match.
 */
export function generateMatchInsight(scoreBreakdown, artistName) {
  const { skills, style, budget } = scoreBreakdown;
  
  if (skills.score > 25 && style.score > 15) {
    return `${artistName} is a premier match. Their overlap in ${skills.matched.join(', ')} perfectly aligns with your technical requirements, while their ${style.matched[0] || 'unique'} aesthetic matches your brand DNA.`;
  }
  
  if (budget.score === 20) {
    return `${artistName} offers exceptional value within your budget parameters. Their rating of ${scoreBreakdown.reliability.score}/10 for reliability ensures a stable delivery cycle.`;
  }

  return `${artistName} is a solid contender with strong foundations in ${skills.matched[0] || 'the field'}. Their response metrics indicate high availability for this mission.`;
}
