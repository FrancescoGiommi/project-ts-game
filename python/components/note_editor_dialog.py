import os
import json
from PyQt5.QtWidgets import (
    QDialog, QFormLayout, QLineEdit, QWidget, QTextEdit, QPushButton,
    QSpinBox, QCheckBox, QDialogButtonBox, QFileDialog, QGroupBox,
    QVBoxLayout, QHBoxLayout, QLabel
)


class NodeEditorDialog(QDialog):
    def __init__(self, node_data):
        super().__init__()
        self.setWindowTitle("Modifica Nodo")
        self.data = node_data

        layout = QFormLayout()

        # --- Campi base del nodo ---
        self.id_field = QLineEdit(self.data.get("id", ""))
        layout.addRow("ID:", self.id_field)

        self.floor_field = QLineEdit(self.data.get("floor", ""))
        layout.addRow("Piano:", self.floor_field)

        self.title_field = QLineEdit(self.data.get("title", ""))
        layout.addRow("Titolo:", self.title_field)

        self.description_field = QTextEdit(self.data.get("description", ""))
        layout.addRow("Descrizione:", self.description_field)

        hbox_image = QWidget()
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

        self.death_field = QSpinBox()
        self.death_field.setRange(0, 100)
        self.death_field.setValue(self.data.get("deathChance", 0))
        layout.addRow("Death Chance (%):", self.death_field)

        self.battle_checkbox = QCheckBox()
        self.battle_checkbox.setChecked(self.data.get("isBattle", False))
        layout.addRow("Is Battle:", self.battle_checkbox)

        self.enemy_field = QLineEdit(self.data.get("enemyId", ""))
        layout.addRow("Enemy ID:", self.enemy_field)

        self.exp_field = QSpinBox()
        self.exp_field.setRange(0, 10000)
        self.exp_field.setValue(self.data.get("exp", 0))
        layout.addRow("EXP:", self.exp_field)

        self.drops_field = QTextEdit()
        if "drops" in self.data:
            self.drops_field.setPlainText(json.dumps(self.data.get("drops", []), ensure_ascii=False, indent=2))
        else:
            self.data["drops"] = []
            self.drops_field.setPlainText("[]")
        layout.addRow("Drops (JSON):", self.drops_field)

        # --- Sezione collegamenti (options) ---
        options_group = QGroupBox("Collegamenti (options)")
        options_layout = QVBoxLayout()
        self.option_widgets = []

        for opt in self.data.get("options", []):
            row = QWidget()
            row_layout = QHBoxLayout()

            id_field = QLineEdit(opt.get("id", ""))
            id_field.setReadOnly(True)
            row_layout.addWidget(QLabel("ID:"))
            row_layout.addWidget(id_field)

            desc_field = QLineEdit(opt.get("description", ""))
            row_layout.addWidget(QLabel("Descrizione:"))
            row_layout.addWidget(desc_field)

            img_field = QLineEdit(opt.get("image", ""))
            browse_btn = QPushButton("Sfoglia…")

            def make_browse_fn(target_field):
                def handler():
                    fname, _ = QFileDialog.getOpenFileName(
                        self, "Scegli immagine", os.path.join(os.getcwd(), "public", "img"),
                        "Images (*.png *.jpg *.jpeg *.bmp *.gif)"
                    )
                    if fname:
                        norm = os.path.normpath(fname)
                        parts = norm.split(os.sep)
                        try:
                            idx = parts.index("public")
                            rel = parts[idx + 1:]
                            rel_path = "/" + os.path.join(*rel).replace("\\", "/")
                            target_field.setText(rel_path)
                        except ValueError:
                            target_field.setText(fname)
                return handler

            browse_btn.clicked.connect(make_browse_fn(img_field))

            row_layout.addWidget(QLabel("Immagine:"))
            row_layout.addWidget(img_field)
            row_layout.addWidget(browse_btn)

            row.setLayout(row_layout)
            options_layout.addWidget(row)
            self.option_widgets.append((opt, desc_field, img_field))

        options_group.setLayout(options_layout)
        layout.addRow(options_group)

        # Pulsanti OK/Cancel
        buttons = QDialogButtonBox(QDialogButtonBox.Ok | QDialogButtonBox.Cancel)
        buttons.accepted.connect(self.accept)
        buttons.rejected.connect(self.reject)
        layout.addWidget(buttons)

        self.setLayout(layout)

    def browse_image(self):
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
                rel = parts[idx + 1:]
                rel_path = "/" + os.path.join(*rel).replace("\\", "/")
                self.image_field.setText(rel_path)
            except ValueError:
                self.image_field.setText(fname)

    def accept(self):
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
        except Exception as e:
            print(f"Warning: drops JSON invalido, mantengo valori originali. Errore: {e}")

        # Salvataggio modifiche collegamenti
        for opt, desc_field, img_field in self.option_widgets:
            opt["description"] = desc_field.text().strip()
            opt["image"] = img_field.text().strip()

        super().accept()