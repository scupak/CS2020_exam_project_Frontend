import {FilterModel} from './filter.model';

export interface FilteredListModel<T>
{
  filterUsed: FilterModel;
  totalCount: number;
  list: T[];
}
