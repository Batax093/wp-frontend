const Footer = () => {
  return (
    <div className="w-full mt-32">
      <footer className="rounded-lg w-full footer footer-center text-primary-content py-10">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - Fredrik Sahalatua Pakpahan</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://github.com/Batax093"
              className="cursor-pointer"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="/icons8-github-50.png"
                alt="Github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/fredrik-pakpahan-846536221"
              className="cursor-pointer"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="/icons8-linkedin-50.png"
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.instagram.com/_fredrikpakpahann"
              className="cursor-pointer"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="/icons8-instagram-50.png"
                alt="Instagram"
              />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};
export default Footer;
