import sendApiRequest from "../requestWebService";
import {
  GET_ALL_CATEGORIES,
  ADD_CATEGORY,
  ADD_ITEM_TO_CATEGORY,
  UPDATE_ITEM_TO_CATEGORY,
  DELETE_ITEM_FROM_CATEGORY,
  BULK_IMPORT_CATEGORY
} from "../../constantUtils";

export const getAllCategories = async () => {
  try {
    const res = await sendApiRequest(
      GET_ALL_CATEGORIES
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
};

export const addCategory = async (params: object) => {
  try {
    const res = await sendApiRequest(
      ADD_CATEGORY,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}

export const addItemToCategory = async (params: object) => {
  try {
    const res = await sendApiRequest(
      ADD_ITEM_TO_CATEGORY,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}

export const updateItemToCategory = async (params: object) => {
  try {
    const res = await sendApiRequest(
      UPDATE_ITEM_TO_CATEGORY,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}

export const deleteItemFromCategory = async (params: object) => {
  try {
    const res = await sendApiRequest(
      DELETE_ITEM_FROM_CATEGORY,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}

export const bulkImportCategories = async (params: object) => {
  try {
    const res = await sendApiRequest(
      BULK_IMPORT_CATEGORY,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}