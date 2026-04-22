const LINKS = [
  ['fa-linkedin', 'https://www.linkedin.com/in/md-asif-iqbal-ahmed/', 'LinkedIn'],
  ['fa-github',   'https://github.com/vector94',                        'GitHub'],
  ['fa-telegram', 'https://t.me/vector944',                             'Telegram'],
  ['fa-facebook', 'https://www.facebook.com/asif.ahmed181/',            'Facebook'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-text">
          © 2021 – 2026 Md Asif Iqbal Ahmed. All rights reserved.
        </span>
        <div className="footer-social">
          {LINKS.map(([icon, href, label]) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noopener">
              <i className={`fa ${icon}`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
