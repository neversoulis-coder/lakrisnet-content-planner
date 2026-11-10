// Shows your avatar instead of "Sign in" when you're signed in to the planner.
(function () {
  var APP = "https://engine-server.taild0e7ed.ts.net:8443";
  var KEY = "planner-account";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
  }
  function write(v) {
    try {
      if (v) localStorage.setItem(KEY, JSON.stringify(v));
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }

  // The planner's "Website" link says who you are; its sign-in page says you left.
  var hash = location.hash;
  if (hash.indexOf("#signed-in=") === 0) {
    var name = decodeURIComponent(hash.slice(11)).trim().slice(0, 60);
    if (name) write({ name: name });
    history.replaceState(null, "", location.pathname + location.search);
  } else if (hash === "#signed-out") {
    write(null);
    history.replaceState(null, "", location.pathname + location.search);
  }

  var signin = document.getElementById("signin-link");
  var acct = document.getElementById("acct");
  var hero = document.getElementById("hero-open");

  function render(account) {
    var on = !!(account && account.name);
    if (signin) signin.hidden = on;
    if (acct) {
      acct.hidden = !on;
      if (on) {
        acct.querySelector(".acct-avatar").textContent = account.name.charAt(0).toUpperCase();
        acct.querySelector(".acct-name").textContent = account.name;
      }
    }
    if (hero) {
      hero.textContent = on ? "Go to your panel" : "Open the planner";
      hero.href = APP + (on ? "/dashboard" : "/signin");
    }
  }

  render(read());

  // Ask the planner directly as well (works where the browser allows it).
  if (window.fetch) {
    fetch(APP + "/api/me", { credentials: "include" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.signed_in && d.name) {
          write({ name: d.name });
          render({ name: d.name });
        }
      })
      .catch(function () {});
  }

  var out = document.getElementById("acct-signout");
  if (out) out.addEventListener("click", function () { write(null); });

  if (acct) {
    document.addEventListener("click", function (e) { if (!acct.contains(e.target)) acct.open = false; });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") acct.open = false; });
  }
})();
