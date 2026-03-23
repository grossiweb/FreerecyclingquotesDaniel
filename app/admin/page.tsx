'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = 'rq-admin-2026';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

type Tab = 'dashboard' | 'services' | 'materials' | 'industries' | 'challenges' | 'faqs' | 'relationships' | 'settings';

type EntityRow = Record<string, any>;

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('rq-admin') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('rq-admin', 'true');
      setError('');
    } else {
      setError('Wrong password');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#111916] border border-[#1a2e1f] rounded-2xl p-10 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#1B7A3D] rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="text-white font-extrabold text-lg" style={{ letterSpacing: '-0.02em' }}>RQ Admin</h1>
              <p className="text-gray-500 text-xs">Recycling Quotes CMS</p>
            </div>
          </div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1B7A3D] mb-3"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button onClick={handleLogin} className="w-full bg-[#1B7A3D] hover:bg-[#1a6e37] text-white font-bold text-sm py-3 rounded-xl transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

// ═══════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════════════

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadCounts() {
      const tables = ['services', 'materials', 'industries', 'challenges', 'locations', 'faqs', 'service_materials', 'service_industries', 'service_locations', 'service_challenges'];
      const result: Record<string, number> = {};
      for (const t of tables) {
        const { count } = await supabase.from(t).select('*', { count: 'exact', head: true });
        result[t] = count || 0;
      }
      setCounts(result);
    }
    loadCounts();
  }, []);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'services', label: 'Services', icon: 'build' },
    { id: 'materials', label: 'Materials', icon: 'recycling' },
    { id: 'industries', label: 'Industries', icon: 'factory' },
    { id: 'challenges', label: 'Challenges', icon: 'psychology' },
    { id: 'faqs', label: 'FAQs', icon: 'quiz' },
    { id: 'relationships', label: 'Relationships', icon: 'link' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-[#111916] border-r border-[#1a2e1f] p-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-8 h-8 bg-[#1B7A3D] rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-base">recycling</span>
          </div>
          <span className="text-white font-extrabold text-sm" style={{ letterSpacing: '-0.02em' }}>RQ Admin</span>
        </div>
        <nav className="space-y-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1B7A3D]/15 text-[#4ADE80]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => { sessionStorage.removeItem('rq-admin'); window.location.reload(); }}
          className="flex items-center gap-2.5 px-3 py-2.5 text-gray-500 hover:text-red-400 text-sm transition-colors"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Sign Out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && <DashboardTab counts={counts} />}
        {activeTab === 'services' && <EntityEditor table="services" label="Services" />}
        {activeTab === 'materials' && <EntityEditor table="materials" label="Materials" />}
        {activeTab === 'industries' && <EntityEditor table="industries" label="Industries" />}
        {activeTab === 'challenges' && <EntityEditor table="challenges" label="Challenges" />}
        {activeTab === 'faqs' && <FAQEditor />}
        {activeTab === 'relationships' && <RelationshipManager />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD TAB
// ═══════════════════════════════════════════════════════════════

function DashboardTab({ counts }: { counts: Record<string, number> }) {
  const cards = [
    { label: 'Services', count: counts.services, icon: 'build', color: '#1B7A3D' },
    { label: 'Materials', count: counts.materials, icon: 'recycling', color: '#2563EB' },
    { label: 'Industries', count: counts.industries, icon: 'factory', color: '#D97706' },
    { label: 'Challenges', count: counts.challenges, icon: 'psychology', color: '#7C3AED' },
    { label: 'Locations', count: counts.locations, icon: 'location_on', color: '#DC2626' },
    { label: 'FAQs', count: counts.faqs, icon: 'quiz', color: '#0D9488' },
    { label: 'Svc↔Materials', count: counts.service_materials, icon: 'link', color: '#4F46E5' },
    { label: 'Svc↔Industries', count: counts.service_industries, icon: 'link', color: '#EA580C' },
    { label: 'Svc↔Locations', count: counts.service_locations, icon: 'link', color: '#0284C7' },
    { label: 'Svc↔Challenges', count: counts.service_challenges, icon: 'link', color: '#BE185D' },
  ];

  return (
    <div>
      <h1 className="text-white text-2xl font-extrabold mb-1" style={{ letterSpacing: '-0.025em' }}>Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">RecyclingQuotes.com content overview</p>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {cards.map((card) => (
          <div key={card.label} className="bg-[#111916] border border-[#1a2e1f] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}20` }}>
                <span className="material-symbols-outlined text-base" style={{ color: card.color }}>{card.icon}</span>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white" style={{ letterSpacing: '-0.03em' }}>{card.count ?? '—'}</div>
            <div className="text-xs text-gray-500 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-[#111916] border border-[#1a2e1f] rounded-xl p-6">
        <h2 className="text-white font-bold text-base mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Revalidate All Pages', icon: 'refresh', action: async () => { await fetch('/api/revalidate?secret=rq-revalidate-2026&path=/'); alert('Revalidation triggered'); } },
            { label: 'View Live Site', icon: 'open_in_new', action: () => window.open('/', '_blank') },
            { label: 'Supabase Studio', icon: 'database', action: () => window.open('https://supabase.com/dashboard/project/eijqznbhflwbvtpisidy', '_blank') },
            { label: 'Vercel Dashboard', icon: 'cloud', action: () => window.open('https://vercel.com', '_blank') },
          ].map((action) => (
            <button key={action.label} onClick={action.action} className="flex items-center gap-2.5 bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-4 py-3 text-gray-400 hover:text-white hover:border-[#1B7A3D]/30 transition-all text-sm">
              <span className="material-symbols-outlined text-base">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ENTITY EDITOR (Services, Materials, Industries, Challenges)
// ═══════════════════════════════════════════════════════════════


function EntityEditor({ table, label }: { table: string; label: string }) {
  const [rows, setRows] = useState<EntityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<EntityRow | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadRows = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(table).select('*').order('sort_order');
    if (!showInactive) query = query.eq('is_active', true);
    const { data } = await query;
    setRows(data || []);
    setLoading(false);
  }, [table, showInactive]);

  useEffect(() => { loadRows(); }, [loadRows]);

  const startEditing = (row: EntityRow) => {
    setEditingId(row.id);
    setEditingRow({ ...row });
    setIsNew(false);
  };

  const handleReactivate = async (id: string, name: string) => {
    await supabase.from(table).update({ is_active: true }).eq('id', id);
    setMessage(`✅ "${name}" reactivated.`);
    loadRows();
    setTimeout(() => setMessage(''), 3000);
  };

  const startNew = () => {
    const defaults: Record<string, any> = {
      name: '', slug: '', h1: '', definition: '', icon: '', hero_image: '', image: '',
      seo_title: '', seo_description: '', is_active: true, sort_order: rows.length,
      page_data: {
        headlines: table === 'services' ? { overview: '', process: '', materials: '', challenges: '', industries: '', locations: '', results: '', faq: '', cta: '' }
          : table === 'challenges' ? { definition: '', whyHard: '', whyHardSub: '', approach: '', approachSub: '', industries: '', industriesSub: '', outcomes: '', faq: '', faqSub: '', cta: '', ctaSub: '' }
          : table === 'materials' ? { overview: '', process: '', acceptedItems: '', certifications: '', services: '', challenges: '', industries: '', cityLinks: '', faq: '', faqSubtitle: '' }
          : { overview: '' },
        overview: [], faqs: [],
      },
    };
    if (table === 'services') { defaults.page_data.acceptedItems = []; defaults.page_data.process = []; defaults.page_data.differentiators = []; defaults.page_data.certifications = []; defaults.page_data.caseStudies = []; defaults.category = 'core-recycling'; }
    if (table === 'materials') { defaults.page_data.acceptedItems = []; defaults.page_data.process = []; defaults.page_data.certifications = []; defaults.page_data.subTypes = []; defaults.category = ''; defaults.depth = 1; defaults.parent_slug = ''; }
    if (table === 'industries') { defaults.page_data.wasteProfile = []; defaults.page_data.caseStudies = []; defaults.category = ''; defaults.depth = 1; }
    if (table === 'challenges') { defaults.page_data.consequences = []; defaults.page_data.problemStats = []; defaults.page_data.barriers = []; defaults.page_data.approach = []; defaults.page_data.outcomes = []; defaults.page_data.resources = []; defaults.color = 'green'; }
    setEditingId('new');
    setEditingRow(defaults);
    setIsNew(true);
  };

  const handleSave = async (entity: Record<string, any>, pd: Record<string, any>) => {
    if (!editingId) return;
    setSaving(true);

    // Build the record — only include fields that exist on this table
    const record: Record<string, any> = {};
    const commonFields = ['name', 'h1', 'definition', 'icon', 'seo_title', 'seo_description', 'slug', 'sort_order', 'is_active'];
    const tableFields: Record<string, string[]> = {
      services: [...commonFields, 'hero_image', 'category'],
      materials: [...commonFields, 'hero_image', 'parent_slug', 'category', 'depth'],
      industries: [...commonFields, 'image', 'category', 'depth'],
      challenges: [...commonFields, 'color'],
    };
    const allowedFields = tableFields[table] || commonFields;
    for (const f of allowedFields) { if (entity[f] !== undefined) record[f] = entity[f] || null; }
    // Don't null out required fields
    if (!record.name) { setMessage('❌ Name is required'); setSaving(false); return; }
    if (!record.slug) record.slug = record.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    // Ensure NOT NULL fields have defaults
    if (!record.definition) record.definition = '';
    if (!record.h1) record.h1 = record.name;
    if (!record.seo_title) record.seo_title = record.name;
    if (!record.seo_description) record.seo_description = record.definition || record.name;
    if (!record.icon) record.icon = table === 'services' ? 'build' : table === 'materials' ? 'recycling' : table === 'industries' ? 'factory' : 'psychology';
    if (!record.category && (table === 'services' || table === 'materials' || table === 'industries')) record.category = 'general';
    if (table === 'challenges' && !record.color) record.color = 'green';
    if (table === 'materials' && !record.depth) record.depth = 1;
    
    // Build page_data
    const newPd = { ...pd };
    newPd.slug = record.slug; newPd.name = record.name; newPd.h1 = record.h1;
    newPd.definition = record.definition; newPd.heroImage = record.hero_image || record.image;
    newPd.titleTag = record.seo_title; newPd.metaDescription = record.seo_description;
    record.page_data = newPd;

    let error;
    if (isNew) {
      // INSERT
      const result = await supabase.from(table).insert(record);
      error = result.error;
    } else {
      // UPDATE
      const { id, ...updateFields } = record;
      const result = await supabase.from(table).update(updateFields).eq('id', editingId);
      error = result.error;
    }

    if (error) { setMessage(`❌ Error: ${error.message}`); }
    else { setMessage(isNew ? '✅ Created! New page will appear after next build or revalidation.' : '✅ Saved! Changes will appear on site within 60 seconds.'); setEditingId(null); setEditingRow(null); setIsNew(false); loadRows(); }
    setSaving(false);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deactivate "${name}"? This will hide it from the site but not delete the data.`)) return;
    await supabase.from(table).update({ is_active: false }).eq('id', id);
    setMessage(`✅ "${name}" deactivated.`);
    loadRows();
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePermanentDelete = async (id: string, name: string) => {
    if (!confirm(`⚠️ PERMANENTLY DELETE "${name}"?\n\nThis cannot be undone. All data for this page will be lost.\n\nType the page name to confirm.`)) return;
    const confirmName = prompt(`Type "${name}" to confirm permanent deletion:`);
    if (confirmName !== name) { setMessage('❌ Name did not match. Deletion cancelled.'); setTimeout(() => setMessage(''), 3000); return; }
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) { setMessage(`❌ Error: ${error.message}`); } 
    else { setMessage(`🗑️ "${name}" permanently deleted.`); loadRows(); }
    setTimeout(() => setMessage(''), 5000);
  };

  const sections = table === 'services'
    ? ['basic','headlines','overview','accepted','process','differentiators','certifications','casestudies']
    : table === 'materials'
    ? ['basic','headlines','overview','accepted','process','certifications']
    : table === 'industries'
    ? ['basic','headlines','overview','wasteprofile','casestudies']
    : table === 'challenges'
    ? ['basic','headlines','consequences','problemstats','barriers','approach','outcomes','resources']
    : ['basic','headlines'];

  const sectionLabels: Record<string, [string, string]> = {
    basic: ['Basic Info', 'edit'], headlines: ['Headlines', 'title'], overview: ['Overview', 'article'],
    accepted: ['Accepted Items', 'checklist'], process: ['Process Steps', 'format_list_numbered'],
    differentiators: ['Differentiators', 'star'], certifications: ['Certifications', 'verified'],
    casestudies: ['Case Studies', 'trending_up'], wasteprofile: ['Waste Streams', 'delete'],
    consequences: ['Consequences', 'warning'], problemstats: ['Problem Stats', 'analytics'],
    barriers: ['Barriers', 'block'], approach: ['Our Approach', 'lightbulb'],
    outcomes: ['Outcomes', 'trending_up'], resources: ['Resources', 'link'],
  };

  const basicFieldNames = table === 'services'
    ? ['name', 'h1', 'definition', 'hero_image', 'icon', 'seo_title', 'seo_description']
    : table === 'materials'
    ? ['name', 'h1', 'definition', 'hero_image', 'icon', 'seo_title', 'seo_description', 'parent_slug', 'category']
    : table === 'industries'
    ? ['name', 'h1', 'definition', 'image', 'icon', 'seo_title', 'seo_description']
    : ['name', 'h1', 'definition', 'seo_title', 'seo_description'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-white text-2xl font-extrabold" style={{ letterSpacing: '-0.025em' }}>{label}</h1><p className="text-gray-500 text-sm">{rows.length} records{showInactive ? ' (including inactive)' : ''}</p></div>
        <div className="flex gap-3 items-center">
          <button onClick={() => setShowInactive(!showInactive)} className={`text-xs font-medium px-3 py-2 rounded-lg transition-all ${showInactive ? 'bg-amber-900/20 text-amber-400 border border-amber-800/30' : 'text-gray-500 hover:text-white border border-[#1a2e1f]'}`}>
            {showInactive ? '👁 Showing inactive' : 'Show inactive'}
          </button>
          <button onClick={startNew} className="bg-[#1B7A3D] hover:bg-[#1a6e37] text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-base">add</span> New {label.replace(/s$/, '')}
          </button>
        </div>
      </div>
      {message && <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${message.startsWith('✅') ? 'bg-green-900/30 text-green-400 border border-green-800/30' : 'bg-red-900/30 text-red-400 border border-red-800/30'}`}>{message}</div>}

      {editingRow && (
        <EditPanel
          key={editingId}
          initialEntity={editingRow}
          initialPd={editingRow.page_data || {}}
          sections={sections}
          sectionLabels={sectionLabels}
          basicFieldNames={basicFieldNames}
          tableName={table}
          saving={saving}
          onSave={handleSave}
          onCancel={() => { setEditingId(null); setEditingRow(null); }}
        />
      )}

      <div className="bg-[#111916] border border-[#1a2e1f] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#1a2e1f]">
            <th className="text-left px-4 py-3 text-gray-500 text-xs uppercase font-medium">Name</th>
            <th className="text-left px-4 py-3 text-gray-500 text-xs uppercase font-medium">Slug</th>
            <th className="text-left px-4 py-3 text-gray-500 text-xs uppercase font-medium">H1</th>
            <th className="text-left px-4 py-3 text-gray-500 text-xs uppercase font-medium">Image</th>
            <th className="text-right px-4 py-3 text-gray-500 text-xs uppercase font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            : rows.map((row) => (
              <tr key={row.id} className={`border-b border-[#1a2e1f]/50 hover:bg-white/[.02] ${!row.is_active ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3 text-white font-medium">{row.name}{!row.is_active && <span className="ml-2 text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full">Inactive</span>}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{row.slug}</td>
                <td className="px-4 py-3 text-gray-400 text-xs max-w-[200px] truncate">{row.h1 || '—'}</td>
                <td className="px-4 py-3">{(row.hero_image || row.image) ? <img src={row.hero_image || row.image} alt="" className="w-16 h-8 object-cover rounded" onError={(e) => { (e.target as HTMLImageElement).src = ''; }} /> : <span className="text-gray-600 text-xs">No image</span>}</td>
                <td className="px-4 py-3 text-right"><div className="flex gap-3 justify-end">
                  <button onClick={() => startEditing(row)} className="text-[#4ADE80] hover:text-white text-xs font-bold">Edit</button>
                  {row.is_active ? (
                    <button onClick={() => handleDelete(row.id, row.name)} className="text-red-500/30 hover:text-red-400 text-xs font-bold">Deactivate</button>
                  ) : (
                    <><button onClick={() => handleReactivate(row.id, row.name)} className="text-amber-500/50 hover:text-amber-400 text-xs font-bold">Reactivate</button>
                    <button onClick={() => handlePermanentDelete(row.id, row.name)} className="text-red-500/30 hover:text-red-500 text-xs font-bold">Delete</button></>
                  )}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDIT PANEL — isolated component, own state, no focus issues
// ═══════════════════════════════════════════════════════════════

function EditPanel({ initialEntity, initialPd, sections, sectionLabels, basicFieldNames, tableName, saving, onSave, onCancel }: {
  initialEntity: Record<string, any>; initialPd: Record<string, any>;
  sections: string[]; sectionLabels: Record<string, [string, string]>;
  basicFieldNames: string[]; tableName: string; saving: boolean;
  onSave: (entity: Record<string, any>, pd: Record<string, any>) => void; onCancel: () => void;
}) {
  const [tab, setTab] = useState('basic');
  const [basic, setBasic] = useState<Record<string, any>>({ ...initialEntity });
  const [pd, setPd] = useState<Record<string, any>>({ ...initialPd });

  const ub = (f: string, v: string) => setBasic(p => ({ ...p, [f]: v }));

  // String array helpers
  const sa = (field: string) => pd[field] || [];
  const saUpdate = (field: string, i: number, v: string) => { const a = [...sa(field)]; a[i] = v; setPd(p => ({ ...p, [field]: a })); };
  const saAdd = (field: string) => setPd(p => ({ ...p, [field]: [...sa(field), ''] }));
  const saDel = (field: string, i: number) => { const a = [...sa(field)]; a.splice(i, 1); setPd(p => ({ ...p, [field]: a })); };

  // Object array helpers
  const oa = (field: string) => pd[field] || [];
  const oaUpdate = (field: string, i: number, k: string, v: string) => { const a = [...oa(field)]; a[i] = { ...a[i], [k]: v }; setPd(p => ({ ...p, [field]: a })); };
  const oaAdd = (field: string, t: Record<string, string>) => setPd(p => ({ ...p, [field]: [...oa(field), { ...t }] }));
  const oaDel = (field: string, i: number) => { const a = [...oa(field)]; a.splice(i, 1); setPd(p => ({ ...p, [field]: a })); };

  const hUpdate = (k: string, v: string) => setPd(p => ({ ...p, headlines: { ...(p.headlines || {}), [k]: v } }));

  // Section visibility
  const hiddenSections = pd.hiddenSections || [];
  const toggleSection = (sectionKey: string) => {
    const current = pd.hiddenSections || [];
    const newHidden = current.includes(sectionKey) ? current.filter((s: string) => s !== sectionKey) : [...current, sectionKey];
    setPd(p => ({ ...p, hiddenSections: newHidden }));
  };

  // Map tab IDs to page_data field names for visibility
  const sectionFieldMap: Record<string, string> = {
    overview: 'overview', accepted: 'acceptedItems', process: 'process',
    differentiators: 'differentiators', certifications: 'certifications',
    casestudies: 'caseStudies', wasteprofile: 'wasteProfile',
    consequences: 'consequences', problemstats: 'problemStats',
    barriers: 'barriers', approach: 'approach', outcomes: 'outcomes', resources: 'resources',
  };

  const ic = "w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#1B7A3D]";
  const icl = ic + " rounded-xl px-4 py-3";

  // Add 'visibility' to sections list
  const allSections = [...sections, 'visibility'];
  const allLabels: Record<string, [string, string]> = { ...sectionLabels, visibility: ['Section Visibility', 'visibility'] };

  return (
    <div className="mb-6 bg-[#111916] border border-[#1B7A3D]/30 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a2e1f]">
        <h2 className="text-white font-bold">Editing: {basic.name || 'New ' + tableName.replace(/s$/, '')}</h2>
        <div className="flex gap-3">
          {basic.slug && <button onClick={() => window.open(`/${tableName}/${basic.slug}`, '_blank')} className="text-gray-500 hover:text-white text-xs flex items-center gap-1"><span className="material-symbols-outlined text-sm">open_in_new</span> View Page</button>}
          <button onClick={onCancel} className="text-gray-500 hover:text-white text-sm">✕</button>
        </div>
      </div>

      <div className="flex gap-1 px-4 pt-3 pb-0 overflow-x-auto border-b border-[#1a2e1f]">
        {allSections.map((s: string) => (
          <button key={s} onClick={() => setTab(s)} className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-t-lg transition-all whitespace-nowrap ${tab === s ? 'bg-[#0A0F0C] text-[#4ADE80] border-t border-x border-[#1B7A3D]/30' : 'text-gray-500 hover:text-white'}`}>
            <span className="material-symbols-outlined text-sm">{allLabels[s]?.[1] || 'edit'}</span>{allLabels[s]?.[0] || s}
          </button>
        ))}
      </div>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        {tab === 'basic' && <div className="space-y-4">
          {(basic.hero_image || basic.image) && <div className="rounded-xl overflow-hidden h-32 mb-2"><img src={basic.hero_image || basic.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>}
          {basicFieldNames.map((f: string) => (
            <div key={f}>
              <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">{f.replace(/_/g, ' ')}</label>
              {f === 'definition' || f === 'seo_description'
                ? <textarea value={basic[f] || ''} onChange={e => ub(f, e.target.value)} rows={f === 'definition' ? 4 : 2} className={icl + " resize-none"} />
                : <input type="text" value={basic[f] || ''} onChange={e => ub(f, e.target.value)} className={icl} />}
            </div>
          ))}
        </div>}

        {tab === 'headlines' && <div className="space-y-3">
          {Object.keys(pd.headlines || {}).length === 0 && <p className="text-gray-600 text-xs">No headlines configured.</p>}
          {Object.keys(pd.headlines || {}).map((k: string) => (
            <div key={k}><label className="block text-[10px] text-gray-600 mb-0.5 uppercase tracking-wider">{k.replace(/([A-Z])/g, ' $1').trim()}</label>
            <input type="text" value={(pd.headlines || {})[k] || ''} onChange={e => hUpdate(k, e.target.value)} className={ic} /></div>
          ))}
        </div>}

        {tab === 'overview' && <div><p className="text-gray-500 text-xs mb-3">Overview paragraphs below hero.</p>
          <div className="space-y-2">{sa('overview').map((v: string, i: number) => (
            <div key={i} className="flex gap-2"><textarea value={v} onChange={e => saUpdate('overview', i, e.target.value)} rows={3} className={ic + " flex-1 resize-none"} />
            <button onClick={() => saDel('overview', i)} className="text-red-500/50 hover:text-red-400 px-1 self-start mt-2"><span className="material-symbols-outlined text-base">close</span></button></div>
          ))}<button onClick={() => saAdd('overview')} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">add</span> Add paragraph</button></div>
        </div>}

        {tab === 'accepted' && <div><p className="text-gray-500 text-xs mb-3">Accepted items checklist.</p>
          <div className="space-y-2">{sa('acceptedItems').map((v: string, i: number) => (
            <div key={i} className="flex gap-2"><input type="text" value={v} onChange={e => saUpdate('acceptedItems', i, e.target.value)} className={ic + " flex-1"} />
            <button onClick={() => saDel('acceptedItems', i)} className="text-red-500/50 hover:text-red-400 px-1"><span className="material-symbols-outlined text-base">close</span></button></div>
          ))}<button onClick={() => saAdd('acceptedItems')} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">add</span> Add item</button></div>
        </div>}

        {tab === 'process' && <div><p className="text-gray-500 text-xs mb-3">Step-by-step process.</p>
          <div className="space-y-3">{oa('process').map((item: any, i: number) => (
            <div key={i} className="bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500 font-bold">Step {i + 1}</span><button onClick={() => oaDel('process', i)} className="text-red-500/50 hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button></div>
              <input type="text" value={item.title || ''} onChange={e => oaUpdate('process', i, 'title', e.target.value)} placeholder="Title" className={ic} />
              <textarea value={item.description || ''} onChange={e => oaUpdate('process', i, 'description', e.target.value)} rows={2} placeholder="Description" className={ic + " resize-none"} />
            </div>
          ))}<button onClick={() => oaAdd('process', { title: '', description: '' })} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Add step</button></div>
        </div>}

        {tab === 'differentiators' && <div><p className="text-gray-500 text-xs mb-3">Key differentiators.</p>
          <div className="space-y-2">{sa('differentiators').map((v: string, i: number) => (
            <div key={i} className="flex gap-2"><input type="text" value={v} onChange={e => saUpdate('differentiators', i, e.target.value)} className={ic + " flex-1"} />
            <button onClick={() => saDel('differentiators', i)} className="text-red-500/50 hover:text-red-400 px-1"><span className="material-symbols-outlined text-base">close</span></button></div>
          ))}<button onClick={() => saAdd('differentiators')} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">add</span> Add</button></div>
        </div>}

        {tab === 'certifications' && <div><p className="text-gray-500 text-xs mb-3">Certification badges.</p>
          <div className="space-y-2">{sa('certifications').map((v: string, i: number) => (
            <div key={i} className="flex gap-2"><input type="text" value={v} onChange={e => saUpdate('certifications', i, e.target.value)} className={ic + " flex-1"} />
            <button onClick={() => saDel('certifications', i)} className="text-red-500/50 hover:text-red-400 px-1"><span className="material-symbols-outlined text-base">close</span></button></div>
          ))}<button onClick={() => saAdd('certifications')} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">add</span> Add</button></div>
        </div>}

        {tab === 'casestudies' && <div><p className="text-gray-500 text-xs mb-3">Results & case studies.</p>
          <div className="space-y-3">{oa('caseStudies').map((item: any, i: number) => (
            <div key={i} className="bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500 font-bold">#{i + 1}</span><button onClick={() => oaDel('caseStudies', i)} className="text-red-500/50 hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button></div>
              <input type="text" value={item.title || ''} onChange={e => oaUpdate('caseStudies', i, 'title', e.target.value)} placeholder="Title" className={ic} />
              <input type="text" value={item.metric || ''} onChange={e => oaUpdate('caseStudies', i, 'metric', e.target.value)} placeholder="Metric" className={ic} />
            </div>
          ))}<button onClick={() => oaAdd('caseStudies', { title: '', metric: '' })} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Add</button></div>
        </div>}

        {/* ═══ INDUSTRY-SPECIFIC TABS ═══ */}

        {tab === 'wasteprofile' && <div><p className="text-gray-500 text-xs mb-3">Waste streams this industry generates.</p>
          <div className="space-y-2">{sa('wasteProfile').map((v: string, i: number) => (
            <div key={i} className="flex gap-2"><input type="text" value={v} onChange={e => saUpdate('wasteProfile', i, e.target.value)} className={ic + " flex-1"} placeholder="e.g. Cardboard from shipping — 40% of total waste stream" />
            <button onClick={() => saDel('wasteProfile', i)} className="text-red-500/50 hover:text-red-400 px-1"><span className="material-symbols-outlined text-base">close</span></button></div>
          ))}<button onClick={() => saAdd('wasteProfile')} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">add</span> Add waste stream</button></div>
        </div>}

        {/* ═══ CHALLENGE-SPECIFIC TABS ═══ */}

        {tab === 'consequences' && <div><p className="text-gray-500 text-xs mb-3">Consequences of not addressing this challenge — shown as red warning cards.</p>
          <div className="space-y-2">{sa('consequences').map((v: string, i: number) => (
            <div key={i} className="flex gap-2"><input type="text" value={v} onChange={e => saUpdate('consequences', i, e.target.value)} className={ic + " flex-1"} placeholder="e.g. EPA fines up to $70,117 per day per violation" />
            <button onClick={() => saDel('consequences', i)} className="text-red-500/50 hover:text-red-400 px-1"><span className="material-symbols-outlined text-base">close</span></button></div>
          ))}<button onClick={() => saAdd('consequences')} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">add</span> Add consequence</button></div>
        </div>}

        {tab === 'problemstats' && <div><p className="text-gray-500 text-xs mb-3">Statistics shown in the dark sidebar — each with a stat and source.</p>
          <div className="space-y-3">{oa('problemStats').map((item: any, i: number) => (
            <div key={i} className="bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500 font-bold">Stat {i + 1}</span><button onClick={() => oaDel('problemStats', i)} className="text-red-500/50 hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button></div>
              <input type="text" value={item.stat || ''} onChange={e => oaUpdate('problemStats', i, 'stat', e.target.value)} placeholder="e.g. 62 million tonnes of e-waste generated globally in 2022" className={ic} />
              <input type="text" value={item.source || ''} onChange={e => oaUpdate('problemStats', i, 'source', e.target.value)} placeholder="e.g. WHO/UN Global E-waste Monitor 2024" className={ic} />
            </div>
          ))}<button onClick={() => oaAdd('problemStats', { stat: '', source: '' })} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Add stat</button></div>
        </div>}

        {tab === 'barriers' && <div><p className="text-gray-500 text-xs mb-3">Why this challenge is hard — shown as numbered cards in dark section.</p>
          <div className="space-y-3">{oa('barriers').map((item: any, i: number) => (
            <div key={i} className="bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500 font-bold">Barrier {i + 1}</span><button onClick={() => oaDel('barriers', i)} className="text-red-500/50 hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button></div>
              <input type="text" value={item.title || ''} onChange={e => oaUpdate('barriers', i, 'title', e.target.value)} placeholder="Barrier title" className={ic} />
              <textarea value={item.description || ''} onChange={e => oaUpdate('barriers', i, 'description', e.target.value)} rows={2} placeholder="Description" className={ic + " resize-none"} />
            </div>
          ))}<button onClick={() => oaAdd('barriers', { title: '', description: '' })} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Add barrier</button></div>
        </div>}

        {tab === 'approach' && <div><p className="text-gray-500 text-xs mb-3">Our approach paragraphs — how we solve this challenge.</p>
          <div className="space-y-2">{sa('approach').map((v: string, i: number) => (
            <div key={i} className="flex gap-2"><textarea value={v} onChange={e => saUpdate('approach', i, e.target.value)} rows={3} className={ic + " flex-1 resize-none"} />
            <button onClick={() => saDel('approach', i)} className="text-red-500/50 hover:text-red-400 px-1 self-start mt-2"><span className="material-symbols-outlined text-base">close</span></button></div>
          ))}<button onClick={() => saAdd('approach')} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-sm">add</span> Add paragraph</button></div>
        </div>}

        {tab === 'outcomes' && <div><p className="text-gray-500 text-xs mb-3">Outcome metrics — shown as green stat cards.</p>
          <div className="space-y-3">{oa('outcomes').map((item: any, i: number) => (
            <div key={i} className="bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500 font-bold">#{i + 1}</span><button onClick={() => oaDel('outcomes', i)} className="text-red-500/50 hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button></div>
              <input type="text" value={item.metric || ''} onChange={e => oaUpdate('outcomes', i, 'metric', e.target.value)} placeholder="e.g. 95% diversion rate" className={ic} />
              <input type="text" value={item.description || ''} onChange={e => oaUpdate('outcomes', i, 'description', e.target.value)} placeholder="Description" className={ic} />
            </div>
          ))}<button onClick={() => oaAdd('outcomes', { metric: '', description: '' })} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Add outcome</button></div>
        </div>}

        {tab === 'resources' && <div><p className="text-gray-500 text-xs mb-3">Related resources — links shown as pills.</p>
          <div className="space-y-3">{oa('resources').map((item: any, i: number) => (
            <div key={i} className="bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500 font-bold">#{i + 1}</span><button onClick={() => oaDel('resources', i)} className="text-red-500/50 hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button></div>
              <input type="text" value={item.title || ''} onChange={e => oaUpdate('resources', i, 'title', e.target.value)} placeholder="Resource title" className={ic} />
              <input type="text" value={item.href || ''} onChange={e => oaUpdate('resources', i, 'href', e.target.value)} placeholder="/services/electronics-recycling" className={ic} />
              <input type="text" value={item.type || ''} onChange={e => oaUpdate('resources', i, 'type', e.target.value)} placeholder="e.g. Service, Guide, Material" className={ic} />
            </div>
          ))}<button onClick={() => oaAdd('resources', { title: '', href: '', type: '' })} className="text-[#4ADE80] text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Add resource</button></div>
        </div>}

        {/* ═══ SECTION VISIBILITY ═══ */}
        {tab === 'visibility' && <div>
          <p className="text-gray-500 text-xs mb-4">Toggle sections on/off for this page. Hidden sections won&apos;t render on the live site.</p>
          <div className="space-y-2">
            {sections.filter((s: string) => s !== 'basic' && s !== 'headlines').map((s: string) => {
              const fieldName = sectionFieldMap[s] || s;
              const isHidden = hiddenSections.includes(fieldName);
              return (
                <div key={s} className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${isHidden ? 'bg-[#0A0F0C] border-red-900/30' : 'bg-[#0A0F0C] border-[#1a2e1f]'}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base" style={{ color: isHidden ? '#666' : '#4ADE80' }}>{allLabels[s]?.[1] || 'edit'}</span>
                    <span className={`text-sm font-medium ${isHidden ? 'text-gray-600 line-through' : 'text-white'}`}>{allLabels[s]?.[0] || s}</span>
                  </div>
                  <button onClick={() => toggleSection(fieldName)} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${isHidden ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40' : 'bg-[#1B7A3D]/15 text-[#4ADE80] hover:bg-[#1B7A3D]/30'}`}>
                    {isHidden ? 'Hidden' : 'Visible'}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="text-gray-600 text-[10px] mt-4">Note: Basic Info and Headlines are always visible. Hidden sections still store their data — toggling back to visible restores the content.</p>
        </div>}
      </div>

      <div className="flex gap-3 px-6 py-4 border-t border-[#1a2e1f] bg-[#0A0F0C]/50">
        <button onClick={() => onSave(basic, pd)} disabled={saving} className="bg-[#1B7A3D] hover:bg-[#1a6e37] disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl">{saving ? 'Saving...' : 'Save All Changes'}</button>
        <button onClick={onCancel} className="border border-[#1a2e1f] text-gray-400 hover:text-white text-sm px-6 py-2.5 rounded-xl">Cancel</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ EDITOR
// ═══════════════════════════════════════════════════════════════

function FAQEditor() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadFaqs = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('faqs').select('*').eq('is_active', true).order('page_type').order('page_slug').order('sort_order');
    if (typeFilter !== 'all') query = query.eq('page_type', typeFilter);
    const { data } = await query;
    setFaqs(data || []);
    setLoading(false);
  }, [typeFilter]);

  useEffect(() => { loadFaqs(); }, [loadFaqs]);

  const filteredFaqs = filter
    ? faqs.filter((f) => f.question.toLowerCase().includes(filter.toLowerCase()) || f.page_slug.includes(filter.toLowerCase()))
    : faqs;

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, ...fields } = editing;
    if (id) {
      await supabase.from('faqs').update({ question: fields.question, answer: fields.answer }).eq('id', id);
    } else {
      await supabase.from('faqs').insert(fields);
    }
    setMessage('✅ FAQ saved!');
    setEditing(null);
    loadFaqs();
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await supabase.from('faqs').update({ is_active: false }).eq('id', id);
    loadFaqs();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-extrabold" style={{ letterSpacing: '-0.025em' }}>FAQs</h1>
          <p className="text-gray-500 text-sm">{faqs.length} questions</p>
        </div>
        <button onClick={() => setEditing({ question: '', answer: '', page_type: 'service', page_slug: '', sort_order: 0, is_active: true })} className="bg-[#1B7A3D] hover:bg-[#1a6e37] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">add</span> Add FAQ
        </button>
      </div>

      {message && <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-green-900/30 text-green-400 border border-green-800/30">{message}</div>}

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <input type="text" placeholder="Search questions..." value={filter} onChange={(e) => setFilter(e.target.value)} className="flex-1 bg-[#111916] border border-[#1a2e1f] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#1B7A3D]" />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-[#111916] border border-[#1a2e1f] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none">
          <option value="all">All types</option>
          <option value="service">Services</option>
          <option value="material">Materials</option>
          <option value="material-leaf">Material Leaves</option>
          <option value="industry">Industries</option>
          <option value="challenge">Challenges</option>
        </select>
      </div>

      {/* Edit panel */}
      {editing && (
        <div className="mb-5 bg-[#111916] border border-[#1B7A3D]/30 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-bold">{editing.id ? 'Edit FAQ' : 'New FAQ'}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase">Page type</label>
              <select value={editing.page_type} onChange={(e) => setEditing({ ...editing, page_type: e.target.value })} className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-4 py-2.5 text-white text-sm">
                <option value="service">Service</option><option value="material">Material</option><option value="material-leaf">Material Leaf</option><option value="industry">Industry</option><option value="challenge">Challenge</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase">Page slug</label>
              <input type="text" value={editing.page_slug} onChange={(e) => setEditing({ ...editing, page_slug: e.target.value })} className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-4 py-2.5 text-white text-sm" placeholder="e.g. scrap-metal-recycling" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 uppercase">Question</label>
            <input type="text" value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-4 py-2.5 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 uppercase">Answer</label>
            <textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={4} className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-4 py-3 text-white text-sm resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="bg-[#1B7A3D] hover:bg-[#1a6e37] disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setEditing(null)} className="border border-[#1a2e1f] text-gray-400 hover:text-white text-sm px-6 py-2.5 rounded-xl">Cancel</button>
          </div>
        </div>
      )}

      {/* FAQ list */}
      <div className="space-y-2">
        {loading ? <p className="text-gray-500 text-sm py-8 text-center">Loading...</p> : filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-[#111916] border border-[#1a2e1f] rounded-xl px-5 py-4 hover:border-[#1a2e1f]/80 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1B7A3D]/10 text-[#4ADE80]">{faq.page_type}</span>
                  <span className="text-[10px] text-gray-600 font-mono">{faq.page_slug}</span>
                </div>
                <p className="text-white text-sm font-medium mb-1">{faq.question}</p>
                <p className="text-gray-500 text-xs line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing({ ...faq })} className="text-[#4ADE80] hover:text-white text-xs font-bold">Edit</button>
                <button onClick={() => handleDelete(faq.id)} className="text-red-500/50 hover:text-red-400 text-xs font-bold">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RELATIONSHIP MANAGER
// ═══════════════════════════════════════════════════════════════

function RelationshipManager() {
  const [junctionType, setJunctionType] = useState<'service_materials' | 'service_industries' | 'service_locations' | 'service_challenges'>('service_materials');
  const [selectedService, setSelectedService] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [targets, setTargets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState({ target_slug: '', description: '', priority_score: 8 });
  const [message, setMessage] = useState('');

  const config: Record<string, { targetTable: string; targetLabel: string; fk: string }> = {
    service_materials: { targetTable: 'materials', targetLabel: 'Material', fk: 'material_id' },
    service_industries: { targetTable: 'industries', targetLabel: 'Industry', fk: 'industry_id' },
    service_locations: { targetTable: 'locations', targetLabel: 'Location', fk: 'location_id' },
    service_challenges: { targetTable: 'challenges', targetLabel: 'Challenge', fk: 'challenge_id' },
  };

  const cfg = config[junctionType];

  // Load services list once
  useEffect(() => {
    async function loadServices() {
      const { data } = await supabase.from('services').select('id, slug, name').eq('is_active', true).order('name');
      setServices(data || []);
    }
    loadServices();
  }, []);

  // Load targets list when junction type changes
  useEffect(() => {
    async function loadTargets() {
      const { data } = await supabase.from(cfg.targetTable).select('id, slug, name').eq('is_active', true).order('name');
      setTargets(data || []);
    }
    loadTargets();
  }, [cfg.targetTable]);

  // Load relationships only when a service is selected
  const loadRows = useCallback(async () => {
    if (!selectedService) { setRows([]); return; }
    setLoading(true);
    const svc = services.find((s: any) => s.slug === selectedService);
    if (!svc) { setLoading(false); return; }

    const { data: junctions } = await supabase
      .from(junctionType)
      .select('*')
      .eq('service_id', svc.id);

    const tgtMap = Object.fromEntries(targets.map((t: any) => [t.id, t]));
    const joined = (junctions || []).map((j: any) => ({
      ...j,
      target: tgtMap[j[cfg.fk]] || { name: '—', slug: '' },
    }));
    setRows(joined);
    setLoading(false);
  }, [selectedService, junctionType, services, targets, cfg.fk]);

  useEffect(() => { loadRows(); }, [loadRows]);

  const handleAdd = async () => {
    const svc = services.find((s: any) => s.slug === selectedService);
    const tgt = targets.find((t: any) => t.slug === newRow.target_slug);
    if (!svc || !tgt) { setMessage('❌ Select a target'); return; }

    const row: any = { service_id: svc.id, [cfg.fk]: tgt.id, is_approved: true };
    if (junctionType === 'service_materials') { row.description = newRow.description; row.priority_score = newRow.priority_score; }
    if (junctionType === 'service_industries') { row.context = newRow.description; row.priority_score = newRow.priority_score; }
    if (junctionType === 'service_challenges') { row.pain_context = newRow.description; row.relevance_score = newRow.priority_score; }
    if (junctionType === 'service_locations') { row.priority_score = newRow.priority_score; }

    const { error } = await supabase.from(junctionType).insert(row);
    if (error) { setMessage(`❌ ${error.message}`); } else { setMessage('✅ Added!'); setAdding(false); setNewRow({ target_slug: '', description: '', priority_score: 8 }); loadRows(); }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this relationship?')) return;
    await supabase.from(junctionType).delete().eq('id', id);
    loadRows();
  };

  return (
    <div>
      <h1 className="text-white text-2xl font-extrabold mb-6" style={{ letterSpacing: '-0.025em' }}>Relationships</h1>

      {/* Junction type selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.keys(config).map((key) => (
          <button key={key} onClick={() => { setJunctionType(key as any); setSelectedService(''); setRows([]); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${junctionType === key ? 'bg-[#1B7A3D]/15 text-[#4ADE80] border border-[#1B7A3D]/30' : 'bg-[#111916] text-gray-400 border border-[#1a2e1f] hover:text-white'}`}>
            {key.replace('service_', 'Svc ↔ ').replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Service filter — MUST select a service first */}
      <div className="mb-6">
        <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Select a service to view its {cfg.targetLabel.toLowerCase()}s</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full max-w-sm bg-[#111916] border border-[#1a2e1f] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1B7A3D]"
        >
          <option value="">Choose a service...</option>
          {services.map((s: any) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </div>

      {message && <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${message.startsWith('✅') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>{message}</div>}

      {/* Only show content when a service is selected */}
      {selectedService ? (
        <>
          {/* Summary */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              <span className="text-white font-bold">{services.find((s: any) => s.slug === selectedService)?.name}</span> has <span className="text-[#4ADE80] font-bold">{rows.length}</span> {cfg.targetLabel.toLowerCase()}s
            </p>
            <button onClick={() => setAdding(true)} className="bg-[#1B7A3D] hover:bg-[#1a6e37] text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-base">add</span> Add {cfg.targetLabel}
            </button>
          </div>

          {/* Add panel */}
          {adding && (
            <div className="mb-5 bg-[#111916] border border-[#1B7A3D]/30 rounded-xl p-5 space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1 uppercase">{cfg.targetLabel}</label>
                <select value={newRow.target_slug} onChange={(e) => setNewRow({ ...newRow, target_slug: e.target.value })} className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-3 py-2.5 text-white text-sm">
                  <option value="">Select...</option>
                  {targets.map((t: any) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
                </select>
              </div>
              {junctionType !== 'service_locations' && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase">Description / Context</label>
                  <input type="text" value={newRow.description} onChange={(e) => setNewRow({ ...newRow, description: e.target.value })} className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-3 py-2.5 text-white text-sm" placeholder="Why this relationship matters" />
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={handleAdd} className="bg-[#1B7A3D] text-white font-bold text-sm px-5 py-2 rounded-xl">Add</button>
                <button onClick={() => setAdding(false)} className="text-gray-400 text-sm px-5 py-2">Cancel</button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-[#111916] border border-[#1a2e1f] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1a2e1f]">
                  <th className="text-left px-4 py-3 text-gray-500 text-xs uppercase">{cfg.targetLabel}</th>
                  <th className="text-left px-4 py-3 text-gray-500 text-xs uppercase">Description</th>
                  <th className="text-right px-4 py-3 text-gray-500 text-xs uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan={3} className="text-center text-gray-500 py-8">Loading...</td></tr> : rows.length === 0 ? (
                  <tr><td colSpan={3} className="text-center text-gray-500 py-8">No {cfg.targetLabel.toLowerCase()}s linked. Click "Add" above.</td></tr>
                ) : rows.map((row: any) => (
                  <tr key={row.id} className="border-b border-[#1a2e1f]/50 hover:bg-white/[.02]">
                    <td className="px-4 py-3 text-white font-medium">{row.target?.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[400px]">{row.description || row.context || row.pain_context || '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(row.id)} className="text-red-500/50 hover:text-red-400 text-xs font-bold">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-[#111916] border border-[#1a2e1f] rounded-xl">
          <span className="material-symbols-outlined text-4xl text-gray-600 mb-3 block">arrow_upward</span>
          <p className="text-gray-500 text-sm">Select a service above to manage its {cfg.targetLabel.toLowerCase()}s</p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SETTINGS TAB
// ═══════════════════════════════════════════════════════════════

function SettingsTab() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('site_config').select('key, value');
      setConfig(Object.fromEntries((data || []).map((d: any) => [d.key, d.value])));
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(config)) {
      await supabase.from('site_config').update({ value }).eq('key', key);
    }
    setMessage('✅ Settings saved!');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const fields = [
    { key: 'company_name', label: 'Company Name' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'phone_href', label: 'Phone Link (tel:)' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'site_url', label: 'Site URL' },
  ];

  return (
    <div>
      <h1 className="text-white text-2xl font-extrabold mb-6" style={{ letterSpacing: '-0.025em' }}>Settings</h1>

      {message && <div className="mb-4 px-4 py-3 rounded-xl text-sm bg-green-900/30 text-green-400 border border-green-800/30">{message}</div>}

      <div className="bg-[#111916] border border-[#1a2e1f] rounded-xl p-6 max-w-lg">
        {loading ? <p className="text-gray-500">Loading...</p> : (
          <div className="space-y-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
                <input type="text" value={config[f.key] || ''} onChange={(e) => setConfig({ ...config, [f.key]: e.target.value })} className="w-full bg-[#0A0F0C] border border-[#1a2e1f] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1B7A3D]" />
              </div>
            ))}
            <button onClick={handleSave} disabled={saving} className="bg-[#1B7A3D] hover:bg-[#1a6e37] disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl mt-2">
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
