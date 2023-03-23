"use client";
import '../styles/globals.css'
import DBContext from '../context/context'
import Header from '../components/header'

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DBContext>
          <Header />
          {children}
        </DBContext>
      </body>
    </html>
  )
}
