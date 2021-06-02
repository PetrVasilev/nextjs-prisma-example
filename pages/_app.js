import Head from 'next/head'

import '../style.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>ToDo app</title>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css"
                />
                <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
