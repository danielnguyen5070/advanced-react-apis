
import React, { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

type Position = {
    top: number
    left: number
    right: number
    bottom: number
}

export function ButtonWithTooltip({ tooltipContent, ...buttonProps }: { tooltipContent: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const toolRef = React.useRef<HTMLDivElement>(null)
    const [buttonPosition, setButtonPosition] = useState<Position | null>(null)
    const [tooltipHeight, setTooltipHeight] = useState(0)

    useLayoutEffect(() => {
        const tool = toolRef.current
        const rect = tool?.getBoundingClientRect()
        if (rect) {
            setTooltipHeight(rect.height)
        }
    }, [buttonPosition])

    function displayTooltip() {
        const button = buttonRef.current
        if (!button) return
        const rect = button.getBoundingClientRect()
        setButtonPosition({
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
        })
    }

    function hideTooltip() {
        setButtonPosition(null)
    }

    let tooltipX = 0
    let tooltipY = 0
    if (buttonPosition) {
        tooltipX = buttonPosition.left
        tooltipY = buttonPosition.top - tooltipHeight
        if (tooltipY < 0) {
            tooltipY = buttonPosition.bottom // If it goes off the top, position it below the button
        }
        tooltipX += window.scrollX
        tooltipY += window.scrollY
    }

    const now = performance.now()
    while (performance.now() - now < 100) {
        // Do nothing for a bit...
    }

    return (
        <div
            onMouseEnter={displayTooltip}
            onMouseLeave={hideTooltip}>
            <button
                className="text-gray-500 mr-2"
                {...buttonProps}
                ref={buttonRef}
            >
            </button>
            {
                buttonPosition && (
                    createPortal(
                        <div className=" bg-gray-700 text-white text-sm rounded p-2 shadow-lg"
                            style={{
                                position: 'absolute',
                                top: tooltipY, // Adjust to position below the button
                                left: tooltipX,
                                zIndex: 1000,
                            }}
                            ref={toolRef}>
                            {tooltipContent}
                        </div>, document.body,
                    )
                )
            }
        </div>
    )
}
