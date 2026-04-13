import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 100)
      : 'Eqilo.fi - Modern Timekeeping Solutions';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0055A4', // Eqilo Primary Blue
            color: 'white',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              marginBottom: 20,
            }}
          >
            EQILO.FI
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              opacity: 0.9,
            }}
          >
            {title}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 24,
              opacity: 0.8,
            }}
          >
            FDS Timing Equipment & Services
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
