// ─── MATERIAL LEAF PAGE DATA ───
// Per Content Rules: 800-1,500 words per leaf page. Narrower scope, unique depth.

export type MaterialLeafData = {
  parentSlug: string;
  parentName: string;
  slug: string;     // full path after /materials/ e.g. 'electronics/cell-phones'
  name: string;
  definition: string;
  acceptedItems: string[];
  hasDataSecurity: boolean;
  dataSecurity?: string;
  process: { title: string; description: string }[];
  siblings: { slug: string; name: string }[];
  services: { slug: string; name: string }[];
  faqs: { q: string; a: string }[];
  titleTag: string;
  metaDescription: string;
};

export const MATERIAL_LEAF_PAGES: Record<string, MaterialLeafData> = {
  // ─── METALS ───
  'metals/ferrous-metals': {
    parentSlug: 'metals', parentName: 'Scrap Metal', slug: 'metals/ferrous-metals', name: 'Ferrous Metals',
    definition: 'Ferrous metals contain iron and are magnetic — including steel, cast iron, and wrought iron. They make up the bulk of commercial scrap metal by weight and are 100% recyclable into new steel products.',
    acceptedItems: ['Structural steel beams and plates', 'Cast iron pipes, grates, and engine blocks', 'Wrought iron fencing and railings', 'Sheet metal and ductwork', 'Rebar and wire mesh', 'Steel drums and containers', 'Auto body panels and frames', 'Industrial machinery and equipment'],
    hasDataSecurity: false,
    process: [
      { title: 'Collection', description: 'Picked up via roll-off, flatbed, or grapple truck depending on volume and form.' },
      { title: 'Sorting', description: 'Separated from non-ferrous metals using magnets. Graded by type and quality.' },
      { title: 'Processing', description: 'Sheared, shredded, or baled depending on the form. Prepared for mill specifications.' },
      { title: 'Melting', description: 'Shipped to domestic steel mills where it\'s melted in electric arc furnaces and formed into new steel products.' },
    ],
    siblings: [
      { slug: 'metals/non-ferrous-metals/copper', name: 'Copper' },
      { slug: 'metals/non-ferrous-metals/aluminum', name: 'Aluminum' },
      { slug: 'metals/non-ferrous-metals/brass', name: 'Brass' },
      { slug: 'metals/stainless-steel', name: 'Stainless Steel' },
    ],
    services: [{ slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }, { slug: 'dumpster-rental', name: 'Dumpster Rental' }],
    faqs: [
      { q: 'How do I know if my scrap is ferrous?', a: 'If a magnet sticks to it, it\'s ferrous. Steel, cast iron, and wrought iron are all ferrous. Stainless steel is technically ferrous but is priced and processed separately due to its alloy content.' },
      { q: 'What\'s ferrous scrap worth?', a: 'Ferrous scrap prices follow the steel commodity market. Rates are lower per pound than non-ferrous metals but ferrous is accepted in much larger volumes. Current rates depend on grade, form, and market conditions.' },
      { q: 'Do you pick up ferrous scrap for free?', a: 'For commercial volumes (1+ ton), yes. Ferrous scrap has commodity value — we haul it and pay you based on weight and grade.' },
      { q: 'What\'s the difference between #1 and #2 steel?', a: '#1 Heavy Melt is clean, thick steel (1/4 inch+) without attachments. #2 is thinner steel, mixed grades, or steel with some attachments. #1 commands a higher price per ton.' },
      { q: 'Can painted or rusted steel be recycled?', a: 'Yes. Paint, rust, and light coatings burn off during the melting process. Heavily contaminated steel (chemical, oil) may require separate handling.' },
    ],
    titleTag: 'Ferrous Metal Recycling — Steel, Iron & Cast Iron',
    metaDescription: 'Recycle ferrous metals including steel, cast iron, and wrought iron. Free commercial pickup. Competitive pricing. 97+ cities. 817-946-5655.',
  },
  'metals/non-ferrous-metals/copper': {
    parentSlug: 'metals', parentName: 'Scrap Metal', slug: 'metals/non-ferrous-metals/copper', name: 'Copper',
    definition: 'Copper is one of the most valuable recyclable metals, commonly found in electrical wiring, plumbing pipe, HVAC components, and industrial equipment. Recycled copper retains 100% of its properties and is worth $3-$4+ per pound depending on grade.',
    acceptedItems: ['Bare bright copper wire (#1)', 'Insulated copper wire (#2)', 'Copper pipe and tubing', 'Copper sheet and plate', 'Copper bus bars and windings', 'HVAC copper coils and line sets', 'Copper fittings and valves', 'Copper turnings and grindings'],
    hasDataSecurity: false,
    process: [
      { title: 'Grading', description: 'Copper is graded: #1 Bare Bright (highest — clean, uncoated wire), #1 Copper (clean pipe/sheet), #2 (painted, soldered, or with attachments).' },
      { title: 'Stripping', description: 'Insulated wire is stripped to recover bare copper. Thickness and insulation type determine whether mechanical or manual stripping is used.' },
      { title: 'Melting', description: 'Clean copper is melted at domestic refineries and cast into new copper rod, sheet, or tube for manufacturing.' },
    ],
    siblings: [
      { slug: 'metals/ferrous-metals', name: 'Ferrous Metals' },
      { slug: 'metals/non-ferrous-metals/aluminum', name: 'Aluminum' },
      { slug: 'metals/non-ferrous-metals/brass', name: 'Brass' },
      { slug: 'metals/stainless-steel', name: 'Stainless Steel' },
    ],
    services: [{ slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }],
    faqs: [
      { q: 'What\'s copper worth per pound?', a: 'Bare bright copper (#1) typically ranges $3-$4+/lb depending on COMEX copper prices. Insulated wire pays less because stripping is required. We quote at current daily rates.' },
      { q: 'What\'s the difference between #1 and #2 copper?', a: '#1 is clean, uncoated, unsoldered copper — bare bright wire or clean pipe. #2 has paint, solder, fittings, or light contamination. The price difference is typically $0.50-$1.00/lb.' },
      { q: 'Do you buy insulated copper wire?', a: 'Yes. Price depends on copper recovery rate — thicker insulated wire (like Romex) pays more than thin communication cable. We can strip at our facility or buy as-is at insulated rates.' },
      { q: 'Is there a minimum for copper pickup?', a: 'For copper and other non-ferrous metals, we generally pick up at 200+ lbs. Smaller quantities can be dropped off at our partner yards.' },
      { q: 'Can I recycle copper pipe with solder joints?', a: 'Yes — it grades as #2 copper. Clean pipe without solder or fittings grades as #1. Removing fittings before bringing it in maximizes your price.' },
    ],
    titleTag: 'Copper Recycling — Wire, Pipe, Sheet & Scrap',
    metaDescription: 'Recycle copper wire, pipe, and scrap at competitive daily rates. #1 and #2 copper accepted. Free commercial pickup. 97+ cities. 817-946-5655.',
  },
  'metals/non-ferrous-metals/aluminum': {
    parentSlug: 'metals', parentName: 'Scrap Metal', slug: 'metals/non-ferrous-metals/aluminum', name: 'Aluminum',
    definition: 'Aluminum recycling recovers one of the most energy-efficient recyclable materials — recycling aluminum uses 95% less energy than producing it from raw bauxite ore. Common sources include extrusions, sheet, cans, castings, and automotive parts.',
    acceptedItems: ['Aluminum extrusions (window frames, structural)', 'Aluminum sheet and plate', 'Aluminum cans (UBC)', 'Cast aluminum (engine parts, wheels)', 'Aluminum siding and gutters', 'Aluminum wire and cable', 'Aluminum turnings and chips', 'Lithographic aluminum plates'],
    hasDataSecurity: false,
    process: [
      { title: 'Sorting', description: 'Separated by alloy series (1000-7000). Different alloys have different values and processing requirements.' },
      { title: 'Cleaning', description: 'Paint, coatings, and attachments removed. Clean aluminum commands better rates.' },
      { title: 'Melting', description: 'Melted at 1,220°F — significantly lower than the 3,700°F needed to process raw bauxite. This energy savings is why aluminum recycling is so economically favorable.' },
    ],
    siblings: [
      { slug: 'metals/ferrous-metals', name: 'Ferrous Metals' },
      { slug: 'metals/non-ferrous-metals/copper', name: 'Copper' },
      { slug: 'metals/non-ferrous-metals/brass', name: 'Brass' },
      { slug: 'metals/stainless-steel', name: 'Stainless Steel' },
    ],
    services: [{ slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }],
    faqs: [
      { q: 'What\'s aluminum scrap worth?', a: 'Pricing varies by alloy and form. Clean extrusions and sheet typically pay $0.50-$1.00+/lb. Cast aluminum pays less. UBC (used beverage cans) have their own market rate. We quote at daily commodity prices.' },
      { q: 'Why is aluminum recycling so energy-efficient?', a: 'Producing aluminum from raw bauxite ore requires massive amounts of electricity for smelting. Recycling skips the smelting step — melting existing aluminum uses 95% less energy. This makes aluminum one of the most economically and environmentally favorable materials to recycle.' },
      { q: 'Do you accept aluminum cans?', a: 'Yes, in commercial quantities. Used Beverage Cans (UBC) are one of the most recycled products in the world. For businesses generating large volumes (restaurants, venues, cafeterias), we provide dedicated collection.' },
      { q: 'Can painted aluminum be recycled?', a: 'Yes. Paint burns off during melting. However, clean aluminum (no paint, no attachments) grades higher and pays more.' },
      { q: 'What about aluminum wheels and automotive parts?', a: 'Cast aluminum from wheels, engine components, and transmission housings is accepted. These are alloy-specific and priced accordingly — typically slightly less than wrought/sheet aluminum.' },
    ],
    titleTag: 'Aluminum Recycling — Extrusions, Sheet, Cans & Castings',
    metaDescription: 'Recycle aluminum scrap at competitive prices. Extrusions, sheet, cans, castings. 95% energy savings vs virgin production. 97+ cities. 817-946-5655.',
  },
  'metals/non-ferrous-metals/brass': {
    parentSlug: 'metals', parentName: 'Scrap Metal', slug: 'metals/non-ferrous-metals/brass', name: 'Brass',
    definition: 'Brass is a copper-zinc alloy commonly found in plumbing fittings, valves, door hardware, decorative fixtures, and ammunition casings. It\'s one of the higher-value scrap metals due to its copper content.',
    acceptedItems: ['Plumbing fittings and valves', 'Door handles, hinges, and hardware', 'Brass pipe and rod', 'Shell casings and ammunition brass', 'Musical instruments', 'Decorative fixtures and trim', 'Brass turnings and chips'],
    hasDataSecurity: false,
    process: [
      { title: 'Sorting', description: 'Separated from other metals and graded: yellow brass, red brass, and semi-red brass based on copper content.' },
      { title: 'Cleaning', description: 'Steel attachments (screws, springs) removed. Clean brass commands the best rates.' },
      { title: 'Melting', description: 'Melted and re-alloyed at domestic foundries for new brass products.' },
    ],
    siblings: [
      { slug: 'metals/ferrous-metals', name: 'Ferrous Metals' },
      { slug: 'metals/non-ferrous-metals/copper', name: 'Copper' },
      { slug: 'metals/non-ferrous-metals/aluminum', name: 'Aluminum' },
      { slug: 'metals/stainless-steel', name: 'Stainless Steel' },
    ],
    services: [{ slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }],
    faqs: [
      { q: 'What\'s brass worth?', a: 'Yellow brass (most common) typically pays $1.50-$2.50/lb. Red brass (higher copper content) pays more. Pricing follows copper commodity markets since brass is primarily a copper alloy.' },
      { q: 'What\'s the difference between yellow and red brass?', a: 'Yellow brass is ~60-70% copper, ~30-40% zinc — most fittings and hardware. Red brass is ~85% copper, ~15% zinc — found in valves, water meters, and some plumbing. Red brass pays more due to higher copper content.' },
      { q: 'Do you accept shell casings?', a: 'Yes. Spent brass shell casings are a common and valuable brass scrap source. We accept all calibers in commercial quantities.' },
      { q: 'Can brass with steel attachments be recycled?', a: 'Yes, but it grades lower. Removing steel screws, springs, and other attachments before recycling results in a cleaner grade and better price.' },
    ],
    titleTag: 'Brass Recycling — Fittings, Valves, Hardware & Casings',
    metaDescription: 'Recycle brass scrap including fittings, valves, door hardware, and shell casings. Competitive pricing on yellow and red brass. 817-946-5655.',
  },
  'metals/stainless-steel': {
    parentSlug: 'metals', parentName: 'Scrap Metal', slug: 'metals/stainless-steel', name: 'Stainless Steel',
    definition: 'Stainless steel is a corrosion-resistant alloy containing iron, chromium (10.5%+), and often nickel. Common grades include 304 (food equipment, sinks) and 316 (marine, medical). It\'s more valuable than carbon steel due to its alloy content.',
    acceptedItems: ['304 stainless (food equipment, countertops, sinks)', '316 stainless (marine, medical, chemical)', 'Stainless pipe, tube, and fittings', 'Stainless sheet and plate', 'Restaurant and food service equipment', 'Medical and surgical instruments', 'Stainless turnings and chips'],
    hasDataSecurity: false,
    process: [
      { title: 'Testing', description: 'Grade determined by XRF analysis — different grades (304, 316, 430, etc.) have different values based on nickel and chromium content.' },
      { title: 'Sorting', description: 'Separated by grade. Mixing grades reduces value. Clean, sorted stainless earns premium pricing.' },
      { title: 'Melting', description: 'Processed at specialty stainless steel mills using electric arc furnaces. Alloy content is preserved in the recycled product.' },
    ],
    siblings: [
      { slug: 'metals/ferrous-metals', name: 'Ferrous Metals' },
      { slug: 'metals/non-ferrous-metals/copper', name: 'Copper' },
      { slug: 'metals/non-ferrous-metals/aluminum', name: 'Aluminum' },
      { slug: 'metals/non-ferrous-metals/brass', name: 'Brass' },
    ],
    services: [{ slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }],
    faqs: [
      { q: 'How much is stainless steel worth?', a: '304 stainless typically pays $0.40-$0.80/lb. 316 pays more ($0.60-$1.20/lb) due to higher nickel content. Prices follow the nickel commodity market. We verify grade with XRF testing for accurate pricing.' },
      { q: 'How do you determine stainless steel grade?', a: 'We use handheld XRF (X-ray fluorescence) analyzers to determine exact alloy composition. This ensures accurate grading and fair pricing — no guessing based on appearance.' },
      { q: 'Is magnetic stainless steel still stainless?', a: 'Some stainless grades (like 430) are magnetic. Others (304, 316) are typically non-magnetic but can become slightly magnetic after cold working. XRF testing confirms grade regardless of magnetic properties.' },
      { q: 'Do you pick up restaurant equipment?', a: 'Yes. Stainless steel prep tables, sinks, hoods, and walk-in components from restaurant decommissions. We haul and pay by weight at the appropriate grade.' },
    ],
    titleTag: 'Stainless Steel Recycling — 304, 316 & All Grades',
    metaDescription: 'Recycle stainless steel scrap — 304, 316, and all grades. XRF grade verification for accurate pricing. Free commercial pickup. 817-946-5655.',
  },

  // ─── ELECTRONICS ───
  'electronics/cell-phones': {
    parentSlug: 'electronics', parentName: 'Electronics', slug: 'electronics/cell-phones', name: 'Cell Phones & Mobile Devices',
    definition: 'Cell phone recycling recovers precious metals (gold, silver, palladium), rare earth elements, and base metals from smartphones, tablets, and mobile devices while ensuring certified data destruction on all storage media.',
    acceptedItems: ['iPhones (all models and conditions)', 'Samsung Galaxy, Note, and Fold series', 'Google Pixel phones', 'iPads and Android tablets', 'Smartwatches (Apple Watch, Samsung, Fitbit)', 'Feature phones and flip phones', 'E-readers (Kindle, Nook)', 'Mobile hotspots and cellular modems'],
    hasDataSecurity: true,
    dataSecurity: 'All mobile devices undergo NIST 800-88 compliant data destruction before material recovery. Factory reset alone is NOT sufficient — forensic tools can recover data from factory-reset devices. We perform certified wiping or physical shredding depending on device type and your security requirements. Certificate of Destruction issued per device.',
    process: [
      { title: 'Data Destruction', description: 'NIST 800-88 compliant wipe or physical shred. COD per device with serial/IMEI number.' },
      { title: 'Testing', description: 'Devices tested for refurbishment potential. Working devices with market value are remarketed — revenue returned to you.' },
      { title: 'Dismantling', description: 'Non-reusable devices dismantled: batteries removed for separate recycling, circuit boards sent to precious metal refiners, screens and housings sorted by material.' },
      { title: 'Recovery', description: 'Gold, silver, palladium, and copper recovered from circuit boards. Lithium batteries recycled for cobalt and lithium. Glass and aluminum housings recycled.' },
    ],
    siblings: [
      { slug: 'electronics/computers-laptops', name: 'Computers & Laptops' },
      { slug: 'electronics/circuit-boards', name: 'Circuit Boards' },
      { slug: 'electronics/wires-cables', name: 'Wires & Cables' },
      { slug: 'electronics/monitors-tvs', name: 'Monitors & TVs' },
      { slug: 'electronics/printers-copiers', name: 'Printers & Copiers' },
    ],
    services: [{ slug: 'electronics-recycling', name: 'Electronics Recycling' }, { slug: 'data-destruction', name: 'Data Destruction' }, { slug: 'take-back-programs', name: 'Take Back Programs' }],
    faqs: [
      { q: 'Does factory reset destroy data on a phone?', a: 'No. Factory reset removes the file system index but data remains recoverable with forensic tools. NIST 800-88 compliant wiping or physical shredding is required for actual data destruction.' },
      { q: 'Can broken phones be recycled?', a: 'Yes. Cracked screens, water damage, non-functional devices — all accepted. Even non-working phones contain gold, silver, palladium, copper, and lithium worth recovering.' },
      { q: 'Do you pay for old phones?', a: 'Working phones with market value (recent iPhones, Samsung flagships) may qualify for buyback. Older and non-working devices are recycled at no cost. We assess value as part of the intake process.' },
      { q: 'How are lithium batteries handled?', a: 'Phone batteries are removed and recycled separately through licensed battery processors. Lithium-ion batteries are classified as universal waste and require DOT-compliant packaging for transport.' },
      { q: 'Can you handle bulk phone recycling for a company?', a: 'Yes. We process fleet-scale mobile device retirements with NIST 800-88 data destruction, serial/IMEI tracking, and per-device Certificates of Destruction. Common for annual device refresh programs.' },
    ],
    titleTag: 'Cell Phone Recycling — iPhones, Samsung, Tablets & More',
    metaDescription: 'Recycle cell phones and mobile devices with certified data destruction. iPhones, Samsung, tablets, smartwatches. All brands, any condition. 817-946-5655.',
  },
  'electronics/computers-laptops': {
    parentSlug: 'electronics', parentName: 'Electronics', slug: 'electronics/computers-laptops', name: 'Computers & Laptops',
    definition: 'Computer and laptop recycling recovers valuable materials from desktop PCs, laptops, Chromebooks, and workstations while ensuring NIST 800-88 compliant destruction of all data on hard drives and SSDs.',
    acceptedItems: ['Desktop PCs and towers (Dell, HP, Lenovo, etc.)', 'Laptops and notebooks (all brands)', 'Chromebooks (Google, HP, Lenovo, Acer)', 'Mac desktops (iMac, Mac Pro, Mac Mini)', 'MacBooks (all models)', 'Workstations (Dell Precision, HP Z-series)', 'All-in-one computers', 'Thin clients and terminals'],
    hasDataSecurity: true,
    dataSecurity: 'Every computer and laptop contains a hard drive or SSD with potentially sensitive data. We remove and destroy all storage media per NIST 800-88 before any material recovery begins. Methods: software overwrite (for drives being redeployed), degaussing (HDDs only), or physical shredding (SSDs and highest security). Certificate of Destruction per drive with serial number.',
    process: [
      { title: 'Inventory', description: 'Each device cataloged by serial, make, and model. Asset tags recorded for your disposition report.' },
      { title: 'Data Destruction', description: 'All drives removed and destroyed per NIST 800-88. COD per drive.' },
      { title: 'Remarketing', description: 'Recent-model devices with market value are tested, refurbished, and resold. Revenue returned to you.' },
      { title: 'Recycling', description: 'Non-reusable devices dismantled: circuit boards to precious metal refiners, metals to smelters, plastics sorted by resin.' },
    ],
    siblings: [
      { slug: 'electronics/cell-phones', name: 'Cell Phones' },
      { slug: 'electronics/circuit-boards', name: 'Circuit Boards' },
      { slug: 'electronics/wires-cables', name: 'Wires & Cables' },
      { slug: 'electronics/monitors-tvs', name: 'Monitors & TVs' },
      { slug: 'electronics/printers-copiers', name: 'Printers & Copiers' },
    ],
    services: [{ slug: 'it-asset-disposition', name: 'IT Asset Disposition' }, { slug: 'data-destruction', name: 'Data Destruction' }, { slug: 'electronics-recycling', name: 'Electronics Recycling' }],
    faqs: [
      { q: 'Is there a cost to recycle computers?', a: 'Standard desktop and laptop recycling is typically free for commercial quantities. Devices with remarketing value may generate revenue for you. We provide a quote based on your equipment list.' },
      { q: 'Do you track individual devices by serial number?', a: 'Yes. Every device is logged by serial number, make, model, and asset tag. Your asset disposition report provides a complete audit trail from decommission through final processing.' },
      { q: 'Can we get money for old computers?', a: 'Recent-model business laptops (1-4 years old), enterprise servers, and high-end workstations often have remarketing value. We test, refurbish, and resell through our channels — net revenue returned to you.' },
      { q: 'What about Chromebook fleet recycling for schools?', a: 'We specialize in fleet-scale Chromebook disposition. Data destruction on every device, serial-number tracking, FERPA-compliant documentation. Districts typically process 3,000-10,000+ devices per cycle.' },
      { q: 'How quickly can you process a large batch?', a: 'Typical turnaround: 500 devices in 1 week, 2,000 in 2-3 weeks. Expedited processing available for time-sensitive decommissions.' },
    ],
    titleTag: 'Computer & Laptop Recycling — Desktops, Laptops & Chromebooks',
    metaDescription: 'Recycle computers and laptops with NIST 800-88 data destruction. All brands, serial tracking, asset recovery. Free for businesses. 817-946-5655.',
  },
  'electronics/circuit-boards': {
    parentSlug: 'electronics', parentName: 'Electronics', slug: 'electronics/circuit-boards', name: 'Circuit Boards',
    definition: 'Circuit board recycling recovers precious metals — gold, silver, palladium, platinum, and copper — from printed circuit boards (PCBs), motherboards, and electronic components. A ton of circuit boards contains more gold than a ton of gold ore.',
    acceptedItems: ['Computer motherboards', 'Server and networking boards', 'Cell phone circuit boards', 'Telecom and switching equipment boards', 'Military and aerospace boards', 'RAM and memory modules', 'CPU processors', 'Mixed low-grade boards (power supplies, etc.)'],
    hasDataSecurity: false,
    process: [
      { title: 'Grading', description: 'Boards graded: high-grade (telecom, server, military), mid-grade (desktop, laptop), low-grade (power supplies, consumer electronics). Price varies significantly by grade.' },
      { title: 'Shredding', description: 'Boards shredded to liberate components and increase surface area for processing.' },
      { title: 'Refining', description: 'Precious metals extracted through smelting and chemical refining at licensed precious metal refiners. Gold, silver, palladium, platinum, and copper recovered.' },
    ],
    siblings: [
      { slug: 'electronics/cell-phones', name: 'Cell Phones' },
      { slug: 'electronics/computers-laptops', name: 'Computers & Laptops' },
      { slug: 'electronics/wires-cables', name: 'Wires & Cables' },
      { slug: 'electronics/monitors-tvs', name: 'Monitors & TVs' },
    ],
    services: [{ slug: 'electronics-recycling', name: 'Electronics Recycling' }, { slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }],
    faqs: [
      { q: 'How much gold is in circuit boards?', a: 'High-grade boards (servers, telecom) contain 5-15+ grams of gold per ton. Consumer-grade boards contain 1-5 grams per ton. The gold is in connectors, IC pins, and plating. At $2,000+/oz, even small concentrations have value.' },
      { q: 'What\'s the difference between high-grade and low-grade boards?', a: 'High-grade boards (servers, telecom, military) have more gold, silver, and palladium content. Low-grade boards (power supplies, consumer electronics) have less precious metal but still have copper value. We pay based on grade.' },
      { q: 'Do you accept loose components like CPUs and RAM?', a: 'Yes. CPUs (especially older ceramic processors) and RAM modules have high precious metal content and are priced accordingly.' },
      { q: 'Is there a minimum quantity?', a: 'For commercial quantities (50+ lbs), we provide free pickup. Smaller quantities can be shipped or dropped off.' },
    ],
    titleTag: 'Circuit Board Recycling — Precious Metal Recovery from PCBs',
    metaDescription: 'Recycle circuit boards for gold, silver, palladium, and copper recovery. Motherboards, server boards, CPUs, RAM. Commercial quantities. 817-946-5655.',
  },
  'electronics/wires-cables': {
    parentSlug: 'electronics', parentName: 'Electronics', slug: 'electronics/wires-cables', name: 'Wires & Cables',
    definition: 'Wire and cable recycling recovers copper and aluminum from insulated electrical wiring, network cables, and power cords through stripping and chopping processes that separate metal conductors from plastic insulation.',
    acceptedItems: ['Copper building wire (Romex, THHN)', 'Cat5/Cat6 network cables', 'Coaxial cable', 'Power cords and extension cords', 'Copper communication cable', 'Aluminum wire and cable', 'XLPE and high-voltage cable', 'Mixed wire and cable scrap'],
    hasDataSecurity: false,
    process: [
      { title: 'Sorting', description: 'Sorted by type: copper vs aluminum, heavy insulation vs thin insulation, single conductor vs multi-conductor.' },
      { title: 'Chopping/Stripping', description: 'Wire fed through granulators that chop and separate copper/aluminum from insulation using gravity separation and air classification.' },
      { title: 'Recovery', description: 'Clean copper and aluminum sold to domestic mills. Insulation (PVC, PE, rubber) recycled where possible or sent to energy recovery.' },
    ],
    siblings: [
      { slug: 'electronics/cell-phones', name: 'Cell Phones' },
      { slug: 'electronics/computers-laptops', name: 'Computers & Laptops' },
      { slug: 'electronics/circuit-boards', name: 'Circuit Boards' },
    ],
    services: [{ slug: 'electronics-recycling', name: 'Electronics Recycling' }, { slug: 'scrap-metal-recycling', name: 'Scrap Metal Recycling' }],
    faqs: [
      { q: 'How is insulated wire priced?', a: 'Based on copper recovery rate — the percentage of copper vs insulation by weight. Heavy-gauge building wire (60-70% copper) pays more than thin communication cable (20-30% copper). We can strip or chop at our facility.' },
      { q: 'Should I strip wire before recycling?', a: 'For heavy-gauge wire (#4 and larger), stripping to bare copper significantly increases value. For thin wire, the labor cost of manual stripping exceeds the value gained — sell it insulated and we\'ll process it mechanically.' },
      { q: 'Do you accept aluminum wire?', a: 'Yes. Aluminum wire is priced separately from copper. Clean aluminum building wire is accepted in commercial quantities.' },
      { q: 'What about data/network cable from office decommissions?', a: 'Yes. Cat5, Cat6, and fiber optic cable from office and data center decommissions. Copper content from data cables has value. We handle bulk removal as part of IT decommission projects.' },
    ],
    titleTag: 'Wire & Cable Recycling — Copper Recovery from Insulated Wire',
    metaDescription: 'Recycle insulated copper wire, network cables, and power cords. Copper and aluminum recovery. Commercial quantities. 97+ cities. 817-946-5655.',
  },
  'electronics/monitors-tvs': {
    parentSlug: 'electronics', parentName: 'Electronics', slug: 'electronics/monitors-tvs', name: 'Monitors & TVs',
    definition: 'Monitor and TV recycling handles LCD, LED, and CRT displays, recovering glass, metals, and plastics while safely managing hazardous components like CRT lead glass and LCD mercury backlights.',
    acceptedItems: ['LCD monitors (all sizes)', 'LED monitors and displays', 'CRT monitors and TVs', 'Flat panel TVs (plasma, LCD, LED, OLED)', 'Digital signage and commercial displays', 'All-in-one computer displays', 'Touch screen displays and kiosks', 'Projection equipment'],
    hasDataSecurity: false,
    process: [
      { title: 'Type Sorting', description: 'Separated by technology: CRT (requires lead glass handling), LCD (requires mercury backlight handling), LED (standard recycling).' },
      { title: 'Hazmat Removal', description: 'CRTs: lead-containing funnel glass separated from panel glass. LCD: mercury-containing backlights removed for proper hazardous waste disposal.' },
      { title: 'Material Recovery', description: 'Metals (steel, aluminum, copper), plastics, and non-hazardous glass recovered for recycling.' },
    ],
    siblings: [
      { slug: 'electronics/computers-laptops', name: 'Computers & Laptops' },
      { slug: 'electronics/circuit-boards', name: 'Circuit Boards' },
      { slug: 'electronics/printers-copiers', name: 'Printers & Copiers' },
    ],
    services: [{ slug: 'electronics-recycling', name: 'Electronics Recycling' }],
    faqs: [
      { q: 'Is there a fee for CRT monitor recycling?', a: 'Typically yes. CRT monitors contain 4-8 pounds of lead glass that requires specialized handling. Per-unit fees range $5-$15 depending on size and volume. LCD and LED monitors are generally free to recycle.' },
      { q: 'Can I throw old TVs in a dumpster?', a: 'In most states, no. Electronics are banned from landfill in 25+ states. CRT TVs specifically are considered hazardous waste due to lead content. Proper recycling through a certified processor is required.' },
      { q: 'What about large commercial displays?', a: 'Digital signage, video walls, and commercial displays accepted in any quantity. For large deployments, we coordinate removal and recycling as part of a refresh project.' },
    ],
    titleTag: 'Monitor & TV Recycling — LCD, LED, CRT Displays',
    metaDescription: 'Recycle monitors and TVs including CRT, LCD, and LED displays. Hazardous component handling included. Commercial and residential. 817-946-5655.',
  },
  'electronics/printers-copiers': {
    parentSlug: 'electronics', parentName: 'Electronics', slug: 'electronics/printers-copiers', name: 'Printers & Copiers',
    definition: 'Printer and copier recycling recovers metals, plastics, and toner materials from inkjet, laser, and multifunction devices while properly handling toner cartridges and imaging drums.',
    acceptedItems: ['Inkjet printers', 'Laser printers', 'Multifunction printers/copiers (MFPs)', 'Large-format plotters', 'Commercial copiers and duplicators', 'Fax machines', 'Toner cartridges (all brands)', 'Ink cartridges'],
    hasDataSecurity: true,
    dataSecurity: 'Modern copiers and MFPs contain hard drives that store images of every document scanned, copied, or printed. These drives must be wiped or destroyed before recycling. We remove and destroy all storage media per NIST 800-88 with a Certificate of Destruction.',
    process: [
      { title: 'Data Destruction', description: 'Hard drives in copiers/MFPs removed and destroyed. Many users don\'t realize copiers store document images.' },
      { title: 'Toner Removal', description: 'Toner cartridges and drums removed. Cartridges refurbished where possible; toner powder properly contained.' },
      { title: 'Dismantling', description: 'Devices dismantled into metal, plastic, glass, and circuit board streams for material-specific recycling.' },
    ],
    siblings: [
      { slug: 'electronics/computers-laptops', name: 'Computers & Laptops' },
      { slug: 'electronics/monitors-tvs', name: 'Monitors & TVs' },
      { slug: 'electronics/circuit-boards', name: 'Circuit Boards' },
    ],
    services: [{ slug: 'electronics-recycling', name: 'Electronics Recycling' }, { slug: 'data-destruction', name: 'Data Destruction' }],
    faqs: [
      { q: 'Do copiers really contain hard drives?', a: 'Yes. Most modern digital copiers and MFPs manufactured after 2002 contain hard drives that store images of every document processed. This data can be recovered if the drive isn\'t properly destroyed before recycling.' },
      { q: 'Can toner cartridges be recycled separately?', a: 'Yes. We accept toner and ink cartridges. Many are refurbished for reuse. Empty cartridges can be collected in provided boxes and shipped or picked up with your next recycling haul.' },
      { q: 'Is there a cost to recycle printers?', a: 'Standard office printers and small MFPs are typically free to recycle in commercial quantities. Large commercial copiers may require assessment based on size and pickup logistics.' },
      { q: 'What about large commercial copier leases?', a: 'When your copier lease ends and the leasing company doesn\'t retrieve the device, we handle disposal. If the copier has a hard drive, data destruction is critical before the device leaves your premises.' },
    ],
    titleTag: 'Printer & Copier Recycling — Laser, Inkjet, MFPs & Toner',
    metaDescription: 'Recycle printers, copiers, and MFPs with hard drive data destruction. Toner cartridge recycling included. Free for commercial quantities. 817-946-5655.',
  },

  // ─── PALLETS ───
  'pallets/wooden-pallets': {
    parentSlug: 'pallets', parentName: 'Pallets', slug: 'pallets/wooden-pallets', name: 'Wooden Pallets',
    definition: 'Wooden pallet recycling repairs, reuses, and recycles standard and custom-size wooden pallets. Good pallets are repaired and returned to the supply chain. Damaged pallets yield reusable lumber. End-of-life pallets become mulch, animal bedding, or biomass fuel.',
    acceptedItems: ['GMA 48×40 standard pallets', 'Non-standard and custom sizes', 'Heat-treated (HT/ISPM-15) pallets', 'Euro pallets (1200×800mm)', 'Broken stringer boards and deck boards', 'Pallet collars and wooden crates'],
    hasDataSecurity: false,
    process: [
      { title: 'Grading', description: 'Tier 1: repairable. Tier 2: dismantle for lumber. Tier 3: grind for mulch or biomass.' },
      { title: 'Repair', description: 'Broken boards replaced, nails reset. Repaired pallets returned to the supply chain at a fraction of new pallet cost.' },
      { title: 'Grinding', description: 'End-of-life pallets ground into mulch, animal bedding, or biomass fuel. Nothing goes to landfill.' },
    ],
    siblings: [{ slug: 'pallets/plastic-pallets', name: 'Plastic Pallets' }],
    services: [{ slug: 'pallet-recycling', name: 'Pallet Recycling' }],
    faqs: [
      { q: 'Is wooden pallet pickup free?', a: 'For commercial volumes (20+ pallets per pickup), yes in all service cities.' },
      { q: 'Do you buy Grade A pallets?', a: 'Yes. Standard 48×40 pallets in good condition qualify for buyback or revenue share.' },
      { q: 'What about heat-treated pallets?', a: 'HT/ISPM-15 stamped pallets are accepted and recycled through the same three-tier system.' },
      { q: 'How often can you pick up?', a: 'Weekly, bi-weekly, monthly, or on-demand. High-volume sites get dedicated trailers on swap schedules.' },
    ],
    titleTag: 'Wooden Pallet Recycling — Repair, Reuse & Recycle',
    metaDescription: 'Free wooden pallet recycling pickup. Standard and custom sizes. Repair, reuse, or mulch. Buyback for Grade A pallets. 97+ cities. 817-946-5655.',
  },
  'pallets/plastic-pallets': {
    parentSlug: 'pallets', parentName: 'Pallets', slug: 'pallets/plastic-pallets', name: 'Plastic Pallets',
    definition: 'Plastic pallet recycling recovers HDPE and polypropylene from end-of-life plastic pallets, grinding them into regrind or pellets for manufacturing new plastic products.',
    acceptedItems: ['HDPE plastic pallets', 'Polypropylene (PP) pallets', 'Nestable plastic pallets', 'Rackable plastic pallets', 'Export-grade lightweight pallets', 'Broken plastic pallet pieces'],
    hasDataSecurity: false,
    process: [
      { title: 'Collection', description: 'Picked up alongside wooden pallets or in dedicated loads.' },
      { title: 'Grinding', description: 'Pallets ground into regrind/flake by resin type (HDPE or PP).' },
      { title: 'Pelletizing', description: 'Regrind processed into pellets for injection molding new plastic products.' },
    ],
    siblings: [{ slug: 'pallets/wooden-pallets', name: 'Wooden Pallets' }],
    services: [{ slug: 'pallet-recycling', name: 'Pallet Recycling' }, { slug: 'plastic-recycling', name: 'Plastic Recycling' }],
    faqs: [
      { q: 'Are plastic pallets recyclable?', a: 'Yes. HDPE and PP plastic pallets are fully recyclable into new plastic products through grinding and pelletizing.' },
      { q: 'Do you mix plastic and wooden pallet pickups?', a: 'Yes. We pick up both types in the same load and sort at our facility.' },
      { q: 'What\'s the value of plastic pallet scrap?', a: 'Clean HDPE pallet regrind has commodity value. Pricing depends on resin type, contamination level, and volume.' },
    ],
    titleTag: 'Plastic Pallet Recycling — HDPE & PP Pallets',
    metaDescription: 'Recycle HDPE and polypropylene plastic pallets. Ground into regrind for new manufacturing. Free commercial pickup. 817-946-5655.',
  },

  // ─── HAZARDOUS MATERIALS ───
  'hazardous-materials/batteries': {
    parentSlug: 'hazardous-materials', parentName: 'Hazardous Materials', slug: 'hazardous-materials/batteries', name: 'Batteries',
    definition: 'Battery recycling recovers metals and materials from all battery chemistries — lithium-ion, lead-acid, nickel-cadmium, nickel-metal hydride, and alkaline — through chemistry-specific processes at licensed facilities.',
    acceptedItems: ['Lithium-ion (laptops, phones, power tools, EVs)', 'Lead-acid (automotive, UPS, backup)', 'Nickel-cadmium (NiCd — power tools, emergency lighting)', 'Nickel-metal hydride (NiMH — hybrid vehicles, older electronics)', 'Alkaline (AA, AAA, C, D, 9V)', 'Lithium primary (button cells, medical devices)', 'Sealed lead-acid (SLA — alarm systems, scooters)'],
    hasDataSecurity: false,
    process: [
      { title: 'Sorting', description: 'Batteries sorted by chemistry — each type requires a different recycling process. Mixing chemistries is dangerous.' },
      { title: 'Packaging', description: 'DOT-compliant packaging for transport. Lithium batteries require specific packaging to prevent short circuits and fires.' },
      { title: 'Processing', description: 'Lead-acid: smelted for lead recovery. Lithium-ion: hydrometallurgical or pyrometallurgical processing for cobalt, nickel, lithium. NiCd: cadmium and nickel recovery.' },
    ],
    siblings: [
      { slug: 'hazardous-materials/light-bulbs', name: 'Light Bulbs' },
      { slug: 'hazardous-materials/chemicals', name: 'Chemicals' },
    ],
    services: [{ slug: 'hazardous-waste-disposal', name: 'Hazardous Waste Disposal' }, { slug: 'collection-events', name: 'Collection Events' }],
    faqs: [
      { q: 'Can lithium-ion batteries go in the trash?', a: 'No. Lithium batteries in landfills cause fires — they\'re responsible for hundreds of waste facility fires annually. They are classified as universal waste and must go to licensed recyclers.' },
      { q: 'How are lithium batteries packaged for transport?', a: 'DOT requires lithium batteries be packaged to prevent short circuits: terminals taped, batteries separated, in UN-rated containers. We provide compliant packaging and labeling.' },
      { q: 'What metals are recovered from batteries?', a: 'Lead from lead-acid. Cobalt, nickel, and lithium from Li-ion. Cadmium and nickel from NiCd. Steel casings from alkaline. Recovery rates exceed 95% for lead-acid and are improving rapidly for lithium-ion.' },
      { q: 'Are alkaline batteries hazardous waste?', a: 'In most states, alkaline batteries are classified as non-hazardous and can be disposed in regular trash. However, recycling is still recommended and some states (California) classify all batteries as universal waste.' },
      { q: 'Do you provide battery collection containers?', a: 'Yes. We provide DOT-compliant collection containers sized for your volume. Labels and sorting instructions included.' },
    ],
    titleTag: 'Battery Recycling — Lithium-Ion, Lead-Acid, NiCd & More',
    metaDescription: 'Recycle all battery types: lithium-ion, lead-acid, NiCd, NiMH, alkaline. DOT-compliant collection and transport. Licensed processing. 817-946-5655.',
  },
  'hazardous-materials/light-bulbs': {
    parentSlug: 'hazardous-materials', parentName: 'Hazardous Materials', slug: 'hazardous-materials/light-bulbs', name: 'Light Bulbs & Lamps',
    definition: 'Light bulb recycling safely processes mercury-containing fluorescent tubes, CFLs, HID lamps, and other lighting waste through specialized equipment that captures mercury vapor and recovers glass, aluminum, and phosphor powder.',
    acceptedItems: ['4-foot and 8-foot fluorescent tubes (T8, T12, T5)', 'Compact fluorescent lamps (CFLs)', 'High-intensity discharge (HID) lamps', 'Mercury vapor lamps', 'Metal halide lamps', 'Sodium vapor lamps', 'U-bent and circular fluorescent tubes', 'LED tubes and bulbs (non-hazardous but recyclable)'],
    hasDataSecurity: false,
    process: [
      { title: 'Collection', description: 'Lamps collected in specialized boxes that prevent breakage during transport. We provide the boxes.' },
      { title: 'Crushing/Retort', description: 'Lamps processed through specialized equipment that captures mercury vapor under negative pressure. Glass, aluminum endcaps, and phosphor powder separated.' },
      { title: 'Mercury Recovery', description: 'Captured mercury is purified and sold for reuse in new lamps and industrial applications. Recovery rate exceeds 99%.' },
    ],
    siblings: [
      { slug: 'hazardous-materials/batteries', name: 'Batteries' },
      { slug: 'hazardous-materials/chemicals', name: 'Chemicals' },
    ],
    services: [{ slug: 'hazardous-waste-disposal', name: 'Hazardous Waste Disposal' }],
    faqs: [
      { q: 'Are fluorescent bulbs hazardous waste?', a: 'Fluorescent tubes and CFLs contain mercury and are classified as universal waste under EPA rules. They cannot be disposed in regular trash and must go to licensed recyclers.' },
      { q: 'How much mercury is in a fluorescent tube?', a: 'A standard 4-foot T8 tube contains about 3-5 mg of mercury. While small per lamp, facilities with thousands of tubes accumulate significant quantities. One broken tube can contaminate a large area.' },
      { q: 'Do you provide lamp recycling boxes?', a: 'Yes. We provide specialized lamp boxes (4-foot, 8-foot, and CFL sizes) designed to prevent breakage during storage and transport. Prepaid shipping labels included for smaller quantities.' },
      { q: 'Are LED bulbs hazardous?', a: 'No. LEDs don\'t contain mercury and aren\'t classified as hazardous waste. However, they do contain recyclable metals and electronic components, so recycling is still recommended.' },
      { q: 'What\'s the cost for lamp recycling?', a: 'Per-lamp pricing depends on type and quantity. Typical range: $0.15-$0.50 per tube for commercial quantities. Volume discounts available. We provide boxes, labels, and pickup.' },
    ],
    titleTag: 'Light Bulb Recycling — Fluorescent Tubes, CFLs & HID Lamps',
    metaDescription: 'Recycle fluorescent tubes, CFLs, and HID lamps with licensed mercury recovery. Collection boxes provided. Commercial quantities. 817-946-5655.',
  },
  'hazardous-materials/chemicals': {
    parentSlug: 'hazardous-materials', parentName: 'Hazardous Materials', slug: 'hazardous-materials/chemicals', name: 'Chemicals & Solvents',
    definition: 'Chemical and solvent recycling manages the disposal of industrial chemicals, spent solvents, paint waste, lab chemicals, and cleaning agents through EPA RCRA-compliant profiling, manifesting, and licensed treatment or disposal.',
    acceptedItems: ['Spent solvents (acetone, MEK, toluene, xylene)', 'Paint and coatings waste', 'Industrial cleaning chemicals', 'Laboratory chemicals and reagents', 'Acids and bases', 'Cutting fluids and coolants', 'Adhesives and resins', 'Aerosol cans (full or partially full)'],
    hasDataSecurity: false,
    process: [
      { title: 'Profiling', description: 'Each waste stream characterized: pH, flash point, toxicity, and composition determined to establish proper EPA classification and disposal method.' },
      { title: 'Manifesting', description: 'EPA hazardous waste manifests (Form 8700-22) prepared with all required fields. LDR notifications where applicable.' },
      { title: 'Transport', description: 'DOT-compliant packaging, labeling, and transport by licensed hazmat haulers.' },
      { title: 'Treatment/Disposal', description: 'Recyclable solvents reclaimed through distillation. Non-recyclable chemicals treated (neutralization, oxidation) or incinerated at permitted facilities.' },
    ],
    siblings: [
      { slug: 'hazardous-materials/batteries', name: 'Batteries' },
      { slug: 'hazardous-materials/light-bulbs', name: 'Light Bulbs' },
    ],
    services: [{ slug: 'hazardous-waste-disposal', name: 'Hazardous Waste Disposal' }, { slug: 'waste-audits-consulting', name: 'Waste Audits' }],
    faqs: [
      { q: 'How do I know if my chemicals are hazardous waste?', a: 'If they\'re on EPA\'s listed waste tables (F, K, P, U lists) or exhibit ignitability (flash point <140°F), corrosivity (pH ≤2 or ≥12.5), reactivity, or toxicity — they\'re hazardous. We perform the profiling to determine classification.' },
      { q: 'Can spent solvents be recycled?', a: 'Many solvents can be reclaimed through distillation and reused. Acetone, MEK, toluene, and xylene are commonly reclaimed. Reclamation is often cheaper than disposal and counts as recycling for diversion metrics.' },
      { q: 'What about unknown chemicals?', a: 'We can profile unknown chemicals through laboratory analysis to determine composition and proper classification. Common in lab cleanouts and facility closures.' },
      { q: 'Do you handle lab pack services?', a: 'Yes. Lab packing involves inventorying, classifying, packaging, and manifesting multiple small containers of chemicals — common for laboratory cleanouts. We handle the full process.' },
      { q: 'What documentation do I receive?', a: 'Waste profile sheets, signed hazardous waste manifests with TSDF return copies, certificates of disposal, and LDR notifications where applicable.' },
    ],
    titleTag: 'Chemical & Solvent Recycling — EPA RCRA Compliant Disposal',
    metaDescription: 'Dispose of industrial chemicals, solvents, paint, and lab waste through EPA RCRA-compliant facilities. Full manifesting included. 817-946-5655.',
  },
};
