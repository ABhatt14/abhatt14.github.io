// Website logic. For normal edits, use content.js instead of changing this file.

const projects = PROJECTS;

function mailto(){
  return `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(SITE.emailSubject || "Video Editing Project")}`;
}

function setSiteContent(){
  document.title = SITE.pageTitle || document.title;
  const md = document.getElementById("metaDescription");
  if(md && SITE.metaDescription) md.setAttribute("content", SITE.metaDescription);
  const nav = document.getElementById("siteNav");
  if(nav && SITE.sections) nav.innerHTML = SITE.sections.filter(s=>s.visible!==false).map(s=>`<a href="#${s.anchor}">${s.label}</a>`).join("");
  const filtersEl = document.getElementById("projectFilters");
  if(filtersEl && SITE.filters) {
    filtersEl.innerHTML = SITE.filters.map((f,i)=>`<button class="filter ${i===0?"active":""}" data-filter="${f.id}">${f.label}</button>`).join("");
    filtersEl.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
      filtersEl.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active"); render(btn.dataset.filter);
    }));
  }
  document.getElementById("brand").innerHTML = `${SITE.brand}<span>.</span>`;
  document.getElementById("heroEyebrow").textContent = SITE.eyebrow;
  document.getElementById("heroHeadline").innerHTML = SITE.headline;
  document.getElementById("heroIntro").textContent = SITE.intro;
  document.getElementById("availabilityText").textContent = SITE.availability;
  document.getElementById("heroCv").href = SITE.cv;
  const footerCv=document.getElementById("footerCv");
  if(footerCv){ footerCv.href=SITE.cv||"#"; footerCv.download=SITE.cv ? "Akshay-Bhatt-CV.pdf" : ""; footerCv.textContent=`${SITE.footerCvLabel || "Download CV"} `; const arr=document.createElement("span"); arr.textContent="↗"; footerCv.appendChild(arr); footerCv.style.display=SITE.showFooterCv===false?"none":"inline-flex"; }
  const heroPortrait=document.getElementById("heroPortrait"); if(heroPortrait && SITE.portrait) heroPortrait.src=SITE.portrait;
  const aboutPortrait=document.querySelector(".about-photo img"); if(aboutPortrait && SITE.portrait) aboutPortrait.src=SITE.portrait;
  const heroAvatar=document.getElementById("heroAvatar"); if(heroAvatar && SITE.avatar) heroAvatar.src=SITE.avatar;
  document.getElementById("aboutTitle").textContent = SITE.aboutTitle;
  document.getElementById("contactHeading").innerHTML = SITE.contactHeading || "Have a project<br><em>worth watching?</em>";

  const about = document.getElementById("aboutParagraphs");
  about.innerHTML = SITE.aboutParagraphs.map(text => `<p>${text}</p>`).join("");
  document.getElementById("toolList").innerHTML = SITE.tools.map(t => `<span>${t}</span>`).join("");
  document.getElementById("educationList").innerHTML = SITE.education.map(e => `<div><small>${e.period}</small><strong>${e.degree}</strong><span>${e.school}</span></div>`).join("");
  document.getElementById("experienceList").innerHTML = SITE.experience.map(e => `<div class="timeline-item reveal visible"><span>${e.period}</span><div><h3>${e.role}</h3><p>${e.description}</p></div></div>`).join("");
  document.getElementById("serviceGrid").innerHTML = SERVICES.map(s => `<article class="service-card reveal visible"><div class="service-media">${s.image ? `<img src="${s.image}" alt="${s.title}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')">` : ""}</div><div class="service-body"><span>${s.number}</span><h3>${s.title}</h3><p>${s.description}</p></div></article>`).join("");

  const navEmail=document.getElementById("navEmail");
  const contactEmail=document.getElementById("contactEmail");
  const footerTalk=document.getElementById("footerTalk");
  [navEmail,contactEmail,footerTalk].forEach(el=>{if(el) el.href=mailto()});
  if(navEmail) navEmail.innerHTML = `${SITE.navTalkLabel || "Let's talk"} <span>↗</span>`;
  if(contactEmail) contactEmail.innerHTML = `${SITE.navTalkLabel || "Let's talk"} <span>↗</span>`;
  if(footerTalk) footerTalk.innerHTML = `${SITE.footerTalkLabel || "Let's talk"} <span>↗</span>`;
  const navLinkedIn=document.getElementById("navLinkedIn");
  const navInstagram=document.getElementById("navInstagram");
  const linkedinLink=document.getElementById("linkedinLink");
  const instagramLink=document.getElementById("instagramLink");
  const footerLinkedIn=document.getElementById("footerLinkedIn");
  const footerInstagram=document.getElementById("footerInstagram");
  if(navLinkedIn){navLinkedIn.href=SITE.linkedin||"#";navLinkedIn.style.display=SITE.showLinkedIn===false?"none":"inline-flex";}
  if(navInstagram){navInstagram.href=SITE.instagram||"#";navInstagram.style.display=SITE.showInstagram===false?"none":"inline-flex";}
  if(linkedinLink){linkedinLink.href=SITE.linkedin||"#";linkedinLink.style.display=SITE.showLinkedIn===false?"none":"inline-flex";}
  if(instagramLink){instagramLink.href=SITE.instagram||"#";instagramLink.style.display=SITE.showInstagram===false?"none":"inline-flex";}
  if(footerLinkedIn){footerLinkedIn.href=SITE.linkedin||"#";footerLinkedIn.style.display=SITE.showLinkedIn===false?"none":"inline-flex";}
  if(footerInstagram){footerInstagram.href=SITE.instagram||"#";footerInstagram.style.display=SITE.showInstagram===false?"none":"inline-flex";}
  document.getElementById("footerCv").href = SITE.cv;
}

const grid=document.getElementById("projectGrid");

function render(filter="all"){
  if(!grid) return;
  const list = filter === "all" ? projects : projects.filter(p => p.filter === filter);
  grid.innerHTML = list.map((p) => {
    const cover = p.thumbnail || "";
    const sound = p.sound === true;
    return `<article class="project reveal visible" tabindex="0" data-project-index="${projects.indexOf(p)}">
      <div class="project-media">
        ${cover ? `<img class="project-thumb" src="${cover}" alt="${p.title} cover" loading="lazy">` : `<div class="project-bg"></div>`}
        ${p.preview ? `<video class="project-preview" playsinline preload="metadata" ${sound ? "" : "muted"} loop src="${p.preview}"></video>` : ""}
        <div class="project-shade"></div>
        <div class="project-play">▶</div>
        <div class="project-watch">${p.preview ? (sound ? "SOUND ON" : "MUTED") + " · PREVIEW ↗" : (getVideoInfo(p.link)?.kind === "instagram" ? "INSTAGRAM ↗" : "WATCH ↗")}</div>
      </div>
      <span class="project-no">${String(projects.indexOf(p)+1).padStart(2,"0")}</span>
      <div class="project-content"><span class="project-type">${p.type}</span><h3>${p.title}</h3><p>${p.desc}</p><div class="project-tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join("")}</div></div>
    </article>`;
  }).join("");

  const stage = document.getElementById("projectsStage");
  const toggle = document.getElementById("projectsToggle");
  if(stage && toggle){
    const hasMore = list.length > 8;
    toggle.style.display = hasMore ? "inline-flex" : "none";
    stage.classList.toggle("is-collapsed", hasMore);
    stage.classList.toggle("is-expanded", !hasMore);
    toggle.setAttribute("aria-expanded", hasMore ? "false" : "true");
    toggle.innerHTML = hasMore ? 'Show more projects <span>↓</span>' : 'All projects <span>✓</span>';

    const setStageHeight = (expanded) => {
      if(!hasMore){ stage.style.maxHeight = "none"; return; }
      if(expanded){
        stage.style.maxHeight = grid.scrollHeight + "px";
        return;
      }
      const cards = grid.querySelectorAll(".project");
      const eighth = cards[7];
      if(!eighth){ stage.style.maxHeight = "none"; return; }
      const stageTop = stage.getBoundingClientRect().top;
      const bottom = eighth.getBoundingClientRect().bottom - stageTop;
      // Let the next row peek through the fade for an immersive downward reveal.
      const peek = window.innerWidth <= 520 ? 100 : 125;
      stage.style.maxHeight = Math.ceil(bottom + peek) + "px";
    };

    requestAnimationFrame(()=>setStageHeight(false));
    if(!toggle.dataset.bound){
      toggle.dataset.bound = "1";
      toggle.addEventListener("click",()=>{
        const expanded = stage.classList.contains("is-expanded");
        stage.classList.toggle("is-expanded", !expanded);
        stage.classList.toggle("is-collapsed", expanded);
        toggle.setAttribute("aria-expanded", String(!expanded));
        toggle.innerHTML = expanded ? 'Show more projects <span>↓</span>' : 'Show fewer projects <span>↑</span>';
        requestAnimationFrame(()=>setStageHeight(!expanded));
      });
    }
  }

  grid.querySelectorAll(".project").forEach(card=>{
    const p=projects[Number(card.dataset.projectIndex)];
    const video=card.querySelector(".project-preview");
    const isInstagram = getVideoInfo(p.link)?.kind === 'instagram';
    let hoverTimer;
    const stop=()=>{
      clearTimeout(hoverTimer);
      if(video){ video.pause(); video.currentTime=0; card.classList.remove("previewing"); }
    };
    const start=()=>{
      // Instagram only supplies a page URL here, not a direct video file.
      // Hover previews therefore stay as thumbnails; clicking opens the real Reel.
      if(isInstagram || !video) return;
      document.querySelectorAll(".project-preview").forEach(v=>{ if(v!==video){v.pause();v.currentTime=0;v.closest(".project")?.classList.remove("previewing");} });
      hoverTimer=setTimeout(()=>{
        video.muted = p.sound !== true;
        video.play().then(()=>card.classList.add("previewing")).catch(()=>{});
      },120);
    };
    card.addEventListener("mouseenter",start);
    card.addEventListener("mouseleave",stop);
    card.addEventListener("focus",start);
    card.addEventListener("blur",stop);
    video?.addEventListener("error",()=>{ card.classList.remove("previewing"); video.style.display="none"; });
    card.addEventListener("click",()=>openProject(p));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openProject(p)}});
  });
}

const modal=document.getElementById("projectModal");
const modalTitle=document.getElementById("modalTitle");
const modalType=document.getElementById("modalType");
const modalDesc=document.getElementById("modalDesc");
const modalTags=document.getElementById("modalTags");
const modalLink=document.getElementById("modalLink");

function getVideoInfo(link){
  const clean=(link||"").replace(/["']/g,"").trim();
  let m=clean.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([^?&/]+)/i);
  if(m) return {kind:"youtube",id:m[1]};
  m=clean.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if(m) return {kind:"drive",id:m[1]};
  m=clean.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i);
  if(m) return {kind:"instagram",id:m[1]};
  return null;
}

function stopAllProjectPreviews(){
  document.querySelectorAll('.project-preview').forEach(v=>{try{v.pause();v.currentTime=0;}catch(e){}});
}
function resetModalPlayer(){
  const wrap=document.getElementById('modalPlayerWrap');
  if(!wrap) return null;
  wrap.innerHTML='<iframe id="modalPlayer" title="Project video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe><div id="modalPlayerPlaceholder" class="modal-player-placeholder">Video preview unavailable</div>';
  return document.getElementById('modalPlayer');
}
function destroyModalMedia(){
  const old=document.getElementById('modalPlayer');
  if(old){old.src='about:blank';old.remove();}
  const media=document.getElementById('modalDirectVideo');
  if(media){try{media.pause();media.removeAttribute('src');media.load();}catch(e){}media.remove();}
}
function openProject(p){
  stopAllProjectPreviews();
  destroyModalMedia();
  const player=resetModalPlayer();
  const placeholder=document.getElementById('modalPlayerPlaceholder');
  modalTitle.textContent=p.title;
  modalType.textContent=`/ ${p.type}`;
  modalDesc.textContent=p.desc;
  modalTags.innerHTML=(p.tags||[]).map(t=>`<span>${t}</span>`).join('');
  const link=(p.link||'').replace(/^['"]|['"]$/g,'');
  modalLink.href=link||'#';
  modalLink.style.display=link?'inline-flex':'none';
  player.style.display='none';
  placeholder.style.display='none';

  // Direct preview files are used as a normal, user-controlled video player.
  if(p.preview){
    const v=document.createElement('video');
    v.id='modalDirectVideo'; v.controls=true; v.playsInline=true; v.preload='metadata'; v.src=p.preview;
    v.muted=true;
    document.getElementById('modalPlayerWrap').insertBefore(v,placeholder);
    v.addEventListener('error',()=>{v.remove();placeholder.textContent='Video preview unavailable — use Open project ↗';placeholder.style.display='flex';});
  } else {
    const info=getVideoInfo(link);
    if(info && info.kind==='youtube'){
      // Do not autoplay embeds. The user starts playback explicitly, and the iframe
      // is destroyed when the modal closes, which prevents audio from leaking.
      const params=new URLSearchParams({playsinline:'1',rel:'0',modestbranding:'1',controls:'1'});
      if(location.protocol==='http:'||location.protocol==='https:') params.set('origin',location.origin);
      params.set('widget_referrer',location.href);
      player.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
      player.src=`https://www.youtube.com/embed/${encodeURIComponent(info.id)}?${params.toString()}`;
      player.style.display='block';
    } else if(info && info.kind==='drive'){
      player.src=`https://drive.google.com/file/d/${encodeURIComponent(info.id)}/preview`;
      player.style.display='block';
    } else if(info && info.kind==='instagram'){
      // Instagram does not expose a stable direct MP4 URL to a static portfolio.
      // Use Instagram's official embed renderer instead of pretending it is a local video.
      // The portfolio keeps a direct Open on Instagram fallback in modalLink.
      const wrap=document.getElementById('modalPlayerWrap');
      wrap.innerHTML='';
      const block=document.createElement('blockquote');
      block.className='instagram-media';
      block.setAttribute('data-instgrm-permalink',`https://www.instagram.com/reel/${encodeURIComponent(info.id)}/`);
      block.setAttribute('data-instgrm-version','14');
      block.style.cssText='background:#111;border:0;border-radius:12px;box-shadow:none;margin:0 auto;max-width:540px;min-width:280px;width:100%;';
      wrap.appendChild(block);
      const fallback=document.createElement('div');
      fallback.className='instagram-fallback';
      fallback.innerHTML='Instagram embed loading… <a href="'+link.replace(/"/g,'&quot;')+'" target="_blank" rel="noopener">Open Reel ↗</a>';
      wrap.appendChild(fallback);
      const processEmbed=()=>{try{window.instgrm?.Embeds?.process()}catch(e){}};
      if(window.instgrm && window.instgrm.Embeds){ processEmbed(); }
      else if(!document.getElementById('instagramEmbedScript')){
        const s=document.createElement('script');
        s.id='instagramEmbedScript'; s.async=true; s.defer=true; s.src='https://www.instagram.com/embed.js';
        s.onload=processEmbed; document.body.appendChild(s);
      }
      player.style.display='none';
    } else {
      placeholder.textContent='Video preview unavailable — use Open project ↗';
      placeholder.style.display='flex';
    }
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(){
  stopAllProjectPreviews();
  destroyModalMedia();
  const wrap=document.getElementById('modalPlayerWrap');
  if(wrap) wrap.innerHTML='<iframe id="modalPlayer" title="Project video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe><div id="modalPlayerPlaceholder" class="modal-player-placeholder">Video preview unavailable</div>';
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

setSiteContent();
render();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Apply visual design settings from content.js
(function applyDesign(){
  const d=(typeof DESIGN!=='undefined'?DESIGN:{}); const root=document.documentElement;
  const c=d.colors||{}, t=d.typography||{}, l=d.layout||{}, sh=d.shape||{}, p=d.portrait||{}, e=d.effects||{};
  const set=(k,v)=>{if(v!==undefined&&v!==null&&v!=='')root.style.setProperty(k,String(v))};
  set('--d-bg',c.bg);set('--d-surface',c.surface);set('--d-surface2',c.surface2);set('--d-text',c.text);set('--d-muted',c.muted);set('--d-accent',c.accent);set('--d-border',c.border);set('--d-button-text',c.buttonText);
  set('--d-container',l.containerWidth+'px');set('--d-section-pad',l.sectionPadding+'px');set('--d-nav-pad',l.navPadding+'px');set('--d-hero-gap',l.heroGap+'px');set('--d-hero-min',l.heroMinHeight+'vh');set('--d-hero-left',l.heroLeft+'fr');set('--d-hero-right',l.heroRight+'fr');
  set('--d-project-cols',l.projectColumns);set('--d-project-gap',l.projectGap+'px');set('--d-project-min',l.projectMinHeight+'px');set('--d-service-cols',l.serviceColumns);set('--d-about-gap',l.aboutGap+'px');set('--d-timeline-label',l.timelineLabelWidth+'px');set('--d-modal-width',l.modalWidth+'px');
  set('--d-radius',sh.globalRadius+'px');set('--d-button-radius',sh.buttonRadius+'px');set('--d-card-radius',sh.cardRadius+'px');set('--d-portrait-radius',sh.portraitRadius+'px');set('--d-project-radius',sh.projectRadius+'px');set('--d-border-width',sh.borderWidth+'px');
  set('--d-body-font',t.bodyFont||'Manrope');set('--d-mono-font',t.monoFont||'DM Mono');set('--d-body-size',t.bodySize+'px');set('--d-heading-weight',t.headingWeight);set('--d-body-weight',t.bodyWeight);set('--d-heading-scale',t.headingScale);set('--d-letter',t.letterSpacing+'em');set('--d-line',t.lineHeight);
  set('--d-noise',e.noise);set('--d-marquee',e.marqueeSpeed+'s');set('--d-reveal',e.revealDuration+'s');set('--d-hover-lift',e.hoverLift+'px');set('--d-img-zoom',e.projectImageZoom);
  set('--portrait-width',p.width+'px');set('--portrait-aspect',p.aspect);set('--portrait-position',p.objectPosition);set('--portrait-gray',p.grayscale);set('--portrait-opacity',p.opacity);set('--flip-duration',p.flipDuration+'s');
  if(SITE.portrait) { const hero=document.getElementById('heroPortrait'); if(hero) hero.src=SITE.portrait; }
  const r=d.responsive||{};
  const responsiveStyle=document.createElement('style');responsiveStyle.id='responsiveDesignCSS';
  responsiveStyle.textContent=`@media(max-width:${r.mobileBreakpoint||850}px){.nav nav{display:none}.hero{grid-template-columns:1fr}.project-grid{grid-template-columns:1fr}.service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.about{grid-template-columns:1fr}.timeline-item{grid-template-columns:1fr}}@media(max-width:${r.phoneBreakpoint||520}px){.service-grid{grid-template-columns:1fr}.section{width:min(100% - 28px,var(--d-container))}.hero h1{font-size:50px}.portrait-flip{width:min(var(--portrait-width,300px),78vw)}}`;
  document.head.appendChild(responsiveStyle);
  const custom=document.createElement('style');custom.id='customDesignCSS';custom.textContent=d.customCSS||'';document.head.appendChild(custom);
})();

window.addEventListener("resize",()=>{
  const stage=document.getElementById("projectsStage");
  const toggle=document.getElementById("projectsToggle");
  const cards=grid?.querySelectorAll(".project") || [];
  if(!stage || !toggle || cards.length<=8 || !stage.classList.contains("is-collapsed")) return;
  const eighth=cards[7];
  const stageTop=stage.getBoundingClientRect().top;
  const peek=window.innerWidth<=520?100:125;
  stage.style.maxHeight=Math.ceil(eighth.getBoundingClientRect().bottom-stageTop+peek)+"px";
});

// Click-to-flip profile card
(function(){const card=document.getElementById('portraitFlip');if(!card)return;card.addEventListener('click',()=>card.classList.toggle('is-flipped'));})();
