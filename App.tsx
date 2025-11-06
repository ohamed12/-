import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Step, Fabric, Clothing, Customization, UserInfo, DesignType, Language, Size } from './types';
import { translations } from './translations';
import { generateImagePreview } from './services/geminiService';
import {
  LogoIcon,
  SpinnerIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PencilIcon,
  UploadIcon,
  LibraryIcon,
  SearchIcon,
  HeartIcon,
  PlusIcon,
  MagicWandIcon,
  CloseIcon,
  ArrowUturnLeftIcon,
  ArrowPathIcon,
} from './components/Icons';

const initialCustomization: Customization = {
  fabric: null,
  clothingType: null,
  size: null,
  color: '#ffffff',
  designType: null,
  designValue: null,
  designColor: null,
  baseClothingImageUrl: null,
};

const initialUserInfo: UserInfo = {
    fullName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
};

interface LibraryDesign {
  id: string;
  name: string;
  category: string;
  tags: string[];
  url: string;
}

const initialLibraryDesigns: LibraryDesign[] = [
    { id: 'd1', name: 'Dragon', category: 'Anime', tags: ['dragon', 'fire', 'mythical', 'fantasy', 'beast'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMi4yNWMyLjA5IDAgMy45Ny44NCA1LjMzIDIuMThsLS4zNC4zNGMtMS4yNS0xLjI0LTIuOTMtMi4wMi00Ljk5LTIuMDJzLTMuNzQuNzgtNC45OSAyLjAybC0uMzQtLjM0QzguMDMgMy4wOSA5LjkxIDIuMjUgMTIgMi4yNXptLTcuMDcgNy4wN2wxLjQxIDEuNDFDNy43NiAxMi4xMyA5LjY5IDEzIDEyIDEzYzEuMzggMCAyLjY3LS4zNSA0LjEyLS45N2wxLjQxIDEuNDFDMTUuOTQgMTQuNDggMTQuMDYgMTUgMTIgMTVjLTIuMzEgMC00LjQyLS44Ny02LjA4LTIuMjh6bTEuNzYgMS43NmMyLjIgMi4yIDUuNzggMi4yIDcuOTYgMGwtMS43Ni0xLjc2Yy0xLjM3IDEuMzctMy42MyAxLjM3LTUgMGwtMS4yIDEuMnptMTAuNi0xMC42QzE5Ljc4IDMuMDkgMTguMDkgMi4yNSAxNiAyLjI1Yy0uMzIgMC0uNjMuMDItLjk0LjA1bDEuNDQgMS40NGMuNTguNTggMS4zIDEgMi4wNiAxSDIydi0yLjA2YzAtLjc2LS40Mi0xLjQ4LTEtMi4wNnoiLz48L3N2Zz4=' },
    { id: 'd2', name: 'Soccer', category: 'Sports', tags: ['soccer', 'football', 'ball', 'sport', 'game'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bS0xLTQuNWgwbC0xLjUgMS41aDNsLTEuNS0xLjV6bS0xLjUtMi41bDEuNS0xLjVoMGwxLjUgMS41aC0zeiIvPjwvc3ZnPg==' },
    { id: 'd3', name: 'Rose', category: 'Nature', tags: ['rose', 'flower', 'nature', 'plant', 'love'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMkM4LjQyIDIgNS42OSA0LjQ0IDQuNDQgNy4wOWMtMS4yIDEuNTYtMS45NCAzLjQ4LTEuOTQgNS40MSAwIDIuMzUuOTYgNC41IDEuOTQgNi40MSAxLjI1IDEuNjYgNC4wOCAzLjkyIDcuNTYgMy45MiA0LjQxIDAgNi4zMS0yLjI2IDcuNTYtMy45MiAxLjI1LTEuNjUgMS45NC0zLjU3IDEuOTQtNS40MSAwLTEuOTMtLjczLTMuODUtMS45NC01LjQxQzE4LjMxIDQuNDQgMTUuNTggMiAxMiAyek04LjUgOC41Yy44MyAwIDEuNS42NyAxLjUgMS41cy0uNjcgMS41LTEuNSAxLjUtMS41LS42Ny0xLjUtMS41LjY3LTEuNSAxLjUtMS41em03IDdjLS44MyAwLTEuNS0uNjctMS41LTEuNXMwLTEuNS0xLjUtMS41LTEuNS42Ny0xLjUgMS41LjY3IDEuNSAxLjUgMS41IDEuNS42NyAxLjUgMS41em0wLTdjLS44MyAwLTEuNS0uNjctMS41LTEuNXMwLTEuNS0xLjUtMS41LTEuNS42Ny0xLjUgMS41LjY3IDEuNSAxLjUgMS41IDEuNS42NyAxLjUgMS41em0tMy41IDBjLS44MyAwLTEuNS0uNjctMS41LTEuNXMwLTEuNS0xLjUtMS41LTEuNS42Ny0xLjUgMS41LjY3IDEuNSAxLjUgMS41em0tMy41LTdjLS44MyAwLTEuNS0uNjctMS41LTEuNXMwLTEuNS0xLjUtMS41LTEuNS42Ny0xLjUgMS41LjY3IDEuNSAxLjUgMS41eiIvPjwvc3ZnPg==' },
    { id: 'd4', name: 'Future', category: 'Typography', tags: ['future', 'text', 'quote', 'slogan', 'modern'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPjx0ZXh0IHg9IjEwMCIgeT0iMjUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9ImN1cnJlbnRDb2xvciI+RlVUVVJNPC90ZXh0Pjwvc3ZnPg==' },
    { id: 'd5', name: 'Abstract Eye', category: 'Artistic', tags: ['eye', 'abstract', 'art', 'vision', 'surreal'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgNC41QzcgNC41IDIuNzMgNy42MSAxIDEyYzEuNzMgNC4zOSA2IDcuNSA١١IDcuNSA1IDAgOS4yNy0zLjExIDExLTcuNUMyMS4yNyA3LjYxIDE3IDQuNSAxMiA0LjV6bTAgMTIuNUM5LjUgMTcgNyAxNC41IDcgMTJzMi41LTUgNS01IDUgMi41IDUgNS0yLjUgNS01IDV6bTAtOGMtMS4zOCAwLTIuNSAxLjEyLTIuNSAyLjVzMS4xMiAyLjUgMi41IDIuNSAyLjUtMS4xMiAyLjUtMi41LTEuMTItMi41LTIuNS0yLjV6IiAvPjwvc3ZnPg==' },
    { id: 'd6', name: 'Ninja', category: 'Anime', tags: ['ninja', 'anime', 'manga', 'warrior', 'japan'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMy41IDEwLjVMOCA2bDMuNSA0LjUtMy41IDQuNUw4IDE0bDMuNS00LjV6bTggMGw0LjUgNC41TDIwIDEwbC00LjUtNC41TDE2IDhsMy41IDQuNXoiLz48L3N2Zz4=' },
    { id: 'd7', name: 'Basketball', category: 'Sports', tags: ['basketball', 'hoops', 'ball', 'sport', 'game'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTMuNTIgMTIuNDhjLTEuMjMtMS4yMy0xLjU4LTMuMDUtLjkzLTQuNTlsMy4wMiAzLjAyYy0xLjU0LjY1LTMuMzYgLjMtNC41OS0uOTN6bTcuMDQtNC45NmMyLjM0LTIuMzQgMi4zNC02LjE0IDAtOC40OHMtNi4xNC0yLjM0LTguNDggMC0yLjM0IDYuMTQgMCA4LjQ4IDYuMTQgMi4zNCA4LjQ4IDB6bS0zLjUyIDIuNDhjLjY1LDEuNTQuMywzLjM2LS45Myw0LjU5bDMuMDIgMy4wMmMxLjU0LS42NSAyLjI5LTIuNDcgMS42NC00LjAybC0zLjczLTMuNTl6Ii8+PC9zdmc+' },
    { id: 'd8', name: 'Oak Leaf', category: 'Nature', tags: ['leaf', 'oak', 'tree', 'nature', 'forest'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMi4yNWMtMi4yMSAwLTQuMjEuODktNS42NiAyLjM0QzQuODkgNi4wNSAyLjI1IDguMiAyLjI1IDEyYzAgMi4yMS44OSA0LjIxIDIuMzQgNS42NkM2LjA1IDE5LjExIDguMiAyMS43NSAxMiAyMS43NWMzLjc5IDAgNS45NS0yLjY0IDcuNDEtNC4wOUMyMS4xMSAxNi4yMSAyMi43NSAxNC4yMSAyMi43NSAxMmMwLTMuNzktMi42NC01Ljk1LTQuMDktNy40MXoiLz48L3N2Zz4=' },
    { id: 'd9', name: 'Stay True', category: 'Typography', tags: ['stay true', 'quote', 'text', 'motivation', 'slogan'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPjx0ZXh0IHg9IjEwMCIgeT0iMjUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXN0eWxlPSJpdGFsaWMiIGZvbnQtc2l6ZT0iMjYiIGZpbGw9ImN1cnJlbnRDb2xvciI+U3RheSBUcnVlPC90ZXh0Pjwvc3ZnPg==' },
    { id: 'd10', name: 'Saturn', category: 'Nature', tags: ['saturn', 'planet', 'space', 'galaxy', 'science'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOC04IDh6bS02LTEwYy0xLjY2IDAtMyAxLjM0LTMgM3MxLjM0IDMgMyAzIDMtMS4zNCAzLTMtMS4zNC0zLTMtM3ptMTIgMGMtMS42NiAwLTMgMS4zNC0zIDNzMS4zNCAzIDMgMyAzLTEuMzQgMy0zLTEuMzQtMy0zLTN6Ii8+PC9zdmc+' },
    { id: 'd11', name: 'Graffiti', category: 'Artistic', tags: ['graffiti', 'street art', 'spray paint', 'urban', 'art'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMmMtNC40MiAwLTggMy41OC04IDhzMy41OCA4IDggOCAzLjU4IDggOCAzLjU4IDggOC0zLjU4IDgtOC04em0tMi41IDEyLjVMNyAxMS43NWwxLjUtMS41IDIgMiAyLTItMS41LTEuNWwxLjI1IDEuMjUgMS4yNS0xLjI1TDE3IDEzLjI1bC0yLjUgMi41eiIvPjwvc3ZnPg==' },
    { id: 'd12', name: 'Samurai', category: 'Anime', tags: ['samurai', 'warrior', 'japan', 'katana', 'anime'], url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNCA0aDJ2MTRINGw4IDgtOCA4eiIvPjxwYXRoIGQ9Ik0yMCA0aC0ydjE十四章DJsLTggOC04LTh6Ii8+PC9zdmc+' },
];


const WelcomeScreen: React.FC<{ onSelectLanguage: (lang: Language) => void }> = ({ onSelectLanguage }) => {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen text-center p-4 animate-fade-in">
      <div className="max-w-md w-full">
        <LogoIcon className="h-16 w-16 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome to My Style
        </h1>
        <p className="text-gray-600 mb-10">
          Design your own clothes easily and preview them in real life before ordering.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => onSelectLanguage(Language.AR)}
            className="w-full bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            العربية
          </button>
          <button
            onClick={() => onSelectLanguage(Language.FR)}
            className="w-full bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Français
          </button>
          <button
            onClick={() => onSelectLanguage(Language.EN)}
            className="w-full bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};


const StepIndicator: React.FC<{ currentStep: Step }> = ({ currentStep }) => {
  const steps = [
    { id: Step.Fabric, name: 'Fabric' },
    { id: Step.Clothing, name: 'Type' },
    { id: Step.Color, name: 'Color' },
    { id: Step.Design, name: 'Design' },
    { id: Step.Preview, name: 'Preview' },
    { id: Step.UserInfo, name: 'Details' },
  ];

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {currentStep > step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <span className="relative flex h-8 w-8 items-center justify-center bg-blue-600 rounded-full">
                   <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                </span>
              </>
            ) : currentStep === step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <span className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-blue-600 rounded-full" aria-current="step">
                  <span className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
                </span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <span className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-gray-300 rounded-full"></span>
              </>
            )}
            <span className="absolute -bottom-6 text-xs font-medium text-gray-500 w-max -translate-x-1/2 left-1/2">{step.name}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const getDefaultTransform = (clothingType: Clothing) => {
    switch (clothingType) {
        case Clothing.Tshirt:
        case Clothing.Tanktop:
        case Clothing.PoloShirt:
            return { x: 200, y: 150, scale: 1, rotation: 0 }; // Center chest
        case Clothing.Hoodie:
            return { x: 200, y: 120, scale: 0.9, rotation: 0 }; // Upper chest
        case Clothing.Pants:
        case Clothing.Shorts:
            return { x: 150, y: 100, scale: 0.8, rotation: 0 }; // Upper thigh
        default:
            return { x: 200, y: 150, scale: 1, rotation: 0 };
    }
};

export default function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [screen, setScreen] = useState<'home' | 'customize'>('home');
  const [step, setStep] = useState<Step>(Step.Fabric);
  const [customization, setCustomization] = useState<Customization>(initialCustomization);
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  
  const [designs, setDesigns] = useState<LibraryDesign[]>([]);

  useEffect(() => {
    try {
      const savedDesigns = localStorage.getItem('myStyleDesigns');
      if (savedDesigns) {
        setDesigns(JSON.parse(savedDesigns));
      } else {
        setDesigns(initialLibraryDesigns);
        localStorage.setItem('myStyleDesigns', JSON.stringify(initialLibraryDesigns));
      }
    } catch (error) {
        console.error("Failed to load or parse designs from localStorage", error);
        setDesigns(initialLibraryDesigns);
    }
  }, []);

  const updateDesigns = (newDesigns: LibraryDesign[]) => {
      setDesigns(newDesigns);
      localStorage.setItem('myStyleDesigns', JSON.stringify(newDesigns));
  }


  const updateCustomization = (update: Partial<Customization>) => {
    setCustomization((prev) => ({ ...prev, ...update }));
  };
  
  const updateUserInfo = (update: Partial<UserInfo>) => {
    setUserInfo((prev) => ({ ...prev, ...update }));
  };

  const nextStep = () => setStep((prev) => (prev < Step.UserInfo ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > Step.Fabric ? prev - 1 : prev));

  const handleStart = () => setScreen('customize');

  const handleChangeDesign = () => {
    setPreviewImageUrl(null);
    setPreviewError(null);
    // Reset base image URL when changing design to force regeneration if needed
    updateCustomization({ baseClothingImageUrl: null });
    setStep(Step.Design);
  };

  const handleProceedToUserInfo = () => setStep(Step.UserInfo);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!userInfo.fullName || !userInfo.lastName || !userInfo.email || !userInfo.address || !userInfo.phone) {
      setFormError("Please fill out all required fields marked with *.");
      return;
    }
    setIsSubmitting(true);
    
    const t = translations[language!];
    const emailBody = `
    --- SIMULATED EMAIL TO ADMIN ---
    ${t.orderSubmissionEmailRecipient}
    Subject: New Custom Order - MyStyle

    A new order has been placed.

    --- Customer Details ---
    Full Name: ${userInfo.fullName} ${userInfo.lastName}
    Phone: ${userInfo.phone}
    Email: ${userInfo.email}
    Address: ${userInfo.address}
    Notes: ${userInfo.notes || 'N/A'}

    --- Customization Details ---
    Clothing Type: ${customization.clothingType} (${customization.size})
    Fabric: ${customization.fabric}
    Color: ${customization.color}
    Design Type: ${customization.designType}

    --- Assets ---
    A) Original uploaded design (if any) is attached or included below.
    B) Final AI-Generated Preview is attached (see URL below).
  `;

    console.log(t.orderSubmissionEmailTitle);
    console.log(emailBody);
    if (customization.designType === 'Upload' && customization.designValue) {
      console.log("Original Uploaded Design Data (Base64):", customization.designValue); // The base64 is now the composite, but for simulation it's fine.
    }
    console.log("Final Preview URL:", previewImageUrl);


    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setOrderComplete(true);
  };

  const handleReturnHome = () => {
    setOrderComplete(false);
    setScreen('home');
    setCustomization(initialCustomization);
    setUserInfo(initialUserInfo);
    setStep(Step.Fabric);
    setFormError(null);
    setPreviewImageUrl(null);
    setPreviewError(null);
  };
    
  const handleGeneratePreview = useCallback(async () => {
    if (!customization.fabric || !customization.clothingType || previewImageUrl) return;

    setIsGeneratingPreview(true);
    setPreviewError(null);
    setPreviewImageUrl(null); // Reset previous preview

    try {
      const imageUrl = await generateImagePreview(customization);
      setPreviewImageUrl(imageUrl);
    } catch (e) {
      setPreviewError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsGeneratingPreview(false);
    }
  }, [customization, previewImageUrl]);


  const renderStepContent = () => {
    const t = translations[language!];
    switch (step) {
      case Step.Fabric:
        return <FabricStep onSelect={(fabric) => { updateCustomization({ fabric }); nextStep(); }} />;
      case Step.Clothing:
        return <ClothingStep 
            customization={customization} 
            onUpdate={updateCustomization} 
            onNext={nextStep} 
            language={language!} 
        />;
      case Step.Color:
        return <ColorStep color={customization.color} onSelect={(color) => updateCustomization({ color })} onNext={nextStep} />;
      case Step.Design:
        return <DesignStep 
            onUpdate={updateCustomization}
            onNext={nextStep}
            language={language!}
            customization={customization}
            designs={designs}
            onUpdateDesigns={updateDesigns}
            />;
      case Step.Preview:
        return <PreviewStep 
            customization={customization} 
            onChangeDesign={handleChangeDesign}
            onConfirm={handleProceedToUserInfo} 
            onGeneratePreview={handleGeneratePreview}
            isLoading={isGeneratingPreview}
            error={previewError}
            previewImageUrl={previewImageUrl}
            language={language!}
            />;
      case Step.UserInfo:
        return <UserInfoStep userInfo={userInfo} setUserInfo={updateUserInfo} onSubmit={handleSubmitOrder} isLoading={isSubmitting} error={formError} />;
      default:
        return null;
    }
  };
  
  const header = (
    <header className="py-4 px-6 flex items-center justify-center bg-white shadow-sm">
        <LogoIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 ml-2">MyStyle</h1>
    </header>
  );

  if (!language) {
    return <WelcomeScreen onSelectLanguage={setLanguage} />;
  }
  
  if (screen === 'home') {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {header}
        <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">{translations[language].homeTitle}</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
                {translations[language].homeDescription}
            </p>
            <button
                onClick={handleStart}
                className="bg-blue-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
            >
                {translations[language].startButton}
            </button>
        </main>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {header}
        <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Order Submitted!</h2>
          <p className="text-lg text-gray-600 max-w-xl mb-8">Thank you for your purchase. A confirmation of your order has been (simulated) sent to the administrator.</p>
          <button onClick={handleReturnHome} className="bg-blue-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
            Create Another Design
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {header}
        <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <div className="mb-16 mt-4">
                    <StepIndicator currentStep={step} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 min-h-[400px] flex flex-col">
                    {step > Step.Fabric && step < Step.Preview && (
                         <button onClick={prevStep} className="self-start text-sm text-gray-500 hover:text-gray-800 mb-4">&larr; {translations[language].backButton}</button>
                    )}
                     {step === Step.UserInfo && (
                         <button onClick={() => setStep(Step.Preview)} className="self-start text-sm text-gray-500 hover:text-gray-800 mb-4">&larr; Back to Preview</button>
                    )}
                    <div className="flex-grow flex flex-col justify-center">
                      {renderStepContent()}
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

// --- Step Components ---

const OptionCard: React.FC<{ label: string; onClick: () => void; }> = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
    >
        <span className="text-lg font-semibold text-gray-700">{label}</span>
    </button>
);

const FabricStep: React.FC<{ onSelect: (fabric: Fabric) => void }> = ({ onSelect }) => (
    <div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">1. Choose your Fabric</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.values(Fabric).map(f => <OptionCard key={f} label={f} onClick={() => onSelect(f)} />)}
        </div>
    </div>
);

const ClothingImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    if (error) {
        return (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-center p-2">
                <span className="text-xs text-gray-500">No image available</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-center"
            onError={handleError}
            loading="lazy"
        />
    );
};

const ClothingStep: React.FC<{
    customization: Customization;
    onUpdate: (update: Partial<Customization>) => void;
    onNext: () => void;
    language: Language;
}> = ({ customization, onUpdate, onNext, language }) => {
    const t = translations[language];
    const isContinueDisabled = !customization.clothingType || !customization.size;

    const clothingOptions = [
        { type: Clothing.Tshirt, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' },
        { type: Clothing.Tanktop, imageUrl: 'https://images.pexels.com/photos/14469831/pexels-photo-14469831.jpeg' },
        { type: Clothing.Hoodie, imageUrl: 'https://images.pexels.com/photos/16647787/pexels-photo-16647787.jpeg' },
        { type: Clothing.Pants, imageUrl: 'https://images.pexels.com/photos/6311417/pexels-photo-6311417.jpeg' },
        { type: Clothing.PoloShirt, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27' },
        { type: Clothing.Shorts, imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b' },
    ];

    const sizeOptions = Object.values(Size);

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t.selectClothingTypeTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {clothingOptions.map(({ type, imageUrl }) => (
                    <button
                        key={type}
                        onClick={() => onUpdate({ clothingType: type })}
                        className={`flex flex-col items-center justify-between p-4 border-2 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 ${
                            customization.clothingType === type
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                                : 'border-gray-200 bg-white'
                        }`}
                    >
                        <div className="w-24 h-24 mb-2 flex items-center justify-center bg-white rounded-md overflow-hidden">
                           <ClothingImage src={imageUrl} alt={type} />
                        </div>
                        <span className="font-bold text-gray-800 mt-2">{type}</span>
                    </button>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t.selectSizeTitle}</h2>
            <div className="flex justify-center flex-wrap gap-3 mb-10">
                {sizeOptions.map(size => (
                    <button
                        key={size}
                        onClick={() => onUpdate({ size })}
                        className={`w-14 h-14 flex items-center justify-center font-bold border-2 rounded-full shadow-sm transition-all duration-200 transform hover:scale-110 ${
                             customization.size === size
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            <div className="flex justify-center">
                 <button
                    onClick={onNext}
                    disabled={isContinueDisabled}
                    className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-12 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                    {t.continueButton}
                </button>
            </div>
        </div>
    );
};


const ColorStep: React.FC<{ color: string, onSelect: (color: string) => void; onNext: () => void }> = ({ color, onSelect, onNext }) => {
  const colors = ['#FF0000', '#000000', '#FFFFFF', '#0000FF', '#008000', '#FFFF00', '#FFA500'];
  return (
    <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">3. Pick a Color</h2>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {colors.map(c => (
                <button key={c} onClick={() => onSelect(c)}
                    className={`w-12 h-12 rounded-full border-2 transition-transform transform hover:scale-110 ${color === c ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                />
            ))}
        </div>
        <div className="flex justify-center gap-2 items-center mb-8">
            <label htmlFor="custom-color" className="font-medium text-gray-700">Custom:</label>
            <input
                id="custom-color"
                type="color"
                value={color}
                onChange={(e) => onSelect(e.target.value)}
                className="w-12 h-12 p-0 border-none rounded-md cursor-pointer"
            />
        </div>
        <button onClick={onNext} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-12 rounded-full hover:bg-blue-700 transition">
            Continue
        </button>
    </div>
  );
};

const DesignStep: React.FC<{
    onUpdate: (update: Partial<Customization>) => void;
    onNext: () => void;
    language: Language;
    customization: Customization;
    designs: LibraryDesign[];
    onUpdateDesigns: (designs: LibraryDesign[]) => void;
}> = ({ onUpdate, onNext, language, customization, designs, onUpdateDesigns }) => {
    const t = translations[language];
    const [subStep, setSubStep] = useState<'select' | 'manual' | 'text' | 'upload' | 'ai' | 'camera' | 'edit-upload' | 'library'>('select');
    const [inputValue, setInputValue] = useState('');
    const [rawUpload, setRawUpload] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState<LibraryDesign | null>(null);
    const [isPreparingEditor, setIsPreparingEditor] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const proceedToEditor = async (designDataUrl: string, designColor: string) => {
      setIsPreparingEditor(true);
      setError(null);
      try {
        const baseImage = await generateImagePreview({
          ...customization,
          designType: DesignType.None,
          designValue: null,
        });
        onUpdate({ baseClothingImageUrl: baseImage, designColor });
        setRawUpload(designDataUrl);
        setSubStep('edit-upload');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to prepare editor.');
      } finally {
        setIsPreparingEditor(false);
      }
    };

    const handleSelect = (type: DesignType) => {
        if (type === DesignType.None) {
            onUpdate({ designType: DesignType.None, designValue: null });
            onNext();
        } else if (type === DesignType.Text) {
            setSubStep('text');
        } else if (type === DesignType.Upload) {
            setSubStep('upload');
        } else if (type === DesignType.AI) {
            setSubStep('ai');
        }
    };

    const handleContinueTextOrAI = () => {
        if (!inputValue.trim()) {
            setError('Please provide a description or text.');
            return;
        }
        setError(null);
        const designType = subStep === 'text' ? DesignType.Text : DesignType.AI;
        onUpdate({ designType, designValue: inputValue, designColor: '#000000' });
        onNext();
    };

    const handlePlacementConfirm = (compositedImage: string) => {
        onUpdate({ designType: DesignType.Upload, designValue: compositedImage });
        onNext();
    };

    const handleBackToSelect = () => { setSubStep('select'); resetInputs(); };
    const handleBackToManual = () => { setSubStep('manual'); resetInputs(); };
    const handleBackToUpload = () => { setSubStep('upload'); resetInputs(); };

    const resetInputs = () => {
        setInputValue('');
        setRawUpload(null);
        setError(null);
        setSelectedDesign(null);
        onUpdate({ baseClothingImageUrl: null });
    };

    const handleFileTrigger = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setError("File is too large. Please upload an image under 10MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    proceedToEditor(result, '#000000');
                    setError(null);
                }
            };
            reader.onerror = () => setError("Failed to read the file.");
            reader.readAsDataURL(file);
        }
    };

    const handleDesignSelect = (design: LibraryDesign) => {
        setSelectedDesign(design);
        setIsColorModalOpen(true);
    };

    const handleColorConfirm = (color: string) => {
        if (!selectedDesign) return;
        
        setIsColorModalOpen(false);
    
        const base64Svg = selectedDesign.url.split(',')[1];
        if (!base64Svg) {
            setError("Invalid design format in library.");
            return;
        }
    
        try {
            const svgString = atob(base64Svg);
            const coloredSvgString = svgString.replace(/currentColor/g, color);
            const coloredSvgDataUrl = 'data:image/svg+xml;base64,' + btoa(coloredSvgString);
            
            proceedToEditor(coloredSvgDataUrl, color);
        } catch (e) {
            console.error("Error processing SVG:", e);
            setError("Could not process the selected design.");
        }
    };
    
    if (isPreparingEditor) {
        return (
            <div className="flex flex-col items-center justify-center text-center h-full">
                <SpinnerIcon className="animate-spin h-12 w-12 text-blue-600 mb-4" />
                <p className="font-semibold text-gray-700">Preparing the design editor...</p>
                <p className="text-sm text-gray-500">This might take a moment.</p>
            </div>
        )
    }

    return (
      <>
        <ColorPickerModal
            isOpen={isColorModalOpen}
            onClose={() => setIsColorModalOpen(false)}
            onConfirm={handleColorConfirm}
            language={language}
        />
        <div className="transition-all duration-300">
            {subStep === 'select' && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.designStepTitle}</h2>
                    <p className="text-gray-500 mb-8">{t.designStepSubtitle}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <DesignOptionButton icon={ArrowRightIcon} label={t.designSkipLabel} description={t.designSkipDescription} onClick={() => handleSelect(DesignType.None)} />
                        <DesignOptionButton icon={PencilIcon} label={t.designManualLabel} description={t.designManualDescription} onClick={() => setSubStep('manual')} />
                        <DesignOptionButton icon={SparklesIcon} label={t.designAILabel} description={t.designAIDescription} onClick={() => handleSelect(DesignType.AI)} />
                        <DesignOptionButton icon={LibraryIcon} label={t.designLibraryLabel} description={t.designLibraryDescription} onClick={() => setSubStep('library')} />
                    </div>
                </div>
            )}

            {subStep === 'library' && (
                <DesignLibrary 
                    onSelect={handleDesignSelect}
                    onBack={handleBackToSelect} 
                    language={language}
                    designs={designs}
                    onUpdateDesigns={onUpdateDesigns}
                />
            )}

            {subStep === 'manual' && (
                <div className="text-center">
                    <button onClick={handleBackToSelect} className="self-start text-sm text-gray-500 hover:text-gray-800 mb-4 float-left">&larr; {t.backButton}</button>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 pt-4">{t.designManualTitle}</h2>
                    <p className="text-gray-500 mb-8">{t.designManualSubtitle}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DesignOptionButton icon={PencilIcon} label={t.designManualTextButton} description="" onClick={() => handleSelect(DesignType.Text)} />
                        <DesignOptionButton icon={UploadIcon} label={t.designManualUploadButton} description="" onClick={() => handleSelect(DesignType.Upload)} />
                    </div>
                </div>
            )}

            {subStep === 'upload' && (
                <div>
                    <button onClick={handleBackToManual} className="self-start text-sm text-gray-500 hover:text-gray-800 mb-4">&larr; {t.backButton}</button>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.designUploadTitle}</h2>
                        <p className="text-gray-500 mb-8">{t.designUploadSubtitle}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DesignOptionButton icon={UploadIcon} label={t.designUploadFromDevice} description="" onClick={handleFileTrigger} />
                            <DesignOptionButton icon={PencilIcon} label={t.designUploadFromCamera} description="" onClick={() => setSubStep('camera')} />
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp, image/svg+xml" className="hidden" />
                        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                    </div>
                </div>
            )}

            {subStep === 'camera' && (
                <CameraCapture onCapture={(image) => { proceedToEditor(image, '#000000'); }} onBack={handleBackToUpload} />
            )}
            
            {subStep === 'edit-upload' && rawUpload && (
                <div>
                    <button onClick={handleBackToUpload} className="self-start text-sm text-gray-500 hover:text-gray-800 mb-4">&larr; {t.backButton}</button>
                    <DesignEditor 
                        clothingType={customization.clothingType!} 
                        baseClothingImageUrl={customization.baseClothingImageUrl}
                        designImage={rawUpload}
                        onConfirm={handlePlacementConfirm}
                        language={language}
                        onChangeColor={() => setIsColorModalOpen(true)}
                        onBackToLibrary={handleBackToSelect}
                    />
                </div>
            )}
            
            {(subStep === 'ai' || subStep === 'text') && (
                <div>
                    <button onClick={subStep === 'ai' ? handleBackToSelect : handleBackToManual} className="self-start text-sm text-gray-500 hover:text-gray-800 mb-4">&larr; {t.backButton}</button>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{subStep === 'text' ? t.designTextTitle : t.designAITitle}</h2>
                        <p className="text-gray-500 mb-6">{subStep === 'text' ? t.designTextSubtitle : t.designAISubtitle}</p>
                        <div className="bg-gray-50 p-6 rounded-lg border">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={subStep === 'text' ? t.designTextPlaceholder : t.designAIPlaceholder}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                        <div className="mt-6">
                            <button onClick={handleContinueTextOrAI} disabled={!inputValue} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-12 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition">
                                {t.continueButton}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </>
    );
};

const DesignOptionButton: React.FC<{ icon: React.FC<React.SVGProps<SVGSVGElement>>, label: string, description: string, onClick: () => void }> = ({ icon: Icon, label, description, onClick }) => (
    <button onClick={onClick} className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 flex flex-col items-center justify-start h-full">
        <Icon className="w-10 h-10 text-blue-600 mb-3" />
        <span className="text-lg font-semibold text-gray-800">{label}</span>
        {description && <span className="text-sm text-gray-500 mt-1">{description}</span>}
    </button>
);


const PreviewStep: React.FC<{ 
    customization: Customization, 
    onChangeDesign: () => void, 
    onConfirm: () => void,
    onGeneratePreview: () => void,
    isLoading: boolean,
    error: string | null,
    previewImageUrl: string | null,
    language: Language
}> = ({ customization, onChangeDesign, onConfirm, onGeneratePreview, isLoading, error, previewImageUrl, language }) => {
    const t = translations[language];
    useEffect(() => {
        if(!previewImageUrl && !isLoading && !error) {
            onGeneratePreview();
        }
    }, [onGeneratePreview, previewImageUrl, isLoading, error]);
    
    const renderPreview = () => {
        if (isLoading) {
            return (
                <div className="w-full max-w-sm mx-auto aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center p-4">
                    <SpinnerIcon className="animate-spin h-12 w-12 text-blue-600 mb-4" />
                    <p className="font-semibold text-gray-700">Generating your realistic preview...</p>
                    <p className="text-sm text-gray-500">This might take a moment.</p>
                </div>
            )
        }

        if (error) {
            return (
                <div className="w-full max-w-sm mx-auto aspect-square bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center text-center p-4">
                    <p className="font-semibold text-red-700 mb-2">Generation Failed</p>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )
        }

        if (previewImageUrl) {
            return (
                 <div className="w-full max-w-sm mx-auto aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
                    <img src={previewImageUrl} alt="Realistic preview of customized clothing" className="w-full h-full object-cover" />
                 </div>
            )
        }
        
        return null;
    }

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.previewTitle}</h2>
            <div className="mb-6 min-h-[350px] flex items-center justify-center">
                {renderPreview()}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={onChangeDesign} className="w-full sm:w-auto border-2 border-gray-600 text-gray-800 font-bold py-3 px-12 rounded-full hover:bg-gray-100 transition">
                    🖼️ {t.changeDesignButton}
                </button>
                <button onClick={onConfirm} disabled={isLoading || !!error || !previewImageUrl} className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-12 rounded-full hover:bg-green-700 transition disabled:bg-gray-400">
                    ✅ {t.confirmButton}
                </button>
            </div>
        </div>
    );
};

const UserInfoStep: React.FC<{userInfo: UserInfo, setUserInfo: (update: Partial<UserInfo>) => void, onSubmit: (e: React.FormEvent) => void, isLoading: boolean, error: string | null}> = ({ userInfo, setUserInfo, onSubmit, isLoading, error }) => (
    <div className="w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">6. Your Details</h2>
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input type="text" id="fullName" value={userInfo.fullName} onChange={e => setUserInfo({ fullName: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                    <input type="text" id="lastName" value={userInfo.lastName} onChange={e => setUserInfo({ lastName: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input type="email" id="email" value={userInfo.email} onChange={e => setUserInfo({ email: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input type="tel" id="phone" value={userInfo.phone} onChange={e => setUserInfo({ phone: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address *</label>
                <textarea id="address" value={userInfo.address} onChange={e => setUserInfo({ address: e.target.value })} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea id="notes" value={userInfo.notes} onChange={e => setUserInfo({ notes: e.target.value })} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="pt-4">
                 <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-12 rounded-full hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center justify-center">
                    {isLoading ? <SpinnerIcon className="animate-spin h-6 w-6" /> : 'Submit Order'}
                </button>
            </div>
        </form>
    </div>
);


// --- New Inner Components for Design Step ---

const CameraCapture: React.FC<{ onCapture: (imageDataUrl: string) => void, onBack: () => void }> = ({ onCapture, onBack }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (active && videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    setStream(mediaStream);
                }
            } catch (err) {
                console.error("Camera error:", err);
                setError("Could not access camera. Please check permissions.");
            }
        };
        startCamera();
        return () => {
            active = false;
            stream?.getTracks().forEach(track => track.stop());
        }
    }, []);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            onCapture(canvas.toDataURL('image/jpeg'));
        }
    };

    return (
        <div className="flex flex-col items-center">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <video ref={videoRef} autoPlay playsInline className="w-full max-w-md rounded-lg shadow-md mb-4 bg-gray-900" />
            )}
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-4">
                <button onClick={onBack} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition">Back</button>
                <button onClick={handleCapture} disabled={!!error} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition disabled:bg-gray-400">Take Photo</button>
            </div>
        </div>
    );
};

const ControlsPanel: React.FC<{
    t: any;
    scale: number;
    rotation: number;
    onScaleChange: (value: number) => void;
    onRotationChange: (value: number) => void;
    onResetScale: () => void;
    onResetRotation: () => void;
}> = ({ t, scale, rotation, onScaleChange, onRotationChange, onResetScale, onResetRotation }) => {
    return (
        <div className="
            fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm
            md:fixed md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-4 md:bottom-auto md:w-64 md:translate-x-0
            bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 z-30 transition-all
        ">
            <div className="space-y-4">
                {/* Size Control */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">{t.size}</label>
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            {(scale * 100).toFixed(0)}%
                        </span>
                        <button onClick={onResetScale} title="Reset size" className="text-gray-500 hover:text-blue-600 p-1">
                            <ArrowPathIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.01"
                        value={scale}
                        onChange={(e) => onScaleChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                {/* Rotation Control */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">{t.rotation}</label>
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            {rotation.toFixed(0)}°
                        </span>
                        <button onClick={onResetRotation} title="Reset rotation" className="text-gray-500 hover:text-blue-600 p-1">
                            <ArrowPathIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <input
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        value={rotation}
                        onChange={(e) => onRotationChange(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

const DesignEditor: React.FC<{
    clothingType: Clothing;
    baseClothingImageUrl: string | null | undefined;
    designImage: string;
    onConfirm: (compositedImage: string) => void;
    language: Language;
    onChangeColor: () => void;
    onBackToLibrary: () => void;
}> = ({ clothingType, baseClothingImageUrl, designImage, onConfirm, language, onChangeColor, onBackToLibrary }) => {
    const t = translations[language];

    const defaultTransform = useMemo(() => getDefaultTransform(clothingType), [clothingType]);

    const [transform, setTransform] = useState(defaultTransform);
    const editorRef = useRef<HTMLDivElement>(null);
    const isInteracting = useRef<{ type: 'drag' | null, startX: number, startY: number }>({ type: null, startX: 0, startY: 0 });
    
    useEffect(() => {
        setTransform(defaultTransform);
    }, [clothingType, defaultTransform]);
    
    const handleInteractionStart = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        isInteracting.current = { type: 'drag', startX: e.clientX, startY: e.clientY };
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handlePointerMove = (e: PointerEvent) => {
        if (isInteracting.current.type !== 'drag') return;
        const dx = e.clientX - isInteracting.current.startX;
        const dy = e.clientY - isInteracting.current.startY;

        setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
        
        isInteracting.current.startX = e.clientX;
        isInteracting.current.startY = e.clientY;
    };

    const handlePointerUp = () => {
        isInteracting.current.type = null;
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
    };

    const handleConfirm = () => {
        if (!baseClothingImageUrl || !editorRef.current) return;
    
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        const baseImg = new Image();
        baseImg.onload = () => {
            canvas.width = baseImg.naturalWidth;
            canvas.height = baseImg.naturalHeight;
            ctx.drawImage(baseImg, 0, 0);
    
            const designImg = new Image();
            designImg.onload = () => {
                const editorWidth = editorRef.current!.clientWidth;
                const scaleFactor = baseImg.naturalWidth / editorWidth;
                
                const scaledX = transform.x * scaleFactor;
                const scaledY = transform.y * scaleFactor;
                
                const baseDesignWidthInEditor = 100;
                const designWidthInImage = baseDesignWidthInEditor * transform.scale * scaleFactor;
                const designHeightInImage = (designWidthInImage / designImg.naturalWidth) * designImg.naturalHeight;
                
                ctx.save();
                ctx.translate(scaledX + designWidthInImage / 2, scaledY + designHeightInImage / 2);
                ctx.rotate(transform.rotation * Math.PI / 180);
                ctx.drawImage(designImg, -designWidthInImage / 2, -designHeightInImage / 2, designWidthInImage, designHeightInImage);
                ctx.restore();
                
                onConfirm(canvas.toDataURL('image/png'));
            };
            designImg.src = designImage;
        };
        baseImg.crossOrigin = "anonymous";
        baseImg.src = baseClothingImageUrl;
    };
    
    if (!baseClothingImageUrl) {
      return (
          <div className="w-full max-w-[500px] aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center">
              <SpinnerIcon className="animate-spin h-8 w-8 text-blue-600" />
          </div>
      )
    }

    return (
        <div className="flex flex-col items-center w-full pb-32 md:pb-0">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.designEditTitle}</h2>
                <p className="text-gray-500">{t.designEditSubtitle}</p>
            </div>
            <div ref={editorRef} className="w-full max-w-[500px] aspect-square bg-gray-100 rounded-lg relative overflow-hidden touch-none border">
                <button
                    onClick={() => setTransform(defaultTransform)}
                    className="absolute top-2 right-2 z-20 bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white p-2 rounded-full transition shadow"
                    aria-label="Reset position"
                    title="Reset position and size"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                </button>
                <img src={baseClothingImageUrl} alt="Clothing background" className="w-full h-full object-cover" draggable="false" />
                <div 
                    onPointerDown={handleInteractionStart}
                    className="absolute cursor-move border-2 border-dashed border-blue-500/50 bg-white/10 z-10"
                    style={{
                        top: transform.y, left: transform.x,
                        width: `calc(100px * ${transform.scale})`, height: `calc(100px * ${transform.scale})`,
                        transform: `rotate(${transform.rotation}deg)`,
                        transformOrigin: 'center center',
                        touchAction: 'none',
                    }}
                >
                    <img src={designImage} className="w-full h-full object-contain" draggable="false" />
                </div>
            </div>
            <ControlsPanel
                t={t}
                scale={transform.scale}
                rotation={transform.rotation}
                onScaleChange={(scale) => setTransform(t => ({ ...t, scale }))}
                onRotationChange={(rotation) => setTransform(t => ({ ...t, rotation }))}
                onResetScale={() => setTransform(t => ({ ...t, scale: defaultTransform.scale }))}
                onResetRotation={() => setTransform(t => ({ ...t, rotation: defaultTransform.rotation }))}
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-[500px]">
                <button onClick={onChangeColor} className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition">
                    {t.changeColorButton}
                </button>
                <button onClick={onBackToLibrary} className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition">
                    {t.changeDesignButton}
                </button>
            </div>
            <button onClick={handleConfirm} className="mt-4 w-full max-w-[500px] bg-blue-600 text-white font-bold py-3 px-12 rounded-full hover:bg-blue-700 transition">
                {t.confirmPlacementButton}
            </button>
        </div>
    );
};

// --- START: Revamped Design Library ---

const designCategories = [
    { key: 'All', t: 'categoryAll' },
    { key: 'Favorites', t: 'categoryFavorites' },
    { key: 'Anime', t: 'categoryAnime' },
    { key: 'Sports', t: 'categorySports' },
    { key: 'Nature', t: 'categoryNature' },
    { key: 'Artistic', t: 'categoryArtistic' },
    { key: 'Typography', t: 'categoryTypography' },
] as const;


const DesignLibrary: React.FC<{
    onSelect: (design: LibraryDesign) => void,
    onBack: () => void,
    language: Language,
    designs: LibraryDesign[],
    onUpdateDesigns: (designs: LibraryDesign[]) => void;
}> = ({ onSelect, onBack, language, designs, onUpdateDesigns }) => {
    const t = translations[language];
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<typeof designCategories[number]['key']>('All');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);


    useEffect(() => {
        const saved = localStorage.getItem('myStyleFavorites');
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    const toggleFavorite = (e: React.MouseEvent, designId: string) => {
        e.stopPropagation();
        const newFavorites = favorites.includes(designId)
            ? favorites.filter(id => id !== designId)
            : [...favorites, designId];
        setFavorites(newFavorites);
        localStorage.setItem('myStyleFavorites', JSON.stringify(newFavorites));
    };
    
    const handleAddDesign = (newDesign: LibraryDesign) => {
        onUpdateDesigns([newDesign, ...designs]);
        setIsUploadModalOpen(false);
    };

    const handleGenerateVariation = (e: React.MouseEvent, originalDesign: LibraryDesign) => {
        e.stopPropagation();
        const newVariation: LibraryDesign = {
            ...originalDesign,
            id: `var-${Date.now()}-${originalDesign.id}`,
            name: `${originalDesign.name} (Remix)`,
        };
        onUpdateDesigns([newVariation, ...designs]);
    };

    const filteredDesigns = useMemo(() => {
        let currentDesigns = designs;
        
        if (activeCategory === 'Favorites') {
            currentDesigns = currentDesigns.filter(d => favorites.includes(d.id));
        } else if (activeCategory !== 'All') {
            currentDesigns = currentDesigns.filter(d => d.category === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const lowerQuery = searchQuery.toLowerCase();
            currentDesigns = currentDesigns.filter(d => 
                d.name.toLowerCase().includes(lowerQuery) || 
                d.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }
        
        return currentDesigns;
    }, [searchQuery, activeCategory, favorites, designs]);

    return (
        <div className="flex flex-col h-full w-full relative">
            {isUploadModalOpen && (
                <AdminUploadPanel 
                    onClose={() => setIsUploadModalOpen(false)} 
                    onAddDesign={handleAddDesign} 
                    language={language}
                />
            )}
            <button onClick={onBack} className="self-start text-sm text-gray-500 hover:text-gray-800 mb-4">&larr; {t.backButton}</button>
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.designLibraryTitle}</h2>
                <p className="text-gray-500">{t.designLibrarySubtitle}</p>
            </div>
            <div className="relative mb-4">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="mb-4 flex flex-wrap gap-2 justify-center">
                {designCategories.map(({ key, t: tKey }) => (
                    <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition ${activeCategory === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {t[tKey]}
                    </button>
                ))}
            </div>
            <div className="flex-grow bg-gray-50 rounded-lg p-2 min-h-[300px] max-h-[40vh] overflow-y-auto">
                {filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredDesigns.map(design => (
                            <div key={design.id} onClick={() => onSelect(design)} className="group aspect-square border-2 border-gray-200 rounded-lg p-2 bg-white hover:border-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer flex flex-col items-center justify-center relative">
                                <img src={design.url} alt={design.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform" />
                                <div className="absolute top-1 right-1 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => toggleFavorite(e, design.id)}
                                        className="p-1.5 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white text-gray-500 hover:text-red-500 transition"
                                        aria-label={`Favorite ${design.name}`}
                                    >
                                        <HeartIcon filled={favorites.includes(design.id)} className={`w-5 h-5 ${favorites.includes(design.id) ? 'text-red-500' : ''}`} />
                                    </button>
                                     <button 
                                        onClick={(e) => handleGenerateVariation(e, design)}
                                        className="p-1.5 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white text-gray-500 hover:text-blue-500 transition"
                                        aria-label={`Generate more like ${design.name}`}
                                        title={t.generateMoreLikeThis}
                                    >
                                        <MagicWandIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <span className="text-xs font-medium text-gray-600 mt-1 truncate">{design.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>{t.noResultsFound}</p>
                    </div>
                )}
            </div>
            {/* This would be conditionally rendered for admins */}
            <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="absolute -bottom-4 right-0 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
                title={t.addDesignTitle}
            >
                <PlusIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

const AdminUploadPanel: React.FC<{
    onClose: () => void;
    onAddDesign: (design: LibraryDesign) => void;
    language: Language;
}> = ({ onClose, onAddDesign, language }) => {
    const t = translations[language];
    const [name, setName] = useState('');
    const [category, setCategory] = useState(designCategories.find(c => c.key !== 'All' && c.key !== 'Favorites')?.key || 'Artistic');
    const [tags, setTags] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                setError("File is too large (max 5MB).");
                return;
            }
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(selectedFile);
            setError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !name.trim() || !category) {
            setError("Please fill all fields and select a file.");
            return;
        }
        
        const newDesign: LibraryDesign = {
            id: `user-${Date.now()}`,
            name,
            category,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            url: previewUrl!,
        };

        onAddDesign(newDesign);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative p-6 md:p-8">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.addDesignTitle}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                            {previewUrl ? <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" /> : <span className="text-xs text-gray-500 p-2 text-center">{t.addDesignImagePreview}</span>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="design-file" className="block text-sm font-medium text-gray-700 mb-1">{t.addDesignImageLabel}</label>
                            <input type="file" id="design-file" onChange={handleFileChange} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="design-name" className="block text-sm font-medium text-gray-700">{t.addDesignNameLabel}</label>
                        <input type="text" id="design-name" value={name} onChange={e => setName(e.target.value)} placeholder={t.addDesignNamePlaceholder} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="design-category" className="block text-sm font-medium text-gray-700">{t.addDesignCategoryLabel}</label>
                            {/* FIX: Cast the string value from the select onChange event to the expected union type for the state setter. */}
                            <select id="design-category" value={category} onChange={e => setCategory(e.target.value as typeof designCategories[number]['key'])} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" required>
                                {designCategories.filter(c => c.key !== 'All' && c.key !== 'Favorites').map(({ key, t: tKey }) => (
                                    <option key={key} value={key}>{t[tKey]}</option>
                                ))}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="design-tags" className="block text-sm font-medium text-gray-700">{t.addDesignTagsLabel}</label>
                            <input type="text" id="design-tags" value={tags} onChange={e => setTags(e.target.value)} placeholder={t.addDesignTagsPlaceholder} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-12 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition">
                            {t.addDesignButton}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const ColorPickerModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (color: string) => void;
    language: Language;
}> = ({ isOpen, onClose, onConfirm, language }) => {
    const t = translations[language];
    const [selectedColor, setSelectedColor] = useState('#000000');
    const predefinedColors = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#FFD700', '#C0C0C0'];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm relative p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{t.colorPickerTitle}</h3>
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    {predefinedColors.map(color => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform transform hover:scale-110 ${selectedColor === color ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'}`}
                            style={{ backgroundColor: color }}
                            aria-label={`Color ${color}`}
                        />
                    ))}
                </div>
                <div className="flex justify-center gap-3 items-center mb-8 border-t pt-6">
                    <label htmlFor="custom-design-color" className="font-medium text-gray-700">Custom:</label>
                    <input
                        id="custom-design-color"
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-12 h-12 p-0 border-none rounded-md cursor-pointer"
                    />
                </div>
                <button onClick={() => onConfirm(selectedColor)} className="w-full bg-blue-600 text-white font-bold py-3 px-12 rounded-full hover:bg-blue-700 transition">
                    {t.applyDesignButton}
                </button>
            </div>
        </div>
    );
};


// --- END: Revamped Design Library ---
