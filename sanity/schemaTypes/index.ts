import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { categoryType } from "./categoryType";
import { bookType } from "./bookType";
import { recommendationType } from "./recommendationType";
import { wishListType } from "./wishListType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    authorType,
    bookType,
    categoryType,
    recommendationType,
    wishListType,
  ],
};
