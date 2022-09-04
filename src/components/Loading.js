const [loading, setLoading] = React.useState(true)
function Loading() {
    return <div class="loading"></div>
}

const [data, setData] = React.useState({})
React.useEffect(() => {
    async function fetchAPI() {
        const response = await fetch('https://dog.ceo/api/breeds/image/random')
        const responseJson = await response.json()
        setData(responseJson)
        setLoading(false)
    }
    fetchAPI()
}, [])