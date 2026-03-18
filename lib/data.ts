// ─── CONTACT INFO ───
export const CONTACT = {
  phone: '817-946-5655',
  phoneHref: 'tel:8179465655',
  email: 'info@recyclingquotes.com',
  address: 'Fort Worth, TX',
  company: 'Recycling Quotes',
} as const;

// ─── NAVIGATION ───
export type NavDropdownItem = {
  label: string;
  href: string;
  icon: string;
  color: 'green' | 'amber' | 'blue' | 'teal';
};

export type NavColumn = {
  label?: string;
  items: NavDropdownItem[];
};

export type NavItem = {
  label: string;
  href: string;
  type: 'link' | 'mega';
  columns?: NavColumn[];
  cta?: { label: string; href: string };
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', type: 'link' },
  {
    label: 'Services', href: '/services', type: 'mega',
    columns: [
      { label: 'Core Recycling', items: [
        { label: 'Pallet Recycling', href: '/services/pallet-recycling', icon: 'pallet', color: 'green' },
        { label: 'Business Recycling', href: '/services/business-recycling-programs', icon: 'apartment', color: 'green' },
        { label: 'Material Solutions', href: '/services/material-recycling-solutions', icon: 'recycling', color: 'green' },
      ]},
      { label: 'Equipment & Logistics', items: [
        { label: 'Dumpster Rental', href: '/services/dumpster-rental', icon: 'delete', color: 'amber' },
        { label: 'Junk Removal', href: '/services/junk-removal', icon: 'local_shipping', color: 'amber' },
      ]},
      { label: 'Specialized', items: [
        { label: 'IT Asset Disposition', href: '/services/it-asset-disposition', icon: 'devices', color: 'blue' },
        { label: 'Data Destruction', href: '/services/data-destruction', icon: 'enhanced_encryption', color: 'blue' },
        { label: 'Waste Audits', href: '/services/waste-audits-consulting', icon: 'query_stats', color: 'blue' },
      ]},
      { label: 'Programs', items: [
        { label: 'Take Back Programs', href: '/services/take-back-programs', icon: 'swap_horiz', color: 'teal' },
        { label: 'Collection Events', href: '/services/collection-events', icon: 'event', color: 'teal' },
      ]},
    ],
    cta: { label: 'Schedule a Pickup', href: '/schedule-pickup' },
  },
  {
    label: 'Materials', href: '/materials', type: 'mega',
    columns: [
      { label: 'Common Materials', items: [
        { label: 'Electronics', href: '/materials/electronics', icon: 'devices', color: 'green' },
        { label: 'Metal', href: '/materials/metals', icon: 'iron', color: 'green' },
        { label: 'Paper & Cardboard', href: '/materials/paper-cardboard', icon: 'description', color: 'green' },
        { label: 'Plastic', href: '/materials/plastics', icon: 'water_bottle', color: 'green' },
        { label: 'Cell Phones', href: '/materials/electronics/cell-phones', icon: 'smartphone', color: 'green' },
        { label: 'Clothing / Textile', href: '/materials/textiles', icon: 'checkroom', color: 'green' },
        { label: 'Organics', href: '/materials/organics', icon: 'compost', color: 'green' },
        { label: 'Pallets', href: '/materials/pallets', icon: 'pallet', color: 'green' },
      ]},
      { label: 'Specialty & Hazardous', items: [
        { label: 'Chemicals', href: '/materials/hazardous-materials/chemicals', icon: 'science', color: 'amber' },
        { label: 'Vehicles', href: '/materials/vehicles', icon: 'directions_car', color: 'amber' },
        { label: 'Light Bulbs', href: '/materials/hazardous-materials/light-bulbs', icon: 'lightbulb', color: 'amber' },
        { label: 'Batteries', href: '/materials/hazardous-materials/batteries', icon: 'battery_full', color: 'amber' },
        { label: 'Hazardous Materials', href: '/materials/hazardous-materials', icon: 'warning', color: 'amber' },
      ]},
    ],
  },
  {
    label: 'Industries', href: '/industries', type: 'mega',
    columns: [
      { label: 'Commercial & Industrial', items: [
        { label: 'Retail', href: '/industries/retail', icon: 'storefront', color: 'green' },
        { label: 'Manufacturing', href: '/industries/manufacturing', icon: 'factory', color: 'green' },
        { label: 'Distribution & Logistics', href: '/industries/logistics', icon: 'local_shipping', color: 'green' },
        { label: 'Construction', href: '/industries/construction', icon: 'construction', color: 'green' },
        { label: 'Automotive', href: '/industries/automotive', icon: 'directions_car', color: 'green' },
        { label: 'Banking & Finance', href: '/industries/banking-finance', icon: 'account_balance', color: 'green' },
      ]},
      { label: 'Public & Services', items: [
        { label: 'Healthcare', href: '/industries/healthcare', icon: 'local_hospital', color: 'blue' },
        { label: 'Education & Government', href: '/industries/education', icon: 'school', color: 'blue' },
        { label: 'Food Services', href: '/industries/food-services', icon: 'restaurant', color: 'blue' },
        { label: 'Hospitality', href: '/industries/hospitality', icon: 'hotel', color: 'blue' },
        { label: 'Property Management', href: '/industries/property-management', icon: 'domain', color: 'blue' },
      ]},
    ],
  },
  {
    label: 'Challenges', href: '/challenges', type: 'mega',
    columns: [
      { items: [
        { label: 'E-Waste Compliance', href: '/challenges/ewaste-compliance', icon: 'gavel', color: 'blue' },
        { label: 'Waste Diversion', href: '/challenges/waste-diversion', icon: 'alt_route', color: 'green' },
        { label: 'ESG Reporting', href: '/challenges/esg-reporting', icon: 'eco', color: 'green' },
        { label: 'Hazardous Waste', href: '/challenges/hazardous-waste', icon: 'warning', color: 'amber' },
      ]},
      { items: [
        { label: 'Cost Reduction', href: '/challenges/cost-reduction', icon: 'savings', color: 'green' },
        { label: 'Program Setup', href: '/challenges/program-setup', icon: 'settings', color: 'blue' },
        { label: 'Supply Chain', href: '/challenges/supply-chain-sustainability', icon: 'hub', color: 'teal' },
        { label: 'C&D Waste', href: '/challenges/cd-waste-compliance', icon: 'domain', color: 'amber' },
      ]},
    ],
  },
  {
    label: 'Resources', href: '/resources', type: 'mega',
    columns: [
      { items: [
        { label: 'Blog', href: '/resources/blog', icon: 'article', color: 'green' },
        { label: 'FAQ', href: '/resources/faq', icon: 'help', color: 'green' },
        { label: 'Videos', href: '/resources/videos', icon: 'play_circle', color: 'green' },
        { label: 'Guides', href: '/resources/guides', icon: 'menu_book', color: 'blue' },
        { label: 'News', href: '/resources/news', icon: 'newspaper', color: 'blue' },
        { label: 'Statistics', href: '/resources/statistics', icon: 'bar_chart', color: 'blue' },
      ]},
    ],
  },
  {
    label: 'About', href: '/about', type: 'mega',
    columns: [
      { items: [
        { label: 'Our Story', href: '/about/our-story', icon: 'auto_stories', color: 'green' },
        { label: 'Why Choose Us', href: '/about/why-choose-us', icon: 'verified', color: 'green' },
        { label: 'ESG & Sustainability', href: '/about/esg', icon: 'eco', color: 'green' },
        { label: 'Our Impact', href: '/about/our-impact', icon: 'trending_up', color: 'blue' },
        { label: 'Certifications', href: '/about/certifications', icon: 'workspace_premium', color: 'blue' },
      ]},
    ],
  },
  { label: 'Contact', href: '/contact', type: 'link' },
];

// ─── SERVICES ───
export const SERVICES = [
  { slug: 'pallet-recycling', name: 'Pallet Recycling', icon: 'pallet', color: 'green' as const, description: 'Free pallet pickup for warehouses, retailers, and manufacturers. We repair, reuse, and recycle wooden and plastic pallets.' },
  { slug: 'business-recycling-programs', name: 'Business Recycling', icon: 'apartment', color: 'green' as const, description: 'Custom recycling programs with compliance reporting, waste stream analysis, and ongoing support for multi-location businesses.' },
  { slug: 'material-recycling-solutions', name: 'Material Solutions', icon: 'recycling', color: 'green' as const, description: 'End-to-end recycling for all 15 material types with certified processing and documentation.' },
  { slug: 'dumpster-rental', name: 'Dumpster Rental', icon: 'delete', color: 'amber' as const, description: 'Roll-off, front-load, and compactor rentals for construction, renovation, and business cleanout projects.' },
  { slug: 'junk-removal', name: 'Junk Removal', icon: 'local_shipping', color: 'amber' as const, description: 'Residential and commercial junk hauling with same-day availability and responsible disposal.' },
  { slug: 'it-asset-disposition', name: 'IT Asset Disposition', icon: 'devices', color: 'blue' as const, description: 'Certified ITAD services with R2 and e-Stewards compliance. Data destruction, asset recovery, and full chain-of-custody.' },
  { slug: 'data-destruction', name: 'Data Destruction', icon: 'enhanced_encryption', color: 'blue' as const, description: 'NIST 800-88 compliant hard drive shredding and data wiping with certificates of destruction.' },
  { slug: 'waste-audits-consulting', name: 'Waste Audits', icon: 'query_stats', color: 'blue' as const, description: 'Waste stream analysis, diversion planning, and compliance consulting for enterprise operations.' },
  { slug: 'take-back-programs', name: 'Take Back Programs', icon: 'swap_horiz', color: 'teal' as const, description: 'EPR compliance and product return logistics for manufacturers and retailers.' },
  { slug: 'collection-events', name: 'Collection Events', icon: 'event', color: 'teal' as const, description: 'Community, campus, and corporate recycling collection events with full logistics support.' },
  { slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling', icon: 'iron', color: 'green' as const, description: 'Ferrous and non-ferrous metal recycling with competitive pricing and free pickup.' },
  { slug: 'electronics-recycling', name: 'Electronics Recycling', icon: 'devices', color: 'green' as const, description: 'Certified e-waste recycling for computers, phones, monitors, and all electronic equipment.' },
  { slug: 'cardboard-paper-recycling', name: 'Cardboard & Paper', icon: 'description', color: 'green' as const, description: 'High-volume cardboard and paper recycling with scheduled pickup and baling services.' },
  { slug: 'plastic-recycling', name: 'Plastic Recycling', icon: 'water_bottle', color: 'green' as const, description: 'Rigid and film plastic recycling for commercial and industrial waste streams.' },
  { slug: 'hazardous-waste-disposal', name: 'Hazardous Waste', icon: 'warning', color: 'amber' as const, description: 'Licensed hazardous waste disposal for batteries, chemicals, light bulbs, and medical waste.' },
] as const;

// ─── MATERIALS ───
export const MATERIALS = [
  { slug: 'electronics', name: 'Electronics', icon: 'devices', color: 'green' as const },
  { slug: 'metals', name: 'Metal', icon: 'iron', color: 'green' as const },
  { slug: 'paper-cardboard', name: 'Paper', icon: 'description', color: 'green' as const },
  { slug: 'plastics', name: 'Plastic', icon: 'water_bottle', color: 'green' as const },
  { slug: 'junk', name: 'Junk', icon: 'delete_sweep', color: 'amber' as const },
  { slug: 'electronics/cell-phones', name: 'Cell Phones', icon: 'smartphone', color: 'green' as const },
  { slug: 'textiles', name: 'Textiles', icon: 'checkroom', color: 'green' as const },
  { slug: 'organics', name: 'Organics', icon: 'compost', color: 'green' as const },
  { slug: 'hazardous-materials/chemicals', name: 'Chemicals', icon: 'science', color: 'amber' as const },
  { slug: 'vehicles', name: 'Vehicles', icon: 'directions_car', color: 'amber' as const },
  { slug: 'pallets', name: 'Pallets', icon: 'pallet', color: 'green' as const },
  { slug: 'hazardous-materials/light-bulbs', name: 'Light Bulbs', icon: 'lightbulb', color: 'amber' as const },
  { slug: 'hazardous-materials/batteries', name: 'Batteries', icon: 'battery_full', color: 'amber' as const },
  { slug: 'hazardous-materials', name: 'Hazardous', icon: 'warning', color: 'amber' as const },
] as const;

// ─── INDUSTRIES ───
export const INDUSTRIES = [
  { slug: 'retail', name: 'Retail', icon: 'storefront', description: 'Packaging, pallet & e-waste programs', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop' },
  { slug: 'manufacturing', name: 'Manufacturing', icon: 'factory', description: 'Scrap metal, byproduct & waste recycling', image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=300&fit=crop' },
  { slug: 'healthcare', name: 'Healthcare', icon: 'local_hospital', description: 'HIPAA-compliant e-waste & medical disposal', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop' },
  { slug: 'construction', name: 'Construction', icon: 'construction', description: 'Dumpster rental & C&D waste management', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop' },
  { slug: 'logistics', name: 'Distribution & Logistics', icon: 'local_shipping', description: 'Pallet, packaging & warehouse cleanup', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop' },
  { slug: 'banking-finance', name: 'Banking & Finance', icon: 'account_balance', description: 'Secure data destruction & IT recycling', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' },
  { slug: 'food-services', name: 'Food Services', icon: 'restaurant', description: 'Organics, packaging & kitchen waste', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop' },
  { slug: 'education', name: 'Education & Government', icon: 'school', description: 'Campus-wide recycling & compliance', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop' },
] as const;

// ─── LOCATIONS ───
export type LocationCountry = {
  slug: string;
  name: string;
  flag: string;
  metros: { slug: string; name: string; state?: string }[];
};

export const LOCATIONS: LocationCountry[] = [
  {
    slug: 'usa', name: 'United States', flag: '🇺🇸',
    metros: [
      { slug: 'atlanta', name: 'Atlanta', state: 'GA' },
      { slug: 'austin', name: 'Austin', state: 'TX' },
      { slug: 'baltimore', name: 'Baltimore', state: 'MD' },
      { slug: 'birmingham', name: 'Birmingham', state: 'AL' },
      { slug: 'boston', name: 'Boston', state: 'MA' },
      { slug: 'buffalo', name: 'Buffalo', state: 'NY' },
      { slug: 'charlotte', name: 'Charlotte', state: 'NC' },
      { slug: 'chicago', name: 'Chicago', state: 'IL' },
      { slug: 'cincinnati', name: 'Cincinnati', state: 'OH' },
      { slug: 'cleveland', name: 'Cleveland', state: 'OH' },
      { slug: 'columbus', name: 'Columbus', state: 'OH' },
      { slug: 'dallas-fort-worth', name: 'Dallas–Fort Worth', state: 'TX' },
      { slug: 'denver', name: 'Denver', state: 'CO' },
      { slug: 'detroit', name: 'Detroit', state: 'MI' },
      { slug: 'hartford', name: 'Hartford', state: 'CT' },
      { slug: 'houston', name: 'Houston', state: 'TX' },
      { slug: 'indianapolis', name: 'Indianapolis', state: 'IN' },
      { slug: 'jacksonville', name: 'Jacksonville', state: 'FL' },
      { slug: 'kansas-city', name: 'Kansas City', state: 'MO' },
      { slug: 'las-vegas', name: 'Las Vegas', state: 'NV' },
      { slug: 'los-angeles', name: 'Los Angeles', state: 'CA' },
      { slug: 'louisville', name: 'Louisville', state: 'KY' },
      { slug: 'memphis', name: 'Memphis', state: 'TN' },
      { slug: 'miami-fort-lauderdale', name: 'Miami–Fort Lauderdale', state: 'FL' },
      { slug: 'milwaukee', name: 'Milwaukee', state: 'WI' },
      { slug: 'minneapolis-st-paul', name: 'Minneapolis–St. Paul', state: 'MN' },
      { slug: 'nashville', name: 'Nashville', state: 'TN' },
      { slug: 'new-orleans', name: 'New Orleans', state: 'LA' },
      { slug: 'new-york-city', name: 'New York City', state: 'NY' },
      { slug: 'oklahoma-city', name: 'Oklahoma City', state: 'OK' },
      { slug: 'orlando', name: 'Orlando', state: 'FL' },
      { slug: 'philadelphia', name: 'Philadelphia', state: 'PA' },
      { slug: 'phoenix', name: 'Phoenix', state: 'AZ' },
      { slug: 'pittsburgh', name: 'Pittsburgh', state: 'PA' },
      { slug: 'portland', name: 'Portland', state: 'OR' },
      { slug: 'providence', name: 'Providence', state: 'RI' },
      { slug: 'raleigh-cary', name: 'Raleigh–Cary', state: 'NC' },
      { slug: 'richmond', name: 'Richmond', state: 'VA' },
      { slug: 'riverside-san-bernardino', name: 'Riverside–San Bernardino', state: 'CA' },
      { slug: 'rochester', name: 'Rochester', state: 'NY' },
      { slug: 'sacramento', name: 'Sacramento', state: 'CA' },
      { slug: 'salt-lake-city', name: 'Salt Lake City', state: 'UT' },
      { slug: 'san-antonio', name: 'San Antonio', state: 'TX' },
      { slug: 'san-diego', name: 'San Diego', state: 'CA' },
      { slug: 'san-francisco-bay-area', name: 'San Francisco Bay Area', state: 'CA' },
      { slug: 'san-jose', name: 'San Jose', state: 'CA' },
      { slug: 'seattle-tacoma', name: 'Seattle–Tacoma', state: 'WA' },
      { slug: 'st-louis', name: 'St. Louis', state: 'MO' },
      { slug: 'tampa-st-petersburg', name: 'Tampa–St. Petersburg', state: 'FL' },
      { slug: 'tucson', name: 'Tucson', state: 'AZ' },
      { slug: 'virginia-beach', name: 'Virginia Beach', state: 'VA' },
      { slug: 'washington-dc', name: 'Washington, D.C.', state: 'DC' },
    ],
  },
  {
    slug: 'canada', name: 'Canada', flag: '🇨🇦',
    metros: [
      { slug: 'toronto', name: 'Toronto' },
      { slug: 'vancouver', name: 'Vancouver' },
      { slug: 'montreal', name: 'Montreal' },
      { slug: 'calgary', name: 'Calgary' },
      { slug: 'ottawa', name: 'Ottawa' },
    ],
  },
  {
    slug: 'uk', name: 'United Kingdom', flag: '🇬🇧',
    metros: [
      { slug: 'london', name: 'London' },
      { slug: 'manchester', name: 'Manchester' },
      { slug: 'birmingham-uk', name: 'Birmingham' },
      { slug: 'leeds', name: 'Leeds' },
      { slug: 'sheffield', name: 'Sheffield' },
    ],
  },
  {
    slug: 'australia', name: 'Australia', flag: '🇦🇺',
    metros: [
      { slug: 'sydney', name: 'Sydney' },
      { slug: 'melbourne', name: 'Melbourne' },
      { slug: 'brisbane', name: 'Brisbane' },
      { slug: 'perth', name: 'Perth' },
    ],
  },
];
