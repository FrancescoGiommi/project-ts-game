from PyQt5.QtWidgets import (
    QGraphicsScene,
    QGraphicsItem,
    QGraphicsTextItem,
    QGraphicsRectItem,
    QGraphicsLineItem,
    QGraphicsSceneMouseEvent,
    QDialog,
    QVBoxLayout,
    QLabel,
    QLineEdit,
    QPushButton
)
from PyQt5.QtGui import QBrush, QColor, QPen
from PyQt5.QtCore import Qt, QPointF

class NarrativeNodeItem(QGraphicsRectItem):
    def __init__(self, data, pos):
        super().__init__(0, 0, 200, 100)
        self.setBrush(QBrush(QColor("#2b2b2b")))
        self.setPen(QPen(QColor("#aaaaaa")))
        self.setFlags(
            QGraphicsItem.ItemIsMovable |
            QGraphicsItem.ItemIsSelectable |
            QGraphicsItem.ItemSendsGeometryChanges
        )
        self.setPos(pos)
        self.data = data

        self.title_item = QGraphicsTextItem(data.get("title", "Senza Titolo"), self)
        self.title_item.setDefaultTextColor(QColor("white"))
        self.title_item.setPos(10, 10)

    def mouseDoubleClickEvent(self, event: QGraphicsSceneMouseEvent):
        dialog = NodeEditDialog(self.data)
        if dialog.exec_():
            updated_data = dialog.get_data()
            self.data.update(updated_data)
            self.title_item.setPlainText(self.data["title"])
        super().mouseDoubleClickEvent(event)


class NodeEditDialog(QDialog):
    def __init__(self, data):
        super().__init__()
        self.setWindowTitle("Modifica Nodo Narrativo")
        self.data = data

        layout = QVBoxLayout()

        self.title_edit = QLineEdit(data.get("title", ""))
        layout.addWidget(QLabel("Titolo"))
        layout.addWidget(self.title_edit)

        self.desc_edit = QLineEdit(data.get("description", ""))
        layout.addWidget(QLabel("Descrizione"))
        layout.addWidget(self.desc_edit)

        save_btn = QPushButton("Salva")
        save_btn.clicked.connect(self.accept)
        layout.addWidget(save_btn)

        self.setLayout(layout)

    def get_data(self):
        return {
            "title": self.title_edit.text(),
            "description": self.desc_edit.text()
        }


class NarrativeGraphScene(QGraphicsScene):
    def __init__(self, data):
        super().__init__()
        self.setSceneRect(0, 0, 3000, 2000)
        self.nodes = {}
        self.links = []

        self.line_preview = None
        self.start_node = None

        for i, node_data in enumerate(data.get("paths", [])):
            pos = QPointF(100 + i * 220, 100)
            self.add_narrative_node(node_data, pos)

    def add_narrative_node(self, node_data, pos):
        node = NarrativeNodeItem(node_data, pos)
        self.addItem(node)
        self.nodes[node_data["id"]] = node

    def mousePressEvent(self, event):
        item = self.itemAt(event.scenePos(), self.views()[0].transform())

        if isinstance(item, NarrativeNodeItem):
            if event.button() == Qt.RightButton:
                self.start_node = item
                self.line_preview = QGraphicsLineItem()
                pen = QPen(QColor("cyan"))
                pen.setStyle(Qt.DashLine)
                self.line_preview.setPen(pen)
                self.addItem(self.line_preview)
                self.line_preview.setLine(
                    item.sceneBoundingRect().center().x(),
                    item.sceneBoundingRect().center().y(),
                    event.scenePos().x(),
                    event.scenePos().y()
                )
        super().mousePressEvent(event)

    def mouseMoveEvent(self, event):
        if self.line_preview and self.start_node:
            line = self.line_preview.line()
            self.line_preview.setLine(
                line.x1(), line.y1(),
                event.scenePos().x(), event.scenePos().y()
            )
        super().mouseMoveEvent(event)

    def mouseReleaseEvent(self, event):
        if self.line_preview and self.start_node:
            end_item = self.itemAt(event.scenePos(), self.views()[0].transform())
            if isinstance(end_item, NarrativeNodeItem) and end_item != self.start_node:
                self.create_connection(self.start_node, end_item)
            self.removeItem(self.line_preview)
            self.line_preview = None
            self.start_node = None
        super().mouseReleaseEvent(event)

    def create_connection(self, source, target):
        line = QGraphicsLineItem(
            source.sceneBoundingRect().center().x(),
            source.sceneBoundingRect().center().y(),
            target.sceneBoundingRect().center().x(),
            target.sceneBoundingRect().center().y()
        )
        pen = QPen(QColor("orange"), 2)
        line.setPen(pen)
        self.addItem(line)
        self.links.append((source, target))
