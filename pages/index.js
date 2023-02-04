import Head from 'next/head';
import Layout from '../components/layouts/Layout';
import HomeOneCta from '../components/cta/HomeOneCta';
import MatrixBackground from '../components/layouts/MatrixBackground';

export default function NerkoTemplate() {
  return (
    
        <Layout>
			 <Head>
                <title>CantoPals NFT Collection</title>
            </Head>
			<MatrixBackground />
			<HomeOneCta/>
        </Layout>
        
  	);
}
