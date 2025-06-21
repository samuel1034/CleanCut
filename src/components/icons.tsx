import type { SVGProps } from 'react';

export function CleanCutLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(var(--primary))" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <path d="M17.5 8.5l-5 2.5-5-2.5" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />
      <path d="M22 7v10" stroke="hsl(var(--accent))" />
    </svg>
  );
}
