# App

Generic Project style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [ ] Deve ser possível recuperar a senha;
- [x] Deve ser possível obter o perfil de um usuário logado;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder se cadastrar com um telefone duplicado;
- [ ] O usuário deve ser maior de idade para se cadastrar;
- [ ] O cliente não pode fazer 2 corridas ao mesmo tempo;
- [ ] O motorista deve aceitar 2 corridas ao mesmo tempo;
- [ ] O cliente pode recuperar a senha via email por um código de validação de 6 dígitos;
- [ ] O cliente pode recuperar a senha via celular por um código de validação de 6 dígitos;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
