import './index.sass';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <h1>Lizard Global Assessment</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2025 Lizard Global Assessment</p>
      </footer>
    </>
  );
}
