import { Link } from 'react-router-dom';

const base =
  'inline-block font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300 px-8 py-3';

const variants = {
  primary: `${base} bg-blush text-white hover:bg-blush-dark`,
  outline: `${base} border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream`,
};

export default function Button({ children, variant = 'primary', to, href, ...props }) {
  const className = variants[variant];

  if (to) {
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
