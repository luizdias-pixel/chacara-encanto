# Chácara Encanto

Site institucional da **Chácara Encanto**, um espaço de hospedagem e lazer próximo à natureza, com paisagem voltada para o lago, em Palmas–TO.

O projeto apresenta a chácara, sua estrutura, fotos e formas de contato para pessoas interessadas em consultar disponibilidade e solicitar um orçamento.

## Sobre o projeto

A proposta visual segue o conceito **Refúgio Tropical**, valorizando fotografias amplas, elementos naturais, organização assimétrica e uma identidade visual acolhedora, sem aparência de template genérico.

### Identidade visual

- Verde principal: `#425B3D`
- Verde-claro: `#8A9B71`
- Verde-escuro: `#26372D`
- Areia: `#F1E5D0`
- Terracota: `#C4774E`
- Branco: `#FFFDF8`
- Texto: `#41463D`
- Texto secundário: `#74776C`

Tipografia:
- Títulos: **Lora**
- Textos: **Manrope**

## Tecnologias

- HTML5
- CSS3
- JavaScript

O projeto utiliza arquivos separados para estrutura, estilos e funcionalidades.

## Estrutura de pastas

A organização pode seguir este modelo:

```text
chacara_encanto/
├── index.html
├── README.md
├── assets/
│   ├── images/
│   ├── videos/
│   └── icons/
├── css/
│   └── style.css
└── js/
    └── script.js
```

> Ajuste os caminhos acima caso os arquivos do projeto estejam organizados de outra forma.

## Funcionalidades previstas

- Apresentação da Chácara Encanto.
- Seção com informações sobre a estrutura e as acomodações.
- Destaque para a paisagem e a área de lazer.
- Carrossel de imagens e possibilidade de utilizar vídeo na área principal.
- Galeria de fotos com acesso ao álbum externo.
- Menu de navegação que altera a aparência ao rolar a página.
- Links de contato pelo WhatsApp com mensagem pré-preenchida.

## Executar localmente

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto no editor de sua preferência.
3. Abra o arquivo `index.html` no navegador.

Para uma experiência melhor durante o desenvolvimento, utilize a extensão **Live Server** no Visual Studio Code ou outro servidor local equivalente.

## Configuração do WhatsApp

Para criar um link de contato, utilize o formato:

```html
<a
  href="https://wa.me/55DDDNUMERO?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento."
  target="_blank"
  rel="noopener noreferrer"
>
  Fale conosco
</a>
```

Substitua `DDDNUMERO` pelo número da chácara, incluindo o código do país e o DDD, sem espaços, parênteses, traços ou sinal de `+`.

## Publicação

O site pode ser publicado em um serviço de hospedagem de páginas estáticas ou em uma hospedagem tradicional. Antes da publicação:

- Confira se todos os caminhos de imagens, vídeos, CSS e JavaScript estão corretos.
- Teste os links do WhatsApp e da galeria.
- Verifique a navegação em celulares e computadores.
- Otimize imagens e vídeos para reduzir o tempo de carregamento.
- Confirme se os dados de contato e as informações da chácara estão atualizados.

## Status

Projeto em desenvolvimento.
