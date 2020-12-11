export interface FilterModel
{
  orderDirection?: string;
  orderProperty?: string;
  searchText?: string;
  searchField?: string;
  itemsPrPage?: number;
  currentPage?: number;
  orderStartDateTime?: Date;
  orderStopDateTime?: Date;
}
