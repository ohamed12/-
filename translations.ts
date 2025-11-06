import { Language } from './types';

type AppTranslations = {
  welcomeTitle: string;
  welcomeDescription: string;
  homeTitle: string;
  homeDescription: string;
  startButton: string;
  selectClothingTypeTitle: string;
  selectSizeTitle: string;
  designStepTitle: string;
  designStepSubtitle: string;
  designSkipLabel: string;
  designManualLabel: string;
  designAILabel: string;
  designLibraryLabel: string;
  designSkipDescription: string;
  designManualDescription: string;
  designAIDescription: string;
  designLibraryDescription: string;
  designManualTitle: string;
  designManualSubtitle: string;
  designManualTextButton: string;
  designManualUploadButton: string;
  designTextTitle: string;
  designTextSubtitle: string;
  designTextPlaceholder: string;
  designUploadTitle: string;
  designUploadSubtitle: string;
  designUploadButtonLabel: string;
  designUploadHelperText: string;
  designAITitle: string;
  designAISubtitle: string;
  designAIPlaceholder: string;
  designLibraryTitle: string;
  designLibrarySubtitle: string;
  backButton: string;
  continueButton: string;
  designUploadFromDevice: string;
  designUploadFromCamera: string;
  designEditTitle: string;
  designEditSubtitle: string;
  confirmPlacementButton: string;
  orderSubmissionEmailTitle: string;
  orderSubmissionEmailRecipient: string;
  searchPlaceholder: string;
  categoryAll: string;
  categoryFavorites: string;
  categoryAnime: string;
  categorySports: string;
  categoryNature: string;
  categoryArtistic: string;
  categoryTypography: string;
  noResultsFound: string;
  generateMoreLikeThis: string;
  addDesignTitle: string;
  addDesignImagePreview: string;
  addDesignImageLabel: string;
  addDesignNameLabel: string;
  addDesignNamePlaceholder: string;
  addDesignCategoryLabel: string;
  addDesignTagsLabel: string;
  addDesignTagsPlaceholder: string;
  addDesignButton: string;
  colorPickerTitle: string;
  applyDesignButton: string;
  confirmButton: string;
  previewTitle: string;
  changeColorButton: string;
  changeDesignButton: string;
  size: string;
  rotation: string;
};

export const translations: Record<Language, AppTranslations> = {
  [Language.EN]: {
    welcomeTitle: 'Welcome to My Style',
    welcomeDescription:
      'Design your own clothes easily and preview them in real life before ordering.',
    homeTitle: 'Design Your Vision',
    homeDescription:
      'Bring your ideas to life. Customize high-quality apparel with unique designs, colors, and fabrics. Start creating now.',
    startButton: 'Start Designing',
    selectClothingTypeTitle: 'Select Clothing Type',
    selectSizeTitle: 'Select Size',
    designStepTitle: 'Choose Your Design',
    designStepSubtitle: 'Select how you’d like to add your logo, artwork, or text design.',
    designSkipLabel: 'No Design / Skip',
    designManualLabel: 'Draw / Upload',
    designAILabel: 'Generate with AI',
    designLibraryLabel: 'Choose from Library',
    designSkipDescription: 'Continue with a plain, unprinted item.',
    designManualDescription: 'Add your own text or upload an image file.',
    designAIDescription: 'Create a unique design from a text description.',
    designLibraryDescription: 'Browse a collection of pre-made designs.',
    designManualTitle: 'Add Your Own Design',
    designManualSubtitle: 'Choose how to add your custom design.',
    designManualTextButton: 'Enter Text',
    designManualUploadButton: 'Upload Image',
    designTextTitle: 'Enter Your Text',
    designTextSubtitle: 'Type the text you want to appear on your clothing.',
    designTextPlaceholder: "e.g., 'MyStyle'",
    designUploadTitle: 'Upload Your Design',
    designUploadSubtitle: 'Select an image file from your device.',
    designUploadButtonLabel: 'Choose File',
    designUploadHelperText: 'PNG, JPG, or WEBP. Max 10MB.',
    designAITitle: 'AI Design Generator',
    designAISubtitle: 'Describe your design idea and we\'ll generate a realistic preview.',
    designAIPlaceholder: "e.g., 'A majestic lion logo'",
    designLibraryTitle: 'Design Library',
    designLibrarySubtitle: 'Select a design to apply to your clothing.',
    backButton: 'Back',
    continueButton: 'Continue',
    designUploadFromDevice: 'From Device',
    designUploadFromCamera: 'Take a Photo',
    designEditTitle: 'Adjust Your Design',
    designEditSubtitle: 'Drag, resize, and rotate your design to place it perfectly.',
    confirmPlacementButton: 'Confirm Placement',
    orderSubmissionEmailTitle: '**Order Details for Admin**',
    orderSubmissionEmailRecipient: 'Recipient: mohamedbalarbi00@gmail.com',
    searchPlaceholder: 'Search for designs (e.g., "dragon", "sport")...',
    categoryAll: 'All',
    categoryFavorites: 'Favorites',
    categoryAnime: 'Anime',
    categorySports: 'Sports',
    categoryNature: 'Nature',
    categoryArtistic: 'Artistic',
    categoryTypography: 'Typography',
    noResultsFound: 'No designs found. Try a different search or filter.',
    generateMoreLikeThis: 'Generate more like this',
    addDesignTitle: 'Add New Design',
    addDesignImagePreview: 'Image Preview',
    addDesignImageLabel: 'Upload Image',
    addDesignNameLabel: 'Design Name',
    addDesignNamePlaceholder: 'e.g., "Cool Dragon"',
    addDesignCategoryLabel: 'Category',
    addDesignTagsLabel: 'Tags (comma separated)',
    addDesignTagsPlaceholder: 'e.g., "fire, fantasy, red"',
    addDesignButton: 'Add to Library',
    colorPickerTitle: 'Choose the color of your design',
    applyDesignButton: 'Apply Design',
    confirmButton: 'Confirm',
    previewTitle: 'Your Customized Clothing',
    changeColorButton: 'Change Color',
    changeDesignButton: 'Change Design',
    size: 'Size',
    rotation: 'Rotation',
  },
  [Language.FR]: {
    welcomeTitle: 'Bienvenue chez My Style',
    welcomeDescription:
      'Concevez vos propres vêtements facilement et prévisualisez-les en conditions réelles avant de commander.',
    homeTitle: 'Créez Votre Vision',
    homeDescription:
      'Donnez vie à vos idées. Personnalisez des vêtements de haute qualité avec des designs, des couleurs et des tissus uniques. Commencez à créer maintenant.',
    startButton: 'Commencer la Création',
    selectClothingTypeTitle: 'Choisir le type de vêtement',
    selectSizeTitle: 'Choisir la taille',
    designStepTitle: 'Choisissez Votre Design',
    designStepSubtitle: 'Sélectionnez comment vous souhaitez ajouter votre logo, illustration ou texte.',
    designSkipLabel: 'Aucun Design / Passer',
    designManualLabel: 'Dessiner / Télécharger',
    designAILabel: 'Générer avec l\'IA',
    designLibraryLabel: 'Choisir de la Bibliothèque',
    designSkipDescription: 'Continuez avec un article uni et non imprimé.',
    designManualDescription: 'Ajoutez votre propre texte ou téléchargez un fichier image.',
    designAIDescription: 'Créez un design unique à partir d\'une description textuelle.',
    designLibraryDescription: 'Parcourez une collection de designs pré-faits.',
    designManualTitle: 'Ajoutez Votre Propre Design',
    designManualSubtitle: 'Choisissez comment ajouter votre design personnalisé.',
    designManualTextButton: 'Saisir du Texte',
    designManualUploadButton: 'Télécharger une Image',
    designTextTitle: 'Saisissez Votre Texte',
    designTextSubtitle: 'Tapez le texte que vous souhaitez voir apparaître sur votre vêtement.',
    designTextPlaceholder: "ex: 'MyStyle'",
    designUploadTitle: 'Téléchargez Votre Design',
    designUploadSubtitle: 'Sélectionnez un fichier image depuis votre appareil.',
    designUploadButtonLabel: 'Choisir un Fichier',
    designUploadHelperText: 'PNG, JPG, ou WEBP. 10Mo max.',
    designAITitle: 'Générateur de Design IA',
    designAISubtitle: 'Décrivez votre idée de design et nous générerons un aperçu réaliste.',
    designAIPlaceholder: "ex: 'Un logo de lion majestueux'",
    designLibraryTitle: 'Bibliothèque de Designs',
    designLibrarySubtitle: 'Sélectionnez un design à appliquer sur votre vêtement.',
    backButton: 'Retour',
    continueButton: 'Continuer',
    designUploadFromDevice: "Depuis l'appareil",
    designUploadFromCamera: 'Prendre une photo',
    designEditTitle: 'Ajustez Votre Design',
    designEditSubtitle: 'Faites glisser, redimensionnez et pivotez votre design pour le placer parfaitement.',
    confirmPlacementButton: 'Confirmer le Placement',
    orderSubmissionEmailTitle: "**Détails de la commande pour l'administrateur**",
    orderSubmissionEmailRecipient: 'Destinataire : mohamedbalarbi00@gmail.com',
    searchPlaceholder: 'Rechercher des designs (ex: "dragon", "sport")...',
    categoryAll: 'Tout',
    categoryFavorites: 'Favoris',
    categoryAnime: 'Animé',
    categorySports: 'Sports',
    categoryNature: 'Nature',
    categoryArtistic: 'Artistique',
    categoryTypography: 'Typographie',
    noResultsFound: 'Aucun design trouvé. Essayez une autre recherche ou un autre filtre.',
    generateMoreLikeThis: 'Générer plus comme ça',
    addDesignTitle: 'Ajouter un Nouveau Design',
    addDesignImagePreview: 'Aperçu de l\'image',
    addDesignImageLabel: 'Télécharger une Image',
    addDesignNameLabel: 'Nom du Design',
    addDesignNamePlaceholder: 'ex: "Dragon cool"',
    addDesignCategoryLabel: 'Catégorie',
    addDesignTagsLabel: 'Tags (séparés par une virgule)',
    addDesignTagsPlaceholder: 'ex: "feu, fantaisie, rouge"',
    addDesignButton: 'Ajouter à la Bibliothèque',
    colorPickerTitle: 'Choisis la couleur du design',
    applyDesignButton: 'Appliquer le design',
    confirmButton: 'Confirmer',
    previewTitle: 'Ton vêtement personnalisé',
    changeColorButton: 'Changer la couleur',
    changeDesignButton: 'Changer le design',
    size: 'Taille',
    rotation: 'Rotation',
  },
  [Language.AR]: {
    welcomeTitle: 'أهلاً بك في My Style',
    welcomeDescription:
      'صمم ملابسك الخاصة بسهولة وشاهدها بشكل واقعي قبل الطلب.',
    homeTitle: 'صمم رؤيتك',
    homeDescription:
      'حوّل أفكارك إلى حقيقة. خصص ملابس عالية الجودة بتصاميم وألوان وأقمشة فريدة. ابدأ التصميم الآن.',
    startButton: 'ابدأ التصميم',
    selectClothingTypeTitle: 'اختر نوع الملابس',
    selectSizeTitle: 'اختر المقاس',
    designStepTitle: 'اختر تصميمك',
    designStepSubtitle: 'حدد كيف ترغب في إضافة شعارك أو عملك الفني أو تصميمك النصي.',
    designSkipLabel: 'بدون تصميم / تخطي',
    designManualLabel: 'ارسم / ارفع تصميمًا',
    designAILabel: 'إنشاء بواسطة الذكاء الاصطناعي',
    designLibraryLabel: 'اختر من المكتبة',
    designSkipDescription: 'متابعة بقطعة ملابس سادة غير مطبوعة.',
    designManualDescription: 'أضف نصك الخاص أو ارفع ملف صورة.',
    designAIDescription: 'أنشئ تصميمًا فريدًا من وصف نصي.',
    designLibraryDescription: 'تصفح مجموعة من التصاميم الجاهزة.',
    designManualTitle: 'أضف تصميمك الخاص',
    designManualSubtitle: 'اختر كيفية إضافة تصميمك المخصص.',
    designManualTextButton: 'أدخل نصًا',
    designManualUploadButton: 'ارفع صورة',
    designTextTitle: 'أدخل النص الخاص بك',
    designTextSubtitle: 'اكتب النص الذي تريد أن يظهر على ملابسك.',
    designTextPlaceholder: "مثال: 'ماي ستايل'",
    designUploadTitle: 'ارفع تصميمك',
    designUploadSubtitle: 'حدد ملف صورة من جهازك.',
    designUploadButtonLabel: 'اختر ملفًا',
    designUploadHelperText: 'PNG, JPG, أو WEBP. الحد الأقصى 10 ميجابايت.',
    designAITitle: 'مولد التصاميم بالذكاء الاصطناعي',
    designAISubtitle: 'صف فكرة تصميمك وسننشئ معاينة واقعية.',
    designAIPlaceholder: "مثال: 'شعار أسد مهيب'",
    designLibraryTitle: 'مكتبة التصاميم',
    designLibrarySubtitle: 'اختر تصميمًا لتطبيقه على ملابسك.',
    backButton: 'رجوع',
    continueButton: 'متابعة',
    designUploadFromDevice: 'من الجهاز',
    designUploadFromCamera: 'التقاط صورة',
    designEditTitle: 'عدّل تصميمك',
    designEditSubtitle: 'اسحب تصميمك وغير حجمه وقم بتدويره لوضعه بشكل مثالي.',
    confirmPlacementButton: 'تأكيد الموضع',
    orderSubmissionEmailTitle: '**تفاصيل الطلب للمسؤول**',
    orderSubmissionEmailRecipient: 'المستلم: mohamedbalarbi00@gmail.com',
    searchPlaceholder: 'ابحث عن تصاميم (مثال: "تنين", "رياضة")...',
    categoryAll: 'الكل',
    categoryFavorites: 'المفضلة',
    categoryAnime: 'أنيمي',
    categorySports: 'رياضة',
    categoryNature: 'طبيعة',
    categoryArtistic: 'فني',
    categoryTypography: 'طباعة',
    noResultsFound: 'لم يتم العثور على تصاميم. جرب بحثًا أو فلترًا مختلفًا.',
    generateMoreLikeThis: 'إنشاء المزيد من هذا القبيل',
    addDesignTitle: 'إضافة تصميم جديد',
    addDesignImagePreview: 'معاينة الصورة',
    addDesignImageLabel: 'تحميل الصورة',
    addDesignNameLabel: 'اسم التصميم',
    addDesignNamePlaceholder: 'مثال: "تنين رائع"',
    addDesignCategoryLabel: 'الفئة',
    addDesignTagsLabel: 'العلامات (مفصولة بفواصل)',
    addDesignTagsPlaceholder: 'مثال: "نار, خيال, أحمر"',
    addDesignButton: 'إضافة إلى المكتبة',
    colorPickerTitle: 'اختر لون التصميم',
    applyDesignButton: 'تطبيق التصميم',
    confirmButton: 'تأكيد',
    previewTitle: 'ملابسك المخصصة',
    changeColorButton: 'تغيير اللون',
    changeDesignButton: 'تغيير التصميم',
    size: 'الحجم',
    rotation: 'الدوران',
  },
};
