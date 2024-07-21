import "./Header.css";

type genCount= {
    genCount: number;
}
export default function Header({genCount}: genCount) {
  return (
    <div>
      <h1 className="title rainbow-effect">Game of Life</h1>
      <p className="gen-count-text">Gen count: {genCount}</p>
    </div>
  );
}
