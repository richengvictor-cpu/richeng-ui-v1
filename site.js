(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const pathLang = location.pathname.includes('/en/') ? 'en' : 'zh';
  const explicitLang = new URLSearchParams(location.search).get('lang');
  const lang = explicitLang === 'en' || explicitLang === 'zh' ? explicitLang : pathLang;

  window.RichengLang = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';

  const commonReplacements = [
    ['?交??臬?閮董憯思???', 'Richeng Certified Tax Accountants Firm'],
    ['?交?蝔?AI', 'Richeng Tax AI'],
    ['Richeng AI ??', 'Richeng AI Service'],
    ['?????穢 2026 Richeng AI嚚???撣喳ㄚ鈭??嚗??????押?, 'Copyright 穢 2026 Richeng AI | Richeng Certified Tax Accountants Firm. All rights reserved.'],
    ['Copyright 穢 2026 Richeng AI嚚???撣喳ㄚ鈭??. All rights reserved.', 'Copyright 穢 2026 Richeng AI | Richeng Certified Tax Accountants Firm. All rights reserved.'],
    ['擐? Demo v1嚗?瑼?梧?', 'Home Demo v1 (Archive)'],
    ['甇??銝駁?隞雁??www.richeng.com.tw嚗???靘?梧?銝蔣?蹂蜓??SEO??, 'The official homepage remains www.richeng.com.tw. The archive version is for reference only and does not affect the main site SEO.'],
    ['??蝬脤?', 'Archive'],
    ['擐?', 'Home'],
    ['???艙', 'Brand Story'],
    ['???', 'Services'],
    ['蝺?銵典', 'Online Forms'],
    ['撣貉???', 'FAQ'],
    ['?舐窗??, 'Contact Us'],
    ['??隢株岷', 'Book a Consultation'],
    ['?亦???', 'View Services'],
    ['??瘚?', 'Workflow'],
    ['????', 'Locations'],
    ['???寡', 'Working Style'],
    ['?舐窗?孵?', 'Contact'],
    ['?砍?餉?', 'Company Setup'],
    ['?平?餉?', 'Business Registration'],
    ['蝔???', 'Tax Services'],
    ['閮董??', 'Bookkeeping'],
    ['隡平隢桀?', 'Advisory'],
    ['?嗡?撠平??', 'Other Professional Services'],
    ['?啁姘?', 'Hsinchu Office'],
    ['蝡孵??', 'Zhubei Office'],
    ['?唳??', 'Xinhu Office'],
    ['?啣??', 'Taipei Office'],
    ['?砍?餉???璆剔閮?????撣單???璆剛垣?隞?璆剜???, 'Company setup, business registration, tax services, bookkeeping, advisory and other professional support'],
    ['皜??帘摰?璆哨??拙??瑟???', 'Clear, stable and professional for long-term collaboration'],
    ['Email?閰晞INE ?賢?湔?舐鼠', 'You can contact us directly by email, phone or LINE'],
    ['? Richeng AI 摰 LINE', 'Join Richeng AI Official LINE'],
    ['暺?銝停?賜?仿???閰?, 'Tap once to open the chat'],
    ['Richeng AI 摰 LINE', 'Richeng AI Official LINE'],
    ['??摰 LINE', 'Open Official LINE'],
    ['?乩??喟?仿?憪?雿??臭誑?‵蝺?銵典嚗??望????瘙??拙?瑯?, 'If you want to get started right away, fill out the online form first and we will help you determine the best path.'],
    ['憒?雿?銝Ⅱ摰?韏啣??蝔??蝯⊥????隞亙?撟思??斗??, 'If you are not sure which workflow to choose, contact us first and we will help you assess it.'],
    ['鈭之銵典嚗?亙‵撖?, 'Five forms, ready to fill'],
    ['撣貉?????銝??, 'Take a quick look at the FAQ'],
    ['?喳?隢?頛芯??臭誑', 'You can also start with a quick conversation'],
    ['?‵銵剁???敹怨???, 'Fill the form first to speed things up'],
    ['?閬犖撌亙??拐??臭誑', 'Human help is always available'],
    ['?亦?摰 50 憿?, 'View all 50 questions'],
    ['??撠?銝?瘝?靽?, 'If your question does not match, that is okay'],
    ['憒?雿??嗉惚嚗??臭誑?????渡?嚗?瘙箏?閬‵?芯?撘萸?, 'If you are still unsure, review the questions first and then choose the right form.'],
    ['??瘙??渡?憟踝??臭誑霈??敹怠?瑁楝敺?銋?雿敹恍脣撖阡?????, 'Organizing your needs first helps us assess the right path faster and gets you into real processing sooner.'],
    ['?砍閮剔?', 'Company Setup'],
    ['?砍霈', 'Company Change'],
    ['?平霈', 'Business Change'],
    ['閮董???瘙”', 'Bookkeeping Service Request Form'],
    ['蝔?隢株岷銵?, 'Tax Consultation Form'],
    ['????', 'Get Started'],
    ['?‵銵剁??游翰??', 'Fill the form first to move faster'],
    ['?‵銵剁???敹怨???, 'Fill the form first to speed things up'],
    ['撣貉?????銝??, 'Take a quick look at the FAQ'],
    ['?閬犖撌亙??拐??臭誑', 'Human help is always available'],
    ['?‵銵剁??游翰??', 'Fill the form first to move faster'],
    ['?‵銵剁???敹怨???, 'Fill the form first to speed things up'],
    ['00 / ???艙', '00 / Brand Story'],
    ['?冽筒???平摰?鋆∴????瓷蝔???敺憟?, 'In the vast commercial universe, keep finance and tax services moving toward precision'],
    ['Richeng AI嚚???撣喳ㄚ鈭?? 銝?芣?撣喳?憟踝????????憟?瑟??芯撈隡平????璆剔頂蝯晞誑 40 撟渲?撣喳ㄚ鈭??摨?蝯? AI ?摩嚗?鞎∠???撣喳ㄚ??閮葦??閮?蝔???湔?璆蝎暹???妝摨?憿批?擃???, 'Richeng AI | Richeng Certified Tax Accountants Firm is not only about keeping the books in order. It is about turning service into a professional system that can support businesses for the long run. Built on 40 years of accounting-firm expertise and AI logic, it organizes tax, bookkeeping, accounting and CPA-related workflows into a clearer, more precise and more orderly advisory experience.'],
    ['?眾??????銝鋆ˇ嚗鞊∪噩嚗??隡湧??⊥憭批?隡平嚗??銝剔敞蝛?撽?銋霈?銝剜?蝥脣???, 'The star river, meteors and halo are not decoration. They symbolize the many businesses we have accompanied over time, the experience we have accumulated, and the evolution that continues with every change.'],
    ['01 / 閬死隤?', '01 / Visual Language'],
    ['霈?Ｗ?蝎曉???嚗??臬蝯望芋??, 'Make the page feel like a premium brand, not a conventional template'],
    ['?湧?閬死銝???梧????摰??嗾瘛具帘摰?霈恥?嗡??澆停?賣??撠平?縑隞颯?, 'The visual direction is not about adding more effects. It is about being quiet, clean and stable so that professionalism and trust are felt at a glance.'],
    ['擃?璆萇陛', 'Premium Minimalism'],
    ['暺??妝摨?', 'The order of black, gray and white'],
    ['蝛拙????方??恍?蝘拙????踝??批捆?湔?璆???銋????, 'A stable foundation brings the page back to order and breathing room, making the content clearer and the brand feel more substantial.'],
    ['霅??, 'Accent Color'],
    ['?琿??啣??鈭?, 'Cool silver-gray only for accents'],
    ['?芸??????璇?撠?擃漁??橘?霈??????園?嚗?銝??扯?憟芯蜓??, 'Used only for highlights, buttons, lines and small focal points, it gives the brand a memorable accent without taking over the page.'],
    ['?征撖?', 'Starry Symbolism'],
    ['?眾?????誨銵券脣?', 'Star river, meteors and halo represent evolution'],
    ['??????隡平??蝔?頧?銝??蝭憟?撅斗活??摰?鈭?霈?Ｗ???隤除銝?氬?, 'We turn the ongoing process of serving businesses into a rhythmic, layered cosmic story so the visuals and brand voice stay aligned.'],
    ['02 / ??瘝輸', '02 / Brand Timeline'],
    ['敺?1985 ??Richeng AI嚗?璆剜?蝥?蝝?, 'From 1985 to Richeng AI, the expertise keeps evolving'],
    ['??????????璆剛?蝛拙?嚗蒂??蝔???鞈??渡????湔?璆?霈?雿????, 'We preserve the firm? professionalism and stability while making the workflow, communication and data organization clearer, so collaboration becomes more efficient.'],
    ['1985', '1985'],
    ['撠平摨???蝛?, 'Build the professional foundation first'],
    ['??1985 撟游蝡誑靘???瘛梯?貊閮?璆剔閮?????撣單???璆剛垣???嗡?撠平????, 'Since our founding in 1985, we have continued to focus on company setup, business registration, tax services, bookkeeping, advisory and other professional support.'],
    ['?曉', 'Today'],
    ['AI ??霈?蝔皜?', 'AI collaboration makes the workflow clearer'],
    ['?曉隞?Richeng AI ???耦撘?撠?銴?鞎∠?瘚??渡??皜??蝎暹???妝摨?憿批?擃???, 'Today, through the Richeng AI brand, we organize complex tax and bookkeeping workflows into a clearer, more precise and more structured advisory experience.'],
    ['01 / ???', '01 / Services'],
    ['?詨???嚗??餉??啗?撣喃?甈∪雿?, 'Core services, from setup to bookkeeping in one place'],
    ['銝?芣??桐????嚗??蝡颲艾?撣唾??喳???銝憟?瑟?????蝔?, 'We do not simply finish one task at a time. We connect setup, applications, bookkeeping and filings into a workflow that supports long-term collaboration.'],
    ['02 / ?詨???', '02 / Core Services'],
    ['雿?撣賊?閬??之??', 'The four services clients need most often'],
    ['憒?雿迤?冽?皜??帘摰隞仿??雿?鞎∠?憿批?嚗?憿??停?舀?撣貉??絲暺?, 'If you are looking for a clear, stable and long-term financial and tax advisor, these four service groups are the most common starting points.'],
    ['?砍閮剔?????, 'Company Setup and Changes'],
    ['?隡平摰??砍???砍??憿?蝜閮?霈?蝡??渲?敺??唾齒瘚??湔?璆?銋摰寞???蝞∠???, 'We help businesses complete company, branch and organizational registrations so setup, changes and follow-up filings remain clear and easy to manage.'],
    ['???極雿恕', 'Sole Proprietorships and Studios'],
    ['??銝剖?隡平?極雿恕??憌脫平?那????平????閮??唾齒?嚗?銝?閬芋??璆剝?賣?圈??韏琿???, 'We support small businesses, studios, restaurants, clinics and education providers with suitable registrations and applications, so every business size can start from the right place.'],
    ['?喳????, 'Filings and Planning'],
    ['敺董??????勗?憭?????蝬剜?撠平??閬?瘚?蝛拙?嚗??詨??湔?璆?銋摰寞?餈質馱??, 'From bookkeeping and tax filing to domestic and cross-border tax planning, we keep everything professional, compliant and stable so the numbers stay clear and easy to trace.'],
    ['?瑟?撣喳??渡?', 'Long-term Bookkeeping Organization'],
    ['??銝蝑?????游??氬摰寞???嚗?隡平?券???葉蝬剜?蝘拙????餈質馱?扼?, 'We organize every record in a complete and readable way, helping businesses maintain order, transparency and traceability over the long run.'],
    ['03 / ?獐??', '03 / How to Start'],
    ['????瘙??脣??', 'Understand the need first, then move into execution'],
    ['????銝雿恥?嗅????仿??芸楛?典銝甇伐??見?????湧??敹恬?銋撠???, 'We want every client to know exactly where they are before starting, so collaboration becomes smoother, faster and with less back-and-forth.'],
    ['?‵鞈?', 'Step 1: Submit the details'],
    ['??瘙??渡?憟踝?霈???游翰?斗雿?閬銝璇??楝敺?, 'Organize your needs first so we can quickly identify the right service path.'],
    ['??閰摯', 'Step 2: Review and assess'],
    ['????鞈?摰?扯????孵?嚗?粥?舀郊撽?銋?瘚??湔?????, 'We first review the completeness of the information and the appropriate direction, helping avoid wrong turns and keeping the process efficient.'],
    ['?脣?瑁?', 'Step 3: Move into execution'],
    ['蝣箄??孵?敺???甇???脣颲衣????梯?敺?????, 'Once the direction is confirmed, we move into processing, organization, filing and ongoing collaboration.'],
    ['?瓷蝔?????璆帘摰澆?靽∩遙?“??撽?, 'We turn tax and bookkeeping services into a clear, stable and trustworthy advisory experience.'],
    ['?乩??喟?仿?憪??遣霅啣?敺?銝”?桅脖?嚗?瘥?亦征?質蝯⊥敹恍脣撖虫???, 'If you want to start right away, we recommend beginning with the online form. It gets you into real processing faster than a blank contact message.'],
    ['鈭之銵典嚗?亙‵撖?, 'Five forms, ready to fill'],
    ['?砍閮剔???貉??氬?璆剛??氬?撣單????垣閰ａ?臭誑?湔???, 'Company setup, company changes, business changes, bookkeeping and tax consultation can all be submitted directly.'],
    ['?喳?隢?頛芯??臭誑', 'Prefer to talk first? That works too'],
    ['憒?雿?銝Ⅱ摰?韏啣??蝔??蝯⊥????隞亙?撟思??斗??, 'If you are not sure which process to choose, contact us first and we will help you decide.'],
    ['?‵銵剁?霈??敹怠鼠雿?唳迤蝣箇?頝臬???, 'Fill out the form first so we can help you find the right path faster.'],
    ['銵典?臬?雿?韏琿?嚗??舀?蝔?鞎???????航?雿?韏啣?頝胯?, 'The form is the starting point of collaboration, not a burden. Its purpose is to help you avoid unnecessary detours.'],
    ['04 / 撣貉???', '04 / FAQ'],
    ['????憿??捱摰獐??', 'Understand the question first, then decide how to begin'],
    ['擐?隞?????50 憿??????舀?撣貉◤??銝駁?蝮質汗??, 'The homepage still contains the full 50-question FAQ. This page is a concise overview of the questions clients ask most often.'],
    ['05 / ?撣詨?', '05 / Most Common Questions'],
    ['?摰寞??雿? 12 憿?, 'The 12 questions clients usually ask first'],
    ['憒?雿迤?冽?頛??鞊怨?憛怠撘菔”?殷??????虜撠梯閫??憭折????, 'If you are comparing services or unsure which form to use, this page usually answers most of the early questions.'],
    ['雿蜓閬??芯???嚗?, 'What services do you mainly provide?'],
    ['?蜓閬?靘?貉身蝡?璆剔閮?????撣單???璆剛垣???嗡?撠平???璅??臬?銝?嚗?瓷蝔?蝔?敺皜??蝛拙???, 'We mainly provide company setup, business registration, tax services, bookkeeping, advisory and other professional support. Our goal is not to complete only one task, but to make the tax and bookkeeping process clearer and more stable.'],
    ['憒????仿?閬‵?芸撐銵典?獐颲佗?', 'What if I do not know which form to fill out?'],
    ['?臭誑???亥??銝撘蛛???亥蝯⊥?????撟思??斗??????銝?閬洵銝甈∪停摰?詨???, 'Start with the closest form or contact us directly. We will help you choose the most suitable entry point, and you do not need to pick perfectly the first time.'],
    ['雿???貉身蝡?嚗?, 'Do you handle company setup?'],
    ['???砍閮剔??舀???撣貉?????銝??閬??????唾齒瘚?嚗???臭誑?雿??孵???皜???, 'Yes. Company setup is one of our most common services. From planning and document preparation to the filing process, we can help you clarify the direction first.'],
    ['雿隞亙??抵??渡閮?嚗?, 'Can you help with registration changes?'],
    ['?臭誑嚗??怠?貉??渲??平霈?質????游虜撣貊瘨?辣銝?湔扯???摰?嚗???撟思?銝韏瑞Ⅱ隤?, 'Yes. We can assist with both company changes and business registration changes. These often involve document consistency and timing, and we will help you review both.'],
    ['閮董???舫??雿?嚗?, 'Is bookkeeping usually a long-term engagement?'],
    ['憭??銝?瑟???嚗??臭誑靘?璆剝?瘙??銝????暺霈董?皜?嚗?蝥摰寞?餈質馱?恣??, 'In most cases, yes, it is a long-term collaboration, though single-service arrangements are also possible. The key is to make the bookkeeping clearer and easier to manage over time.'],
    ['蝔?隢株岷?臭誑??典???', 'Can tax consultation be done separately first?'],
    ['?臭誑嚗雿?舀??閫???蝔?隢株岷銵典停?臬?憟賜?韏琿?????憿??璆???憪??虜?????, 'Yes. If you only want to understand the direction first, the tax consultation form is a good starting point. Clarifying the issue first usually makes the process more efficient.'],
    ['雿????孵????嗅???', 'Is your collaboration style very rigid?'],
    ['銝?嚗???靘???瘜???拙???雿撘????臬蝯血摰芋?踴??璆准???畾蛛??閬?摰?銝?摰?詨???, 'No. We tailor the collaboration style to your situation instead of relying on a fixed template. Different industries and stages require different arrangements.'],
    ['AI ?其?????鋆⊥瞍?暻潸??莎?', 'What role does AI play in your services?'],
    ['AI 銝餉??典瘚??渡???閮飛蝝???頛嚗??敹怎???瘙敹急????雿?蝯??勗?璆剖?瑟???, 'AI is mainly used for workflow organization, information structuring and collaboration support. It helps us understand requests faster and organize materials sooner, while final judgment still comes from professional expertise.'],
    ['摰Ｘ????蝔?嚗?, 'Can clients understand the workflow?'],
    ['?????函??璆??孵?隤芣?甇仿?嚗??璆剛?隤云憭末????閰脫霈犖???????舀?唳???, 'Yes. We explain the steps in the clearest possible way and avoid too much jargon. Good service should make things easier to understand, not more confusing.'],
    ['雿???敹恍???嚗?, 'Do you offer expedited handling?'],
    ['憒?獢辣頛伐?????隡啣銵改???????摨乩辣??暺??舐?桀?敹恬???????????末??, 'If the case is urgent, we first assess feasibility and then arrange the processing order. The key is not to rush blindly, but to handle the most important parts first.'],
    ['?隞亙??芸??桐????', 'Can I start with only one service?'],
    ['?臭誑嚗?銝?摰?銝甈⊥?????鈭斤策?雿?閬銝??嚗??賭??瘙?典???, 'Yes. You do not need to hand over everything at once. If you only need one service, we can arrange it separately.'],
    ['?芾ㄐ?臭誑????50 憿?', 'Where can I see the full 50 questions?'],
    ['擐????渡? 50 憿?FAQ ?臬?????蝎曄陛?蜇閬踝??嫣噶雿?敹恍?閫??撣貉???憿?, 'The homepage contains the full 50-question FAQ. This page is a condensed overview for a quick look at the most common questions.'],
    ['06 / 隞?蝣箏?嚗?, '06 / Still Unsure?'],
    ['?湔敺”?格??舐窗?亙??', 'Start from the forms or contact entry points'],
    ['憒? FAQ ????蝑雿???嚗?銝甇交????撘停?舐?仿銵典?蝯⊥???, 'If the FAQ still does not answer your case, the most effective next step is to submit a form or contact us directly.'],
    ['?湔?豢???亥??”??, 'Choose the form that is closest to your need'],
    ['?砍閮剔????氬?撣喋??垣閰ａ?臭誑?湔?脩?憛怠神??, 'Company setup, changes, bookkeeping and tax consultation can all be filled in directly.'],
    ['?閬犖撌亙??拐??臭誑', 'Human assistance is also available'],
    ['憒?雿??銝頛迎????臭誑?鼠雿?瑟???楝敺?, 'If you want to talk first, we can also help you identify the most suitable path.'],
    ['FAQ 銝蝯偏嚗霈??游翰??????, 'FAQ is not the end; it is the entry point that helps you start faster.'],
    ['憒?雿歇蝬?啁?獢?撠勗隞亦?亙?銝?甇亥粥嚗???瘝?堆??隞亦?亙鼠雿雿?瘙?, 'If you have already found the answer, you can move to the next step right away. If not, we can help take it from here.'],
    ['?亦?摰 50 憿?, 'View the full 50 questions'],
    ['憒?雿銝甈∠?摰???憿??臭誑?湔???????渡???, 'If you want to review every question at once, open the full version on the homepage.'],
    ['??撠?銝?瘝?靽?, 'If your question does not match, that is okay'],
    ['?‵銵剁?霈??鼠雿翰???????蝔?, 'Fill out the form first and we will help match you to the most suitable workflow.'],
    ['07 / ?舐窗??, '07 / Contact Us'],
    ['憒?雿?瓷蝔?蝔???湔?璆??曉撠勗隞仿?憪?, 'If you want to make your tax and bookkeeping workflow clearer, you can begin now.'],
    ['??雿??嫣噶?撘?憪?霈?Richeng AI ?湔?乩?雿???蝭憟?, 'Start with the channel that is most convenient for you and let Richeng AI align with your collaboration rhythm.'],
    ['08 / ?舐窗?孵?', '08 / Contact Methods'],
    ['銝??湔???, 'Three direct ways to reach us'],
    ['憒?雿敹恍銝????? LINE?閰望? Email ???喳??, 'If you want to connect quickly, start with LINE, phone or email.'],
    ['Richeng AI ??', 'Richeng AI Service'],
    ['??拙?????閰梧?敹恍Ⅱ隤??曉??瘙?銝?甇乓?, 'Best for starting the conversation and quickly confirming your needs and next step.'],
    ['?餉店?舐窗', 'Phone'],
    ['?乩??喟?亥牧??瘜??餉店?臭誑?游翰?乩???蝭憟?, 'If you want to explain your situation directly, phone calls can connect to the collaboration rhythm faster.'],
    ['Email ?舐窗', 'Email'],
    ['?拙???鞈???蝝牧????銝?摰??瘙摰嫘?, 'Suitable for sending materials first, booking a discussion, or leaving a more detailed request.'],
    ['09 / LINE ?Ⅳ', '09 / LINE QR'],
    ['?湔? Richeng AI ??', 'Join Richeng AI Service directly'],
    ['?Ⅳ敺?臬??亙???LINE嚗?雿敹恍?憪蝯～?, 'Scan the code to join our official LINE and start the conversation faster.'],
    ['???喳? Richeng AI 摰 LINE??, 'Scan to join the official Richeng AI LINE.'],
    ['摰 LINE ?亙', 'Official LINE Entry'],
    ['雿??臭誑?湔暺???敺摰 LINE嚗蝔格撘?賢翰?蝜怒?, 'You can also click the button to open the official LINE. Both options get you in touch quickly.'],
    ['?湔??', 'Open LINE'],
    ['10 / ????', '10 / Office Locations'],
    ['?湔?亦???暺?Google Map', 'View each office on Google Maps'],
    ['暺??喳???啣?嚗靘蹂??曉?餈?????, 'Click to open the map and find the nearest office easily.'],
    ['?啁姘撣??頝?27 ??2 璅? 7', '2F-7, No. 27, Guanxin Rd., East Dist., Hsinchu City'],
    ['?拙??閬蝡孵??????Ｗ???, 'Ideal for clients who need service or meetings in Hsinchu.'],
    ['蝡孵?撣??? 225 ??, 'No. 225, Bo'ai St., Zhubei City, Hsinchu County'],
    ['?舐?仿??啣??亦?雿蔭??敺頝舐???, 'Check the map directly for location and directions.'],
    ['?啁姘蝮??????啗?頝?366 ??, 'No. 366, Xinxing Rd., Hukou Township, Hsinchu County'],
    ['?拙??唳??????撣嗥?摰Ｘ?湔?交??, 'Convenient for clients in Xinhu and Hukou.'],
    ['?啣?撣皝???頝?168 ??9F', '9F, No. 168, Ruiguang Rd., Neihu Dist., Taipei City'],
    ['?乩??典??銋?湔?勗?翰???蝵柴?, 'If you are in Taipei, you can quickly check the location on the map.'],
    ['40 撟游?璆剖?摮?蝯? AI 霈???閮董?渡移皞?, '40 years of expertise, enhanced by AI to make tax and bookkeeping more precise.'],
    ['?交??臬?閮董憯思?????1985 撟游蝡誑靘???瘛梯?貊閮?璆剔閮?????撣單???璆剛垣???嗡?撠平????, 'Since 1985, Richeng Certified Tax Accountants Firm has continued to focus on company setup, business registration, tax services, bookkeeping, advisory and other professional support.'],
    ['????銝雿恥?園?賣??嚗??臭????蝬莎??銝??瑟??芯撈隡平?脩?撠平????, 'We want every client to feel this is not an ordinary website, but a professional brand that can accompany businesses for the long run.'],
    ['?‵銵剁??游翰??', 'Fill the form first to move faster'],
    ['??瘙??渡?憟踝???撠梯?湧??Ｕ?, 'Organize your needs first and collaboration becomes smoother.'],
    ['FAQ 50 憿?, 'FAQ 50 Questions'],
    ['??撣貉???嚗虜?賣敹急?啁?獢?, 'Start with the common questions to find answers faster.']
  ];

  const pageConfig = {
    'index.html': {
      title: 'Richeng AI | Richeng Certified Tax Accountants Firm Official Website',
      description: 'Richeng AI combines 40 years of tax-accounting expertise with AI coordination to help companies with setup, registration, bookkeeping, accounting and tax services in a clearer and more precise way.',
      ogTitle: 'Richeng AI | Richeng Certified Tax Accountants Firm Official Website',
      ogDescription: 'A premium AI tax-accounting brand that brings order, clarity and precision to tax and bookkeeping services.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us'],
      brandMain: 'Richeng AI',
      brandSub: 'Richeng Certified Tax Accountants Firm',
      brandEnglish: 'Richeng Accounting Firm.',
      hero: [
        { selector: '.hero .eyebrow', text: 'Richeng Certified Tax Accountants Firm' },
        { selector: '[data-hero-title]', text: 'Making tax services more precise as they evolve' },
        { selector: '[data-hero-lead]', text: 'Richeng AI combines 40 years of accounting-firm expertise with AI logic, preserving the stability and trust of a professional firm while turning complex tax, bookkeeping, accounting and business workflows into a clearer, more precise advisory experience.' },
        { selector: '.hero-note', text: 'Black, white and gray remain the foundation, with a subtle silver-gray accent for identity, and a star river, meteors and halo as the symbol of continuous evolution.' }
      ],
      heroActions: ['Book a Consultation', 'View Services', 'FAQ'],
      heroStories: [
        {
          title: 'Making tax services more precise as they evolve',
          lead: 'Richeng AI combines 40 years of accounting-firm expertise with AI logic, preserving the stability and trust of a professional firm while turning complex tax, bookkeeping, accounting and business workflows into a clearer, more precise advisory experience.'
        },
        {
          title: 'Turning tax and bookkeeping from complexity into order',
          lead: 'We refine company setup, business registration, bookkeeping, tax filing and accounting-related workflows into a clearer rhythm of collaboration, so every step feels more stable and easier to follow.'
        },
        {
          title: 'Using AI and a firm foundation to make finance and tax work more stable and faster',
          lead: 'Richeng AI combines professional experience, AI logic and branded processes to align company needs, so every collaboration feels clearer, safer and more like long-term support.'
        }
      ],
      meteorStories: [
        { name: 'Leonids Meteor Shower', copy: 'Peak-night efficiency and a fast streak across the sky, ideal for showing how Richeng AI turns complex workflows into order at critical moments.' },
        { name: 'Perseids Meteor Shower', copy: 'High efficiency, speed, brightness and a long tail, like a certified tax-accounting firm turning complicated steps into a clean and agile collaboration track.' },
        { name: 'Orionids Meteor Shower', copy: 'Strong velocity and a clean visual rhythm, ideal for expressing a premium AI tax-accounting brand with a forward-looking feel.' },
        { name: 'Geminids Meteor Shower', copy: 'Stable and persistent, symbolizing the long-term support Richeng AI provides to growing businesses.' },
        { name: 'Lyrids Meteor Shower', copy: 'With a sense of history and legacy, it represents an established firm evolving into an AI-driven brand.' }
      ],
      sections: [
        ['.section .section-head .eyebrow', ['00 / Brand Story', '01 / Core Services', '02 / Evolution Path', '03 / Brand Feeling', '04 / Bookkeepers & CPAs', '05 / Workflow', '06 / FAQ', '07 / Contact']],
        ['.section .section-head h2', ['In the vast commercial universe, keep finance and tax services moving toward precision', 'Richeng AI started in 1985 and continues to evolve with AI', 'Premium, minimal and calm, yet practical and trusted', 'Core services for setup, bookkeeping, tax and advisory', 'A workflow that keeps every step clear', 'FAQ for fast answers', 'Get in touch and start the conversation']]
      ],
      footer: {
        h3: '40 years of expertise, enhanced by AI to make tax and bookkeeping more precise.',
        p: 'Since 1985, Richeng Certified Tax Accountants Firm has focused on company setup, business registration, tax services, bookkeeping, advisory and other professional support. Today, Richeng AI keeps the firm-level trust and professionalism while organizing complex workflows into a clearer, more precise and more structured advisory experience. The star river, meteors and halo symbolize continuous evolution and long-term support for businesses.',
        rail: ['www.richeng.com.tw', 'service@richeng.com.tw', 'Richeng AI Service', '+886-3-5543756'],
        links: [
          ['Services', 'Company setup, business registration, tax services, bookkeeping, advisory and other professional support'],
          ['Archive', 'Home Demo v1 (Archive)', 'The official homepage remains www.richeng.com.tw. The archive version is for reference only and does not affect the main site SEO.'],
          ['Locations', 'Hsinchu Office', 'No. 2, Alley 7, Lane 27, Guanxin Road, East District, Hsinchu City'],
          ['Working Style', 'Clear, stable and professional for long-term collaboration'],
          ['Contact', 'Email, phone and LINE are available directly']
        ]
      }
    },
    'about.html': {
      title: 'Richeng AI | Brand Story',
      description: 'Richeng AI is built on 40 years of tax-accounting expertise, combining AI coordination with professional judgment to deliver a calmer and more precise advisory experience.',
      ogTitle: 'Richeng AI | Brand Story',
      ogDescription: 'The story of Richeng AI: a premium tax-accounting brand evolving from firm-level expertise into AI-assisted advisory.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'services.html': {
      title: 'Richeng AI | Services',
      description: 'Company setup, business registration, tax services, bookkeeping, advisory and other professional support from Richeng AI.',
      ogTitle: 'Richeng AI | Services',
      ogDescription: 'A clear overview of Richeng AI services, built for company setup, bookkeeping, tax and advisory workflows.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'forms.html': {
      title: 'Richeng AI | Online Forms',
      description: 'Five online forms for company setup, company change, business change, bookkeeping requests and tax consultations.',
      ogTitle: 'Richeng AI | Online Forms',
      ogDescription: 'Fill out the Richeng AI forms online to get started faster and more accurately.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'faq.html': {
      title: 'Richeng AI | FAQ',
      description: 'Common questions about Richeng AI, including services, workflows, forms and contact methods.',
      ogTitle: 'Richeng AI | FAQ',
      ogDescription: 'Answers to the most common questions about Richeng AI and its tax-accounting services.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    },
    'contact.html': {
      title: 'Richeng AI | Contact',
      description: 'Contact Richeng AI through LINE, phone, email or by visiting one of our office locations.',
      ogTitle: 'Richeng AI | Contact',
      ogDescription: 'Get in touch with Richeng AI through LINE, phone, email or office visits.',
      nav: ['Home', 'Brand Story', 'Services', 'Online Forms', 'FAQ', 'Contact Us']
    }
  };

  const setMeta = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  };

  const applyText = (selector, value) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.textContent = value;
  };

  const applyList = (selector, values) => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, idx) => {
      if (values[idx] == null) return;
      el.textContent = values[idx];
    });
  };

  const injectSecurityMeta = () => {
    const head = document.head;
    if (!head || head.querySelector('meta[data-richeng-security="true"]')) return;

    const metas = [
      {
        httpEquiv: 'Content-Security-Policy',
        content: [
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "frame-ancestors 'none'",
          "form-action 'self' https://forms.gle",
          "img-src 'self' data:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "media-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          'upgrade-insecure-requests'
        ].join('; ')
      },
      { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { httpEquiv: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=(), payment=()' },
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'color-scheme', content: 'dark' }
    ];

    metas.forEach((entry) => {
      const meta = document.createElement('meta');
      meta.dataset.richengSecurity = 'true';
      if (entry.httpEquiv) meta.httpEquiv = entry.httpEquiv;
      if (entry.name) meta.name = entry.name;
      meta.content = entry.content;
      head.appendChild(meta);
    });
  };

  const hardenLinks = () => {
    const sameOrigin = (href) => {
      try {
        return new URL(href, location.href).origin === location.origin;
      } catch {
        return false;
      }
    };

    document.querySelectorAll('a[href]').forEach((a) => {
      const href = (a.getAttribute('href') || '').trim();
      const isHttp = /^https?:\/\//i.test(href);
      if (a.target === '_blank' || (isHttp && !sameOrigin(href))) {
        const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        a.setAttribute('rel', Array.from(rel).join(' '));
        if (!a.hasAttribute('referrerpolicy')) {
          a.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        }
      }
    });
  };

  const replaceTextNodes = (replacements) => {
    const pairs = [...replacements].sort((a, b) => b[0].length - a[0].length);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach((textNode) => {
      const parent = textNode.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(parent.tagName)) return;
      let text = textNode.nodeValue;
      for (const [zh, en] of pairs) {
        if (text.includes(zh)) text = text.split(zh).join(en);
      }
      textNode.nodeValue = text;
    });
  };

  const injectToggle = () => {
    const topbar = document.querySelector('.topbar');
    const nav = document.querySelector('.topnav');
    if (!topbar || !nav || topbar.querySelector('.lang-switch')) return;
    const current = page === 'index.html' ? 'index.html' : page;
    const homePath = (targetLang) => targetLang === 'en' ? '/en/' : '/';
    const toPath = (targetLang) => targetLang === 'en'
      ? (current === 'index.html' ? homePath('en') : `/en/${current}`)
      : (current === 'index.html' ? homePath('zh') : `/${current}`);
    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    const zhLink = document.createElement('a');
    zhLink.href = toPath('zh');
    zhLink.dataset.lang = 'zh';
    zhLink.textContent = '中';
    const sep = document.createElement('span');
    sep.textContent = '/';
    const enLink = document.createElement('a');
    enLink.href = toPath('en');
    enLink.dataset.lang = 'en';
    enLink.textContent = 'EN';
    wrap.append(zhLink, sep, enLink);
    nav.insertAdjacentElement('afterend', wrap);
    updateToggleState();
  };

  const updateToggleState = () => {
    document.querySelectorAll('.lang-switch a').forEach((btn) => {
      const active = (btn.dataset.lang || 'zh') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const applyLanguage = () => {
    injectSecurityMeta();
    hardenLinks();
    injectToggle();
    updateToggleState();
    if (lang === 'zh') return;

    const cfg = pageConfig[page] || pageConfig['index.html'];
    if (!cfg) return;

    document.documentElement.lang = 'en';
    if (cfg.title) document.title = cfg.title;
    if (cfg.description) setMeta('meta[name="description"]', cfg.description);
    if (cfg.ogTitle) setMeta('meta[property="og:title"]', cfg.ogTitle);
    if (cfg.ogDescription) setMeta('meta[property="og:description"]', cfg.ogDescription);
    if (cfg.ogTitle) setMeta('meta[name="twitter:title"]', cfg.ogTitle);
    if (cfg.ogDescription) setMeta('meta[name="twitter:description"]', cfg.ogDescription);

    if (cfg.nav) applyList('.topnav a', cfg.nav);
    applyText('.brand-copy strong', cfg.brandMain || 'Richeng AI');
    const brandSpans = document.querySelectorAll('.brand-copy span');
    if (brandSpans[0]) brandSpans[0].textContent = cfg.brandSub || 'Richeng Certified Tax Accountants Firm';
    if (brandSpans[1]) brandSpans[1].textContent = cfg.brandEnglish || 'Richeng Accounting Firm.';

    if (page === 'index.html') {
      cfg.hero.forEach(({ selector, text }) => applyText(selector, text));
      applyList('.hero-actions .btn', cfg.heroActions);
      applyList('.section .section-head .eyebrow', cfg.sections[0][1]);
      applyList('.section .section-head h2', cfg.sections[1][1]);
      applyText('.footer-copy h3', cfg.footer.h3);
      applyText('.footer-copy p', cfg.footer.p);
      applyList('.footer-rail span', cfg.footer.rail);
      applyList('.footer-links .footer-link strong', cfg.footer.links.map((item) => item[0]));
      const footerLinks = document.querySelectorAll('.footer-links .footer-link, .footer-links .location-card');
      footerLinks.forEach((card, idx) => {
        const info = cfg.footer.links[idx];
        if (!info) return;
        const title = card.querySelector('strong, h3');
        const body = card.querySelector('p, .footer-legacy-note, span:not(.tag)');
        if (title) title.textContent = info[1] || info[0];
        if (body && info[2]) body.textContent = info[2];
      });
      replaceTextNodes(commonReplacements);
      const stories = cfg.heroStories;
      if (stories && window.RichengIndexHeroStories) {
        window.RichengIndexHeroStories = stories;
      }
      const meteorStories = cfg.meteorStories;
      if (meteorStories && window.RichengIndexMeteorStories) {
        window.RichengIndexMeteorStories = meteorStories;
      }
    } else {
      // Generic, light-touch translations for the other pages.
      replaceTextNodes(commonReplacements);
    }
  };

  applyLanguage();
})();

