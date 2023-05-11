// development urls
export const DATABASE = "crystalsteward";

export const WRAPPER_BASE_URL = "http://localhost:3001";
export const FRONTEND_BASE_URL = "http://localhost:3000";
export const BACKEND_API_BASE_URL = "http://localhost:4000";

// production constants
// export const DATABASE = "thepseudoengineers";

// export const WRAPPER_BASE_URL = "https://heres-sav.github.io/flooke-wrapper";
// export const FRONTEND_BASE_URL = "https://flooke-nextjs-git-development-v2-heres-sav.vercel.app";
// export const BACKEND_API_BASE_URL = "https://flooke-mw.onrender.com";

export const PATH_DEFAULT = "/";
export const PATH_ITEM_EDITOR = "/item-editor";
export const PATH_ORDER_EDITOR = "/order-editor";
export const PATH_ORDER_PROCESSOR = "/order-processor";

export const ADD_ACTIVE_ORDER = {
  URL: "/api/v1/flooke/orders/ops/add-active",
  METHOD: "POST",
};

export const READ_ACTIVE_ORDER = {
  URL: "/api/v1/flooke/orders/ops/read-active",
  METHOD: "POST",
};

export const DELETE_ACTIVE_ORDER = {
  URL: "/api/v1/flooke/orders/ops/delete-active",
  METHOD: "POST",
};

export const PREVIEW_PROCESS_ORDER = {
  URL: "/api/v1/flooke/orders/ops/preview-process",
  METHOD: "POST",
}

export const PROCESS_ORDER = {
  URL: "/api/v1/flooke/orders/ops/process",
  METHOD: "POST",
}

export const GET_ALL_CATEGORIES = {
  URL: "/api/v1/flooke/menu/ops/all-category",
  METHOD: "GET",
};

export const ADD_CATEGORY = {
  URL: "/api/v1/flooke/menu/ops/add-category",
  METHOD: "POST",
};

export const ADD_ITEM_TO_CATEGORY = {
  URL: "/api/v1/flooke/menu/ops/add-item",
  METHOD: "POST",
};

export const UPDATE_ITEM_TO_CATEGORY = {
  URL: "/api/v1/flooke/menu/ops/update-item",
  METHOD: "POST",
};

export const DELETE_ITEM_FROM_CATEGORY = {
  URL: "/api/v1/flooke/menu/ops/delete-item",
  METHOD: "POST",
};

export const BULK_IMPORT_CATEGORY = {
  URL: "/api/v1/flooke/menu/ops/bulk-import",
  METHOD: "POST",
};

// guest details apis
export const ADD_GUEST_DETAILS_ = {
  URL: "/api/v1/flooke/guest/ops/create",
  METHOD: "POST",
};

// filtered processed orders apis
export const GET_DATE_FILTERED_PROCESSED_ORDERS = {
  URL: "/api/v1/flooke/orders/ops/processed-bydate",
  METHOD: "POST",
};

export const TABLES_MAP = {
  table1: "Table 1",
  table2: "Table 2",
  table3: "Table 3",
  table4: "Table 4",
  table5: "Table 5",
  table6: "Table 6",
  table7: "Table 7",
  table8: "Table 8",
  table9: "Table 9",
  table10: "Table 10",
}

export const TABLES = [
  {
    name: "Table 1",
    id: "table1"
  },
  {
    name: "Table 2",
    id: "table2"
  },
  {
    name: "Table 3",
    id: "table3"
  },
  {
    name: "Table 4",
    id: "table4"
  },
  {
    name: "Table 5",
    id: "table5"
  },
  {
    name: "Table 6",
    id: "table6"
  },
  {
    name: "Table 7",
    id: "table7"
  },
  {
    name: "Table 8",
    id: "table8"
  },
  {
    name: "Table 9",
    id: "table9"
  },
  {
    name: "Table 10",
    id: "table10"
  },
]

// type in field uniques
export const ORDER_EDITOR_COMMENT_FIELD = "order-editor-comment"