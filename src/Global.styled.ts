import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    
    html {
        scroll-behavior: smooth;
    }
    
    body {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #282c34;
        color: white;
    }
`