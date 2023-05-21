import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {Inter} from 'next/font/google';
import './globals.css';
import styled from "@emotion/styled";

const inter = Inter({subsets: ['latin']});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    return (
        <main className={inter.className}>
            <Component {...pageProps} />
            <Footer>
                <HorizontalLayout>
                    <img src={"/favicon.ico"} alt={""}/>
                    <Section>
                        <li>Website by marian</li>
                        <li>Copyright © 2023 marian</li>
                    </Section>
                </HorizontalLayout>
                <Section>
                    <li><h3>Socials</h3></li>
                    <li><a href={"https://www.youtube.com/@m5rian"}>Youtube</a></li>
                    <li><a href={"https://discord.gg/nG4uKuB"}>Discord</a></li>
                </Section>
            </Footer>
        </main>
    );
}

const Footer = styled.footer`
  margin-top: 5rem;
  border-top: var(--border);
  padding: 2rem;
  display: flex;
  justify-content: space-around;
`

const Section = styled.ul`
    list-style: none;
`

const HorizontalLayout = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  width: fit-content;
`