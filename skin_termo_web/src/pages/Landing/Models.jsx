import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, Cpu, Zap, Activity, CheckCircle2, 
  BarChart3, PieChart, LineChart, Layers, ShieldCheck 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, ScatterChart, Scatter, 
  ZAxis, Legend, Line, ComposedChart 
} from 'recharts';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import './Models.css';

const modelsData = [
  {
    id: 'davit',
    name: 'DaViT',
    fullName: 'Dual Attention Vision Transformer',
    description: 'Our core architecture balancing spatial and channel attention for precise skin lesion segmentation.',
    accuracy: 98.5,
    parameters: 98.5,
    inference: 45,
    gflops: 4.5,
    attention: 'Dual (Spatial+Channel)',
    isRecommended: true,
    color: '#4facfe',
    icon: <BrainCircuit size={24} color="#4facfe" />
  },
  {
    id: 'pali',
    name: 'CoCo / PaLI',
    fullName: 'Pathways Language-Image Model',
    description: 'Multimodal large-scale foundation model adapted for medical visual question answering.',
    accuracy: 96.8,
    parameters: 90.0,
    inference: 120,
    gflops: 28.5,
    attention: 'Global Transformer',
    isRecommended: false,
    color: '#00f2fe',
    icon: <Layers size={24} color="#00f2fe" />
  },
  {
    id: 'convnext',
    name: 'ConvNeXt-V2',
    fullName: 'Modern Convolutional Network',
    description: 'A pure CNN architecture evolved with transformer-style design patterns for robust performance.',
    accuracy: 94.2,
    parameters: 89.0,
    inference: 38,
    gflops: 15.4,
    attention: 'Convolutional',
    isRecommended: false,
    color: '#a0aec0',
    icon: <Activity size={24} color="#a0aec0" />
  },
  {
    id: 'vit',
    name: 'ViT-Base',
    fullName: 'Vision Transformer',
    description: 'Standard transformer applying global self-attention across image patches.',
    accuracy: 95.2,
    parameters: 86.5,
    inference: 85,
    gflops: 17.5,
    attention: 'Global Spatial',
    isRecommended: false,
    color: '#718096',
    icon: <Cpu size={24} color="#718096" />
  },
  {
    id: 'resnet',
    name: 'ResNet-50',
    fullName: 'Residual Network',
    description: 'Classic deep residual learning framework acting as the industry baseline.',
    accuracy: 89.4,
    parameters: 25.6,
    inference: 20,
    gflops: 4.1,
    attention: 'None (Pure CNN)',
    isRecommended: false,
    color: '#4a5568',
    icon: <ShieldCheck size={24} color="#4a5568" />
  }
];

const PerformanceTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label || payload[0].payload.name}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color || '#4facfe' }}>
            {entry.name}: {entry.value}{entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Models = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="models-page">
      <LandingHeader activePage="models" />
      
      <main className="comparison-container">
        <motion.div 
          className="models-hero"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className="models-title" variants={itemVariants}>
            Advanced AI Architectures
          </motion.h1>
          <motion.p className="models-subtitle" variants={itemVariants}>
            Technical benchmarking across multimodal foundation models, modern CNNs, and our specialized Dual Attention Vision Transformers.
          </motion.p>
        </motion.div>

        {/* Charts Section */}
        <section className="viz-section">
          <div className="viz-header">
            <h2 className="viz-title">Comparative Analytics</h2>
            <p className="viz-description">Performance, Efficiency, and Scalability metrics visualized.</p>
          </div>

          <div className="charts-grid">
            {/* 1. Accuracy Comparison (Bar Chart) */}
            <motion.div 
              className="chart-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="chart-card-title">Top-1 Accuracy (%)</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={modelsData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#718096" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#718096" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
                  <Tooltip content={<PerformanceTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="accuracy" name="Accuracy" radius={[4, 4, 0, 0]} unit="%">
                    {modelsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isRecommended ? '#4facfe' : 'rgba(79, 172, 254, 0.3)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* 2. Parameter Distribution (Histogram/Stack) */}
            <motion.div 
              className="chart-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="chart-card-title">Model Size (Millions of Parameters)</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={modelsData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#718096" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#718096" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<PerformanceTooltip />} />
                  <Bar dataKey="parameters" name="Parameters" radius={[0, 4, 4, 0]} unit="M">
                    {modelsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.id === 'pali' ? '#00f2fe' : 'rgba(0, 242, 254, 0.2)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* 3. Efficiency Plot (Scatter) */}
            <motion.div 
              className="chart-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ gridColumn: 'span 2' }}
            >
              <h3 className="chart-card-title">Efficiency Matrix (Speed vs Accuracy)</h3>
              <ResponsiveContainer width="100%" height="85%">
                <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" dataKey="inference" name="Inference Speed" unit="ms" stroke="#718096" fontSize={12} label={{ value: 'Latency (ms)', position: 'bottom', fill: '#718096', fontSize: 10 }} />
                  <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%" stroke="#718096" fontSize={12} domain={[85, 100]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#718096', fontSize: 10 }} />
                  <ZAxis type="number" dataKey="gflops" range={[100, 1000]} name="GFLOPs" />
                  <Tooltip content={<PerformanceTooltip />} />
                  <Legend verticalAlign="top" height={36} />
                  {modelsData.map((model) => (
                    <Scatter 
                      key={model.id} 
                      name={model.name} 
                      data={[model]} 
                      fill={model.color} 
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </section>

        {/* Model Cards Grid */}
        <motion.div 
          className="model-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {modelsData.map((model) => (
            <motion.div 
              key={model.id} 
              className={`model-card ${model.isRecommended ? 'highlight' : ''}`}
              variants={itemVariants}
            >
              <div className="card-glow"></div>
              <div className="model-header">
                <div className="model-icon">
                  {model.icon}
                </div>
                <div>
                  <h3 className="model-name">{model.name}</h3>
                  <div className="model-badge">{model.fullName}</div>
                </div>
              </div>
              
              <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                {model.description}
              </p>

              <div className="metric-group">
                <div className="metric-label">
                  <span>Inference Latency</span>
                  <span className="metric-value">{model.inference}ms</span>
                </div>
                <div className="progress-bar-bg">
                  <motion.div 
                    className="progress-bar-fill"
                    style={{ background: model.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(10, 100 - (model.inference / 1.2))}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Data Table */}
        <motion.div 
          className="comparison-table-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Architecture</th>
                <th>Accuracy</th>
                <th>Params</th>
                <th>GFLOPs</th>
                <th>Inference</th>
                <th>Attention Mechanism</th>
              </tr>
            </thead>
            <tbody>
              {modelsData.sort((a,b) => b.accuracy - a.accuracy).map((model) => (
                <tr key={model.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: model.isRecommended ? '#fff' : '#a0aec0', fontWeight: model.isRecommended ? 600 : 400 }}>
                      {model.icon} {model.name} {model.isRecommended && "(Best)"}
                    </div>
                  </td>
                  <td className={model.accuracy > 96 ? "best-value" : ""}>
                    {model.accuracy > 96 && <CheckCircle2 size={14} />} {model.accuracy}%
                  </td>
                  <td>{model.parameters}M</td>
                  <td>{model.gflops}</td>
                  <td>{model.inference}ms</td>
                  <td>{model.attention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Models;
