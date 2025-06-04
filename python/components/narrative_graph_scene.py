import os

from PyQt5 import QtWidgets, QtGui, QtCore


class NarrativeNodeItem(QtWidgets.QGraphicsPixmapItem):
    def __init__(self, path_data, image_path, node_id):
        pixmap = QtGui.QPixmap(image_path).scaled(100, 100)
        super().__init__(pixmap)
        self.setFlag(QtWidgets.QGraphicsItem.ItemIsMovable)
        self.setFlag(QtWidgets.QGraphicsItem.ItemIsSelectable)
        self.path_data = path_data
        self.node_id = node_id

        # Testo del titolo
        self.text = QtWidgets.QGraphicsTextItem(path_data.get("title", f"Node {node_id}"), self)
        self.text.setDefaultTextColor(QtCore.Qt.black)
        self.text.setPos(0, 105)  # Sotto l'immagine

class NarrativeEdgeItem(QtWidgets.QGraphicsLineItem):
    def __init__(self, start_item, end_item):
        super().__init__()
        self.start_item = start_item
        self.end_item = end_item
        self.setPen(QtGui.QPen(QtCore.Qt.black, 2))
        self.update_position()

    def update_position(self):
        start_center = self.start_item.scenePos() + QtCore.QPointF(50, 50)
        end_center = self.end_item.scenePos() + QtCore.QPointF(50, 50)
        self.setLine(QtCore.QLineF(start_center, end_center))

class NarrativeGraphScene(QtWidgets.QGraphicsScene):
    def __init__(self, json_data, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.json_data = json_data
        self.node_items = {}
        self.init_nodes()
        self.init_edges()

    def init_nodes(self):
        for index, path in enumerate(self.json_data["paths"]):
            image_path = path.get("firstImg", "assets/default.png")
            if not os.path.isfile(image_path):
                image_path = "assets/default.png"
            node = NarrativeNodeItem(path, image_path, index)
            node.setPos(index * 150, 50)
            self.addItem(node)
            self.node_items[path.get("id", str(index))] = node

    def init_edges(self):
        for path in self.json_data["paths"]:
            current_id = path.get("id")
            current_node = self.node_items.get(current_id)
            if not current_node:
                continue
            for option in path.get("options", []):
                next_id = option.get("next")
                next_node = self.node_items.get(next_id)
                if next_node:
                    edge = NarrativeEdgeItem(current_node, next_node)
                    self.addItem(edge)