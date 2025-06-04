# node_editor.py

import os
from PyQt5.QtCore import QPointF
from PyQt5.QtGui import QPainter
from PyQt5.QtWidgets import (
    QWidget, QGraphicsView, QPushButton, QHBoxLayout, QVBoxLayout
)

from python.components.arrow import Arrow
from python.components.link_scene import LinkScene
from python.components.node import Node
from python.components.parser import write_paths_to_js, parse_default_exported_array
from python.components.data_editor import DataEditor  # ← Import di DataEditor
from python.uihelper.ui_library import UIutils


class NodeEditor(QWidget):
    def __init__(self, path_js_file, weapons_js_file, enemies_js_file):
        super().__init__()
        self.setWindowTitle("Editor Nodi Narrativi")


        self.paths_file = path_js_file
        # Layout orizzontale principale
        main_layout = QHBoxLayout()
        self.setLayout(main_layout)

        # ===== LATO SINISTRO: area nodi + bottone Salva paths.js =====
        left_container = QWidget()
        left_layout = QVBoxLayout()
        left_container.setLayout(left_layout)

        # QGraphicsView e scena dei nodi
        self.view = QGraphicsView()
        self.scene = LinkScene(self)
        self.view.setScene(self.scene)
        self.view.setRenderHint(QPainter.Antialiasing)
        left_layout.addWidget(self.view, stretch=1)

        # Pulsante "Salva posizioni Nodi"
        self.btn_save = QPushButton("Salva posizioni Nodi")
        self.btn_save.clicked.connect(self.save_positions)
        left_layout.addWidget(self.btn_save)

        main_layout.addWidget(left_container, stretch=3)

        # ===== LATO DESTRO: DataEditor (weapons + enemies) =====
        # Passo a DataEditor i percorsi completi dei file JS
        self.data_editor = DataEditor(weapons_js_file, enemies_js_file)
        main_layout.addWidget(self.data_editor, stretch=2)

        # Dati interni a NodeEditor (nodi e frecce)
        self.nodes = []
        self.arrows = []
        self.load_nodes()
        UIutils.increase_font_size()



    def load_nodes(self):
        """
        Esegue il parsing di paths.js e crea gli oggetti Node.
        Se il nodo ha posX,posY, li usa; altrimenti li allinea su una griglia.
        """
        self.paths = parse_default_exported_array(self.paths_file)

        # Rimuovo eventuali nodi e frecce esistenti
        for node in self.nodes:
            self.scene.removeItem(node)
        for arrow in self.arrows:
            self.scene.removeItem(arrow)
        self.nodes.clear()
        self.arrows.clear()

        # Creo i nodi e li posiziono
        for i, node_data in enumerate(self.paths):
            node = Node(node_data, self)
            if "posX" in node_data and "posY" in node_data:
                node.setPos(node_data["posX"], node_data["posY"])
            else:
                x = 150 * (i % 5)
                y = 120 * (i // 5)
                node.setPos(x, y)
            self.scene.addItem(node)
            self.nodes.append(node)

        # Creo le frecce in base alle “options” di ogni nodo
        self.update_connections()

    def create_node_at(self, scene_pos: QPointF):
        """
        Crea un nuovo nodo vuoto alla posizione scene_pos e lo aggiunge a paths.
        """
        node_data = {
            "id": f"node_{len(self.nodes)}",
            "floor": "",
            "title": "Nuovo Nodo",
            "description": "",
            "image": "",
            "deathChance": 0,
            "isBattle": False,
            "enemyId": "",
            "exp": 0,
            "drops": [],
            "options": [],
            "posX": scene_pos.x(),
            "posY": scene_pos.y(),
        }
        self.paths.append(node_data)

        node = Node(node_data, self)
        node.setPos(scene_pos)
        self.scene.addItem(node)
        self.nodes.append(node)
        self.update_connections()

    def update_connections(self):
        """
        Rimuove tutte le frecce attuali e le ricalcola leggendo “options” di ciascun nodo.
        """
        for arrow in self.arrows:
            self.scene.removeItem(arrow)
        self.arrows.clear()

        for node in self.nodes:
            for opt in node.data.get("options", []):
                target_id = opt.get("id")
                destinazione = next(
                    (n for n in self.nodes if n.data.get("id") == target_id),
                    None
                )
                if destinazione:
                    arrow = Arrow(node, destinazione)
                    self.scene.addItem(arrow)
                    self.arrows.append(arrow)

    def save_positions(self):
        """
        Aggiorna posX,posY in self.paths con le posizioni correnti dei nodi,
        quindi scrive sul file JS tramite write_paths_to_js.
        """
        for node in self.nodes:
            pos = node.scenePos()
            node.data["posX"] = pos.x()
            node.data["posY"] = pos.y()
        write_paths_to_js(self.paths, self.paths_file)

    def closeEvent(self, event):
        """
        Quando si chiude la finestra, salva prima le posizioni dei nodi.
        """
        self.save_positions()
        super().closeEvent(event)
