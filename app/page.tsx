"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/app/sanity";

interface Book {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle: string;
  mains: { name: string }[];
  withs: { name: string }[];
  coverImageUrl: string;
  recommendations: number;
  allRecommenders: { userId: string }[];
  wished: number;
  allWishers: { userId: string }[];
}

function queryFn(): Promise<Book[]> {
  return sanity.fetch(`
  *[_type == "book"]{
        _id,
        title,
        subtitle,
        slug,
        "mains": mainAuthors[]->{name},
        "withs": withAuthors[]->{name},
        "coverImageUrl": frontCover.asset->url,
        "recommendations": count(*[_type == "recommendation" && book._ref == ^._id]),
        "allRecommenders": *[_type == "recommendation" && book._ref == ^._id]{userId},
        "wished": count(*[_type == "wishList" && book._ref == ^._id]),
        "allWishers": *[_type == "wishList" && book._ref == ^._id]{userId}
    }|order(title asc)|order(wished desc)|order(recommendations desc)
`);
}

export default function Home() {
  const { data = [] } = useQuery({
    queryKey: ["bookList"],
    queryFn: queryFn,
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          {data.map((b) => (
            <li key={b.title}>{b.title}</li>
          ))}
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
