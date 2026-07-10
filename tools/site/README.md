# Site leitor do blueprint

Gera uma versão navegável e com identidade visual do blueprint (os `.md` em `/docs` + `README.md`) como um único HTML estático em `public/blueprint.html`.

A aplicação real da plataforma vive em `src/app` (Next.js). Este leitor é mantido apenas como
referência histórica do planejamento e fica disponível em `/blueprint.html`, fora da navegação
principal e marcado `noindex`.

## Rebuild

```bash
cd tools/site
npm install
node build.mjs   # regenera ../../public/blueprint.html
```
