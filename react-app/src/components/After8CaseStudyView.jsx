import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationMarks from './RegistrationMarks';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyMobileCTA from './StickyMobileCTA';

export default function After8CaseStudyView({ nextProject, pageRef }) {
  return (
    <div ref={pageRef} className="after8-case-study-page">
      <style>{`
        /* ─────────────────────────────────────────────────────────────
           AFTER8® Dedicated Case Study Styles (work-after8.html spec)
        ───────────────────────────────────────────────────────────── */
        .after8-case-study-page {
          background-color: var(--paper);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
        }

        .after8-case-study-page h1,
        .after8-case-study-page h2,
        .after8-case-study-page h3,
        .after8-case-study-page h4 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.05;
        }

        .after8-case-study-page .mono {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.03em;
        }

        .after8-case-study-page .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* Breadcrumb */
        .after8-case-study-page .crumb {
          padding: 22px 0 0;
          font-size: 12.5px;
          color: var(--ink-soft);
        }
        .after8-case-study-page .crumb a {
          color: var(--ink-soft);
          border-bottom: 1px dashed var(--ink-soft);
        }
        .after8-case-study-page .crumb a:hover {
          color: var(--pine);
          border-color: var(--pine);
        }
        .after8-case-study-page .crumb span.sep {
          margin: 0 8px;
          opacity: 0.5;
        }
        .after8-case-study-page .crumb span.cur {
          color: var(--ink);
        }

        /* Hero */
        .after8-case-study-page .case-hero {
          padding: 26px 0 48px;
        }
        .after8-case-study-page .sheet-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 26px;
          width: 100%;
        }
        .after8-case-study-page .sheet-label .tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          border: 1px solid var(--ink);
          padding: 6px 12px;
          background: var(--card);
          white-space: nowrap;
        }
        .after8-case-study-page .sheet-label .rule {
          flex: 1;
          height: 1px;
          background: var(--paper-line);
        }
        .after8-case-study-page .case-hero h1 {
          font-size: clamp(28px, 4.8vw, 60px);
          max-width: 920px;
          word-break: break-word;
        }
        .after8-case-study-page .case-hero h1 em {
          font-style: normal;
          color: var(--pine);
        }
        .after8-case-study-page .case-hero .dek {
          font-size: 18px;
          color: var(--ink-soft);
          max-width: 680px;
          margin-top: 20px;
          line-height: 1.5;
        }

        .after8-case-study-page .meta-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--ink);
          margin-top: 40px;
          background: var(--card);
        }
        .after8-case-study-page .meta-cell {
          padding: 18px 22px;
          border-right: 1px solid var(--ink);
        }
        .after8-case-study-page .meta-cell:last-child {
          border-right: none;
        }
        .after8-case-study-page .meta-cell .k {
          font-size: 10.5px;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 6px;
        }
        .after8-case-study-page .meta-cell .v {
          font-family: 'Fraunces', serif;
          font-size: 15.5px;
          font-weight: 600;
        }
        @media (max-width: 800px) {
          .after8-case-study-page .meta-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .after8-case-study-page .meta-cell:nth-child(2) {
            border-right: none;
          }
          .after8-case-study-page .meta-cell:nth-child(1),
          .after8-case-study-page .meta-cell:nth-child(2) {
            border-bottom: 1px solid var(--ink);
          }
        }
        @media (max-width: 520px) {
          .after8-case-study-page .meta-strip {
            grid-template-columns: 1fr;
          }
          .after8-case-study-page .meta-cell {
            border-right: none !important;
            border-bottom: 1px solid var(--ink) !important;
          }
          .after8-case-study-page .meta-cell:last-child {
            border-bottom: none !important;
          }
        }

        .after8-case-study-page .hero-visual {
          margin-top: 32px;
          border: 1px solid var(--ink);
          overflow: hidden;
        }
        .after8-case-study-page .hero-visual img {
          width: 100%;
          display: block;
        }

        /* Non-sticky In-Page Navigation Bar */
        .after8-case-study-page .toc-bar {
          display: flex;
          overflow-x: auto;
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          background: var(--card);
          position: relative;
          z-index: 5;
          margin-top: 24px;
          -webkit-overflow-scrolling: touch;
        }
        .after8-case-study-page .toc-bar a {
          flex: 0 0 auto;
          padding: 14px 20px;
          font-size: 12px;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
          border-right: 1px solid var(--paper-line);
          color: var(--ink-soft);
          white-space: nowrap;
          transition: background .15s, color .15s;
          text-decoration: none;
        }
        .after8-case-study-page .toc-bar a:hover {
          color: var(--pine);
          background: var(--paper);
        }
        .after8-case-study-page .toc-bar a:last-child {
          border-right: none;
        }

        .after8-case-study-page section {
          padding: 64px 0;
        }
        @media (max-width: 640px) {
          .after8-case-study-page section {
            padding: 40px 0;
          }
          .after8-case-study-page .wrap {
            padding: 0 16px;
          }
        }
        .after8-case-study-page .section-head {
          margin-bottom: 32px;
        }
        .after8-case-study-page .eyebrow {
          font-size: 12px;
          color: var(--marker);
          margin-bottom: 10px;
        }
        .after8-case-study-page .section-head h2 {
          font-size: clamp(26px, 3.2vw, 40px);
          max-width: 720px;
        }
        .after8-case-study-page .section-head p.lede {
          color: var(--ink-soft);
          max-width: 600px;
          font-size: 15.5px;
          margin-top: 12px;
          line-height: 1.6;
        }

        /* Problem Section (Dark) */
        .after8-case-study-page .problem {
          background: var(--ink);
          color: var(--paper);
        }
        .after8-case-study-page .problem .eyebrow {
          color: #C9C3B4;
        }
        .after8-case-study-page .problem h2 {
          color: #FFF;
        }
        .after8-case-study-page .problem-copy {
          font-size: 18px;
          line-height: 1.7;
          color: #E7E3D8;
          max-width: 820px;
        }
        .after8-case-study-page .problem-copy strong {
          color: #FFF;
        }
        .after8-case-study-page .problem-copy p + p {
          margin-top: 16px;
        }

        /* Comparison Table */
        .after8-case-study-page .compare-wrap {
          overflow-x: auto;
          border: 1px solid var(--paper-line);
          margin-top: 36px;
        }
        .after8-case-study-page table.compare {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
          background: rgba(255, 255, 255, 0.03);
        }
        .after8-case-study-page table.compare th,
        .after8-case-study-page table.compare td {
          padding: 15px 18px;
          text-align: left;
          font-size: 13.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          color: #E7E3D8;
        }
        .after8-case-study-page table.compare th {
          font-family: 'Fraunces', serif;
          font-size: 15px;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          color: #FFF;
        }
        .after8-case-study-page table.compare th.hl {
          color: #8FD6B8;
        }
        .after8-case-study-page table.compare td.hl {
          background: rgba(143, 214, 184, 0.08);
          font-weight: 600;
          color: #FFF;
        }
        .after8-case-study-page table.compare tr:last-child td {
          border-bottom: none;
        }
        .after8-case-study-page table.compare td:first-child {
          color: #C9C3B4;
        }
        .after8-case-study-page .ic-yes {
          color: #8FD6B8;
          font-weight: 700;
        }
        .after8-case-study-page .ic-no {
          color: #8B8571;
        }

        /* Mosaic Gallery */
        .after8-case-study-page .mosaic {
          columns: 3;
          column-gap: 16px;
        }
        .after8-case-study-page .mosaic img {
          width: 100%;
          display: block;
          margin-bottom: 16px;
          border: 1px solid var(--ink);
          break-inside: avoid;
        }
        @media (max-width: 860px) {
          .after8-case-study-page .mosaic { columns: 2; }
        }
        @media (max-width: 520px) {
          .after8-case-study-page .mosaic { columns: 1; }
        }
        .after8-case-study-page .mosaic.small {
          columns: 4;
        }
        @media (max-width: 860px) {
          .after8-case-study-page .mosaic.small { columns: 3; }
        }
        @media (max-width: 560px) {
          .after8-case-study-page .mosaic.small { columns: 2; }
        }

        /* Qualification Grid */
        .after8-case-study-page .qual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--ink);
          border: 1px solid var(--ink);
        }
        @media (max-width: 760px) {
          .after8-case-study-page .qual-grid { grid-template-columns: 1fr; }
        }
        .after8-case-study-page .qual-col {
          background: var(--card);
          padding: 30px 28px;
        }
        .after8-case-study-page .qual-col.no {
          background: #EFEBE2;
        }
        .after8-case-study-page .qual-col.yes {
          background: var(--pine);
          color: var(--paper);
        }
        .after8-case-study-page .qual-col h4 {
          font-size: 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .after8-case-study-page .qual-col.yes h4 {
          color: #FFF;
        }
        .after8-case-study-page .qual-col h4 .mark {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }
        .after8-case-study-page .qual-col.yes h4 .mark {
          background: var(--paper);
          color: var(--pine);
        }
        .after8-case-study-page .qual-col.no h4 .mark {
          background: transparent;
          border: 1.5px solid var(--ink-soft);
          color: var(--ink-soft);
        }
        .after8-case-study-page .qual-col ul {
          list-style: none;
          font-size: 14px;
          color: var(--ink-soft);
        }
        .after8-case-study-page .qual-col.yes ul {
          color: #CFE0DA;
        }
        .after8-case-study-page .qual-col li {
          padding: 8px 0;
          border-top: 1px dashed var(--paper-line);
        }
        .after8-case-study-page .qual-col.yes li {
          border-top: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .after8-case-study-page .qual-col li:first-child {
          border-top: none;
        }

        /* Positioning Statement Block */
        .after8-case-study-page .statement {
          background: var(--pine);
          color: var(--paper);
          text-align: center;
          padding: 64px 40px;
          border: 1px solid var(--ink);
        }
        .after8-case-study-page .statement .eyebrow2 {
          font-size: 12px;
          color: #9FCBB6;
          margin-bottom: 16px;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.05em;
        }
        .after8-case-study-page .statement h2 {
          font-size: clamp(28px, 4.6vw, 50px);
          color: #FFF;
          max-width: 820px;
          margin: 0 auto;
        }
        .after8-case-study-page .statement-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 26px;
        }
        .after8-case-study-page .statement-tags span {
          font-size: 12.5px;
          font-family: 'IBM Plex Mono', monospace;
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 6px 14px;
          color: #CFE0DA;
        }

        /* Giant Eight Signature */
        .after8-case-study-page .giant-eight {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 36px 0 24px;
          text-align: center;
        }
        .after8-case-study-page .giant-eight .tagbox {
          position: relative;
          font-size: 11px;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.05em;
          border: 1px solid var(--ink);
          padding: 6px 14px;
          background: var(--card);
          color: var(--pine);
          font-weight: 600;
          margin-bottom: 24px;
          display: inline-block;
        }
        .after8-case-study-page .giant-eight .num {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: clamp(140px, 22vw, 280px);
          line-height: 0.85;
          color: var(--ink);
          opacity: 0.95;
          margin: 0;
        }

        /* Annotated Card & Audience Grid */
        .after8-case-study-page .annot-card {
          background: var(--card);
          border: 1px solid var(--ink);
          padding: 26px;
          position: relative;
        }
        .after8-case-study-page .annot-card .corner {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 26px;
          height: 26px;
          background: var(--marker);
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        .after8-case-study-page .annot-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px dashed var(--paper-line);
          padding: 10px 0;
          font-size: 13px;
        }
        .after8-case-study-page .annot-row:last-child {
          border-bottom: none;
        }
        .after8-case-study-page .annot-row span:first-child {
          color: var(--ink-soft);
        }
        .after8-case-study-page .annot-title {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-bottom: 14px;
        }

        .after8-case-study-page .audience-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .after8-case-study-page .audience-grid { grid-template-columns: 1fr; }
        }
        .after8-case-study-page .audience-copy p {
          font-size: 16px;
          color: var(--ink-soft);
          line-height: 1.7;
        }
        .after8-case-study-page .audience-copy p + p {
          margin-top: 14px;
        }
        .after8-case-study-page .audience-copy strong {
          color: var(--ink);
        }

        .after8-case-study-page .insight-card {
          border-left: 3px solid var(--marker);
          padding: 8px 0 8px 24px;
          margin-top: 30px;
        }
        .after8-case-study-page .insight-card .lbl {
          font-size: 11px;
          color: var(--marker);
          margin-bottom: 10px;
          font-family: 'IBM Plex Mono', monospace;
        }
        .after8-case-study-page .insight-card p {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 450;
          max-width: 700px;
          line-height: 1.4;
        }

        /* Pillars Process */
        .after8-case-study-page .process {
          display: flex;
          gap: 0;
          overflow-x: auto;
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          -webkit-overflow-scrolling: touch;
        }
        .after8-case-study-page .pstep {
          flex: 1;
          min-width: 190px;
          padding: 24px 20px;
          border-right: 1px solid var(--ink-soft);
          position: relative;
          background: var(--card);
        }
        .after8-case-study-page .pstep:last-child {
          border-right: none;
        }
        .after8-case-study-page .pstep .n {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--marker);
        }
        .after8-case-study-page .pstep h4 {
          font-size: 16px;
          margin: 8px 0 6px;
        }
        .after8-case-study-page .pstep p {
          font-size: 13px;
          color: var(--ink-soft);
        }

        /* Flavour System */
        .after8-case-study-page .flavor-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-top: 32px;
        }
        @media (max-width: 900px) {
          .after8-case-study-page .flavor-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 520px) {
          .after8-case-study-page .flavor-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .after8-case-study-page .flavor-card {
          border: 1px solid var(--ink);
          overflow: hidden;
          background: var(--card);
        }
        .after8-case-study-page .flavor-swatch {
          height: 88px;
        }
        .after8-case-study-page .flavor-info {
          padding: 14px 12px;
        }
        .after8-case-study-page .flavor-info .name {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 14.5px;
        }
        .after8-case-study-page .flavor-info .mood {
          font-size: 11px;
          color: var(--ink-soft);
          margin-top: 4px;
        }

        /* Deliverable Grid */
        .after8-case-study-page .deliv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--ink);
          border: 1px solid var(--ink);
          margin-top: 10px;
        }
        @media (max-width: 760px) {
          .after8-case-study-page .deliv-grid { grid-template-columns: 1fr; }
        }
        .after8-case-study-page .deliv-col {
          background: var(--card);
          padding: 24px 22px;
        }
        .after8-case-study-page .deliv-col h4 {
          font-size: 15px;
          margin-bottom: 10px;
        }
        .after8-case-study-page .deliv-col ul {
          list-style: none;
          font-size: 13.5px;
          color: var(--ink-soft);
        }
        .after8-case-study-page .deliv-col li {
          padding: 7px 0;
          display: flex;
          gap: 10px;
        }
        .after8-case-study-page .deliv-col li::before {
          content: "—";
          color: var(--pine);
          flex-shrink: 0;
        }

        /* Photography Split */
        .after8-case-study-page .photo-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 700px) {
          .after8-case-study-page .photo-split { grid-template-columns: 1fr; }
        }
        .after8-case-study-page .photo-split img {
          border: 1px solid var(--ink);
          width: 100%;
        }

        /* Messaging Wall */
        .after8-case-study-page .messaging-wall {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 12px;
        }
        @media (max-width: 860px) {
          .after8-case-study-page .messaging-wall { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .after8-case-study-page .messaging-wall { grid-template-columns: 1fr; }
        }
        .after8-case-study-page .msg-card {
          border: 1px solid var(--ink);
          background: var(--card);
          padding: 26px 22px;
          min-height: 120px;
          display: flex;
          align-items: center;
        }
        .after8-case-study-page .msg-card p {
          font-family: 'Fraunces', serif;
          font-size: 19px;
          font-weight: 600;
          line-height: 1.28;
        }

        /* Outcome Stat Strip */
        .after8-case-study-page .stat-strip {
          display: flex;
          flex-wrap: wrap;
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          background: var(--card);
        }
        .after8-case-study-page .stat {
          flex: 1;
          min-width: 140px;
          padding: 24px 22px;
          border-right: 1px solid var(--ink);
        }
        .after8-case-study-page .stat:last-child {
          border-right: none;
        }
        .after8-case-study-page .stat .num {
          font-family: 'Fraunces', serif;
          font-size: 36px;
          font-weight: 600;
          color: var(--pine);
        }
        .after8-case-study-page .stat .lbl {
          font-size: 12px;
          color: var(--ink-soft);
          margin-top: 6px;
        }
        @media (max-width: 700px) {
          .after8-case-study-page .stat-strip { flex-wrap: wrap; }
          .after8-case-study-page .stat { flex: 1 1 50%; border-bottom: 1px solid var(--ink); }
        }

        /* Reserved Testimonial */
        .after8-case-study-page .testi-empty {
          border: 1.5px dashed var(--ink-soft);
          padding: 34px;
          text-align: center;
          color: var(--ink-soft);
          font-size: 13.5px;
          background: rgba(255, 255, 255, 0.3);
        }
        .after8-case-study-page .testi-empty b {
          display: block;
          color: var(--ink);
          font-family: 'Fraunces', serif;
          font-size: 17px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        /* Colophon */
        .after8-case-study-page .colophon {
          display: flex;
          flex-wrap: wrap;
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          background: var(--card);
        }
        .after8-case-study-page .colophon .c-item {
          flex: 1;
          min-width: 180px;
          padding: 20px 24px;
          border-right: 1px solid var(--paper-line);
        }
        .after8-case-study-page .colophon .c-item:last-child {
          border-right: none;
        }
        .after8-case-study-page .colophon .k {
          font-size: 10.5px;
          color: var(--ink-soft);
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .after8-case-study-page .colophon .v {
          font-family: 'Fraunces', serif;
          font-size: 15.5px;
          font-weight: 600;
        }
        @media (max-width: 760px) {
          .after8-case-study-page .colophon .c-item { flex: 1 1 50%; border-bottom: 1px solid var(--paper-line); }
        }

        /* Pricing Anchor */
        .after8-case-study-page .pricing-anchor {
          background: var(--card);
          border: 2px solid var(--pine);
          padding: 36px;
          position: relative;
        }
        .after8-case-study-page .pricing-anchor .flag {
          position: absolute;
          top: -1px;
          right: -1px;
          background: var(--pine);
          color: var(--paper);
          font-size: 11px;
          padding: 5px 10px;
          font-family: 'IBM Plex Mono', monospace;
        }
        .after8-case-study-page .pricing-anchor .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .after8-case-study-page .pricing-anchor h3 {
          font-size: 22px;
          margin-bottom: 8px;
        }
        .after8-case-study-page .pricing-anchor p {
          font-size: 14px;
          color: var(--ink-soft);
          max-width: 520px;
        }
        .after8-case-study-page .pricing-anchor .amt {
          font-family: 'Fraunces', serif;
          font-size: 30px;
          font-weight: 600;
          color: var(--pine);
          white-space: nowrap;
        }
        .after8-case-study-page .pricing-anchor .amt .per {
          display: block;
          font-size: 11px;
          font-family: 'IBM Plex Mono', monospace;
          color: var(--ink-soft);
          font-weight: 400;
          margin-top: 2px;
        }

        .after8-case-study-page .btn-primary {
          background: var(--pine);
          color: var(--paper);
          padding: 15px 26px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 2px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background .15s;
          white-space: nowrap;
          text-decoration: none;
        }
        .after8-case-study-page .btn-primary:hover {
          background: var(--pine-deep);
        }

        .after8-case-study-page .final {
          background: var(--ink);
          color: var(--paper);
          text-align: center;
        }
        .after8-case-study-page .final h2 {
          font-size: clamp(28px, 4.2vw, 44px);
          max-width: 700px;
          margin: 0 auto 18px;
          color: #FFF;
        }
        .after8-case-study-page .final p {
          color: #C9C3B4;
          max-width: 520px;
          margin: 0 auto 28px;
          font-size: 16px;
        }
        .after8-case-study-page .final .btn-primary {
          background: var(--paper);
          color: var(--ink);
        }
        .after8-case-study-page .final .btn-primary:hover {
          background: #FFF;
        }

        .after8-case-study-page .next-project {
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          margin-top: 32px;
        }
        .after8-case-study-page .next-project a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 0;
          text-decoration: none;
        }
        .after8-case-study-page .next-project a:hover .arrow {
          transform: translateX(6px);
        }
        .after8-case-study-page .next-project .lbl {
          font-size: 11px;
          color: var(--marker);
          margin-bottom: 6px;
        }
        .after8-case-study-page .next-project h3 {
          font-size: 24px;
        }
        .after8-case-study-page .arrow {
          transition: transform .2s;
          font-size: 22px;
        }
      `}</style>

      <RegistrationMarks />
      <Navbar />

      {/* Breadcrumb */}
      <div className="wrap crumb">
        <Link to="/work">Work</Link>
        <span className="sep">/</span>
        <span className="cur">AFTER8®</span>
      </div>

      {/* Hero */}
      <section className="case-hero" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag mono">SHEET NO. 07 — CASE STUDY</span>
            <span className="rule"></span>
            <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>SCALE 1:1</span>
          </div>
          <h1>AFTER8® — reimagining intimacy <em>for a new generation.</em></h1>
          <p className="dek">
            AFTER8 was created as a bold rethinking of how modern intimacy brands should look, feel, and behave in culture — a full cultural repositioning, not just a packaging refresh.
          </p>
          <p style={{ marginTop: '14px' }}>
            <a href="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14.5px', color: 'var(--pine)', fontWeight: 600, textDecoration: 'none' }}>
              Prefer WhatsApp for discussion →
            </a>
          </p>

          <div className="meta-strip">
            <div className="meta-cell"><div className="k mono">CLIENT</div><div className="v">AFTER8®</div></div>
            <div className="meta-cell"><div className="k mono">YEAR</div><div className="v">2026</div></div>
            <div className="meta-cell"><div className="k mono">TIMELINE</div><div className="v">8 Weeks</div></div>
            <div className="meta-cell"><div className="k mono">SERVICES</div><div className="v">Branding / Packaging / Web / Photography</div></div>
          </div>

          <div className="hero-visual">
            <img src="https://framerusercontent.com/images/GI9hs6gABp4QhAbVBk1Ej9TVE0.png?width=1685&height=933" alt="AFTER8 key visual" />
          </div>
        </div>
      </section>

      {/* Sticky In-Page Navigation Bar */}
      <nav className="toc-bar">
        <a href="#challenge">Challenge</a>
        <a href="#solution">Solution</a>
        <a href="#positioning">Positioning</a>
        <a href="#audience">Audience</a>
        <a href="#strategy">Strategy</a>
        <a href="#naming">Naming</a>
        <a href="#packaging">Packaging</a>
        <a href="#photography">Photography</a>
        <a href="#campaign">Campaign</a>
        <a href="#outcome">Outcome</a>
      </nav>

      {/* Challenge Section */}
      <section id="challenge" className="problem">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">THE CHALLENGE</div>
            <h2>The category was still designed to be hidden, not shared.</h2>
          </div>
          <div className="problem-copy">
            <p>
              <strong>AFTER8 was created as a bold rethinking of how modern intimacy brands should look, feel, and behave in culture.</strong> The category was dominated by outdated visual systems — overly clinical packaging, awkward messaging, masculine visual language, generic pharmacy aesthetics, and branding that felt emotionally disconnected from the people actually buying it.
            </p>
            <p>
              We saw an opportunity to transform condoms and pleasure products into something people would actually want to display, photograph, and talk about — designed to sit somewhere between fashion, beauty, nightlife, pop culture, wellness, and intimacy. This wasn't a packaging project. It was a full cultural repositioning of what an intimacy brand could become.
            </p>
          </div>

          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>The category, today</th>
                  <th className="hl">AFTER8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tone of voice</td>
                  <td><span className="ic-no">Fear-based, clinical</span></td>
                  <td className="hl"><span className="ic-yes">Confident, playful</span></td>
                </tr>
                <tr>
                  <td>Visual language</td>
                  <td>Aggressive, masculine</td>
                  <td className="hl">Fashion &amp; nightlife-inspired</td>
                </tr>
                <tr>
                  <td>Retail presence</td>
                  <td><span className="ic-no">Uninspired, forgettable</span></td>
                  <td className="hl"><span className="ic-yes">Shelf-dominating</span></td>
                </tr>
                <tr>
                  <td>Social shareability</td>
                  <td><span className="ic-no">Low</span></td>
                  <td className="hl"><span className="ic-yes">Built to be photographed</span></td>
                </tr>
                <tr>
                  <td>Emotional connection</td>
                  <td>Sterile, cold</td>
                  <td className="hl">Warm, collectible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mosaic Gallery 1 */}
      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="mosaic">
            <img src="https://framerusercontent.com/images/uBSqtsY2yQrXzDwj5TCFNnvU.png?width=1536&height=1024" alt="AFTER8 packaging system" />
            <img src="https://framerusercontent.com/images/qant71hj9KPeyj6vzVQEMQgl5T8.png?width=1536&height=1024" alt="AFTER8 identity application" />
            <img src="https://framerusercontent.com/images/XVsYVfYaAZSCgqPrDrAySvOEqsk.png?width=1568&height=1003" alt="AFTER8 brand system" />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">OUR SOLUTION — THE WHITESPACE</div>
            <h2>We found the one gap nobody in the category was designing for.</h2>
            <p className="lede">
              Every competitor was optimizing for fear, performance, or technical specification. Nobody was designing for how the moment actually feels.
            </p>
          </div>

          <div className="qual-grid">
            <div className="qual-col no">
              <h4><span className="mark">✕</span>The category defaults to</h4>
              <ul>
                <li>Fear-based messaging</li>
                <li>Hyper-masculine visual codes</li>
                <li>Technical specifications up front</li>
                <li>Performance as the whole story</li>
              </ul>
            </div>
            <div className="qual-col yes">
              <h4><span className="mark">✓</span>AFTER8 shifts toward</h4>
              <ul>
                <li>Confidence and chemistry</li>
                <li>Self-expression and modern relationships</li>
                <li>Intimacy as identity, not just function</li>
                <li>A visual identity people want to be seen with</li>
              </ul>
            </div>
          </div>

          <p style={{ marginTop: '30px', fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '720px' }}>
            We wanted AFTER8 to feel like a fashion accessory, a beauty product, a nightlife brand, a social-first lifestyle company — not simply a condom company.
          </p>

          <div className="mosaic" style={{ marginTop: '36px' }}>
            <img src="https://framerusercontent.com/images/JpoZtKncR1F4TWug62YHNXhY8I.png?width=1086&height=1448" alt="AFTER8 packaging detail" />
            <img src="https://framerusercontent.com/images/DBUf1j4gdz1eKAhD9k4P9CynCg.png?width=1101&height=1428" alt="AFTER8 packaging detail" />
            <img src="https://framerusercontent.com/images/W7hnRGNI0WrTxD7zgePuiUpb0c.png?width=1178&height=1335" alt="AFTER8 product system" />
            <img src="https://framerusercontent.com/images/EPFV2nlOvDqbHwdKsC2Rds1NGjs.png?width=1698&height=926" alt="AFTER8 identity spread" />
            <img src="https://framerusercontent.com/images/5frC5Sqe7IwwH8IhN77rJtZz478.png?width=1182&height=1330" alt="AFTER8 packaging" />
            <img src="https://framerusercontent.com/images/X82qaE1jdLvt6crEwMKhMJJBPA.png?width=1182&height=1330" alt="AFTER8 packaging variant" />
          </div>
        </div>
      </section>

      {/* Positioning Section */}
      <section id="positioning" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="statement">
            <div className="eyebrow2 mono">BRAND POSITIONING</div>
            <h2>"Made for the moments after 8."</h2>
            <div className="statement-tags">
              <span>Confidence</span><span>Intimacy</span><span>Expression</span><span>Nightlife</span><span>Pleasure</span><span>Aesthetics</span>
            </div>
          </div>
          <p style={{ marginTop: '30px', fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '760px' }}>
            AFTER8 positions itself as a premium intimacy and pleasure brand designed for modern nightlife culture — behaving like a lifestyle brand rather than a healthcare company. The brand language is playful, flirtatious, premium, culturally aware, and socially expressive.
          </p>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="audience" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">TARGET AUDIENCE</div>
            <h2>Designed for people who buy based on identity, not indication.</h2>
          </div>
          <div className="audience-grid">
            <div className="audience-copy">
              <p>
                <strong>Gen-Z and millennial consumers, aged 21–35</strong> — urban, digitally native, and used to choosing brands the way they choose clothes. They care about aesthetics, purchase based on brand identity, value expressive packaging, enjoy nightlife culture, and share the products they use online.
              </p>
              <p>
                This audience doesn't want products that feel embarrassing. They want products that feel stylish, safe, culturally relevant, expressive, and confidence-building.
              </p>
              <div className="insight-card">
                <div className="lbl">THE INSIGHT THAT SHAPED EVERYTHING</div>
                <p>
                  Consumers in this category aren't just buying condoms — they're buying confidence, chemistry, emotional comfort, and identity.
                </p>
              </div>
            </div>
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title mono">Audience Snapshot</div>
              <div className="annot-row"><span>Age</span><span>21–35</span></div>
              <div className="annot-row"><span>Context</span><span>Urban, digitally native</span></div>
              <div className="annot-row"><span>Buys on</span><span>Identity &amp; aesthetics</span></div>
              <div className="annot-row"><span>Reference brands</span><span>Fashion &amp; beauty, not pharma</span></div>
              <div className="annot-row"><span>Every touchpoint should feel</span><span style={{ color: 'var(--pine)', fontWeight: 600 }}>Inviting, warm, collectible</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section id="strategy" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">BRAND STRATEGY</div>
            <h2>"Make intimacy feel aesthetic."</h2>
            <p className="lede">
              Five pillars carried the strategy from positioning through to every physical and digital touchpoint.
            </p>
          </div>
          <div className="process">
            <div className="pstep"><div className="n">01</div><h4>Emotional Warmth</h4><p>Welcoming rather than clinical, at every touchpoint.</p></div>
            <div className="pstep"><div className="n">02</div><h4>Cultural Relevance</h4><p>Native to social media culture, not adjacent to it.</p></div>
            <div className="pstep"><div className="n">03</div><h4>Shelf Impact</h4><p>Dominates both retail shelves and digital thumbnails.</p></div>
            <div className="pstep"><div className="n">04</div><h4>Social Shareability</h4><p>Photographable and collectible by design.</p></div>
            <div className="pstep"><div className="n">05</div><h4>Premium Accessibility</h4><p>Premium without ever becoming intimidating.</p></div>
          </div>
        </div>
      </section>

      {/* Naming Section */}
      <section id="naming" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">NAMING &amp; VISUAL IDENTITY</div>
            <h2>One number, doing all the work of a logo.</h2>
            <p className="lede">
              AFTER8 references nightlife, chemistry, evening intimacy, and post-work freedom — immediately curious, but minimal and memorable. The "8" became a recognizable visual mnemonic across packaging, advertising, social, merchandise, and the website.
            </p>
          </div>
          <div className="giant-eight">
            <div className="tagbox mono">HERO ASSET — REPEATS ACROSS EVERY TOUCHPOINT</div>
            <div className="num">8</div>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--ink-soft)', maxWidth: '700px' }}>
            Instead of a complicated logo, illustration, or symbol, the identity leans entirely on recognizability, repetition, and silhouette impact. Typography is intentionally thick, soft, rounded, and playful — balancing softness, boldness, and humour without becoming explicit.
          </p>
        </div>
      </section>

      {/* Packaging Section */}
      <section id="packaging" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">PACKAGING DESIGN</div>
            <h2>Somewhere between candy, skincare, and editorial design.</h2>
            <p className="lede">
              We intentionally avoided dark masculine tones, metallic clichés, overly sexual visuals, and pharmaceutical aesthetics — building instead around bright gradients, pastel palettes, playful flavour coding, and oversized typography.
            </p>
          </div>

          <div className="eyebrow mono" style={{ marginBottom: '4px' }}>THE FLAVOUR SYSTEM — 6 SKUs, 6 MOODS</div>
          <div className="flavor-grid">
            <div className="flavor-card">
              <div className="flavor-swatch" style={{ background: '#9C8FC9' }}></div>
              <div className="flavor-info"><div className="name">Grape</div><div className="mood">Soft nightlife energy</div></div>
            </div>
            <div className="flavor-card">
              <div className="flavor-swatch" style={{ background: '#EB6FA0' }}></div>
              <div className="flavor-info"><div className="name">Strawberry</div><div className="mood">Playful chemistry</div></div>
            </div>
            <div className="flavor-card">
              <div className="flavor-swatch" style={{ background: '#8ECB4E' }}></div>
              <div className="flavor-info"><div className="name">Mint</div><div className="mood">Freshness &amp; confidence</div></div>
            </div>
            <div className="flavor-card">
              <div className="flavor-swatch" style={{ background: '#F2994A' }}></div>
              <div className="flavor-info"><div className="name">Cola</div><div className="mood">Bold, extroverted energy</div></div>
            </div>
            <div className="flavor-card">
              <div className="flavor-swatch" style={{ background: '#F4A94A' }}></div>
              <div className="flavor-info"><div className="name">Mango</div><div className="mood">Tropical warmth</div></div>
            </div>
            <div className="flavor-card">
              <div className="flavor-swatch" style={{ background: '#F2D24B' }}></div>
              <div className="flavor-info"><div className="name">Pineapple</div><div className="mood">Fun &amp; energetic</div></div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--ink-soft)', marginTop: '16px' }}>
            Six distinct emotional palettes built for shelf differentiation, social content variation, and scalable future launches.
          </p>

          <div className="deliv-grid">
            <div className="deliv-col">
              <h4>Front Panel</h4>
              <ul>
                <li>Oversized "8" as hero mark</li>
                <li>Strong flavour naming</li>
                <li>Minimal product hierarchy</li>
                <li>Large, confident whitespace</li>
              </ul>
            </div>
            <div className="deliv-col">
              <h4>Side Panels</h4>
              <ul>
                <li>Editorial rather than technical</li>
                <li>Mandatory info woven into the system</li>
                <li>Soft framing devices</li>
              </ul>
            </div>
            <div className="deliv-col">
              <h4>What It Achieves</h4>
              <ul>
                <li>Premium simplicity</li>
                <li>Easy scanning in retail</li>
                <li>Strong social media visibility</li>
              </ul>
            </div>
          </div>

          <div className="mosaic small" style={{ marginTop: '36px' }}>
            <img src="https://framerusercontent.com/images/ZDmig4277rYuPQnjzIodmYncFvo.png?width=1536&height=1024" alt="AFTER8 packaging shot" />
            <img src="https://framerusercontent.com/images/AlavHXaiVad4JtlzzODjwrgIXkA.png?width=1182&height=1330" alt="AFTER8 packaging shot" />
            <img src="https://framerusercontent.com/images/EX19NyD9cfd4MdJtCSL8F2Q0Hx4.png?width=1698&height=926" alt="AFTER8 packaging shot" />
            <img src="https://framerusercontent.com/images/GiL8F1WpVpxAO7CayLQNAlSUnyM.png?width=1182&height=1330" alt="AFTER8 packaging shot" />
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">PRODUCT PHOTOGRAPHY DIRECTION</div>
            <h2>Cinematic, not clinical.</h2>
            <p className="lede">
              Photography was art directed around colour lighting, nightlife moods, playful styling, and tactile softness — making the brand feel desirable and social-first rather than medical.
            </p>
          </div>
          <div className="photo-split">
            <img src="https://framerusercontent.com/images/zFiYwLkHRT5KfYHf5Tpre2AoDM.png?width=1698&height=926" alt="AFTER8 photography direction" />
            <img src="https://framerusercontent.com/images/1LSCDh062d3ZmMcFyFHoL5wHX2U.png?width=1536&height=1024" alt="AFTER8 photography direction" />
          </div>
        </div>
      </section>

      {/* Campaign Section */}
      <section id="campaign" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">CAMPAIGN DIRECTION &amp; MESSAGING</div>
            <h2>Confidence, chemistry, and humour — never explicit.</h2>
            <p className="lede">
              Campaign language avoids awkwardness and hyper-sexual advertising, speaking instead through confidence, chemistry, and visual culture.
            </p>
          </div>
          <div className="messaging-wall">
            <div className="msg-card"><p>"Made for the moments after 8."</p></div>
            <div className="msg-card"><p>"Pleasure with personality."</p></div>
            <div className="msg-card"><p>"Designed for better chemistry."</p></div>
            <div className="msg-card"><p>"Less awkward. More AFTER8."</p></div>
            <div className="msg-card"><p>"Looks good. Feels better."</p></div>
            <div className="msg-card"><p>"Confidence looks good on you."</p></div>
          </div>

          <div className="mosaic" style={{ marginTop: '36px' }}>
            <img src="https://framerusercontent.com/images/Lh3N8DdP069sN0ucVbBlfN2rEtU.png?width=1536&height=1024" alt="AFTER8 social content system" />
            <img src="https://framerusercontent.com/images/2YhblEnODOITAdC2EGkdSqAgzM.png?width=1536&height=1024" alt="AFTER8 social content system" />
            <img src="https://framerusercontent.com/images/opdGMlGhkxTNZMpuoBOpOsbhMI.png?width=1536&height=1024" alt="AFTER8 social content system" />
            <img src="https://framerusercontent.com/images/97o1xIBJ5D8QC9i1AMDfChRVw.png?width=1536&height=1024" alt="AFTER8 social content system" />
          </div>
          <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', marginTop: '12px', maxWidth: '680px' }}>
            The social strategy was built around repeatable graphic systems, bold colour blocking, and editorial layouts — designed to feel closer to a fashion or beauty feed than a healthcare brand's.
          </p>
        </div>
      </section>

      {/* Outcome Section */}
      <section id="outcome" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow mono">THE OUTCOME</div>
            <h2>An idea, turned into a complete, shelf-ready brand — in 8 weeks.</h2>
          </div>
          <div className="stat-strip">
            <div className="stat"><div className="num">8</div><div className="lbl mono">weeks, strategy to shelf-ready files</div></div>
            <div className="stat"><div className="num">4</div><div className="lbl mono">disciplines — brand, packaging, web, photography</div></div>
            <div className="stat"><div className="num">6</div><div className="lbl mono">flavour SKUs, each with its own system</div></div>
            <div className="stat"><div className="num">1</div><div className="lbl mono">idea, taken to full cultural repositioning</div></div>
          </div>

          <div style={{ marginTop: '32px' }}>
            <div className="testi-empty">
              <b>Client testimonial — reserved</b>
              Drop AFTER8's verbatim quote here once approved. A short line on how the rebrand changed how the team or retail partners see the product lands harder than any stat above.
            </div>
          </div>

          <div className="colophon" style={{ marginTop: '40px' }}>
            <div className="c-item"><div className="k mono">BRANDING</div><div className="v">Vinayak Agarwal</div></div>
            <div className="c-item"><div className="k mono">TYPEFACE DESIGN</div><div className="v">Vinayak &amp; Rajlaxmi</div></div>
            <div className="c-item"><div className="k mono">PHOTOGRAPHY</div><div className="v">Dhananjay Rawat</div></div>
            <div className="c-item"><div className="k mono">PACKAGING</div><div className="v">The Drawing Board</div></div>
          </div>
        </div>
      </section>

      {/* Scale Tier Pricing Box */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="pricing-anchor">
            <div className="flag">SAME SCOPE, PRICED</div>
            <div className="row">
              <div>
                <h3>This is a Scale-tier project.</h3>
                <p>
                  Full brand system + packaging across up to 6 SKUs — the exact scope AFTER8 shipped in 8 weeks — sits in our Scale engagement model.
                </p>
              </div>
              <div className="amt">
                $7,850 <span className="per">PER PROJECT (₹6,50,000), UP TO 6 SKUs</span>
              </div>
              <Link className="btn-primary" to="/branding#pricing">
                See the Scale tier →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Case Study */}
      <div className="wrap">
        <div className="next-project">
          <Link to={nextProject ? `/work/${nextProject.slug}` : '/work'}>
            <div>
              <div className="lbl mono">MORE WORK</div>
              <h3>{nextProject ? `Next Case Study: ${nextProject.title}` : 'Back to all case studies'}</h3>
            </div>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Final Call to Action */}
      <section className="final">
        <div className="wrap">
          <h2>Building a brand in a category that needs a braver visual language?</h2>
          <p>Book a free 15-minute call. We'll tell you honestly what scope your brand actually needs.</p>
          <a className="btn-primary" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">
            Book a 15-min call →
          </a>
        </div>
      </section>

      <StickyMobileCTA
        title="AFTER8® Case Study"
        subtitle="8 Weeks Strategy to Shelf"
        buttonText="Book Call →"
        link="https://cal.com/dandelion-nrvrze"
      />

      <Footer />
    </div>
  );
}
