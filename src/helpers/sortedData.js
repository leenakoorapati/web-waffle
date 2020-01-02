import { sortBy } from 'lodash';

export default function sortedData(data, type, sortDirection) {

  const field = type.toLowerCase();
  let newData = [];

  if (field === 'name') {
    newData = sortBy(data, 'name');
  }

  if (field === 'occupation') {
    newData = sortBy(data, 'occupation');
  }

  if (field === 'revenue') {
    newData = sortBy(data, 'totalRevenue').reverse();
  }

  if (field === 'conversion') {
    newData = sortBy(data, 'conversionRevenue').reverse();
  }

  if (field === 'impression') {
    newData = sortBy(data, 'impressionRevenue').reverse();
  }

  if (sortDirection) {
    newData.reverse();
  }
  return newData;
}
