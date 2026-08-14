-- Seed initial users
INSERT INTO users (id, username, email, full_name, created_at)
VALUES (1, 'harshavarma', 'harsha.varma@gmail.com', 'Harsha Varma', CURRENT_TIMESTAMP);

INSERT INTO users (id, username, email, full_name, created_at)
VALUES (2, 'rohit_sharma', 'rohit.s@example.com', 'Rohit Sharma', CURRENT_TIMESTAMP);

INSERT INTO users (id, username, email, full_name, created_at)
VALUES (3, 'priya_reddy', 'priya.r@example.com', 'Priya Reddy', CURRENT_TIMESTAMP);

INSERT INTO users (id, username, email, full_name, created_at)
VALUES (4, 'ananya_pandey', 'ananya.p@example.com', 'Ananya Pandey', CURRENT_TIMESTAMP);

-- Seed Indian Concert Events with Distinct Unique Image URLs
INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (1, 'Diljit Dosanjh: Dil-Luminati India Tour 2026', 'The biggest Punjabi music stadium tour featuring explosive live beats and light production.', 'Jawaharlal Nehru Stadium, New Delhi', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '15' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (2, 'A.R. Rahman: Marakkuma Nenjam Live Concert', 'Symphonic live orchestra performance with Maestro A.R. Rahman featuring iconic hits.', 'YMCA Grounds, Chennai', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '45' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (3, 'Karan Aujla: It Was All A Dream India Tour', 'High-energy live performance by Punjabi rap icon Karan Aujla.', 'MMRDA Grounds, BKC, Mumbai', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '60' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (4, 'Sunburn Festival Goa 2026', 'Asia''s premier electronic dance music weekend festival at Vagator Beach.', 'Vagator Beach, Goa', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '90' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (5, 'Shreya Ghoshal: All Hearts Tour 2026', 'Mesmerizing vocal melodies and soulful hit classics live with full acoustic ensemble.', 'Indira Gandhi Arena, New Delhi', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '30' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (6, 'Coldplay: Music of the Spheres India Stadium Tour', 'World-renowned stadium lightshow, pyrotechnics, and iconic anthems live in Mumbai.', 'D.Y. Patil Stadium, Navi Mumbai', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '120' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (7, 'Sonu Nigam: Live In Concert 2026', 'Unforgettable evening of timeless Bollywood melodies and chart-topping hits.', 'NESCO Center, Goregaon, Mumbai', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '75' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (8, 'Prateek Kuhad: Silhouettes India Tour', 'Intimate indie acoustic melodies and chart-topping hits live under stadium lights.', 'Manpho Convention Center, Bengaluru', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '50' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO events (id, title, description, venue, image_url, event_date, status, created_at)
VALUES (9, 'Divine: Baazigar Hip-Hop Festival', 'Gully Gang explosive hip-hop beats, raw rhymes, and high-energy stage performance.', 'Supercar Club Grounds, Thane, Mumbai', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&auto=format&fit=crop&q=80', CURRENT_TIMESTAMP + INTERVAL '40' DAY, 'ACTIVE', CURRENT_TIMESTAMP);

-- Seed Ticket Categories (Prices in INR ₹)
-- Event 1: Diljit Dosanjh
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (1, 1, 'Fan Pit Standing', 9999.00, 5000, 5000, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (2, 1, 'VIP Gold Lounge', 18500.00, 500, 500, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (3, 1, 'Silver Seated Tier 1', 4999.00, 1000, 1000, 0);

-- Event 2: A.R. Rahman
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (4, 2, 'Diamond Premium Enclosure', 12000.00, 2000, 2000, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (5, 2, 'Gold General Entry', 2500.00, 4000, 4000, 0);

-- Event 3: Karan Aujla
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (6, 3, 'Fan Zone Standing', 7500.00, 3000, 3000, 0);

-- Event 4: Sunburn Goa
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (7, 4, 'Full Weekend VIP Pass', 15000.00, 2500, 2500, 0);

-- Event 5: Shreya Ghoshal
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (8, 5, 'VIP Royal Enclosure', 11500.00, 1200, 1200, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (9, 5, 'Gold Seated Tier 1', 3500.00, 3500, 3500, 0);

-- Event 6: Coldplay
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (10, 6, 'Infinity Fan Zone Floor', 12500.00, 8000, 8000, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (11, 6, 'Lounge Level 1 VIP', 25000.00, 1000, 1000, 0);

-- Event 7: Sonu Nigam
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (12, 7, 'Diamond Club Seating', 8999.00, 1500, 1500, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (13, 7, 'Silver Floor Entry', 2999.00, 4000, 4000, 0);

-- Event 8: Prateek Kuhad
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (14, 8, 'Front Row Fan Zone', 4500.00, 1800, 1800, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (15, 8, 'GA Standing Entry', 1999.00, 3000, 3000, 0);

-- Event 9: Divine
INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (16, 9, 'Gully Gang Pit Standing', 3999.00, 2500, 2500, 0);

INSERT INTO ticket_categories (id, event_id, name, price, total_capacity, available_stock, version)
VALUES (17, 9, 'Early Bird Entry', 1800.00, 3500, 3500, 0);
