export enum Step {
  Fabric,
  Clothing,
  Color,
  Design,
  Preview,
  UserInfo,
}

export enum Fabric {
  Cotton = 'Cotton',
  Polyester = 'Polyester',
  Mixed = 'Mixed',
}

export enum Clothing {
  Tshirt = 'T-shirt',
  Tanktop = 'Tank top',
  Hoodie = 'Hoodie',
  Pants = 'Pants',
  PoloShirt = 'Polo Shirt',
  Shorts = 'Shorts',
}

export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
}

export interface UserInfo {
  fullName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export enum DesignType {
  None = 'None',
  Text = 'Text',
  Upload = 'Upload',
  AI = 'AI',
  Library = 'Library',
}

export interface Customization {
  fabric: Fabric | null;
  clothingType: Clothing | null;
  size: Size | null;
  color: string;
  designType: DesignType | null;
  designValue: string | null;
  designColor: string | null;
  baseClothingImageUrl?: string | null;
}

export enum Language {
  EN = 'en',
  FR = 'fr',
  AR = 'ar',
}