import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4123;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'advocacy-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 4 }
  })
);

const heroPlans = [
  {
    title: 'Start',
    price: 'R$ 147/mês',
    perks: ['Consultas via WhatsApp', 'Revisão de 1 contrato'],
    slug: 'start'
  },
  {
    title: 'Business Turbo',
    price: 'R$ 497/mês',
    perks: ['Consultas ilimitadas', 'Blindagem contratual', 'Suporte 24h'],
    slug: 'business'
  },
  {
    title: 'Enterprise',
    price: 'R$ 997/mês',
    perks: ['Compliance digital', 'Defesa judicial', 'Gestão de IP'],
    slug: 'enterprise'
  }
];

const services = [
  { icon: 'fa-building', title: 'Direito Empresarial', description: 'Blindagem patrimonial, fusões e aquisições e gestão estratégica de contratos corporativos.' },
  { icon: 'fa-laptop-code', title: 'Direito Digital', description: 'LGPD, incidentes cibernéticos e proteção de propriedade intelectual online.' },
  { icon: 'fa-briefcase', title: 'Trabalhista PJ', description: 'Consultoria para contratações, demissões e redução de passivo trabalhista.' },
  { icon: 'fa-hand-holding-usd', title: 'Direito Tributário', description: 'Planejamento tributário e recuperação de créditos fiscais.' },
  { icon: 'fa-users', title: 'Direito de Família', description: 'Inventários, divórcios e planejamento sucessório com discrição.' },
  { icon: 'fa-shield-alt', title: 'Compliance', description: 'Programas de integridade para negócios digitais.' }
];

const testimonyPeople = [
  { name: 'Eduardo Raymond Beniste', quote: 'Especialista em Direito Tributário e Blindagem de Ativos PJ.', image: 'Eduardo.jpeg' },
  { name: 'Alisson Suassuna', quote: 'Líder de Operações Digitais e contratos internacionais.', image: 'Alisson.png' },
  { name: 'Dra. Beatriz Lima', quote: 'Expert em LGPD e Compliance Empresarial.', image: 'mulher.png' }
];

const paymentOptions = [
  { method: 'Hotmart', icon: 'fa-bolt', color: '#f04e23', description: 'Venda automática com checkout Hotmart.' },
  { method: 'PicPay', icon: 'fa-mobile', color: '#31ce61', description: 'QrCode rápido e conciliação diária.' },
  { method: 'Pix / Bancos', icon: 'fa-credit-card', color: '#5c6ac4', description: 'Pix, TED e boletos com integração ao seu banco.' }
];

const lawyersDirectory = [
  { name: 'Dra. Beatriz Lima', oab: 'OAB/RJ 31540', specialty: 'LGPD & Compliance', availability: 'Segundas & Quartas' },
  { name: 'Dr. Alisson Suassuna', oab: 'OAB/SP 08763', specialty: 'Direito Empresarial Digital', availability: 'Terças & Quintas' },
  { name: 'Dra. Mirella Cortez', oab: 'OAB/RJ 40211', specialty: 'Societário e Contratos', availability: 'Sextas' }
];

const appointmentChannels = ['Chat seguro', 'Vídeo call', 'Atendimento presencial', 'Revisão de documentos'];

const postCategories = ['LGPD', 'Direito Empresarial', 'Consultoria PJ'];
const samplePosts = [
  { title: 'Proteja os dados do seu negócio digital', status: 'Publicado', category: 'LGPD', summary: 'Checklist para startups seguirem a LGPD antes de captar investidores.' },
  { title: 'Modelos de contratos remotos', status: 'Rascunho', category: 'Consultoria PJ', summary: 'Automatize assinaturas eletrônicas e evite cláusulas vagas.' }
];
const sampleComments = [
  { author: 'Cliente Demo', excerpt: 'Conteúdo direto ao ponto, ajudou no planejamento.' },
  { author: 'Advogado Demo', excerpt: 'Inspiração para o painel de comunicação interna.' }
];

const userDirectory = [
  { name: 'Eduardo Ramon Venini', role: 'Admin', status: 'Ativo', lastLogin: '16/03/2026' },
  { name: 'Cliente Demo', role: 'Cliente', status: 'Em atendimento', lastLogin: '15/03/2026' },
  { name: 'Advogado Demo', role: 'Advogado', status: 'Online', lastLogin: '16/03/2026' }
];
const userRoles = ['cliente', 'advogado', 'admin'];

app.use((req, res, next) => {
  res.locals.sessionUser = req.session.user || null;
  next();
});

app.get('/', (req, res) => {
  res.render('pages/index', {
    heroPlans,
    services,
    testimonyPeople,
    paymentOptions
  });
});

app.get('/agendar', (req, res) => {
  res.render('pages/agendar', {
    lawyersDirectory,
    appointmentChannels
  });
});

app.get('/contato', (req, res) => {
  res.render('pages/contato', {
    services
  });
});

app.get('/login', (req, res) => {
  res.render('pages/login', { error: '' });
});

app.post('/login', (req, res) => {
  req.session.user = { name: 'Eduardo', role: 'admin' };
  res.redirect('/painel');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.get('/cadastrar', (req, res) => {
  res.render('pages/cadastrar');
});

app.post('/cadastrar', (req, res) => {
  res.render('pages/cadastrar', { message: 'Cadastro recebido. Verifique seu e-mail.' });
});

app.get('/painel', (req, res) => {
  res.render('pages/painel');
});

app.get('/post', (req, res) => {
  res.render('pages/post', {
    postCategories,
    samplePosts,
    sampleComments
  });
});

app.get('/usuario', (req, res) => {
  res.render('pages/usuario', {
    userDirectory,
    userRoles
  });
});

app.post('/agendar', (req, res) => {
  res.render('pages/painel', { notification: 'Agenda criada com sucesso.' });
});

app.post('/contato', (req, res) => {
  res.render('pages/index', {
    heroPlans,
    services,
    testimonyPeople,
    paymentOptions,
    contatoMessage: 'Recebemos seu contato. Retornaremos em até 24h.'
  });
});

app.listen(port, () => {
  console.log(`Adv Turbo server listening on http://localhost:${port}`);
});


