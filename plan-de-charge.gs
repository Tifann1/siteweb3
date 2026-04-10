/**
 * Plan de charge projet — Google Apps Script
 *
 * UTILISATION :
 * 1. Ouvrir un nouveau Google Sheet
 * 2. Menu : Extensions > Apps Script
 * 3. Coller ce code, remplacer le contenu existant
 * 4. Cliquer sur "Exécuter" (fonction : creerPlanDeCharge)
 * 5. Autoriser les permissions demandées
 */

function creerPlanDeCharge() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();

  // Mode standalone (script.google.com) : créer un nouveau Sheet
  if (!ss) {
    ss = SpreadsheetApp.create("Plan de charge projet");
    Logger.log("Spreadsheet créé : " + ss.getUrl());
  }

  // Supprimer les feuilles existantes sauf la première
  const sheets = ss.getSheets();
  sheets.forEach((s, i) => { if (i > 0) ss.deleteSheet(s); });

  // ── Feuille 1 : Plan de charge ────────────────────────────────────────────
  const fPlan = sheets[0];
  fPlan.setName("Plan de charge");
  _construirePlanDeCharge(fPlan);

  // ── Feuille 2 : Suivi hebdomadaire ────────────────────────────────────────
  const fSuivi = ss.insertSheet("Suivi hebdomadaire");
  _construireSuiviHebdo(fSuivi);

  // ── Feuille 3 : Légende ───────────────────────────────────────────────────
  const fLeg = ss.insertSheet("Légende");
  _construireLégende(fLeg);

  // Activer la feuille principale
  ss.setActiveSheet(fPlan);

  const msg =
    "Plan de charge créé avec succès !\n\n" +
    "• Feuille 1 : Plan de charge (hiérarchie 3 niveaux)\n" +
    "• Feuille 2 : Suivi hebdomadaire (features × semaines)\n" +
    "• Feuille 3 : Légende\n\n" +
    "URL : " + ss.getUrl() + "\n\n" +
    "Remplacez les données d'exemple par vos vrais modules.";

  try {
    SpreadsheetApp.getUi().alert(msg);
  } catch (_) {
    Logger.log(msg);
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// FEUILLE 1 — Plan de charge
// ─────────────────────────────────────────────────────────────────────────────

function _construirePlanDeCharge(sheet) {
  sheet.clear();

  // Couleurs par niveau
  const COULEUR_MACRO   = "#1a3a5c";  // bleu marine — fond
  const COULEUR_FEATURE = "#2e6da4";  // bleu moyen — fond
  const COULEUR_TACHE   = "#d9e8f5";  // bleu très clair — fond
  const TEXTE_CLAIR     = "#ffffff";
  const TEXTE_FONCE     = "#1a1a2e";

  // En-têtes
  const HEADERS = [
    "ID", "Parent ID", "Niveau", "Nom",
    "Estimation (j)", "Jours vendus", "Jours consommés",
    "RAF", "Dépassement", "Statut"
  ];
  // Largeurs de colonnes (pixels)
  const LARGEURS = [60, 80, 80, 280, 120, 110, 130, 80, 110, 90];

  // Données d'exemple (ID, ParentID, Niveau, Nom, Estim, Vendus, Consommés)
  const DATA = [
    // ── MODULE 1
    ["M1",  "",   "Macro",   "Authentification",            15, 15, 8,  "", ""],
    ["F1.1","M1", "Feature", "Inscription / Login",          5,  5,  3,  "", ""],
    ["T1",  "F1.1","Tâche",  "Formulaire d'inscription",    "", "", "", "", ""],
    ["T2",  "F1.1","Tâche",  "Validation email",            "", "", "", "", ""],
    ["T3",  "F1.1","Tâche",  "Page login + JWT",            "", "", "", "", ""],
    ["F1.2","M1", "Feature", "Réinitialisation mot de passe",4,  4,  2,  "", ""],
    ["T4",  "F1.2","Tâche",  "Page demande reset",          "", "", "", "", ""],
    ["T5",  "F1.2","Tâche",  "Email + lien temporaire",     "", "", "", "", ""],
    ["F1.3","M1", "Feature", "Gestion de session",           6,  6,  3,  "", ""],
    ["T6",  "F1.3","Tâche",  "Middleware auth",             "", "", "", "", ""],
    ["T7",  "F1.3","Tâche",  "Refresh token",               "", "", "", "", ""],
    // ── MODULE 2
    ["M2",  "",   "Macro",   "Tableau de bord",             20, 18, 5,  "", ""],
    ["F2.1","M2", "Feature", "Vue synthèse KPIs",            8,  7,  2,  "", ""],
    ["T8",  "F2.1","Tâche",  "Composant KPI card",          "", "", "", "", ""],
    ["T9",  "F2.1","Tâche",  "API agrégation données",      "", "", "", "", ""],
    ["F2.2","M2", "Feature", "Graphiques & tendances",       7,  6,  2,  "", ""],
    ["T10", "F2.2","Tâche",  "Intégration Chart.js",        "", "", "", "", ""],
    ["T11", "F2.2","Tâche",  "Filtres date",                "", "", "", "", ""],
    ["F2.3","M2", "Feature", "Export PDF / CSV",             5,  5,  1,  "", ""],
    ["T12", "F2.3","Tâche",  "Génération PDF côté serveur", "", "", "", "", ""],
    ["T13", "F2.3","Tâche",  "Export CSV avec filtres",     "", "", "", "", ""],
    // ── MODULE 3
    ["M3",  "",   "Macro",   "Gestion utilisateurs",        10, 10, 0,  "", ""],
    ["F3.1","M3", "Feature", "CRUD utilisateurs",            5,  5,  0,  "", ""],
    ["T14", "F3.1","Tâche",  "Liste avec pagination",       "", "", "", "", ""],
    ["T15", "F3.1","Tâche",  "Fiche utilisateur",           "", "", "", "", ""],
    ["F3.2","M3", "Feature", "Rôles & permissions",          5,  5,  0,  "", ""],
    ["T16", "F3.2","Tâche",  "Matrice de rôles",            "", "", "", "", ""],
    ["T17", "F3.2","Tâche",  "Guards API",                  "", "", "", "", ""],
  ];

  // ── En-têtes ──────────────────────────────────────────────────────────────
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setValues([HEADERS]);
  headerRange.setBackground("#0d1b2a");
  headerRange.setFontColor(TEXTE_CLAIR);
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 36);

  // Largeurs de colonnes
  LARGEURS.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // ── Données + formules + couleurs ─────────────────────────────────────────
  const groupsToCreate = []; // {startRow, endRow}
  let currentMacroStart = -1;

  DATA.forEach((row, idx) => {
    const sheetRow = idx + 2; // ligne 1 = en-tête
    const niveau = row[2];
    const isNumeric = (v) => v !== "" && v !== null && v !== undefined;

    // Colonnes A-G : données brutes
    const cellsData = sheet.getRange(sheetRow, 1, 1, 7);
    cellsData.setValues([[row[0], row[1], row[2], row[3], row[4], row[5], row[6]]]);

    // Colonne H : RAF (=E-G) — seulement Macro et Feature
    if (niveau !== "Tâche" && isNumeric(row[4])) {
      sheet.getRange(sheetRow, 8).setFormula(`=E${sheetRow}-G${sheetRow}`);
    }

    // Colonne I : Dépassement (=G-F) — seulement Macro et Feature
    if (niveau !== "Tâche" && isNumeric(row[5])) {
      sheet.getRange(sheetRow, 9).setFormula(`=G${sheetRow}-F${sheetRow}`);
    }

    // Colonne J : Statut conditionnel
    if (niveau !== "Tâche" && isNumeric(row[6]) && isNumeric(row[5])) {
      sheet.getRange(sheetRow, 10).setFormula(
        `=SI(G${sheetRow}=0,"Non démarré",SI(G${sheetRow}>=F${sheetRow},"Dépassé",SI(G${sheetRow}/E${sheetRow}>=0.8,"En cours","OK")))`
      );
    }

    // Couleurs par niveau
    const fullRow = sheet.getRange(sheetRow, 1, 1, HEADERS.length);
    if (niveau === "Macro") {
      fullRow.setBackground(COULEUR_MACRO);
      fullRow.setFontColor(TEXTE_CLAIR);
      fullRow.setFontWeight("bold");
      fullRow.setFontSize(10);
      if (currentMacroStart > -1) {
        groupsToCreate.push({ start: currentMacroStart, end: sheetRow - 1 });
      }
      currentMacroStart = sheetRow + 1;
    } else if (niveau === "Feature") {
      fullRow.setBackground(COULEUR_FEATURE);
      fullRow.setFontColor(TEXTE_CLAIR);
      fullRow.setFontWeight("normal");
      fullRow.setFontSize(10);
      // Indentation visuelle du nom
      sheet.getRange(sheetRow, 4).setValue("  " + row[3]);
    } else {
      fullRow.setBackground(COULEUR_TACHE);
      fullRow.setFontColor(TEXTE_FONCE);
      fullRow.setFontSize(9);
      sheet.getRange(sheetRow, 4).setValue("    → " + row[3]);
    }

    // Alignement des colonnes numériques
    sheet.getRange(sheetRow, 5, 1, 6).setHorizontalAlignment("center");

    sheet.setRowHeight(sheetRow, 24);
  });

  // Clore le dernier groupe
  if (currentMacroStart > -1) {
    groupsToCreate.push({ start: currentMacroStart, end: DATA.length + 1 });
  }

  // ── Regroupements (group rows) ────────────────────────────────────────────
  // Note : Apps Script permet le groupement
  groupsToCreate.forEach(g => {
    if (g.end >= g.start) {
      sheet.getRange(g.start, 1, g.end - g.start + 1, 1).shiftRowGroupDepth(1);
    }
  });

  // ── Mise en forme conditionnelle : Dépassement > 0 → rouge ───────────────
  const dataRange = sheet.getRange(2, 1, DATA.length, HEADERS.length);
  const regles = sheet.getConditionalFormatRules();

  // Colonne I (Dépassement) : rouge si > 0
  const regleDepassement = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setBackground("#f4cccc")
    .setFontColor("#cc0000")
    .setRanges([sheet.getRange(2, 9, DATA.length, 1)])
    .build();

  // Colonne I : vert si <= 0
  const regleOk = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThanOrEqualTo(0)
    .setBackground("#d9ead3")
    .setFontColor("#274e13")
    .setRanges([sheet.getRange(2, 9, DATA.length, 1)])
    .build();

  // Colonne H (RAF) : orange si < 0
  const regleRaf = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setBackground("#fce5cd")
    .setFontColor("#e65100")
    .setRanges([sheet.getRange(2, 8, DATA.length, 1)])
    .build();

  sheet.setConditionalFormatRules([regleDepassement, regleOk, regleRaf]);

  // ── Filtre ────────────────────────────────────────────────────────────────
  const filterRange = sheet.getRange(1, 1, DATA.length + 1, HEADERS.length);
  filterRange.createFilter();

  // ── Ligne de total (sous les données) ────────────────────────────────────
  const totalRow = DATA.length + 2;
  sheet.getRange(totalRow, 4).setValue("TOTAL").setFontWeight("bold");
  sheet.getRange(totalRow, 5).setFormula(`=SOMME(E2:E${DATA.length + 1})`).setFontWeight("bold");
  sheet.getRange(totalRow, 6).setFormula(`=SOMME(F2:F${DATA.length + 1})`).setFontWeight("bold");
  sheet.getRange(totalRow, 7).setFormula(`=SOMME(G2:G${DATA.length + 1})`).setFontWeight("bold");
  sheet.getRange(totalRow, 1, 1, HEADERS.length).setBackground("#ffe0b2").setFontColor(TEXTE_FONCE);
}


// ─────────────────────────────────────────────────────────────────────────────
// FEUILLE 2 — Suivi hebdomadaire
// ─────────────────────────────────────────────────────────────────────────────

function _construireSuiviHebdo(sheet) {
  sheet.clear();

  const NB_SEMAINES = 26; // S1 à S26 (6 mois)

  // Features extraites (correspondance avec Plan de charge)
  const FEATURES = [
    { id: "F1.1", nom: "Inscription / Login" },
    { id: "F1.2", nom: "Réinitialisation mot de passe" },
    { id: "F1.3", nom: "Gestion de session" },
    { id: "F2.1", nom: "Vue synthèse KPIs" },
    { id: "F2.2", nom: "Graphiques & tendances" },
    { id: "F2.3", nom: "Export PDF / CSV" },
    { id: "F3.1", nom: "CRUD utilisateurs" },
    { id: "F3.2", nom: "Rôles & permissions" },
  ];

  // En-têtes : ID Feature | Nom | S1 | S2 | ... | S26 | Total
  const headers = ["ID Feature", "Nom de la feature", ...Array.from({length: NB_SEMAINES}, (_, i) => `S${i+1}`), "Total"];
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground("#0d1b2a");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  sheet.setRowHeight(1, 36);

  // Largeurs
  sheet.setColumnWidth(1, 90);
  sheet.setColumnWidth(2, 220);
  for (let i = 3; i <= NB_SEMAINES + 2; i++) sheet.setColumnWidth(i, 45);
  sheet.setColumnWidth(NB_SEMAINES + 3, 70);

  // Données
  FEATURES.forEach((feat, idx) => {
    const row = idx + 2;
    const couleur = idx % 2 === 0 ? "#e8f0fe" : "#ffffff";

    sheet.getRange(row, 1).setValue(feat.id);
    sheet.getRange(row, 2).setValue(feat.nom);

    // Colonnes S1 à S26 : vides (saisie manuelle) avec fond
    sheet.getRange(row, 3, 1, NB_SEMAINES).setBackground(couleur);
    sheet.getRange(row, 3, 1, NB_SEMAINES).setHorizontalAlignment("center");

    // Colonne Total : somme de toutes les semaines
    const colDebut = _columnLetter(3);
    const colFin = _columnLetter(NB_SEMAINES + 2);
    sheet.getRange(row, NB_SEMAINES + 3)
      .setFormula(`=SOMME(${colDebut}${row}:${colFin}${row})`)
      .setBackground("#fff3e0")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");

    sheet.setRowHeight(row, 24);
  });

  // Ligne de total en bas
  const totalRow = FEATURES.length + 2;
  sheet.getRange(totalRow, 2).setValue("TOTAL / semaine").setFontWeight("bold");
  for (let col = 3; col <= NB_SEMAINES + 3; col++) {
    const lettre = _columnLetter(col);
    sheet.getRange(totalRow, col)
      .setFormula(`=SOMME(${lettre}2:${lettre}${FEATURES.length + 1})`)
      .setFontWeight("bold")
      .setBackground("#ffe0b2")
      .setHorizontalAlignment("center");
  }
  sheet.setRowHeight(totalRow, 28);

  // Mise en forme conditionnelle : cellules > 0 → bleu clair
  const dataZone = sheet.getRange(2, 3, FEATURES.length, NB_SEMAINES);
  const regle = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setBackground("#a8d5ff")
    .setFontColor("#0d1b2a")
    .setRanges([dataZone])
    .build();
  sheet.setConditionalFormatRules([regle]);
}


// ─────────────────────────────────────────────────────────────────────────────
// FEUILLE 3 — Légende
// ─────────────────────────────────────────────────────────────────────────────

function _construireLégende(sheet) {
  sheet.clear();
  sheet.setColumnWidth(1, 40);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 400);

  const title = sheet.getRange(1, 1, 1, 3);
  title.merge();
  title.setValue("Légende & mode d'emploi");
  title.setBackground("#0d1b2a").setFontColor("#ffffff").setFontWeight("bold").setFontSize(13);
  sheet.setRowHeight(1, 36);

  const lignes = [
    ["", "", ""],
    ["", "NIVEAUX", ""],
    ["", "Macro", "Grande brique fonctionnelle (module). ID = M1, M2..."],
    ["", "Feature", "Fonctionnalité rattachée à un Macro. ID = F1.1, F1.2..."],
    ["", "Tâche", "Tâche technique rattachée à une Feature. ID = T1, T2..."],
    ["", "", ""],
    ["", "COLONNES", ""],
    ["", "ID", "Identifiant unique de l'élément"],
    ["", "Parent ID", "ID de l'élément parent (vide pour les Macros)"],
    ["", "Estimation (j)", "Charge estimée en jours-homme"],
    ["", "Jours vendus", "Jours inclus dans le devis client"],
    ["", "Jours consommés", "Jours réellement passés (mise à jour manuelle)"],
    ["", "RAF", "Reste À Faire = Estimation - Jours consommés"],
    ["", "Dépassement", "= Jours consommés - Jours vendus (>0 = dépassement)"],
    ["", "", ""],
    ["", "COULEURS", ""],
    ["", "Fond bleu marine", "Ligne de niveau Macro"],
    ["", "Fond bleu moyen", "Ligne de niveau Feature"],
    ["", "Fond bleu clair", "Ligne de niveau Tâche"],
    ["", "Dépassement rouge", "Dépassement > 0 jours"],
    ["", "Dépassement vert", "Dans les clous (≤ 0)"],
    ["", "RAF orange", "RAF négatif (sur-consommation)"],
    ["", "", ""],
    ["", "SUIVI HEBDO", ""],
    ["", "Feuille 2", "Saisir le nombre de jours consommés par feature et par semaine"],
    ["", "Total auto", "La colonne Total est calculée automatiquement"],
    ["", "Ligne total", "La dernière ligne totalise les jours par semaine"],
  ];

  lignes.forEach((ligne, i) => {
    const row = i + 2;
    sheet.getRange(row, 1, 1, 3).setValues([ligne]);

    if (ligne[1] === "NIVEAUX" || ligne[1] === "COLONNES" || ligne[1] === "COULEURS" || ligne[1] === "SUIVI HEBDO") {
      sheet.getRange(row, 1, 1, 3).setBackground("#e8eaf6").setFontWeight("bold");
    }

    // Couleurs illustratives
    if (ligne[1] === "Macro")    sheet.getRange(row, 1).setBackground("#1a3a5c");
    if (ligne[1] === "Feature")  sheet.getRange(row, 1).setBackground("#2e6da4");
    if (ligne[1] === "Tâche")    sheet.getRange(row, 1).setBackground("#d9e8f5");
    if (ligne[1] === "Dépassement rouge") sheet.getRange(row, 1).setBackground("#f4cccc");
    if (ligne[1] === "Dépassement vert")  sheet.getRange(row, 1).setBackground("#d9ead3");
    if (ligne[1] === "RAF orange") sheet.getRange(row, 1).setBackground("#fce5cd");

    sheet.setRowHeight(row, 22);
  });
}


// ─────────────────────────────────────────────────────────────────────────────
// UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

function _columnLetter(col) {
  let letter = "";
  while (col > 0) {
    const rem = (col - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    col = Math.floor((col - 1) / 26);
  }
  return letter;
}
