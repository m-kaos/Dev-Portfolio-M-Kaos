import type { CategoryCopyMap, ServiceCopyMap } from './types';

export const SERVICE_CATEGORIES_ES: CategoryCopyMap = {
  web: { label: 'Web', blurb: 'Sitios y aplicaciones, desde un arreglo puntual hasta una plataforma completa.' },
  extras: { label: 'Complementos', blurb: 'Piezas que se montan sobre un sitio que ya tienes.' },
  retainer: { label: 'Iguala', blurb: 'Trabajo continuo con una cuota mensual fija.' },
  email: { label: 'Correo', blurb: 'Campañas y flujos que siguen vendiendo después de la visita.' },
  ai: { label: 'Agentes de IA', blurb: 'Agentes que operan el negocio, no solo conversan.' },
};

export const SERVICES_ES: ServiceCopyMap = {
  repair: { name: 'Reparación o cambio', note: 'Un sitio que ya existe con una falla o un cambio puntual.' },
  translation: { name: 'Traducción del sitio', note: 'Tu sitio necesita funcionar en otro idioma.' },
  migration: { name: 'Migración', note: 'Cambiar de plataforma u hosting sin perder posicionamiento.' },
  landing: { name: 'Landing page', note: 'Una sola oferta, una sola acción.' },
  multipage: { name: 'Sitio multipágina', note: 'Un sitio institucional o de servicios con varias secciones.' },
  storePlatform: { name: 'E-commerce en Shopify o Wix', note: 'Una tienda en plataforma, lista para vender.' },
  storeCustom: { name: 'E-commerce a la medida', note: 'La plataforma no alcanza, o quieres control total.' },
  storeDashboard: { name: 'Panel de e-commerce', note: 'Ver tus ventas y editar contenido sin entrar a la plataforma.' },
  webApp: { name: 'Aplicación web', note: 'Un CRM o ERP a la medida, un integrador todo en uno, tu propia IA.' },
  integrationDashboard: { name: 'Panel de integración', note: 'Google, tu CRM, tu ERP y tu calendario en un solo lugar.' },

  booking: { name: 'Agendación de citas', note: 'El visitante aparta su cita solo, directo en tu calendario.' },
  payments: { name: 'Pasarela de pago', note: 'Cobrar con tarjeta desde tu propio sitio.' },
  formToCrm: { name: 'Formulario a CRM', note: 'Cada prospecto entra a tu CRM, nunca a un correo olvidado.' },
  quoterFormula: { name: 'Cotizador de fórmula', note: 'El visitante obtiene un precio con tu propia fórmula.' },
  quoterApi: { name: 'Cotizador con API', note: 'Cotizaciones en vivo desde un servicio externo.' },
  seo: { name: 'SEO', note: 'Que te encuentren por lo que de verdad vendes.' },
  pixels: { name: 'Píxeles configurados', note: 'Que tus anuncios por fin midan lo que pasa después del clic.' },
  autoBlog: { name: 'Blog automático', note: 'Artículos que se publican en calendario, revisados antes de salir.' },
  autoMetrics: { name: 'Métricas automatizadas', note: 'Los números llegan solos, el día que tú elijas.' },
  webAgent: { name: 'Agente de IA web', note: 'Un chatbot en tu sitio que atiende y guía a los visitantes.' },

  retainer: { name: 'Iguala mensual', note: 'Cinco horas de cambios al mes, más mantenimiento, servidores y dominio.' },

  emailSingle: { name: 'Correo HTML', note: 'Una campaña diseñada, probada en Gmail y Outlook.' },
  emailPack: { name: 'Paquete de cuatro correos', note: 'Cuatro campañas al mes, escritas y enviadas.' },
  emailFlows: { name: 'Flujos de correo', note: 'Carrito abandonado, bienvenida, nurture o reactivación, funcionando solos.' },
  emailSetup: { name: 'Setup completo de mail marketing', note: 'Autenticación del dominio, listas y primeros flujos, desde cero.' },

  aiAgent: { name: 'Agente de IA a la medida', note: 'Un agente de WhatsApp conectado a tu CRM, tus hojas o tu calendario.' },
  aiPlatform: { name: 'Plataforma extra', note: 'Una plataforma más conectada a tu agente.' },
  aiPdf: { name: 'Manejo de PDF', note: 'El agente lee y llena tus documentos.' },
  aiVoiceIn: { name: 'Procesamiento de voz', note: 'El agente entiende notas de voz.' },
  aiVoiceOut: { name: 'Contestación por voz', note: 'El agente responde hablando.' },
  aiImages: { name: 'Generación de imágenes', note: 'El agente crea imágenes cuando se las piden.' },
  aiEmailSending: { name: 'Envío de correos', note: 'El agente envía correos por ti.' },
  aiCustomApi: { name: 'API personalizada', note: 'Tu propia API para que cualquier sistema le hable.' },
};
