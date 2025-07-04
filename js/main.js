const nameText = "Gustavo Novais";
const roleTexts = {
  pt: "Desenvolvedor Web - Front End",
  en: "Web Developer - Front End"
};
const speed = 100;

const typedName = document.getElementById("typed-name");
const typedRole = document.getElementById("typed-role");

let charIndex = 0;
let currentLang = 'pt';

function typeName() {
  if (typedName && typedRole) {
    if (charIndex < nameText.length) {
      typedName.textContent += nameText.charAt(charIndex);
      charIndex++;
      setTimeout(typeName, speed);
    } else {
      charIndex = 0;
      typedRole.textContent = "";
      setTimeout(typeRole, speed + 300);
    }
  }
}

function typeRole() {
  if (charIndex === 0) typedRole.textContent = "";

  const roleText = roleTexts[currentLang];

  if (charIndex < roleText.length) {
    typedRole.textContent += roleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, speed);
  }
}

const translations = {
  pt: {
    "intro-p": "Olá! Me chamo Gustavo Lima Novais, graduando em Análise e Desenvolvimento de Sistemas pela Estácio, e desenvolvedor web Front-end.",
    "sobre-title": "Sobre mim",
    "sobre-p1": "Tenho uma trajetória de cerca de 3 anos trabalhando com suporte técnico e manutenção de computadores. Isso me tornou um profissional ágil, organizado e com forte perfil de resolução de problemas.",
    "sobre-p2": "Atualmente atuo com suporte técnico, mas busco minha transição para o desenvolvimento web, com o objetivo de me tornar, em breve, um desenvolvedor Full Stack.",
    "projetos-title": "Projetos",
    "proj1-title": "Dashboard de Estudos",
    "proj1-desc": "Sistema para acompanhamento de estudos com anotações e progresso.",
    "proj2-title": "Agendamentos Online",
    "proj2-desc": "Sistema de agendamentos responsivo para Studio de massagem",
    "contato-title": "Contato",
    "contato-p": "Estou disponível para novas oportunidades e projetos!",
    "themeToggle": "🌗 Tema",
    "langToggle": "EN"
  },
  en: {
    "intro-p": "Hello! My name is Gustavo Lima Novais, currently studying Systems Analysis and Development at Estácio, and a Front-end web developer.",
    "sobre-title": "About me",
    "sobre-p1": "I have about 3 years of experience working with technical support and computer maintenance. This made me an agile, organized professional with a strong problem-solving profile.",
    "sobre-p2": "Currently, I work with technical support but aim to transition to web development, with the goal of becoming a Full Stack developer soon.",
    "projetos-title": "Projects",
    "proj1-title": "Study Dashboard",
    "proj1-desc": "System to track study progress with notes and achievements.",
    "proj2-title": "Online Scheduling",
    "proj2-desc": "Responsive Scheduling System for Massage Studio",
    "contato-title": "Contact",
    "contato-p": "I am available for new opportunities and projects!",
    "themeToggle": "🌗 Theme",
    "langToggle": "PT"
  }
};

const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');

langToggle.addEventListener('click', () => {
  
  currentLang = currentLang === 'pt' ? 'en' : 'pt';


  for (const [id, text] of Object.entries(translations[currentLang])) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }

  charIndex = 0;
  typedRole.textContent = "";
  typeRole();

  
  langToggle.textContent = translations[currentLang].langToggle;
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      if (entry.target.id === "projetos") {
        const projetos = entry.target.querySelectorAll(".projeto");
        projetos.forEach((projeto, index) => {
          setTimeout(() => {
            projeto.style.opacity = "1";
            projeto.style.transform = "translateY(0)";
          }, index * 150);
        });
      }
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const fontSize = 16;
let lettersDark = "01";
let lettersLight = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let currentLetters = lettersDark;

function resizeCanvas() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  columns = canvas.width / fontSize;
  drops = Array(Math.floor(columns)).fill(1);
}

let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawMatrix() {
  if (document.body.classList.contains("light-mode")) {
    ctx.fillStyle = "rgba(240, 244, 248, 0.08)";
    currentLetters = lettersLight;
  } else {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    currentLetters = lettersDark;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = document.body.classList.contains("light-mode") ? "#444" : "#00ffff";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = currentLetters.charAt(Math.floor(Math.random() * currentLetters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

let matrixIntervalId = setInterval(drawMatrix, 50);


function toggleTheme() {
  document.body.classList.toggle("light-mode");

  if (themeToggle) {
    themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 100);
  }

  clearInterval(matrixIntervalId);
  drawMatrix();
  matrixIntervalId = setInterval(drawMatrix, 50);
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}


const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileNav.classList.toggle("open");
    document.body.style.overflow = mobileNav.classList.contains("open") ? "hidden" : "";
  });
}

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    menuToggle?.classList.remove("active");
    mobileNav?.classList.remove("open");
    document.body.style.overflow = "";
  });
});

document.querySelectorAll("section.container, .projeto").forEach(element => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    element.style.setProperty("--mouse-x", `${x}px`);
    element.style.setProperty("--mouse-y", `${y}px`);
  });
});


document.querySelectorAll("a, button").forEach(button => {
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.98)";
  });

  button.addEventListener("mouseup", () => {
    button.style.transform = "";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  if (typedName && typedRole) {
    typedName.textContent = "";
    typedRole.textContent = "";
    typeName();
  }

  const images = ["img/gustavo.jpg", "img/projeto1.png", "img/projeto2.png"];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});


if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
  document.body.classList.add("light-mode");
}
document.getElementById('btnDownloadCurriculo').addEventListener('click', function (e) {
  e.preventDefault();

  fetch('docs/CV_Gustavo_Novais.pdf')
    .then(response => {
      if (!response.ok) {
        alert("Arquivo de currículo não encontrado.");
        return;
      }

      const link = document.createElement('a');
      link.href = 'docs/CV_Gustavo_Novais.pdf';
      link.download = 'CV_Gustavo_Novais.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(() => {
      alert("Erro ao tentar baixar o currículo.");
    });
});
