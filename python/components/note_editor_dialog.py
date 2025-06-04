import os

from PyQt5.QtWidgets import QDialog, QFormLayout, QLineEdit, QWidget, QTextEdit, QPushButton, QSpinBox, QCheckBox, QDialogButtonBox, QFileDialog


class NodeEditorDialog(QDialog):
    """
    Dialog per modificare tutti i campi di un nodo (eccetto "options").
    Ora incorpora un pulsante “Sfoglia…” per scegliere l’immagine dentro public/img/.
    """

    def __init__(self, node_data):
        super().__init__()
        self.setWindowTitle("Modifica Nodo")
        self.data = node_data

        layout = QFormLayout()

        # ID
        self.id_field = QLineEdit(self.data.get("id", ""))
        layout.addRow("ID:", self.id_field)

        # Floor
        self.floor_field = QLineEdit(self.data.get("floor", ""))
        layout.addRow("Piano:", self.floor_field)

        # Title
        self.title_field = QLineEdit(self.data.get("title", ""))
        layout.addRow("Titolo:", self.title_field)

        # Description
        self.description_field = QTextEdit(self.data.get("description", ""))
        layout.addRow("Descrizione:", self.description_field)

        # Image: QLineEdit + pulsante Sfoglia
        hbox_image = QWidget()
        from PyQt5.QtWidgets import QHBoxLayout
        h_layout = QHBoxLayout()
        h_layout.setContentsMargins(0, 0, 0, 0)
        self.image_field = QLineEdit(self.data.get("image", ""))
        self.image_field.setReadOnly(True)
        btn_browse = QPushButton("Sfoglia…")
        btn_browse.clicked.connect(self.browse_image)
        h_layout.addWidget(self.image_field)
        h_layout.addWidget(btn_browse)
        hbox_image.setLayout(h_layout)
        layout.addRow("Image (es. /img/file.jpg):", hbox_image)

        # deathChance
        self.death_field = QSpinBox()
        self.death_field.setRange(0, 100)
        self.death_field.setValue(self.data.get("deathChance", 0))
        layout.addRow("Death Chance (%):", self.death_field)

        # isBattle
        self.battle_checkbox = QCheckBox()
        self.battle_checkbox.setChecked(self.data.get("isBattle", False))
        layout.addRow("Is Battle:", self.battle_checkbox)

        # enemyId
        self.enemy_field = QLineEdit(self.data.get("enemyId", ""))
        layout.addRow("Enemy ID:", self.enemy_field)

        # exp
        self.exp_field = QSpinBox()
        self.exp_field.setRange(0, 10000)
        self.exp_field.setValue(self.data.get("exp", 0))
        layout.addRow("EXP:", self.exp_field)

        # drops (editor JSON testuale)
        self.drops_field = QTextEdit()
        if "drops" in self.data:
            import json
            self.drops_field.setPlainText(json.dumps(self.data.get("drops", []), ensure_ascii=False, indent=2))
        else:
            self.data["drops"] = []
            self.drops_field.setPlainText("[]")
        layout.addRow("Drops (JSON):", self.drops_field)

        # Pulsanti OK/Cancel
        buttons = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        buttons.accepted.connect(self.accept)
        buttons.rejected.connect(self.reject)
        layout.addWidget(buttons)

        self.setLayout(layout)

    def browse_image(self):
        """
        Apre un QFileDialog nella cartella public/img/, lascia selezionare solo immagini.
        Alla selezione, salva '/img/...' in self.image_field.
        """
        cwd = os.getcwd()
        img_dir = os.path.join(cwd, "public", "img")
        if not os.path.isdir(img_dir):
            img_dir = cwd

        fname, _ = QFileDialog.getOpenFileName(
            self,
            "Seleziona immagine nodo",
            img_dir,
            "Images (*.png *.jpg *.jpeg *.bmp *.gif)"
        )
        if fname:
            norm = os.path.normpath(fname)
            parts = norm.split(os.sep)
            try:
                idx = parts.index("public")
                rel = parts[idx + 1 :]
                rel_path = "/" + os.path.join(*rel).replace("\\", "/")
                self.image_field.setText(rel_path)
            except ValueError:
                self.image_field.setText(fname)

    def accept(self):
        """
        Salva i valori modificati nel dict self.data e chiude.
        """
        import json

        self.data["id"] = self.id_field.text().strip()
        self.data["floor"] = self.floor_field.text().strip()
        self.data["title"] = self.title_field.text().strip()
        self.data["description"] = self.description_field.toPlainText().strip()
        self.data["image"] = self.image_field.text().strip()
        self.data["deathChance"] = self.death_field.value()
        self.data["isBattle"] = self.battle_checkbox.isChecked()
        self.data["enemyId"] = self.enemy_field.text().strip()
        self.data["exp"] = self.exp_field.value()

        try:
            drops_list = json.loads(self.drops_field.toPlainText())
            if isinstance(drops_list, list):
                self.data["drops"] = drops_list
            else:
                raise ValueError("Drops non è una lista valida")
        except Exception as e:
            print(f"Warning: drops JSON invalido, mantengo valori originali. Errore: {e}")

        super().accept()