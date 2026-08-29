/**
 * Mock catalogue data.
 *
 * This is a frontend-only project, so the catalogue lives here as a plain
 * ES module instead of coming from an API. Every component reads from this
 * one array — nothing about a product is written into markup by hand.
 *
 * Product shape:
 *   id          number   stable identity, used as a React key and cart key
 *   name        string
 *   brand       string
 *   category    string   must be one of CATEGORIES
 *   price       number   current price in INR
 *   oldPrice    number?  pre-discount price; drives the reduction badge
 *   rating      number   0–5, one decimal
 *   reviews     number   review count, shown beside the rating
 *   image       string   remote product photo
 *   description string   one short paragraph for the details modal
 *   specs       string[] three key specs for the datasheet strip
 *   badge       string?  editorial flag such as "New" or "Best seller"
 */

export const CATEGORIES = [
  'Smartphones',
  'Laptops',
  'Headphones',
  'Keyboards',
  'Smartwatches',
];

/** Unsplash CDN, sized and quality-capped at the edge so cards stay light. */
const photo = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PRODUCTS = [
  // ---- Smartphones -------------------------------------------------------
  {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    price: 99999,
    rating: 4.8,
    reviews: 1284,
    image: photo('photo-1592750475338-74b7b21085ab'),
    description:
      'A titanium frame drops noticeable weight without giving up rigidity, and the Action button finally replaces the mute switch with something you choose. The A17 Pro handles sustained work — long exports, demanding games — without the thermal throttling that used to cut sessions short.',
    specs: ['6.1" ProMotion', 'A17 Pro', '48MP main'],
    badge: 'Best seller',
  },
  {
    id: 2,
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 119999,
    oldPrice: 124999,
    rating: 4.7,
    reviews: 846,
    image: photo('photo-1610945415295-d9bbf067e59c'),
    description:
      'The flat display and built-in stylus make this the rare large phone that is genuinely useful for marking up documents. A 200MP sensor gives you room to crop hard and still print, and the anti-reflective coating is the first that holds up in direct sun.',
    specs: ['6.8" QHD+ AMOLED', 'Snapdragon 8 Gen 3', '200MP + S Pen'],
  },
  {
    id: 3,
    name: 'Pixel 8 Pro',
    brand: 'Google',
    category: 'Smartphones',
    price: 79999,
    rating: 4.6,
    reviews: 512,
    image: photo('photo-1595941069915-4ebc5197c14a'),
    description:
      'Computational photography is the whole argument here, and it holds: exposure decisions land correctly in mixed light where other phones guess. Seven years of OS updates is the longest commitment on the market, which changes the maths on keeping a phone.',
    specs: ['6.7" Super Actua', 'Tensor G3', '7 years of updates'],
  },
  {
    id: 4,
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'Smartphones',
    price: 79900,
    rating: 4.7,
    reviews: 938,
    image: photo('photo-1580910051074-3eb694886505'),
    description:
      'The Dynamic Island and the 48MP sensor carry over from last year’s Pro line, and USB-C means one cable for the phone, the laptop and the headphones. For most people this is the sensible stopping point in the range.',
    specs: ['6.1" Super Retina', 'A16 Bionic', 'USB-C'],
  },
  {
    id: 17,
    name: 'Phone (2a)',
    brand: 'Nothing',
    category: 'Smartphones',
    price: 23999,
    rating: 4.4,
    reviews: 617,
    image: photo('photo-1585060544812-6b45742d762f'),
    description:
      'The cheapest phone here that still feels designed rather than assembled. Nothing’s software strips the preinstalled clutter other mid-range Android ships with, and the Glyph lights on the back are genuinely useful once you map them to the two or three notifications you care about.',
    specs: ['6.7" 120Hz AMOLED', 'Dimensity 7200 Pro', 'Glyph interface'],
    badge: 'New',
  },
  {
    id: 18,
    name: 'Xperia 1 VI',
    brand: 'Sony',
    category: 'Smartphones',
    price: 84999,
    oldPrice: 89999,
    rating: 4.5,
    reviews: 184,
    image: photo('photo-1598327105666-5b89351aff97'),
    description:
      'Built for the people who still shoot on their phone deliberately: full manual control, a real 85–170mm optical zoom rather than a crop, and a headphone jack Sony has refused to delete. Niche on purpose, and the only phone on this list with a microSD slot.',
    specs: ['6.5" 19.5:9 OLED', '85–170mm zoom', '3.5mm jack'],
  },

  // ---- Laptops -----------------------------------------------------------
  {
    id: 5,
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    price: 114900,
    oldPrice: 124900,
    rating: 4.9,
    reviews: 674,
    image: photo('photo-1496181133206-80ce9b88a853'),
    description:
      'Silent under load, because there is no fan to spin up, and it still finishes a full working day on battery with the brightness up. At 1.24kg it is the machine you stop thinking about carrying, which is most of what a laptop this size is for.',
    specs: ['13.6" Liquid Retina', 'M3 · 8-core', '18h battery'],
    badge: 'Editor’s pick',
  },
  {
    id: 6,
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    category: 'Laptops',
    price: 169900,
    rating: 4.9,
    reviews: 431,
    image: photo('photo-1541807084-5c52b6b3adef'),
    description:
      'Built for work that would make a thin laptop stutter — multicam timelines, large compiles, colour grading on a display that actually reaches reference brightness. Three Thunderbolt ports, HDMI and an SD slot mean the dock stays in the bag.',
    specs: ['14.2" Liquid Retina XDR', 'M3 Pro · 11-core', '22h battery'],
  },
  {
    id: 7,
    name: 'XPS 14',
    brand: 'Dell',
    category: 'Laptops',
    price: 149999,
    rating: 4.5,
    reviews: 287,
    image: photo('photo-1593642702821-c8da6771f0c6'),
    description:
      'The best Windows ultrabook chassis available, now with an OLED option worth the battery cost. Machined aluminium and carbon fibre keep flex out of the deck, and the keyboard has more travel than the thickness suggests.',
    specs: ['14.5" 3.2K OLED', 'Core Ultra 7', '1.7kg'],
  },
  {
    id: 19,
    name: 'ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 169990,
    rating: 4.6,
    reviews: 214,
    image: photo('photo-1484788984921-03950022c9ef'),
    description:
      'Just over a kilogram, and the hinge still has no play in it after a year of being opened one-handed. The keyboard remains the reason people buy these — deep, quiet, and laid out the way it was a decade ago, which is the point.',
    specs: ['14" 2.8K OLED', 'Core Ultra 7 · vPro', '1.09kg'],
  },
  {
    id: 20,
    name: 'ROG Zephyrus G14',
    brand: 'ASUS',
    category: 'Laptops',
    price: 164990,
    rating: 4.6,
    reviews: 302,
    image: photo('photo-1531297484001-80022131f5a1'),
    description:
      'A gaming laptop you can take to a meeting: CNC aluminium, no light-up logos, and it idles silently until you actually ask something of the GPU. The 120Hz OLED is the same panel quality you would buy for colour work, which makes it the rare machine that does both jobs.',
    specs: ['14" 120Hz OLED', 'Ryzen 9 · RTX 4060', '1.5kg'],
  },
  {
    id: 21,
    name: 'MacBook Air 15"',
    brand: 'Apple',
    category: 'Laptops',
    price: 134900,
    rating: 4.8,
    reviews: 398,
    image: photo('photo-1611186871348-b1ce696e52c9'),
    description:
      'The 13-inch Air with more room to work and better speakers, at the same weight most 14-inch laptops manage. Still fanless, so it is silent, and still the machine to buy if the heaviest thing you do is forty browser tabs and a photo library.',
    specs: ['15.3" Liquid Retina', 'M3 · 8-core', '18h battery'],
  },

  // ---- Headphones --------------------------------------------------------
  {
    id: 8,
    name: 'WH-1000XM5',
    brand: 'Sony',
    category: 'Headphones',
    price: 29999,
    oldPrice: 34990,
    rating: 4.8,
    reviews: 2140,
    image: photo('photo-1546435770-a3e426bf472b'),
    description:
      'Still the reference for noise cancellation on a plane or in an open-plan office: it removes the low rumble entirely and takes the edge off nearby voices. Thirty hours per charge means you charge it weekly, not nightly.',
    specs: ['Adaptive ANC', '30h battery', 'LDAC · Hi-Res'],
    badge: 'Best seller',
  },
  {
    id: 9,
    name: 'AirPods Pro 2',
    brand: 'Apple',
    category: 'Headphones',
    price: 24999,
    rating: 4.7,
    reviews: 3096,
    image: photo('photo-1600294037681-c80b4cb5b434'),
    description:
      'Adaptive Audio reads the room and moves between cancelling and letting sound through without you reaching for anything — the first implementation of that idea that does not need correcting. Conversation Awareness drops the volume the moment you start talking.',
    specs: ['Adaptive Audio', 'USB-C case', 'IP54'],
  },
  {
    id: 10,
    name: 'Ear (a)',
    brand: 'Nothing',
    category: 'Headphones',
    price: 7999,
    rating: 4.4,
    reviews: 658,
    image: photo('photo-1578319439584-104c94d37305'),
    description:
      'The value pick of the range: 45dB of cancellation and a genuinely full low end at a fifth of the price of the flagships. The transparent housing is a real design position rather than a gimmick, and the case survives a bag without scuffing.',
    specs: ['45dB ANC', '42h with case', 'IP54'],
  },
  {
    id: 22,
    name: 'QuietComfort Ultra',
    brand: 'Bose',
    category: 'Headphones',
    price: 34990,
    oldPrice: 36990,
    rating: 4.7,
    reviews: 1123,
    image: photo('photo-1583394838336-acd977736f90'),
    description:
      'Bose still wins on comfort over a long flight — the clamp is lighter than Sony’s and the pads stay cool. Immersive Audio is the one spatial mode worth leaving on, because it fixes the sensation that music is playing inside your head rather than in front of you.',
    specs: ['CustomTune ANC', 'Immersive Audio', '24h battery'],
  },
  {
    id: 23,
    name: 'Momentum 4 Wireless',
    brand: 'Sennheiser',
    category: 'Headphones',
    price: 24990,
    rating: 4.6,
    reviews: 742,
    image: photo('photo-1484704849700-f032a568e944'),
    description:
      'Sixty hours per charge, which is roughly a month of commuting, and a tuning that leaves the midrange alone instead of scooping it out for bass. Cancellation is a step behind Sony and Bose; the sound and the battery are a step ahead.',
    specs: ['60h battery', 'aptX Adaptive', '42mm drivers'],
  },
  {
    id: 24,
    name: 'Galaxy Buds3 Pro',
    brand: 'Samsung',
    category: 'Headphones',
    price: 17999,
    rating: 4.3,
    reviews: 486,
    image: photo('photo-1590658268037-6bf12165a8df'),
    description:
      'The blade stems make these easy to seat correctly on the first try, which matters more for cancellation than the specification does. Best paired with a Galaxy phone, where 24-bit audio and automatic switching actually turn on.',
    specs: ['Blade design', '2-way drivers', '360 Audio'],
    badge: 'New',
  },

  // ---- Keyboards ---------------------------------------------------------
  {
    id: 11,
    name: 'K2 Pro',
    brand: 'Keychron',
    category: 'Keyboards',
    price: 9999,
    rating: 4.7,
    reviews: 912,
    image: photo('photo-1618384887929-16ec33fab9ef'),
    description:
      'A 75% layout that keeps the function row and arrow keys, so nothing you actually use ends up behind a layer. Hot-swap sockets mean you can change the feel without soldering, and it is fully remappable in QMK and VIA.',
    specs: ['75% · hot-swap', 'QMK / VIA', 'Bluetooth + USB-C'],
    badge: 'New',
  },
  {
    id: 12,
    name: 'Magic Keyboard',
    brand: 'Apple',
    category: 'Keyboards',
    price: 9990,
    rating: 4.5,
    reviews: 704,
    image: photo('photo-1587829741301-dc798b83add3'),
    description:
      'Low-profile scissor switches with a short, precise throw — quiet enough for a shared room and stable enough to type on all day. Touch ID unlocks the Mac and authorises payments without reaching for the laptop.',
    specs: ['Touch ID', 'Full numeric pad', '1 month per charge'],
  },
  {
    id: 13,
    name: '3068B Macaron',
    brand: 'Akko',
    category: 'Keyboards',
    price: 6999,
    rating: 4.3,
    reviews: 238,
    image: photo('photo-1601445638532-3c6f6c3aa1d6'),
    description:
      'Dye-sublimated PBT keycaps in a pastel set that will not shine up or fade the way cheaper ABS does. A 65% footprint frees a surprising amount of desk for a mouse, and it pairs with three devices at once.',
    specs: ['65% layout', 'PBT dye-sub', '3-device Bluetooth'],
  },
  {
    id: 25,
    name: 'GMMK 3 Pro',
    brand: 'Glorious',
    category: 'Keyboards',
    price: 17999,
    rating: 4.5,
    reviews: 176,
    image: photo('photo-1595225476474-87563907a212'),
    description:
      'A gasket-mounted 75% in a milled aluminium case, so it sounds solid rather than hollow and does not slide when you type hard. Everything is swappable without a soldering iron — switches, plate, stabilisers — which is what you are paying the premium for.',
    specs: ['75% · gasket mount', 'Hot-swap · 8k Hz', 'Aluminium case'],
  },
  {
    id: 26,
    name: 'Huntsman V3 Pro TKL',
    brand: 'Razer',
    category: 'Keyboards',
    price: 19999,
    oldPrice: 21999,
    rating: 4.6,
    reviews: 528,
    image: photo('photo-1563191911-e65f8655ebf9'),
    description:
      'Analogue optical switches let you set the actuation point per key and reset almost instantly, which is the whole argument for competitive play. Doubleshot PBT caps and a real wrist rest mean it is still pleasant to write on when the game is off.',
    specs: ['Analogue optical', 'Rapid trigger', 'TKL · doubleshot PBT'],
  },

  // ---- Smartwatches ------------------------------------------------------
  {
    id: 14,
    name: 'Watch Series 9',
    brand: 'Apple',
    category: 'Smartwatches',
    price: 41900,
    rating: 4.8,
    reviews: 1567,
    image: photo('photo-1546868871-7041f2a55e12'),
    description:
      'Double-tap answers calls and stops timers with the hand you already have free, which sounds minor until you are carrying something. The display now goes bright enough to read on a sunny run and dim enough not to wake anyone.',
    specs: ['45mm · S9 SiP', '2000 nits', 'Always-on Retina'],
  },
  {
    id: 15,
    name: 'Galaxy Watch 6',
    brand: 'Samsung',
    category: 'Smartwatches',
    price: 26999,
    oldPrice: 29999,
    rating: 4.5,
    reviews: 489,
    image: photo('photo-1523275335684-37898b6baf30'),
    description:
      'The round AMOLED reads like a watch rather than a screen on your wrist, and the rotating bezel is still the fastest way to move through a list one-handed. Sleep tracking is detailed enough to act on.',
    specs: ['44mm AMOLED', 'BioActive sensor', 'Wear OS 4'],
  },
  {
    id: 16,
    name: 'Watch Ultra 2',
    brand: 'Apple',
    category: 'Smartwatches',
    price: 89900,
    rating: 4.9,
    reviews: 356,
    image: photo('photo-1508685096489-7aacd43bd3b1'),
    description:
      'Titanium, 100m of water resistance and dual-frequency GPS that holds a track between tall buildings and under tree cover. The 86dB siren and 36-hour battery are the parts you buy for days when things go wrong.',
    specs: ['49mm titanium', '100m water resist', '36h battery'],
  },
  {
    id: 27,
    name: 'Pixel Watch 2',
    brand: 'Google',
    category: 'Smartwatches',
    price: 34999,
    rating: 4.4,
    reviews: 391,
    image: photo('photo-1553545204-4f7d339aa06a'),
    description:
      'The most watch-like of the round Wear OS options — 41mm, domed glass, and light enough to sleep in. Fitbit’s sensors do the health tracking, so heart-rate accuracy during intervals is a clear step up from the first generation.',
    specs: ['41mm AMOLED', 'Wear OS 4', 'Fitbit sensors'],
  },
  {
    id: 28,
    name: 'Smart Band 9',
    brand: 'Xiaomi',
    category: 'Smartwatches',
    price: 2999,
    rating: 4.2,
    reviews: 1284,
    image: photo('photo-1510017803434-a899398421b3'),
    description:
      'Three weeks between charges, which is the one thing every full smartwatch on this list gets wrong. It will not take calls or run apps — it counts steps, sleep and heart rate accurately, tells you the time, and then leaves you alone.',
    specs: ['1.62" AMOLED', '21-day battery', '150+ sport modes'],
    badge: 'Best seller',
  },

  // ---- Indian brands (added) ---------------------------------------------
  // Images are the manufacturer’s own product shots, verified to load and to
  // match the exact model. Prices use realistic Indian retail values (INR).

  // Headphones — boAt
  {
    id: 29,
    name: 'Rockerz 450',
    brand: 'boAt',
    category: 'Headphones',
    price: 1499,
    oldPrice: 2990,
    rating: 4.4,
    reviews: 4820,
    image:
      'https://www.boat-lifestyle.com/cdn/shop/products/eb8e0fbd-c412-48b3-9c91-5b49ddf35800.png?v=1673002681',
    description:
      'An on-ear wireless headphone that punches above its price: 40mm drivers give a surprisingly full low end, and the 15-hour battery covers a work week of commutes. The padded headband stays comfortable through long calls, and it folds flat for the bag.',
    specs: ['On-ear · BT 5.0', '40mm drivers', '15h battery'],
    badge: 'Best seller',
  },
  {
    id: 30,
    name: 'Rockerz 550',
    brand: 'boAt',
    category: 'Headphones',
    price: 1999,
    oldPrice: 3990,
    rating: 4.3,
    reviews: 3110,
    image:
      'https://www.boat-lifestyle.com/cdn/shop/products/64576906-013d-4af9-828a-fc3c69482a8a_2000x.png?v=1625046144',
    description:
      'The over-ear sibling trades portability for isolation and bass weight, with padded cups that seal out office noise without active cancellation. A 20-hour cell and a wired aux fallback keep it playing when Bluetooth isn’t an option.',
    specs: ['Over-ear · BT 5.0', '20h battery', 'AUX fallback'],
  },
  {
    id: 31,
    name: 'Immortal 700',
    brand: 'boAt',
    category: 'Headphones',
    price: 1799,
    oldPrice: 3990,
    rating: 4.2,
    reviews: 1875,
    image:
      'https://www.boat-lifestyle.com/cdn/shop/products/main1_65ff249b-c4f8-4dad-ae88-2aae76723ce2_2000x.png?v=1643477993',
    description:
      'Built for gaming first: a low-latency mode tightens audio-to-video sync, the boom mic detaches for music, and the cup lighting stays subtle rather than loud. 40mm drivers and 40 hours of playback make it a credible daily headset too.',
    specs: ['Low-latency mode', 'Detachable mic', '40h battery'],
  },
  {
    id: 32,
    name: 'Airdopes 141',
    brand: 'boAt',
    category: 'Headphones',
    price: 1299,
    oldPrice: 4990,
    rating: 4.3,
    reviews: 6240,
    image:
      'https://www.boat-lifestyle.com/cdn/shop/files/AD141-FI_Grey01.png?v=1698391770',
    description:
      'The mainstream TWS pick: 42 hours total with the case, a calling mic that holds up on a noisy street, and IPX4 sweat resistance for the gym. Each bud pairs independently, so one can stay charging while you listen.',
    specs: ['TWS · BT 5.2', '42h with case', 'IPX4'],
  },
  {
    id: 33,
    name: 'Airdopes 131',
    brand: 'boAt',
    category: 'Headphones',
    price: 1199,
    oldPrice: 2990,
    rating: 4.1,
    reviews: 3980,
    image:
      'https://www.boat-lifestyle.com/cdn/shop/products/c2386af9-4349-432f-8ba5-2b6aa06025c8.png?v=1744005712',
    description:
      'A smaller, lighter bud for all-day wear, with 13mm drivers and 15 hours from the case. Touch controls are kept minimal on purpose, and the compact charging case slips into a coin pocket.',
    specs: ['13mm drivers', '15h with case', 'Touch controls'],
    badge: 'New',
  },

  // Smartwatches — Noise & Fire-Boltt
  {
    id: 34,
    name: 'ColorFit Icon 5',
    brand: 'Noise',
    category: 'Smartwatches',
    price: 1699,
    oldPrice: 4999,
    rating: 4.4,
    reviews: 160,
    image:
      'https://www.gonoise.com/cdn/shop/files/Artboard_1-removebg-preview_8d368406-370c-413b-99da-4e526e3874b6_grande.png?v=1751090206',
    description:
      'A 1.95-inch AMOLED panel in the budget band, with Bluetooth calling and a week-plus of battery — the spec sheet you usually pay twice as much for. SpO2 and heart-rate tracking are onboard, and 100+ watch faces keep the look fresh.',
    specs: ['1.95" AMOLED', 'BT calling', '10-day battery'],
  },
  {
    id: 35,
    name: 'ColorFit Pulse 3',
    brand: 'Noise',
    category: 'Smartwatches',
    price: 1999,
    oldPrice: 6999,
    rating: 4.3,
    reviews: 338,
    image:
      'https://www.gonoise.com/cdn/shop/files/1.1_6f1a08c2-0eda-4569-b303-962521afa89d_grande.png?v=1683894410',
    description:
      'Noise trims the bezels 17% against the Pulse 2 and keeps the 1.96-inch display bright enough outdoors. 100+ sport modes and a 7-day cell make it the sensible everyday tracker, with calls handled from the wrist.',
    specs: ['1.96" display', 'BT calling', '100+ modes'],
  },
  {
    id: 36,
    name: 'ColorFit Vision 3',
    brand: 'Noise',
    category: 'Smartwatches',
    price: 2499,
    oldPrice: 8999,
    rating: 4.5,
    reviews: 101,
    image:
      'https://www.gonoise.com/cdn/shop/files/Carousel-500x500-1_3029f4e1-69ab-48fe-a088-41f4e79e2f2f_grande.png?v=1697711374',
    description:
      'The AMOLED upgrade with a metal body and a functional rotating crown, plus TruSync calling over BT 5.3. 550-nit brightness and 150+ watch faces put it a clear step above the LCD ColorFits at a still-affordable price.',
    specs: ['1.96" AMOLED', 'Metal body', 'Rotating crown'],
  },
  {
    id: 37,
    name: 'ColorFit Pro 5 Max',
    brand: 'Noise',
    category: 'Smartwatches',
    price: 4499,
    oldPrice: 6999,
    rating: 4.6,
    reviews: 386,
    image:
      'https://www.gonoise.com/cdn/shop/files/1_ecb6bab3-7552-4d31-a0bb-833b19044577_grande.png?v=1771311846',
    description:
      'A 2-inch HD panel with a smart dock for charging, VO2-max tracking and post-training recovery analysis. The largest, most capable ColorFit screen, for those who want flagship smartwatch features under a mid-range budget.',
    specs: ['2" HD display', 'Smart dock', '7-day battery'],
    badge: 'New',
  },
  {
    id: 38,
    name: 'Ninja Call Pro Plus',
    brand: 'Fire-Boltt',
    category: 'Smartwatches',
    price: 1399,
    oldPrice: 4999,
    rating: 4.2,
    reviews: 540,
    image:
      'https://www.fireboltt.com/cdn/shop/files/Black_bd543ece-636f-4e78-ac76-35729c6afda1.png?v=1778584781',
    description:
      'A 1.83-inch calling smartwatch at an aggressive price, with SpO2, 100+ sports modes and IP68 resistance. The Ninja line is Fire-Boltt’s volume play, and this one covers the basics — calls, notifications, heart rate — without fuss.',
    specs: ['1.83" display', 'BT calling', 'IP68'],
  },

  // Smartphones — Lava
  {
    id: 39,
    name: 'Blaze 5G',
    brand: 'Lava',
    category: 'Smartphones',
    price: 10999,
    oldPrice: 13999,
    rating: 4.3,
    reviews: 420,
    image:
      'https://hotfixapi.lavamobiles.com/storage/media/images/product-gallery/image_path/blaze-5g-img-1-1705490323.webp',
    description:
      'Lava’s clean-Android 5G phone: a 6.5-inch 90Hz IPS panel, a 50MP triple camera and a 5000mAh battery, on MediaTek’s Dimensity 700. No bloatware, a side fingerprint reader, and support for every Indian 5G band make it a straight-up budget 5G buy.',
    specs: ['6.5" 90Hz IPS', 'Dimensity 700 · 5G', '50MP triple'],
    badge: 'New',
  },
  {
    id: 40,
    name: 'Agni 2 5G',
    brand: 'Lava',
    category: 'Smartphones',
    price: 21999,
    oldPrice: 24999,
    rating: 4.4,
    reviews: 230,
    image:
      'https://shop.lavamobiles.com/cdn/shop/products/1_086be255-f51a-43d2-afe9-68511b4b451b.png?v=1693834963',
    description:
      'Lava’s most ambitious phone: a curved 120Hz FHD+ AMOLED, MediaTek’s Dimensity 7050 and 66W charging that hits 50% in under 16 minutes. A 50MP quad camera and clean Android 13 round out a genuine mid-range contender made in India.',
    specs: ['6.78" 120Hz AMOLED', 'Dimensity 7050', '66W charging'],
  },

  // Keyboards — Zebronics & Portronics
  {
    id: 41,
    name: 'ZEB-DLK01',
    brand: 'Zebronics',
    category: 'Keyboards',
    price: 799,
    oldPrice: 999,
    rating: 4.3,
    reviews: 560,
    image:
      'https://zebronics.com/cdn/shop/products/ZEB-DLK01_01.jpg?v=1624701997&width=2048',
    description:
      'A no-nonsense USB multimedia keyboard: 104 chiclet keys, 12 integrated hot keys and a Rupee key, in a slim 1.8m-cabled body. Quiet to type on and cheap enough to keep a spare, it does the office job without asking for batteries.',
    specs: ['104 chiclet keys', '12 hot keys', 'USB wired'],
  },
  {
    id: 42,
    name: 'ZEB-Nitro 1',
    brand: 'Zebronics',
    category: 'Keyboards',
    price: 2999,
    oldPrice: 3499,
    rating: 4.4,
    reviews: 310,
    image:
      'https://zebronics.com/cdn/shop/products/ZEB-NITRO-1-pic1.jpg?v=1623839779&width=2048',
    description:
      'A full-size mechanical keyboard with clicky blue switches and N-key rollover, built for typists who want feedback without a gaming aesthetic. The 1.8m braided cable and gold-plated USB connector are meant to outlast cheaper boards.',
    specs: ['Blue switches', '104 keys', 'N-key rollover'],
  },
  {
    id: 43,
    name: 'Zeb Nitro Pro',
    brand: 'Zebronics',
    category: 'Keyboards',
    price: 4999,
    oldPrice: 5999,
    rating: 4.5,
    reviews: 240,
    image:
      'https://zebronics.com/cdn/shop/products/Zeb-Nitro-Pro-pic1.jpg?v=1676287387&width=2048',
    description:
      'The silent-tactile mechanical step up: 98 keys, OUTEMU red switches, 19 LED modes and a detachable braided Type-C cable. A heavy base and 1000Hz polling make it as comfortable for long typing sessions as for games.',
    specs: ['OUTEMU red', '98 keys', 'Type-C detachable'],
    badge: 'New',
  },
  {
    id: 44,
    name: 'Bubble 3.0',
    brand: 'Portronics',
    category: 'Keyboards',
    price: 1299,
    oldPrice: 2999,
    rating: 4.2,
    reviews: 180,
    image:
      'https://www.portronics.com/cdn/shop/files/Portronics_Bubble_3.0_Wireless_Keyboard_online.jpg?v=1752752766',
    description:
      'A low-profile wireless keyboard that pairs with up to four devices — three over BT 5.3 and one via 2.4GHz dongle — with a built-in phone stand and a Copilot key. Rechargeable over Type-C and quiet enough for shared desks.',
    specs: ['BT 5.3 + 2.4GHz', '4-device pair', 'Rechargeable'],
  },
];

/** Bounds for the price filter, derived so the slider never has to be edited. */
export const PRICE_MIN = 0;
export const PRICE_MAX = Math.ceil(
  Math.max(...PRODUCTS.map((p) => p.price)) / 100
) * 100;

export const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: highest first' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

/** Live count per category, used on the category cards. */
export const countByCategory = (category) =>
  PRODUCTS.filter((p) => p.category === category).length;
