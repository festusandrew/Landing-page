import "./brand-logo.css"

/** Shared two-tone MployUs wordmark. It inherits its size from the surrounding element. */
export function BrandLogo() {
  return (
    <span className="brand-logo">
      mploy<span className="brand-logo-accent">us.</span>
    </span>
  )
}
