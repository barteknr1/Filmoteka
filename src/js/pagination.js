import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import trendingMovies from './main-page-trending';

const VISIBLE_PAGES = 5;
const ITEM_PER_PAGE = 20;

const setPagination = totalItems => {
  const options = {
    totalItems,
    itemsPerPage: ITEM_PER_PAGE,
    visiblePages: VISIBLE_PAGES,
    centerAlign: true,
  };
  
  const pagination = new Pagination('pagination', options);
  return pagination;
};

const getPagination = async () => {
  try {
    const data = await trendingMovies.getTrendingMovies();
    const pagination = setPagination(data.total_results);
    pagination.on('afterMove', event => {
      const currentPage = event.page;
      Loader.open()
      trendingMovies
        .getTrendingMovies(currentPage)
        .then(data => {
          Loader.close()
          trendingMovies.renderTrendingMovies(data)
        })
        .catch(error => console.log(error));
    });
  } catch (error) {
    console.log(error);
  }
};
getPagination();

const pagination = { getPagination };
export default pagination;
