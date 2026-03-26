const { useMemo, useState } = React;

function MetricBox({ label, value, note }) {
  return (
    <div className="metric-box">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-note">{note}</div>
    </div>
  );
}

function QueueItem({ item }) {
  return (
    <div className="queue-item">
      <div className="queue-head">
        <div>
          <div className="eyebrow-row" style={{ marginBottom: 10 }}>
            <span className="eyebrow">{item.platform}</span>
            <span className="pill">{item.status}</span>
          </div>
          <h4>{item.title}</h4>
          <div className="queue-sub">Destination: {item.destination}</div>
        </div>
        <div className="queue-sub" style={{ textAlign: "right" }}>
          <div>Schedule</div>
          <strong style={{ color: "#fff" }}>{item.schedule}</strong>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ name, badge, description }) {
  return (
    <div className="integration-card">
      <div className="integration-head">
        <h4>{name}</h4>
        <span className="pill">{badge}</span>
      </div>
      <p>{description}</p>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("scheduler");
  const [platform, setPlatform] = useState("Pinterest");
  const [title, setTitle] = useState("Minimal desk setup ideas for creators");
  const [destination, setDestination] = useState("Creator workspace");
  const [mediaUrl, setMediaUrl] = useState("https://example.com/mock-image.jpg");
  const [schedule, setSchedule] = useState("2026-03-30T10:00");
  const [notes, setNotes] = useState(
    "Original visual asset prepared by the creator. Optional internal review before publishing."
  );
  const [queue, setQueue] = useState([
    {
      id: 1,
      platform: "Pinterest",
      title: "Spring capsule wardrobe pins",
      status: "Approved",
      destination: "Style ideas",
      schedule: "2026-03-29 10:30",
    },
    {
      id: 2,
      platform: "Pinterest",
      title: "Workspace moodboard collection",
      status: "Scheduled",
      destination: "Studio inspiration",
      schedule: "2026-03-29 14:15",
    },
    {
      id: 3,
      platform: "Reddit",
      title: "Weekly creator update",
      status: "Draft",
      destination: "r/mockcommunity",
      schedule: "2026-03-30 12:00",
    },
  ]);

  const badgeText = useMemo(() => {
    if (platform === "Pinterest") return "Primary workflow";
    if (platform === "Reddit") return "Secondary workflow";
    return "Coming soon";
  }, [platform]);

  function addToQueue() {
    const next = {
      id: Date.now(),
      platform,
      title,
      status: platform === "DeviantArt" ? "Beta" : "Draft",
      destination,
      schedule: schedule.replace("T", " "),
    };
    setQueue([next, ...queue]);
    setTab("queue");
  }

  return (
    <div className="site-shell">
      <header className="nav">
        <div className="brand">
          <div className="brand-badge">LN</div>
          <div className="brand-meta">
            <h1>LakrisNet Content Planner</h1>
            <p>Publishing workspace for creators and small teams</p>
          </div>
        </div>
        <nav className="nav-links">
          <a className="nav-link" href="#workflow">Workflow</a>
          <a className="nav-link" href="#integrations">Integrations</a>
          <a className="nav-link" href="#trust">Trust</a>
          <a className="nav-link" href="privacy-policy.html">Privacy Policy</a>
        </nav>
      </header>

      <section className="hero">
        <div className="card hero-main">
          <div className="eyebrow-row">
            <span className="eyebrow">LakrisNet Content Planner</span>
            <span className="pill">Pinterest-ready public website</span>
          </div>
          <h2>A polished publishing workspace for scheduling, reviews, and creator content workflows.</h2>
          <p className="lead">
            LakrisNet Content Planner is a content planning and publishing workspace for creators and
            small teams who manage their own social content. The Pinterest module is presented as an
            OAuth-based, user-authorized workflow with board selection, queue review, audit visibility,
            and first-party reporting.
          </p>
          <div className="button-row">
            <a className="button" href="#workflow">Open workflow demo</a>
            <a className="button-secondary" href="privacy-policy.html">Open privacy policy</a>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-widget">
            <div className="widget-title">
              <div>
                <h3>Pinterest scheduling panel</h3>
                <p>Manual review + scheduled release</p>
              </div>
              <span className="pill">Primary flow</span>
            </div>

            <div className="mini-panel">
              <div className="mini-label">Selected board</div>
              <div className="mini-value">Creator workspace</div>
            </div>

            <div className="mini-panel">
              <div className="mini-label">Publishing model</div>
              <div className="mini-value">User-authorized scheduling</div>
            </div>

            <div className="progress-wrap">
              <div className="progress-head">
                <span>Compliance confidence</span>
                <span>92%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>

          <div className="metric-grid">
            <MetricBox label="Connected profiles" value="3" note="OAuth-authenticated workspaces" />
            <MetricBox label="Scheduled this week" value="18" note="Manual review before publish" />
            <MetricBox label="Approval rate" value="94%" note="Internal team workflow" />
          </div>
        </div>
      </section>

      <section className="tabs" id="workflow">
        <div className="tab-bar">
          {[
            ["scheduler", "Scheduler"],
            ["queue", "Queue"],
            ["insights", "Insights"],
            ["integrations", "Integrations"],
            ["policy", "Trust"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`tab-button ${tab === key ? "active" : ""}`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {tab === "scheduler" && (
            <div className="scheduler-layout">
              <div className="section-card">
                <h3>Mock publishing composer</h3>
                <p className="section-lead">
                  Front-end only demo for a Pinterest-friendly scheduling workflow. No live API calls are
                  made here. This section is purely for public presentation and product framing.
                </p>

                <div className="form-grid">
                  <div className="field">
                    <label>Platform</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                      <option>Pinterest</option>
                      <option>Reddit</option>
                      <option>DeviantArt</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Status tag</label>
                    <input value={badgeText} readOnly />
                  </div>

                  <div className="field-full">
                    <label>Post title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>

                  <div className="field">
                    <label>Board / destination</label>
                    <input value={destination} onChange={(e) => setDestination(e.target.value)} />
                  </div>

                  <div className="field">
                    <label>Scheduled date & time</label>
                    <input type="datetime-local" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                  </div>

                  <div className="field-full">
                    <label>Media URL</label>
                    <input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} />
                  </div>

                  <div className="field-full">
                    <label>Workflow notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                  </div>
                </div>

                <div className="helper-row">
                  <button className="button" onClick={addToQueue}>Add to queue</button>
                  <button className="button-secondary" onClick={() => setTab("policy")}>Open trust block</button>
                </div>
              </div>

              <div className="info-stack">
                <div className="good-box">
                  <h4>Good framing</h4>
                  <p>
                    Original or authorized content, user-authorized publishing, manual selection of each item,
                    optional approval workflow, and first-party analytics.
                  </p>
                </div>
                <div className="bad-box">
                  <h4>Avoid in public copy</h4>
                  <p>
                    Mass autoposting, engagement manipulation, hidden actions, scraping, adult-content references,
                    or vague growth-hacking language.
                  </p>
                </div>
                <div className="check-list">
                  <h4>Workflow summary</h4>
                  <ul>
                    <li>User connects Pinterest via OAuth</li>
                    <li>User chooses a board and schedules a post</li>
                    <li>Team review is optional before release</li>
                    <li>Publish status and first-party metrics are shown back to the same user</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "queue" && (
            <div className="queue-grid">
              {queue.map((item) => (
                <QueueItem key={item.id} item={item} />
              ))}
            </div>
          )}

          {tab === "insights" && (
            <div className="insight-grid">
              <div className="insight-panel">
                <h3>First-party reporting snapshot</h3>
                <p className="section-lead">
                  Public demo framing: report only on the authenticated user’s own activity and content outcomes.
                </p>
                <div className="stat-cards">
                  <div className="stat-box">
                    <div className="small">Approved drafts</div>
                    <div className="big">26</div>
                  </div>
                  <div className="stat-box">
                    <div className="small">Scheduled releases</div>
                    <div className="big">18</div>
                  </div>
                  <div className="stat-box">
                    <div className="small">Published this month</div>
                    <div className="big">44</div>
                  </div>
                  <div className="stat-box">
                    <div className="small">Review turnaround</div>
                    <div className="big">2.4h</div>
                  </div>
                </div>
              </div>
              <div className="insight-panel">
                <h3>Team controls</h3>
                <div className="check-list" style={{ marginTop: 14 }}>
                  <ul>
                    <li>Role-based workspace access</li>
                    <li>Approval checks before scheduling</li>
                    <li>Audit trail for queue actions</li>
                    <li>Duplicate detection safeguards</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "integrations" && (
            <div className="integration-grid" id="integrations">
              <IntegrationCard
                name="Pinterest"
                badge="Ready"
                description="Primary publishing flow with board selection, scheduling, and first-party reports."
              />
              <IntegrationCard
                name="Reddit"
                badge="Preview"
                description="Separate demo card with no copied product logic. Positioned as an auxiliary workflow."
              />
              <IntegrationCard
                name="DeviantArt"
                badge="Coming soon"
                description="Visible as a future module only. Present but intentionally marked as not fully launched."
              />
            </div>
          )}

          {tab === "policy" && (
            <div className="policy-layout" id="trust">
              <div className="policy-box">
                <h4>Public-facing summary text</h4>
                <p>
                  LakrisNet Content Planner is a content planning and publishing workspace for creators and small teams who manage their own social content.
                </p>
                <p>
                  The Pinterest workflow allows an authenticated user to connect their own account, choose a board, prepare original or authorized visual content, schedule individual Pins, and review publishing status and first-party performance information.
                </p>
                <p>
                  The product is designed as a controlled workflow tool with optional approval steps, audit visibility, and duplicate-prevention checks. It is not presented as a bulk automation, scraping, or engagement manipulation service.
                </p>
              </div>
              <div className="policy-box">
                <h4>Privacy and trust points</h4>
                <p>OAuth-based authentication for connected accounts</p>
                <p>Minimum workflow metadata stored for scheduling and audit records</p>
                <p>No hidden posting, no scraping, and no adult-content positioning on the Pinterest-facing site</p>
                <p>First-party analytics only for the authenticated user’s own account</p>
                <div className="button-row" style={{ marginTop: 18 }}>
                  <a className="button" href="privacy-policy.html">Read privacy policy</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="footer-note">
        Demo website template for GitHub Pages. Replace the contact email and any placeholder text before submitting links to Pinterest.
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
