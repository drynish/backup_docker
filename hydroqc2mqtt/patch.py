"""
Patch contract_dpc.py pour corriger l'issue #65 :
les champs DPC sont absents pour le tarif Flex D la première année.
https://gitlab.com/hydroqc/hydroqc/-/work_items/65
"""
import re

PATH = "/app/lib/python3.13/site-packages/hydroqc/contract/contract_dpc.py"

with open(PATH, "r") as f:
    src = f.read()

# Patch 1 : _get_dpc_field retourne None au lieu de lever une exception
src = src.replace(
    'raise KeyError(f"Field {field_name} not found in DPC data")',
    "return None",
)

# Patch 2 : last_update_date — str(None) crasherait fromisoformat
src = src.replace(
    '        date_str = str(self._get_dpc_field("dateMaj"))\n'
    '        # Handle ISO format with timezone\n'
    '        if "T" in date_str:\n'
    '            return date.fromisoformat(date_str.split("T", maxsplit=1)[0])\n'
    '        return date.fromisoformat(date_str)',
    '        raw = self._get_dpc_field("dateMaj")\n'
    '        if raw is None:\n'
    '            return None\n'
    '        date_str = str(raw)\n'
    '        # Handle ISO format with timezone\n'
    '        if "T" in date_str:\n'
    '            return date.fromisoformat(date_str.split("T", maxsplit=1)[0])\n'
    '        return date.fromisoformat(date_str)',
)

# Patch 3 : winter_total_days_last_update — accès direct winter["dateMaj"]
src = src.replace(
    '        update = datetime.fromisoformat(winter["dateMaj"].replace("Z", "+00:00"))\n'
    '        return (update - start).days',
    '        date_maj = winter.get("dateMaj")\n'
    '        if date_maj is None:\n'
    '            return None\n'
    '        update = datetime.fromisoformat(date_maj.replace("Z", "+00:00"))\n'
    '        return (update - start).days',
)

# Patch 4 : float() et int() sur résultat potentiellement None
src = re.sub(
    r'return float\(self\._get_dpc_field\((".*?")\)\)',
    r'_v = self._get_dpc_field(\1); return float(_v) if _v is not None else None',
    src,
)
src = re.sub(
    r'return int\(self\._get_dpc_field\((".*?")\)\)',
    r'_v = self._get_dpc_field(\1); return int(_v) if _v is not None else None',
    src,
)

with open(PATH, "w") as f:
    f.write(src)

print("Patch appliqué avec succès.")
