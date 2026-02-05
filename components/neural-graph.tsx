'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Network } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { techStackData, getCategoryColor } from '@/lib/tech-stack-data'
import { useTheme } from "next-themes"

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

export function NeuralGraph() {
  const { theme } = useTheme()
  const graphRef = useRef<any>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const textColor = theme === 'dark' ? '#ffffff' : '#000000'

  useEffect(() => {
    // Set dimensions based on container
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = Math.min(400, width * 0.6)
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    // Center and zoom graph after mount
    if (graphRef.current) {
      graphRef.current.zoomToFit(400, 50)

      // Configure forces
      graphRef.current.d3Force('charge').strength(-200) // Increase repulsion
      graphRef.current.d3Force('link').distance(50) // Increase link distance
    }
  }, [])

  if (!isClient) return null

  return (
    <Card className="border-2 shadow-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Tech Stack Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full">
          <ForceGraph2D
            ref={graphRef}
            graphData={techStackData}
            width={dimensions.width}
            height={dimensions.height}
            nodeLabel="label"
            nodeRelSize={6}
            nodeVal={(node: any) => node.size}
            nodeColor={(node: any) => getCategoryColor(node.category)}
            nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
              const label = node.label
              const fontSize = 12 / globalScale
              const nodeSize = node.size

              // Draw node circle
              ctx.beginPath()
              ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI)
              ctx.fillStyle = getCategoryColor(node.category)
              ctx.fill()
              ctx.strokeStyle = textColor
              ctx.lineWidth = 1.5 / globalScale
              ctx.stroke()

              // Label Logic
              const isHub = ['react', 'python', 'nodejs', 'tensorflow', 'git'].includes(node.id)

              if (globalScale > 1.2) {
                // Show all labels
                ctx.font = `${fontSize}px Inter, sans-serif`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = textColor
                ctx.fillText(label, node.x, node.y + nodeSize + fontSize + 2)
              } else if (isHub) {
                // Show category label instead
                const categoryLabels: Record<string, string> = {
                  language: 'Languages',
                  frontend: 'Frontend',
                  backend: 'Backend',
                  ml: 'ML',
                  tools: 'Tools'
                }
                const categoryLabel = categoryLabels[node.category] || node.category
                const catFontSize = 10 / globalScale // Slightly smaller
                ctx.font = `bold ${catFontSize}px Inter, sans-serif`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'top' // Draw from top
                ctx.fillStyle = textColor
                // Move it further down: node.y + nodeSize + a gap
                ctx.fillText(categoryLabel, node.x, node.y + nodeSize + 4)
              }
            }}
            linkColor={() => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'}
            linkWidth={1.5}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            enableNodeDrag={true}
            enableZoomInteraction={true}
            enablePanInteraction={true}
            cooldownTime={3000}
          />
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 text-xs justify-center">
          {['language', 'frontend', 'backend', 'ml', 'tools'].map((category) => (
            <div key={category} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border border-black"
                style={{ backgroundColor: getCategoryColor(category as any) }}
              />
              <span className="capitalize">{category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
