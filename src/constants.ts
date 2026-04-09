import {
  faBuildingColumns,
  faCarSide,
  faCartShopping,
  faCircleQuestion,
  faPlane,
  faReceipt,
  faStore,
  faMugSaucer,
  faMobileScreenButton,
  faCreditCard,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

export const MAX_VISIBLE_TRANSACTIONS = 10;

export const TRANSACTION_TYPES = ['credit', 'payment'] as const;

export const TRANSACTION_ICON_BACKGROUNDS = [
  '#101828',
  '#172033',
  '#1b2333',
  '#202939',
  '#26203b',
  '#2b2438',
] as const;

export const DAILY_POINTS_MULTIPLIERS = [2, 3, 2, 4, 2, 3, 1] as const;
export const DAILY_POINTS_BASE = 100;

export const DEFAULT_TRANSACTION_ICON = faCircleQuestion;

export const TRANSACTION_ICONS = {
  apple: faMobileScreenButton,
  bank: faBuildingColumns,
  card: faCreditCard,
  car: faCarSide,
  cart: faCartShopping,
  coffee: faMugSaucer,
  payment: faWallet,
  plane: faPlane,
  receipt: faReceipt,
  store: faStore,
} as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];
export type TransactionIconKey = keyof typeof TRANSACTION_ICONS;
