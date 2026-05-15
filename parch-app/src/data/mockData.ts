/**
 * Parch — Mock data
 * Everything here is fake. Used only for the visual MVP.
 */

export type User = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatarTone: 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
  city: string;
  status: string;
  bio: string;
  stats: { parches: number; people: number; communities: number; stories: number };
};

export type Community = {
  id: string;
  name: string;
  vibe: string;
  city: string;
  country?: string;
  members: number;
  activeNow: number;
  nextPlan: string;
  tone: 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
  tier: 'free' | 'verified' | 'featured';
  joined?: boolean;
  tags: string[];
};

export type Parche = {
  id: string;
  title: string;
  host: string;
  city: string;
  when: string;
  vibe: string;
  maxPeople: number;
  joined: number;
  privacy: 'public' | 'private';
  community?: string;
  budget: string;
  tone: 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
};

export type MapZone = {
  id: string;
  top: string;
  left: string;
  size: number;
  tone: 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
  pulse?: boolean;
};

export type MapPin = {
  id: string;
  top: string;
  left: string;
  label: string;
  tone: 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
};

export type MapAvatar = {
  id: string;
  top: string;
  left: string;
  initials: string;
  tone: 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
  delay: number;
};

export type Story = {
  id: string;
  body: string;
  authorName: string;
  authorCity: string;
  authorInitials: string;
  authorTone: 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
  tags: string[];
  anonymous?: boolean;
};

export type CityHotspot = {
  name: string;
  country: string;
  activeNow: number;
  parches: number;
};

export type BusinessCategory = {
  id: string;
  name: string;
  icon: string;
};

/* ------------------------------------------------------------ */

export const currentUser: User = {
  id: 'u-001',
  name: 'Andrés Vélez',
  handle: '@andresv',
  initials: 'AV',
  avatarTone: 'coral',
  city: 'Sioux Falls, SD',
  status: 'Disponible hoy',
  bio: 'Estoy aquí para encontrar gente real, crear recuerdos y no quedarme quieto cuando necesito conectar.',
  stats: { parches: 14, people: 38, communities: 5, stories: 3 }
};

export const statuses: string[] = [
  'Disponible hoy',
  'Quiero plan tranquilo',
  'Nuevo en la ciudad',
  'Solo quiero hablar',
  'Quiero manejar',
  'Buscando comunidad'
];

/* ------------------------------------------------------------ */

export const filterChips: string[] = [
  'Café',
  'Comer',
  'Manejar',
  'Fútbol',
  'Gym',
  'Música',
  'Nuevo en la ciudad',
  'Latinos',
  'Plan tranquilo',
  'Solo quiero hablar'
];

/* ------------------------------------------------------------ */

export const communities: Community[] = [
  {
    id: 'c-001',
    name: 'Colombianos en USA',
    vibe: 'Patria, parche y arepa.',
    city: 'USA',
    country: 'multi-ciudad',
    members: 12480,
    activeNow: 142,
    nextPlan: 'Asado paisa · Sábado 7pm · Miami',
    tone: 'coral',
    tier: 'featured',
    joined: true,
    tags: ['Latino', 'Migrantes']
  },
  {
    id: 'c-002',
    name: 'Latinos en Sioux Falls',
    vibe: 'Pequeña ciudad, gran familia.',
    city: 'Sioux Falls, SD',
    members: 312,
    activeNow: 24,
    nextPlan: 'Café & charla · Jueves 6pm',
    tone: 'warm',
    tier: 'verified',
    joined: true,
    tags: ['Latino', 'Local']
  },
  {
    id: 'c-003',
    name: 'Night Drives',
    vibe: 'Manejar, hablar, respirar.',
    city: 'Global',
    members: 5240,
    activeNow: 89,
    nextPlan: 'Drive nocturno · Viernes 10pm',
    tone: 'cyan',
    tier: 'verified',
    tags: ['Tranquilo', 'Música']
  },
  {
    id: 'c-004',
    name: 'Nuevos en la ciudad',
    vibe: 'Aterriza suave, hermano.',
    city: 'Tu ciudad',
    members: 2110,
    activeNow: 47,
    nextPlan: 'Walk & talk · Sábado 4pm',
    tone: 'mint',
    tier: 'free',
    tags: ['Migrantes']
  },
  {
    id: 'c-005',
    name: 'Gym Bros',
    vibe: 'Levanten algo, brutos.',
    city: 'Multi',
    members: 7820,
    activeNow: 61,
    nextPlan: 'Push day · Lunes 5am',
    tone: 'coral',
    tier: 'free',
    tags: ['Gym', 'Energía']
  },
  {
    id: 'c-006',
    name: 'Coffee & Chill',
    vibe: 'Espresso doble y silencio cómodo.',
    city: 'Multi',
    members: 4310,
    activeNow: 38,
    nextPlan: 'Tarde de café · Miércoles 3pm',
    tone: 'warm',
    tier: 'free',
    tags: ['Café', 'Tranquilo']
  },
  {
    id: 'c-007',
    name: 'Fútbol los domingos',
    vibe: 'Si Dios quiere, ganamos.',
    city: 'Multi',
    members: 9120,
    activeNow: 122,
    nextPlan: 'Cascarita · Domingo 9am',
    tone: 'mint',
    tier: 'verified',
    tags: ['Fútbol', 'Latino']
  },
  {
    id: 'c-008',
    name: 'Migrantes empezando de cero',
    vibe: 'Empezar duele. Acá no estás solo.',
    city: 'Global',
    members: 6840,
    activeNow: 73,
    nextPlan: 'Círculo de historias · Domingo 8pm',
    tone: 'violet',
    tier: 'featured',
    tags: ['Migrantes', 'Apoyo']
  }
];

/* ------------------------------------------------------------ */

export const parches: Parche[] = [
  {
    id: 'p-001',
    title: 'Burgers y charlar bobadas',
    host: 'Camila R.',
    city: 'Sioux Falls',
    when: 'Hoy · 7:30pm',
    vibe: 'casual',
    maxPeople: 6,
    joined: 4,
    privacy: 'public',
    community: 'Latinos en Sioux Falls',
    budget: '$15-20',
    tone: 'coral'
  },
  {
    id: 'p-002',
    title: 'Drive nocturno por el lago',
    host: 'Juan P.',
    city: 'Sioux Falls',
    when: 'Hoy · 10:00pm',
    vibe: 'profundo',
    maxPeople: 4,
    joined: 2,
    privacy: 'public',
    community: 'Night Drives',
    budget: 'Solo gasolina',
    tone: 'cyan'
  },
  {
    id: 'p-003',
    title: 'Café de la mañana',
    host: 'Valentina',
    city: 'Sioux Falls',
    when: 'Mañana · 8:00am',
    vibe: 'tranquilo',
    maxPeople: 3,
    joined: 1,
    privacy: 'public',
    budget: '$8',
    tone: 'warm'
  }
];

/* ------------------------------------------------------------ */

export const mapZones: MapZone[] = [
  { id: 'z1', top: '18%', left: '28%', size: 180, tone: 'coral', pulse: true },
  { id: 'z2', top: '32%', left: '68%', size: 140, tone: 'violet', pulse: true },
  { id: 'z3', top: '58%', left: '22%', size: 160, tone: 'cyan', pulse: true },
  { id: 'z4', top: '68%', left: '72%', size: 130, tone: 'warm', pulse: true },
  { id: 'z5', top: '46%', left: '46%', size: 110, tone: 'mint', pulse: true }
];

export const mapPins: MapPin[] = [
  { id: 'p1', top: '22%', left: '32%', label: 'Café · 8', tone: 'coral' },
  { id: 'p2', top: '36%', left: '64%', label: 'Drive · 3', tone: 'violet' },
  { id: 'p3', top: '52%', left: '24%', label: 'Gym · 12', tone: 'cyan' },
  { id: 'p4', top: '64%', left: '54%', label: 'Fútbol · 6', tone: 'mint' },
  { id: 'p5', top: '72%', left: '76%', label: 'Comer · 5', tone: 'warm' },
  { id: 'p6', top: '44%', left: '78%', label: 'Música · 4', tone: 'coral' }
];

export const mapAvatars: MapAvatar[] = [
  { id: 'a1', top: '26%', left: '48%', initials: 'CR', tone: 'coral', delay: 0 },
  { id: 'a2', top: '42%', left: '36%', initials: 'JP', tone: 'cyan', delay: 0.8 },
  { id: 'a3', top: '58%', left: '64%', initials: 'VL', tone: 'warm', delay: 1.5 },
  { id: 'a4', top: '34%', left: '54%', initials: 'DS', tone: 'mint', delay: 2.1 },
  { id: 'a5', top: '66%', left: '36%', initials: 'AM', tone: 'violet', delay: 2.8 }
];

/* ------------------------------------------------------------ */

export const stories: Story[] = [
  {
    id: 's-001',
    body: 'Llegué nuevo a Sioux Falls hace dos meses. Pensé que no iba a conocer a nadie. Encontré mi primer grupo de latinos en Parch y ahora tengo gente con quién hablar los domingos.',
    authorName: 'Sebastián M.',
    authorCity: 'Sioux Falls, SD',
    authorInitials: 'SM',
    authorTone: 'coral',
    tags: ['Nuevo en la ciudad', 'Latino']
  },
  {
    id: 's-002',
    body: 'Después de la ruptura no quería salir de la casa. Me uní a un drive nocturno solo por curiosidad. Manejamos, hablamos pendejadas y por primera vez en semanas dormí tranquilo.',
    authorName: 'Anónimo',
    authorCity: 'Miami, FL',
    authorInitials: '··',
    authorTone: 'cyan',
    tags: ['Night Drives', 'Profundo'],
    anonymous: true
  },
  {
    id: 's-003',
    body: 'No conocía latinos cerca. Ahora tengo parche fijo los viernes. Llegué solo, me voy con familia.',
    authorName: 'Daniela P.',
    authorCity: 'Austin, TX',
    authorInitials: 'DP',
    authorTone: 'warm',
    tags: ['Latino', 'Comunidad']
  },
  {
    id: 's-004',
    body: 'Solo quería manejar y hablar. Terminé conociendo gente increíble que hoy son mis amigos reales.',
    authorName: 'Mateo G.',
    authorCity: 'Chicago, IL',
    authorInitials: 'MG',
    authorTone: 'violet',
    tags: ['Drive', 'Amistad']
  },
  {
    id: 's-005',
    body: 'Me costó dar el primer paso. Hoy soy yo la que organiza los parches del barrio.',
    authorName: 'Lina F.',
    authorCity: 'New Jersey',
    authorInitials: 'LF',
    authorTone: 'mint',
    tags: ['Líder', 'Comunidad']
  }
];

/* ------------------------------------------------------------ */

export const hotspots: CityHotspot[] = [
  { name: 'Miami', country: 'USA', activeNow: 412, parches: 38 },
  { name: 'Bogotá', country: 'Colombia', activeNow: 1240, parches: 122 },
  { name: 'Sioux Falls', country: 'USA', activeNow: 24, parches: 6 },
  { name: 'CDMX', country: 'México', activeNow: 982, parches: 88 },
  { name: 'Madrid', country: 'España', activeNow: 318, parches: 42 }
];

/* ------------------------------------------------------------ */

export const planTypes = [
  { id: 'cafe', label: 'Café', hint: 'algo corto y rico', icon: '☕' },
  { id: 'comida', label: 'Comida', hint: 'hambre con gente', icon: '🍔' },
  { id: 'manejar', label: 'Manejar y hablar', hint: 'la mejor terapia', icon: '🚗' },
  { id: 'futbol', label: 'Fútbol', hint: 'cascarita rápida', icon: '⚽' },
  { id: 'gym', label: 'Gym', hint: 'levantar algo', icon: '💪' },
  { id: 'chill', label: 'Chill', hint: 'solo existir cerca', icon: '🌙' },
  { id: 'musica', label: 'Música', hint: 'vinilos o vivo', icon: '🎶' },
  { id: 'sorpresa', label: 'No sé, sorpréndeme', hint: 'estoy abierto', icon: '✨' }
];

export const vibes = ['tranquilo', 'social', 'fiesta', 'profundo', 'casual'];

/* ------------------------------------------------------------ */

export const voteOptions = [
  { id: 'v1', label: 'Hamburguesas', votes: 4, emoji: '🍔' },
  { id: 'v2', label: 'Café', votes: 1, emoji: '☕' },
  { id: 'v3', label: 'Manejar', votes: 3, emoji: '🚗' },
  { id: 'v4', label: 'Cine', votes: 2, emoji: '🎬' },
  { id: 'v5', label: 'Fútbol', votes: 2, emoji: '⚽' },
  { id: 'v6', label: 'Bar tranquilo', votes: 1, emoji: '🍷' }
];

/* ------------------------------------------------------------ */

export const businessCategories: BusinessCategory[] = [
  { id: 'b1', name: 'Universidades', icon: '🎓' },
  { id: 'b2', name: 'Bares', icon: '🍸' },
  { id: 'b3', name: 'Cafés', icon: '☕' },
  { id: 'b4', name: 'Gimnasios', icon: '🏋️' },
  { id: 'b5', name: 'Grupos latinos', icon: '🌎' },
  { id: 'b6', name: 'Eventos', icon: '🎫' }
];

export const pricingTiers = [
  {
    id: 't1',
    tier: 'Free Community',
    price: '$0',
    period: '/ siempre',
    features: [
      'Comunidad pública',
      'Hasta 500 miembros',
      'Crear parches básicos',
      'Aparecer en búsqueda'
    ],
    highlight: false
  },
  {
    id: 't2',
    tier: 'Verified Community',
    price: '$29',
    period: '/ mes',
    features: [
      'Insignia verificada',
      'Miembros ilimitados',
      'Promocionar 2 parches al mes',
      'Analytics básicos',
      'Soporte prioritario'
    ],
    highlight: true
  },
  {
    id: 't3',
    tier: 'Featured Community',
    price: '$89',
    period: '/ mes',
    features: [
      'Aparece en el mapa',
      'Sucursales por ciudad/país',
      'Promociones ilimitadas',
      'Analytics avanzados',
      'Banner destacado',
      'Account manager'
    ],
    highlight: false
  }
];

/* ------------------------------------------------------------ */

export const safetyFeatures = [
  {
    id: 'sf1',
    title: 'Perfiles verificados',
    desc: 'Validamos identidad con documento + selfie. Los perfiles verified aparecen con check.',
    icon: 'shield'
  },
  {
    id: 'sf2',
    title: 'Reportar usuario',
    desc: 'Si alguien te incomoda, lo reportas en un tap. Revisamos en menos de 24h.',
    icon: 'flag'
  },
  {
    id: 'sf3',
    title: 'Safe Mode',
    desc: 'Solo te muestra parches en lugares públicos verificados y con mínimo 3 personas.',
    icon: 'lock'
  },
  {
    id: 'sf4',
    title: 'Lugares públicos primero',
    desc: 'Los primeros parches siempre se sugieren en cafés, parques y lugares con luz.',
    icon: 'map'
  },
  {
    id: 'sf5',
    title: 'Compartir plan con alguien',
    desc: 'Tu mejor amigo recibe el plan, ubicación y hora estimada de regreso.',
    icon: 'share'
  },
  {
    id: 'sf6',
    title: 'Moderación comunitaria',
    desc: 'Cada comunidad tiene moderadores que cuidan el ambiente y la energía del grupo.',
    icon: 'users'
  }
];

/* ------------------------------------------------------------ */

export const feelings = [
  { id: 'f1', label: 'Conocí alguien nuevo', emoji: '🤝' },
  { id: 'f2', label: 'Me sentí menos solo', emoji: '🫂' },
  { id: 'f3', label: 'Salí de casa', emoji: '🚪' },
  { id: 'f4', label: 'Me reí un rato', emoji: '😂' },
  { id: 'f5', label: 'Estuvo normal', emoji: '😐' },
  { id: 'f6', label: 'No fue para mí', emoji: '🤷' }
];
