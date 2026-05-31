import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { registrarUsuario, loginUsuario, resetarSenha } from '../services/firebase';

const colors = {
  primary: '#6366F1',
  gray: '#6B7280',
  grayLight: '#9CA3AF',
  white: '#FFFFFF',
  black: '#000000',
  dark: '#1F2937',
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [genero, setGenero] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrando, setRegistrando] = useState(false);
  const [resetando, setResetando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success'); // 'success' ou 'error'
  const showModal = (message, type = 'success') => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 10000);
  };
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha e-mail e senha para continuar');
      return;
    }
    setLoading(true);
    const result = await loginUsuario(email, senha);
    setLoading(false);   
    if (result.success) {
      navigation.replace('Dashboard', { 
        userId: result.uid,
        userData: result.userData 
      });
    } else {
      Alert.alert('Erro no login', result.error);
    }
  };
  const handleRegistro = async () => {
    if (!email || !senha || !nome || !peso || !altura || !idade || !cidade || !genero) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para se cadastrar');
      return;
    }
    setLoading(true);
    const result = await registrarUsuario(email, senha, nome, peso, altura, parseInt(idade), cidade, genero);
    setLoading(false);
    if (result.success) {
      Alert.alert('✅ Sucesso!', 'Cadastro realizado com sucesso! Faça login.');
      setRegistrando(false);
      setNome('');
      setPeso('');
      setAltura('');
      setIdade('');
      setCidade('');
      setGenero('');
      setEmail('');
      setSenha('');
    } else {
      Alert.alert('Erro no cadastro', result.error);
    }
  };
  const handleResetarSenha = async () => {
    // Validação: verifica se o email está vazio
    if (!email || email.trim() === '') {
      showModal('⚠️ Digite seu e-mail para recuperar a senha', 'error');
      return;
    }
    setResetando(true);
    const result = await resetarSenha(email);
    setResetando(false);
    if (result.success) {
      showModal('✅ E-mail enviado! Verifique sua caixa de entrada e a pasta de SPAM', 'success');
    } else {
      showModal(`❌ Erro: ${result.error}`, 'error');
    }
  };
  return (
    <LinearGradient colors={['#6366F1', '#8B5CF6', '#EC4899']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>❤️</Text>
              </LinearGradient>
              <Text style={styles.logoText}>Plus Viver</Text>
              <Text style={styles.logoSlogan}>Da humilhação à dignidade</Text>
            </View>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                {registrando ? '✨ Criar Conta' : '✨ Bem-vindo de volta'}
              </Text>
              <Text style={styles.formSubtitle}>
                {registrando
                  ? 'Preencha os dados abaixo para começar'
                  : 'Faça login para acessar sua conta'}
              </Text>
              {registrando && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    placeholderTextColor={colors.grayLight}
                    value={nome}
                    onChangeText={setNome}
                  />
                  <View style={styles.row}>
                    <TextInput
                      style={styles.inputHalf}
                      placeholder="Peso (kg)"
                      placeholderTextColor={colors.grayLight}
                      value={peso}
                      onChangeText={setPeso}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.inputHalf}
                      placeholder="Altura (m)"
                      placeholderTextColor={colors.grayLight}
                      value={altura}
                      onChangeText={setAltura}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.row}>
                    <TextInput
                      style={styles.inputHalf}
                      placeholder="Idade"
                      placeholderTextColor={colors.grayLight}
                      value={idade}
                      onChangeText={setIdade}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.inputHalf}
                      placeholder="Cidade"
                      placeholderTextColor={colors.grayLight}
                      value={cidade}
                      onChangeText={setCidade}
                    />
                  </View>
                  <Text style={styles.labelGenero}>Gênero *</Text>
                  <View style={styles.generoContainer}>
                    <Pressable
                      style={[styles.generoButton, genero === 'Feminino' && styles.generoButtonActive]}
                      onPress={() => setGenero('Feminino')}
                    >
                      <Text style={[styles.generoText, genero === 'Feminino' && styles.generoTextActive]}>👩 Feminino</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.generoButton, genero === 'Masculino' && styles.generoButtonActive]}
                      onPress={() => setGenero('Masculino')}
                    >
                      <Text style={[styles.generoText, genero === 'Masculino' && styles.generoTextActive]}>👨 Masculino</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.generoButton, genero === 'Outro' && styles.generoButtonActive]}
                      onPress={() => setGenero('Outro')}
                    >
                      <Text style={[styles.generoText, genero === 'Outro' && styles.generoTextActive]}>🌈 Outro</Text>
                    </Pressable>
                  </View>
                </>
              )}
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={colors.grayLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!registrando && (
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor={colors.grayLight}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry
                />
              )}
              {registrando && (
                <TextInput
                  style={styles.input}
                  placeholder="Senha (mínimo 6 caracteres)"
                  placeholderTextColor={colors.grayLight}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry
                />
              )}
              {!registrando && (
                <Pressable onPress={handleResetarSenha} style={styles.forgotButton} disabled={resetando}>
                  {resetando ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : (
                    <Text style={styles.forgotText}>Esqueci minha senha</Text>
                  )}
                </Pressable>
              )}
              <Pressable
                style={styles.loginButton}
                onPress={registrando ? handleRegistro : handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.loginButtonText}>
                    {registrando ? 'CADASTRAR' : 'ENTRAR'}
                  </Text>
                )}
              </Pressable>
              <Pressable onPress={() => setRegistrando(!registrando)} style={styles.switchButton}>
                <Text style={styles.switchText}>
                  {registrando
                    ? 'Já tem conta? Faça login'
                    : 'Não tem conta? Cadastre-se gratuitamente'}
                </Text>
              </Pressable>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>⚖️</Text>
              <Text style={styles.infoTitle}>Lei 14.532/2023</Text>
              <Text style={styles.infoText}>Gordofobia é crime equiparado ao racismo. Pena: 1 a 3 anos.</Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Disque 100 - Denuncie</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContainer,
            modalType === 'success' ? styles.modalSuccess : styles.modalError
          ]}>
            <Text style={styles.modalIcon}>{modalType === 'success' ? '📧' : '⚠️'}</Text>
            <Text style={styles.modalTitle}>
              {modalType === 'success' ? 'E-mail enviado!' : 'Atenção!'}
            </Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40 },
  content: { paddingHorizontal: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logoEmoji: { fontSize: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  logoSlogan: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 8 },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 },
  formTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 8 },
  formSubtitle: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 16 },
  inputHalf: { flex: 1, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, fontSize: 16, marginRight: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  labelGenero: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 4 },
  generoContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  generoButton: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
  generoButtonActive: { backgroundColor: '#6366F1' },
  generoText: { color: '#4B5563', fontSize: 14, fontWeight: '500' },
  generoTextActive: { color: '#FFFFFF' },
  loginButton: { backgroundColor: '#6366F1', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  forgotButton: { alignItems: 'center', marginTop: 8, marginBottom: 8 },
  forgotText: { color: '#6366F1', fontSize: 14, fontWeight: '500' },
  switchButton: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#6366F1', fontSize: 14, fontWeight: '500' },
  infoBox: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: 16, marginBottom: 16, alignItems: 'center' },
  infoIcon: { fontSize: 28, marginBottom: 8 },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  infoText: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
  footer: { alignItems: 'center', paddingVertical: 16 },
  footerText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, textAlign: 'center' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalSuccess: {
    borderTopWidth: 5,
    borderTopColor: '#10B981',
  },
  modalError: {
    borderTopWidth: 5,
    borderTopColor: '#EF4444',
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});