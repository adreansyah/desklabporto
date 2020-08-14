import { useDispatch } from "react-redux";

export const useAction = (statement) => {
    const hasFetch = useDispatch();
    return {
        hasFetch
    }
}