import JobScrapper from "@/VacancyScrapper/index"

const getLinkedinJobs = async (
  keywords = "",
  location = "",
  timeframe = "",
  remote = "",
  page = ""
) => {
  const scrapper = new JobScrapper(keywords, location, timeframe, remote, page);
  return await scrapper.linkedin();
};

export default getLinkedinJobs;
