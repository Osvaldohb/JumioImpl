
import Header from "./components/NavBar/Header";
import "./globals.css";
import inter from "./components/Fonts/Fonts";

  export const metadata = {
  title: 'DPR',
  icons: {
    icon: '/dpr_lab_logo.ico',
  }
};


export default function RootLayout({ children }) {




  return (
    <html lang="en">

      <body
        className={` antialiased ${inter.className} initBack_P2 animate__animated animate__fadeIn`}
      >
        <Header title={'Autenticación Personal'}/>
        {children}
       
      </body>
    </html>
  );
}
