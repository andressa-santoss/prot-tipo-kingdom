const menuToggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('#menu'); menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.textContent = open ? '✕' : '☰' }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰' }));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold: .12 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const responses = { pedido: ['Por que o pedido #2841 está em risco?', 'O estoque cobre apenas 35% do material necessário. O fornecedor tem lead time de 15 dias e a linha 2 opera com 92% de ocupação. Recomendo antecipar a compra e avaliar um fornecedor alternativo.'], estoque: ['Como está a situação do estoque?', 'Há 118 kg disponíveis para uma demanda de 340 kg. Faltam 222 kg para atender o pedido. É recomendável verificar a reposição e os fornecedores alternativos.'], producao: ['Qual é a capacidade produtiva disponível?', 'A linha 2 está com 92% de ocupação. A margem de capacidade é pequena e não há uma janela livre confirmada. Sugiro revisar o sequenciamento antes de prometer o prazo.'] }; document.querySelectorAll('[data-question]').forEach(b => b.addEventListener('click', () => { const [q, a] = responses[b.dataset.question]; document.querySelector('#userQuestion').textContent = q; document.querySelector('#aiAnswer').textContent = a }));
const modules = [['◈', 'Comercial', 'Pedidos, propostas, carteira de clientes e prazos contratados.'], ['▤', 'Compras', 'Fornecedores, cotações, lead times e reposição.'], ['▥', 'Estoque', 'Disponibilidade, movimentação e acurácia de materiais.'], ['▦', 'PCP', 'Planejamento e controle de capacidade produtiva.'], ['⚙', 'Produção', 'Ordens, execução, apontamentos e desvios.'], ['◉', 'Qualidade', 'Inspeções, ocorrências e conformidade.'], ['▣', 'Financeiro', 'Custos, margens, contas e fluxo financeiro.'], ['↗', 'Logística', 'Expedição, entregas e rastreabilidade.']]; const moduleWrap = document.querySelector('#modules'); const moduleDetail = document.querySelector('#moduleDetail'); modules.forEach(([symbol, name, description], index) => { const button = document.createElement('button'); button.className = 'module' + (index === 0 ? ' active' : ''); button.innerHTML = `<span aria-hidden="true">${symbol}</span><strong>${name}</strong>`; button.addEventListener('click', () => { moduleWrap.querySelectorAll('.module').forEach(b => b.classList.remove('active')); button.classList.add('active'); moduleDetail.querySelector('h3').textContent = name; moduleDetail.querySelector('p').textContent = description }); moduleWrap.appendChild(button) }); document.querySelectorAll('.knowledge-btn').forEach(b => b.addEventListener('click', () => document.querySelector('#knowledgeInfo').textContent = b.dataset.info));
const form = document.querySelector('#diagnosticForm'), one = document.querySelector('#stepOne'), two = document.querySelector('#stepTwo'), success = document.querySelector('#formSuccess'); document.querySelector('#nextStep').addEventListener('click', () => { const fields = [...one.querySelectorAll('input,select')]; for (const field of fields) { if (!field.reportValidity()) return } one.hidden = true; two.hidden = false; document.querySelector('#stepNumber').textContent = '2'; document.querySelector('#progressBar').style.width = '100%' }); document.querySelector('#prevStep').addEventListener('click', () => { two.hidden = true; one.hidden = false; document.querySelector('#stepNumber').textContent = '1'; document.querySelector('#progressBar').style.width = '50%' }); form.addEventListener('submit', e => { e.preventDefault(); one.hidden = true; two.hidden = true; success.hidden = false; document.querySelector('.form-progress').hidden = true }); document.querySelector('#resetForm').addEventListener('click', () => { form.reset(); success.hidden = true; one.hidden = false; two.hidden = true; document.querySelector('.form-progress').hidden = false; document.querySelector('#stepNumber').textContent = '1'; document.querySelector('#progressBar').style.width = '50%' });





document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".clientes-carousel");
    const track = document.querySelector(".clientes-track");
    const grupo = track?.querySelector(".clientes-group");

    if (!carousel || !track || !grupo) return;

    // Guarda os clientes originais
    const originais = [...grupo.children].map(
        elemento => elemento.cloneNode(true)
    );

    if (!originais.length) return;

    function configurarCarrossel() {
        // Interrompe a animação durante o ajuste
        track.style.animation = "none";

        // Remove cópias anteriores
        track.replaceChildren();
        grupo.replaceChildren();

        // Insere os clientes originais
        originais.forEach(elemento => {
            grupo.appendChild(elemento.cloneNode(true));
        });

        track.appendChild(grupo);

        // Repete os clientes até preencher a tela
        const larguraMinima = carousel.clientWidth + 250;

        while (grupo.scrollWidth < larguraMinima) {
            originais.forEach(elemento => {
                grupo.appendChild(elemento.cloneNode(true));
            });
        }

        // Duplica a sequência completa
        const copia = grupo.cloneNode(true);
        copia.setAttribute("aria-hidden", "true");

        copia.querySelectorAll("img").forEach(img => {
            img.alt = "";
        });

        track.appendChild(copia);

        // Velocidade proporcional ao tamanho da sequência
        const duracao = grupo.scrollWidth / 70;

        track.style.setProperty(
            "--duracao-carrossel",
            `${duracao}s`
        );

        // Reinicia a animação
        void track.offsetWidth;
        track.style.animation = "";
    }

    configurarCarrossel();

    // Reajusta quando a largura da tela mudar
    const observer = new ResizeObserver(() => {
        configurarCarrossel();
    });

    observer.observe(carousel);
});
