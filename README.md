# 🌾🚜 Missão: Colheita e Entrega 🚛🌇

> **Agrinho 2025 - A Conexão que Alimenta o Brasil 🇧🇷🌍**

---

## 📌 Sobre o Projeto

**“Missão: Colheita e Entrega”** é um jogo digital educativo criado com a linguagem **JavaScript** e a biblioteca **p5.js**, desenvolvido especialmente para o projeto **Agrinho 2025**. O objetivo é promover a consciência sobre a importância do campo na vida das pessoas que vivem nas cidades, através de uma experiência interativa, divertida e acessível.

Neste jogo, o jogador assume o papel de um tratorista que colhe produtos na fazenda e os entrega em prédios da cidade, enfrentando desafios e obstáculos ao longo do caminho.

---

## 💡 Explicando o Jogo em Palavras

### 🌱 O que é o projeto?

**“Missão: Colheita e Entrega”** é mais do que um simples jogo: é uma simulação educativa da **importância da agricultura familiar e da integração entre campo e cidade**. Através da linguagem visual e interativa dos emojis, o jogo representa a jornada do alimento — do plantio até a mesa das famílias urbanas.

Criado com o tema do **Agrinho 2025 – “A Conexão que Alimenta o Brasil”**, ele reforça como todos nós dependemos do trabalho rural para viver bem.

---

### 🎮 Como funciona o jogo?

- O jogador controla um **trator agrícola** (🚜) que se movimenta com as **setas do teclado**.
- O trator deve **coletar alimentos** espalhados na fazenda: 🌽, 🥛, 🥕, 🍎, 🍅.
- Cada produto tem um **prédio correspondente na cidade** onde precisa ser entregue:
  - 🌽 → 🏢
  - 🥛 → 🏬
  - 🥕 → 🏭
  - 🍎 → 🏨
  - 🍅 → 🏦
- Durante o trajeto, o trator precisa **evitar animais da fazenda** (🐄 e 🐓) e **carros** (🚗).
- A cada colisão, o jogador **perde uma vida**.
- O jogo termina quando todas as entregas são feitas corretamente (vitória 🏆) ou quando todas as vidas acabam (game over 💀).

---

### 🧠 O que o jogo ensina?

- A **cadeia produtiva do alimento**, da fazenda até a cidade.
- A importância da **agricultura no cotidiano urbano**.
- O valor do **trabalho no campo**.
- Noções de **atenção, estratégia, direção e associação simbólica** (como relacionar ícones e funções).

---

## 🕹️ Como Jogar

1. Use as **setas do teclado** para mover o trator: ⬆️⬇️⬅️➡️.
2. **Colete** um produto da fazenda (ex: 🌽).
3. Veja qual é o prédio correspondente (ex: 🌽 → 🏢).
4. **Leve o produto** até o prédio certo e evite os obstáculos.
5. **Cuidado com animais e carros!** Se colidir, perde uma vida.
6. Após entregar todos os produtos corretamente, você vence.
7. Se perder todas as vidas, é “game over”.
8. Pressione **P** para reiniciar a qualquer momento após o fim.

---

## 🧩 Modos de Jogo

- **Modo Normal (1️⃣):** Obstáculos em quantidade equilibrada.
- **Modo Difícil (2️⃣):** Mais carros, mais desafio!

---

## 🧱 Tecnologias Utilizadas

- **Linguagem:** JavaScript
- **Biblioteca gráfica:** [p5.js](https://p5js.org/)
- **Interface gráfica:** baseada em **emojis Unicode**
- **Execução:** roda direto no navegador (sem necessidade de instalação)

---

## 📁 Estrutura do Jogo

O código está organizado em funções claras:

- `setup()`: configura a tela e os elementos iniciais.
- `draw()`: executa continuamente o jogo.
- `keyPressed()`: lida com os comandos do teclado.
- `mostrarCapa()`, `mostrarHistoria()`, `mostrarComoJogar()`, `mostrarSelecaoModo()`: telas de introdução.
- `gerarCenario()`: distribui plantações, animais, árvores e carros.
- `Carro`: classe para criar os obstáculos móveis da cidade.
- `perderVida()` e `reiniciarJogo()`: controle de vidas e reinício.

---

## 🖼️ Visuais e Emojis

Todo o jogo é montado com **emojis**, que representam:

- **Veículos:** 🚜 (trator), 🚗 (carros)
- **Produtos agrícolas:** 🌽, 🥛, 🥕, 🍎, 🍅
- **Obstáculos:** 🐄, 🐓
- **Prédios urbanos:** 🏢, 🏬, 🏭, 🏨, 🏦, 🏣

---

## 👩‍💻 Quem criou

Projeto desenvolvido por [Maria Eduarda], como contribuição educativa para o **Agrinho 2025**.

Esse jogo une criatividade, programação e consciência social, trazendo o campo para o mundo digital de forma lúdica.

---

## 🚀 Como Executar

### 🖥️ Rodar no navegador (recomendado)

1. Acesse: [editor.p5js.org](https://editor.p5js.org/)
2. Cole todo o código do jogo.
3. Clique em ▶️ **Executar**.

### 💻 Rodar localmente

1. Crie um arquivo `index.html`.
2. Adicione:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
<script src="seu_jogo.js"></script>
