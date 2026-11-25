#!/usr/bin/env python3
"""Aplica (sin reemplazar archivos completos) los logos por idioma y los textos de Salud Renal.
Ejecutar desde la raíz del proyecto:  python3 aplicar-logos-y-textos.py"""
import re, sys, pathlib

root = pathlib.Path(".")
ok, warn = [], []

def edit(path, fn):
    p = root / path
    if not p.exists():
        warn.append(f"No existe {path}"); return
    s = p.read_text(encoding="utf-8"); n = fn(s)
    if n is None: warn.append(f"No encontré el texto a cambiar en {path}"); return
    if n != s: p.write_text(n, encoding="utf-8"); ok.append(f"Actualizado {path}")
    else: ok.append(f"Ya estaba aplicado {path}")

def add_import(s):
    line = 'import { logos } from "@/content/logos";'
    if line in s: return s
    return s.replace('import Image from "next/image";', 'import Image from "next/image";\n' + line, 1)

def logo_tag(expr):
    def fn(s):
        if "momentum-salud-renal.png" not in s and f"{expr}.src" not in s:
            return None
        def tag(m):
            t = m.group(0)
            t = re.sub(r'src="[^"]*"', f'src={{{expr}.src}}', t)
            t = re.sub(r'alt=(\{[^}]*\}|"[^"]*")', f'alt={{{expr}.alt}}', t)
            t = re.sub(r'width=\{\d+\}', f'width={{{expr}.width}}', t)
            t = re.sub(r'height=\{\d+\}', f'height={{{expr}.height}}', t)
            return t
        n = re.sub(r'<Image[^<]*?momentum-salud-renal\.png.*?/>', tag, s, flags=re.S)
        return add_import(n)
    return fn

edit("components/layout/Header.tsx", logo_tag("logos[locale]"))
edit("components/layout/Footer.tsx", logo_tag("logos[locale]"))
edit("components/sections/EncuentraSede.tsx", logo_tag("(logos[locale as keyof typeof logos] ?? logos.es)"))

texts = {
    "es": ("MoMentum Salud Renal", "© Copyright MoMentum Salud Renal. Todos los derechos reservados."),
    "en": ("MoMentum Renal Care", "© Copyright MoMentum Renal Care. All Rights Reserved."),
    "pt": ("MoMentum Saúde Renal", "© Copyright MoMentum Saúde Renal. Todos os direitos reservados."),
}
for lang, (h, c) in texts.items():
    def fn(s, h=h, c=c):
        n = re.sub(r'titleHighlight: "[^"]*"', f'titleHighlight: "{h}"', s, count=1)
        n = re.sub(r'copyright: "[^"]*"', f'copyright: "{c}"', n, count=1)
        return n if "titleHighlight" in s and "copyright" in s else None
    edit(f"i18n/dictionaries/{lang}.ts", fn)

print("\n".join(ok))
if warn: print("\nAVISOS:\n" + "\n".join(warn)); sys.exit(1)
