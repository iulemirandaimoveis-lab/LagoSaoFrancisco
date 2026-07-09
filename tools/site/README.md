# Site leitor do blueprint

Gera uma versão navegável e com identidade visual do blueprint (os `.md` em `/docs` + `README.md`) como um único HTML estático em `public/index.html`.

## Rebuild

```bash
cd tools/site
npm install
node build.mjs   # regenera ../../public/index.html
```

## Publicar no Vercel

O `vercel.json` na raiz já aponta `outputDirectory` para `public/` **sem build** — ou seja, o Vercel serve o `public/index.html` já pronto.

**Deploy via Git (1 clique):**
1. Em [vercel.com/new](https://vercel.com/new), importe o repositório `iulemirandaimoveis-lab/LagoSaoFrancisco`.
2. Framework Preset: **Other**. As configurações de `vercel.json` são aplicadas automaticamente (output `public/`, sem build).
3. Deploy → o link de preview/produção é gerado.

**Deploy via CLI:**
```bash
npm i -g vercel
vercel      # preview
vercel --prod
```

> Observação: este site é apenas o **leitor do documento**. A plataforma descrita no blueprint é o produto a ser construído conforme o roadmap (cap. 17).
