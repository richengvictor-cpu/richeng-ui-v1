const STORAGE_KEY = "richeng-ui-scenario";

const SCENARIOS = {
  healthy: {
    label: "正常 / 可用",
    status: "ready",
    statusLabel: "可用",
    watcher: "freeze / 閒置",
    scheduler: "freeze / 守門",
    runner: "離線備援已就緒",
    mode: "offline",
    lock: "已釋放",
    queue: "已略過",
    retry: "0 / 2",
    lastRun: "2026-04-22 11:23",
    lastRunDir: "agents/runs/20260422_112233_108622_1824",
    signature: "7844567c...:e5cc68b1...:offline",
    error: "無",
    taskSource: "agents/incoming/task.txt",
    reportSource: "agents/incoming/codex_report.txt",
  },
  retry: {
    label: "重試 / 觀察",
    status: "retry",
    statusLabel: "重試中",
    watcher: "處理中 / 可重試失敗",
    scheduler: "可觸發候選",
    runner: "離線備援已就緒",
    mode: "offline",
    lock: "已釋放",
    queue: "失敗",
    retry: "1 / 2",
    lastRun: "2026-04-22 10:21",
    lastRunDir: "agents/runs/20260422_102115_276644_4952",
    signature: "7844567c...:e5cc68b1...:offline",
    error: "runner 非零結束",
    taskSource: "agents/incoming/task.txt",
    reportSource: "agents/incoming/codex_report.txt",
  },
  stop: {
    label: "停止 / 鎖定",
    status: "stop",
    statusLabel: "停止",
    watcher: "停止 / 鎖定啟用",
    scheduler: "停止守門",
    runner: "未呼叫",
    mode: "offline",
    lock: "已啟用",
    queue: "處理中",
    retry: "2 / 2",
    lastRun: "2026-04-22 11:28",
    lastRunDir: "agents/runs/20260422_112827_663182_13184",
    signature: "7844567c...:e5cc68b1...:offline",
    error: "watcher 鎖定啟用",
    taskSource: "agents/incoming/task.txt",
    reportSource: "agents/incoming/codex_report.txt",
  },
};

const RUN_HISTORY = [
  { time: "11:28", label: "scheduler wrapper", status: "停止", detail: "已啟用鎖定守門" },
  { time: "11:23", label: "scheduler wrapper", status: "略過", detail: "輸入未變更" },
  { time: "11:23", label: "watcher", status: "完成", detail: "單輪離線執行" },
  { time: "10:21", label: "watcher", status: "失敗", detail: "已記錄可重試候選" },
];

const ARTIFACTS = [
  { name: "state", path: "agents/runs/.incoming_monitor_state.json" },
  { name: "queue", path: "agents/runs/.incoming_monitor_queue.json" },
  { name: "status", path: "agents/runs/.incoming_monitor_status.json" },
  { name: "wrapper status", path: "agents/runs/.scheduler_wrapper_status.json" },
];

const HEALTH_ROWS = [
  ["Watcher v1", "freeze / 閒置", "單輪就緒"],
  ["Scheduler wrapper v1", "freeze / 守門", "觸發 / 略過 / 停止"],
  ["Runner v1", "離線備援就緒", "UI 不直接存取"],
  ["鎖定", "已釋放或已啟用", "支援 stale recovery"],
  ["重試額度", "0-2", "達上限後停止"],
];

const SETTINGS_ROWS = [
  ["預設模式", "offline"],
  ["鎖定逾時（分鐘）", "60"],
  ["最大重試次數", "2"],
  ["UI 定位", "專業版營運控制台"],
  ["Canva 角色", "視覺 / 線框 / 版型確認"],
];

function getScenarioName() {
  return localStorage.getItem(STORAGE_KEY) || "healthy";
}

function setScenario(name) {
  localStorage.setItem(STORAGE_KEY, name);
  window.location.reload();
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
          <h1>Richeng AI V6 - 專業版營運控制台</h1>
          <p>全新 UI 骨架 - watcher / scheduler / runner 分層 - mock-first</p>
        </div>
      </div>
      <nav class="nav" aria-label="Primary">
        ${items.map(([key, label, href]) => `<a href="${href}" ${activePage === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
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

function pillClass(status) {
  if (status === "ready" || status === "done" || status === "stable") return "pill good";
  if (status === "retry" || status === "warn" || status === "guarded") return "pill warn";
  if (status === "stop" || status === "failed" || status === "locked") return "pill bad";
  return "pill info";
}

function renderHome(scenario) {
  return `
    <section class="hero">
      <div class="hero-grid">
        <div>
          <span class="eyebrow">主控頁</span>
          <h2>專業版營運控制台</h2>
          <p>
            此骨架用來讓人快速看懂系統狀態、判斷是否要觸發 watcher 或 scheduler，
            並檢視最新執行結果，而不直接進入 runner 核心。整體刻意保持輕量、可讀、
            有分層，並採 mock-first。
          </p>
          <div class="status-row">
            <span class="${pillClass(scenario.status)}">${scenario.label}</span>
            <span class="pill">watcher｜${scenario.watcher}</span>
            <span class="pill">scheduler｜${scenario.scheduler}</span>
            <span class="pill">runner｜${scenario.runner}</span>
          </div>
          <div class="status-row">
            <button class="btn" data-action="scenario" data-value="healthy">正常</button>
            <button class="btn secondary" data-action="scenario" data-value="retry">重試</button>
            <button class="btn ghost" data-action="scenario" data-value="stop">停止</button>
            <button class="btn ghost" data-action="toast" data-value="trigger">觸發 watcher</button>
            <button class="btn ghost" data-action="toast" data-value="dry-run">乾跑守門</button>
          </div>
          <p class="footer-note">目前資料來自 mock / sample。真實 adapter 之後再接。</p>
        </div>
        <aside class="hero-aside">
          <div class="glass">
            <h3>系統快照</h3>
            <div class="kv-list">
              <div class="kv"><span>狀態</span><strong>${scenario.statusLabel || scenario.status}</strong></div>
              <div class="kv"><span>模式</span><strong>${scenario.mode}</strong></div>
              <div class="kv"><span>鎖定</span><strong>${scenario.lock}</strong></div>
              <div class="kv"><span>重試</span><strong>${scenario.retry}</strong></div>
            </div>
          </div>
          <div class="glass">
            <h3>最新執行</h3>
            <div class="kv-list">
              <div class="kv"><span>執行時間</span><strong>${scenario.lastRun}</strong></div>
              <div class="kv"><span>執行目錄</span><strong>${scenario.lastRunDir}</strong></div>
              <div class="kv"><span>簽章</span><strong>${scenario.signature}</strong></div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div>
          <h3>核心資訊層</h3>
          <p>首頁只保留最重要的狀態與入口。</p>
        </div>
      </div>
      <div class="grid-4">
        <article class="card">
          <h4>系統狀態</h4>
          <div class="metric">${scenario.statusLabel || scenario.status}</div>
          <div class="subtle">可人工快速判讀的主線狀態摘要。</div>
        </article>
        <article class="card">
          <h4>Watcher / Scheduler / Runner</h4>
          <div class="stack">
            <div class="row"><strong>Watcher</strong><small>${scenario.watcher}</small></div>
            <div class="row"><strong>Scheduler</strong><small>${scenario.scheduler}</small></div>
            <div class="row"><strong>Runner</strong><small>${scenario.runner}</small></div>
          </div>
        </article>
        <article class="card">
          <h4>最新輸入</h4>
          <div class="stack">
            <div class="row"><strong>任務</strong><small>${scenario.taskSource}</small></div>
            <div class="row"><strong>報告</strong><small>${scenario.reportSource}</small></div>
            <div class="row"><strong>模式</strong><small>${scenario.mode}</small></div>
          </div>
        </article>
        <article class="card">
          <h4>快速操作</h4>
          <div class="actions">
            <button class="btn" data-action="toast" data-value="refresh">重新整理</button>
            <button class="btn secondary" data-action="toast" data-value="open-run">查看最新執行</button>
            <button class="btn ghost" data-action="toast" data-value="inspect-lock">檢視鎖定</button>
          </div>
          <p class="subtle">先顯示按鈕位置與意圖，後續再接後端。</p>
        </article>
      </div>
    </section>

    <section class="section split">
      <article class="card">
        <h4>最新執行概況</h4>
        <div class="table">
          <div class="table-row header"><span>項目</span><span>時間</span><span>結果</span><span>備註</span></div>
          ${RUN_HISTORY.map((item) => `
            <div class="table-row">
              <strong>${item.label}</strong>
              <span>${item.time}</span>
              <span>${item.status}</span>
              <span>${item.detail}</span>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="card">
        <h4>介面說明</h4>
        <div class="stack">
          <div class="empty-state">首頁、執行詳情、輸入來源、健康狀態、設定，構成最小 UI 骨架。</div>
          <div class="empty-state">Watcher / scheduler / runner 保持分層：UI 只讀狀態，wrapper 守門，runner 留在後層。</div>
          <div class="empty-state">Canva 只用於規劃：線框、版型確認與視覺討論。</div>
        </div>
      </article>
    </section>
  `;
}

function renderRunDetail(scenario) {
  return `
    <section class="hero">
      <span class="eyebrow">執行詳情</span>
      <h2>單次執行詳情與 artifact 軌跡</h2>
      <p>用來從頭到尾檢視一次執行：輸入、wrapper 判斷、watcher 結果與產生的 artifacts。</p>
    </section>
    <section class="section grid-2">
      <article class="card">
        <h4>執行摘要</h4>
        <div class="kv-list">
          <div class="kv"><span>最新執行</span><strong>${scenario.lastRunDir}</strong></div>
          <div class="kv"><span>執行模式</span><strong>${scenario.mode}</strong></div>
          <div class="kv"><span>Wrapper 判定</span><strong>${scenario.statusLabel || scenario.status}</strong></div>
          <div class="kv"><span>重試</span><strong>${scenario.retry}</strong></div>
          <div class="kv"><span>錯誤摘要</span><strong>${scenario.error}</strong></div>
        </div>
      </article>
      <article class="card">
        <h4>產出檔</h4>
        <div class="stack">
          ${ARTIFACTS.map((artifact) => `
            <div class="row"><strong>${artifact.name}</strong><small>${artifact.path}</small></div>
          `).join("")}
        </div>
      </article>
    </section>
    <section class="section split">
      <article class="card">
        <h4>時間軸</h4>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-time">11:28</div>
            <div class="timeline-box"><strong>scheduler wrapper 停止</strong><span class="subtle">因 watcher 鎖定啟用，停止守門避免重複執行。</span></div>
          </div>
          <div class="timeline-item">
            <div class="timeline-time">11:23</div>
            <div class="timeline-box"><strong>scheduler wrapper 觸發</strong><span class="subtle">wrapper 僅呼叫 watcher 一次，並觀察到最終完成狀態。</span></div>
          </div>
          <div class="timeline-item">
            <div class="timeline-time">10:21</div>
            <div class="timeline-box"><strong>重試候選</strong><span class="subtle">前一次失敗紀錄仍受最大重試規則約束。</span></div>
          </div>
        </div>
      </article>
      <article class="card">
        <h4>此頁未來應支援</h4>
        <div class="tagrow">
          <span class="tag">單次執行回放</span>
          <span class="tag">artifact 清單</span>
          <span class="tag">stdout / stderr 摘要</span>
          <span class="tag">重試說明</span>
          <span class="tag">人工後續處理</span>
        </div>
      </article>
    </section>
  `;
}

function renderInputs(scenario) {
  return `
    <section class="hero">
      <span class="eyebrow">輸入來源</span>
      <h2>輸入快照、簽章與來源追蹤</h2>
      <p>此頁顯示執行前 UI 應呈現的內容：來源檔、指紋與目前快照，用來判斷是否要觸發。</p>
    </section>
    <section class="section grid-2">
      <article class="card">
        <h4>來源快照</h4>
        <div class="kv-list">
          <div class="kv"><span>任務來源</span><strong>${scenario.taskSource}</strong></div>
          <div class="kv"><span>報告來源</span><strong>${scenario.reportSource}</strong></div>
          <div class="kv"><span>模式</span><strong>${scenario.mode}</strong></div>
          <div class="kv"><span>簽章</span><strong>${scenario.signature}</strong></div>
        </div>
      </article>
      <article class="card">
        <h4>變更規則</h4>
        <div class="stack">
          <div class="empty-state">當輸入簽章變更，或存在可重試失敗時，才觸發。</div>
          <div class="empty-state">當輸入未變更且沒有可重試失敗時，則略過。</div>
          <div class="empty-state">當鎖定啟用、watcher 處理中，或重試已耗盡時，則停止。</div>
        </div>
      </article>
    </section>
    <section class="section split">
      <article class="card">
        <h4>模擬內容面板</h4>
        <div class="codebox">
Task: Richeng AI V6 UI 第一版規劃<br>
Report: 供 UI 檢視的模擬規劃內容<br>
Mode: offline<br>
Watcher interface: state / queue / status / lock<br>
Scheduler interface: trigger / skip / stop guard
        </div>
      </article>
      <article class="card">
        <h4>預定資料連線</h4>
        <div class="stack">
          <div class="row"><strong>agents/incoming/task.txt</strong><small>未來唯讀 adapter</small></div>
          <div class="row"><strong>agents/incoming/codex_report.txt</strong><small>未來唯讀 adapter</small></div>
          <div class="row"><strong>agents/runs/.incoming_monitor_state.json</strong><small>未來狀態 adapter</small></div>
          <div class="row"><strong>agents/runs/.scheduler_wrapper_status.json</strong><small>未來 wrapper adapter</small></div>
        </div>
      </article>
    </section>
  `;
}

function renderHealth(scenario) {
  return `
    <section class="hero">
      <span class="eyebrow">健康狀態</span>
      <h2>狀態、鎖定、重試與守門健康狀態</h2>
      <p>健康狀態頁只保留營運最需要的訊號：鎖定、stale lock、重試額度與執行結果註記。</p>
    </section>
    <section class="section grid-3">
      <article class="card">
        <h4>核心狀態</h4>
        <div class="stack">
          ${HEALTH_ROWS.map((row) => `
            <div class="row"><strong>${row[0]}</strong><small>${row[1]}</small></div>
          `).join("")}
        </div>
      </article>
      <article class="card">
        <h4>守門摘要</h4>
        <div class="kv-list">
          <div class="kv"><span>鎖定</span><strong>${scenario.lock}</strong></div>
          <div class="kv"><span>隊列</span><strong>${scenario.queue}</strong></div>
          <div class="kv"><span>重試額度</span><strong>${scenario.retry}</strong></div>
          <div class="kv"><span>最近錯誤</span><strong>${scenario.error}</strong></div>
        </div>
      </article>
      <article class="card">
        <h4>營運備註</h4>
        <div class="stack">
          <div class="empty-state">不要讓 UI 繞過 watcher 或 scheduler 的守門規則。</div>
          <div class="empty-state">此頁用於快速診斷，不是直接控制 runner 的地方。</div>
          <div class="empty-state">在任何觸發前，先清楚呈現 stale lock 與重試耗盡狀態。</div>
        </div>
      </article>
    </section>
  `;
}

function renderSettings() {
  return `
    <section class="hero">
      <span class="eyebrow">設定</span>
      <h2>第一版營運預設</h2>
      <p>設定頁刻意保持精簡：只描述系統預設與 UI 邊界，不承擔整個平台設定。</p>
    </section>
    <section class="section grid-2">
      <article class="card">
        <h4>預設值</h4>
        <div class="table">
          ${SETTINGS_ROWS.map(([label, value]) => `
            <div class="table-row">
              <strong>${label}</strong>
              <span>${value}</span>
              <span>預設</span>
              <span>第一版</span>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="card">
        <h4>Canva 邊界</h4>
        <div class="stack">
          <div class="empty-state">Canva 用於視覺草稿、線框稿與版型確認。</div>
          <div class="empty-state">不要把 Canva 當成 runtime 核心或執行邏輯的唯一真相來源。</div>
          <div class="empty-state">正式 UI 實作仍留在獨立的前端專案中。</div>
        </div>
      </article>
    </section>
    <section class="section split">
      <article class="card">
        <h4>UI 合約</h4>
        <div class="codebox">
首頁 = 狀態 + 快速操作<br>
執行詳情 = 執行軌跡<br>
輸入來源 = 來源與簽章<br>
健康狀態 = 鎖定 / 重試 / stale lock<br>
設定 = 預設與邊界
        </div>
      </article>
      <article class="card">
        <h4>下一步實作順序</h4>
        <div class="stack">
          <div class="row"><strong>1</strong><small>建立新的 ui/ 骨架</small></div>
          <div class="row"><strong>2</strong><small>加入唯讀 adapters</small></div>
          <div class="row"><strong>3</strong><small>之後再接正式後端綁定</small></div>
        </div>
      </article>
    </section>
  `;
}

function renderPage() {
  const page = document.body.dataset.page || "home";
  const scenarioName = getScenarioName();
  const scenario = SCENARIOS[scenarioName] || SCENARIOS.healthy;

  document.body.innerHTML = shell(page);
  const app = document.getElementById("app");
  if (!app) return;

  const renderer = {
    home: renderHome,
    "run-detail": renderRunDetail,
    inputs: renderInputs,
    health: renderHealth,
    settings: renderSettings,
  }[page] || renderHome;

  app.innerHTML = renderer(scenario);

  if (page === "home") {
    app.querySelectorAll('[data-action="scenario"]').forEach((button) => {
      button.addEventListener("click", () => setScenario(button.dataset.value || "healthy"));
    });
    app.querySelectorAll('[data-action="toast"]').forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.value || "action";
        window.alert(`UI skeleton only: ${value} will connect to the backend adapter in the next phase.`);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", renderPage);
