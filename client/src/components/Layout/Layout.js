import React from 'react'
import Header from './Header'
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh]">
        {children}
      </main>
      <Footer />
    </div>

  )
}

export default Layout