import type { Transaction } from '../types';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const fallbackDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDateTimeLabel(label: string, date: Date) {
  return `${label}, ${timeFormatter.format(date)}`;
}

export function formatTransactionAmount(transaction: Transaction) {
  const formattedAmount = currencyFormatter.format(Math.abs(transaction.amount));

  if (transaction.type === 'payment') {
    return `+${formattedAmount}`;
  }

  return formattedAmount;
}

export function getTransactionStatusLabel(pending?: boolean) {
  return pending ? 'Pending' : 'Approved';
}

export function formatTransactionDetailDate(dateValue: string) {
  const transactionDate = new Date(dateValue);

  if (Number.isNaN(transactionDate.getTime())) {
    return '';
  }

  const now = new Date();
  const today = getStartOfDay(now);
  const targetDay = getStartOfDay(transactionDate);
  const millisecondsDiff = today.getTime() - targetDay.getTime();
  const dayDiff = Math.round(millisecondsDiff / 86_400_000);

  if (dayDiff === 0) {
    return formatDateTimeLabel('Today', transactionDate);
  }

  if (dayDiff === 1) {
    return formatDateTimeLabel('Yesterday', transactionDate);
  }

  if (dayDiff > 1 && dayDiff < 7) {
    return formatDateTimeLabel(
      weekdayFormatter.format(transactionDate),
      transactionDate,
    );
  }

  return fallbackDateFormatter
    .format(transactionDate)
    .replace(/,\s*/, ', ');
}
