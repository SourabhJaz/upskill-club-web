import { ApiCallResponse } from './interface';

const isErrorResponse = (response: ApiCallResponse<unknown>) => {
  return 'err' in response;
};

const getFormattedDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString('en-US', options);
};

const getAuthorInitials = (authorName: string) => {
  const nameStrings = authorName.toUpperCase().split(' ');
  const stringInitials = nameStrings.map((nameString) => nameString.slice(0, 1));
  return stringInitials.join('');
};

const openInNewTab = (url: string) => {
  window.open(url, '_blank')?.focus();
};

export const Utils = {
  isErrorResponse,
  getFormattedDate,
  getAuthorInitials,
  openInNewTab,
};
