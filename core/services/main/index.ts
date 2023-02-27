import { api } from "../../api";
import { Toast } from "../../helpers/utils";

export const getMainPageDataService = async (categoryId?: number) => {
  return api
    .get("/global/main", { params: { categoryId } })
    .then((res) => res.data)
    .catch(console.log);
};
