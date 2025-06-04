from PyQt5.QtCore import Qt, QLineF
from PyQt5.QtGui import QPen, QColor
from PyQt5.QtWidgets import QGraphicsScene, QGraphicsLineItem, QMenu

from python.components.node import Node


class LinkScene(QGraphicsScene):
    """
    QGraphicsScene personalizzata che gestisce:
      - “drag col tasto destro” per collegare/disconnettere nodi
      - context menu (tasto destro su canvas vuoto) per creare nuovo nodo
    """

    def __init__(self, editor, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.editor = editor
        self.link_start = None
        self.temp_line = None

    def mousePressEvent(self, event):
        if event.button() == Qt.RightButton:
            item = self.itemAt(event.scenePos(), self.views()[0].transform())
            if isinstance(item, Node):
                node = item if isinstance(item, Node) else item.parentItem()
                if isinstance(node, Node):
                    self.link_start = node
                    self.temp_line = QGraphicsLineItem(QLineF(node.scenePos(), event.scenePos()))
                    pen = QPen(QColor(0, 200, 255), 2, Qt.DashLine)
                    self.temp_line.setPen(pen)
                    self.addItem(self.temp_line)
                    return
        super().mousePressEvent(event)

    def mouseMoveEvent(self, event):
        if self.link_start and self.temp_line:
            new_line = QLineF(self.link_start.scenePos(), event.scenePos())
            self.temp_line.setLine(new_line)
            return
        super().mouseMoveEvent(event)

    def mouseReleaseEvent(self, event):
        if event.button() == Qt.RightButton and self.link_start:
            if self.temp_line:
                self.removeItem(self.temp_line)
                self.temp_line = None

            item = self.itemAt(event.scenePos(), self.views()[0].transform())
            dest_node = None
            if item is not None:
                if isinstance(item, Node):
                    dest_node = item
                else:
                    parent = item.parentItem()
                    if isinstance(parent, Node):
                        dest_node = parent

            if dest_node and dest_node is not self.link_start:
                start_data = self.link_start.data
                opts = start_data.setdefault("options", [])
                target_id = dest_node.data.get("id")
                existing = next((o for o in opts if o.get("id") == target_id), None)
                if existing:
                    opts.remove(existing)
                else:
                    option = {
                        "id": target_id,
                        "description": f"Vai a {dest_node.data.get('title','')}",
                        "image": "",
                        "unlockRequirements": []
                    }
                    opts.append(option)
                self.editor.update_connections()

            self.link_start = None
            return
        super().mouseReleaseEvent(event)

    def contextMenuEvent(self, event):
        item = self.itemAt(event.scenePos(), self.views()[0].transform())
        if item is None:
            menu = QMenu()
            create_action = menu.addAction("Crea nuovo nodo")
            action = menu.exec_(event.screenPos())
            if action == create_action:
                scene_pos = event.scenePos()
                self.editor.create_node_at(scene_pos)
            return
        super().contextMenuEvent(event)