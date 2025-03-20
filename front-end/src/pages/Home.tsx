import { FC, useState, useRef, useEffect } from "react";
import "../styles/pages/Home.css";

interface NodeData {
  id: string;
  label: string;
  children?: NodeData[];
}

const TreeNode: FC<{ 
  node: NodeData; 
  onRightClick: (node: NodeData) => void;
  nodeRef?: (node: NodeData, element: HTMLElement) => void;
  highlight?: boolean; // New prop for highlighting
}> = ({ node, onRightClick, nodeRef, highlight }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && nodeRef) {
      nodeRef(node, ref.current);
    }
  }, [nodeRef]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRightClick(node);
  };

  return (
    <div 
      className={`tree-node ${highlight ? "node-highlight" : ""}`} 
      onContextMenu={handleRightClick} 
      ref={ref}
    >
      <div className="node-content" data-id={node.id}>{node.label}</div>
      {node.children?.map((child) => (
        <div className="children-container" key={child.id}>
          <TreeNode 
            node={child} 
            onRightClick={onRightClick} 
            nodeRef={nodeRef}
            highlight={highlight} // Pass highlight prop to children
          />
        </div>
      ))}
    </div>
  );
};

const Tree: FC<{ 
  data: NodeData; 
  onRightClick: (node: NodeData) => void;
  nodeRef?: (node: NodeData, element: HTMLElement) => void;
  highlightNodeId?: string | null; // New prop for highlighting
}> = ({ data, onRightClick, nodeRef, highlightNodeId }) => {
  return (
    <div className="tree-wrapper">
      <TreeNode 
        node={data} 
        onRightClick={onRightClick} 
        nodeRef={nodeRef}
        highlight={data.id === highlightNodeId} // Pass highlight prop
      />
    </div>
  );
};

const generateTree = (): NodeData => {
  const root: NodeData = { id: "root", label: "Root" };
  let idCounter = 1;

  const createBranch = (parent: NodeData, depth: number) => {
    if (depth === 0) return;
    parent.children = [];
    
    for (let i = 0; i < 3; i++) {
      const newNode: NodeData = { 
        id: `node-${idCounter++}`, 
        label: `Node ${idCounter}`
      };
      parent.children.push(newNode);
      createBranch(newNode, depth - 1);
    }
  };

  createBranch(root, 4);
  return root;
};

const NodeModal: FC<{ node: NodeData | null; onClose: () => void }> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Node Details</h2>
        <p>Name: {node.label}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const HomePage: FC = () => {
  const treeData = generateTree();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [foundNodeId, setFoundNodeId] = useState<string | null>(null); // Track highlighted node
  const nodeElements = useRef<Map<string, HTMLElement>>(new Map());

  const handleNodeRef = (node: NodeData, element: HTMLElement) => {
    nodeElements.current.set(node.id, element);
  };

  const searchNode = () => {
    const query = searchQuery.toLowerCase();
    const foundNode = findNode(treeData, query);
    
    if (foundNode) {
      setFoundNodeId(foundNode.id); // Set the node to highlight
      const element = nodeElements.current.get(foundNode.id);
      element?.scrollIntoView({ 
        behavior: "smooth", 
        block: "center",
        inline: "center"
      });

      // Reset highlight after 2 seconds
      setTimeout(() => setFoundNodeId(null), 2000);
    } else {
      alert("Node not found!");
    }
  };

  const findNode = (node: NodeData, query: string): NodeData | null => {
    if (node.label.toLowerCase().includes(query)) return node;
    
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child, query);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className="tree-container">
      <div className="search-container">
        <button 
          className="search-toggle"
          onClick={() => setShowSearch(!showSearch)}
        >
          🔍
        </button>
        
        {showSearch && (
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchNode()}
              placeholder="Search node..."
            />
            <button onClick={searchNode}>Go</button>
          </div>
        )}
      </div>

      <div className="tree-wrapper">
        <Tree 
          data={treeData} 
          onRightClick={setSelectedNode}
          nodeRef={handleNodeRef}
          highlightNodeId={foundNodeId} // Pass the highlighted node ID
        />
      </div>

      <NodeModal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
};

export default HomePage;