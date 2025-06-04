# data_editor.py

import os
import re
import json5
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QIntValidator, QDoubleValidator, QPixmap
from PyQt5.QtWidgets import (
	QWidget, QHBoxLayout, QVBoxLayout, QListWidget, QListWidgetItem,
	QPushButton, QFormLayout, QLineEdit, QTextEdit, QSpinBox, QDoubleSpinBox,
	QComboBox, QFileDialog, QMessageBox, QLabel
)

from python.components.parser import parse_default_exported_array, write_js_array


class DataEditor(QWidget):
	"""
	Widget che consente di modificare / aggiungere voci per weapons.js e enemies.js.
	Ho aggiunto un QLabel per il preview dell’immagine in entrambi i form.
	"""

	def __init__(self, weapons_path, enemies_path, parent=None):
		super().__init__(parent)
		self.weapons_path = weapons_path
		self.enemies_path = enemies_path

		# Carico i dati JS (weapons + enemies)
		self.weapons = self._load_js_array(self.weapons_path, varname="weapons")
		self.enemies = self._load_js_array(self.enemies_path, varname="enemies")

		main_layout = QHBoxLayout()
		self.setLayout(main_layout)

		# --- Weapons Tab ---
		self.weapons_list = QListWidget()
		self._populate_list(self.weapons, self.weapons_list, display_key="name")
		self.weapons_form = QWidget()
		self._build_weapon_form()
		self._bind_weapon_selection()

		weapons_container = QHBoxLayout()
		weapons_container.addWidget(self.weapons_list, stretch=1)
		weapons_container.addWidget(self.weapons_form, stretch=2)

		weapons_btn_container = QVBoxLayout()
		btn_add_weapon = QPushButton("Aggiungi arma")
		btn_add_weapon.clicked.connect(self._on_add_weapon)
		btn_save_weapons = QPushButton("Salva weapons.js")
		btn_save_weapons.clicked.connect(self._on_save_weapons)
		weapons_btn_container.addWidget(btn_add_weapon)
		weapons_btn_container.addWidget(btn_save_weapons)
		weapons_btn_container.addStretch()

		weapons_tab = QWidget()
		weapons_tab.setLayout(QVBoxLayout())
		weapons_tab.layout().addLayout(weapons_container)
		weapons_tab.layout().addLayout(weapons_btn_container)

		# --- Enemies Tab ---
		self.enemies_list = QListWidget()
		self._populate_list(self.enemies, self.enemies_list, display_key="name")
		self.enemies_form = QWidget()
		self._build_enemy_form()
		self._bind_enemy_selection()

		enemies_container = QHBoxLayout()
		enemies_container.addWidget(self.enemies_list, stretch=1)
		enemies_container.addWidget(self.enemies_form, stretch=2)

		enemies_btn_container = QVBoxLayout()
		btn_add_enemy = QPushButton("Aggiungi nemico")
		btn_add_enemy.clicked.connect(self._on_add_enemy)
		btn_save_enemies = QPushButton("Salva enemies.js")
		btn_save_enemies.clicked.connect(self._on_save_enemies)
		enemies_btn_container.addWidget(btn_add_enemy)
		enemies_btn_container.addWidget(btn_save_enemies)
		enemies_btn_container.addStretch()

		enemies_tab = QWidget()
		enemies_tab.setLayout(QVBoxLayout())
		enemies_tab.layout().addLayout(enemies_container)
		enemies_tab.layout().addLayout(enemies_btn_container)

		# --- TabWidget contenente Weapons / Enemies ---
		from PyQt5.QtWidgets import QTabWidget
		tabs = QTabWidget()
		tabs.addTab(weapons_tab, "Weapons")
		tabs.addTab(enemies_tab, "Enemies")

		main_layout.addWidget(tabs)

	def _load_js_array(self, js_path, varname):
		try:
			data = parse_default_exported_array(js_path)
		except Exception as e:
			QMessageBox.warning(self, "Errore parsing", f"Errore nel parsing di {js_path}:\n{e}")
			return []
		return data


	def _populate_list(self, data_list, list_widget, display_key):
		"""
		Popola un QListWidget con le voci di `data_list`, mostrando il campo display_key.
		"""
		list_widget.clear()
		for entry in data_list:
			text = str(entry.get(display_key, f"(id {entry.get('id','')})"))
			item = QListWidgetItem(text)
			list_widget.addItem(item)


	# --------------------------
	# 1) COSTRUZIONE FORM WEAPON
	def _build_weapon_form(self):
		form = QFormLayout()
		self.w_id = QLineEdit()
		self.w_id.setValidator(QIntValidator(0, 999999))
		form.addRow("ID:", self.w_id)

		self.w_name = QLineEdit()
		form.addRow("Name:", self.w_name)

		self.w_damage = QSpinBox()
		self.w_damage.setRange(0, 999)
		form.addRow("Damage:", self.w_damage)

		# Combobox per rarity
		self.w_rarity = QComboBox()
		self.w_rarity.addItems(["Comune", "Non Comune", "Raro", "Epico", "Leggendario"])
		form.addRow("Rarity:", self.w_rarity)

		self.w_description = QTextEdit()
		form.addRow("Description:", self.w_description)

		# Campo immagine + browse
		hbox_img = QHBoxLayout()
		self.w_image = QLineEdit()
		self.w_image.setReadOnly(True)
		btn_browse = QPushButton("Sfoglia…")
		btn_browse.clicked.connect(self._browse_weapon_image)
		hbox_img.addWidget(self.w_image)
		hbox_img.addWidget(btn_browse)
		form.addRow("Image:", hbox_img)

		# Preview dell’immagine
		self.w_image_preview = QLabel()
		self.w_image_preview.setFixedSize(120, 120)
		self.w_image_preview.setStyleSheet("border: 1px solid gray;")
		self.w_image_preview.setAlignment(Qt.AlignCenter)
		form.addRow("", self.w_image_preview)

		self.weapons_form.setLayout(form)

	def _bind_weapon_selection(self):
		self.weapons_list.currentRowChanged.connect(self._on_weapon_selected)

	def _on_weapon_selected(self, idx):
		if idx < 0 or idx >= len(self.weapons):
			# svuoto il form
			self.w_id.clear()
			self.w_name.clear()
			self.w_damage.setValue(0)
			self.w_rarity.setCurrentIndex(0)
			self.w_description.clear()
			self.w_image.clear()
			self.w_image_preview.clear()
			return

		w = self.weapons[idx]
		self.w_id.setText(str(w.get("id", "")))
		self.w_name.setText(w.get("name", ""))
		self.w_damage.setValue(w.get("damage", 0))
		rarity = w.get("rarity", "Comune")
		idx_r = self.w_rarity.findText(rarity)
		self.w_rarity.setCurrentIndex(idx_r if idx_r >= 0 else 0)
		self.w_description.setPlainText(w.get("description", ""))
		self.w_image.setText(w.get("image", ""))

		# Carico il preview dell’immagine se esiste
		img_path = w.get("image", "")
		self._load_weapon_image_preview(img_path)

	def _browse_weapon_image(self):
		cwd = os.getcwd()
		img_dir = os.path.join(cwd, "public", "img")
		if not os.path.isdir(img_dir):
			img_dir = cwd
		fname, _ = QFileDialog.getOpenFileName(self, "Seleziona immagine weapon", img_dir,
											   "Images (*.png *.jpg *.jpeg *.bmp *.gif)")
		if fname:
			norm = os.path.normpath(fname)
			parts = norm.split(os.sep)
			try:
				idx = parts.index("public")
				rel = parts[idx + 1:]
				rel_path = "/" + os.path.join(*rel).replace("\\", "/")
				self.w_image.setText(rel_path)
				self._load_weapon_image_preview(rel_path)
			except ValueError:
				self.w_image.setText(fname)
				self._load_weapon_image_preview(fname)

	def _load_weapon_image_preview(self, path_str):
		if not path_str:
			self.w_image_preview.clear()
			return

		if path_str.startswith("/"):
			abs_path = os.path.join(os.getcwd(), "public", path_str.lstrip("/"))
		else:
			abs_path = path_str

		if os.path.isfile(abs_path):
			pix = QPixmap(abs_path).scaled(
				self.w_image_preview.width(),
				self.w_image_preview.height(),
				Qt.KeepAspectRatio,
				Qt.SmoothTransformation
			)
			self.w_image_preview.setPixmap(pix)
		else:
			self.w_image_preview.clear()

	def _on_add_weapon(self):
		# Calcola il nuovo ID come massimo ID esistente + 1
		existing_ids = [w.get("id", 0) for w in self.weapons]
		new_id = max(existing_ids, default=0) + 1

		nuovo = {
			"id": new_id,
			"name": "",
			"damage": 0,
			"rarity": "Comune",
			"description": "",
			"image": ""
		}
		self.weapons.append(nuovo)
		self._populate_list(self.weapons, self.weapons_list, display_key="name")
		self.weapons_list.setCurrentRow(len(self.weapons) - 1)

	def _on_save_weapons(self):
		idx = self.weapons_list.currentRow()
		if 0 <= idx < len(self.weapons):
			try:
				self.weapons[idx]["id"] = int(self.w_id.text())
			except ValueError:
				self.weapons[idx]["id"] = 0
			self.weapons[idx]["name"] = self.w_name.text()
			self.weapons[idx]["damage"] = self.w_damage.value()
			self.weapons[idx]["rarity"] = self.w_rarity.currentText()
			self.weapons[idx]["description"] = self.w_description.toPlainText().strip()
			self.weapons[idx]["image"] = self.w_image.text().strip()

		self._populate_list(self.weapons, self.weapons_list, display_key="name")

		try:
			write_js_array("weapons", self.weapons, self.weapons_path)
			QMessageBox.information(self, "Salvataggio", "weapons.js salvato correttamente.")
		except Exception as e:
			QMessageBox.critical(self, "Errore scrittura", f"Errore salvando weapons.js:\n{e}")

	# --------------------------
	# 2) COSTRUZIONE FORM ENEMY (AGGIORNATO)
	def _build_enemy_form(self):
		form = QFormLayout()

		# --- Campi base ---
		self.e_id = QLineEdit()
		self.e_id.setValidator(QIntValidator(0, 999999))
		form.addRow("ID:", self.e_id)

		self.e_name = QLineEdit()
		form.addRow("Name:", self.e_name)

		self.e_hp = QSpinBox()
		self.e_hp.setRange(0, 9999)
		form.addRow("HP:", self.e_hp)

		self.e_attack = QSpinBox()
		self.e_attack.setRange(0, 9999)
		form.addRow("Attack:", self.e_attack)

		self.e_description = QTextEdit()
		form.addRow("Description:", self.e_description)

		# --- Sezione Weakness come spinbox ---
		self.weakness_spins = {}
		categories = [
			"fendente", "perforante", "contundente",
			"fuoco", "acqua", "terra", "aria",
			"sacro", "oscuro", "veneno", "ghiaccio", "tuono"
		]
		for cat in categories:
			spin = QDoubleSpinBox()
			spin.setRange(0.0, 5.0)
			spin.setSingleStep(0.1)
			spin.setDecimals(2)
			spin.setValue(1.0)  # default tutti a 1.0
			form.addRow(f"Weakness - {cat.capitalize()}:", spin)
			self.weakness_spins[cat] = spin

		# --- Campo immagine + browse ---
		hbox_img = QHBoxLayout()
		self.e_image = QLineEdit()
		self.e_image.setReadOnly(True)
		btn_browse = QPushButton("Sfoglia…")
		btn_browse.clicked.connect(self._browse_enemy_image)
		hbox_img.addWidget(self.e_image)
		hbox_img.addWidget(btn_browse)
		form.addRow("Image:", hbox_img)

		# Preview dell’immagine
		self.e_image_preview = QLabel()
		self.e_image_preview.setFixedSize(120, 120)
		self.e_image_preview.setStyleSheet("border: 1px solid gray;")
		self.e_image_preview.setAlignment(Qt.AlignCenter)
		form.addRow("", self.e_image_preview)

		self.enemies_form.setLayout(form)

	def _bind_enemy_selection(self):
		self.enemies_list.currentRowChanged.connect(self._on_enemy_selected)

	def _on_enemy_selected(self, idx):
		"""
		Carica nel form i valori di self.enemies[idx], incluso il dict 'weakness'
		e prova a mostrare l’immagine nel preview.
		"""
		if idx < 0 or idx >= len(self.enemies):
			# svuoto il form
			self.e_id.clear()
			self.e_name.clear()
			self.e_hp.setValue(0)
			self.e_attack.setValue(0)
			self.e_description.clear()
			for spin in self.weakness_spins.values():
				spin.setValue(1.0)
			self.e_image.clear()
			self.e_image_preview.clear()
			return

		e = self.enemies[idx]
		self.e_id.setText(str(e.get("id", "")))
		self.e_name.setText(e.get("name", ""))
		self.e_hp.setValue(e.get("hp", 0))
		self.e_attack.setValue(e.get("attack", 0))
		self.e_description.setPlainText(e.get("description", ""))

		# Estraggo il dict weakness e imposto le spinbox
		weak_dict = e.get("weakness", {}) or {}
		for cat, spin in self.weakness_spins.items():
			val = weak_dict.get(cat, 1.0)
			try:
				spin.setValue(float(val))
			except Exception:
				spin.setValue(1.0)

		# Carico il preview dell’immagine se esiste
		img_path = e.get("image", "")
		self._load_enemy_image_preview(img_path)

	def _on_add_enemy(self):
		# Calcola il nuovo ID come massimo ID esistente + 1
		existing_ids = [e.get("id", 0) for e in self.enemies]
		new_id = max(existing_ids, default=0) + 1

		nuovo_weak = {cat: 1.0 for cat in self.weakness_spins.keys()}
		nuovo = {
			"id": new_id,
			"name": "",
			"hp": 0,
			"attack": 0,
			"description": "",
			"weakness": nuovo_weak,
			"image": ""
		}
		self.enemies.append(nuovo)
		self._populate_list(self.enemies, self.enemies_list, display_key="name")
		self.enemies_list.setCurrentRow(len(self.enemies) - 1)

	def _browse_enemy_image(self):
		cwd = os.getcwd()
		img_dir = os.path.join(cwd, "public", "img")
		if not os.path.isdir(img_dir):
			img_dir = cwd
		fname, _ = QFileDialog.getOpenFileName(self, "Seleziona immagine enemy", img_dir,
												   "Images (*.png *.jpg *.jpeg *.bmp *.gif)")
		if fname:
			norm = os.path.normpath(fname)
			parts = norm.split(os.sep)
			try:
				idx = parts.index("public")
				rel = parts[idx + 1:]
				rel_path = "/" + os.path.join(*rel).replace("\\", "/")
				self.e_image.setText(rel_path)
				self._load_enemy_image_preview(rel_path)
			except ValueError:
				self.e_image.setText(fname)
				self._load_enemy_image_preview(fname)

	def _load_enemy_image_preview(self, path_str):
		"""
		Carica il QLabel di preview per gli enemies.
		Path_str può essere relativo ("/img/xyz.jpg") o assoluto.
		"""
		if not path_str:
			self.e_image_preview.clear()
			return

		# Risolvo il percorso: se inizia con "/", interpreto da cwd
		if path_str.startswith("/"):
			abs_path = os.path.join(os.getcwd(), "public", path_str.lstrip("/"))
		else:
			abs_path = path_str

		if os.path.isfile(abs_path):
			pix = QPixmap(abs_path).scaled(
				self.e_image_preview.width(),
				self.e_image_preview.height(),
				Qt.KeepAspectRatio,
				Qt.SmoothTransformation
			)
			self.e_image_preview.setPixmap(pix)
		else:
			self.e_image_preview.clear()

	def _on_save_enemies(self):
		"""
		Aggiorna il dict self.enemies[idx] con i valori dei campi e delle spinbox di weakness,
		poi scrive il file enemies.js.
		"""
		idx = self.enemies_list.currentRow()
		if 0 <= idx < len(self.enemies):
			# Aggiorno campi base
			try:
				self.enemies[idx]["id"] = int(self.e_id.text())
			except ValueError:
				self.enemies[idx]["id"] = 0
			self.enemies[idx]["name"] = self.e_name.text()
			self.enemies[idx]["hp"] = self.e_hp.value()
			self.enemies[idx]["attack"] = self.e_attack.value()
			self.enemies[idx]["description"] = self.e_description.toPlainText().strip()

			# Ricompongo il dict 'weakness'
			new_weak = {}
			for cat, spin in self.weakness_spins.items():
				val = spin.value()
				new_weak[cat] = float(val)
			self.enemies[idx]["weakness"] = new_weak

			self.enemies[idx]["image"] = self.e_image.text().strip()

		# Rifaccio il listing per aggiornare il nome in lista
		self._populate_list(self.enemies, self.enemies_list, display_key="name")

		try:
			write_js_array("enemies", self.enemies, self.enemies_path)
			QMessageBox.information(self, "Salvataggio", "enemies.js salvato correttamente.")
		except Exception as e:
			QMessageBox.critical(self, "Errore scrittura", f"Errore salvando enemies.js:\n{e}")

