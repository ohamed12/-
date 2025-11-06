import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const LogoIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.963 2.286a.75.75 0 00-1.071 1.071L12 4.432V18a.75.75 0 001.5 0V4.432l.081-.081a.75.75 0 00-1.071-1.071L12.963 2.286zM21 4.5A.75.75 0 0021.75 3h-4.5a.75.75 0 000 1.5h4.5zM4.5 3a.75.75 0 00-.75.75v16.5a.75.75 0 001.5 0V4.5A.75.75 0 004.5 3zM21.75 9a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h4.5a.75.75 0 00.75-.75zM21 13.5a.75.75 0 00.75-.75h-4.5a.75.75 0 000 1.5h4.5a.75.75 0 00.75-.75zM21.75 18a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h4.5a.75.75 0 00.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export const TshirtIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
  <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} stroke="#333" strokeWidth="2" d="M10 25 L30 15 L35 20 L30 30 L40 35 L40 85 L60 85 L60 35 L70 30 L65 20 L70 15 L90 25 L80 35 L75 30 L70 40 L60 40 L60 20 L40 20 L40 40 L30 40 L25 30 L20 35 Z" />
  </svg>
);

export const TanktopIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
  <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} stroke="#333" strokeWidth="2" d="M30 10 C30 5, 35 5, 35 10 L40 30 L40 90 L60 90 L60 30 L65 10 C65 5, 70 5, 70 10 L70 20 L65 25 L65 30 L35 30 L35 25 L30 20 Z" />
  </svg>
);

export const PantsIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
  <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} stroke="#333" strokeWidth="2" d="M30 10 L70 10 L70 40 L55 40 L55 90 L70 90 L70 95 L30 95 L30 90 L45 90 L45 40 L30 40 Z" />
  </svg>
);

export const HoodieIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
  <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} stroke="#333" strokeWidth="2" d="M20 30 L35 20 L50 5 L65 20 L80 30 L75 40 L70 35 L70 80 L80 85 L80 90 L20 90 L20 85 L30 80 L30 35 L25 40 Z M40 80 L60 80 L60 85 L40 85 Z M45 20 L55 20 L55 15 L45 15 Z" />
  </svg>
);

export const SweaterIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
    <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} stroke="#333" strokeWidth="2" d="M20 25 L10 35 L10 85 L90 85 L90 35 L80 25 L70 30 L60 20 L40 20 L30 30 Z" />
    </svg>
);

export const PoloShirtIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
    <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} stroke="#333" strokeWidth="2" d="M10 25 L30 15 L35 20 L30 30 L40 35 L40 85 L60 85 L60 35 L70 30 L65 20 L70 15 L90 25 L80 35 L75 30 L70 40 L60 40 L60 25 L52 25 L52 32 L48 32 L48 25 L40 25 L40 40 L30 40 L25 30 L20 35 Z M40 20 L45 28 L50 22 L55 28 L60 20 Z" />
    </svg>
);

export const ShortsIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
    <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} stroke="#333" strokeWidth="2" d="M30 10 L70 10 L70 35 L55 35 L55 60 L70 60 L70 65 L30 65 L30 60 L45 60 L45 35 L30 35 Z" />
    </svg>
);

export const SpinnerIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 13.5a3.375 3.375 0 00-3.375-3.375L12.75 9.75l1.875-1.875a3.375 3.375 0 00-3.375-3.375L9.75 6.125l-1.875 1.875a3.375 3.375 0 00-3.375 3.375L2.25 12l1.875 1.875a3.375 3.375 0 003.375 3.375L9 18.75l1.875-1.875a3.375 3.375 0 003.375-3.375L15.75 12l1.875 1.875a3.375 3.375 0 003.375 3.375L21.75 18l-1.875-1.875a3.375 3.375 0 00-3.375-3.375z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

export const ArrowUturnLeftIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
);

export const ArrowPathIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.691V5.25a2.25 2.25 0 00-2.25-2.25h-4.5a2.25 2.25 0 00-2.25 2.25v6.75m0 0l-3.181-3.183a8.25 8.25 0 0111.664 0l3.181 3.183" />
    </svg>
);

export const PencilIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const LibraryIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ filled = false, ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const MagicWandIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-3.48-3.48l-1.03-1.03a3 3 0 00-4.53 4.53l1.03 1.03a3 3 0 003.48 3.48l1.03 1.03a3 3 0 004.53-4.53l-1.03-1.03z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.47 11.878a3 3 0 00-4.53-4.53l-1.03-1.03a3 3 0 00-3.48 3.48l1.03 1.03a3 3 0 004.53 4.53l1.03 1.03a3 3 0 003.48-3.48l-1.03-1.03z" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
