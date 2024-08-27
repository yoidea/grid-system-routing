import Image from 'next/image'
import streetsData from './../../data/streets.yaml'
import avenuesData from './../../data/avenues.yaml'


export const dynamic = 'force-dynamic'

interface Params {
  slug: string;
}

export default async function Home({ params }: { params: Params }) {
  const streets = streetsData.streets
  const avenues = avenuesData.avenues

  const getNormalizedAddress = (address: string) => {
    const grid = address.split(/上ル|下ル|東入ル|西入ル/, 1)[0].split("通")
    const matchResult = address.match(/上ル|下ル|東入ル|西入ル/)
    if (matchResult === null) return null
    const suffix = matchResult[0]
    const street = streets.includes(grid[0]) ? grid[0] : streets.includes(grid[1]) ? grid[1] : null
    const avenue = avenues.includes(grid[0]) ? grid[0] : avenues.includes(grid[1]) ? grid[1] : null
    if (street === null || avenue === null) return null
    if (suffix === "上ル") {
      return `${avenue}通${street}上ル`
    }
    if (suffix === "下ル") {
      const streetIndex = streets.findIndex((name: string) => name === street)
      return `${avenue}通${streets[streetIndex + 1]}上ル`
    }
    if (suffix === "東入ル") {
      return `${street}通${avenue}東入ル`
    }
    if (suffix === "西入ル") {
      const avenueIndex = avenues.findIndex((name: string) => name === avenue)
      return `${street}通${avenues[avenueIndex + 1]}東入ル`
    }
  }

  const address = decodeURIComponent(params.slug)
  const normalizedAddress = getNormalizedAddress(address)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1>{decodeURIComponent(params.slug)}</h1>
      <Image 
        src={`/${normalizedAddress}.jpg`} 
        alt="サンプル画像" 
        width={150}
        height={150}
        layout="responsive"
        priority
      />
    </main>
  )
}
