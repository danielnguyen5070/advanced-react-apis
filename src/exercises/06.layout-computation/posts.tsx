
import React, { useState } from 'react'
import { useSearchParams } from './handleForm'
import { getQueryParam } from './utils'
import { BlogPost, getMatchingPosts } from '../../shared/blog-posts'
import { ButtonWithTooltip } from './buttonTooltip'

export function MatchingPosts() {
    const [params] = useSearchParams()
    const query = getQueryParam(params)
    const posts = getMatchingPosts(query)
    return (
        <div className="space-y-4">
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    )
}

function Post({ post }: { post: BlogPost }) {
    const [isFavorite, setFavorite] = useState<boolean>(false)
    return (
        <div
            key={post.id}
            className="p-4 rounded-lg"
            style={{ backgroundColor: post.color }}
        >
            <div>
                {isFavorite ? (
                    <ButtonWithTooltip
                        tooltipContent='Remove from favorites'
                        onClick={() => setFavorite(false)}
                    >
                        ❤️
                    </ButtonWithTooltip>
                ) : (
                    <ButtonWithTooltip tooltipContent='Add to favorites'
                        onClick={() => setFavorite(true)}
                    >
                        🤍
                    </ButtonWithTooltip>
                )}
            </div>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-700">{post.description}</p>
            <div className="mt-2">
                {post.tags.map(tag => (
                    <span
                        key={tag}
                        className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div >
    )
}