// Script para poblar la base de datos con vinilos de prueba
require("dotenv").config();
require("./db");

const User = require("./models/User.model");
const Vinyl = require("./models/Vinyl.model");
const Comment = require("./models/Comment.model");

const sampleVinyls = [
  // ROCK (10 vinilos)
  {
    title: "Abbey Road",
    artist: "The Beatles",
    releaseYear: 1969,
    genre: "Rock",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&h=500&fit=crop",
    description: "El undécimo álbum de estudio de The Beatles, considerado una obra maestra.",
    purchaseLocation: "Tienda de discos vintage Downtown",
    rating: 5
  },
  {
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    releaseYear: 1973,
    genre: "Rock",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop",
    description: "Una obra conceptual revolucionaria del rock progresivo.",
    purchaseLocation: "Mercado de pulgas de Brooklyn",
    rating: 5
  },
  {
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    releaseYear: 1971,
    genre: "Rock",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1618944913480-b67ee16d7b77?w=500&h=500&fit=crop",
    description: "Incluye clásicos como 'Stairway to Heaven' y 'Black Dog'.",
    purchaseLocation: "Record Store Camden",
    rating: 5
  },
  {
    title: "Rumours",
    artist: "Fleetwood Mac",
    releaseYear: 1977,
    genre: "Rock",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1619983081852-9c0bb2c79c6d?w=500&h=500&fit=crop",
    description: "Uno de los álbumes más vendidos de la historia del rock.",
    purchaseLocation: "Amazon Marketplace",
    rating: 5
  },
  {
    title: "The Rise and Fall of Ziggy Stardust",
    artist: "David Bowie",
    releaseYear: 1972,
    genre: "Rock",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1615203701303-0a6da6137eb2?w=500&h=500&fit=crop",
    description: "El quinto álbum de estudio de David Bowie, un álbum conceptual icónico.",
    purchaseLocation: "Discogs online",
    rating: 5
  },
  {
    title: "Nevermind",
    artist: "Nirvana",
    releaseYear: 1991,
    genre: "Rock",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&h=500&fit=crop",
    description: "El álbum que definió el grunge y la música de los 90.",
    purchaseLocation: "Urban Outfitters",
    rating: 5
  },
  {
    title: "London Calling",
    artist: "The Clash",
    releaseYear: 1979,
    genre: "Rock",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?w=500&h=500&fit=crop",
    description: "El tercer álbum de estudio de The Clash, un clásico del punk rock.",
    purchaseLocation: "Rough Trade Records",
    rating: 5
  },
  {
    title: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    releaseYear: 1967,
    genre: "Rock",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=500&h=500&fit=crop",
    description: "Álbum debut influyente del rock alternativo.",
    purchaseLocation: "Casa de empeño local",
    rating: 4
  },
  {
    title: "OK Computer",
    artist: "Radiohead",
    releaseYear: 1997,
    genre: "Rock",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?w=500&h=500&fit=crop",
    description: "Tercer álbum de Radiohead, aclamado por la crítica.",
    purchaseLocation: "Tienda de discos HMV",
    rating: 5
  },
  {
    title: "Highway to Hell",
    artist: "AC/DC",
    releaseYear: 1979,
    genre: "Rock",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=500&h=500&fit=crop",
    description: "El último álbum con Bon Scott como vocalista.",
    purchaseLocation: "eBay",
    rating: 5
  },

  // POP (7 vinilos)
  {
    title: "Thriller",
    artist: "Michael Jackson",
    releaseYear: 1982,
    genre: "Pop",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=500&h=500&fit=crop",
    description: "El álbum más vendido de todos los tiempos.",
    purchaseLocation: "Tower Records",
    rating: 5
  },
  {
    title: "Purple Rain",
    artist: "Prince",
    releaseYear: 1984,
    genre: "Pop",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop",
    description: "La banda sonora de la película homónima protagonizada por Prince.",
    purchaseLocation: "Walmart",
    rating: 5
  },
  {
    title: "Pet Sounds",
    artist: "The Beach Boys",
    releaseYear: 1966,
    genre: "Pop",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1619983081852-9ccf24c6d6d6?w=500&h=500&fit=crop",
    description: "Obra maestra del pop experimental de Brian Wilson.",
    purchaseLocation: "Amoeba Music LA",
    rating: 5
  },
  {
    title: "1989",
    artist: "Taylor Swift",
    releaseYear: 2014,
    genre: "Pop",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1608433319511-dfe8ea4cbd3c?w=500&h=500&fit=crop",
    description: "El quinto álbum de estudio que marcó su transición al pop.",
    purchaseLocation: "Target",
    rating: 4
  },
  {
    title: "Like a Virgin",
    artist: "Madonna",
    releaseYear: 1984,
    genre: "Pop",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1611330001559-dd4034b72a5e?w=500&h=500&fit=crop",
    description: "El segundo álbum de estudio de Madonna que la catapultó al estrellato.",
    purchaseLocation: "Fnac",
    rating: 4
  },
  {
    title: "21",
    artist: "Adele",
    releaseYear: 2011,
    genre: "Pop",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&h=500&fit=crop",
    description: "El segundo álbum que incluye 'Rolling in the Deep' y 'Someone Like You'.",
    purchaseLocation: "Best Buy",
    rating: 5
  },
  {
    title: "Bad",
    artist: "Michael Jackson",
    releaseYear: 1987,
    genre: "Pop",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1611330001616-8925873d5a3b?w=500&h=500&fit=crop",
    description: "El séptimo álbum de estudio de Michael Jackson.",
    purchaseLocation: "Mercadillo de segunda mano",
    rating: 4
  },

  // JAZZ (7 vinilos)
  {
    title: "Kind of Blue",
    artist: "Miles Davis",
    releaseYear: 1959,
    genre: "Jazz",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop",
    description: "Uno de los álbumes de jazz más influyentes de la historia.",
    purchaseLocation: "Jazz Corner Records",
    rating: 5
  },
  {
    title: "A Love Supreme",
    artist: "John Coltrane",
    releaseYear: 1965,
    genre: "Jazz",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&h=500&fit=crop",
    description: "Obra maestra espiritual del jazz modal.",
    purchaseLocation: "Blue Note Tokyo",
    rating: 5
  },
  {
    title: "Time Out",
    artist: "Dave Brubeck Quartet",
    releaseYear: 1959,
    genre: "Jazz",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&h=500&fit=crop",
    description: "Incluye el famoso 'Take Five' en compás de 5/4.",
    purchaseLocation: "Venta de garaje",
    rating: 5
  },
  {
    title: "The Black Saint and the Sinner Lady",
    artist: "Charles Mingus",
    releaseYear: 1963,
    genre: "Jazz",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&h=500&fit=crop",
    description: "Ballet de jazz experimental aclamado por la crítica.",
    purchaseLocation: "Etsy vintage seller",
    rating: 5
  },
  {
    title: "Ah Um",
    artist: "Charles Mingus",
    releaseYear: 1959,
    genre: "Jazz",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Incluye la clásica 'Goodbye Pork Pie Hat'.",
    purchaseLocation: "Librería con sección de discos",
    rating: 5
  },
  {
    title: "Ella and Louis",
    artist: "Ella Fitzgerald & Louis Armstrong",
    releaseYear: 1956,
    genre: "Jazz",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Colaboración histórica entre dos leyendas del jazz.",
    purchaseLocation: "Tienda de antigüedades",
    rating: 5
  },
  {
    title: "Head Hunters",
    artist: "Herbie Hancock",
    releaseYear: 1973,
    genre: "Jazz",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Álbum pionero del jazz fusion con elementos funk.",
    purchaseLocation: "Record Store Day edición especial",
    rating: 4
  },

  // ELECTRÓNICA (10 vinilos)
  {
    title: "Discovery",
    artist: "Daft Punk",
    releaseYear: 2001,
    genre: "Electrónica",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    description: "El segundo álbum de estudio de Daft Punk, lleno de hits.",
    purchaseLocation: "Fnac París",
    rating: 5
  },
  {
    title: "Selected Ambient Works 85-92",
    artist: "Aphex Twin",
    releaseYear: 1992,
    genre: "Electrónica",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Álbum de ambient techno revolucionario.",
    purchaseLocation: "Bleep.com",
    rating: 5
  },
  {
    title: "Music Has the Right to Children",
    artist: "Boards of Canada",
    releaseYear: 1998,
    genre: "Electrónica",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Obra maestra del IDM y ambient.",
    purchaseLocation: "Warp Records online",
    rating: 5
  },
  {
    title: "Mezzanine",
    artist: "Massive Attack",
    releaseYear: 1998,
    genre: "Electrónica",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Tercer álbum de Massive Attack, un clásico del trip-hop.",
    purchaseLocation: "Virgin Megastore",
    rating: 5
  },
  {
    title: "Homework",
    artist: "Daft Punk",
    releaseYear: 1997,
    genre: "Electrónica",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Álbum debut de Daft Punk que definió el French house.",
    purchaseLocation: "Tienda de discos en Tokio",
    rating: 5
  },
  {
    title: "Since I Left You",
    artist: "The Avalanches",
    releaseYear: 2000,
    genre: "Electrónica",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=500&fit=crop",
    description: "Álbum de plunderphonics con miles de muestras.",
    purchaseLocation: "Modular Records",
    rating: 5
  },
  {
    title: "Dummy",
    artist: "Portishead",
    releaseYear: 1994,
    genre: "Electrónica",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop",
    description: "Álbum debut que ayudó a definir el género trip-hop.",
    purchaseLocation: "Tower Records",
    rating: 5
  },
  {
    title: "Random Access Memories",
    artist: "Daft Punk",
    releaseYear: 2013,
    genre: "Electrónica",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500&h=500&fit=crop",
    description: "El cuarto álbum de estudio del dúo francés de música electrónica.",
    purchaseLocation: "Fnac",
    rating: 4
  },
  {
    title: "Cross",
    artist: "Justice",
    releaseYear: 2007,
    genre: "Electrónica",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Álbum debut del dúo francés de electro house.",
    purchaseLocation: "Ed Banger Records",
    rating: 4
  },
  {
    title: "Immunity",
    artist: "Jon Hopkins",
    releaseYear: 2013,
    genre: "Electrónica",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    description: "Álbum de techno ambient nominado al Mercury Prize.",
    purchaseLocation: "Bandcamp",
    rating: 4
  },

  // HIP-HOP (7 vinilos)
  {
    title: "The Chronic",
    artist: "Dr. Dre",
    releaseYear: 1992,
    genre: "Hip-Hop",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop",
    description: "Álbum debut de Dr. Dre, fundamental en el desarrollo del G-funk.",
    purchaseLocation: "Fat Beats NYC",
    rating: 5
  },
  {
    title: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    releaseYear: 1998,
    genre: "Hip-Hop",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=500&h=500&fit=crop",
    description: "Álbum debut en solitario ganador de múltiples Grammy.",
    purchaseLocation: "Tienda de discos Harlem",
    rating: 5
  },
  {
    title: "Illmatic",
    artist: "Nas",
    releaseYear: 1994,
    genre: "Hip-Hop",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Considerado uno de los mejores álbumes de hip-hop de todos los tiempos.",
    purchaseLocation: "A1 Records",
    rating: 5
  },
  {
    title: "Ready to Die",
    artist: "The Notorious B.I.G.",
    releaseYear: 1994,
    genre: "Hip-Hop",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Álbum debut del legendario rapero de Brooklyn.",
    purchaseLocation: "Tienda de discos Brooklyn",
    rating: 5
  },
  {
    title: "The Blueprint",
    artist: "Jay-Z",
    releaseYear: 2001,
    genre: "Hip-Hop",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Sexto álbum de estudio de Jay-Z con producción de Kanye West.",
    purchaseLocation: "Def Jam Store",
    rating: 5
  },
  {
    title: "good kid, m.A.A.d city",
    artist: "Kendrick Lamar",
    releaseYear: 2012,
    genre: "Hip-Hop",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Segundo álbum de estudio conceptual sobre Compton.",
    purchaseLocation: "Urban Outfitters",
    rating: 5
  },
  {
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    releaseYear: 1993,
    genre: "Hip-Hop",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Álbum debut del colectivo que revolucionó el hip-hop.",
    purchaseLocation: "Tienda de discos Staten Island",
    rating: 5
  },

  // R&B (7 vinilos)
  {
    title: "Back to Black",
    artist: "Amy Winehouse",
    releaseYear: 2006,
    genre: "R&B",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=500&h=500&fit=crop",
    description: "El segundo y último álbum de estudio de Amy Winehouse.",
    purchaseLocation: "HMV Londres",
    rating: 5
  },
  {
    title: "What's Going On",
    artist: "Marvin Gaye",
    releaseYear: 1971,
    genre: "R&B",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Un álbum conceptual sobre temas sociales y ambientales.",
    purchaseLocation: "Motown Records",
    rating: 5
  },
  {
    title: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    releaseYear: 1976,
    genre: "R&B",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Obra maestra del soul y R&B de Stevie Wonder.",
    purchaseLocation: "Tienda de discos Detroit",
    rating: 5
  },
  {
    title: "Channel Orange",
    artist: "Frank Ocean",
    releaseYear: 2012,
    genre: "R&B",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Álbum debut en solitario aclamado por la crítica.",
    purchaseLocation: "Urban Outfitters",
    rating: 5
  },
  {
    title: "Ctrl",
    artist: "SZA",
    releaseYear: 2017,
    genre: "R&B",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    description: "Álbum debut de SZA con un sonido R&B contemporáneo.",
    purchaseLocation: "Amazon",
    rating: 4
  },
  {
    title: "Voodoo",
    artist: "D'Angelo",
    releaseYear: 2000,
    genre: "R&B",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Segundo álbum que definió el neo-soul.",
    purchaseLocation: "Amoeba Music",
    rating: 5
  },
  {
    title: "Confessions",
    artist: "Usher",
    releaseYear: 2004,
    genre: "R&B",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Cuarto álbum de estudio con 'Yeah!' y 'Burn'.",
    purchaseLocation: "Best Buy",
    rating: 4
  },

  // METAL (7 vinilos)
  {
    title: "Master of Puppets",
    artist: "Metallica",
    releaseYear: 1986,
    genre: "Metal",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&fit=crop",
    description: "Considerado uno de los mejores álbumes de thrash metal.",
    purchaseLocation: "Rasputin Music",
    rating: 5
  },
  {
    title: "Paranoid",
    artist: "Black Sabbath",
    releaseYear: 1970,
    genre: "Metal",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Segundo álbum que definió el heavy metal.",
    purchaseLocation: "Tienda de discos Birmingham",
    rating: 5
  },
  {
    title: "The Number of the Beast",
    artist: "Iron Maiden",
    releaseYear: 1982,
    genre: "Metal",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Tercer álbum y el primero con Bruce Dickinson.",
    purchaseLocation: "Mercado de Camden",
    rating: 5
  },
  {
    title: "Reign in Blood",
    artist: "Slayer",
    releaseYear: 1986,
    genre: "Metal",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Álbum icónico de thrash metal de 29 minutos.",
    purchaseLocation: "Metal Blade Records",
    rating: 5
  },
  {
    title: "Rust in Peace",
    artist: "Megadeth",
    releaseYear: 1990,
    genre: "Metal",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Cuarto álbum con complejas composiciones técnicas.",
    purchaseLocation: "Capitol Records",
    rating: 5
  },
  {
    title: "Holy Diver",
    artist: "Dio",
    releaseYear: 1983,
    genre: "Metal",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Álbum debut de la banda de Ronnie James Dio.",
    purchaseLocation: "Tienda de discos especializada metal",
    rating: 5
  },
  {
    title: "Painkiller",
    artist: "Judas Priest",
    releaseYear: 1990,
    genre: "Metal",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Duodécimo álbum con sonido speed metal agresivo.",
    purchaseLocation: "Nuclear Blast Records",
    rating: 4
  },

  // REGGAE (7 vinilos)
  {
    title: "Legend",
    artist: "Bob Marley & The Wailers",
    releaseYear: 1984,
    genre: "Reggae",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=500&h=500&fit=crop",
    description: "La recopilación más vendida de Bob Marley.",
    purchaseLocation: "Island Records Store",
    rating: 5
  },
  {
    title: "Catch a Fire",
    artist: "Bob Marley & The Wailers",
    releaseYear: 1973,
    genre: "Reggae",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Álbum debut internacional de Bob Marley.",
    purchaseLocation: "Tuff Gong Store Jamaica",
    rating: 5
  },
  {
    title: "Exodus",
    artist: "Bob Marley & The Wailers",
    releaseYear: 1977,
    genre: "Reggae",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Noveno álbum con clásicos como 'Jamming' y 'Three Little Birds'.",
    purchaseLocation: "Tienda de discos Kingston",
    rating: 5
  },
  {
    title: "Toots in Memphis",
    artist: "Toots & The Maytals",
    releaseYear: 1988,
    genre: "Reggae",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Álbum grabado en los legendarios Stax Studios.",
    purchaseLocation: "Shangri-La Records Memphis",
    rating: 4
  },
  {
    title: "Equal Rights",
    artist: "Peter Tosh",
    releaseYear: 1977,
    genre: "Reggae",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Tercer álbum en solitario del ex-Wailer.",
    purchaseLocation: "Tienda de discos vintage",
    rating: 5
  },
  {
    title: "Two Sevens Clash",
    artist: "Culture",
    releaseYear: 1977,
    genre: "Reggae",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Álbum roots reggae profético sobre 1977.",
    purchaseLocation: "Honest Jon's Londres",
    rating: 5
  },
  {
    title: "Marcus Garvey",
    artist: "Burning Spear",
    releaseYear: 1975,
    genre: "Reggae",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Álbum roots reggae dedicado al líder panafricanista.",
    purchaseLocation: "Blood and Fire Records",
    rating: 5
  },

  // FOLK (7 vinilos)
  {
    title: "Blue",
    artist: "Joni Mitchell",
    releaseYear: 1971,
    genre: "Folk",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    description: "Considerado uno de los mejores álbumes de folk de todos los tiempos.",
    purchaseLocation: "Grimey's New & Preloved Music",
    rating: 5
  },
  {
    title: "The Freewheelin' Bob Dylan",
    artist: "Bob Dylan",
    releaseYear: 1963,
    genre: "Folk",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Segundo álbum con 'Blowin' in the Wind'.",
    purchaseLocation: "Village Vinyl Greenwich",
    rating: 5
  },
  {
    title: "Astral Weeks",
    artist: "Van Morrison",
    releaseYear: 1968,
    genre: "Folk",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Segundo álbum en solitario, obra maestra del folk místico.",
    purchaseLocation: "Tower Records Dublin",
    rating: 5
  },
  {
    title: "The Times They Are a-Changin'",
    artist: "Bob Dylan",
    releaseYear: 1964,
    genre: "Folk",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Tercer álbum con canciones de protesta social.",
    purchaseLocation: "Feria de discos usados",
    rating: 5
  },
  {
    title: "Harvest",
    artist: "Neil Young",
    releaseYear: 1972,
    genre: "Folk",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Cuarto álbum con 'Heart of Gold' y 'Old Man'.",
    purchaseLocation: "Amoeba Music San Francisco",
    rating: 5
  },
  {
    title: "Court and Spark",
    artist: "Joni Mitchell",
    releaseYear: 1974,
    genre: "Folk",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Sexto álbum con fusión de folk, jazz y pop.",
    purchaseLocation: "Aquarius Records",
    rating: 5
  },
  {
    title: "Goodbye Yellow Brick Road",
    artist: "Elton John",
    releaseYear: 1973,
    genre: "Folk",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Doble álbum con clásicos como 'Candle in the Wind'.",
    purchaseLocation: "Tienda de discos vintage Londres",
    rating: 5
  },

  // COUNTRY (7 vinilos)
  {
    title: "At Folsom Prison",
    artist: "Johnny Cash",
    releaseYear: 1968,
    genre: "Country",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop",
    description: "Álbum en vivo grabado en la prisión de Folsom.",
    purchaseLocation: "Ernest Tubb Record Shop Nashville",
    rating: 5
  },
  {
    title: "Red Headed Stranger",
    artist: "Willie Nelson",
    releaseYear: 1975,
    genre: "Country",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Álbum conceptual que definió el outlaw country.",
    purchaseLocation: "Waterloo Records Austin",
    rating: 5
  },
  {
    title: "Coat of Many Colors",
    artist: "Dolly Parton",
    releaseYear: 1971,
    genre: "Country",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Octavo álbum con la autobiográfica canción título.",
    purchaseLocation: "Tienda de discos Nashville",
    rating: 5
  },
  {
    title: "I Walk the Line",
    artist: "Johnny Cash",
    releaseYear: 1964,
    genre: "Country",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Álbum recopilatorio con su primer gran éxito.",
    purchaseLocation: "Sun Studio Memphis",
    rating: 5
  },
  {
    title: "Will the Circle Be Unbroken",
    artist: "Nitty Gritty Dirt Band",
    releaseYear: 1972,
    genre: "Country",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Triple álbum colaborativo con leyendas del country.",
    purchaseLocation: "Gruhn Guitars Nashville",
    rating: 4
  },
  {
    title: "Golden Hour",
    artist: "Kacey Musgraves",
    releaseYear: 2018,
    genre: "Country",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Cuarto álbum ganador del Grammy al Álbum del Año.",
    purchaseLocation: "Urban Outfitters",
    rating: 4
  },
  {
    title: "The Essential Johnny Cash",
    artist: "Johnny Cash",
    releaseYear: 2002,
    genre: "Country",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Doble álbum recopilatorio de sus mejores canciones.",
    purchaseLocation: "Amazon",
    rating: 5
  },

  // CLÁSICA (7 vinilos)
  {
    title: "The Four Seasons",
    artist: "Antonio Vivaldi",
    releaseYear: 1989,
    genre: "Clásica",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&h=500&fit=crop",
    description: "Ciclo de cuatro conciertos para violín, una de las obras más populares del barroco.",
    purchaseLocation: "Deutsche Grammophon Store",
    rating: 5
  },
  {
    title: "Symphony No. 9",
    artist: "Ludwig van Beethoven",
    releaseYear: 1963,
    genre: "Clásica",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "La última sinfonía completa con el famoso 'Ode to Joy'.",
    purchaseLocation: "Arkiv Music",
    rating: 5
  },
  {
    title: "Requiem Mass in D minor",
    artist: "Wolfgang Amadeus Mozart",
    releaseYear: 1967,
    genre: "Clásica",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop",
    description: "Misa de réquiem inacabada, obra maestra coral.",
    purchaseLocation: "Naxos Records",
    rating: 5
  },
  {
    title: "The Well-Tempered Clavier",
    artist: "Johann Sebastian Bach",
    releaseYear: 1972,
    genre: "Clásica",
    condition: "Bueno",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    description: "Colección de preludios y fugas en todas las tonalidades.",
    purchaseLocation: "Tienda de música clásica Viena",
    rating: 5
  },
  {
    title: "Carmen",
    artist: "Georges Bizet",
    releaseYear: 1975,
    genre: "Clásica",
    condition: "Muy Bueno",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Ópera con la famosa 'Habanera' y 'Toreador Song'.",
    purchaseLocation: "Opera House Gift Shop",
    rating: 5
  },
  {
    title: "Piano Concerto No. 21",
    artist: "Wolfgang Amadeus Mozart",
    releaseYear: 1985,
    genre: "Clásica",
    condition: "Casi Nuevo",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&h=500&fit=crop",
    description: "Concierto para piano conocido por su segundo movimiento 'Andante'.",
    purchaseLocation: "Chandos Records",
    rating: 5
  },
  {
    title: "Swan Lake",
    artist: "Pyotr Ilyich Tchaikovsky",
    releaseYear: 1977,
    genre: "Clásica",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    description: "Ballet clásico con música icónica del romanticismo ruso.",
    purchaseLocation: "Bolshoi Theatre Store",
    rating: 5
  }
];

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando población de la base de datos...");

    // Buscar o crear usuarios para asignar los vinilos y comentarios
    let defaultUser = await User.findOne({ email: "demo2026@test.com" });
    
    if (!defaultUser) {
      console.log("📝 Creando usuario de prueba...");
      defaultUser = await User.create({
        username: "demo2026",
        email: "demo2026@test.com",
        password: "password123"
      });
      console.log("✅ Usuario creado:", defaultUser.email);
    } else {
      console.log("✅ Usuario existente encontrado:", defaultUser.email);
    }

    // Crear usuarios adicionales para comentarios
    const commentUsers = [];
    const usernames = [
      { username: "MusicLover89", email: "musiclover89@test.com" },
      { username: "VinylCollector", email: "vinylcollector@test.com" },
      { username: "AudioPhile", email: "audiophile@test.com" },
      { username: "RetroSound", email: "retrosound@test.com" },
      { username: "MelodyMaster", email: "melodymaster@test.com" }
    ];

    for (const userData of usernames) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create({
          username: userData.username,
          email: userData.email,
          password: "password123"
        });
      }
      commentUsers.push(user);
    }

    // Limpiar datos existentes
    const existingVinyls = await Vinyl.countDocuments();
    if (existingVinyls > 0) {
      console.log(`🗑️  Eliminando ${existingVinyls} vinilos existentes...`);
      await Vinyl.deleteMany({});
    }
    
    const existingComments = await Comment.countDocuments();
    if (existingComments > 0) {
      console.log(`🗑️  Eliminando ${existingComments} comentarios existentes...`);
      await Comment.deleteMany({});
    }

    // Crear los vinilos
    console.log(`\n📀 Creando ${sampleVinyls.length} vinilos...`);
    
    const vinylsWithOwner = sampleVinyls.map(vinyl => ({
      ...vinyl,
      owner: defaultUser._id
    }));

    const createdVinyls = await Vinyl.insertMany(vinylsWithOwner);
    
    console.log(`✅ ${createdVinyls.length} vinilos creados exitosamente!`);

    // Comentarios variados para agregar a los vinilos
    const commentTemplates = [
      "¡Una joya absoluta! La calidad de sonido es increíble, cada instrumento se escucha con una claridad cristalina.",
      "Este álbum nunca pasa de moda. Simplemente perfecto.",
      "Llevo años buscando este vinilo. Por fin lo tengo en mi colección y no me decepciona.",
      "La masterización en vinilo es superior a cualquier versión digital. Vale cada centavo.",
      "Un clásico atemporal. Este disco debería estar en toda colección que se respete.",
      "El sonido cálido del vinilo le da un toque especial a estas canciones. Maravilloso.",
      "Escucharlo en vinilo es una experiencia completamente diferente. Totalmente recomendado.",
      "La portada es una obra de arte y la música aún mejor. Una compra excelente.",
      "Este disco marcó una época y sigue sonando fresco hoy en día.",
      "Impresionante desde la primera hasta la última canción. No hay relleno aquí.",
      "El vinilo está en excelentes condiciones y suena espectacular. Muy satisfecho con esta adquisición.",
      "Una obra maestra del género. Esencial para cualquier amante de la buena música.",
      "No puedo dejar de escucharlo. Cada vez descubro nuevos detalles en la mezcla.",
      "La reedición en vinilo hace justicia al material original. Simplemente brillante.",
      "Finalmente conseguí una copia original. El sonido analógico no tiene comparación.",
      "Este álbum es la razón por la que comencé a coleccionar vinilos. Legendario.",
      "Producción impecable y composiciones memorables. Un disco para toda la vida.",
      "Me transporta a otra época cada vez que lo pongo. Pura nostalgia y calidad.",
      "La calidez del vinilo complementa perfectamente el estilo de este álbum. Amor puro.",
      "Uno de los mejores discos que he escuchado en años. Definitivamente un tesoro.",
      "El pressing es de alta calidad, sin ruidos ni distorsiones. Vale la pena cada peso.",
      "Compré este vinilo por recomendación y superó mis expectativas. Increíble de principio a fin.",
      "Un álbum que define su género. Revolucionario y aún relevante.",
      "La versión en vinilo resalta matices que no había notado en formato digital. Fascinante.",
      "Cada canción es un hit. No hay desperdicio en todo el tracklist.",
      "Este disco es una inversión. Su valor solo aumentará con el tiempo.",
      "El sonido análogo le da una profundidad especial a las grabaciones. Excelente elección.",
      "Me encanta cómo suena en mi tornamesa. La experiencia de escucha es inmersiva.",
      "Un álbum que nunca envejece. Tan bueno hoy como cuando salió.",
      "La combinación perfecta de letras profundas y producción impecable."
    ];

    // Agregar 2 comentarios a cada vinilo
    console.log("\n💬 Agregando comentarios a los vinilos...");
    let totalComments = 0;

    for (const vinyl of createdVinyls) {
      // Seleccionar 2 usuarios aleatorios diferentes
      const shuffledUsers = [...commentUsers].sort(() => Math.random() - 0.5);
      const selectedUsers = shuffledUsers.slice(0, 2);
      
      // Seleccionar 2 comentarios aleatorios diferentes
      const shuffledComments = [...commentTemplates].sort(() => Math.random() - 0.5);
      const selectedComments = shuffledComments.slice(0, 2);
      
      for (let i = 0; i < 2; i++) {
        await Comment.create({
          content: selectedComments[i],
          author: selectedUsers[i]._id,
          vinyl: vinyl._id
        });
        totalComments++;
      }
    }

    console.log(`✅ ${totalComments} comentarios agregados!`);
    
    // Mostrar resumen por género
    const genreCounts = {};
    createdVinyls.forEach(vinyl => {
      genreCounts[vinyl.genre] = (genreCounts[vinyl.genre] || 0) + 1;
    });
    
    console.log("\n📊 Vinilos por género:");
    Object.entries(genreCounts).forEach(([genre, count]) => {
      console.log(`   ${genre}: ${count}`);
    });

    console.log("\n🎉 ¡Base de datos poblada exitosamente!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error poblando la base de datos:", error);
    process.exit(1);
  }
}

seedDatabase();
