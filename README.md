# Portfólio React — João Paulo | SAP SD Analyst

Site em React (Vite), inspirado no layout do valentincheval.design — barra lateral fixa, tipografia bold, dark theme, foto de perfil no hero e seções com animação.

---

## 🗂️ Estrutura do projeto

```
portfolio-react/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx          ← conteúdo do site (textos, seções)
│   ├── App.css           ← estilos
│   ├── index.css         ← estilos globais
│   └── assets/
│       └── foto-perfil.jpeg   ← sua foto
```

---

## 💻 Passo 1 — Rodar localmente (testar antes de subir)

Você precisa ter o **Node.js** instalado ([baixe aqui](https://nodejs.org), versão LTS).

1. Baixe e extraia esta pasta `portfolio-react` no seu computador
2. Abra o terminal **dentro** da pasta `portfolio-react`
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode o site localmente:
   ```bash
   npm run dev
   ```
5. Abra o link que aparecer no terminal (algo como `http://localhost:5173`)

Você vai ver o site rodando com sua foto, textos e animações. Edite o `src/App.jsx` à vontade — o navegador atualiza sozinho.

---

## 🚀 Passo 2 — Criar o repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"**
3. Nomeie como `portfolio` (ou outro nome de sua escolha)
4. Deixe **público**
5. **Não** marque "Add a README" (já temos um)
6. Clique em **"Create repository"**

---

## 📤 Passo 3 — Subir o código para o GitHub

No terminal, dentro da pasta `portfolio-react`:

```bash
git init
git add .
git commit -m "primeiro commit: portfólio react"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portfolio.git
git push -u origin main
```

> Troque `SEU_USUARIO` pelo seu usuário do GitHub.

---

## 🌐 Passo 4 — Publicar com GitHub Pages

Como é um projeto React (precisa de build), o jeito mais simples é usar o pacote `gh-pages`:

1. Instale o pacote de deploy:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Abra o `package.json` e adicione a linha `"homepage"` e os scripts de deploy:
   ```json
   {
     "homepage": "https://SEU_USUARIO.github.io/portfolio",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Rode o deploy:
   ```bash
   npm run deploy
   ```

4. No GitHub, vá em **Settings → Pages**
5. Em "Source", selecione a branch **gh-pages** / pasta **/ (root)**
6. Salve

Em ~1 minuto seu site estará no ar em:
`https://SEU_USUARIO.github.io/portfolio/`

---

## ✏️ Personalização

Abra `src/App.jsx` e troque:
- `seuemail@email.com` → seu e-mail real (aparece 2x)
- Links de **LinkedIn** e **GitHub** (aparecem 2x cada)
- Textos das seções **Carreira** (`TIMELINE`) com suas experiências reais
- Textos de **Projetos** (`PROJECTS`) se quiser ajustar

Para trocar a foto, é só substituir o arquivo `src/assets/foto-perfil.jpeg` por outra imagem com o mesmo nome (ou trocar o nome no import no topo do `App.jsx`).

---

## ❓ Problemas comuns

- **`npm: command not found`** → instale o Node.js primeiro
- **Página em branco no GitHub Pages** → confira se `vite.config.js` tem `base: './'` (já está configurado neste projeto)
- **CSS não carrega** → confira se fez o build antes do deploy (`npm run deploy` já faz isso automaticamente)
