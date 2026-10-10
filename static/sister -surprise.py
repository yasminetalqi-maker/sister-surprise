"""
app.py - serveur Flask dyal site surprise 🎀

Fikra: l jawabat s7a7 w lettre kayb9aw f SERVEUR (mashi f JavaScript),
bach ma ytl3ouch f "Voir le code source" dyal navigateur.
Progression (3dd dyal l9lob) kat7ssab f "session" mchaffra (cookie).
"""
import os
import random
import re
import unicodedata

from flask import Flask, jsonify, render_template, request, session

import config

app = Flask(__name__)
app.config.update(
    # Cle secrete: mn variable d'environnement ila kayna (online), sinon dev key
    SECRET_KEY=os.environ.get("SECRET_KEY") or config.DEV_SECRET_KEY,
    SESSION_COOKIE_HTTPONLY=True,       # JavaScript ma ymkenlouch ycht cookie
    SESSION_COOKIE_SAMESITE="Lax",      # 7imaya mn les requetes 3ajiba
    SESSION_COOKIE_SECURE=os.environ.get("SESSION_COOKIE_SECURE") == "1",
    MAX_CONTENT_LENGTH=4 * 1024,        # 4 KB max, kfaya 3la had site
)

TOTAL_QUESTIONS = 5
MAX_NAME_LENGTH = 30


# ----------------------------------------------------------------------
# Fonctions sghar (utilitaires)
# ----------------------------------------------------------------------
def clean_name(raw):
    """N9iw smiya: ghir texte, bla caracteres ghrib, max 30 7rouf."""
    if not isinstance(raw, str):
        return ""
    raw = "".join(ch for ch in raw if ch.isprintable())
    return re.sub(r"\s+", " ", raw).strip()[:MAX_NAME_LENGTH]


def normalize(text):
    """7ayd accents, l7rouf kbar w ay 7aja machi 7arf/rqam: 'Yasmíne ' -> 'yasmine'."""
    text = unicodedata.normalize("NFKD", str(text))
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    return re.sub(r"[^a-z0-9]", "", text.lower())


def to_int(value):
    """Y7awl value l int (ghir 3dad s7i7), sinon None."""
    if isinstance(value, bool):
        return None
    if isinstance(value, int):
        return value
    if isinstance(value, str) and value.strip().isdigit():
        return int(value.strip())
    return None


def hearts():
    return int(session.get("hearts", 0))


def fill(template, **values):
    """Bdel {value} f message. ({name} kaybqa l JavaScript, katb9a textContent)."""
    for key, val in values.items():
        template = template.replace("{" + key + "}", str(val))
    return template


@app.after_request
def security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' https://fonts.googleapis.com; "
        "font-src https://fonts.gstatic.com; "
        "img-src 'self' data:; "
        "object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
    )
    if request.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store"
    return response


# ----------------------------------------------------------------------
# Pages
# ----------------------------------------------------------------------
@app.get("/")
def index():
    return render_template("index.html")


# ----------------------------------------------------------------------
# API (JavaScript kay3iyt 3liha)
# ----------------------------------------------------------------------
@app.get("/api/state")
def state():
    """Bach ila 3awdat 7ellat l page, tkml mn win wqfat."""
    return jsonify(name=session.get("name", ""), hearts=hearts())


@app.post("/api/start")
def start():
    data = request.get_json(silent=True) or {}
    name = clean_name(data.get("name"))
    if not name:
        return jsonify(error="empty_name"), 400
    session["name"] = name
    return jsonify(name=name, hearts=hearts())


@app.post("/api/answer/<int:q>")
def answer(q):
    current = hearts()
    # Khass l soual ykoun howa li moraha l9lob li rb7at (bla tricher / double-clic)
    if q != current + 1 or q > TOTAL_QUESTIONS:
        return jsonify(error="out_of_order", hearts=current), 409

    data = request.get_json(silent=True) or {}
    value = data.get("answer")
    msgs = config.MESSAGES
    extra = {}

    if q == 1:  # Smitk: ay smiya machi khawya
        name = clean_name(value)
        if not name:
            return jsonify(error="invalid"), 400
        session["name"] = name
        correct, message = True, msgs["q1_ok"]

    elif q == 2:  # Smit khtk
        name = clean_name(value)
        if not name:
            return jsonify(error="invalid"), 400
        accepted = {normalize(n) for n in config.CREATOR_NAME_ALIASES}
        accepted.add(normalize(config.CREATOR_NAME))
        correct = normalize(name) in accepted
        message = msgs["q2_ok"] if correct else random.choice(msgs["q2_wrong"])

    elif q == 3:  # Ch7al katbghi khtk (0..100): ay rqam s7i7 kaykhser l9lb
        number = to_int(value)
        if number is None or not 0 <= number <= 100:
            return jsonify(error="invalid"), 400
        correct = True
        extra["perfect"] = number == 100
        message = fill(msgs["q3_perfect"] if number == 100 else msgs["q3_other"],
                       value=number)

    elif q == 4:  # 3id milad
        if not isinstance(value, dict):
            return jsonify(error="invalid"), 400
        day, month = to_int(value.get("day")), to_int(value.get("month"))
        if day is None or month is None or not (1 <= day <= 31 and 1 <= month <= 12):
            return jsonify(error="invalid"), 400
        correct = (day, month) == (config.BIRTHDAY_DAY, config.BIRTHDAY_MONTH)
        message = msgs["q4_ok"] if correct else random.choice(msgs["q4_wrong"])

    else:  # q == 5: ay choix s7i7
        if not isinstance(value, str) or value not in msgs["q5"]:
            return jsonify(error="invalid"), 400
        correct, message = True, msgs["q5"][value]

    if not correct:
        return jsonify(correct=False, message=message, hearts=current)

    session["hearts"] = current + 1
    return jsonify(correct=True, message=message, hearts=current + 1,
                   done=current + 1 == TOTAL_QUESTIONS, **extra)


@app.post("/api/letter")
def letter():
    """Lettre kat3tak ghir mnin tkoun jm3ti 5 l9lob (verifie f serveur)."""
    if hearts() < TOTAL_QUESTIONS:
        return jsonify(error="locked"), 403
    return jsonify(sentences=config.LETTER_SENTENCES)


@app.post("/api/reset")
def reset():
    session.clear()
    return jsonify(ok=True)


if __name__ == "__main__":
    # debug=True ghir 3la compute dyalk. Online kanst3mlo PythonAnywhere/gunicorn.
    app.run(host="127.0.0.1", port=5000, debug=True)
