import os

from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap, QBrush, QPen
from PyQt5.QtWidgets import QGraphicsRectItem, QGraphicsItem, QGraphicsTextItem

from python.components.note_editor_dialog import NodeEditorDialog
from python.settings import NODE_WIDTH, NODE_HEIGHT


class Node(QGraphicsRectItem):
    """
    QGraphicsRectItem che rappresenta un nodo:
      - Mostra l’immagine di sfondo (se presente), senza tile
      - Mostra il titolo in testo
      - Permette drag & drop
      - Al doppio click apre NodeEditorDialog
      - Rileva spostamenti per aggiornare frecce
    """
    def __init__(self, node_data, editor):
        super().__init__(-NODE_WIDTH / 2, -NODE_HEIGHT / 2, NODE_WIDTH, NODE_HEIGHT)
        self.setFlags(
            QGraphicsItem.ItemIsMovable
            | QGraphicsItem.ItemIsSelectable
            | QGraphicsItem.ItemSendsScenePositionChanges
        )

        self.data = node_data
        self.editor = editor
        self.pixmap = None
        self.load_pixmap()

        self.text = QGraphicsTextItem(self.data.get("title", ""), self)
        self.text.setDefaultTextColor(Qt.black)
        self.text.setPos(-NODE_WIDTH / 2 + 5, -NODE_HEIGHT / 2 + 5)

    def load_pixmap(self):
        """
        Carica il pixmap ridimensionato se ‘image’ esiste, basando il percorso su public/img.
        """
        self.pixmap = None
        img_rel = self.data.get("image", "")
        if img_rel:
            cwd = os.getcwd()
            full_path = os.path.join(cwd, "public", img_rel.lstrip("/"))
            if os.path.isfile(full_path):
                loaded = QPixmap(full_path)
                self.pixmap = loaded.scaled(
                    NODE_WIDTH,
                    NODE_HEIGHT,
                    Qt.KeepAspectRatioByExpanding,
                    Qt.SmoothTransformation
                )

    def paint(self, painter, option, widget):
        rect = self.rect()
        if self.pixmap:
            painter.drawPixmap(rect.toRect(), self.pixmap)
        else:
            painter.fillRect(rect, QBrush(Qt.lightGray))

        pen = QPen(Qt.black, 1)
        painter.setPen(pen)
        painter.drawRect(rect)
        super().paint(painter, option, widget)

    def mouseDoubleClickEvent(self, event):
        dialog = NodeEditorDialog(self.data)
        if dialog.exec_():
            self.text.setPlainText(self.data.get("title", ""))
            self.load_pixmap()
            self.editor.update_connections()
        super().mouseDoubleClickEvent(event)

    def itemChange(self, change, value):
        if change == QGraphicsItem.ItemPositionHasChanged:
            self.editor.update_connections()
        return super().itemChange(change, value)




