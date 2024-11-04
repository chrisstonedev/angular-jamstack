import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const bookType = defineType({
  name: "book",
  title: "Book",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "mainAuthors",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "author" } })],
    }),
    defineField({
      name: "withAuthors",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "author" } })],
    }),
    defineField({
      name: "frontCover",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishYear",
      type: "number",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author0: "mainAuthors.0.name",
      author1: "mainAuthors.1.name",
      author2: "mainAuthors.2.name",
      media: "frontCover",
    },
    prepare(selection) {
      const { title, author0, author1, author2, media } = selection;
      const authors = [author0, author1].filter(Boolean);
      const hasMoreAuthors = Boolean(author2);
      const subtitle =
        authors.length > 0
          ? hasMoreAuthors
            ? `by ${authors.join(", ")}…`
            : `by ${authors.join(" & ")}`
          : "";
      return { title, subtitle, media };
    },
  },
});
