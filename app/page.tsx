export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Welcome to Rajaryan002
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#666' }}>
        This site is powered by Next.js with Vercel Analytics
      </p>
    </main>
  )
}
