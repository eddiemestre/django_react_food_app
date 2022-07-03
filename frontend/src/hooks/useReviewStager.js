import { useContext } from "react";
import ReviewContext from "../context/ReviewStager";

// defines custom hook for auth
const useReview = () => {
    return useContext(ReviewContext);
}

export default useReview;