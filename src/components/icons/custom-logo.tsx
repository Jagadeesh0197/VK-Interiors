import type { SVGProps } from 'react';

export function CustomLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="M10 20 L30 80 L50 20"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M60 20 L60 80 M60 50 L90 20 M60 50 L90 80"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
