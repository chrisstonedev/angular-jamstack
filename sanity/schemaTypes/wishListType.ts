import { AddIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const wishListType = defineType({
  name: "wishList",
  title: "Wish List",
  type: "document",
  icon: AddIcon,
  fields: [
    defineField({
      name: "book",
      type: "reference",
      to: { type: "book" },
    }),
    defineField({
      name: "userId",
      type: "string",
    }),
  ],
  preview: {
    select: {
      bookTitle: "book.title",
      userId: "userId",
    },
    prepare: ({ bookTitle, userId }) => ({
      title: bookTitle,
      subtitle: `is wished by ${userId}`,
    }),
  },
});
