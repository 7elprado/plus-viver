import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { registrarUsuario, loginUsuario, resetarSenha } from '../services/firebase';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;

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
  const [modalType, setModalType] = useState('success');

  const showModal = (message, type = 'success') => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 10000);
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha e-mail e senha');
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
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos');
      return;
    }
    setLoading(true);
    const result = await registrarUsuario(email, senha, nome, peso, altura, parseInt(idade), cidade, genero);
    setLoading(false);
    if (result.success) {
      Alert.alert('Sucesso!', 'Cadastro realizado! Faça login.');
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
    if (!email || email.trim() === '') {
      showModal('Digite seu e-mail para recuperar a senha', 'error');
      return;
    }
    setResetando(true);
    const result = await resetarSenha(email);
    setResetando(false);
    if (result.success) {
      showModal('E-mail enviado! Verifique sua caixa de entrada e SPAM', 'success');
    } else {
      showModal(`Erro: ${result.error}`, 'error');
    }
  };

  const isWeb = Platform.OS === 'web';

  if (isWeb) {
    return (
      <div style={{ height: '100vh', overflowY: 'auto', background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)' }}>
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <span style={{ fontSize: 40 }}>❤️</span>
            </div>
            <h1 style={{ color: '#FFFFFF', fontSize: 32, margin: 0, fontWeight: 'bold' }}>Plus Viver</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 8 }}>Da humilhação à dignidade</p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 8 }}>
              {registrando ? '✨ Criar Conta' : '✨ Bem-vindo de volta'}
            </h2>
            <p style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 24 }}>
              {registrando ? 'Preencha os dados abaixo para começar' : 'Faça login para acessar sua conta'}
            </p>

            {registrando && (
              <>
                <input
                  type="text"
                  placeholder="Nome completo"
                  style={webStyles.input}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <input
                    type="number"
                    placeholder="Peso (kg)"
                    style={{ ...webStyles.input, flex: 1 }}
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Altura (m)"
                    style={{ ...webStyles.input, flex: 1 }}
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <input
                    type="number"
                    placeholder="Idade"
                    style={{ ...webStyles.input, flex: 1 }}
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Cidade"
                    style={{ ...webStyles.input, flex: 1 }}
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </div>
                
                <label style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8, display: 'block' }}>Gênero</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {['Feminino', 'Masculino', 'Outro'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGenero(g)}
                      style={{
                        flex: 1,
                        padding: 10,
                        borderRadius: 12,
                        border: 'none',
                        backgroundColor: genero === g ? '#6366F1' : '#F3F4F6',
                        color: genero === g ? '#FFFFFF' : '#4B5563',
                        fontSize: 13,
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </>
            )}

            <input
              type="email"
              placeholder="E-mail"
              style={webStyles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder={registrando ? "Senha (mínimo 6 caracteres)" : "Senha"}
              style={webStyles.input}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            {!registrando && (
              <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 8 }}>
                <button
                  onClick={handleResetarSenha}
                  disabled={resetando}
                  style={{ background: 'none', border: 'none', color: '#6366F1', fontSize: 13, fontWeight: '500', cursor: 'pointer' }}
                >
                  {resetando ? 'Enviando...' : 'Esqueci minha senha'}
                </button>
              </div>
            )}
            <button
              onClick={registrando ? handleRegistro : handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#6366F1',
                padding: 14,
                borderRadius: 12,
                border: 'none',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: 8
              }}
            >
              {loading ? 'Carregando...' : (registrando ? 'CADASTRAR' : 'ENTRAR')}
            </button>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <button
                onClick={() => setRegistrando(!registrando)}
                style={{ background: 'none', border: 'none', color: '#6366F1', fontSize: 13, fontWeight: '500', cursor: 'pointer' }}
              >
                {registrando ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se gratuitamente'}
              </button>
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: 14, marginBottom: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 24 }}>⚖️</span>
            <p style={{ fontSize: 12, fontWeight: 'bold', color: '#1F2937', margin: '4px 0' }}>Lei 14.532/2023</p>
            <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>Gordofobia é crime. Pena: 1 a 3 anos.</p>
          </div>

          <div style={{ textAlign: 'center', paddingVertical: 16 }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Disque 100 - Denuncie</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#6366F1', '#8B5CF6', '#EC4899']} style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16, paddingTop: 20 }}
          showsVerticalScrollIndicator={true}
          bounces={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 35 }}>❤️</Text>
            </View>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' }}>Plus Viver</Text>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>Da humilhação à dignidade</Text>
          </View>

          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 8 }}>
              {registrando ? '✨ Criar Conta' : '✨ Bem-vindo de volta'}
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', marginBottom: 20 }}>
              {registrando ? 'Preencha os dados abaixo para começar' : 'Faça login para acessar sua conta'}
            </Text>

            {registrando && (
              <>
                <TextInput
                  style={stylesMobile.input}
                  placeholder="Nome completo"
                  placeholderTextColor="#9CA3AF"
                  value={nome}
                  onChangeText={setNome}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                  <TextInput
                    style={[stylesMobile.input, { flex: 1 }]}
                    placeholder="Peso (kg)"
                    placeholderTextColor="#9CA3AF"
                    value={peso}
                    onChangeText={setPeso}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[stylesMobile.input, { flex: 1 }]}
                    placeholder="Altura (m)"
                    placeholderTextColor="#9CA3AF"
                    value={altura}
                    onChangeText={setAltura}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                  <TextInput
                    style={[stylesMobile.input, { flex: 1 }]}
                    placeholder="Idade"
                    placeholderTextColor="#9CA3AF"
                    value={idade}
                    onChangeText={setIdade}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[stylesMobile.input, { flex: 1 }]}
                    placeholder="Cidade"
                    placeholderTextColor="#9CA3AF"
                    value={cidade}
                    onChangeText={setCidade}
                  />
                </View>
                
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 4 }}>Gênero</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 16 }}>
                  {['Feminino', 'Masculino', 'Outro'].map((g) => (
                    <Pressable
                      key={g}
                      style={[stylesMobile.genderBtn, genero === g && stylesMobile.genderBtnActive]}
                      onPress={() => setGenero(g)}
                    >
                      <Text style={[stylesMobile.genderText, genero === g && stylesMobile.genderTextActive]}>
                        {g}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            <TextInput
              style={stylesMobile.input}
              placeholder="E-mail"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={stylesMobile.input}
              placeholder={registrando ? "Senha (mínimo 6 caracteres)" : "Senha"}
              placeholderTextColor="#9CA3AF"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
            {!registrando && (
              <Pressable onPress={handleResetarSenha} style={{ alignItems: 'center', marginVertical: 8 }} disabled={resetando}>
                {resetando ? <ActivityIndicator size="small" color="#6366F1" /> : <Text style={{ color: '#6366F1', fontSize: 13, fontWeight: '500' }}>Esqueci minha senha</Text>}
              </Pressable>
            )}
            <Pressable style={stylesMobile.loginBtn} onPress={registrando ? handleRegistro : handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={stylesMobile.loginBtnText}>{registrando ? 'CADASTRAR' : 'ENTRAR'}</Text>}
            </Pressable>
            <Pressable onPress={() => setRegistrando(!registrando)} style={{ marginTop: 20, alignItems: 'center' }}>
              <Text style={{ color: '#6366F1', fontSize: 13, fontWeight: '500' }}>
                {registrando ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se gratuitamente'}
              </Text>
            </Pressable>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: 12, marginBottom: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>⚖️</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1F2937', marginBottom: 2 }}>Lei 14.532/2023</Text>
            <Text style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>Gordofobia é crime. Pena: 1 a 3 anos.</Text>
          </View>
          <View style={{ alignItems: 'center', paddingVertical: 16 }}>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Disque 100 - Denuncie</Text>
          </View>
        </ScrollView>
      </LinearGradient>
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '85%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, alignItems: 'center', borderTopWidth: 5, borderTopColor: modalType === 'success' ? '#10B981' : '#EF4444' }}>
            <Text style={{ fontSize: 45, marginBottom: 12 }}>{modalType === 'success' ? '📧' : '⚠️'}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{modalType === 'success' ? 'E-mail enviado!' : 'Atenção!'}</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 18 }}>{modalMessage}</Text>
            <Pressable onPress={() => setModalVisible(false)} style={{ backgroundColor: '#6366F1', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 12 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const stylesMobile = StyleSheet.create({
  input: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 12,
    width: '100%',
  },
  genderBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: '#6366F1',
  },
  genderText: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#FFFFFF',
  },
  loginBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const webStyles = {
  input: {
    width: '100%',
    padding: 14,
    marginBottom: 14,
    border: '1px solid #E5E7EB',
    borderRadius: 12,
    fontSize: 15,
    backgroundColor: '#F3F4F6',
    boxSizing: 'border-box',
  },
};