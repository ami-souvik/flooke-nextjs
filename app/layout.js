"use client";
import '../styles/globals.css'
import DBContext from '../context/context'

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DBContext>
          {children}
        </DBContext>
      </body>
    </html>
  )
}
