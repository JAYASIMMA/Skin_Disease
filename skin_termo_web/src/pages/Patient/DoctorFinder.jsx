import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, Mail, Clock, MapPin, Navigation, Star } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Dermatologist",
    hospital: "City Skin Clinic",
    rating: 4.9,
    reviews: 128,
    lat: 12.9716,
    lng: 77.5946,
    address: "123 Healthcare Blvd, Bangalore",
    phone: "+91 98765 43210",
    email: "sarah.j@cityskin.com",
    hours: "09:00 AM - 05:00 PM"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cosmetic Surgeon",
    hospital: "Vogue Aesthetics",
    rating: 4.8,
    reviews: 95,
    lat: 12.9352,
    lng: 77.6245,
    address: "45 Fashion St, Koramangala",
    phone: "+91 87654 32109",
    email: "michael.c@vogue.com",
    hours: "10:00 AM - 07:00 PM"
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatric Dermatologist",
    hospital: "Kids Care Hospital",
    rating: 5.0,
    reviews: 210,
    lat: 12.9056,
    lng: 77.5273,
    address: "88 Child Lane, Rajajinagar",
    phone: "+91 76543 21098",
    email: "elena.r@kidscare.com",
    hours: "08:00 AM - 04:00 PM"
  }
];

const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const DoctorFinder = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Find a Specialist</h1>
        <p style={{ color: 'var(--text-dim)' }}>Locate the best dermatologists near you and get expert advice.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '32px', minHeight: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '600px', paddingRight: '10px' }}>
          {doctors.map((doc) => (
            <div 
              key={doc.id} 
              className="glass-card" 
              onClick={() => setSelectedDoctor(doc)}
              style={{ 
                padding: '20px', 
                cursor: 'pointer', 
                border: selectedDoctor.id === doc.id ? '1px solid var(--secondary)' : '1px solid var(--border)',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px' }}>{doc.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffc107', fontSize: '14px' }}>
                  <Star size={14} fill="#ffc107" /> {doc.rating}
                </div>
              </div>
              <p style={{ color: 'var(--secondary)', fontSize: '14px', marginBottom: '4px' }}>{doc.specialty}</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} /> {doc.hospital}
              </p>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
          <MapContainer 
            center={[selectedDoctor.lat, selectedDoctor.lng]} 
            zoom={13} 
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={[selectedDoctor.lat, selectedDoctor.lng]} />
            {doctors.map(doc => (
              <Marker key={doc.id} position={[doc.lat, doc.lng]}>
                <Popup>{doc.name}<br/>{doc.specialty}</Popup>
              </Marker>
            ))}
          </MapContainer>

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{selectedDoctor.name}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{selectedDoctor.address}</p>
              </div>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Navigation size={18} /> Get Route
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div className="glass-card" style={{ padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <Phone size={20} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Contact</p>
                <p style={{ fontSize: '13px' }}>{selectedDoctor.phone}</p>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <Mail size={20} color="var(--secondary)" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Email</p>
                <p style={{ fontSize: '13px' }}>{selectedDoctor.email}</p>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                <Clock size={20} color="var(--accent)" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Hours</p>
                <p style={{ fontSize: '13px' }}>{selectedDoctor.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;
