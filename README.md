# API RESTFULL de Clientes

---

## Conteúdo

Foi desenvolvido uma API restfull com endpoint de usuário para criação e autenticação:

---

## Instalação

### 1. Adicionar enveroments

Para a aplicação rodar ela precisa de credenciais do MongoDB local ou Atras.

Estas Credenciais devem estar armazenados no enveroment **.env**, assim como no arquivo .env.exemple:

```
MONGODB_URL=
MONGODB_USER=
MONGODB_PASSWORD=
```

### 2. Instalação de dependências

Dentro da raiz do projeto rodar o seguinte comando:

```sh
npm install
```

ou

```sh
yarn
```

### 4. Instalação de dependências

Os Comandos para iniciar a API são:

```sh
npm run build
npm run start
```

ou

```sh
yarn build
yarn start
```

### Endpoints:

- {{HOST}}:{{PORT}}/client/create => Criação de cliente:
  Formato de requisição:

```json
{
  "email": "mail@mail.com",
  "password": "password"
}
```

- {{HOST}}:{{PORT}}/client/login => Login de Cliente:
  Formato de requisição:

```json
{
  "email": "mail@mail.com",
  "password": "password"
}
```
