![](https://i.imgur.com/xG74tOh.png)

# Desafio Back-end

## Back-end

### Api

Seu papel é construir uma RESTful API que permita:

-   Fazer Login
-   Cadastrar um usuário
-   Detalhar Usuário
-   Editar Perfil do Usuário
-   Listar produtos
-   Detalhar produtos
-   Cadastrar produtos
-   Editar produtos
-   Remover produtos

**Importante: Lembre-se sempre que cada usuário só pode ver e manipular seus próprios dados e seus próprios produtos. Não atender a este pré-requisito é uma falha de segurança gravíssima!**

**Importante 2: Sempre que forem enviados dados inválidos, responda com códigos de erro e mensagens adequadas a situação, ok?**

### Banco de dados

Você precisa criar um Banco de Dados PostgreSQL chamado `market_cubos` contendo as seguintes tabelas:

-   usuarios
    -   id
    -   nome
    -   nome_loja (o nome da loja deste vendedor)
    -   email
    -   senha
-   produtos
    -   id
    -   usuario_id
    -   nome
    -   estoque
    -   categoria
    -   preco
    -   descricao
    -   imagem (deve ser um campo de texto - um link para uma imagem na web)

## Requisitos obrigatórios

-   Sua API precisa se conectar com o banco de dados para armazenar as informações
-   O campo `id` das tabelas no banco de dados precisa ser auto incremento, chave primária e não deve permitir edição uma vez criado.
-   Seu código deve estar organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, é esperado que ele tenha, no mínimo:
    -   Um arquivo index.js
    -   Um arquivo de conexão com o banco de dados
    -   Um arquivo de rotas
    -   Um pasta com controladores
-   Evite códigos duplicados. Antes de copiar e colar, pense se não faz sentido esse pedaço de código estar centralizado numa função.

## Endpoints obrigatórios

#### `POST` `/usuarios`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

Ela deverá:

-   Validar se o e-mail informado já existe
-   Validar os campos obrigatórios:
    -   nome
    -   email
    -   senha
    -   nome_loja
-   Criptografar a senha antes de salvar no banco de dados
-   Cadastrar o usuario no banco de dados

Exemplo do body a ser enviado:

```
{
    "nome": "Fulano de Tal",
    "email": "fulano@email.com",
    "senha": "teste",
    "nome_loja": "Loja do Fulano"
}
```

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

Ela deverá:

-   Verificar se o e-mail existe
-   Validar e-mail e senha
-   Criar token de autenticação com id do usuário
-   Retornar um objeto com os dados do usuario (sem a senha) e o token criado

Exemplo do body a ser enviado:

```
{
    "email": "fulano@email.com",
    "senha": "teste"
}
```

Exemplo de resposta da API:

```
{
    "usuario": {
        "id": 1,
        "nome": "Fulano de Tal",
        "email": "fulano@email.com",
        "nome_loja": "Loja do Fulano"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

## ATENÇÃO: Todas as rotas abaixo deverão exigir o token do usuário logado. Portanto, para cada implementação será necessário validar o token informado.

#### `GET` `/perfil`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil

Ela deverá:

-   Consultar usuário no banco de dados pelo id contido no token informado
-   Retornar um objeto com as informações do usuário exceto a senha

Exemplo de resposta da API:

```
{
    "id": 1,
    "nome": "Fulano de Tal",
    "email": "fulano@email.com",
    "nome_loja": "Loja do Fulano"
}
```

#### `PUT` `/perfil`

Essa é a rota que será chamada quando o usuário quiser salvar alterações no seu próprio perfil

Ela deverá:

-   Validar se o e-mail já existe no banco de dados, caso o email seja diferente do usuário atual
    -   Caso já exista um e-mail igual no banco de dados, a alteração não deve ser permitida (o campo de email deve ser sempre único de banco de dados)
-   Validar os campos obrigatórios:
    -   nome
    -   email
    -   senha
    -   nome_loja
-   Atualizar os dados do usuário

Exemplo do body a ser enviado:

```
{
    "nome": "Fulano de Tal",
    "email": "fulano@email.com",
    "senha": "teste",
    "nome_loja": "Loja do Fulano"
}
```

#### `GET` `/produtos`

Essa é a rota que será chamada quando o usuario logado quiser listar todos os seus produtos cadastrados

Ela deverá:

-   Listar todos os produtos do usuario logado e devolver no formato de `array` de produtos;
-   Filtrar produtos por `categoria`.

Exemplo de resposta da API:

```
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Camisa preta",
        "estoque": 12,
        "categoria": "Camisa",
        "preco": 4990,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "Camisa azul",
        "estoque": 8,
        "categoria": "Camisa",
        "preco": 4490,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    }
]
```

#### `GET` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter um dos seus produtos cadastrados

Ela deverá:

-   Buscar o produto no banco de dados pelo id informado na rota
-   Validar se o produto existe e se pertence ao usuário logado
-   Retornar um objeto com as informações do produto

Exemplo de resposta da API

```
{
    "id": 2,
    "usuario_id": 1,
    "nome": "Camisa azul",
    "estoque": 8,
    "categoria": "Camisa",
    "preco": 4490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### `POST` `/produtos`

Essa é a rota que será chamada quando o usuario quiser cadastrar um produto atrelado ao seu próprio cadastro

Ela deverá:

-   Validar os campos obrigatórios:
    -   nome
    -   estoque
    -   preco
    -   descricao
-   Cadastrar o produto no banco de dados para o id do usuario logado

Exemplo do body a ser enviado:

```
{
    "nome": "Camisa amarela",
    "estoque": 20,
    "categoria": "Camisa",
    "preco": 5490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### `PUT` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar um dos seus produtos cadastrados

Ela deverá:

-   Buscar o produto no banco de dados pelo id informado na rota
-   Validar se o produto existe e se pertence ao usuário logado
-   Validar os campos obrigatórios:
    -   nome
    -   estoque
    -   preco
    -   descricao
-   Atualizar o produto no banco de dados

Exemplo do body a ser enviado:

```
{
    "nome": "Camisa amarela",
    "estoque": 20,
    "categoria": "Camisa",
    "preco": 5490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### `DELETE` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir um dos seus produtos cadastrados

Ela deverá:

-   Validar se o produto existe e se pertence ao usuário logado
-   Deletar o produto do banco de dados

## Implementações opcionais

1. Criar um middleware (filtro) para verificar todas as rotas que necessitam de token do usuario logado.
2. Filtrar produtos por faixa de preço

---

Api de Exemplo: https://desafio-m03.herokuapp.com

Obs.: A collection do insomnia está anexada a esse repositório.

**LEMBRE-SE**: Feito é melhor que perfeito!!!

###### tags: `back-end` `front-end` `nodeJS` `PostgreSQL` `API REST` `desafio`
