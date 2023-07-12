import StoriesDAO from "../dao/storiesDAO.js";
export default class StoriesController {
  static async apiGetStories(req, res, next) {
    const storiesPerPage = req.query.storiesPerPage
      ? parseInt(req.query.storiesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.author) {
      filters.author = req.query.author;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { storiesList, totalNumStories } = await StoriesDAO.getStories({
      filters,
      page,
      storiesPerPage,
    });

    let response = {
      stories: storiesList,
      page: page,
      filters: filters,
      entries_per_page: storiesPerPage,
      total_results: totalNumStories,
    };
    res.json(response);
  }
}
