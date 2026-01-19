// Script para poblar la base de datos con vinilos de prueba
require("dotenv").config();
require("./db");

const User = require("./models/User.model");
const Vinyl = require("./models/Vinyl.model");

const sampleVinyls = [
  // ROCK (10 vinilos)
  {
    title: "Abbey Road",
    artist: "The Beatles",
    releaseYear: 1969,
    genre: "Rock",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
    description: "El undécimo álbum de estudio de The Beatles, considerado una obra maestra.",
    purchaseLocation: "Tienda de discos vintage Downtown",
    rating: 5
  },
  {
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    releaseYear: 1973,
    genre: "Rock",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    description: "Una obra conceptual revolucionaria del rock progresivo.",
    purchaseLocation: "Mercado de pulgas de Brooklyn",
    rating: 5
  },
  {
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    releaseYear: 1971,
    genre: "Rock",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg",
    description: "Incluye clásicos como 'Stairway to Heaven' y 'Black Dog'.",
    purchaseLocation: "Record Store Camden",
    rating: 5
  },
  {
    title: "Rumours",
    artist: "Fleetwood Mac",
    releaseYear: 1977,
    genre: "Rock",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG",
    description: "Uno de los álbumes más vendidos de la historia del rock.",
    purchaseLocation: "Amazon Marketplace",
    rating: 5
  },
  {
    title: "The Rise and Fall of Ziggy Stardust",
    artist: "David Bowie",
    releaseYear: 1972,
    genre: "Rock",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/0/01/ZiggyStardust.jpg",
    description: "El quinto álbum de estudio de David Bowie, un álbum conceptual icónico.",
    purchaseLocation: "Discogs online",
    rating: 5
  },
  {
    title: "Nevermind",
    artist: "Nirvana",
    releaseYear: 1991,
    genre: "Rock",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    description: "El álbum que definió el grunge y la música de los 90.",
    purchaseLocation: "Urban Outfitters",
    rating: 5
  },
  {
    title: "London Calling",
    artist: "The Clash",
    releaseYear: 1979,
    genre: "Rock",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/0/00/TheClashLondonCallingalbumcover.jpg",
    description: "El tercer álbum de estudio de The Clash, un clásico del punk rock.",
    purchaseLocation: "Rough Trade Records",
    rating: 5
  },
  {
    title: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    releaseYear: 1967,
    genre: "Rock",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/4/41/VU_and_Nico.png",
    description: "Álbum debut influyente del rock alternativo.",
    purchaseLocation: "Casa de empeño local",
    rating: 4
  },
  {
    title: "OK Computer",
    artist: "Radiohead",
    releaseYear: 1997,
    genre: "Rock",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
    description: "Tercer álbum de Radiohead, aclamado por la crítica.",
    purchaseLocation: "Tienda de discos HMV",
    rating: 5
  },
  {
    title: "Highway to Hell",
    artist: "AC/DC",
    releaseYear: 1979,
    genre: "Rock",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/a/ac/Acdc_Highway_to_Hell.JPG",
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
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    description: "El álbum más vendido de todos los tiempos.",
    purchaseLocation: "Tower Records",
    rating: 5
  },
  {
    title: "Purple Rain",
    artist: "Prince",
    releaseYear: 1984,
    genre: "Pop",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/9/97/Princepurplerain.jpg",
    description: "La banda sonora de la película homónima protagonizada por Prince.",
    purchaseLocation: "Walmart",
    rating: 5
  },
  {
    title: "Pet Sounds",
    artist: "The Beach Boys",
    releaseYear: 1966,
    genre: "Pop",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/b/bb/PetSoundsCover.jpg",
    description: "Obra maestra del pop experimental de Brian Wilson.",
    purchaseLocation: "Amoeba Music LA",
    rating: 5
  },
  {
    title: "1989",
    artist: "Taylor Swift",
    releaseYear: 2014,
    genre: "Pop",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png",
    description: "El quinto álbum de estudio que marcó su transición al pop.",
    purchaseLocation: "Target",
    rating: 4
  },
  {
    title: "Like a Virgin",
    artist: "Madonna",
    releaseYear: 1984,
    genre: "Pop",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1f/Madonna_-_Like_a_Virgin.png",
    description: "El segundo álbum de estudio de Madonna que la catapultó al estrellato.",
    purchaseLocation: "Fnac",
    rating: 4
  },
  {
    title: "21",
    artist: "Adele",
    releaseYear: 2011,
    genre: "Pop",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png",
    description: "El segundo álbum que incluye 'Rolling in the Deep' y 'Someone Like You'.",
    purchaseLocation: "Best Buy",
    rating: 5
  },
  {
    title: "Bad",
    artist: "Michael Jackson",
    releaseYear: 1987,
    genre: "Pop",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
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
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg",
    description: "Uno de los álbumes de jazz más influyentes de la historia.",
    purchaseLocation: "Jazz Corner Records",
    rating: 5
  },
  {
    title: "A Love Supreme",
    artist: "John Coltrane",
    releaseYear: 1965,
    genre: "Jazz",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/7/7d/A_Love_Supreme.jpg",
    description: "Obra maestra espiritual del jazz modal.",
    purchaseLocation: "Blue Note Tokyo",
    rating: 5
  },
  {
    title: "Time Out",
    artist: "Dave Brubeck Quartet",
    releaseYear: 1959,
    genre: "Jazz",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e8/Time_Out_%28album%29.jpg",
    description: "Incluye el famoso 'Take Five' en compás de 5/4.",
    purchaseLocation: "Venta de garaje",
    rating: 5
  },
  {
    title: "The Black Saint and the Sinner Lady",
    artist: "Charles Mingus",
    releaseYear: 1963,
    genre: "Jazz",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/6/66/The_Black_Saint_and_the_Sinner_Lady.jpg",
    description: "Ballet de jazz experimental aclamado por la crítica.",
    purchaseLocation: "Etsy vintage seller",
    rating: 5
  },
  {
    title: "Ah Um",
    artist: "Charles Mingus",
    releaseYear: 1959,
    genre: "Jazz",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/c/ce/Mingus_Ah_Um.jpg",
    description: "Incluye la clásica 'Goodbye Pork Pie Hat'.",
    purchaseLocation: "Librería con sección de discos",
    rating: 5
  },
  {
    title: "Ella and Louis",
    artist: "Ella Fitzgerald & Louis Armstrong",
    releaseYear: 1956,
    genre: "Jazz",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/5/57/Ella_and_Louis.jpg",
    description: "Colaboración histórica entre dos leyendas del jazz.",
    purchaseLocation: "Tienda de antigüedades",
    rating: 5
  },
  {
    title: "Head Hunters",
    artist: "Herbie Hancock",
    releaseYear: 1973,
    genre: "Jazz",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/e/ea/Head_Hunters_%28album%29.jpg",
    description: "Álbum pionero del jazz fusion con elementos funk.",
    purchaseLocation: "Record Store Day edición especial",
    rating: 4
  },

  // ELECTRONIC (7 vinilos)
  {
    title: "Random Access Memories",
    artist: "Daft Punk",
    releaseYear: 2013,
    genre: "Electronic",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
    description: "El cuarto álbum de estudio del dúo francés de música electrónica.",
    purchaseLocation: "Fnac",
    rating: 4
  },
  {
    title: "Discovery",
    artist: "Daft Punk",
    releaseYear: 2001,
    genre: "Electronic",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png",
    description: "El segundo álbum de estudio de Daft Punk con 'One More Time'.",
    purchaseLocation: "Virgin Megastore",
    rating: 4
  },
  {
    title: "Selected Ambient Works 85-92",
    artist: "Aphex Twin",
    releaseYear: 1992,
    genre: "Electronic",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/4/48/Aphex_Twin_-_Selected_Ambient_Works_85-92.png",
    description: "Álbum seminal de música electrónica ambient.",
    purchaseLocation: "Bleep.com",
    rating: 5
  },
  {
    title: "Music for Airports",
    artist: "Brian Eno",
    releaseYear: 1978,
    genre: "Electronic",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/3/3f/BrianEnoAmbient1.jpg",
    description: "Primer álbum de la serie Ambient, música generativa.",
    purchaseLocation: "Colección privada",
    rating: 5
  },
  {
    title: "Homework",
    artist: "Daft Punk",
    releaseYear: 1997,
    genre: "Electronic",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9c/Daft_Punk_-_Homework.png",
    description: "Álbum debut que definió el French house.",
    purchaseLocation: "Fnac París",
    rating: 4
  },
  {
    title: "Cross",
    artist: "Justice",
    releaseYear: 2007,
    genre: "Electronic",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a0/Justice-cross-album-cover.jpg",
    description: "Álbum debut del dúo francés de electro house.",
    purchaseLocation: "Ed Banger Records",
    rating: 4
  },
  {
    title: "Immunity",
    artist: "Jon Hopkins",
    releaseYear: 2013,
    genre: "Electronic",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/0/05/Jon_Hopkins_-_Immunity.jpg",
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
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e8/Dr_Dre_The_Chronic.jpg",
    description: "Álbum debut de Dr. Dre, fundamental en el desarrollo del G-funk.",
    purchaseLocation: "Fat Beats NYC",
    rating: 5
  },
  {
    title: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    releaseYear: 1998,
    genre: "Hip-Hop",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Lauryn_Hill_-_The_Miseducation_of_Lauryn_Hill.png",
    description: "Álbum debut en solitario ganador de múltiples Grammy.",
    purchaseLocation: "Tienda de discos Harlem",
    rating: 5
  },
  {
    title: "Illmatic",
    artist: "Nas",
    releaseYear: 1994,
    genre: "Hip-Hop",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg",
    description: "Considerado uno de los mejores álbumes de hip-hop de todos los tiempos.",
    purchaseLocation: "A1 Records",
    rating: 5
  },
  {
    title: "Ready to Die",
    artist: "The Notorious B.I.G.",
    releaseYear: 1994,
    genre: "Hip-Hop",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9a/Ready_to_Die.jpg",
    description: "Álbum debut del legendario rapero de Brooklyn.",
    purchaseLocation: "Tienda de discos Brooklyn",
    rating: 5
  },
  {
    title: "The Blueprint",
    artist: "Jay-Z",
    releaseYear: 2001,
    genre: "Hip-Hop",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4f/Jay-Z_-_The_Blueprint.png",
    description: "Sexto álbum de estudio de Jay-Z con producción de Kanye West.",
    purchaseLocation: "Def Jam Store",
    rating: 5
  },
  {
    title: "good kid, m.A.A.d city",
    artist: "Kendrick Lamar",
    releaseYear: 2012,
    genre: "Hip-Hop",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Good_Kid%2C_M.A.A.D_City.png",
    description: "Segundo álbum de estudio conceptual sobre Compton.",
    purchaseLocation: "Urban Outfitters",
    rating: 5
  },
  {
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    releaseYear: 1993,
    genre: "Hip-Hop",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/6/63/Wu-TangClanEntertheWu-Tangalbumcover.jpg",
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
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/7/73/Back-to-Black-Amy-Winehouse.png",
    description: "El segundo y último álbum de estudio de Amy Winehouse.",
    purchaseLocation: "HMV Londres",
    rating: 5
  },
  {
    title: "What's Going On",
    artist: "Marvin Gaye",
    releaseYear: 1971,
    genre: "R&B",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Marvin_Gaye_-_What%27s_Going_On.png",
    description: "Un álbum conceptual sobre temas sociales y ambientales.",
    purchaseLocation: "Motown Records",
    rating: 5
  },
  {
    title: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    releaseYear: 1976,
    genre: "R&B",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e2/Songs_in_the_key_of_life.jpg",
    description: "Obra maestra del soul y R&B de Stevie Wonder.",
    purchaseLocation: "Tienda de discos Detroit",
    rating: 5
  },
  {
    title: "Channel Orange",
    artist: "Frank Ocean",
    releaseYear: 2012,
    genre: "R&B",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg",
    description: "Álbum debut en solitario aclamado por la crítica.",
    purchaseLocation: "Urban Outfitters",
    rating: 5
  },
  {
    title: "The Chronic",
    artist: "SZA",
    releaseYear: 2017,
    genre: "R&B",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/0/02/SZA_-_Ctrl_cover.png",
    description: "Álbum debut de SZA con un sonido R&B contemporáneo.",
    purchaseLocation: "Amazon",
    rating: 4
  },
  {
    title: "Voodoo",
    artist: "D'Angelo",
    releaseYear: 2000,
    genre: "R&B",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/5/53/Voodoo_%28D%27Angelo_album%29.jpg",
    description: "Segundo álbum que definió el neo-soul.",
    purchaseLocation: "Amoeba Music",
    rating: 5
  },
  {
    title: "Confessions",
    artist: "Usher",
    releaseYear: 2004,
    genre: "R&B",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/7/78/Usher-Confessions-Intl.jpg",
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
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg",
    description: "Considerado uno de los mejores álbumes de thrash metal.",
    purchaseLocation: "Rasputin Music",
    rating: 5
  },
  {
    title: "Paranoid",
    artist: "Black Sabbath",
    releaseYear: 1970,
    genre: "Metal",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/6/64/Black_Sabbath_-_Paranoid.png",
    description: "Segundo álbum que definió el heavy metal.",
    purchaseLocation: "Tienda de discos Birmingham",
    rating: 5
  },
  {
    title: "The Number of the Beast",
    artist: "Iron Maiden",
    releaseYear: 1982,
    genre: "Metal",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/3/32/IronMaiden_NumberOfBeast.jpg",
    description: "Tercer álbum y el primero con Bruce Dickinson.",
    purchaseLocation: "Mercado de Camden",
    rating: 5
  },
  {
    title: "Reign in Blood",
    artist: "Slayer",
    releaseYear: 1986,
    genre: "Metal",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/8/81/Reign_in_blood.jpg",
    description: "Álbum icónico de thrash metal de 29 minutos.",
    purchaseLocation: "Metal Blade Records",
    rating: 5
  },
  {
    title: "Rust in Peace",
    artist: "Megadeth",
    releaseYear: 1990,
    genre: "Metal",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dc/Megadeth-RustInPeace.jpg",
    description: "Cuarto álbum con complejas composiciones técnicas.",
    purchaseLocation: "Capitol Records",
    rating: 5
  },
  {
    title: "Holy Diver",
    artist: "Dio",
    releaseYear: 1983,
    genre: "Metal",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d2/Dio_-_Holy_Diver_%28album_cover%29.jpg",
    description: "Álbum debut de la banda de Ronnie James Dio.",
    purchaseLocation: "Tienda de discos especializada metal",
    rating: 5
  },
  {
    title: "Painkiller",
    artist: "Judas Priest",
    releaseYear: 1990,
    genre: "Metal",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e6/Painkiller.jpg",
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
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/3/3c/Bob_Marley_and_the_Wailers_-_Legend.jpg",
    description: "La recopilación más vendida de Bob Marley.",
    purchaseLocation: "Island Records Store",
    rating: 5
  },
  {
    title: "Catch a Fire",
    artist: "Bob Marley & The Wailers",
    releaseYear: 1973,
    genre: "Reggae",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4a/CatchaFire.jpg",
    description: "Álbum debut internacional de Bob Marley.",
    purchaseLocation: "Tuff Gong Store Jamaica",
    rating: 5
  },
  {
    title: "Exodus",
    artist: "Bob Marley & The Wailers",
    releaseYear: 1977,
    genre: "Reggae",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/f/ff/Bob_Marley_and_the_Wailers_Exodus.jpg",
    description: "Noveno álbum con clásicos como 'Jamming' y 'Three Little Birds'.",
    purchaseLocation: "Tienda de discos Kingston",
    rating: 5
  },
  {
    title: "Toots in Memphis",
    artist: "Toots & The Maytals",
    releaseYear: 1988,
    genre: "Reggae",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Toots_In_Memphis.jpg",
    description: "Álbum grabado en los legendarios Stax Studios.",
    purchaseLocation: "Shangri-La Records Memphis",
    rating: 4
  },
  {
    title: "Equal Rights",
    artist: "Peter Tosh",
    releaseYear: 1977,
    genre: "Reggae",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Peter_Tosh_-_Equal_Rights.jpg",
    description: "Tercer álbum en solitario del ex-Wailer.",
    purchaseLocation: "Tienda de discos vintage",
    rating: 5
  },
  {
    title: "Two Sevens Clash",
    artist: "Culture",
    releaseYear: 1977,
    genre: "Reggae",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/7/7c/Two_Sevens_Clash.jpg",
    description: "Álbum roots reggae profético sobre 1977.",
    purchaseLocation: "Honest Jon's Londres",
    rating: 5
  },
  {
    title: "Marcus Garvey",
    artist: "Burning Spear",
    releaseYear: 1975,
    genre: "Reggae",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e8/Burning_Spear_-_Marcus_Garvey_%28album_cover%29.jpg",
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
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b2/JoniMitchellBlue.jpg",
    description: "Considerado uno de los mejores álbumes de folk de todos los tiempos.",
    purchaseLocation: "Grimey's New & Preloved Music",
    rating: 5
  },
  {
    title: "The Freewheelin' Bob Dylan",
    artist: "Bob Dylan",
    releaseYear: 1963,
    genre: "Folk",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/7/72/Bob_Dylan_-_The_Freewheelin%27_Bob_Dylan.jpg",
    description: "Segundo álbum con 'Blowin' in the Wind'.",
    purchaseLocation: "Village Vinyl Greenwich",
    rating: 5
  },
  {
    title: "Astral Weeks",
    artist: "Van Morrison",
    releaseYear: 1968,
    genre: "Folk",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e8/Astral_Weeks.jpg",
    description: "Segundo álbum en solitario, obra maestra del folk místico.",
    purchaseLocation: "Tower Records Dublin",
    rating: 5
  },
  {
    title: "The Times They Are a-Changin'",
    artist: "Bob Dylan",
    releaseYear: 1964,
    genre: "Folk",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0f/Bob_Dylan_-_The_Times_They_Are_a-Changin%27.jpg",
    description: "Tercer álbum con canciones de protesta social.",
    purchaseLocation: "Feria de discos usados",
    rating: 5
  },
  {
    title: "Harvest",
    artist: "Neil Young",
    releaseYear: 1972,
    genre: "Folk",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4f/Harvest_%28Neil_Young_album_-_cover_art%29.jpg",
    description: "Cuarto álbum con 'Heart of Gold' y 'Old Man'.",
    purchaseLocation: "Amoeba Music San Francisco",
    rating: 5
  },
  {
    title: "Court and Spark",
    artist: "Joni Mitchell",
    releaseYear: 1974,
    genre: "Folk",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/8/81/JoniMitchell-CourtAndSpark_%28album_cover%29.jpg",
    description: "Sexto álbum con fusión de folk, jazz y pop.",
    purchaseLocation: "Aquarius Records",
    rating: 5
  },
  {
    title: "Goodbye Yellow Brick Road",
    artist: "Elton John",
    releaseYear: 1973,
    genre: "Folk",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8d/Elton_John_-_Goodbye_Yellow_Brick_Road_%28album_cover%29.jpg",
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
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/6/63/JohnnyCashAtFolsom.jpg",
    description: "Álbum en vivo grabado en la prisión de Folsom.",
    purchaseLocation: "Ernest Tubb Record Shop Nashville",
    rating: 5
  },
  {
    title: "Red Headed Stranger",
    artist: "Willie Nelson",
    releaseYear: 1975,
    genre: "Country",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/9/99/WillieNelsonRedHeadedStranger.jpg",
    description: "Álbum conceptual que definió el outlaw country.",
    purchaseLocation: "Waterloo Records Austin",
    rating: 5
  },
  {
    title: "Coat of Many Colors",
    artist: "Dolly Parton",
    releaseYear: 1971,
    genre: "Country",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/en/7/70/Dolly_Parton_-_Coat_of_Many_Colors.png",
    description: "Octavo álbum con la autobiográfica canción título.",
    purchaseLocation: "Tienda de discos Nashville",
    rating: 5
  },
  {
    title: "I Walk the Line",
    artist: "Johnny Cash",
    releaseYear: 1964,
    genre: "Country",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c6/Johnny_Cash-I_Walk_the_Line.jpg",
    description: "Álbum recopilatorio con su primer gran éxito.",
    purchaseLocation: "Sun Studio Memphis",
    rating: 5
  },
  {
    title: "Will the Circle Be Unbroken",
    artist: "Nitty Gritty Dirt Band",
    releaseYear: 1972,
    genre: "Country",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/1/15/Will_the_Circle_Be_Unbroken_%28album%29.jpg",
    description: "Triple álbum colaborativo con leyendas del country.",
    purchaseLocation: "Gruhn Guitars Nashville",
    rating: 4
  },
  {
    title: "Golden Hour",
    artist: "Kacey Musgraves",
    releaseYear: 2018,
    genre: "Country",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8a/Golden_Hour_%28Kacey_Musgraves%29.png",
    description: "Cuarto álbum ganador del Grammy al Álbum del Año.",
    purchaseLocation: "Urban Outfitters",
    rating: 4
  },
  {
    title: "The Essential Johnny Cash",
    artist: "Johnny Cash",
    releaseYear: 2002,
    genre: "Country",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/en/9/97/Essential_Johnny_Cash.jpg",
    description: "Doble álbum recopilatorio de sus mejores canciones.",
    purchaseLocation: "Amazon",
    rating: 5
  },

  // CLASSICAL (7 vinilos)
  {
    title: "The Four Seasons",
    artist: "Antonio Vivaldi (Interpretación moderna)",
    releaseYear: 1989,
    genre: "Classical",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vivaldi.jpg/440px-Vivaldi.jpg",
    description: "Ciclo de cuatro conciertos para violín, una de las obras más populares del barroco. Grabación remasterizada.",
    purchaseLocation: "Deutsche Grammophon Store",
    rating: 5
  },
  {
    title: "Symphony No. 9",
    artist: "Ludwig van Beethoven",
    releaseYear: 1963,
    genre: "Classical",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/440px-Beethoven.jpg",
    description: "La última sinfonía completa con el famoso 'Ode to Joy'. Grabación histórica.",
    purchaseLocation: "Arkiv Music",
    rating: 5
  },
  {
    title: "Requiem Mass in D minor",
    artist: "Wolfgang Amadeus Mozart",
    releaseYear: 1967,
    genre: "Classical",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Croce-Mozart-Detail.jpg/440px-Croce-Mozart-Detail.jpg",
    description: "Misa de réquiem inacabada, obra maestra coral. Grabación clásica.",
    purchaseLocation: "Naxos Records",
    rating: 5
  },
  {
    title: "The Well-Tempered Clavier",
    artist: "Johann Sebastian Bach",
    releaseYear: 1972,
    genre: "Classical",
    condition: "Good",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Johann_Sebastian_Bach.jpg/440px-Johann_Sebastian_Bach.jpg",
    description: "Colección de preludios y fugas en todas las tonalidades. Interpretación Glenn Gould.",
    purchaseLocation: "Tienda de música clásica Viena",
    rating: 5
  },
  {
    title: "Carmen",
    artist: "Georges Bizet",
    releaseYear: 1975,
    genre: "Classical",
    condition: "Very Good",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Georges_bizet.jpg/440px-Georges_bizet.jpg",
    description: "Ópera con la famosa 'Habanera' y 'Toreador Song'. Grabación completa.",
    purchaseLocation: "Opera House Gift Shop",
    rating: 5
  },
  {
    title: "Piano Concerto No. 21",
    artist: "Wolfgang Amadeus Mozart",
    releaseYear: 1985,
    genre: "Classical",
    condition: "Near Mint",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Croce-Mozart-Detail.jpg/440px-Croce-Mozart-Detail.jpg",
    description: "Concierto para piano conocido por su segundo movimiento 'Andante'.",
    purchaseLocation: "Chandos Records",
    rating: 5
  },
  {
    title: "Swan Lake",
    artist: "Pyotr Ilyich Tchaikovsky",
    releaseYear: 1977,
    genre: "Classical",
    condition: "Mint",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tchaikovsky.jpg/440px-Tchaikovsky.jpg",
    description: "Ballet clásico con música icónica del romanticismo ruso.",
    purchaseLocation: "Bolshoi Theatre Store",
    rating: 5
  }
];

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando población de la base de datos...");

    // Buscar o crear un usuario por defecto para asignar los vinilos
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

    // Limpiar vinilos existentes (opcional)
    const existingVinyls = await Vinyl.countDocuments();
    if (existingVinyls > 0) {
      console.log(`🗑️  Eliminando ${existingVinyls} vinilos existentes...`);
      await Vinyl.deleteMany({});
    }

    // Crear los vinilos
    console.log(`\n📀 Creando ${sampleVinyls.length} vinilos...`);
    
    const vinylsWithOwner = sampleVinyls.map(vinyl => ({
      ...vinyl,
      owner: defaultUser._id
    }));

    const createdVinyls = await Vinyl.insertMany(vinylsWithOwner);
    
    console.log(`\n✅ ${createdVinyls.length} vinilos creados exitosamente!`);
    
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
