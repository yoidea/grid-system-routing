import Image from 'next/image'


export const dynamic = 'force-dynamic'

interface Params {
  slug: string;
}

export default async function Home({ params }: { params: Params }) {
  const convert2HS = (n: string) => n.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))

  const address = decodeURIComponent(params.slug)
  const grid = address.split("丁目", 1)[0].split(/条|大通/)
  
  const matchResult = address.match("丁目")
  if (matchResult === null) return null
  const x = grid[0] === "" ? 0 : grid[0][0] === "北" ? convert2HS(grid[0][1]) : -convert2HS(grid[0][1])
  const y = grid[1][0] === "東" ? convert2HS(grid[1][1]) : -convert2HS(grid[1][1])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1>{decodeURIComponent(params.slug)}</h1>
      <Image 
        src={`/${x},${y}.jpg`} 
        alt="サンプル画像" 
        width={150}
        height={150}
        layout="responsive"
        priority
      />
    </main>
  )
}
