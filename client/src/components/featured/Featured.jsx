import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {
    const {data, loading, error} = useFetch("/hotels/countByCity?cities=mumbai,delhi,manali")

  return (
    <div className="featured">
    {loading ? "loading" : <><div className="featuredItem">
        <img src = "https://cf.bstatic.com/xdata/images/city/square250/971346.webp?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="/>
        <div className="featuredTitle">
            <h1>Mumbai</h1>
            <h2>{data[0]} property</h2>
        </div>
    </div>
    <div className="featuredItem">
        <img src = "https://cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="/>
        <div className="featuredTitle">
            <h1>Delhi</h1>
            <h2>{data[1]} property</h2>
        </div>
    </div>
    <div className="featuredItem">
        <img src = "https://cf.bstatic.com/xdata/images/city/square250/684716.webp?k=4c3f55236cffa6597afa0ef11a9f012636f535bf9cc6c0e2ed8142e01fa14766&o="/>
        <div className="featuredTitle">
            <h1>Manali</h1>
            <h2>{data[2]} property</h2>
        </div>
    </div></>}
    </div>
  )
}

export default Featured