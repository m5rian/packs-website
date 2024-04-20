import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import './globals.css';
import styled from "@emotion/styled";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    return (
        <>
            <Head>
                <meta name="google-adsense-account" content="ca-pub-3472245250960619"/>
            </Head>
            <MainContainer>
                <Component {...pageProps} />
                <div className="p-5 flex justify-between border-t border-t-primary-1">
                    <HorizontalLayout>
                        <img className="h-10" src={"/favicon.ico"} alt={"logo"}/>
                        <div>
                            <p className="text-secondary-4 text-sm leading-snug">Website by marian</p>
                            <p className="text-secondary-4 text-sm leading-snug">Copyright © 2023-{new Date().getFullYear()} marian</p>
                        </div>
                    </HorizontalLayout>

                    <ul className="flex gap-10">
                        <ul>
                            <li><h3 className="text-lg font-medium text-secondary-2">Pages</h3></li>
                            <li><a className="text-secondary-3" href={"/"}>Home</a></li>
                            <li><a className="text-secondary-3" href={"/terms"}>Terms of Service</a></li>
                        </ul>
                        <ul>
                            <li><h3 className="text-lg font-medium text-secondary-2">Socials</h3></li>
                            <li><a className="text-secondary-3" href={"https://www.youtube.com/@m5rian"}>Youtube</a></li>
                            <li><a className="text-secondary-3" href={"https://discord.gg/nG4uKuB"}>Discord</a></li>
                        </ul>
                    </ul>
                </div>
            </MainContainer>
        </>
    );
}

const MainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const HorizontalLayout = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  width: fit-content;
`