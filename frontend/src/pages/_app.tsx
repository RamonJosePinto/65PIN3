import type {AppProps} from "next/app";
import {ThemeProvider, type DefaultTheme} from "styled-components";
import GlobalStyle from "@/components/styles/globalstyles";
import NavBar from "@/components/NavBar.ui";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./_layout";
import {UserProvider} from "@/hooks/userContext";
import {SignUpProvider} from "@/hooks/SignUpContext";

const theme: DefaultTheme = {
    colors: {
        primary: "#111",
        secondary: "#0070f3",
    },
};

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <SignUpProvider>
                    <GlobalStyle />
                    <NavBar />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SignUpProvider>
            </UserProvider>
        </ThemeProvider>
    );
}
