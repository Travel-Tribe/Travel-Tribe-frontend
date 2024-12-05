import { VscGithub } from "react-icons/vsc";

export default function Footer() {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10 mt-auto">
      <nav>
        <h6 className="footer-title">Frontend</h6>
        <a href="https://github.com/seoulmomo" className="link link-hover">
          고재모
        </a>
        <a href="https://github.com/Seungmani" className="link link-hover">
          이승민
        </a>
        <a href="https://github.com/joo93" className="link link-hover">
          방주영
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Backend</h6>
        <a href="https://github.com/seokseungmin" className="link link-hover">
          석승민
        </a>
        <a href="https://github.com/kim975" className="link link-hover">
          김용민
        </a>
        <a href="https://github.com/shbyeon20" className="link link-hover">
          변상화
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com/Travel-Tribe"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-success"
          >
            <VscGithub className="w-5 h-5" />
          </a>
        </div>
      </nav>
    </footer>
  );
}
