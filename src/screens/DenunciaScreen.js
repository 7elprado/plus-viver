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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

const isWeb = Platform.OS === 'web';
export default function DenunciaScreen({ navigation }) {
  const [tipo, setTipo] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviada, setEnviada] = useState(false);

  const tipos = [
    { id: 'saude', nome: '🏥 Saúde', cor: '#EF4444' },
    { id: 'trabalho', nome: '🏢 Trabalho', cor: '#3B82F6' },
    { id: 'transporte', nome: '🚌 Transporte', cor: '#F59E0B' },
    { id: 'educacao', nome: '🎓 Educação', cor: '#10B981' },
    { id: 'lazer', nome: '🎬 Lazer', cor: '#8B5CF6' },
    { id: 'funeral', nome: '⚰️ Funeral', cor: '#6B7280' },
  ];
  const handleEnviar = () => {
    if (!tipo || !local || !descricao) {
      Alert.alert('Campos obrigatórios', 'Preencha tipo, local e descrição para continuar');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEnviada(true);
      Alert.alert(
        '✅ DENÚNCIA REGISTRADA!',
        `Protocolo: PLUS-${Date.now()}\n\nCom base na Lei 14.532/2023, sua denúncia foi encaminhada.\n\nUm advogado analisará seu caso em 48h.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      setTipo('');
      setLocal('');
      setDescricao('');
      setData('');
      setNome('');
      setContato('');
    }, 2000);
  };
  const handleLimpar = () => {
    setTipo('');
    setLocal('');
    setDescricao('');
    setData('');
    setNome('');
    setContato('');
    Alert.alert('Formulário limpo', 'Todos os campos foram resetados');
  };
  if (enviada) {
    return (
      <LinearGradient colors={['#10B981', '#059669']} style={styles.sucessoContainer}>
        <View style={styles.sucessoContent}>
          <Text style={styles.sucessoIcon}>✅</Text>
          <Text style={styles.sucessoTitulo}>Denúncia Enviada!</Text>
          <Text style={styles.sucessoTexto}>
            Seu caso está sendo analisado. Você receberá atualizações por e-mail.
          </Text>
          <Pressable
            style={styles.sucessoButton}
            onPress={() => {
              setEnviada(false);
              navigation.goBack();
            }}
          >
            <LinearGradient colors={['#FFFFFF', '#F3F4F6']} style={styles.sucessoButtonGradient}>
              <Text style={styles.sucessoButtonText}>VOLTAR AO INÍCIO</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }
  const Content = () => (
    <>
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
      <Text style={styles.sectionSubtitle}>
        Preencha os dados abaixo. Sua identidade será preservada.
      </Text>
      <Text style={styles.label}>Tipo de discriminação *</Text>
      <View style={styles.tiposContainer}>
        {tipos.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.tipoButton,
              tipo === item.nome && { backgroundColor: item.cor },
            ]}
            onPress={() => setTipo(item.nome)}
          >
            <Text
              style={[
                styles.tipoText,
                tipo === item.nome && styles.tipoTextActive,
              ]}
            >
              {item.nome}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Seu nome (opcional)</Text>
      <TextInput
        key="nome-input"
        style={styles.input}
        placeholder="Ex: João Silva"
        placeholderTextColor={colors.grayLight}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>E-mail ou WhatsApp (opcional)</Text>
      <TextInput
        key="contato-input"
        style={styles.input}
        placeholder="contato@email.com ou (11) 99999-9999"
        placeholderTextColor={colors.grayLight}
        value={contato}
        onChangeText={setContato}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Local (endereço) *</Text>
      <TextInput
        key="local-input"
        style={styles.input}
        placeholder="Ex: Hospital X, Rua Y, 123 - São Paulo/SP"
        placeholderTextColor={colors.grayLight}
        value={local}
        onChangeText={setLocal}
      />
      <Text style={styles.label}>Data do ocorrido</Text>
      <TextInput
        key="data-input"
        style={styles.input}
        placeholder="Ex: 25/05/2024"
        placeholderTextColor={colors.grayLight}
        value={data}
        onChangeText={setData}
      />
      <Text style={styles.label}>Descrição detalhada *</Text>
      <TextInput
        key="descricao-input"
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o que aconteceu, pessoas envolvidas, testemunhas..."
        placeholderTextColor={colors.grayLight}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
      <View style={styles.buttonRow}>
        <Pressable style={styles.limparButton} onPress={handleLimpar}>
          <Text style={styles.limparButtonText}>🗑️ LIMPAR</Text>
        </Pressable>
        <Pressable
          style={styles.enviarButton}
          onPress={handleEnviar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <LinearGradient colors={[colors.danger, colors.dangerDark]} style={styles.enviarGradient}>
              <Text style={styles.enviarText}>📤 REGISTRAR DENÚNCIA</Text>
            </LinearGradient>
          )}
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
    </>
  );
  if (isWeb) {
    return (
      <div style={{ height: '100vh', overflowY: 'auto', backgroundColor: '#F3F4F6' }}>
        <Content />
      </div>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  sucessoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sucessoContent: {
    alignItems: 'center',
    padding: 32,
  },
  sucessoIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  sucessoTitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sucessoTexto: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 32,
  },
  sucessoButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sucessoButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  sucessoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 16,
  },
  backText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  legalCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  legalGradient: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  legalIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  legalContent: {
    flex: 1,
  },
  legalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  legalText: {
    fontSize: 12,
    color: '#7F1D1D',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    color: '#374151',
  },
  tiposContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
  tipoButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    marginBottom: 10,
  },
  tipoText: {
    color: '#4B5563',
    fontSize: 13,
    fontWeight: '500',
  },
  tipoTextActive: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  limparButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  limparButtonText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
  enviarButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: 8,
  },
  enviarGradient: {
    padding: 14,
    alignItems: 'center',
  },
  enviarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#FEF3C7',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  infoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 12,
  },
  infoList: {
    width: '100%',
  },
  infoItem: {
    fontSize: 12,
    color: '#78350F',
    marginBottom: 6,
    lineHeight: 18,
  },
  footer: {
    backgroundColor: '#1F2937',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});