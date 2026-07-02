import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'admin_works';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function loadWorks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWorks(works) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}

const emptyWork = {
  id: '',
  slug: '',
  title: '',
  heroImage: '',
  introduction: '',
  services: '',
  client: '',
  year: '',
  timeline: '',
  credits: [{ role: '', name: '' }],
  galleryImages: ['', '', '', '', '', ''],
  challengeTitle: '',
  challengeDesc: '',
  challengeBullets: [''],
  solutionTitle: '',
  solutionDesc: '',
  outcomeTitle: '',
  outcomeDesc: '',
  testimonialQuote: '',
  testimonialAuthor: '',
  testimonialRole: '',
};

export default function Admin() {
  const navigate = useNavigate();
  const [works, setWorks] = useState(loadWorks);
  const [editing, setEditing] = useState(null); // null = list view, object = form
  const [toast, setToast] = useState('');

  useEffect(() => {
    document.title = 'Admin — The Drawing Board';
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function startNew() {
    setEditing({ ...emptyWork, id: generateId(), credits: [{ role: '', name: '' }], galleryImages: ['', '', '', '', '', ''], challengeBullets: [''] });
  }

  function startEdit(work) {
    setEditing({
      ...emptyWork,
      ...work,
      credits: work.credits && work.credits.length ? work.credits : [{ role: '', name: '' }],
      galleryImages: work.galleryImages && work.galleryImages.length ? [...work.galleryImages, ...Array(6).fill('')].slice(0, 6) : ['', '', '', '', '', ''],
      challengeBullets: work.challengeBullets && work.challengeBullets.length ? work.challengeBullets : [''],
    });
  }

  function deleteWork(id) {
    const updated = works.filter(w => w.id !== id);
    setWorks(updated);
    saveWorks(updated);
    showToast('Work deleted');
  }

  function handleSave(e) {
    e.preventDefault();
    if (!editing.title.trim()) {
      showToast('Title is required');
      return;
    }

    const slug = editing.slug || generateSlug(editing.title);
    const work = {
      ...editing,
      slug,
      services: editing.services,
      credits: editing.credits.filter(c => c.role.trim() || c.name.trim()),
      galleryImages: editing.galleryImages.filter(g => g.trim()),
      challengeBullets: editing.challengeBullets.filter(b => b.trim()),
      updatedAt: new Date().toISOString(),
    };

    if (!work.createdAt) work.createdAt = work.updatedAt;

    const existing = works.findIndex(w => w.id === work.id);
    let updated;
    if (existing >= 0) {
      updated = [...works];
      updated[existing] = work;
    } else {
      updated = [...works, work];
    }

    setWorks(updated);
    saveWorks(updated);
    setEditing(null);
    showToast('Work saved successfully!');
  }

  function updateField(field, value) {
    setEditing(prev => ({ ...prev, [field]: value }));
  }

  function updateCredit(index, field, value) {
    setEditing(prev => {
      const credits = [...prev.credits];
      credits[index] = { ...credits[index], [field]: value };
      return { ...prev, credits };
    });
  }

  function addCredit() {
    setEditing(prev => ({ ...prev, credits: [...prev.credits, { role: '', name: '' }] }));
  }

  function removeCredit(index) {
    setEditing(prev => ({ ...prev, credits: prev.credits.filter((_, i) => i !== index) }));
  }

  function updateGallery(index, value) {
    setEditing(prev => {
      const galleryImages = [...prev.galleryImages];
      galleryImages[index] = value;
      return { ...prev, galleryImages };
    });
  }

  function updateBullet(index, value) {
    setEditing(prev => {
      const challengeBullets = [...prev.challengeBullets];
      challengeBullets[index] = value;
      return { ...prev, challengeBullets };
    });
  }

  function addBullet() {
    setEditing(prev => ({ ...prev, challengeBullets: [...prev.challengeBullets, ''] }));
  }

  function removeBullet(index) {
    setEditing(prev => ({ ...prev, challengeBullets: prev.challengeBullets.filter((_, i) => i !== index) }));
  }

  // Determine which sections will be visible
  function getSectionStatus(work) {
    const sections = [];
    if (work.introduction?.trim()) sections.push('Introduction');
    if (work.services?.trim() || work.client?.trim() || work.year?.trim() || work.timeline?.trim()) sections.push('Details');
    if (work.credits?.some(c => c.role?.trim() || c.name?.trim())) sections.push('Credits');
    if (work.challengeTitle?.trim() || work.challengeDesc?.trim() || work.challengeBullets?.some(b => b?.trim())) sections.push('The Challenge');
    if (work.solutionTitle?.trim() || work.solutionDesc?.trim()) sections.push('Our Solution');
    if (work.outcomeTitle?.trim() || work.outcomeDesc?.trim()) sections.push('The Outcome');
    if (work.testimonialQuote?.trim()) sections.push('Testimonial');
    return sections;
  }

  // -- RENDER --

  if (editing) {
    const slug = editing.slug || generateSlug(editing.title || '');
    const visibleSections = getSectionStatus(editing);

    return (
      <div className="admin-page">
        <div className="admin-header">
          <button className="admin-back-btn" onClick={() => setEditing(null)}>← Back to Works</button>
          <h1 className="admin-title">{editing.id && works.find(w => w.id === editing.id) ? 'Edit Work' : 'Add New Work'}</h1>
        </div>

        <form className="admin-form" onSubmit={handleSave}>
          {/* SECTION: Basic Info */}
          <div className="admin-section">
            <h2 className="admin-section-title">Basic Information</h2>
            <div className="admin-field">
              <label>Project Title *</label>
              <input type="text" value={editing.title} onChange={e => updateField('title', e.target.value)} placeholder="e.g. Good Protein — Nutrition & Wellness" />
            </div>
            <div className="admin-field">
              <label>URL Slug</label>
              <div className="admin-slug-preview">
                <span className="admin-slug-prefix">/work/</span>
                <input type="text" value={slug} onChange={e => updateField('slug', e.target.value)} placeholder="auto-generated-from-title" />
              </div>
            </div>
            <div className="admin-field">
              <label>Hero / Cover Image URL</label>
              <input type="text" value={editing.heroImage} onChange={e => updateField('heroImage', e.target.value)} placeholder="https://example.com/image.jpg" />
              {editing.heroImage && <img src={editing.heroImage} alt="Preview" className="admin-img-preview" />}
            </div>
          </div>

          {/* SECTION: Introduction */}
          <div className="admin-section">
            <h2 className="admin-section-title">
              Introduction
              {!editing.introduction?.trim() && <span className="admin-skip-badge">Will be skipped</span>}
            </h2>
            <div className="admin-field">
              <textarea rows="4" value={editing.introduction} onChange={e => updateField('introduction', e.target.value)} placeholder="Describe the project background..." />
            </div>
          </div>

          {/* SECTION: Details */}
          <div className="admin-section">
            <h2 className="admin-section-title">
              Details
              {!editing.services?.trim() && !editing.client?.trim() && !editing.year?.trim() && !editing.timeline?.trim() && <span className="admin-skip-badge">Will be skipped</span>}
            </h2>
            <div className="admin-field-row">
              <div className="admin-field">
                <label>Services</label>
                <input type="text" value={editing.services} onChange={e => updateField('services', e.target.value)} placeholder="Branding, Photography, Packaging Design" />
              </div>
              <div className="admin-field">
                <label>Client</label>
                <input type="text" value={editing.client} onChange={e => updateField('client', e.target.value)} placeholder="Client Name" />
              </div>
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label>Year</label>
                <input type="text" value={editing.year} onChange={e => updateField('year', e.target.value)} placeholder="2025" />
              </div>
              <div className="admin-field">
                <label>Timeline</label>
                <input type="text" value={editing.timeline} onChange={e => updateField('timeline', e.target.value)} placeholder="8 Weeks" />
              </div>
            </div>
          </div>

          {/* SECTION: Credits */}
          <div className="admin-section">
            <h2 className="admin-section-title">
              Credits
              {!editing.credits?.some(c => c.role?.trim() || c.name?.trim()) && <span className="admin-skip-badge">Will be skipped</span>}
            </h2>
            {editing.credits.map((credit, i) => (
              <div key={i} className="admin-field-row admin-credit-row">
                <div className="admin-field">
                  <label>Role</label>
                  <input type="text" value={credit.role} onChange={e => updateCredit(i, 'role', e.target.value)} placeholder="Brand Designer" />
                </div>
                <div className="admin-field">
                  <label>Name</label>
                  <input type="text" value={credit.name} onChange={e => updateCredit(i, 'name', e.target.value)} placeholder="Person Name" />
                </div>
                {editing.credits.length > 1 && (
                  <button type="button" className="admin-remove-btn" onClick={() => removeCredit(i)}>×</button>
                )}
              </div>
            ))}
            <button type="button" className="admin-add-btn" onClick={addCredit}>+ Add Credit</button>
          </div>

          {/* SECTION: Gallery */}
          <div className="admin-section">
            <h2 className="admin-section-title">Gallery Images</h2>
            <div className="admin-gallery-grid">
              {editing.galleryImages.map((img, i) => (
                <div key={i} className="admin-field admin-gallery-item">
                  <label>Image {i + 1}</label>
                  <input type="text" value={img} onChange={e => updateGallery(i, e.target.value)} placeholder="https://example.com/image.jpg" />
                  {img && <img src={img} alt={`Gallery ${i + 1}`} className="admin-img-preview-sm" />}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: The Challenge */}
          <div className="admin-section">
            <h2 className="admin-section-title">
              The Challenge
              {!editing.challengeTitle?.trim() && !editing.challengeDesc?.trim() && !editing.challengeBullets?.some(b => b?.trim()) && <span className="admin-skip-badge">Will be skipped</span>}
            </h2>
            <div className="admin-field">
              <label>Challenge Title</label>
              <input type="text" value={editing.challengeTitle} onChange={e => updateField('challengeTitle', e.target.value)} placeholder="A Distinct Personality in a crowded category" />
            </div>
            <div className="admin-field">
              <label>Challenge Description</label>
              <textarea rows="3" value={editing.challengeDesc} onChange={e => updateField('challengeDesc', e.target.value)} placeholder="The existing brand lacked..." />
            </div>
            <div className="admin-field">
              <label>Challenge Bullets</label>
              {editing.challengeBullets.map((bullet, i) => (
                <div key={i} className="admin-bullet-row">
                  <input type="text" value={bullet} onChange={e => updateBullet(i, e.target.value)} placeholder="A challenge point..." />
                  {editing.challengeBullets.length > 1 && (
                    <button type="button" className="admin-remove-btn" onClick={() => removeBullet(i)}>×</button>
                  )}
                </div>
              ))}
              <button type="button" className="admin-add-btn" onClick={addBullet}>+ Add Bullet</button>
            </div>
          </div>

          {/* SECTION: Our Solution */}
          <div className="admin-section">
            <h2 className="admin-section-title">
              Our Solution
              {!editing.solutionTitle?.trim() && !editing.solutionDesc?.trim() && <span className="admin-skip-badge">Will be skipped</span>}
            </h2>
            <div className="admin-field">
              <label>Solution Title</label>
              <input type="text" value={editing.solutionTitle} onChange={e => updateField('solutionTitle', e.target.value)} placeholder="Crafting a Minimalist, Authentic Brand Identity..." />
            </div>
            <div className="admin-field">
              <label>Solution Description</label>
              <textarea rows="3" value={editing.solutionDesc} onChange={e => updateField('solutionDesc', e.target.value)} placeholder="We created a minimalist brand identity..." />
            </div>
          </div>

          {/* SECTION: The Outcome */}
          <div className="admin-section">
            <h2 className="admin-section-title">
              The Outcome
              {!editing.outcomeTitle?.trim() && !editing.outcomeDesc?.trim() && <span className="admin-skip-badge">Will be skipped</span>}
            </h2>
            <div className="admin-field">
              <label>Outcome Title</label>
              <input type="text" value={editing.outcomeTitle} onChange={e => updateField('outcomeTitle', e.target.value)} placeholder="Delivering Tangible Business Growth..." />
            </div>
            <div className="admin-field">
              <label>Outcome Description</label>
              <textarea rows="3" value={editing.outcomeDesc} onChange={e => updateField('outcomeDesc', e.target.value)} placeholder="The refreshed brand increased audience engagement..." />
            </div>
          </div>

          {/* SECTION: Testimonial */}
          <div className="admin-section">
            <h2 className="admin-section-title">
              Testimonial
              {!editing.testimonialQuote?.trim() && <span className="admin-skip-badge">Will be skipped</span>}
            </h2>
            <div className="admin-field">
              <label>Quote</label>
              <textarea rows="3" value={editing.testimonialQuote} onChange={e => updateField('testimonialQuote', e.target.value)} placeholder='"The branding work completely transformed how people see our business..."' />
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label>Author Name</label>
                <input type="text" value={editing.testimonialAuthor} onChange={e => updateField('testimonialAuthor', e.target.value)} placeholder="— Clara V." />
              </div>
              <div className="admin-field">
                <label>Author Role</label>
                <input type="text" value={editing.testimonialRole} onChange={e => updateField('testimonialRole', e.target.value)} placeholder="Co-founder at Good Protein" />
              </div>
            </div>
          </div>

          {/* Section Visibility Summary */}
          <div className="admin-section admin-summary-section">
            <h2 className="admin-section-title">Section Visibility</h2>
            <div className="admin-visibility-list">
              {['Introduction', 'Details', 'Credits', 'The Challenge', 'Our Solution', 'The Outcome', 'Testimonial'].map(section => {
                const visible = visibleSections.includes(section);
                return (
                  <div key={section} className={`admin-visibility-item ${visible ? 'visible' : 'hidden'}`}>
                    <span className="admin-visibility-dot" />
                    <span>{section}</span>
                    <span className="admin-visibility-status">{visible ? 'Visible' : 'Skipped'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="admin-actions">
            <button type="button" className="admin-cancel-btn" onClick={() => setEditing(null)}>Cancel</button>
            <button type="submit" className="admin-save-btn">Save Work</button>
          </div>
        </form>

        {toast && <div className="admin-toast">{toast}</div>}
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">Manage your portfolio works</p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-back-btn" onClick={() => navigate('/')}>← Back to Site</button>
          <button className="admin-new-btn" onClick={startNew}>+ Add New Work</button>
        </div>
      </div>

      {works.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📁</div>
          <h3>No works yet</h3>
          <p>Create your first portfolio work to get started.</p>
          <button className="admin-new-btn" onClick={startNew}>+ Add New Work</button>
        </div>
      ) : (
        <div className="admin-works-grid">
          {works.map(work => (
            <div key={work.id} className="admin-work-card">
              {work.heroImage ? (
                <div className="admin-work-card-img" style={{ backgroundImage: `url(${work.heroImage})` }} />
              ) : (
                <div className="admin-work-card-img admin-work-card-placeholder">
                  <span>No Image</span>
                </div>
              )}
              <div className="admin-work-card-body">
                <h3 className="admin-work-card-title">{work.title}</h3>
                <p className="admin-work-card-slug">/work/{work.slug}</p>
                <div className="admin-work-card-tags">
                  {work.services && work.services.split(',').map((s, i) => (
                    <span key={i} className="admin-tag">{s.trim()}</span>
                  ))}
                </div>
                <div className="admin-work-card-sections">
                  {getSectionStatus(work).map(s => (
                    <span key={s} className="admin-section-dot" title={s}>●</span>
                  ))}
                  <span className="admin-section-count">{getSectionStatus(work).length} sections</span>
                </div>
              </div>
              <div className="admin-work-card-actions">
                <button className="admin-view-btn" onClick={() => navigate(`/work/${work.slug}`)}>View</button>
                <button className="admin-edit-btn" onClick={() => startEdit(work)}>Edit</button>
                <button className="admin-delete-btn" onClick={() => deleteWork(work.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}
