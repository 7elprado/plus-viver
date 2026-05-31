import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';

const colors = {
  primary: '#6C63FF',
  white: '#FFFFFF',
};
const isWeb = Platform.OS === 'web';
export default function ComunidadeScreen({ navigation }) {
  const [depoimentos] = useState([
    {
      id: 1,
      nome: 'Carla Silva',
      idade: 47,
      cidade: 'São Paulo/SP',
      texto: 'Consegui minha cadeira adaptada na faculdade usando o modelo de requerimento do app! Nunca imaginei que seria tão fácil lutar pelos meus direitos.',
      likes: 342,
      imagem: 'https://randomuser.me/api/portraits/women/1.jpg',
      data: '15/05/2024',
    },
    {
      id: 2,
      nome: 'Marcos Oliveira',
      idade: 34,
      cidade: 'Rio de Janeiro/RJ',
      texto: 'Fui contratado pela Magazine Luiza através das vagas afirmativas! Primeiro emprego em 3 anos. O app mudou minha vida!',
      likes: 567,
      imagem: 'https://randomuser.me/api/portraits/men/2.jpg',
      data: '20/05/2024',
    },
    {
      id: 3,
      nome: 'Ana Costa',
      idade: 52,
      cidade: 'Belo Horizonte/MG',
      texto: 'Processei o cinema que me humilhou e ganhamos indenização coletiva de R$ 50.000 para 12 pessoas. O app me deu coragem e ferramentas!',
      likes: 891,
      imagem: 'https://randomuser.me/api/portraits/women/3.jpg',
      data: '10/05/2024',
    },
    {
      id: 4,
      nome: 'José Santos',
      idade: 61,
      cidade: 'Porto Alegre/RS',
      texto: 'Minha mãe faleceu e a funerária queria cobrar R$ 8.000 pelo caixão plus. Usei o modelo de denúncia e paguei apenas R$ 800. Gratidão eterna.',
      likes: 423,
      imagem: 'https://randomuser.me/api/portraits/men/4.jpg',
      data: '01/05/2024',
    },
    {
      id: 5,
      nome: 'Patrícia Lima',
      idade: 28,
      cidade: 'Curitiba/PR',
      texto: 'Encontrei meu namorado no app Amor sem Tamanho! Estamos juntos há 6 meses. Obrigada por nos conectarem.',
      likes: 678,
      imagem: 'https://randomuser.me/api/portraits/women/5.jpg',
      data: '25/04/2024',
    },
  ]);
  const [estatisticas] = useState({
    denuncias: 1247,
    indenizacoes: 2300000,
    empresas: 342,
    usuarios: 15680,
    matches: 5123,
  });
  const handleCompartilhar = () => {
    Alert.alert(
      'Compartilhe sua história',
      'Sua história pode inspirar milhares de pessoas! Em breve você poderá compartilhar diretamente pelo app.\n\nEnquanto isso, envie seu relato para: historias@plusviver.com.br',
      [{ text: 'OK' }]
    );
  };
  const handleLike = (id) => {
    Alert.alert('Apoio registrado!', 'Você apoiou esta história. Juntos somos mais fortes!');
  };
  const Content = () => (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← VOLTAR</Text>
        </Pressable>
        <Text style={styles.headerTitle}>COMUNIDADE PLUS</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{estatisticas.denuncias}</Text>
          <Text style={styles.statLabel}>Denúncias resolvidas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>R$ {(estatisticas.indenizacoes / 1000000).toFixed(1)}M</Text>
          <Text style={styles.statLabel}>Em indenizações</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{estatisticas.empresas}</Text>
          <Text style={styles.statLabel}>Empresas inclusivas</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statRowCard}>
          <Text style={styles.statRowNumber}>{estatisticas.usuarios.toLocaleString()}</Text>
          <Text style={styles.statRowLabel}>Usuários ativos</Text>
        </View>
        <View style={styles.statRowCard}>
          <Text style={styles.statRowNumber}>{estatisticas.matches.toLocaleString()}</Text>
          <Text style={styles.statRowLabel}>Matches no amor</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>📢 DEPOIMENTOS REAIS</Text>
      <Text style={styles.sectionSubtitle}>
        Histórias de pessoas que transformaram suas vidas com o Plus Viver
      </Text>

      {depoimentos.map((item) => (
        <View key={item.id} style={styles.depoimentoCard}>
          <View style={styles.depoimentoHeader}>
            <Image source={{ uri: item.imagem }} style={styles.avatar} />
            <View style={styles.depoimentoHeaderInfo}>
              <Text style={styles.depoimentoNome}>{item.nome}</Text>
              <Text style={styles.depoimentoInfo}>
                {item.idade} anos • {item.cidade}
              </Text>
              <Text style={styles.depoimentoData}>📅 {item.data}</Text>
            </View>
          </View>
          <Text style={styles.depoimentoTexto}>"{item.texto}"</Text>
          <Pressable
            style={styles.likeButton}
            onPress={() => handleLike(item.id)}
          >
            <Text style={styles.likeIcon}>❤️</Text>
            <Text style={styles.likeCount}>{item.likes} pessoas apoiaram</Text>
          </Pressable>
        </View>
      ))}
      <Pressable style={styles.compartilharButton} onPress={handleCompartilhar}>
        <Text style={styles.compartilharText}>📢 COMPARTILHE SUA HISTÓRIA</Text>
      </Pressable>
      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>🌟 Juntos somos mais fortes!</Text>
        <Text style={styles.ctaText}>
          Cada história compartilhada inspira milhares de pessoas a lutarem pelos seus direitos.
        </Text>
        <Text style={styles.ctaText}>
          Sua voz importa. Sua história pode mudar vidas.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>#JuntosSomosMaisFortes</Text>
        <Text style={styles.footerText}>#PlusViver #DignidadeParaTodos</Text>
      </View>
    </>
  );
  if (isWeb) {
    return (
      <div style={{ height: '100vh', overflowY: 'auto', backgroundColor: '#F5F7FA' }}>
        <Content />
      </div>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#9B59B6',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 15,
  },
  backText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statRowCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
  },
  statRowNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statRowLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  depoimentoCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  depoimentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  depoimentoHeaderInfo: {
    flex: 1,
  },
  depoimentoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  depoimentoInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  depoimentoData: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  depoimentoTexto: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  likeIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  likeCount: {
    fontSize: 12,
    color: '#E74C3C',
  },
  compartilharButton: {
    backgroundColor: '#2ECC71',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  compartilharText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaCard: {
    backgroundColor: '#E8E2F5',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B2CBF',
    marginBottom: 12,
  },
  ctaText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  footer: {
    backgroundColor: '#2C3E50',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
});