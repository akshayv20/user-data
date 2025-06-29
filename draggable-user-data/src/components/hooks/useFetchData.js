import axios from "axios";
import { dummyData } from "../../Asset/data";
import { fetchStart, fetchSuccess } from "../../app/tableSlice";

export const useFetchData = () => {
  const fetchData = async (dispatch) => {
    dispatch(fetchStart());
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/01238aa1-35de-4015-9add-6d3e1c5e2b30"
      );
      dispatch(fetchSuccess(response.data));
    } catch (err) {
      console.warn("Fetching failed, using dummy data");
      dispatch(fetchSuccess(dummyData));
    }
  };

  return fetchData;
};
