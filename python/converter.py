import sys
import os
from PyQt5.QtWidgets import (
	QApplication, QWidget, QVBoxLayout, QPushButton,
	QFileDialog, QLabel, QMessageBox
)
from PIL import Image


class PNGtoJPGConverter(QWidget):
	def __init__(self):
		super().__init__()
		self.initUI()

	def initUI(self):
		self.setWindowTitle('PNG to JPG Converter')
		self.setGeometry(100, 100, 400, 200)

		layout = QVBoxLayout()

		self.label_input = QLabel('Cartella Input: Nessuna selezionata')
		self.label_output = QLabel('Cartella Output: Nessuna selezionata')

		btn_input = QPushButton('Scegli Cartella Input')
		btn_input.clicked.connect(self.select_input_folder)

		btn_output = QPushButton('Scegli Cartella Output')
		btn_output.clicked.connect(self.select_output_folder)

		btn_convert = QPushButton('Converti PNG in JPG')
		btn_convert.clicked.connect(self.convert_images)

		layout.addWidget(self.label_input)
		layout.addWidget(btn_input)
		layout.addWidget(self.label_output)
		layout.addWidget(btn_output)
		layout.addWidget(btn_convert)

		self.setLayout(layout)

		self.input_folder = ''
		self.output_folder = ''

	def select_input_folder(self):
		folder = QFileDialog.getExistingDirectory(self, 'Seleziona Cartella di Input')
		if folder:
			self.input_folder = folder
			self.label_input.setText(f'Cartella Input: {folder}')

	def select_output_folder(self):
		folder = QFileDialog.getExistingDirectory(self, 'Seleziona Cartella di Output')
		if folder:
			self.output_folder = folder
			self.label_output.setText(f'Cartella Output: {folder}')

	def convert_images(self):
		if not self.input_folder or not self.output_folder:
			QMessageBox.warning(self, 'Attenzione', 'Seleziona entrambe le cartelle!')
			return

		count = 0
		for filename in os.listdir(self.input_folder):
			if filename.lower().endswith('.png'):
				input_path = os.path.join(self.input_folder, filename)
				output_filename = os.path.splitext(filename)[0] + '.jpg'
				output_path = os.path.join(self.output_folder, output_filename)

				try:
					with Image.open(input_path) as im:
						rgb_im = im.convert('RGB')
						rgb_im.save(output_path, 'JPEG', quality=95)
					count += 1
				except Exception as e:
					print(f"Errore con {filename}: {e}")

		QMessageBox.information(self, 'Fatto', f'Convertite {count} immagini PNG in JPG.')


if __name__ == '__main__':
	app = QApplication(sys.argv)
	converter = PNGtoJPGConverter()
	converter.show()
	sys.exit(app.exec_())
