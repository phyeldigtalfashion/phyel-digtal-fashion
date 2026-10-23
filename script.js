// 语言字典对象 (Trilingual Dictionary)
const translations = {
    en: {
        hero_title: "THE ARCHIVE OF SILHOUETTE & CHROMATIC ART.",
        hero_subtitle: "A contemporary digital fashion art museum bridging body, form, and classical masterworks into a digital sanctuary.",
        btn_explore: "EXPLORE 3D CANVAS",
        btn_ticket: "GET MUSEUM PASS",
        label_visitor: "MEMBER / CURATOR",
        btn_copy_pass: "COPY PASS METRICS",
        nav_01: "STRATEGY", nav_02: "RESEARCH", nav_03: "SYMBOL", nav_04: "TYPOGRAPHY",
        nav_05: "CHROMATIC", nav_06: "3D CANVAS", nav_07: "ARCHIVE", nav_08: "LAB",
        nav_09: "DIGITAL PASS", nav_10: "CREATOR HUB"
    },
    zh: {
        hero_title: "剪影与色彩艺术的数字档案库",
        hero_subtitle: "一座连接人体、服装形态与经典名画的当代数字服装艺术博物馆。",
        btn_explore: "探索 3D 画布",
        btn_ticket: "获取博物馆通行证",
        label_visitor: "观展者 / 策展人",
        btn_copy_pass: "复制门票信息",
        nav_01: "策展战略", nav_02: "研究灵感", nav_03: "品牌标识", nav_04: "字体网格",
        nav_05: "色彩萃取", nav_06: "3D 画布", nav_07: "藏品档案", nav_08: "美学实验室",
        nav_09: "数字通行证", nav_10: "创作者中心"
    },
    fr: {
        hero_title: "L'ARCHIVE DE LA SILHOUETTE ET DE L'ART CHROMATIQUE.",
        hero_subtitle: "Un musée d'art de la mode numérique contemporain reliant corps, forme et chefs-d'œuvre classiques.",
        btn_explore: "EXPLORER LE CANVAS 3D",
        btn_ticket: "OBTENIR LE PASS MUSÉE",
        label_visitor: "MEMBRE / CURATEUR",
        btn_copy_pass: "COPIER LES DONNÉES DU PASS",
        nav_01: "STRATÉGIE", nav_02: "RECHERCHE", nav_03: "SYMBOLE", nav_04: "TYPOGRAPHIE",
        nav_05: "CHROMATIQUE", nav_06: "CANVAS 3D", nav_07: "ARCHIVE", nav_08: "LABORATOIRE",
        nav_09: "PASS NUMÉRIQUE", nav_10: "HUB CRÉATEUR"
    }
};

// 语言切换控制 (Language Switcher)
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const lang = btn.getAttribute('data-lang');
        updateLanguage(lang);
    });
});

function updateLanguage(lang) {
    const langData = translations[lang];
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (langData[key]) {
            el.innerText = langData[key];
        }
    });
}

// 世界时钟 (World Clocks)
function updateClocks() {
    const now = new Date();
    document.getElementById('clock-zurich').innerText = now.toLocaleTimeString('de-CH', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock-paris').innerText = now.toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock-tokyo').innerText = now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClocks, 1000);
updateClocks();

// 3D/矢量画布渲染 (Garment Canvas Engine)
const canvas = document.getElementById('garmentCanvas');
const ctx = canvas.getContext('2d');
let rotation = 0;
let currentMode = 'wireframe';

function setCanvasMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    
    if (currentMode === 'wireframe') {
        ctx.strokeStyle = '#002FA7';
        ctx.lineWidth = 1;
        ctx.strokeRect(-100, -150, 200, 300);
        ctx.beginPath();
        ctx.moveTo(-100, -150); ctx.lineTo(100, 150);
        ctx.moveTo(100, -150); ctx.lineTo(-100, 150);
        ctx.stroke();
    } else if (currentMode === 'silhouette') {
        ctx.fillStyle = '#F4F4F0';
        ctx.fillRect(-80, -140, 160, 280);
    } else if (currentMode === 'chromatic') {
        ctx.fillStyle = '#2B4C3F'; ctx.fillRect(-100, -150, 100, 150);
        ctx.fillStyle = '#5B7C8D'; ctx.fillRect(0, -150, 100, 150);
        ctx.fillStyle = '#A3B899'; ctx.fillRect(-100, 0, 100, 150);
        ctx.fillStyle = '#D1A3A4'; ctx.fillRect(0, 0, 100, 150);
    }
    
    ctx.restore();
    
    rotation = (rotation + 0.5) % 360;
    document.getElementById('rot-val').innerText = rotation.toFixed(2);
    requestAnimationFrame(drawCanvas);
}
drawCanvas();

// 通行证交互 (Ticket Pass Engine)
function updateTicketName(val) {
    document.getElementById('visitorInput').value = val.toUpperCase();
}

function copyTicketData() {
    const name = document.getElementById('visitorInput').value;
    const ticketNo = document.getElementById('ticketNo').innerText;
    const text = `[PHYEL DIGITAL MUSEUM PASS]\nHolder: ${name}\nID: ${ticketNo}\nTier: ALL-ACCESS CURATOR\nWebsite: phyel.com`;
    
    navigator.clipboard.writeText(text);
    alert('Pass Metrics Copied to Clipboard!');
}