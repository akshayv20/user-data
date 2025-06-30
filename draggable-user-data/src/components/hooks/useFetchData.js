import axios from "axios";
import { dummyData } from "../../Asset/data";
import { onStart, onSuccess } from "../../app/tableSlice";

export const useFetchData = () => {
  const getUrl = "https://run.mocky.io/v3/01238aa1-35de-4015-9add-6d3e1c5e2b30";
  const fetchData = async (dispatch) => {
    dispatch(onStart());
    try {
      const response = await axios.get(getUrl);
      dispatch(onSuccess(response.data));
    } catch (err) {
      console.warn("Something Went wrong, using dummy data");
      dispatch(onSuccess(dummyData));
    }
  };

  return fetchData;
};
