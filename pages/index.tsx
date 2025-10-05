import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(to bottom, #000000, #1a1a2e)'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '2rem', 
        color: '#00ccff',
        textAlign: 'center'
      }}>
        🚀 NASA ISS Experience
      </h1>
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <Link href="/nbl-training" style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          🎯 NBL Training Academy
        </Link>
      </div>
    </div>
  );
}
