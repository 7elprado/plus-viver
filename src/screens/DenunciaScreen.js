import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;
const isWeb = Platform.OS === 'web';

const colors = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  success: '#10B981',
  dark: '#1F2937',
  gray: '#6B7280',
  grayLight: '#9CA3AF',
  grayExtraLight: '#E5E7EB',
  light: '#F3F4F6',
  white: '#FFFFFF',
  black: '#000000',
};

export default function DenunciaScreen({ navigation }) {
  const [tipo, setTipo] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [protocolo, setProtocolo] = useState('');

  const [camposInvalidos, setCamposInvalidos] = useState({
    tipo: false,
    nome: false,
    contato: false,
    local: false,
    data: false,
    descricao: false,
  });

  const tipos = [
    { id: 'saude', nome: '🏥 Saúde', cor: '#EF4444' },
    { id: 'trabalho', nome: '🏢 Trabalho', cor: '#3B82F6' },
    { id: 'transporte', nome: '🚌 Transporte', cor: '#F59E0B' },
    { id: 'educacao', nome: '🎓 Educação', cor: '#10B981' },
    { id: 'lazer', nome: '🎬 Lazer', cor: '#8B5CF6' },
    { id: 'funeral', nome: '⚰️ Funeral', cor: '#6B7280' },
  ];

  const mensagensApoio = [
    "💪 Você é forte e sua voz importa!",
    "🌟 Parabéns por denunciar! Juntos somos mais fortes.",
    "🤝 Sua coragem inspira outras pessoas.",
    "⚖️ Justiça será feita! Conte conosco.",
    "❤️ Você não está sozinho nessa luta.",
    "🎯 Mais uma denúncia contra a discriminação!",
    "🏆 Sua atitude faz a diferença!",
    "📢 Sua voz está sendo ouvida!",
    "✨ O primeiro passo para a mudança é denunciar!",
    "🌱 Sua coragem planta sementes de mudança!"
  ];

  const mensagemApoio = mensagensApoio[Math.floor(Math.random() * mensagensApoio.length)];

  const handleEnviar = () => {
    const erros = [];
    
    if (!tipo) {
      erros.push('• Tipo de discriminação');
      setCamposInvalidos(prev => ({ ...prev, tipo: true }));
    } else {
      setCamposInvalidos(prev => ({ ...prev, tipo: false }));
    }
    
    if (!nome) {
      erros.push('• Seu nome');
      setCamposInvalidos(prev => ({ ...prev, nome: true }));
    } else {
      setCamposInvalidos(prev => ({ ...prev, nome: false }));
    }
    
    if (!contato) {
      erros.push('• E-mail ou WhatsApp');
      setCamposInvalidos(prev => ({ ...prev, contato: true }));
    } else {
      setCamposInvalidos(prev => ({ ...prev, contato: false }));
    }
    
    if (!local) {
      erros.push('• Local do ocorrido');
      setCamposInvalidos(prev => ({ ...prev, local: true }));
    } else {
      setCamposInvalidos(prev => ({ ...prev, local: false }));
    }
    
    if (!data) {
      erros.push('• Data do ocorrido');
      setCamposInvalidos(prev => ({ ...prev, data: true }));
    } else {
      setCamposInvalidos(prev => ({ ...prev, data: false }));
    }
    
    if (!descricao) {
      erros.push('• Descrição detalhada');
      setCamposInvalidos(prev => ({ ...prev, descricao: true }));
    } else {
      setCamposInvalidos(prev => ({ ...prev, descricao: false }));
    }

    if (erros.length > 0) {
      Alert.alert(
        '⚠️ Campos obrigatórios',
        `Por favor, preencha todos os campos:\n\n${erros.join('\n')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      const novoProtocolo = `PLUS-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      setProtocolo(novoProtocolo);
      setModalMessage(mensagemApoio);
      setModalVisible(true);
      
      setTipo('');
      setLocal('');
      setDescricao('');
      setData('');
      setNome('');
      setContato('');
      setCamposInvalidos({
        tipo: false,
        nome: false,
        contato: false,
        local: false,
        data: false,
        descricao: false,
      });
    }, 2000);
  };

  const handleLimpar = () => {
    setTipo('');
    setLocal('');
    setDescricao('');
    setData('');
    setNome('');
    setContato('');
    setCamposInvalidos({
      tipo: false,
      nome: false,
      contato: false,
      local: false,
      data: false,
      descricao: false,
    });
    Alert.alert('Formulário limpo', 'Todos os campos foram resetados');
  };

  const handleFecharModal = () => {
    setModalVisible(false);
  };

  if (isWeb) {
    return (
      <>
        <div style={{ height: '100vh', overflowY: 'auto', backgroundColor: '#F3F4F6' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
            <div style={{ background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', padding: '12px 20px', borderRadius: 12, marginBottom: 20, display: 'flex', alignItems: 'center' }}>
              <button onClick={() => navigation.goBack()} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', padding: '6px 12px', borderRadius: 20, color: '#FFF', fontWeight: 'bold', cursor: 'pointer', marginRight: 16 }}>← VOLTAR</button>
              <h2 style={{ margin: 0, color: '#FFF', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>DENÚNCIA LEGAL</h2>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)', padding: 16, borderRadius: 16, marginBottom: 20, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 40, marginRight: 16 }}>⚖️</span>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: 14, color: '#DC2626', fontWeight: 'bold' }}>BASE LEGAL - LEI 14.532/2023</h4>
                <p style={{ margin: 2, fontSize: 12, color: '#7F1D1D' }}>Gordofobia é crime equiparado ao racismo!</p>
                <p style={{ margin: 2, fontSize: 12, color: '#7F1D1D' }}>Pena: 1 a 3 anos de reclusão + multa</p>
                <p style={{ margin: 2, fontSize: 12, color: '#7F1D1D' }}>Indenização: até R$ 50.000 por danos morais</p>
              </div>
            </div>

            <h3 style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', margin: '16px 0 4px 0' }}>📝 Registrar Denúncia</h3>
            <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>Preencha todos os campos abaixo. <span style={{ color: '#EF4444', fontWeight: 'bold' }}>*</span> Todos os campos são obrigatórios</p>

            <label style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8, display: 'block' }}>Tipo de discriminação <span style={{ color: '#EF4444' }}>*</span></label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {tipos.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setTipo(item.nome);
                    setCamposInvalidos(prev => ({ ...prev, tipo: false }));
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 24,
                    border: 'none',
                    backgroundColor: tipo === item.nome ? item.cor : '#F3F4F6',
                    color: tipo === item.nome ? '#FFF' : '#4B5563',
                    fontSize: 13,
                    fontWeight: '500',
                    cursor: 'pointer',
                    outline: camposInvalidos.tipo && !tipo ? '2px solid #EF4444' : 'none'
                  }}
                >
                  {item.nome}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Seu nome *"
              style={{
                ...webStyles.input,
                borderColor: camposInvalidos.nome && !nome ? '#EF4444' : '#E5E7EB',
                borderWidth: camposInvalidos.nome && !nome ? '2px' : '1px'
              }}
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setCamposInvalidos(prev => ({ ...prev, nome: false }));
              }}
            />
            <input
              type="text"
              placeholder="E-mail ou WhatsApp *"
              style={{
                ...webStyles.input,
                borderColor: camposInvalidos.contato && !contato ? '#EF4444' : '#E5E7EB',
                borderWidth: camposInvalidos.contato && !contato ? '2px' : '1px'
              }}
              value={contato}
              onChange={(e) => {
                setContato(e.target.value);
                setCamposInvalidos(prev => ({ ...prev, contato: false }));
              }}
            />
            <input
              type="text"
              placeholder="Local (endereço) *"
              style={{
                ...webStyles.input,
                borderColor: camposInvalidos.local && !local ? '#EF4444' : '#E5E7EB',
                borderWidth: camposInvalidos.local && !local ? '2px' : '1px'
              }}
              value={local}
              onChange={(e) => {
                setLocal(e.target.value);
                setCamposInvalidos(prev => ({ ...prev, local: false }));
              }}
            />
            <input
              type="text"
              placeholder="Data do ocorrido (DD/MM/AAAA) *"
              style={{
                ...webStyles.input,
                borderColor: camposInvalidos.data && !data ? '#EF4444' : '#E5E7EB',
                borderWidth: camposInvalidos.data && !data ? '2px' : '1px'
              }}
              value={data}
              onChange={(e) => {
                setData(e.target.value);
                setCamposInvalidos(prev => ({ ...prev, data: false }));
              }}
            />
            <textarea
              placeholder="Descrição detalhada *"
              style={{
                ...webStyles.input,
                height: 100,
                resize: 'vertical',
                borderColor: camposInvalidos.descricao && !descricao ? '#EF4444' : '#E5E7EB',
                borderWidth: camposInvalidos.descricao && !descricao ? '2px' : '1px'
              }}
              value={descricao}
              onChange={(e) => {
                setDescricao(e.target.value);
                setCamposInvalidos(prev => ({ ...prev, descricao: false }));
              }}
            />

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button onClick={handleLimpar} style={{ flex: 1, backgroundColor: '#E5E7EB', padding: 14, borderRadius: 12, border: 'none', color: '#4B5563', fontSize: 14, fontWeight: '500', cursor: 'pointer' }}>🗑️ LIMPAR</button>
              <button onClick={handleEnviar} disabled={loading} style={{ flex: 2, background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', padding: 14, borderRadius: 12, border: 'none', color: '#FFF', fontSize: 14, fontWeight: 'bold', cursor: 'pointer' }}>
                {loading ? 'Enviando...' : '📤 REGISTRAR DENÚNCIA'}
              </button>
            </div>

            <div style={{ backgroundColor: '#FEF3C7', padding: 16, borderRadius: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 32 }}>📋</span>
              <h4 style={{ fontSize: 15, fontWeight: 'bold', color: '#92400E', margin: '8px 0 12px 0' }}>O que acontece depois?</h4>
              <div>
                <p style={{ fontSize: 12, color: '#78350F', marginBottom: 6 }}>1️⃣ Sua denúncia é registrada em nosso sistema</p>
                <p style={{ fontSize: 12, color: '#78350F', marginBottom: 6 }}>2️⃣ Geramos Boletim de Ocorrência automaticamente</p>
                <p style={{ fontSize: 12, color: '#78350F', marginBottom: 6 }}>3️⃣ Encaminhamos ao Procon e Ministério Público</p>
                <p style={{ fontSize: 12, color: '#78350F', marginBottom: 6 }}>4️⃣ Um advogado parceiro analisa seu caso</p>
                <p style={{ fontSize: 12, color: '#78350F', marginBottom: 6 }}>5️⃣ Você recebe modelo de ação por danos morais</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#1F2937', padding: 16, borderRadius: 16, textAlign: 'center', marginBottom: 30 }}>
              <p style={{ fontSize: 11, color: '#FFF', margin: 0 }}>Disque 100 - Denuncie discriminação</p>
              <p style={{ fontSize: 11, color: '#FFF', margin: 4 }}>Lei 13.146/2015 - Obesidade é deficiência</p>
            </div>
          </div>
        </div>

        {modalVisible && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#FFF', borderRadius: 20, padding: 24, width: '90%', maxWidth: 400, textAlign: 'center', borderTopWidth: 5, borderTopColor: '#10B981' }}>
              <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>✅</span>
              <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Denúncia Registrada!</h3>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 8 }}>Protocolo: <strong>{protocolo}</strong></p>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>{modalMessage}</p>
              <p style={{ fontSize: 13, color: '#10B981', marginBottom: 20, fontStyle: 'italic' }}>Com base na Lei 14.532/2023, sua denúncia foi encaminhada. Um advogado analisará seu caso em 48h.</p>
              <button onClick={handleFecharModal} style={{ backgroundColor: '#6366F1', padding: '10px 24px', borderRadius: 12, border: 'none', color: '#FFF', fontSize: 14, fontWeight: 'bold', cursor: 'pointer' }}>Fechar</button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        showsVerticalScrollIndicator={true} 
        bounces={true}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient colors={[colors.danger, colors.dangerDark]} style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← VOLTAR</Text>
          </Pressable>
          <Text style={styles.headerTitle}>DENÚNCIA LEGAL</Text>
        </LinearGradient>

        <View style={styles.legalCard}>
          <LinearGradient colors={['#FEF2F2', '#FEE2E2']} style={styles.legalGradient}>
            <Text style={styles.legalIcon}>⚖️</Text>
            <View style={styles.legalContent}>
              <Text style={styles.legalTitle}>BASE LEGAL - LEI 14.532/2023</Text>
              <Text style={styles.legalText}>Gordofobia é crime equiparado ao racismo!</Text>
              <Text style={styles.legalText}>Pena: 1 a 3 anos de reclusão + multa</Text>
              <Text style={styles.legalText}>Indenização: até R$ 50.000 por danos morais</Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>📝 Registrar Denúncia</Text>
        <Text style={styles.sectionSubtitle}>Preencha <Text style={{ color: colors.danger, fontWeight: 'bold' }}>todos</Text> os campos abaixo</Text>

        <Text style={styles.label}>Tipo de discriminação <Text style={{ color: colors.danger }}>*</Text></Text>
        <View style={styles.tiposContainer}>
          {tipos.map((item) => (
            <Pressable
              key={item.id}
              style={[
                styles.tipoButton,
                tipo === item.nome && { backgroundColor: item.cor },
                camposInvalidos.tipo && !tipo && styles.tipoButtonInvalido
              ]}
              onPress={() => {
                setTipo(item.nome);
                setCamposInvalidos(prev => ({ ...prev, tipo: false }));
              }}
            >
              <Text style={[styles.tipoText, tipo === item.nome && styles.tipoTextActive]}>
                {item.nome}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.formSection}>
          <TextInput 
            style={[styles.input, camposInvalidos.nome && !nome && styles.inputInvalido]} 
            placeholder="Seu nome *" 
            placeholderTextColor={camposInvalidos.nome && !nome ? colors.danger : colors.grayLight}
            value={nome} 
            onChangeText={(text) => {
              setNome(text);
              setCamposInvalidos(prev => ({ ...prev, nome: false }));
            }} 
          />
          <TextInput 
            style={[styles.input, camposInvalidos.contato && !contato && styles.inputInvalido]} 
            placeholder="E-mail ou WhatsApp *" 
            placeholderTextColor={camposInvalidos.contato && !contato ? colors.danger : colors.grayLight}
            value={contato} 
            onChangeText={(text) => {
              setContato(text);
              setCamposInvalidos(prev => ({ ...prev, contato: false }));
            }} 
            keyboardType="email-address" 
          />
          <TextInput 
            style={[styles.input, camposInvalidos.local && !local && styles.inputInvalido]} 
            placeholder="Local (endereço) *" 
            placeholderTextColor={camposInvalidos.local && !local ? colors.danger : colors.grayLight}
            value={local} 
            onChangeText={(text) => {
              setLocal(text);
              setCamposInvalidos(prev => ({ ...prev, local: false }));
            }} 
          />
          <TextInput 
            style={[styles.input, camposInvalidos.data && !data && styles.inputInvalido]} 
            placeholder="Data do ocorrido (DD/MM/AAAA) *" 
            placeholderTextColor={camposInvalidos.data && !data ? colors.danger : colors.grayLight}
            value={data} 
            onChangeText={(text) => {
              setData(text);
              setCamposInvalidos(prev => ({ ...prev, data: false }));
            }} 
          />
          <TextInput 
            style={[styles.input, styles.textArea, camposInvalidos.descricao && !descricao && styles.inputInvalido]} 
            placeholder="Descrição detalhada *" 
            placeholderTextColor={camposInvalidos.descricao && !descricao ? colors.danger : colors.grayLight}
            value={descricao} 
            onChangeText={(text) => {
              setDescricao(text);
              setCamposInvalidos(prev => ({ ...prev, descricao: false }));
            }} 
            multiline numberOfLines={5} textAlignVertical="top" 
          />
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.limparButton} onPress={handleLimpar}>
            <Text style={styles.limparButtonText}>🗑️ LIMPAR</Text>
          </Pressable>
          <Pressable style={styles.enviarButton} onPress={handleEnviar} disabled={loading}>
            {loading ? <ActivityIndicator color={colors.white} /> : <LinearGradient colors={[colors.danger, colors.dangerDark]} style={styles.enviarGradient}><Text style={styles.enviarText}>📤 REGISTRAR DENÚNCIA</Text></LinearGradient>}
          </Pressable>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>📋</Text>
          <Text style={styles.infoTitle}>O que acontece depois?</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>1️⃣ Sua denúncia é registrada em nosso sistema</Text>
            <Text style={styles.infoItem}>2️⃣ Geramos Boletim de Ocorrência automaticamente</Text>
            <Text style={styles.infoItem}>3️⃣ Encaminhamos ao Procon e Ministério Público</Text>
            <Text style={styles.infoItem}>4️⃣ Um advogado parceiro analisa seu caso</Text>
            <Text style={styles.infoItem}>5️⃣ Você recebe modelo de ação por danos morais</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Disque 100 - Denuncie discriminação</Text>
          <Text style={styles.footerText}>Lei 13.146/2015 - Obesidade é deficiência</Text>
        </View>
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.modalSuccess]}>
            <Text style={styles.modalIcon}>✅</Text>
            <Text style={styles.modalTitle}>Denúncia Registrada!</Text>
            <Text style={styles.modalProtocolo}>Protocolo: {protocolo}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Text style={styles.modalInfo}>Com base na Lei 14.532/2023, sua denúncia foi encaminhada. Um advogado analisará seu caso em 48h.</Text>
            <Pressable onPress={handleFecharModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContent: { paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 48, paddingHorizontal: 20, paddingBottom: 20 },
  backButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 16 },
  backText: { color: '#FFFFFF', fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', flex: 1, textAlign: 'center' },
  legalCard: { margin: 16, borderRadius: 16, overflow: 'hidden' },
  legalGradient: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  legalIcon: { fontSize: 40, marginRight: 16 },
  legalContent: { flex: 1 },
  legalTitle: { fontSize: 14, fontWeight: 'bold', color: '#DC2626', marginBottom: 4 },
  legalText: { fontSize: 12, color: '#7F1D1D', marginBottom: 2 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginHorizontal: 16, marginTop: 8, marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: '#6B7280', marginHorizontal: 16, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginHorizontal: 16, marginTop: 12, marginBottom: 8, color: '#374151' },
  tiposContainer: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 16 },
  tipoButton: { backgroundColor: '#F3F4F6', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, marginRight: 10, marginBottom: 10 },
  tipoButtonInvalido: { borderWidth: 2, borderColor: '#EF4444' },
  tipoText: { color: '#4B5563', fontSize: 13, fontWeight: '500' },
  tipoTextActive: { color: '#FFFFFF' },
  formSection: { paddingHorizontal: 16 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, fontSize: 15, color: '#1F2937', marginBottom: 12, width: '100%' },
  inputInvalido: { borderColor: '#EF4444', borderWidth: 2 },
  textArea: { height: 120, textAlignVertical: 'top' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 8, marginBottom: 16 },
  limparButton: { flex: 1, backgroundColor: '#E5E7EB', borderRadius: 12, padding: 14, alignItems: 'center', marginRight: 8 },
  limparButtonText: { color: '#4B5563', fontSize: 14, fontWeight: '500' },
  enviarButton: { flex: 2, borderRadius: 12, overflow: 'hidden', marginLeft: 8 },
  enviarGradient: { padding: 14, alignItems: 'center' },
  enviarText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  infoBox: { backgroundColor: '#FEF3C7', margin: 16, padding: 16, borderRadius: 16 },
  infoIcon: { fontSize: 32, marginBottom: 8 },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: '#92400E', marginBottom: 12 },
  infoList: { width: '100%' },
  infoItem: { fontSize: 12, color: '#78350F', marginBottom: 6, lineHeight: 18 },
  footer: { backgroundColor: '#1F2937', margin: 16, padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 30 },
  footerText: { fontSize: 11, color: '#FFFFFF', textAlign: 'center', marginVertical: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '85%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, alignItems: 'center' },
  modalSuccess: { borderTopWidth: 5, borderTopColor: '#10B981' },
  modalIcon: { fontSize: 48, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  modalProtocolo: { fontSize: 12, color: '#6B7280', marginBottom: 12 },
  modalMessage: { fontSize: 14, color: '#4B5563', textAlign: 'center', marginBottom: 16, fontWeight: '500' },
  modalInfo: { fontSize: 12, color: '#6B7280', textAlign: 'center', marginBottom: 20 },
  modalButton: { backgroundColor: '#6366F1', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 12 },
  modalButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
});

const webStyles = {
  input: {
    width: '100%',
    padding: 14,
    marginBottom: 12,
    border: '1px solid #E5E7EB',
    borderRadius: 12,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
};