// LNG - Soluções Digitais | JS principal

// Animação fade-in nas seções
document.querySelectorAll('section').forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = 'translateY(40px)';
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach((sec, i) => {
        setTimeout(() => {
            sec.style.transition = 'all 0.8s cubic-bezier(.4,0,.2,1)';
            sec.style.opacity = 1;
            sec.style.transform = 'translateY(0)';
        }, 300 + i * 200);
    });
});

// Modal login/registro
const openAuth = document.getElementById('open-auth-modal');
const authModal = document.getElementById('auth-modal');
const closeAuth = document.getElementById('close-auth-modal');
if (openAuth && authModal && closeAuth) {
    openAuth.onclick = () => { authModal.style.display = 'block'; };
    closeAuth.onclick = () => { authModal.style.display = 'none'; };
    window.onclick = (e) => {
        if (e.target === authModal) authModal.style.display = 'none';
    };
}

// Alternância entre login e registro
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showLogin = document.getElementById('show-login');
const showRegister = document.getElementById('show-register');
const authMsg = document.getElementById('auth-msg');
if (showLogin && showRegister) {
    showLogin.onclick = () => {
        loginForm.style.display = '';
        registerForm.style.display = 'none';
        showLogin.classList.add('active');
        showRegister.classList.remove('active');
        authMsg.textContent = '';
    };
    showRegister.onclick = () => {
        loginForm.style.display = 'none';
        registerForm.style.display = '';
        showLogin.classList.remove('active');
        showRegister.classList.add('active');
        authMsg.textContent = '';
    };
}
// Validação simples de registro
if (registerForm) {
    registerForm.onsubmit = function(e) {
        e.preventDefault();
        const senha = document.getElementById('reg-senha').value;
        const confirmar = document.getElementById('reg-confirmar').value;
        if (senha !== confirmar) {
            authMsg.textContent = 'As senhas não coincidem!';
            authMsg.style.color = '#f55';
            return false;
        }
        const nome = document.getElementById('reg-nome').value.trim();
        usuarioLogado = nome;
        authMsg.textContent = 'Registro realizado!';
        authMsg.style.color = '#25d366';
        setTimeout(()=>{
            authModal.style.display = 'none';
            mostrarDashboard(nome);
        }, 800);
        registerForm.reset();
        return false;
    };
}
// Validação simples de login
if (loginForm) {
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const nome = document.getElementById('login-user').value.trim();
        usuarioLogado = nome;
        authMsg.textContent = 'Login realizado!';
        authMsg.style.color = '#25d366';
        setTimeout(()=>{
            authModal.style.display = 'none';
            mostrarDashboard(nome);
        }, 800);
        loginForm.reset();
        return false;
    };
}
// Simulação de login/registro e dashboard do cliente
let usuarioLogado = null;
function mostrarDashboard(nome) {
    document.getElementById('cliente-dashboard').style.display = 'block';
    document.querySelector('main').style.opacity = 0.4;
    document.getElementById('cliente-info').textContent = `Bem-vindo, ${nome}!`;
}
function esconderDashboard() {
    document.getElementById('cliente-dashboard').style.display = 'none';
    document.querySelector('main').style.opacity = 1;
}
document.getElementById('btn-sair-dashboard')?.addEventListener('click', ()=>{
    usuarioLogado = null;
    esconderDashboard();
});
document.getElementById('btn-suporte-dashboard')?.addEventListener('click', ()=>{
    window.open('https://wa.me/5531992480394','_blank');
});
// Comentários dos visitantes (localStorage)
const comentarioForm = document.getElementById('comentario-form');
const comentariosUsuarios = document.getElementById('comentarios-usuarios');
const comentarioMsg = document.getElementById('comentario-msg');
function renderComentarios() {
    comentariosUsuarios.innerHTML = '';
    const lista = JSON.parse(localStorage.getItem('comentariosLNG')||'[]');
    if(lista.length === 0) return;
    lista.slice(-5).reverse().forEach(c => {
        const div = document.createElement('div');
        div.className = 'comentario-user';
        div.innerHTML = `<strong>${c.nome?c.nome:'Visitante'}</strong><span>${c.texto}</span>`;
        comentariosUsuarios.appendChild(div);
    });
}
if(comentarioForm) {
    comentarioForm.onsubmit = function(e) {
        e.preventDefault();
        const nome = document.getElementById('comentario-nome').value.trim();
        const texto = document.getElementById('comentario-texto').value.trim();
        if(texto.length < 5) {
            comentarioMsg.textContent = 'O comentário deve ter pelo menos 5 caracteres.';
            comentarioMsg.style.color = '#f55';
            return false;
        }
        let lista = JSON.parse(localStorage.getItem('comentariosLNG')||'[]');
        lista.push({nome, texto});
        localStorage.setItem('comentariosLNG', JSON.stringify(lista));
        comentarioMsg.textContent = 'Comentário enviado! Obrigado pelo feedback.';
        comentarioMsg.style.color = '#25d366';
        comentarioForm.reset();
        renderComentarios();
        setTimeout(()=>{comentarioMsg.textContent='';}, 3000);
        return false;
    };
    renderComentarios();
}
// FAQ toggle
const faqBtn = document.getElementById('faq-toggle-btn');
const faqSec = document.getElementById('faq');
if(faqBtn && faqSec) {
    faqBtn.onclick = () => {
        faqSec.style.display = faqSec.style.display === 'none' ? 'block' : 'none';
        faqBtn.textContent = faqSec.style.display === 'block' ? 'Fechar FAQ' : 'Perguntas Frequentes (FAQ)';
    };
}
// WhatsApp popup
const waBtn = document.getElementById('whatsapp-float-btn');
const waPopup = document.getElementById('whatsapp-popup');
const waClose = document.getElementById('wa-popup-close');
const waConsent = document.getElementById('wa-consent');
const waSend = document.getElementById('wa-popup-send');
if(waBtn && waPopup && waClose && waConsent && waSend) {
    waBtn.onclick = () => { waPopup.style.display = 'block'; };
    waClose.onclick = () => { waPopup.style.display = 'none'; };
    waConsent.onchange = () => { waSend.disabled = !waConsent.checked; };
    waSend.onclick = () => {
        if(waConsent.checked) {
            window.open('https://wa.me/5531992480394?text=Olá!%20Gostaria%20de%20atendimento.','_blank');
            waPopup.style.display = 'none';
        }
    };
    // Fechar ao clicar fora
    window.addEventListener('click', function(e){
        if(waPopup.style.display==='block' && !waPopup.contains(e.target) && e.target!==waBtn) {
            waPopup.style.display = 'none';
        }
    });
}
// Carrossel de depoimentos
(function(){
    const slides = document.querySelectorAll('.depoimento-slide');
    const leftBtn = document.querySelector('.depoimentos-arrow.left');
    const rightBtn = document.querySelector('.depoimentos-arrow.right');
    const indicadores = document.querySelector('.depoimentos-indicadores');
    let idx = 0;
    function showSlide(i) {
        slides.forEach((s, j) => s.classList.toggle('active', j === i));
        if(indicadores) {
            Array.from(indicadores.children).forEach((b, j) => b.classList.toggle('active', j === i));
        }
    }
    function next() { idx = (idx+1)%slides.length; showSlide(idx); }
    function prev() { idx = (idx-1+slides.length)%slides.length; showSlide(idx); }
    if(leftBtn) leftBtn.onclick = prev;
    if(rightBtn) rightBtn.onclick = next;
    // Indicadores
    if(indicadores) {
        indicadores.innerHTML = '';
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            b.onclick = ()=>{ idx=i; showSlide(i); };
            if(i===0) b.classList.add('active');
            indicadores.appendChild(b);
        });
    }
    showSlide(idx);
    // Swipe mobile
    let startX = null;
    const slider = document.querySelector('.depoimentos-slider');
    if(slider) {
        slider.addEventListener('touchstart', e=>{ startX = e.touches[0].clientX; });
        slider.addEventListener('touchend', e=>{
            if(startX!==null) {
                let dx = e.changedTouches[0].clientX - startX;
                if(dx > 40) prev();
                if(dx < -40) next();
                startX = null;
            }
        });
    }
})();
// Fim do JS principal
// Formulário de orçamento detalhado
(function(){
    const form = document.getElementById('form-orcamento');
    const tipo = document.getElementById('tipo-projeto');
    const extras = document.getElementById('extras-orcamento');
    const msg = document.getElementById('orcamento-msg');
    if(!form) return;
    tipo.onchange = function() {
        if(!extras) return;
        extras.innerHTML = '';
        extras.style.display = 'none';
        if(tipo.value === 'loja') {
            extras.style.display = 'flex';
            extras.innerHTML = `
                <label style="color:#7fbcff;font-weight:600;">Funcionalidades extras:</label>
                <label><input type='checkbox' name='pagamento' value='pagamento'> Pagamento online</label>
                <label><input type='checkbox' name='catalogo' value='catalogo'> Catálogo de produtos</label>
                <label><input type='checkbox' name='entrega' value='entrega'> Cálculo de frete/entrega</label>
            `;
        } else if(tipo.value === 'site') {
            extras.style.display = 'flex';
            extras.innerHTML = `
                <label style="color:#7fbcff;font-weight:600;">Funcionalidades extras:</label>
                <label><input type='checkbox' name='blog' value='blog'> Blog/Notícias</label>
                <label><input type='checkbox' name='galeria' value='galeria'> Galeria de fotos</label>
                <label><input type='checkbox' name='formulario' value='formulario'> Formulário avançado</label>
            `;
        }
    };
    form.onsubmit = function(e) {
        e.preventDefault();
        msg.textContent = 'Enviando...';
        msg.style.color = '#7fbcff';
        setTimeout(()=>{
            msg.textContent = 'Orçamento enviado! Em breve entraremos em contato.';
            msg.style.color = '#25d366';
            form.reset();
            extras.innerHTML = '';
            extras.style.display = 'none';
        }, 1200);
        return false;
    };
})();
// Modal Orçamento
const solicitarProjetoBtn = document.getElementById('solicitar-projeto-btn');
const orcamentoModal = document.getElementById('orcamento-modal');
const closeOrcamentoModal = document.getElementById('close-orcamento-modal');

if (solicitarProjetoBtn && orcamentoModal && closeOrcamentoModal) {
    solicitarProjetoBtn.addEventListener('click', () => {
        orcamentoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    closeOrcamentoModal.addEventListener('click', () => {
        orcamentoModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    orcamentoModal.addEventListener('click', (e) => {
        if (e.target === orcamentoModal) {
            orcamentoModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}
