import re
import json5

def parse_default_exported_array(filepath):
    """
    Estrae il primo array esportato con 'export default' da un file JS.
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"const\s+\w+\s*=\s*(\[[\s\S]+?\]);\s*export\s+default\s+\w+", content)
    if not match:
        raise ValueError("Impossibile trovare un array esportato con 'export default'.")

    raw_array = match.group(1)

    try:
        return json5.loads(raw_array)
    except Exception as e:
        raise SyntaxError(f"Errore nel parsing del file: {e}")


def write_paths_to_js(data, filepath):

    formatted = json5.dumps(data, indent=2, ensure_ascii=False)
    output = f"const paths = {formatted};\n\nexport default paths;\n"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(output)

