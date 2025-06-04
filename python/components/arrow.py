import math

from PyQt5.QtCore import Qt, QLineF, QPointF
from PyQt5.QtGui import QPen, QColor, QPolygonF, QBrush
from PyQt5.QtWidgets import QGraphicsLineItem, QGraphicsPolygonItem

from python.settings import NODE_WIDTH, NODE_HEIGHT


class Arrow(QGraphicsLineItem):
    """
    Rappresenta una freccia direzionale (linea + punta) colore celeste, non tratteggiata.
    """

    def __init__(self, start_node, end_node):
        super().__init__()
        self.start_node = start_node
        self.end_node = end_node
        self.setPen(QPen(QColor(0, 200, 255), 2, Qt.SolidLine, Qt.RoundCap, Qt.RoundJoin))
        self.setZValue(-1)
        self.update_position()

    def update_position(self):
        p1 = self.start_node.scenePos()
        p2 = self.end_node.scenePos()
        line = QLineF(p1, p2)
        dist = line.length()
        if dist == 0:
            return

        dx = (NODE_WIDTH / 2) * (line.dx() / dist)
        dy = (NODE_HEIGHT / 2) * (line.dy() / dist)

        start_pt = QPointF(p1.x() + dx, p1.y() + dy)
        end_pt = QPointF(p2.x() - dx, p2.y() - dy)

        new_line = QLineF(start_pt, end_pt)
        self.setLine(new_line)

        angle = new_line.angle()
        arrow_size = 10.0
        px = end_pt.x()
        py = end_pt.y()
        theta = math.radians(-angle)

        p_left = QPointF(
            px + arrow_size * math.cos(theta + math.pi / 6),
            py - arrow_size * math.sin(theta + math.pi / 6),
        )
        p_right = QPointF(
            px + arrow_size * math.cos(theta - math.pi / 6),
            py - arrow_size * math.sin(theta - math.pi / 6),
        )

        triangle = QPolygonF([end_pt, p_left, p_right])
        for child in self.childItems():
            self.scene().removeItem(child)

        poly = QGraphicsPolygonItem(triangle, parent=self)
        poly.setBrush(QBrush(QColor(0, 200, 255)))
        poly.setPen(QPen(Qt.NoPen))