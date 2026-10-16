# Novo site do Grupo ABR

Site institucional estático desenvolvido em Astro. O servidor de produção recebe somente os arquivos de `dist/`; Node.js não é necessário na HostGator.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Verificação e build

```bash
npm run check
npm run build
node scripts/generate-sitemap.mjs
```

## Visualizar o build localmente

Não abra `dist/index.html` diretamente pelo Explorador ou pelo modo `file://` do navegador. O build usa caminhos absolutos como `/_astro/...`, equivalentes aos caminhos que funcionarão na raiz do domínio publicado.

Depois do build, execute:

```bash
npm run preview
```

Abra o endereço `http://localhost:4321/` exibido no terminal. Durante o desenvolvimento, também é possível usar `npm run dev`.

Envie **o conteúdo interno de `dist/`** para a raiz documental confirmada da hospedagem. Envie primeiro os assets e depois as páginas. Não apague arquivos antigos indiscriminadamente.

## Atualização de conteúdo

- Dados centrais de contato: `src/config.ts`
- Produtos e artigos: `src/data/content.ts`
- Banners da home: `src/pages/index.astro`
- Downloads: `src/pages/downloads.astro`
- Redirecionamentos, 404, 410, cache e HTTPS: `public/.htaccess`

## Publicação e restauração

1. Confirme a raiz documental e faça download integral do site atual para uma pasta de backup datada.
2. Gere e valide `dist/` localmente.
3. Envie assets primeiro e HTML por último.
4. Teste home, páginas internas, 404, URLs 410, WhatsApp, telefone e documentos.
5. Para restaurar, reenvie o backup datado sem alterar DNS ou e-mail.

Consulte `docs/AUDITORIA.md`, `docs/MIGRACAO.md` e `docs/PENDENCIAS.md` antes da publicação.

## Prévia no Render

O arquivo `render.yaml` configura um **Render Static Site**, adequado ao build estático do Astro:

- Build: `npm ci && npm run build`
- Diretório publicado: `dist`
- Deploy automático a cada commit na branch conectada
- Previews automáticos para pull requests

Não é necessário manter um Web Service Node em execução.
