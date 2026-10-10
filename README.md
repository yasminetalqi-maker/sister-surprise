# 🎀 Site surprise l Fatima Zahra 💗

## 1. Chno kayn f l projet

```
sister-surprise/
├── app.py              <- serveur Flask (kay-verifi l jawabat w kayhmi lettre)
├── config.py           <- HNA kat-bdli smiya, 3id milad, lettre, messages
├── requirements.txt    <- l9a3ima dyal packages (Flask ghir)
├── templates/
│   └── index.html      <- structure dyal page
└── static/
    ├── css/style.css   <- design kawaii
    ├── js/script.js    <- animations w interactions
    └── images/         <- khawi (kolchi mrsoum b CSS/SVG, ma-3ndna 7ta tswira fragile)
```

Structure hiya li tlbti, ghir zdt `README.md`. L9tat, l9lob w l cadeau kolhom mrsoumin b SVG/CSS/emoji, bach ma ykoun 7ta lien dyal tswira y-tkser.

## 2. ⚠️ Chno khassk tbdli f `config.py` (DIRECT)

| Fin | Chno | Hala |
|---|---|---|
| `CREATOR_NAME` | smitk (Yasmine) | A VERIFIER |
| `CREATOR_NAME_ALIASES` | tari9at ktaba li n9blo | zidi li bghiti |
| `BIRTHDAY_DAY` / `BIRTHDAY_MONTH` | nhar w chhar dyal 3id miladk | ⚠️ **PROVISOIRE (1/1)**, bdliha! |
| `LETTER_SENTENCES` | lettre | kamla b ktaba dyalk, ma tbdlat 7ta 7arf |
| `MESSAGES` | reactions | bdli li bghiti |

Mnin tbdli: sjjli (Ctrl+S) w 3awdi tlanci serveur (Ctrl+C f terminal, men ba3d `python app.py`).

## 3. Visual Studio Code (Windows)

1. Telchargi Python mn https://www.python.org/downloads/ . **Mouhim:** mnin tfta7 l installer, 7ti ✅ `Add python.exe to PATH`.
2. Telchargi VS Code mn https://code.visualstudio.com/ w t7tha.
3. `File > Open Folder...` w khtari dossier `sister-surprise`.
4. Menu `Terminal > New Terminal`. Kteb:

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Ila Windows gal liki "running scripts is disabled": kteb `Set-ExecutionPolicy -Scope Process Bypass` w 3awdi `venv\Scripts\activate`.

5. Hll navigateur w kteb: **http://127.0.0.1:5000**
6. L'arret: `Ctrl + C` f terminal.

## 4. Checklist dyal test

- [ ] Ecran lwl: dkhli smiya khawya → kayban message "Ktbi smitk 9bel a lkbida".
- [ ] Dkhli smiya → kat-banlk "[smiya] jat!".
- [ ] **Q1** bouton "Hadi ana!" → chat + l9lb lwl.
- [ ] **Q2** jrrbi smiya ghalta (ma-kay-ban la jawab s7i7) → message dhok; jrrbi smitk s7i7a → l9lb tani.
- [ ] **Q3** 100 → pluie dyal qlob, confettis, message dyal pompiers. Mn ba3d "Bda mn lwl" 3awdi b 87 → message 7nin.
- [ ] **Q4** jrrbi nhar ghalat, mn ba3d s7i7 (kayn f config).
- [ ] **Q5** kol bouton kay3ti reaction mokhtalfa.
- [ ] Ma-kaynch 3add ktar mn 5 qlob (clic sari3 3la bouton: kayt7sb mra wa7da).
- [ ] Ecran "BRAVOOOO" → "7elli l cadeau" → cadeau kayt7ll → lettre.
- [ ] Lettre: jomla jomla, "Kemmli l9raya", "Rje3", l jomal kaybqaw. F lkhr: "I LOVE YOU SOOOOO MUCH...".
- [ ] F west quiz, dwzi F5 (rafraichir) → kaykmmel mn win wqfti (smiya w l9lob kaybqaw).
- [ ] Telephone (f DevTools: F12 > icône mobile) → kolchi mzyan.
- [ ] Activer "Reduce motion" f Windows → animations kaybqaw sghar.
- [ ] "Bda mn lwl 🔄" kay3awd kolchi mn lwl.

## 5. Erreurs probables

| Mochkil | 7ll |
|---|---|
| `python n'est pas reconnu` | 3awdi installi Python w 7ti ✅ Add to PATH, sdd w 7ll VS Code mn jdid |
| `No module named flask` | Ma-activitich venv (`venv\Scripts\activate`) wla ma-drtich `pip install -r requirements.txt` |
| `Address already in use` | Serveur khdam deja f terminal akhor. Sdd-o b Ctrl+C |
| Page blanche / ma-kaykhdmch bouton | F12 > Console. Tkd lkl l fichiers f blasthom (static/js/script.js...) |
| Fonts ma-kaybanouch | Pas grave: kay-khdm b fonts dyal system. Kayban ghir b internet |
| Mn ba3d l'ajout dyal 3id milad mazal ma-ykhdmch | Tkd mn `BIRTHDAY_DAY` w `BIRTHDAY_MONTH` (3dad bla guillemets) w 3awdi Ctrl+C / `python app.py` |

## 6. Nchr l site (lien l khtk) — PythonAnywhere (gratuit f had l wa9t)

> ⚠️ Chof l conditions dyal gratuit mn jdid 9bel (mchaw ibddlou): https://help.pythonanywhere.com/pages/FreeAccountsFeatures/
> Mn l mo3ayana (Oct 2026): compte gratuit = 1 web app f `smitk.pythonanywhere.com`, w web app li ma-tst3mlch **kay-ntahi mn ba3d chhar** → khassk t-jaddidiha mn Dashboard. Ma-n9dr n-wa3dk b gratuit dima.

1. **Hiyyi l projet:** f dossier `sister-surprise` mchi ta3mel zip (clic droit > Envoyer vers > Dossier compressé). Ma-t7ttich dossier `venv` f zip.
2. **Compte:** https://www.pythonanywhere.com → `Pricing & signup` → **Create a Beginner account** (bla carte bancaire). Khtari username (hwa li ghadi ydkhl f lien).
3. **Fichiers:** `Files` → `Upload a file` → upload zip → `Consoles > Bash` w kteb:
   ```bash
   unzip sister-surprise.zip
   ```
4. **Dependances:** f nafs Bash:
   ```bash
   cd ~/sister-surprise
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
5. **Web app:** tab `Web` → `Add a new web app` → `Manual configuration` → khtari Python 3.12 (wla l'akhir li kayn, li kayn f venv).
   - **Virtualenv:** `/home/USERNAME/sister-surprise/venv`
   - **Source code / Working directory:** `/home/USERNAME/sister-surprise`
   - Clic 3la lien dyal `WSGI configuration file`, mse7i kolchi w 7tti:
     ```python
     import sys
     path = "/home/USERNAME/sister-surprise"
     if path not in sys.path:
         sys.path.insert(0, path)
     from app import app as application
     ```
   - `Environment variables` (f tab Web, aw f WSGI): zidi `SECRET_KEY` b chi ktaba tawila 3chwaya2iya (30+ 7rouf) w `SESSION_COOKIE_SECURE` = `1`. Bdli `USERNAME` b smitk f PythonAnywhere.
   - **Static files:** URL `/static/` → Directory `/home/USERNAME/sister-surprise/static`
6. **Lancement:** clic 3la `Reload`.
7. **Lien:** `https://USERNAME.pythonanywhere.com` (hada howa li t3tiyih l khtk).
8. **Test f telephone:** fta7 lien f navigateur dyal telephone (4G wla wifi), dkhli b smiya, w dir ga3 les etapes.

N9ta mohima: ma-t3tich l lien l khtk 7ta tjrrbih nta f telephone dyalk w tkd bli khdam (morra Reload).
