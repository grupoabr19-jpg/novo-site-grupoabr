export const site = {
  name: 'Grupo ABR',
  domain: 'https://grupoabr.com.br',
  phoneDisplay: '0800 980 3054',
  phoneHref: 'tel:08009803054',
  whatsappDisplay: '(35) 99770-9232',
  whatsappNumber: '5535997709232',
  email: 'grupoabr@grupoabr.com.br',
  address: 'Rua João Simões de Carvalho, 201-A, Bloco B, Cambuí — MG',
  postalCode: '37600-000',
  instagram: 'https://www.instagram.com/grupoabr/',
  tiktok: 'https://www.tiktok.com/@grupo.abr',
  facebook: 'https://www.facebook.com/grupoabrcambui/',
  linkedin: 'https://br.linkedin.com/company/grupoabrbrasil',
  tours: {
    cambui: 'https://www.tourbrasil360.com/',
    pinheiral: 'https://www.tourbrasil360.com/'
  }
} as const;

export function whatsappLink({ interest, page, position, code }: { interest: string; page: string; position: string; code: string }) {
  const text = `Olá! Vim pelo site do Grupo ABR e gostaria de atendimento sobre ${interest}.\nOrigem: ${page}.\nBotão: ${position}.\nCódigo: ${code}.`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function departmentWhatsappLink({ number, department, page, code }: { number: string; department: string; page: string; code: string }) {
  const normalizedNumber = number.replace(/\D/g, '');
  const text = `Olá! Vim pelo site do Grupo ABR e gostaria de falar com o setor de ${department}.\nOrigem: ${page}.\nBotão: atendimento flutuante.\nCódigo: ${code}.`;
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(text)}`;
}
