/**
 * Navbar.tsx
 * ----------
 * A clean, theme-aware top navigation bar.
 *
 * Improvements in this version:
 * - Professional light/dark color palette
 * - Better spacing and visual hierarchy
 * - Clearer border contrast
 * - Consistent with the rest of the app's design system
 */

export default function Navbar() {
  return (
    <nav
      className="
        w-full p-4 border-b shadow-sm
        bg-white text-slate-800 border-slate-200
        dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
      "
    >
      <h1 className="text-xl font-semibold tracking-tight">
        First Responder Quick Notes
      </h1>
    </nav>
  );
}