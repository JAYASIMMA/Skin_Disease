import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  ShieldCheck, 
  MessageSquare, 
  CreditCard, 
  ChevronRight, 
  ChevronLeft, 
  Upload,
  CheckCircle2,
  Calendar,
  Globe,
  MapPin,
  Briefcase,
  Award,
  BookOpen,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';

const DoctorOnboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // 1. Personal
    full_name: localStorage.getItem('userName') || '', 
    dob: '', gender: '', profile_photo: '', phone_number: '', languages_spoken: [], city_location: '',
    // ... rest same
  });

  // Effect to load name if not present initially
  React.useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName && !formData.full_name) {
      setFormData(prev => ({ ...prev, full_name: savedName }));
    }
  }, []);

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const goToStep = (s) => setStep(s);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOnboardingSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:3000/doctor/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Onboarding submitted successfully! Awaiting admin approval.');
        window.location.href = '/doctor';
      } else {
        const err = await response.json();
        alert('Error: ' + err.detail);
      }
    } catch (err) {
      alert('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1: return <PersonalInfo data={formData} update={handleInputChange} />;
      case 2: return <ProfessionalCredentials data={formData} update={handleInputChange} />;
      case 3: return <VerificationDocuments data={formData} update={handleInputChange} />;
      case 4: return <ConsultationSettings data={formData} update={handleInputChange} />;
      case 5: return <BankingPayouts data={formData} update={handleInputChange} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', padding: '60px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          <button 
            onClick={() => window.location.href = '/doctor'}
            style={{ position: 'absolute', right: 0, top: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '8px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}
          >
            Skip for now
          </button>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>Professional Onboarding</h1>
          <p style={{ color: 'var(--text-dim)' }}>Finish setting up your account to start offering care.</p>
        </div>

        {/* Multi-step indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '24px', left: '0', width: '100%', height: '2px', background: 'var(--border)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', top: '24px', left: '0', width: `${(step - 1) * 25}%`, height: '2px', background: 'var(--primary)', zIndex: 0, transition: 'width 0.3s' }}></div>
          
          {[
            { n: 1, i: <User size={18} />, l: 'Personal' },
            { n: 2, i: <GraduationCap size={18} />, l: 'Professional' },
            { n: 3, i: <ShieldCheck size={18} />, l: 'Verification' },
            { n: 4, i: <MessageSquare size={18} />, l: 'Consultation' },
            { n: 5, i: <CreditCard size={18} />, l: 'Payouts' }
          ].map(s => (
            <div key={s.n} onClick={() => goToStep(s.n)} style={{ zIndex: 1, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: step >= s.n ? 'var(--primary)' : 'var(--bg-card)', 
                border: `2px solid ${step >= s.n ? 'var(--primary)' : 'var(--border)'}`,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 8px',
                transition: 'all 0.3s'
              }}>
                {s.i}
              </div>
              <span style={{ fontSize: '12px', color: step >= s.n ? 'white' : 'var(--text-dim)', fontWeight: 'bold' }}>{s.l}</span>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: '40px' }}>
          {renderStep()}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <button 
              disabled={step === 1 || loading}
              onClick={prevStep}
              className="glass-card"
              style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', opacity: step === 1 ? 0.5 : 1, color: '#fff' }}
            >
              <ChevronLeft size={20} /> Previous
            </button>
            
            {step < 5 ? (
              <button 
                onClick={nextStep}
                className="btn-primary"
                style={{ padding: '12px 32px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={handleOnboardingSubmit}
                disabled={loading}
                className="btn-primary animate-glow"
                style={{ padding: '12px 40px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #00e676, #00d2ff)' }}
              >
                {loading ? 'Submitting...' : 'Complete Onboarding'} <CheckCircle2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, required, note, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
       <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dim)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</label>
       <span style={{ fontSize: '10px', background: required ? 'rgba(108,99,255,0.1)' : 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', color: required ? 'var(--primary)' : 'var(--text-dim)' }}>{required ? 'REQUIRED' : 'OPTIONAL'}</span>
    </div>
    {children}
    {note && <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '6px' }}>{note}</p>}
  </div>
);

const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input 
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}
  />
);

const PersonalInfo = ({ data, update }) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
       <div style={{ background: 'rgba(108,99,255,0.1)', padding: '12px', borderRadius: '16px', color: 'var(--primary)' }}>
          <User size={24} />
       </div>
       <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Personal Information</h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <Field label="Full Name" required>
        <Input placeholder="Dr. Jane Smith" value={data.full_name} onChange={v => update('full_name', v)} />
      </Field>
      <Field label="Date of Birth" required>
        <Input placeholder="YYYY-MM-DD" type="date" value={data.dob} onChange={v => update('dob', v)} />
      </Field>
      <Field label="Gender" required>
        <select value={data.gender} onChange={e => update('gender', e.target.value)} style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}>
           <option value="">Select Gender</option>
           <option value="Male">Male</option>
           <option value="Female">Female</option>
           <option value="Other">Other</option>
        </select>
      </Field>
      <Field label="Phone Number" required>
        <Input placeholder="+1 234 567 890" value={data.phone_number} onChange={v => update('phone_number', v)} />
      </Field>
      <div style={{ gridColumn: '1 / -1' }}>
        <Field label="Profile Photo" required note="Clear professional headshot (Base64 for now)">
          <Input placeholder="Paste image base64..." value={data.profile_photo} onChange={v => update('profile_photo', v)} />
        </Field>
      </div>
      <Field label="City / Location" required>
        <Input placeholder="New York, NY" value={data.city_location} onChange={v => update('city_location', v)} />
      </Field>
      <Field label="Languages Spoken" note="Comma separated list">
        <Input placeholder="English, Spanish" value={data.languages_spoken.join(', ')} onChange={v => update('languages_spoken', v.split(',').map(s => s.trim()))} />
      </Field>
    </div>
  </div>
);

const ProfessionalCredentials = ({ data, update }) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
       <div style={{ background: 'rgba(0,210,255,0.1)', padding: '12px', borderRadius: '16px', color: 'var(--secondary)' }}>
          <GraduationCap size={24} />
       </div>
       <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Professional Credentials</h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <Field label="Medical Degree" required note="e.g. MBBS, MD">
         <Input value={data.medical_degree} onChange={v => update('medical_degree', v)} />
      </Field>
      <Field label="Specialization" required note="e.g. Dermatology">
         <Input value={data.specialization} onChange={v => update('specialization', v)} />
      </Field>
      <Field label="Years of Experience" required>
         <Input type="number" value={data.years_experience} onChange={v => update('years_experience', parseInt(v))} />
      </Field>
      <Field label="Medical College">
         <Input value={data.medical_college} onChange={v => update('medical_college', v)} />
      </Field>
      <div style={{ gridColumn: '1 / -1' }}>
        <Field label="Bio / About" note="Professional biography (150-200 words)">
          <textarea 
            value={data.bio}
            onChange={e => update('bio', e.target.value)}
            style={{ width: '100%', height: '120px', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', outline: 'none' }}
          />
        </Field>
      </div>
    </div>
  </div>
);

const VerificationDocuments = ({ data, update }) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
       <div style={{ background: 'rgba(0,230,118,0.1)', padding: '12px', borderRadius: '16px', color: 'var(--accent)' }}>
          <ShieldCheck size={24} />
       </div>
       <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Verification Documents</h2>
    </div>
    <Field label="Medical License Number" required>
       <Input value={data.license_number} onChange={v => update('license_number', v)} />
    </Field>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <Field label="License Document" required note="Upload image/PDF base64">
         <Input value={data.license_document} onChange={v => update('license_document', v)} />
      </Field>
      <Field label="ID Proof" required note="Aadhaar, Passport, etc.">
         <Input value={data.id_proof} onChange={v => update('id_proof', v)} />
      </Field>
    </div>
    <Field label="Hospital / Clinic Affiliation" required>
       <Input placeholder="Name + Address" value={data.affiliation_name} onChange={v => update('affiliation_name', v)} />
    </Field>
  </div>
);

const ConsultationSettings = ({ data, update }) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
       <div style={{ background: 'rgba(108,99,255,0.1)', padding: '12px', borderRadius: '16px', color: 'var(--primary)' }}>
          <MessageSquare size={24} />
       </div>
       <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Consultation Settings</h2>
    </div>
    <Field label="Consultation Modes Offered" required>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
        {['Chat', 'Video Call', 'Audio Call', 'In-person'].map(mode => (
          <div 
            key={mode}
            onClick={() => {
              const current = data.consultation_modes;
              if (current.includes(mode)) update('consultation_modes', current.filter(m => m !== mode));
              else update('consultation_modes', [...current, mode]);
            }}
            style={{ 
              padding: '10px 20px', 
              borderRadius: '12px', 
              background: data.consultation_modes.includes(mode) ? 'var(--primary)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${data.consultation_modes.includes(mode) ? 'var(--primary)' : 'var(--border)'}`,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {mode}
          </div>
        ))}
      </div>
    </Field>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
       <Field label="Standard Fee (Chat)" required>
          <Input type="number" placeholder="₹" onChange={v => update('consultation_fees', { ...data.consultation_fees, chat: v })} />
       </Field>
       <Field label="Standard Fee (Video)" required>
          <Input type="number" placeholder="₹" onChange={v => update('consultation_fees', { ...data.consultation_fees, video: v })} />
       </Field>
    </div>
    <Field label="Clinic Address" note="For in-person consultations">
       <Input value={data.clinic_address} onChange={v => update('clinic_address', v)} />
    </Field>
  </div>
);

const BankingPayouts = ({ data, update }) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
       <div style={{ background: 'rgba(0,210,255,0.1)', padding: '12px', borderRadius: '16px', color: 'var(--secondary)' }}>
          <CreditCard size={24} />
       </div>
       <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Banking & Payouts</h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <Field label="Account Holder Name" required>
         <Input value={data.account_holder_name} onChange={v => update('account_holder_name', v)} />
      </Field>
      <Field label="Bank Account Number" required>
         <Input value={data.bank_account_number} onChange={v => update('bank_account_number', v)} />
      </Field>
      <Field label="IFSC Code" required>
         <Input value={data.ifsc_code} onChange={v => update('ifsc_code', v)} />
      </Field>
      <Field label="PAN Card Number" required>
         <Input value={data.pan_number} onChange={v => update('pan_number', v)} />
      </Field>
    </div>
  </div>
);

export default DoctorOnboarding;
