import paper from "./assets/paper.svg";
import rock from "./assets/rock.svg";
import scissor from "./assets/scissor.svg";

const IMAGES = {
  rock: rock,
  scissor: scissor,
  paper: paper,
};

function HandIcon({ value, className }) {
  const src = IMAGES[value];
  return <img src={src} className={className} />;
}

export default HandIcon;
