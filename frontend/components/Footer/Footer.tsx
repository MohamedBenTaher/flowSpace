import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary text-slate-900  py-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">FlowSpace</h2>
          <p className="text-sm">123 Main St, Anytown, USA</p>
          <p className="text-sm">contact@flowSpace.com</p>
        </div>
        <nav className="flex flex-wrap space-x-4">
          <a href="#" className="text-sm hover:text-accent transition-colors duration-200">Home</a>
          <a href="#" className="text-sm hover:text-accent transition-colors duration-200">About</a>
          <a href="#" className="text-sm hover:text-accent transition-colors duration-200">Services</a>
          <a href="#" className="text-sm hover:text-accent transition-colors duration-200">Contact</a>
        </nav>
      </div>
    </div>
  </footer>
  )
}

export default Footer