/**
 * Comprehensive Production Lead Pipeline Audit Script
 * Executes 22 rigorous form submissions to https://drawingsboard.com/api/submit-lead
 * Including a 5-request simultaneous concurrency burst test.
 */

const ENDPOINT = 'https://drawingsboard.com/api/submit-lead';
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1iAocCMl4K4odgJ5hlr-1hbncgWbuW8dFKrnwJg2mAf8/export?format=csv';

const testPayloads = [
  // Burst 1: 5 Simultaneous Concurrent Requests (Testing race conditions & parallel execution)
  {
    id: 1,
    burst: true,
    data: {
      name: "Aarav Sharma (Burst 1/5)",
      email: "vrundpatel153@gmail.com",
      phone: "+91 98251 11223",
      company: "Aarav Organics & Co.",
      services: "Brand Identity Design",
      budget: "$5,000 - $10,000",
      timeline: "Immediately",
      message: "Concurrent burst test #1. Launching D2C organic skincare line across tier-1 cities.",
      source: "Homepage - Quick Lead Form"
    }
  },
  {
    id: 2,
    burst: true,
    data: {
      name: "Marcus Vance (Burst 2/5)",
      email: "vrundvrundvrund15@gmail.com",
      phone: "+1 (415) 555-0192",
      company: "Vance Robotics, Inc.",
      services: "UI/UX & Web Development",
      budget: "$10,000 - $25,000",
      timeline: "Within 2 weeks",
      message: "Concurrent burst test #2. Series A industrial automation robotics telemetry platform.",
      source: "Contact Page - Studio Brief (/contact)"
    }
  },
  {
    id: 3,
    burst: true,
    data: {
      name: "Priya Sundaram (Burst 3/5)",
      email: "vrundvrundvrund@gmail.com",
      phone: "+91 97123 45678",
      company: "Sundaram Heritage Botanicals",
      services: "Packaging Systems & Dielines",
      budget: "$2,000 - $5,000",
      timeline: "Next Month",
      message: "Concurrent burst test #3. Luxury Ayurvedic incense and cold-pressed soaps packaging architecture.",
      source: "Brand Readiness Scorecard (/brand-readiness)"
    }
  },
  {
    id: 4,
    burst: true,
    data: {
      name: "Oliver Kingsley (Burst 4/5)",
      email: "vrundpatel153@gmail.com",
      phone: "+44 7911 123456",
      company: "Kingsley & O'Connor Ltd.",
      services: "Full Brand Transformation",
      budget: "$25,000+",
      timeline: "Immediately",
      message: "Concurrent burst test #4. London boutique hotel group rebranding with full guest collateral.",
      source: "SaaS Branding Consultation (/saas-branding)"
    }
  },
  {
    id: 5,
    burst: true,
    data: {
      name: "Meera Sen (Burst 5/5)",
      email: "vrundvrundvrund15@gmail.com",
      phone: "+91 99887 76655",
      company: "Sen & Daughters Chai Co.",
      services: "Brand Identity, Packaging Design",
      budget: "$5,000 - $10,000",
      timeline: "Q1 Planning",
      message: "Concurrent burst test #5. Premium single-estate Assam tea retail tin dielines.",
      source: "Footer Quick Form"
    }
  },

  // Scenario Tests: Diverse Geographies, Categories & Special Characters (Payloads 6-22)
  {
    id: 6,
    data: {
      name: "Rohan Kulkarni",
      email: "vrundvrundvrund@gmail.com",
      phone: "9820012345",
      company: "Kulkarni Tech Ventures",
      services: "UI/UX & Web Development",
      budget: "<$2,000",
      timeline: "Within 2 weeks",
      message: "Testing local 10-digit Indian number without country code prefix.",
      source: "Homepage - Quick Lead Form"
    }
  },
  {
    id: 7,
    data: {
      name: "Chloe Dupont",
      email: "vrundpatel153@gmail.com",
      phone: "+33 6 12 34 56 78",
      company: "L'Étoile Atelier de Paris",
      services: "Brand Identity Design",
      budget: "$10,000 - $25,000",
      timeline: "Immediately",
      message: "Testing French international telephone format and apostrophes in company title: L'Étoile.",
      source: "Contact Page - Studio Brief (/contact)"
    }
  },
  {
    id: 8,
    data: {
      name: "Zayn Al-Mansoor",
      email: "vrundvrundvrund15@gmail.com",
      phone: "+971 50 123 4567",
      company: "Mansoor Hospitality & Cafés",
      services: "Full Brand Transformation",
      budget: "$25,000+",
      timeline: "Immediately",
      message: "Testing UAE / Dubai phone prefix (+971) and luxury F&B multi-unit flagship branding.",
      source: "Brand Readiness Scorecard (/brand-readiness)"
    }
  },
  {
    id: 9,
    data: {
      name: "Dr. Evelyn Reed, Ph.D.",
      email: "vrundvrundvrund@gmail.com",
      phone: "+1 650 334 8899",
      company: "BioSynthetix \"NextGen\" Therapeutics",
      services: "Enterprise SaaS System, Web Development",
      budget: "$15,000+",
      timeline: "Next Month",
      message: "Testing double quotes in brand name, commas in client title, and medical biotech branding scope.",
      source: "SaaS Branding Consultation (/saas-branding)"
    }
  },
  {
    id: 10,
    data: {
      name: "Tan Wei Ming",
      email: "vrundpatel153@gmail.com",
      phone: "+65 9123 4567",
      company: "Nanyang Roast Co. Pte. Ltd.",
      services: "Packaging Systems & Dielines",
      budget: "$5,000 - $10,000",
      timeline: "Within 2 weeks",
      message: "Testing Singapore mobile format (+65) and retail food pouch dieline requirements.",
      source: "Homepage - Quick Lead Form"
    }
  },
  {
    id: 11,
    data: {
      name: "Vikram Singhania",
      email: "vrundvrundvrund15@gmail.com",
      phone: "+91 94288 59768",
      company: "Singhania Fine Diamonds",
      services: "Brand Identity Design, Packaging",
      budget: "$10,000 - $25,000",
      timeline: "Immediately",
      message: "Testing luxury jewellery unboxing dielines, foil-stamped certificate sleeves, and minimal brandmark.",
      source: "Contact Page - Studio Brief (/contact)"
    }
  },
  {
    id: 12,
    data: {
      name: "Ananya Deshmukh",
      email: "vrundvrundvrund@gmail.com",
      phone: "+91 91670 99881",
      company: "Sattvic Soul Wellness",
      services: "Full Brand Transformation",
      budget: "$5,000 - $10,000",
      timeline: "Q1 Planning",
      message: "Testing wellness retreat branding: botanical logomarks, signage system, and responsive web portal.",
      source: "Brand Readiness Scorecard (/brand-readiness)"
    }
  },
  {
    id: 13,
    data: {
      name: "Liam O'Connor",
      email: "vrundpatel153@gmail.com",
      phone: "+353 1 496 0123",
      company: "O'Connor & Flaherty Distillers",
      services: "Packaging Systems & Dielines",
      budget: "$10,000 - $25,000",
      timeline: "Within 2 weeks",
      message: "Testing Irish phone code (+353) and bespoke whiskey bottle label typography with embossed foils.",
      source: "Contact Page - Studio Brief (/contact)"
    }
  },
  {
    id: 14,
    data: {
      name: "Siddharth Verma",
      email: "vrundvrundvrund15@gmail.com",
      phone: "+91 98111 22334",
      company: "Verma Cloud Infrastructure",
      services: "Enterprise SaaS System",
      budget: "$10,000 - $25,000",
      timeline: "Next Month",
      message: "Testing developer-focused Kubernetes orchestration monitoring platform dark-mode design system.",
      source: "SaaS Branding Consultation (/saas-branding)"
    }
  },
  {
    id: 15,
    data: {
      name: "Kavita Rao",
      email: "vrundvrundvrund@gmail.com",
      phone: "+91 98450 67890",
      company: "Kavita Rao Artisanal Ceramics",
      services: "Brand Identity Design",
      budget: "<$2,000",
      timeline: "Flexible / Milestone Based",
      message: "Testing artisanal handmade pottery hallmark stamp, minimalist hangtags, and Shopify storefront.",
      source: "Homepage - Quick Lead Form"
    }
  },
  {
    id: 16,
    data: {
      name: "Elena Rostova",
      email: "vrundpatel153@gmail.com",
      phone: "+49 30 123456",
      company: "Rostova High-Jewellery Berlin",
      services: "Brand Identity, Packaging Design",
      budget: "$25,000+",
      timeline: "Immediately",
      message: "Testing German telephone prefix (+49) and bespoke debossed velvet jewellery presentation cases.",
      source: "Brand Readiness Scorecard (/brand-readiness)"
    }
  },
  {
    id: 17,
    data: {
      name: "Devendra Patel",
      email: "vrundvrundvrund15@gmail.com",
      phone: "+91 94260 55443",
      company: "Patel Agro Export Corporation",
      services: "Packaging Systems & Dielines",
      budget: "$5,000 - $10,000",
      timeline: "Within 2 weeks",
      message: "Testing multi-lingual export carton packaging dielines for European and Gulf grocery retail.",
      source: "Footer Quick Form"
    }
  },
  {
    id: 18,
    data: {
      name: "Sebastian Morales",
      email: "vrundvrundvrund@gmail.com",
      phone: "+52 55 1234 5678",
      company: "Café de Oaxaca & Raíces",
      services: "Brand Identity Design, Packaging",
      budget: "$5,000 - $10,000",
      timeline: "Next Month",
      message: "Testing Mexico phone format (+52) and specialty organic coffee beans eco-certified pouch packaging.",
      source: "Contact Page - Studio Brief (/contact)"
    }
  },
  {
    id: 19,
    data: {
      name: "Sneha Nair",
      email: "vrundpatel153@gmail.com",
      phone: "+91 98401 23456",
      company: "Nair & Sons Ayurvedic Apothecary",
      services: "Full Brand Transformation",
      budget: "$10,000 - $25,000",
      timeline: "Immediately",
      message: "Testing comprehensive rebrand: amber glass bottle screenprints, custom secondary cartons, and digital store.",
      source: "Brand Readiness Scorecard (/brand-readiness)"
    }
  },
  {
    id: 20,
    data: {
      name: "Alexandre Moreau",
      email: "vrundvrundvrund15@gmail.com",
      phone: "+41 22 765 4321",
      company: "Moreau Horlogerie Genève",
      services: "Brand Identity Design",
      budget: "$25,000+",
      timeline: "Immediately",
      message: "Testing Swiss telephone code (+41), ultra-luxury Swiss timepiece brandmark and certificate booklet.",
      source: "Contact Page - Studio Brief (/contact)"
    }
  },
  {
    id: 21,
    data: {
      name: "Gaurav Malhotra",
      email: "vrundvrundvrund@gmail.com",
      phone: "+91 98100 44556",
      company: "Malhotra Cloud Logistics",
      services: "Enterprise SaaS System, UI/UX",
      budget: "$10,000 - $25,000",
      timeline: "Within 2 weeks",
      message: "Testing high-velocity automated logistics tracking dashboard UI kit and fleet telemetry branding.",
      source: "SaaS Branding Consultation (/saas-branding)"
    }
  },
  {
    id: 22,
    data: {
      name: "Tara & Kabir Joshi (Final Comprehensive Audit)",
      email: "vrundpatel153@gmail.com",
      phone: "+91 98210 99999",
      company: "Joshi Craft Distillers & Botanical Lab",
      services: "Full Brand Transformation",
      budget: "$25,000+",
      timeline: "Immediately",
      message: "Submission #22 final end-to-end verification. Testing ampersand in names, long multi-sentence narrative, Indian mobile formatting, dual email dispatch, and Google Sheet real-time logging.",
      source: "Homepage - Quick Lead Form"
    }
  }
];

async function submitSingle(testCase) {
  const start = Date.now();
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCase.data)
    });
    const elapsed = Date.now() - start;
    const json = await res.json();
    return {
      id: testCase.id,
      name: testCase.data.name,
      company: testCase.data.company,
      email: testCase.data.email,
      source: testCase.data.source,
      status: res.status,
      elapsedMs: elapsed,
      success: json.success,
      emailId: json.emailId,
      dispatched: json.dispatched,
      sheetBackup: json.sheetBackup
    };
  } catch (err) {
    return {
      id: testCase.id,
      name: testCase.data.name,
      status: 'ERROR',
      error: err.message,
      elapsedMs: Date.now() - start
    };
  }
}

async function runAudit() {
  console.log('================================================================');
  console.log('🚀 COMMENCING 22 PRODUCTION FORM SUBMISSIONS AUDIT');
  console.log('Target Endpoint:', ENDPOINT);
  console.log('Time:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), 'IST');
  console.log('================================================================\n');

  const results = [];

  // Phase 1: 5 Simultaneous Requests (Concurrent Burst)
  console.log('⚡ PHASE 1: Executing 5 Simultaneous Concurrent Requests in Parallel (Promise.all)...');
  const burstStart = Date.now();
  const burstCases = testPayloads.filter(t => t.burst);
  const burstResults = await Promise.all(burstCases.map(tc => submitSingle(tc)));
  const totalBurstElapsed = Date.now() - burstStart;
  console.log(`✅ Phase 1 Burst Completed in ${totalBurstElapsed}ms total!\n`);
  burstResults.forEach(r => {
    console.log(`  [Burst #${r.id}] ${r.status === 200 && r.success ? '✓ SUCCESS' : '✗ FAILED'} (${r.elapsedMs}ms) | Client: ${r.name} | Resend ID: ${r.emailId} | SheetBackup: ${r.sheetBackup}`);
    results.push(r);
  });

  // Phase 2: Sequential Edge-Case Submissions (Payloads 6 to 22)
  console.log('\n🔍 PHASE 2: Executing Remaining 17 Diverse Scenarios & Edge Cases...');
  const remainingCases = testPayloads.filter(t => !t.burst);
  for (const tc of remainingCases) {
    const r = await submitSingle(tc);
    results.push(r);
    console.log(`  [Test #${r.id.toString().padStart(2, '0')}/22] ${r.status === 200 && r.success ? '✓' : '✗'} (${r.elapsedMs}ms) | ${r.source} | ${r.name} (${r.company}) | Sheet: ${r.sheetBackup}`);
  }

  // Summary Metrics
  console.log('\n================================================================');
  console.log('📊 AUDIT SUMMARY & AGGREGATE METRICS');
  console.log('================================================================');
  const totalTests = results.length;
  const passedTests = results.filter(r => r.status === 200 && r.success && r.dispatched && r.sheetBackup).length;
  const avgLatency = Math.round(results.reduce((acc, r) => acc + r.elapsedMs, 0) / totalTests);
  const maxLatency = Math.max(...results.map(r => r.elapsedMs));
  const minLatency = Math.min(...results.map(r => r.elapsedMs));

  console.log(`Total Submissions Tested: ${totalTests} / 22`);
  console.log(`Fully Succeeded (HTTP 200 + Resend + Sheet): ${passedTests} / ${totalTests} (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log(`Average Latency: ${avgLatency}ms`);
  console.log(`Min Latency: ${minLatency}ms | Max Latency: ${maxLatency}ms`);

  // Verify Google Sheet
  console.log('\n📋 VERIFYING GOOGLE SHEET BACKUP SPREADSHEET...');
  try {
    const csvRes = await fetch(SHEET_CSV_URL);
    const csvText = await csvRes.text();
    const rows = csvText.trim().split('\n');
    console.log(`Google Sheet Total Rows: ${rows.length} (including headers)`);
    console.log(`Latest 5 Entries in Sheet:`);
    rows.slice(-5).forEach((row, i) => console.log(`  Row ${rows.length - 5 + i + 1}: ${row.substring(0, 110)}...`));
  } catch (sheetErr) {
    console.error('Failed to read Google Sheet CSV:', sheetErr.message);
  }

  console.log('\n================================================================');
  console.log('🏁 AUDIT COMPLETE');
  console.log('================================================================');
}

runAudit();
