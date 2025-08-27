const destinations = [
  {
    name: "New York",
    image:
      "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
  },
  {
    name: "London",
    image:
      "https://i.natgeofe.com/n/ff6bc870-1700-4a2f-87a2-2955abd83794/h_25.539224.jpg",
  },
  {
    name: "Tokyo",
    image:
      "https://www.holidaymonk.com/wp-content/uploads/2024/05/Tokyo-Tour-Package.webp",
  },
  {
    name: "Paris",
    image:
      "https://static.independent.co.uk/2025/04/25/13/42/iStock-1498516775.jpg",
  },
  {
    name: "Scotland",
    image:
      "https://static1.squarespace.com/static/5efb46cf46fb3d2f36091afa/t/64b7c94672ad2f232d2ec52a/1689766218839/Edinburgh+%283%29.jpg?format=1500w",
  },
];

const places = [
  {
    name: "Tirupati",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/tirumala-venkateswara-temple-tirupati-andhra-pradesh-city-ff?qlt=82&ts=1742150827046",
  },
  {
    name: "Bengaluru",
    image:
      "https://d1di04ifehjy6m.cloudfront.net/media/filer_public/7a/23/7a230dbe-215f-4144-9810-60f94e51116c/adobestock_835040940_2.png",
  },
  {
    name: "Coimbatore",
    image: "https://www.holidify.com/images/bgImages/COIMBATORE.jpg",
  },
  {
    name: "Mysore",
    image: "https://taxibazaar.in/assets/images/blog/mysore.jpg",
  },
  {
    name: "Madikeri",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/78/2c/57/abbey-falls.jpg?w=500&h=500&s=1",
  },
  {
    name: "Ooty",
    image:
      "https://s3.india.com/wp-content/uploads/2024/07/Historical-Places-To-Visit-In-Ooty.jpg##image/jpg",
  },
];


const guides: Guide[] = [
    {
      place: 'Munnar, Kerala',
      description:
        'A peaceful retreat among tea gardens, waterfalls and cool misty hills.',
      image:
        'https://oneday.travel/wp-content/uploads/one-day-munnar-local-sightseeing-tour-package-with-top-station-by-private-car-header.jpg',
      user: {
        name: 'Ananya Sharma',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        views: 421,
      },
    },
    {
      place: 'Hampi, Karnataka',
      description:
        'Explore the ruins of a glorious past. Adventure meets history here.',
      image:
        'https://assets-news.housing.com/news/wp-content/uploads/2022/08/31020547/places-to-visit-in-hampi-FEATURE-compressed.jpg',
      user: {
        name: 'Rahul Desai',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        views: 786,
      },
    },
    {
      place: 'Gokarna Beach',
      description:
        'Hidden coves, cozy cafes, and a chill beach town vibe.',
      image:
        'https://thesurfatlas.com/wp-content/uploads/2024/12/surfing-in-gokarna.jpg',
      user: {
        name: 'Neha Verma',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        views: 305,
      },
    },
  ];

//Guide screen data:
const placess = [
  {
    id: "1",
    name: "Mysore Palace",
    image:
      "https://www.worldatlas.com/r/w1200/upload/e5/0e/5f/shutterstock-122322643.jpg",
    description:
      "The iconic Mysore Palace, a masterpiece of Indo-Saracenic architecture, is a must-visit for its grandeur and vibrant history. Illuminated at night, it hosts the famous Dussehra festival.",
    attributes: {
      location: "Mysore, Karnataka",
      type: "Heritage",
      bestTime: "October - April",
      attractions: ["Dussehra Festival", "Durbar Hall", "Royal Artifacts"],
    },
  },
  {
    id: "2",
    name: "Coorg (Kodagu)",
    image:
      "https://static.toiimg.com/thumb/104040262/coorg.jpg?width=1200&height=900",
    description:
      "Known as the Scotland of India, Coorg is a misty hill station famous for its coffee plantations, lush greenery, and serene waterfalls.",
    attributes: {
      location: "Kodagu, Karnataka",
      type: "Hill Station",
      bestTime: "October - March",
      attractions: [
        "Abbey Falls",
        "Raja’s Seat",
        "Coffee Plantations",
        "Trekking",
      ],
    },
  },
  {
    id: "3",
    name: "Hampi",
    image:
      "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/02/12133950/Hampi-places-to-visit-FI-1600x900.jpg",
    description:
      "A UNESCO World Heritage Site, Hampi is a historic village with ancient ruins of the Vijayanagara Empire, featuring stunning temples and boulders.",
    attributes: {
      location: "Ballari, Karnataka",
      type: "Heritage",
      bestTime: "October - February",
      attractions: [
        "Virupaksha Temple",
        "Vijaya Vittala Temple",
        "Rock Climbing",
      ],
    },
  },
  {
    id: "4",
    name: "Gokarna",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/om-beach-gokarna-karnataka-tri-hero?qlt=82&ts=1727164538227&wid=800",
    description:
      "A serene coastal town with pristine beaches and ancient temples, Gokarna is perfect for those seeking spirituality and relaxation.",
    attributes: {
      location: "Uttara Kannada, Karnataka",
      type: "Beach / Pilgrimage",
      bestTime: "October - March",
      attractions: ["Om Beach", "Mahabaleshwar Temple", "Surfing"],
    },
  },
];



// Sample itinerary data (hardcoded, can be fetched from backend later)
const itineraries: { [key: string]: string[] } = {
  "Mysore Palace": [
    "Day 1: Explore Durbar Hall and Royal Artifacts.",
    "Day 2: Attend the Dussehra Festival (October) or evening light show.",
    "Day 3: Visit nearby Chamundi Hills and Jaganmohan Palace.",
  ],
  "Coorg (Kodagu)": [
    "Day 1: Visit Abbey Falls and hike through coffee plantations.",
    "Day 2: Relax at Raja’s Seat and explore Talacauvery.",
    "Day 3: Trek to Tadiandamol Peak or go river rafting.",
  ],
  Hampi: [
    "Day 1: Tour Virupaksha Temple and Hampi Bazaar.",
    "Day 2: Explore Vijaya Vittala Temple and boulder landscapes.",
    "Day 3: Try rock climbing or visit nearby Anjaneya Hill.",
  ],
  Gokarna: [
    "Day 1: Visit Mahabaleshwar Temple and Om Beach.",
    "Day 2: Relax at Kudle Beach or try surfing.",
    "Day 3: Explore Half Moon Beach and Paradise Beach.",
  ],
};

// Sample additional attributes (hardcoded, can be fetched from backend)
const additionalAttributes: {
  [key: string]: { entryFee: string, travelTips: string[] },
} = {
  "Mysore Palace": {
    entryFee: "₹70 for adults, ₹30 for children",
    travelTips: [
      "Book tickets online to avoid queues.",
      "Visit during Dussehra for the grand festival.",
      "Photography inside requires a separate fee.",
    ],
  },
  "Coorg (Kodagu)": {
    entryFee: "Free for most attractions, some estates may charge ₹100-₹200",
    travelTips: [
      "Carry rain gear during monsoon (June-September).",
      "Book homestays in advance for peak season.",
      "Try local Kodava cuisine like Pandi Curry.",
    ],
  },
  Hampi: {
    entryFee: "₹40 for main monuments, free for open ruins",
    travelTips: [
      "Hire a local guide for historical insights.",
      "Wear comfortable shoes for exploring ruins.",
      "Visit in winter for cooler weather.",
    ],
  },
  Gokarna: {
    entryFee: "Free for beaches, temple entry free",
    travelTips: [
      "Respect temple dress codes (cover shoulders and knees).",
      "Book beach shacks early during peak season.",
      "Carry sunscreen for beach activities.",
    ],
  },
};

//Home screen banner image:
<Image
  source={{
    uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  }}
  className="w-full h-80"
  resizeMode="cover"
/>;
