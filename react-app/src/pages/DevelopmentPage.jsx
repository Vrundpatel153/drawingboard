import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import MoreServicesSection from '../components/MoreServicesSection';
import { WHATSAPP_URL } from '../utils/siteConfig';



/* ─────────────────────────────────────────────────────────────────────────────
   DevelopmentPage — pixel-perfect port of service-development (1).html
   ───────────────────────────────────────────────────────────────────────────── */
export default function DevelopmentPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What is UI/UX?",
      a: "UI (User Interface) is how your product looks — layout, colour, typography, buttons. UX (User Experience) is how it feels to use — navigation, flow, load speed, whether a visitor finds what they came for in seconds. We design both together, since a beautiful interface that's confusing to use converts worse than a plain one that isn't."
    },
    {
      q: "What is the timeline for an ecommerce website?",
      a: "A Shopify build typically takes 3–5 weeks from kickoff to launch, depending on catalog size and integrations. Fully custom builds run 6–10 weeks. You'll get an exact timeline on the call once we know your scope."
    },
    {
      q: "What is custom design?",
      a: "Custom design means every screen is designed specifically for your brand — not adapted from a theme. Layout, interactions, and components are built around your positioning, not a template's defaults."
    },
    {
      q: "What is dynamic and responsive?",
      a: "Responsive means your site adapts correctly to any screen size — phone, tablet, desktop. Dynamic means content and layout can change based on data or user behaviour — product filters, personalised recommendations, animated transitions — rather than one static page."
    },
    {
      q: "How many pages will be designed?",
      a: "Our Shopify and Custom builds include unlimited pages during the engagement — home, product/collection, about, contact, and any custom landing pages you need. Larger structural additions after launch are quoted separately."
    },
    {
      q: "What is CRO, and do you design CRO-optimised websites?",
      a: "CRO (Conversion Rate Optimization) means designing pages specifically to turn visitors into buyers or leads — clear hierarchy, frictionless checkout, trust signals in the right place, fast load times. Every site we build follows CRO fundamentals by default; for higher-traffic stores we can run structured A/B testing post-launch as a separate engagement."
    },
    {
      q: "What are your payment terms?",
      a: "50% to begin work, 50% on final delivery before the site goes live. For the App Development tier, payments split across three milestones — kickoff, mid-build review, and launch."
    }
  ];

  const cases = [
    { cat: "ecommerce", href: "https://heydoh.co/", img: "https://framerusercontent.com/images/TW8nh45W2f0jJxIXkfCtK2I9qo.webp?width=1876&height=1821", label: "E-COMMERCE", title: "Heydoh Soy Sauce" },
    { cat: "ecommerce", href: "https://eu.dockers.com/", img: "https://framerusercontent.com/images/wwljvqAiXbHPskZq2H2HFW16ug.png?width=3414&height=2092", label: "E-COMMERCE", title: "Dockers — Shopify Migration" },
    { cat: "ecommerce", href: "https://www.jumpinggoatliquor.com/", img: "https://framerusercontent.com/images/eGKHd2k1Xl1bURsuiHtL9zH6g.png?width=1888&height=919", label: "E-COMMERCE", title: "Jumping Goat Liquor" },
    { cat: "ecommerce", href: "https://cocolab.com/", img: "https://framerusercontent.com/images/RavNTGjDTPqSEMREtfyXj01cY.png?width=1889&height=918", label: "E-COMMERCE", title: "Cocolab" },
    { cat: "ecommerce", href: "https://nothingfitsbut.com/", img: "https://framerusercontent.com/images/zv7NiL9CBlTkrXSJTwve6Mv6qM.png?width=1891&height=909", label: "E-COMMERCE", title: "Nothing Fits But" },
    { cat: "ecommerce", href: "https://eyeondesign.pl/", img: "https://framerusercontent.com/images/ijj6fkRjp1O3Mp4IrpgojY7yxFQ.png?width=1881&height=908", label: "E-COMMERCE", title: "Eye on Design" },
    { cat: "ecommerce", href: "https://camillebrinch.com/", img: "https://framerusercontent.com/images/ucduo19dulaHKebxzb9S6G6KEKI.png?width=1878&height=913", label: "E-COMMERCE", title: "Camillebrinch" },
    { cat: "ecommerce", href: "https://www.silkandwillow.com/", img: "https://framerusercontent.com/images/awsgdlBGitGj1gIX9hUlSDspTk.png?width=1895&height=913", label: "E-COMMERCE", title: "Silk and Willow" },
    { cat: "ecommerce", href: "https://bruvi.com/", img: "https://framerusercontent.com/images/q24RBOXyuxkTVhwL9ED2h520.png?width=1896&height=912", label: "E-COMMERCE", title: "Bruvi" },
    { cat: "ecommerce", href: "https://thedealdepartment.nz/", img: "https://framerusercontent.com/images/m5BV46AM2GF69Q4LrYe7EyScHFg.png?width=1887&height=913", label: "E-COMMERCE", title: "The Deal Department" },
    { cat: "ecommerce", href: "https://marstonmoor.co.nz/", img: "https://framerusercontent.com/images/OmlzVJQtnCAhnmFG8RDgQnElSGM.png?width=1890&height=918", label: "E-COMMERCE", title: "Marstonmoor" },
    { cat: "ecommerce", href: "https://musicradiocreative.com/", img: "https://framerusercontent.com/images/Rk5BGoMsH6b2qOHJlT6ctjDzsE.png?width=1895&height=914", label: "E-COMMERCE", title: "Music Radio Creative" },
    { cat: "ecommerce", href: "https://gojushots.com/", img: "https://framerusercontent.com/images/fNEFSng1yYgatD7qwHHUaX20ujM.png?width=1904&height=916", label: "E-COMMERCE", title: "Goju Shots" },
    { cat: "ecommerce", href: "https://commafootball.com/", img: "https://framerusercontent.com/images/Z2DLzSMyLAGZ55XhkPQ0trRP9S0.png?width=1896&height=923", label: "E-COMMERCE", title: "Commafootball" },
    { cat: "native", href: "https://shaktimat.ca/", img: "https://framerusercontent.com/images/lzCMGdCVl4l1qY3JFkJc2NDPtg.png?width=1914&height=908", label: "NATIVE CODE", title: "Shaktimat" },
    { cat: "ecommerce", href: "https://mejuri.com/world/en/", img: "https://framerusercontent.com/images/QG53iYrspe8Dj6EfSYdN7CPbujs.png?width=1188&height=728", label: "E-COMMERCE", title: "Mejuri" },
    { cat: "ecommerce", href: "https://doublestandard.nyc/", img: "https://framerusercontent.com/images/9IlxJ5r43604P3SNziHlW8Z1W5U.png?width=1892&height=917", label: "E-COMMERCE", title: "Double Standard" },
    { cat: "ecommerce", href: "https://yowy.com.au/", img: "https://framerusercontent.com/images/T9KFx1ujfIf7GMlF8nOqthYCd8Q.png?width=1891&height=916", label: "E-COMMERCE", title: "yowy" },
    { cat: "ecommerce", href: "https://www.coastalcowboys.com.au/", img: "https://framerusercontent.com/images/i0cw87sMetqrsTVcOT6FH6pdAn4.png?width=1898&height=915", label: "E-COMMERCE", title: "Coastal Cowboys" },
    { cat: "ecommerce", href: "https://alshalofficial.com/", img: "https://framerusercontent.com/images/vC6hFSd3652b1Yh8rSiDz7w03M.png?width=1903&height=919", label: "E-COMMERCE", title: "Alshal Official" }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .dev-page {
          width: 100%;
        }
        .dev-page h1, .dev-page h2, .dev-page h3, .dev-page h4 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.05;
        }
        .dev-page .mono {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.03em;
        }
        .dev-page .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        @media (max-width: 768px) {
          .dev-page .wrap {
            padding: 0 24px !important;
          }
        }
        @media (max-width: 480px) {
          .dev-page .wrap {
            padding: 0 20px !important;
          }
        }

        .dev-page .dev-price-addons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px 32px;
        }
        .dev-page .addon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 13.5px;
          padding: 9px 0;
          border-top: 1px dashed var(--paper-line);
        }
        .dev-page .addon-row .lbl {
          color: var(--ink-soft);
        }
        .dev-page .addon-row .val {
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }
        @media (max-width: 700px) {
          .dev-page .dev-price-addons-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .dev-page .crumb {
          padding: 22px 0 0;
          font-size: 12.5px;
          color: var(--ink-soft);
        }
        .dev-page .crumb a {
          color: var(--ink-soft);
          border-bottom: 1px dashed var(--ink-soft);
        }
        .dev-page .crumb a:hover {
          color: var(--pine);
          border-color: var(--pine);
        }
        .dev-page .crumb span.sep {
          margin: 0 8px;
          opacity: 0.5;
        }
        .dev-page .crumb span.cur {
          color: var(--ink);
        }
        
        .dev-page .hero {
          padding: 20px 0 56px;
        }
        @media (max-width: 768px) {
          .dev-page .hero {
            padding: 14px 0 40px;
          }
        }

        .dev-page .sheet-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 26px;
        }
        .dev-page .sheet-label .tag {
          font-size: 12px;
          padding: 6px 10px;
          border: 1px solid var(--ink);
        }
        .dev-page .sheet-label .rule {
          flex: 1;
          height: 1px;
          background: var(--ink-soft);
          opacity: 0.4;
        }
        .dev-page .hero h1 {
          font-size: clamp(34px, 5vw, 68px);
          max-width: 900px;
        }
        .dev-page .hero h1 em {
          font-style: normal;
          color: var(--pine);
        }
        .dev-page .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: start;
          margin-top: 30px;
        }
        @media(max-width: 920px) {
          .dev-page .hero-grid {
            grid-template-columns: 1fr;
          }
        }
        .dev-page .hero-sub {
          font-size: 17.5px;
          color: var(--ink-soft);
          max-width: 520px;
          margin-bottom: 26px;
        }
        .dev-page .cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }
        .dev-page .btn-primary {
          background: var(--pine);
          color: var(--paper);
          padding: 15px 26px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: var(--radius);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background .15s;
          white-space: nowrap;
        }
        .dev-page .btn-primary:hover {
          background: var(--pine-deep);
        }
        .dev-page .btn-secondary {
          border: 1.5px solid var(--ink);
          padding: 13.5px 22px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: var(--radius);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
        }
        .dev-page .btn-secondary:hover {
          background: var(--ink);
          color: var(--paper);
        }
        .dev-page .price-note {
          font-size: 13.5px;
          color: var(--ink-soft);
        }
        .dev-page .price-note b {
          color: var(--ink);
        }
        
        .dev-page .annot-card {
          background: var(--card);
          border: 1px solid var(--ink);
          padding: 24px;
          position: relative;
        }
        .dev-page .annot-card .corner {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 26px;
          height: 26px;
          background: var(--marker);
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        .dev-page .annot-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px dashed var(--paper-line);
          padding: 10px 0;
          font-size: 13px;
        }
        .dev-page .annot-row:last-child {
          border-bottom: none;
        }
        .dev-page .annot-row span:first-child {
          color: var(--ink-soft);
        }
        .dev-page .annot-title {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 14px;
        }
        
        .dev-page .feat-case {
          margin-top: 20px;
          border: 1px solid var(--ink);
        }
        .dev-page .feat-case .fimg {
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .dev-page .feat-case .fimg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dev-page .feat-case .fbody {
          padding: 16px 20px;
          background: var(--card);
        }
        .dev-page .feat-case .tag {
          font-size: 11px;
          color: var(--marker);
          margin-bottom: 4px;
        }
        .dev-page .feat-case p {
          font-size: 13px;
          color: var(--ink-soft);
          margin-top: 4px;
        }
        
        .dev-page .stat-strip {
          display: flex;
          flex-wrap: wrap;
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          margin-top: 50px;
        }
        .dev-page .stat {
          flex: 1;
          min-width: 140px;
          padding: 22px 24px;
          border-right: 1px solid var(--ink);
        }
        .dev-page .stat:last-child {
          border-right: none;
        }
        .dev-page .stat .num {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: var(--pine);
        }
        .dev-page .stat .lbl {
          font-size: 12px;
          color: var(--ink-soft);
          margin-top: 4px;
        }
        @media(max-width: 700px) {
          .dev-page .stat-strip {
            flex-wrap: wrap;
          }
          .dev-page .stat {
            flex: 1 1 50%;
            border-bottom: 1px solid var(--ink);
          }
        }
        
        .dev-page section {
          padding: 76px 0;
        }
        .dev-page .section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .dev-page .eyebrow {
          font-size: 12px;
          color: var(--marker);
          margin-bottom: 10px;
        }
        .dev-page .section-head h2 {
          font-size: clamp(28px, 3.4vw, 42px);
          max-width: 640px;
        }
        .dev-page .section-head p {
          color: var(--ink-soft);
          max-width: 400px;
          font-size: 15px;
        }
        
        /* deliverables */
        .dev-page .deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--ink);
          border: 1px solid var(--ink);
        }
        @media(max-width: 900px) {
          .dev-page .deliv-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media(max-width: 560px) {
          .dev-page .deliv-grid {
            grid-template-columns: 1fr;
          }
        }
        .dev-page .deliv-col {
          background: var(--card);
          padding: 22px 20px;
        }
        .dev-page .deliv-col h4 {
          font-size: 14.5px;
          margin-bottom: 4px;
        }
        .dev-page .deliv-col p {
          font-size: 12.5px;
          color: var(--ink-soft);
        }
        
        .dev-page .split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        @media(max-width: 860px) {
          .dev-page .split {
            grid-template-columns: 1fr;
          }
        }
        .dev-page .split img {
          border: 1px solid var(--ink);
          width: 100%;
        }
        
        /* compare table */
        .dev-page .compare-wrap {
          overflow-x: auto;
          border: 1px solid var(--ink);
          margin-top: 8px;
        }
        .dev-page table.compare {
          width: 100%;
          border-collapse: collapse;
          min-width: 640px;
          background: var(--card);
        }
        .dev-page table.compare th, .dev-page table.compare td {
          padding: 16px 20px;
          text-align: left;
          font-size: 13.5px;
          border-bottom: 1px solid var(--paper-line);
        }
        .dev-page table.compare th {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid var(--ink);
          background: var(--paper);
        }
        .dev-page table.compare th.hl {
          color: var(--pine);
        }
        .dev-page table.compare td.hl {
          background: rgba(36, 70, 59, 0.06);
          font-weight: 600;
          color: var(--pine);
        }
        .dev-page table.compare tr:last-child td {
          border-bottom: none;
        }
        .dev-page table.compare td:first-child {
          color: var(--ink-soft);
          font-weight: 600;
        }
        .dev-page .honesty-note {
          border-left: 3px solid var(--marker);
          padding: 14px 0 14px 22px;
          margin-top: 26px;
          font-size: 15px;
          color: var(--ink-soft);
          max-width: 720px;
        }
        .dev-page .honesty-note strong {
          color: var(--ink);
        }
        
        /* pricing tiers */
        .dev-page .tier-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media(max-width: 1000px) {
          .dev-page .tier-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media(max-width: 620px) {
          .dev-page .tier-grid {
            grid-template-columns: 1fr;
          }
        }
        .dev-page .tier {
          border: 1px solid var(--ink);
          background: var(--card);
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .dev-page .tier.rec {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-page .tier .flag {
          position: absolute;
          top: -1px;
          left: -1px;
          background: var(--marker);
          color: #fff;
          font-size: 10.5px;
          padding: 5px 10px;
          font-family: 'IBM Plex Mono', monospace;
        }
        .dev-page .tier .use {
          font-size: 12px;
          color: var(--ink-soft);
          margin-bottom: 10px;
          min-height: 32px;
        }
        .dev-page .tier.rec .use {
          color: #CFE0DA;
        }
        .dev-page .tier h4 {
          font-size: 17px;
          margin-bottom: 10px;
        }
        .dev-page .tier .price {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .dev-page .tier .price-sub {
          font-size: 11px;
          color: var(--ink-soft);
          margin-bottom: 18px;
        }
        .dev-page .tier.rec .price-sub {
          color: #CFE0DA;
        }
        .dev-page .tier ul {
          list-style: none;
          font-size: 13px;
          color: var(--ink-soft);
          flex: 1;
          margin-bottom: 18px;
        }
        .dev-page .tier.rec ul {
          color: #E3EEE8;
        }
        .dev-page .tier li {
          padding: 7px 0;
          border-top: 1px dashed var(--paper-line);
        }
        .dev-page .tier.rec li {
          border-top: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .dev-page .tier li:first-child {
          border-top: none;
        }
        .dev-page .tier .tier-cta {
          text-align: center;
          padding: 12px;
          font-size: 13.5px;
          font-weight: 600;
          border: 1.5px solid var(--ink);
          border-radius: var(--radius);
          display: block;
        }
        .dev-page .tier .tier-cta:hover {
          background: var(--ink);
          color: var(--paper);
        }
        .dev-page .tier.rec .tier-cta {
          border-color: var(--paper);
          background: var(--paper);
          color: var(--pine);
        }
        .dev-page .tier.rec .tier-cta:hover {
          background: #fff;
        }
        .dev-page .tier .examples {
          font-size: 11px;
          color: var(--ink-soft);
          margin-top: 14px;
        }
        .dev-page .tier.rec .examples {
          color: #CFE0DA;
        }
        .dev-page .tier .examples a {
          border-bottom: 1px dashed currentColor;
          margin-right: 8px;
        }
        
        /* testimonial */
        .dev-page .testi {
          border: 1px solid var(--ink);
          background: var(--card);
          padding: 30px;
          display: flex;
          gap: 22px;
          align-items: center;
          margin-top: 36px;
        }
        @media(max-width: 600px) {
          .dev-page .testi {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        .dev-page .testi .stars {
          color: var(--marker);
          font-size: 14px;
          margin-bottom: 10px;
        }
        .dev-page .testi p.body {
          font-family: 'Fraunces', serif;
          font-size: 19px;
          font-weight: 450;
          line-height: 1.4;
          max-width: 640px;
        }
        .dev-page .testi .who {
          font-size: 13px;
          color: var(--ink-soft);
          margin-top: 12px;
        }
        .dev-page .testi .who b {
          color: var(--ink);
        }
        
        /* faq */
        .dev-page .faq-item {
          border-bottom: 1px solid var(--ink-soft);
          opacity: 0.9;
        }
        .dev-page .faq-q {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 20px 4px;
          font-family: 'Fraunces', serif;
          font-size: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          color: var(--ink);
        }
        .dev-page .faq-q .plus {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 18px;
          color: var(--marker);
          transition: transform .2s;
          flex-shrink: 0;
          margin-left: 16px;
        }
        .dev-page .faq-item.open .plus {
          transform: rotate(45deg);
        }
        .dev-page .faq-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height .25s ease;
        }
        .dev-page .faq-a p {
          padding: 0 4px 20px;
          font-size: 14.5px;
          color: var(--ink-soft);
          max-width: 700px;
        }
        
        /* case studies */
        .dev-page .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }
        .dev-page .ftab {
          font-size: 12.5px;
          padding: 9px 16px;
          border: 1px solid var(--ink);
          background: var(--card);
          cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
          transition: background .15s, color .15s;
        }
        .dev-page .ftab:hover {
          background: var(--paper-line);
        }
        .dev-page .ftab.on {
          background: var(--pine);
          color: var(--paper);
          border-color: var(--pine);
        }
        .dev-page .case-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media(max-width: 1000px) {
          .dev-page .case-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media(max-width: 760px) {
          .dev-page .case-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media(max-width: 480px) {
          .dev-page .case-grid {
            grid-template-columns: 1fr;
          }
        }
        .dev-page .case-card {
          display: block;
          border: 1px solid var(--ink);
          background: var(--card);
          overflow: hidden;
          transition: border-color .15s;
        }
        .dev-page .case-card.hide {
          display: none;
        }
        .dev-page .case-card:hover {
          border-color: var(--pine);
        }
        .dev-page .case-card .img {
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #d8d2c1;
        }
        .dev-page .case-card .img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dev-page .case-body {
          padding: 13px 15px;
        }
        .dev-page .case-body .tag {
          font-size: 10px;
          color: var(--marker);
          margin-bottom: 4px;
        }
        .dev-page .case-body h4 {
          font-size: 14.5px;
        }
        .dev-page .verify-note {
          border: 1.5px dashed var(--ink-soft);
          padding: 18px 22px;
          font-size: 13px;
          color: var(--ink-soft);
          margin-top: 28px;
          background: rgba(255, 255, 255, 0.3);
        }
        .dev-page .verify-note b {
          color: var(--ink);
        }
        
        /* more services */
        .dev-page .more-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media(max-width: 760px) {
          .dev-page .more-grid {
            grid-template-columns: 1fr;
          }
        }
        .dev-page .more-card {
          border: 1px solid var(--ink);
          background: var(--card);
          padding: 24px;
        }
        .dev-page .more-card h4 {
          font-size: 17px;
          margin-bottom: 8px;
        }
        .dev-page .more-card p {
          font-size: 13.5px;
          color: var(--ink-soft);
          margin-bottom: 14px;
        }
        .dev-page .more-card .go {
          font-size: 12.5px;
          color: var(--pine);
          border-bottom: 1px solid var(--pine);
          padding-bottom: 2px;
        }
        
        .dev-page .final {
          background: var(--pine);
          color: var(--paper);
          text-align: center;
        }
        .dev-page .final h2 {
          font-size: clamp(30px, 4.5vw, 48px);
          max-width: 720px;
          margin: 0 auto 18px;
        }
        .dev-page .final p {
          color: #CFE0DA;
          max-width: 520px;
          margin: 0 auto 32px;
          font-size: 16px;
        }
        .dev-page .final .btn-primary {
          background: var(--paper);
          color: var(--pine);
        }
        .dev-page .final .btn-primary:hover {
          background: #fff;
        }
        
        /* sticky cta bottom */
        .dev-page .sticky-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: var(--ink);
          padding: 9px 14px;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-top: 1px solid #000;
        }
        .dev-page .sticky-cta .txt {
          color: #fff;
          font-size: 11.5px;
          line-height: 1.2;
        }
        .dev-page .sticky-cta .txt b {
          display: block;
          font-size: 13px;
        }
        .dev-page .sticky-cta a {
          background: var(--paper);
          color: var(--ink);
          padding: 0 14px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12.5px;
          font-weight: 600;
          border-radius: var(--radius, 4px);
          white-space: nowrap;
          text-decoration: none;
        }
        .dev-page .sticky-cta a.wa-btn {
          background: #25D366 !important;
          color: #ffffff !important;
          padding: 0 !important;
          width: 34px !important;
          height: 34px !important;
          min-width: 34px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 4px !important;
          flex-shrink: 0;
        }


        @media(max-width: 700px) {
          .dev-page .sticky-cta {
            display: flex;
          }
          body {
            padding-bottom: 64px;
          }
        }
      `}} />

      <RegistrationMarks />
      <Navbar />

      <div className="dev-page">
        <div className="wrap crumb">
          <Link to="/services">Services</Link>
          <span className="sep">/</span>
          <span className="cur">Web &amp; App Development</span>
        </div>

        <section className="hero">
          <div className="wrap">
            <div className="sheet-label">
              <span className="tag mono">SHEET NO. 08 — WEB &amp; APP DEVELOPMENT</span>
              <span className="rule"></span>
              <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>SCALE 1:1</span>
            </div>
            <h1>Custom web &amp; app development <em>that performs, seamlessly.</em></h1>

            <div className="hero-grid">
              <div>
                <p className="hero-sub">From marketing websites to custom dashboards, we build digital products that load fast, look sharp, and adapt to your growth. Whether it's Shopify, Webflow, or fully custom code, our dev team delivers performance without compromising design.</p>
                <div className="cta-row">
                  <a className="btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call →</a>
                  <a className="btn-link" href="https://wa.me/919428859768" target="_blank" rel="noopener noreferrer">or message us on WhatsApp</a>
                </div>

                <p className="price-note">Shopify builds, fixed at <b>₹96,000.</b> Custom builds, fixed at <b>₹1,45,000.</b> One price, agreed before work starts — no surprises at delivery.</p>
              </div>

              <div>
                <div className="annot-card">
                  <div className="corner"></div>
                  <div className="annot-title mono">Web &amp; App Development</div>
                  <div className="annot-row"><span>Platforms</span><span>Shopify, Webflow, Custom code</span></div>
                  <div className="annot-row"><span>Timeline</span><span>3–10 weeks by scope</span></div>
                  <div className="annot-row"><span>Support</span><span>15 days – 2 months, included</span></div>
                  <div className="annot-row"><span>Handoff</span><span>Full tutorial on updating the site</span></div>
                </div>
                <div className="feat-case">
                  <div className="fimg">
                    <img src="https://framerusercontent.com/images/uDdH4r3dDH0e0oPRnTJg7WFpE.webp?width=1685&height=1360" alt="Sonar SaaS platform website" />
                  </div>
                  <div className="fbody">
                    <div className="tag mono">FEATURED — SONAR, SAAS PLATFORM</div>
                    <h4 style={{ fontSize: '16px' }}>Clean, responsive site</h4>
                    <p>Drove 70% more client inquiries after launch.</p>
                    <a className="btn-link" href="https://wa.me/919428859768" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', fontSize: '13px', marginTop: '12px' }}>
                      or message us on WhatsApp
                    </a>

                  </div>
                </div>
              </div>
            </div>

            <div className="stat-strip">
              <div className="stat"><div class="num">20+</div><div className="lbl mono">websites &amp; apps shipped</div></div>
              <div className="stat"><div class="num">3</div><div className="lbl mono">platforms — Shopify, Webflow, custom code</div></div>
              <div className="stat"><div class="num">3–10</div><div className="lbl mono">week delivery window</div></div>
              <div className="stat"><div class="num">70%</div><div className="lbl mono">avg. lift in inbound inquiries</div></div>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="split">
              <div>
                <div className="eyebrow mono">WHAT WE BUILD</div>
                <h2 style={{ fontSize: 'clamp(26px,3vw,36px)', marginBottom: '16px' }}>Web &amp; app development built to scale with your brand.</h2>
                <p style={{ color: 'var(--ink-soft)', fontSize: '15.5px' }}>From marketing websites to custom dashboards, we build digital products that load fast, look sharp, and adapt to your growth — no-code, low-code, or fully custom, delivered without compromising design.</p>
              </div>
              <img src="https://framerusercontent.com/images/TW8nh45W2f0jJxIXkfCtK2I9qo.webp?width=1876&height=1821" alt="Heydoh e-commerce site" />
            </div>

            <div className="deliv-grid" style={{ marginTop: '44px' }}>
              <div className="deliv-col"><h4>UX Moodboards</h4><p>Visual direction agreed before a single screen is built.</p></div>
              <div className="deliv-col"><h4>Wireframes, UI &amp; UX</h4><p>Structure and flow mapped for every key page.</p></div>
              <div className="deliv-col"><h4>Content Writing</h4><p>On-brand copy for every page, not filler text.</p></div>
              <div className="deliv-col"><h4>Custom Design</h4><p>Every screen designed for your brand, not a template.</p></div>
              <div className="deliv-col"><h4>Dynamic, Responsive Animation</h4><p>Motion that adapts cleanly across every screen size.</p></div>
              <div className="deliv-col"><h4>Home + Unlimited Pages</h4><p>Every page you need during the build, no per-page fees.</p></div>
              <div className="deliv-col"><h4>Shopify / Webflow / Custom Code</h4><p>Built on the platform that actually fits your scope.</p></div>
              <div className="deliv-col"><h4>Tutorial on Updating Site</h4><p>A walkthrough so your team can self-serve after launch.</p></div>
              <div className="deliv-col"><h4>Payment Gateway Integration</h4><p>Razorpay, Stripe, PayPal, or your gateway of choice.</p></div>
              <div className="deliv-col"><h4>Complete End-to-End Development</h4><p>Strategy through launch — one team, one point of contact.</p></div>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono">SHOPIFY OR CUSTOM?</div>
                <h2>Most agencies push what they only know how to build. We'll tell you which one you actually need.</h2>
              </div>
              <p>Our competitors in this space build almost exclusively on Shopify. We build both — so the platform recommendation you get is based on your brand, not our limitations.</p>
            </div>

            <div className="compare-wrap">
              <table className="compare">
                <thead>
                  <tr><th>&nbsp;</th><th>Shopify / E-commerce Build</th><th className="hl">Custom Website Build</th></tr>
                </thead>
                <tbody>
                  <tr><td>Best for</td><td>DTC brands selling products, need speed to launch</td><td className="hl">Brands needing something a template can't do</td></tr>
                  <tr><td>Timeline</td><td>3–5 weeks</td><td className="hl">6–10 weeks</td></tr>
                  <tr><td>Flexibility</td><td>High, within Shopify's ecosystem &amp; apps</td><td className="hl">Unlimited — built exactly to your spec</td></tr>
                  <tr><td>Ongoing platform cost</td><td>Shopify subscription + paid apps</td><td className="hl">Hosting only — no platform fees</td></tr>
                  <tr><td>Fixed price</td><td>₹96,000</td><td className="hl">₹1,45,000</td></tr>
                </tbody>
              </table>
            </div>
            <div className="honesty-note">
              <strong>Our honest take:</strong> if you're selling a straightforward product catalog and want to launch fast, Shopify is usually the right call — we'll say so even though the custom build is the bigger project for us. If your brand needs a specific interaction, a system Shopify can't do natively, or zero recurring platform fees at scale, custom is worth the extra investment.
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono">PRICING OPTIONS</div>
                <h2>Flexible development plans that fit your launch and growth timeline.</h2>
              </div>
            </div>

            <div className="tier-grid">
              <div className="tier">
                <div className="use">Individuals &amp; small businesses</div>
                <h4>Starter Site</h4>
                <div className="price">₹85,000</div>
                <div className="price-sub mono">PER PROJECT</div>
                <ul>
                  <li>1–5 page website</li>
                  <li>Mobile responsive design</li>
                  <li>Basic UI/UX design</li>
                  <li>Contact form integration</li>
                  <li>Fast loading speed</li>
                  <li>Basic SEO setup</li>
                  <li>15 days free support</li>
                </ul>
                <a className="tier-cta" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Get started</a>
              </div>

              <div className="tier">
                <div className="use">DTC brands launching or migrating to Shopify</div>
                <h4>Shopify / E-commerce Build</h4>
                <div className="price">₹96,000</div>
                <div className="price-sub mono">FIXED PRICE · UP TO 50 SKUs</div>
                <ul>
                  <li>Built in Shopify, WooCommerce, or equivalent</li>
                  <li>Dynamic product listing</li>
                  <li>Unlimited pages</li>
                  <li>Payment gateway integration</li>
                  <li>Launch support</li>
                  <li>15 days free support</li>
                </ul>
                <div className="examples" style={{ marginTop: 'auto', marginBottom: '14px' }}>
                  Examples: <a href="https://shaktimat.ca/" target="_blank" rel="noopener noreferrer">Shaktimat</a><a href="https://suta.in/" target="_blank" rel="noopener noreferrer">Suta</a><a href="https://www.arata.in/" target="_blank" rel="noopener noreferrer">Arata</a>
                </div>
                <a className="tier-cta" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Get started</a>
              </div>

              <div className="tier rec">
                <div className="flag">RECOMMENDED FOR GROWING BRANDS</div>
                <div className="use">Brands &amp; companies who've outgrown templates</div>
                <h4>Custom Website Build</h4>
                <div className="price">₹1,45,000</div>
                <div className="price-sub mono">FIXED PRICE · UP TO 10 PAGES</div>
                <ul>
                  <li>10-page website</li>
                  <li>Advanced animations &amp; interactions</li>
                  <li>Advanced SEO optimization</li>
                  <li>Third-party integrations (CRM, APIs)</li>
                  <li>AI integration where useful</li>
                  <li>2 months free support</li>
                </ul>
                <a className="tier-cta" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Get started</a>
              </div>

              <div className="tier">
                <div className="use">Cross-platform app development</div>
                <h4>App Development</h4>
                <div className="price">₹2,85,000</div>
                <div className="price-sub mono">PER PROJECT</div>
                <ul>
                  <li>Single codebase for iOS &amp; Android</li>
                  <li>UX moodboard</li>
                  <li>Custom wireframe &amp; UI/UX design</li>
                  <li>Advanced dynamic animation</li>
                  <li>Payment gateways</li>
                  <li>Speed optimization</li>
                  <li>Special &amp; custom API integrations</li>
                </ul>
                <a className="tier-cta" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Get started</a>
              </div>
            </div>

            <div style={{ marginTop: '26px', border: '1px solid var(--ink)', background: 'var(--card)', padding: '26px 28px' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>What changes the price — and what never does</div>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', maxWidth: '640px', marginBottom: '18px' }}>Every price above is fixed for the scope listed. Nothing is added without your sign-off — if your project needs more than the base scope, here's exactly what that costs:</p>
              <div className="dev-price-addons-grid">
                <div className="addon-row"><span className="lbl">Shopify catalog beyond 50 SKUs</span><span className="val">+₹10,000</span></div>
                <div className="addon-row"><span className="lbl">Migration from an existing platform</span><span className="val">+₹15,000</span></div>
                <div className="addon-row"><span className="lbl">Custom pages beyond 10 (Custom Build)</span><span className="val">+₹8,000 / page</span></div>
                <div className="addon-row"><span className="lbl">Multi-currency / international checkout</span><span className="val">+₹10,000</span></div>
                <div className="addon-row"><span className="lbl">Custom app or API integration</span><span className="val">+₹12,000</span></div>
                <div className="addon-row"><span className="lbl">Membership / gated login system</span><span className="val">+₹18,000</span></div>
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginTop: '16px' }}>You'll see all applicable add-ons in your quote before work begins — never after. If none apply, you pay exactly the fixed price above.</p>
            </div>

            <div className="testi">
              <div>
                <div className="stars">★★★★★</div>
                <p className="body">"We've worked with other agencies before, but the attention to detail and design thinking here was on another level."</p>
                <div className="who"><b>Amir D.</b> — Operations Lead at Arteko</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono">FAQ</div>
                <h2>Frequently asked questions.</h2>
              </div>
            </div>
            <div id="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => toggleFaq(idx)}>
                    {faq.q}
                    <span className="plus">+</span>
                  </button>
                  <div
                    className="faq-a"
                    style={{
                      maxHeight: openFaq === idx ? '250px' : '0px',
                      transition: 'max-height 0.25s ease',
                      overflow: 'hidden'
                    }}
                  >
                    <p style={{ padding: '0 4px 20px' }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow mono">OUR WORK</div>
                <h2>Work we've built so far.</h2>
              </div>
            </div>

            <div className="filter-tabs">
              <button className={`ftab ${activeCategory === 'all' ? 'on' : ''}`} onClick={() => setActiveCategory('all')}>All</button>
              <button className={`ftab ${activeCategory === 'native' ? 'on' : ''}`} onClick={() => setActiveCategory('native')}>Native Code</button>
              <button className={`ftab ${activeCategory === 'nocode' ? 'on' : ''}`} onClick={() => setActiveCategory('nocode')}>No Code</button>
              <button className={`ftab ${activeCategory === 'ecommerce' ? 'on' : ''}`} onClick={() => setActiveCategory('ecommerce')}>E-commerce</button>
            </div>

            <div className="case-grid">
              {cases.map((c, idx) => {
                const shouldHide = activeCategory !== 'all' && c.cat !== activeCategory;
                return (
                  <a
                    key={idx}
                    className={`case-card ${shouldHide ? 'hide' : ''}`}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="img">
                      <img src={c.img} alt={c.title} loading="lazy" />
                    </div>
                    <div className="case-body">
                      <div className="tag mono">{c.label}</div>
                      <h4>{c.title}</h4>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="verify-note">
              <b>Before this goes live:</b> confirm every logo above reflects work TDB actually delivered. Large, well-known names (Dockers, Mejuri, Bruvi, Silk &amp; Willow, Music Radio Creative, Yowy, Double Standard, Coastal Cowboys) are the kind a high-ticket prospect will look up first — remove any that were reference/inspiration examples rather than client work, since one mismatch undermines the whole page's credibility faster than any single case study builds it.
            </div>
          </div>
        </section>

        <MoreServicesSection current="development" />


        <section className="final">
          <div className="wrap">
            <h2>Not sure if you need Shopify or a custom build?</h2>
            <p>Book a free 15-minute call. We'll tell you honestly which one fits your brand and budget — no platform bias.</p>
            <a className="btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book a 15-min call →</a>
          </div>
        </section>
      </div>

      <div className="sticky-cta">
        <div className="txt">Shopify, fixed at ₹96,000<b>Free 15-min call</b></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="wa-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              minWidth: '34px',
              backgroundColor: '#25D366',
              borderRadius: '4px',
              color: '#ffffff',
              flexShrink: 0,
              padding: 0,
              textDecoration: 'none'
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" style={{ width: '20px', height: '20px', display: 'block', fill: '#ffffff' }}>
              <path
                fill="#ffffff"
                d="M12.031 2C6.49 2 2 6.491 2 12.029c0 1.947.558 3.766 1.523 5.308L2 22l4.823-1.46c1.512.923 3.284 1.455 5.208 1.455C17.57 22 22 17.509 22 11.97 21.999 6.491 17.57 2 12.031 2zm0 18.064c-1.745 0-3.353-.489-4.717-1.332l-.337-.21-2.817.852.868-2.656-.23-.368c-.923-1.472-1.442-3.21-1.442-5.08 0-4.992 4.062-9.052 9.06-9.052 4.998 0 9.057 4.06 9.057 9.052.001 4.997-4.06 9.058-9.042 9.058zm5.086-6.666c-.28-.14-1.649-.813-1.903-.906-.254-.093-.44-.14-.627.14-.187.28-.722.906-.886 1.093-.163.186-.328.21-.608.07-.28-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.656-1.553-1.936-.163-.28-.018-.431.122-.571.127-.126.28-.327.42-.49.14-.163.187-.28.28-.466.094-.187.047-.35-.024-.49-.07-.14-.627-1.508-.859-2.07-.226-.543-.456-.468-.627-.477-.163-.008-.35-.01-.537-.01-.187 0-.49.07-.747.35-.257.28-1.028.98-1.028 2.392s1.028 2.776 1.17 2.964c.14.186 2.019 3.084 4.89 4.324.683.295 1.218.47 1.633.602.686.218 1.31.187 1.803.114.549-.08 1.65-.675 1.884-1.326.234-.65.234-1.21.164-1.325-.07-.116-.257-.186-.537-.326z"
              />
            </svg>
          </a>
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">Book now →</a>
        </div>
      </div>




      <Footer />
    </>
  );
}
