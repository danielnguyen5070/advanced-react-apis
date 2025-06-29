import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BlogPost, getMatchingPosts } from '../../shared/blog-posts'
import { getQueryParam, useSearchParams } from './params'

type Position = {
    left: number
    top: number
    right: number
    bottom: number
}

export function Post({ post }: { post: BlogPost }) {
    const [isFavorite, setFavorite] = useState<boolean>(false)
    const [targetRect, setTargetRect] = useState<Position | null>(null)
    const [tooltipHeight, setTooltipHeight] = useState<number>(0)
    const buttonRef = React.useRef<HTMLButtonElement | null>(null)
    const tooltipRef = React.useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const rect = tooltipRef.current?.getBoundingClientRect()
        if (!rect) return
        const { height } = rect
        console.log('Tooltip height:', height)
        setTooltipHeight(height)
    }, [targetRect])

    function displayTooltip() {
        const rect = buttonRef.current?.getBoundingClientRect()
        if (!rect) return
        setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
        })
    }

    const hideTooltip = () => {
        console.log('Hiding tooltip')
        setTargetRect(null)
    }

    let tooltipX = 0
    let tooltipY = 0
    if (targetRect !== null) {
        tooltipX = targetRect.left
        tooltipY = targetRect.top - tooltipHeight
        if (tooltipY < 0) {
            tooltipY = targetRect.bottom
        }

        tooltipX += window.scrollX
        tooltipY += window.scrollY
    }
    console.log('Tooltip position:', { tooltipX, tooltipY })

    return (
        <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: post.color }}
        >
            <div
                onPointerEnter={displayTooltip}
                onPointerLeave={hideTooltip}>
                {isFavorite ? (
                    <button
                        className="text-red-500 mr-2"
                        onClick={() => setFavorite(false)}
                    >
                        ❤️
                    </button>
                ) : (
                    <div className='relative inline-block'>
                        <button
                            ref={buttonRef}

                            // onFocus={displayTooltip}
                            // onBlur={hideTooltip}
                            className="text-gray-500 mr-2"
                            onClick={() => setFavorite(true)}
                        >
                            🤍
                        </button>
                        <div className="tooltip-container">
                            {targetRect && (
                                createPortal(
                                    <div
                                        ref={tooltipRef}
                                        className="absolute bg-white border border-gray-300 p-2 rounded shadow-lg"
                                        style={{
                                            left: `${tooltipX}px`,
                                            top: `${tooltipY}px`,
                                        }}
                                    >
                                        <p className="text-sm text-gray-700">
                                            {post.description}
                                        </p>
                                    </div>, document.body
                                )
                            )}
                        </div>
                    </div>
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
        </div>
    )
}

export function MatchingPosts() {
    const [queryParams] = useSearchParams()
    console.log('MatchingPosts queryParams:', queryParams.toString())
    const query = getQueryParam(queryParams)
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
