interface ArrowDownProps {
  height?: number;
  width?: number;
  fill?: string;
}

export default function ArrowDown({ height, width, fill }: ArrowDownProps) {
  return (
    <svg
      width={height ?? '20'}
      height={width ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0003 14C9.41693 14 8.83359 13.775 8.39193 13.3333L2.95859 7.89997C2.71693 7.6583 2.71693 7.2583 2.95859 7.01664C3.20026 6.77497 3.60026 6.77497 3.84193 7.01664L9.27526 12.45C9.67526 12.85 10.3253 12.85 10.7253 12.45L16.1586 7.01664C16.4003 6.77497 16.8003 6.77497 17.0419 7.01664C17.2836 7.2583 17.2836 7.6583 17.0419 7.89997L11.6086 13.3333C11.1669 13.775 10.5836 14 10.0003 14Z"
        fill={fill ?? '#B8B8B8'}
      />
    </svg>
  );
}
