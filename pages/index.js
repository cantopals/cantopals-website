import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layouts/Layout';
import HeroBannerOne from '../components/banners/HeroBannerOne';
import BrandOne from '../components/brand/BrandOne';
import Divider from '../components/Divider';
import HomeOneMinting from '../components/minting/HomeOneMinting';
import HomeOneCta from '../components/cta/HomeOneCta';
import HomeOneNumber from '../components/number/HomeOneNumber';
import HomeOneAbout from '../components/about/HomeOneAbout';
import HomeOneCollection from '../components/collection/HomeOneCollection';
import HomeOneRoadMap from '../components/roadmap/HomeOneRoadMap2';
import TeamOne from '../components/team/TeamOne';
import FaqOne from '../components/faq/FaqOne';
export default function NerkoTemplate() {
  return (
    
        <Layout>
			 <Head>
                <title>CantoPals NFT Collection</title>
            </Head>			
			<HeroBannerOne/>
			<Divider/>
			<HomeOneCollection title="yes"/>
			<Divider/> 
			<HomeOneCta/>
        </Layout>
        
  	);
}
