import { useEffect, useState } from "react";
import "./Dock.css";
import { CircleStar, FolderGit, PencilRuler, UserRound } from "lucide-react";

const DynamicBadge = ({ text }) => {
  const [mouseLocation, setMouseLocation] = useState({
    mouseX: null,
    mouseY: null,
  });
  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      setMouseLocation({
        mouseX: event.clientX,
        mouseY: event.clientY,
      });   
    });
  }, []);

  return (
    <div
      className="dynamic-badge"
      style={{
        opacity: text ? 1 : 0,
        transform: `translate(${mouseLocation.mouseX - window.innerWidth / 2}px, ${40 +mouseLocation.mouseY - (window.innerHeight)}px)`,
        transition: "opacity 1s, transform 400ms",
        pointerEvents: text ? "auto" : "none",
      }}
    >
      {text || ""}
    </div>
  );
};

const dockList = [
  { Icon: UserRound, textName: "About me" },
  { Icon: FolderGit, textName: "Projects" },
  { Icon: CircleStar, textName: "Experiances" },
  { Icon: PencilRuler, textName: "Skills" },
];

export default function Dock() {
  const [text, setText] = useState(null);

  return (
    <footer className="dock-container">
      <DynamicBadge text={text} />
      <ul className="dock">
        {dockList.map(({ Icon, textName }, idx) => (
          <li
            key={idx}
            onMouseOver={() => setText(textName)}
            onMouseLeave={() => setText(null)}
          >
            <Icon size={40} strokeWidth={0.9} />
          </li>
        ))}
      </ul>
    </footer>
  );
}
