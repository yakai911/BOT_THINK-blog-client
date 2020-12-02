import { Pagination } from "antd";
import { useState, useMemo } from "react";
import { TagRow } from "./index";
import Link from "next/link";
import moment from "moment";
import "antd/dist/antd.css";
import PostImg from "./PostImg";
import useWindowSize from "../../helper/useWindowSize";

const PostGrid = ({ posts }) => {
  const size = useWindowSize();
  const windowWidth = size.width;

  const [pageSize, setPageSize] = useState(9);
  const [current, setCurrent] = useState(1);

  const paginatedPosts = useMemo(() => {
    const lastIndex = pageSize * current;
    const firstIndex = lastIndex - pageSize;

    return posts.slice(firstIndex, lastIndex);
  }, [current, pageSize, posts]);

  // useEffect(() => {
  //   window.scroll({
  //     top: 800,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // });

  return (
    <section className='grid-pagination-container'>
      <section className='post-grid container'>
        {paginatedPosts.map((post, index) => (
          <div className='post-container' key={index}>
            <figure>
              <a href={`/blogs/${post._id}`}>
                {/* {`${process.env.NEXT_PUBLIC_API}/blog/image/${post._id}` !==
                `${process.env.NEXT_PUBLIC_API}/blog/image/undefined` ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API}/blog/image/${post._id}`}
                    alt={post.title}
                  />
                ) : (
                  <div
                    style={{
                      background: $background,
                      height: "100%",
                      width: "100%",
                      margin: "0 auto",
                      maxHeight: "300px",
                      boxShadow: `box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.6),
                      -6px -6px 26px rgba(255, 255, 255, 0.8)`,
                    }}
                  />
                )} */}
                <PostImg
                  width={"100%"}
                  height={windowWidth > 900 ? "300px" : "285px"}
                  src={`${process.env.NEXT_PUBLIC_API}/blog/image/${post._id}`}
                  radius={5}
                />
              </a>
            </figure>
            <TagRow tags={post.tags} />
            <h2>{post.title}</h2>
            <p className='author-text'>
              <span>
                By:
                <Link href={post.author.profile}>
                  {" " + post.author.name + "  "}
                </Link>
              </span>
              <span>-{moment(post.createdAt).format("MMMM,DD,YYYY")}</span>
            </p>
            <div className='description-text'>
              {post.description.replace(/<[^>]+>/g, "").slice(0, 57) + " ..."}
            </div>
            <p className='author-text'>
              <Link
                href='/blogs/[id]'
                as={`/blogs/${post._id}`}
                className='a-blue'>
                Read More...
              </Link>
            </p>
          </div>
        ))}
      </section>
      <div className='pagination-container'>
        <Pagination
          simple
          showSizeChanger
          onShowSizeChange={setPageSize}
          pageSize={pageSize}
          total={posts.length}
          defaultCurrent={current}
          onChange={setCurrent}
        />
      </div>
    </section>
  );
};

export default PostGrid;
