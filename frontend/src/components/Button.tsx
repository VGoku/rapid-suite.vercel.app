/**
 * Button.tsx
 * ----------
 * A reusable, theme-aware button component.
 *
 * Improvements in this version:
 * - Professional light/dark color palette
 * - Clearer variant names and consistent styling
 * - Better accessibility (focus ring, contrast)
 * - Clean variable names
 * - Fully typed with React.ButtonHTMLAttributes
 * - Works seamlessly with all updated pages
 */

import React from "react";

type ButtonVariant =
  | "primary"
  | "success"
  | "danger"
  | "ghost"
  | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: ButtonVariant;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  /**
   * Base button styling
   * - Minimum touch target height
   * - Centered content
   * - Rounded corners
   * - Smooth transitions
   */
  const baseStyles =
    "min-h-[44px] inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";

  /**
   * Variant styles
   * These match the new global color system used across the app.
   */
  const variantStyles: Record<ButtonVariant, string> = {
    primary: `
      bg-blue-600 text-white hover:bg-blue-700
      dark:bg-blue-500 dark:hover:bg-blue-400
    `,

    success: `
      bg-green-600 text-white hover:bg-green-700
      dark:bg-green-500 dark:hover:bg-green-400
    `,

    danger: `
      bg-red-600 text-white hover:bg-red-700
      dark:bg-red-500 dark:hover:bg-red-400
    `,

    secondary: `
      bg-slate-200 text-slate-800 hover:bg-slate-300
      dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
    `,

    ghost: `
      bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-100
      dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}