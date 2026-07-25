const products = [
  {
    slug: 'interactive-chair',
    image: '/product/interactive-chair.webp',
    num: '01',
    title: 'Interactive Chair',
    category: 'Mechatronics',
    desc: 'Customize interactive chair model and feature with 2DOF Seat Mover Motion, ergonomics chair with handrest, electrical adjustable table, and foldable 24" PC monitor.',
    specGroups: [
      {
        title: 'Specifications',
        items: [
          { label: 'Supported Height', value: '120–210 cm (4ft–6ft 9in)' },
          { label: 'Max Weight', value: '120 kg (265 lbs)' },
          { label: 'Dimensions (L×W×H)', value: '130×70×75 cm' },
          { label: 'Product Weight', value: '~45 kg (99 lbs)' },
          { label: 'PC Monitor', value: '4K 24 inch (folded / unfolded)' },
        ],
      },
      {
        title: 'Features',
        items: [
          { label: '2DOF Motion', value: '2 axis roll and pitch' },
          { label: 'Table', value: 'Portable table folded/shifted' },
          { label: 'Chair', value: 'Fixed ergonomics chair with 2 armrests' },
          { label: 'Oculus Storage', value: 'Yes' },
          { label: 'Power Consumption', value: '500 watt' },
        ],
      },
    ],
  },
  {
    slug: 'smartboard',
    image: '/product/smartboard-interactive.webp',
    num: '02',
    title: 'Smartboard',
    category: 'Visual & Display',
    desc: 'Interactive flat panel display with dual Android and Windows OS. Ideal for learning in schools, universities, and conference rooms.',
    specGroups: [
      {
        title: 'Specifications',
        items: [
          { label: 'Size', value: '65" / 75" / 86" / 98"' },
          { label: 'Resolution', value: '3840 × 2160 (4K UHD)' },
          { label: 'Refresh Rate', value: '60Hz' },
          { label: 'Brightness', value: '350 cd/m²' },
          { label: 'Contrast Ratio', value: '1200:1' },
          { label: 'Viewing Angle', value: '178° (H/V)' },
          { label: 'Touch Type', value: 'Infrared, 20-point' },
          { label: 'Audio', value: '2×16 W (2.0 Channel)' },
        ],
      },
      {
        title: 'Features',
        items: [
          { label: 'OS', value: 'Dual System (Android + Windows)' },
          { label: 'CPU', value: 'Quad-core (Dual A73 + Dual A53)' },
          { label: 'GPU', value: 'Mali-G52 MP2' },
          { label: 'RAM / ROM', value: '3GB / 32GB' },
          { label: 'Interface', value: 'HDMI ×2, USB, VGA, RS232, RJ45, Type-C' },
          { label: 'Power', value: '100–240V ~ 50/60Hz, Max 325W' },
          { label: 'Net Weight', value: '36.85–61.65 kg' },
        ],
      },
    ],
  },
  {
    slug: 'led-videotron',
    image: '/product/led-display-light.webp',
    num: '03',
    title: 'LED Videotron',
    category: 'Visual & Display',
    desc: 'High-performance modular LED display system. 320×160mm universal module, supports P1.53–P1.86 pixel pitch, 7680Hz refresh, 4K UHD video, 100,000 hrs lifespan.',
    specGroups: [
      {
        title: 'Specifications',
        items: [
          { label: 'Module Size', value: 'W320 × H160 × D16.6 mm' },
          { label: 'Pixel Pitch', value: '1.538 mm / 1.86 mm' },
          { label: 'LED Type', value: 'SMD1212 / SMD1515' },
          { label: 'Pixel Density', value: '422,500 / 288,906 dot/m²' },
          { label: 'Brightness', value: '450–500 cd/m²' },
          { label: 'Refresh Rate', value: '7680Hz / 3840Hz' },
          { label: 'Contrast Ratio', value: '2,083,334:1' },
          { label: 'Video Support', value: '2K HD, 4K UHD' },
        ],
      },
      {
        title: 'Features',
        items: [
          { label: 'Input Power', value: 'Max 488 W/m², Typ 163 W/m²' },
          { label: 'Power Supply', value: 'AC90–264V, 47–63 Hz' },
          { label: 'Processing Depth', value: '12–14 Bit' },
          { label: 'Beam Angle', value: '140° / 140°' },
          { label: 'Lifespan', value: '100,000 hrs' },
          { label: 'Working Temp', value: '-20°C ~ 45°C' },
          { label: 'Certification', value: 'BIS / CE / CB / ROHS / EAC' },
        ],
      },
    ],
  },
  {
    slug: 'gsm-jammer',
    image: '/product/gsm-jammer.webp',
    num: '04',
    title: 'GSM Jammer',
    category: 'Signal Systems',
    desc: 'Intelligent cellular jamming solution for military installations, government buildings, and academic research. Uses PLL technology to jam 2G, 3G, 4G, and 5G communications.',
    specGroups: [
      {
        title: 'Specifications',
        items: [
          { label: 'Frequency Band', value: 'B3, B1' },
          { label: 'PLMN', value: '2 Operator' },
          { label: 'Total Power Out', value: '100 Watt' },
          { label: 'Antenna', value: 'Two Omni antenna' },
          { label: 'Weight', value: '~28 kg' },
          { label: 'Dimensions (L×W×H)', value: '400×200×600 mm' },
        ],
      },
      {
        title: 'Features',
        items: [
          { label: 'Carried Type', value: 'Portable Trolley Type' },
          { label: 'Back Up Time', value: '1 hour' },
          { label: 'Power Backup', value: 'Built in Li-Fe Battery' },
        ],
      },
    ],
  },
  {
    slug: 'gsm-lte-bts',
    image: '/product/gsm-lte-bts.webp',
    num: '05',
    title: 'GSM LTE BTS',
    category: 'Telecom Infrastructure',
    desc: 'Complete GSM/LTE network system in one cabinet. Software Defined Radio with USRP B210, RF power amplifier, and network management dashboard.',
    specGroups: [
      {
        title: 'Specifications',
        items: [
          { label: 'Cabinet', value: '600×600×1000 mm, 19" 18U' },
          { label: 'SDR', value: 'USRP B210 (70MHz–6GHz)' },
          { label: 'RF Power Amp', value: '5 watts / 37 dBm' },
          { label: 'LNA Receiver', value: 'Yes' },
          { label: 'Antenna', value: 'Wideband 800–2700 MHz, 10 dBi' },
          { label: 'CPU', value: 'Core i5 Gen10, RAM 16GB, SSD 256GB NVMe' },
          { label: 'Monitor', value: '17" LCD KVM, 1920×1200, 1U rack mount' },
          { label: 'OS', value: 'Windows 11' },
        ],
      },
      {
        title: 'Features',
        items: [
          { label: 'Dashboard', value: 'Network Management' },
          { label: 'Software', value: '2G GSM, 4G LTE, 5G NR, Voice Call, SMS, SMPP API' },
          { label: 'Network', value: 'BTS, eNodeB, gNB, BSC, MME/EPC, AMF' },
          { label: 'Main Power', value: '220 VAC 50Hz' },
          { label: 'Backup Power', value: 'UPS 900 Watts' },
        ],
      },
    ],
  },
  {
    slug: 'imsi-catcher',
    image: '/product/imsi-cather.webp',
    num: '06',
    title: 'IMSI Catcher',
    category: 'Intelligence Systems',
    desc: 'Portable IMSI catcher for cellular intelligence and network security operations. Backpack-type form factor with built-in battery backup.',
    specGroups: [
      {
        title: 'Specifications',
        items: [
          { label: 'Frequency Band', value: 'FDD LTE B3 (optional B1)' },
          { label: 'PLMN', value: '1 Operator' },
          { label: 'Total Power Out', value: '2 Watt' },
          { label: 'Antenna', value: 'Single Omni antenna' },
          { label: 'Weight', value: '~25 kg' },
          { label: 'Dimensions (L×W×H)', value: '300×150×500 mm' },
        ],
      },
      {
        title: 'Features',
        items: [
          { label: 'Carried Type', value: 'Portable Backpack Type' },
          { label: 'Back Up Time', value: '1 hour' },
          { label: 'Power Backup', value: 'Built in Li-Fe Battery' },
        ],
      },
    ],
  },
];

export default products;
