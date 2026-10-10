# =====================================================================
#  config.py  -  HNA GHADI TBDLI L M3LOMAT DYALK 🎀
#  (Ghir had l fichier kayt3dl. Ma-tm9ssi chi 7aja khra ila ma 3rftich.)
# =====================================================================

# ---------------------------------------------------------------------
# 1) SMIYA DYAL SAHIBAT L SITE (li khassha tjawb f Soual 2)
# ---------------------------------------------------------------------
# ⚠️ A VERIFIER: katbt "Yasmine" 7it nti goulti liya "ana yasmine".
# Ila kanti bghiti smiya khra, bdliha hna.
CREATOR_NAME = "Yasmine"

# Kolli tari9a mn ktaba li ghadi n9blo (kayt9bl 7ta ila kant b 7rouf kbar
# wla sghar, wla b accents). Zidi hna ayy tari9a kat3tbri s7i7a.
CREATOR_NAME_ALIASES = ["Yasmine", "Yasmin", "Yasmina", "Yasmeen", "Yasmine"]

# ---------------------------------------------------------------------
# 2) 3ID MILAD DYAL SAHIBAT L SITE (Soual 4)
# ---------------------------------------------------------------------
# ⚠️⚠️ VALEUR PROVISOIRE - HADI MASHI 3ID MILAD S7I7!  ⚠️⚠️
# Mazal ma 3rftich 3id miladk. 7ot nhar w chhar s7a7 dyalk b3da.
# (L3am ma-kayt9arnch, ghir nhar w chhar.)
BIRTHDAY_DAY = 1      # <- nhar (1 -> 31)      PROVISOIRE
BIRTHDAY_MONTH = 1    # <- chhar (1 -> 12)     PROVISOIRE

# ---------------------------------------------------------------------
# 3) LETTRE (cadeau final) - kayn texte dyal Yasmine kif ktebtou
# ---------------------------------------------------------------------
# Texte kaml ma tm9ssouch, ma tb9ach tsa77o l orthographe.
# Ghir t9tti3o 3la 7sab "joumal" bach kat3rd jomla jomla.
# Ila bghiti tbdlo l lettre, bdlo ghir l ktaba dakhl "..." (w bqaw l virgules).
LETTER_SENTENCES = [
    "slm fatima zahrae lkbida awalan mbrouk elik wsalti hta lhad lmarhala f site li prigramito ela qblk hhhh",
    "ki jatk lkhdma dyali .bax ma yhsablkx rani ma kanqrax mezyan .",
    "lmohim lcadeux dyalk howa had lhadra hit hiya li eandi db hhhh",
    "wma nqdrx maea lassaf nsiftlk bossat kbaaar f programme",
    "donc lhaja li nqdr ndir hiya nqolk i love you sooooo mitx",
    "wkanbghik bzaf ya ahsan okht flealam ya omri inti ya rohi .",
    "kanbghik",
]

# ---------------------------------------------------------------------
# 4) MESSAGES (rad3 f darija). {name} = smiya dyal khtk, {value} = rqam.
# ---------------------------------------------------------------------
MESSAGES = {
    # Soual 1 (ay smiya mktoba katkhrj s7i7a)
    "q1_ok": "Aaaaaah {name}! Jiti nwerrti lina had site! 😂💗🐱",

    # Soual 2
    "q2_ok": "Hhhhh wakha! Bayna 3arfaha mzyan! 😂💕",
    "q2_wrong": [
        "Hmmm 🤔 9rib... walakin mashi hiya! 3awdi jerrbi a {name} 💗",
        "Hhhhh la la, hadi ma-khtkch! Fakkri mzyan, hiya katbghik bzaf 🐱💕",
        "Wach mazal ma fa9ti mn n3as? 😂💗 3awdi jerrbi a lkbida 🎀",
    ],

    # Soual 3
    "q3_perfect": "WAAAAAAAA 100/100?! 😭💗💗💗 Ghadi n3ayto l pompiers, rah site ghadi ynfajer b l7ob!! 😂🚒💕",
    "q3_other": "{value}/100? Hhhhh wakha, ghadi nqbel had l7ob! 😂💕 Ana khtk katbghik 3la 9dd lblad kamla 💗",

    # Soual 4
    "q4_ok": "Aaaaaah 3arfa 3id miladha! 🎂💕 Hadi khtk 3ziza 3lik bssa7! 😂💗",
    "q4_wrong": [
        "Hhhhh la la, hadchi mashi 3id miladha! 🎂😂 3awdi jerrbi a lkbida 💕",
        "Mmmm 9rib 9rib... walakin mashi hadchi 😂💗 Fakkri chwiya!",
        "Wach nssiti 3id milad khtk?! 🥹😂 Hhhhh jerrbi mra khra a lkbida 🎀",
    ],

    # Soual 5 (kol choix 3ndo reaction dyalo)
    "q5": {
        "a": "Hhhhh rah ma 3endkch fikra ch7al kanbghik! 😭💗",
        "b": "Awwwww bzaf bzaf! Wa ana kter mnk! 🥹💕",
        "c": "Yeeeey! Bzzzzzzaf mn bzaf w mashi 3adi! 😭❤️ Hadchi hiya!",
        "d": "Awwwwwww 😭💕 Bssa7 ma kaynach 9yass, 7it ana tani kanbghik b la 7dod! 🐱💗",
    },
}

# ---------------------------------------------------------------------
# 5) CLE SECRETE DYAL FLASK (kat7mi session / progression dyal khtk)
# ---------------------------------------------------------------------
# Hadi ghir l testing 3la compute dyalk. Mnin tnachrih online, 7otti
# SECRET_KEY b chi ktaba tawila 3chwaya2iya (chof README) w ma-t7otich hadi.
DEV_SECRET_KEY = "dev-only-bdlha-mnin-tnachri-site-online"
