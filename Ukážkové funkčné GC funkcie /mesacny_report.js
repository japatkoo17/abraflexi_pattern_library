import { Buffer } from "buffer";

// --- KONFIGURÁCIA PRIHLASOVANIA DO ABRA FLEXI (MVP ÚČELY) ---
const API_USER = process.env.API_USER || "admin";
const API_PASSWORD = process.env.API_PASSWORD || "admin123";

// Vytvorenie Basic Auth hlavičky
const AUTH_HEADER =
  "Basic " + Buffer.from(`${API_USER}:${API_PASSWORD}`).toString("base64");

/**
 * Pomocná funkcia na bezpečné ošetrenie HTML pred XSS.
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Vyčistenie a zobrazenie kódu typu dokladu (odstránenie predpony code:).
 */
function formatDocType(typeStr) {
  if (!typeStr) return "Neznámy typ";
  return String(typeStr).replace(/^code:/i, "");
}

/**
 * Formátovanie čísla na menu s centami (Slovak locale styl).
 */
function formatCurrency(amount) {
  const num = Number(amount || 0);
  return num.toLocaleString("sk-SK", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * HTML Šablóna pre zobrazenie chýb na Dashboarde v korporátnom štýle.
 */
const getErrorDashboardHtml = (title, message, details = "") => `
  <!DOCTYPE html>
  <html lang="sk">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chyba generovania reportu | FÉROVÉ ÚČTO</title>
  <style>
  body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  }
  .wrapper {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  max-width: 650px;
  width: 100%;
  overflow: hidden;
  }
  .header {
  background-color: #0074a6;
  padding: 30px;
  text-align: center;
  }
  .logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  padding: 5px;
  }
  .divider {
  height: 5px;
  background-color: #f2d500;
  }
  .content {
  padding: 40px;
  color: #4a4a4a;
  }
  h2 {
  color: #0074a6;
  margin-top: 0;
  font-size: 22px;
  font-weight: bold;
  }
  p.msg {
  color: #ef4444;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.6;
  }
  pre {
  background: #fdf2f2;
  border: 1px solid #fee2e2;
  padding: 16px;
  border-radius: 8px;
  font-size: 13px;
  color: #991b1b;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 20px;
  }
  </style>
  </head>
  <body>
  <div class="wrapper">
  <div class="header">
  <img src="https://www.feroveucto.sk/wp-content/uploads/2018/05/Obrazok-WhatsApp-2024-03-10-o-22.53.34_e611ba06.jpg" alt="Logo FÉROVÉ ÚČTO" class="logo">
  </div>
  <div class="divider"></div>
  <div class="content">
  <h2>✕ ${escapeHtml(title)}</h2>
  <p class="msg">${escapeHtml(message)}</p>
  ${details ? `<pre><strong>Technické detaily:</strong>\n${escapeHtml(details)}</pre>` : ""}
  </div>
  </div>
  </body>
  </html>
  `;

/**
 * Pomocník pre vygenerovanie riadkov tabuľky pre jednotlivé typy dokladov.
 */
function renderTypeRows(groupedData) {
  const keys = Object.keys(groupedData);
  if (keys.length === 0) {
    return `<tr><td colspan="4" class="no-data-cell">Žiadne zaúčtované doklady</td></tr>`;
  }
  return keys
    .map((key) => {
      const item = groupedData[key];
      return `
  <tr>
  <td>
  <div class="type-badge-container">
  <span class="type-badge">${escapeHtml(formatDocType(key))}</span>
  </div>
  </td>
  <td style="text-align: center; font-weight: 600; color: #0074a6;">${item.count} ks</td>
  <td style="text-align: right; color: #555555;">${formatCurrency(item.dph)}</td>
  <td style="text-align: right; font-weight: 700; color: #111827;">${formatCurrency(item.celkem)}</td>
  </tr>
  `;
    })
    .join("");
}

/**
 * HTML Šablóna pre kompletný mesačný report počtov a hodnôt podľa typov (Štýl FÉROVÉ ÚČTO).
 */
const getDashboardHtml = (data) => {
  const {
    firmaName,
    mesiacText,
    rok,
    datOd,
    datDo,
    totalDocCount,
    totalDocValue,
    bankaCount,
    bankaPrijem,
    bankaVydej,
    vydaneGrouped,
    prijateGrouped,
    zavazkyGrouped,
    pokladnaGrouped,
    dphCelkom,
    dphZaplatiť,
  } = data;

  const bankaCistyResult = bankaPrijem - bankaVydej;
  const bankaBilanciaTrieda =
    bankaCistyResult >= 0 ? "bank-plus" : "bank-minus";
  const bankaBilanciaSipka = bankaCistyResult >= 0 ? "▲" : "▼";

  return `
  <!DOCTYPE html>
  <html lang="sk">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Štatistika zaúčtovaných dokladov | FÉROVÉ ÚČTO</title>
  <style>
  body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f4f4f4;
  color: #4a4a4a;
  margin: 0;
  padding: 40px 20px;
  line-height: 1.7;
  }
  
  .wrapper {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
  }
  
  /* Brand Header */
  .brand-header {
  background-color: #0074a6;
  padding: 35px 20px;
  text-align: center;
  position: relative;
  }
  .brand-logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  padding: 5px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }
  .brand-divider {
  height: 5px;
  background-color: #f2d500;
  }
  
  /* Content Padding */
  .main-content {
  padding: 45px 50px;
  }
  
  /* Header Info */
  .header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #f4f4f4;
  padding-bottom: 25px;
  flex-wrap: wrap;
  gap: 20px;
  }
  .header-info h1 {
  margin: 0 0 10px 0;
  font-size: 26px;
  font-weight: bold;
  color: #0074a6;
  letter-spacing: -0.5px;
  }
  .header-info p {
  margin: 0;
  font-size: 14px;
  color: #777777;
  }
  .company-highlight {
  color: #0074a6;
  font-weight: 700;
  }
  
  /* Action Button (FÉROVÉ ÚČTO Gold) */
  .btn-download {
  background-color: #f2d500;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(242, 213, 0, 0.2);
  }
  .btn-download:hover {
  background-color: #dfc500;
  transform: translateY(-1px);
  }
  .btn-download:active {
  transform: translateY(0);
  }
  
  /* KPI Grid */
  .grid-kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  }
  .card-kpi {
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e1e8ed;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  position: relative;
  }
  .card-kpi::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-radius: 10px 0 0 10px;
  }
  .kpi-doklady-count::before { background-color: #0074a6; }
  .kpi-doklady-value::before { background-color: #f2d500; }
  .kpi-banka-count::before { background-color: #0074a6; }
  
  .kpi-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #777777;
  letter-spacing: 1px;
  margin-bottom: 8px;
  }
  .kpi-value {
  font-size: 24px;
  font-weight: bold;
  color: #0074a6;
  margin-bottom: 4px;
  }
  .kpi-sub {
  font-size: 12px;
  color: #555555;
  }
  
  /* Bank Flow Section (Corporate alert-box style) */
  .bank-flow-container {
  background-color: #eaf6fb;
  border-left: 4px solid #0074a6;
  border-radius: 6px;
  padding: 24px 28px;
  margin-bottom: 40px;
  }
  .bank-flow-container h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: bold;
  color: #0074a6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  }
  .bank-flow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  }
  .bank-flow-card {
  background: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  }
  .bank-flow-title {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: #777777;
  }
  .bank-flow-val {
  font-size: 18px;
  font-weight: bold;
  margin-top: 6px;
  }
  .bank-plus { color: #0074a6; }
  .bank-minus { color: #ef4444; }
  
  /* Tables Styling */
  .card-section {
  margin-bottom: 40px;
  }
  .card-section h2 {
  font-size: 18px;
  color: #0074a6;
  font-weight: bold;
  margin: 0 0 18px 0;
  }
  table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e1e8ed;
  }
  th, td {
  padding: 14px 16px;
  border-bottom: 1px solid #e1e8ed;
  font-size: 14px;
  }
  th {
  font-weight: bold;
  color: #0074a6;
  background-color: #fafafa;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
  }
  td {
  color: #4a4a4a;
  }
  tr:hover td {
  background-color: #fafafa;
  }
  .no-data-cell {
  text-align: center;
  color: #888888;
  padding: 24px;
  font-style: italic;
  }
  
  /* Badge styling */
  .type-badge-container {
  display: flex;
  align-items: center;
  }
  .type-badge {
  background-color: #eaf6fb;
  color: #0074a6;
  border: 1px solid #cce8f4;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 6px;
  }
  
  /* Footer & Bottom Info */
  .brand-footer {
  background-color: #fafafa;
  padding: 35px;
  border-top: 1px solid #eeeeee;
  text-align: center;
  font-size: 14px;
  color: #888888;
  }
  .brand-footer strong {
  color: #0074a6;
  }
  .bottom-copyright {
  text-align: center;
  font-size: 11px;
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 25px 0;
  }
  </style>
  </head>
  <body>

  <div class="wrapper">
  <!-- BRAND BANNER -->
  <div class="brand-header">
  <img src="https://www.feroveucto.sk/wp-content/uploads/2018/05/Obrazok-WhatsApp-2024-03-10-o-22.53.34_e611ba06.jpg" alt="Logo FÉROVÉ ÚČTO" class="brand-logo">
  </div>
  <div class="brand-divider"></div>
  
  <div class="main-content">
  <!-- HEADER DETAILS -->
  <div class="header-bar">
  <div class="header-info">
  <h1>Mesačná štatistika dokladov</h1>
  <p>Klient: <strong class="company-highlight">${escapeHtml(firmaName)}</strong> | Obdobie: <strong>${escapeHtml(mesiacText)} ${rok}</strong> (${datOd} - ${datDo})</p>
  </div>
  <button class="btn-download" onclick="downloadReport()">
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right:4px;">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
  </svg>
  STIAHNUŤ REPORT
  </button>
  </div>

  <!-- MAIN SUMMARY CARDS -->
  <div class="grid-kpis">
  <div class="card-kpi kpi-doklady-count">
  <div class="kpi-title">Všetky doklady</div>
  <div class="kpi-value">${totalDocCount} ks</div>
  <div class="kpi-sub">Faktúry, Záväzky a Pokladňa celkom</div>
  </div>
  
  <div class="card-kpi kpi-banka-count">
  <div class="kpi-title">Banka (Počet pohybov)</div>
  <div class="kpi-value">${bankaCount} ks</div>
  <div class="kpi-sub">Pohyby na bankových účtoch</div>
  </div>

  <div class="card-kpi kpi-doklady-value">
  <div class="kpi-title">DPH na úhradu (r. 35)</div>
  <div class="kpi-value">${formatCurrency(dphZaplatiť)}</div>
  <div class="kpi-sub">Vlastná daňová povinnosť (daň r. 32: ${formatCurrency(dphCelkom)})</div>
  </div>
  </div>

  <!-- BANK MOVEMENTS (Corporate Alert Box style) -->
  <div class="bank-flow-container">
  <h3>Bankové pohyby v danom mesiaci</h3>
  <div class="bank-flow-grid">
  <div class="bank-flow-card">
  <div class="bank-flow-title" style="color: #0074a6;">Prítok (Prijaté platby)</div>
  <div class="bank-flow-val" style="color: #0074a6;">${formatCurrency(bankaPrijem)}</div>
  </div>
  <div class="bank-flow-card">
  <div class="bank-flow-title" style="color: #ef4444;">Úbytok (Odoslané platby)</div>
  <div class="bank-flow-val" style="color: #ef4444;">${formatCurrency(bankaVydej)}</div>
  </div>
  <div class="bank-flow-card">
  <div class="bank-flow-title">Výsledná bilancia</div>
  <div class="bank-flow-val ${bankaBilanciaTrieda}">${bankaBilanciaSipka} ${formatCurrency(Math.abs(bankaCistyResult))}</div>
  </div>
  </div>
  </div>

  <!-- VYDANÉ DOKLADY -->
  <div class="card-section">
  <h2>Vydané faktúry podľa typov dokladov</h2>
  <table>
  <thead>
  <tr>
  <th>Typ dokladu (typDokl)</th>
  <th style="text-align: center; width: 140px;">Počet</th>
  <th style="text-align: right; width: 200px;">Celková DPH</th>
  <th style="text-align: right; width: 200px;">Celkom s DPH</th>
  </tr>
  </thead>
  <tbody>
  ${renderTypeRows(vydaneGrouped)}
  </tbody>
  </table>
  </div>

  <!-- PRIJATÉ DOKLADY -->
  <div class="card-section">
  <h2>Prijaté faktúry podľa typov dokladov</h2>
  <table>
  <thead>
  <tr>
  <th>Typ dokladu (typDokl)</th>
  <th style="text-align: center; width: 140px;">Počet</th>
  <th style="text-align: right; width: 200px;">Celková DPH</th>
  <th style="text-align: right; width: 200px;">Celkom s DPH</th>
  </tr>
  </thead>
  <tbody>
  ${renderTypeRows(prijateGrouped)}
  </tbody>
  </table>
  </div>

  <!-- ZÁVÄZKY -->
  <div class="card-section">
  <h2>Záväzky podľa typov dokladov</h2>
  <table>
  <thead>
  <tr>
  <th>Typ dokladu (typDokl)</th>
  <th style="text-align: center; width: 140px;">Počet</th>
  <th style="text-align: right; width: 200px;">Celková DPH</th>
  <th style="text-align: right; width: 200px;">Celkom s DPH</th>
  </tr>
  </thead>
  <tbody>
  ${renderTypeRows(zavazkyGrouped)}
  </tbody>
  </table>
  </div>

  <!-- POKLADŇA -->
  <div class="card-section">
  <h2>Pokladničné pohyby podľa typov dokladov</h2>
  <table>
  <thead>
  <tr>
  <th>Typ dokladu (typDokl)</th>
  <th style="text-align: center; width: 140px;">Počet</th>
  <th style="text-align: right; width: 200px;">Celková DPH</th>
  <th style="text-align: right; width: 200px;">Celkom s DPH</th>
  </tr>
  </thead>
  <tbody>
  ${renderTypeRows(pokladnaGrouped)}
  </tbody>
  </table>
  </div>

  </div>

  <!-- BRAND FOOTER -->
  <div class="brand-footer">
  Tento prehľad bol automaticky vygenerovaný pre klienta spoločnosti <strong>FÉROVÉ ÚČTO</strong>.<br/>
  Filtrované striktne podľa <strong>Dátumu vystavenia (datVyst)</strong> pre presný prehľad ich fyzickej evidencie.
  </div>
  </div>

  <!-- COPYRIGHT -->
  <div class="bottom-copyright">
  © 2026 FÉROVÉ ÚČTO | Férové partnerstvo v podnikaní
  </div>

  <script>
  function downloadReport() {
  const btn = document.querySelector('.btn-download');
  btn.style.display = 'none';
  
  const reportHtml = document.documentElement.outerHTML;
  
  btn.style.display = 'inline-flex';

  const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Prehlad_Dokladov_' + '${escapeHtml(mesiacText)}' + '_' + '${rok}' + '.html';
  link.click();
  }
  </script>
  </body>
  </html>
  `;
};

/**
 * Hlavný vstupný bod pre HTTP Google Cloud funkciu.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const vygenerujMesacnyReport = async (req, res) => {
  try {
    const { firma, authSessionId, rok: reqRok, mesiac: reqMesiac } = req.query;

    if (!firma) {
      res
        .status(400)
        .send(
          getErrorDashboardHtml(
            "Chybná požiadavka",
            "V URL adrese chýba povinný parameter: firma.",
          ),
        );
      return;
    }

    // -------------------------------------------------------------------------
    // 1. DYNAMICKÝ VÝPOČET DÁTUMOV
    // -------------------------------------------------------------------------
    let rok = parseInt(reqRok);
    let mesiac = parseInt(reqMesiac);

    // Ak nie sú zadané manuálne, predvolíme predchádzajúci kalendárny mesiac
    if (isNaN(rok) || isNaN(mesiac) || mesiac < 1 || mesiac > 12) {
      const dnes = new Date();
      dnes.setMonth(dnes.getMonth() - 1); // minulý mesiac
      rok = dnes.getFullYear();
      mesiac = dnes.getMonth() + 1; // 1-12
    }

    // Začiatok a koniec mesiaca pre filter
    const datOd = `${rok}-${String(mesiac).padStart(2, "0")}-01`;
    const poslednyDen = new Date(rok, mesiac, 0).getDate();
    const datDo = `${rok}-${String(mesiac).padStart(2, "0")}-${String(poslednyDen).padStart(2, "0")}`;

    const mesiaceSlovnik = [
      "Január",
      "Február",
      "Marec",
      "Apríl",
      "Máj",
      "Jún",
      "Júl",
      "August",
      "September",
      "Október",
      "November",
      "December",
    ];
    const mesiacText = mesiaceSlovnik[mesiac - 1];

    // Konfigurácia autorizačných hlavičiek pre REST API
    const apiHeaders = {
      Accept: "application/json",
    };
    if (authSessionId) {
      apiHeaders["X-authSessionId"] = authSessionId;
    } else {
      apiHeaders["Authorization"] = AUTH_HEADER;
    }

    // -------------------------------------------------------------------------
    // 2. PARALELNÉ NAČÍTANIE DÁT Z ABRA FLEXI (faktury, zavazky, pokladna, banka)
    // -------------------------------------------------------------------------

    // Používame detail=custom pre maximálnu optimalizáciu výkonu.
    // Sťahujeme striktne iba tie polia, s ktorými naša JS štatistika reálne pracuje, čím zmenšujeme objem prenášaných dát o viac ako 90 %.
    const fieldsDoklady = "detail=custom:typDokl,sumCelkem,sumDphCelkem";
    const fieldsBanka = "detail=custom:sumCelkem,typPohybuK";

    const urlVydane = `${firma}/faktura-vydana/(datVyst >= '${datOd}' and datVyst <= '${datDo}').json?${fieldsDoklady}&limit=0`;
    const urlPrijate = `${firma}/faktura-prijata/(datVyst >= '${datOd}' and datVyst <= '${datDo}').json?${fieldsDoklady}&limit=0`;
    const urlZavazky = `${firma}/zavazek/(datVyst >= '${datOd}' and datVyst <= '${datDo}').json?${fieldsDoklady}&limit=0`;
    const urlPokladna = `${firma}/pokladni-pohyb/(datVyst >= '${datOd}' and datVyst <= '${datDo}' and storno = false).json?${fieldsDoklady}&limit=0`;

    // Bankové pohyby zaznamenané v rovnakom období (filtrované podľa dátumu výpisu datVyst a vylučujúce stornované platby)
    const urlBanka = `${firma}/banka/(datVyst >= '${datOd}' and datVyst <= '${datDo}' and storno = false).json?${fieldsBanka}&limit=0`;
    const urlDph = `${firma}/priznani-dph.xml?koeficient=100&rok=${rok}&mesic=${mesiac}`;

    let responses;
    try {
      responses = await Promise.all([
        fetch(urlVydane, { method: "GET", headers: apiHeaders }),
        fetch(urlPrijate, { method: "GET", headers: apiHeaders }),
        fetch(urlZavazky, { method: "GET", headers: apiHeaders }),
        fetch(urlPokladna, { method: "GET", headers: apiHeaders }),
        fetch(urlBanka, { method: "GET", headers: apiHeaders }),
        fetch(urlDph, { method: "GET", headers: apiHeaders }),
      ]);
    } catch (networkError) {
      res
        .status(502)
        .send(
          getErrorDashboardHtml(
            "Chyba spojenia s ABRA Flexi",
            "Nepodarilo sa úspešne spojiť s vaším ABRA Flexi serverom.",
            networkError.message,
          ),
        );
      return;
    }

    const [resVydane, resPrijate, resZavazky, resPokladna, resBanka, resDph] =
      responses;

    // Overenie úspešnosti všetkých odpovedí
    for (const apiRes of responses) {
      if (!apiRes.ok) {
        const errText = await apiRes.text();
        res
          .status(apiRes.status)
          .send(
            getErrorDashboardHtml(
              "ABRA Flexi chyba",
              `Server ABRA Flexi vrátil chybový kód ${apiRes.status} pri dopyte na dáta.`,
              errText,
            ),
          );
        return;
      }
    }

    const jsonVydane = await resVydane.json();
    const jsonPrijate = await resPrijate.json();
    const jsonZavazky = await resZavazky.json();
    const jsonPokladna = await resPokladna.json();
    const jsonBanka = await resBanka.json();
    const xmlDph = await resDph.text();

    const vydaneDoklady = jsonVydane.winstrom?.["faktura-vydana"] || [];
    const prijateDoklady = jsonPrijate.winstrom?.["faktura-prijata"] || [];
    const zavazkyDoklady = jsonZavazky.winstrom?.["zavazek"] || [];
    const pokladnaDoklady = jsonPokladna.winstrom?.["pokladni-pohyb"] || [];
    const bankaDoklady = jsonBanka.winstrom?.["banka"] || [];

    // -------------------------------------------------------------------------
    // 3. MATEMATICKÁ AGREGÁCIA A SKUPINOVANIE PODĽA TYPOV
    // -------------------------------------------------------------------------

    let totalDocCount = 0;
    let totalDocValue = 0;

    // Zoskupenie pre vydané faktúry
    const vydaneGrouped = {};
    vydaneDoklady.forEach((d) => {
      const type = d.typDokl || "Neznámy typ";
      const celkem = Number(d.sumCelkem || 0);
      const dph = Number(d.sumDphCelkem || 0);

      totalDocCount++;
      totalDocValue += celkem;

      if (!vydaneGrouped[type]) {
        vydaneGrouped[type] = { count: 0, celkem: 0, dph: 0 };
      }
      vydaneGrouped[type].count++;
      vydaneGrouped[type].celkem += celkem;
      vydaneGrouped[type].dph += dph;
    });

    // Zoskupenie pre prijaté faktúry
    const prijateGrouped = {};
    prijateDoklady.forEach((d) => {
      const type = d.typDokl || "Neznámy typ";
      const celkem = Number(d.sumCelkem || 0);
      const dph = Number(d.sumDphCelkem || 0);

      totalDocCount++;
      totalDocValue += celkem;

      if (!prijateGrouped[type]) {
        prijateGrouped[type] = { count: 0, celkem: 0, dph: 0 };
      }
      prijateGrouped[type].count++;
      prijateGrouped[type].celkem += celkem;
      prijateGrouped[type].dph += dph;
    });

    // Zoskupenie pre záväzky
    const zavazkyGrouped = {};
    zavazkyDoklady.forEach((d) => {
      const type = d.typDokl || "Neznámy typ";
      const celkem = Number(d.sumCelkem || 0);
      const dph = Number(d.sumDphCelkem || 0);

      totalDocCount++;
      totalDocValue += celkem;

      if (!zavazkyGrouped[type]) {
        zavazkyGrouped[type] = { count: 0, celkem: 0, dph: 0 };
      }
      zavazkyGrouped[type].count++;
      zavazkyGrouped[type].celkem += celkem;
      zavazkyGrouped[type].dph += dph;
    });

    // Zoskupenie pre pokladničné pohyby
    const pokladnaGrouped = {};
    pokladnaDoklady.forEach((d) => {
      const type = d.typDokl || "Neznámy typ";
      const celkem = Number(d.sumCelkem || 0);
      const dph = Number(d.sumDphCelkem || 0);

      totalDocCount++;
      totalDocValue += celkem;

      if (!pokladnaGrouped[type]) {
        pokladnaGrouped[type] = { count: 0, celkem: 0, dph: 0 };
      }
      pokladnaGrouped[type].count++;
      pokladnaGrouped[type].celkem += celkem;
      pokladnaGrouped[type].dph += dph;
    });

    // E. Bankové pohyby (Prítoky a úbytky)
    let bankaPrijem = 0;
    let bankaVydej = 0;

    bankaDoklady.forEach((b) => {
      const suma = Number(b.sumCelkem || 0);
      if (b.typPohybuK === "typPohybu.prijem") {
        bankaPrijem += suma;
      } else if (b.typPohybuK === "typPohybu.vydej") {
        bankaVydej += suma;
      }
    });

    // Získanie kódového názvu firmy (pre dashboard)
    const firmaName =
      String(firma).split("/").filter(Boolean).pop() || "ABRA Flexi";

    // Extrakcia kľúčových dát z Priznania k DPH (XML)
    const matchR32 = xmlDph.match(/<r32>([\d.-]+)<\/r32>/);
    const matchR35 = xmlDph.match(/<r35>([\d.-]+)<\/r35>/);

    const dphCelkom = matchR32 ? Number(matchR32[1]) : 0;
    const dphZaplatiť = matchR35 ? Number(matchR35[1]) : 0;

    // -------------------------------------------------------------------------
    // 4. VYGENEROVANIE DASHBOARDU A ODOSLANIE
    // -------------------------------------------------------------------------
    const dashboardData = {
      firmaName,
      mesiacText,
      rok,
      datOd,
      datDo,
      totalDocCount,
      totalDocValue,
      bankaCount: bankaDoklady.length,
      bankaPrijem,
      bankaVydej,
      vydaneGrouped,
      prijateGrouped,
      zavazkyGrouped,
      pokladnaGrouped,
      dphCelkom,
      dphZaplatiť,
    };

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(getDashboardHtml(dashboardData));
  } catch (globalError) {
    res
      .status(500)
      .send(
        getErrorDashboardHtml(
          "Interná chyba",
          "Počas spracovávania biznis reportu nastala neočakávaná systémová výnimka.",
          globalError.stack || globalError.message,
        ),
      );
  }
};
