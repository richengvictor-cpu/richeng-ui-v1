const PAGE_TITLES = {
  home: "首頁",
  "run-detail": "執行詳情",
  inputs: "輸入來源",
  health: "健康狀態",
  settings: "設定",
};

const FALLBACK_MANIFEST = {
  sourceMode: "mock/sample-first",
  generatedAt: "n/a",
  home: {
    eyebrow: "mock / sample-first",
    title: "Richeng AI V6 只讀營運看板",
    subtitle: "目前為 UI 骨架與安全只讀路線的過渡版。若 manifest 不可用，會退回 mock/sample-first 內容。",
    badges: [
      { label: "只讀", tone: "info" },
      { label: "watcher freeze", tone: "good" },
      { label: "scheduler freeze", tone: "good" },
      { label: "runner ready", tone: "warn" },
    ],
    cards: [
      { label: "最新狀態摘要", value: "mock sample" },
      { label: "最新 run 概況", value: "mock sample" },
      { label: "queue / status", value: "mock sample" },
      { label: "wrapper 決策", value: "mock sample" },
    ],
    sources: [
      { label: "任務來源", value: "agents/incoming/task.txt" },
      { label: "回報來源", value: "agents/incoming/codex_report.txt" },
      { label: "狀態來源", value: "agents/runs/*.json" },
      { label: "最新執行", value: "agents/runs/latest" },
    ],
    quickLinks: [
      { label: "查看執行詳情", href: "./run-detail.html" },
      { label: "查看輸入來源", href: "./inputs.html" },
      { label: "查看健康狀態", href: "./health.html" },
      { label: "查看設定", href: "./settings.html" },
    ],
  },
  runDetail: {
    eyebrow: "執行詳情",
    title: "最新 run 只讀摘要",
    subtitle: "mock/sample-first 狀態。若有 read-only manifest，會在這裡展示最新 run_dir、summary、judge 與 governor 的精簡內容。",
    meta: [
      { label: "最新 run_dir", value: "mock sample" },
      { label: "執行模式", value: "mock sample" },
      { label: "Governor", value: "mock sample" },
      { label: "Judge", value: "mock sample" },
      { label: "Runner", value: "mock sample" },
    ],
    summary: ["尚未接入真實只讀資料。"],
    judge: ["尚未接入真實只讀資料。"],
    governor: ["尚未接入真實只讀資料。"],
    artifacts: [
      { name: "04_summary.txt", path: "agents/runs/<latest>/04_summary.txt" },
      { name: "03_judge_result.txt", path: "agents/runs/<latest>/03_judge_result.txt" },
      { name: "01_governor_order.txt", path: "agents/runs/<latest>/01_governor_order.txt" },
    ],
    timeline: [
      { time: "11:28", label: "scheduler wrapper", status: "停止", detail: "mock sample" },
      { time: "11:23", label: "watcher", status: "觸發", detail: "mock sample" },
      { time: "10:21", label: "retry", status: "略過", detail: "mock sample" },
    ],
    tags: ["artifact", "summary", "judge", "governor"],
  },
  inputs: {
    eyebrow: "輸入來源",
    title: "只讀輸入摘要",
    subtitle: "這一頁只展示 task.txt 與 codex_report.txt 的摘要，不提供回寫或控制。",
    meta: [
      { label: "任務檔", value: "agents/incoming/task.txt" },
      { label: "回報檔", value: "agents/incoming/codex_report.txt" },
      { label: "模式", value: "mock sample" },
      { label: "簽章", value: "mock sample" },
    ],
    taskPreview: ["尚未接入真實只讀資料。"],
    reportPreview: ["尚未接入真實只讀資料。"],
    sourceCards: [
      { name: "task.txt", note: "任務來源摘要" },
      { name: "codex_report.txt", note: "回報來源摘要" },
      { name: "queue / status", note: "只讀健康資訊" },
    ],
  },
  health: {
    eyebrow: "健康狀態",
    title: "狀態與守門健康檢視",
    subtitle: "用來顯示 state / queue / status / wrapper status 的只讀摘要，不涉及任何執行控制。",
    rows: [
      ["Watcher v1", "freeze", "mock sample"],
      ["Scheduler wrapper v1", "freeze", "mock sample"],
      ["Runner v1", "ready", "mock sample"],
      ["Queue", "unknown", "mock sample"],
      ["Retry", "0 / 2", "mock sample"],
    ],
    guardRows: [
      { label: "只讀邊界", value: "mock sample" },
      { label: "stale lock recovery", value: "mock sample" },
      { label: "write-back", value: "disabled" },
      { label: "trigger / control", value: "disabled" },
    ],
    notes: [
      "UI 僅作只讀展示。",
      "真實資料若啟用，仍需保留脫敏與欄位收斂。",
      "不直接觸碰 watcher / scheduler / runner 核心。",
    ],
  },
  settings: {
    eyebrow: "設定",
    title: "介面邊界與只讀規則",
    subtitle: "展示目前 UI 與 agent 主線之間的只讀邊界、Canva 邊界與後續施工順序。",
    rows: [
      ["顯示語言", "繁體中文主版本"],
      ["資料模式", "只讀 snapshot / manifest"],
      ["主線分層", "UI → adapter → artifacts"],
      ["回寫能力", "禁止"],
    ],
    boundaryRows: [
      { label: "可讀來源", value: "agents/runs / agents/incoming" },
      { label: "不可外露", value: "auth diagnostic raw / 完整 fingerprint / 絕對路徑" },
      { label: "不可碰", value: "write-back / trigger / execution-control" },
      { label: "可延後", value: "完整前端資料串接 / Canva 深度串接" },
    ],
    canvaRows: [
      { label: "Canva 邊界", value: "視覺稿 / 線框稿 / 版型確認" },
      { label: "正式前端", value: "保留在 UI 工程內" },
      { label: "read-only adapter", value: "已 freeze / 只讀中介層" },
    ],
  },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeJoin(lines) {
  return (lines || [])
    .filter(Boolean)
    .map((line) => `<div class="empty-state">${escapeHtml(line)}</div>`)
    .join("");
}

function listRows(rows) {
  return (rows || [])
    .map(([label, value, note]) => `
      <div class="table-row">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(value)}</span>
        <span>${escapeHtml(note || "")}</span>
        <span>只讀</span>
      </div>
    `)
    .join("");
}

function kvRows(rows) {
  return (rows || [])
    .map(({ label, value }) => `
      <div class="kv">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `)
    .join("");
}

function tagRows(tags) {
  return (tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function buttonLinks(items) {
  return (items || [])
    .map((item) => `<a class="btn ghost" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
    .join("");
}

function nav(activePage) {
  const items = [
    ["home", "首頁", "./index.html"],
    ["run-detail", "執行詳情", "./run-detail.html"],
    ["inputs", "輸入來源", "./inputs.html"],
    ["health", "健康狀態", "./health.html"],
    ["settings", "設定", "./settings.html"],
  ];

  return `
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">
          <img class="brand-logo" src="./assets/richeng-logo.png" alt="Richeng Logo">
        </div>
        <div class="brand-copy">
          <h1>Richeng AI V6 - 只讀營運看板</h1>
          <p>只讀 snapshot / manifest - watcher / scheduler / runner 分層 - mock fallback 保留</p>
        </div>
      </div>
      <nav class="nav" aria-label="Primary">
        ${items
          .map(
            ([key, label, href]) =>
              `<a href="${href}" ${activePage === key ? 'aria-current="page"' : ""}>${label}</a>`,
          )
          .join("")}
      </nav>
    </header>
  `;
}

function shell(activePage) {
  return `
    <div class="app-shell">
      ${nav(activePage)}
      <main id="app"></main>
    </div>
  `;
}

function getManifest() {
  const manifest = window.RichengReadOnlyAdapter?.load?.();
  return manifest || FALLBACK_MANIFEST;
}

function renderHome(data) {
  const home = data.home || FALLBACK_MANIFEST.home;
  return `
    <section class="hero">
      <div class="hero-grid">
        <div>
          <span class="eyebrow">${escapeHtml(home.eyebrow)}</span>
          <h2>${escapeHtml(home.title)}</h2>
          <p>${escapeHtml(home.subtitle)}</p>
          <div class="status-row">
            ${home.badges.map((item) => `<span class="pill ${item.tone || "info"}">${escapeHtml(item.label)}</span>`).join("")}
          </div>
          <div class="status-row">
            ${buttonLinks(home.quickLinks)}
          </div>
          <p class="footer-note">資料來源為只讀 snapshot / manifest，不含 write-back、trigger、execution-control。${escapeHtml(data.generatedAt || "")}</p>
        </div>
        <aside class="hero-aside">
          <div class="glass">
            <h3>最新狀態摘要</h3>
            <div class="kv-list">
              ${kvRows(home.cards || [])}
            </div>
          </div>
          <div class="glass">
            <h3>來源區</h3>
            <div class="kv-list">
              ${kvRows(home.sources || [])}
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div>
          <h3>只讀資料卡</h3>
          <p>首頁先顯示最值得看的真實摘要，不暴露控制面。</p>
        </div>
      </div>
      <div class="grid-4">
        <article class="card">
          <h4>監看狀態</h4>
          <div class="metric">${escapeHtml(data.health?.rows?.[0]?.[1] || "未知")}</div>
          <div class="subtle">${escapeHtml(data.health?.rows?.[0]?.[2] || "只讀")}</div>
        </article>
        <article class="card">
          <h4>Queue / Retry</h4>
          <div class="stack">
            <div class="row"><strong>Queue</strong><small>${escapeHtml(data.health?.rows?.[3]?.[1] || "未知")}</small></div>
            <div class="row"><strong>Retry</strong><small>${escapeHtml(data.health?.rows?.[4]?.[1] || "未知")}</small></div>
            <div class="row"><strong>Wrapper</strong><small>${escapeHtml(data.home?.latestWrapperDecision || "skip")}</small></div>
          </div>
        </article>
        <article class="card">
          <h4>最新 run 概況</h4>
          <div class="stack">
            <div class="row"><strong>run_dir</strong><small>${escapeHtml(data.runDetail?.meta?.[0]?.[1] || "未知")}</small></div>
            <div class="row"><strong>模式</strong><small>${escapeHtml(data.runDetail?.meta?.[1]?.[1] || "未知")}</small></div>
            <div class="row"><strong>Judge</strong><small>${escapeHtml(data.runDetail?.meta?.[3]?.[1] || "未知")}</small></div>
          </div>
        </article>
        <article class="card">
          <h4>安全邊界</h4>
          <div class="stack">
            ${safeJoin(data.settings?.boundaryRows?.map((row) => `${row.label}：${row.value}`) || [])}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderRunDetail(data) {
  const runDetail = data.runDetail || FALLBACK_MANIFEST.runDetail;
  return `
    <section class="hero">
      <span class="eyebrow">${escapeHtml(runDetail.eyebrow)}</span>
      <h2>${escapeHtml(runDetail.title)}</h2>
      <p>${escapeHtml(runDetail.subtitle)}</p>
    </section>

    <section class="section grid-2">
      <article class="card">
        <h4>執行摘要</h4>
        <div class="kv-list">
          ${kvRows(runDetail.meta || [])}
        </div>
      </article>
      <article class="card">
        <h4>產出檔案</h4>
        <div class="stack">
          ${(runDetail.artifacts || []).map((artifact) => `
            <div class="row"><strong>${escapeHtml(artifact.name)}</strong><small>${escapeHtml(artifact.path)}</small></div>
          `).join("")}
        </div>
      </article>
    </section>

    <section class="section split">
      <article class="card">
        <h4>Summary</h4>
        <div class="stack">${safeJoin(runDetail.summary)}</div>
      </article>
      <article class="card">
        <h4>Judge / Governor</h4>
        <div class="stack">${safeJoin([...runDetail.judge, ...runDetail.governor])}</div>
      </article>
    </section>

    <section class="section split">
      <article class="card">
        <h4>時間軸</h4>
        <div class="timeline">
          ${(runDetail.timeline || []).map((item) => `
            <div class="timeline-item">
              <div class="timeline-time">${escapeHtml(item.time)}</div>
              <div class="timeline-box">
                <strong>${escapeHtml(item.label)}</strong>
                <span class="subtle">${escapeHtml(item.detail)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="card">
        <h4>標籤</h4>
        <div class="tagrow">${tagRows(runDetail.tags)}</div>
      </article>
    </section>
  `;
}

function renderInputs(data) {
  const inputs = data.inputs || FALLBACK_MANIFEST.inputs;
  return `
    <section class="hero">
      <span class="eyebrow">${escapeHtml(inputs.eyebrow)}</span>
      <h2>${escapeHtml(inputs.title)}</h2>
      <p>${escapeHtml(inputs.subtitle)}</p>
    </section>

    <section class="section grid-2">
      <article class="card">
        <h4>來源摘要</h4>
        <div class="kv-list">${kvRows(inputs.meta || [])}</div>
      </article>
      <article class="card">
        <h4>可視來源</h4>
        <div class="stack">
          ${(inputs.sourceCards || []).map((item) => `
            <div class="row"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.note)}</small></div>
          `).join("")}
        </div>
      </article>
    </section>

    <section class="section split">
      <article class="card">
        <h4>task.txt 只讀摘要</h4>
        <div class="stack">${safeJoin(inputs.taskPreview)}</div>
      </article>
      <article class="card">
        <h4>codex_report.txt 只讀摘要</h4>
        <div class="stack">${safeJoin(inputs.reportPreview)}</div>
      </article>
    </section>
  `;
}

function renderHealth(data) {
  const health = data.health || FALLBACK_MANIFEST.health;
  return `
    <section class="hero">
      <span class="eyebrow">${escapeHtml(health.eyebrow)}</span>
      <h2>${escapeHtml(health.title)}</h2>
      <p>${escapeHtml(health.subtitle)}</p>
    </section>

    <section class="section grid-3">
      <article class="card">
        <h4>核心狀態</h4>
        <div class="table">
          <div class="table-row header"><span>元件</span><span>狀態</span><span>說明</span><span>模式</span></div>
          ${listRows(health.rows)}
        </div>
      </article>
      <article class="card">
        <h4>守門資訊</h4>
        <div class="kv-list">${kvRows(health.guardRows || [])}</div>
      </article>
      <article class="card">
        <h4>健康備註</h4>
        <div class="stack">${safeJoin(health.notes)}</div>
      </article>
    </section>
  `;
}

function renderSettings(data) {
  const settings = data.settings || FALLBACK_MANIFEST.settings;
  return `
    <section class="hero">
      <span class="eyebrow">${escapeHtml(settings.eyebrow)}</span>
      <h2>${escapeHtml(settings.title)}</h2>
      <p>${escapeHtml(settings.subtitle)}</p>
    </section>

    <section class="section grid-2">
      <article class="card">
        <h4>主要設定</h4>
        <div class="table">
          <div class="table-row header"><span>項目</span><span>值</span><span>狀態</span><span>說明</span></div>
          ${(settings.rows || [])
            .map(([label, value]) => `
              <div class="table-row">
                <strong>${escapeHtml(label)}</strong>
                <span>${escapeHtml(value)}</span>
                <span>固定</span>
                <span>只讀</span>
              </div>
            `)
            .join("")}
        </div>
      </article>
      <article class="card">
        <h4>邊界與規則</h4>
        <div class="stack">
          ${safeJoin((settings.boundaryRows || []).map((row) => `${row.label}：${row.value}`))}
        </div>
      </article>
    </section>

    <section class="section split">
      <article class="card">
        <h4>Canva 邊界</h4>
        <div class="stack">
          ${safeJoin((settings.canvaRows || []).map((row) => `${row.label}：${row.value}`))}
        </div>
      </article>
      <article class="card">
        <h4>後續順序</h4>
        <div class="stack">
          <div class="empty-state">1. 先維持 UI v1 freeze。</div>
          <div class="empty-state">2. read-only adapter 只擴小步，不碰控制層。</div>
          <div class="empty-state">3. 真實資料串接若再往前，必須另案核定。</div>
        </div>
      </article>
    </section>
  `;
}

function renderPage() {
  const page = document.body.dataset.page || "home";
  document.body.innerHTML = shell(page);
  const app = document.getElementById("app");
  if (!app) return;

  const data = getManifest();
  const renderer = {
    home: renderHome,
    "run-detail": renderRunDetail,
    inputs: renderInputs,
    health: renderHealth,
    settings: renderSettings,
  }[page] || renderHome;

  app.innerHTML = renderer(data);
}

document.addEventListener("DOMContentLoaded", renderPage);
