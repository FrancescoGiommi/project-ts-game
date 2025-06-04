from datetime import datetime

from PyQt5 import QtWidgets
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QLabel
from PyQt5.QtWidgets import QTableWidgetItem


class UIutils:

	@staticmethod
	def increase_font_size(val=3):
		font = QtWidgets.QApplication.instance().font()
		font.setPointSize(font.pointSize() + val)
		QtWidgets.QApplication.instance().setFont(font)

	@staticmethod
	def center_window(model):
		frame_geometry = model.frameGeometry()
		screen_center = QtWidgets.QApplication.desktop().screen().rect().center()
		frame_geometry.moveCenter(screen_center)
		model.move(frame_geometry.topLeft())

	@staticmethod
	def go_to_page(stacked, index):
		stacked.setCurrentIndex(index)

	@staticmethod
	def set_window_title(main_layout, dialog):
		title_label = QLabel(dialog.windowTitle())
		title_label.setAlignment(Qt.AlignCenter)
		title_label.setStyleSheet("font-size: 16pt; font-weight: bold;")
		main_layout.addWidget(title_label)

	@staticmethod
	def update_progress_bar(text, current, total, label, progressbar):
		label.setText(f"{text} {current}/{total}")
		progress_percentage = int((current / total) * 100)
		progressbar.setValue(progress_percentage)

	@staticmethod
	def clear_layout(layout):
		while layout.count():
			item = layout.takeAt(0)
			widget = item.widget()
			if widget is not None:
				widget.deleteLater()
			else:
				# Se è un layout, lo pulisci ricorsivamente
				child_layout = item.layout()
				if child_layout is not None:
					UIutils.clear_layout(child_layout)

	@staticmethod
	def setFrameless(parent):
		parent.setWindowFlags(Qt.FramelessWindowHint)

	@staticmethod
	def ordina_per_data(table, col_data=3):
		rows = table.rowCount()
		for row in range(rows):
			old_item = table.item(row, col_data)
			if old_item:
				testo = old_item.text()
			else:
				testo = "None"
			new_item = DateItem(testo)
			table.setItem(row, col_data, new_item)

		table.setSortingEnabled(True)
		table.sortItems(col_data, Qt.AscendingOrder)
		header = table.horizontalHeader()
		header.setSortIndicator(col_data, Qt.AscendingOrder)
		header.setSortIndicatorShown(True)


class DateItem(QTableWidgetItem):
	"""Item personalizzato che memorizza e confronta una data in modo numerico (timestamp)."""

	def __init__(self, text):
		super().__init__(text)
		try:
			dt = datetime.strptime(text, "%d/%m/%Y - %H:%M")
			self._timestamp = dt.timestamp()
		except:
			# Se non è una data valida, la consideriamo "infinita" (va in fondo alla lista)
			self._timestamp = float('inf')

	def __lt__(self, other):
		"""Confronto basato sul timestamp, invece che sul testo."""
		if isinstance(other, DateItem):
			return self._timestamp < other._timestamp
		return super().__lt__(other)
