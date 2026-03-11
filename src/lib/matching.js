/**
 * CREATIVEVERSE Smart Matching Algorithm (Mocked)
 * 
 * This module simulates the logic used to match artists with gigs
 * based on skill overlap, style tags, and budget alignment.
 */

export const getMatchesForGig = (gig, allArtists) => {
    // 1. Filter by category
    let matches = allArtists.filter(artist => artist.category === gig.category);
    
    // 2. Score by skill overlap
    matches = matches.map(artist => {
        const overlap = artist.skills.filter(skill => gig.skills_needed?.includes(skill)).length;
        return { ...artist, matchScore: overlap * 10 };
    });

    // 3. Sort by score
    return matches.sort((a, b) => b.matchScore - a.matchScore);
};

export const getRecommendedGigs = (artist, allGigs) => {
    // 1. Filter by category
    let matches = allGigs.filter(gig => gig.category === artist.category);

    // 2. Score by skill overlap
    matches = matches.map(gig => {
        const overlap = gig.skills_needed?.filter(skill => artist.skills.includes(skill)).length || 0;
        return { ...gig, matchScore: overlap * 10 + (gig.urgent ? 20 : 0) };
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
};
