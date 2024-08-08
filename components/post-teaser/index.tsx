// Import necessary libraries
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  CalendarWeekFill,
  Translate,
  Bookmark,
  ChevronUp,
  ChevronDown,
} from "react-bootstrap-icons";

// Define the PostTeaser component
export default function PostTeaser({ post }) {
  switch (post.lang) {
    case "de":
      post.lang = "de";
      break;
    case "en":
      post.lang = "en";
      break;
    default:
      post.lang = "de";
  }

  // Use the useState hook to manage the expanded state of the post
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine the date format based on the locale
  const dateFormat = "dd.MM.yyyy";

  const postDate = useMemo(
    () => format(new Date(post.date), dateFormat),
    [post.date, dateFormat]
  );

  // Define a function to toggle the expanded state
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  // Render the component
  return (
    <div key={post.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
      <div className="bg-light-subtle shadow-sm py-2">
        <div className="pb-3 px-2">
          <div className="container-fluid ">
            <Link href={`/posts/${post.slug}`} className="text-decoration-none">
              <div className="row">
                <div className="col-2 px-0">
                  <Bookmark className="fs-2 text-primary" />
                </div>
                <div className="col-10 px-0">
                  <span
                    className="d-block text-body-primary"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <Link href={`/posts/${post.slug}`}>
          <div className={styles["image-wrapper"]}>
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                width={post.imageWidth}
                height={post.imageHeight}
                className={styles["image-blog"]}
              />
            ) : (
              <Image
                src="/images/n.png"
                alt="Logo niklas-stephan.de"
                width="150"
                height="150"
                className={styles["image-blog"]}
              />
            )}
          </div>
        </Link>
        <div className="pt-3 px-2">
          <div
            className={`text-body-secondary ${styles["excerpt"]} ${
              isExpanded ? styles["excerpt-expanded"] : ""
            }`}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div className="d-flex mt-2 align-items-center">
            <small className="mx-2 text-body-secondary">
              <Translate className="me-1" />
              {post.lang}
            </small>
            <small className="mx-2 text-body-secondary">
              <CalendarWeekFill className="me-1" />
              {postDate}
            </small>
            <div
              className="ms-auto btn btn-sm btn-outline-primary rounded-4 border-2 "
              onClick={toggleExpanded}
            >
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
