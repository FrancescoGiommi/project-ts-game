import sys
import json
import os
from PyQt5 import QtWidgets, QtGui, QtCore
import qtmodern.styles
import qtmodern.windows

from python.components.narrative_graph_scene import NarrativeGraphScene


class MainWindow(QtWidgets.QMainWindow):
    def __init__(self, json_path):
        super().__init__()
        self.setWindowTitle("Narrative Graph Editor")
        self.resize(1000, 600)

        self.view = QtWidgets.QGraphicsView()
        self.setCentralWidget(self.view)

        with open(json_path, "r") as f:
            self.json_data = json.load(f)

        self.scene = NarrativeGraphScene(self.json_data)
        self.view.setScene(self.scene)
        self.view.setRenderHint(QtGui.QPainter.Antialiasing)

def main():
    app = QtWidgets.QApplication(sys.argv)
    qtmodern.styles.dark(app)

    main_window = MainWindow("paths.json")
    modern_window = qtmodern.windows.ModernWindow(main_window)
    modern_window.show()

    sys.exit(app.exec_())

if __name__ == "__main__":
    main()