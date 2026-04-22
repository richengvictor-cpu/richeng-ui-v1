window.__RICHENG_UI_READONLY_MANIFEST__ = {
  "generatedAt": "2026-04-22T11:40:00+08:00",
  "sourceMode": "read-only snapshot",
  "safety": {
    "redacted": [
      "00_auth_diagnostic.txt（原文不外露）",
      "完整 fingerprint",
      "原始絕對路徑",
      "write-back / trigger / execution-control",
      "敏感 env 值"
    ],
    "notes": [
      "只保留展示需要的欄位。",
      "所有路徑均採相對路徑或別名。",
      "不包含可回寫、可觸發、可控制的資料。"
    ]
  },
  "home": {
    "eyebrow": "只讀 snapshot / manifest",
    "title": "Richeng AI V6 只讀營運看板",
    "subtitle": "第一批真實只讀資料已接入，僅保留展示所需欄位，不進核心控制層。",
    "badges": [
      { "label": "只讀", "tone": "info" },
      { "label": "watcher freeze", "tone": "good" },
      { "label": "scheduler freeze", "tone": "good" },
      { "label": "runner ready", "tone": "warn" }
    ],
    "cards": [
      { "label": "最新狀態摘要", "value": "state / queue / status / wrapper status 已整併" },
      { "label": "最新 run 概況", "value": "20260422_175526_332141_5644 / live" },
      { "label": "只讀 manifest", "value": "第一批真實資料已脫敏" },
      { "label": "控制邊界", "value": "write-back / trigger / execution-control 已禁用" }
    ],
    "sources": [
      { "label": "狀態來源", "value": "agents/runs/.incoming_monitor_state.json" },
      { "label": "佇列來源", "value": "agents/runs/.incoming_monitor_queue.json" },
      { "label": "健康來源", "value": "agents/runs/.incoming_monitor_status.json" },
      { "label": "wrapper 來源", "value": "agents/runs/.scheduler_wrapper_status.json" }
    ],
    "quickLinks": [
      { "label": "查看執行詳情", "href": "./run-detail.html" },
      { "label": "查看輸入來源", "href": "./inputs.html" },
      { "label": "查看健康狀態", "href": "./health.html" },
      { "label": "查看設定", "href": "./settings.html" }
    ]
  },
  "runDetail": {
    "eyebrow": "執行詳情",
    "title": "最新 run 只讀摘要",
    "subtitle": "只展示已脫敏的最新執行概況、產出檔與時序，不提供控制能力。",
    "meta": [
      ["最新 run_dir", "20260422_175526_332141_5644", "只讀"],
      ["執行模式", "live", "只讀"],
      ["Governor", "通過", "只讀"],
      ["Judge", "通過", "只讀"],
      ["Runner", "已完成", "只讀"],
      ["Fallback", "未啟用", "只讀"]
    ],
    "summary": [
      "task_source=task-file",
      "report_source=report-file",
      "governor_success=True / judge_success=True",
      "used_fallback=False",
      "run_dir=20260422_175526_332141_5644"
    ],
    "judge": [
      "Judge 結論：通過。",
      "最小樣本已完成，維持只讀邊界。"
    ],
    "governor": [
      "Governor 已核可。",
      "本輪未進入回寫或控制。"
    ],
    "artifacts": [
      { "name": "04_summary.txt", "path": "agents/runs/20260422_175526_332141_5644/04_summary.txt" },
      { "name": "03_judge_result.txt", "path": "agents/runs/20260422_175526_332141_5644/03_judge_result.txt" },
      { "name": "01_governor_order.txt", "path": "agents/runs/20260422_175526_332141_5644/01_governor_order.txt" },
      { "name": "02_codex_report.txt", "path": "agents/runs/20260422_175526_332141_5644/02_codex_report.txt" }
    ],
    "timeline": [
      { "time": "17:55", "label": "latest run", "status": "完成", "detail": "live" },
      { "time": "11:23", "label": "wrapper", "status": "略過", "detail": "inputs unchanged" },
      { "time": "10:21", "label": "retry", "status": "停止", "detail": "dry-run no trigger" }
    ],
    "tags": ["artifact", "summary", "judge", "governor", "read-only"]
  },
  "inputs": {
    "eyebrow": "輸入來源",
    "title": "只讀輸入摘要",
    "subtitle": "只展示 task.txt 與 codex_report.txt 的摘要，不提供回寫或控制。",
    "meta": [
      { "label": "任務檔", "value": "agents/incoming/task.txt" },
      { "label": "回報檔", "value": "agents/incoming/codex_report.txt" },
      { "label": "模式", "value": "只讀" },
      { "label": "簽章", "value": "已遮蔽" }
    ],
    "taskPreview": [
      "請檢查 Agent Loop Runner v1 的檔案驅動版是否可跑。"
    ],
    "reportPreview": [
      "Codex 回報草稿：已完成最小樣本驗證，請 Judge 判讀。"
    ],
    "sourceCards": [
      { "name": "task.txt", "note": "任務來源摘要" },
      { "name": "codex_report.txt", "note": "回報來源摘要" },
      { "name": "queue / status", "note": "只讀健康資訊" }
    ]
  },
  "health": {
    "eyebrow": "健康狀態",
    "title": "狀態與守門健康檢視",
    "subtitle": "用來顯示 state / queue / status / wrapper status 的只讀摘要，不涉及任何執行控制。",
    "rows": [
      ["Watcher v1", "freeze", "只讀健康", "dry-run"],
      ["Scheduler wrapper v1", "skip", "輸入未變", "dry-run"],
      ["Runner v1", "ready", "可用", "live"],
      ["Queue", "skipped", "無待處理項目", "dry-run"],
      ["Retry", "4 / 2", "已達上限", "dry-run"]
    ],
    "guardRows": [
      { "label": "只讀邊界", "value": "已啟用" },
      { "label": "stale lock recovery", "value": "保留" },
      { "label": "write-back", "value": "disabled" },
      { "label": "trigger / control", "value": "disabled" }
    ],
    "notes": [
      "UI 僅作只讀展示。",
      "真實資料若啟用，仍需保留脫敏與欄位收斂。",
      "不直接觸碰 watcher / scheduler / runner 核心。"
    ]
  },
  "settings": {
    "eyebrow": "設定",
    "title": "介面邊界與只讀規則",
    "subtitle": "展示目前 UI 與 agent 主線之間的只讀邊界、Canva 邊界與後續施工順序。",
    "rows": [
      ["顯示語言", "繁體中文主版本"],
      ["資料模式", "只讀 snapshot / manifest"],
      ["主線分層", "UI → adapter → artifacts"],
      ["回寫能力", "禁止"]
    ],
    "boundaryRows": [
      { "label": "可讀來源", "value": "agents/runs / agents/incoming" },
      { "label": "不可外露", "value": "auth diagnostic raw / 完整 fingerprint / 絕對路徑" },
      { "label": "不可碰", "value": "write-back / trigger / execution-control" },
      { "label": "可延後", "value": "完整前端資料串接 / Canva 深度串接" }
    ],
    "canvaRows": [
      { "label": "Canva 邊界", "value": "視覺稿 / 線框稿 / 版型確認" },
      { "label": "正式前端", "value": "保留在 UI 工程內" },
      { "label": "read-only adapter", "value": "已 freeze / 只讀中介層" }
    ]
  }
};
