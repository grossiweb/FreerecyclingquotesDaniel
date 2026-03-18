// ─── SERVICE × LOCATION DATA ───
// State-level regulations and local industry context for genuine content differentiation.
// Per Content Rules: "If 400 pages all say the same thing with only the city name swapped, Google deindexes them."

export type StateRegulations = {
  state: string;
  stateCode: string;
  regulations: string;
  localIndustries: string;
};

// State-specific context for content differentiation
export const STATE_CONTEXT: Record<string, StateRegulations> = {
  'IL': { state: 'Illinois', stateCode: 'IL', regulations: 'Illinois Electronic Products Recycling and Reuse Act requires manufacturers to collect and recycle e-waste. The state also has strict hazardous waste regulations under the Illinois EPA, with landfill bans on electronics and specific reporting requirements for generators.', localIndustries: 'Chicago\'s manufacturing corridor, food processing, logistics hubs, and financial district generate significant commercial recycling demand.' },
  'TX': { state: 'Texas', stateCode: 'TX', regulations: 'Texas has no statewide e-waste recycling mandate, making proper disposal a voluntary but critical business decision. TCEQ regulates hazardous waste under state-specific rules that often exceed federal minimums. Texas also has specific regulations for scrap metal dealers requiring documentation.', localIndustries: 'Energy sector, petrochemical manufacturing, logistics hubs, and a rapidly growing tech sector drive diverse recycling needs across the state.' },
  'CA': { state: 'California', stateCode: 'CA', regulations: 'California has the strictest recycling regulations in the US including SB 1383 (organic waste diversion), the Electronic Waste Recycling Act (covered electronic waste fee), SB 20/50 for e-waste, and CalRecycle oversight. The state mandates 75% waste diversion for commercial operations.', localIndustries: 'Entertainment, technology, aerospace, manufacturing, and agriculture create diverse waste streams requiring specialized recycling programs.' },
  'GA': { state: 'Georgia', stateCode: 'GA', regulations: 'Georgia\'s Solid Waste Management Act requires businesses to implement recycling plans. The Georgia EPD regulates hazardous waste with state-specific manifest requirements. Atlanta\'s commercial waste ordinance requires reporting for large generators.', localIndustries: 'Logistics and distribution (Hartsfield-Jackson hub), film production, manufacturing, and the Southeast\'s largest concentration of Fortune 500 headquarters.' },
  'NY': { state: 'New York', stateCode: 'NY', regulations: 'New York\'s Electronic Equipment Recycling and Reuse Act bans e-waste from landfill. NYC has additional local recycling mandates for commercial buildings. The state has aggressive hazardous waste enforcement and mandatory recycling for businesses above threshold volumes.', localIndustries: 'Financial services, media, healthcare systems, higher education, and dense commercial office environments generate high volumes of e-waste and paper.' },
  'PA': { state: 'Pennsylvania', stateCode: 'PA', regulations: 'Pennsylvania\'s Covered Device Recycling Act requires manufacturer-funded e-waste collection. The state DEP regulates hazardous waste with permit requirements for generators. Act 101 requires municipal waste planning including recycling.', localIndustries: 'Healthcare systems, pharmaceutical manufacturing, steel production, and a large university network drive diversified recycling demand.' },
  'MI': { state: 'Michigan', stateCode: 'MI', regulations: 'Michigan has no comprehensive e-waste recycling law but regulates hazardous waste through MDEQ with requirements exceeding federal standards for auto-related waste. Specific regulations govern scrap tire management and auto fluid disposal.', localIndustries: 'Automotive manufacturing, parts suppliers, and the state\'s industrial heritage make metal recycling and auto-related waste management critical services.' },
  'FL': { state: 'Florida', stateCode: 'FL', regulations: 'Florida\'s recycling goal is 75% by 2020 (not yet met). The state DEP regulates hazardous waste with specific rules for universal waste. Florida has no statewide e-waste mandate but several counties have local electronics recycling programs.', localIndustries: 'Tourism and hospitality, healthcare, construction boom, and military installations create demand for diverse recycling services.' },
  'OH': { state: 'Ohio', stateCode: 'OH', regulations: 'Ohio EPA regulates hazardous waste with state-specific additions to federal RCRA rules. The state has a voluntary electronics recycling program and specific regulations for scrap tire management.', localIndustries: 'Manufacturing, automotive supply chain, healthcare systems, and distribution centers along major interstate corridors.' },
  'AZ': { state: 'Arizona', stateCode: 'AZ', regulations: 'Arizona has no statewide e-waste mandate. ADEQ regulates hazardous waste under state rules. Maricopa County has specific construction and demolition waste diversion requirements for permitted projects.', localIndustries: 'Construction growth, data centers, semiconductor manufacturing, and a booming logistics sector drive commercial recycling demand.' },
  'CO': { state: 'Colorado', stateCode: 'CO', regulations: 'Colorado passed the Producer Responsibility for Recycling Act (HB 22-1355) establishing an EPR program for packaging. The state has specific hazardous waste regulations and e-waste recycling encouragement through CDPHE.', localIndustries: 'Technology, aerospace, outdoor recreation manufacturing, and a fast-growing construction sector with green building mandates.' },
  'WA': { state: 'Washington', stateCode: 'WA', regulations: 'Washington\'s E-Cycle program requires manufacturer-funded electronics recycling. The state has a comprehensive hazardous waste program and commercial recycling mandates in several cities including Seattle\'s aggressive zero-waste policies.', localIndustries: 'Technology (Amazon, Microsoft, Boeing), maritime logistics, and a strong sustainability culture drive demand for comprehensive recycling programs.' },
  'NC': { state: 'North Carolina', stateCode: 'NC', regulations: 'North Carolina bans electronics from landfill and requires manufacturer-funded recycling. The state DEQ regulates hazardous waste with specific rules for large quantity generators.', localIndustries: 'Banking and finance (Charlotte), research triangle tech companies, manufacturing, and a growing logistics hub.' },
  'MA': { state: 'Massachusetts', stateCode: 'MA', regulations: 'Massachusetts has a statewide ban on disposal of recyclable materials including electronics, paper, cardboard, metals, and organics for commercial generators over 1 ton/week. MassDEP enforces aggressive waste bans.', localIndustries: 'Healthcare and biotech, higher education, financial services, and technology create high-value e-waste and regulated waste streams.' },
  'NV': { state: 'Nevada', stateCode: 'NV', regulations: 'Nevada has no statewide e-waste mandate. NDEP regulates hazardous waste under state rules. Clark County has specific construction waste diversion programs.', localIndustries: 'Hospitality and gaming, conventions, construction growth, and data centers in the Las Vegas metro.' },
  'ON': { state: 'Ontario', stateCode: 'ON', regulations: 'Ontario\'s Resource Recovery and Circular Economy Act and the Waste Diversion Transition Act establish producer responsibility for electronics, batteries, and tires. The province has among the strictest recycling regulations in Canada.', localIndustries: 'Financial services, manufacturing, healthcare, and the GTA\'s dense commercial corridor make Toronto one of Canada\'s largest recycling markets.' },
  'DC': { state: 'District of Columbia', stateCode: 'DC', regulations: 'DC has mandatory recycling for all businesses with specific reporting requirements. The district bans electronics and hazardous materials from landfill and has one of the most aggressive sustainability frameworks in the US.', localIndustries: 'Federal government, associations, law firms, and international organizations generate high volumes of IT equipment, paper, and secure destruction needs.' },
  'MO': { state: 'Missouri', stateCode: 'MO', regulations: 'Missouri\'s DNR regulates hazardous waste with state-specific rules. The state has voluntary electronics recycling programs and specific regulations for scrap metal and auto salvage.', localIndustries: 'Manufacturing, healthcare systems, logistics (central US hub), and a growing tech sector.' },
  'MN': { state: 'Minnesota', stateCode: 'MN', regulations: 'Minnesota requires manufacturer-funded electronics recycling. The state PCA has aggressive hazardous waste programs and commercial recycling mandates. Hennepin County has additional local requirements.', localIndustries: 'Fortune 500 headquarters, medical device manufacturing, agriculture, and a strong corporate sustainability culture.' },
  'IN': { state: 'Indiana', stateCode: 'IN', regulations: 'Indiana has no statewide e-waste mandate. IDEM regulates hazardous waste under state rules with specific requirements for auto manufacturing waste. The state encourages voluntary recycling programs.', localIndustries: 'Auto manufacturing, pharmaceutical production, logistics, and racing industry operations.' },
  'OR': { state: 'Oregon', stateCode: 'OR', regulations: 'Oregon\'s Electronics Recycling Law requires manufacturer-funded collection. DEQ regulates hazardous waste and the state has a mandatory commercial recycling law in the Portland metro area.', localIndustries: 'Technology, athletic apparel, forestry products, and a strong sustainability-oriented business community.' },
  'TN': { state: 'Tennessee', stateCode: 'TN', regulations: 'Tennessee has no statewide e-waste mandate but TDEC regulates hazardous waste. Nashville and Memphis have local waste reduction initiatives.', localIndustries: 'Healthcare (Nashville), logistics (Memphis/FedEx hub), automotive manufacturing, and music industry operations.' },
  'WI': { state: 'Wisconsin', stateCode: 'WI', regulations: 'Wisconsin has a statewide electronics recycling law banning certain e-waste from landfill. DNR regulates hazardous waste with specific state requirements.', localIndustries: 'Manufacturing, food processing, healthcare, and dairy industry operations.' },
  'LA': { state: 'Louisiana', stateCode: 'LA', regulations: 'Louisiana DEQ regulates hazardous waste with particular focus on petrochemical and energy sector waste. No statewide e-waste mandate.', localIndustries: 'Petrochemical, energy, maritime, tourism, and food services.' },
  'KY': { state: 'Kentucky', stateCode: 'KY', regulations: 'Kentucky has no statewide e-waste mandate. The state regulates hazardous waste through the Energy and Environment Cabinet.', localIndustries: 'Auto manufacturing (Toyota, Ford), bourbon distilling, healthcare, and logistics.' },
  'OK': { state: 'Oklahoma', stateCode: 'OK', regulations: 'Oklahoma DEQ regulates hazardous waste. No statewide e-waste mandate. The state has specific regulations for oil and gas waste.', localIndustries: 'Energy sector, aerospace, agriculture, and military installations.' },
  'AL': { state: 'Alabama', stateCode: 'AL', regulations: 'Alabama ADEM regulates hazardous waste. No statewide e-waste mandate. Birmingham has historical industrial waste management considerations.', localIndustries: 'Automotive manufacturing (Mercedes, Honda, Hyundai), steel production, healthcare, and military.' },
  'CT': { state: 'Connecticut', stateCode: 'CT', regulations: 'Connecticut requires manufacturer-funded electronics recycling and has a comprehensive hazardous waste program through DEEP. The state bans specific materials from landfill.', localIndustries: 'Insurance and financial services, aerospace (Pratt & Whitney), pharmaceuticals, and healthcare.' },
  'RI': { state: 'Rhode Island', stateCode: 'RI', regulations: 'Rhode Island DEM regulates hazardous waste with specific state rules. The state has electronics recycling legislation and landfill diversion goals.', localIndustries: 'Healthcare, higher education, manufacturing, and defense.' },
  'VA': { state: 'Virginia', stateCode: 'VA', regulations: 'Virginia DEQ regulates hazardous waste. The state encourages electronics recycling but has no statewide mandate. Northern Virginia has specific data center waste management considerations.', localIndustries: 'Federal government contractors, data centers (largest concentration in the world), military, and maritime.' },
  'UT': { state: 'Utah', stateCode: 'UT', regulations: 'Utah DEQ regulates hazardous waste. No statewide e-waste mandate. Salt Lake County has specific recycling programs.', localIndustries: 'Technology, outdoor recreation, mining, and a growing healthcare sector.' },
};

// Which services have intersection pages and their top cities from First 100 URLs
export type ServiceLocationConfig = {
  serviceSlug: string;
  serviceName: string;
  locations: string[]; // city slugs
  materials: { slug: string; name: string }[];
  siblingServices: { slug: string; name: string }[];
};

export const SERVICE_LOCATION_CONFIGS: ServiceLocationConfig[] = [
  {
    serviceSlug: 'scrap-metal-recycling',
    serviceName: 'Scrap Metal Recycling',
    locations: ['chicago', 'houston', 'dallas-fort-worth', 'los-angeles', 'atlanta', 'detroit', 'philadelphia', 'new-york-city', 'miami-fort-lauderdale', 'toronto-mississauga'],
    materials: [{ slug: 'metals', name: 'Scrap Metal' }, { slug: 'metals/non-ferrous-metals/copper', name: 'Copper' }, { slug: 'metals/non-ferrous-metals/aluminum', name: 'Aluminum' }],
    siblingServices: [{ slug: 'dumpster-rental', name: 'Dumpster Rental' }, { slug: 'junk-removal', name: 'Junk Removal' }, { slug: 'business-recycling-programs', name: 'Business Recycling Programs' }],
  },
  {
    serviceSlug: 'electronics-recycling',
    serviceName: 'Electronics Recycling',
    locations: ['new-york-city', 'los-angeles', 'chicago', 'san-francisco-oakland', 'seattle-tacoma', 'austin', 'boston', 'toronto-mississauga', 'greater-london', 'sydney'],
    materials: [{ slug: 'electronics', name: 'Electronics' }, { slug: 'electronics/cell-phones', name: 'Cell Phones' }, { slug: 'electronics/computers-laptops', name: 'Computers' }],
    siblingServices: [{ slug: 'it-asset-disposition', name: 'IT Asset Disposition' }, { slug: 'data-destruction', name: 'Data Destruction' }, { slug: 'business-recycling-programs', name: 'Business Programs' }],
  },
  {
    serviceSlug: 'dumpster-rental',
    serviceName: 'Dumpster Rental',
    locations: ['chicago', 'atlanta', 'dallas-fort-worth', 'houston', 'phoenix', 'denver', 'charlotte', 'raleigh-cary', 'orlando', 'tampa-st-petersburg'],
    materials: [{ slug: 'junk', name: 'Junk & Mixed Waste' }, { slug: 'paper-cardboard', name: 'Cardboard' }, { slug: 'metals', name: 'Scrap Metal' }],
    siblingServices: [{ slug: 'junk-removal', name: 'Junk Removal' }, { slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }, { slug: 'business-recycling-programs', name: 'Business Programs' }],
  },
  {
    serviceSlug: 'junk-removal',
    serviceName: 'Junk Removal',
    locations: ['chicago', 'atlanta', 'los-angeles', 'dallas-fort-worth', 'houston', 'miami-fort-lauderdale', 'phoenix', 'charlotte', 'raleigh-cary', 'toronto-mississauga'],
    materials: [{ slug: 'junk', name: 'Junk & Bulky Items' }, { slug: 'electronics', name: 'Electronics' }, { slug: 'metals', name: 'Scrap Metal' }],
    siblingServices: [{ slug: 'dumpster-rental', name: 'Dumpster Rental' }, { slug: 'electronics-recycling', name: 'Electronics Recycling' }, { slug: 'business-recycling-programs', name: 'Business Programs' }],
  },
  {
    serviceSlug: 'pallet-recycling',
    serviceName: 'Pallet Recycling',
    locations: ['chicago', 'dallas-fort-worth', 'atlanta', 'houston', 'los-angeles', 'philadelphia', 'detroit', 'denver', 'nashville', 'toronto-mississauga'],
    materials: [{ slug: 'pallets', name: 'Pallets' }, { slug: 'pallets/wooden-pallets', name: 'Wooden Pallets' }, { slug: 'pallets/plastic-pallets', name: 'Plastic Pallets' }],
    siblingServices: [{ slug: 'cardboard-paper-recycling', name: 'Cardboard Recycling' }, { slug: 'business-recycling-programs', name: 'Business Programs' }, { slug: 'dumpster-rental', name: 'Dumpster Rental' }],
  },
  {
    serviceSlug: 'business-recycling-programs',
    serviceName: 'Business Recycling Programs',
    locations: ['new-york-city', 'los-angeles', 'chicago', 'dallas-fort-worth', 'houston', 'atlanta', 'san-francisco-oakland', 'seattle-tacoma', 'boston', 'toronto-mississauga'],
    materials: [{ slug: 'paper-cardboard', name: 'Paper & Cardboard' }, { slug: 'plastics', name: 'Plastics' }, { slug: 'metals', name: 'Metals' }],
    siblingServices: [{ slug: 'waste-audits-consulting', name: 'Waste Audits' }, { slug: 'material-recycling-solutions', name: 'Material Solutions' }, { slug: 'cardboard-paper-recycling', name: 'Cardboard Recycling' }],
  },
  {
    serviceSlug: 'it-asset-disposition',
    serviceName: 'IT Asset Disposition',
    locations: ['new-york-city', 'san-francisco-oakland', 'chicago', 'los-angeles', 'dallas-fort-worth', 'seattle-tacoma', 'boston', 'washington-dc', 'toronto-mississauga', 'greater-london'],
    materials: [{ slug: 'electronics', name: 'Electronics' }, { slug: 'electronics/computers-laptops', name: 'Computers' }, { slug: 'electronics/cell-phones', name: 'Cell Phones' }],
    siblingServices: [{ slug: 'data-destruction', name: 'Data Destruction' }, { slug: 'electronics-recycling', name: 'Electronics Recycling' }, { slug: 'shredding-services', name: 'Document Shredding' }],
  },
  {
    serviceSlug: 'data-destruction',
    serviceName: 'Data Destruction',
    locations: ['new-york-city', 'san-francisco-oakland', 'chicago', 'los-angeles', 'dallas-fort-worth', 'washington-dc', 'boston', 'seattle-tacoma', 'toronto-mississauga', 'greater-london'],
    materials: [{ slug: 'electronics', name: 'Electronics' }, { slug: 'electronics/computers-laptops', name: 'Computers' }, { slug: 'electronics/cell-phones', name: 'Cell Phones' }],
    siblingServices: [{ slug: 'it-asset-disposition', name: 'IT Asset Disposition' }, { slug: 'shredding-services', name: 'Document Shredding' }, { slug: 'electronics-recycling', name: 'Electronics Recycling' }],
  },
  {
    serviceSlug: 'hazardous-waste-disposal',
    serviceName: 'Hazardous Waste Disposal',
    locations: ['houston', 'chicago', 'los-angeles', 'dallas-fort-worth', 'philadelphia', 'detroit', 'atlanta', 'boston', 'san-francisco-oakland', 'toronto-mississauga'],
    materials: [{ slug: 'hazardous-materials', name: 'Hazardous Materials' }, { slug: 'hazardous-materials/batteries', name: 'Batteries' }, { slug: 'hazardous-materials/chemicals', name: 'Chemicals' }],
    siblingServices: [{ slug: 'waste-audits-consulting', name: 'Waste Audits' }, { slug: 'business-recycling-programs', name: 'Business Programs' }, { slug: 'collection-events', name: 'Collection Events' }],
  },
  {
    serviceSlug: 'cardboard-paper-recycling',
    serviceName: 'Cardboard & Paper Recycling',
    locations: ['new-york-city', 'chicago', 'los-angeles', 'dallas-fort-worth', 'atlanta', 'houston', 'philadelphia', 'phoenix', 'denver', 'toronto-mississauga'],
    materials: [{ slug: 'paper-cardboard', name: 'Paper & Cardboard' }],
    siblingServices: [{ slug: 'business-recycling-programs', name: 'Business Programs' }, { slug: 'dumpster-rental', name: 'Dumpster Rental' }, { slug: 'pallet-recycling', name: 'Pallet Recycling' }],
  },
  {
    serviceSlug: 'plastic-recycling',
    serviceName: 'Plastic Recycling',
    locations: ['los-angeles', 'chicago', 'new-york-city', 'dallas-fort-worth', 'houston', 'atlanta', 'san-francisco-oakland', 'seattle-tacoma', 'denver', 'toronto-mississauga'],
    materials: [{ slug: 'plastics', name: 'Plastics' }],
    siblingServices: [{ slug: 'cardboard-paper-recycling', name: 'Cardboard Recycling' }, { slug: 'business-recycling-programs', name: 'Business Programs' }, { slug: 'material-recycling-solutions', name: 'Material Solutions' }],
  },
  {
    serviceSlug: 'shredding-services',
    serviceName: 'Shredding Services',
    locations: ['new-york-city', 'chicago', 'los-angeles', 'dallas-fort-worth', 'houston', 'atlanta', 'washington-dc', 'philadelphia', 'boston', 'toronto-mississauga'],
    materials: [{ slug: 'paper-cardboard', name: 'Confidential Paper' }, { slug: 'electronics', name: 'Electronic Media' }],
    siblingServices: [{ slug: 'data-destruction', name: 'Data Destruction' }, { slug: 'it-asset-disposition', name: 'IT Asset Disposition' }, { slug: 'business-recycling-programs', name: 'Business Programs' }],
  },
  {
    serviceSlug: 'product-destruction',
    serviceName: 'Product Destruction',
    locations: ['chicago', 'los-angeles', 'dallas-fort-worth', 'new-york-city', 'atlanta', 'houston', 'philadelphia', 'detroit'],
    materials: [{ slug: 'junk', name: 'Products & Goods' }, { slug: 'electronics', name: 'Electronics' }, { slug: 'plastics', name: 'Plastics' }],
    siblingServices: [{ slug: 'data-destruction', name: 'Data Destruction' }, { slug: 'shredding-services', name: 'Shredding' }, { slug: 'junk-removal', name: 'Junk Removal' }],
  },
  {
    serviceSlug: 'material-recycling-solutions',
    serviceName: 'Material Recycling Solutions',
    locations: ['chicago', 'new-york-city', 'los-angeles', 'dallas-fort-worth', 'atlanta', 'houston', 'san-francisco-oakland', 'seattle-tacoma'],
    materials: [{ slug: 'metals', name: 'Metals' }, { slug: 'paper-cardboard', name: 'Cardboard' }, { slug: 'plastics', name: 'Plastics' }],
    siblingServices: [{ slug: 'business-recycling-programs', name: 'Business Programs' }, { slug: 'waste-audits-consulting', name: 'Waste Audits' }, { slug: 'cardboard-paper-recycling', name: 'Cardboard Recycling' }],
  },
  {
    serviceSlug: 'waste-audits-consulting',
    serviceName: 'Waste Audits & Consulting',
    locations: ['new-york-city', 'chicago', 'los-angeles', 'dallas-fort-worth', 'atlanta', 'san-francisco-oakland', 'boston', 'seattle-tacoma'],
    materials: [{ slug: 'paper-cardboard', name: 'Paper & Cardboard' }, { slug: 'plastics', name: 'Plastics' }, { slug: 'metals', name: 'Metals' }],
    siblingServices: [{ slug: 'business-recycling-programs', name: 'Business Programs' }, { slug: 'material-recycling-solutions', name: 'Material Solutions' }, { slug: 'dumpster-rental', name: 'Dumpster Rental' }],
  },
  {
    serviceSlug: 'take-back-programs',
    serviceName: 'Take Back Programs',
    locations: ['new-york-city', 'los-angeles', 'chicago', 'san-francisco-oakland', 'seattle-tacoma', 'boston', 'dallas-fort-worth', 'toronto-mississauga'],
    materials: [{ slug: 'electronics', name: 'Electronics' }, { slug: 'hazardous-materials/batteries', name: 'Batteries' }, { slug: 'hazardous-materials/light-bulbs', name: 'Light Bulbs' }],
    siblingServices: [{ slug: 'collection-events', name: 'Collection Events' }, { slug: 'electronics-recycling', name: 'Electronics Recycling' }, { slug: 'business-recycling-programs', name: 'Business Programs' }],
  },
  {
    serviceSlug: 'collection-events',
    serviceName: 'Collection Events',
    locations: ['new-york-city', 'los-angeles', 'chicago', 'dallas-fort-worth', 'atlanta', 'houston', 'san-francisco-oakland', 'seattle-tacoma'],
    materials: [{ slug: 'electronics', name: 'Electronics' }, { slug: 'hazardous-materials', name: 'Hazardous Materials' }, { slug: 'hazardous-materials/batteries', name: 'Batteries' }],
    siblingServices: [{ slug: 'take-back-programs', name: 'Take Back Programs' }, { slug: 'hazardous-waste-disposal', name: 'Hazardous Waste' }, { slug: 'electronics-recycling', name: 'Electronics Recycling' }],
  },
];
