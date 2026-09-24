import type { CategoryCopyMap, ServiceCopyMap } from './types';

export const SERVICE_CATEGORIES_FR: CategoryCopyMap = {
  web: { label: 'Web', blurb: 'Sites et applications, du correctif ponctuel à la plateforme complète.' },
  extras: { label: 'Compléments', blurb: 'Des modules qui se greffent sur un site existant.' },
  retainer: { label: 'Forfait', blurb: 'Un suivi continu à tarif mensuel fixe.' },
  email: { label: 'E-mail', blurb: 'Des campagnes et des flux qui vendent après la visite.' },
  ai: { label: 'Agents IA', blurb: "Des agents qui font tourner l'entreprise, pas seulement la conversation." },
};

export const SERVICES_FR: ServiceCopyMap = {
  repair: { name: 'Réparation ou modification', note: 'Un site existant avec une panne ou un changement ponctuel.' },
  translation: { name: 'Traduction du site', note: 'Votre site doit fonctionner dans une autre langue.' },
  migration: { name: 'Migration', note: "Changer de plateforme ou d'hébergement sans perdre votre référencement." },
  landing: { name: 'Landing page', note: 'Une seule offre, une seule action.' },
  multipage: { name: 'Site multipage', note: 'Un site institutionnel ou de services à plusieurs sections.' },
  storePlatform: { name: 'E-commerce sur Shopify ou Wix', note: 'Une boutique sur plateforme, prête à vendre.' },
  storeCustom: { name: 'E-commerce sur mesure', note: 'La plateforme ne suffit plus, ou vous voulez le contrôle total.' },
  storeDashboard: { name: 'Tableau de bord e-commerce', note: 'Voir vos ventes et modifier le contenu sans entrer dans la plateforme.' },
  webApp: { name: 'Application web', note: 'Un CRM ou ERP sur mesure, un intégrateur tout-en-un, votre propre IA.' },
  integrationDashboard: { name: "Tableau de bord d'intégration", note: 'Google, votre CRM, votre ERP et votre agenda au même endroit.' },

  booking: { name: 'Prise de rendez-vous', note: 'Le visiteur réserve lui-même son créneau, directement dans votre agenda.' },
  payments: { name: 'Passerelle de paiement', note: 'Encaisser par carte depuis votre propre site.' },
  formToCrm: { name: 'Formulaire vers CRM', note: 'Chaque prospect arrive dans votre CRM, jamais dans une boîte oubliée.' },
  quoterFormula: { name: 'Simulateur de devis', note: 'Le visiteur obtient un prix selon votre propre formule.' },
  quoterApi: { name: 'Devis par API', note: 'Des devis en direct depuis un service externe.' },
  seo: { name: 'SEO', note: 'Être trouvé pour ce que vous vendez vraiment.' },
  pixels: { name: 'Pixels configurés', note: 'Vos annonces mesurent enfin ce qui se passe après le clic.' },
  autoBlog: { name: 'Blog automatisé', note: 'Des articles publiés selon un calendrier, relus avant parution.' },
  autoMetrics: { name: 'Rapports automatisés', note: 'Les chiffres arrivent seuls, le jour que vous choisissez.' },
  webAgent: { name: 'Agent IA web', note: 'Un chatbot sur votre site qui répond et guide les visiteurs.' },

  retainer: { name: 'Forfait mensuel', note: 'Cinq heures de modifications par mois, plus maintenance, serveurs et domaine.' },

  emailSingle: { name: 'E-mail HTML', note: 'Une campagne conçue et testée dans Gmail et Outlook.' },
  emailPack: { name: 'Pack de quatre e-mails', note: 'Quatre campagnes par mois, rédigées et envoyées.' },
  emailFlows: { name: 'Flux e-mail', note: 'Panier abandonné, bienvenue, nurture ou réactivation, en autonomie.' },
  emailSetup: { name: 'Mise en place e-mail complète', note: 'Authentification du domaine, listes et premiers flux, depuis zéro.' },

  aiAgent: { name: 'Agent IA sur mesure', note: 'Un agent WhatsApp relié à votre CRM, vos tableurs ou votre agenda.' },
  aiPlatform: { name: 'Plateforme supplémentaire', note: 'Une plateforme de plus connectée à votre agent.' },
  aiPdf: { name: 'Traitement de PDF', note: 'Lit et remplit vos documents.' },
  aiVoiceIn: { name: 'Compréhension vocale', note: 'Comprend les notes vocales.' },
  aiVoiceOut: { name: 'Réponse vocale', note: 'Répond à voix haute.' },
  aiImages: { name: "Génération d'images", note: 'Crée des images à la demande.' },
  aiEmailSending: { name: "Envoi d'e-mails", note: 'Envoie des e-mails en votre nom.' },
  aiCustomApi: { name: 'API personnalisée', note: 'Votre propre API pour que tout système puisse lui parler.' },
};
