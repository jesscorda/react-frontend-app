import { DropdownOption } from '@/components/Dropdown';

export const SORT_OPTIONS: DropdownOption[] = [
  { value: 'titleAsc', label: 'Sort By Ascending Title' },
  { value: 'titleDesc', label: 'Sort By Descending Title' },
  { value: 'descriptionAsc', label: 'Sort By Ascending Description' },
  { value: 'descriptionDesc', label: 'Sort By Descending Description' },
  { value: 'endDateAsc', label: 'Sort By Ascending End Date' },
  { value: 'endDateDesc', label: 'Sort By Descending End Date' },
  { value: 'statusAsc', label: 'Sort By Ascending Status' },
  { value: 'statusDesc', label: 'Sort By Descending Status' },
];
