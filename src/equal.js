import isEqual from "lodash/isEqual";
import collect from "./collect";

const equal = async (prev) => {
    const next = await collect();

    return isEqual(prev, next);
};

export default equal;