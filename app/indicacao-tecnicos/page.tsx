'use client';

import { useEffect } from 'react';
import Head from 'next/head';

const LOGO_BASE64 =
  'data:image/webp;base64,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';

export default function IndicacaoTecnicosPage() {
  useEffect(() => {
    // Inicializa a data de hoje
    const dataInput = document.getElementById('data_visita') as HTMLInputElement;
    if (dataInput) {
      dataInput.value = new Date().toISOString().split('T')[0];
    }

    const WEBHOOK = 'https://flow.goalfy.com.br/automations/v1/95f28601-3567-4250-bb72-66b678d5857e/hooks/catch/';

    // Múltiplos arquivos
    let arquivos: { nome: string; base64: string; mime: string }[] = [];

    function renderArquivos() {
      const lista = document.getElementById('arquivos-lista');
      if (!lista) return;
      lista.innerHTML = '';
      arquivos.forEach(function (arq, idx) {
        const row = document.createElement('div');
        row.className = 'file-row';
        row.innerHTML =
          '<div class="file-row-icon">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none">' +
          '<rect x="3" y="3" width="18" height="18" rx="3" stroke="#ED1C24" stroke-width="1.7"/>' +
          '<path d="M3 15l5-5 4 4 3-3 6 6" stroke="#ED1C24" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg></div>' +
          '<span style="flex:1;font-size:13px;color:#181818;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + arq.nome + '</span>' +
          '<button type="button" data-idx="' + idx + '" style="background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none">' +
          '<path d="M6 6l12 12M6 18L18 6" stroke="#AEAEB8" stroke-width="2" stroke-linecap="round"/>' +
          '</svg></button>';
        const btn = row.querySelector('button');
        if (btn) {
          btn.addEventListener('click', function () {
            arquivos.splice(parseInt((this as HTMLButtonElement).dataset.idx || '0', 10), 1);
            renderArquivos();
          });
        }
        lista.appendChild(row);
      });
    }

    const arquivoInput = document.getElementById('arquivo') as HTMLInputElement;
    if (arquivoInput) {
      arquivoInput.addEventListener('change', function (e) {
        const target = e.target as HTMLInputElement;
        Array.from(target.files || []).forEach(function (file) {
          if (file.size > 10 * 1024 * 1024) {
            alert(file.name + ' é muito grande. Máximo 10 MB por arquivo.');
            return;
          }
          const reader = new FileReader();
          reader.onload = function () {
            const result = reader.result as string;
            const parts = result.split(',');
            const mime = (parts[0].match(/:(.*?);/) || [])[1] || file.type;
            arquivos.push({ nome: file.name, base64: parts[1], mime: mime });
            renderArquivos();
          };
          reader.readAsDataURL(file);
        });
        target.value = '';
      });
    }

    // Upload imgbb
    async function uploadImgbb(base64: string): Promise<string> {
      const form = new FormData();
      form.append('image', base64);
      const resp = await fetch('https://api.imgbb.com/1/upload?key=1163d3943db5624a382e10747c1da83d', {
        method: 'POST',
        body: form,
      });
      const json = await resp.json();
      if (json.success) return json.data.url;
      throw new Error('Falha no upload');
    }

    // Validação
    const requiredFields = [
      { id: 'tecnico',      err: 'err-tecnico'   },
      { id: 'data_visita',  err: 'err-data'      },
      { id: 'empresa',      err: 'err-empresa'   },
      { id: 'nome_contato', err: 'err-nome'      },
      { id: 'telefone',     err: 'err-telefone'  },
      { id: 'descricao',    err: 'err-descricao' },
    ];

    function validate(): boolean {
      let valid = true;
      requiredFields.forEach(function (f) {
        const el  = document.getElementById(f.id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const err = document.getElementById(f.err);
        if (!el || !err) return;
        if (!el.value.trim()) {
          el.classList.add('error'); err.classList.add('visible'); valid = false;
        } else {
          el.classList.remove('error'); err.classList.remove('visible');
        }
      });
      return valid;
    }

    requiredFields.forEach(function (f) {
      const el = document.getElementById(f.id);
      if (!el) return;
      el.addEventListener('input', function () {
        el.classList.remove('error');
        const errEl = document.getElementById(f.err);
        if (errEl) errEl.classList.remove('visible');
      });
    });

    // Submit
    const form = document.getElementById('lead-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!validate()) return;

        const btn = document.getElementById('btn-submit') as HTMLButtonElement;
        const errBanner = document.getElementById('error-banner');
        btn.disabled = true;
        btn.innerHTML = 'Enviando… <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="animation:spin 1s linear infinite"><path d="M12 2a10 10 0 1 0 10 10" stroke="#fff" stroke-width="2.3" stroke-linecap="round"/></svg>';
        if (errBanner) errBanner.classList.remove('visible');

        const urls: string[] = [];
        for (let i = 0; i < arquivos.length; i++) {
          try { urls.push(await uploadImgbb(arquivos[i].base64)); } catch (_) {}
        }

        const tecnico = (document.getElementById('tecnico') as HTMLSelectElement).value;
        const payload = {
          tecnico,
          data_visita:       (document.getElementById('data_visita') as HTMLInputElement).value,
          empresa:           (document.getElementById('empresa') as HTMLInputElement).value,
          nome_contato:      (document.getElementById('nome_contato') as HTMLInputElement).value,
          cargo_contato:     (document.getElementById('cargo_contato') as HTMLInputElement).value,
          telefone:          (document.getElementById('telefone') as HTMLInputElement).value,
          email:             (document.getElementById('email') as HTMLInputElement).value,
          tipo_oportunidade: (document.getElementById('tipo_oportunidade') as HTMLSelectElement).value,
          descricao:         (document.getElementById('descricao') as HTMLTextAreaElement).value,
          arquivo_url:       urls[0] || '',
          arquivos_urls:     urls.join(', '),
          utm_source:        'indicação',
          utm_medium:        'tecnico',
          utm_campaign:      tecnico,
          utm_term:          '',
          utm_content:       '',
        };

        try {
          const resp = await fetch(WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (resp.status < 500) {
            const screenForm = document.getElementById('screen-form');
            const screenSuccess = document.getElementById('screen-success');
            if (screenForm) screenForm.style.display = 'none';
            if (screenSuccess) screenSuccess.classList.add('visible');
          } else {
            throw new Error('Server error');
          }
        } catch (_) {
          if (errBanner) errBanner.classList.add('visible');
          btn.disabled = false;
          btn.innerHTML = 'Enviar Lead <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h13M13 7l5 5-5 5" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
      });
    }

    // Expõe resetForm globalmente para o onclick inline do botão
    (window as Window & { resetForm?: () => void }).resetForm = function () {
      arquivos = [];
      renderArquivos();
      const f = document.getElementById('lead-form') as HTMLFormElement;
      if (f) f.reset();
      const dv = document.getElementById('data_visita') as HTMLInputElement;
      if (dv) dv.value = new Date().toISOString().split('T')[0];
      requiredFields.forEach(function (f) {
        const errEl = document.getElementById(f.err);
        const el    = document.getElementById(f.id);
        if (errEl) errEl.classList.remove('visible');
        if (el)    el.classList.remove('error');
      });
      const eb = document.getElementById('error-banner');
      if (eb) eb.classList.remove('visible');
      const ss = document.getElementById('screen-success');
      if (ss) ss.classList.remove('visible');
      const sf = document.getElementById('screen-form');
      if (sf) sf.style.display = '';
      window.scrollTo(0, 0);
    };

    return () => {
      delete (window as Window & { resetForm?: () => void }).resetForm;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Tecnoiso — Indicação de Lead</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Mulish:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'Mulish', sans-serif; background: #F2F2F4; min-height: 100vh; }
        input, select, textarea, button { font-family: 'Mulish', sans-serif; }
        input, select, textarea { -webkit-appearance: none; appearance: none; width: 100%; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: .5; }
        input:focus, select:focus, textarea:focus { border-color: #ED1C24 !important; outline: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .hero {
          background: #131316; padding: 44px 24px 0;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; align-items: center;
          gap: 20px; text-align: center;
        }
        .blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .blob-1 { top:-90px; right:-70px; width:260px; height:260px;
          background: radial-gradient(circle, rgba(237,28,36,.48) 0%, transparent 65%); }
        .blob-2 { bottom:-110px; left:-50px; width:220px; height:220px;
          background: radial-gradient(circle, rgba(237,28,36,.18) 0%, transparent 65%); }

        .form-wrap { background: #F2F2F4; padding: 24px 16px 56px; }
        .form-card {
          background: #fff; border-radius: 22px; padding: 26px 20px 28px;
          box-shadow: 0 14px 50px rgba(24,24,24,.13);
          max-width: 540px; margin: 0 auto;
        }
        .section-head {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 18px; padding-bottom: 14px;
          border-bottom: 1.5px solid #F2F2F4;
        }
        .section-icon {
          width:28px; height:28px; border-radius:8px; background:#ED1C24;
          flex-shrink:0; display:flex; align-items:center; justify-content:center;
        }
        .section-label { font-weight:800; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#181818; }
        .field { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
        .field-label { font-weight:700; font-size:11.5px; letter-spacing:.07em; text-transform:uppercase; color:#6B6B74; }
        .field-label span { color:#ED1C24; }
        .field input, .field select, .field textarea {
          font-size:15px; color:#181818; background:#F8F8F9;
          border:1.5px solid #E8E8EA; border-radius:12px; padding:14px 15px;
        }
        .field select { cursor:pointer; }
        .field textarea { resize:vertical; line-height:1.55; }
        .field-error { font-size:12px; color:#ED1C24; font-weight:600; display:none; }
        .field-error.visible { display:block; }
        .field input.error, .field select.error, .field textarea.error { border-color:#ED1C24; }

        .upload-btn {
          display:flex; align-items:center; gap:14px;
          background:#F8F8F9; border:1.5px dashed #D8D8DC;
          border-radius:12px; padding:14px 15px; cursor:pointer;
        }
        .upload-icon {
          width:42px; height:42px; border-radius:10px; background:#FDE7E7;
          flex-shrink:0; display:flex; align-items:center; justify-content:center;
        }
        .file-row {
          display:flex; align-items:center; gap:10px;
          background:#F8F8F9; border:1px solid #E8E8EA;
          border-radius:10px; padding:10px 14px; margin-top:4px;
        }
        .file-row-icon {
          width:32px; height:32px; border-radius:8px; background:#FDE7E7;
          flex-shrink:0; display:flex; align-items:center; justify-content:center;
        }

        .btn-submit {
          width:100%; font-weight:800; font-size:15px; letter-spacing:.05em;
          text-transform:uppercase; color:#fff; background:#ED1C24; border:none;
          border-radius:14px; padding:19px 20px; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:10px;
          box-shadow:0 12px 28px rgba(237,28,36,.35); transition:opacity .2s;
        }
        .btn-submit:disabled { opacity:.65; cursor:not-allowed; }
        .error-banner {
          margin-top:16px; background:#FDE7E7; border:1px solid #F5453F;
          border-radius:10px; padding:14px 16px; font-size:13.5px;
          color:#B11217; text-align:center; font-weight:600; display:none;
        }
        .error-banner.visible { display:block; }

        #screen-success {
          display:none; min-height:100vh; background:#131316;
          flex-direction:column; align-items:center; justify-content:center;
          padding:48px 24px; text-align:center;
        }
        #screen-success.visible { display:flex; }
        .success-check {
          animation: pop .5s cubic-bezier(.34,1.56,.64,1) both;
          width:80px; height:80px; border-radius:50%; background:#ED1C24;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:28px; box-shadow:0 16px 40px rgba(237,28,36,.45);
        }
        .success-body { animation: fadeUp .5s .18s ease both; display:flex; flex-direction:column; gap:12px; margin-bottom:36px; }
        .success-body h2 { font-family:'Poppins'; font-weight:800; font-size:30px; color:#fff; margin:0; line-height:1.1; }
        .success-body p { font-size:15px; line-height:1.65; color:rgba(255,255,255,.6); margin:0; max-width:300px; }
        .btn-nova {
          animation: fadeUp .5s .3s ease both;
          font-weight:800; font-size:14px; letter-spacing:.05em; text-transform:uppercase;
          color:#fff; background:#ED1C24; border:none; border-radius:14px;
          padding:18px 32px; cursor:pointer; box-shadow:0 10px 26px rgba(237,28,36,.4);
        }
      `}</style>

      {/* ========== SUCESSO ========== */}
      <div id="screen-success">
        <div className="success-check">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="success-body">
          <div style={{fontWeight:700,fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',color:'#ED1C24'}}>Lead enviado com sucesso!</div>
          <h2>Oportunidade<br/>registrada!</h2>
          <p>A equipe comercial já recebeu o lead e vai entrar em contato com o cliente em breve. Obrigado pela indicação!</p>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <button className="btn-nova" onClick={() => (window as any).resetForm?.()}>+ Nova indicação</button>
        <div style={{animation:'fadeUp .5s .4s ease both',marginTop:32}}>
          <div style={{background:'rgba(255,255,255,.06)',borderRadius:12,padding:'12px 20px'}}>
            <img src={LOGO_BASE64} alt="Tecnoiso" style={{height:28,display:'block',opacity:.7}} />
          </div>
        </div>
      </div>

      {/* ========== FORMULÁRIO ========== */}
      <div id="screen-form">

        <div className="hero">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div style={{background:'#fff',padding:'11px 18px',borderRadius:12,zIndex:1}}>
            <img src={LOGO_BASE64} alt="Tecnoiso" style={{height:32,display:'block'}} />
          </div>
          <div style={{zIndex:1,display:'flex',flexDirection:'column',gap:10,alignItems:'center'}}>
            <div style={{fontWeight:700,fontSize:10,letterSpacing:'.3em',textTransform:'uppercase',color:'#ED1C24'}}>Programa de Indicações</div>
            <h1 style={{fontFamily:"'Poppins'",fontWeight:800,fontSize:26,lineHeight:1.12,letterSpacing:'-.01em',color:'#fff',margin:0,textAlign:'center'}}>
              Você viu uma oportunidade?<br/><span style={{color:'#ED1C24'}}>Registre aqui.</span>
            </h1>
            <p style={{fontSize:14,lineHeight:1.65,color:'rgba(255,255,255,.58)',margin:0,maxWidth:340,textAlign:'center'}}>
              Preencha os dados do cliente e da oportunidade. Nossa equipe comercial assume daqui!
            </p>
          </div>
        </div>

        <div className="form-wrap">
          <form className="form-card" id="lead-form" noValidate>

            {/* TÉCNICO */}
            <div className="section-head">
              <div className="section-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.5" stroke="#fff" strokeWidth="1.8"/>
                  <path d="M5 19c.7-3.2 3.4-5 7-5s6.3 1.8 7 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="section-label">Identificação do Técnico</span>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="tecnico">Técnico Responsável <span>*</span></label>
              <select id="tecnico" required>
                <option value="">Selecione seu nome…</option>
                <option>Caio Vinicius de Moura</option>
                <option>Charly K. M. Rodrigues</option>
                <option>Elenilson Lima de Freitas</option>
                <option>João A. Fabiano Ferreira</option>
                <option>Geyson Costa Cunha</option>
                <option>Guilherme Lima Mendes</option>
                <option>Henrique Pedroso de Souza</option>
                <option>Samila Guimarães Vieira</option>
                <option>Valério Alves</option>
                <option>Júlio Cesar Reis</option>
                <option>Ana Paula Barboza de Lima</option>
                <option>Bernardo F. M. Mendes</option>
                <option>Breno Euclides Sellmer</option>
                <option>Elizandra C. S. de Castro</option>
                <option>Isabelle Bezerra Silveira</option>
                <option>João Marcos Gabriel</option>
                <option>João Roberto da Silva</option>
                <option>Luana Sousa de Oliveira</option>
                <option>Mateus M. de Azevedo</option>
                <option>Mylena C. de Miranda</option>
                <option>Nicolas G. de Borba</option>
                <option>Raiane A. de S. Baron</option>
                <option>Thales Antonio Kessler</option>
                <option>Alexandre Hyssao Hirose</option>
                <option>Jackson Miranda Silva</option>
              </select>
              <div className="field-error" id="err-tecnico">Selecione seu nome</div>
            </div>

            <div className="field" style={{marginBottom:26}}>
              <label className="field-label" htmlFor="data_visita">Data da Visita <span>*</span></label>
              <input type="date" id="data_visita" required />
              <div className="field-error" id="err-data">Informe a data da visita</div>
            </div>

            {/* LEAD */}
            <div className="section-head">
              <div className="section-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="1.8"/>
                  <path d="M16 3v4M8 3v4M3 10h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="section-label">Dados do Lead</span>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="empresa">Empresa / Cliente <span>*</span></label>
              <input type="text" id="empresa" placeholder="Nome da empresa visitada" required />
              <div className="field-error" id="err-empresa">Informe a empresa</div>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="nome_contato">Nome do Contato <span>*</span></label>
              <input type="text" id="nome_contato" placeholder="Nome completo do contato" required />
              <div className="field-error" id="err-nome">Informe o nome do contato</div>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="cargo_contato">Cargo</label>
              <input type="text" id="cargo_contato" placeholder="Ex: Gerente de Qualidade" />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="telefone">Telefone / WhatsApp <span>*</span></label>
              <input type="tel" id="telefone" placeholder="(00) 00000-0000" required />
              <div className="field-error" id="err-telefone">Informe o telefone</div>
            </div>
            <div className="field" style={{marginBottom:26}}>
              <label className="field-label" htmlFor="email">E-mail do Contato</label>
              <input type="email" id="email" placeholder="email@empresa.com" />
            </div>

            {/* OPORTUNIDADE */}
            <div className="section-head">
              <div className="section-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.8"/>
                  <path d="M12 8v5l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="section-label">A Oportunidade</span>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="tipo_oportunidade">Tipo de Oportunidade</label>
              <select id="tipo_oportunidade">
                <option value="">Selecione…</option>
                <option>Calibração</option>
                <option>Manutenção preventiva</option>
                <option>Manutenção corretiva</option>
                <option>Venda de equipamento</option>
                <option>Consultoria técnica</option>
                <option>Treinamento</option>
                <option>Outro</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="descricao">Descrição da Oportunidade <span>*</span></label>
              <textarea id="descricao" rows={4} placeholder="O que você observou? Qual é a oportunidade de negócio?" required></textarea>
              <div className="field-error" id="err-descricao">Descreva a oportunidade</div>
            </div>

            {/* UPLOAD MÚLTIPLO */}
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:28}}>
              <label className="field-label">Imagens ou Vídeos</label>
              <label className="upload-btn" htmlFor="arquivo">
                <div className="upload-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="#ED1C24" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{flex:1,display:'flex',flexDirection:'column',gap:2}}>
                  <span style={{fontWeight:700,fontSize:14,color:'#181818'}}>Adicionar foto ou vídeo</span>
                  <span style={{fontSize:12,color:'#9A9AA4'}}>JPG, PNG, MP4 — máx. 10 MB por arquivo</span>
                </div>
                <input type="file" id="arquivo" accept="image/*,video/*" multiple style={{display:'none'}} />
              </label>
              <div id="arquivos-lista"></div>
            </div>

            {/* UTMs ocultos */}
            <input type="hidden" id="utm_source" value="indicação" />
            <input type="hidden" id="utm_medium" value="tecnico" />
            <input type="hidden" id="utm_campaign" />
            <input type="hidden" id="utm_term" />
            <input type="hidden" id="utm_content" />

            <button type="submit" className="btn-submit" id="btn-submit">
              Enviar Lead
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13M13 7l5 5-5 5" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="error-banner" id="error-banner">
              Erro ao enviar. Verifique sua conexão e tente novamente.
            </div>

            <div style={{marginTop:18,display:'flex',alignItems:'center',justifyContent:'center',gap:6,color:'#AEAEB8',fontSize:12}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="#AEAEB8" strokeWidth="1.7"/>
                <path d="M8 11V8a4 4 0 018 0v3" stroke="#AEAEB8" strokeWidth="1.7"/>
              </svg>
              Seus dados são transmitidos com segurança
            </div>

          </form>
        </div>
      </div>
    </>
  );
}