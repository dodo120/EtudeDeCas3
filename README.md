
# JEFF-Bank – Automatisation des tests end-to-end avec Playwright

Ce projet met en place une stratégie d’automatisation complète pour l’application web statique JEFF‑Bank. Il inclut des tests end‑to‑end (E2E) réalisés avec Playwright, une architecture POM (Page Object Model), des tests d’accessibilité et une intégration CI/CD via GitHub Actions.

---

## Prérequis
Avant d’utiliser ce projet, installez :
- Node.js (version LTS 18+)
- npm
- Git

Aucune base de données, API ou Docker n’est nécessaire. L’application est entièrement statique.

---

## Structure du projet

```
JEFF-Bank/
├── .github/
│   └── workflows/
│       └── tests.yml            # Pipeline CI GitHub Actions
│
├── digitalbank/
│   └── app/                     # Application web statique HTML/CSS/JS
│
├── tests/
│   ├── data/                    # Données de test
│   ├── pages/                   # Page Object Models (POM)
│   ├── spec/                    # Scénarios de tests Playwright
│   └── utils/                   # Fonctions utilitaires
│
├── playwright-report/           # Rapport HTML Playwright
├── test-results/                # Screenshots, vidéos, traces
│
├── playwright.config.ts         # Configuration Playwright
├── package.json                 # Dépendances Node.js
├── .gitignore
└── README.md
```

---

## Installation du projet

### 1. Cloner le dépôt
```bash
git clone https://github.com/dodo120/EtudeDeCas3.git
cd EtudeDeCas3
```

### 2. Installer les dépendances
S'assure que toutes les dépendances sont installées conformément au `package-lock.json`. 
```bash
npm ci
```

### 3. Installer les navigateurs Playwright
```bash
npx playwright install --with-deps
```

---

## Lancer l'application
L'application étant statique, elle peut être lancée via un serveur local :

```bash
npx http-server ./digitalbank/app
```

Ou via l'interface Playwright :
```bash
npx playwright test --ui
```

---

## Lancer les tests Playwright

### Suite complète
```bash
npx playwright test
```

### Test spécifique
```bash
npx playwright test tests/spec/auth.spec.ts
```

### Mode interface
```bash
npx playwright test --ui
```

---

## Rapports de tests
Les rapports Playwright sont générés automatiquement après l’exécution des tests. Ils incluent des captures d’écran, des vidéos et des traces pour faciliter le débogage. 
```
/playwright-report/
```
Pour les ouvrir :
```bash
npx playwright show-report
```

---

## Stratégie d’automatisation
L’application étant front‑only, seuls les tests E2E et les tests d’accessibilité sont pertinents.

### Tests automatisés
- Tests E2E Playwright
- Tests d’accessibilité (axe-core)
- Smoke tests

### Non applicable
- Tests API
- Tests backend
- Tests unitaires (logique non modulaire)

---

## Scénarios E2E automatisés
- Authentification (valide, invalide)
- Double authentification
- Réinitialisation du mot de passe
- Consultation comptes et transactions
- Virements internes et externes
- Gestion des erreurs
- Ajout bénéficiaire
- Paiement de factures
- Paramètres de sécurité
- Changement de mot de passe

---

## Architecture Playwright (POM)
Chaque page utilise une classe avec :
- Sélecteurs (via data-testid)
- Actions utilisateur
- Méthodes de vérification

---

## Fixtures et données
- Initialisation du navigateur
- Chargement de l'application
- Réinitialisation automatique des données via le rechargement de la page

Aucune base externe : pas de seed, migrations, mocks ou Docker nécessaires.

---

## CI/CD GitHub Actions
Pipeline exécutée à chaque push ou pull request pour assurer la qualité du code. 
Étapes :
1. Checkout du code
2. Installation Node.js
3. Installation dépendances
4. Installation navigateurs Playwright
5. Exécution smoke tests
6. Exécution tests complets
7. Génération du rapport HTML

---

## Planification Agile
| Sprint | Contenu |
|--------|----------|
| 0 | Setup Playwright + architecture + pipeline CI |
| 1 | Authentification, 2FA, dashboard |
| 2 | Virements + gestion erreurs |
| 3 | Factures |
| 4 | Paramètres sécurité + changement mot de passe |
| 5 | Accessibilité + smoke suite complète |

---

## Dépôt GitHub
https://github.com/dodo120/EtudeDeCas3

