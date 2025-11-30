import { apiError } from "./apiError.js";

const ownershipCheck = async (resourceOwnerId, loggedInUserId) => {
  if (resourceOwnerId.toString() !== loggedInUserId.toString()) {
    throw new apiError(400, "Unauthorized access");
  }
};

export { ownershipCheck };
