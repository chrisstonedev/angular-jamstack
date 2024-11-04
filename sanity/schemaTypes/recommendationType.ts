import { HeartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const recommendationType = defineType({
  name: "recommendation",
  title: "Recommendation",
  type: "document",
  icon: HeartIcon,
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
      subtitle: `is recommended by ${userId}`,
    }),
  },
});
