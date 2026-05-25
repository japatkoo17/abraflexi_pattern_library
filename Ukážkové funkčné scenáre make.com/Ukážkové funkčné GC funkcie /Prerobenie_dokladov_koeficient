import { Buffer } from 'buffer';

// --- KONFIGURÁCIA PRIHLASOVANIA DO ABRA FLEXI (MVP ÚČELY) ---
const API_USER = process.env.API_USER || 'admin';
const API_PASSWORD = process.env.API_PASSWORD || 'admin123';

// Vytvorenie Basic Auth hlavičky
const AUTH_HEADER = 'Basic ' + Buffer.from(`${API_USER}:${API_PASSWORD}`).toString('base64');

/**
 * Pomocná funkcia na bezpečné ošetrenie HTML pred XSS.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * HTML šablóna pre hlavný formulár zadania koeficientu (GET).
 */
const getFormHtml = (ids, evidence, firma, authSessionId = '') => `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prepočet DPH koeficientom</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      width: 100%;
      max-width: 450px;
      padding: 32px;
      box-sizing: border-box;
      text-align: left;
    }
    .logo-container {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }
    .logo-icon {
      background: #4f46e5;
      color: #ffffff;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 20px;
      margin-right: 12px;
    }
    h2 {
      margin: 0;
      color: #1f2937;
      font-size: 22px;
      font-weight: 700;
    }
    p.desc {
      color: #4b5563;
      font-size: 14px;
      line-height: 1.5;
      margin: 0 0 24px 0;
    }
    .form-group {
      margin-bottom: 24px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }
    .input-wrapper {
      position: relative;
    }
    input[type="number"] {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 16px;
      color: #111827;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input[type="number"]:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }
    .input-suffix {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      font-weight: 600;
    }
    button {
      background: #4f46e5;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 14px 20px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s, transform 0.1s;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button:hover {
      background: #4338ca;
    }
    button:active {
      transform: scale(0.98);
    }
    .loading-spinner {
      display: none;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
      margin-right: 8px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    button.loading .loading-spinner {
      display: inline-block;
    }
    button.loading .button-text {
      display: none;
    }
    .metadata-box {
      background: #f9fafb;
      border: 1px solid #f3f4f6;
      border-radius: 8px;
      padding: 14px;
      margin-top: 24px;
      font-size: 12px;
      color: #6b7280;
      line-height: 1.6;
    }
    .metadata-title {
      font-weight: 700;
      color: #4b5563;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-container">
      <div class="logo-icon">%</div>
      <h2>DPH Koeficient</h2>
    </div>
    
    <p class="desc">Aplikuje zadaný koeficient na DPH hodnoty vybraných dokladov. Prebytok presunie do oslobodeného plnenia podľa vopred definovanej schémy.</p>
    
    <form method="POST" id="recalcForm">
      <input type="hidden" name="ids" value="${escapeHtml(ids)}">
      <input type="hidden" name="evidence" value="${escapeHtml(evidence)}">
      <input type="hidden" name="firma" value="${escapeHtml(firma)}">
      <input type="hidden" name="authSessionId" value="${escapeHtml(authSessionId)}">
      
      <div class="form-group">
        <label for="percentoVDph">Koeficient pre uplatnenie DPH</label>
        <div class="input-wrapper">
          <input type="number" id="percentoVDph" name="percentoVDph" min="0" max="100" step="0.01" value="60" required autofocus>
          <span class="input-suffix">%</span>
        </div>
      </div>
      
      <button type="submit" id="submitBtn">
        <div class="loading-spinner"></div>
        <span class="button-text">Spustiť prepočet</span>
      </button>
    </form>
    
    <div class="metadata-box">
      <div class="metadata-title">Kontext operácie</div>
      <strong>Firma:</strong> ${escapeHtml(firma)}<br>
      <strong>Evidencia:</strong> ${escapeHtml(evidence)}<br>
      <strong>Počet dokladov:</strong> ${escapeHtml(ids.split(',').length)}
    </div>
  </div>

  <script>
    const form = document.getElementById('recalcForm');
    const btn = document.getElementById('submitBtn');
    form.addEventListener('submit', () => {
      btn.classList.add('loading');
      btn.disabled = true;
    });
  </script>
</body>
</html>
`;

/**
 * HTML šablóna pre úspešné dokončenie (POST - Úspech).
 */
const getSuccessHtml = (processedCount, ids) => `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prepočet úspešný</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      width: 100%;
      max-width: 450px;
      padding: 36px;
      box-sizing: border-box;
      text-align: center;
    }
    .success-icon {
      background: #10b981;
      color: #ffffff;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      margin: 0 auto 24px auto;
      box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
    }
    h2 {
      margin: 0 0 12px 0;
      color: #1f2937;
      font-size: 22px;
      font-weight: 700;
    }
    p {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.5;
      margin: 0 0 24px 0;
    }
    .ids-list {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px;
      font-size: 13px;
      color: #4b5563;
      word-break: break-all;
      margin-bottom: 24px;
      max-height: 100px;
      overflow-y: auto;
    }
    .timer-container {
      width: 100%;
      background: #e5e7eb;
      height: 4px;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 24px;
    }
    .timer-bar {
      background: #10b981;
      height: 100%;
      width: 100%;
      animation: shrink 3s linear forwards;
    }
    @keyframes shrink {
      from { width: 100%; }
      to { width: 0%; }
    }
    button {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background: #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="success-icon">✓</div>
    <h2>Doklady prepočítané!</h2>
    <p>Prepočet prebehol úspešne. Aktualizovaných bolo <strong>${escapeHtml(processedCount)}</strong> dokladov.</p>
    
    <div class="ids-list">
      <strong>Spracované ID:</strong> ${escapeHtml(ids)}
    </div>

    <div class="timer-container">
      <div class="timer-bar"></div>
    </div>
    
    <button onclick="window.close()">Zatvoriť teraz</button>
  </div>

  <script>
    setTimeout(() => {
      window.close();
    }, 3000);
  </script>
</body>
</html>
`;

/**
 * HTML šablóna pre zobrazenie chyby (POST/GET - Zlyhanie).
 */
const getErrorHtml = (errorTitle, errorMessage, details = null) => `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nastala chyba</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      width: 100%;
      max-width: 500px;
      padding: 36px;
      box-sizing: border-box;
      text-align: center;
    }
    .error-icon {
      background: #ef4444;
      color: #ffffff;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      margin: 0 auto 24px auto;
      box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
    }
    h2 {
      margin: 0 0 12px 0;
      color: #1f2937;
      font-size: 22px;
      font-weight: 700;
    }
    p.error-msg {
      color: #ef4444;
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 16px 0;
    }
    .error-details {
      background: #fef2f2;
      border: 1px solid #fee2e2;
      border-radius: 8px;
      padding: 16px;
      text-align: left;
      font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 13px;
      color: #991b1b;
      margin-bottom: 24px;
      max-height: 200px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }
    button {
      background: #4f46e5;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background: #4338ca;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="error-icon">✕</div>
    <h2>${escapeHtml(errorTitle)}</h2>
    <p class="error-msg">${escapeHtml(errorMessage)}</p>
    
    ${details ? `<div class="error-details"><strong>Technické detaily:</strong>\n${escapeHtml(details)}</div>` : ''}
    
    <button onclick="window.close()">Zatvoriť okno</button>
  </div>
</body>
</html>
`;

/**
 * Hlavný vstupný bod pre HTTP Google Cloud funkciu.
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const spracujKoeficient = async (req, res) => {
  try {
    // -------------------------------------------------------------------------
    // 1. SPRACOVANIE GET METÓDY (Zobrazenie formulára)
    // -------------------------------------------------------------------------
    if (req.method === 'GET') {
      const { ids, evidence, firma, authSessionId } = req.query;

      // Validácia povinných parametrov v URL
      if (!ids || !evidence || !firma) {
        res.status(400).send(getErrorHtml(
          'Chybná požiadavka',
          'V URL adrese chýbajú povinné parametre: ids, evidence alebo firma.'
        ));
        return;
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(getFormHtml(ids, evidence, firma, authSessionId));
      return;
    }

    // -------------------------------------------------------------------------
    // 2. SPRACOVANIE POST METÓDY (Výpočet a uloženie spat do ABRA Flexi)
    // -------------------------------------------------------------------------
    if (req.method === 'POST') {
      const { ids, evidence, firma, percentoVDph, authSessionId } = req.body;

      // Validácia tela požiadavky
      if (!ids || !evidence || !firma || percentoVDph === undefined) {
        res.status(400).send(getErrorHtml(
          'Chybná požiadavka',
          'Vo formulári chýbajú povinné parametre: ids, evidence, firma alebo percentoVDph.'
        ));
        return;
      }

      // Validácia zadanej percentuálnej hodnoty koeficientu
      const percentoVal = parseFloat(percentoVDph);
      if (isNaN(percentoVal) || percentoVal < 0 || percentoVal > 100) {
        res.status(400).send(getErrorHtml(
          'Neplatný koeficient',
          'Koeficient pre uplatnenie DPH musí byť reálne číslo v rozmedzí od 0 do 100.'
        ));
        return;
      }

      // Výpočet koeficientov
      const pDph = percentoVal / 100;

      // 2A. Načítanie dokladov z ABRA Flexi REST API
      const fetchUrl = `${firma}/${evidence}.json?detail=full&filter=id in (${ids})`;
      
      const getHeaders = {
        'Accept': 'application/json'
      };
      if (authSessionId) {
        getHeaders['X-authSessionId'] = authSessionId;
      } else {
        getHeaders['Authorization'] = AUTH_HEADER;
      }

      let getResponse;
      try {
        getResponse = await fetch(fetchUrl, {
          method: 'GET',
          headers: getHeaders
        });
      } catch (fetchError) {
        res.status(502).send(getErrorHtml(
          'Chyba spojenia s ABRA Flexi',
          'Nepodarilo sa spojiť so serverom ABRA Flexi pri načítavaní dokladov.',
          fetchError.message
        ));
        return;
      }

      if (!getResponse.ok) {
        const errorText = await getResponse.text();
        res.status(getResponse.status).send(getErrorHtml(
          'Chyba pri načítaní dokladov',
          `Server ABRA Flexi vrátil chybu s kódom ${getResponse.status}.`,
          errorText
        ));
        return;
      }

      const getData = await getResponse.json();
      const doklady = getData.winstrom?.[evidence];

      if (!doklady || !Array.isArray(doklady) || doklady.length === 0) {
        res.status(404).send(getErrorHtml(
          'Nenájdené doklady',
          'Na serveri sa nenašli žiadne zodpovedajúce doklady pre zadané parametre.'
        ));
        return;
      }

      // 2B. Prepočet hodnôt (Matematická logika z Make.com)
      const upraveneDoklady = doklady.map(doklad => {
        const sumCelkem = Number(doklad.sumCelkem || 0);

        // Vynásobenie príslušných polí koeficientom a zaokrúhlenie na 2 desatinné miesta
        const noveZklZakl = (Number(doklad.sumZklZakl || 0) * pDph).toFixed(2);
        const noveDphZakl = (Number(doklad.sumDphZakl || 0) * pDph).toFixed(2);
        
        const noveZklSniz = (Number(doklad.sumZklSniz || 0) * pDph).toFixed(2);
        const noveDphSniz = (Number(doklad.sumDphSniz || 0) * pDph).toFixed(2);
        
        const noveZklSniz2 = (Number(doklad.sumZklSniz2 || 0) * pDph).toFixed(2);
        const noveDphSniz2 = (Number(doklad.sumDphSniz2 || 0) * pDph).toFixed(2);

        // Celková uznaná suma v DPH po aplikovaní koeficientu
        const celkomUznaneVDph = Number(noveZklZakl) + Number(noveDphZakl) + 
                                 Number(noveZklSniz) + Number(noveDphSniz) + 
                                 Number(noveZklSniz2) + Number(noveDphSniz2);

        // Všetok zostávajúci rozdiel do celkovej sumy ide do oslobodeného plnenia (sumOsv)
        const noveOsv = (sumCelkem - celkomUznaneVDph).toFixed(2);

        // Aktualizácia textu poznámky (append koeficientu)
        const povodnaPoznam = doklad.poznam ? String(doklad.poznam).trim() : '';
        const koeficientPoznamka = `Koeficient ${percentoVal}%`;
        const novaPoznam = povodnaPoznam 
          ? (povodnaPoznam.includes(koeficientPoznamka) ? povodnaPoznam : `${povodnaPoznam} - ${koeficientPoznamka}`)
          : koeficientPoznamka;

        return {
          id: String(doklad.id),
          sumOsv: String(noveOsv),
          sumZklZakl: String(noveZklZakl),
          sumDphZakl: String(noveDphZakl),
          sumZklSniz: String(noveZklSniz),
          sumDphSniz: String(noveDphSniz),
          sumZklSniz2: String(noveZklSniz2),
          sumDphSniz2: String(noveDphSniz2),
          poznam: novaPoznam
        };
      });

      // 2C. Payload zápisu
      const writePayload = {
        winstrom: {
          [evidence]: upraveneDoklady
        }
      };

      // Odoslanie prepočítaných dát naspäť do ABRA Flexi
      const writeUrl = `${firma}/${evidence}.json`;
      
      const writeHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      if (authSessionId) {
        writeHeaders['X-authSessionId'] = authSessionId;
      } else {
        writeHeaders['Authorization'] = AUTH_HEADER;
      }

      let writeResponse;
      try {
        writeResponse = await fetch(writeUrl, {
          method: 'POST',
          headers: writeHeaders,
          body: JSON.stringify(writePayload)
        });
      } catch (writeError) {
        res.status(502).send(getErrorHtml(
          'Chyba spojenia s ABRA Flexi',
          'Nepodarilo sa spojiť so serverom ABRA Flexi pri zápise prepočítaných hodnôt.',
          writeError.message
        ));
        return;
      }

      const writeData = await writeResponse.json();

      // Skontrolujeme, či zápis prebehol úspešne na úrovni REST API
      const isSuccess = writeResponse.ok && String(writeData.winstrom?.success) === 'true';

      if (!isSuccess) {
        // Spracovanie chybových správ z ABRA Flexi API
        let errorDetails = '';
        if (writeData.winstrom?.results) {
          const errors = writeData.winstrom.results
            .flatMap(res => res.errors || [])
            .map(err => `${err.field ? `[${err.field}]: ` : ''}${err.message || ''}`)
            .filter(Boolean);
          
          if (errors.length > 0) {
            errorDetails = errors.join('\n');
          }
        }

        if (!errorDetails) {
          errorDetails = JSON.stringify(writeData, null, 2);
        }

        res.status(400).send(getErrorHtml(
          'Chyba pri zápise do ABRA Flexi',
          'ABRA Flexi systém odmietol vygenerovaný prepisový payload s upravenými hodnotami.',
          errorDetails
        ));
        return;
      }

      // 2D. Úspešné ukončenie s automatickým zatvorením okna po 3s
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(getSuccessHtml(upraveneDoklady.length, ids));
      return;
    }

    // Ak nie je GET ani POST
    res.status(405).send('Method Not Allowed');
  } catch (globalError) {
    // Globálny záchytný bod pre neočakávané chyby
    res.status(500).send(getErrorHtml(
      'Neočakávaná interná chyba',
      'Počas vykonávania funkcie nastala neočakávaná výnimka.',
      globalError.stack || globalError.message
    ));
  }
};
