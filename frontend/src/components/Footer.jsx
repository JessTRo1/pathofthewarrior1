export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        © {year}{' '}
        <a
          className="footer__link"
          href="https://github.com/JessTRo1"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          By J.Torres &#9775;
        </a>
      </p>
      <p className="footer__quote">
        "The pain you feel today will be the strength you carry tomorrow."
      </p>
    </footer>
  );
}
