let trator;
let caixa;
let produtoAtual;
let cidade;
let pontuacao = 0;
let carregando = false;
let vidas = 3;
let gameOver = false;
let estado = 'capa';
let modoAtual = 'normal';
let direcaoTrator = 'right';

let plantacoes = [];
let animais = [];
let carros = [];
let arvores = [];
let produtosRestantes = [];

const predios = ['🏢', '🏬', '🏭', '🏨', '🏦', '🏣'];
const produtosFazenda = ['🌽', '🥛', '🥕', '🍎', '🍅'];
const destinoEntrega = {
  '🌽': '🏢',
  '🥛': '🏬',
  '🥕': '🏭',
  '🍎': '🏨',
  '🍅': '🏦'
};

function setup() {
  createCanvas(600, 400);
  textAlign(LEFT, TOP);
  textSize(32);
  trator = createVector(100, 300);
  produtosRestantes = shuffle([...produtosFazenda]);
  produtoAtual = produtosRestantes.pop();
  caixa = createVector(random(100, 400), random(100, 300));
  cidade = createVector(450, 100);
  gerarCenario();
}

function draw() {
  background(144, 238, 144);
  textSize(32);

  if (estado === 'capa') {
    mostrarCapa();
    return;
  } else if (estado === 'historia') {
    mostrarHistoria();
    return;
  } else if (estado === 'comoJogar') {
    mostrarComoJogar();
    return;
  } else if (estado === 'modoSelecionado') {
    mostrarSelecaoModo();
    return;
  }

  if (gameOver) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    if (vidas <= 0) {
      text("💀 GAME OVER 💀", width / 2, height / 2 - 40);
    } else {
      text("🏆 Você venceu! 🏆", width / 2, height / 2 - 40);
      text("Entregas completadas com sucesso!", width / 2, height / 2);
    }
    textSize(20);
    text("Aperte 'P' para reiniciar", width / 2, height / 2 + 50);
    return;
  }

  drawFazenda();
  drawCidade();

  push();
  translate(trator.x, trator.y);
  if (direcaoTrator === 'left') {
    scale(-1, 1);
    text('🚜', -24, 0);
  } else {
    text('🚜', 0, 0);
  }
  pop();

  if (!carregando) {
    text(produtoAtual, caixa.x, caixa.y);
  }

  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Use as setas para mover o trator', 10, 20);
  text('Pontuação: ' + pontuacao, 10, 40);
  text('Vidas: ' + vidas, 10, 60);
  if (carregando) {
    text('Entregue em: ' + destinoEntrega[produtoAtual], 10, 80);
  }

  if (!carregando && dist(trator.x, trator.y, caixa.x, caixa.y) < 40) {
    carregando = true;
  }

  if (carregando && estaNoPredioCorreto(trator.x, trator.y, destinoEntrega[produtoAtual])) {
    pontuacao++;
    carregando = false;

    if (produtosRestantes.length > 0) {
      produtoAtual = produtosRestantes.pop();
      caixa = createVector(random(100, 400), random(100, 300));
    } else {
      gameOver = true;
    }
  }

  for (let carro of carros) {
    carro.mover();
    carro.mostrar();
    if (dist(trator.x, trator.y, carro.x, carro.y) < 32) {
      perderVida();
      break;
    }
  }

  for (let animal of animais) {
    animal.pos.x += random(-0.5, 0.5);
    animal.pos.y += random(-0.5, 0.5);
    animal.pos.x = constrain(animal.pos.x, 0, 400);
    animal.pos.y = constrain(animal.pos.y, 60, height - 40);
    textSize(32);
    text(animal.tipo, animal.pos.x, animal.pos.y);
    if (dist(trator.x, trator.y, animal.pos.x, animal.pos.y) < 32) {
      perderVida();
      break;
    }
  }
}

function keyPressed() {
  if (estado === 'capa' && keyCode === ENTER) {
    estado = 'historia';
    return;
  }

  if (estado === 'historia' && keyCode === ENTER) {
    estado = 'comoJogar';
    return;
  }

  if (estado === 'comoJogar' && keyCode === ENTER) {
    estado = 'modoSelecionado';
    return;
  }

  if (estado === 'modoSelecionado') {
    if (key === '1') {
      modoAtual = 'normal';
      estado = 'jogando';
    } else if (key === '2') {
      modoAtual = 'dificil';
      estado = 'jogando';
      for (let i = 0; i < 5; i++) {
        carros.push(new Carro(random(20, height - 40)));
      }
    }
    return;
  }

  if (gameOver && (key === 'p' || key === 'P')) {
    reiniciarJogo();
    return;
  }

  if (!gameOver) {
    if (keyCode === LEFT_ARROW) {
      trator.x -= 10;
      direcaoTrator = 'left';
    }
    if (keyCode === RIGHT_ARROW) {
      trator.x += 10;
      direcaoTrator = 'right';
    }
    if (keyCode === UP_ARROW) {
      trator.y -= 10;
    }
    if (keyCode === DOWN_ARROW) {
      trator.y += 10;
    }

    trator.x = constrain(trator.x, 0, width - 32);
    trator.y = constrain(trator.y, 0, height - 32);
  }
}

function estaNoPredioCorreto(x, y, emoji) {
  for (let i = 0; i < predios.length; i++) {
    let px = cidade.x + 10;
    let py = 20 + i * 50;
    if (predios[i] === emoji && dist(x, y, px, py) < 40) {
      return true;
    }
  }
  return false;
}

function drawFazenda() {
  textSize(32);
  for (let p of plantacoes) {
    text('🌾', p.x, p.y);
  }
  for (let a of arvores) {
    text('🌳', a.x, a.y);
  }
}

function drawCidade() {
  fill(200);
  rect(400, 0, 200, height);
  textSize(32);
  for (let i = 0; i < predios.length; i++) {
    let emoji = predios[i];
    let y = 20 + i * 50;
    text(emoji, cidade.x + 10, y);

    let produto = Object.keys(destinoEntrega).find(p => destinoEntrega[p] === emoji);
    if (produto) {
      text(produto + " → " + emoji, cidade.x + 45, y + 5);
    }
  }
}

function gerarCenario() {
  plantacoes = [];
  animais = [];
  carros = [];
  arvores = [];

  for (let i = 0; i < 10; i++) {
    plantacoes.push(createVector(random(0, 400), random(60, height - 40)));
  }

  for (let i = 0; i < 8; i++) {
    let tipo = random() < 0.5 ? '🐄' : '🐓';
    let pos;
    do {
      pos = createVector(random(0, 400), random(60, height - 40));
    } while (dist(pos.x, pos.y, 100, 300) < 60); // ZONA SEGURA DO TRATOR
    animais.push({ tipo, pos });
  }

  for (let i = 0; i < 5; i++) {
    let y;
    do {
      y = random(20, height - 40);
    } while (dist(550, y, 100, 300) < 60); // evita colisão com trator
    carros.push(new Carro(y));
  }

  for (let i = 0; i < 7; i++) {
    arvores.push(createVector(random(0, 400), random(60, height - 40)));
  }
}

function perderVida() {
  vidas--;
  trator = createVector(100, 300);
  if (vidas <= 0) {
    gameOver = true;
  }
}

function reiniciarJogo() {
  pontuacao = 0;
  vidas = 3;
  carregando = false;
  produtosRestantes = shuffle([...produtosFazenda]);
  produtoAtual = produtosRestantes.pop();
  trator = createVector(100, 300);
  caixa = createVector(random(100, 400), random(100, 300));
  gerarCenario();
  gameOver = false;
  estado = 'jogando';
}

function mostrarCapa() {
  background(0, 180, 100);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(36);
  text("🌾🚜 Missão: Colheita e Entrega 🚛🌇", width / 2, height / 2 - 80);
  textSize(22);
  text("Agrinho 2025 - A Conexão que Alimenta o Brasil 🇧🇷🌍", width / 2, height / 2 - 30);
  textSize(20);
  text("Pressione ENTER para continuar 👉", width / 2, height / 2 + 30);
}

function mostrarHistoria() {
  background(255, 255, 204);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(26);
  text("🎉 Uma Festa no Campo e na Cidade! 🏡🏙️", width / 2, 60);
  textSize(18);
  text("Na Fazenda Esperança, tudo é colhido com amor. 🌽🍅", width / 2, 120);
  text("Com seu trator veloz, você entrega na cidade. 🚜", width / 2, 150);
  text("Famílias comemoram com os alimentos fresquinhos! 🥳", width / 2, 180);
  text("Pressione ENTER para saber como jogar 🎮", width / 2, 240);
}

function mostrarComoJogar() {
  background(200, 230, 255);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(24);
  text("📖 COMO JOGAR:", width / 2, 40);
  textSize(18);
  text("1️⃣ Use as setas para mover o trator 🚜", width / 2, 80);
  text("2️⃣ Pegue os produtos da fazenda 🌽🥛🥕🍎🍅", width / 2, 110);
  text("3️⃣ Entregue nos prédios indicados:", width / 2, 140);
  text("   🌽 → 🏢   🥛 → 🏬   🥕 → 🏭", width / 2, 170);
  text("   🍎 → 🏨   🍅 → 🏦", width / 2, 200);
  text("4️⃣ Cuidado com os animais 🐄🐓 e carros 🚗", width / 2, 230);
  text("5️⃣ Faça todas as entregas para vencer 🏆", width / 2, 260);
  text("Pressione ENTER para escolher o modo 🎮", width / 2, 300);
}

function mostrarSelecaoModo() {
  background(255, 230, 230);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(24);
  text("Escolha um modo de jogo:", width / 2, height / 2 - 60);
  textSize(20);
  text("1️⃣ Modo Normal - Obstáculos moderados", width / 2, height / 2 - 20);
  text("2️⃣ Modo Difícil - Mais obstáculos e desafios", width / 2, height / 2 + 20);
  text("Pressione 1 ou 2 para começar", width / 2, height / 2 + 60);
}

class Carro {
  constructor(y) {
    this.x = random(460, 580);
    this.y = y;
    this.velocidade = random(1, 2.5);
  }

  mover() {
    this.x -= this.velocidade;
    if (this.x < 450) {
      this.x = 600;
      this.y = random(20, height - 40);
    }
  }

  mostrar() {
    textSize(32);
    text('🚗', this.x, this.y);
  }
}