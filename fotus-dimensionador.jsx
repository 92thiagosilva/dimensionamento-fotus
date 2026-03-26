import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Plus, Trash2, Edit2, Eye, EyeOff, BarChart3, Settings } from 'lucide-react';

// Cores Fotus - Identidade Visual
const FOTUS_COLORS = {
  primary: '#0066CC',      // Azul Fotus
  secondary: '#FFA500',    // Laranja Fotus
  accent: '#00AA44',       // Verde Energia
  dark: '#1a1a1a',
  light: '#f5f5f5',
  border: '#e0e0e0',
  danger: '#d32f2f',
  success: '#388e3c',
};

// Dados iniciais - Será substituído por BD real
const INITIAL_MODULES = [
  { id: 1, marca: 'HANERSUN', modelo: 'CP18-72H | 555W MONO (21,48%)', potencia: 555, isc: 13.86, voc: 50.22, imp: 12.98, vmp: 42.76, coef_v: -0.275, coef_p: 0.045 },
  { id: 2, marca: 'HANERSUN', modelo: 'HN18N-72H570W | 570W MONO N-TYPE (22,10%)', potencia: 570, isc: 14.11, voc: 51.0, imp: 13.32, vmp: 42.8, coef_v: -0.26, coef_p: 0.046 },
  { id: 3, marca: 'DAH', modelo: 'DHN-66Z16/DG | 610W MONO BIFACIAL N-TYPE DG (22,60%)', potencia: 610, isc: 15.88, voc: 48.2, imp: 14.91, vmp: 40.9, coef_v: -0.25, coef_p: 0.047 },
  { id: 4, marca: 'DAH', modelo: 'DHJ-66Y18/DG | 700W MONO N-TYPE BIFACIAL DG (22,53%)', potencia: 700, isc: 18.49, voc: 47.6, imp: 17.5, vmp: 40.0, coef_v: -0.25, coef_p: 0.048 },
  { id: 5, marca: 'RENESOLA', modelo: 'RS6-555M-E3 | 555W MONO (21,48%)', potencia: 555, isc: 14.04, voc: 49.95, imp: 13.19, vmp: 42.1, coef_v: -0.27, coef_p: 0.045 },
  { id: 6, marca: 'RENESOLA', modelo: 'RS6-585NG-E3 | 585W MONO N-TYPE DG (22,65%)', potencia: 585, isc: 13.89, voc: 52.17, imp: 13.22, vmp: 44.25, coef_v: -0.25, coef_p: 0.046 },
];

const INITIAL_INVERTERS = [
  { id: 1, marca: 'GE', modelo: 'GEP3.6-1-10 V C/ DPS - 2 MPPT', pnom: 3600, p_max_cc: 5500, rede_v: 220 },
  { id: 2, marca: 'GE', modelo: 'GEP5.0-1-10 V C/ DPS - 2 MPPT', pnom: 5000, p_max_cc: 7500, rede_v: 220 },
  { id: 3, marca: 'GE', modelo: 'GEP7.0-1-10 V C/ DPS - 3 MPPT', pnom: 7000, p_max_cc: 13500, rede_v: 220 },
  { id: 4, marca: 'GE', modelo: 'GEP9.0-1-10 V C/ DPS - 3 MPPT', pnom: 9000, p_max_cc: 13500, rede_v: 220 },
  { id: 5, marca: 'AUXSOL', modelo: 'ASN-15TL-G2 C/AFCI 380V (2 MPPT)', pnom: 15000, p_max_cc: 18000, rede_v: 380 },
  { id: 6, marca: 'AUXSOL', modelo: 'ASN-20TL-G2 C/AFCI 380V (2 MPPT)', pnom: 20000, p_max_cc: 24000, rede_v: 380 },
];

// Credenciais de Admin (hardcoded para demo - em produção usar autenticação real)
const ADMIN_CREDENTIALS = {
  usuario: 'fotus_tech',
  senha: 'Tech@2026',
};

// ============= LOGIN SCREEN =============
function LoginScreen({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (usuario === ADMIN_CREDENTIALS.usuario && senha === ADMIN_CREDENTIALS.senha) {
      onLogin();
      setErro('');
    } else {
      setErro('Usuário ou senha incorretos');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${FOTUS_COLORS.primary} 0%, ${FOTUS_COLORS.secondary} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '48px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Lock size={48} color={FOTUS_COLORS.primary} style={{ marginBottom: '16px' }} />
          <h1 style={{ color: FOTUS_COLORS.dark, margin: '0 0 8px 0', fontSize: '28px' }}>Painel Técnico</h1>
          <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>Fotus Dimensionador de Kits</p>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: FOTUS_COLORS.dark, fontWeight: '500', fontSize: '14px' }}>
            Usuário
          </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="fotus_tech"
            style={{
              width: '100%',
              padding: '12px',
              border: `2px solid ${FOTUS_COLORS.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px', position: 'relative' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: FOTUS_COLORS.dark, fontWeight: '500', fontSize: '14px' }}>
            Senha
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px',
                paddingRight: '40px',
                border: `2px solid ${FOTUS_COLORS.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={() => setMostrarSenha(!mostrarSenha)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#999',
                padding: '0',
                display: 'flex',
              }}
            >
              {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {erro && (
          <div style={{
            background: '#ffebee',
            color: FOTUS_COLORS.danger,
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            border: `1px solid ${FOTUS_COLORS.danger}`,
          }}>
            {erro}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            background: FOTUS_COLORS.primary,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.background = '#0052a3'}
          onMouseLeave={(e) => e.target.style.background = FOTUS_COLORS.primary}
        >
          Acessar Painel
        </button>

        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${FOTUS_COLORS.border}`, fontSize: '12px', color: '#999' }}>
          <p style={{ margin: '0 0 8px 0' }}>Credenciais de Demo:</p>
          <p style={{ margin: '4px 0' }}>👤 fotus_tech</p>
          <p style={{ margin: '4px 0' }}>🔑 Tech@2026</p>
        </div>
      </div>
    </div>
  );
}

// ============= ADMIN PANEL =============
function AdminPanel({ modules, inverters, onUpdate, onLogout }) {
  const [activeTab, setActiveTab] = useState('modules');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleSave = () => {
    if (activeTab === 'modules') {
      const updated = modules.map(m => m.id === editingId ? { ...formData } : m);
      onUpdate(updated, inverters);
    } else {
      const updated = inverters.map(i => i.id === editingId ? { ...formData } : i);
      onUpdate(modules, updated);
    }
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este item?')) {
      if (activeTab === 'modules') {
        onUpdate(modules.filter(m => m.id !== id), inverters);
      } else {
        onUpdate(modules, inverters.filter(i => i.id !== id));
      }
    }
  };

  const handleAddNew = () => {
    const newId = Math.max(...(activeTab === 'modules' ? modules : inverters).map(m => m.id || 0)) + 1;
    if (activeTab === 'modules') {
      setFormData({ id: newId, marca: '', modelo: '', potencia: 0, isc: 0, voc: 0, imp: 0, vmp: 0, coef_v: 0, coef_p: 0 });
    } else {
      setFormData({ id: newId, marca: '', modelo: '', pnom: 0, p_max_cc: 0, rede_v: 220 });
    }
    setEditingId(newId);
  };

  const data = activeTab === 'modules' ? modules : inverters;

  return (
    <div style={{
      minHeight: '100vh',
      background: FOTUS_COLORS.light,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: FOTUS_COLORS.primary,
        color: 'white',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Settings size={28} />
          <h1 style={{ margin: '0', fontSize: '24px' }}>Painel Técnico - Base de Dados</h1>
        </div>
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white',
        borderBottom: `2px solid ${FOTUS_COLORS.border}`,
        display: 'flex',
        gap: '0',
      }}>
        <button
          onClick={() => { setActiveTab('modules'); setEditingId(null); }}
          style={{
            flex: 1,
            padding: '16px',
            background: activeTab === 'modules' ? FOTUS_COLORS.primary : 'transparent',
            color: activeTab === 'modules' ? 'white' : FOTUS_COLORS.dark,
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
          }}
        >
          📦 Módulos Fotovoltaicos ({modules.length})
        </button>
        <button
          onClick={() => { setActiveTab('inverters'); setEditingId(null); }}
          style={{
            flex: 1,
            padding: '16px',
            background: activeTab === 'inverters' ? FOTUS_COLORS.primary : 'transparent',
            color: activeTab === 'inverters' ? 'white' : FOTUS_COLORS.dark,
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
          }}
        >
          ⚡ Inversores ({inverters.length})
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: '0', color: FOTUS_COLORS.dark }}>
            {activeTab === 'modules' ? 'Gerenciar Módulos' : 'Gerenciar Inversores'}
          </h2>
          {editingId === null && (
            <button
              onClick={handleAddNew}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: FOTUS_COLORS.accent,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => e.target.style.background = '#00883c'}
              onMouseLeave={(e) => e.target.style.background = FOTUS_COLORS.accent}
            >
              <Plus size={18} />
              Adicionar Novo
            </button>
          )}
        </div>

        {editingId !== null ? (
          <EditForm
            data={formData}
            setFormData={setFormData}
            isModule={activeTab === 'modules'}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '16px',
          }}>
            {data.map(item => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  border: `1px solid ${FOTUS_COLORS.border}`,
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <h3 style={{ color: FOTUS_COLORS.primary, margin: '0 0 8px 0', fontSize: '16px' }}>
                  {item.marca}
                </h3>
                <p style={{ color: '#666', margin: '0 0 12px 0', fontSize: '13px', lineHeight: '1.5' }}>
                  {item.modelo}
                </p>
                <div style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
                  {activeTab === 'modules' ? (
                    <>
                      <div>⚡ Potência: {item.potencia}W</div>
                      <div>Voc: {item.voc}V | Vmp: {item.vmp}V</div>
                    </>
                  ) : (
                    <>
                      <div>⚡ Potência: {item.pnom}W</div>
                      <div>Rede: {item.rede_v}V</div>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: FOTUS_COLORS.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <Edit2 size={14} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: FOTUS_COLORS.danger,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <Trash2 size={14} />
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============= EDIT FORM =============
function EditForm({ data, setFormData, isModule, onSave, onCancel }) {
  return (
    <div style={{
      background: 'white',
      border: `2px solid ${FOTUS_COLORS.primary}`,
      borderRadius: '8px',
      padding: '24px',
      maxWidth: '600px',
    }}>
      <h3 style={{ color: FOTUS_COLORS.dark, marginTop: '0' }}>
        {data.id ? 'Editar Item' : 'Adicionar Novo Item'}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: FOTUS_COLORS.dark }}>
            Marca *
          </label>
          <input
            type="text"
            value={data.marca || ''}
            onChange={(e) => setFormData({ ...data, marca: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${FOTUS_COLORS.border}`,
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
            placeholder="Ex: GE, HANERSUN"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: FOTUS_COLORS.dark }}>
            Modelo *
          </label>
          <input
            type="text"
            value={data.modelo || ''}
            onChange={(e) => setFormData({ ...data, modelo: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${FOTUS_COLORS.border}`,
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
            placeholder="Ex: CP18-72H | 555W"
          />
        </div>

        {isModule && (
          <>
            <InputField label="Potência (W)" value={data.potencia} onChange={(v) => setFormData({ ...data, potencia: v })} />
            <InputField label="Isc (A)" value={data.isc} onChange={(v) => setFormData({ ...data, isc: v })} step="0.01" />
            <InputField label="Voc (V)" value={data.voc} onChange={(v) => setFormData({ ...data, voc: v })} step="0.01" />
            <InputField label="Imp (A)" value={data.imp} onChange={(v) => setFormData({ ...data, imp: v })} step="0.01" />
            <InputField label="Vmp (V)" value={data.vmp} onChange={(v) => setFormData({ ...data, vmp: v })} step="0.01" />
            <InputField label="Coef V (%/°C)" value={data.coef_v} onChange={(v) => setFormData({ ...data, coef_v: v })} step="0.001" />
          </>
        )}

        {!isModule && (
          <>
            <InputField label="Potência Nominal (W)" value={data.pnom} onChange={(v) => setFormData({ ...data, pnom: v })} />
            <InputField label="Potência Máx CC (W)" value={data.p_max_cc} onChange={(v) => setFormData({ ...data, p_max_cc: v })} />
            <InputField label="Rede (V)" value={data.rede_v} onChange={(v) => setFormData({ ...data, rede_v: v })} />
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onSave}
          style={{
            flex: 1,
            padding: '12px',
            background: FOTUS_COLORS.accent,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          ✓ Salvar
        </button>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '12px',
            background: FOTUS_COLORS.border,
            color: FOTUS_COLORS.dark,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          ✕ Cancelar
        </button>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, step = '1' }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: FOTUS_COLORS.dark }}>
        {label}
      </label>
      <input
        type="number"
        step={step}
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : 0)}
        style={{
          width: '100%',
          padding: '10px',
          border: `1px solid ${FOTUS_COLORS.border}`,
          borderRadius: '4px',
          fontSize: '14px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

// ============= COMERCIAL INTERFACE =============
function ComercialInterface({ modules, inverters }) {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedInverter, setSelectedInverter] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comparison, setComparison] = useState(false);
  const [selectedModulesComparison, setSelectedModulesComparison] = useState([]);

  const handleAddToComparison = (module) => {
    if (!selectedModulesComparison.find(m => m.id === module.id)) {
      setSelectedModulesComparison([...selectedModulesComparison, module]);
    }
  };

  const handleRemoveFromComparison = (id) => {
    setSelectedModulesComparison(selectedModulesComparison.filter(m => m.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: FOTUS_COLORS.light,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: FOTUS_COLORS.primary,
        color: 'white',
        padding: '32px 24px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: 'bold' }}>
          ☀️ Dimensionador de Kits Fotovoltaicos
        </h1>
        <p style={{ margin: '0', fontSize: '16px', opacity: 0.95 }}>
          Fotus Distribuidora Solar - Encontre a melhor combinação de módulos e inversores
        </p>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {!comparison ? (
          <>
            {/* Seleção */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              marginBottom: '32px',
            }}>
              {/* Módulos */}
              <div>
                <h2 style={{ color: FOTUS_COLORS.primary, marginTop: '0', fontSize: '24px' }}>
                  📦 Selecione o Módulo
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '12px',
                  maxHeight: '600px',
                  overflowY: 'auto',
                  paddingRight: '12px',
                }}>
                  {modules.map(mod => (
                    <div
                      key={mod.id}
                      onClick={() => setSelectedModule(mod)}
                      style={{
                        background: selectedModule?.id === mod.id ? FOTUS_COLORS.primary : 'white',
                        color: selectedModule?.id === mod.id ? 'white' : FOTUS_COLORS.dark,
                        padding: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: `2px solid ${selectedModule?.id === mod.id ? FOTUS_COLORS.primary : FOTUS_COLORS.border}`,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedModule?.id !== mod.id) {
                          e.currentTarget.style.borderColor = FOTUS_COLORS.secondary;
                          e.currentTarget.style.background = '#f9f9f9';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedModule?.id !== mod.id) {
                          e.currentTarget.style.borderColor = FOTUS_COLORS.border;
                          e.currentTarget.style.background = 'white';
                        }
                      }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '6px' }}>
                        {mod.marca}
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
                        {mod.modelo}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>
                        ⚡ {mod.potencia}W
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setComparison(true)}
                  style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '12px',
                    background: FOTUS_COLORS.secondary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <BarChart3 size={18} />
                  Comparar Módulos
                </button>
              </div>

              {/* Inversores */}
              <div>
                <h2 style={{ color: FOTUS_COLORS.primary, marginTop: '0', fontSize: '24px' }}>
                  ⚡ Selecione o Inversor
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '12px',
                  maxHeight: '600px',
                  overflowY: 'auto',
                  paddingRight: '12px',
                }}>
                  {inverters.map(inv => (
                    <div
                      key={inv.id}
                      onClick={() => setSelectedInverter(inv)}
                      style={{
                        background: selectedInverter?.id === inv.id ? FOTUS_COLORS.accent : 'white',
                        color: selectedInverter?.id === inv.id ? 'white' : FOTUS_COLORS.dark,
                        padding: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: `2px solid ${selectedInverter?.id === inv.id ? FOTUS_COLORS.accent : FOTUS_COLORS.border}`,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedInverter?.id !== inv.id) {
                          e.currentTarget.style.borderColor = FOTUS_COLORS.primary;
                          e.currentTarget.style.background = '#f9f9f9';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedInverter?.id !== inv.id) {
                          e.currentTarget.style.borderColor = FOTUS_COLORS.border;
                          e.currentTarget.style.background = 'white';
                        }
                      }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '6px' }}>
                        {inv.marca}
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
                        {inv.modelo}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>
                        ⚡ {inv.pnom}W | {inv.rede_v}V
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultado da Seleção */}
            {selectedModule && selectedInverter && (
              <div style={{
                background: 'white',
                borderRadius: '8px',
                padding: '32px',
                border: `3px solid ${FOTUS_COLORS.primary}`,
                textAlign: 'center',
              }}>
                <h2 style={{ color: FOTUS_COLORS.primary, marginTop: '0' }}>
                  ✓ Kit Dimensionado
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px',
                  marginBottom: '32px',
                  textAlign: 'left',
                }}>
                  <div>
                    <h3 style={{ color: FOTUS_COLORS.primary, marginTop: '0' }}>Módulo</h3>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Marca:</strong> {selectedModule.marca}
                    </p>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Modelo:</strong> {selectedModule.modelo}
                    </p>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Potência:</strong> {selectedModule.potencia}W
                    </p>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Voc:</strong> {selectedModule.voc}V | <strong>Vmp:</strong> {selectedModule.vmp}V
                    </p>
                  </div>
                  <div>
                    <h3 style={{ color: FOTUS_COLORS.accent, marginTop: '0' }}>Inversor</h3>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Marca:</strong> {selectedInverter.marca}
                    </p>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Modelo:</strong> {selectedInverter.modelo}
                    </p>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Potência:</strong> {selectedInverter.pnom}W
                    </p>
                    <p style={{ fontSize: '14px', margin: '8px 0' }}>
                      <strong>Tensão:</strong> {selectedInverter.rede_v}V
                    </p>
                  </div>
                </div>

                <div style={{
                  background: '#e8f5e9',
                  border: `2px solid ${FOTUS_COLORS.accent}`,
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}>
                  <p style={{ color: FOTUS_COLORS.accent, fontWeight: 'bold', fontSize: '18px', margin: '0' }}>
                    ✓ Compatibilidade: VERIFICAR COM SUPORTE TÉCNICO
                  </p>
                </div>

                <p style={{ fontSize: '13px', color: '#666', margin: '0' }}>
                  Este é um dimensionamento inicial. Sempre consulte a equipe técnica da Fotus para validação completa das especificações.
                </p>
              </div>
            )}
          </>
        ) : (
          <ComparisonView
            modules={modules}
            selectedModules={selectedModulesComparison}
            onAdd={handleAddToComparison}
            onRemove={handleRemoveFromComparison}
            onBack={() => setComparison(false)}
          />
        )}
      </div>
    </div>
  );
}

function ComparisonView({ modules, selectedModules, onAdd, onRemove, onBack }) {
  const availableModules = modules.filter(m => !selectedModules.find(sm => sm.id === m.id));

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          padding: '12px 16px',
          background: FOTUS_COLORS.border,
          color: FOTUS_COLORS.dark,
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          marginBottom: '24px',
        }}
      >
        ← Voltar
      </button>

      <h2 style={{ color: FOTUS_COLORS.primary, marginTop: '0' }}>
        Comparador de Módulos
      </h2>

      {selectedModules.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '48px',
          textAlign: 'center',
          color: '#999',
        }}>
          <p style={{ fontSize: '18px' }}>Selecione módulos para comparar</p>
        </div>
      ) : (
        <div style={{
          overflowX: 'auto',
          background: 'white',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '800px',
          }}>
            <thead>
              <tr style={{ background: FOTUS_COLORS.primary, color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: 'none' }}>Marca</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: 'none' }}>Modelo</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: 'none' }}>Potência (W)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: 'none' }}>Voc (V)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: 'none' }}>Vmp (V)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: 'none' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {selectedModules.map((mod, idx) => (
                <tr key={mod.id} style={{ borderBottom: `1px solid ${FOTUS_COLORS.border}` }}>
                  <td style={{ padding: '12px' }}>{mod.marca}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{mod.modelo}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{mod.potencia}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{mod.voc}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{mod.vmp}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => onRemove(mod.id)}
                      style={{
                        padding: '6px 12px',
                        background: FOTUS_COLORS.danger,
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h3 style={{ color: FOTUS_COLORS.dark }}>Adicionar Mais Módulos</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {availableModules.map(mod => (
          <div
            key={mod.id}
            style={{
              background: 'white',
              border: `1px solid ${FOTUS_COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h4 style={{ color: FOTUS_COLORS.primary, margin: '0 0 8px 0' }}>
              {mod.marca}
            </h4>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 12px 0' }}>
              {mod.modelo}
            </p>
            <button
              onClick={() => onAdd(mod)}
              style={{
                width: '100%',
                padding: '8px',
                background: FOTUS_COLORS.secondary,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '12px',
              }}
            >
              + Adicionar à Comparação
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function FotusApp() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [inverters, setInverters] = useState(INITIAL_INVERTERS);

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  const handleUpdate = (newModules, newInverters) => {
    setModules(newModules);
    setInverters(newInverters);
  };

  // Botão flutuante para acessar admin (apenas visual)
  const handleAccessAdmin = () => {
    setIsAdmin(true);
  };

  return (
    <>
      {isAdmin ? (
        <AdminPanel
          modules={modules}
          inverters={inverters}
          onUpdate={handleUpdate}
          onLogout={handleAdminLogout}
        />
      ) : (
        <>
          <ComercialInterface modules={modules} inverters={inverters} />
          
          {/* Botão flutuante para acessar admin */}
          <button
            onClick={handleAccessAdmin}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: FOTUS_COLORS.primary,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              fontSize: '24px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            title="Acesso Técnico"
          >
            🔧
          </button>
        </>
      )}
    </>
  );
}
