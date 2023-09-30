# BEER APP 🍻

Essa é uma solução para o  [Teste full stack da Aqui Dev](https://github.com/AquiDev-com/teste-full-stack).

## Índice

- [Visão geral](#visão-geral)
- [O teste](#o-teste)
- [Como rodar](#como-rodar)
- [Docker](#docker)
- [Author](#author)

## Visão geral

### O teste

Back-end 🖥️

- Todos os endpoints de consulta de dados devem ter autenticação por webtoken ou similar.
- Deve existir validação dos dados recebidos pela API.
- O CRUD não precisa de interface, apenas o login e o cadastro

Front-end 🖌️

- Interface de login e cadastro com feedbacks para usuário ou senha incorreta.
- Listagem dos dados da Punk API v2.
- Responsividade.

### Como rodar

Clone o repositório e instale as dependências:

Front-end
```bash
cd teste-full-stack/frontend
npm install
cp .env.example .env.local # ajuste os valores de acordo com o seu ambiente
npm run dev
```

Back-end
```bash
cd teste-full-stack/backend
npm install
cp .env.example .env # ajuste os valores de acordo com o seu ambiente
npm run start
```

### Docker 🐋

⚠️ ATENÇÃO! O Docker é apenas do frontend. Antes de dar o run, certifique-se de que você está rodando o backend na sua máquina, como foi explicado acima.

Ajuste os valores de `.env.local` e então execute os comandos de `build` e `run`:

```bash
docker build -t frontend .
docker run -it --rm -p 3000:3000 frontend
```

## Author 🖋️

- github - [Andressa Viana](https://github.com/andressavianab)