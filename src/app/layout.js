import { Crimson_Text, DM_Serif_Text, Domine, Geist, Geist_Mono, Kanit, Neuton, Old_Standard_TT, Outfit, Poppins, Sora, Ultra } from "next/font/google";
import "./globals.css";
// import 'https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css';
import AuthContext from "./(merchant)/AuthContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "500", "600"]
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600", "700"]
})

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

const oldStandardTT = Old_Standard_TT({
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
  weight: ["400", "700"]
})

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
  weight: ["400"]
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

const neuton = Neuton({
  variable: "--font-neuton",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ['normal', 'italic']
})

const ultra = Ultra({
  variable: "--font-ultra",
  subsets: ["latin"],
  weight: ["400"],
})

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const metadata = {
  title: "Liste - Selling Simply",
  description: `Start your e-commerce journey here because you and your customers will love your Liste site.
  Build your product catalog, create the pages you want, and forget about the rest. Liste wants you to focus on selling your products.
  Create one page, one-hundred pages, or no pages. Your Liste site will always look and feel great`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"
        />
      </head>
      <body 
        className={`
          ${sora.variable} 
          ${outfit.variable} 
          ${crimsonText.variable} 
          ${domine.variable} 
          ${oldStandardTT.variable} 
          ${dmSerifText.variable} 
          ${poppins.variable}
          ${neuton.variable}
          ${ultra.variable} 
          ${kanit.variable}
        `}
      >
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
