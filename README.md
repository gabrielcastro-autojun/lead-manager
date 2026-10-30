# Lead Manager

eu quero um app que 1) listar os leads da tabela do supabase (esta tabela do supabase tem uma coluna pra empresas, outra para valor, e outra para etapa; 2) que tenha um formulário para adicionar mais leads; 3) um seletor para mudar a etapa em q a lead está

This project was built with [Lovable](https://lovable.dev).

PERGUNTAS CHALLENGE: A IA sugeriu utilizar a database do lovable ao invés do supabase e também sugeriu criar mais de 3 possibilidades de classificação de etapas, para ter mais especificação da etapa que estamos. Ambas eu não aceitei a sugestão pois não fazem parte do que foi pedido neste desafio. 

"Onde este dado fica guardado?" - o dado adicionado no aplicativo fica guardado no banco de dados criado no supabase, assim mesmo que houver um novo acesso no aplicativo, ele abre os mesmos dados.

"o que acontece se eu apagar esta linha no Supabase?" - se a linha que contém a empresa for apagada, ela não aparecerá mais nem no aplicativo nem no banco de dados.

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9e4028cc-bdb7-51ae-93eb-5a867622c03e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
