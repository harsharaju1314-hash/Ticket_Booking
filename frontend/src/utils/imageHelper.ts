export const getConcertImage = (title: string): string => {
  const t = title.toLowerCase();

  if (t.includes('diljit') || t.includes('dil-luminati')) {
    return 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('coldplay')) {
    return 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('shreya')) {
    return 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('rahman')) {
    return 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('aujla')) {
    return 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('sonu')) {
    return 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('prateek')) {
    return 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('divine')) {
    return 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&auto=format&fit=crop&q=80';
  }
  if (t.includes('sunburn') || t.includes('goa')) {
    return 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop&q=80';
  }

  return 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop&q=80';
};
