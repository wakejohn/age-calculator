import { FAQItem } from '../types';

/**
 * Injects or updates JSON-LD structured data script tags in the <head>.
 */
export function injectStructuredData(faqItems: FAQItem[]) {
  if (typeof document === 'undefined') return;

  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Age Calculator',
    'url': 'https://agecalculator.app/',
    'description': 'Free, fast, and accurate online age calculator to calculate exact age in years, months, days, hours, and seconds.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://agecalculator.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Online Age Calculator Tool',
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'Browser-based age calculator with leap year accuracy, total days, hours, seconds, and next birthday countdown.'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  injectScript('json-ld-website', siteSchema);
  injectScript('json-ld-webapp', webAppSchema);
  injectScript('json-ld-faq', faqSchema);
}

function injectScript(id: string, data: object) {
  let existingScript = document.getElementById(id);
  if (!existingScript) {
    existingScript = document.createElement('script');
    existingScript.id = id;
    existingScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(existingScript);
  }
  existingScript.textContent = JSON.stringify(data);
}
