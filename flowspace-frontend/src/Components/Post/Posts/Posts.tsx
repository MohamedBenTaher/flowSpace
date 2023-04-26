import React from 'react'
import { useInView } from 'react-intersection-observer'
import {
  useInfiniteQuery,
} from "@tanstack/react-query"
import Link from 'next/link'
import axios from 'axios'
import Post from '../Post/Post'
const Posts = () => {
    const { ref, inView } = useInView();
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
      } = useInfiniteQuery(
        ['posts'],
        async ({ pageParam = 0 }) => {
          const res = await axios.get(`/api/posts?cursor=` + pageParam,{
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          })
          return res.data
        },
        {
          getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
          getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
        },
      )
      React.useEffect(() => {
        if (inView) {
          fetchNextPage()
        }
      }, [inView])
    
  return (
    <div>
    <h1>Infinite Loading</h1>
    {status === 'loading' ? (
      <p>Loading...</p>
    ) : status === 'error' ? (
      <span>Error: {error.message}</span>
    ) : (
      <>
        <div>
          <button
            onClick={() => fetchPreviousPage()}
            disabled={!hasPreviousPage || isFetchingPreviousPage}
          >
            {isFetchingPreviousPage
              ? 'Loading more...'
              : hasPreviousPage
              ? 'Load Older'
              : 'Nothing more to load'}
          </button>
        </div>
        {data.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.data.map((post:any) => (
              <p
                style={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '10rem 1rem',
                  background: `hsla(${post.id * 30}, 60%, 80%, 1)`,
                }}
                key={post.id}
              >
                <Post title={post.title} content={post.content}/>
              </p>
            ))}
          </React.Fragment>
        ))}
        <div>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
          </button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage
            ? 'Background Updating...'
            : null}
        </div>
      </>
    )}
    <hr />
    <Link href="/about">
      <p>Go to another page</p>
    </Link>
    </div>
  )
}

export default Posts