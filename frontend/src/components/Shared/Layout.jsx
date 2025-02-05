import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container className="my-5">
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
