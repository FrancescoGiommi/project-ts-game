import sys
import os
from PyQt5.QtWidgets import QApplication
import qtmodern.styles
import qtmodern.windows

from python.components.node_editor import NodeEditor
from python.uihelper.ui_library import UIutils

if __name__ == "__main__":
    app = QApplication(sys.argv)
    qtmodern.styles.dark(app)

    js_path = os.path.normpath(os.path.join(os.getcwd(), "src", "db", "paths.js"))
    js_path2 = os.path.normpath(os.path.join(os.getcwd(), "src", "db", "weapons.js"))
    js_path3 = os.path.normpath(os.path.join(os.getcwd(), "src", "db", "enemies.js"))
    mw = NodeEditor(js_path, js_path2, js_path3)
    modern_window = qtmodern.windows.ModernWindow(mw)
    modern_window.setMinimumSize(1500, 800)  # o qualsiasi valore utile
    modern_window.show()
    UIutils.center_window(mw)
    sys.exit(app.exec_())
