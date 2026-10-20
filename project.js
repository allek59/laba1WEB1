const body=document.body,themeButton=document.querySelector('.theme-toggle');try{if(localStorage.getItem('kelan-theme')==='dark')body.classList.add('dark')}catch(e){}function updateTheme(){themeButton.textContent=body.classList.contains('dark')?'☀':'☾';themeButton.setAttribute('aria-label',body.classList.contains('dark')?'Включить светлую тему':'Включить тёмную тему')}updateTheme();themeButton.addEventListener('click',()=>{body.classList.toggle('dark');updateTheme();try{localStorage.setItem('kelan-theme',body.classList.contains('dark')?'dark':'light')}catch(e){}});
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const id=new URLSearchParams(location.search).get('id') || location.pathname.split('/').pop().match(/^project-(identity|editorial|motion|3d)\.html$/)?.[1];const data=Object.hasOwn(window.kelanProjects||{},id)?window.kelanProjects[id]:null;
const set=(key,value)=>document.getElementById('detail-'+key).textContent=value;
if(!data){document.title='Проект не найден — kelan';set('title','ПРОЕКТ НЕ НАЙДЕН');set('summary','Вернитесь к списку проектов и выберите карточку.');document.querySelector('.detail-body').hidden=true}
else{document.title=data.title+' — kelan';['title','summary','category','label','task','process','result','tools'].forEach(k=>set(k,data[k]));set('status',data.label==='УЧЕБНЫЙ ПРИМЕР'?'Демонстрационная заготовка. Реальный проект пока не добавлен.':'Проект в портфолио');const cover=document.getElementById('detail-cover');cover.classList.add(data.color);if(data.coverImage){const img=document.createElement("img");img.src=data.coverImage;img.alt="Обложка проекта: "+data.title;img.className="detail-cover-photo";cover.append(img)}else{cover.textContent=data.cover;}const grid=document.getElementById('detail-media');
const materials=['motion','identity','editorial'].includes(id) ? (data.media||[]).filter(item=>item?.src) : Array.from({length:8},(_,i)=>data.media?.[i]||null);
if(id==='identity'){
 const intro=document.querySelector('.detail-materials .section-intro');
 if(intro)intro.textContent='Реальные материалы проекта: меню, рекламные стикеры, баннеры и буклет. Все изображения показаны полностью, без обрезки.';
 const sections=[['drinks','МЕНЮ НАПИТКОВ'],['table','НАСТОЛЬНЫЕ МЕНЮ · А3'],['stickers','НАБОР РЕКЛАМНЫХ СТИКЕРОВ'],['wall','НАСТЕННОЕ МЕНЮ'],['street','УЛИЧНЫЙ БАННЕР'],['booklet','ИНТЕРЬЕР КАФЕ']];
 sections.forEach(([group,title])=>{const section=document.createElement('section');section.className='identity-group identity-group-'+group;const heading=document.createElement('h3');heading.textContent=title;section.append(heading);const wrapper=document.createElement('div');wrapper.className='identity-group-items';section.append(wrapper);grid.append(section)});
}
materials.forEach((item,i)=>{
  const figure=document.createElement('figure');
  figure.className=`material-item material-item-${i+1}`;
  if(id==='identity'){figure.className='material-item identity-material identity-'+(item.group||'other');}if(id==='motion' && item.type==='video'){figure.classList.add(i===1?'motion-featured':'motion-secondary');}
  if(item?.src && ['image','video'].includes(item.type)){
    const el=document.createElement(item.type==='video'?'video':'img');
    el.src=item.src;
    if(item.type==='video'){el.autoplay=true;el.muted=true;el.defaultMuted=true;el.loop=true;el.controls=false;el.preload='auto';el.playsInline=true;el.setAttribute('autoplay','');el.setAttribute('muted','');el.setAttribute('loop','');el.setAttribute('playsinline','');el.addEventListener('loadeddata',()=>el.play().catch(()=>{}));}
    else{el.alt=item.caption||`Материал проекта ${i+1}`;el.loading='lazy';}
    figure.append(el);
  }else{
    const placeholder=document.createElement('div');
    placeholder.className='material-placeholder';
    placeholder.innerHTML='<span aria-hidden="true">✳</span>';
    const label=document.createElement('strong');
    label.textContent=`Материал ${String(i+1).padStart(2,'0')} — фото или видео`;
    placeholder.append(label);figure.append(placeholder);
  }
  const caption=document.createElement('figcaption');
  caption.className='detail-caption';
  caption.textContent=item?.caption||`Раздел ${String(i+1).padStart(2,'0')}`;
  figure.append(caption);
  if(id==='identity'){grid.querySelector('.identity-group-'+item.group+' .identity-group-items').append(figure)}
  else grid.append(figure);
});
}

if(id==='editorial' && data){
 const body=document.querySelector('.detail-body');
 body.innerHTML='';
 const intro=document.createElement('section');intro.className='myths-intro';
 intro.innerHTML='<p class="myths-eyebrow">GLITCH MYTHOLOGY · АВТОРСКАЯ СЕРИЯ</p><h2>ДРЕВНИЕ МИФЫ В ЦИФРОВОМ МИРЕ</h2><p>«Цифровые мифы» — мой авторский вневузовский проект, созданный под руководством преподавателя. Он посвящён тому, как древнегреческие мифы перекликаются с проблемами современного человека в цифровом пространстве.</p><p>Это не отдельные истории, а единый цикл из восьми плакатов: от появления цифрового дара до осознания его последствий. Каждый следующий образ раскрывает новую грань наших отношений с технологиями.</p>';
 body.append(intro);
 const stories=[
  ['08','ПРОМЕТЕЙ · ДАР','Когда-то Прометей подарил людям огонь. Сегодня в наших руках оказался интернет — возможность связаться с кем угодно и узнать почти что угодно. Но любой великий дар меняет мир и требует ответственности.'],
  ['07','ВЕНЕРА · ОТРАЖЕНИЯ','Богиня красоты оказывается пленницей собственных отражений в экранах смартфонов. В бесконечном стремлении увидеть и улучшить себя красота превращается в ловушку.'],
  ['06','СИЗИФ · БЕСКОНЕЧНЫЙ СКРОЛЛ','Как Сизиф вечно толкал свой камень, так и мы снова и снова прокручиваем ленту. Это рекурсивный ад: Сизиф смотрит на себя, смотрящего на себя, — и этому циклу нет конца.'],
  ['05','ПЕРСЕФОНА · ЦИФРОВОЕ ПОДЗЕМЕЛЬЕ','Персефона заперта в царстве Аида — здесь это холодные, безжизненные глубины кода и интернета. Даже если однажды она выйдет наружу, часть её навсегда останется в цифровом мире.'],
  ['04','МОРФЕЙ · ЭЛЕКТРИЧЕСКИЙ СОН','Герой сам надевает очки виртуальной реальности, чтобы укрыться от тягот жизни в царстве снов Морфея. Он не замечает протянутых к нему рук. Даже осознав опасность, он остаётся спокоен: возвращаться в реальность ему больше не хочется.'],
  ['03','ИКАР · НЕДОСТИЖИМЫЙ ИДЕАЛ','Икар стремится к недостижимому цифровому идеалу, не замечая, как постепенно разрушает самого себя. Его полёт — история о цене бесконечного стремления стать совершеннее.'],
  ['02','НАРЦИСС · ЦИФРОВОЙ ДВОЙНИК','Нарцисс влюблён в собственного цифрового двойника. Он не замечает, как созданное отражение постепенно становится реальнее его самого.'],
  ['01','ЯЩИК ПАНДОРЫ · ФИНАЛ','В руках Пандоры вместо ящика — смартфон. Мы уже открыли эту шкатулку, выпустив в мир не только удивительные возможности, но и пугающие последствия. Как жить с ними дальше — решать нам.']
 ];
 const gallery=document.createElement('section');gallery.className='myths-stories';
 stories.forEach(([num,title,description],i)=>{const item=document.createElement('article');item.className='myths-story';const pic=document.createElement('img');pic.src='assets/digital-myths-'+num+'.jpg';pic.alt='Плакат «'+title+'»';pic.loading=i<2?'eager':'lazy';const copy=document.createElement('div');copy.className='myths-story-copy';const h=document.createElement('h3');h.textContent=String(i+1).padStart(2,'0')+' / '+title;const p=document.createElement('p');p.textContent=description;copy.append(h,p);item.append(pic,copy);gallery.append(item)});
 body.append(gallery);
 const ending=document.createElement('section');ending.className='myths-ending';ending.innerHTML='<p>Мы открыли цифровой ящик Пандоры. Теперь история продолжается уже с нами.</p><h2>КАК ЗАКОНЧИТСЯ НАШ СОБСТВЕННЫЙ МИФ?</h2>';body.append(ending);
 const exhibition=document.createElement('section');exhibition.className='myths-exhibition';exhibition.innerHTML='<h2>ПРОЕКТ В ВЫСТАВОЧНОМ ПРОСТРАНСТВЕ</h2><p>Фотографии с выставки в Главном штабе Государственного Эрмитажа.</p><div class="myths-exhibition-images"><figure><img src="assets/digital-myths-09.jpg" alt="Плакат на выставке в экспозиционном пространстве" loading="lazy"><figcaption>Плакат «Aquatic Realm» на выставке в Главном штабе Эрмитажа</figcaption></figure><figure><img src="assets/digital-myths-10.jpg" alt="Плакаты «Цифровые мифы» на выставочной стене" loading="lazy"><figcaption>Плакаты серии на выставке в Главном штабе Эрмитажа</figcaption></figure></div>';body.append(exhibition);
 const back=document.createElement('a');back.className='button';back.href='index.html#projects';back.textContent='← Все проекты';body.append(back);
}

if(id==='3d' && data){
 const body=document.querySelector('.detail-body');body.innerHTML='';
 const intro=document.createElement('section');intro.className='myths-intro';intro.innerHTML='<p class="myths-eyebrow">КОНЦЕПТ ИГРЫ · 2026</p><h2>КОБЬ. СПАСЕНИЕ ЛЕСА</h2><p>«Кобь. Спасение леса» — мой проект визуальной концепции игры по мотивам славянского фольклора. Это история о волшебном лесе, его обитателях и столкновении сказочного мира с техногенной цивилизацией.</p><p>По сюжету ученик Бабы-яги отправляется на практику в затерянную избушку. Он помогает мифическим существам, варит зелья и противостоит вторжению «железных людей». По жанру проект сочетает казуальный симулятор алхимии и нарративную адвенчуру.</p><p>Моя задача заключалась в создании цельного визуального мира. Образы героев объединяют мотивы славянских мифов разных регионов, а локации опираются на исторические описания и реконструкции, дополненные волшебными деталями.</p>';body.append(intro);
 const sections=[
  {title:'ПЕРСОНАЖИ',description:'Три персонажа, воплощённые в 3D: Кощей, Кикимора и Леший.',items:[['06','КОЩЕЙ'],['11','КИКИМОРА'],['12','ЛЕШИЙ']]},
  {title:'КОНЦЕПТЫ ПЕРСОНАЖЕЙ',description:'Поиск образов шести обитателей сказочного мира: Русалки, Кикиморы, Кота Баюна, Варвары, Лешего и Кощея.',items:[['10','КОНЦЕПТЫ ПЕРСОНАЖЕЙ']]},
  {title:'ЛОКАЦИИ',description:'Три пространства сказочного леса: луг с капищем, огород и двор, интерьер избушки.',items:[['07','ЛУГ С КАПИЩЕМ'],['08','ОГОРОД И ДВОР'],['09','ИЗБУШКА']]},
  {title:'ИНТЕРФЕЙСЫ',description:'Игровые экраны, диалоги, главное меню, загрузка и меню паузы. Типографика и декоративные элементы развивают фольклорный характер игры.',items:[['01','ИГРОВОЙ ЭКРАН · ЛУГ'],['02','ИГРОВОЙ ЭКРАН · ИЗБУШКА'],['03','ГЛАВНОЕ МЕНЮ'],['04','ЭКРАН ЗАГРУЗКИ'],['05','МЕНЮ ПАУЗЫ']]}
 ];
 const gallery=document.createElement('section');gallery.className='kob-gallery';
 sections.forEach((section)=>{const wrap=document.createElement('section');wrap.className='kob-section';const heading=document.createElement('h2');heading.textContent=section.title;const desc=document.createElement('p');desc.textContent=section.description;wrap.append(heading,desc);const grid=document.createElement('div');grid.className='kob-grid';section.items.forEach(([num,label])=>{const fig=document.createElement('figure');fig.className='kob-figure';const img=document.createElement('img');img.src='assets/kob-new-'+num+(Number(num)<=5||num===7||num===8?'.jpg':'.png');img.alt=label+' — «Кобь. Спасение леса»';img.loading='lazy';const cap=document.createElement('figcaption');cap.textContent=label;fig.append(img,cap);grid.append(fig)});wrap.append(grid);gallery.append(wrap)});body.append(gallery);
 const end=document.createElement('section');end.className='myths-ending';end.innerHTML='<p>От мифологических образов до интерфейсов — единая визуальная система сказочного игрового мира.</p><h2>КОБЬ. СПАСЕНИЕ ЛЕСА</h2>';body.append(end);
 const back=document.createElement('a');back.className='button';back.href='index.html#projects';back.textContent='← Все проекты';body.append(back);
}
