function Footer () {
    var date = new Date();
    return (
        <footer className="footer">
          <p className="footer__text">&copy;&nbsp;{date.getFullYear()}&nbsp;Mesto Russia</p>
        </footer>
    )
}

export default Footer;