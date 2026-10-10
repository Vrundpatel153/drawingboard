import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import ArrowIcon from '../components/ArrowIcon';
import MoreServicesSection from '../components/MoreServicesSection';
import StickyMobileCTA from '../components/StickyMobileCTA';
import { DISCUSS_URL, CONTACT_EMAIL, WHATSAPP_NUMBER, WHATSAPP_URL } from '../utils/siteConfig';
import { usePageAnimations } from '../hooks/usePageAnimations';
import useSEO from '../hooks/useSEO';
import { trackMetaFormSubmission } from '../utils/metaEvents';

/* ─────────────────────────────────────────────────────────────────────────────
   Questions & Diagnosis Data
   ───────────────────────────────────────────────────────────────────────────── */
const QUESTIONS = [
  {
    id: 'category',
    type: 'single',
    title: 'What are you building?',
    help: 'Choose the category closest to your core offering.',
    options: [
      ['fnb', 'Food & beverage'],
      ['beauty', 'Beauty & wellness'],
      ['fashion', 'Fashion & lifestyle'],
      ['consumer', 'Consumer product'],
      ['hospitality', 'Hospitality'],
      ['tech', 'Technology / SaaS'],
      ['other', 'Something else']
    ]
  },
  {
    id: 'stage',
    type: 'single',
    title: 'Where is the business today?',
    help: 'Select your current commercial milestone.',
    options: [
      ['launch', 'Preparing to launch'],
      ['recent', 'Recently launched'],
      ['established', "Established, but the brand hasn't kept up"],
      ['scaling', 'Scaling quickly'],
      ['retail', 'Entering retail or new markets']
    ]
  },
  {
    id: 'problems',
    type: 'multi',
    max: 2,
    title: "What's holding the brand back?",
    help: 'Choose up to two primary tension points.',
    options: [
      ['interchangeable', 'We look interchangeable with competitors'],
      ['price', "The brand doesn't justify our price point"],
      ['inconsistent', 'Our identity feels fragmented or inconsistent'],
      ['packaging', "Our packaging isn't doing the product justice on shelf"],
      ['website', "Our website doesn't reflect the quality of the business"],
      ['retail', "We're entering retail / quick commerce and need shelf power"],
      ['outgrown', "We've outgrown the identity and packaging we started with"],
      ['unsure', "We're not completely sure — we just know something isn't working"]
    ]
  },
  {
    id: 'scope',
    type: 'single',
    title: 'What needs to change first?',
    help: 'Where should creative and strategic effort concentrate?',
    options: [
      ['strategy', 'Brand strategy & market positioning'],
      ['identity', 'Visual identity system (logo, typography, rules)'],
      ['packaging', 'Packaging architecture and dielines'],
      ['website', 'Website & digital e-commerce presence'],
      ['system', 'The entire connected brand system'],
      ['guidance', 'Not sure yet — we need senior studio guidance']
    ]
  },
  {
    id: 'event',
    type: 'single',
    title: "What's happening in the next 12 months?",
    help: 'The commercial catalyst driving this engagement.',
    options: [
      ['launching', 'Launching the business to the public'],
      ['skus', 'Expanding product range / launching new SKUs'],
      ['retail', 'Entering national or regional retail shelves'],
      ['international', 'Expanding internationally into new geographies'],
      ['reposition', 'Repositioning the company toward premium tiers'],
      ['capital', 'Raising institutional venture capital'],
      ['scale', 'Scaling up marketing spend on what is already working']
    ]
  },
  {
    id: 'timeline',
    type: 'single',
    title: 'When does this need to go live?',
    help: 'Realistic schedule to ensure creative and production readiness.',
    options: [
      ['30', 'Sprint window: within 30 days'],
      ['1-3', '1–3 months (standard sprint window)'],
      ['3-6', '3–6 months (planning ahead)'],
      ['flexible', 'Flexible / exploratory phase']
    ]
  },
  {
    id: 'budget',
    type: 'single',
    title: 'What level of investment have you planned for the brand?',
    help: 'Our comprehensive brand engagements begin at ₹4,75,000 ($4,960). This helps us architect realistic deliverables.',
    options: [
      ['u3', 'Under ₹3 lakh ($3,200)'],
      ['3-475', '₹3–4.75 lakh ($3,200–$4,960)'],
      ['475-7', '₹4.75–7 lakh ($4,960–$7,500)'],
      ['7-10', '₹7–10 lakh ($7,500–$10,500)'],
      ['10+', '₹10 lakh+ ($10,500+)'],
      ['undecided', 'Budget not finalised yet']
    ]
  },
  {
    id: 'outcome',
    type: 'text',
    title: 'If this project goes brilliantly, what changes for the business?',
    help: "In your own words — one or two sentences on what success feels like.",
    placeholder: 'For example: We enter retail looking undeniably credible beside established heritage brands, launch six new SKUs without fragmentation, and convert discerning customers at higher price points.'
  }
];

const STAGE_SHORT = {
  launch: 'Pre-launch',
  recent: 'Recently launched',
  established: 'Established brand',
  scaling: 'Scaling rapidly',
  retail: 'Entering new retail markets'
};

const EVENT_SHORT = {
  launching: 'Commercial brand launch',
  skus: 'Range & SKU extension',
  retail: 'Retail expansion',
  international: 'Global export expansion',
  reposition: 'Strategic repositioning',
  capital: 'Fundraising round',
  scale: 'Scaling customer acquisition'
};

const SCOPE_SHORT = {
  strategy: 'Brand strategy & positioning',
  identity: 'Visual identity system',
  packaging: 'Master packaging design',
  website: 'Website & digital experience',
  system: 'Full connected brand system',
  guidance: 'Comprehensive studio diagnostic'
};

const TIME_SHORT = {
  '30': 'Within 30 days',
  '1-3': '1–3 months',
  '3-6': '3–6 months',
  'flexible': 'Flexible'
};

const PRESSURE_LABEL = {
  price: 'Perceived value',
  interchangeable: 'Differentiation',
  inconsistent: 'Consistency',
  retail: 'Retail readiness',
  packaging: 'Tactile packaging impact',
  outgrown: 'Brand maturity',
  website: 'Digital credibility',
  unsure: 'Strategic clarity'
};

const ENGAGEMENTS = {
  foundation: {
    key: 'brand_foundation',
    name: 'Brand Foundation',
    price: '₹4,75,000 ($4,960)',
    weeks: '4–6 weeks',
    scope: [
      'Founder and commercial discovery',
      'Category & competitor audit',
      'Positioning & central brand narrative',
      'Messaging direction & tone of voice',
      'Full visual identity system (marks, type, color, grids)',
      'Brand guidelines & master vector vector files'
    ]
  },
  shelf: {
    key: 'brand_to_shelf',
    name: 'Brand-to-Shelf System',
    price: '₹4,75,000 ($4,960)',
    weeks: '6–8 weeks',
    scope: [
      'Brand strategy & positioning foundation',
      'Mathematical logomark & visual identity',
      'Packaging architecture & typography hierarchy',
      '1 master structural packaging system',
      '5 SKU adaptations & print-ready vector dielines',
      'Prepress printer review & material specifications'
    ]
  },
  market: {
    key: 'brand_to_market',
    name: 'Brand-to-Market (Identity + Pack + Web)',
    price: '₹6,50,000 – ₹10,00,000 ($6,780–$10,500)',
    weeks: '8–12 weeks',
    scope: [
      'Complete strategy, positioning & narrative',
      'Comprehensive visual identity architecture',
      'Master packaging system & production dielines',
      'Bespoke digital UI/UX design in Figma',
      'Custom web development (React / Shopify / Framer)',
      'Sub-second performance optimization & domain launch'
    ]
  }
};

const SYSTEMS = [
  { name: 'AFTER8®', cat: 'Personal Wellness', href: '/work/after8' },
  { name: 'LUMEN & CO.', cat: 'Fine Jewellery', href: '/work/lumen' },
  { name: 'ALDER ESSENTIALS', cat: 'Outdoor & Lifestyle', href: '/work/alder---outdoor-essentials-built-for-slower-movement' },
  { name: 'KRONA ARCHITECTURE', cat: 'Spatial Design', href: '/work/krona-architecture-studio' }
];

/* ─────────────────────────────────────────────────────────────────────────────
   Diagnosis Logic Engine
   ───────────────────────────────────────────────────────────────────────────── */
const FRAGMENTS = [
  {
    id: 'positioning',
    group: 'position',
    title: 'Positioning before polish',
    w: c => 3 * c.p('interchangeable') + 2 * c.p('price') + 3 * c.p('unsure') + 2 * c.p('outgrown') + 3 * (c.a.scope === 'strategy') + 2 * (c.a.scope === 'guidance') + 2 * (c.a.event === 'reposition') + 1,
    body: () => "Your answers show the core friction is not just aesthetic. The commercial reason to choose you must become instantly legible before adding more design layers. We define what your brand owns first, then engineer identity and packaging to prove it."
  },
  {
    id: 'crowded',
    group: 'position',
    title: 'Crowded categories reward radical clarity',
    w: c => 3 * c.p('interchangeable') * (['fnb', 'beauty', 'consumer', 'fashion'].indexOf(c.a.category) > -1 ? 1.5 : 1),
    body: () => "In crowded consumer categories, most players mimic the same packaging tropes. We deconstruct what competitors repeat, finding the exact uncontested whitespace where your brand looks distinct before anyone compares prices."
  },
  {
    id: 'diagnose',
    group: 'position',
    title: 'Start with an honest diagnostic',
    w: c => 4 * c.p('unsure') + 3 * (c.a.scope === 'guidance'),
    body: () => "Sensing that something is misaligned without pinpointing the exact cause is standard for ambitious founders. We audit your category, customer feedback, and current assets before writing a single line of design scope."
  },
  {
    id: 'system',
    group: 'system',
    title: "Engineer rules built for where you're going",
    w: c => 2 * (c.a.event === 'skus') + 2 * (c.a.event === 'retail') + 2 * (c.a.event === 'international') + 2 * (c.a.event === 'scale') + 2 * c.p('inconsistent') + 2 * (c.a.scope === 'system') + 1,
    body: c => `Fast growth requires design governance: an architectural system that survives ${c.surface}, quick-commerce thumbnails, digital ads, and the next twenty product extensions — not just isolated visual assets.`
  },
  {
    id: 'skus',
    group: 'system',
    title: 'More SKUs require systematic hierarchy',
    w: c => 3.5 * (c.a.event === 'skus') + c.p('inconsistent'),
    body: () => "Your first three products can tolerate slight variations. Your next twenty will not. Color coding, label architecture, and font scales must be mathematically solved once so every new release is faster and cheaper."
  },
  {
    id: 'value',
    group: 'value',
    title: 'Make internal value physically visible',
    w: c => 3 * c.p('price') + 2 * c.p('packaging') + (c.a.stage === 'established') + (c.a.scope === 'packaging' || c.a.scope === 'identity'),
    body: () => "If your product formulation is better than how it appears from the outside, our objective is to eliminate that perception gap. 'Premium' is not an arbitrary aesthetic — it is structural credibility that justifies healthy margins."
  },
  {
    id: 'packaging',
    group: 'value',
    title: 'The pack is your most permanent medium',
    w: c => 3 * c.p('packaging') + 2 * (c.a.scope === 'packaging'),
    body: () => "Packaging sits on customer kitchen counters, bathroom shelves, and unboxing feeds. If the physical box fails to communicate dignity, no digital ad budget can compensate. We solve structural dielines and visual hierarchy together."
  },
  {
    id: 'retail',
    group: 'market',
    title: 'Retail shelves penalise weak information hierarchy',
    w: c => 4 * (c.a.event === 'retail') + 3 * (c.a.stage === 'retail') + 2 * c.p('retail') + (c.a.event === 'skus'),
    body: () => "On a retail shelf or quick-commerce thumbnail, you have 1.2 seconds. Brand name, product tier, and the single reason to buy must register at glance-distance. We test your hierarchy rigorously before finalizing dielines."
  },
  {
    id: 'digital',
    group: 'digital',
    title: 'The website must convert the brand promise',
    w: c => 3 * c.p('website') + 3 * (c.a.scope === 'website'),
    body: () => "A website should not feel disconnected from physical packaging. We build high-speed digital experiences where typography, product photography, and checkout flows reinforce the exact same editorial confidence."
  }
];

const OPP = {
  price: "Close the perception gap between product quality and exterior branding, and price resistance disappears.",
  interchangeable: "When your brand owns one uncontested idea that rivals avoid, recognition compounds automatically with every marketing rupee.",
  inconsistent: "A unified system turns every campaign, packaging run, and social asset into compound equity rather than scattered effort.",
  retail: "A pack engineered for shelf distance secures immediate buyer trust and commands premium positioning in quick-commerce thumbnails.",
  packaging: "Tactile, considered packaging transforms one-time buyers into vocal brand advocates who display your product in their homes.",
  outgrown: "Retiring early makeshift design while preserving hard-earned customer recognition makes the brand look as established as your operations.",
  website: "A bespoke digital store matching physical quality converts curiosity into repeat customers on superior unit economics.",
  unsure: "With foundational strategic clarity locked in, every future hiring, copy, and campaign decision becomes significantly faster."
};

const RISK = {
  price: "Price resistance becomes entrenched. Customers compare you on cost because your exterior cues don't give them another reason.",
  interchangeable: "Competitors continue claiming the same space, making each customer acquisition incrementally more expensive.",
  inconsistent: "Adding channels while design rules are uncodified compounds fragmentation. Rebranding later costs 3x more due to existing inventory.",
  retail: "Retail buyers evaluate hundreds of submissions; confusing hierarchy gets overlooked in under two seconds.",
  packaging: "The product continues being judged by its container, forcing good reviews to battle an uninspired first impression.",
  outgrown: "The business operates within an identity designed for a seed experiment, creating cognitive friction with mature buyers.",
  website: "Paid traffic bounces before perceiving true product craft, lowering return on advertising spend.",
  unsure: "Without a clear central premise, every marketing initiative starts from scratch with unpredictable results."
};

function scoreModel(a) {
  const pr = a.problems || [];
  const P = k => pr.indexOf(k) > -1;
  const fit = v => Math.max(30, Math.min(94, Math.round(v)));

  let clarity = 84;
  if (P('interchangeable')) clarity -= 10;
  if (P('price')) clarity -= 7;
  if (P('unsure')) clarity -= 16;
  if (P('outgrown')) clarity -= 7;
  if (a.scope === 'strategy') clarity -= 6;
  if (a.scope === 'guidance') clarity -= 8;
  if (a.event === 'reposition') clarity -= 7;

  let distinct = 84;
  if (P('interchangeable')) distinct -= 20;
  if (P('price')) distinct -= 7;
  if (P('packaging')) distinct -= 10;
  if (P('inconsistent')) distinct -= 6;
  if (P('outgrown')) distinct -= 6;
  if (P('website')) distinct -= 3;
  if (P('unsure')) distinct -= 4;

  let system = 84;
  if (P('inconsistent')) system -= 17;
  if (P('packaging')) system -= 9;
  if (P('outgrown')) system -= 8;
  if (P('website')) system -= 3;
  if (P('retail')) system -= 4;
  if (a.event === 'skus') system -= 6;
  if (a.event === 'retail') system -= 6;
  if (a.event === 'international') system -= 6;

  clarity = fit(clarity);
  distinct = fit(distinct);
  system = fit(system);

  let pressure = { launch: 40, recent: 45, established: 60, scaling: 80, retail: 85 }[a.stage] || 45;
  pressure += { launching: 5, skus: 15, retail: 20, international: 25, reposition: 15, capital: 20, scale: 15 }[a.event] || 0;
  pressure += a.timeline === '30' ? 10 : a.timeline === '1-3' ? 5 : 0;
  pressure = Math.max(10, Math.min(100, pressure));

  let project = { u3: 15, '3-475': 35, '475-7': 75, '7-10': 90, '10+': 95, undecided: 50 }[a.budget] || 50;
  project += { '30': 10, '1-3': 8, '3-6': 4, flexible: 0 }[a.timeline] || 0;
  project = Math.max(10, Math.min(100, project));

  const raw = clarity * 0.30 + distinct * 0.30 + system * 0.40 - 0.08 * (pressure / 100) * (100 - system);
  const overall = Math.max(25, Math.min(94, Math.round(raw)));

  const band = overall >= 80 ? 'Well placed for the next stage'
             : overall >= 65 ? 'A strong foundation with system gaps'
             : overall >= 50 ? 'Visible tension across touchpoints'
             : 'Foundations require immediate senior attention';

  return { clarity, distinct, system, pressure, project, overall, band };
}

function recommendEngagement(a) {
  const pr = a.problems || [];
  const P = k => pr.indexOf(k) > -1;
  const physical = ['fnb', 'beauty', 'consumer', 'fashion', 'other'].indexOf(a.category) > -1;
  const wantsPack = physical && (['packaging', 'system', 'guidance'].indexOf(a.scope) > -1 || P('packaging') || P('retail') || ['retail', 'skus', 'launching'].indexOf(a.event) > -1);
  const wantsDigital = a.scope === 'website' || P('website') || (a.scope === 'system' && (a.budget === '7-10' || a.budget === '10+' || !physical));

  let key = 'foundation';
  if (wantsPack && wantsDigital) key = 'market';
  else if (wantsPack) key = 'shelf';
  else if (wantsDigital) key = 'market';

  const e = ENGAGEMENTS[key];
  return { key, ...e };
}

function diagnoseReport(a) {
  const pr = a.problems || [];
  const surface = { fnb: 'the shelf', beauty: 'the shelf', consumer: 'the shelf', fashion: 'the boutique & feed', hospitality: 'the venue & table', tech: 'the product & website', other: 'every customer touchpoint' }[a.category] || 'the shelf';
  const ctx = { a, surface, p: k => pr.indexOf(k) > -1 ? 1 : 0 };
  const scored = FRAGMENTS.map(f => ({ f, w: f.w(ctx) })).filter(x => x.w > 0).sort((x, y) => y.w - x.w);
  const out = [];
  const used = {};
  scored.forEach(x => {
    if (out.length < 3 && !used[x.f.group]) {
      out.push(x.f);
      used[x.f.group] = 1;
    }
  });
  return out.map(f => ({ title: f.title, body: f.body(ctx) }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shelf Evolution Graphic & Silhouettes (SVG Architecture)
   ───────────────────────────────────────────────────────────────────────────── */
const SHAPES = ['box', 'pouch', 'bottle', 'bag', 'carton', 'cup', 'device'];
const SHAPE_FOR = {
  fnb: 'pouch',
  beauty: 'bottle',
  fashion: 'bag',
  consumer: 'carton',
  hospitality: 'cup',
  tech: 'device',
  other: 'box'
};

function shapePath(s, cx) {
  const x0 = cx - 24;
  const x1 = cx + 24;
  const b = 118;
  switch (s) {
    case 'bottle':
      return `M${x0} ${b}V70Q${x0} 60 ${cx - 7} 58V30H${cx + 7}V58Q${x1} 60 ${x1} 70V${b}Z`;
    case 'pouch':
      return `M${x0} ${b}V46L${x0 + 6} 34H${x1 - 6}L${x1} 46V${b}Z`;
    case 'carton':
      return `M${x0} ${b}V54L${cx} 30L${x1} 54V${b}Z`;
    case 'cup':
      return `M${x0 - 3} 46H${x1 + 3}L${x1 - 6} ${b}H${x0 + 6}Z`;
    case 'device':
      return `M${x0 + 7} 36H${x1 - 7}Q${x1} 36 ${x1} 43V111Q${x1} ${b} ${x1 - 7} ${b}H${x0 + 7}Q${x0} ${b} ${x0} 111V43Q${x0} 36 ${x0 + 7} 36Z`;
    case 'bag':
      return `M${x0} ${b}V58H${x1}V${b}Z`;
    default:
      return `M${x0} ${b}V40H${x1}V${b}Z`;
  }
}

const STAGE_DESCRIPTIONS = [
  { num: '00', title: 'COMMODITY COMMERCE', desc: 'Plain unbranded commodity box. Zero distinction, lost in the retail shelf sea of sameness.' },
  { num: '01', title: 'PROPRIETARY SILHOUETTE', desc: 'Custom structural form factor established. Instant silhouette contrast on the shelf.' },
  { num: '02', title: 'SHELF PRESENCE & ELEVATION', desc: 'Tactile elevation & positioning that elevates the product into prime eye-level consideration.' },
  { num: '03', title: 'ARCHITECTURAL BRAND BAND', desc: 'High-contrast focal band grounds consumer gaze and establishes brand boundaries.' },
  { num: '04', title: 'TYPOGRAPHIC WORDMARK', desc: 'Distinctive logotype engineered for 3-meter retail legibility and digital app thumbnail clarity.' },
  { num: '05', title: 'OWNED CATEGORY COLOR', desc: 'Strategic color ownership signals premium tier and breaks through competitors.' },
  { num: '06', title: 'VARIANT RULES & SPECS', desc: 'Design system rules govern SKU extensions, ingredients, and regulatory dielines.' },
  { num: '07', title: 'MONOGRAM & QUALITY SEAL', desc: 'Tactile foil stamp and quality crest justify price points and build founder authority.' },
  { num: '08', title: 'COMPLETE COMMERCIAL SYSTEM', desc: 'End-to-end connected brand system engineered to scale seamlessly across packaging & digital.' }
];

function ShelfGraphic({ stage = 8, shape = 'bottle', uid = 'demo' }) {
  const EVO = 3; // Center slot out of 7 packs (index 3)
  const CELL = 720 / 7;

  return (
    <div className="shelf-svg-wrap">
      <svg
        className={`shelf ${Array.from({ length: stage }, (_, k) => `on-${k + 1}`).join(' ')}`}
        viewBox="0 0 720 132"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        {Array.from({ length: 7 }).map((_, i) => {
          const cx = CELL / 2 + i * CELL;
          const x0 = cx - 24;
          const x1 = cx + 24;

          if (i === EVO) {
            const d = shapePath(shape, cx);
            const clipId = `cp-${uid}-${shape}`;
            const isBag = shape === 'bag';

            return (
              <g key={i} className="evo">
                {/* 1. Plain commodity box that fades away at stage >= 1 */}
                <rect className="plain evo-plain" x={cx - 24} y={40} width={48} height={78} />

                {/* 2. Evolving proprietary shape */}
                <g className={`sh sh-${shape} ${stage >= 1 ? 'show' : ''}`} data-shape={shape}>
                  <defs>
                    <clipPath id={clipId}>
                      <path d={d} />
                    </clipPath>
                  </defs>

                  {/* Body background */}
                  <path className="body" d={d} />

                  {/* Clipped design system layers */}
                  <g clipPath={`url(#${clipId})`}>
                    {/* Layer 5: Tint accent */}
                    <rect className="ly ly5 tint" x={x0} y={24} width={48} height={42} />
                    {/* Layer 3: Contrast band */}
                    <rect className="ly ly3 band" x={x0} y={74} width={48} height={22} />
                    {/* Layer 4: Wordmark typography */}
                    <rect className="ly ly4 word" x={cx - 14} y={79} width={28} height={5} />
                    <rect className="ly ly4 word" x={cx - 9} y={88} width={18} height={2} />
                    {/* Layer 6: Structural rules */}
                    <path
                      className="ly ly6 rule"
                      d={`M${cx - 14} 103H${cx + 14}M${cx - 10} 109H${cx + 10}M${cx - 6} 115H${cx + 6}`}
                    />
                    {/* Layer 7: Quality seal */}
                    <circle className="ly ly7 seal" cx={cx} cy={48} r={5} />
                  </g>

                  {/* Outer edge */}
                  <path className="edge" d={d} />

                  {/* Bag handle */}
                  {isBag && (
                    <path
                      className="edge"
                      d={`M${cx - 10} 58V46Q${cx - 10} 36 ${cx} 36Q${cx + 10} 36 ${cx + 10} 46V58`}
                    />
                  )}

                  {/* Layer 8: Technical dimension marks */}
                  <path className="ly ly8 dim" d={`M${x0} 14H${cx + 24}M${x0} 8V20M${cx + 24} 8V20`} />
                  <text className="ly ly8 dim-txt" x={cx} y={11} textAnchor="middle">48mm</text>
                </g>
              </g>
            );
          }

          return (
            <rect
              key={i}
              className="plain"
              x={cx - 24}
              y={40}
              width={48}
              height={78}
            />
          );
        })}

        {/* Shelf floor line */}
        <line className="floor" x1="0" y1="121" x2="720" y2="121" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────────────────────────── */
export default function BrandReadiness() {
  const pageRef = useRef(null);
  useSEO();
  usePageAnimations(pageRef);

  const [view, setView] = useState('landing'); // 'landing' | 'quiz' | 'capture' | 'report' | 'project' | 'success'
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    category: '',
    stage: '',
    problems: [],
    scope: '',
    event: '',
    timeline: '',
    budget: '',
    outcome: ''
  });
  const [lead, setLead] = useState({ first: '', email: '', brand: '', website: '', whatsapp: '' });
  const [projectData, setProjectData] = useState({ launchDate: '', notes: '' });
  const [report, setReport] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animated shelf demo state
  const [demoStage, setDemoStage] = useState(0);
  const [demoShape, setDemoShape] = useState('bottle');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play demo evolution on landing page
  useEffect(() => {
    if (view !== 'landing' || !isAutoPlaying) return;

    let timerId;
    let stepCount = demoStage;

    const tick = () => {
      if (stepCount < 8) {
        stepCount += 1;
        setDemoStage(stepCount);
        timerId = setTimeout(tick, 450);
      } else {
        // Pause at stage 8 for 4 seconds, then loop smoothly
        timerId = setTimeout(() => {
          stepCount = 0;
          setDemoStage(0);
          timerId = setTimeout(tick, 900);
        }, 4000);
      }
    };

    timerId = setTimeout(tick, 600);
    return () => clearTimeout(timerId);
  }, [view, isAutoPlaying, demoShape]);

  const finishQuiz = (finalAnswers) => {
    const score = scoreModel(finalAnswers);
    const engagement = recommendEngagement(finalAnswers);
    const frags = diagnoseReport(finalAnswers);
    const primaryProb = (finalAnswers.problems && finalAnswers.problems[0]) || 'unsure';
    const rep = {
      score,
      engagement,
      frags,
      opp: OPP[primaryProb] || OPP.unsure,
      risk: RISK[primaryProb] || RISK.unsure,
      primaryProbLabel: PRESSURE_LABEL[primaryProb] || 'Clarity'
    };
    setReport(rep);
    setView('capture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (value) => {
    const q = QUESTIONS[step];
    if (q.type === 'single') {
      const updated = { ...answers, [q.id]: value };
      setAnswers(updated);
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        finishQuiz(updated);
      }
    } else if (q.type === 'multi') {
      const current = answers[q.id] || [];
      const exists = current.includes(value);
      let nextList = exists ? current.filter(x => x !== value) : [...current, value];
      if (!exists && nextList.length > q.max) {
        return;
      }
      setAnswers({ ...answers, [q.id]: nextList });
    }
  };

  const handleNextStep = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      finishQuiz(answers);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('landing');
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!lead.first || !lead.email || !lead.brand) {
      alert('Please provide your name, work email, and brand name.');
      return;
    }
    trackMetaFormSubmission({
      name: lead.first,
      email: lead.email,
      phone: lead.whatsapp,
      company: lead.brand,
      website: lead.website,
      services: report?.engagement?.name || 'Brand Readiness Diagnostic',
      budget: answers.budget,
      timeline: answers.timeline,
      primaryChallenge: report?.primaryProbLabel,
      message: `Lead from Step 8. Calculated Score: ${report?.score?.overall}/100`
    });
    setView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getQuestionOptionLabel = (questionId, value) => {
    const q = QUESTIONS.find(item => item.id === questionId);
    if (!q || !q.options) return value || 'N/A';
    const found = q.options.find(opt => opt[0] === value);
    return found ? found[1] : (value || 'N/A');
  };

  const getProblemsLabels = (problemKeys = []) => {
    if (!problemKeys || !problemKeys.length) return 'None specified';
    const q = QUESTIONS.find(item => item.id === 'problems');
    if (!q) return problemKeys.join(', ');
    return problemKeys
      .map(key => {
        const found = q.options.find(opt => opt[0] === key);
        return found ? found[1] : key;
      })
      .join('; ');
  };

  const buildBriefText = (channel = 'whatsapp') => {
    const primaryProb = (answers.problems && answers.problems[0]) || 'unsure';
    const probLabel = PRESSURE_LABEL[primaryProb] || 'Strategic Alignment';
    const scoreVal = report?.score?.overall ?? animatedScore;
    const bandText = report?.score?.band || 'Strategic Assessment Complete';
    const engagementName = report?.engagement?.name || 'Brand System';
    const investment = report?.engagement?.price || 'Standard Sprint';
    const timelineVal = getQuestionOptionLabel('timeline', answers.timeline);
    const categoryVal = getQuestionOptionLabel('category', answers.category);
    const stageVal = getQuestionOptionLabel('stage', answers.stage);
    const problemsVal = getProblemsLabels(answers.problems);
    const scopeVal = getQuestionOptionLabel('scope', answers.scope);
    const eventVal = getQuestionOptionLabel('event', answers.event);
    const budgetVal = getQuestionOptionLabel('budget', answers.budget);

    if (channel === 'whatsapp') {
      return [
        `Hello The Drawing Board!`,
        ``,
        `*BRAND READINESS & STRATEGIC SCOPE INQUIRY*`,
        ``,
        `*Client Contact:* ${lead.first}`,
        `*Work Email:* ${lead.email}`,
        `*Brand / Company:* ${lead.brand}`,
        `*Website / Social:* ${lead.website || 'N/A'}`,
        `*WhatsApp:* ${lead.whatsapp || 'N/A'}`,
        ``,
        `*DIAGNOSTIC READOUT*`,
        `*Overall Readiness Score:* ${scoreVal}/100 (${bandText})`,
        `*Category:* ${categoryVal}`,
        `*Current Stage:* ${stageVal}`,
        `*Critical Friction:* ${problemsVal}`,
        `*Creative Focus:* ${scopeVal}`,
        `*12-Month Horizon:* ${eventVal}`,
        `*Target Timeline:* ${timelineVal}`,
        `*Investment Budget:* ${budgetVal}`,
        answers.outcome ? `*Founder Vision:* "${answers.outcome}"` : '',
        ``,
        `*PROJECT SCOPE REQUEST*`,
        `*Recommended System:* ${engagementName} (${investment})`,
        `*Desired Launch Date:* ${projectData.launchDate || 'To be scheduled'}`,
        projectData.notes ? `*Project Notes:* ${projectData.notes}` : '',
        ``,
        `---`,
        `Submitted via The Drawing Board (Brand Readiness Diagnostic)`
      ].filter(Boolean).join('\n');
    }

    return [
      `BRAND READINESS & STRATEGIC SCOPE BRIEF — THE DRAWING BOARD`,
      `============================================================`,
      ``,
      `[01. CLIENT CONTACT]`,
      `Name: ${lead.first}`,
      `Work Email: ${lead.email}`,
      `Brand / Company: ${lead.brand}`,
      `Website / Social: ${lead.website || 'N/A'}`,
      `WhatsApp Phone: ${lead.whatsapp || 'N/A'}`,
      ``,
      `[02. PROJECT SCOPE REQUIREMENTS]`,
      `Desired Launch Date: ${projectData.launchDate || 'Not specified'}`,
      `Additional Notes / Context: ${projectData.notes || 'None provided'}`,
      ``,
      `[03. DIAGNOSTIC READOUT & SCORE]`,
      `Overall Readiness Score: ${scoreVal}/100`,
      `Strategic Band: ${bandText}`,
      `Recommended System: ${engagementName} (${investment})`,
      `Clarity & Strategic Narrative: ${report?.score?.clarity ?? 0}/100`,
      `Visual & Brand Distinctiveness: ${report?.score?.distinct ?? 0}/100`,
      `Design System Architecture: ${report?.score?.system ?? 0}/100`,
      ``,
      `[04. STEP-BY-STEP DIAGNOSTIC RESPONSES]`,
      `Step 1 (Category / Offering): ${categoryVal}`,
      `Step 2 (Commercial Stage): ${stageVal}`,
      `Step 3 (Critical Friction Points): ${problemsVal}`,
      `Step 4 (Creative Focus): ${scopeVal}`,
      `Step 5 (12-Month Commercial Horizon): ${eventVal}`,
      `Step 6 (Target Launch Timeline): ${timelineVal}`,
      `Step 7 (Strategic Investment Budget): ${budgetVal}`,
      `Step 8 (Founder Vision of Success): ${answers.outcome || 'N/A'}`,
      ``,
      `------------------------------------------------------------`,
      `Submitted via thedrawingboard.in/brand-readiness`
    ].filter(Boolean).join('\n');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      trackMetaFormSubmission({
        name: lead.first,
        email: lead.email,
        phone: lead.whatsapp,
        company: lead.brand,
        website: lead.website,
        services: report?.engagement?.name || 'Brand Readiness Diagnostic',
        budget: answers.budget,
        timeline: answers.timeline,
        primaryChallenge: report?.primaryProbLabel,
        message: `[Project Scope Request]\nScore: ${report?.score?.overall}/100 (${report?.score?.band})\nDesired Launch: ${projectData.launchDate || 'N/A'}\nNotes: ${projectData.notes || 'N/A'}\nFounder Vision: ${answers.outcome || 'N/A'}`
      });
    } catch (err) {
      console.warn('Meta tracking error:', err);
    }

    try {
      const scoreVal = report?.score?.overall ?? animatedScore;
      const bandText = report?.score?.band || 'Strategic Assessment Complete';
      const engagementName = report?.engagement?.name || 'Brand System';
      const investment = report?.engagement?.price || 'Standard Sprint';
      const timelineVal = getQuestionOptionLabel('timeline', answers.timeline);
      const categoryVal = getQuestionOptionLabel('category', answers.category);
      const stageVal = getQuestionOptionLabel('stage', answers.stage);
      const problemsVal = getProblemsLabels(answers.problems);
      const scopeVal = getQuestionOptionLabel('scope', answers.scope);
      const eventVal = getQuestionOptionLabel('event', answers.event);
      const budgetVal = getQuestionOptionLabel('budget', answers.budget);

      const payload = {
        _subject: `New Project Scope Brief: ${lead.brand || 'Brand'} — ${lead.first || 'Client'} (Score: ${scoreVal}/100)`,
        _template: "table",
        _captcha: "false",
        "Client Name": lead.first || 'N/A',
        "Work Email": lead.email || 'N/A',
        "Brand / Company": lead.brand || 'N/A',
        "Website or Social": lead.website || 'Not provided',
        "WhatsApp Phone": lead.whatsapp || 'Not provided',
        "Desired Launch Date": projectData.launchDate || 'Not specified',
        "Project Notes / Context": projectData.notes || 'None provided',
        "Overall Readiness Score": `${scoreVal} / 100 (${bandText})`,
        "Recommended Engagement": `${engagementName} — ${investment}`,
        "Estimated Timeline": report?.engagement?.weeks || 'Standard Sprint',
        "Clarity & Strategic Narrative": `${report?.score?.clarity ?? 0} / 100`,
        "Visual & Brand Distinctiveness": `${report?.score?.distinct ?? 0} / 100`,
        "Design System Architecture": `${report?.score?.system ?? 0} / 100`,
        "Step 1 - Core Category": categoryVal,
        "Step 2 - Commercial Stage": stageVal,
        "Step 3 - Critical Friction Points": problemsVal,
        "Step 4 - Creative Focus Area": scopeVal,
        "Step 5 - 12-Month Commercial Horizon": eventVal,
        "Step 6 - Target Launch Timeline": timelineVal,
        "Step 7 - Planned Investment Budget": budgetVal,
        "Step 8 - Founder Vision of Success": answers.outcome || 'N/A',
        "Complete Formatted Brief": buildBriefText('email')
      };

      await fetch("https://formsubmit.co/ajax/25c2139e28176433a33351a4cfeeac2b", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Email dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setView('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard shortcut listener for questions (1-9)
  useEffect(() => {
    if (view !== 'quiz') return;
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
      const num = parseInt(e.key, 10);
      const q = QUESTIONS[step];
      if (q && q.type === 'single' && num >= 1 && num <= q.options.length) {
        e.preventDefault();
        handleSelectOption(q.options[num - 1][0]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, step, answers, handleSelectOption]);

  // Animated score counter on report view
  useEffect(() => {
    if (view === 'report' && report) {
      const target = report.score.overall;
      let start = 0;
      const stepTime = 16;
      const totalSteps = 45;
      const increment = target / totalSteps;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setAnimatedScore(target);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [view, report]);

  const handleStartQuiz = () => {
    setView('quiz');
    setStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStickyCTAConfig = () => {
    switch (view) {
      case 'landing':
        return {
          title: "Brand Readiness",
          subtitle: "8-Step Diagnostic",
          buttonText: "Start",
          onClick: handleStartQuiz
        };
      case 'quiz':
        return {
          title: `Step 0${step + 1} of 08`,
          subtitle: "Diagnostic",
          buttonText: "WhatsApp",
          link: WHATSAPP_URL
        };
      case 'capture':
        return {
          title: "Diagnostic Complete",
          subtitle: "Scope Request",
          buttonText: "WhatsApp",
          link: WHATSAPP_URL
        };
      case 'report':
        return {
          title: `Score: ${report?.score?.overall ?? 0}/100`,
          subtitle: "From ₹4,75,000",
          buttonText: "Get Scope",
          onClick: () => {
            setView('project');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        };
      case 'project':
        return {
          title: "Project Scope",
          subtitle: "Custom Sprints",
          buttonText: "Discuss",
          link: DISCUSS_URL
        };
      case 'success':
        return {
          title: "Brief Received",
          subtitle: "Studio Review",
          buttonText: "WhatsApp",
          link: WHATSAPP_URL
        };
      default:
        return {
          title: "From ₹4,75,000",
          subtitle: "Brand Diagnostic",
          buttonText: "Discuss",
          link: DISCUSS_URL
        };
    }
  };

  const stickyConfig = getStickyCTAConfig();

  const currentQ = QUESTIONS[step];
  const isMulti = currentQ?.type === 'multi';
  const currentMultiSelected = (answers[currentQ?.id] || []);

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <div ref={pageRef} className="brand-readiness-page">
        <main className="br-main">
          <div className="wrap">
            {/* ════════════════════════════════════════════════════════════════
                VIEW 1: LANDING
               ════════════════════════════════════════════════════════════════ */}
            {view === 'landing' && (
              <section className="bp-hero br-landing-hero">
                {/* Header Sheet Label */}
                <div className="bp-sheet-label">
                  <span className="bp-sheet-right mono">SENIOR STUDIO DIAGNOSTIC // 0–100 READOUT</span>
                  <span className="rule"></span>
                </div>

                <div className="bp-avail">
                  <span className="bp-dot" aria-hidden="true" />
                  <span>8 strategic questions · Real-time readiness scoring · Senior studio diagnostic</span>
                </div>

                <h1>
                  Is your brand ready for its <em>next stage of growth?</em>
                </h1>

                <div className="bp-hero-grid">
                  <div>
                    <p className="bp-hero-sub">
                      Eight strategic questions about where your brand is today, where it’s going, and what’s causing friction. We calculate your readiness score and recommend where our studio would focus first.
                    </p>
                    <p className="bp-hero-sub">
                      Benchmarked against real consumer brand deployments across food &amp; beverage, beauty, fashion, and lifestyle.
                    </p>
                    <div className="bp-cta-row">
                      <button
                        type="button"
                        className="bp-btn-primary"
                        onClick={() => { setView('quiz'); setStep(0); }}
                      >
                        Check My Brand <ArrowIcon size={14} />
                      </button>
                      <a
                        href={DISCUSS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bp-btn-secondary"
                      >
                        Discuss a Project <ArrowIcon size={14} />
                      </a>
                    </div>
                    <p className="bp-price-note">
                      Free 2-minute diagnostic · Instant calculated readout · Engagements begin at <b>$4,960 (₹4,75,000)</b>
                    </p>
                  </div>

                  <div className="bp-annot-card">
                    <div className="corner" aria-hidden="true"></div>
                    <div className="bp-annot-title mono">Diagnostic Specification // Studio Model</div>
                    <div className="bp-annot-row"><span>Time Required</span><span>~2 Minutes</span></div>
                    <div className="bp-annot-row"><span>Diagnostic Steps</span><span>08 Questions</span></div>
                    <div className="bp-annot-row"><span>Readout Model</span><span>Scored 0–100 + Fit</span></div>
                    <div className="bp-annot-row"><span>Senior Review</span><span>Partner Level</span></div>
                    <div className="bp-annot-row"><span>Starting Scope</span><span>₹4.75L+ ($4,960)</span></div>
                    <div className="bp-annot-row"><span>Instant Deliverable</span><span>Custom Scope Plan</span></div>
                  </div>
                </div>

                {/* Architectural Stat Strip */}
                <div className="bp-stat-strip">
                  <div className="bp-stat"><div className="num">08</div><div className="lbl mono">Strategic Questions</div></div>
                  <div className="bp-stat"><div className="num">02m</div><div className="lbl mono">Estimated Duration</div></div>
                  <div className="bp-stat"><div className="num">100</div><div className="lbl mono">Point Precision Scoring</div></div>
                  <div className="bp-stat"><div className="num">₹4.75L</div><div className="lbl mono">Starting Scope ($4,960)</div></div>
                </div>

                {/* Category & Silhouette Selector Strip */}
                <div className="category-strip" style={{ marginTop: '48px', marginBottom: '28px' }}>
                  <div className="wrap" style={{ padding: 0 }}>
                    <span className="lbl2 mono">CALIBRATED FOR AMBITIOUS CONSUMER BRANDS // CLICK TO PREVIEW FORMAT</span>
                    <div className="category-row">
                      {[
                        { cat: 'beauty', label: 'Beauty & Skincare (Bottle)', shape: 'bottle' },
                        { cat: 'fnb', label: 'Food & Beverage (Pouch)', shape: 'pouch' },
                        { cat: 'consumer', label: 'Consumer Goods (Carton)', shape: 'carton' },
                        { cat: 'hospitality', label: 'Hospitality (Cup)', shape: 'cup' },
                        { cat: 'fashion', label: 'Fashion & Luxury (Bag)', shape: 'bag' },
                        { cat: 'tech', label: 'Hardware & Tech (Device)', shape: 'device' },
                        { cat: 'other', label: 'Artisanal & Gifting (Box)', shape: 'box' },
                      ].map(item => (
                        <button
                          key={item.cat}
                          type="button"
                          className={`cat-pill mono ${demoShape === item.shape ? 'active' : ''}`}
                          onClick={() => {
                            setDemoShape(item.shape);
                            setDemoStage(0);
                            setIsAutoPlaying(true);
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated Editorial Shelf Graphic (Real SVG Bottle/Pack Architecture) */}
                <div className="br-shelf-container">
                  <div className="br-shelf-header">
                    <div>
                      <div className="mono br-shelf-tag">FIG 01. / SHELF STANDOUT EVOLUTION — FROM COMMODITY TO SYSTEM</div>
                      <h3 className="br-shelf-sub">Seven packs on the retail shelf. One of them knows what it is.</h3>
                    </div>
                    <div className="br-shelf-controls">
                      <span className="mono br-shelf-stage-counter">
                        STAGE {String(demoStage).padStart(2, '0')} / 08
                      </span>
                      <button
                        type="button"
                        className="shelf-btn mono"
                        onClick={() => {
                          setDemoStage(0);
                          setIsAutoPlaying(true);
                        }}
                        title="Replay evolution sequence"
                      >
                        ↺ Replay Evolution
                      </button>
                    </div>
                  </div>

                  {/* Real Animated SVG Shelf Graphic */}
                  <ShelfGraphic stage={demoStage} shape={demoShape} uid="landing" />

                  {/* Interactive Evolution Stepper & Stage Description */}
                  <div className="br-shelf-status">
                    <div className="br-stage-bar">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`br-stage-step ${demoStage >= i ? 'active' : ''} ${demoStage === i ? 'current' : ''}`}
                          onClick={() => {
                            setIsAutoPlaying(false);
                            setDemoStage(i);
                          }}
                          title={`Jump to Stage ${i}`}
                        >
                          <span className="mono">0{i}</span>
                        </button>
                      ))}
                    </div>
                    <div className="br-stage-desc mono">
                      <strong>{STAGE_DESCRIPTIONS[demoStage]?.title}:</strong> {STAGE_DESCRIPTIONS[demoStage]?.desc}
                    </div>
                  </div>
                </div>

                {/* Selected Systems */}
                <div className="br-systems-strip">
                  <div className="bp-sheet-label" style={{ marginBottom: '16px' }}>
                    <span className="bp-sheet-right mono">BENCHMARKED CLIENT SYSTEMS // REAL PROVEN COMMERCIAL OUTCOMES</span>
                    <span className="rule"></span>
                  </div>
                  <div className="br-systems-grid">
                    {SYSTEMS.map((s, idx) => (
                      <Link key={idx} to={s.href} className="br-system-card">
                        <span className="br-sys-name">{s.name}</span>
                        <span className="mono br-sys-cat">{s.cat} →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 2: QUIZ
               ════════════════════════════════════════════════════════════════ */}
            {view === 'quiz' && currentQ && (
              <section className="br-quiz-section">
                <div className="bp-sheet-label">
                  <span className="bp-sheet-right mono">DIAGNOSTIC IN PROGRESS // QUESTION {String(step + 1).padStart(2, '0')} OF 08</span>
                  <span className="rule"></span>
                </div>

                {/* Progress bar */}
                <div className="br-progress-header">
                  <div className="mono br-progress-count">
                    PROGRESS // STEP {String(step + 1).padStart(2, '0')} / 08
                  </div>
                  <div className="br-progress-ticks">
                    {QUESTIONS.map((_, i) => (
                      <span
                        key={i}
                        className={`br-tick ${i < step ? 'done' : i === step ? 'now' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="br-quiz-card">
                  <div className="corner" aria-hidden="true"></div>
                  <div className="br-qgrid">
                    <div className="br-qnum mono">
                      {String(step + 1).padStart(2, '0')}
                      <small>/ 08</small>
                    </div>

                    <div className="br-qcontent">
                      <h2 className="br-qtitle">{currentQ.title}</h2>
                      {currentQ.help && <p className="br-qhelp">{currentQ.help}</p>}

                      {/* Options or Textarea */}
                      {currentQ.type === 'text' ? (
                        <div className="br-text-block">
                          <textarea
                            className="br-outcome-textarea"
                            rows={5}
                            placeholder={currentQ.placeholder}
                            value={answers.outcome}
                            onChange={(e) => setAnswers({ ...answers, outcome: e.target.value })}
                          />
                          <div className="bp-cta-row" style={{ marginTop: '24px' }}>
                            <button
                              type="button"
                              className="bp-btn-primary"
                              onClick={handleNextStep}
                            >
                              Build My Readout <ArrowIcon size={14} />
                            </button>
                            <button
                              type="button"
                              className="btn-secondary-cta"
                              onClick={handlePrevStep}
                            >
                              ← Back
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="br-options-block">
                          <ul className="br-opts-list">
                            {currentQ.options.map(([optVal, optLabel], i) => {
                              const isSelected = isMulti
                                ? currentMultiSelected.includes(optVal)
                                : answers[currentQ.id] === optVal;
                              return (
                                <li key={optVal}>
                                  <button
                                    type="button"
                                    className={`br-opt-btn ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleSelectOption(optVal)}
                                  >
                                    <span className="mono br-opt-key">
                                      [{String(i + 1).padStart(2, '0')}]
                                    </span>
                                    <span className="br-opt-label">{optLabel}</span>
                                    <span className="br-opt-marker">
                                      {isSelected ? '✓' : '—'}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>

                          {isMulti && (
                            <div className="br-multi-note mono">
                              {currentMultiSelected.length} of {currentQ.max} selected
                            </div>
                          )}

                          <div className="bp-cta-row" style={{ marginTop: '28px' }}>
                            {isMulti && (
                              <button
                                type="button"
                                className="bp-btn-primary"
                                disabled={currentMultiSelected.length === 0}
                                onClick={handleNextStep}
                              >
                                Continue <ArrowIcon size={14} />
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn-secondary-cta"
                              onClick={handlePrevStep}
                            >
                              ← Back
                            </button>
                          </div>

                          <p className="mono br-tip-note">
                            Tip: You can use your keyboard numbers (1–{currentQ.options.length}) to pick an option.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live System Specification & Packaging Shelf */}
                <div className="br-quiz-shelf-container">
                  <div className="mono br-quiz-shelf-tag">
                    LIVE SYSTEM SPEC // STAGE {String(step + 1).padStart(2, '0')} OF 08 — {SHAPE_FOR[answers.category] || 'bottle'}.svg
                  </div>
                  <ShelfGraphic
                    stage={step + 1}
                    shape={SHAPE_FOR[answers.category] || 'bottle'}
                    uid="quiz"
                  />
                  <div className="mono br-quiz-shelf-caption">
                    <strong>{STAGE_DESCRIPTIONS[step + 1]?.title}:</strong> {STAGE_DESCRIPTIONS[step + 1]?.desc}
                  </div>
                </div>
              </section>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 3: LEAD CAPTURE
               ════════════════════════════════════════════════════════════════ */}
            {view === 'capture' && (
              <section className="br-capture-section">
                <div className="bp-sheet-label">
                  <span className="bp-sheet-right mono">DIAGNOSTIC CALCULATION // SCORES COMPILED // FINAL STEP</span>
                  <span className="rule"></span>
                </div>

                <div className="br-capture-card">
                  <div className="corner" aria-hidden="true"></div>
                  <span className="mono br-card-tag">
                    08 / 08 QUESTIONS COMPLETE // SYSTEM SCORING READY
                  </span>
                  <h2 className="br-card-title">
                    Your strategic brand readout is calculated.
                  </h2>
                  <p className="br-card-desc">
                    Enter your details to generate your tailored readiness score, field diagnosis notes, and custom project scope recommendations immediately.
                  </p>

                  <form onSubmit={handleLeadSubmit} className="br-capture-form">
                    <div className="br-fields-grid">
                      <div className="field-group">
                        <label className="mono" htmlFor="first">Founder / Lead Name *</label>
                        <input
                          id="first"
                          type="text"
                          required
                          placeholder="e.g. Maya Sharma"
                          value={lead.first}
                          onChange={(e) => setLead({ ...lead, first: e.target.value })}
                        />
                      </div>

                      <div className="field-group">
                        <label className="mono" htmlFor="email">Work Email *</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="e.g. maya@yourbrand.com"
                          value={lead.email}
                          onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        />
                      </div>

                      <div className="field-group">
                        <label className="mono" htmlFor="brand">Brand / Company Name *</label>
                        <input
                          id="brand"
                          type="text"
                          required
                          placeholder="e.g. Lumien Botanical"
                          value={lead.brand}
                          onChange={(e) => setLead({ ...lead, brand: e.target.value })}
                        />
                      </div>

                      <div className="field-group">
                        <label className="mono" htmlFor="website">Website or Instagram (optional)</label>
                        <input
                          id="website"
                          type="text"
                          placeholder="e.g. @yourbrand or website.com"
                          value={lead.website}
                          onChange={(e) => setLead({ ...lead, website: e.target.value })}
                        />
                      </div>

                      <div className="field-group full-width">
                        <label className="mono" htmlFor="whatsapp">WhatsApp Number (optional)</label>
                        <input
                          id="whatsapp"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={lead.whatsapp}
                          onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="bp-cta-row" style={{ marginTop: '28px' }}>
                      <button type="submit" className="bp-btn-primary">
                        Show My Brand Readout <ArrowIcon size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-secondary-cta"
                        onClick={() => { setView('quiz'); setStep(7); }}
                      >
                        ← Back to questions
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 4: REPORT / DIAGNOSIS
               ════════════════════════════════════════════════════════════════ */}
            {view === 'report' && report && (
              <section className="br-report-section">
                <div className="bp-sheet-label">
                  <span className="bp-sheet-right mono">{lead.brand?.toUpperCase() || 'BRAND'} // STRATEGIC READOUT // SCORE: {animatedScore}/100</span>
                  <span className="rule"></span>
                </div>

                <div className="br-report-header">
                  <div>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--pine)', fontWeight: 700, letterSpacing: '1px' }}>
                      THE DRAWING BOARD // STRATEGIC READOUT // {new Date().getFullYear()}
                    </span>
                    <h2 className="br-report-title">
                      Brand Readout: <em>{lead.brand || 'Your Brand'}</em>
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="btn-secondary-cta"
                    onClick={() => window.print()}
                  >
                    Save as PDF ⤓
                  </button>
                </div>

                {/* Facts Strip */}
                <dl className="br-facts-grid">
                  <div className="br-fact"><dt className="mono">Brand</dt><dd>{lead.brand || '—'}</dd></div>
                  <div className="br-fact"><dt className="mono">Current Stage</dt><dd>{STAGE_SHORT[answers.stage] || '—'}</dd></div>
                  <div className="br-fact"><dt className="mono">Primary Pressure</dt><dd>{report.primaryProbLabel}</dd></div>
                  <div className="br-fact"><dt className="mono">Current Focus</dt><dd>{SCOPE_SHORT[answers.scope] || '—'}</dd></div>
                  <div className="br-fact"><dt className="mono">12-Mo Catalyst</dt><dd>{EVENT_SHORT[answers.event] || '—'}</dd></div>
                  <div className="br-fact"><dt className="mono">Timeline</dt><dd>{TIME_SHORT[answers.timeline] || '—'}</dd></div>
                </dl>

                {/* Score Block */}
                <div className="br-score-card">
                  <div className="corner" aria-hidden="true"></div>
                  <div className="br-score-left">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                      OVERALL READINESS SCORE
                    </span>
                    <div className="br-score-display">
                      <span className="br-score-num">{animatedScore}</span>
                      <span className="br-score-max mono">/ 100</span>
                    </div>
                    <div className="br-score-band">{report.score.band}</div>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginTop: '8px' }}>
                      Calculated from clarity, distinctiveness, and systematic scalability.
                    </p>
                  </div>

                  <div className="br-score-right">
                    <div className="br-dim-group">
                      <div className="mono br-dim-head">SCORED DIMENSIONS</div>
                      <div className="br-dim-row">
                        <span>Clarity &amp; Positioning</span>
                        <div className="br-dim-bar"><i style={{ width: `${report.score.clarity}%` }}></i></div>
                        <span className="mono">{report.score.clarity}%</span>
                      </div>
                      <div className="br-dim-row">
                        <span>Distinctiveness</span>
                        <div className="br-dim-bar"><i style={{ width: `${report.score.distinct}%` }}></i></div>
                        <span className="mono">{report.score.distinct}%</span>
                      </div>
                      <div className="br-dim-row">
                        <span>System Readiness</span>
                        <div className="br-dim-bar"><i style={{ width: `${report.score.system}%` }}></i></div>
                        <span className="mono">{report.score.system}%</span>
                      </div>
                    </div>

                    <div className="br-dim-group" style={{ marginTop: '18px' }}>
                      <div className="mono br-dim-head">CONTEXTUAL METRICS</div>
                      <div className="br-dim-row">
                        <span>Growth Pressure</span>
                        <div className="br-dim-bar bar-accent"><i style={{ width: `${report.score.pressure}%` }}></i></div>
                        <span className="mono">{report.score.pressure}%</span>
                      </div>
                      <div className="br-dim-row">
                        <span>Project Preparedness</span>
                        <div className="br-dim-bar bar-accent"><i style={{ width: `${report.score.project}%` }}></i></div>
                        <span className="mono">{report.score.project}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder Vision Outcome Quote */}
                {answers.outcome && (
                  <div className="br-outcome-quote">
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--pine)', fontWeight: 700 }}>
                      FOUNDER’S DEFINITION OF SUCCESS
                    </span>
                    <blockquote>“{answers.outcome}”</blockquote>
                  </div>
                )}

                {/* Strategic Field Notes */}
                <div className="br-field-notes">
                  <div className="bp-sheet-label">
                    <span className="tag mono">STRATEGIC FIELD NOTES // WHERE WE’D START</span>
                    <span className="rule"></span>
                    <span className="bp-sheet-right mono">OBSERVATIONS &amp; RECOMMENDATIONS</span>
                  </div>

                  <div className="br-frags-list">
                    {report.frags.map((frag, idx) => (
                      <div key={idx} className="br-frag-card">
                        <div className="br-frag-num mono">0{idx + 1}</div>
                        <div className="br-frag-body">
                          <h3>{frag.title}</h3>
                          <p>{frag.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opportunity vs Risk */}
                <div className="br-opp-risk-grid">
                  <div className="br-opp-card">
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--pine)', fontWeight: 700 }}>
                      // THE UPSIDE OPPORTUNITY
                    </div>
                    <p>{report.opp}</p>
                  </div>
                  <div className="br-risk-card">
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--marker)', fontWeight: 700 }}>
                      // IF LEFT UNADDRESSED
                    </div>
                    <p>{report.risk}</p>
                  </div>
                </div>

                {/* Recommended Engagement Card */}
                <div className="br-recommended-card">
                  <div className="corner"></div>
                  <div className="mono" style={{ fontSize: '11px', color: '#8EC4B3', fontWeight: 700, letterSpacing: '1px' }}>
                    RECOMMENDED STUDIO ENGAGEMENT FOR {lead.brand?.toUpperCase() || 'YOUR BRAND'}
                  </div>
                  <h3 className="br-rec-title">{report.engagement.name}</h3>

                  <div className="br-rec-grid">
                    <ul className="br-rec-deliverables">
                      {report.engagement.scope.map((item, i) => (
                        <li key={i}>
                          <span className="mono" style={{ color: '#8EC4B3', marginRight: '8px' }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="br-rec-meta">
                      <div className="br-rec-stat">
                        <span className="mono">Investment</span>
                        <b>{report.engagement.price}</b>
                      </div>
                      <div className="br-rec-stat">
                        <span className="mono">Typical Sprint Schedule</span>
                        <b>{report.engagement.weeks}</b>
                      </div>
                      <div className="br-rec-stat">
                        <span className="mono">Deliverable Standards</span>
                        <b>100% vector IP ownership</b>
                      </div>
                    </div>
                  </div>

                  <div className="bp-cta-row" style={{ marginTop: '32px' }}>
                    <button
                      type="button"
                      className="bp-btn-primary"
                      onClick={() => setView('project')}
                    >
                      Request Project Scope <ArrowIcon size={14} />
                    </button>
                    <a
                      href={DISCUSS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bp-btn-secondary bp-btn-secondary--light"
                    >
                      Discuss Your Project (Google Form) <ArrowIcon size={14} />
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 5: PROJECT SCOPE REQUEST
               ════════════════════════════════════════════════════════════════ */}
            {view === 'project' && (
              <section className="br-project-section">
                <div className="bp-sheet-label">
                  <span className="bp-sheet-right mono">FORMAL ENGAGEMENT INQUIRY // DIRECT PRINCIPAL REVIEW</span>
                  <span className="rule"></span>
                </div>

                <div className="br-capture-card">
                  <div className="corner"></div>
                  <span className="mono br-card-tag">
                    FORMAL STUDIO ENGAGEMENT INQUIRY
                  </span>
                  <h2 className="br-card-title">
                    Request project scope for {lead.brand || 'your brand'}.
                  </h2>
                  <p className="br-card-desc">
                    Your diagnostic answers and recommended engagement ({report?.engagement?.name}) will be directly reviewed by our studio team.
                  </p>

                  <form onSubmit={handleProjectSubmit} className="br-capture-form">
                    <div className="br-fields-grid">
                      <div className="field-group">
                        <label className="mono">Name *</label>
                        <input
                          type="text"
                          required
                          value={lead.first}
                          onChange={(e) => setLead({ ...lead, first: e.target.value })}
                        />
                      </div>

                      <div className="field-group">
                        <label className="mono">Work Email *</label>
                        <input
                          type="email"
                          required
                          value={lead.email}
                          onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        />
                      </div>

                      <div className="field-group">
                        <label className="mono">Brand or Company *</label>
                        <input
                          type="text"
                          required
                          value={lead.brand}
                          onChange={(e) => setLead({ ...lead, brand: e.target.value })}
                        />
                      </div>

                      <div className="field-group">
                        <label className="mono">Desired Launch Date</label>
                        <input
                          type="text"
                          placeholder="e.g. Q3 2026 or October"
                          value={projectData.launchDate}
                          onChange={(e) => setProjectData({ ...projectData, launchDate: e.target.value })}
                        />
                      </div>

                      <div className="field-group full-width">
                        <label className="mono">Additional Context or Specific Notes</label>
                        <textarea
                          rows={4}
                          placeholder="Anything specific we should know regarding SKUs, existing brand history, or manufacturer deadlines?"
                          value={projectData.notes}
                          onChange={(e) => setProjectData({ ...projectData, notes: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="bp-cta-row" style={{ marginTop: '28px' }}>
                      <button type="submit" className="bp-btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Transmitting Scope... <ArrowIcon size={14} /></>
                        ) : (
                          <>Request Project Scope <ArrowIcon size={14} /></>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn-secondary-cta"
                        onClick={() => setView('report')}
                      >
                        ← Back to report
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 6: SUCCESS / CONFIRMATION
               ════════════════════════════════════════════════════════════════ */}
            {view === 'success' && (
              <section className="br-success-section">
                <div className="bp-sheet-label">
                  <span className="bp-sheet-right mono">INQUIRY CONFIRMED // STATUS: RECEIVED</span>
                  <span className="rule"></span>
                </div>

                <div className="br-capture-card" style={{ textAlign: 'center', padding: '60px 30px' }}>
                  <div className="corner"></div>
                  <span className="mono br-card-tag">
                    INQUIRY RECEIVED // CONFIRMATION
                  </span>
                  <h2 className="br-card-title" style={{ marginTop: '16px' }}>
                    Thank you, {lead.first || 'there'}.
                  </h2>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '18px', maxWidth: '620px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                    Your strategic brief and project details have been successfully received. Our studio team will review your requirements and reach out to <b>{lead.email}</b>.
                  </p>
                  <p style={{ color: 'var(--ink)', fontSize: '14.5px', fontWeight: 600, marginBottom: '24px' }}>
                    Want immediate direct discussion? Dispatch your full diagnostic brief straight to our studio:
                  </p>
                  <div className="bp-cta-row" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBriefText('whatsapp'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bp-btn-primary"
                    >
                      Send Brief via WhatsApp <ArrowIcon size={14} />
                    </a>
                    <a
                      href={DISCUSS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-cta"
                    >
                      Google Inquiry Form <ArrowIcon size={14} />
                    </a>
                    <Link to="/" className="btn-secondary-cta">
                      Return Home
                    </Link>
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* Landing Pre-Footer Sections (Full-Width, matching Home & Branding pages) */}
          {view === 'landing' && (
            <>
              <MoreServicesSection current="branding" />

              <section className="br-landing-final-cta" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '80px 0', borderTop: '1px solid var(--ink)' }}>
                <div className="wrap">
                  <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 44px)', marginBottom: '14px', color: 'var(--paper)', maxWidth: '720px', fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
                    Your next stage should not inherit the limitations of your first brand.
                  </h2>
                  <p style={{ color: '#C9C3B4', fontSize: '16px', marginBottom: '28px', maxWidth: '560px', lineHeight: 1.6 }}>
                    Tell us what you are launching, changing or preparing to scale. Run through the Brand Diagnostic or dispatch your requirements directly to our studio team.
                  </p>
                  <div className="bp-cta-row" style={{ marginTop: '24px', marginBottom: '16px' }}>
                    <button
                      type="button"
                      onClick={handleStartQuiz}
                      className="bp-btn-primary"
                    >
                      Start Brand Diagnostic <ArrowIcon size={14} />
                    </button>
                    <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer" className="bp-btn-secondary bp-btn-secondary--light">
                      Discuss Your Project <ArrowIcon size={14} />
                    </a>
                  </div>
                  <p className="bp-price-note" style={{ color: '#C9C3B4', fontSize: '13px', fontFamily: "'IBM Plex Mono', monospace", margin: 0 }}>
                    Engagements begin at <b style={{ color: '#ffffff' }}>$4,960 (₹4,75,000)</b>.
                  </p>
                </div>
              </section>
            </>
          )}
        </main>

        {/* ── Dynamic Contextual Sticky Mobile CTA Bar ── */}
        <StickyMobileCTA
          title={stickyConfig.title}
          subtitle={stickyConfig.subtitle}
          buttonText={stickyConfig.buttonText}
          link={stickyConfig.link}
          onClick={stickyConfig.onClick}
        />

        <Footer />

        {/* ── Scoped Styling for Brand Readiness ── */}
        <style>{`
          .brand-readiness-page {
            background-color: var(--paper);
            color: var(--ink);
            min-height: 100vh;
          }

          .br-main {
            padding-top: 24px;
            padding-bottom: 0;
          }
          .br-main > .wrap {
            padding-bottom: 60px;
          }

          /* Sheet Label & Availability Badge */
          .bp-sheet-label { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
          .bp-sheet-label .tag { font-size: 12px; padding: 6px 10px; border: 1px solid var(--ink); background: var(--card); font-family: 'IBM Plex Mono', monospace; text-transform: uppercase; }
          .bp-sheet-label .rule { flex: 1; height: 1px; background: var(--ink-soft); opacity: 0.4; }
          .bp-sheet-right { font-size: 12px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.05em; font-family: 'IBM Plex Mono', monospace; }

          .bp-avail { display: inline-flex; align-items: flex-start; gap: 10px; font-size: 12px; color: var(--ink); font-family: 'IBM Plex Mono', monospace; margin-bottom: 22px; background: var(--card); border: 1px solid var(--ink); padding: 9px 13px; border-radius: 2px; line-height: 1.5; max-width: 680px; box-shadow: 2px 2px 0px rgba(27,27,23,0.08); }
          .bp-avail .bp-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--marker); display: inline-block; flex-shrink: 0; margin-top: 5px; animation: bp-pulse 1.8s infinite; }
          @keyframes bp-pulse { 0% { box-shadow: 0 0 0 0 rgba(184, 65, 46, 0.4); } 70% { box-shadow: 0 0 0 5px rgba(184, 65, 46, 0); } 100% { box-shadow: 0 0 0 0 rgba(184, 65, 46, 0); } }

          .bp-hero h1 {
            font-size: clamp(34px, 5.5vw, 68px);
            max-width: 920px;
            margin-bottom: 0;
            line-height: 1.08;
            letter-spacing: -0.02em;
            font-family: 'Fraunces', Georgia, serif;
            font-weight: 500;
          }
          .bp-hero h1 em { font-style: normal; color: var(--pine); }

          .bp-hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: start; margin-top: 34px; }
          .bp-hero-sub { font-size: 17.5px; color: var(--ink-soft); max-width: 540px; margin-bottom: 14px; line-height: 1.6; }
          .bp-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin: 24px 0 14px; }
          .bp-price-note { font-size: 13px; color: var(--ink-soft); margin-top: 4px; }
          .bp-price-note b { color: var(--ink); }

          .bp-annot-card { background: var(--card); border: 1px solid var(--ink); padding: 26px; position: relative; }
          .bp-annot-card .corner { position: absolute; top: -1px; right: -1px; width: 26px; height: 26px; background: var(--marker); clip-path: polygon(0 0, 100% 0, 100% 100%); }
          .bp-annot-title { font-size: 12px; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 14px; font-family: 'IBM Plex Mono', monospace; }
          .bp-annot-row { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed var(--paper-line); padding: 10px 0; font-size: 13.5px; gap: 12px; }
          .bp-annot-row:last-child { border-bottom: none; }
          .bp-annot-row span:first-child { color: var(--ink-soft); }
          .bp-annot-row span:last-child { font-weight: 500; text-align: right; }

          .bp-stat-strip { display: flex; gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); margin-top: 48px; }
          .bp-stat { flex: 1; padding: 22px 24px; border-right: 1px solid var(--ink); }
          .bp-stat:last-child { border-right: none; }
          .bp-stat .num { font-family: 'Fraunces', serif; font-size: 34px; font-weight: 600; color: var(--pine); line-height: 1; }
          .bp-stat .lbl { font-size: 12.5px; color: var(--ink-soft); margin-top: 6px; }

          /* Category Strip & Pills */
          .category-strip { padding: 22px 0; background: var(--card); border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
          .category-strip .lbl2 { font-size: 11px; color: var(--ink-soft); margin-bottom: 14px; display: block; letter-spacing: 0.06em; }
          .category-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; font-size: 12.5px; }
          .cat-pill {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11.5px;
            letter-spacing: 0.04em;
            padding: 8px 14px;
            border: 1px solid var(--paper-line);
            background: var(--paper);
            color: var(--ink-soft);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
            border-radius: 1px;
            display: inline-flex;
            align-items: center;
          }
          .cat-pill:hover {
            border-color: var(--ink);
            color: var(--ink);
            transform: translateY(-1px);
          }
          .cat-pill.active {
            border-color: var(--pine);
            background: var(--pine);
            color: #ffffff;
            font-weight: 600;
            box-shadow: 2px 2px 0px rgba(36, 70, 59, 0.25);
          }

          /* Architectural Shelf Container */
          .br-shelf-container {
            border: 1px solid var(--ink);
            padding: clamp(20px, 3.5vw, 36px) clamp(16px, 3vw, 32px);
            margin: 36px 0;
            background: var(--card);
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            box-shadow: 2px 2px 0px rgba(27, 27, 23, 0.06);
          }
          .br-shelf-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 24px;
          }
          .br-shelf-tag { font-size: 11px; color: var(--ink-soft); letter-spacing: 1px; text-transform: uppercase; }
          .br-shelf-sub {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(17px, 2.2vw, 22px);
            font-weight: 500;
            color: var(--ink);
            margin: 6px 0 0;
          }
          .br-shelf-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
          }
          .br-shelf-stage-counter {
            font-size: 11px;
            color: var(--pine);
            background: var(--paper);
            border: 1px solid var(--pine);
            padding: 5px 10px;
            font-weight: 600;
            letter-spacing: 0.05em;
          }
          .shelf-btn {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            background: var(--paper);
            border: 1px solid var(--ink);
            color: var(--ink);
            padding: 5px 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 500;
          }
          .shelf-btn:hover {
            background: var(--pine);
            color: #ffffff;
            border-color: var(--pine);
          }

          /* Vector SVG Shelf & Morphing Silhouettes */
          .shelf-svg-wrap {
            width: 100%;
            max-width: 780px;
            margin: 16px auto;
            overflow: visible;
          }
          .shelf {
            display: block;
            width: 100%;
            height: auto;
            overflow: visible;
          }
          .shelf .plain {
            fill: none;
            stroke: var(--paper-line);
            stroke-width: 1.5;
            transition: opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .shelf .floor {
            stroke: var(--ink);
            stroke-width: 1.5;
          }
          .shelf .evo {
            transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .shelf .evo-plain {
            transition: opacity 0.35s ease;
          }
          .shelf .sh {
            opacity: 0;
            transition: opacity 0.35s ease;
          }
          .shelf .sh.show {
            opacity: 1;
          }
          .shelf .sh .body {
            fill: var(--paper);
            stroke: none;
          }
          .shelf .sh .edge {
            fill: none;
            stroke: var(--pine);
            stroke-width: 2;
            transition: stroke 0.3s ease;
          }
          .shelf .ly {
            opacity: 0;
            transition: opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .shelf .band {
            fill: var(--ink);
          }
          .shelf .word {
            fill: var(--paper);
          }
          .shelf .tint {
            fill: var(--pine);
          }
          .shelf .rule {
            stroke: var(--marker);
            stroke-width: 2;
            stroke-linecap: round;
          }
          .shelf .seal {
            fill: var(--paper);
            stroke: var(--marker);
            stroke-width: 1.5;
          }
          .shelf .dim {
            fill: none;
            stroke: var(--marker);
            stroke-width: 1.5;
          }
          .shelf .dim-txt {
            fill: var(--marker);
            font-family: 'IBM Plex Mono', monospace;
            font-size: 8px;
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          /* Stage Classes for Shelf Animation */
          .shelf.on-1 .evo-plain { opacity: 0; }
          .shelf.on-2 .evo { transform: translateY(-7px); }
          .shelf.on-3 .ly3 { opacity: 1; }
          .shelf.on-4 .ly4 { opacity: 1; }
          .shelf.on-5 .ly5 { opacity: 1; }
          .shelf.on-6 .ly6 { opacity: 1; }
          .shelf.on-7 .ly7 { opacity: 1; }
          .shelf.on-8 .ly8 { opacity: 1; }
          .shelf.on-8 .dim-txt { opacity: 1; }
          .shelf.on-8 .plain { opacity: 0.28; }

          /* Interactive Shelf Timeline Stepper & Description */
          .br-shelf-status {
            margin-top: 24px;
            padding-top: 18px;
            border-top: 1px dashed var(--paper-line);
          }
          .br-stage-bar {
            display: flex;
            gap: 6px;
            margin-bottom: 12px;
            flex-wrap: wrap;
          }
          .br-stage-step {
            flex: 1;
            min-width: 32px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            border: 1px solid var(--paper-line);
            background: var(--paper);
            color: var(--ink-soft);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .br-stage-step.active {
            background: var(--pine);
            border-color: var(--pine);
            color: #ffffff;
          }
          .br-stage-step.current {
            box-shadow: 0 0 0 2px var(--marker);
            font-weight: 700;
          }
          .br-stage-desc {
            font-size: 12px;
            color: var(--ink-soft);
            line-height: 1.5;
          }
          .br-stage-desc strong {
            color: var(--ink);
          }

          /* Quiz Evolving Shelf Container */
          .br-quiz-shelf-container {
            margin-top: 36px;
            padding: clamp(16px, 3vw, 24px);
            background: var(--card);
            border: 1px solid var(--ink);
            box-sizing: border-box;
          }
          .br-quiz-shelf-tag {
            font-size: 11px;
            color: var(--ink-soft);
            letter-spacing: 0.06em;
            margin-bottom: 12px;
            text-align: center;
          }
          .br-quiz-shelf-caption {
            font-size: 11.5px;
            color: var(--ink-soft);
            text-align: center;
            margin-top: 14px;
            line-height: 1.5;
          }
          .br-quiz-shelf-caption strong {
            color: var(--ink);
          }

          /* Systems Grid */
          .br-systems-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .br-system-card {
            background: var(--card);
            border: 1px solid var(--ink);
            padding: 18px;
            text-decoration: none;
            color: var(--ink);
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .br-system-card:hover {
            border-color: var(--pine);
            box-shadow: 2px 2px 0px var(--pine);
            transform: translateY(-2px);
          }
          .br-sys-name { font-family: 'Fraunces', serif; font-weight: 600; font-size: 16px; }
          .br-sys-cat { font-size: 11px; color: var(--ink-soft); }

          /* Quiz Card */
          .br-quiz-card {
            background: var(--card);
            border: 1px solid var(--ink);
            padding: clamp(28px, 4vw, 54px);
            position: relative;
            margin-top: 16px;
          }
          .br-quiz-card .corner {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 28px;
            height: 28px;
            background: var(--marker);
            clip-path: polygon(0 0, 100% 0, 100% 100%);
          }

          .br-progress-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            padding: 14px 0;
            border-bottom: 1px solid var(--paper-line);
            margin-bottom: 24px;
          }
          .br-progress-count { font-size: 12px; font-weight: 600; color: var(--ink); letter-spacing: 0.5px; }
          .br-progress-ticks { display: flex; gap: 6px; flex: 1; max-width: 360px; }
          .br-tick { flex: 1; height: 3px; background: var(--paper-line); transition: all 0.2s; }
          .br-tick.done { background: var(--ink); }
          .br-tick.now { background: var(--marker); height: 5px; transform: translateY(-1px); }

          .br-qgrid { display: grid; grid-template-columns: 110px 1fr; gap: 36px; }
          .br-qnum {
            font-size: clamp(54px, 7vw, 92px);
            font-family: 'Fraunces', serif;
            line-height: 0.85;
            color: var(--pine);
          }
          .br-qnum small { display: block; font-size: 12px; letter-spacing: 1px; color: var(--ink-soft); margin-top: 8px; }
          .br-qtitle {
            font-size: clamp(24px, 3.4vw, 42px);
            font-family: 'Fraunces', serif;
            font-weight: 500;
            line-height: 1.15;
            letter-spacing: -0.01em;
            margin-bottom: 8px;
          }
          .br-qhelp { font-size: 15.5px; color: var(--ink-soft); margin-bottom: 24px; }

          .br-opts-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
          .br-opt-btn {
            width: 100%;
            text-align: left;
            background: var(--paper);
            border: 1px solid var(--ink);
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            transition: all 0.15s ease;
            font-family: 'Inter', sans-serif;
            font-size: clamp(15.5px, 1.7vw, 17.5px);
            color: var(--ink);
            border-radius: var(--radius);
          }
          .br-opt-btn:hover {
            background: #ffffff;
            border-color: var(--pine);
            transform: translateX(4px);
          }
          .br-opt-btn.selected {
            background: #ffffff;
            border: 2px solid var(--pine);
            box-shadow: 2px 2px 0px var(--pine);
            color: var(--pine);
            font-weight: 600;
            transform: translateX(4px);
          }
          .br-opt-key { font-size: 12px; color: var(--ink-soft); font-family: 'IBM Plex Mono', monospace; }
          .br-opt-btn.selected .br-opt-key { color: var(--pine); font-weight: 700; }
          .br-opt-label { flex: 1; }
          .br-opt-marker { font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: var(--pine); font-weight: 700; }

          .br-multi-note { margin-top: 12px; font-size: 12px; color: var(--marker); font-weight: 600; }
          .br-tip-note { margin-top: 24px; font-size: 12px; color: var(--ink-soft); }

          .br-outcome-textarea {
            width: 100%;
            padding: 16px;
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            line-height: 1.6;
            background: var(--paper);
            border: 1.5px solid var(--ink);
            border-radius: var(--radius);
            color: var(--ink);
            outline: none;
            resize: vertical;
          }
          .br-outcome-textarea:focus {
            background: #ffffff;
            border-color: var(--pine);
            box-shadow: 0 0 0 2px rgba(36, 70, 59, 0.15);
          }

          /* Capture & Project Cards */
          .br-capture-card {
            background: var(--card);
            border: 1px solid var(--ink);
            padding: clamp(30px, 5vw, 56px);
            position: relative;
            max-width: 860px;
            margin: 16px auto 0;
          }
          .br-capture-card .corner {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 28px;
            height: 28px;
            background: var(--marker);
            clip-path: polygon(0 0, 100% 0, 100% 100%);
          }
          .br-card-tag { font-size: 11px; color: var(--pine); font-weight: 700; letter-spacing: 1px; display: block; }
          .br-card-title {
            font-size: clamp(28px, 4vw, 44px);
            font-family: 'Fraunces', serif;
            font-weight: 500;
            margin: 14px 0 10px;
            line-height: 1.15;
          }
          .br-card-desc { color: var(--ink-soft); font-size: 16px; margin-bottom: 28px; line-height: 1.55; }

          .br-fields-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .field-group { display: flex; flex-direction: column; gap: 6px; }
          .field-group.full-width { grid-column: 1 / -1; }
          .field-group label {
            font-size: 11px;
            letter-spacing: 0.5px;
            color: var(--ink-soft);
            text-transform: uppercase;
            font-family: 'IBM Plex Mono', monospace;
          }
          .field-group input,
          .field-group textarea {
            padding: 12px 14px;
            border: 1.5px solid var(--ink);
            background: var(--paper);
            font-family: 'Inter', sans-serif;
            font-size: 15.5px;
            color: var(--ink);
            border-radius: var(--radius);
            outline: none;
          }
          .field-group input:focus,
          .field-group textarea:focus {
            border-color: var(--pine);
            background: #ffffff;
            box-shadow: 0 0 0 2px rgba(36, 70, 59, 0.15);
          }

          /* Report View */
          .br-report-header {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 20px;
            border-bottom: 2px solid var(--ink);
            padding-bottom: 20px;
            margin-bottom: 28px;
            flex-wrap: wrap;
          }
          .br-report-title {
            font-size: clamp(32px, 5vw, 56px);
            font-family: 'Fraunces', serif;
            font-weight: 500;
            line-height: 1.1;
            margin-top: 8px;
          }
          .br-report-title em { font-style: normal; color: var(--pine); }

          .br-facts-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 36px;
            background: var(--card);
            border: 1px solid var(--ink);
            padding: 20px 24px;
          }
          .br-fact dt { font-size: 11px; color: var(--ink-soft); text-transform: uppercase; margin-bottom: 4px; }
          .br-fact dd { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: var(--ink); margin: 0; }

          .br-score-card {
            background: var(--card);
            border: 1px solid var(--ink);
            padding: clamp(24px, 4vw, 44px);
            display: grid;
            grid-template-columns: 5fr 7fr;
            gap: 40px;
            margin-bottom: 36px;
            position: relative;
          }
          .br-score-card .corner {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 26px;
            height: 26px;
            background: var(--marker);
            clip-path: polygon(0 0, 100% 0, 100% 100%);
          }

          .br-score-display { display: flex; align-items: baseline; gap: 8px; margin: 12px 0; }
          .br-score-num {
            font-size: clamp(70px, 9vw, 110px);
            font-family: 'Fraunces', serif;
            font-weight: 500;
            line-height: 0.85;
            color: var(--ink);
          }
          .br-score-max { font-size: 20px; color: var(--ink-soft); }
          .br-score-band { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--pine); }

          .br-dim-head { font-size: 11px; letter-spacing: 1px; color: var(--ink-soft); margin-bottom: 8px; }
          .br-dim-row {
            display: grid;
            grid-template-columns: 140px 1fr 38px;
            gap: 12px;
            align-items: center;
            padding: 7px 0;
            font-size: 13.5px;
          }
          .br-dim-bar { height: 6px; background: var(--paper-line); border-radius: 1px; position: relative; overflow: hidden; }
          .br-dim-bar i { display: block; height: 100%; background: var(--ink); transition: width 0.8s cubic-bezier(0.2, 0.7, 0.2, 1); }
          .br-dim-bar.bar-accent i { background: var(--pine); }

          .br-outcome-quote {
            border-left: 3px solid var(--pine);
            background: var(--card);
            border-top: 1px solid var(--paper-line);
            border-right: 1px solid var(--paper-line);
            border-bottom: 1px solid var(--paper-line);
            padding: 24px;
            margin-bottom: 36px;
          }
          .br-outcome-quote blockquote {
            font-family: 'Fraunces', serif;
            font-size: clamp(17px, 2vw, 22px);
            font-style: italic;
            color: var(--ink);
            margin-top: 8px;
            line-height: 1.45;
          }

          .br-frags-list { display: grid; gap: 16px; margin-top: 20px; }
          .br-frag-card {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            padding: 22px 0;
            border-top: 1px solid var(--ink);
          }
          .br-frag-num { font-size: 38px; font-family: 'Fraunces', serif; color: var(--marker); line-height: 1; }
          .br-frag-body h3 { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; margin-bottom: 6px; }
          .br-frag-body p { font-size: 15.5px; color: var(--ink-soft); line-height: 1.6; margin: 0; max-width: 680px; }

          .br-opp-risk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 36px 0; }
          .br-opp-card, .br-risk-card { background: var(--card); border: 1px solid var(--ink); padding: 24px; position: relative; }
          .br-opp-card p, .br-risk-card p { font-size: 15.5px; line-height: 1.6; color: var(--ink); margin-top: 10px; }

          .br-recommended-card {
            background: var(--ink);
            color: var(--paper);
            padding: clamp(30px, 5vw, 56px);
            position: relative;
            margin-top: 48px;
          }
          .br-recommended-card .corner {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 30px;
            height: 30px;
            background: var(--marker);
            clip-path: polygon(0 0, 100% 0, 100% 100%);
          }
          .br-rec-title {
            font-size: clamp(28px, 4.2vw, 48px);
            font-family: 'Fraunces', serif;
            color: #ffffff;
            margin: 14px 0 24px;
          }
          .br-rec-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 36px; }
          .br-rec-deliverables { list-style: none; padding: 0; margin: 0; }
          .br-rec-deliverables li {
            padding: 10px 0;
            border-bottom: 1px solid rgba(239, 235, 226, 0.15);
            font-size: 15px;
            color: #E2DFD6;
          }
          .br-rec-meta {
            display: flex;
            flex-direction: column;
            gap: 18px;
            border-left: 1px solid rgba(239, 235, 226, 0.2);
            padding-left: 24px;
          }
          .br-rec-stat span { font-size: 11px; color: #A19D94; display: block; margin-bottom: 4px; text-transform: uppercase; font-family: 'IBM Plex Mono', monospace; }
          .br-rec-stat b { font-family: 'Fraunces', serif; font-size: 22px; color: #ffffff; }

          @media (max-width: 860px) {
            .bp-hero-grid,
            .br-score-card,
            .br-opp-risk-grid,
            .br-rec-grid,
            .br-fields-grid,
            .br-systems-grid {
              grid-template-columns: 1fr;
            }
            .bp-annot-row {
              display: grid !important;
              grid-template-columns: 105px 1fr !important;
              align-items: start !important;
              gap: 12px !important;
            }
            .bp-annot-row span:last-child {
              text-align: left !important;
            }
            .bp-stat-strip {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
            }
            .bp-stat {
              border-right: 1px solid var(--ink) !important;
              border-bottom: 1px solid var(--ink) !important;
              padding: 16px 14px !important;
            }
            .bp-stat:nth-child(2n) { border-right: none !important; }
            .bp-stat:nth-child(3), .bp-stat:nth-child(4) { border-bottom: none !important; }
            .br-qgrid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .br-qnum {
              display: flex;
              align-items: baseline;
              gap: 10px;
              font-size: 44px;
            }
            .br-qnum small { display: inline; margin: 0; }
            .br-facts-grid { grid-template-columns: 1fr 1fr; }
            .br-frag-card { grid-template-columns: 1fr; gap: 8px; }
            .br-rec-meta {
              border-left: none;
              padding-left: 0;
              border-top: 1px solid rgba(239, 235, 226, 0.2);
              padding-top: 18px;
            }
            .br-shelf-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
            .br-shelf-controls {
              width: 100%;
              justify-content: space-between;
            }
            .cat-pill {
              font-size: 11px;
              padding: 6px 11px;
            }
          }

          @media (max-width: 480px) {
            .br-facts-grid { grid-template-columns: 1fr; }
            .bp-stat-strip { grid-template-columns: 1fr 1fr !important; }
            .bp-stat { padding: 12px 10px !important; }
            .bp-stat .num { font-size: 26px !important; }
            .bp-stat .lbl { font-size: 10.5px !important; }
            .category-row span, .cat-pill { font-size: 10.5px; padding: 5px 9px; }
            .bp-cta-row button, .bp-cta-row a {
              width: 100%;
              text-align: center;
              justify-content: center;
            }
            .br-stage-bar {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 4px;
            }
            .br-stage-step {
              min-width: unset;
              height: 24px;
              font-size: 9px;
            }
            .br-shelf-container {
              padding: 16px 12px;
              margin: 24px 0;
            }
            .br-shelf-sub {
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
