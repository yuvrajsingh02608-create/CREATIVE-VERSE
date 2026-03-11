import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for seeding

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials missing. Ensure .env.local contains NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const ARTISTS = [
  {
    name: "Mara Silva",
    role: "Visual Artist & 3D Designer",
    location: "Lisbon, Portugal",
    category: "3D & Motion",
    bio: "Award-winning 3D artist specializing in surreal digital sculptures and NFT collections. 6 years creating for brands like Nike, Adidas, and independent galleries worldwide.",
    skills: ["Cinema 4D", "Blender", "After Effects", "Redshift", "NFT", "Brand Art"],
    hourly_rate: 85,
    availability: true,
    rating: 4.9,
    total_projects: 142,
    followers: 2100,
    verified: true,
    plan: "pro"
  },
  {
    name: "Kai Nakamura",
    role: "Music Producer & Sound Designer",
    location: "Tokyo, Japan",
    category: "Music Production",
    bio: "House and lo-fi producer with releases on Anjunadeep, Ninja Tune, and self-released. Expert in full EP production, mixing, mastering, and sync licensing for film/TV.",
    skills: ["Ableton Live", "Logic Pro", "Mixing", "Mastering", "House", "Lo-Fi", "Sync"],
    hourly_rate: 120,
    availability: true,
    rating: 5.0,
    total_projects: 89,
    followers: 8400,
    verified: true,
    plan: "studio"
  },
  {
    name: "Zoe Laurent",
    role: "Editorial Photographer",
    location: "Paris, France",
    category: "Photo/Film",
    bio: "Published in Vogue, i-D, and Dazed. Specializing in editorial fashion, portraiture, and documentary photography. Available for campaigns, lookbooks, and personal projects.",
    skills: ["Canon R5", "Lighting", "Retouching", "Editorial", "Fashion", "Film Photography"],
    hourly_rate: 95,
    availability: false,
    rating: 4.8,
    total_projects: 203,
    followers: 12000,
    verified: true,
    plan: "pro"
  },
  {
    name: "Olu Adeyemi",
    role: "Filmmaker & Director",
    location: "Lagos, Nigeria",
    category: "Photo/Film",
    bio: "Award-winning short film director. Sundance 2023 alumni. Creates emotionally-driven narratives exploring identity, culture, and the African diaspora experience.",
    skills: ["Directing", "Cinematography", "DaVinci Resolve", "RED Camera", "Documentary", "Narrative"],
    hourly_rate: 150,
    availability: true,
    rating: 4.9,
    total_projects: 56,
    followers: 5200,
    verified: true,
    plan: "studio"
  },
  {
    name: "Ana Cruz",
    role: "Illustrator & Character Designer",
    location: "São Paulo, Brazil",
    category: "Brand Design",
    bio: "Character designer and illustrator working with global brands on campaigns, packaging, and publishing. Known for bold ink work and vibrant editorial illustration style.",
    skills: ["Procreate", "Illustrator", "Character Design", "Ink", "Editorial", "Branding", "Publishing"],
    hourly_rate: 70,
    availability: false,
    rating: 4.7,
    total_projects: 178,
    followers: 7100,
    verified: false,
    plan: "pro"
  },
  {
    name: "Seo-yun Park",
    role: "Choreographer & Performance Artist",
    location: "Seoul, South Korea",
    category: "Performance",
    bio: "Contemporary dance choreographer and performance artist. Created pieces for Seoul Arts Center, Tate Modern, and multiple international festivals.",
    skills: ["Contemporary Dance", "Choreography", "Performance Art", "Video Dance", "Movement Direction"],
    hourly_rate: 200,
    availability: true,
    rating: 5.0,
    total_projects: 67,
    followers: 3300,
    verified: true,
    plan: "pro"
  },
  {
    name: "Marcus Webb",
    role: "Brand Identity Designer",
    location: "London, UK",
    category: "Brand Design",
    bio: "Strategic brand identity designer working with startups to Fortune 500s. Obsessed with the intersection of typography and concept. D&AD Yellow Pencil winner.",
    skills: ["Brand Identity", "Typography", "Logo Design", "Figma", "Illustrator", "Strategy"],
    hourly_rate: 130,
    availability: true,
    rating: 4.9,
    total_projects: 231,
    followers: 15600,
    verified: true,
    plan: "studio"
  },
  {
    name: "Yuki Tanaka",
    role: "Motion Designer & Animator",
    location: "Osaka, Japan",
    category: "3D & Motion",
    bio: "Motion designer specializing in title sequences, UI animations, and broadcast design. Worked with Netflix, Apple, and Spotify on visual identity projects.",
    skills: ["After Effects", "Cinema 4D", "Lottie", "Motion Graphics", "UI Animation", "Broadcast"],
    hourly_rate: 110,
    availability: true,
    rating: 4.8,
    total_projects: 167,
    followers: 9800,
    verified: true,
    plan: "pro"
  },
  {
    name: "Sofia Reyes",
    role: "UX/UI Designer & Creative Technologist",
    location: "Mexico City, Mexico",
    category: "UI/UX Art",
    bio: "Product designer and creative technologist building at the intersection of design and code. Led design at two YC startups. Available for product design and design systems.",
    skills: ["Figma", "React", "Design Systems", "Prototyping", "User Research", "Interaction Design"],
    hourly_rate: 115,
    availability: false,
    rating: 4.9,
    total_projects: 94,
    followers: 6700,
    verified: true,
    plan: "pro"
  },
  {
    name: "Dmitri Volkov",
    role: "Creative Coder & Generative Artist",
    location: "Berlin, Germany",
    category: "Creative Code",
    bio: "Generative artist and creative coder working with WebGL, p5.js, and custom shaders. Built interactive installations for Ars Electronica and transmediale festivals.",
    skills: ["WebGL", "GLSL", "p5.js", "Three.js", "Generative Art", "Installations", "TouchDesigner"],
    hourly_rate: 140,
    availability: true,
    rating: 5.0,
    total_projects: 43,
    followers: 4500,
    verified: true,
    plan: "studio"
  },
  // Adding more mock artists to reach 40...
  ...Array.from({ length: 30 }).map((_, i) => ({
    name: `Creator Node ${i + 11}`,
    role: "Digital Artist",
    location: "Remote",
    category: ["3D & Motion", "Brand Design", "UI/UX Art", "Photo/Film", "Creative Code", "Architecture", "Music Production", "Performance", "Illustration"][i % 9],
    bio: "Creative node specializing in visual delivery and aesthetic excellence.",
    skills: ["Design", "Art", "Creation"],
    hourly_rate: 50 + (i * 5),
    availability: Math.random() > 0.3,
    rating: 4.5 + (Math.random() * 0.5),
    total_projects: 10 + Math.floor(Math.random() * 100),
    followers: 100 + Math.floor(Math.random() * 5000),
    verified: Math.random() > 0.5,
    plan: i % 2 === 0 ? "pro" : "studio"
  }))
];

const CLIENTS = [
  {
    name: "Jonas Müller",
    company: "Phantom Studio",
    location: "Berlin, Germany",
    type: "Agency",
    industry: "Creative Agency",
    typical_budget: "$5,000–$20,000",
    projects_posted: 12,
    artists_hired: 28,
    verified: true,
    bio: "Berlin-based creative agency working with luxury brands, tech companies, and cultural institutions."
  },
  {
    name: "Priya Sharma",
    company: "Luminary Labs",
    location: "Mumbai, India",
    type: "Startup",
    industry: "Tech",
    typical_budget: "$1,000–$8,000",
    projects_posted: 7,
    artists_hired: 14,
    verified: true
  },
  {
    name: "James O'Brien",
    company: "Atlantic Records (Independent)",
    location: "New York, USA",
    type: "Label",
    industry: "Music",
    typical_budget: "$3,000–$15,000",
    projects_posted: 19,
    artists_hired: 41,
    verified: true
  },
  {
    name: "Anya Kowalski",
    company: "Self",
    location: "Warsaw, Poland",
    type: "Individual",
    industry: "Fashion",
    typical_budget: "$500–$3,000",
    projects_posted: 4,
    artists_hired: 6,
    verified: false
  },
  {
    name: "Chen Wei",
    company: "ByteFrame Studios",
    location: "Shanghai, China",
    type: "Studio",
    industry: "Gaming",
    typical_budget: "$10,000–$50,000",
    projects_posted: 8,
    artists_hired: 22,
    verified: true
  },
  // Adding more mock clients to reach 15...
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Client Entity ${i + 6}`,
    company: `Venture Group ${i + 6}`,
    location: "Global",
    type: "Corporate",
    industry: "Entertainment",
    typical_budget: "$2,000–$10,000",
    projects_posted: Math.floor(Math.random() * 20),
    artists_hired: Math.floor(Math.random() * 50),
    verified: Math.random() > 0.5
  }))
];

const GIGS = [
  {
    title: "Album Cover & Visual Identity for Electronic EP",
    category: "Brand Design",
    type: "Short Term",
    budget_min: 800,
    budget_max: 1500,
    deadline: "2 weeks",
    skills_needed: ["Illustrator", "Photoshop", "Typography", "Music Art Direction"],
    description: "Looking for a visionary artist to create the complete visual identity for a 6-track electronic EP. Needs album cover (3000x3000px), social media kit, and animated loop for streaming platforms.",
    urgent: false,
    featured: true
  },
  {
    title: "3D Product Visualization — Luxury Fragrance Line",
    category: "3D & Motion",
    type: "Short Term",
    budget_min: 2000,
    budget_max: 4000,
    deadline: "3 weeks",
    skills_needed: ["Cinema 4D", "Redshift", "Product Viz", "Luxury Branding"],
    description: "Need photorealistic 3D renders of 4 fragrance bottles for e-commerce and print. Dark, moody aesthetic. Reference: Byredo, Le Labo. Must include turntable animation.",
    urgent: true,
    featured: false
  },
  {
    title: "Mobile App UI Design — Music Discovery Platform",
    category: "UI/UX Art",
    type: "Long Term",
    budget_min: 8000,
    budget_max: 15000,
    deadline: "8 weeks",
    skills_needed: ["Figma", "Mobile UI", "Design Systems", "Prototyping", "iOS/Android"],
    description: "Seeking a senior UI/UX designer to design a complete music discovery app. 40+ screens, full design system, interactive Figma prototype. Will work directly with dev team.",
    urgent: false,
    featured: true
  },
  {
    title: "Short Documentary — Street Art Scene in Lagos",
    category: "Photo/Film",
    type: "Collaboration",
    budget_min: 5000,
    budget_max: 10000,
    deadline: "6 weeks",
    skills_needed: ["Directing", "Cinematography", "Documentary", "Editing", "Color Grading"],
    description: "Co-producing a 20-minute documentary on Lagos's emerging street art scene for film festival submission. Need director and cinematographer. Travel + accommodation covered.",
    urgent: false,
    featured: false
  },
  {
    title: "Brand Identity for Architecture Firm Rebrand",
    category: "Brand Design",
    type: "Long Term",
    budget_min: 6000,
    budget_max: 12000,
    deadline: "5 weeks",
    skills_needed: ["Brand Identity", "Typography", "Logo Design", "Figma", "Brand Strategy"],
    description: "Complete rebrand for an established Berlin architecture firm. Deliverables: logo system, typography, color palette, brand guidelines PDF, stationery, website style guide.",
    urgent: false,
    featured: true
  },
  // Adding more mock gigs to reach 30...
  ...Array.from({ length: 25 }).map((_, i) => ({
    title: `Project Broadcast ${i + 6}`,
    category: ["3D & Motion", "Brand Design", "UI/UX Art", "Photo/Film", "Creative Code", "Architecture", "Music Production", "Performance", "Illustration"][i % 9],
    type: "Project Based",
    budget_min: 1000,
    budget_max: 5000,
    deadline: "4 weeks",
    skills_needed: ["Creative", "Design"],
    description: "High-fidelity project requirement for the creative verse.",
    urgent: Math.random() > 0.8,
    featured: Math.random() > 0.7
  }))
];

async function seed() {
  console.log('🚀 INITIALIZING SEED SEQUENCE...');

  // 1. CLEAR EXISTING DATA (Caution)
  // console.log('⚠️ CLEANSING DATABASE...');
  // await supabase.from('applications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  // await supabase.from('portfolio_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  // await supabase.from('gigs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  // await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // Note: For real auth users, we would use supabase.auth.admin.createUser
  // But for this seed, we'll assume profiles can be created directly for testing if RLS allows or via service role.

  console.log('💎 SEEDING ARTISTS...');
  // In a real scenario, we'd create auth users first. This is a simulation.
  const { data: artistsData, error: artistsError } = await supabase
    .from('profiles')
    .insert(ARTISTS.map(a => ({ ...a, role: 'artist' })))
    .select();

  if (artistsError) console.error('Error seeding artists:', artistsError);

  console.log('💼 SEEDING CLIENTS...');
  const { data: clientsData, error: clientsError } = await supabase
    .from('profiles')
    .insert(CLIENTS.map(c => ({ ...c, role: 'client' })))
    .select();

  if (clientsError) console.error('Error seeding clients:', clientsError);

  if (clientsData) {
    console.log('🎯 SEEDING GIGS...');
    const gigsWithClients = GIGS.map(g => ({
      ...g,
      client_id: clientsData[Math.floor(Math.random() * clientsData.length)].id
    }));
    const { error: gigsError } = await supabase.from('gigs').insert(gigsWithClients);
    if (gigsError) console.error('Error seeding gigs:', gigsError);
  }

  console.log('✓ SEED SEQUENCE COMPLETE.');
  console.log(`✓ ${ARTISTS.length} artists, ${CLIENTS.length} clients, ${GIGS.length} gigs seeded.`);
}

seed();
