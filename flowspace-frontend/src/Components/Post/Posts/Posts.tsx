import React from 'react'
import { useInView } from 'react-intersection-observer'
import {
  useInfiniteQuery,
} from "@tanstack/react-query"
import Link from 'next/link'
import axios from 'axios'
import Post from '../Post/Post'
interface Props {
     created:boolean
    setCreated: React.Dispatch<React.SetStateAction<boolean>>
  }
  
const Posts = () => {
    const { ref, inView } = useInView();
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        refetch,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
      } = useInfiniteQuery(
        ['posts'],
        async ({ pageParam = 0 }) => {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post?cursor=` + pageParam,{
            withCredentials: true,
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
    <div className='w-full'>
    {status === 'loading' ? (
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-400 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2"></div>
              <div className="h-2 bg-slate-400rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
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
        {data?.pages?.map((page) => (
          <React.Fragment key={page?.nextId}>
            {page?.data?.map((post:any) => (
              <div
                key={post?.id}
              >  
              <Post content={post.content} published={post.published}/>
              </div>
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