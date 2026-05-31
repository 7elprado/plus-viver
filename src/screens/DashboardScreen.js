import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const colors = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#A5B4FC',
  secondary: '#EC4899',
  secondaryDark: '#DB2777',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  dark: '#1F2937',
  grayDark: '#4B5563',
  gray: '#6B7280',
  grayLight: '#9CA3AF',
  grayExtraLight: '#E5E7EB',
  light: '#F3F4F6',
  white: '#FFFFFF',
  black: '#000000',
  gradient: ['#6366F1', '#8B5CF6', '#EC4899'],
};
const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const DEFAULT_USER = {
  nome: 'Visitante',
  email: 'visitante@plusviver.com',
  peso: '0kg',
  altura: '0m',
  idade: 0,
  cidade: 'Não informado',
  foto: 'https://randomuser.me/api/portraits/lego/1.jpg',
  estatisticas: {
    denunciasResolvidas: 0,
    empresasInclusivas: 0,
    economiaFuneral: 0,
    matchesAmor: 0,
    locaisVisitados: 0,
  },
  conquistas: [
    { id: 1, nome: 'Primeira Denúncia', icone: '⚡', desbloqueado: false },
    { id: 2, nome: 'Apoiador Plus', icone: '❤️', desbloqueado: false },
    { id: 3, nome: 'Comunidade Ativa', icone: '💬', desbloqueado: false },
    { id: 4, nome: 'Indenização Conquistada', icone: '💰', desbloqueado: false },
  ],
  historico: [
    { id: 1, tipo: 'Boas-vindas', descricao: 'Bem-vindo ao Plus Viver!', data: new Date().toLocaleDateString(), status: 'concluida' },
  ]
};
export default function DashboardScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  useEffect(() => {
    if (route?.params?.userData) {
      setUser(route.params.userData);
    } else if (route?.params?.email) {
      const MOCK_USERS = {
        'admin@plusviver.com': {
          nome: 'Mariana Silva',
          email: 'admin@plusviver.com',
          peso: '120kg',
          altura: '1.65m',
          idade: 34,
          cidade: 'São Paulo, SP',
          foto: 'https://randomuser.me/api/portraits/women/68.jpg',
          estatisticas: {
            denunciasResolvidas: 3,
            empresasInclusivas: 2,
            economiaFuneral: 2500,
            matchesAmor: 5,
            locaisVisitados: 12,
          },
          conquistas: [
            { id: 1, nome: 'Primeira Denúncia', icone: '⚡', desbloqueado: true },
            { id: 2, nome: 'Apoiador Plus', icone: '❤️', desbloqueado: true },
            { id: 3, nome: 'Comunidade Ativa', icone: '💬', desbloqueado: true },
            { id: 4, nome: 'Indenização Conquistada', icone: '💰', desbloqueado: false },
          ],
          historico: [
            { id: 1, tipo: 'Denúncia', descricao: 'Discriminação em hospital', data: '15/05/2024', status: 'resolvida' },
            { id: 2, tipo: 'Denúncia', descricao: 'Assento de ônibus quebrou', data: '20/05/2024', status: 'resolvida' },
          ]
        }
      };
      setUser(MOCK_USERS[route.params.email] || DEFAULT_USER);
    } else {
      setUser(DEFAULT_USER);
    }
    setTimeout(() => {
      setLoading(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 800);
  }, []);
  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => navigation.replace('Login') },
    ]);
  };
  const cenarios = [
    { id: 1, nome: 'SAÚDE', icone: '🏥', cor: colors.danger, rota: 'Cenario', params: { cenario: 'saude' }, desc: 'Atendimento humanizado' },
    { id: 2, nome: 'TRABALHO', icone: '🏢', cor: '#3B82F6', rota: 'Cenario', params: { cenario: 'trabalho' }, desc: 'Vagas afirmativas' },
    { id: 3, nome: 'TRANSPORTE', icone: '🚌', cor: '#F59E0B', rota: 'Cenario', params: { cenario: 'transporte' }, desc: 'Acessibilidade' },
    { id: 4, nome: 'EDUCAÇÃO', icone: '🎓', cor: '#10B981', rota: 'Cenario', params: { cenario: 'educacao' }, desc: 'Inclusão escolar' },
    { id: 5, nome: 'AMOR', icone: '❤️', cor: '#EC4899', rota: 'Cenario', params: { cenario: 'amor' }, desc: 'Relacionamentos' },
    { id: 6, nome: 'LAZER', icone: '🎬', cor: '#8B5CF6', rota: 'Cenario', params: { cenario: 'lazer' }, desc: 'Entretenimento' },
    { id: 7, nome: 'DIGNIDADE', icone: '⚰️', cor: '#6B7280', rota: 'Cenario', params: { cenario: 'dignidade' }, desc: 'Funeral digno' },
  ];
  if (loading || !user) {
    return (
      <LinearGradient colors={colors.gradient} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Plus Viver</Text>
        <Text style={styles.loadingSub}>Carregando seus dados...</Text>
      </LinearGradient>
    );
  }
  const Content = () => (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
      <LinearGradient colors={colors.gradient} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: user.foto || 'https://randomuser.me/api/portraits/lego/1.jpg' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.welcome}>Olá, {user.nome?.split(' ')[0] || 'Usuário'}</Text>
              <Text style={styles.subtitle}>
                {user.peso || '0kg'} • {user.idade || '?'} anos • Membro Plus
              </Text>
            </View>
          </View>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>🚪</Text>
          </Pressable>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.estatisticas?.denunciasResolvidas || 0}</Text>
            <Text style={styles.statLabel}>Denúncias resolvidas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.estatisticas?.empresasInclusivas || 0}</Text>
            <Text style={styles.statLabel}>Empresas inclusivas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>R$ {user.estatisticas?.economiaFuneral || 0}</Text>
            <Text style={styles.statLabel}>Economia em funeral</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>📍 {user.cidade || 'Não informado'}</Text>
          </View>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>❤️ {user.estatisticas?.matchesAmor || 0} matches</Text>
          </View>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>🎬 {user.estatisticas?.locaisVisitados || 0} locais</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.conquistasCard}>
        <Text style={styles.conquistasTitle}>🏆 Suas Conquistas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.conquistasScroll}>
          {(user.conquistas || DEFAULT_USER.conquistas).map((item) => (
            <View key={item.id} style={[styles.conquistaItem, !item.desbloqueado && styles.conquistaItemBloqueado]}>
              <Text style={styles.conquistaIcon}>{item.icone}</Text>
              <Text style={styles.conquistaNome}>{item.nome}</Text>
              {!item.desbloqueado && <Text style={styles.conquistaBloqueado}>🔒</Text>}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.historicoCard}>
        <Text style={styles.historicoTitle}>📋 Atividades Recentes</Text>
        {(user.historico || DEFAULT_USER.historico).map((item) => (
          <View key={item.id} style={styles.historicoItem}>
            <View style={styles.historicoIcon}>
              <Text>{item.tipo === 'Denúncia' ? '⚡' : '🏆'}</Text>
            </View>
            <View style={styles.historicoContent}>
              <Text style={styles.historicoDescricao}>{item.descricao}</Text>
              <Text style={styles.historicoData}>{item.data}</Text>
            </View>
            <View style={[styles.historicoStatus, item.status === 'resolvida' ? styles.statusResolvida : styles.statusAndamento]}>
              <Text style={styles.historicoStatusText}>
                {item.status === 'resolvida' ? '✅' : '⏳'}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.statsInfoCard}>
        <Text style={styles.statsInfoTitle}>📊 Dados Reais IBGE 2024</Text>
        <View style={styles.statsInfoRow}>
          <Text style={styles.statsInfoLabel}>Obesidade no Brasil:</Text>
          <Text style={styles.statsInfoValue}>25.9%</Text>
        </View>
        <View style={styles.statsInfoRow}>
          <Text style={styles.statsInfoLabel}>Excesso de peso:</Text>
          <Text style={styles.statsInfoValue}>62.1%</Text>
        </View>
        <View style={styles.statsInfoRow}>
          <Text style={styles.statsInfoLabel}>Mulheres obesas:</Text>
          <Text style={styles.statsInfoValue}>29.5%</Text>
        </View>
        <View style={styles.statsInfoRow}>
          <Text style={styles.statsInfoLabel}>Homens obesos:</Text>
          <Text style={styles.statsInfoValue}>21.8%</Text>
        </View>
      </View>
      <Pressable
        style={styles.alertBanner}
        onPress={() => navigation.navigate('Cenario', { cenario: 'educacao' })}
      >
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.alertGradient}>
          <Text style={styles.alertIcon}>🔴</Text>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>ALERTA URGENTE</Text>
            <Text style={styles.alertText}>
              Você tem direito a cadeira adaptada na faculdade!
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
      <Text style={styles.sectionTitle}>📍 Cenários de Impacto</Text>
      <View style={styles.grid}>
        {cenarios.map((item) => (
          <Pressable
            key={item.id}
            style={styles.gridCard}
            onPress={() => navigation.navigate(item.rota, item.params)}
          >
            <LinearGradient
              colors={[item.cor, item.cor + 'CC']}
              style={styles.gridGradient}
            >
              <Text style={styles.gridIcon}>{item.icone}</Text>
              <Text style={styles.gridText}>{item.nome}</Text>
              <Text style={styles.gridDesc}>{item.desc}</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={styles.denunciaButton}
        onPress={() => navigation.navigate('Denuncia')}
      >
        <LinearGradient colors={[colors.danger, '#DC2626']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>⚖️ FAZER DENÚNCIA (Lei 14.532)</Text>
        </LinearGradient>
      </Pressable>

      <Pressable
        style={styles.comunidadeButton}
        onPress={() => navigation.navigate('Comunidade')}
      >
        <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>💬 COMUNIDADE PLUS</Text>
        </LinearGradient>
      </Pressable>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lei 14.532/2023 - Gordofobia é crime!</Text>
        <Text style={styles.footerText}>Disque 100 - Denuncie</Text>
      </View>
    </Animated.View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  loadingSub: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 10,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
  },
  logoutText: {
    fontSize: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  infoChip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  infoChipText: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  conquistasCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  conquistasTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  conquistasScroll: {
    flexDirection: 'row',
  },
  conquistaItem: {
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    minWidth: 80,
  },
  conquistaItemBloqueado: {
    opacity: 0.4,
    backgroundColor: '#E5E7EB',
  },
  conquistaIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  conquistaNome: {
    fontSize: 11,
    fontWeight: '500',
    color: '#4B5563',
    textAlign: 'center',
  },
  conquistaBloqueado: {
    fontSize: 10,
    marginTop: 4,
  },
  historicoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  historicoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  historicoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  historicoIcon: {
    width: 40,
    alignItems: 'center',
  },
  historicoContent: {
    flex: 1,
  },
  historicoDescricao: {
    fontSize: 13,
    color: '#374151',
  },
  historicoData: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  historicoStatus: {
    width: 30,
    alignItems: 'center',
  },
  statusResolvida: {
    opacity: 1,
  },
  statusAndamento: {
    opacity: 0.6,
  },
  historicoStatusText: {
    fontSize: 14,
  },
  statsInfoCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 16,
  },
  statsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statsInfoLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  statsInfoValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  alertBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  alertGradient: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alertText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  gridCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gridGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 110,
    justifyContent: 'center',
  },
  gridIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  gridDesc: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  denunciaButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  comunidadeButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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