import { localApi } from "../../api";

export const getMainPageDataService = async (categoryId?: number) => {
  return localApi
    .get("/global/main", { params: { categoryId } })
    .then((res) => res.data)
    .catch(console.log);
};
