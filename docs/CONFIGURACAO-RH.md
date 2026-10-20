# Configuração do canal Trabalhe Conosco

O site usa dois recursos do Google:

- a planilha **Vagas Grupo ABR** para publicar vagas e registrar candidaturas;
- a pasta **24 - rh** para armazenar os currículos renomeados.

## Publicar ou encerrar vagas

1. Abra a planilha `Vagas Grupo ABR`.
2. Na aba `Vagas`, crie uma linha por oportunidade.
3. Preencha pelo menos `id`, `titulo`, `local`, `resumo` e `status`.
4. Use `status = ativa` para publicar, `rascunho` para preparar e `encerrada` para remover do site.
5. Separe itens de requisitos, responsabilidades e benefícios com `|`.

A aba `Instruções` contém o resumo de preenchimento. A aba `Candidaturas` recebe automaticamente os dados e o link de cada currículo.

## Ativar a integração segura

1. No Google Cloud, habilite as APIs Google Drive e Google Sheets.
2. Crie uma conta de serviço e uma chave JSON.
3. No Google Drive, altere a pasta `24 - rh` de **qualquer pessoa com o link** para **restrito**.
4. Compartilhe a pasta `24 - rh` e a planilha `Vagas Grupo ABR` como **Editor** com o e-mail `client_email` da conta de serviço.
5. No serviço `grupo-abr-careers-api` do Render, adicione o conteúdo integral do JSON na variável secreta `GOOGLE_SERVICE_ACCOUNT_JSON` e faça um novo deploy.

Nunca salve a chave JSON no repositório, em arquivos `.env` versionados ou em mensagens públicas. A API recusa uploads enquanto detectar que a pasta está pública por link.

## Comportamento do envio

- formatos aceitos: PDF, DOC, DOCX, TXT, JPG, PNG e WEBP;
- limite: 5 MB;
- nome gerado: data/hora, candidato, vaga e quatro últimos dígitos do telefone;
- cada envio recebe um protocolo;
- a candidatura só é confirmada depois que arquivo e linha da planilha forem gravados;
- há validação de assinatura do arquivo, campo antispam e limite de tentativas por IP.

Referências oficiais:

- https://developers.google.com/workspace/guides/create-credentials
- https://developers.google.com/workspace/guides/enable-apis
- https://docs.cloud.google.com/iam/docs/keys-create-delete
