import React, { useState, useEffect } from 'react';
import { 
  User, GraduationCap, ShieldCheck, MessageSquare, CreditCard, 
  ChevronRight, ChevronLeft, Upload, CheckCircle2, MapPin, Phone, Globe, Briefcase
} from 'lucide-react';

const DoctorSettings = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '', dob: '', gender: '', profile_photo: '', phone_number: '', languages_spoken: [], city_location: '',
    medical_degree: '', specialization: '', years_experience: '', medical_college: '', bio: '',
    license_number: '', license_document: '', id_proof: '', affiliation_name: '',
    consultation_modes: [], consultation_fees: {}, availability_schedule: {}, clinic_address: '',
    bank_account_number: '', ifsc_code: '', account_holder_name: '', pan_number: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      // We need user ID, let's assume it's stored or we get it from token (for now using a placeholder or needing a 'me' endpoint)
      // Actually, let's use a "GET /doctor/me/profile" if it exists, or decode token.
      // Since I don't have user ID easily, I'll fetch by a placeholder or fix backend to support /me
      const response = await fetch('http://127.0.0.1:8000/doctor/me/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Failed to fetch profile");
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/doctor/onboarding', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Update failed');
      }
    } catch (err) {
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ color: 'white' }}>Loading professional profile...</div>;

  return (
    <div className="animate-fade-up" style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>Professional Profile</h1>
        <p style={{ color: 'var(--text-dim)' }}>Manage your credentials, consultation settings, and clinic details.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        {[
          { n: 1, i: <User size={18} />, l: 'Personal' },
          { n: 2, i: <GraduationCap size={18} />, l: 'Professional' },
          { n: 3, i: <ShieldCheck size={18} />, l: 'Verification' },
          { n: 4, i: <MessageSquare size={18} />, l: 'Consultation' },
          { n: 5, i: <CreditCard size={18} />, l: 'Payouts' }
        ].map(s => (
          <button 
            key={s.n} 
            onClick={() => setStep(s.n)}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: step === s.n ? 1 : 0.4, transition: '0.3s'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: step === s.n ? 'var(--primary)' : 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              {s.i}
            </div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'white' }}>{s.l}</span>
          </button>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '32px' }}>
        {step === 1 && <PersonalInfo data={formData} update={handleInputChange} />}
        {step === 2 && <ProfessionalCredentials data={formData} update={handleInputChange} />}
        {step === 3 && <VerificationDocuments data={formData} update={handleInputChange} />}
        {step === 4 && <ConsultationSettings data={formData} update={handleInputChange} />}
        {step === 5 && <BankingPayouts data={formData} update={handleInputChange} />}

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
           <button 
             onClick={handleUpdate} 
             disabled={loading}
             className="btn-primary" 
             style={{ padding: '12px 32px' }}
           >
             {loading ? 'Saving Changes...' : 'Save Profile Changes'}
           </button>
        </div>
      </div>
    </div>
  );
};

// --- Reusing Sub-components with identical design ---
const Field = ({ label, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>{label}</label>
    {children}
  </div>
);

const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input 
    type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', outline: 'none' }}
  />
);

const PersonalInfo = ({ data, update }) => (
  <div className="grid-2">
    <Field label="Full Name"><Input value={data.full_name} onChange={v => update('full_name', v)} /></Field>
    <Field label="Phone Number"><Input value={data.phone_number} onChange={v => update('phone_number', v)} /></Field>
    <Field label="City"><Input value={data.city_location} onChange={v => update('city_location', v)} /></Field>
    <Field label="Bio"><Input value={data.bio} onChange={v => update('bio', v)} /></Field>
  </div>
);

const ProfessionalCredentials = ({ data, update }) => (
  <div className="grid-2">
    <Field label="Medical Degree"><Input value={data.medical_degree} onChange={v => update('medical_degree', v)} /></Field>
    <Field label="Specialization"><Input value={data.specialization} onChange={v => update('specialization', v)} /></Field>
    <Field label="Experience (Years)"><Input type="number" value={data.years_experience} onChange={v => update('years_experience', v)} /></Field>
    <Field label="Medical College"><Input value={data.medical_college} onChange={v => update('medical_college', v)} /></Field>
  </div>
);

const VerificationDocuments = ({ data, update }) => (
  <div className="grid-1">
    <Field label="Medical License Number"><Input value={data.license_number} onChange={v => update('license_number', v)} /></Field>
    <Field label="Clinic Affiliation"><Input value={data.affiliation_name} onChange={v => update('affiliation_name', v)} /></Field>
  </div>
);

const ConsultationSettings = ({ data, update }) => (
  <div className="grid-2">
    <Field label="Clinic Address"><Input value={data.clinic_address} onChange={v => update('clinic_address', v)} /></Field>
    <Field label="Chat Fee (₹)"><Input type="number" value={data.consultation_fees.chat} onChange={v => update('consultation_fees', { ...data.consultation_fees, chat: v })} /></Field>
  </div>
);

const BankingPayouts = ({ data, update }) => (
  <div className="grid-2">
    <Field label="Account Holder"><Input value={data.account_holder_name} onChange={v => update('account_holder_name', v)} /></Field>
    <Field label="Account Number"><Input value={data.bank_account_number} onChange={v => update('bank_account_number', v)} /></Field>
    <Field label="IFSC Code"><Input value={data.ifsc_code} onChange={v => update('ifsc_code', v)} /></Field>
  </div>
);

export default DoctorSettings;
