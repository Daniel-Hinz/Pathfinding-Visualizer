import React from "react";
import Node from "./components/node.js";
import { useState, useEffect } from "react";

// import algorithms
import AStar from "./algorithms/pathfinding/astar.js";
import BreadthFirst from "./algorithms/pathfinding/breadth-first.js";
import DepthFirst from "./algorithms/pathfinding/depth-first.js";
import Dijkstras from "./algorithms/pathfinding/dijkstras.js";

// import maze algorithms
import backtrack from "./algorithms/maze/backtrack.js";
import division from "./algorithms/maze/division.js";
import random from "./algorithms/maze/random.js";

// import css
import "./styles/App.css";

const App = () => {
  const [algorithm, setAlgorithm] = useState("");
  const [nodes, setNodes] = useState([]);
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});

  useEffect(() => {
    window.addEventListener("resize", generateGrid);
    generateGrid();
  }, []);

  const generateGrid = () => {
    let main = document.querySelector(".main");
    let numCols =
      (Math.floor(main.offsetWidth / 30) - 2) % 2 === 1
        ? Math.floor(main.offsetWidth / 30) - 2
        : Math.floor(main.offsetWidth / 30) - 2 - 1;
    let numRows =
      (Math.floor(main.offsetHeight / 30) - 2) % 2 === 1
        ? Math.floor(main.offsetHeight / 30) - 2
        : Math.floor(main.offsetHeight / 30) - 2 - 1;

    let grid = [];
    for (let row = 0; row < numRows; ++row) {
      let nodeRow = [];
      for (let col = 0; col < numCols; ++col) {
        nodeRow.push({
          visited: false,
          row: row,
          col: col,
          type:
            col === Math.floor(numCols / 4) && row === Math.floor(numRows / 2)
              ? "start"
              : col === Math.floor(numCols / 1.33) &&
                row === Math.floor(numRows / 2)
              ? "end"
              : "",
        });
      }
      grid.push(nodeRow);
    }
    setStart(grid[Math.floor(numRows / 2)][Math.floor(numCols / 4)]);
    setEnd(grid[Math.floor(numRows / 2)][Math.floor(numCols / 1.33)]);
    setNodes(grid);
  };

  // sets the entire grid to a paticular value
  const setGrid = (attr, value) => {
    let grid = [...nodes];
    for (let row = 0; row < nodes.length; ++row) {
      for (let col = 0; col < nodes[0].length; ++col) {
        let node = { ...grid[row][col] };

        if (
          attr === "type" &&
          (grid[row][col].type === "start" || grid[row][col].type === "end")
        )
          continue;
        else if (attr === "visited")
          node[attr] = node.type === "barrier" ? true : false;
        else node[attr] = value;

        grid[row][col] = node;
      }
    }
    setNodes(grid);
  };

  // set a particular node to a certain value
  const setNode = (newRow, newCol, attr1, val1, attr2, val2) => {
    let grid = [...nodes];
    for (let row = 0; row < nodes.length; ++row) {
      for (let col = 0; col < nodes[0].length; ++col) {
        if (row === newRow && col === newCol) {
          let node = { ...grid[row][col] };
          node[attr1] = val1;
          node[attr2] = val2;
          grid[row][col] = node;
        }
      }
    }
    setStart(val1 === "start" ? grid[newRow][newCol] : start);
    setEnd(val1 === "end" ? grid[newRow][newCol] : end);
    setNodes(grid);
  };

  return (
    <>
      <header>
        <h1>Pathfinding Visualizer</h1>

        <div className="algorithm select">
          <select onChange={(e) => setAlgorithm(e.target.value)}>
            <option value="">Algorithm</option>
            <option value="Dijkstras">Dijkstras</option>
            <option value="A*">A* Search</option>
            <option value="Breadth">Breadth First</option>
            <option value="Depth">Depth First</option>
          </select>

          <i className="fas fa-chevron-down"></i>
        </div>

        <div className="maze select">
          <select
            onChange={(e) => {
              switch (e.target.value) {
                case "Backtrack":
                  setGrid("type", "barrier");
                  backtrack(nodes[0][0], nodes, setNode);
                  break;
                case "Division":
                  setGrid("type", "");
                  division(0, 0, nodes, nodes, setNode);
                  break;
                case "Random":
                  setGrid("type", "");
                  random(nodes, setNode);
                  break;
                default:
              }
              setGrid("visited", true);
            }}
          >
            <option value="">Maze</option>
            <option value="Backtrack">Backtracking</option>
            <option value="Division">Division</option>
            <option value="Random">Random</option>
          </select>

          <i className="fas fa-chevron-down"></i>
        </div>
      </header>

      <main className="main">
        <div className="grid">
          {nodes.map((nodeRow, i) => (
            <div className="node-row" key={i}>
              {nodeRow.map((node, j) => (
                <Node
                  setNode={(row, col, type, val) =>
                    setNode(row, col, type, val)
                  }
                  row={node.row}
                  col={node.col}
                  type={node.type}
                  visited={node.visited}
                  key={j}
                ></Node>
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer>
        <div className="control-panel">
          <input
            type="button"
            value="Search"
            onClick={async () => {
              switch (algorithm) {
                case "A*":
                  AStar(start, end, nodes, setGrid, setNode);
                  break;
                case "Breadth":
                  BreadthFirst(start, end, nodes, setGrid, setNode);
                  break;
                case "Depth":
                  DepthFirst(start, end, nodes, setGrid, setNode);
                  break;
                case "Dijkstras":
                  Dijkstras(start, end, nodes, setGrid, setNode);
                  break;
                default:
                  alert("Please select an algorithm");
              }
            }}
          />

          <input onClick={() => generateGrid()} value="Reset" type="button" />
        </div>
      </footer>
    </>
  );
};

export default App;
