import React from "react";

const Node = ({ type, row, col, setNode }) => {
  switch (type) {
    // Start Node Element
    case "start":
      return (
        <div className={type + " node"}>
          <i
            className={"start fas fa-chevron-right"}
            draggable={true}
            onDragStart={(e) => e.dataTransfer.setData("type", type)}
            onDrag={() => setNode(row, col, "type", "")}
          ></i>
        </div>
      );

    // End Node Element
    case "end":
      return (
        <div className={type + " node"}>
          <i
            className={"end far fa-dot-circle"}
            draggable={true}
            onDragStart={(e) => e.dataTransfer.setData("type", type)}
            onDrag={() => setNode(row, col, "type", "")}
          ></i>
        </div>
      );

    // Barrier Node Element
    case "barrier":
      return (
        <div
          className={type + " node"}
          onClick={() => {
            setNode(row, col, "type", "");
            setNode(row, col, "visited", false);
          }}
        ></div>
      );

    case "visited":
      return <div className={type + " node"}></div>;

    // Default Node Element
    default:
      return (
        <div
          className={type + " node"}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) =>
            setNode(row, col, "type", e.dataTransfer.getData("type"))
          }
          onMouseEnter={(e) => {
            if (e.buttons === 1) {
              setNode(row, col, "type", "barrier");
              setNode(row, col, "visited", true);
            }
          }}
          onClick={() => {
            setNode(row, col, "type", "barrier");
            setNode(row, col, "visited", true);
          }}
        ></div>
      );
  }
};

export default Node;
