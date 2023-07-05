
# Delivery App

Foi desenvolvido um aplicativo de delivery de bebidas.

Utilizei React para a criação da interface do usuário, Node.js com Express.js para o back-end (arquitetura MSC) e MySQL como banco de dados. O aplicativo permite aos usuários solicitar suas bebidas favoritas de forma rápida e conveniente, trazendo comodidade para suas experiências de compra.


## Funcionalidades
- Multiplataforma: Mobile, Tablet, Notebook e Desktop

#### Como consumidor:
- Visualização das bebidas.
- Adicionar bebidas ao carrinho.
- Finalizar uma compra.
- Visualizar detalhes do pedido.
- Marcar como entregue o pedido.

#### Como vendedor:
- Visualização das bebidas.
- Adicionar bebidas ao carrinho.
- Finalizar uma compra.
- Visualizar detalhes do pedido.
- Marcar um pedido como "Preparando", "Em Trânsito" ou "Entregue"

#### Como ADMIN:
- Cadastrar novos usuários.
- Excluir usuarios.
- Visualizar todos usuários ativos.



## Demonstração

<figure>
  <img src="https://github.com/lucascbb/delivery_app/assets/108954192/6bb3d4af-869f-45df-a10d-1ef4fed4973e" alt="gif do projeto na versao de celular" width="270px">
  <img src="https://github.com/lucascbb/delivery_app/assets/108954192/0e2ab8ca-7278-452a-9770-3ae2a72fe595" alt="gif do projeto na versao de tablet" width="400px">
  <img src="https://github.com/lucascbb/delivery_app/assets/108954192/5e80b369-2f99-4de3-b737-714b3de3249e" alt="gif do projeto na versao de computador" width="500px">
</figure>


## Instalação

Instale Delivery App com npm

```bash
  git clone git@github.com:lucascbb/delivery_app.git
  cd delivery_app
  npm install
  Docker-compose up -d --build
  npm run db:reset
```
- Apos seguir o passo a passo, abrir o navegador na porta 3000.
    - Email: `adm@deliveryapp.com` Senha: `--adm2@21!!--` Role: ADMIN
    - Email: `zebirita@email.com` Senha: `$#zebirita#$` Role: Consumidor
    - Email: `fulana@deliveryapp.com` Senha: `fulana@123` Role: Vendedor
## Stack utilizada

**Front-end:** HTML, CSS, Javascript, React, Redux

**Back-end:** Docker, MySQL, Node.js, express.js

**Outras:** Scrum, Trello
